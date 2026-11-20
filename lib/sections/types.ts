import type { ThemeConfig, Product, Collection, Category } from '@/lib/api/types';

export type SectionType =
  | 'hero-banner'
  | 'product-grid'
  | 'category-grid'
  | 'announcement-bar'
  | 'feature-cards'
  | 'newsletter-signup'
  | 'testimonial-carousel'
  | 'brand-strip'
  | 'blog-teaser'
  | 'video-hero'
  | 'collection-grid'
  | 'rich-text';

export interface SectionConfig {
  id: string;
  type: SectionType;
  props: Record<string, unknown>;
  visible: boolean;
  order: number;
}

export interface SectionData {
  products?: Product[];
  collections?: Collection[];
  categories?: Category[];
  [key: string]: unknown;
}

export interface SectionProps {
  config: SectionConfig;
  theme: ThemeConfig;
  data?: SectionData;
}

/** Normalize a raw parsed section object into a typed SectionConfig, or null if invalid */
export function normalizeSection(raw: unknown): SectionConfig | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as Record<string, unknown>;
  if (!s.type || typeof s.type !== 'string') return null;
  return {
    id: (s.id as string) || `section-${Math.random().toString(36).slice(2)}`,
    type: s.type as SectionType,
    props: (s.props as Record<string, unknown>) || {},
    visible: s.visible !== false,
    order: typeof s.order === 'number' ? s.order : 0,
  };
}

/** Default section layouts per template slug */
export const DEFAULT_TEMPLATE_SECTIONS: Record<string, SectionConfig[]> = {
  base: [
    { id: 'hero-1', type: 'hero-banner', props: { headline: 'Welcome to our store', subheadline: 'Discover our latest collection', ctaText: 'Shop Now', ctaUrl: '/products' }, visible: true, order: 0 },
    { id: 'products-1', type: 'product-grid', props: { title: 'Featured Products', limit: 8, showViewAll: true }, visible: true, order: 1 },
    { id: 'categories-1', type: 'category-grid', props: { title: 'Shop by Category' }, visible: true, order: 2 },
    { id: 'newsletter-1', type: 'newsletter-signup', props: { title: 'Stay in the loop', subtitle: 'Get the latest updates and offers.' }, visible: true, order: 3 },
  ],
};
