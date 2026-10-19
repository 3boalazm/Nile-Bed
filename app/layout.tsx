import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/nilebed.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Nile Bed | نايل بد — خامات ومستلزمات المراتب وتصنيع السوست',
  description: 'نايل بد تصنّع السوست في مصر وتورّد خامات المراتب: فريم ورول سلك ١٫٣ مم، بوكيت ١٢–١٨ سم، ميموري تركي ٢ و٤ سم، لاتكس نيوترال من شرق آسيا، لباد وغراء هوت ميلت وخيوط وتيب. لا نصنّع مراتب جاهزة. Nile Bed manufactures springs and supplies mattress materials in Egypt; it does not make finished mattresses.',
  applicationName: 'Nile Bed',
  alternates: { canonical: '/' },
  keywords: ['خامات المراتب','مستلزمات المراتب','تصنيع السوست','فريم سوست','سلك 1.3','بوكيت رول','ميموري فوم','لاتكس','غراء هوت ميلت','Nile Bed','mattress materials Egypt'],
  openGraph: {
    title: 'Nile Bed | نايل بد',
    description: 'Mattress materials from Egypt, and springs made in-house. No finished mattresses.',
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    siteName: 'Nile Bed',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nile Bed — نايل بد' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nile Bed | نايل بد',
    description: 'Mattress materials from Egypt, and springs made in-house. No finished mattresses.',
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
  description: 'Supplier of mattress materials and components, and manufacturer of springs. Nile Bed does not make or sell finished mattresses.',
  url: siteUrl,
  logo: new URL('/logo-on-light.svg', siteUrl).href,
  image: new URL('/og.png', siteUrl).href,
  email: 'info@nilebed.com',
  telephone: '+20 10 90000676',
  areaServed: 'EG',
  knowsAbout: ['mattress materials', 'mattress supplies', 'springs', 'pocket springs', 'memory foam', 'latex', 'hot-melt adhesive', 'mattress felt'],
  slogan: 'We make the springs. We supply the materials.',
};

// Applies the saved/system theme before first paint so there is no flash of the
// wrong mode. Kept tiny and inline on purpose.
const themeScript = `(function(){try{var s=localStorage.getItem('nilebed-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=(s==='dark'||s==='light')?s:(d?'dark':'light');}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
