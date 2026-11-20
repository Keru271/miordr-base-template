import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
export const dynamic = 'force-dynamic';
interface Props { params: Promise<{ slug: string }> }
export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const title = slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader />
      <main className="flex-1 sf-container py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--sf-text)' }}>{title}</h1>
        <p style={{ color: 'var(--sf-text-muted)' }}>Policy content is managed from the CMS.</p>
      </main>
      <ThemeFooter />
    </div>
  );
}
