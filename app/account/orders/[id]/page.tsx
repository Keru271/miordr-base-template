import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import OrderDetailView from '@/components/account/OrderDetailView';
export const dynamic = 'force-dynamic';
interface Props { params: Promise<{ id: string }> }
export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1 sf-container py-12"><OrderDetailView orderId={id} /></main><ThemeFooter />
    </div>
  );
}
