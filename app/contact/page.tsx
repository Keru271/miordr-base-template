import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
export const dynamic = 'force-dynamic';
export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader />
      <main className="flex-1 sf-container py-16">
        <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--sf-text)' }}>Contact Us</h1>
        <p style={{ color: 'var(--sf-text-muted)' }}>Get in touch with our team.</p>
      </main>
      <ThemeFooter />
    </div>
  );
}
