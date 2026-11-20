import { getTheme } from '@/lib/api/theme';
import AccountAddressesView from '@/components/account/AccountAddressesView';

export const dynamic = 'force-dynamic';

export default async function AccountAddressesPage() {
  const theme = await getTheme();
  return <AccountAddressesView theme={theme} />;
}
