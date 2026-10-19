'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, Globe2, Layers3, BadgeCheck, Mail, Phone, CircleHelp, Check, Moon, Sun, Network, Sparkles, Package, Truck } from 'lucide-react';
import { items } from './catalog/data';

type Lang = 'ar' | 'en';

/* ——— Copy: kept truthful, same business scope, but presented as brief + focused ——— */
const copy = {
  en: {
    nav: ['Catalog', 'Supply cycle', 'Partners', 'Contact'],
    eyebrow: 'Mattress supply cycle · Egypt · Since springs',
    eyebrowAccent: '01 — NILE BED',
    titleA: 'Everything',
    titleB: 'behind your next',
    titleC: 'great mattress.',
    intro:
      'Made-in-Egypt springs, carefully sourced materials, and a trusted partner network for fabric & sponge. One coordinated supply route — built around your production.',
    explore: 'Explore the catalog',
    quote: 'Talk to our team',
    note: 'One coordinated route. Flexible specs. Confirmed before supply.',
    heroStatLabel: 'catalog items',
    heroGroupsLabel: 'supply groups',
    heroVisualNote: 'One clear place to start — we confirm the right spec and the right supply route with you.',

    anchorLabel: 'Jump to',
    anchors: ['Scope', 'Catalog', 'Partners', 'Contact'],

    scopeKicker: 'WHAT WE DO',
    scopeTitle: 'From spring wire to the finishing layers.',
    scopeText:
      'We make springs, supply mattress materials and connect you with partner suppliers for fabric and sponge. One conversation — the right channel for each product.',
    scopeCards: [
      ['01', 'Made in Egypt', 'Bonnell springs, frames and 1.3 mm wire rolls — manufactured to your order.'],
      ['02', 'Sourced for production', 'Pocket rolls, foam, latex, felt, glue, threads and assembly supplies — specs confirmed per enquiry.'],
      ['03', 'Partner connected', 'Fabric and sponge via trusted partners. We introduce, the partner handles sale & supply.'],
    ],

    featuredKicker: 'THE CATALOG — BRIEF',
    featuredTitle: 'Build the supply list that fits your line.',
    featuredDesc:
      'Four essential families we manufacture and supply. See the full 69-item catalog for every size, thickness and fastener — stock and terms confirmed on enquiry.',
    // Only 4 featured, not 8 — keeps home clean
    featuredNote: 'Fabric & sponge available via partner introduction.',
    enquire: 'Enquire',
    illustrative: 'Illustrative image — confirmed on enquiry',
    viewCatalog: 'View full catalog',
    viewCatalogSub: '69 items · 8 groups',
    talkHint: 'Availability & specs confirmed on enquiry — email or WhatsApp below.',

    productionKicker: 'HOW WE SUPPLY',
    productionTitle: 'Large plans. Flexible choices. Clear specs.',
    productionBody:
      'Share your quantity, application and technical needs. We review options, confirm specs and plan supply to protect consistency. Large-volume enquiries welcome — capacity & lead time confirmed per brief.',
    productionPoints: ['Flexible specifications', 'Quality checks at planning', 'Large volumes welcome'],

    partnersKicker: 'PARTNER NETWORK',
    partnersTitle: 'Make more than a one-off order.',
    partnersText:
      'For mattress makers — and for quality-focused suppliers. Whether you need fabric & sponge, or you supply a product mattress makers should know about, we make the right introduction.',
    supplierTitle: 'Need fabric or sponge?',
    supplierBody: 'Tell us what you’re looking for — we connect you with a partner so you can buy at a special price.',
    supplierCta: 'Find a partner',
    importTitle: 'Have a product to supply?',
    importBody: 'If you offer consistent quality, competitive terms and reliable supply — tell us about your product, origin and capacity.',
    importCta: 'Introduce your product',
    partnershipTitle: 'Start with one order.',
    partnershipBody: 'When the fit is right, clear communication and dependable supply grow into an ongoing relationship.',
    partnershipCta: 'Start a conversation',

    trustKicker: 'OUR STANDARD',
    trustTitle: 'Quality is built into the supply plan.',
    trustText:
      'Our aim is quality that competes with the best — clear specifications, consistent materials and a dependable route. Details confirmed per order.',
    trustPoints: ['Clear specifications', 'Competing quality', 'Confirmed before supply'],

    contactLabel: 'CONTACT & RFQ',
    contactTitle: 'Start with the details.',
    contactText:
      'Contact Nile Bed directly via email or WhatsApp. This form is a preview — it does not submit or store information.',
    fields: ['Full name', 'Company', 'Business email', 'Product of interest', 'Approx. quantity', 'Technical requirements / notes'],
    qty: 'e.g. 10,000 units',
    productHint: 'Select a product family',
    submit: 'Prepare enquiry',
    formNote: 'Preview only — use email / WhatsApp beside the form to contact us.',
    footer: 'Mattress materials & spring manufacturing · Egypt',
    back: 'Back to top',
    menu: 'Open navigation',
    close: 'Close navigation',
    toggle: 'العربية',
  },
  ar: {
    nav: ['الكتالوج', 'دورة التوريد', 'الشركاء', 'تواصل'],
    eyebrow: 'دورة توريد متكاملة لصناعة المراتب · مصر',
    eyebrowAccent: '٠١ — نايل بد',
    titleA: 'كل اللي',
    titleB: 'يكمل شغل',
    titleC: 'المرتبة.',
    intro:
      'سوست نصنعها في مصر، وخامات نختارها بعناية، وشركاء نوصّلك بيهم للقماش والإسفنج. طريق توريد واحد — مبني على احتياج مصنعك.',
    explore: 'استكشف الكتالوج',
    quote: 'تواصل مع فريقنا',
    note: 'مسار واحد. اختيارات مرنة. تُؤكّد قبل التوريد.',
    heroStatLabel: 'صنف في الكتالوج',
    heroGroupsLabel: 'فئات توريد',
    heroVisualNote: 'ابدأ من مكان واضح — ونراجع معك الصنف والمواصفة ومسار التوريد المناسب.',

    anchorLabel: 'انتقل إلى',
    anchors: ['نطاق العمل', 'الكتالوج', 'الشركاء', 'تواصل'],

    scopeKicker: 'نطاق عملنا',
    scopeTitle: 'من سلك السوستة لآخر طبقة تكمل المرتبة.',
    scopeText: 'نصنع السوست، ونورّد خامات المراتب، ونوصّل العميل بشركائنا للقماش والإسفنج. تواصل واحد — وكل منتج من قناة توريده المناسبة.',
    scopeCards: [
      ['٠١', 'تصنيع مصري', 'سوست بونيل وفريم ورولات سلك 1.3 مم — نصنعها في مصر حسب طلبك.'],
      ['٠٢', 'خامات تكمل شغلك', 'بوكيت، فوم، لاتكس، لباد، غراء، خيوط ولوازم إنتاج — المواصفات تُؤكَّد مع كل استفسار.'],
      ['٠٣', 'شبكة شركاء', 'القماش والإسفنج من شركائنا؛ نوصّلك بالشريك والبيع والتوريد مباشرة منه.'],
    ],

    featuredKicker: 'الكتالوج — باختصار',
    featuredTitle: 'كوّن قائمة التوريد المناسبة لخطك.',
    featuredDesc:
      'أربع عائلات أساسية نصنّعها ونورّدها. استكشف الكتالوج الكامل بـ 69 صنف في 8 مجموعات لكل المقاسات والسماكات ولوازم التجميع — التوافر والشروط تُؤكَّد عند الاستفسار.',
    featuredNote: 'القماش والإسفنج عبر شركائنا.',
    enquire: 'استفسر',
    illustrative: 'صورة توضيحية — تُؤكّد عند الاستفسار',
    viewCatalog: 'عرض الكتالوج الكامل',
    viewCatalogSub: '69 صنف · 8 مجموعات',
    talkHint: 'التوافر والمواصفات تُؤكَّد عند الاستفسار — عبر البريد أو واتساب أدناه.',

    productionKicker: 'كيف نورّد',
    productionTitle: 'خطط كبيرة. اختيارات مرنة. ومواصفات واضحة.',
    productionBody:
      'شاركنا الكمية والاستخدام والمواصفات الفنية. نراجع معك الخيارات المتاحة، ونؤكد المواصفات ونخطط للتوريد بما يحافظ على ثبات الجودة. نرحب بطلبات الإنتاج الكبيرة — القدرة ومدة التوريد تُؤكَّدان لكل طلب.',
    productionPoints: ['مرونة في المواصفات', 'مراجعة الجودة عند التخطيط', 'نرحب بالطلبات الكبيرة'],

    partnersKicker: 'شبكة الشركاء',
    partnersTitle: 'أكثر من مجرّد طلب واحد.',
    partnersText: 'لصُنّاع المراتب — وللموردين المهتمين بالجودة. سواء تحتاج قماش وإسفنج، أو عندك منتج يستحق أن يعرفه صُنّاع المراتب، نوصّلك بالطريق الصحيح.',
    supplierTitle: 'محتاج قماش أو إسفنج؟',
    supplierBody: 'احكيلنا بتدوّر على إيه — ونوصّلك بشريك من شبكتنا عشان تشتري بسعر مميز جدًا.',
    supplierCta: 'اعرف شريكك',
    importTitle: 'عندك منتج تريد توريده؟',
    importBody: 'لو بتقدّم جودة ثابتة وأسعار منافسة وتوريد يعتمد عليه — عرّفنا بمنتجك ومصدره وقدرتك.',
    importCta: 'عرّفنا بمنتجك',
    partnershipTitle: 'نبدأ بطلب واحد.',
    partnershipBody: 'لما المواصفات واضحة والتوريد موثوق، الطلب الأول يتحوّل لعلاقة توريد مستمرة.',
    partnershipCta: 'ابدأ حوار شراكة',

    trustKicker: 'معيارنا',
    trustTitle: 'الجودة جزء من خطة التوريد.',
    trustText: 'هدفنا جودة تنافس الأفضل في السوق — بمواصفات واضحة وثبات في الخامات ومسار توريد يعتمد عليه. التفاصيل تُؤكَّد لكل طلب.',
    trustPoints: ['مواصفات واضحة', 'جودة تنافس الأفضل', 'تأكيد قبل التوريد'],

    contactLabel: 'التواصل وطلب عرض سعر',
    contactTitle: 'ابدأ بالتفاصيل.',
    contactText: 'تواصل مع نايل بد عبر البريد أو واتساب المنشورين. نموذج الاستفسار للمعاينة فقط ولا يرسل أو يخزن البيانات.',
    fields: ['الاسم الكامل', 'الشركة', 'البريد للتواصل', 'المنتج المطلوب', 'الكمية التقريبية', 'المواصفات / ملاحظات'],
    qty: 'مثال: 10,000 وحدة',
    productHint: 'اختر فئة المنتج',
    submit: 'جهّز الاستفسار',
    formNote: 'هذه المعاينة لا ترسل أو تخزن الرسائل. تواصل بالبريد أو واتساب عبر الروابط بجوار النموذج.',
    footer: 'خامات المراتب وتصنيع السوست · مصر',
    back: 'العودة للأعلى',
    menu: 'فتح القائمة',
    close: 'إغلاق القائمة',
    toggle: 'English',
  },
} as const;

type Theme = 'light' | 'dark';

const themeLabels = {
  ar: { switchToDark: 'الوضع الليلي', switchToLight: 'الوضع النهاري', label: 'تبديل المظهر' },
  en: { switchToDark: 'Dark mode', switchToLight: 'Light mode', label: 'Toggle colour theme' },
} as const;

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

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    setTheme(saved === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem('nilebed-theme-v3', next);
    } catch {}
  };

  const t = copy[lang];
  const ar = lang === 'ar';
  const countByGroup = (id: string) => items.filter((it) => it.group === id).length;
  const themeLabel = theme === 'dark' ? themeLabels[lang].switchToLight : themeLabels[lang].switchToDark;

  // Four featured families only — keeps home clean (was 8 + chips)
  const featured = [
    {
      img: '/catalog/springs/bonnell-unit.jpg',
      count: `${countByGroup('springs')} ${ar ? 'صنف' : 'items'}`,
      kicker: ar ? 'تصنيع نايل بد' : 'MADE BY NILE BED',
      title: ar ? 'السوست والفريم والسلك' : 'Springs, Frames & Wire',
      desc: ar
        ? 'سوست بونيل 2.05–2.4 مم بارتفاع 14.5–16.5 سم، وفريم 4.5 و5، ورول سلك 1.3 — تصنيع حسب الطلب.'
        : 'Bonnell springs 2.05–2.4 mm at 14.5–16.5 cm, frames 4.5 & 5, 1.3 mm wire rolls — made to order.',
      href: '/catalog#springs',
    },
    {
      img: '/catalog/pocket/pocket-roll.jpg',
      count: `${countByGroup('pocket')} ${ar ? 'صنف' : 'items'}`,
      kicker: 'POCKET',
      title: ar ? 'البوكيت — رول ومفروش' : 'Pocket — Rolls & Ready',
      desc: ar
        ? 'رولات 12–18 سم، ومفروش جاهز 80×25 إلى 80×32 — الكثافة والمقاس يُؤكَّدان مع الفريق.'
        : 'Rolls 12–18 cm, ready-spread 80×25 to 80×32 — density & size confirmed per enquiry.',
      href: '/catalog#pocket',
    },
    {
      img: '/images/foam-materials.webp',
      count: `${countByGroup('foam')} ${ar ? 'صنف' : 'items'}`,
      kicker: ar ? 'تركي وشرق آسيا' : 'TURKEY & EAST ASIA',
      title: ar ? 'ميموري ولاتكس وخام مراتب' : 'Memory, Latex & Cores',
      desc: ar
        ? 'ميموري تركي 2 و4 سم، ولاتكس 2.5–5 سم، وخام لاتكس 15 و18 سم — توريد خام فقط.'
        : 'Turkish memory 2 & 4 cm, neutral latex 2.5–5 cm, latex cores 15 & 18 cm — material only.',
      href: '/catalog#foam',
    },
    {
      img: '/catalog/materials/thread-supplies.jpg',
      count: `${countByGroup('materials') + countByGroup('supplies')} ${ar ? 'صنف' : 'items'}`,
      kicker: ar ? 'لباد وفازلين وخيوط' : 'FELT & THREADS',
      title: ar ? 'لباد ومستلزمات إنتاج' : 'Felt & Production Supplies',
      desc: ar
        ? 'لباد بجميع درجاته، فازلين وميلتون، خيوط كابوتينية وتيب 3D ولوازم تجميع وغراء.'
        : 'Felt in all shades, non-woven & Melton, quilting threads, 3D tape, fasteners & glue.',
      href: '/catalog#materials',
    },
  ];

  return (
    <main className="nile home-clean" dir={ar ? 'rtl' : 'ltr'} lang={lang}>
      {/* ── Topbar — sticky, breathable, not cramped ── */}
      <header className="hc-topbar">
        <a className="brand" href="#home" aria-label={ar ? 'نايل بد — الصفحة الرئيسية' : 'Nile Bed — home'}>
          <BrandLogo variant="auto" />
        </a>

        <nav className={menuOpen ? 'hc-nav open' : 'hc-nav'} aria-label="Main navigation">
          <a href="#scope" onClick={() => setMenuOpen(false)}>{t.nav[1]}</a>
          <a href="#catalog" onClick={() => setMenuOpen(false)}>{t.nav[0]}</a>
          <a href="#partners" onClick={() => setMenuOpen(false)}>{t.nav[2]}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav[3]}</a>
        </nav>

        <div className="hc-actions">
          <button className="theme-switch" type="button" onClick={toggleTheme} aria-label={themeLabel} aria-pressed={theme === 'dark'} title={themeLabel}>
            <Moon className="icon-moon" size={16} />
            <Sun className="icon-sun" size={16} />
            <span>{themeLabel}</span>
          </button>
          <button className="lang-switch" type="button" onClick={() => setLang(ar ? 'en' : 'ar')} aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}>
            <Globe2 size={16} />{t.toggle}
          </button>
          <a className="hc-cta" href="#contact">
            {ar ? 'تواصل' : 'Get in touch'} <ArrowUpRight size={15} />
          </a>
          <button className="hc-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? t.close : t.menu} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {menuOpen && <button className="hc-overlay" aria-label="close menu" onClick={() => setMenuOpen(false)} />}

      {/* ── HERO — creative, focused, decorative headings ── */}
      <section className="hc-hero" id="home">
        <div className="hc-hero-inner">
          <div className="hc-hero-copy">
            <div className="hc-eyebrow">
              <span className="hc-eyebrow-num">{t.eyebrowAccent}</span>
              <i />
              <span>{t.eyebrow}</span>
            </div>

            <h1 className="hc-title">
              <span className="hc-title-line">{t.titleA}</span>
              <span className="hc-title-line">{t.titleB}</span>
              <em className="hc-title-accent">{t.titleC}</em>
            </h1>

            <p className="hc-intro">{t.intro}</p>

            <div className="hc-hero-actions">
              <a className="hc-btn hc-btn-primary" href="#catalog">
                {t.explore} <ArrowUpRight size={16} />
              </a>
              <a className="hc-btn hc-btn-ghost" href="#contact">
                {t.quote} <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="hc-hero-note">
              <span className="hc-nb">NB</span>
              <span>{t.note}</span>
            </div>
          </div>

          <figure className="hc-hero-visual">
            <img
              src="/images/hero-springs-product.webp"
              alt={ar ? 'وحدة سوست بونيل — صورة توضيحية' : 'Bonnell spring unit — illustrative image'}
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="hc-visual-caption">
              <span>{ar ? 'تصنيع السوست في مصر' : 'SPRINGS MADE IN EGYPT'}</span>
              <small>{ar ? 'صورة توضيحية' : 'ILLUSTRATIVE IMAGE'}</small>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Anchor pill — creative scroll navigation ── */}
      <nav className="hc-anchor" aria-label={t.anchorLabel}>
        <span className="hc-anchor-label">{t.anchorLabel}</span>
        <div className="hc-anchor-pills">
          <a href="#scope"><i />{t.anchors[0]}</a>
          <a href="#catalog"><i />{t.anchors[1]}</a>
          <a href="#partners"><i />{t.anchors[2]}</a>
          <a href="#contact"><i />{t.anchors[3]}</a>
        </div>
      </nav>

      {/* ── SCOPE — 3 cards only, generous whitespace ── */}
      <section className="hc-section hc-scope" id="scope">
        <div className="hc-section-head">
          <div>
            <div className="hc-kicker"><span>01</span>{t.scopeKicker}</div>
            <h2 className="hc-h2">{t.scopeTitle}</h2>
          </div>
          <p>{t.scopeText}</p>
        </div>
        <div className="hc-scope-grid">
          {t.scopeCards.map(([num, title, body], i) => (
            <article key={title} className={i === 2 ? 'hc-card hc-card-dark' : 'hc-card'}>
              <span className="hc-card-num">{num}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="hc-card-icon">{i === 2 ? <Network size={18} /> : i === 1 ? <Layers3 size={18} /> : <Check size={18} />}</div>
            </article>
          ))}
        </div>
      </section>

      {/* ── FEATURED CATALOG — only 4 cards, clean, no chips ── */}
      <section className="hc-section hc-catalog" id="catalog">
        <div className="hc-section-head">
          <div>
            <div className="hc-kicker"><span>02</span>{t.featuredKicker}</div>
            <h2 className="hc-h2">{t.featuredTitle}</h2>
          </div>
          <p>{t.featuredDesc}</p>
        </div>

        <div className="hc-featured-grid">
          {featured.map((card) => (
            <article key={card.title} className="hc-featured-card">
              <div className="hc-featured-media">
                <img src={card.img} alt={card.title} loading="lazy" decoding="async" />
                <span className="hc-tag">{card.kicker}</span>
                <span className="hc-count">{card.count}</span>
              </div>
              <div className="hc-featured-body">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
              <div className="hc-featured-foot">
                <span className="hc-avail"><i />{t.illustrative}</span>
                <a href={card.href} aria-label={card.title}><ArrowUpRight size={14} /></a>
              </div>
            </article>
          ))}
        </div>

        <div className="hc-catalog-actions">
          <a className="hc-btn hc-btn-primary hc-btn-lg" href="/catalog">
            {t.viewCatalog} <span className="hc-btn-sub">{t.viewCatalogSub}</span> <ArrowUpRight size={17} />
          </a>
          <a className="hc-btn hc-btn-ghost" href="#contact">{t.quote} <ArrowUpRight size={17} /></a>
        </div>
        <div className="hc-hint"><CircleHelp size={15} />{t.talkHint}</div>
      </section>

      {/* ── PRODUCTION — single elegant band, not cramped ── */}
      <section className="hc-production" id="production">
        <div className="hc-production-inner">
          <div className="hc-production-copy">
            <div className="hc-kicker hc-kicker-light"><span>03</span>{t.productionKicker}</div>
            <h2 className="hc-h2 hc-h2-light">{t.productionTitle}</h2>
            <p>{t.productionBody}</p>
            <a className="hc-btn hc-btn-primary" href="#contact">{t.quote} <ArrowUpRight size={17} /></a>
          </div>
          <ul className="hc-production-points">
            {t.productionPoints.map((p, i) => (
              <li key={p}><span>0{i + 1}</span><strong>{p}</strong><Check size={16} /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PARTNERS — one creative split, replaces 3 stacked sections ── */}
      <section className="hc-section hc-partners" id="partners">
        <div className="hc-section-head">
          <div>
            <div className="hc-kicker"><span>04</span>{t.partnersKicker}</div>
            <h2 className="hc-h2">{t.partnersTitle}</h2>
          </div>
          <p>{t.partnersText}</p>
        </div>

        <div className="hc-partners-grid">
          <article className="hc-partner-card">
            <div className="hc-partner-icon"><Truck size={18} /></div>
            <span className="hc-partner-kicker">01 — {ar ? 'لصُنّاع المراتب' : 'FOR MAKERS'}</span>
            <h3>{t.supplierTitle}</h3>
            <p>{t.supplierBody}</p>
            <a className="hc-btn hc-btn-dark" href={`https://wa.me/201090000676?text=${encodeURIComponent(ar ? 'مرحبًا نايل بد، أبحث عن شريك للقماش والإسفنج:' : 'Hello Nile Bed, I am looking for a fabric & sponge partner:')}`} target="_blank" rel="noopener noreferrer">
              {t.supplierCta} <ArrowUpRight size={15} />
            </a>
            <span className="hc-partner-mark">S</span>
          </article>

          <article className="hc-partner-card hc-partner-card-dark">
            <div className="hc-partner-icon"><Sparkles size={18} /></div>
            <span className="hc-partner-kicker">02 — {ar ? 'للموردين' : 'FOR SUPPLIERS'}</span>
            <h3>{t.importTitle}</h3>
            <p>{t.importBody}</p>
            <a className="hc-btn hc-btn-primary" href={`https://wa.me/201090000676?text=${encodeURIComponent(ar ? 'مرحبًا نايل بد، أرغب في عرض منتج للتوريد:' : 'Hello Nile Bed, I would like to introduce a product:')}`} target="_blank" rel="noopener noreferrer">
              {t.importCta} <ArrowUpRight size={15} />
            </a>
            <span className="hc-partner-mark">I</span>
          </article>
        </div>

        <div className="hc-partnership-strip">
          <div>
            <h3>{t.partnershipTitle}</h3>
            <p>{t.partnershipBody}</p>
          </div>
          <a className="hc-btn hc-btn-ghost" href="https://wa.me/201090000676" target="_blank" rel="noopener noreferrer"><Network size={16} />{t.partnershipCta} <ArrowUpRight size={16} /></a>
        </div>
      </section>

      {/* ── TRUST — minimal, airy ── */}
      <section className="hc-trust" id="quality">
        <div className="hc-trust-inner">
          <div className="hc-trust-stamp"><span>NB</span><i />{ar ? 'جودة / توريد' : 'QUALITY / SUPPLY'}</div>
          <div className="hc-trust-copy">
            <div className="hc-kicker hc-kicker-light"><span>05</span>{t.trustKicker}</div>
            <h2 className="hc-h2 hc-h2-light">{t.trustTitle}</h2>
            <p>{t.trustText}</p>
            <div className="hc-trust-points">
              {t.trustPoints.map((p) => <span key={p}>{p}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT — generous form, not crowded ── */}
      <section className="hc-section hc-contact" id="contact">
        <div className="hc-contact-head">
          <div className="hc-kicker"><span>06</span>{t.contactLabel}</div>
          <h2 className="hc-h2">{t.contactTitle}</h2>
          <p>{t.contactText}</p>

          <div className="hc-contact-links">
            <a href="mailto:info@nilebed.com"><Mail size={16} />info@nilebed.com</a>
            <a href="https://wa.me/201090000676" target="_blank" rel="noopener noreferrer"><Phone size={16} />{ar ? 'واتساب: 010 90000676' : 'WhatsApp: 010 90000676'}</a>
          </div>

          <div className="hc-social">
            {['https://www.facebook.com/profile.php?id=100047775297291', 'https://www.facebook.com/profile.php?id=100009326443352', 'https://www.facebook.com/tefa.elsid'].map((url, i) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                {ar ? ['صفحة Nile Bed', 'حساب Nile Bed', 'تحديثات عاطف طه'][i] : ['Business page', 'Profile', 'Atef Taha updates'][i]} <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>

        <form className="hc-form" onSubmit={(e) => e.preventDefault()}>
          <div className="hc-form-grid">
            <label>{t.fields[0]} <input required placeholder={ar ? 'اسمك' : 'Your name'} /></label>
            <label>{t.fields[1]} <input placeholder={ar ? 'اسم الشركة' : 'Company name'} /></label>
            <label>{t.fields[2]} <input type="email" required placeholder="name@company.com" /></label>
            <label>{t.fields[3]}
              <select defaultValue="">
                <option value="" disabled>{t.productHint}</option>
                <option>{ar ? 'سوست وفريم وسلك' : 'Springs & Wire'}</option>
                <option>{ar ? 'بوكيت ومفروش' : 'Pocket & Ready'}</option>
                <option>{ar ? 'فوم ولاتكس' : 'Foam & Latex'}</option>
                <option>{ar ? 'لباد وخيوط ومستلزمات' : 'Felt & Supplies'}</option>
              </select>
            </label>
            <label>{t.fields[4]} <input placeholder={t.qty} /></label>
            <label className="hc-full">{t.fields[5]} <textarea rows={4} placeholder={ar ? 'اكتب متطلباتك هنا...' : 'Tell us about your requirements...'} /></label>
          </div>
          <button className="hc-btn hc-btn-dark" type="submit" disabled>{t.submit} <ArrowUpRight size={17} /></button>
          <small className="hc-form-note"><CircleHelp size={14} />{t.formNote}</small>
        </form>
      </section>

      <footer className="hc-footer">
        <a className="brand" href="#home" aria-label="Nile Bed"><BrandLogo variant="dark" /></a>
        <span>{t.footer}</span>
        <a href="#home">{t.back} <ArrowRight size={14} /></a>
        <small>© {new Date().getFullYear()} NILE BED</small>
      </footer>
    </main>
  );
}
