export type CatalogItem = {
  id: string;
  group: string;
  ar: { name: string; desc: string; specs: string[]; badge?: string };
  en: { name: string; desc: string; specs: string[]; badge?: string };
  image: string;
  highlight?: boolean;
};

export type CatalogGroup = {
  id: string;
  ar: { title: string; desc: string; kicker: string };
  en: { title: string; desc: string; kicker: string };
  icon: string;
};

// Images are in /public/catalog/...
export const groups: CatalogGroup[] = [
  {
    id: "springs",
    ar: { kicker: "نصنعها في مصر", title: "السوست — تصنيع نايل بد", desc: "سوست بونيل بأقطار سلك وارتفاعات مختلفة. نصنّعها حسب الطلب والمقاس والكمية — المواصفات النهائية تُؤكَّد مع الفريق." },
    en: { kicker: "MADE IN EGYPT", title: "Springs — made by Nile Bed", desc: "Bonnell springs in several wire gauges, heights and diameters. Made to order by size and quantity — final specs confirmed with the team." },
    icon: "springs",
  },
  {
    id: "pocket",
    ar: { kicker: "سوست معزولة", title: "رول البوكيت — Pocket Roll", desc: "رولات بوكيت بأحجام متعددة، جاهزة للقص والتجميع في خطوط المراتب. المقاسات والارتفاعات حسب التوافر." },
    en: { kicker: "ISOLATED COILS", title: "Pocket Roll", desc: "Pocket spring rolls in multiple heights, ready to cut and assemble. Sizes and heights subject to availability." },
    icon: "pocket",
  },
  {
    id: "foam",
    ar: { kicker: "راحة ونوم", title: "الفوم والميموري واللاتكس", desc: "ميموري فوم تركي رول وشيت، ولاتكس بارتفاعات 2.5 إلى 5 سم. خامات توريد — المخزون والدرجة يُؤكدان عند الاستفسار." },
    en: { kicker: "COMFORT LAYERS", title: "Foam, Memory & Latex", desc: "Turkish memory foam in rolls and sheets, plus latex in 2.5–5 cm heights. Supplied materials — stock and grade confirmed on enquiry." },
    icon: "foam",
  },
  {
    id: "latex-mattress",
    ar: { kicker: "خامات مراتب", title: "مراتب لانكس ولب المرتبة", desc: "لب وخامات مراتب لانكس — توريد خامات، لا تصنيع مراتب جاهزة. المقاسات للعرض فقط وتُؤكَّد عند الطلب." },
    en: { kicker: "MATTRESS CORES", title: "Lanx cores & mattress blanks", desc: "Lanx mattress cores and blanks — supply of materials only, not finished mattresses. Sizes shown for reference and confirmed on order." },
    icon: "mattress",
  },
  {
    id: "materials",
    ar: { kicker: "الخامات المساعدة", title: "اللباد والفازلين واللوازم", desc: "لباد بأنواعه، فازلين بعروض مختلفة، غراء وخيوط وتوابع تجميع — كل ما يحتاجه خط الإنتاج." },
    en: { kicker: "AUXILIARY MATERIALS", title: "Felt, Non-woven & Supplies", desc: "Felt types, non-woven widths, adhesives, threads and assembly consumables for your line." },
    icon: "materials",
  },
  {
    id: "tools",
    ar: { kicker: "العدد", title: "العدد والمسدسات", desc: "مسدسات كلبس ودبل وغراء — أدوات تثبيت وتجميع احترافية لورش ومصانع المراتب." },
    en: { kicker: "TOOLS", title: "Tools & Guns", desc: "Clip guns, double-clip tools and glue guns — professional fastening for workshops and factories." },
    icon: "tools",
  },
];

export const items: CatalogItem[] = [
  // --- SPRINGS ---
  {
    id: "wire-2-4-r1",
    group: "springs",
    ar: { name: "سلك 2.4 — الصف الأول", desc: "سوستة بونيل بارتفاع 14.5 سم وقطر 8.5 سم. للمراتب المتوسطة والاقتصادية.", specs: ["قطر السلك: 2.4 مم", "ارتفاع السوستة: 14.5 سم", "قطر السوستة: 8.5 سم"], badge: "تصنيع نايل بد" },
    en: { name: "Wire 2.4 — Row 1", desc: "Bonnell spring, height 14.5 cm, coil diameter 8.5 cm. For mid-range and economy mattresses.", specs: ["Wire gauge: 2.4 mm", "Spring height: 14.5 cm", "Coil diameter: 8.5 cm"], badge: "Made by Nile Bed" },
    image: "/catalog/springs/bonnell-1.jpg",
    highlight: true,
  },
  {
    id: "wire-2-4-r2",
    group: "springs",
    ar: { name: "سلك 2.4 — الصف الثاني", desc: "ارتفاع 16.5 سم وقطر 8.5 سم. توازن بين الدعم والراحة.", specs: ["قطر السلك: 2.4 مم", "ارتفاع السوستة: 16.5 سم", "قطر السوستة: 8.5 سم"] },
    en: { name: "Wire 2.4 — Row 2", desc: "Height 16.5 cm, diameter 8.5 cm. Balanced support and comfort.", specs: ["Wire gauge: 2.4 mm", "Spring height: 16.5 cm", "Coil diameter: 8.5 cm"] },
    image: "/catalog/springs/bonnell-2.jpg",
  },
  {
    id: "wire-2-4-r3",
    group: "springs",
    ar: { name: "سلك 2.4 — الصف الثالث", desc: "نفس مواصفات الصف الثاني — دفعة/تجهيز مختلف حسب الطلب.", specs: ["قطر السلك: 2.4 مم", "ارتفاع السوستة: 16.5 سم", "قطر السوستة: 8.5 سم"] },
    en: { name: "Wire 2.4 — Row 3", desc: "Same spec as Row 2 — different batch / preparation per order.", specs: ["Wire gauge: 2.4 mm", "Spring height: 16.5 cm", "Coil diameter: 8.5 cm"] },
    image: "/catalog/springs/bonnell-cutaway.jpg",
  },
  {
    id: "wire-2-3",
    group: "springs",
    ar: { name: "سلك 2.3", desc: "ارتفاع 16.5 سم وقطر 8.6 سم — مرونة أعلى قليلًا.", specs: ["قطر السلك: 2.3 مم", "ارتفاع السوستة: 16.5 سم", "قطر السوستة: 8.6 سم"] },
    en: { name: "Wire 2.3", desc: "Height 16.5 cm, diameter 8.6 cm — slightly more flexibility.", specs: ["Wire gauge: 2.3 mm", "Spring height: 16.5 cm", "Coil diameter: 8.6 cm"] },
    image: "/catalog/springs/bonnell-1.jpg",
  },
  {
    id: "wire-2-2",
    group: "springs",
    ar: { name: "سلك 2.2", desc: "ارتفاع 16.5 سم وقطر 8.8 سم — إحساس أنعم.", specs: ["قطر السلك: 2.2 مم", "ارتفاع السوستة: 16.5 سم", "قطر السوستة: 8.8 سم"] },
    en: { name: "Wire 2.2", desc: "Height 16.5 cm, diameter 8.8 cm — softer feel.", specs: ["Wire gauge: 2.2 mm", "Spring height: 16.5 cm", "Coil diameter: 8.8 cm"] },
    image: "/catalog/springs/bonnell-2.jpg",
  },
  {
    id: "wire-2-05-r1",
    group: "springs",
    ar: { name: "سلك 2.05 — الصف الأول", desc: "ارتفاع 16.5 سم وقطر 8.8 سم — للمراتب الفندقية والطرية.", specs: ["قطر السلك: 2.05 مم", "ارتفاع السوستة: 16.5 سم", "قطر السوستة: 8.8 سم"] },
    en: { name: "Wire 2.05 — Row 1", desc: "Height 16.5 cm, diameter 8.8 cm — for hotel and softer mattresses.", specs: ["Wire gauge: 2.05 mm", "Spring height: 16.5 cm", "Coil diameter: 8.8 cm"] },
    image: "/catalog/springs/bonnell-cutaway.jpg",
  },
  {
    id: "wire-2-05-r2",
    group: "springs",
    ar: { name: "سلك 2.05 — الصف الثاني", desc: "ارتفاع 16 سم وقطر 8.8 سم — أقل ارتفاع بنفس القطر.", specs: ["قطر السلك: 2.05 مم", "ارتفاع السوستة: 16 سم", "قطر السوستة: 8.8 سم"] },
    en: { name: "Wire 2.05 — Row 2", desc: "Height 16 cm, diameter 8.8 cm — lower height, same diameter.", specs: ["Wire gauge: 2.05 mm", "Spring height: 16 cm", "Coil diameter: 8.8 cm"] },
    image: "/catalog/springs/bonnell-1.jpg",
  },
  {
    id: "frame",
    group: "springs",
    ar: { name: "فريم — إطار السوست", desc: "إطار حديدي لمسك وحدة السوست وتقوية الحواف.", specs: ["خامة: سلك مجلفن", "يُحدد المقاس حسب الطلب", "للتوافق مع جميع وحدات البونيل"] },
    en: { name: "Frame — Border Wire", desc: "Steel border frame to secure the spring unit and reinforce edges.", specs: ["Material: galvanised wire", "Size made to order", "Fits all Bonnell units"] },
    image: "/catalog/springs/frame-1.jpg",
  },

  // --- POCKET ---
  {
    id: "pocket-general",
    group: "pocket",
    ar: { name: "رول بوكيت — مقاسات متعددة", desc: "رول بوكيت متوفر بارتفاعات 31، 25، 18، 29، 12، 14 سم وعرض 80. قص حسب مقاس المرتبة.", specs: ["الارتفاعات: 31 / 25 / 18 / 29 / 12 / 14 سم", "العرض: 80 سم", "النوع: سوست منفصلة مغلفة"], badge: "الأكثر طلبًا" },
    en: { name: "Pocket Roll — Multiple Heights", desc: "Pocket rolls in heights 31, 25, 18, 29, 12, 14 cm × 80 cm. Cut to mattress size.", specs: ["Heights: 31 / 25 / 18 / 29 / 12 / 14 cm", "Width: 80 cm", "Type: individually wrapped coils"], badge: "Best seller" },
    image: "/catalog/pocket/pocket-1.jpg",
    highlight: true,
  },
  {
    id: "pocket-25-80",
    group: "pocket",
    ar: { name: "بوكيت رول 25×80 — مقاس 1.85×4.80", desc: "رول بارتفاع 25 سم وعرض 80، بطول 1.85×4.80 م — لمراتب ماستر وكينج.", specs: ["ارتفاع البوكيت: 25 سم", "عرض الرول: 80 سم", "المقاس النهائي: 1.85 × 4.80 م"] },
    en: { name: "Pocket Roll 25×80 — 1.85×4.80", desc: "25 cm height × 80 cm width, length 1.85×4.80 m — for master and king sizes.", specs: ["Pocket height: 25 cm", "Roll width: 80 cm", "Sheet size: 1.85 × 4.80 m"] },
    image: "/catalog/pocket/pocket-2.jpg",
  },
  {
    id: "pocket-29-80",
    group: "pocket",
    ar: { name: "بوكيت رول 29×80 — مقاس 1.75×4.80", desc: "ارتفاع 29 سم وعرض 80، مقاس 1.75×4.80 م — ارتفاع إضافي وفخامة.", specs: ["ارتفاع البوكيت: 29 سم", "عرض الرول: 80 سم", "المقاس النهائي: 1.75 × 4.80 م"] },
    en: { name: "Pocket Roll 29×80 — 1.75×4.80", desc: "29 cm height × 80 cm width, 1.75×4.80 m — extra height and luxury.", specs: ["Pocket height: 29 cm", "Roll width: 80 cm", "Sheet size: 1.75 × 4.80 m"] },
    image: "/catalog/pocket/pocket-3.jpg",
  },

  // --- FOAM ---
  {
    id: "memory-roll-2",
    group: "foam",
    ar: { name: "ميموري رول — 2 سم (تركي)", desc: "رول ميموري فوم مستورد من تركيا بارتفاع 2 سم — طبقة راحة علوية.", specs: ["السماكة: 2 سم", "الشكل: رول مضغوط", "المصدر: تركيا — منشور 2025"], badge: "وارد تركيا" },
    en: { name: "Memory Roll — 2 cm (Turkish)", desc: "Imported Turkish memory foam roll, 2 cm — top comfort layer.", specs: ["Thickness: 2 cm", "Form: compressed roll", "Source: Turkey — 2025 post"], badge: "Turkey import" },
    image: "/catalog/foam/memory-2cm.jpg",
    highlight: true,
  },
  {
    id: "memory-roll-4",
    group: "foam",
    ar: { name: "ميموري رول — 4 سم (تركي)", desc: "رول ميموري فوم 4 سم — راحة أعمق واحتضان أفضل للجسم.", specs: ["السماكة: 4 سم", "الشكل: رول مضغوط", "المصدر: تركيا"], badge: "وارد تركيا" },
    en: { name: "Memory Roll — 4 cm (Turkish)", desc: "Memory foam roll 4 cm — deeper comfort and body contouring.", specs: ["Thickness: 4 cm", "Form: compressed roll", "Source: Turkey"], badge: "Turkey import" },
    image: "/catalog/foam/memory-4cm.png",
  },
  {
    id: "memory-sheet-2",
    group: "foam",
    ar: { name: "ميموري شيت — 2 سم", desc: "لوح ميموري فوم 2 سم — للقص حسب المقاس والطبقات.", specs: ["السماكة: 2 سم", "الشكل: ألواح / شيت", "الاستخدام: طبقة راحة"] },
    en: { name: "Memory Sheet — 2 cm", desc: "Memory foam sheet 2 cm — cut to size for layering.", specs: ["Thickness: 2 cm", "Form: sheet", "Use: comfort layer"] },
    image: "/catalog/foam/memory-roll-1.jpg",
  },
  {
    id: "memory-sheet-4",
    group: "foam",
    ar: { name: "ميموري شيت — 4 سم", desc: "لوح ميموري فوم 4 سم — للمراتب الفندقية والطبية.", specs: ["السماكة: 4 سم", "الشكل: ألواح / شيت", "الاستخدام: راحة فاخرة"] },
    en: { name: "Memory Sheet — 4 cm", desc: "Memory foam sheet 4 cm — for hotel and medical mattresses.", specs: ["Thickness: 4 cm", "Form: sheet", "Use: luxury comfort"] },
    image: "/catalog/foam/latex-2.jpg",
  },
  {
    id: "latex-2-5",
    group: "foam",
    ar: { name: "لاتكس — 2.5 سم", desc: "لاتكس طبيعي/صناعي بارتفاع 2.5 سم — تهوية ومرونة.", specs: ["السماكة: 2.5 سم", "الخامة: لاتكس", "الميزة: تهوية عالية"] },
    en: { name: "Latex — 2.5 cm", desc: "Natural/synthetic latex 2.5 cm — breathable and resilient.", specs: ["Thickness: 2.5 cm", "Material: latex", "Feature: high breathability"] },
    image: "/catalog/foam/latex-1.jpg",
  },
  {
    id: "latex-3",
    group: "foam",
    ar: { name: "لاتكس — 3 سم", desc: "لاتكس 3 سم — توازن مثالي بين الدعم والنعومة.", specs: ["السماكة: 3 سم", "الخامة: لاتكس", "الاستخدام: طبقة علوية"] },
    en: { name: "Latex — 3 cm", desc: "Latex 3 cm — ideal balance of support and softness.", specs: ["Thickness: 3 cm", "Material: latex", "Use: top layer"] },
    image: "/catalog/foam/latex-1.jpg",
  },
  {
    id: "latex-4",
    group: "foam",
    ar: { name: "لاتكس — 4 سم", desc: "لاتكس 4 سم — دعم متوسط إلى ناعم، يدوم طويلًا.", specs: ["السماكة: 4 سم", "الخامة: لاتكس", "المتانة: عالية"] },
    en: { name: "Latex — 4 cm", desc: "Latex 4 cm — medium-soft support, long-lasting.", specs: ["Thickness: 4 cm", "Material: latex", "Durability: high"] },
    image: "/catalog/foam/latex-2.jpg",
  },
  {
    id: "latex-5",
    group: "foam",
    ar: { name: "لاتكس — 5 سم", desc: "لاتكس 5 سم — أفخم طبقة راحة، للفنادق والمراتب الراقية.", specs: ["السماكة: 5 سم", "الخامة: لاتكس", "الفئة: فاخر"], badge: "فاخر" },
    en: { name: "Latex — 5 cm", desc: "Latex 5 cm — premium comfort layer for hotels and luxury mattresses.", specs: ["Thickness: 5 cm", "Material: latex", "Tier: premium"], badge: "Premium" },
    image: "/catalog/foam/latex-roll-1.webp",
  },

  // --- LANX / MATTRESS BLANKS ---
  {
    id: "lanx-160",
    group: "latex-mattress",
    ar: { name: "مراتب لانكس — عرض 2 م ارتفاع 18 سم طول 160", desc: "خام / لب مرتبة لانكس — عرض 2 متر، ارتفاع 18 سم، طول 160 سم. توريد خام فقط.", specs: ["العرض: 2 متر", "الارتفاع: 18 سم", "الطول: 160 سم", "تنبيه: خام مراتب — لسنا مصنع مراتب جاهزة"] },
    en: { name: "Lanx Core — 2m width 18cm height length 160", desc: "Lanx mattress core / blank — 2 m wide, 18 cm high, length 160 cm. Material supply only.", specs: ["Width: 2 m", "Height: 18 cm", "Length: 160 cm", "Note: material only — no finished mattresses"] },
    image: "/catalog/foam/latex-roll-2.webp",
  },
  {
    id: "lanx-180",
    group: "latex-mattress",
    ar: { name: "مراتب لانكس — ارتفاع 18 سم طول 180", desc: "نفس خام لانكس بطول 180 سم — للمراتب الكبيرة.", specs: ["الارتفاع: 18 سم", "الطول: 180 سم", "العرض: 2 متر (حسب الطلب)", "تنبيه: خام مراتب"] },
    en: { name: "Lanx Core — 18cm height length 180", desc: "Same Lanx core in length 180 cm — for larger mattresses.", specs: ["Height: 18 cm", "Length: 180 cm", "Width: 2 m (on request)", "Note: material supply"] },
    image: "/catalog/foam/latex-roll-1.webp",
  },

  // --- MATERIALS ---
  {
    id: "vaseline-210",
    group: "materials",
    ar: { name: "فازلين — 210 سم", desc: "قماش غير منسوج (PP) عرض 210 سم — للعزل والتغليف الداخلي.", specs: ["العرض: 210 سم", "الخامة: PP غير منسوج", "الاستخدام: عازل وتغليف"] },
    en: { name: "Non-woven — 210 cm", desc: "PP non-woven fabric width 210 cm — insulation and inner wrapping.", specs: ["Width: 210 cm", "Material: PP non-woven", "Use: insulator & wrap"] },
    image: "/catalog/materials/vaseline-1.jpg",
  },
  {
    id: "vaseline-160",
    group: "materials",
    ar: { name: "فازلين — 160 سم", desc: "عرض 160 سم — للجوانب والطبقات الوسطى.", specs: ["العرض: 160 سم", "الخامة: PP غير منسوج", "الاستخدام: جوانب وطبقات"] },
    en: { name: "Non-woven — 160 cm", desc: "Width 160 cm — for sides and middle layers.", specs: ["Width: 160 cm", "Material: PP non-woven", "Use: sides & layers"] },
    image: "/catalog/materials/vaseline-2.jpg",
  },
  {
    id: "vaseline-14",
    group: "materials",
    ar: { name: "فازلين — 14 سم", desc: "شريط بعرض 14 سم — للحواف والتقفيل الدقيق.", specs: ["العرض: 14 سم", "الخامة: PP غير منسوج", "الاستخدام: حواف وتقفيل"] },
    en: { name: "Non-woven — 14 cm", desc: "Tape width 14 cm — for edges and precise closing.", specs: ["Width: 14 cm", "Material: PP non-woven", "Use: edges & closing"] },
    image: "/catalog/materials/vaseline-1.jpg",
  },
  {
    id: "felt-cotton",
    group: "materials",
    ar: { name: "لباد قطن", desc: "لباد قطني عازل — يفصل السوست عن الفوم ويحميها.", specs: ["الخامة: قطن معاد / مخلوط", "الوظيفة: عازل سوست", "السماكة: حسب الطلب"] },
    en: { name: "Cotton Felt", desc: "Cotton insulator pad — separates springs from foam.", specs: ["Material: reclaimed cotton / blend", "Function: spring insulator", "Thickness: on request"] },
    image: "/catalog/materials/felt-1.jpg",
  },
  {
    id: "felt-cut",
    group: "materials",
    ar: { name: "لباد مقطع — جاهز", desc: "لباد مقصوص جاهز على مقاس المرتبة — يوفر وقت القص.", specs: ["الشكل: مقصوص جاهز", "المقاسات: حسب الطلب", "التوفير: وقت وجهد"] },
    en: { name: "Pre-cut Felt", desc: "Pre-cut felt pads ready for mattress size — saves cutting time.", specs: ["Form: pre-cut", "Sizes: made to order", "Saving: time & labour"] },
    image: "/catalog/materials/felt-2.jpg",
  },
  {
    id: "felt-roll",
    group: "materials",
    ar: { name: "لباد رول", desc: "لباد على شكل رول — للقص الحر والكميات الكبيرة.", specs: ["الشكل: رول", "العرض: حسب الطلب", "الاستخدام: إنتاج مستمر"] },
    en: { name: "Felt Roll", desc: "Felt in roll form — free cutting and bulk production.", specs: ["Form: roll", "Width: on request", "Use: continuous production"] },
    image: "/catalog/materials/felt-1.jpg",
  },
  {
    id: "glue",
    group: "materials",
    ar: { name: "غراء — لاصق مراتب", desc: "غراء رش/سائل لتثبيت الفوم والقماش واللباد.", specs: ["النوع: رش / سائل", "الاستخدام: تثبيت طبقات", "التعبئة: جالون / برميل"] },
    en: { name: "Adhesive — Mattress Glue", desc: "Spray/liquid adhesive to bond foam, fabric and felt.", specs: ["Type: spray / liquid", "Use: layer bonding", "Pack: gallon / drum"] },
    image: "/catalog/materials/glue-1.jpg",
  },
  {
    id: "thread-150-3",
    group: "materials",
    ar: { name: "خيط 150/3", desc: "خيط بوليستر 150D/3 — للخياطة والتطريز الصناعي للمراتب.", specs: ["النمرة: 150/3", "الخامة: بوليستر", "الاستخدام: خياطة مراتب"] },
    en: { name: "Thread 150/3", desc: "Polyester thread 150D/3 — for mattress quilting and sewing.", specs: ["Count: 150/3", "Material: polyester", "Use: mattress sewing"] },
    image: "/catalog/materials/thread-1.webp",
  },
  {
    id: "thread-40-2",
    group: "materials",
    ar: { name: "خيط 40/2", desc: "خيط 40/2 — أسمك، للخياطة الثقيلة وتقفيل الحواف.", specs: ["النمرة: 40/2", "الخامة: بوليستر / قطن", "الاستخدام: تقفيل حواف"] },
    en: { name: "Thread 40/2", desc: "Thread 40/2 — heavier, for heavy sewing and border closing.", specs: ["Count: 40/2", "Material: polyester / cotton", "Use: border closing"] },
    image: "/catalog/materials/thread-2.webp",
  },
  {
    id: "tape",
    group: "materials",
    ar: { name: "تيب — شريط الحافة", desc: "شريط تزيين وتقفيل حافة المرتبة — ألوان ونقشات متعددة.", specs: ["العرض: متعدد", "الخامة: بوليستر منسوج", "التركيب: بماكينة الشريط"] },
    en: { name: "Tape — Border Tape", desc: "Mattress border closing tape — multiple colours and patterns.", specs: ["Width: multiple", "Material: woven polyester", "Applied by: tape machine"] },
    image: "/catalog/materials/tape-1.jpg",
  },
  {
    id: "clips",
    group: "materials",
    ar: { name: "كلبس — مشبك تثبيت", desc: "مشابك C لتثبيت وحدة السوست بالإطار والشبكة.", specs: ["النوع: C-Ring / Hog Ring", "المقاس: حسب السلك", "التثبيت: بمسدس هواء"] },
    en: { name: "Clips — Hog Rings", desc: "C-rings to fasten spring unit to frame and mesh.", specs: ["Type: C-ring / hog ring", "Size: per wire gauge", "Applied by: pneumatic gun"] },
    image: "/catalog/materials/clips-1.jpg",
  },
  {
    id: "double",
    group: "materials",
    ar: { name: "دبل — مشبك مزدوج", desc: "مشبك دبل لربط سوستتين متجاورتين — تثبيت أقوى.", specs: ["النوع: دبل / Double Clip", "الوظيفة: ربط سوست", "المادة: مجلفن"] },
    en: { name: "Double Clips", desc: "Double clips to join two adjacent springs — stronger hold.", specs: ["Type: double clip", "Function: spring joining", "Material: galvanised"] },
    image: "/catalog/materials/clips-2.jpg",
  },
  {
    id: "shots-5mm",
    group: "materials",
    ar: { name: "طلقات 5 مم", desc: "طلقات/دبابيس 5 مم لمسدس الهواء — للتثبيت السريع.", specs: ["المقاس: 5 مم", "النوع: طلقات هواء", "التوافق: مسدسات الدبابيس"] },
    en: { name: "Shots 5 mm", desc: "5 mm shots / staples for pneumatic gun — fast fastening.", specs: ["Size: 5 mm", "Type: pneumatic shots", "Compat: staple guns"] },
    image: "/catalog/materials/shots-1.jpg",
  },

  // --- TOOLS ---
  {
    id: "gun-clips",
    group: "tools",
    ar: { name: "مسدس كلبس — هواء", desc: "مسدس هواء لتركيب كلبسات C-Ring بسرعة ودقة.", specs: ["النوع: نيوماتيك", "العيار: 14-16 Gauge", "الاستخدام: تثبيت سوست"], badge: "احترافي" },
    en: { name: "Clip Gun — Pneumatic", desc: "Pneumatic gun for C-ring clips — fast and precise.", specs: ["Type: pneumatic", "Gauge: 14-16", "Use: spring fastening"], badge: "Pro" },
    image: "/catalog/tools/clip-gun-1.jpg",
  },
  {
    id: "gun-double",
    group: "tools",
    ar: { name: "مسدس دبل — هواء", desc: "مسدس مخصص لمشابك الدبل المزدوجة.", specs: ["النوع: نيوماتيك", "الوظيفة: تركيب دبل", "الميزة: ضغط ثابت"] },
    en: { name: "Double Clip Gun — Pneumatic", desc: "Dedicated gun for double clips.", specs: ["Type: pneumatic", "Function: double clips", "Feature: consistent pressure"] },
    image: "/catalog/tools/clip-gun-2.jpg",
  },
  {
    id: "gun-glue",
    group: "tools",
    ar: { name: "مسدس غراء — حراري/هواء", desc: "مسدس غراء ساخن أو رش — لتوزيع الغراء بالتساوي.", specs: ["النوع: حراري / رش", "القدرة: 100W+", "الاستخدام: لصق فوم وقماش"] },
    en: { name: "Glue Gun — Hot / Spray", desc: "Hot-melt or spray glue gun — even adhesive distribution.", specs: ["Type: hot-melt / spray", "Power: 100W+", "Use: foam & fabric bonding"] },
    image: "/catalog/tools/glue-gun-1.jpg",
  },
];
