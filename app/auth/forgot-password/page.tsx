import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import ForgotPasswordView from '@/components/auth/ForgotPasswordView';
export const dynamic = 'force-dynamic';
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1 flex items-center justify-center py-16"><ForgotPasswordView /></main><ThemeFooter />
    </div>
  );
}
