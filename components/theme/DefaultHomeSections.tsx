'use client';
import React from 'react';
import Link from 'next/link';
import type { ThemeConfig, Product, Collection, Category } from '@/lib/api/types';
import ProductCard from './ProductCard';

interface Props {
  theme: ThemeConfig;
  products: Product[];
  collections: Collection[];
  categories: Category[];
}

export default function DefaultHomeSections({ theme, products, collections, categories }: Props) {
  const currency = theme.currency || 'USD';

  return (
    <div>
      <section className="relative flex items-center justify-center min-h-96 py-24"
        style={{ background: 'linear-gradient(135deg, var(--sf-primary) 0%, color-mix(in srgb, var(--sf-primary) 70%, var(--sf-accent)) 100%)' }}>
        <div className="text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--sf-heading-font)' }}>
            {theme.storeName || 'Welcome'}
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
            {theme.description || 'Discover our curated collection of products.'}
          </p>
          <Link href="/products" className="sf-btn-primary" style={{ backgroundColor: 'white', color: 'var(--sf-primary)' }}>
            Shop Now
          </Link>
        </div>
      </section>

      {products.length > 0 && (
        <section className="sf-container py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Featured Products</h2>
            <Link href="/products" className="text-sm font-medium hover:opacity-70" style={{ color: 'var(--sf-primary)' }}>View All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} currency={currency} />)}
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className="py-16" style={{ backgroundColor: 'var(--sf-surface)' }}>
          <div className="sf-container">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.slice(0, 8).map(cat => (
                <Link key={cat.id} href={`/categories/${cat.slug}`}
                  className="group relative overflow-hidden rounded-xl aspect-square flex items-end p-4"
                  style={{ backgroundColor: 'var(--sf-surface-alt)' }}>
                  {cat.image && <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />}
                  <div className="relative">
                    <span className="text-sm font-semibold text-white drop-shadow">{cat.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {products.length === 0 && categories.length === 0 && (
        <section className="sf-container py-24 text-center">
          <div className="text-6xl mb-6">🛍️</div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Your store is ready!</h2>
          <p className="mb-6" style={{ color: 'var(--sf-text-muted)' }}>Add products from the CMS to start selling.</p>
          <Link href="/products" className="sf-btn-outline">Browse Products</Link>
        </section>
      )}

      <section className="sf-container py-16">
        <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: 'var(--sf-surface)' }}>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Stay in the loop</h2>
          <p className="mb-6" style={{ color: 'var(--sf-text-muted)' }}>Get the latest updates, offers, and new arrivals.</p>
          <form className="flex gap-2 max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ border: '1px solid var(--sf-border)', backgroundColor: 'var(--sf-bg)', color: 'var(--sf-text)' }} />
            <button type="submit" className="sf-btn-primary py-2.5 px-4 text-sm">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
