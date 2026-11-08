import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'مراجعة الطلب وتحديد الكميات | نايل بد Nile Bed',
  description: 'صفحة مراجعة الطلب: بتعرض الأصناف اللي اخترتها من كتالوج نايل بد بس، وتحدد كمية كل صنف ثم تأكد الأوردر. Review the items you picked from the Nile Bed catalog, set quantities and confirm your order.',
  alternates: { canonical: '/order' },
  openGraph: {
    title: 'مراجعة الطلب وتحديد الكميات | نايل بد',
    description: 'راجع الأصناف المختارة من الكتالوج، حدّد الكميات، وأكّد طلبك.',
  },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
