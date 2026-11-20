import { getTheme } from '@/lib/api/theme';
import { getProductsByCollection } from '@/lib/api/products';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import PLPView from '@/components/catalog/PLPView';
export const dynamic = 'force-dynamic';
interface Props { params: Promise<{ slug: string }> }
export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const [theme, products] = await Promise.all([getTheme(), getProductsByCollection(slug)]);
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1"><PLPView theme={theme} products={products} categories={[]} /></main><ThemeFooter />
    </div>
  );
}
