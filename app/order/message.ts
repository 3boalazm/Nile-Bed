/**
 * The order message — ONE builder used by the live preview, the WhatsApp link,
 * the mail link and the clipboard fallback.
 *
 * The old version produced a flat numbered list:
 *
 *     1. سوستة 2.4 — 14.5 سم / قطر 8.5 سم — 500 كجم
 *     2. فريم 4.5 — 200 كجم
 *
 * which is readable but loses everything the team actually needs: the group each
 * line belongs to, the technical specs of the item, whether the unit of measure
 * was written on the stock sheet or inferred, and a clean contact block.
 *
 * This builder emits a structured brief:
 *
 *     طلب توريد — نايل بد
 *     ━━━━━━━━━━━━━━━━━━
 *     رقم الطلب: NB-…
 *     التاريخ: ٢ نوفمبر ٢٠٢٦
 *     عدد الأصناف: 5 · وحدات القياس: 4
 *
 *     ▸ السوست والفريم والسلك
 *     1. سوستة 2.4 — 14.5 سم / قطر 8.5 سم
 *        الكمية: 500 كجم
 *        المواصفات: قطر السلك 2.4 مم · ارتفاع 14.5 سم · قطر السوستة 8.5 سم · هبوط ≤ 1.2 سم
 *
 *     ▸ بيانات التواصل
 *     الاسم: …
 *
 * Plain text on purpose: it has to survive WhatsApp, mail clients and a copy
 * button without any markup.
 */

import { groups, items, type CatalogItem } from '../catalog/data';
import { unitById, unitOf, type UnitId } from '../catalog/units';

export type MessageLang = 'ar' | 'en';

export type MessageLine = {
  item: CatalogItem;
  /** Numeric quantity, already validated. */
  qty: number;
  /** Optional per-line note written by the visitor. */
  note?: string;
};

export type MessageInput = {
  lang: MessageLang;
  reference: string;
  lines: MessageLine[];
  contact: { name?: string; company?: string; phone?: string; notes?: string };
  /** Injected so tests stay deterministic. */
  now?: Date;
};

const T = {
  ar: {
    title: 'طلب توريد — نايل بد',
    reference: 'رقم الطلب',
    date: 'التاريخ',
    lines: 'عدد الأصناف',
    units: 'وحدات القياس',
    items: 'الأصناف المطلوبة',
    specs: 'المواصفات',
    qty: 'الكمية',
    inferred: 'وحدة القياس مستنتجة — تُؤكَّد مع الفريق',
    note: 'ملاحظة',
    contact: 'بيانات التواصل',
    name: 'الاسم',
    company: 'الشركة',
    phone: 'الهاتف',
    contactNotes: 'ملاحظات إضافية',
    closing: 'برجاء تأكيد المواصفات النهائية والتوافر والسعر.',
    thanks: 'شكرًا — نايل بد',
    subject: 'طلب توريد — نايل بد',
    and: ' · ',
    colon: ': ',
  },
  en: {
    title: 'Supply request — Nile Bed',
    reference: 'Reference',
    date: 'Date',
    lines: 'Items',
    units: 'Units of measure',
    items: 'Requested items',
    specs: 'Specs',
    qty: 'Quantity',
    inferred: 'Unit inferred — confirmed with the team',
    note: 'Note',
    contact: 'Contact details',
    name: 'Name',
    company: 'Company',
    phone: 'Phone',
    contactNotes: 'Additional notes',
    closing: 'Please confirm final specifications, availability and pricing.',
    thanks: 'Thank you — Nile Bed',
    subject: 'Supply request — Nile Bed',
    and: ' · ',
    colon: ': ',
  },
} as const;

/** Arabic-Indic digits for the AR register; Latin digits stay Latin in EN. */
const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function localizeDigits(value: string, lang: MessageLang): string {
  if (lang !== 'ar') return value;
  return value.replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);
}

export function formatQty(v: number, lang: MessageLang): string {
  return localizeDigits(String(Number(v.toFixed(3))), lang);
}

const AR_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];
const EN_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * One digit system per message. `Intl('ar-EG')` mixes Arabic-Indic digits with
 * Latin spec numbers ("٨ نوفمبر" beside "2.4 mm"), so the date is assembled by
 * hand and then passed through the same `localizeDigits` as every quantity.
 */
export function formatDate(date: Date, lang: MessageLang): string {
  const d = localizeDigits(String(date.getDate()), lang);
  const y = localizeDigits(String(date.getFullYear()), lang);
  return lang === 'ar'
    ? `${d} ${AR_MONTHS[date.getMonth()]} ${y}`
    : `${date.getDate()} ${EN_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** The unit a line is sold in, in the message's language. */
function unitLabel(itemId: string, lang: MessageLang): string {
  const info = unitOf(itemId);
  const def = unitById[info.unit];
  return lang === 'ar' ? info.sheetLabel || def.ar.short : def.en.short;
}

/** Whether the unit came from the stock sheet or was inferred from the family. */
function unitIsInferred(itemId: string): boolean {
  return unitOf(itemId).source !== 'sheet';
}

/**
 * Up to four specs as a compact sub-line. Each spec already reads "label: value",
 * so they are joined with " · " and prefixed once — never "المواصفات: label: value".
 */
function specSummary(item: CatalogItem, lang: MessageLang): string {
  const specs = lang === 'ar' ? item.ar.specs : item.en.specs;
  return specs
    .slice(0, 4)
    .map((spec) => spec.replace(/\s*:\s*/g, ': ').trim())
    .join(T[lang].and);
}

export type MessageResult = {
  /** The full plain-text brief, ready for WhatsApp / mail / clipboard. */
  text: string;
  /** Mail subject line. */
  subject: string;
  /** Items grouped by catalog group, in catalog order. */
  grouped: Array<{ id: string; label: string; lines: MessageLine[] }>;
  counts: { items: number; units: number };
};

export function buildOrderMessage(input: MessageInput): MessageResult {
  const { lang, reference, lines, contact } = input;
  const t = T[lang];
  const now = input.now ?? new Date();

  // Group in catalog order so the brief reads like the catalog, not like clicks.
  const groupOrder: Array<{ id: string; label: string }> = [];
  for (const item of items) {
    if (!groupOrder.some((g) => g.id === item.group)) {
      groupOrder.push({ id: item.group, label: item.group });
    }
  }

  const grouped = groupOrder
    .map((g) => {
      const groupLines = lines.filter((l) => l.item.group === g.id);
      if (!groupLines.length) return null;
      // The human group label comes from the first item's catalog group meta.
      const first = groupLines[0].item;
      const label = lang === 'ar' ? groupTitleAr(first.group) : groupTitleEn(first.group);
      return { id: g.id, label, lines: groupLines };
    })
    .filter((g): g is { id: string; label: string; lines: MessageLine[] } => g !== null);

  const units = new Set<UnitId>(lines.map((l) => unitOf(l.item.id).unit));

  const blocks: string[] = [];

  blocks.push(t.title);
  blocks.push(
    [
      `${t.reference}${t.colon}${reference}`,
      `${t.date}${t.colon}${formatDate(now, lang)}`,
      `${t.lines}${t.colon}${localizeDigits(String(lines.length), lang)}${t.and}${t.units}${t.colon}${localizeDigits(String(units.size), lang)}`,
    ].join('\n'),
  );

  blocks.push(`— ${t.items} —`);
  let n = 0;
  for (const group of grouped) {
    blocks.push(`▸ ${group.label}`);
    for (const line of group.lines) {
      n += 1;
      const name = lang === 'ar' ? line.item.ar.name : line.item.en.name;
      const rows = [
        `${localizeDigits(String(n), lang)}. ${name}`,
        `   ${t.qty}${t.colon}${formatQty(line.qty, lang)} ${unitLabel(line.item.id, lang)}${unitIsInferred(line.item.id) ? ` (${t.inferred})` : ''}`,
      ];
      const specs = specSummary(line.item, lang);
      if (specs) rows.push(`   ${t.specs}${t.colon}${specs}`);
      if (line.note?.trim()) rows.push(`   ${t.note}${t.colon}${line.note.trim()}`);
      blocks.push(rows.join('\n'));
    }
  }

  const contactRows = [
    contact.name?.trim() && `${t.name}${t.colon}${contact.name.trim()}`,
    contact.company?.trim() && `${t.company}${t.colon}${contact.company.trim()}`,
    contact.phone?.trim() && `${t.phone}${t.colon}${contact.phone.trim()}`,
    contact.notes?.trim() && `${t.contactNotes}${t.colon}${contact.notes.trim()}`,
  ].filter(Boolean) as string[];

  if (contactRows.length) {
    blocks.push(`— ${t.contact} —`);
    blocks.push(contactRows.join('\n'));
  }

  blocks.push(t.closing);
  blocks.push(t.thanks);

  return {
    text: blocks.filter(Boolean).join('\n\n'),
    subject: t.subject,
    grouped,
    counts: { items: lines.length, units: units.size },
  };
}

/** Group titles come straight from the catalog so the two can never drift. */
const titleAr = new Map(groups.map((g) => [g.id, g.ar.title]));
const titleEn = new Map(groups.map((g) => [g.id, g.en.title]));
function groupTitleAr(id: string): string { return titleAr.get(id) ?? id; }
function groupTitleEn(id: string): string { return titleEn.get(id) ?? id; }
