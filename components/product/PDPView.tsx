'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import type { ThemeConfig, ProductDetail } from '@/lib/api/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/currency';

interface Props { theme: ThemeConfig; product: ProductDetail | null; }

export default function PDPView({ theme, product }: Props) {
  const { add } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  if (!product) {
    return (
      <div className="sf-container py-24 text-center">
        <p style={{ color: 'var(--sf-text-muted)' }}>Product not found.</p>
      </div>
    );
  }
  const currency = theme.currency || 'USD';
  const wishlisted = isWishlisted(product.id);
  return (
    <div className="sf-container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--sf-surface)' }}>
            {product.thumbnail || product.images?.[0] ? (
              <Image src={product.thumbnail || product.images[0]} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><ShoppingCart size={64} style={{ color: 'var(--sf-border-strong)' }} /></div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            {product.category && <p className="text-sm mb-1" style={{ color: 'var(--sf-text-muted)' }}>{product.category.name}</p>}
            <h1 className="text-3xl font-bold leading-tight" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>{product.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold" style={{ color: 'var(--sf-text)' }}>{formatPrice(product.price, currency)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-lg line-through" style={{ color: 'var(--sf-text-muted)' }}>{formatPrice(product.compareAtPrice, currency)}</span>
            )}
          </div>
          {product.description && <p style={{ color: 'var(--sf-text-muted)' }}>{product.description}</p>}
          <div className="flex gap-3">
            <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid var(--sf-border)' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:opacity-70" style={{ color: 'var(--sf-text)' }}>−</button>
              <span className="px-4 py-2 text-sm font-medium" style={{ color: 'var(--sf-text)' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 hover:opacity-70" style={{ color: 'var(--sf-text)' }}>+</button>
            </div>
            <button onClick={() => add({ productId: product.id, name: product.name, price: product.price, quantity: qty, image: product.thumbnail || product.images?.[0], slug: product.slug })}
              className="sf-btn-primary flex-1">
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button onClick={() => toggle(product.id)} className="p-3 rounded-lg" style={{ border: '1px solid var(--sf-border)', color: wishlisted ? 'var(--sf-error)' : 'var(--sf-text-muted)' }}>
              <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
