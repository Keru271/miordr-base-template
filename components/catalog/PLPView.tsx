'use client';
import React from 'react';
import type { ThemeConfig, Product, Category } from '@/lib/api/types';
import ProductCard from '@/components/theme/ProductCard';

interface Props { theme: ThemeConfig; products: Product[]; categories: Category[]; }

export default function PLPView({ theme, products }: Props) {
  const currency = theme.currency || 'USD';
  if (products.length === 0) {
    return (
      <div className="sf-container py-24 text-center">
        <div className="text-5xl mb-4">📦</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--sf-text)' }}>No products found</h2>
        <p style={{ color: 'var(--sf-text-muted)' }}>Add your first product from the CMS.</p>
      </div>
    );
  }
  return (
    <div className="sf-container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>All Products</h1>
        <span className="text-sm" style={{ color: 'var(--sf-text-muted)' }}>{products.length} products</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} currency={currency} />)}
      </div>
    </div>
  );
}
