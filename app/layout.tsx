import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/nilebed.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Nile Bed | نايل بد — خامات ومستلزمات المراتب وتصنيع السوست',
  description: 'نايل بد مورد جملة لخامات ومستلزمات المراتب وتصنيع السوست في مصر، ولا تصنّع مراتب جاهزة. تحديثات عامة تذكر رولات ميموري فوم تركي بارتفاعي 2 و4 سم؛ التوافر يؤكد عند الاستفسار. Nile Bed is a wholesale supplier of mattress materials and springs in Egypt and does not manufacture finished mattresses.',
  alternates: { canonical: '/' },
  keywords: ['خامات المراتب','مستلزمات المراتب','توريد خامات مراتب','تصنيع السوست','Nile Bed','mattress materials Egypt'],
  openGraph: { title: 'Nile Bed | نايل بد', description: 'Wholesale mattress materials and springs from Egypt. We do not manufacture finished mattresses.', type: 'website', locale: 'ar_EG' },
};
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nile Bed',
  alternateName: 'نايل بد',
  description: 'Wholesaler of mattress materials and supplies, and manufacturer of springs. Nile Bed does not manufacture or sell finished mattresses.',
  url: siteUrl,
  email: 'info@nilebed.com',
  telephone: '+20 10 90000676',
  areaServed: 'EG',
  knowsAbout: ['mattress materials', 'mattress supplies', 'springs', 'memory foam'],
  slogan: 'Mattress materials and supplies. Springs. No finished mattresses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
