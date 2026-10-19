'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Search, Filter, Phone, Mail, Globe2, Menu, X, Moon, Sun, Check, Package, Layers3, Boxes, Scissors, Link2, Sparkles, Wrench, ShieldCheck, Info } from 'lucide-react';
import { groups, items } from './data';
import './catalog.css';

type Lang = 'ar' | 'en';
type Theme = 'light' | 'dark';

const ui = {
  ar: {
    nav: ['الرئيسية', 'الكتالوج', 'تواصل'],
    title: 'كتالوج خامات نايل بد',
    subtitle: 'كل الأصناف في مكان واحد — سوست وفريم وسلك، شاسيهات مجمّعة، بوكيت رول ومفروش جاهز، ميموري ولاتكس وخام مراتب، لباد وفازلين وميلتون وبلاستيك، خيوط وتيب، لوازم تجميع، وغراء وعدد. الصور والرسوم توضيحية أُعدّت لتمثيل أنواع الخامات، وليست صورًا فعلية لمنتجات نايل بد أو لمخزونها. المواصفات النهائية تُؤكَّد مع الفريق.',
    disclaimer: 'الصور والرسوم توضيحية معدّة لتمثيل فئات الخامات، وليست صورًا فعلية من مصنع نايل بد أو لمخزونها الحالي. نورّد الخامات ونصنّع السوست فقط، ولا نصنّع مراتب جاهزة. محتاج قماش أو إسفنج؟ نوجّهك لشريك من شركائنا لتشتري بسعر مميز.',
    searchPlaceholder: 'ابحث في الأصناف… مثل: شاسية 18×25، بوكيت مفروش، سلك 2.4، لباد أسود، تيب 3D',
    all: 'الكل',
    count: (n: number) => `${n} صنف`,
    enquire: 'استفسر عبر واتساب',
    emailEnquire: 'راسلنا بالبريد',
    specs: 'المواصفات',
    available: 'متوفر حسب الطلب',
    illustrative: 'صورة توضيحية',
    backTop: 'العودة للأعلى',
    toggle: 'English',
    contactNote: 'للطلب والاستفسار: واتساب 010 90000676 • info@nilebed.com',
    noResults: 'لا توجد نتائج مطابقة. جرّب كلمة أخرى أو اختر فئة مختلفة.',
    footer: 'خامات المراتب وتصنيع السوست · مصر',
    themeDark: 'الوضع الليلي',
    themeLight: 'الوضع النهاري',
  },
  en: {
    nav: ['Home', 'Catalog', 'Contact'],
    title: 'Nile Bed Catalog',
    subtitle: 'Every category in one place — springs, frames and wire, assembled shasia units, pocket rolls and ready-spread pocket, memory, latex and mattress cores, felt, non-woven, Melton and plastic, threads and tape, assembly fasteners, glue and tools. Product illustrations are for category reference only; they are not photos of Nile Bed or confirmed stock. Final specs are confirmed with the team.',
    disclaimer: 'Product illustrations show representative material types only; they are not photos of Nile Bed, actual products or current stock. We supply materials and make springs only; we do not make finished mattresses. Need fabric or sponge? We refer you to one of our partners so you can buy at a special price.',
    searchPlaceholder: 'Search items… e.g. shasia 18×25, ready pocket, wire 2.4, black felt, 3D tape',
    all: 'All',
    count: (n: number) => `${n} items`,
    enquire: 'Enquire on WhatsApp',
    emailEnquire: 'Email us',
    specs: 'Specs',
    available: 'Available on order',
    illustrative: 'Illustrative image',
    backTop: 'Back to top',
    toggle: 'العربية',
    contactNote: 'For orders: WhatsApp 010 90000676 • info@nilebed.com',
    noResults: 'No matches. Try another keyword or pick a different category.',
    footer: 'Mattress materials & spring manufacturing · Egypt',
    themeDark: 'Dark mode',
    themeLight: 'Light mode',
  },
} as const;

const groupMeta: Record<string, { icon: React.ReactNode }> = {
  springs: { icon: <Layers3 size={16} /> },
  shasia: { icon: <Boxes size={16} /> },
  pocket: { icon: <Package size={16} /> },
  foam: { icon: <Sparkles size={16} /> },
  materials: { icon: <ShieldCheck size={16} /> },
  supplies: { icon: <Scissors size={16} /> },
  fasteners: { icon: <Link2 size={16} /> },
  tools: { icon: <Wrench size={16} /> },
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

export default function CatalogPage() {
  const [lang, setLang] = useState<Lang>('ar');
  const [theme, setTheme] = useState<Theme>('light');
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const t = ui[lang];
  const ar = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
  }, [lang, ar]);

  useEffect(() => {
    const saved = document.documentElement.dataset.theme as Theme | undefined;
    setTheme(saved === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('nilebed-theme-v3', next); } catch {}
  };

  // Sizes are written as 18×25 across the catalog, but people often type 18*25
  // (as on the stock sheets) or with Arabic-Indic digits; normalise both sides.
  const normalizeSearch = (value: string) => value
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/(\d)\s*[*xX×]\s*(\d)/g, '$1×$2')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    return items.filter((it) => {
      const byGroup = activeGroup === 'all' || it.group === activeGroup;
      if (!byGroup) return false;
      if (!q) return true;
      const hay = normalizeSearch(`${it.ar.name} ${it.ar.desc} ${it.ar.specs.join(' ')} ${it.en.name} ${it.en.desc} ${it.en.specs.join(' ')}`);
      return hay.includes(q);
    });
  }, [activeGroup, query]);

  const groupedForDisplay = useMemo(() => {
    if (activeGroup !== 'all' || query) return [{ id: 'results', items: filtered }];
    // show grouped by group id in order of groups definition
    return groups.map((g) => ({ id: g.id, items: items.filter((it) => it.group === g.id) }));
  }, [activeGroup, query, filtered]);

  const countBy = (groupId: string) => items.filter((it) => it.group === groupId).length;

  const waNumber = '201090000676';
  const email = 'info@nilebed.com';

  return (
    <main className="nile catalog-page" dir={ar ? 'rtl' : 'ltr'} lang={lang}>
      {/* Topbar — same as home but with catalog link */}
      <header className="topbar catalog-topbar">
        <a className="brand" href="/" aria-label={ar ? 'نايل بد — الرئيسية' : 'Nile Bed — home'}>
<BrandLogo variant="auto" />
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          <a href="/">{t.nav[0]}</a>
          <a href="/catalog" aria-current="page">{t.nav[1]}</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)}>{t.nav[2]}</a>
        </nav>
        <div className="nav-actions">
          <button className="theme-switch" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? t.themeLight : t.themeDark} aria-pressed={theme === 'dark'}>
            <Moon className="icon-moon" size={15} /><Sun className="icon-sun" size={15} /><span>{theme === 'dark' ? t.themeLight : t.themeDark}</span>
          </button>
          <button className="lang-switch" type="button" onClick={() => setLang(ar ? 'en' : 'ar')} aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}>
            <Globe2 size={15} />{t.toggle}
          </button>
          <a className="nav-cta" href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer">
            {ar ? 'واتساب' : 'WhatsApp'} <ArrowUpRight size={15} />
          </a>
          <button className="menu-btn" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close' : 'Open'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      {/* Hero */}
      <section className="catalog-hero">
        <div className="catalog-hero-bg" />
        <div className="catalog-hero-inner">
          <div className="catalog-hero-copy">
            <div className="eyebrow" style={{ color: 'var(--copper-light)' }}><span className="eyebrow-line" />{ar ? 'الكتالوج الكامل · مصر' : 'FULL CATALOG · EGYPT'}</div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
            <div className="catalog-hero-badges">
              <span><Check size={14} />{ar ? 'تصنيع سوست في مصر' : 'Springs made in Egypt'}</span>
              <span><Check size={14} />{ar ? 'توريد خامات مراتب' : 'Mattress materials supply'}</span>
              <span><Check size={14} />{ar ? 'فريم ورول سلك 1.3' : 'Frame & 1.3 mm wire roll'}</span>
            </div>
            <div className="catalog-hero-cta">
              <a className="button button-copper" href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"><Phone size={16} />{t.enquire}</a>
              <a className="button button-glass" href={`mailto:${email}`}><Mail size={16} />{t.emailEnquire}</a>
            </div>
            <div className="catalog-disclaimer"><Info size={14} />{t.disclaimer}</div>
          </div>
          <div className="catalog-hero-stats">
            <div className="stat-card">
              <strong>{items.length}</strong>
              <span>{ar ? 'صنف في الكتالوج' : 'items in catalog'}</span>
              <small>{ar ? `مقسمة على ${groups.length} مجموعات` : `across ${groups.length} groups`}</small>
            </div>
            <div className="stat-card">
              <strong>{countBy('springs')}</strong>
              <span>{ar ? 'سوست وسلك وفريم' : 'springs, wire & frames'}</span>
              <small>2.4 · 2.3 · 2.2 · 2.05 · 1.3</small>
            </div>
            <div className="stat-card">
              <strong>{countBy('shasia')}</strong>
              <span>{ar ? 'مقاس شاسية مجمّع' : 'assembled shasia sizes'}</span>
              <small>{ar ? 'من 18×25 إلى 29×30' : '18×25 to 29×30'}</small>
            </div>
            <div className="stat-card">
              <strong>12–18</strong>
              <span>{ar ? 'سم ارتفاع بوكيت' : 'cm pocket height'}</span>
              <small>{ar ? 'رول ومفروش جاهز' : 'rolls & ready-spread'}</small>
            </div>
            <div className="catalog-contact-mini">
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"><Phone size={15} />{ar ? 'واتساب: 010 90000676' : 'WhatsApp: 010 90000676'}</a>
              <a href={`mailto:${email}`}><Mail size={15} />{email}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="catalog-filters">
        <div className="filters-inner">
          <div className="filters-top">
            <div className="search-wrap">
              <Search size={16} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPlaceholder} aria-label={ar ? 'بحث' : 'Search'} />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="clear"><X size={14} /></button>}
            </div>
            <div className="count-badge"><Filter size={13} />{t.count(filtered.length)}</div>
          </div>
          <div className="chips" role="tablist" aria-label={ar ? 'تصفية حسب الفئة' : 'Filter by category'}>
            <button role="tab" aria-selected={activeGroup === 'all'} className={activeGroup === 'all' ? 'chip active' : 'chip'} onClick={() => setActiveGroup('all')}>
              {t.all} <span>{items.length}</span>
            </button>
            {groups.map((g) => {
              const count = items.filter((it) => it.group === g.id).length;
              const label = ar ? g.ar.title : g.en.title;
              return (
                <button key={g.id} role="tab" aria-selected={activeGroup === g.id} className={activeGroup === g.id ? 'chip active' : 'chip'} onClick={() => setActiveGroup(g.id)}>
                  <span className="chip-icon">{groupMeta[g.id]?.icon}</span>{label} <span>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="contact-note"><Info size={13} />{t.contactNote}</div>
        </div>
      </section>

      {/* Catalog grid */}
      <section className="catalog-body">
        {filtered.length === 0 ? (
          <div className="no-results">
            <Search size={22} />
            <p>{t.noResults}</p>
            <button className="button button-copper" type="button" onClick={() => { setQuery(''); setActiveGroup('all'); }}>{ar ? 'إعادة ضبط' : 'Reset filters'}</button>
          </div>
        ) : (
          groupedForDisplay.map((section) => {
            if (section.items.length === 0) return null;
            const groupDef = groups.find((g) => g.id === section.id);
            const isResults = section.id === 'results';
            return (
              <div id={isResults ? 'results' : section.id} key={section.id} className="group-block">
                {!isResults && groupDef && (
                  <div className="group-head">
                    <div>
                      <div className="section-label"><span>{groups.indexOf(groupDef) + 1 < 10 ? `0${groups.indexOf(groupDef) + 1}` : groups.indexOf(groupDef) + 1}</span>{ar ? groupDef.ar.kicker : groupDef.en.kicker}</div>
                      <h2>{ar ? groupDef.ar.title : groupDef.en.title}</h2>
                      <p>{ar ? groupDef.ar.desc : groupDef.en.desc}</p>
                    </div>
                    <div className="group-count">{ar ? `${section.items.length} صنف` : `${section.items.length} items`}</div>
                  </div>
                )}
                {isResults && (
                  <div className="group-head results-head">
                    <h2>{ar ? 'نتائج البحث' : 'Search results'}</h2>
                    <span>{t.count(filtered.length)}</span>
                  </div>
                )}
                <div className="catalog-grid">
                  {section.items.map((it) => {
                    const name = ar ? it.ar.name : it.en.name;
                    const desc = ar ? it.ar.desc : it.en.desc;
                    const specs = ar ? it.ar.specs : it.en.specs;
                    const badge = ar ? it.ar.badge : it.en.badge;
                    const waText = encodeURIComponent(ar ? `مرحبا نايل بد، أستفسر عن: ${it.ar.name} — ${it.ar.specs.join('، ')}` : `Hi Nile Bed, enquiry about: ${it.en.name} — ${it.en.specs.join(', ')}`);
                    return (
                      <article key={it.id} className={`catalog-card ${it.highlight ? 'highlight' : ''}`}>
                        <div className="catalog-card-photo">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={it.image} alt={`${name} — ${t.illustrative}`} loading="lazy" decoding="async" />
                          <span>{t.illustrative}</span>
                        </div>
                        <div className="card-body">
                          <div className="card-title-row"><h3>{name}</h3>{badge && <span className="product-badge">{badge}</span>}</div>
                          <p>{desc}</p>
                          <ul className="specs">
                            {specs.map((s) => (
                              <li key={s}><Check size={12} />{s}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="card-foot">
                          <span className="avail"><span />{t.available}</span>
                          <div className="card-actions">
                            <a className="btn-wa" href={`https://wa.me/${waNumber}?text=${waText}`} target="_blank" rel="noopener noreferrer"><Phone size={13} />{ar ? 'واتساب' : 'WhatsApp'}</a>
                            <a className="btn-mail" href={`mailto:${email}?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(desc + '\n' + specs.join('\n'))}`}><Mail size={13} />{ar ? 'بريد' : 'Email'}</a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Bottom CTA */}
      <section className="catalog-cta">
        <div className="catalog-cta-inner">
          <div>
            <div className="section-label light"><span>—</span>{ar ? 'جاهز للطلب؟' : 'READY TO ORDER?'}</div>
            <h2>{ar ? 'أخبرنا بمقاسك وكميتك، ونؤكد المواصفات والسعر.' : 'Tell us your size and quantity. We’ll confirm specs and price.'}</h2>
            <p>{ar ? 'السوست نصنعها، والخامات نورّدها. لا نبيع مراتب جاهزة. ولو محتاج قماش أو إسفنج، نوجّهك إلى الشريك المناسب من شركائنا لتشتري بسعر مميز. كل المواصفات والأسعار تُؤكَّد مباشرة مع الفريق.' : 'We make springs, we supply materials. No finished mattresses. Need fabric or foam? We point you to one of our partners so you can buy at a special price. All specs and prices are confirmed directly with the team.'}</p>
          </div>
          <div className="cta-actions">
            <a className="button button-copper" href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer">{t.enquire} <ArrowUpRight size={16} /></a>
            <a className="button button-glass" href={`mailto:${email}`}>{t.emailEnquire} <Mail size={16} /></a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="/" aria-label="Nile Bed"><BrandLogo variant="dark" /></a>
        <span>{t.footer}</span>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.backTop}</a>
        <small>© {new Date().getFullYear()} NILE BED</small>
      </footer>
    </main>
  );
}
