import { getTheme } from '@/lib/api/theme';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import BlogListView from '@/components/blog/BlogListView';
export const dynamic = 'force-dynamic';
export default async function BlogPage() {
  const theme = await getTheme();
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1 sf-container py-12"><BlogListView theme={theme} /></main><ThemeFooter />
    </div>
  );
}
