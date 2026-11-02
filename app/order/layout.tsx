import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'مراجعة الطلب وتحديد الكميات | Nile Bed نايل بد',
  description: 'راجع الأصناف اللي اخترتها من الكتالوج وحدّد كمية كل صنف بوحدة قياسه (رول، م³، صفيحة، توب، كرتونة، كجم/كيلو، عدد)، ثم أرسل الطلب عبر واتساب أو البريد. Review your picked Nile Bed items and set a quantity for each one.',
  alternates: { canonical: '/order' },
  openGraph: {
    title: 'مراجعة الطلب وتحديد الكميات | نايل بد',
    description: 'فقط الأصناف اللي اخترتها من الكتالوج تظهر هنا، ومعاها تحديد الكمية بوحدة القياس.',
  },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
