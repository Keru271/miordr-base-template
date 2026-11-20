import React from 'react';
import ThemeHeader from '@/components/theme/Header';
import ThemeFooter from '@/components/theme/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';
import { getTheme } from '@/lib/api/theme';

export const dynamic = 'force-dynamic';

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <ThemeHeader />
      <main className="flex-1 sf-container py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar theme={theme} />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </main>
      <ThemeFooter />
    </div>
  );
}
