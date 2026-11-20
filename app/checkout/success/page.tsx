import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import CheckoutSuccessView from '@/components/checkout/CheckoutSuccessView';
export const dynamic = 'force-dynamic';
export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1"><CheckoutSuccessView /></main><ThemeFooter />
    </div>
  );
}
