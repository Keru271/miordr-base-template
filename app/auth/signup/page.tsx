import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import SignupView from '@/components/auth/SignupView';
export const dynamic = 'force-dynamic';
export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader /><main className="flex-1 flex items-center justify-center py-16"><SignupView /></main><ThemeFooter />
    </div>
  );
}
