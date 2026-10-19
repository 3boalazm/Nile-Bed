'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, Globe2, Truck, Layers3, BadgeCheck, Mail, Phone, CircleHelp, Check, Moon, Sun, Network } from 'lucide-react';
import { items } from './catalog/data';

type Lang = 'ar' | 'en';
const copy = {
  en: {
    nav: ['Catalog', 'Mattress cycle', 'Partners', 'Contact'],
    eyebrow: 'A COMPLETE MATTRESS-MAKING SUPPLY CYCLE · EGYPT',
    titleA: 'Everything', titleB: 'behind your next', titleC: 'great mattress.',
    intro: 'Made-in-Egypt springs, carefully sourced materials, and a trusted partner network for fabric and sponge. One coordinated supply route for mattress makers.',
    explore: 'Explore the catalog', quote: 'Talk to our team', note: 'One coordinated supply route. Flexible options. Built around your production.', heroVisualKicker: 'THE MATTRESS-MAKING CYCLE', heroStatLabel: 'catalog items', heroGroupsLabel: 'supply categories', heroVisualNote: 'One clear place to start. We confirm the right product, specification and supply route with you.',
    since: 'MADE FOR MATTRESS MAKERS', introLabel: 'YOUR PRODUCTION, CONNECTED', introTitle: 'Bring the mattress-making supply chain closer.',
    introBody: 'Nile Bed manufactures springs in Egypt and brings together the materials mattress makers need: pocket units, memory foam, imported latex, felt, glue, threads and assembly supplies. Need fabric or sponge? We connect you with a partner. Discuss specifications and availability with one team, then source each item through the right channel.',
    introFoot: 'One point of contact to coordinate a broader supply list.',
    scopeKicker: 'A MORE CONNECTED SUPPLY CYCLE',
    scopeTitle: 'From spring wire to the finishing layers.',
    scopeText: 'We make springs, supply mattress materials and connect customers with partner suppliers for fabric and sponge. One coordinated conversation; the right supplier for each product.',
    scopeCards: [
      ['01', 'Made in Egypt', 'Bonnell springs, frames and wire rolls manufactured to your order.'],
      ['02', 'Sourced for production', 'Pocket springs, foam, latex, felt, glue, threads and assembly supplies.'],
      ['03', 'Partner connected', 'Fabric and sponge through our partners; the partner handles the sale and supply.'],
    ],
    cycleKicker: 'ONE COORDINATED SUPPLY ROUTE', cycleTitle: 'Less chasing suppliers. More time for production.', cycleBody: 'Bring your spring, foam and production-supply needs to one conversation. We coordinate what Nile Bed supplies directly and connect you with partners for fabric and sponge—helping reduce repeat trips, scattered orders and uncertainty around each item’s cost and margin.', cycleBenefits: [['01','Save time','Coordinate multiple categories through one point of contact.'],['02','Reduce the runaround','Fewer separate trips and fewer disconnected supplier conversations.'],['03','See the full picture','Compare specifications, costs and margins across the order before confirming.']],
    productionKicker: 'BUILT AROUND YOUR ORDER', productionTitle: 'Large production plans. Flexible technical choices.', productionBody: 'Share your target quantity, application and technical requirements. We review available options with you, confirm specifications and plan supply in a way that protects consistency across the order. Large-volume enquiries are welcome; capacity and lead time are confirmed for each brief.', productionPoints: ['Flexible product specifications','Quality checks at order planning','Large-volume enquiries welcome'],
    supplierKicker: 'FOR QUALITY-FOCUSED SUPPLIERS', supplierTitle: 'Have a product mattress makers should know about?', supplierBody: 'We welcome suppliers who can offer consistently high quality, competitive market terms and reliable supply. Tell us about your product, specifications, origin and production capacity so we can explore a fit.', supplierCta: 'Introduce your product',
    importKicker: 'IMPORT OPPORTUNITIES', importTitle: 'Let’s bring standout products closer to the market.', importBody: 'We are open to distinctive imported materials and production products that meet a clear need, offer strong quality and compete in the market. Share the source, technical details, samples and supply plan for review.', importCta: 'Discuss an import opportunity',
    partnershipKicker: 'A LONG-TERM PARTNER, NOT A ONE-OFF ORDER', partnershipTitle: 'Start with one order. Build a stronger supply relationship.', partnershipBody: 'When the fit is right, flexible specifications, clear communication and reliable supply can grow into an ongoing partnership. Tell us what would make that work for your business.', partnershipCta: 'Start a conversation',
    productsKicker: 'THE CATALOG', productsTitle: 'Build the supply list that fits your line.', productsDesc: 'Explore the categories we manufacture and supply, then tell us your specs and quantities. Fabric and sponge are available through partner introductions; stock and terms are confirmed per enquiry.',
    enquire: 'Enquire about this', details: 'Ask our team', illustrative: 'CATEGORY DETAILS CONFIRMED ON ENQUIRY',
    processTag: 'HOW WE WORK', processTitle: 'A clear brief. A considered supply plan.', processDesc: 'We review your requirements, confirm technical details and coordinate the right supply route—direct or through a partner.',
    steps: [['01','Share your brief','Tell us the application, approximate quantity, and any technical requirements.'],['02','Review together','Our team can discuss available options and confirm specifications.'],['03','Plan supply','Align on packaging, timing, and delivery details for your order.']],
    capabilityKicker: 'WHY NILE BED', capabilityTitle: 'Our edge in Egypt starts with springs—and extends to carefully chosen imports.', capabilityBody: 'Nile Bed makes springs in Egypt and imports latex, memory foam and glue for mattress makers. Need fabric or sponge? Tell us what you’re looking for and we’ll connect you with the right partner, so you can buy at a special price.', capabilityCta: 'Explore what we do', capabilityCards: [['01','Made here','Bonnell springs, frames and 1.3 mm wire rolls — manufactured in Egypt to your order.'],['02','Sourced with care','Imported latex, memory foam and glue, with specifications confirmed for each enquiry.'],['03','A useful introduction','Fabric and sponge come through our partners. Share your needs and we’ll help you find the right supplier at a special price.']],
    aboutKicker: 'ABOUT NILE BED', aboutTitle: 'We make springs. We supply the rest.', aboutText: 'Nile Bed is an Egyptian supplier of the materials and components mattress makers use, and a spring manufacturer. It does not make or sell finished mattresses. We manufacture springs, frames and wire rolls, and supply Turkish memory foam and glue, East Asian neutral latex, felt, threads, tape and assembly supplies. For fabric and sponge, we can connect you with a partner so you can buy at a special price. Stock and technical specifications are confirmed on enquiry.', aboutNote: 'Export enquiries welcome · Availability confirmed per enquiry',
    industries: 'WHO WE WORK WITH', industryTitle: 'For businesses built around better products.', industryItems: ['Mattress manufacturers','Furniture makers','Wholesale distributors','International buyers'],
    gallery: 'OUR STANDARD', galleryTitle: 'Quality is built into the supply plan.', galleryText: 'Our aim is quality that competes with the best in the market, backed by clear specifications, consistent materials and a dependable supply route. Availability and technical details are confirmed against each order.',
    ctaKicker: 'LET’S BUILD A BETTER SUPPLY RELATIONSHIP', ctaTitle: 'Start with one requirement. Build from there.', ctaText: 'Share your specs, supply opportunity or production plan. Let’s explore a practical way to work together.', ctaButton: 'Request a quotation', contactLabel: 'CONTACT & RFQ', contactTitle: 'Start with the details.', contactText: 'Contact Nile Bed directly using the published email or WhatsApp below. This enquiry form is a preview and does not submit or store information.',
    fields: ['Full name','Company','Business email','Country','Product of interest','Approx. quantity','Technical requirements / notes'], country: 'Select country', product: 'Select a product category', qty: 'e.g. 10,000 units', submit: 'Prepare enquiry', formNote: 'This preview does not send or store messages. Contact the company by email or WhatsApp using the links beside this form.', footer: 'Mattress materials & spring manufacturing · Egypt', back: 'Back to top', menu: 'Open navigation', close: 'Close navigation', toggle: 'العربية',
    partnerKicker: 'OUR PARTNER NETWORK', partnerTitle: 'Need fabric or sponge? We’ll make the right introduction.', partnerText: 'Tell us what you’re looking for and we’ll connect you with the right partner, where you can buy at a special price. The partner handles the sale and supply.', partnerCta: 'Find a fabric & foam partner',
    productNames:['Mattress materials & supplies','Spring manufacturing','Foam, latex & memory','Fabric & sponge (via partners)'], productDesc:['Mattress-making materials and supplies for factories, workshops, and trade buyers. Availability and grade are confirmed per item.','Springs, frames and 1.3 mm wire rolls made by Nile Bed in Egypt. Share your dimensions and quantity and the team will confirm the right specification.','Turkish memory-foam rolls in 2 and 4 cm, East Asian neutral latex in 2.5–5 cm, and latex cores in 15 and 18 cm. Current stock and specifications are confirmed on enquiry.','Need fabric or sponge? We refer you to one of our partners so you can buy at a special price. Tell us the type and quantity.'], specs: 'Specifications vary by product. Contact our team for confirmed details.', quoteHint: 'Availability and technical specifications are confirmed on enquiry. Contact the team by email or WhatsApp below.',
  },
  ar: {
    nav: ['الكتالوج', 'دورة المرتبة', 'الشركاء', 'تواصل'],
    eyebrow: 'دورة توريد متكاملة لصناعة المراتب · مصر',
    titleA: 'كل اللي', titleB: 'يكمل شغل', titleC: 'المرتبة.',
    intro: 'سوست نصنعها في مصر، وخامات نختارها بعناية، وشركاء نوصّلك بيهم للقماش والإسفنج. طريق توريد واحد يسهّل شغل مصنعك.',
    explore: 'استكشف الكتالوج', quote: 'تواصل مع فريقنا', note: 'مسار توريد واحد. اختيارات مرنة. تفاصيل تبدأ من احتياج إنتاجك.', heroVisualKicker: 'دورة صناعة المرتبة', heroStatLabel: 'صنف في الكتالوج', heroGroupsLabel: 'فئات توريد', heroVisualNote: 'ابدأ من مكان واضح؛ ونراجع معك الصنف والمواصفة ومسار التوريد المناسب.',
    since: 'لصُنّاع المراتب', introLabel: 'شغل مصنعك، مترابط', introTitle: 'قرّب سلسلة توريد المرتبة من مكان واحد.',
    introBody: 'تصنّع نايل بد السوست في مصر، وتجمع لصانع المرتبة مدخلات إنتاج أساسية: بوكيت، ميموري فوم، لاتكس مستورد، لباد، غراء، خيوط ولوازم تجميع. ولو محتاج قماش أو إسفنج، نوصّلك بشريك مناسب. راجع المواصفات والتوافر مع فريق واحد، وخلي كل صنف ييجي من قناة توريده الصحيحة.',
    introFoot: 'نقطة تواصل واحدة تساعدك تنسّق قائمة توريد أكبر.',
    scopeKicker: 'دورة توريد أوضح',
    scopeTitle: 'من سلك السوستة لآخر طبقة تكمل المرتبة.',
    scopeText: 'نصنع السوست، ونورّد خامات المراتب، ونوصّل العميل بشركائنا للقماش والإسفنج. تواصل واحد، وكل منتج من قناة توريده المناسبة.',
    scopeCards: [
      ['٠١', 'تصنيع مصري', 'سوست بونيل وفريم ورولات سلك نصنعها حسب طلبك.'],
      ['٠٢', 'خامات تكمل شغلك', 'بوكيت، فوم، لاتكس، لباد، غراء، خيوط ولوازم إنتاج.'],
      ['٠٣', 'شبكة شركاء', 'القماش والإسفنج من شركائنا؛ البيع والتوريد مباشرة من الشريك.'],
    ],
    cycleKicker: 'مسار توريد واحد', cycleTitle: 'موردين أقل ومشاوير أقل… ووقت أكتر للإنتاج.', cycleBody: 'اجمع احتياجات السوست والفوم ومستلزمات الإنتاج في محادثة واحدة. ننسّق الأصناف اللي بتوردها نايل بد مباشرة، ونوصّلك بشركائنا للقماش والإسفنج؛ عشان تقلل تكرار المشاوير وتشتت الطلبات، وتبقى تكلفة كل صنف وهامش ربحه أوضح قدامك.', cycleBenefits: [['٠١','وقت أوفر','نسّق أكتر من فئة من خلال نقطة تواصل واحدة.'],['٠٢','مشاوير أقل','قلّل التنقل بين موردين ومحادثات منفصلة لكل خامة.'],['٠٣','صورة أوضح للتكلفة','راجع المواصفات والتكلفة وهوامش الربح قبل تأكيد الطلب.']],
    productionKicker: 'على مقاس طلبك', productionTitle: 'طلبات إنتاج كبيرة. ومواصفات فنية مرنة.', productionBody: 'شاركنا الكمية المستهدفة والاستخدام والمواصفات الفنية. نراجع معك الخيارات المتاحة، ونؤكد المواصفات ونخطط للتوريد بما يحافظ على ثبات الجودة في الطلب. نرحب بالطلبات الكبيرة، وتُراجع القدرة ومدة التوريد لكل طلب على حدة.', productionPoints: ['مرونة في المواصفات الفنية','مراجعة الجودة عند تخطيط الطلب','نرحب بطلبات الإنتاج الكبيرة'],
    supplierKicker: 'للموردين المهتمين بالجودة', supplierTitle: 'عندك منتج يستحق يوصل لصُنّاع المراتب؟', supplierBody: 'باب التعاون مفتوح للموردين القادرين على تقديم جودة ثابتة، وأسعار منافسة، وتوريد يعتمد عليه. عرّفنا بمنتجك ومواصفاته ومصدره وقدرتك على التوريد، ونبحث سويًا مدى مناسبته لاحتياج السوق.', supplierCta: 'عرّفنا بمنتجك',
    importKicker: 'فرص الاستيراد', importTitle: 'منتجات مميزة تستحق فرصة في السوق.', importBody: 'نرحب بفرص استيراد خامات ومنتجات إنتاج مميزة، تلبي احتياجًا واضحًا وتجمع بين الجودة العالية والقدرة على المنافسة. ابعتلنا المصدر والمواصفات الفنية والعينات وخطة التوريد للمراجعة.', importCta: 'ناقش فرصة استيراد',
    partnershipKicker: 'شراكة مستمرة، مش طلب وخلاص', partnershipTitle: 'نبدأ بطلب… ونبني علاقة توريد تكبر مع شغلك.', partnershipBody: 'لما تكون المواصفات واضحة والتوريد موثوق، الطلب الأول ممكن يبقى بداية تعاون طويل. نسمع احتياجك، ونراجع المرونة والتوافر، ونبني طريقة شغل تناسب نشاطك.', partnershipCta: 'ابدأ حوار شراكة',
    productsKicker: 'الكتالوج', productsTitle: 'كوّن قائمة التوريد المناسبة لخطك.', productsDesc: 'استكشف فئات السوست والخامات اللي نصنّعها ونوردها، وبعدها شاركنا المواصفات والكميات. القماش والإسفنج من خلال شركائنا، والتوافر وشروط التوريد تُؤكَّد لكل استفسار.',
    enquire: 'استفسر عن المنتج', details: 'اسأل فريقنا', illustrative: 'تفاصيل الفئات تُؤكد عند الاستفسار',
    processTag: 'كيف نشتغل', processTitle: 'طلب واضح. وخطة توريد محسوبة.', processDesc: 'نراجع احتياجك، ونؤكد التفاصيل الفنية، ونرتّب مسار التوريد المناسب—مباشرة أو من خلال شريك.',
    steps: [['٠١','شارك متطلباتك','أخبرنا بالاستخدام والكمية التقريبية وأي متطلبات فنية.'],['٠٢','نراجعها معًا','يناقش فريقنا الخيارات المتاحة ويؤكد المواصفات.'],['٠٣','نخطط للتوريد','نتفق على تفاصيل التعبئة والتوقيت والتسليم لطلبك.']],
    capabilityKicker: 'لماذا نايل بد', capabilityTitle: 'تميّزنا في مصر يبدأ من السوستة… ويكتمل بخامات مستوردة بعناية.', capabilityBody: 'من مصر نصنع السوست، ونستورد اللاتكس والميموري فوم والغراء بجودة نعتز بها. ومحتاج قماش أو إسفنج؟ قولنا بتدور على إيه، ونوصّلك بالشريك المناسب عشان تشتري بسعر مميز جدًا.', capabilityCta: 'اكتشف إمكانياتنا', capabilityCards: [['٠١','صناعة مصرية','سوست بونيل وفريم ورول سلك 1.3 مم — تصنيع في مصر حسب طلبك.'],['٠٢','خامات مختارة','لاتكس وميموري فوم وغراء مستورد، والمواصفات تُؤكَّد مع كل استفسار.'],['٠٣','نوصّلك بالشريك المناسب','القماش والإسفنج من خلال شركائنا. شاركنا احتياجك ونوجّهك للمورّد المناسب بسعر مميز جدًا.']],
    aboutKicker: 'عن نايل بد', aboutTitle: 'نصنّع السوست، ونورّد باقي المستلزمات.', aboutText: 'نايل بد شركة مصرية تورّد الخامات والمستلزمات التي يعمل بها صانع المرتبة، وتصنّع السوست. لا تصنّع مراتب جاهزة ولا تبيعها. نصنّع السوست والفريم ورولات السلك، ونورّد ميموري فوم وغراء تركي، ولاتكس نيوترال من شرق آسيا، ولباد وخيوط وتيب ولوازم تجميع. وفي القماش والإسفنج نوجّه العميل للشريك المناسب عشان يشتري بسعر مميز جدًا. المخزون والمواصفات الفنية تُؤكَّد عند الاستفسار.', aboutNote: 'نرحب باستفسارات التصدير · التوافر يؤكد لكل استفسار',
    industries: 'من نخدم', industryTitle: 'لأعمال تصنع منتجات أفضل.', industryItems: ['مصانع المراتب','مصانع الأثاث','الموزعون وتجار الجملة','المشترون الدوليون'],
    gallery: 'معيارنا', galleryTitle: 'الجودة جزء من خطة التوريد.', galleryText: 'هدفنا جودة تنافس الأفضل في السوق، بمواصفات واضحة وثبات في الخامات ومسار توريد يعتمد عليه. التوافر والتفاصيل الفنية تُؤكَّد بما يناسب كل طلب.',
    ctaKicker: 'نبدأ بتواصل ونبني شراكة', ctaTitle: 'احتياج واحد ممكن يكون بداية تعاون طويل.', ctaText: 'شاركنا مواصفاتك أو فرصة التوريد أو خطة الإنتاج، ونبحث معًا عن طريقة عملية للتعاون.', ctaButton: 'اطلب عرض سعر', contactLabel: 'التواصل وطلب عرض سعر', contactTitle: 'ابدأ بالتفاصيل.', contactText: 'تواصل مع نايل بد عبر البريد أو واتساب المنشورين أدناه. نموذج الاستفسار للمعاينة فقط ولا يرسل أو يخزن البيانات.',
    fields: ['الاسم الكامل','الشركة','البريد الإلكتروني للعمل','الدولة','المنتج المطلوب','الكمية التقريبية','المواصفات الفنية / ملاحظات'], country: 'اختر الدولة', product: 'اختر فئة المنتج', qty: 'مثال: 10,000 وحدة', submit: 'جهّز الاستفسار', formNote: 'هذه المعاينة لا ترسل أو تخزن الرسائل. تواصل بالبريد أو واتساب عبر الروابط بجوار النموذج.', footer: 'خامات المراتب وتصنيع السوست · مصر', back: 'العودة للأعلى', menu: 'فتح القائمة', close: 'إغلاق القائمة', toggle: 'English',
    partnerKicker: 'شبكة شركائنا', partnerTitle: 'القماش أو الإسفنج؟ نختصر عليك طريق الوصول.', partnerText: 'احكيلنا محتاج إيه، ونوصّلك بالشريك المناسب من شبكتنا عشان تشتري منه بسعر مميز جدًا. البيع والتوريد بيكونوا مباشرة من الشريك.', partnerCta: 'اعرف شريك القماش والإسفنج',
    productNames:['خامات ومستلزمات المراتب','تصنيع السوست','الفوم واللاتكس والميموري','أقمشة وإسفنج (عبر شركائنا)'], productDesc:['نورّد للمصانع والورش وتجار الجملة خامات ومستلزمات تصنيع المراتب. يُؤكَّد توافر كل صنف ودرجته عند الاستفسار.','سوست وفريم ورولات سلك 1.3 مم من تصنيعنا في مصر. شاركنا المقاسات والكمية ليؤكد الفريق المواصفات المناسبة.','ميموري فوم تركي 2 و4 سم، ولاتكس نيوترال من شرق آسيا بارتفاعات 2.5–5 سم، ولاتكس خام 15 و18 سم. يُؤكد المخزون والمواصفات عند الاستفسار.','محتاج قماش أو إسفنج؟ نوجّهك لواحد من شركائنا عشان تشتري بسعر مميز جدًا. قولنا النوع والكمية.'], specs: 'تختلف المواصفات حسب المنتج. تواصل مع فريقنا لمعرفة التفاصيل المؤكدة.', quoteHint: 'التوافر والمواصفات الفنية تُؤكَّد عند الاستفسار. تواصل مع الفريق بالبريد أو واتساب أدناه.',
  },
} as const;

type Theme = 'light' | 'dark';

const themeLabels = {
  ar: { switchToDark: 'الوضع الليلي', switchToLight: 'الوضع النهاري', label: 'تبديل المظهر' },
  en: { switchToDark: 'Dark mode', switchToLight: 'Light mode', label: 'Toggle colour theme' },
} as const;

/**
 * The supplied brand has two artwork variants: one for light surfaces and one
 * for dark surfaces. Both files stay mounted and CSS shows the right one, so
 * there is no flash when the theme or the language changes.
 */
function BrandLogo({ variant, className }: { variant: 'light' | 'dark' | 'auto'; className?: string }) {
  return (
    <span className={`brand-logo is-${variant}${className ? ` ${className}` : ''}`}>
      <img className="logo-light" src="/logo-on-light.svg" alt="Nile Bed" width={454} height={270} decoding="async" />
      <img className="logo-alt" src="/logo-on-dark.svg" alt="" aria-hidden="true" width={454} height={270} decoding="async" />
    </span>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('ar');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; }, [lang]);
  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    setTheme(saved === 'dark' ? 'dark' : 'light');
  }, []);
  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem('nilebed-theme-v3', next); } catch { /* storage can be blocked; theme still applies */ }
  };
  const t = copy[lang]; const ar = lang === 'ar';
  const countByGroup = (id: string) => items.filter((it) => it.group === id).length;
  const themeLabel = theme === 'dark' ? themeLabels[lang].switchToLight : themeLabels[lang].switchToDark;
  return <main className="nile home-page" dir={ar ? 'rtl' : 'ltr'} lang={lang}>
    <header className="topbar"><a className="brand" href="#home" aria-label={ar ? 'نايل بد — الصفحة الرئيسية' : 'Nile Bed — home'}><BrandLogo variant="auto" /></a>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">{t.nav.map((n,i)=><a key={n} href={['#products','#cycle','#suppliers','#contact'][i]} onClick={()=>setMenuOpen(false)}>{n}</a>)}</nav>
      <div className="nav-actions"><button className="theme-switch" type="button" onClick={toggleTheme} aria-label={themeLabel} aria-pressed={theme === 'dark'} title={themeLabel}><Moon className="icon-moon" size={15}/><Sun className="icon-sun" size={15}/><span>{themeLabel}</span></button><button className="lang-switch" type="button" onClick={()=>setLang(ar?'en':'ar')} aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}><Globe2 size={15}/>{t.toggle}</button><a className="nav-cta" href="#contact">{t.quote.split(' ')[0]} <ArrowUpRight size={15}/></a><button className="menu-btn" type="button" aria-expanded={menuOpen} aria-label={menuOpen?t.close:t.menu} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></div>
    </header>
    <section className="hero" id="home"><div className="hero-inner"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/>{t.eyebrow}</div><h1>{t.titleA}<br/>{t.titleB}<br/><em>{t.titleC}</em></h1><p className="hero-intro">{t.intro}</p><div className="hero-buttons"><a className="button button-copper" href="#products">{t.explore}<ArrowUpRight size={17}/></a><a className="button button-glass" href="#contact">{t.quote}<ArrowUpRight size={17}/></a></div><div className="hero-foot"><span className="tiny-mark">NB</span><span>{t.note}</span><span className="foot-rule"/></div></div><figure className="hero-visual"><img src="/images/hero-springs-product.webp" alt={ar ? 'صورة توضيحية لوحدة سوست بونيل' : 'Illustrative image of a Bonnell spring unit'} fetchPriority="high" decoding="async"/><figcaption className="hero-image-label"><span>{ar ? 'تصنيع السوست في مصر' : 'SPRINGS MADE IN EGYPT'}</span><small>{ar ? 'صورة توضيحية' : 'ILLUSTRATIVE IMAGE'}</small></figcaption></figure></div><div className="hero-vertical">{ar?'نايل بد · خامات المراتب والسوست':'NILE BED · MATTRESS MATERIALS'}</div></section>
    <section className="scope-band" aria-label={ar?'نطاق عملنا':'Our business scope'}><div className="scope-inner"><div className="scope-top"><div><div className="section-label"><span>01</span>{t.scopeKicker}</div><h2>{t.scopeTitle}</h2></div><p>{t.scopeText}</p></div><div className="scope-grid">{t.scopeCards.map(([n,title,body],i)=><article className={i===2?'scope-card scope-card-no':'scope-card'} key={title}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div>{i===2?<Network size={18}/>:<Check size={18}/>}</article>)}</div></div></section>
    <section className="one-stop section-pad" id="cycle"><div className="one-stop-head"><div><div className="section-label"><span>02</span>{t.cycleKicker}</div><h2>{t.cycleTitle}</h2></div><p>{t.cycleBody}</p></div><div className="one-stop-grid">{t.cycleBenefits.map(([n,title,body])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowUpRight size={18}/></article>)}</div><div className="cycle-ribbon"><span>{ar ? 'السوست' : 'SPRINGS'}</span><i/><span>{ar ? 'فوم ولاتكس' : 'FOAM & LATEX'}</span><i/><span>{ar ? 'لباد ومستلزمات' : 'FELT & SUPPLIES'}</span><i/><span>{ar ? 'قماش وإسفنج · عبر الشركاء' : 'FABRIC & SPONGE · PARTNER NETWORK'}</span></div></section>
    <section className="products section-pad" id="products"><div className="section-head"><div><div className="section-label"><span>03</span>{t.productsKicker}</div><h2>{t.productsTitle}</h2></div><p>{t.productsDesc}</p></div>
      {/* Featured wire specs chips */}
      <div className="wire-chips" aria-label={ar ? 'أنواع السلك المتاحة' : 'Available wire types'}>
        {[
          ar ? 'سلك 2.4 — 14.5/16.5 سم' : 'Wire 2.4 — 14.5/16.5 cm',
          ar ? 'سلك 2.3 — 16.5 سم' : 'Wire 2.3 — 16.5 cm',
          ar ? 'سلك 2.2 — 16.5 سم' : 'Wire 2.2 — 16.5 cm',
          ar ? 'سلك 2.05 — 16/16.5 سم' : 'Wire 2.05 — 16/16.5 cm',
          ar ? 'فريم حديد' : 'Border frame',
          ar ? 'رول سلك 1.3 مم' : '1.3 mm wire roll',
          ar ? 'بوكيت 12–18 سم' : 'Pocket 12–18 cm',
        ].map(c => <span key={c} className="wire-chip"><em>NB</em>{c}</span>)}
      </div>
      <div className="catalog-preview-grid">
        {[
          { img: '/catalog/springs/bonnell-unit.jpg', count: `${countByGroup('springs')} ${ar ? 'أصناف' : 'items'}`, tag: ar ? 'تصنيع نايل بد' : 'MADE BY NILE BED', title: ar ? 'السوست والفريم والسلك' : 'Springs, Frames & Wire', desc: ar ? 'سلك 2.4 إلى 2.05 بأقطار 8.5–8.8 وارتفاع 14.5–16.5 سم، وفريم، ورول سلك 1.3 مم. تصنيع حسب الطلب.' : 'Wire 2.4–2.05, Ø 8.5–8.8 cm, height 14.5–16.5 cm, plus frames and 1.3 mm wire rolls. Made to order.', link: '/catalog#springs' },
          { img: '/images/pocket-spring-unit.webp', count: `${countByGroup('pocket')} ${ar ? 'رولات' : 'rolls'}`, tag: 'POCKET', title: ar ? 'رول البوكيت' : 'Pocket Roll', desc: ar ? 'ارتفاعات 12 و14 و16 و18 سم، والكثافة حسب الطلب. يُقص على مقاس المرتبة.' : 'Heights 12, 14, 16 and 18 cm; density on request. Cut to mattress size.', link: '/catalog#pocket' },
          { img: '/images/foam-materials.webp', count: `${countByGroup('foam')} ${ar ? 'أصناف' : 'items'}`, tag: ar ? 'تركي وشرق آسيا' : 'TURKEY & EAST ASIA', title: ar ? 'ميموري ولاتكس' : 'Memory & Latex', desc: ar ? 'ميموري رول تركي 2 و4 سم، ولاتكس نيوترال 2.5–5 سم من شرق آسيا.' : 'Turkish memory rolls 2 & 4 cm, East Asian neutral latex 2.5–5 cm.', link: '/catalog#foam' },
          { img: '/catalog/foam/latex-core.jpg', count: ar ? 'سماكتان' : '2 thicknesses', tag: 'LATEX', title: ar ? 'خام مراتب لاتكس' : 'Latex Mattress Cores', desc: ar ? 'سماكة 15 و18 سم، بمقاسات مختلفة حسب الطلب. خام فقط — لا نبيع مراتب جاهزة.' : '15 and 18 cm thick, different sizes on request. Material only — no finished mattresses.', link: '/catalog#latex-mattress' },
          { img: '/images/mattress-supplies.webp', count: `${countByGroup('materials')} ${ar ? 'صنف' : 'items'}`, tag: ar ? 'خامات مساعدة' : 'AUXILIARY', title: ar ? 'لباد وفازلين ولوازم' : 'Felt, Non-woven & Supplies', desc: ar ? 'لباد رول ومقطع قطن وأبيض 2 سم، وأسود وثلاث درجات رمادي، وفازلين 210/160/15، غراء تركي، خيوط 150/3 و40/2 و210/3، تيب 4.2، كلبس ودبل وبرشامة فريم، وميلتون.' : 'Felt rolls and pre-cut in cotton/white 2 cm, black and three grey shades, non-woven 210/160/15, Turkish glue, threads 150/3, 40/2, 210/3, 4.2 cm tape, clips, doubles, frame fasteners and Melton.', link: '/catalog#materials' },
          { img: '/catalog/tools/fastening-tools.jpg', count: `${countByGroup('tools')} ${ar ? 'عدد' : 'tools'}`, tag: 'TOOLS', title: ar ? 'المسدسات والعدد' : 'Tools & Guns', desc: ar ? 'مسدس كلبس، مسدس دبل، مسدس غراء — نيوماتيك وحراري.' : 'Clip gun, double-clip gun, glue gun — pneumatic & hot-melt.', link: '/catalog#tools' },
        ].map(card => (
          <article key={card.title} className="catalog-preview-card">
            <div className="preview-media">
              <img src={card.img} alt={card.title} loading="lazy" decoding="async" />
              <span className="preview-tag">{card.tag}</span>
              <span className="preview-count">{card.count}</span>
            </div>
            <div className="preview-body">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
            <div className="preview-foot">
              <span><i />{ar ? 'صورة توضيحية' : 'Illustrative image'}</span>
              <div className="preview-links">
                <a href="/catalog" aria-label={`${ar ? 'عرض' : 'View'} ${card.title}`}><ArrowUpRight size={14} /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="catalog-preview-actions">
        <a className="button button-copper" href="/catalog">{ar ? 'عرض الكتالوج الكامل' : 'View full catalog'} — {ar ? `${items.length} صنف في الكتالوج` : `${items.length} catalog items`}<ArrowUpRight size={17} /></a>
        <a className="button button-glass" href="#contact" style={{ borderColor: 'var(--line-2)', color: 'var(--t-1)', background: 'var(--card)' }}>{t.quote}<ArrowUpRight size={17} /></a>
      </div>
      <div className="catalog-preview-note"><CircleHelp size={14} />{t.quoteHint}</div>
    </section>
    <section className="production-band" id="production"><div className="production-main"><div className="section-label light"><span>04</span>{t.productionKicker}</div><h2>{t.productionTitle}</h2><p>{t.productionBody}</p><a className="button button-copper" href="#contact">{t.quote}<ArrowUpRight size={17}/></a></div><div className="production-points">{t.productionPoints.map((point,i)=><div key={point}><span>0{i+1}</span><strong>{point}</strong><Check size={17}/></div>)}</div></section>
    <section className="opportunities section-pad supplier-section" id="suppliers"><div className="opportunity-intro"><div className="section-label"><span>05</span>{t.supplierKicker}</div><span className="opportunity-index">{ar ? '٠١ / شركاء التوريد' : '01 / SUPPLIER PARTNERS'}</span></div><div className="opportunity-feature"><div><h2>{t.supplierTitle}</h2><p>{t.supplierBody}</p></div><a className="button button-dark" href={`https://wa.me/201090000676?text=${encodeURIComponent(ar ? 'مرحبًا نايل بد، أرغب في عرض منتج للتوريد. المنتج والمواصفات:' : 'Hello Nile Bed, I would like to introduce a product for supply. Product and specs:')}`} target="_blank" rel="noopener noreferrer">{t.supplierCta}<ArrowUpRight size={17}/></a><span className="opportunity-mark">S</span></div></section>
    <section className="opportunities section-pad import-section" id="import"><div className="opportunity-intro"><div className="section-label"><span>06</span>{t.importKicker}</div><span className="opportunity-index">{ar ? '٠٢ / فرص الاستيراد' : '02 / IMPORT OPPORTUNITIES'}</span></div><div className="opportunity-feature"><div><h2>{t.importTitle}</h2><p>{t.importBody}</p></div><a className="button button-dark" href={`https://wa.me/201090000676?text=${encodeURIComponent(ar ? 'مرحبًا نايل بد، لدي فرصة استيراد لمنتج/خامة مميزة. المصدر والمواصفات:' : 'Hello Nile Bed, I have an import opportunity for a distinctive product/material. Source and specs:')}`} target="_blank" rel="noopener noreferrer">{t.importCta}<ArrowUpRight size={17}/></a><span className="opportunity-mark">I</span></div></section>
    <section className="partner-band" id="partnership"><div className="partner-band-inner"><div><div className="section-label"><span>NB</span>{t.partnershipKicker}</div><h2>{t.partnershipTitle}</h2><p>{t.partnershipBody}</p></div><a className="button button-copper" href="https://wa.me/201090000676" target="_blank" rel="noopener noreferrer"><Network size={17}/>{t.partnershipCta}<ArrowUpRight size={17}/></a></div></section>
    <section className="quality-section" id="quality"><div className="quality-inner"><div className="quality-stamp"><span>NB</span><i/>{ar ? 'جودة / توريد' : 'QUALITY / SUPPLY'}</div><div className="quality-copy"><div className="section-label light"><span>07</span>{t.gallery}</div><h2>{t.galleryTitle}</h2><p>{t.galleryText}</p><div className="quality-points"><span>{ar ? 'مواصفات واضحة' : 'Clear specifications'}</span><span>{ar ? 'جودة تنافس الأفضل' : 'Quality that competes with the best'}</span><span>{ar ? 'تأكيد قبل التوريد' : 'Confirmed before supply'}</span></div></div></div></section>
    <section className="contact section-pad" id="contact"><div className="contact-heading"><div className="section-label"><span>08</span>{t.contactLabel}</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="social-links">{["https://www.facebook.com/profile.php?id=100047775297291", "https://www.facebook.com/profile.php?id=100009326443352", "https://www.facebook.com/tefa.elsid"].map((url, i) => <a key={url} href={url} target="_blank" rel="noopener noreferrer">{ar ? ["صفحة Nile Bed التجارية", "حساب Nile Bed", "تحديثات عاطف طه"][i] : ["Nile Bed business page", "Nile Bed profile", "Atef Taha updates"][i]} <ArrowUpRight size={14}/></a>)}</div><div className="contact-mini"><a href="mailto:info@nilebed.com"><Mail size={16}/>info@nilebed.com</a><a href="https://wa.me/201090000676" target="_blank" rel="noopener noreferrer"><Phone size={16}/>{ar?'واتساب: 010 90000676':'WhatsApp: 010 90000676'}</a></div></div><form className="rfq-form" onSubmit={e=>e.preventDefault()}><div className="form-grid"><label>{t.fields[0]}<input required placeholder={ar?'اسمك':'Your name'}/></label><label>{t.fields[1]}<input placeholder={ar?'اسم الشركة':'Company name'}/></label><label>{t.fields[2]}<input type="email" required placeholder="name@company.com"/></label><label>{t.fields[3]}<input placeholder={ar?'الدولة':'Country'}/></label><label>{t.fields[4]}<select defaultValue=""><option value="" disabled>{t.product}</option>{t.productNames.map(x=><option key={x}>{x}</option>)}</select></label><label>{t.fields[5]}<input placeholder={t.qty}/></label><label className="full-field">{t.fields[6]}<textarea rows={4} placeholder={ar?'اكتب متطلباتك هنا...':'Tell us about your requirements...'}/></label></div><button className="button button-dark" type="submit" disabled>{t.submit}<ArrowUpRight size={17}/></button><small className="form-note"><CircleHelp size={14}/>{t.formNote}</small></form></section>
    <footer className="footer"><a className="brand footer-brand" href="#home" aria-label={ar ? 'نايل بد' : 'Nile Bed'}><BrandLogo variant="dark"/></a><span>{t.footer}</span><a href="#home">{t.back}<ArrowRight size={14}/></a><small>© {new Date().getFullYear()} NILE BED</small></footer>
  </main>;
}
