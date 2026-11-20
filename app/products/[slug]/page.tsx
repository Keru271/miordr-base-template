import { getTheme } from '@/lib/api/theme';
import { getProduct } from '@/lib/api/products';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import PDPView from '@/components/product/PDPView';
export const dynamic = 'force-dynamic';
interface Props { params: Promise<{ slug: string }> }
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [theme, product] = await Promise.all([getTheme(), getProduct(slug)]);
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1"><PDPView theme={theme} product={product} /></main><ThemeFooter />
    </div>
  );
}
