'use client';
import React, { createContext, useContext, useState } from 'react';
import type { Menu } from '@/lib/api/types';

interface MenuContextValue {
  headerMenu: Menu | null;
  footerMenu: Menu | null;
  mobileMenu: Menu | null;
  isMobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

interface MenuProviderProps {
  children: React.ReactNode;
  headerMenu: Menu | null;
  footerMenu: Menu | null;
  mobileMenu: Menu | null;
}

export function MenuProvider({ children, headerMenu, footerMenu, mobileMenu }: MenuProviderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ headerMenu, footerMenu, mobileMenu, isMobileOpen, openMobile: () => setIsMobileOpen(true), closeMobile: () => setIsMobileOpen(false) }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
}
