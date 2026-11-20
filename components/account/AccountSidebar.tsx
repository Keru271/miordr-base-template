'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Package,
  MapPin,
  Heart,
  Wallet,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import type { ThemeConfig } from '@/lib/api/types';
import { useWishlist } from '@/context/WishlistContext';

interface Props {
  theme: ThemeConfig;
}

export default function AccountSidebar({ theme }: Props) {
  const pathname = usePathname();
  const { wishlist } = useWishlist();

  const navItems = [
    {
      label: 'Personal Info',
      href: '/account/info',
      icon: User,
      active: pathname === '/account' || pathname === '/account/info',
    },
    {
      label: 'My Orders',
      href: '/account/orders',
      icon: Package,
      active: pathname.startsWith('/account/orders'),
    },
    {
      label: 'My Addresses',
      href: '/account/addresses',
      icon: MapPin,
      active: pathname === '/account/addresses',
    },
    {
      label: 'Wishlist',
      href: '/account/wishlist',
      icon: Heart,
      active: pathname === '/account/wishlist',
      badge: wishlist.length > 0 ? wishlist.length : undefined,
    },
    {
      label: 'Wallet & Credits',
      href: '/account/wallet',
      icon: Wallet,
      active: pathname === '/account/wallet',
      badgeText: '$125.00',
    },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      {/* User Card */}
      <div
        className="p-5 rounded-2xl mb-4 flex items-center gap-3.5 border"
        style={{
          backgroundColor: 'var(--sf-surface)',
          borderColor: 'var(--sf-border)',
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shrink-0 shadow-sm"
          style={{
            backgroundColor: 'var(--sf-primary)',
            color: 'var(--sf-text-inverse)',
          }}
        >
          JD
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className="text-sm font-bold truncate"
            style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}
          >
            John Doe
          </h3>
          <p className="text-xs truncate" style={{ color: 'var(--sf-text-muted)' }}>
            john.doe@example.com
          </p>
          <span
            className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--sf-accent) 15%, transparent)',
              color: 'var(--sf-accent)',
            }}
          >
            VIP Member
          </span>
        </div>
      </div>

      {/* Navigation List - Desktop & Horizontal Mobile */}
      <nav
        className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 p-1.5 rounded-2xl border"
        style={{
          backgroundColor: 'var(--sf-surface)',
          borderColor: 'var(--sf-border)',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 lg:shrink"
              style={{
                backgroundColor: item.active
                  ? 'var(--sf-bg)'
                  : 'transparent',
                color: item.active
                  ? 'var(--sf-primary)'
                  : 'var(--sf-text-muted)',
                boxShadow: item.active ? 'var(--sf-shadow)' : 'none',
              }}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  style={{
                    color: item.active
                      ? 'var(--sf-primary)'
                      : 'var(--sf-text-muted)',
                  }}
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                {item.badge !== undefined && (
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--sf-primary)',
                      color: 'var(--sf-text-inverse)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.badgeText && (
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--sf-success) 15%, transparent)',
                      color: 'var(--sf-success)',
                    }}
                  >
                    {item.badgeText}
                  </span>
                )}
                <ChevronRight
                  size={14}
                  className="hidden lg:block opacity-40"
                />
              </div>
            </Link>
          );
        })}

        <div
          className="my-1 border-t hidden lg:block"
          style={{ borderColor: 'var(--sf-border)' }}
        />

        <Link
          href="/auth/login"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium hover:opacity-75 transition-opacity shrink-0 lg:shrink text-red-500"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </Link>
      </nav>
    </aside>
  );
}
