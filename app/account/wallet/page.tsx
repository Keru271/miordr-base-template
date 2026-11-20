import { getTheme } from '@/lib/api/theme';
import AccountWalletView from '@/components/account/AccountWalletView';

export const dynamic = 'force-dynamic';

export default async function AccountWalletPage() {
  const theme = await getTheme();
  return <AccountWalletView theme={theme} />;
}
