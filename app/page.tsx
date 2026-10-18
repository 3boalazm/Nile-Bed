'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, Globe2, Truck, Layers3, BadgeCheck, Mail, Phone, CircleHelp, Check, Moon, Sun } from 'lucide-react';

type Lang = 'ar' | 'en';
const copy = {
  en: {
    nav: ['Products', 'Our process', 'Capabilities', 'About', 'Contact'],
    eyebrow: 'MATTRESS MATERIALS & SPRING MANUFACTURING · EGYPT',
    titleA: 'The strength', titleB: 'beneath every', titleC: 'great mattress.',
    intro: 'Mattress materials, components, and springs for mattress and furniture makers. We start from your production needs and your next order.',
    explore: 'Explore our catalog', quote: 'Start a conversation', note: 'Springs are the only thing we make; the rest of the materials we supply.',
    since: 'MADE FOR MATTRESS MAKERS', introLabel: 'A SUPPLY PARTNER', introTitle: 'Your production deserves a supply partner that listens.',
    introBody: 'Nile Bed supplies the materials and components mattress makers work with, and manufactures springs. Owner Atef Taha shares product updates through the company accounts; a recent post shows Turkish memory-foam rolls at 2 cm and 4 cm. Stock and current specifications are confirmed directly with the team.',
    introFoot: 'We confirm the product range, availability, and technical details with you directly.',
    scopeKicker: 'OUR SCOPE',
    scopeTitle: 'Springs we make. Materials we supply.',
    scopeText: 'Nile Bed manufactures springs in Egypt and supplies the rest of what a mattress maker needs: foam, components, and production materials.',
    scopeCards: [
      ['01', 'We manufacture', 'Springs. That’s all we make.'],
      ['02', 'We supply', 'Foam, components, and production materials for factories, workshops, and trade buyers.'],
      ['03', 'We don’t make', 'Finished mattresses. We don’t sell them either.'],
    ],
    productsKicker: 'THE CATALOG', productsTitle: 'Find the right fit.', productsDesc: 'We supply mattress-making materials and manufacture springs. Foam, spring components, and other production supplies are available by enquiry, and the team confirms current stock and specifications.',
    enquire: 'Enquire about this', details: 'Ask our team', illustrative: 'CATEGORY DETAILS CONFIRMED ON ENQUIRY',
    processTag: 'HOW WE WORK', processTitle: 'A clear path from brief to supply.', processDesc: 'Tell us what your production needs. We’ll help clarify the details and discuss the right next step.',
    steps: [['01','Share your brief','Tell us the application, approximate quantity, and any technical requirements.'],['02','Review together','Our team can discuss available options and confirm specifications.'],['03','Plan supply','Align on packaging, timing, and delivery details for your order.']],
    capabilityKicker: 'CAPABILITIES', capabilityTitle: 'The details matter.', capabilityBody: 'Material, dimensions, grade, and order planning depend on the item and brief. Share your needs and ask us for the current technical details.', capabilityCta: 'Discuss your specifications', capabilityCards: [['01','Product fit','Let’s match the material or spring to your intended application.'],['02','Specifications','Request current, product-specific technical information.'],['03','Order planning','Discuss quantity, packaging, and delivery requirements.']],
    aboutKicker: 'ABOUT NILE BED', aboutTitle: 'We make springs. We supply the rest.', aboutText: 'Nile Bed is an Egyptian supplier of the materials and components mattress makers use, and a spring manufacturer. It does not make or sell finished mattresses. Owner Atef Taha shares product updates through the company accounts, including Turkish memory-foam rolls at 2 cm and 4 cm and incoming material shipments. Stock and technical specifications are confirmed on enquiry.', aboutNote: 'Export enquiries welcome · Availability confirmed per enquiry',
    industries: 'WHO WE WORK WITH', industryTitle: 'For businesses built around better products.', industryItems: ['Mattress manufacturers','Furniture makers','Wholesale distributors','International buyers'],
    gallery: 'MATERIALS IN FOCUS', galleryTitle: 'Made of details.', galleryText: 'This is a generic illustration, not a Nile Bed factory photo. The linked company updates show actual material shipments and spring-related products. Current availability and the exact identity of items in older posts should be confirmed with the team.',
    ctaKicker: 'LET’S TALK BUSINESS', ctaTitle: 'What does your next production run need?', ctaText: 'Send your requirements and our team can help you take it from there.', ctaButton: 'Request a quotation', contactLabel: 'CONTACT & RFQ', contactTitle: 'Start with the details.', contactText: 'Contact Nile Bed directly using the published email or WhatsApp below. This enquiry form is a preview and does not submit or store information.',
    fields: ['Full name','Company','Business email','Country','Product of interest','Approx. quantity','Technical requirements / notes'], country: 'Select country', product: 'Select a product category', qty: 'e.g. 10,000 units', submit: 'Prepare enquiry', formNote: 'This preview does not send or store messages. Contact the company by email or WhatsApp using the links beside this form.', footer: 'Mattress materials & spring manufacturing · Egypt', back: 'Back to top', menu: 'Open navigation', close: 'Close navigation', toggle: 'العربية',
    productNames:['Mattress materials & supplies','Spring manufacturing','Foam & imported materials'], productDesc:['Mattress-making materials and supplies for factories, workshops, and trade buyers. Availability and grade are confirmed per item.','Springs made by Nile Bed in Egypt. Share your dimensions and quantity and the team will confirm the right specification.','Imported memory foam and other comfort materials, including rolls at 2 cm and 4 cm in a recent public update. Current stock and specifications are confirmed on enquiry.'], specs: 'Specifications vary by product. Contact our team for confirmed details.', quoteHint: 'Availability and technical specifications are confirmed on enquiry. Contact the team by email or WhatsApp below.',
  },
  ar: {
    nav: ['المنتجات', 'كيف نعمل', 'الإمكانيات', 'عن الشركة', 'تواصل معنا'],
    eyebrow: 'خامات المراتب وتصنيع السوست · مصر',
    titleA: 'القوة التي', titleB: 'تدعم كل', titleC: 'مرتبة مميزة.',
    intro: 'نورّد خامات ومستلزمات المراتب، ونصنّع السوست لمصانع المراتب والأثاث. نبدأ من احتياجات إنتاجك والطلب القادم.',
    explore: 'استكشف الكتالوج', quote: 'ابدأ محادثة تجارية', note: 'نصنّع السوست وحدها، ونورّد خامات المراتب ومستلزماتها.',
    since: 'لصُنّاع المراتب', introLabel: 'شريك توريد', introTitle: 'إنتاجك يستحق شريك توريد يهتم بالتفاصيل.',
    introBody: 'تورّد نايل بد الخامات والمستلزمات التي يعمل بها صانع المرتبة، وتصنّع السوست. ينشر المالك عاطف طه تحديثات المنتجات عبر حسابات الشركة، ومنها منشور حديث عن رولات ميموري فوم مستورد من تركيا بارتفاعَي ٢ سم و٤ سم. المخزون والمواصفات الحالية تُؤكَّد مباشرة مع الفريق.',
    introFoot: 'نؤكد نطاق المنتجات والتوافر والتفاصيل الفنية معك مباشرة.',
    scopeKicker: 'نطاق عملنا',
    scopeTitle: 'السوست نصنعها، والخامات نورّدها.',
    scopeText: 'تصنّع نايل بد السوست في مصر، وتورّد باقي ما يحتاجه صانع المرتبة: الفوم والمكوّنات ومستلزمات الإنتاج.',
    scopeCards: [
      ['٠١', 'نصنّع', 'السوست. هذا كل ما نصنعه.'],
      ['٠٢', 'نورّد', 'الفوم والمكوّنات ومستلزمات الإنتاج للمصانع والورش وتجار الجملة.'],
      ['٠٣', 'لا نصنّع', 'مراتب جاهزة، ولا نبيعها.'],
    ],
    productsKicker: 'الكتالوج', productsTitle: 'اعثر على الحل المناسب.', productsDesc: 'نورّد خامات ومستلزمات صناعة المراتب، ونصنّع السوست. الفوم ومكوّنات السوست ومستلزمات الإنتاج متاحة حسب الاستفسار، ويؤكد الفريق المخزون والمواصفات الحالية.',
    enquire: 'استفسر عن المنتج', details: 'اسأل فريقنا', illustrative: 'تفاصيل الفئات تُؤكد عند الاستفسار',
    processTag: 'كيف نعمل', processTitle: 'خطوات واضحة من الطلب إلى التوريد.', processDesc: 'أخبرنا بما يحتاجه إنتاجك، وسنساعدك في توضيح التفاصيل ومناقشة الخطوة المناسبة.',
    steps: [['٠١','شارك متطلباتك','أخبرنا بالاستخدام والكمية التقريبية وأي متطلبات فنية.'],['٠٢','نراجعها معًا','يناقش فريقنا الخيارات المتاحة ويؤكد المواصفات.'],['٠٣','نخطط للتوريد','نتفق على تفاصيل التعبئة والتوقيت والتسليم لطلبك.']],
    capabilityKicker: 'الإمكانيات', capabilityTitle: 'التفاصيل تصنع الفرق.', capabilityBody: 'تختلف الخامة والمقاس والدرجة وخطة الطلب حسب المنتج ومتطلباته. شاركنا احتياجك واطلب أحدث التفاصيل الفنية.', capabilityCta: 'ناقش مواصفاتك', capabilityCards: [['٠١','ملاءمة المنتج','لنحدد معًا الخامة أو السوستة المناسبة لاستخدامك.'],['٠٢','المواصفات','اطلب بيانات فنية مؤكدة ومحدّثة للمنتج.'],['٠٣','تخطيط الطلب','ناقش الكمية والتعبئة ومتطلبات التوريد.']],
    aboutKicker: 'عن نايل بد', aboutTitle: 'نصنّع السوست، ونورّد باقي المستلزمات.', aboutText: 'نايل بد شركة مصرية تورّد الخامات والمستلزمات التي يعمل بها صانع المرتبة، وتصنّع السوست. لا تصنّع مراتب جاهزة ولا تبيعها. ينشر المالك عاطف طه تحديثات المنتجات عبر حسابات الشركة، ومنها رولات ميموري فوم تركي بارتفاعَي ٢ سم و٤ سم ووصول شحنات خامات للمراتب. يؤكد الفريق المخزون والمواصفات الفنية عند الاستفسار.', aboutNote: 'نرحب باستفسارات التصدير · التوافر يؤكد لكل استفسار',
    industries: 'من نخدم', industryTitle: 'لأعمال تصنع منتجات أفضل.', industryItems: ['مصانع المراتب','مصانع الأثاث','الموزعون وتجار الجملة','المشترون الدوليون'],
    gallery: 'خامات في المقدمة', galleryTitle: 'الجودة تبدأ من التفاصيل.', galleryText: 'هذه رسمة عامة وليست صورة لمصنع نايل بد. روابط المنشورات أدناه تعرض شحنات خامات فعلية ومنتجات مرتبطة بالسوست؛ يُرجى تأكيد المخزون الحالي والتصنيف الدقيق للصور الأقدم مع الفريق.',
    ctaKicker: 'لنتحدث في الأعمال', ctaTitle: 'ما الذي يحتاجه خط إنتاجك القادم؟', ctaText: 'أرسل متطلباتك، وسيساعدك فريقنا في تحديد الخطوة التالية.', ctaButton: 'اطلب عرض سعر', contactLabel: 'التواصل وطلب عرض سعر', contactTitle: 'ابدأ بالتفاصيل.', contactText: 'تواصل مع نايل بد عبر البريد أو واتساب المنشورين أدناه. نموذج الاستفسار للمعاينة فقط ولا يرسل أو يخزن البيانات.',
    fields: ['الاسم الكامل','الشركة','البريد الإلكتروني للعمل','الدولة','المنتج المطلوب','الكمية التقريبية','المواصفات الفنية / ملاحظات'], country: 'اختر الدولة', product: 'اختر فئة المنتج', qty: 'مثال: ١٠٬٠٠٠ وحدة', submit: 'جهّز الاستفسار', formNote: 'هذه المعاينة لا ترسل أو تخزن الرسائل. تواصل بالبريد أو واتساب عبر الروابط بجوار النموذج.', footer: 'خامات المراتب وتصنيع السوست · مصر', back: 'العودة للأعلى', menu: 'فتح القائمة', close: 'إغلاق القائمة', toggle: 'English',
    productNames:['خامات ومستلزمات المراتب','تصنيع السوست','الفوم والخامات المستوردة'], productDesc:['نورّد للمصانع والورش وتجار الجملة خامات ومستلزمات تصنيع المراتب. يُؤكَّد توافر كل صنف ودرجته عند الاستفسار.','السوست من تصنيعنا في مصر. شاركنا المقاسات والكمية ليؤكد الفريق المواصفات المناسبة.','ميموري فوم مستورد وخامات راحة أخرى، منها رولات بارتفاعَي ٢ سم و٤ سم في تحديث عام حديث. يُؤكد المخزون والمواصفات عند الاستفسار.'], specs: 'تختلف المواصفات حسب المنتج. تواصل مع فريقنا لمعرفة التفاصيل المؤكدة.', quoteHint: 'التوافر والمواصفات الفنية تُؤكَّد عند الاستفسار. تواصل مع الفريق بالبريد أو واتساب أدناه.',
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
    try { window.localStorage.setItem('nilebed-theme', next); } catch { /* storage can be blocked; theme still applies */ }
  };
  const t = copy[lang]; const ar = lang === 'ar';
  const themeLabel = theme === 'dark' ? themeLabels[lang].switchToLight : themeLabels[lang].switchToDark;
  return <main className="nile" dir={ar ? 'rtl' : 'ltr'} lang={lang}>
    <header className="topbar"><a className="brand" href="#home" aria-label={ar ? 'نايل بد — الصفحة الرئيسية' : 'Nile Bed — home'}><BrandLogo variant="dark" /></a>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">{t.nav.map((n,i)=><a key={n} href={['#products','#process','#capabilities','#about','#contact'][i]} onClick={()=>setMenuOpen(false)}>{n}</a>)}</nav>
      <div className="nav-actions"><button className="theme-switch" type="button" onClick={toggleTheme} aria-label={themeLabel} aria-pressed={theme === 'dark'} title={themeLabel}><Moon className="icon-moon" size={15}/><Sun className="icon-sun" size={15}/><span>{themeLabel}</span></button><button className="lang-switch" type="button" onClick={()=>setLang(ar?'en':'ar')} aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}><Globe2 size={15}/>{t.toggle}</button><a className="nav-cta" href="#contact">{t.quote.split(' ')[0]} <ArrowUpRight size={15}/></a><button className="menu-btn" type="button" aria-expanded={menuOpen} aria-label={menuOpen?t.close:t.menu} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></div>
    </header>
    <section className="hero" id="home"><div className="hero-image"/><div className="hero-shade"/><div className="hero-inner"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/>{t.eyebrow}</div><h1>{t.titleA}<br/>{t.titleB}<br/><em>{t.titleC}</em></h1><p className="hero-intro">{t.intro}</p><div className="hero-buttons"><a className="button button-copper" href="#products">{t.explore}<ArrowUpRight size={17}/></a><a className="button button-glass" href="#contact">{t.quote}<ArrowUpRight size={17}/></a></div><div className="hero-foot"><span className="tiny-mark">NB</span><span>{t.note}</span><span className="foot-rule"/></div></div><div className="hero-index"><span>01</span><i/>04</div></div><div className="hero-vertical">{ar?'نايل بد · خامات المراتب والسوست':'NILE BED · MATTRESS MATERIALS'}</div></section>
    <section className="intro section-pad"><div className="intro-stamp"><BrandLogo variant="auto"/><i/><small>ESTABLISHED<br/>IN EGYPT</small></div><div className="intro-content"><div className="section-label"><span>01</span>{t.introLabel}</div><h2>{t.introTitle}</h2><div className="intro-bottom"><p>{t.introBody}</p><div className="intro-proof"><span><Check size={15}/>{t.since}</span><small>{t.introFoot}</small></div></div></div></section>
    <section className="scope-band" aria-label={ar?'نطاق عملنا':'Our business scope'}><div className="scope-inner"><div className="scope-top"><div><div className="section-label"><span>02</span>{t.scopeKicker}</div><h2>{t.scopeTitle}</h2></div><p>{t.scopeText}</p></div><div className="scope-grid">{t.scopeCards.map(([n,title,body],i)=><article className={i===2?'scope-card scope-card-no':'scope-card'} key={title}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div>{i===2?<X size={18}/>:<Check size={18}/>}</article>)}</div></div></section>
    <section className="products section-pad" id="products"><div className="section-head"><div><div className="section-label"><span>03</span>{t.productsKicker}</div><h2>{t.productsTitle}</h2></div><p>{t.productsDesc}</p></div>
      {/* Featured wire specs chips */}
      <div className="wire-chips" aria-label={ar ? 'أنواع السلك المتاحة' : 'Available wire types'}>
        {[
          ar ? 'سلك 2.4 — 14.5/16.5 سم' : 'Wire 2.4 — 14.5/16.5 cm',
          ar ? 'سلك 2.3 — 16.5 سم' : 'Wire 2.3 — 16.5 cm',
          ar ? 'سلك 2.2 — 16.5 سم' : 'Wire 2.2 — 16.5 cm',
          ar ? 'سلك 2.05 — 16/16.5 سم' : 'Wire 2.05 — 16/16.5 cm',
          ar ? 'فريم حديد' : 'Border frame',
          ar ? 'بوكيت 12–31 سم' : 'Pocket 12–31 cm',
        ].map(c => <span key={c} className="wire-chip"><em>NB</em>{c}</span>)}
      </div>
      <div className="catalog-preview-grid">
        {[
          { img: '/catalog/springs/bonnell-1.jpg', count: ar ? '7 أنواع' : '7 types', tag: ar ? 'تصنيع نايل بد' : 'MADE BY NILE BED', title: ar ? 'السوست — بونيل' : 'Springs — Bonnell', desc: ar ? 'سلك 2.4 إلى 2.05 بأقطار 8.5–8.8 وارتفاع 14.5–16.5 سم. تصنيع حسب الطلب.' : 'Wire 2.4 to 2.05, Ø 8.5–8.8 cm, height 14.5–16.5 cm. Made to order.', link: '/catalog#springs' },
          { img: '/catalog/pocket/pocket-1.jpg', count: ar ? '3 رولات' : '3 rolls', tag: 'POCKET', title: ar ? 'رول البوكيت' : 'Pocket Roll', desc: ar ? 'ارتفاعات 12–31 سم × عرض 80، ومقاسات 1.85×4.80 و 1.75×4.80.' : 'Heights 12–31 cm × 80 cm width, plus 1.85×4.80 & 1.75×4.80.', link: '/catalog#springs' },
          { img: '/catalog/foam/memory-2cm.jpg', count: ar ? '8 أصناف' : '8 items', tag: ar ? 'وارد تركيا' : 'TURKEY IMPORT', title: ar ? 'ميموري ولاتكس' : 'Memory & Latex', desc: ar ? 'ميموري رول 2 و 4 سم تركي، ولاتكس 2.5–5 سم. رول وشيت.' : 'Turkish memory rolls 2 & 4 cm, latex 2.5–5 cm. Roll & sheet.', link: '/catalog#foam' },
          { img: '/catalog/foam/latex-roll-2.webp', count: ar ? 'مقاسان' : '2 sizes', tag: 'LANX', title: ar ? 'لب مراتب لانكس' : 'Lanx Cores', desc: ar ? 'عرض 2 م، ارتفاع 18 سم، طول 160 و 180. خام مراتب — لا نبيع جاهز.' : 'Width 2 m, height 18 cm, length 160 & 180. Material only.', link: '/catalog#latex-mattress' },
          { img: '/catalog/materials/felt-1.jpg', count: ar ? '9 أصناف' : '9 items', tag: ar ? 'خامات مساعدة' : 'AUXILIARY', title: ar ? 'لباد وفازلين ولوازم' : 'Felt, Non-woven & Supplies', desc: ar ? 'لباد قطن/مقطع/رول، فازلين 210/160/14، غراء، خيط، تيب، كلبس، دبل.' : 'Cotton/pre-cut/roll felt, non-woven 210/160/14, glue, thread, tape, clips.', link: '/catalog#materials' },
          { img: '/catalog/tools/clip-gun-1.jpg', count: ar ? '3 عدد' : '3 tools', tag: 'TOOLS', title: ar ? 'المسدسات والعدد' : 'Tools & Guns', desc: ar ? 'مسدس كلبس، مسدس دبل، مسدس غراء — نيوماتيك وحراري.' : 'Clip gun, double-clip gun, glue gun — pneumatic & hot-melt.', link: '/catalog#tools' },
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
              <span><i />{ar ? 'صور توضيحية' : 'Illustrative photos'}</span>
              <a href="/catalog" aria-label={`${ar ? 'عرض' : 'View'} ${card.title}`}><ArrowUpRight size={14} /></a>
            </div>
          </article>
        ))}
      </div>
      <div className="catalog-preview-actions">
        <a className="button button-copper" href="/catalog">{ar ? 'عرض الكتالوج الكامل' : 'View full catalog'} — {ar ? '36 صنف بالصور' : '36 items with photos'}<ArrowUpRight size={17} /></a>
        <a className="button button-glass" href="#contact" style={{ borderColor: 'var(--line-2)', color: 'var(--t-1)', background: 'var(--card)' }}>{t.quote}<ArrowUpRight size={17} /></a>
      </div>
      <div className="catalog-preview-note"><CircleHelp size={14} />{t.quoteHint}</div>
    </section>
    <section className="process" id="process"><div className="section-pad process-inner"><div className="process-head"><div className="section-label light"><span>04</span>{t.processTag}</div><h2>{t.processTitle}</h2><p>{t.processDesc}</p></div><div className="steps">{t.steps.map((step,i)=><article className="step" key={step[0]}><span className="step-number">{step[0]}</span><div className="step-icon">{i===0?<Layers3/>:i===1?<BadgeCheck/>:<Truck/>}</div><h3>{step[1]}</h3><p>{step[2]}</p><span className="step-line"/></article>)}</div><div className="process-bottom"><span>NB / PROCESS</span><span>{ar?'نستمع، نراجع، ثم نخطط.':'LISTEN. REVIEW. PLAN.'}</span></div></div></section>
    <section className="capabilities section-pad" id="capabilities"><div className="cap-intro"><div className="section-label"><span>05</span>{t.capabilityKicker}</div><h2>{t.capabilityTitle}</h2><p>{t.capabilityBody}</p><a className="text-link" href="#contact">{t.capabilityCta}<ArrowUpRight size={16}/></a></div><div className="cap-cards">{t.capabilityCards.map(([n,title,body])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowUpRight size={17}/></article>)}</div></section>
    <section className="about" id="about"><div className="about-art"><div className="about-gridlines"/><span className="about-vertical">NILE BED / EGYPT</span><div className="about-monogram">N<span>B</span></div><div className="about-caption"><span>ORIGIN / 01</span><span>EGYPT</span></div></div><div className="about-copy"><div className="section-label"><span>06</span>{t.aboutKicker}</div><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className="about-note"><Globe2 size={17}/>{t.aboutNote}</div><div className="industry-list"><span>{t.industries}</span><h3>{t.industryTitle}</h3><div>{t.industryItems.map((it,i)=><span key={it}><i>0{i+1}</i>{it}</span>)}</div></div></div></section>
    <section className="gallery section-pad"><div className="gallery-image"><img src="/nilebed-springs.svg" alt={ar?'صورة توضيحية عامة لتفاصيل سوست معدنية':'Illustrative close-up of a generic steel spring assembly'} loading="lazy" decoding="async" width={1600} height={1000}/><span className="image-disclaimer">ILLUSTRATIVE IMAGE · NOT NILE BED FACTORY</span><span className="gallery-index">NB — 01</span></div><div className="gallery-copy"><div className="section-label"><span>07</span>{t.gallery}</div><h2>{t.galleryTitle}</h2><p>{t.galleryText}</p><span className="gallery-line"/><div className="gallery-source-links"><a href="https://www.facebook.com/tefa.elsid/posts/pfbid0m1srtgZL3xKRrUy1B8Ve1XZSwSYnRtrsd5rBF3UdTY7djEPLXLvafFK79gz2ScX3l" target="_blank" rel="noopener noreferrer">{ar?'منشور وصول رولات الميموري فوم التركي · ٢ سم و٤ سم':'Turkish memory foam rolls · 2 cm and 4 cm update'}<ArrowUpRight size={14}/></a><a href="https://www.facebook.com/permalink.php?story_fbid=pfbid02sJkKNaECJVkjv9qMyKWYhxNRhSQnSBfs62dZo83d38hQ1UagWkLpKHiBWjdgxYpTl&id=100047775297291" target="_blank" rel="noopener noreferrer">{ar?'منشور شحنة خامات المراتب وصور المنتجات':'Mattress materials shipment and product photos'}<ArrowUpRight size={14}/></a></div></div></section>
    <section className="cta-band"><div className="cta-orbit orbit-one"/><div className="cta-orbit orbit-two"/><div className="cta-copy"><div className="section-label light"><span>08</span>{t.ctaKicker}</div><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div><a href="#contact" className="button button-copper">{t.ctaButton}<ArrowUpRight size={17}/></a></section>
    <section className="contact section-pad" id="contact"><div className="contact-heading"><div className="section-label"><span>09</span>{t.contactLabel}</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="social-links">{["https://www.facebook.com/profile.php?id=100047775297291", "https://www.facebook.com/profile.php?id=100009326443352", "https://www.facebook.com/tefa.elsid"].map((url, i) => <a key={url} href={url} target="_blank" rel="noopener noreferrer">{ar ? ["صفحة Nile Bed التجارية", "حساب Nile Bed", "تحديثات عاطف طه"][i] : ["Nile Bed business page", "Nile Bed profile", "Atef Taha updates"][i]} <ArrowUpRight size={14}/></a>)}</div><div className="contact-mini"><a href="mailto:info@nilebed.com"><Mail size={16}/>info@nilebed.com</a><a href="https://wa.me/201090000676" target="_blank" rel="noopener noreferrer"><Phone size={16}/>{ar?'واتساب: 010 90000676':'WhatsApp: 010 90000676'}</a></div></div><form className="rfq-form" onSubmit={e=>e.preventDefault()}><div className="form-grid"><label>{t.fields[0]}<input required placeholder={ar?'اسمك':'Your name'}/></label><label>{t.fields[1]}<input placeholder={ar?'اسم الشركة':'Company name'}/></label><label>{t.fields[2]}<input type="email" required placeholder="name@company.com"/></label><label>{t.fields[3]}<input placeholder={ar?'الدولة':'Country'}/></label><label>{t.fields[4]}<select defaultValue=""><option value="" disabled>{t.product}</option>{t.productNames.map(x=><option key={x}>{x}</option>)}</select></label><label>{t.fields[5]}<input placeholder={t.qty}/></label><label className="full-field">{t.fields[6]}<textarea rows={4} placeholder={ar?'اكتب متطلباتك هنا...':'Tell us about your requirements...'}/></label></div><button className="button button-dark" type="submit" disabled>{t.submit}<ArrowUpRight size={17}/></button><small className="form-note"><CircleHelp size={14}/>{t.formNote}</small></form></section>
    <footer className="footer"><a className="brand footer-brand" href="#home" aria-label={ar ? 'نايل بد' : 'Nile Bed'}><BrandLogo variant="dark"/></a><span>{t.footer}</span><a href="#home">{t.back}<ArrowRight size={14}/></a><small>© {new Date().getFullYear()} NILE BED</small></footer>
  </main>;
}
