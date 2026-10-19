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

// Generated representative product images live in /public/catalog and /public/images; they are illustrations, not Nile Bed product or factory photos.
export const groups: CatalogGroup[] = [
  {
    id: "springs",
    ar: { kicker: "نصنعها في مصر", title: "السوست — تصنيع نايل بد", desc: "سوست بونيل بأقطار سلك 2.05–2.4 مم، وفريم، ورول سلك 1.3 مم. نصنّعها في مصر حسب الطلب، والمقاس والكمية يُؤكَّدان مع الفريق." },
    en: { kicker: "MADE IN EGYPT", title: "Springs — made by Nile Bed", desc: "Bonnell springs in 2.05–2.4 mm wire, plus frames and 1.3 mm wire rolls. Manufactured in Egypt to order; size and quantity confirmed with the team." },
    icon: "springs",
  },
  {
    id: "pocket",
    ar: { kicker: "سوست معزولة", title: "رول البوكيت — Pocket Roll", desc: "رولات بوكيت بارتفاعات 12 و14 و16 و18 سم، والكثافة تُحدَّد حسب الطلب. جاهزة للقص والتجميع في خطوط المراتب." },
    en: { kicker: "ISOLATED COILS", title: "Pocket Roll", desc: "Pocket rolls in 12, 14, 16 and 18 cm heights; density is set per order. Ready to cut and assemble on mattress lines." },
    icon: "pocket",
  },
  {
    id: "foam",
    ar: { kicker: "راحة ونوم", title: "الميموري واللاتكس", desc: "ميموري فوم تركي رول بارتفاع 2 و4 سم، ولاتكس نيوترال رولات 2.5 و3 و4 و5 سم باستيراد شرق آسيا." },
    en: { kicker: "COMFORT LAYERS", title: "Memory & Latex", desc: "Turkish memory-foam rolls in 2 and 4 cm, and neutral latex rolls in 2.5, 3, 4 and 5 cm imported from East Asia." },
    icon: "foam",
  },
  {
    id: "latex-mattress",
    ar: { kicker: "خامات مراتب", title: "لاتكس 15 و18 سم — خام مراتب", desc: "ألواح/لب مراتب لاتكس بسماكة 15 و18 سم، بمقاسات مختلفة حسب الطلب. توريد خام فقط — لا نصنّع مراتب جاهزة." },
    en: { kicker: "MATTRESS CORES", title: "Latex 15 & 18 cm — cores", desc: "Latex mattress cores/slabs in 15 and 18 cm, in different sizes per order. Material supply only — we do not make finished mattresses." },
    icon: "mattress",
  },
  {
    id: "materials",
    ar: { kicker: "الخامات المساعدة", title: "اللباد والفازلين واللوازم", desc: "لباد رول ومقطع: قطن وأبيض 2 سم، وأسود وثلاث درجات رمادي. السمك والكثافة للألوان الأخرى حسب الطلب. وتشمل الخامات أيضًا فازلين وغراء هوت ميلت تركي وخيوط كابوتينية وتيب 4.2 سم وميلتون وكلبس ودبل وبرشامة فريم." },
    en: { kicker: "AUXILIARY MATERIALS", title: "Felt, Non-woven & Supplies", desc: "Felt in rolls or pre-cut: cotton and white at 2 cm, plus black and three grey shades. Other thicknesses and density are confirmed on request. Also non-woven, Turkish hot-melt glue, quilting threads, 4.2 cm tape, Melton, clips, doubles and frame fasteners." },
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
    image: "/catalog/springs/bonnell-unit.jpg",
    highlight: true,
  },
  {
    id: "wire-2-4-r2",
    group: "springs",
    ar: { name: "سلك 2.4 — الصف الثاني", desc: "ارتفاع 16.5 سم وقطر 8.5 سم. توازن بين الدعم والراحة.", specs: ["قطر السلك: 2.4 مم", "ارتفاع السوستة: 16.5 سم", "قطر السوستة: 8.5 سم"] },
    en: { name: "Wire 2.4 — Row 2", desc: "Height 16.5 cm, diameter 8.5 cm. Balanced support and comfort.", specs: ["Wire gauge: 2.4 mm", "Spring height: 16.5 cm", "Coil diameter: 8.5 cm"] },
    image: "/catalog/springs/bonnell-unit.jpg",
  },
  {
    id: "wire-2-4-r3",
    group: "springs",
    ar: { name: "سلك 2.4 — الصف الثالث", desc: "نفس مواصفات الصف الثاني — دفعة/تجهيز مختلف حسب الطلب.", specs: ["قطر السلك: 2.4 مم", "ارتفاع السوستة: 16.5 سم", "قطر السوستة: 8.5 سم"] },
    en: { name: "Wire 2.4 — Row 3", desc: "Same spec as Row 2 — different batch / preparation per order.", specs: ["Wire gauge: 2.4 mm", "Spring height: 16.5 cm", "Coil diameter: 8.5 cm"] },
    image: "/catalog/springs/bonnell-unit.jpg",
  },
  {
    id: "wire-2-3",
    group: "springs",
    ar: { name: "سلك 2.3", desc: "ارتفاع 16.5 سم وقطر 8.6 سم — مرونة أعلى قليلًا.", specs: ["قطر السلك: 2.3 مم", "ارتفاع السوستة: 16.5 سم", "قطر السوستة: 8.6 سم"] },
    en: { name: "Wire 2.3", desc: "Height 16.5 cm, diameter 8.6 cm — slightly more flexibility.", specs: ["Wire gauge: 2.3 mm", "Spring height: 16.5 cm", "Coil diameter: 8.6 cm"] },
    image: "/catalog/springs/bonnell-unit.jpg",
  },
  {
    id: "wire-2-2",
    group: "springs",
    ar: { name: "سلك 2.2", desc: "ارتفاع 16.5 سم وقطر 8.8 سم — إحساس أنعم.", specs: ["قطر السلك: 2.2 مم", "ارتفاع السوستة: 16.5 سم", "قطر السوستة: 8.8 سم"] },
    en: { name: "Wire 2.2", desc: "Height 16.5 cm, diameter 8.8 cm — softer feel.", specs: ["Wire gauge: 2.2 mm", "Spring height: 16.5 cm", "Coil diameter: 8.8 cm"] },
    image: "/catalog/springs/bonnell-unit.jpg",
  },
  {
    id: "wire-2-05-r1",
    group: "springs",
    ar: { name: "سلك 2.05 — الصف الأول", desc: "ارتفاع 16.5 سم وقطر 8.8 سم — للمراتب الفندقية والطرية.", specs: ["قطر السلك: 2.05 مم", "ارتفاع السوستة: 16.5 سم", "قطر السوستة: 8.8 سم"] },
    en: { name: "Wire 2.05 — Row 1", desc: "Height 16.5 cm, diameter 8.8 cm — for hotel and softer mattresses.", specs: ["Wire gauge: 2.05 mm", "Spring height: 16.5 cm", "Coil diameter: 8.8 cm"] },
    image: "/catalog/springs/bonnell-unit.jpg",
  },
  {
    id: "wire-2-05-r2",
    group: "springs",
    ar: { name: "سلك 2.05 — الصف الثاني", desc: "ارتفاع 16 سم وقطر 8.8 سم — أقل ارتفاع بنفس القطر.", specs: ["قطر السلك: 2.05 مم", "ارتفاع السوستة: 16 سم", "قطر السوستة: 8.8 سم"] },
    en: { name: "Wire 2.05 — Row 2", desc: "Height 16 cm, diameter 8.8 cm — lower height, same diameter.", specs: ["Wire gauge: 2.05 mm", "Spring height: 16 cm", "Coil diameter: 8.8 cm"] },
    image: "/catalog/springs/bonnell-unit.jpg",
  },
  {
    id: "frame",
    group: "springs",
    ar: { name: "فريم — إطار السوست", desc: "إطار حديدي لمسك وحدة السوست وتقوية الحواف، ويُثبَّت بالكلبس والدبل وبرشامة الفريم.", specs: ["خامة: سلك مجلفن", "المقاس: حسب الطلب", "التثبيت: كلبس / دبل / برشامة فريم"] },
    en: { name: "Frame — Border Wire", desc: "Steel border frame that secures the spring unit and reinforces the edges, fastened with clips, doubles and frame fasteners.", specs: ["Material: galvanised wire", "Size: made to order", "Fastening: clips / doubles / frame fastener"] },
    image: "/images/spring-border-frame.webp",
  },
  {
    id: "wire-roll-1-3",
    group: "springs",
    ar: { name: "رول سلك 1.3 مم", desc: "رول سلك 1.3 مم — خامة سلك متاحة بالرول للسوست والفريم حسب الطلب.", specs: ["قطر السلك: 1.3 مم", "الشكل: رول", "الاستخدام: سوست وفريم", "المقاس والكمية: حسب الطلب"], badge: "متوفر" },
    en: { name: "Wire Roll — 1.3 mm", desc: "1.3 mm wire supplied on a roll for springs and frames, made to order.", specs: ["Wire gauge: 1.3 mm", "Form: roll", "Use: springs & frames", "Size and quantity: on request"], badge: "In stock" },
    image: "/catalog/springs/wire-roll.jpg",
  },

  // --- POCKET ---
  {
    id: "pocket-general",
    group: "pocket",
    ar: { name: "رول بوكيت — ارتفاعات 12 / 14 / 16 / 18", desc: "رول بوكيت بأربعة ارتفاعات، والكثافة تُحدَّد حسب الطلب. يُقص على مقاس المرتبة.", specs: ["الارتفاعات: 12 / 14 / 16 / 18 سم", "الكثافة: حسب الطلب", "النوع: سوست منفصلة مغلفة", "القص: على مقاس المرتبة"], badge: "الأكثر طلبًا" },
    en: { name: "Pocket Roll — 12 / 14 / 16 / 18", desc: "Pocket roll in four heights, with density set per order. Cut to mattress size.", specs: ["Heights: 12 / 14 / 16 / 18 cm", "Density: on request", "Type: individually wrapped coils", "Cutting: to mattress size"], badge: "Best seller" },
    image: "/images/pocket-spring-unit.webp",
    highlight: true,
  },
  {
    id: "pocket-12-14",
    group: "pocket",
    ar: { name: "بوكيت 12 و14 سم — للطبقات الرفيعة", desc: "ارتفاعان منخفضان للطبقات الرفيعة والتوبات، بكثافة تُحدَّد حسب الطلب.", specs: ["الارتفاعات: 12 / 14 سم", "الكثافة: حسب الطلب", "الاستخدام: طبقات رفيعة وتوبات"] },
    en: { name: "Pocket 12 & 14 cm — Low Profile", desc: "Two lower heights for slim layers and toppers, with density set per order.", specs: ["Heights: 12 / 14 cm", "Density: on request", "Use: slim layers & toppers"] },
    image: "/images/pocket-spring-unit.webp",
  },
  {
    id: "pocket-16-18",
    group: "pocket",
    ar: { name: "بوكيت 16 و18 سم — للارتفاعات الكاملة", desc: "ارتفاعان كاملان لوحدات البوكيت القياسية، بكثافة تُحدَّد حسب الطلب.", specs: ["الارتفاعات: 16 / 18 سم", "الكثافة: حسب الطلب", "الاستخدام: وحدات بوكيت قياسية"] },
    en: { name: "Pocket 16 & 18 cm — Full Height", desc: "Two full heights for standard pocket units, with density set per order.", specs: ["Heights: 16 / 18 cm", "Density: on request", "Use: standard pocket units"] },
    image: "/images/pocket-spring-unit.webp",
  },

  // --- FOAM ---
  {
    id: "memory-roll-2",
    group: "foam",
    ar: { name: "ميموري رول — 2 سم (تركي)", desc: "رول ميموري فوم مستورد من تركيا بارتفاع 2 سم — طبقة راحة علوية.", specs: ["السماكة: 2 سم", "الشكل: رول مضغوط", "المصدر: تركيا"], badge: "تركي" },
    en: { name: "Memory Roll — 2 cm (Turkish)", desc: "Imported Turkish memory foam roll, 2 cm — top comfort layer.", specs: ["Thickness: 2 cm", "Form: compressed roll", "Source: Turkey"], badge: "Turkish" },
    image: "/catalog/foam/memory-rolls.jpg",
    highlight: true,
  },
  {
    id: "memory-roll-4",
    group: "foam",
    ar: { name: "ميموري رول — 4 سم (تركي)", desc: "رول ميموري فوم تركي 4 سم — راحة أعمق واحتضان أفضل للجسم.", specs: ["السماكة: 4 سم", "الشكل: رول مضغوط", "المصدر: تركيا"], badge: "تركي" },
    en: { name: "Memory Roll — 4 cm (Turkish)", desc: "Turkish memory foam roll 4 cm — deeper comfort and body contouring.", specs: ["Thickness: 4 cm", "Form: compressed roll", "Source: Turkey"], badge: "Turkish" },
    image: "/catalog/foam/memory-rolls.jpg",
  },
  {
    id: "latex-2-5",
    group: "foam",
    ar: { name: "لاتكس نيوترال — 2.5 سم", desc: "لاتكس نيوترال مستورد من شرق آسيا بارتفاع 2.5 سم — تهوية ومرونة.", specs: ["السماكة: 2.5 سم", "النوع: لاتكس نيوترال رول", "المصدر: استيراد شرق آسيا"], badge: "استيراد شرق آسيا" },
    en: { name: "Neutral Latex — 2.5 cm", desc: "Neutral latex imported from East Asia, 2.5 cm — breathable and resilient.", specs: ["Thickness: 2.5 cm", "Type: neutral latex roll", "Source: East Asia import"], badge: "East Asia import" },
    image: "/catalog/foam/latex-core.jpg",
  },
  {
    id: "latex-3",
    group: "foam",
    ar: { name: "لاتكس نيوترال — 3 سم", desc: "لاتكس نيوترال 3 سم — توازن مثالي بين الدعم والنعومة.", specs: ["السماكة: 3 سم", "النوع: لاتكس نيوترال رول", "المصدر: استيراد شرق آسيا"] },
    en: { name: "Neutral Latex — 3 cm", desc: "Neutral latex 3 cm — ideal balance of support and softness.", specs: ["Thickness: 3 cm", "Type: neutral latex roll", "Source: East Asia import"] },
    image: "/catalog/foam/latex-core.jpg",
  },
  {
    id: "latex-4",
    group: "foam",
    ar: { name: "لاتكس نيوترال — 4 سم", desc: "لاتكس نيوترال 4 سم — دعم متوسط إلى ناعم، يدوم طويلًا.", specs: ["السماكة: 4 سم", "النوع: لاتكس نيوترال رول", "المصدر: استيراد شرق آسيا"] },
    en: { name: "Neutral Latex — 4 cm", desc: "Neutral latex 4 cm — medium-soft support, long-lasting.", specs: ["Thickness: 4 cm", "Type: neutral latex roll", "Source: East Asia import"] },
    image: "/catalog/foam/latex-core.jpg",
  },
  {
    id: "latex-5",
    group: "foam",
    ar: { name: "لاتكس نيوترال — 5 سم", desc: "لاتكس نيوترال 5 سم — أفخم طبقة راحة، للفنادق والمراتب الراقية.", specs: ["السماكة: 5 سم", "النوع: لاتكس نيوترال رول", "المصدر: استيراد شرق آسيا"], badge: "فاخر" },
    en: { name: "Neutral Latex — 5 cm", desc: "Neutral latex 5 cm — premium comfort layer for hotels and luxury mattresses.", specs: ["Thickness: 5 cm", "Type: neutral latex roll", "Source: East Asia import"], badge: "Premium" },
    image: "/catalog/foam/latex-core.jpg",
  },

  // --- LATEX MATTRESS CORES ---
  {
    id: "latex-core-15",
    group: "latex-mattress",
    ar: { name: "مراتب لاتكس — 15 سم (خام)", desc: "لب/خام مرتبة لاتكس بسماكة 15 سم — بمقاسات مختلفة حسب الطلب. توريد خام فقط.", specs: ["السماكة: 15 سم", "المقاسات: حسب الطلب", "النوع: خام مرتبة لاتكس", "تنبيه: توريد خام — لسنا مصنع مراتب جاهزة"] },
    en: { name: "Latex Core — 15 cm", desc: "Latex mattress core/slab 15 cm thick — different sizes made to order. Material supply only.", specs: ["Thickness: 15 cm", "Sizes: on request", "Type: latex mattress core", "Note: material only — no finished mattresses"] },
    image: "/catalog/foam/latex-core.jpg",
    highlight: true,
  },
  {
    id: "latex-core-18",
    group: "latex-mattress",
    ar: { name: "مراتب لاتكس — 18 سم (خام)", desc: "لب/خام مرتبة لاتكس بسماكة 18 سم — بمقاسات مختلفة حسب الطلب.", specs: ["السماكة: 18 سم", "المقاسات: حسب الطلب", "النوع: خام مرتبة لاتكس", "تنبيه: توريد خام"] },
    en: { name: "Latex Core — 18 cm", desc: "Latex mattress core/slab 18 cm thick — different sizes made to order.", specs: ["Thickness: 18 cm", "Sizes: on request", "Type: latex mattress core", "Note: material supply"] },
    image: "/catalog/foam/latex-core.jpg",
  },

  // --- MATERIALS ---
  {
    id: "vaseline-210",
    group: "materials",
    ar: { name: "فازلين — 10 جم عرض 210 سم", desc: "قماش غير منسوج (PP) عرض 210 سم بوزن 10 جم — للعزل والتغليف الداخلي.", specs: ["العرض: 210 سم", "الوزن: 10 جم", "الخامة: PP غير منسوج", "الاستخدام: عازل وتغليف"] },
    en: { name: "Non-woven — 10 g, 210 cm", desc: "PP non-woven fabric, 210 cm wide at 10 g — insulation and inner wrapping.", specs: ["Width: 210 cm", "Weight: 10 g", "Material: PP non-woven", "Use: insulator & wrap"] },
    image: "/catalog/materials/nonwoven-rolls.jpg",
  },
  {
    id: "vaseline-160",
    group: "materials",
    ar: { name: "فازلين — 160 سم", desc: "عرض 160 سم — للجوانب والطبقات الوسطى.", specs: ["العرض: 160 سم", "الخامة: PP غير منسوج", "الاستخدام: جوانب وطبقات"] },
    en: { name: "Non-woven — 160 cm", desc: "Width 160 cm — for sides and middle layers.", specs: ["Width: 160 cm", "Material: PP non-woven", "Use: sides & layers"] },
    image: "/catalog/materials/nonwoven-rolls.jpg",
  },
  {
    id: "vaseline-15",
    group: "materials",
    ar: { name: "فازلين — 15 سم / 50 جم", desc: "شريط بعرض 15 سم بوزن 50 جم/م² — للحواف والتقفيل الدقيق.", specs: ["العرض: 15 سم", "الوزن: 50 جم/م²", "الخامة: PP غير منسوج", "الاستخدام: حواف وتقفيل"] },
    en: { name: "Non-woven — 15 cm / 50 g", desc: "15 cm tape at 50 g/m² — for edges and precise closing.", specs: ["Width: 15 cm", "Weight: 50 g/m²", "Material: PP non-woven", "Use: edges & closing"] },
    image: "/catalog/materials/nonwoven-rolls.jpg",
  },
  {
    id: "felt-cotton",
    group: "materials",
    ar: { name: "لباد قطن — 2 سم", desc: "لباد قطني عازل بسماكة 2 سم — يفصل السوست عن الفوم ويحميها. الكثافة حسب الطلب.", specs: ["الخامة: قطن", "السماكة: 2 سم", "الكثافة: حسب الطلب", "الوظيفة: عازل سوست"] },
    en: { name: "Cotton Felt — 2 cm", desc: "Cotton insulator pad, 2 cm thick — separates springs from foam. Density on request.", specs: ["Material: cotton", "Thickness: 2 cm", "Density: on request", "Function: spring insulator"] },
    image: "/catalog/materials/felt-rolls.jpg",
  },
  {
    id: "felt-white",
    group: "materials",
    ar: { name: "لباد أبيض — 2 سم", desc: "لباد أبيض بسماكة 2 سم للعزل والتغطية الداخلية. الكثافة حسب الطلب.", specs: ["اللون: أبيض", "السماكة: 2 سم", "الكثافة: حسب الطلب", "الشكل: رول / مقطع"] },
    en: { name: "White Felt — 2 cm", desc: "White felt, 2 cm thick, for insulation and inner covering. Density on request.", specs: ["Colour: white", "Thickness: 2 cm", "Density: on request", "Form: roll / pre-cut"] },
    image: "/catalog/materials/felt-colors.jpg",
  },
  {
    id: "felt-cut",
    group: "materials",
    ar: { name: "لباد مقطع — قطن وأبيض", desc: "لباد مقصوص جاهز على مقاس المرتبة — قطن أو أبيض 2 سم، والكثافة حسب الطلب.", specs: ["الشكل: مقطع جاهز", "السماكة: 2 سم", "الأصناف: قطن / أبيض", "الكثافة: حسب الطلب"] },
    en: { name: "Pre-cut Felt — Cotton & White", desc: "Pre-cut felt ready for the mattress size — cotton or white, 2 cm. Density on request.", specs: ["Form: pre-cut", "Thickness: 2 cm", "Types: cotton / white", "Density: on request"] },
    image: "/catalog/materials/felt-colors.jpg",
  },
  {
    id: "felt-roll",
    group: "materials",
    ar: { name: "لباد رول — قطن وأبيض", desc: "لباد رول للقص الحر والكميات الكبيرة — قطن أو أبيض 2 سم، بكثافة حسب الطلب.", specs: ["الشكل: رول", "السماكة: 2 سم", "الأصناف: قطن / أبيض", "الكثافة: حسب الطلب"] },
    en: { name: "Felt Roll — Cotton & White", desc: "Felt in roll form for free cutting and bulk production — cotton or white, 2 cm. Density on request.", specs: ["Form: roll", "Thickness: 2 cm", "Types: cotton / white", "Density: on request"] },
    image: "/catalog/materials/felt-rolls.jpg",
  },
  {
    id: "felt-black",
    group: "materials",
    ar: { name: "لباد أسود — رول أو مقطع", desc: "لباد عازل باللون الأسود، متاح رول أو مقطع حسب الطلب. السمك والكثافة والمقاس تُؤكَّد مع الفريق.", specs: ["اللون: أسود", "الشكل: رول أو مقطع", "السمك والكثافة: حسب الطلب"] },
    en: { name: "Black Felt — Roll or Pre-cut", desc: "Black insulating felt available in roll or pre-cut form. Thickness, density and size are confirmed with the team.", specs: ["Colour: black", "Form: roll or pre-cut", "Thickness & density: on request"] },
    image: "/catalog/materials/felt-colors.jpg",
  },
  {
    id: "felt-gray",
    group: "materials",
    ar: { name: "لباد رمادي — ثلاث درجات", desc: "لباد عازل بثلاث درجات من الرمادي، متاح رول أو مقطع حسب الطلب. السمك والكثافة والمقاس تُؤكَّد مع الفريق.", specs: ["الألوان: ثلاث درجات رمادي", "الشكل: رول أو مقطع", "السمك والكثافة: حسب الطلب"] },
    en: { name: "Grey Felt — Three Shades", desc: "Insulating felt in three shades of grey, available in roll or pre-cut form. Thickness, density and size are confirmed with the team.", specs: ["Colour: three shades of grey", "Form: roll or pre-cut", "Thickness & density: on request"] },
    image: "/catalog/materials/felt-colors.jpg",
  },
  {
    id: "glue",
    group: "materials",
    ar: { name: "غراء هوت ميلت — تركي", desc: "غراء هوت ميلت تركي بجودة ممتازة — صفيحة قايم 14 وصافي 13.", specs: ["النوع: هوت ميلت", "المصدر: تركيا", "العبوة: صفيحة — قايم 14 / صافي 13", "الجودة: ممتازة"], badge: "تركي" },
    en: { name: "Hot-Melt Adhesive — Turkish", desc: "Turkish hot-melt adhesive, excellent quality — slab, 14 standing / 13 net.", specs: ["Type: hot melt", "Source: Turkey", "Pack: slab — 14 standing / 13 net", "Quality: excellent"], badge: "Turkish" },
    image: "/catalog/materials/thread-supplies.jpg",
    highlight: true,
  },
  {
    id: "thread-150-3",
    group: "materials",
    ar: { name: "خيط كابوتينية 150/3", desc: "خيط كابوتينية 150/3 — للخياطة والتنجيد الصناعي للمراتب.", specs: ["النمرة: 150/3", "الخامة: بوليستر", "الاستخدام: كابوتينية وخياطة مراتب"] },
    en: { name: "Quilting Thread 150/3", desc: "Quilting thread 150/3 — for industrial mattress sewing and quilting.", specs: ["Count: 150/3", "Material: polyester", "Use: quilting & mattress sewing"] },
    image: "/catalog/materials/thread-supplies.jpg",
  },
  {
    id: "thread-40-2",
    group: "materials",
    ar: { name: "خيط كابوتينية 40/2", desc: "خيط كابوتينية 40/2 — أسمك، للخياطة الثقيلة وتقفيل الحواف.", specs: ["النمرة: 40/2", "الخامة: بوليستر / قطن", "الاستخدام: تقفيل حواف"] },
    en: { name: "Quilting Thread 40/2", desc: "Quilting thread 40/2 — heavier, for heavy sewing and border closing.", specs: ["Count: 40/2", "Material: polyester / cotton", "Use: border closing"] },
    image: "/catalog/materials/thread-supplies.jpg",
  },
  {
    id: "thread-210-3",
    group: "materials",
    ar: { name: "خيط كابوتينية 210/3", desc: "خيط كابوتينية 210/3 — للخياطة السميكة والتطريز الصناعي.", specs: ["النمرة: 210/3", "الخامة: بوليستر", "الاستخدام: خياطة سميكة"] },
    en: { name: "Quilting Thread 210/3", desc: "Quilting thread 210/3 — for thick sewing and industrial embroidery.", specs: ["Count: 210/3", "Material: polyester", "Use: heavy sewing"] },
    image: "/catalog/materials/thread-supplies.jpg",
  },
  {
    id: "tape",
    group: "materials",
    ar: { name: "تيب 4.2 سم — بجميع ألوانه", desc: "شريط تقفيل حافة المرتبة بعرض 4.2 سم — متوفر بجميع الألوان.", specs: ["العرض: 4.2 سم", "الألوان: جميع الألوان", "الخامة: بوليستر منسوج", "الاستخدام: تقفيل الحافة"] },
    en: { name: "Tape 4.2 cm — All Colours", desc: "Mattress border closing tape, 4.2 cm wide — available in all colours.", specs: ["Width: 4.2 cm", "Colours: all colours", "Material: woven polyester", "Use: border closing"] },
    image: "/catalog/materials/thread-supplies.jpg",
  },
  {
    id: "clips",
    group: "materials",
    ar: { name: "كلبس — مشبك تثبيت", desc: "مشابك C لتثبيت وحدة السوست بالفريم والشبكة.", specs: ["النوع: C-Ring / Hog Ring", "المقاس: حسب السلك", "التثبيت: بمسدس هواء"] },
    en: { name: "Clips — Hog Rings", desc: "C-rings to fasten the spring unit to the frame and mesh.", specs: ["Type: C-ring / hog ring", "Size: per wire gauge", "Applied by: pneumatic gun"] },
    image: "/catalog/materials/fasteners.svg",
  },
  {
    id: "double",
    group: "materials",
    ar: { name: "دبل — مشبك مزدوج", desc: "مشبك دبل لربط سوستتين متجاورتين — تثبيت أقوى.", specs: ["النوع: دبل / Double Clip", "الوظيفة: ربط سوست", "المادة: مجلفن"] },
    en: { name: "Double Clips", desc: "Double clips to join two adjacent springs — stronger hold.", specs: ["Type: double clip", "Function: spring joining", "Material: galvanised"] },
    image: "/catalog/materials/fasteners.svg",
  },
  {
    id: "frame-fastener",
    group: "materials",
    ar: { name: "برشامة فريم", desc: "برشامة تثبيت خاصة بفريم السوست — تُستخدم مع الكلبس والدبل في تجميع الشاسيه.", specs: ["الاستخدام: تثبيت الفريم", "المقاس: حسب سلك الفريم", "التوافق: مسدس الكلبس"] },
    en: { name: "Frame Fastener — Bershama", desc: "Fastener dedicated to the spring frame, used with clips and doubles when assembling the unit.", specs: ["Use: frame fastening", "Size: per frame wire", "Compatibility: clip gun"] },
    image: "/catalog/materials/fasteners.svg",
  },
  {
    id: "melton-fur",
    group: "materials",
    ar: { name: "ميلتون فرو", desc: "قماش ميلتون فرو للتنجيد والتغطية — متوفر حسب الطلب.", specs: ["النوع: ميلتون فرو", "الاستخدام: تنجيد وتغطية", "التوافر: حسب الطلب"] },
    en: { name: "Melton Fur", desc: "Melton fur fabric for upholstery and covering — available to order.", specs: ["Type: Melton fur", "Use: upholstery & covering", "Availability: on request"] },
    image: "/catalog/materials/nonwoven-rolls.jpg",
  },
  {
    id: "melton-spanish",
    group: "materials",
    ar: { name: "ميلتون إسباني", desc: "ميلتون إسباني للتنجيد والمراتب — خامة مستوردة.", specs: ["النوع: ميلتون إسباني", "المصدر: إسبانيا", "الاستخدام: تنجيد ومراتب"], badge: "إسباني" },
    en: { name: "Spanish Melton", desc: "Spanish Melton for upholstery and mattresses — imported material.", specs: ["Type: Spanish Melton", "Source: Spain", "Use: upholstery & mattresses"], badge: "Spanish" },
    image: "/catalog/materials/felt-colors.jpg",
  },
  {
    id: "shots-5mm",
    group: "materials",
    ar: { name: "طلقات 5 مم", desc: "طلقات/دبابيس 5 مم لمسدس الهواء — للتثبيت السريع.", specs: ["المقاس: 5 مم", "النوع: طلقات هواء", "التوافق: مسدسات الدبابيس"] },
    en: { name: "Shots 5 mm", desc: "5 mm shots / staples for pneumatic gun — fast fastening.", specs: ["Size: 5 mm", "Type: pneumatic shots", "Compat: staple guns"] },
    image: "/catalog/materials/fasteners.svg",
  },

  // --- TOOLS ---
  {
    id: "gun-clips",
    group: "tools",
    ar: { name: "مسدس كلبس — هواء", desc: "مسدس هواء لتركيب كلبسات C-Ring بسرعة ودقة.", specs: ["النوع: نيوماتيك", "العيار: 14-16 Gauge", "الاستخدام: تثبيت سوست"], badge: "احترافي" },
    en: { name: "Clip Gun — Pneumatic", desc: "Pneumatic gun for C-ring clips — fast and precise.", specs: ["Type: pneumatic", "Gauge: 14-16", "Use: spring fastening"], badge: "Pro" },
    image: "/catalog/tools/fastening-tools.jpg",
  },
  {
    id: "gun-double",
    group: "tools",
    ar: { name: "مسدس دبل — هواء", desc: "مسدس مخصص لمشابك الدبل المزدوجة.", specs: ["النوع: نيوماتيك", "الوظيفة: تركيب دبل", "الميزة: ضغط ثابت"] },
    en: { name: "Double Clip Gun — Pneumatic", desc: "Dedicated gun for double clips.", specs: ["Type: pneumatic", "Function: double clips", "Feature: consistent pressure"] },
    image: "/catalog/tools/fastening-tools.jpg",
  },
  {
    id: "gun-glue",
    group: "tools",
    ar: { name: "مسدس غراء — حراري/هواء", desc: "مسدس غراء ساخن أو رش — لتوزيع الغراء بالتساوي.", specs: ["النوع: حراري / رش", "القدرة: 100W+", "الاستخدام: لصق فوم وقماش"] },
    en: { name: "Glue Gun — Hot / Spray", desc: "Hot-melt or spray glue gun — even adhesive distribution.", specs: ["Type: hot-melt / spray", "Power: 100W+", "Use: foam & fabric bonding"] },
    image: "/catalog/tools/fastening-tools.jpg",
  },
];
