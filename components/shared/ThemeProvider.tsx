'use client';
import React, { createContext, useContext, useEffect } from 'react';
import type { ThemeConfig } from '@/lib/api/types';

interface ThemeContextValue {
  theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children, theme }: { children: React.ReactNode; theme: ThemeConfig }) {
  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    if (theme.primaryColor) root.style.setProperty('--sf-primary', theme.primaryColor);
    if (theme.secondaryColor) root.style.setProperty('--sf-secondary', theme.secondaryColor);
    if (theme.accentColor) root.style.setProperty('--sf-accent', theme.accentColor);
    if (theme.backgroundColor) root.style.setProperty('--sf-bg', theme.backgroundColor);
    if (theme.textColor) root.style.setProperty('--sf-text', theme.textColor);
    if (theme.headingFont) root.style.setProperty('--sf-heading-font', `'${theme.headingFont}', system-ui, sans-serif`);
    if (theme.bodyFont) root.style.setProperty('--sf-body-font', `'${theme.bodyFont}', system-ui, sans-serif`);
    if (theme.customCss) {
      let el = document.getElementById('sf-custom-css');
      if (!el) { el = document.createElement('style'); el.id = 'sf-custom-css'; document.head.appendChild(el); }
      el.textContent = theme.customCss;
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be within ThemeProvider');
  return ctx;
}
