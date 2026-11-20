'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import type { SectionProps } from '@/lib/sections/types';

export default function AnnouncementBar({ config }: SectionProps) {
  const [open, setOpen] = useState(true);
  const p = config.props || {};
  const text = (p.text as string) || 'Free worldwide shipping on orders over $100!';
  const link = p.link as string | undefined;

  if (!open) return null;

  return (
    <div className="relative py-2 px-4 text-center text-xs sm:text-sm font-medium"
      style={{ backgroundColor: 'var(--sf-primary)', color: 'var(--sf-text-inverse)' }}>
      {link ? (
        <a href={link} className="hover:underline">{text}</a>
      ) : (
        <span>{text}</span>
      )}
      <button onClick={() => setOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-75 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
}
