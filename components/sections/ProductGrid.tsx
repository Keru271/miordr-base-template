'use client';
import Link from 'next/link';
import type { SectionProps } from '@/lib/sections/types';
import ProductCard from '@/components/theme/ProductCard';

export default function ProductGrid({ config, data }: SectionProps) {
  const p = config.props || {};
  const title = (p.title as string) || 'Featured Products';
  const limit = (p.limit as number) || 8;
  const products = (data?.products || []).slice(0, limit);

  return (
    <section className="sf-container py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>
          {title}
        </h2>
        <Link href="/products" className="text-sm font-semibold hover:opacity-70" style={{ color: 'var(--sf-primary)' }}>
          View All →
        </Link>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="py-16 text-center border-2 border-dashed rounded-xl" style={{ borderColor: 'var(--sf-border)' }}>
          <p style={{ color: 'var(--sf-text-muted)' }}>No products to display.</p>
        </div>
      )}
    </section>
  );
}
