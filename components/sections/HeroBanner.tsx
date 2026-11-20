'use client';
import Link from 'next/link';
import type { SectionProps } from '@/lib/sections/types';

export default function HeroBanner({ config }: SectionProps) {
  const p = config.props || {};
  const headline = (p.headline as string) || 'Welcome to our store';
  const subheadline = (p.subheadline as string) || 'Discover our curated selection of high-quality goods.';
  const ctaText = (p.ctaText as string) || 'Shop Now';
  const ctaUrl = (p.ctaUrl as string) || '/products';
  const bgImage = p.bgImage as string | undefined;

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 flex items-center justify-center text-center px-4"
      style={{
        backgroundColor: 'var(--sf-surface)',
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>
          {headline}
        </h1>
        <p className="text-lg sm:text-xl mb-8 opacity-80" style={{ color: 'var(--sf-text-muted)' }}>
          {subheadline}
        </p>
        <Link href={ctaUrl} className="sf-btn-primary">
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
