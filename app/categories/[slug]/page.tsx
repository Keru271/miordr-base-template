import { getTheme } from '@/lib/api/theme';
import { getProductsByCategory } from '@/lib/api/products';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import PLPView from '@/components/catalog/PLPView';
export const dynamic = 'force-dynamic';
interface Props { params: Promise<{ slug: string }> }
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [theme, products] = await Promise.all([getTheme(), getProductsByCategory(slug)]);
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1"><PLPView theme={theme} products={products} categories={[]} /></main><ThemeFooter />
    </div>
  );
}
