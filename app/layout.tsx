import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/nilebed.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Nile Bed | نايل بد — خامات ومستلزمات المراتب وتصنيع السوست',
  description: 'نايل بد مورد جملة لخامات ومستلزمات المراتب وتصنيع السوست في مصر، ولا تصنّع مراتب جاهزة. تحديثات عامة تذكر رولات ميموري فوم تركي بارتفاعي 2 و4 سم؛ التوافر يؤكد عند الاستفسار. Nile Bed is a wholesale supplier of mattress materials and springs in Egypt and does not manufacture finished mattresses.',
  applicationName: 'Nile Bed',
  alternates: { canonical: '/' },
  keywords: ['خامات المراتب','مستلزمات المراتب','توريد خامات مراتب','تصنيع السوست','Nile Bed','mattress materials Egypt'],
  openGraph: {
    title: 'Nile Bed | نايل بد',
    description: 'Wholesale mattress materials and springs from Egypt. We do not manufacture finished mattresses.',
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    siteName: 'Nile Bed',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nile Bed — نايل بد' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nile Bed | نايل بد',
    description: 'Wholesale mattress materials and springs from Egypt. We do not manufacture finished mattresses.',
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
  description: 'Wholesaler of mattress materials and supplies, and manufacturer of springs. Nile Bed does not manufacture or sell finished mattresses.',
  url: siteUrl,
  logo: new URL('/logo-on-light.svg', siteUrl).href,
  image: new URL('/og.png', siteUrl).href,
  email: 'info@nilebed.com',
  telephone: '+20 10 90000676',
  areaServed: 'EG',
  knowsAbout: ['mattress materials', 'mattress supplies', 'springs', 'memory foam'],
  slogan: 'Mattress materials and supplies. Springs. No finished mattresses.',
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
