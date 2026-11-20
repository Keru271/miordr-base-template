import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Playfair_Display, Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { MenuProvider } from '@/context/MenuContext';
import { getTheme } from '@/lib/api/theme';
import { getMenu } from '@/lib/api/catalog';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-plus-jakarta' });
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-playfair' });
const outfit = Outfit({ subsets: ['latin'], display: 'swap', variable: '--font-outfit' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-space-grotesk' });

export async function generateMetadata(): Promise<Metadata> {
  const theme = await getTheme();
  const title = theme.seoSiteTitle || theme.storeName || 'Store';
  const description = theme.seoMetaDescription || `Shop at ${title}`;
  const ogImage = theme.seoOgImage || theme.logo || undefined;
  return {
    title: { default: title, template: `%s | ${title}` },
    description,
    icons: theme.favicon ? { icon: theme.favicon } : undefined,
    openGraph: {
      title: theme.seoOgTitle || title,
      description: theme.seoOgDescription || description,
      siteName: title,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: theme.seoOgTitle || title,
      description: theme.seoOgDescription || description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, headerMenu, footerMenu, mobileMenu] = await Promise.all([
    getTheme(),
    getMenu('header'),
    getMenu('footer'),
    getMenu('mobile').catch(() => null),
  ]);
  const fontVars = `${inter.variable} ${plusJakarta.variable} ${playfair.variable} ${outfit.variable} ${spaceGrotesk.variable}`;
  return (
    <html lang={theme.language || 'en'} className={`h-full antialiased ${fontVars}`}>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--sf-bg)', color: 'var(--sf-text)', fontFamily: 'var(--sf-body-font)' }}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <MenuProvider headerMenu={headerMenu} footerMenu={footerMenu} mobileMenu={mobileMenu}>
                  {children}
                </MenuProvider>
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
