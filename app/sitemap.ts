import type { MetadataRoute } from 'next';
import { getTheme } from '@/lib/api/theme';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const theme = await getTheme();
  const baseUrl = theme.seoCanonicalUrl || `https://${process.env.NEXT_PUBLIC_STORE_SLUG || 'store'}.omnistore.app`;
  const now = new Date();
  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
