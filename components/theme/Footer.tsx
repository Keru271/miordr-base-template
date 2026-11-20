'use client';
import Link from 'next/link';
import { useTheme } from '@/components/shared/ThemeProvider';
import { useMenu } from '@/context/MenuContext';

export default function Footer() {
  const { theme } = useTheme();
  const { footerMenu } = useMenu();
  const year = new Date().getFullYear();
  const footerLinks = footerMenu?.items || [
    { id: 'terms', label: 'Terms of Service', url: '/policies/terms-of-service' },
    { id: 'privacy', label: 'Privacy Policy', url: '/policies/privacy-policy' },
    { id: 'returns', label: 'Return Policy', url: '/policies/return-policy' },
    { id: 'contact', label: 'Contact', url: '/contact' },
    { id: 'support', label: 'Support', url: '/support' },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--sf-surface)', borderTop: '1px solid var(--sf-border)' }}>
      <div className="sf-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              {theme.logo ? (
                <img src={theme.logo} alt={theme.storeName} className="h-7 w-auto object-contain" />
              ) : (
                <span className="text-base font-bold" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>
                  {theme.storeName || 'Store'}
                </span>
              )}
            </div>
            {theme.description && (
              <p className="text-sm max-w-xs" style={{ color: 'var(--sf-text-muted)' }}>{theme.description}</p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--sf-text)' }}>Shop</h4>
            <ul className="space-y-2">
              {[{ label: 'All Products', url: '/products' }, { label: 'Categories', url: '/categories' }, { label: 'Collections', url: '/collections' }, { label: 'New Arrivals', url: '/products?sort=newest' }].map(l => (
                <li key={l.url}><Link href={l.url} className="text-sm hover:opacity-70" style={{ color: 'var(--sf-text-muted)' }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--sf-text)' }}>Info</h4>
            <ul className="space-y-2">
              {footerLinks.slice(0, 5).map(item => (
                <li key={item.id}><Link href={item.url} className="text-sm hover:opacity-70" style={{ color: 'var(--sf-text-muted)' }}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderTop: '1px solid var(--sf-border)' }}>
          <p className="text-xs" style={{ color: 'var(--sf-text-muted)' }}>
            © {year} {theme.storeName || 'Store'}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--sf-text-muted)' }}>
            Powered by <span style={{ color: 'var(--sf-primary)' }}>OmniStore</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
