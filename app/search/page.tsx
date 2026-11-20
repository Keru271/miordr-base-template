import { getTheme } from '@/lib/api/theme';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import SearchView from '@/components/catalog/SearchView';
export const dynamic = 'force-dynamic';
export default async function SearchPage() {
  const theme = await getTheme();
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1"><SearchView theme={theme} /></main><ThemeFooter />
    </div>
  );
}
