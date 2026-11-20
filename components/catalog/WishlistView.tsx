'use client';
import { useWishlist } from '@/context/WishlistContext';
import { Heart } from 'lucide-react';
import type { ThemeConfig } from '@/lib/api/types';

interface Props { theme: ThemeConfig; }

export default function WishlistView({ theme }: Props) {
  const { wishlist } = useWishlist();
  if (wishlist.length === 0) {
    return (
      <div className="sf-container py-24 text-center">
        <Heart size={48} className="mx-auto mb-4" style={{ color: 'var(--sf-border-strong)' }} />
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--sf-text)' }}>Your wishlist is empty</h2>
        <p style={{ color: 'var(--sf-text-muted)' }}>Save products you love by clicking the heart icon.</p>
      </div>
    );
  }
  return (
    <div className="sf-container py-10">
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Wishlist ({wishlist.length})</h1>
      <p style={{ color: 'var(--sf-text-muted)' }}>Your saved items appear here.</p>
    </div>
  );
}
