'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, ClipboardList, Copy, Globe2, Info, Mail, Menu, Minus, Moon,
  Phone, Plus, Ruler, Search, Send, ShoppingBag, Sun, Trash2, X,
} from 'lucide-react';
import { groups, items, type CatalogItem } from '../catalog/data';
import { countByUnit, unitById, unitOf, units, type UnitId } from '../catalog/units';
import {
  STORAGE_KEY, emptyContact, makeReference, pickWithoutQuantity, readDraft, writeDraft,
  type Contact, type Line,
} from '../catalog/draft';
import './order.css';

type Lang = 'ar' | 'en';
type Theme = 'light' | 'dark';
type SubmitState = 'idle' | 'sending' | 'submitted' | 'fallback' | 'error';

const WA_NUMBER = '201090000676';
const EMAIL = 'info@nilebed.com';

const copy = {
  ar: {
    nav: ['الرئيسية', 'الكتالوج', 'مراجعة الطلب', 'تواصل'],
    kicker: 'الخطوة ٢ · مراجعة الطلب وتحديد الكميات',
    title: 'راجع طلبك وحدّد الكميات',
    subtitle: 'هنا ظاهر بس الأصناف اللي اخترتها من الكتالوج — مش الكتالوج كله. اكتب الكمية المطلوبة قدام كل صنف حسب وحدة قياسه (رول، م³، صفيحة، توب، كرتونة، كجم/كيلو، عدد)، وملخص الطلب بيتحدّث تلقائي.',
    heroNote: 'الاختيار من الكتالوج اختيار أولي من غير كميات؛ الكمية بتتحدد هنا بس. وحدات القياس من جرد «اصناف المخزون» — الأسعار والأرقام الداخلية غير معروضة.',
    step1: 'الاختيار الأولي من الكتالوج',
    step2: 'مراجعة الطلب وتحديد الكميات',
    addMore: 'أضف أصناف من الكتالوج',
    currentOrder: 'طلبك الحالي',
    quantitiesSet: (done: number, total: number) => `${done} من ${total} صنف كميتها محددة`,
    qtyRequired: 'الكمية مطلوبة',
    missingQty: (n: number) => `فيه ${n} صنف لسه من غير كمية. حدّد كمية كل صنف قبل إرسال الطلب.`,
    pickedEmpty: 'لسه مختارتش أي صنف من الكتالوج.',
    pickedEmptyHint: 'ارجع للكتالوج واختار الأصناف اللي تعجبك (اختيار أولي)، وبعدين ارجع هنا تحدد الكميات.',
    pickedOnly: 'الأصناف المختارة فقط',
    unitsLabel: 'وحدات القياس',
    allUnits: 'كل الوحدات',
    allGroups: 'كل الفئات',
    filterByUnit: 'تصفية حسب وحدة القياس',
    filterByGroup: 'تصفية حسب الفئة',
    searchPlaceholder: 'ابحث عن صنف… مثل: شاسية 18×25، لاتكس، كلبس',
    count: (n: number) => `${n} صنف`,
    products: 'صنف',
    orderBy: 'يُطلب بـ',
    approx: 'تقديري',
    approxTitle: 'وحدة القياس مستنتجة من نفس فئة الصنف في الجرد، وتُؤكَّد مع الفريق قبل التوريد',
    fromSheet: 'حسب الجرد',
    sheetLabel: (s: string) => `مكتوبة في الجرد: ${s}`,
    qty: 'الكمية',
    lineNote: 'ملاحظة على الصنف (مقاس، لون، درجة…)',
    summary: 'ملخص الطلب',
    summaryCount: (n: number, total: number) => `${n} من ${total} صنف محدد الكمية`,
    empty: 'لسه محددتش أي كمية. اكتب الكمية قدام صنف من الأصناف المختارة وهيظهر هنا.',
    emptyHint: 'تقدر تطلب أكتر من صنف من أكتر من وحدة قياس في نفس الأوردر.',
    unitTotals: 'إجمالي حسب الوحدة',
    contactTitle: 'بيانات التواصل',
    required: 'مطلوب',
    nameError: 'اكتب الاسم من فضلك',
    phoneError: 'اكتب رقم هاتف نتواصل معاك عليه',
    name: 'الاسم',
    company: 'الشركة / المصنع',
    phone: 'رقم الهاتف',
    notes: 'ملاحظات عامة على الطلب',
    namePh: 'اسمك',
    companyPh: 'اسم الشركة',
    phonePh: '01xxxxxxxxx',
    notesPh: 'ميعاد التوريد، عنوان التسليم، مواصفات خاصة…',
    sendOrder: 'إرسال الطلب للفريق',
    sending: 'جاري إرسال الطلب…',
    sentTitle: 'تم استلام الطلب',
    sentBody: (ref: string) => `طلبك اتسجّل برقم ${ref}. الفريق هيواصل معاك لتأكيد المواصفات والتوافر والسعر.`,
    fallbackTitle: 'الاستقبال المباشر مش متفعّل دلوقتي',
    fallbackBody: 'الطلب جاهز ومفيش حاجة ضاعت — ابعته لينا عبر واتساب أو البريد بالزرار تحت.',
    errorTitle: 'ما قدرناش نبعت الطلب',
    errorBody: 'جرّب تاني، أو استخدم واتساب / البريد. الطلب لسه محفوظ عندك على الجهاز.',
    submitNote: 'لما استقبال الأوردرات يكون متوصّل، الزرار بيبعت الطلب مباشرة لفريقنا. ولو مش متوصّل، بيجهّز نفس الطلب على واتساب أو البريد.',
    newOrder: 'ابدأ طلب جديد',
    referenceLabel: 'رقم الطلب',
    sendWa: 'إرسال الطلب عبر واتساب',
    sendMail: 'إرسال الطلب بالبريد',
    copy: 'نسخ نص الطلب',
    copied: 'تم النسخ',
    copyFail: 'تعذّر النسخ — استخدم واتساب أو البريد',
    clear: 'تفريغ الطلب',
    clearConfirm: 'تفريغ كل الكميات والملاحظات؟',
    note: 'لما استقبال الأوردرات يكون متفعّل، الطلب بيتبعت مباشرة للفريق مع رقم طلب؛ غير كده الأزرار بتفتح واتساب أو البريد برسالة جاهزة فيها كل صنف وكميته ووحدته. الموقع مش بيخزّن بياناتك على سيرفر، والمواصفات والتوافر والسعر تُؤكَّد مع الفريق.',
    sheetNote: 'وحدات القياس من جرد «اصناف المخزون» (٥٣ بندًا). الأصناف الموسّعة في الكتالوج وحدتها مستنتجة من نفس الفئة ومعلّمة بـ «تقديري». «كجم» و«كيلو» في الجرد هما نفس الوحدة.',
    noResults: 'لا توجد أصناف مطابقة. جرّب كلمة تانية أو غيّر الفلتر.',
    reset: 'إعادة الضبط',
    remove: 'حذف الصنف من الاختيار',
    themeDark: 'الوضع الليلي',
    themeLight: 'الوضع النهاري',
    toggle: 'English',
    footer: 'خامات المراتب وتصنيع السوست · مصر',
    backTop: 'العودة للأعلى',
    menu: 'فتح القائمة',
    close: 'إغلاق القائمة',
  },
  en: {
    nav: ['Home', 'Catalog', 'Review order', 'Contact'],
    kicker: 'STEP 2 · REVIEW ORDER & SET QUANTITIES',
    title: 'Review your order & set quantities',
    subtitle: 'Only the items you picked in the catalog appear here — not the whole catalog. Enter a quantity next to each item in its own unit (roll, m³, tin, bolt, carton, kg/kilo, piece) and the order summary updates automatically.',
    heroNote: 'Picking in the catalog is an initial selection with no quantities; quantities are set here only. Units come from the «اصناف المخزون» stock sheet — prices and internal figures are not published.',
    step1: 'Initial selection from the catalog',
    step2: 'Review order & set quantities',
    addMore: 'Add items from the catalog',
    currentOrder: 'Your current order',
    quantitiesSet: (done: number, total: number) => `${done} of ${total} items have a quantity`,
    qtyRequired: 'Quantity required',
    missingQty: (n: number) => `${n} item(s) still have no quantity. Set a quantity for every picked item before sending the order.`,
    pickedEmpty: 'You have not picked any items from the catalog yet.',
    pickedEmptyHint: 'Go back to the catalog, pick the items you like (initial selection), then come back here to set their quantities.',
    pickedOnly: 'Picked items only',
    unitsLabel: 'Units of measure',
    allUnits: 'All units',
    allGroups: 'All groups',
    filterByUnit: 'Filter by unit of measure',
    filterByGroup: 'Filter by product group',
    searchPlaceholder: 'Search items… e.g. shasia 18×25, latex, clips',
    count: (n: number) => `${n} items`,
    products: 'items',
    orderBy: 'Sold by',
    approx: 'estimated',
    approxTitle: 'Unit inferred from the same product family on the stock sheet; confirm with the team before supply',
    fromSheet: 'stock sheet',
    sheetLabel: (s: string) => `Written on the sheet: ${s}`,
    qty: 'Quantity',
    lineNote: 'Note for this item (size, colour, grade…)',
    summary: 'Order summary',
    summaryCount: (n: number, total: number) => `${n} of ${total} items have a quantity`,
    empty: 'No quantities yet. Enter a quantity next to one of the picked items and it will show up here.',
    emptyHint: 'You can order many items across many units in one order.',
    unitTotals: 'Totals by unit',
    contactTitle: 'Contact details',
    required: 'required',
    nameError: 'Please enter your name',
    phoneError: 'Please enter a phone number we can reach you on',
    name: 'Name',
    company: 'Company / factory',
    phone: 'Phone',
    notes: 'General notes',
    namePh: 'Your name',
    companyPh: 'Company name',
    phonePh: '+20 …',
    notesPh: 'Delivery date, address, special specs…',
    sendOrder: 'Submit order to our team',
    sending: 'Submitting order…',
    sentTitle: 'Order received',
    sentBody: (ref: string) => `Your order was recorded as ${ref}. Our team will contact you to confirm specs, availability and prices.`,
    fallbackTitle: 'Direct order inbox is not connected yet',
    fallbackBody: 'Your order is ready and nothing was lost — send it to us on WhatsApp or by email using the buttons below.',
    errorTitle: 'We could not submit the order',
    errorBody: 'Please try again, or use WhatsApp / email. The order is still saved on this device.',
    submitNote: 'When the order inbox is connected, this button submits directly to our team. Otherwise it prepares the same order for WhatsApp or email.',
    newOrder: 'Start a new order',
    referenceLabel: 'Order reference',
    sendWa: 'Send order on WhatsApp',
    sendMail: 'Send order by email',
    copy: 'Copy order text',
    copied: 'Copied',
    copyFail: 'Could not copy — use WhatsApp or email',
    clear: 'Clear order',
    clearConfirm: 'Clear all quantities and notes?',
    note: 'When the order inbox is connected, the order is submitted directly to our team with an order reference; otherwise the buttons open WhatsApp or email with a ready-made message listing every item with its quantity and unit. No customer data is stored on a server here, and final specs, availability and prices are confirmed with the team.',
    sheetNote: 'Units come from the «اصناف المخزون» stock sheet (53 lines). Extended catalog items inherit the unit of their family and are marked «estimated». The sheet writes both «كجم» and «كيلو» for the same weight unit.',
    noResults: 'No matching items. Try another keyword or change the filter.',
    reset: 'Reset filters',
    remove: 'Remove item from selection',
    themeDark: 'Dark mode',
    themeLight: 'Light mode',
    toggle: 'العربية',
    footer: 'Mattress materials & spring manufacturing · Egypt',
    backTop: 'Back to top',
    menu: 'Open navigation',
    close: 'Close navigation',
  },
} as const;

const msgCopy = {
  ar: {
    heading: 'مرحبًا نايل بد، أرغب في طلب الأصناف التالية:',
    reference: 'رقم الطلب',
    note: 'ملاحظة',
    name: 'الاسم',
    company: 'الشركة',
    phone: 'الهاتف',
    notes: 'ملاحظات',
    footer: 'من فضلكم تأكيد المواصفات النهائية والتوافر والسعر. شكرًا.',
    subject: 'طلب أصناف — نايل بد',
  },
  en: {
    heading: 'Hi Nile Bed, I would like to order the following items:',
    reference: 'Order reference',
    note: 'Note',
    name: 'Name',
    company: 'Company',
    phone: 'Phone',
    notes: 'Notes',
    footer: 'Please confirm final specs, availability and prices. Thank you.',
    subject: 'Product order — Nile Bed',
  },
};

function BrandLogo({ variant }: { variant: 'light' | 'dark' | 'auto' }) {
  return (
    <span className={`brand-logo is-${variant}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-light" src="/logo-on-light.svg" alt="Nile Bed" width={454} height={270} decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-alt" src="/logo-on-dark.svg" alt="" aria-hidden="true" width={454} height={270} decoding="async" />
    </span>
  );
}

/** Accept Arabic-Indic digits and Arabic/comma decimal separators, keep a plain number. */
function cleanQty(raw: string): string {
  const converted = raw
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٫,،]/g, '.')
    .replace(/[^\d.]/g, '');
  const parts = converted.split('.');
  return parts.length > 1 ? `${parts[0]}.${parts.slice(1).join('')}` : converted;
}

function qtyValue(line: Line | undefined): number {
  const n = Number(line?.qty);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function fmtQty(n: number): string {
  return String(Number(n.toFixed(3)));
}

function roundTo(v: number, step: number): number {
  return Number((Math.round(v / step) * step).toFixed(3));
}

function normalizeSearch(value: string) {
  return value
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/(\d)\s*[*xX×]\s*(\d)/g, '$1×$2')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export default function OrderPage() {
  const [lang, setLang] = useState<Lang>('ar');
  const [theme, setTheme] = useState<Theme>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeUnit, setActiveUnit] = useState<UnitId | 'all'>('all');
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<Record<string, Line>>({});
  const [contact, setContact] = useState<Contact>({ ...emptyContact });
  const [loaded, setLoaded] = useState(false);
  const [reference, setReference] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'ok' | 'fail'>('idle');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [showErrors, setShowErrors] = useState(false);

  const t = copy[lang];
  const m = msgCopy[lang];
  const ar = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
  }, [lang, ar]);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  // Restore the shared draft. `?add=` is kept only as a backwards-compatible
  // deep link: it records the item with an EMPTY quantity — no auto-quantity,
  // no auto-scroll, no navigation away from the selection step.
  useEffect(() => {
    const draft = readDraft();
    const params = new URLSearchParams(window.location.search);
    const unitParam = params.get('unit');
    if (unitParam && units.some((u) => u.id === unitParam)) setActiveUnit(unitParam as UnitId);
    const add = params.get('add');
    const next = add ? pickWithoutQuantity(draft, add) : draft;
    writeDraft(next);
    setOrder(next.order);
    setContact(next.contact);
    setReference(next.reference);
    setLoaded(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      const synced = readDraft();
      setOrder(synced.order);
      setContact(synced.contact);
      setReference(synced.reference);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    writeDraft({ order, contact, reference });
  }, [order, contact, reference, loaded]);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('nilebed-theme-v3', next); } catch { /* ignore */ }
  };

  const setLine = (id: string, patch: Partial<Line>) => {
    setOrder((prev) => ({ ...prev, [id]: { qty: prev[id]?.qty ?? '', note: prev[id]?.note ?? '', ...patch } }));
    setSubmitState((prev) => prev === 'sending' ? prev : 'idle');
  };

  /** Remove the item entirely from the preliminary selection. */
  const removeLine = (id: string) => {
    setOrder((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSubmitState((prev) => prev === 'sending' ? prev : 'idle');
  };

  const updateContact = (field: keyof Contact, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
    setShowErrors(false);
    setSubmitState((prev) => prev === 'sending' ? prev : 'idle');
  };

  const stepQty = (id: string, direction: 1 | -1) => {
    const def = unitById[unitOf(id).unit];
    const current = qtyValue(order[id]);
    const next = Math.max(0, Math.min(999999, roundTo(current + direction * def.step, def.step)));
    setLine(id, { qty: next > 0 ? fmtQty(next) : '' });
  };

  // Only items the visitor picked in the catalog are ever rendered here.
  const picked = useMemo(
    () => items.filter((it) => Object.prototype.hasOwnProperty.call(order, it.id)),
    [order],
  );
  const selected = useMemo(() => picked.filter((it) => qtyValue(order[it.id]) > 0), [picked, order]);
  const selectedCount = selected.length;
  const missingQty = useMemo(() => picked.filter((it) => qtyValue(order[it.id]) <= 0), [picked, order]);

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    return picked.filter((it) => {
      if (activeUnit !== 'all' && unitOf(it.id).unit !== activeUnit) return false;
      if (activeGroup !== 'all' && it.group !== activeGroup) return false;
      if (!q) return true;
      const hay = normalizeSearch(`${it.ar.name} ${it.ar.desc} ${it.ar.specs.join(' ')} ${it.en.name} ${it.en.desc} ${it.en.specs.join(' ')}`);
      return hay.includes(q);
    });
  }, [picked, activeUnit, activeGroup, query]);

  const sections = useMemo(
    () => units
      .map((u) => ({ unit: u, rows: filtered.filter((it) => unitOf(it.id).unit === u.id) }))
      .filter((s) => s.rows.length > 0),
    [filtered],
  );

  // Counts describe the picked items, not the whole catalog.
  const unitCounts = useMemo(() => countByUnit(picked.map((it) => it.id)), [picked]);

  const totalsByUnit = useMemo(() => {
    const totals: Partial<Record<UnitId, number>> = {};
    selected.forEach((it) => {
      const u = unitOf(it.id).unit;
      totals[u] = (totals[u] ?? 0) + qtyValue(order[it.id]);
    });
    return totals;
  }, [selected, order]);

  const labelOf = (it: CatalogItem) => {
    const info = unitOf(it.id);
    const def = unitById[info.unit];
    return ar ? (info.sheetLabel ?? def.ar.short) : def.en.short;
  };

  const message = useMemo(() => {
    const lines = selected.map((it, i) => {
      const line = order[it.id];
      const name = ar ? it.ar.name : it.en.name;
      const base = `${i + 1}) ${name} — ${fmtQty(qtyValue(line))} ${labelOf(it)}`;
      return line?.note ? `${base} (${m.note}: ${line.note})` : base;
    });
    const details = [
      contact.name && `${m.name}: ${contact.name}`,
      contact.company && `${m.company}: ${contact.company}`,
      contact.phone && `${m.phone}: ${contact.phone}`,
      contact.notes && `${m.notes}: ${contact.notes}`,
    ].filter(Boolean) as string[];
    const header = reference ? `${m.heading}\n${m.reference}: ${reference}` : m.heading;
    return [header, lines.join('\n'), details.join('\n'), m.footer]
      .filter(Boolean)
      .join('\n\n');
  }, [selected, order, contact, ar, m, reference]);

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(message)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyState('ok');
    } catch {
      setCopyState('fail');
    }
    window.setTimeout(() => setCopyState('idle'), 2500);
  };

  const handleSubmit = async () => {
    if (disabled || submitState === 'sending') return;
    if (!contact.name.trim() || !contact.phone.trim()) {
      setShowErrors(true);
      setSubmitState('error');
      return;
    }
    setShowErrors(false);
    setSubmitState('sending');
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference,
          lang,
          contact,
          lines: selected.map((it) => ({ id: it.id, qty: qtyValue(order[it.id]), note: order[it.id]?.note ?? '' })),
          message,
        }),
      });
      const data = await res.json() as { ok?: boolean; mode?: string; reason?: string; reference?: string };
      if (data?.ok && data.mode === 'submitted') {
        if (data.reference) setReference(data.reference);
        setSubmitState('submitted');
      } else if (data?.reason === 'missing-contact') {
        setShowErrors(true);
        setSubmitState('error');
      } else {
        setSubmitState('fallback');
      }
    } catch {
      setSubmitState('error');
    }
  };

  const clearOrder = () => {
    if (!window.confirm(t.clearConfirm)) return;
    setOrder({});
    setContact({ ...emptyContact });
    setReference(makeReference());
    setSubmitState('idle');
    setShowErrors(false);
  };

  // No order can be sent until every picked item has a quantity.
  const disabled = selectedCount === 0 || missingQty.length > 0;

  const statusTitle = submitState === 'submitted' ? t.sentTitle
    : submitState === 'fallback' ? t.fallbackTitle
    : t.errorTitle;
  const statusBody = submitState === 'submitted' ? t.sentBody(reference)
    : submitState === 'fallback' ? t.fallbackBody
    : t.errorBody;

  return (
    <>
    <main className="nile order-page has-floating-order" dir={ar ? 'rtl' : 'ltr'} lang={lang}>
      {/* ── Topbar ── */}
      <header className="topbar order-topbar">
        <a className="brand" href="/" aria-label={ar ? 'نايل بد — الرئيسية' : 'Nile Bed — home'}><BrandLogo variant="auto" /></a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          <a href="/">{t.nav[0]}</a>
          <a href="/catalog">{t.nav[1]}</a>
          <a href="/order" aria-current="page">{t.nav[2]}</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)}>{t.nav[3]}</a>
        </nav>
        <div className="nav-actions">
          <button className="theme-switch" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? t.themeLight : t.themeDark} aria-pressed={theme === 'dark'}>
            <Moon className="icon-moon" size={15} /><Sun className="icon-sun" size={15} /><span>{theme === 'dark' ? t.themeLight : t.themeDark}</span>
          </button>
          <button className="lang-switch" type="button" onClick={() => setLang(ar ? 'en' : 'ar')} aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}>
            <Globe2 size={15} />{t.toggle}
          </button>
          <a className="nav-cta" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
            {ar ? 'واتساب' : 'WhatsApp'} <ArrowUpRight size={15} />
          </a>
          <button className="menu-btn order-menu-btn" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? t.close : t.menu} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Hero + unit legend ── */}
      <section className="ob-hero">
        <div className="ob-hero-bg" />
        <div className="ob-hero-inner">
          <div className="ob-hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" />{t.kicker}</div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
            <div className="ob-hero-note"><Info size={14} />{t.heroNote}</div>
            <div className="nb-steps" aria-label={ar ? 'خطوات الطلب' : 'Order steps'}>
              <a className="nb-step" href="/catalog"><b>1</b>{t.step1}</a>
              <span className="nb-step-arrow">{ar ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}</span>
              <span className="nb-step is-current"><b>2</b>{t.step2}</span>
            </div>
            <a className="ob-back-link" href="/catalog">
              {ar ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}{t.addMore}
            </a>
          </div>
          <div className="ob-legend">
            <div className="ob-legend-head"><Ruler size={15} />{t.unitsLabel} · {units.length}</div>
            <div className="ob-legend-grid">
              {units.map((u) => (
                <button key={u.id} type="button" className={activeUnit === u.id ? 'ob-legend-item active' : 'ob-legend-item'} onClick={() => setActiveUnit(activeUnit === u.id ? 'all' : u.id)}>
                  <strong>{ar ? u.ar.short : u.en.short}</strong>
                  <span>{unitCounts[u.id]} {t.products}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters (only meaningful when something is picked) ── */}
      {picked.length > 0 && (
      <section className="ob-filters">
        <div className="ob-filters-inner">
          <div className="ob-picked-note"><Check size={13} />{t.pickedOnly} · {t.count(picked.length)}</div>
          <div className="ob-filters-top">
            <div className="ob-search">
              <Search size={16} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPlaceholder} aria-label={ar ? 'بحث' : 'Search'} />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="clear"><X size={14} /></button>}
            </div>
            <label className="ob-group-select">
              <span>{t.filterByGroup}</span>
              <select value={activeGroup} onChange={(e) => setActiveGroup(e.target.value)} aria-label={t.filterByGroup}>
                <option value="all">{t.allGroups}</option>
                {groups.map((g) => <option key={g.id} value={g.id}>{ar ? g.ar.title : g.en.title}</option>)}
              </select>
            </label>
            <div className="ob-count"><Check size={13} />{t.count(filtered.length)}</div>
          </div>
          <div className="ob-unit-chips" role="tablist" aria-label={t.filterByUnit}>
            <button role="tab" aria-selected={activeUnit === 'all'} className={activeUnit === 'all' ? 'ob-chip active' : 'ob-chip'} onClick={() => setActiveUnit('all')}>
              {t.allUnits} <span>{picked.length}</span>
            </button>
            {units.map((u) => (
              <button key={u.id} role="tab" aria-selected={activeUnit === u.id} className={activeUnit === u.id ? 'ob-chip active' : 'ob-chip'} onClick={() => setActiveUnit(u.id)}>
                {ar ? u.ar.label : u.en.label} <span>{unitCounts[u.id]}</span>
              </button>
            ))}
          </div>
          <div className="ob-sheet-note"><Info size={13} />{t.sheetNote}</div>
        </div>
      </section>
      )}

      {/* ── Products + summary ── */}
      <div className="ob-layout">
        <section className="ob-products" aria-label={t.title}>
          {picked.length === 0 ? (
            <div className="ob-picked-empty">
              <ShoppingBag size={30} />
              <h2>{t.pickedEmpty}</h2>
              <p>{t.pickedEmptyHint}</p>
              <a href="/catalog"><ClipboardList size={15} />{t.addMore}</a>
            </div>
          ) : filtered.length === 0 ? (
            <div className="ob-no-results">
              <Search size={22} />
              <p>{t.noResults}</p>
              <button type="button" onClick={() => { setQuery(''); setActiveGroup('all'); setActiveUnit('all'); }}>{t.reset}</button>
            </div>
          ) : sections.map((section, sIdx) => (
            <div className="ob-unit-block" key={section.unit.id} id={`unit-${section.unit.id}`}>
              <div className="ob-unit-head">
                <span className="ob-unit-num">{String(units.indexOf(section.unit) + 1).padStart(2, '0')}</span>
                <div className="ob-unit-head-copy">
                  <h2>{ar ? section.unit.ar.label : section.unit.en.label}</h2>
                  <p>{ar ? section.unit.ar.desc : section.unit.en.desc}</p>
                  <small>{ar ? section.unit.ar.example : section.unit.en.example}</small>
                </div>
                <span className="ob-unit-count">{section.rows.length} {t.products}</span>
              </div>
              <div className="ob-rows">
                {section.rows.map((it, idx) => {
                  const info = unitOf(it.id);
                  const def = unitById[info.unit];
                  const line = order[it.id];
                  const qty = qtyValue(line);
                  const groupDef = groups.find((g) => g.id === it.group);
                  const groupTitle = groupDef ? (ar ? groupDef.ar.title : groupDef.en.title) : '';
                  return (
                    <div id={`product-${it.id}`} key={it.id} className={qty > 0 ? 'ob-row selected' : 'ob-row needs-qty'}>
                      <div className="ob-row-main">
                        <div className="ob-row-name">
                          <span className="ob-row-index">{String(sIdx + 1).padStart(2, '0')}.{String(idx + 1).padStart(2, '0')}</span>
                          <div>
                            <h3>{ar ? it.ar.name : it.en.name}</h3>
                            <span className="ob-row-group">{groupTitle}</span>
                          </div>
                        </div>
                        <div className="ob-row-unit">
                          <span className="ob-unit-badge">{t.orderBy} <strong>{ar ? def.ar.short : def.en.short}</strong></span>
                          {info.source === 'family'
                            ? <em className="ob-est" title={t.approxTitle}>{t.approx}</em>
                            : <span className="ob-sheet" title={info.sheetLabel ? t.sheetLabel(info.sheetLabel) : t.fromSheet}>{t.fromSheet}</span>}
                          {qty === 0 && <em className="ob-qty-required">{t.qtyRequired}</em>}
                          <button type="button" className="ob-row-remove" onClick={() => removeLine(it.id)} aria-label={`${t.remove} — ${ar ? it.ar.name : it.en.name}`} title={t.remove}><X size={12} /></button>
                        </div>
                        <div className="ob-qty" dir="ltr">
                          <button type="button" onClick={() => stepQty(it.id, -1)} aria-label={`- ${def.step}`}><Minus size={14} /></button>
                          <div className="ob-qty-field">
                            <input
                              type="text"
                              inputMode="decimal"
                              value={line?.qty ?? ''}
                              placeholder="0"
                              aria-label={`${t.qty} — ${ar ? it.ar.name : it.en.name} (${ar ? def.ar.short : def.en.short})`}
                              onChange={(e) => setLine(it.id, { qty: cleanQty(e.target.value) })}
                              onBlur={() => {
                                const n = Math.min(999999, qtyValue(line));
                                const rounded = def.decimal ? n : Math.round(n);
                                setLine(it.id, { qty: rounded > 0 ? fmtQty(rounded) : '' });
                              }}
                            />
                            <span>{ar ? def.ar.short : def.en.short}</span>
                          </div>
                          <button type="button" onClick={() => stepQty(it.id, 1)} aria-label={`+ ${def.step}`}><Plus size={14} /></button>
                        </div>
                      </div>
                      {qty > 0 && (
                        <div className="ob-row-note">
                          <input
                            value={line?.note ?? ''}
                            placeholder={t.lineNote}
                            aria-label={`${t.lineNote} — ${ar ? it.ar.name : it.en.name}`}
                            onChange={(e) => setLine(it.id, { note: e.target.value })}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <aside className="ob-summary" aria-label={t.summary}>
          <div className="ob-summary-inner">
            <div className="ob-summary-head">
              <ClipboardList size={17} />
              <h2>{t.summary}</h2>
              <span>{selectedCount}</span>
            </div>
            <p className="ob-summary-count">{t.summaryCount(selectedCount, picked.length)}</p>

            {missingQty.length > 0 && (
              <div className="ob-warning" role="status"><Info size={14} />{t.missingQty(missingQty.length)}</div>
            )}

            {selectedCount === 0 ? (
              <div className="ob-empty"><PackageHint />{t.empty}<small>{t.emptyHint}</small></div>
            ) : (
              <>
                <ul className="ob-lines">
                  {selected.map((it) => (
                    <li key={it.id}>
                      <div className="ob-line-name">
                        <strong>{ar ? it.ar.name : it.en.name}</strong>
                        {order[it.id]?.note && <small>{m.note}: {order[it.id].note}</small>}
                      </div>
                      <span className="ob-line-qty">{fmtQty(qtyValue(order[it.id]))} {labelOf(it)}</span>
                      <button type="button" onClick={() => removeLine(it.id)} aria-label={t.remove}><X size={13} /></button>
                    </li>
                  ))}
                </ul>
                <div className="ob-unit-totals">
                  <span>{t.unitTotals}</span>
                  <div>
                    {units.filter((u) => (totalsByUnit[u.id] ?? 0) > 0).map((u) => (
                      <em key={u.id}>{fmtQty(totalsByUnit[u.id] ?? 0)} {ar ? u.ar.short : u.en.short}</em>
                    ))}
                  </div>
                </div>
              </>
            )}

            <form className="ob-contact" onSubmit={(e) => { e.preventDefault(); void handleSubmit(); }}>
              <h3>{t.contactTitle}</h3>
              <label className={showErrors && !contact.name.trim() ? 'has-error' : ''}>
                {t.name} <em>{t.required}</em>
                <input value={contact.name} placeholder={t.namePh} onChange={(e) => updateContact('name', e.target.value)} />
                {showErrors && !contact.name.trim() && <small className="ob-field-error">{t.nameError}</small>}
              </label>
              <label>{t.company}<input value={contact.company} placeholder={t.companyPh} onChange={(e) => updateContact('company', e.target.value)} /></label>
              <label className={showErrors && !contact.phone.trim() ? 'has-error' : ''}>
                {t.phone} <em>{t.required}</em>
                <input type="tel" value={contact.phone} placeholder={t.phonePh} onChange={(e) => updateContact('phone', e.target.value)} />
                {showErrors && !contact.phone.trim() && <small className="ob-field-error">{t.phoneError}</small>}
              </label>
              <label>{t.notes}<textarea rows={3} value={contact.notes} placeholder={t.notesPh} onChange={(e) => updateContact('notes', e.target.value)} /></label>
            </form>

            {submitState !== 'idle' && submitState !== 'sending' && (
              <div className={`ob-status ob-status-${submitState}`} role="status" aria-live="polite">
                <strong>{statusTitle}</strong>
                <p>{statusBody}</p>
                {reference && <span className="ob-ref">{t.referenceLabel}: {reference}</span>}
                {submitState === 'submitted' && (
                  <button type="button" onClick={clearOrder}>{t.newOrder}</button>
                )}
              </div>
            )}

            <div className="ob-actions">
              <button className="ob-submit" type="button" onClick={handleSubmit} disabled={disabled || submitState === 'sending'}>
                <Send size={15} />{submitState === 'sending' ? t.sending : t.sendOrder}<ArrowUpRight size={14} />
              </button>
              <small className="ob-submit-note">{t.submitNote}</small>
              <a className={`ob-send ob-send-wa${disabled ? ' is-disabled' : ''}`} href={disabled ? undefined : waHref} target="_blank" rel="noopener noreferrer" aria-disabled={disabled} onClick={disabled ? (e) => e.preventDefault() : undefined}>
                <Phone size={15} />{t.sendWa}<ArrowUpRight size={14} />
              </a>
              <a className={`ob-send ob-send-mail${disabled ? ' is-disabled' : ''}`} href={disabled ? undefined : mailHref} aria-disabled={disabled} onClick={disabled ? (e) => e.preventDefault() : undefined}>
                <Mail size={15} />{t.sendMail}<ArrowUpRight size={14} />
              </a>
              <button className="ob-secondary" type="button" onClick={handleCopy} disabled={selectedCount === 0}>
                <Copy size={14} />{copyState === 'ok' ? t.copied : copyState === 'fail' ? t.copyFail : t.copy}
              </button>
              <button className="ob-clear" type="button" onClick={clearOrder} disabled={picked.length === 0}><Trash2 size={13} />{t.clear}</button>
            </div>
            <p className="ob-summary-note"><Info size={13} />{t.note}</p>
            <div className="ob-direct">
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"><Phone size={13} />{ar ? 'واتساب: 010 90000676' : 'WhatsApp: 010 90000676'}</a>
              <a href={`mailto:${EMAIL}`}><Mail size={13} />{EMAIL}</a>
            </div>
          </div>
        </aside>
      </div>

      <footer className="footer">
        <a className="brand footer-brand" href="/" aria-label="Nile Bed"><BrandLogo variant="dark" /></a>
        <span>{t.footer}</span>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.backTop}</a>
        <small>© {new Date().getFullYear()} NILE BED</small>
      </footer>
    </main>

    {/* Persistent floating control for the second step, matching step 1. */}
    <div className="nb-float" dir={ar ? 'rtl' : 'ltr'}>
      <div className="nb-float-inner">
        <div className="nb-float-count">
          <ShoppingBag size={19} />
          <div>
            <span className="nb-float-label">{t.currentOrder} <strong>{picked.length}</strong> {t.products}</span>
            <span className="nb-float-hint">{t.quantitiesSet(selectedCount, picked.length)}</span>
          </div>
        </div>
        <a className="nb-float-cta" href="/catalog">
          <span>{t.addMore}</span>
          {ar ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
        </a>
      </div>
    </div>
    </>
  );
}

function PackageHint() {
  return <span className="ob-empty-icon"><Send size={18} /></span>;
}
