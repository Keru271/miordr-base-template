'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import type { ThemeConfig, Product } from '@/lib/api/types';
import { useWishlist } from '@/context/WishlistContext';
import { getProducts } from '@/lib/api/products';
import ProductCard from '@/components/theme/ProductCard';

export default function AccountWishlistView({ theme }: { theme: ThemeConfig }) {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlistItems() {
      try {
        const all = await getProducts({ limit: 50 });
        const filtered = all.filter((p) => wishlist.includes(p.id));
        setProducts(filtered);
      } catch (err) {
        console.error('Failed to load wishlist:', err);
      } finally {
        setLoading(false);
      }
    }
    loadWishlistItems();
  }, [wishlist]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}
          >
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--sf-text-muted)' }}>
            Curated pieces and favorites saved for later.
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs font-semibold hover:underline flex items-center gap-1"
          style={{ color: 'var(--sf-primary)' }}
        >
          Explore Catalog <ArrowRight size={13} />
        </Link>
      </div>

      {/* Grid or Empty */}
      {wishlist.length === 0 ? (
        <div
          className="p-12 text-center rounded-2xl border flex flex-col items-center justify-center space-y-4"
          style={{
            backgroundColor: 'var(--sf-surface)',
            borderColor: 'var(--sf-border)',
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--sf-bg)', color: 'var(--sf-text-muted)' }}
          >
            <Heart size={28} />
          </div>
          <div>
            <h3 className="font-bold text-base" style={{ color: 'var(--sf-text)' }}>
              Your wishlist is currently empty
            </h3>
            <p className="text-xs mt-1 max-w-sm mx-auto" style={{ color: 'var(--sf-text-muted)' }}>
              Browse through our collections and click the heart icon on any product to save it here.
            </p>
          </div>
          <Link href="/products" className="sf-btn-primary px-6 py-2.5 text-xs font-semibold">
            <ShoppingBag size={14} /> Start Browsing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} currency={theme.currency || 'USD'} />
          ))}
        </div>
      )}
    </div>
  );
}
