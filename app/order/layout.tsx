import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'اختيار خامات المراتب وتكوين الطلب | Nile Bed نايل بد',
  description: 'اختر خامات المراتب التي تحتاجها من كتالوج نايل بد، ثم راجع اختياراتك وحدد الكميات قبل إرسال طلبك. Choose mattress materials, review your selection, set quantities and send your Nile Bed enquiry.',
  alternates: { canonical: '/order' },
  openGraph: {
    title: 'اختيار خامات المراتب وتكوين الطلب | نايل بد',
    description: 'اختر الخامات أولاً ثم حدد الكميات في مراجعة الطلب.',
  },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
