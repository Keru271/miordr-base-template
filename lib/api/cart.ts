import type { Cart, CartItem } from './types';

const CART_KEY = 'omnistore_cart';

function getCart(): Cart {
  if (typeof window === 'undefined') return emptyCart();
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : emptyCart();
  } catch { return emptyCart(); }
}

function emptyCart(): Cart {
  return { id: 'local', items: [], subtotal: 0, total: 0, itemCount: 0 };
}

function computeCart(items: CartItem[]): Cart {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return { id: 'local', items, subtotal, total: subtotal, itemCount: items.reduce((s, i) => s + i.quantity, 0) };
}

function saveCart(cart: Cart) {
  if (typeof window !== 'undefined') localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getLocalCart(): Cart { return getCart(); }

export function addToCart(item: Omit<CartItem, 'id'>): Cart {
  const cart = getCart();
  const existing = cart.items.find(i => i.productId === item.productId && i.variantId === item.variantId);
  let items: CartItem[];
  if (existing) {
    items = cart.items.map(i => i.productId === item.productId && i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i);
  } else {
    items = [...cart.items, { ...item, id: `${item.productId}-${item.variantId || 'default'}-${Date.now()}` }];
  }
  const updated = computeCart(items);
  saveCart(updated);
  return updated;
}

export function removeFromCart(itemId: string): Cart {
  const cart = getCart();
  const updated = computeCart(cart.items.filter(i => i.id !== itemId));
  saveCart(updated);
  return updated;
}

export function updateCartQuantity(itemId: string, quantity: number): Cart {
  const cart = getCart();
  const items = quantity <= 0 ? cart.items.filter(i => i.id !== itemId) : cart.items.map(i => i.id === itemId ? { ...i, quantity } : i);
  const updated = computeCart(items);
  saveCart(updated);
  return updated;
}

export function clearCart(): Cart {
  const empty = emptyCart();
  saveCart(empty);
  return empty;
}
