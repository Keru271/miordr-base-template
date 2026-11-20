import type { MetadataRoute } from 'next';
import { getTheme } from '@/lib/api/theme';
export default async function robots(): Promise<MetadataRoute.Robots> {
  const theme = await getTheme();
  const baseUrl = theme.seoCanonicalUrl || `https://${process.env.NEXT_PUBLIC_STORE_SLUG || 'store'}.omnistore.app`;
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/account/', '/checkout/'] },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
