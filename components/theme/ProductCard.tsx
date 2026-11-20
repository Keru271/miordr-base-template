'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/api/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/currency';

interface Props { product: Product; currency?: string; }

export default function ProductCard({ product, currency = 'USD' }: Props) {
  const { add } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    add({ productId: product.id, name: product.name, price: product.price, quantity: 1, image: product.thumbnail || product.images?.[0], slug: product.slug });
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl" style={{ backgroundColor: 'var(--sf-surface)', aspectRatio: '4/5' }}>
        {product.thumbnail || product.images?.[0] ? (
          <Image src={product.thumbnail || product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart size={40} style={{ color: 'var(--sf-border-strong)' }} />
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: 'var(--sf-error)' }}>
            -{Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}%
          </span>
        )}
        <button onClick={(e) => { e.preventDefault(); toggle(product.id); }}
          className="absolute top-2 right-2 p-2 rounded-full shadow transition-all"
          style={{ backgroundColor: 'var(--sf-bg)', color: wishlisted ? 'var(--sf-error)' : 'var(--sf-text-muted)' }}>
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button onClick={handleAddToCart} className="sf-btn-primary w-full text-xs py-2">Add to Cart</button>
        </div>
      </div>
      <div className="mt-3 px-1">
        <h3 className="text-sm font-medium line-clamp-2 leading-snug" style={{ color: 'var(--sf-text)' }}>{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-bold" style={{ color: 'var(--sf-text)' }}>{formatPrice(product.price, currency)}</span>
          {hasDiscount && (
            <span className="text-xs line-through" style={{ color: 'var(--sf-text-muted)' }}>{formatPrice(product.compareAtPrice!, currency)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
