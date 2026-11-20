'use client';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import type { ThemeConfig } from '@/lib/api/types';

interface Props { theme: ThemeConfig; }

export default function SearchView({ theme }: Props) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get('q') || '');
    }
  }, []);
  return (
    <div className="sf-container py-10">
      <div className="max-w-xl mb-8">
        <div className="flex gap-2">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search products…" className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
            style={{ border: '1px solid var(--sf-border)', color: 'var(--sf-text)', backgroundColor: 'var(--sf-bg)' }} />
          <button className="sf-btn-primary px-4"><Search size={16} /></button>
        </div>
      </div>
      {query && (
        <p style={{ color: 'var(--sf-text-muted)' }}>Searching for "<strong style={{ color: 'var(--sf-text)' }}>{query}</strong>"…</p>
      )}
    </div>
  );
}
