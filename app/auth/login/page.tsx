import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import LoginView from '@/components/auth/LoginView';
export const dynamic = 'force-dynamic';
export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1 flex items-center justify-center py-16"><LoginView /></main><ThemeFooter />
    </div>
  );
}
