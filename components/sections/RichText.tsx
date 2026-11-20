'use client';
import type { SectionProps } from '@/lib/sections/types';

export default function RichText({ config }: SectionProps) {
  const p = config.props || {};
  const heading = p.heading as string | undefined;
  const content = (p.content as string) || 'Add your custom content from the CMS Section Editor.';

  return (
    <section className="sf-container py-16 max-w-3xl">
      {heading && (
        <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>
          {heading}
        </h2>
      )}
      <div className="prose leading-relaxed text-sm sm:text-base" style={{ color: 'var(--sf-text-muted)' }}
        dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}
