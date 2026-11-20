import { getTheme } from '@/lib/api/theme';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import WishlistView from '@/components/catalog/WishlistView';
export const dynamic = 'force-dynamic';
export default async function WishlistPage() {
  const theme = await getTheme();
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1"><WishlistView theme={theme} /></main><ThemeFooter />
    </div>
  );
}
