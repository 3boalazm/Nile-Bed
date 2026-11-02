import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تكوين الطلب حسب وحدة القياس | Nile Bed نايل بد',
  description: 'كوّن طلبك من خامات المراتب صنفًا بصنف: الأصناف مصنّفة حسب وحدة القياس (رول، م³، صفيحة، توب، كرتونة، كجم/كيلو، عدد) مع تحديد الكمية المطلوبة لكل صنف، ثم أرسل الطلب عبر واتساب أو البريد. Build your Nile Bed order by unit of measure and quantity per item.',
  alternates: { canonical: '/order' },
  openGraph: {
    title: 'تكوين الطلب حسب وحدة القياس | نايل بد',
    description: 'حدد الكمية المطلوبة من كل صنف بوحدته: رول، م³، صفيحة، توب، كرتونة، كجم/كيلو أو عدد.',
  },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
