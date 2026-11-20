import { getTheme } from '@/lib/api/theme';
import AccountWishlistView from '@/components/account/AccountWishlistView';

export const dynamic = 'force-dynamic';

export default async function AccountWishlistPage() {
  const theme = await getTheme();
  return <AccountWishlistView theme={theme} />;
}
