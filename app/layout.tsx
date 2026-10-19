import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/styles/globals.css';
import '@/styles/nilebed.css';
import '@/styles/nilebed-refresh.css';
import '@/styles/home-clean.css';
import '@/styles/ko-sans-headings.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Nile Bed | نايل بد — دورة توريد متكاملة لصناعة المراتب',
  description: 'نايل بد تصنّع السوست في مصر وتنسّق توريد خامات ومستلزمات المراتب من مسار واحد، مع شركاء للقماش والإسفنج. نرحب بطلبات الإنتاج الكبيرة وفرص الموردين والاستيراد؛ المواصفات والتوافر يؤكدان لكل طلب. Nile Bed manufactures springs and coordinates a complete mattress-material supply route in Egypt.',
  applicationName: 'Nile Bed',
  alternates: { canonical: '/' },
  keywords: ['خامات المراتب','مستلزمات المراتب','تصنيع السوست','شاسيه سوست','فريم سوست','سلك 1.3','بوكيت رول','بوكيت مفروش','ميموري فوم','لاتكس','لباد','تيب 3D','غراء هوت ميلت','Nile Bed','mattress materials Egypt','shasia','pocket springs'],
  openGraph: {
    title: 'Nile Bed | نايل بد',
    description: 'Egypt-made springs and a coordinated supply route for mattress makers, with partner sourcing for fabric and sponge. Large-volume enquiries, supplier proposals and import opportunities welcome.',
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    siteName: 'Nile Bed',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nile Bed — نايل بد' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nile Bed | نايل بد',
    description: 'Egypt-made springs and a coordinated supply route for mattress makers, with partner sourcing for fabric and sponge. Large-volume enquiries, supplier proposals and import opportunities welcome.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f1eb' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1312' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nile Bed',
  alternateName: 'نايل بد',
  description: 'Manufacturer of springs in Egypt and coordinator of a broad mattress-material supply route, including partner introductions for fabric and sponge.',
  url: siteUrl,
  logo: new URL('/logo-on-light.svg', siteUrl).href,
  image: new URL('/og.png', siteUrl).href,
  email: 'info@nilebed.com',
  telephone: '+20 10 90000676',
  areaServed: 'EG',
  knowsAbout: ['mattress materials', 'mattress supplies', 'springs', 'pocket springs', 'memory foam', 'latex', 'hot-melt adhesive', 'mattress felt'],
  slogan: 'One coordinated supply route for mattress makers.',
};

// Applies the saved/system theme before first paint so there is no flash of the
// wrong mode. Kept tiny and inline on purpose.
const themeScript = `(function(){try{var s=localStorage.getItem('nilebed-theme-v3');document.documentElement.dataset.theme=(s==='dark')?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Decorative headings: Fraunces + Cormorant for EN, Reem Kufi + Amiri for AR, plus clean UI fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Reem+Kufi:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800;9..144,900&family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script id="nilebed-theme" strategy="beforeInteractive">{themeScript}</Script>
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
