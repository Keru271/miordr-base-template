import { getTheme } from '@/lib/api/theme';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import BlogPostView from '@/components/blog/BlogPostView';
export const dynamic = 'force-dynamic';
interface Props { params: Promise<{ slug: string }> }
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const theme = await getTheme();
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1 sf-container py-12"><BlogPostView theme={theme} slug={slug} /></main><ThemeFooter />
    </div>
  );
}
