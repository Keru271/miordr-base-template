import { getTheme } from '@/lib/api/theme';
import AccountInfoView from '@/components/account/AccountInfoView';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const theme = await getTheme();
  return <AccountInfoView theme={theme} />;
}
