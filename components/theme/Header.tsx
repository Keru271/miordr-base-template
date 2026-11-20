'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Search, Menu, X, Store, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useMenu } from '@/context/MenuContext';
import { useTheme } from '@/components/shared/ThemeProvider';

export default function Header() {
  const { cart, openCart } = useCart();
  const { headerMenu, openMobile, closeMobile, isMobileOpen } = useMenu();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = headerMenu?.items || [];

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-shadow duration-200"
        style={{
          backgroundColor: 'var(--sf-bg)',
          borderBottom: '1px solid var(--sf-border)',
          boxShadow: scrolled ? 'var(--sf-shadow)' : 'none',
          height: 'var(--sf-nav-height)',
        }}
      >
        <div className="sf-container h-full flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {theme.logo ? (
              <img src={theme.logo} alt={theme.storeName} className="h-8 w-auto object-contain" />
            ) : (
              <div className="flex items-center gap-2">
                <Store size={22} style={{ color: 'var(--sf-primary)' }} />
                <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>
                  {theme.storeName || 'Store'}
                </span>
              </div>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <Link key={item.id} href={item.url} target={item.target}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: 'var(--sf-text)' }}>
                {item.label}
              </Link>
            ))}
            {navItems.length === 0 && (
              <>
                <Link href="/products" className="text-sm font-medium" style={{ color: 'var(--sf-text)' }}>Products</Link>
                <Link href="/categories" className="text-sm font-medium" style={{ color: 'var(--sf-text)' }}>Categories</Link>
                <Link href="/blog" className="text-sm font-medium" style={{ color: 'var(--sf-text)' }}>Blog</Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg hover:opacity-70 transition-opacity" style={{ color: 'var(--sf-text)' }}>
              <Search size={18} />
            </button>
            <Link href="/wishlist" className="p-2 rounded-lg hover:opacity-70 transition-opacity hidden sm:flex" style={{ color: 'var(--sf-text)' }} title="Wishlist">
              <Heart size={18} />
            </Link>
            <Link href="/account" className="p-2 rounded-lg hover:opacity-70 transition-opacity hidden sm:flex" style={{ color: 'var(--sf-text)' }} title="My Account">
              <User size={18} />
            </Link>
            <button onClick={openCart} className="relative p-2 rounded-lg hover:opacity-70 transition-opacity" style={{ color: 'var(--sf-text)' }}>
              <ShoppingCart size={18} />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs font-bold text-white w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--sf-primary)', fontSize: '10px' }}>
                  {cart.itemCount > 9 ? '9+' : cart.itemCount}
                </span>
              )}
            </button>
            <button onClick={isMobileOpen ? closeMobile : openMobile} className="lg:hidden p-2 rounded-lg" style={{ color: 'var(--sf-text)' }}>
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 pt-16" style={{ backgroundColor: 'var(--sf-overlay)' }} onClick={closeMobile}>
          <div className="absolute top-16 left-0 right-0 shadow-lg p-4 flex flex-col gap-2"
            style={{ backgroundColor: 'var(--sf-bg)', borderBottom: '1px solid var(--sf-border)' }}
            onClick={e => e.stopPropagation()}>
            {(navItems.length > 0 ? navItems : [
              { id: 'p', label: 'Products', url: '/products', target: '_self' as const },
              { id: 'c', label: 'Categories', url: '/categories', target: '_self' as const },
              { id: 'b', label: 'Blog', url: '/blog', target: '_self' as const },
            ]).concat([
              { id: 'acc', label: 'My Account', url: '/account', target: '_self' as const }
            ]).map(item => (
              <Link key={item.id} href={item.url} onClick={closeMobile}
                className="py-3 px-2 text-base font-medium border-b last:border-0"
                style={{ color: 'var(--sf-text)', borderColor: 'var(--sf-border)' }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4" style={{ backgroundColor: 'var(--sf-overlay)' }} onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--sf-bg)' }} onClick={e => e.stopPropagation()}>
            <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`; }}>
              <div className="flex items-center gap-3 p-4">
                <Search size={18} style={{ color: 'var(--sf-text-muted)' }} />
                <input autoFocus type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products…" className="flex-1 outline-none bg-transparent text-base"
                  style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-body-font)' }} />
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <X size={18} style={{ color: 'var(--sf-text-muted)' }} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
