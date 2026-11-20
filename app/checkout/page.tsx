import { getTheme } from '@/lib/api/theme';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import CheckoutView from '@/components/checkout/CheckoutView';
export const dynamic = 'force-dynamic';
export default async function CheckoutPage() {
  const theme = await getTheme();
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1"><CheckoutView theme={theme} /></main><ThemeFooter />
    </div>
  );
}
