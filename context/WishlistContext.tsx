'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getWishlist, addToWishlist, removeFromWishlist, isInWishlist } from '@/lib/api/wishlist';

interface WishlistContextValue {
  wishlist: string[];
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  useEffect(() => { setWishlist(getWishlist()); }, []);
  const toggle = useCallback((productId: string) => {
    if (isInWishlist(productId)) setWishlist(removeFromWishlist(productId));
    else setWishlist(addToWishlist(productId));
  }, []);
  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);
  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
