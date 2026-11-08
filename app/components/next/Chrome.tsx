'use client';

/**
 * NEXT — shared chrome for the rebuilt site.
 *
 * Extracted from the home page so every page renders the SAME glass pill
 * navigation, logo lock-up, language/theme controls and footer. Before this
 * refactor each page carried its own copy of the header markup and its own
 * theme/localStorage logic; there is now exactly one of each.
 */

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUpRight, Globe2, Menu, Moon, Sun, X } from 'lucide-react';

export type Lang = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export const WA = '201090000676';
export const EMAIL = 'info@nilebed.com';

export const THEME_KEY = 'nilebed-theme-v3';
export const LANG_KEY = 'nilebed-lang-v1';

/** Read the language the visitor last chose (Arabic is the default). */
export function readLang(): Lang {
  if (typeof window === 'undefined') return 'ar';
  try {
    return window.localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar';
  }
}

export function writeLang(lang: Lang) {
  try {
    window.localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* storage may be unavailable */
  }
}

/**
 * Language + html[lang]/html[dir] wiring used by every page.
 * Keeps the direction switch in one place instead of three copies.
 */
export function useLang(): [Lang, (next: Lang) => void] {
  const [lang, setLang] = useState<Lang>('ar');

  useEffect(() => {
    setLang(readLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const change = (next: Lang) => {
    setLang(next);
    writeLang(next);
  };

  return [lang, change];
}

/** Theme switch that shares the site-wide `nilebed-theme-v3` key. */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return [theme, toggle];
}

export function Logo({ className = '', onBand = false }: { className?: string; onBand?: boolean }) {
  return (
    <span className={`nx-logo${onBand ? ' is-on-band' : ''}${className ? ` ${className}` : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-light" src="/logo-on-light.svg" alt="Nile Bed" width={454} height={270} decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-alt" src="/logo-on-dark.svg" alt="" aria-hidden="true" width={454} height={270} decoding="async" />
    </span>
  );
}

type ChromeProps = {
  lang: Lang;
  onLang: (next: Lang) => void;
  /** `page` marks the active item in the pill navigation. */
  page?: 'home' | 'catalog' | 'order';
  /** Extra actions rendered before the theme/lang controls. */
  children?: ReactNode;
};

const navCopy = {
  ar: { home: 'الرئيسية', catalog: 'الكتالوج', order: 'مراجعة الطلب', contact: 'تواصل', cta: 'ابدأ طلبك', menu: 'القائمة', close: 'إغلاق', theme: 'الوضع الليلي', themeLight: 'الوضع النهاري', switchLang: 'English' },
  en: { home: 'Home', catalog: 'Catalog', order: 'Review order', contact: 'Contact', cta: 'Start an order', menu: 'Menu', close: 'Close', theme: 'Dark mode', themeLight: 'Light mode', switchLang: 'العربية' },
};

/**
 * The floating glass pill from the reference set: hairline border, blur, and a
 * single dark CTA. It sits ON TOP of the dark hero band, so it is rendered by
 * each page at the top of that band rather than being sticky on a white page.
 */
export function Chrome({ lang, onLang, page, children }: ChromeProps) {
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const ar = lang === 'ar';
  const t = navCopy[lang];

  const links: Array<{ href: string; label: string; key: ChromeProps['page'] | 'contact' }> = [
    { href: '/', label: t.home, key: 'home' },
    { href: '/catalog', label: t.catalog, key: 'catalog' },
    { href: '/order', label: t.order, key: 'order' },
    { href: '/#contact', label: t.contact, key: 'contact' },
  ];

  return (
    <>
      <header className="nx-chrome">
        <a href="/" className="nx-logo" aria-label="Nile Bed — home">
          <Logo />
        </a>

        <nav className="nx-chrome-nav" aria-label={ar ? 'التنقل الرئيسي' : 'Main navigation'}>
          {links.slice(0, 3).map((l) => (
            <a key={l.href} href={l.href} aria-current={page === l.key ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
          <a href="/#contact">{t.contact}</a>
        </nav>

        <div className="nx-chrome-tools">
          {children}
          <button
            type="button"
            className="nx-icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.themeLight : t.theme}
            aria-pressed={theme === 'dark'}
            title={theme === 'dark' ? t.themeLight : t.theme}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            className="nx-icon-btn nx-lang"
            onClick={() => onLang(ar ? 'en' : 'ar')}
            aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe2 size={15} />
          </button>
          <button
            type="button"
            className="nx-icon-btn nx-burger"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label={t.menu}
          >
            <Menu size={18} />
          </button>
        </div>

        <a className="nx-btn nx-btn-sm nx-btn-ink nx-chrome-cta" href="/catalog">
          {t.cta} <ArrowUpRight size={14} />
        </a>
      </header>

      {open && (
        <div className="nx-drawer" role="dialog" aria-modal="true" aria-label={t.menu}>
          <button type="button" className="nx-icon-btn nx-drawer-close" onClick={() => setOpen(false)} aria-label={t.close}>
            <X size={20} />
          </button>
          {links.map((l) => (
            <a key={`d-${l.href}`} href={l.href} onClick={() => setOpen(false)}>
              {l.label} <ArrowUpRight size={15} />
            </a>
          ))}
          <a href="/catalog" onClick={() => setOpen(false)}>{t.cta} <ArrowUpRight size={15} /></a>
        </div>
      )}
    </>
  );
}

/** Footer: brand + two link columns + a hairline bottom bar. */
export function SiteFooter({ lang }: { lang: Lang }) {
  const ar = lang === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="nx-footer">
      <div className="nx-wrap">
        <div className="nx-footer-top">
          <div>
            <Logo onBand />
            <p>
              {ar
                ? 'نايل بد تصنّع السوست في مصر وتورّد خامات ومستلزمات المراتب — مع شبكة شركاء للقماش والإسفنج. لا نصنّع مراتب جاهزة.'
                : 'Nile Bed manufactures springs in Egypt and supplies mattress materials — with a partner network for fabric and sponge. We do not make finished mattresses.'}
            </p>
          </div>
          <div>
            <h4>{ar ? 'الموقع' : 'Site'}</h4>
            <ul>
              <li><a href="/">{ar ? 'الرئيسية' : 'Home'}</a></li>
              <li><a href="/catalog">{ar ? 'الكتالوج' : 'Catalog'}</a></li>
              <li><a href="/order">{ar ? 'مراجعة الطلب' : 'Review order'}</a></li>
              <li><a href="/#partners">{ar ? 'الشركاء' : 'Partners'}</a></li>
            </ul>
          </div>
          <div>
            <h4>{ar ? 'التواصل' : 'Contact'}</h4>
            <ul>
              <li><a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">WhatsApp · 010 90000676</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li>{ar ? 'القاهرة · مصر' : 'Cairo · Egypt'}</li>
            </ul>
          </div>
        </div>
        <div className="nx-footer-bottom">
          <span>© {year} NILE BED</span>
          <span>{ar ? 'خامات المراتب وتصنيع السوست · مصر' : 'Mattress materials & spring manufacturing · Egypt'}</span>
          <a href="#top">{ar ? 'العودة للأعلى' : 'Back to top'}</a>
        </div>
      </div>
    </footer>
  );
}
