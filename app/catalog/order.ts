import type { CatalogItem } from './data';

export type Lang = 'ar' | 'en';
export type UnitId = 'piece' | 'shasia' | 'roll' | 'metre' | 'kg' | 'cone' | 'carton';

export const UNITS: { id: UnitId; ar: string; en: string; enPlural: string }[] = [
  { id: 'piece', ar: 'قطعة', en: 'piece', enPlural: 'pieces' },
  { id: 'shasia', ar: 'شاسية', en: 'shasia', enPlural: 'shasias' },
  { id: 'roll', ar: 'رول', en: 'roll', enPlural: 'rolls' },
  { id: 'metre', ar: 'متر', en: 'metre', enPlural: 'metres' },
  { id: 'kg', ar: 'كجم', en: 'kg', enPlural: 'kg' },
  { id: 'cone', ar: 'بكرة', en: 'cone', enPlural: 'cones' },
  { id: 'carton', ar: 'كرتونة', en: 'carton', enPlural: 'cartons' },
];

export type CartLine = { qty: number; unit: UnitId };
export type Cart = Record<string, CartLine>;

export type OrderDetails = {
  customerName: string;
  factoryName: string;
  factoryTime: string;
  phone: string;
  pickupDate: string;
  notes: string;
};

export const EMPTY_DETAILS: OrderDetails = {
  customerName: '',
  factoryName: '',
  factoryTime: '',
  phone: '',
  pickupDate: '',
  notes: '',
};

export const CART_KEY = 'nilebed-order-v1';
export const DETAILS_KEY = 'nilebed-order-details-v1';
export const MAX_QTY = 100000;

// A sensible starting unit per item — the customer can change it in the order
// panel, because the stock sheet does not publish pack sizes.
export function defaultUnitFor(item: CatalogItem): UnitId {
  const name = `${item.ar.name} ${item.en.name}`;
  // Counted accessories and guns first — some of them mention "shasia".
  if (/^(دعامة|دوفيل|برشامة|كلبس|دبل|طلقات|مسدس|سوستة مسدس)|^(shasia (dovil|support)|frame fastener|clips? —|double clips?|shots|clip gun|double clip gun|glue gun|spring support|clip-gun spring|dovil)/i.test(name)) return 'piece';
  if (/شاسية|shasia/i.test(name)) return 'shasia';
  if (/فريم|frame/i.test(name)) return 'piece';
  if (/خيط|بكرة|thread|cone/i.test(name)) return 'cone';
  if (/مراتب لاتكس|latex mattress|mattress core/i.test(name)) return 'piece';
  if (/غراء|adhesive|glue/i.test(name)) return 'kg';
  if (/رول|roll|سلك|wire|لاتكس|latex|^بوكيت \d|^pocket \d/i.test(name)) return 'roll';
  if (/مقطع|cut piece/i.test(name)) return 'piece';
  if (/تيب|لباد|فازلين|ميلتون|بلاستيك|tape|felt|fabric|plastic|metre|متر/i.test(name)) return 'metre';
  return 'piece';
}

export function unitLabel(unit: UnitId, lang: Lang, qty?: number): string {
  const found = UNITS.find((u) => u.id === unit) ?? UNITS[0];
  if (lang === 'en' && qty !== undefined && qty !== 1) return found.enPlural;
  return found[lang];
}

export function clampQty(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.round(value)));
}

export function trimCart(cart: Cart): Cart {
  const next: Cart = {};
  for (const [id, line] of Object.entries(cart)) {
    if (line && line.qty > 0) next[id] = { qty: clampQty(line.qty), unit: line.unit };
  }
  return next;
}

export function cartCount(cart: Cart): number {
  return Object.keys(trimCart(cart)).length;
}

/** Today at local midnight, as an ISO `YYYY-MM-DD` string (for the date input min). */
export function todayIso(): string {
  const now = new Date();
  return isoFromParts(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

function isoFromParts(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export function formatPickupDate(iso: string, lang: Lang): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  try {
    return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return iso;
  }
}

export type OrderLineView = { item: CatalogItem; qty: number; unit: UnitId };

/**
 * Builds the WhatsApp message the customer sends to Nile Bed. Every field the
 * team asked for is included: customer name, factory name, factory time,
 * contact number, the exact quantity per item, and the expected pickup date.
 */
export function buildOrderMessage({
  lines,
  details,
  lang,
  origin,
}: {
  lines: OrderLineView[];
  details: OrderDetails;
  lang: Lang;
  origin?: string;
}): string {
  const ar = lang === 'ar';
  const source = origin ? `${origin}/catalog` : '';

  const head = ar ? '*طلب جديد من كتالوج نايل بد*' : '*New order from the Nile Bed catalog*';
  const customerTitle = ar ? '*بيانات العميل*' : '*Customer details*';
  const orderTitle = ar ? '*تفاصيل الطلب*' : '*Order details*';
  const label = {
    name: ar ? 'اسم العميل' : 'Customer name',
    factory: ar ? 'اسم المصنع' : 'Factory name',
    factoryTime: ar ? 'وقت المصنع' : 'Factory time',
    phone: ar ? 'رقم التواصل' : 'Contact number',
    pickup: ar ? 'ميعاد الاستلام المتوقع' : 'Expected pickup date',
    qty: ar ? 'الكمية' : 'Quantity',
    notes: ar ? 'ملاحظات' : 'Notes',
    items: ar ? 'عدد الأصناف' : 'Items',
    confirm: ar
      ? 'برجاء تأكيد التوافر والسعر وموعد الاستلام.'
      : 'Please confirm availability, price and the pickup schedule.',
    source: ar ? 'المصدر' : 'Source',
  };

  const itemLines = lines.map((line, index) => {
    const name = ar ? line.item.ar.name : line.item.en.name;
    const specs = ar ? line.item.ar.specs : line.item.en.specs;
    const specText = specs.slice(0, 2).join(ar ? ' · ' : ' · ');
    const qty = `${line.qty} ${unitLabel(line.unit, lang, line.qty)}`;
    return `${index + 1}) ${name}${specText ? `\n   ${specText}` : ''}\n   ${label.qty}: ${qty}`;
  });

  const blocks = [
    head + (source ? `\n${label.source}: ${source}` : ''),
    [
      customerTitle,
      `${label.name}: ${details.customerName.trim()}`,
      `${label.factory}: ${details.factoryName.trim()}`,
      `${label.factoryTime}: ${details.factoryTime.trim()}`,
      `${label.phone}: ${details.phone.trim()}`,
      `${label.pickup}: ${formatPickupDate(details.pickupDate, lang)} (${details.pickupDate})`,
    ].join('\n'),
    [`${orderTitle} — ${label.items}: ${lines.length}`, ...itemLines].join('\n'),
    details.notes.trim() ? `${label.notes}: ${details.notes.trim()}` : '',
    label.confirm,
  ];

  return blocks.filter(Boolean).join('\n\n');
}

export function waHref(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function hasValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}
