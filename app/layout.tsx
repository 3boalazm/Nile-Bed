import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/nilebed.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Nile Bed | نايل بد — خامات المراتب وتصنيع السوست',
  description: 'نايل بد مورد جملة لخامات ومستلزمات المراتب وتصنيع السوست في مصر. تحديثات عامة تذكر رولات ميموري فوم تركي بارتفاعي 2 و4 سم؛ التوافر يؤكد عند الاستفسار. Nile Bed supplies mattress materials and manufactures springs in Egypt.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Nile Bed | نايل بد', type: 'website', locale: 'ar_EG' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
