/* ==========================================================================
   POST /api/order — order submission endpoint.

   The order builder is static and needs no database. When the owner connects
   an order webhook (a Google Apps Script Web App writing to a Sheet, or any
   HTTPS endpoint) via the ORDER_WEBHOOK_URL environment variable, this route
   validates the order and forwards it there. When no webhook is configured —
   the default — it returns a `fallback` response and the UI sends the same
   order as a ready-made WhatsApp / email message instead.

   Nothing is written to disk and no personal data is logged. The endpoint URL
   comes from the environment (never from the request), which keeps SSRF out.
   ========================================================================== */

import { NextResponse } from 'next/server';
import { items } from '@/app/catalog/data';
import { unitById, unitOf } from '@/app/catalog/units';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type IncomingLine = { id?: unknown; qty?: unknown; note?: unknown };
type IncomingPayload = {
  reference?: unknown;
  lang?: unknown;
  contact?: { name?: unknown; company?: unknown; phone?: unknown; notes?: unknown };
  lines?: IncomingLine[];
  message?: unknown;
};

const MAX_QTY = 999999;

function clean(value: unknown, max: number): string {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max)
    : '';
}

function webhookUrl(): URL | null {
  const raw = process.env.ORDER_WEBHOOK_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    // HTTPS everywhere; plain HTTP is only allowed for local testing of a webhook.
    const local = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    if (url.protocol !== 'https:' && !(url.protocol === 'http:' && local)) return null;
    return url;
  } catch {
    return null;
  }
}

export async function GET() {
  // Lets an operator confirm the deployment is wired to the order inbox.
  return NextResponse.json({ configured: webhookUrl() !== null });
}

export async function POST(request: Request) {
  let body: IncomingPayload;
  try {
    body = (await request.json()) as IncomingPayload;
  } catch {
    return NextResponse.json({ ok: false, mode: 'fallback', reason: 'invalid-json' }, { status: 400 });
  }

  const catalog = new Map(items.map((it) => [it.id, it]));

  const lines = (Array.isArray(body.lines) ? body.lines : [])
    .map((line) => ({
      id: clean(line?.id, 80),
      qty: Number(line?.qty),
      note: clean(line?.note, 300),
    }))
    .filter((line) => catalog.has(line.id) && Number.isFinite(line.qty) && line.qty > 0 && line.qty <= MAX_QTY)
    .slice(0, items.length)
    .map((line) => {
      const item = catalog.get(line.id)!;
      const info = unitOf(line.id);
      return {
        id: line.id,
        qty: line.qty,
        note: line.note,
        unit: info.unit,
        unitLabelAr: info.sheetLabel ?? unitById[info.unit].ar.short,
        unitLabelEn: unitById[info.unit].en.short,
        nameAr: item.ar.name,
        nameEn: item.en.name,
        group: item.group,
        source: info.source,
      };
    });

  if (lines.length === 0) {
    return NextResponse.json({ ok: false, mode: 'fallback', reason: 'empty-order' }, { status: 400 });
  }

  const contact = {
    name: clean(body.contact?.name, 120),
    company: clean(body.contact?.company, 120),
    phone: clean(body.contact?.phone, 60),
    notes: clean(body.contact?.notes, 1000),
  };

  if (!contact.name || !contact.phone) {
    return NextResponse.json({ ok: false, mode: 'fallback', reason: 'missing-contact' }, { status: 400 });
  }

  const reference = clean(body.reference, 40) || `NB-${Date.now().toString(36).toUpperCase()}`;

  const record = {
    reference,
    createdAt: new Date().toISOString(),
    lang: body.lang === 'en' ? 'en' : 'ar',
    contact,
    lines,
    message: clean(body.message, 8000),
  };

  const url = webhookUrl();
  if (!url) {
    return NextResponse.json({ ok: false, mode: 'fallback', reason: 'not-configured', reference });
  }

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    });
    if (!upstream.ok) throw new Error(`upstream ${upstream.status}`);
    return NextResponse.json({ ok: true, mode: 'submitted', reference });
  } catch {
    // Never lose the order: the UI falls back to WhatsApp / email in this case.
    return NextResponse.json({ ok: false, mode: 'fallback', reason: 'upstream-error', reference }, { status: 502 });
  }
}
