/* ==========================================================================
   Classification of Nile Bed products by UNIT OF MEASUREMENT.

   Source: the stock sheet "اصناف المخزون.xlsx" shared by the owner
   (Google Drive id 15XwrFc3O7x0C-OPPCAIMzoPuS928dxfY), column «الوزن / القياس».
   53 stock lines carry one of 8 written units:
   رول · م3 · صفيحة · توب · كرتونة · كجم · كيلو · عدد.

   «كجم» and «كيلو» are the same unit with two spellings on the sheet, so they
   are normalised into one `kg` bucket. Every catalog card is mapped to a unit
   so a customer can state the wanted quantity in the unit the product is sold
   in. `source: 'sheet'` = the unit is written for that product on the stock
   sheet; `source: 'family'` = inferred from the same product family and must
   be confirmed with the team (shown as such in the UI).

   Prices and the handwritten numbers on the sheet are deliberately NOT used.
   ========================================================================== */

export type UnitId = 'roll' | 'm3' | 'tin' | 'bolt' | 'carton' | 'kg' | 'pcs';

export type UnitDef = {
  id: UnitId;
  ar: { label: string; short: string; desc: string; example: string };
  en: { label: string; short: string; desc: string; example: string };
  /** true for units that may be ordered in fractions (weight / volume). */
  decimal: boolean;
  step: number;
};

export const units: UnitDef[] = [
  {
    id: 'roll',
    ar: { label: 'رول', short: 'رول', desc: 'أصناف تُباع بالرول: البوكيت المفروش والشاسيهات المجمّعة. اكتب عدد الرولات المطلوبة.', example: 'مثال: ١٢ رول' },
    en: { label: 'Roll', short: 'roll', desc: 'Sold by the roll: ready-spread pocket and assembled shasia units. Enter the number of rolls.', example: 'e.g. 12 rolls' },
    decimal: false, step: 1,
  },
  {
    id: 'm3',
    ar: { label: 'م³ — متر مكعب', short: 'م³', desc: 'الفوم والميموري واللاتكس تُحسب بالحجم. يمكن كتابة كسور مثل 2.5 م³.', example: 'مثال: 2.5 م³' },
    en: { label: 'm³ — cubic metre', short: 'm³', desc: 'Foam, memory and latex are measured by volume. Fractions such as 2.5 m³ are fine.', example: 'e.g. 2.5 m³' },
    decimal: true, step: 0.1,
  },
  {
    id: 'tin',
    ar: { label: 'صفيحة', short: 'صفيحة', desc: 'الغراء يُطلب بالصفيحة — اكتب عدد الصفائح.', example: 'مثال: ٣ صفيحة' },
    en: { label: 'Tin', short: 'tin', desc: 'Glue is ordered by the tin — enter the number of tins.', example: 'e.g. 3 tins' },
    decimal: false, step: 1,
  },
  {
    id: 'bolt',
    ar: { label: 'توب (لفة)', short: 'توب', desc: 'الأقمشة والفازلين والميلتون والبلاستيك تُباع بالتوب — اكتب عدد الأتواب.', example: 'مثال: ٥ توب' },
    en: { label: 'Bolt (fabric roll)', short: 'bolt', desc: 'Non-woven, Melton, plastic and fabrics are sold by the bolt — enter the number of bolts.', example: 'e.g. 5 bolts' },
    decimal: false, step: 1,
  },
  {
    id: 'carton',
    ar: { label: 'كرتونة', short: 'كرتونة', desc: 'الكلبس والدبل وبعض لوازم التجميع تُباع بالكرتونة — اكتب عدد الكراتين.', example: 'مثال: ٢ كرتونة' },
    en: { label: 'Carton', short: 'carton', desc: 'Clips, doubles and some assembly hardware are sold by the carton — enter the number of cartons.', example: 'e.g. 2 cartons' },
    decimal: false, step: 1,
  },
  {
    id: 'kg',
    ar: { label: 'كجم / كيلو', short: 'كجم', desc: 'السوست والفريم والسلك واللباد والخيوط والتيب تُباع بالوزن. الجرد يكتب «كجم» و«كيلو» لنفس الوحدة.', example: 'مثال: ١٥٠ كجم' },
    en: { label: 'kg / kilo', short: 'kg', desc: 'Springs, frames, wire, felt, threads and tape are sold by weight. The sheet writes both «كجم» and «كيلو».', example: 'e.g. 150 kg' },
    decimal: true, step: 0.5,
  },
  {
    id: 'pcs',
    ar: { label: 'عدد (قطعة)', short: 'عدد', desc: 'العدد والقطع والطلقات تُطلب بالقطعة — اكتب العدد المطلوب.', example: 'مثال: ٢٠ قطعة' },
    en: { label: 'Piece (count)', short: 'pcs', desc: 'Tools, supports, shots and piece items are ordered by count — enter the number of pieces.', example: 'e.g. 20 pcs' },
    decimal: false, step: 1,
  },
];

export const unitById: Record<UnitId, UnitDef> = Object.fromEntries(
  units.map((u) => [u.id, u]),
) as Record<UnitId, UnitDef>;

/* The 53 stock-sheet lines, with their exact wording and raw unit, are kept in
   `docs/units-classification.csv` and in the Drive copy of that file — not in
   the client bundle. They are a reference record, not page content: the numbers
   written beside some lines are internal figures and are never published. */

/* --------------------------------------------------------------------------
   Unit per catalog card (68 items). `sheet` = named on the stock sheet;
   `family` = same family as a sheet line, to be confirmed with the team.
   -------------------------------------------------------------------------- */
export type ProductUnit = {
  unit: UnitId;
  source: 'sheet' | 'family';
  /** The exact word written on the sheet, when it differs from the normalised label. */
  sheetLabel?: string;
};

const S = (unit: UnitId, sheetLabel?: string): ProductUnit => ({ unit, source: 'sheet', sheetLabel });
const F = (unit: UnitId): ProductUnit => ({ unit, source: 'family' });

export const productUnits: Record<string, ProductUnit> = {
  // --- السوست والفريم والسلك -----------------------------------------------
  'wire-2-4-r1': S('kg'),
  'wire-2-4-r2': F('kg'),
  'wire-2-3': F('kg'),
  'wire-2-2': S('kg'),
  'wire-2-05-r1': S('kg'),
  'wire-2-05-r2': F('kg'),
  'frame': F('kg'),
  'frame-4-5': S('kg'),
  'frame-5': S('kg'),
  'wire-roll-1-3': S('kg'),
  'wire-raw-bonnell': S('kg'),

  // --- الشاسيهات المجمّعة (11 مقاس — كلها «رول» في الجرد) -------------------
  'shasia-18-25': S('roll'),
  'shasia-23-25': S('roll'),
  'shasia-25-25': S('roll'),
  'shasia-27-25': S('roll'),
  'shasia-28-25': S('roll'),
  'shasia-30-30': S('roll'),
  'shasia-20-30': S('roll'),
  'shasia-19-29': S('roll'),
  'shasia-18-30': S('roll'),
  'shasia-25-30': S('roll'),
  'shasia-29-30': S('roll'),

  // --- رول البوكيت والبوكيت المفروش ----------------------------------------
  'pocket-general': F('roll'),
  'pocket-12-14': F('roll'),
  'pocket-16-18': F('roll'),
  'pocket-ready-18-80-31': S('roll'),
  'pocket-ready-18-80-25': S('roll'),
  'pocket-ready-18-80-29': S('roll'),
  'pocket-ready-12-80-32': S('roll'),
  'pocket-ready-14-80-29': S('roll'),

  // --- الميموري واللاتكس وخام المراتب --------------------------------------
  'memory-roll-2': S('m3'),
  'memory-roll-4': S('m3'),
  'latex-2-5': S('m3'),
  'latex-3': S('m3'),
  'latex-4': S('m3'),
  'latex-5': S('m3'),
  'latex-core-15': F('m3'),
  'latex-core-18': F('m3'),

  // --- اللباد والفازلين والأقمشة -------------------------------------------
  'vaseline-210': S('bolt'),
  'vaseline-160': S('bolt'),
  'vaseline-15': S('bolt'),
  'felt-cotton': S('kg'),
  'felt-white': F('kg'),
  'felt-cut': S('kg'),
  'felt-roll': S('kg'),
  'felt-black': F('kg'),
  'felt-gray': F('kg'),
  'felt-black-tiger': S('kg', 'كيلو'),
  'melton-fur': S('bolt'),
  'melton-spanish': S('bolt'),
  'plastic': S('bolt'),

  // --- الخيوط والأشرطة ------------------------------------------------------
  'thread-150-3': S('kg', 'كيلو'),
  'thread-40-2': S('pcs', 'عدد'),
  'thread-210-3': F('kg'),
  'tape': S('kg'),
  'tape-3d': F('kg'),

  // --- لوازم التجميع والتثبيت -----------------------------------------------
  'clips': S('carton'),
  'double': S('carton'),
  'dovil-shasia': F('carton'),
  'support-shasia-18': F('pcs'),
  'support-spring': F('pcs'),
  'frame-fastener': F('carton'),
  'shots-5mm': S('pcs', 'عدد'),

  // --- الغراء والعدد --------------------------------------------------------
  'glue': S('tin'),
  'gun-clips': F('pcs'),
  'gun-double': F('pcs'),
  'gun-glue': F('pcs'),
  'gun-clips-spring': F('pcs'),
};

export function unitOf(itemId: string): ProductUnit {
  return productUnits[itemId] ?? F('pcs');
}

/** Number of catalog cards classified under each unit. */
export function countByUnit(itemIds: string[]): Record<UnitId, number> {
  const counts = Object.fromEntries(units.map((u) => [u.id, 0])) as Record<UnitId, number>;
  itemIds.forEach((id) => { counts[unitOf(id).unit] += 1; });
  return counts;
}
