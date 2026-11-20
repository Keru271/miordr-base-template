// Core types shared across the entire storefront
// SACRED — do not modify via AI Editor

export interface ThemeConfig {
  id: string;
  storeId: string;
  storeName: string;
  description?: string | null;
  logo?: string | null;
  favicon?: string | null;
  language?: string | null;
  currency?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  accentColor?: string | null;
  backgroundColor?: string | null;
  textColor?: string | null;
  headingFont?: string | null;
  bodyFont?: string | null;
  activeTemplateSlug?: string | null;
  homeSectionsJson?: string | null;
  maintenanceMode?: boolean | null;
  maintenanceMessage?: string | null;
  seoSiteTitle?: string | null;
  seoMetaDescription?: string | null;
  seoOgTitle?: string | null;
  seoOgDescription?: string | null;
  seoOgImage?: string | null;
  seoCanonicalUrl?: string | null;
  seoRobotsTxt?: string | null;
  seoStructuredDataJson?: string | null;
  facebookPixelId?: string | null;
  googleAnalyticsId?: string | null;
  googleTagManagerId?: string | null;
  tiktokPixelId?: string | null;
  snapchatPixelId?: string | null;
  customCss?: string | null;
  customJs?: string | null;
  reviewsEnabled?: boolean | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  thumbnail?: string | null;
  categoryId?: string | null;
  category?: Category | null;
  brand?: Brand | null;
  inStock?: boolean;
  stockQuantity?: number | null;
  sku?: string | null;
  tags?: string[];
  variants?: ProductVariant[];
  featured?: boolean;
  rating?: number | null;
  reviewCount?: number | null;
  demoContent?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: Record<string, string>;
  price?: number | null;
  compareAtPrice?: number | null;
  sku?: string | null;
  stockQuantity?: number | null;
  images?: string[];
}

export interface ProductReview {
  id: string;
  userName: string;
  userEmail?: string | null;
  rating: number;
  title?: string | null;
  comment: string;
  verified?: boolean;
  status?: string;
  adminReply?: string | null;
  adminReplyAt?: string | null;
  createdAt: string;
}

export interface ProductDetail extends Product {
  fullDescription?: string | null;
  specifications?: Record<string, string> | null;
  relatedProducts?: Product[];
  reviews?: ProductReview[];
  reviewsEnabled?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  parentId?: string | null;
  productCount?: number;
  featured?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  featured?: boolean;
  productCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  website?: string | null;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string | null;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
  slug: string;
  variant?: string | null;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  target?: '_blank' | '_self';
  children?: MenuItem[];
}

export interface Menu {
  id: string;
  handle: string;
  title: string;
  items: MenuItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  coverImage?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  tags?: string[];
}

export interface ListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface FilterFacetsResponse {
  categories: { id: string; name: string; count: number }[];
  priceRange: { min: number; max: number };
  brands: { id: string; name: string; count: number }[];
}
