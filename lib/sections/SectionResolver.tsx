import React from 'react';
import type { SectionConfig, SectionData } from './types';
import type { ThemeConfig, Product, Collection, Category } from '@/lib/api/types';

// Section component imports
import HeroBanner from '@/components/sections/HeroBanner';
import ProductGrid from '@/components/sections/ProductGrid';
import CategoryGrid from '@/components/sections/CategoryGrid';
import AnnouncementBar from '@/components/sections/AnnouncementBar';
import FeatureCards from '@/components/sections/FeatureCards';
import NewsletterSignup from '@/components/sections/NewsletterSignup';
import TestimonialCarousel from '@/components/sections/TestimonialCarousel';
import BrandStrip from '@/components/sections/BrandStrip';
import BlogTeaser from '@/components/sections/BlogTeaser';
import VideoHero from '@/components/sections/VideoHero';
import CollectionGrid from '@/components/sections/CollectionGrid';
import RichText from '@/components/sections/RichText';

interface SectionResolverProps {
  sections: SectionConfig[];
  theme: ThemeConfig;
  products?: Product[];
  collections?: Collection[];
  categories?: Category[];
}

const SECTION_MAP: Record<string, React.ComponentType<{ config: SectionConfig; theme: ThemeConfig; data?: SectionData }>> = {
  'hero-banner': HeroBanner,
  'product-grid': ProductGrid,
  'category-grid': CategoryGrid,
  'announcement-bar': AnnouncementBar,
  'feature-cards': FeatureCards,
  'newsletter-signup': NewsletterSignup,
  'testimonial-carousel': TestimonialCarousel,
  'brand-strip': BrandStrip,
  'blog-teaser': BlogTeaser,
  'video-hero': VideoHero,
  'collection-grid': CollectionGrid,
  'rich-text': RichText,
};

export function SectionResolver({ sections, theme, products, collections, categories }: SectionResolverProps) {
  const data: SectionData = { products, collections, categories };
  const visible = sections.filter(s => s.visible).sort((a, b) => a.order - b.order);

  return (
    <div>
      {visible.map(section => {
        const Component = SECTION_MAP[section.type];
        if (!Component) return null;
        return <Component key={section.id} config={section} theme={theme} data={data} />;
      })}
    </div>
  );
}
