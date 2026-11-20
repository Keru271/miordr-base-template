import { getTheme } from '@/lib/api/theme';
import { getCategories } from '@/lib/api/catalog';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import CategoryGridView from '@/components/catalog/CategoryGridView';
export const dynamic = 'force-dynamic';
export default async function CategoriesPage() {
  const [theme, categories] = await Promise.all([getTheme(), getCategories()]);
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1"><CategoryGridView theme={theme} categories={categories} /></main><ThemeFooter />
    </div>
  );
}
