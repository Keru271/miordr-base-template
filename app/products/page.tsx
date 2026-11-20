import { getTheme } from '@/lib/api/theme';
import { getProducts } from '@/lib/api/products';
import { getCategories } from '@/lib/api/catalog';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import PLPView from '@/components/catalog/PLPView';
export const dynamic = 'force-dynamic';
export default async function ProductsPage() {
  const [theme, products, categories] = await Promise.all([getTheme(), getProducts({ limit: 24 }), getCategories()]);
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1"><PLPView theme={theme} products={products} categories={categories} /></main><ThemeFooter />
    </div>
  );
}
