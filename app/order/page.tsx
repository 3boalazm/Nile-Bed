'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight, Check, ClipboardList, Copy, Globe2, Info, Mail, Menu, Minus, Moon,
  Phone, Plus, Ruler, Search, Send, Sun, Trash2, X,
} from 'lucide-react';
import { groups, items, type CatalogItem } from '../catalog/data';
import { countByUnit, unitById, unitOf, units, type UnitId } from '../catalog/units';
import './order.css';

type Lang = 'ar' | 'en';
type Theme = 'light' | 'dark';
type Line = { qty: string; note: string };
type Contact = { name: string; company: string; phone: string; notes: string };
type SubmitState = 'idle' | 'sending' | 'submitted' | 'fallback' | 'error';

const STORAGE_KEY = 'nilebed-order-v1';
const WA_NUMBER = '201090000676';
const EMAIL = 'info@nilebed.com';

const copy = {
  ar: {
    nav: ['الرئيسية', 'الكتالوج', 'تكوين الطلب', 'تواصل'],
    kicker: 'الطلب حسب وحدة القياس',
    title: 'كوّن طلبك.. صنف بصنف',
    subtitle: 'الأصناف متصنّفة حسب وحدة القياس اللي بتتباع بيها: رول، م³، صفيحة، توب، كرتونة، كجم/كيلو وعدد. اكتب الكمية اللي عايزها قدام كل صنف، وهيظهر كل شيء في ملخص الطلب.',
    heroNote: 'التصنيف مأخوذ من جرد «اصناف المخزون» — الأسعار والأرقام الداخلية غير معروضة.',
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
    summaryCount: (n: number) => `${n} صنف في الطلب`,
    empty: 'لسه مضفتش أي صنف. اكتب الكمية قدام الصنف وهيظهر هنا.',
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
    remove: 'حذف الصنف من الطلب',
    themeDark: 'الوضع الليلي',
    themeLight: 'الوضع النهاري',
    toggle: 'English',
    footer: 'خامات المراتب وتصنيع السوست · مصر',
    backTop: 'العودة للأعلى',
    menu: 'فتح القائمة',
    close: 'إغلاق القائمة',
  },
  en: {
    nav: ['Home', 'Catalog', 'Build order', 'Contact'],
    kicker: 'ORDER BY UNIT OF MEASURE',
    title: 'Build your order, item by item',
    subtitle: 'Products are classified by the unit they are sold in: roll, m³, tin, bolt, carton, kg/kilo and piece. Enter the quantity you need next to each item and it appears in the order summary.',
    heroNote: 'Classification comes from the «اصناف المخزون» stock sheet — prices and internal figures are not published.',
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
    summaryCount: (n: number) => `${n} items in order`,
    empty: 'No items yet. Enter a quantity next to a product and it will show up here.',
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
    remove: 'Remove item from order',
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

/** A short, human-readable order reference kept with the local draft. */
function makeReference(): string {
  const d = new Date();
  const day = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const suffix = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');
  return `NB-${day}-${suffix}`;
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
  const [contact, setContact] = useState<Contact>({ name: '', company: '', phone: '', notes: '' });
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

  // Restore a saved order and honour /order?add=<item-id>&unit=<unit-id> links
  // coming from the catalog cards.
  useEffect(() => {
    let savedOrder: Record<string, Line> = {};
    let savedContact: Contact = { name: '', company: '', phone: '', notes: '' };
    let savedReference = '';
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { order?: Record<string, Line>; contact?: Partial<Contact>; reference?: string };
        if (parsed?.order && typeof parsed.order === 'object') savedOrder = parsed.order;
        if (parsed?.contact && typeof parsed.contact === 'object') savedContact = { ...savedContact, ...parsed.contact };
        if (typeof parsed?.reference === 'string') savedReference = parsed.reference.slice(0, 40);
      }
    } catch { /* private mode / stale value — start empty */ }
    if (!savedReference) savedReference = makeReference();

    const params = new URLSearchParams(window.location.search);
    const unitParam = params.get('unit');
    if (unitParam && units.some((u) => u.id === unitParam)) setActiveUnit(unitParam as UnitId);
    const add = params.get('add');
    if (add && items.some((it) => it.id === add)) {
      const existing = savedOrder[add];
      savedOrder = { ...savedOrder, [add]: { qty: qtyValue(existing) > 0 ? existing.qty : '1', note: existing?.note ?? '' } };
      window.setTimeout(() => {
        document.getElementById(`product-${add}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 250);
    }
    setOrder(savedOrder);
    setContact(savedContact);
    setReference(savedReference);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ order, contact, reference })); } catch { /* ignore */ }
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

  const selected = useMemo(() => items.filter((it) => qtyValue(order[it.id]) > 0), [order]);
  const selectedCount = selected.length;

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    return items.filter((it) => {
      if (activeUnit !== 'all' && unitOf(it.id).unit !== activeUnit) return false;
      if (activeGroup !== 'all' && it.group !== activeGroup) return false;
      if (!q) return true;
      const hay = normalizeSearch(`${it.ar.name} ${it.ar.desc} ${it.ar.specs.join(' ')} ${it.en.name} ${it.en.desc} ${it.en.specs.join(' ')}`);
      return hay.includes(q);
    });
  }, [activeUnit, activeGroup, query]);

  const sections = useMemo(
    () => units
      .map((u) => ({ unit: u, rows: filtered.filter((it) => unitOf(it.id).unit === u.id) }))
      .filter((s) => s.rows.length > 0),
    [filtered],
  );

  const unitCounts = useMemo(() => countByUnit(items.map((it) => it.id)), []);

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
    setContact({ name: '', company: '', phone: '', notes: '' });
    setReference(makeReference());
    setSubmitState('idle');
    setShowErrors(false);
  };

  const disabled = selectedCount === 0;

  const statusTitle = submitState === 'submitted' ? t.sentTitle
    : submitState === 'fallback' ? t.fallbackTitle
    : t.errorTitle;
  const statusBody = submitState === 'submitted' ? t.sentBody(reference)
    : submitState === 'fallback' ? t.fallbackBody
    : t.errorBody;

  return (
    <main className="nile order-page" dir={ar ? 'rtl' : 'ltr'} lang={lang}>
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

      {/* ── Filters ── */}
      <section className="ob-filters">
        <div className="ob-filters-inner">
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
              {t.allUnits} <span>{items.length}</span>
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

      {/* ── Products + summary ── */}
      <div className="ob-layout">
        <section className="ob-products" aria-label={t.title}>
          {filtered.length === 0 ? (
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
                    <div id={`product-${it.id}`} key={it.id} className={qty > 0 ? 'ob-row selected' : 'ob-row'}>
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
            <p className="ob-summary-count">{t.summaryCount(selectedCount)}</p>

            {disabled ? (
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
                      <button type="button" onClick={() => setLine(it.id, { qty: '' })} aria-label={t.remove}><X size={13} /></button>
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
              <button className="ob-secondary" type="button" onClick={handleCopy} disabled={disabled}>
                <Copy size={14} />{copyState === 'ok' ? t.copied : copyState === 'fail' ? t.copyFail : t.copy}
              </button>
              <button className="ob-clear" type="button" onClick={clearOrder} disabled={disabled}><Trash2 size={13} />{t.clear}</button>
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
  );
}

function PackageHint() {
  return <span className="ob-empty-icon"><Send size={18} /></span>;
}
