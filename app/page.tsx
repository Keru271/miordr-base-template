import { getTheme } from '@/lib/api/theme';
import { getProducts } from '@/lib/api/products';
import { getCollections, getCategories } from '@/lib/api/catalog';
import { SectionResolver } from '@/lib/sections/SectionResolver';
import { normalizeSection } from '@/lib/sections/types';
import type { SectionConfig } from '@/lib/sections/types';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import DefaultHomeSections from '@/components/theme/DefaultHomeSections';
import RunwaySection from '@/components/theme/runway/RunwaySection';
import config from '@/omnistore.config.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const isRunway = config.activeTheme === 'runway' || process.env.NEXT_PUBLIC_THEME === 'runway';
  if (isRunway) {
    return <RunwaySection />;
  }
  const [theme, products, collections, categories] = await Promise.all([
    getTheme(),
    getProducts({ limit: 16 }),
    getCollections(),
    getCategories(),
  ]);

  let customSections: SectionConfig[] | null = null;
  if (theme.homeSectionsJson) {
    try {
      const parsed = JSON.parse(theme.homeSectionsJson);
      const list = Array.isArray(parsed) ? parsed : [];
      const normalized = list.map((s: unknown) => normalizeSection(s)).filter((s): s is SectionConfig => s !== null);
      if (normalized.length > 0) customSections = normalized;
    } catch { /* fall back to defaults */ }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader />
      <main className="flex-1">
        {customSections ? (
          <SectionResolver sections={customSections} theme={theme} products={products} collections={collections} categories={categories} />
        ) : (
          <DefaultHomeSections theme={theme} products={products} collections={collections} categories={categories} />
        )}
      </main>
      <ThemeFooter />
    </div>
  );
}
