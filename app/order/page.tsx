'use client';

/**
 * /order — step 2 of the order flow: REVIEW ONLY.
 *
 * The page never browses the catalog. It reads the shared draft written by
 * /catalog (app/catalog/draft.ts, `nilebed-order-v1`) and lists ONLY the items
 * the visitor picked there, with a quantity field per line. From here the
 * visitor confirms the quantities, adds contact details and confirms the order.
 *
 * No prices, no stock figures, no database: the order is posted to
 * /api/order (optional webhook → Google Sheet) or sent as a ready-made
 * WhatsApp / e-mail message when no webhook is configured.
 */

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, ClipboardList, Globe2, Mail, Minus,
  Moon, Phone, Plus, Send, ShoppingBag, Sun, Trash2,
} from 'lucide-react';
import { groups, items, type CatalogItem } from '../catalog/data';
import { unitById, unitOf, type UnitId } from '../catalog/units';
import {
  STORAGE_KEY, emptyContact, makeReference, pickWithoutQuantity, readDraft, writeDraft, type Draft,
} from '../catalog/draft';
import './order.css';

type Lang = 'ar' | 'en';
type Theme = 'light' | 'dark';
type Step = 'review' | 'contact' | 'success';

const WA = '201090000676';
const EMAIL = 'info@nilebed.com';

const copy = {
  ar: {
    home: 'الرئيسية',
    catalog: 'الكتالوج',
    order: 'مراجعة الطلب',
    contact: 'تواصل',
    eyebrow: 'مراجعة الطلب',
    title: 'راجع أصنافك وحدّد الكميات',
    intro: 'الصفحة دي فيها الأصناف اللي اخترتها من الكتالوج بس. حدّد الكمية المطلوبة لكل صنف، راجع الملخص، وبعدها أكّد الطلب عشان فريق نايل بد يراجعه ويتواصل معاك.',
    help: 'محتاج مساعدة؟ كلّمنا',
    whatsapp: 'واتساب',
    step1: 'مراجعة الكميات',
    step2: 'تأكيد الطلب',
    itemsWord: (n: number) => (n === 1 ? 'صنف واحد' : `${n} أصناف`),
    unitsWord: (n: number) => (n === 1 ? 'وحدة قياس واحدة' : `${n} وحدات قياس`),
    reviewTitle: 'الأصناف المختارة',
    reviewIntro: 'دول كل الأصناف اللي اخترتها من الكتالوج. الكمية إلزامية لكل صنف قبل التأكيد، وتقدر تحذف أي صنف أو تضيف ملاحظة.',
    addMore: 'اختار أصناف تانية من الكتالوج',
    quantity: 'الكمية المطلوبة',
    quantityPh: 'اكتب الكمية',
    quantityShort: 'حدد الكمية',
    unitPrefix: 'يُطلب بـ',
    estimated: 'وحدة تقديرية',
    estimateHelp: 'وحدة البيع دي مستنتجة من نفس فئة الصنف في الجرد، وفريقنا هيأكدها معاك قبل التوريد.',
    noteLabel: 'ملاحظة على الصنف (اختياري)',
    notePh: 'مثال: مقاس أو لون أو تفاصيل إضافية',
    remove: 'حذف الصنف',
    less: 'تقليل الكمية',
    more: 'زيادة الكمية',
    quick: 'كميات سريعة',
    emptyTitle: 'لسه ما اخترتش أي أصناف',
    emptyBody: 'كل أصناف الطلب بتتختار من الكتالوج الأول. لما تختار اللي محتاجه، هتلاقي هنا الأصناف دي بس — تحدد كميتها وتأكد طلبك.',
    emptyCta: 'افتح الكتالوج واختار أصناف',
    emptyHint: 'اختياراتك محفوظة على جهازك، وتقدر ترجع تكمل في أي وقت.',
    summary: 'ملخص الطلب',
    summaryUnits: 'الكميات حسب الوحدة',
    summaryNote: 'مفيش أسعار أو مبالغ في الصفحة دي. السعر والتوافر بيتأكدوا مع الفريق بعد مراجعة الطلب.',
    confirmQuantities: 'تأكيد الكميات',
    clear: 'مسح كل الأصناف',
    clearConfirm: 'تمسح كل الأصناف من الطلب؟',
    quantityError: 'حدد كمية لكل صنف قبل التأكيد.',
    contactTitle: 'بيانات التواصل وتأكيد الطلب',
    contactIntro: 'اكتب بياناتك، وهنراجع معاك المواصفات والكميات والتوافر والسعر قبل التوريد.',
    name: 'الاسم',
    company: 'الشركة أو المصنع',
    phone: 'رقم الموبايل',
    notes: 'ملاحظات إضافية',
    namePh: 'اكتب اسمك',
    companyPh: 'اسم الشركة (اختياري)',
    phonePh: '01xxxxxxxxx',
    notesPh: 'ميعاد أو مكان التوريد أو أي تفاصيل إضافية',
    nameError: 'اكتب اسمك عشان نعرف نخاطبك.',
    phoneError: 'اكتب رقم موبايل للتواصل.',
    editQuantities: 'تعديل الكميات',
    confirmSend: 'تأكيد وإرسال الطلب',
    sending: 'جاري تأكيد طلبك…',
    copy: 'نسخ تفاصيل الطلب',
    copied: 'اتنسخت التفاصيل',
    mail: 'إرسال بالبريد',
    fallback: 'طلبك جاهز للإرسال',
    fallbackBody: 'الاستقبال المباشر غير متصل حالياً. ابعت نفس تفاصيل الطلب من واتساب أو البريد، وفريقنا هيراجعه ويتواصل معاك.',
    error: 'حصلت مشكلة أثناء الإرسال',
    errorBody: 'طلبك لسه محفوظ على جهازك. جرّب تاني أو ابعته من واتساب.',
    success: 'طلبك وصل بنجاح',
    successBody: (r: string) => `استلمنا طلبك رقم ${r}. فريق نايل بد هيراجعه ويتواصل معاك لتأكيد المواصفات والتوافر والسعر.`,
    reference: 'رقم الطلب',
    newOrder: 'ابدأ طلب جديد',
    viewCatalog: 'الكتالوج',
    noPrice: 'الأسعار والتوافر يُؤكَّدان مع الفريق.',
    dark: 'الوضع الليلي',
    light: 'الوضع النهاري',
    language: 'English',
    footer: 'خامات المراتب وتصنيع السوست · مصر',
    loading: 'جاري تحميل اختياراتك…',
  },
  en: {
    home: 'Home',
    catalog: 'Catalog',
    order: 'Review order',
    contact: 'Contact',
    eyebrow: 'Order review',
    title: 'Review your items and set quantities',
    intro: 'This page lists only the items you picked in the catalog. Set the quantity for each item, check the summary, then confirm the order so the Nile Bed team can review it and get back to you.',
    help: 'Need help? Talk to us',
    whatsapp: 'WhatsApp',
    step1: 'Review quantities',
    step2: 'Confirm order',
    itemsWord: (n: number) => (n === 1 ? '1 item' : `${n} items`),
    unitsWord: (n: number) => (n === 1 ? '1 unit of measure' : `${n} units of measure`),
    reviewTitle: 'Selected items',
    reviewIntro: 'These are exactly the items you picked in the catalog. A quantity is required for every item before confirmation; you can remove an item or add a note.',
    addMore: 'Pick more items in the catalog',
    quantity: 'Quantity required',
    quantityPh: 'Enter quantity',
    quantityShort: 'Set quantity',
    unitPrefix: 'Sold by',
    estimated: 'Estimated unit',
    estimateHelp: 'This unit is inferred from the same product family on the stock sheet and will be confirmed by the team before supply.',
    noteLabel: 'Item note (optional)',
    notePh: 'e.g. size, colour or extra details',
    remove: 'Remove item',
    less: 'Decrease quantity',
    more: 'Increase quantity',
    quick: 'Quick quantities',
    emptyTitle: 'No items selected yet',
    emptyBody: 'Every order line is picked in the catalog first. Once you choose what you need, those items appear here alone — set the quantities and confirm.',
    emptyCta: 'Open the catalog and pick items',
    emptyHint: 'Your selection is saved on this device, so you can come back and finish later.',
    summary: 'Order summary',
    summaryUnits: 'Quantities by unit',
    summaryNote: 'No prices or totals appear on this page. Pricing and availability are confirmed by the team after reviewing the order.',
    confirmQuantities: 'Confirm quantities',
    clear: 'Remove all items',
    clearConfirm: 'Remove all items from the order?',
    quantityError: 'Enter a quantity for this item.',
    contactTitle: 'Contact details & confirm',
    contactIntro: 'Add your details. The team will review specifications, quantities, availability and pricing with you before supply.',
    name: 'Name',
    company: 'Company or factory',
    phone: 'Mobile number',
    notes: 'Additional notes',
    namePh: 'Your name',
    companyPh: 'Company name (optional)',
    phonePh: '+20…',
    notesPh: 'Delivery date, location or any extra details',
    nameError: 'Please enter your name.',
    phoneError: 'Please enter a mobile number.',
    editQuantities: 'Edit quantities',
    confirmSend: 'Confirm & send order',
    sending: 'Confirming your order…',
    copy: 'Copy order details',
    copied: 'Details copied',
    mail: 'Send by email',
    fallback: 'Your order is ready to send',
    fallbackBody: 'Direct order reception is not connected right now. Send the same order details via WhatsApp or email and the team will review it.',
    error: 'Something went wrong',
    errorBody: 'Your order is still saved on this device. Try again or send it via WhatsApp.',
    success: 'Your order was received',
    successBody: (r: string) => `We received order ${r}. The Nile Bed team will review it and contact you to confirm specifications, availability and pricing.`,
    reference: 'Order reference',
    newOrder: 'Start a new order',
    viewCatalog: 'Catalog',
    noPrice: 'Prices and availability are confirmed with the team.',
    dark: 'Dark mode',
    light: 'Light mode',
    language: 'العربية',
    footer: 'Mattress materials & spring manufacturing · Egypt',
    loading: 'Loading your selection…',
  },
};

const msg = {
  ar: {
    head: 'مرحبًا نايل بد، أرغب في طلب الخامات التالية:',
    ref: 'رقم الطلب',
    name: 'الاسم',
    company: 'الشركة',
    phone: 'الهاتف',
    notes: 'ملاحظات',
    note: 'ملاحظة',
    end: 'برجاء تأكيد المواصفات النهائية والتوافر والسعر. شكرًا.',
    subject: 'طلب خامات — نايل بد',
  },
  en: {
    head: 'Hello Nile Bed, I would like to request the following materials:',
    ref: 'Order reference',
    name: 'Name',
    company: 'Company',
    phone: 'Phone',
    notes: 'Notes',
    note: 'Note',
    end: 'Please confirm final specifications, availability and pricing. Thank you.',
    subject: 'Material enquiry — Nile Bed',
  },
};

/** Suggested first quantities, per unit of measure. */
const quickAmounts: Record<UnitId, number[]> = {
  roll: [1, 5, 10],
  m3: [1, 2, 5],
  tin: [1, 3, 5],
  bolt: [1, 3, 5],
  carton: [1, 2, 5],
  kg: [10, 50, 100],
  pcs: [10, 50, 100],
};

function val(v?: string): number {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Normalise typed quantities: Arabic-Indic digits, commas as decimal marks. */
function qtyText(v: string): string {
  return v
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٫,،]/g, '.')
    .replace(/[^\d.]/g, '');
}

function fmt(v: number): string {
  return String(Number(v.toFixed(3)));
}

/** The unit a line is sold in, in the visitor's language. */
function unitLabelOf(itemId: string, ar: boolean): string {
  const info = unitOf(itemId);
  const def = unitById[info.unit];
  return ar ? info.sheetLabel || def.ar.short : def.en.short;
}

function Logo() {
  return (
    <span className="brand-logo is-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-light" src="/logo-on-light.svg" alt="Nile Bed" width={454} height={270} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-alt" src="/logo-on-dark.svg" alt="" aria-hidden="true" width={454} height={270} />
    </span>
  );
}

export default function OrderPage() {
  const [lang, setLang] = useState<Lang>('ar');
  const [theme, setTheme] = useState<Theme>('light');
  const [step, setStep] = useState<Step>('review');
  const [draft, setDraft] = useState<Draft>({ order: {}, contact: { ...emptyContact }, reference: '' });
  const [loaded, setLoaded] = useState(false);
  const [missingIds, setMissingIds] = useState<string[]>([]);
  const [errors, setErrors] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'fallback' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const ar = lang === 'ar';
  const t = copy[lang];
  const m = msg[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
  }, [lang, ar]);

  // Load the shared draft written by /catalog. Nothing is picked here.
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

    let loadedDraft = readDraft();
    if (!loadedDraft.reference.trim()) loadedDraft = { ...loadedDraft, reference: makeReference() };

    // Backwards-compatible deep link: /order?add=<id> records the item with an
    // empty quantity, then the parameter is removed so a reload cannot re-add it.
    const add = new URLSearchParams(window.location.search).get('add');
    if (add) loadedDraft = pickWithoutQuantity(loadedDraft, add);

    setDraft(loadedDraft);
    setLoaded(true);
    writeDraft(loadedDraft);
    if (add) window.history.replaceState({}, '', window.location.pathname);

    // Keep this page in step with the catalog in another tab.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setDraft(readDraft());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (loaded) writeDraft(draft);
  }, [draft, loaded]);

  /** Exactly the items picked in the catalog — never the whole catalog. */
  const selected = useMemo(() => items.filter((it) => Boolean(draft.order[it.id])), [draft.order]);

  const unitCount = useMemo(() => {
    const set = new Set<UnitId>();
    selected.forEach((it) => set.add(unitOf(it.id).unit));
    return set.size;
  }, [selected]);

  const unitTotals = useMemo(() => {
    const totals = new Map<UnitId, number>();
    selected.forEach((it) => {
      const q = val(draft.order[it.id]?.qty);
      if (q <= 0) return;
      const unit = unitOf(it.id).unit;
      totals.set(unit, (totals.get(unit) ?? 0) + q);
    });
    return [...totals.entries()];
  }, [selected, draft.order]);

  const message = useMemo(() => {
    const lines = selected.map((it, index) => {
      const base = `${index + 1}. ${ar ? it.ar.name : it.en.name} — ${fmt(val(draft.order[it.id]?.qty))} ${unitLabelOf(it.id, ar)}`;
      const note = draft.order[it.id]?.note ?? '';
      return note ? `${base} (${m.note}: ${note})` : base;
    });
    const contact = draft.contact;
    const details = [
      contact.name && `${m.name}: ${contact.name}`,
      contact.company && `${m.company}: ${contact.company}`,
      contact.phone && `${m.phone}: ${contact.phone}`,
      contact.notes && `${m.notes}: ${contact.notes}`,
    ].filter(Boolean);
    return [m.head, `${m.ref}: ${draft.reference}`, lines.join('\n'), details.join('\n'), m.end]
      .filter(Boolean)
      .join('\n\n');
  }, [selected, draft.order, draft.contact, draft.reference, ar, m]);

  const wa = `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(message)}`;

  function setLine(id: string, patch: { qty?: string; note?: string }) {
    setDraft((prev) => {
      const current = prev.order[id];
      if (!current) return prev;
      return { ...prev, order: { ...prev.order, [id]: { ...current, ...patch } } };
    });
  }

  function setQty(id: string, raw: string) {
    const def = unitById[unitOf(id).unit];
    let v = qtyText(raw).slice(0, 12);
    if (Number(v) > 999999) v = '999999';
    if (!def.decimal && v.includes('.')) v = String(Math.round(Number(v)));
    setLine(id, { qty: v });
    setMissingIds((prev) => prev.filter((x) => x !== id));
  }

  function bump(id: string, delta: number) {
    const def = unitById[unitOf(id).unit];
    const next = Math.max(0, Math.min(999999, val(draft.order[id]?.qty) + delta * def.step));
    setQty(id, next ? fmt(next) : '');
  }

  function remove(id: string) {
    setDraft((prev) => {
      const order = { ...prev.order };
      delete order[id];
      return { ...prev, order };
    });
    setMissingIds((prev) => prev.filter((x) => x !== id));
  }

  function clearAll() {
    if (!window.confirm(t.clearConfirm)) return;
    setDraft((prev) => ({ ...prev, order: {} }));
    setMissingIds([]);
    setStatus('idle');
  }

  function continueToContact() {
    if (!selected.length) return;
    const missing = selected.filter((it) => val(draft.order[it.id]?.qty) <= 0).map((it) => it.id);
    if (missing.length) {
      setMissingIds(missing);
      window.requestAnimationFrame(() => {
        const el = document.getElementById(`qty-${missing[0]}`);
        el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        el?.focus({ preventScroll: true });
      });
      return;
    }
    setMissingIds([]);
    setStep('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function copyDetails() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function submit() {
    if (!selected.length || sending) return;
    const missing = selected.filter((it) => val(draft.order[it.id]?.qty) <= 0).map((it) => it.id);
    if (missing.length) {
      setMissingIds(missing);
      setStep('review');
      return;
    }
    if (!draft.contact.name.trim() || !draft.contact.phone.trim()) {
      setErrors(true);
      return;
    }
    setErrors(false);
    setSending(true);
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: draft.reference,
          lang,
          contact: draft.contact,
          lines: selected.map((it) => ({
            id: it.id,
            qty: val(draft.order[it.id]?.qty),
            note: draft.order[it.id]?.note ?? '',
          })),
          message,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; mode?: string; reference?: string };
      if (data.ok && data.mode === 'submitted') {
        setDraft((prev) => ({ ...prev, order: {}, reference: data.reference || prev.reference }));
        setStatus('idle');
        setStep('success');
      } else {
        setStatus('fallback');
      }
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  }

  const steps = [t.step1, t.step2];
  const stepIndex = step === 'review' ? 0 : 1;

  const reviewItem = (item: CatalogItem) => {
    const info = unitOf(item.id);
    const def = unitById[info.unit];
    const name = ar ? item.ar.name : item.en.name;
    const group = groups.find((g) => g.id === item.group);
    const groupTitle = group ? (ar ? group.ar.title : group.en.title) : '';
    const badge = ar ? item.ar.badge : item.en.badge;
    const unitLabel = unitLabelOf(item.id, ar);
    const qty = draft.order[item.id]?.qty ?? '';
    const isMissing = missingIds.includes(item.id);

    return (
      <article key={item.id} className={`or-line${isMissing ? ' is-missing' : ''}`}>
        <div className="or-line-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" loading="lazy" decoding="async" width={112} height={112} />
        </div>

        <div className="or-line-body">
          <div className="or-line-head">
            <h3>{name}</h3>
            {badge && <span className="or-line-badge">{badge}</span>}
          </div>

          <p className="or-line-meta">
            {groupTitle && <span>{groupTitle}</span>}
            <span className="or-line-sep" aria-hidden="true">·</span>
            <span>{t.unitPrefix} <strong>{unitLabel}</strong></span>
            {info.source === 'family' && (
              <span className="or-line-est" title={t.estimateHelp}>{t.estimated}</span>
            )}
          </p>

          <div className="or-line-controls">
            <div className="or-line-field">
              <label htmlFor={`qty-${item.id}`}>{t.quantity}</label>
              <div className={`or-qty${isMissing ? ' is-missing' : ''}`} dir="ltr">
                <button
                  type="button"
                  onClick={() => bump(item.id, -1)}
                  aria-label={`${t.less} — ${name}`}
                  disabled={val(qty) <= 0}
                >
                  <Minus size={14} />
                </button>
                <input
                  id={`qty-${item.id}`}
                  value={qty}
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder={t.quantityPh}
                  aria-label={`${t.quantity} — ${name}`}
                  aria-invalid={isMissing}
                  aria-describedby={isMissing ? `qty-error-${item.id}` : undefined}
                  onChange={(e) => setQty(item.id, e.target.value)}
                  onBlur={() => {
                    const v = val(draft.order[item.id]?.qty);
                    if (v) setQty(item.id, fmt(def.decimal ? v : Math.round(v)));
                  }}
                />
                <span className="or-qty-unit">{unitLabel}</span>
                <button
                  type="button"
                  onClick={() => bump(item.id, 1)}
                  aria-label={`${t.more} — ${name}`}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="or-line-field or-line-note">
              <label htmlFor={`note-${item.id}`}>{t.noteLabel}</label>
              <input
                id={`note-${item.id}`}
                value={draft.order[item.id]?.note ?? ''}
                maxLength={300}
                placeholder={t.notePh}
                onChange={(e) => setLine(item.id, { note: e.target.value.slice(0, 300) })}
              />
            </div>
          </div>

          {isMissing && (
            <small className="or-line-error" id={`qty-error-${item.id}`}>{t.quantityError}</small>
          )}

          {val(qty) <= 0 && (
            <div className="or-line-quick">
              <span>{t.quick}</span>
              {quickAmounts[info.unit].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setQty(item.id, String(amount))}
                  aria-label={`${amount} ${unitLabel}`}
                >
                  +{amount}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="or-line-remove"
          onClick={() => remove(item.id)}
          aria-label={`${t.remove} — ${name}`}
          title={t.remove}
        >
          <Trash2 size={16} />
        </button>
      </article>
    );
  };

  return (
    <main className="nile order-page order-redesign" dir={ar ? 'rtl' : 'ltr'} lang={lang}>
      <header className="topbar order-topbar">
        <a className="brand" href="/" aria-label="Nile Bed"><Logo /></a>
        <nav className="nav order-nav" aria-label={ar ? 'التنقل الرئيسي' : 'Main navigation'}>
          <a href="/">{t.home}</a>
          <a href="/catalog">{t.catalog}</a>
          <a href="/order" aria-current="page">{t.order}</a>
          <a href="/#contact">{t.contact}</a>
        </nav>
        <div className="nav-actions">
          <button
            className="theme-switch"
            type="button"
            onClick={() => {
              const next = theme === 'dark' ? 'light' : 'dark';
              setTheme(next);
              document.documentElement.dataset.theme = next;
              try { localStorage.setItem('nilebed-theme-v3', next); } catch { /* storage may be unavailable */ }
            }}
            aria-label={theme === 'dark' ? t.light : t.dark}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? t.light : t.dark}</span>
          </button>
          <button className="lang-switch" type="button" onClick={() => setLang(ar ? 'en' : 'ar')}>
            <Globe2 size={15} />{t.language}
          </button>
        </div>
      </header>

      {step !== 'success' && (
        <>
          <section className="or-hero">
            <div className="or-hero-inner">
              <span className="or-eyebrow">{t.eyebrow}</span>
              <h1>{t.title}</h1>
              <p>{t.intro}</p>
              <div className="or-hero-meta" aria-live="polite">
                <span><ShoppingBag size={14} />{t.itemsWord(selected.length)}</span>
                <span><ClipboardList size={14} />{t.unitsWord(unitCount)}</span>
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">
                  <Phone size={14} />{t.help}<ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </section>

          <div className="or-progress" aria-label={ar ? 'خطوات الطلب' : 'Order steps'}>
            {steps.map((label, index) => (
              <div
                key={label}
                className={`or-progress-step${index <= stepIndex ? ' is-active' : ''}${index === stepIndex ? ' is-current' : ''}`}
                aria-current={index === stepIndex ? 'step' : undefined}
              >
                <span>{`0${index + 1}`}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </>
      )}

      {step === 'review' && (
        <section className="or-review">
          {!loaded ? (
            <div className="or-panel or-panel-main or-skeleton" aria-busy="true" aria-live="polite">
              <span className="or-sr-only">{t.loading}</span>
              {[0, 1, 2].map((i) => (
                <div className="or-skeleton-line" key={i}>
                  <span className="or-skeleton-media" />
                  <span className="or-skeleton-text" />
                </div>
              ))}
            </div>
          ) : selected.length === 0 ? (
            <div className="or-empty-state">
              <span className="or-empty-icon"><ShoppingBag size={26} /></span>
              <h2>{t.emptyTitle}</h2>
              <p>{t.emptyBody}</p>
              <a className="or-primary" href="/catalog">
                <ClipboardList size={16} />{t.emptyCta}
                {ar ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </a>
              <small>{t.emptyHint}</small>
            </div>
          ) : (
            <>
              <div className="or-panel or-panel-main">
                <div className="or-panel-head">
                  <div>
                    <span className="or-panel-kicker">01</span>
                    <h2>{t.reviewTitle}</h2>
                    <p>{t.reviewIntro}</p>
                  </div>
                  <a className="or-ghost-link" href="/catalog">
                    <Plus size={15} />{t.addMore}
                  </a>
                </div>

                {missingIds.length > 0 && (
                  <div className="or-alert is-error" role="alert">{t.quantityError}</div>
                )}

                <div className="or-line-list">{selected.map(reviewItem)}</div>

                <button type="button" className="or-clear" onClick={clearAll}>
                  <Trash2 size={14} />{t.clear}
                </button>
              </div>

              <aside className="or-summary" aria-label={t.summary}>
                <div className="or-summary-head">
                  <span>{t.summary}</span>
                  <strong>{t.itemsWord(selected.length)}</strong>
                </div>

                <div className="or-summary-units">
                  <span className="or-summary-label">{t.summaryUnits}</span>
                  <ul>
                    {unitTotals.map(([unit, total]) => (
                      <li key={unit}>
                        <span>{ar ? unitById[unit].ar.short : unitById[unit].en.short}</span>
                        <strong dir="ltr">{fmt(total)}</strong>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="or-summary-note">{t.summaryNote}</p>

                <button type="button" className="or-primary or-summary-cta" onClick={continueToContact}>
                  {t.confirmQuantities}
                  {ar ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </button>
                <a className="or-summary-add" href="/catalog"><Plus size={14} />{t.addMore}</a>
              </aside>
            </>
          )}
        </section>
      )}

      {step === 'contact' && (
        <section className="or-contact">
          <div className="or-contact-main or-panel">
            <div className="or-panel-head">
              <div>
                <span className="or-panel-kicker">02</span>
                <h2>{t.contactTitle}</h2>
                <p>{t.contactIntro}</p>
              </div>
              <button className="or-ghost-link" type="button" onClick={() => { setStep('review'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                {ar ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                {t.editQuantities}
              </button>
            </div>

            <form
              className="or-form"
              onSubmit={(e) => { e.preventDefault(); void submit(); }}
            >
              <div className="or-fields">
                <label className={errors && !draft.contact.name.trim() ? 'has-error' : ''}>
                  {t.name} <em>*</em>
                  <input
                    autoComplete="name"
                    value={draft.contact.name}
                    onChange={(e) => {
                      setDraft((prev) => ({ ...prev, contact: { ...prev.contact, name: e.target.value } }));
                      setErrors(false);
                    }}
                    placeholder={t.namePh}
                  />
                  {errors && !draft.contact.name.trim() && <small>{t.nameError}</small>}
                </label>

                <label>
                  {t.company}
                  <input
                    autoComplete="organization"
                    value={draft.contact.company}
                    onChange={(e) => setDraft((prev) => ({ ...prev, contact: { ...prev.contact, company: e.target.value } }))}
                    placeholder={t.companyPh}
                  />
                </label>

                <label className={errors && !draft.contact.phone.trim() ? 'has-error' : ''}>
                  {t.phone} <em>*</em>
                  <input
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    dir="ltr"
                    value={draft.contact.phone}
                    onChange={(e) => {
                      setDraft((prev) => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }));
                      setErrors(false);
                    }}
                    placeholder={t.phonePh}
                  />
                  {errors && !draft.contact.phone.trim() && <small>{t.phoneError}</small>}
                </label>

                <label className="or-wide">
                  {t.notes}
                  <textarea
                    rows={3}
                    value={draft.contact.notes}
                    onChange={(e) => setDraft((prev) => ({ ...prev, contact: { ...prev.contact, notes: e.target.value } }))}
                    placeholder={t.notesPh}
                  />
                </label>
              </div>

              {status === 'fallback' && (
                <div className="or-alert" role="status">
                  <strong>{t.fallback}</strong>
                  <p>{t.fallbackBody}</p>
                  <div className="or-fallback-actions">
                    <a className="or-wa" href={wa} target="_blank" rel="noopener noreferrer"><Phone size={15} />{t.whatsapp}</a>
                    <a href={mail}><Mail size={15} />{t.mail}</a>
                    <button type="button" onClick={() => void copyDetails()}>
                      {copied ? <Check size={15} /> : <ClipboardList size={15} />}
                      {copied ? t.copied : t.copy}
                    </button>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="or-alert is-error" role="alert">
                  <strong>{t.error}</strong>
                  <p>{t.errorBody}</p>
                  <div className="or-fallback-actions">
                    <a className="or-wa" href={wa} target="_blank" rel="noopener noreferrer"><Phone size={15} />{t.whatsapp}</a>
                  </div>
                </div>
              )}

              <button className="or-primary or-submit" type="submit" disabled={sending || !selected.length}>
                <Send size={16} />{sending ? t.sending : t.confirmSend}
              </button>
              <p className="or-submit-note">{t.noPrice}</p>
            </form>
          </div>

          <aside className="or-summary or-confirm" aria-label={t.summary}>
            <div className="or-summary-head">
              <span>{t.summary}</span>
              <strong>{t.itemsWord(selected.length)}</strong>
            </div>
            <ul className="or-confirm-list">
              {selected.map((it) => {
                const qty = val(draft.order[it.id]?.qty);
                return (
                  <li key={it.id}>
                    <span>
                      {ar ? it.ar.name : it.en.name}
                      {draft.order[it.id]?.note && <small>{draft.order[it.id].note}</small>}
                    </span>
                    <strong dir="ltr">
                      {qty > 0 ? fmt(qty) : '—'} <em>{unitLabelOf(it.id, ar)}</em>
                    </strong>
                  </li>
                );
              })}
            </ul>
            <p className="or-summary-note">{t.summaryNote}</p>
            <button
              type="button"
              className="or-summary-add"
              onClick={() => { setStep('review'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <ClipboardList size={14} />{t.editQuantities}
            </button>
          </aside>
        </section>
      )}

      {step === 'success' && (
        <section className="or-success-panel" role="status">
          <span><Check size={30} /></span>
          <h2>{t.success}</h2>
          <p>{t.successBody(draft.reference)}</p>
          <strong>{t.reference}: {draft.reference}</strong>
          <div className="or-success-actions">
            <a
              className="or-primary"
              href="/catalog"
              onClick={() => {
                setDraft((prev) => ({ ...prev, order: {}, reference: makeReference() }));
                setStatus('idle');
                setStep('review');
                setMissingIds([]);
              }}
            >
              {t.newOrder}
            </a>
            <a className="or-ghost-link" href="/">{t.home}</a>
          </div>
        </section>
      )}

      <footer className="footer or-footer">
        <a className="brand footer-brand" href="/"><Logo /></a>
        <span>{t.footer}</span>
        <a href="/catalog">{t.viewCatalog}</a>
        <small>© {new Date().getFullYear()} NILE BED</small>
      </footer>
    </main>
  );
}
