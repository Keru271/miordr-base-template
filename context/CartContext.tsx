'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Cart, CartItem } from '@/lib/api/types';
import { getLocalCart, addToCart, removeFromCart, updateCartQuantity, clearCart } from '@/lib/api/cart';

interface CartContextValue {
  cart: Cart;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (item: Omit<CartItem, 'id'>) => void;
  remove: (itemId: string) => void;
  updateQty: (itemId: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ id: 'local', items: [], subtotal: 0, total: 0, itemCount: 0 });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setCart(getLocalCart()); }, []);

  const add = useCallback((item: Omit<CartItem, 'id'>) => { setCart(addToCart(item)); setIsOpen(true); }, []);
  const remove = useCallback((itemId: string) => { setCart(removeFromCart(itemId)); }, []);
  const updateQty = useCallback((itemId: string, qty: number) => { setCart(updateCartQuantity(itemId, qty)); }, []);
  const clear = useCallback(() => { setCart(clearCart()); }, []);

  return (
    <CartContext.Provider value={{ cart, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), add, remove, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
