'use client';
import Link from 'next/link';
import type { SectionProps } from '@/lib/sections/types';

export default function VideoHero({ config }: SectionProps) {
  const p = config.props || {};
  const headline = (p.headline as string) || 'Experience the Difference';
  const ctaText = (p.ctaText as string) || 'Explore';
  const ctaUrl = (p.ctaUrl as string) || '/products';
  const videoUrl = p.videoUrl as string | undefined;

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden px-4" style={{ backgroundColor: 'var(--sf-primary)' }}>
      {videoUrl && (
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      <div className="relative z-10 text-center text-white max-w-xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 drop-shadow">{headline}</h1>
        <Link href={ctaUrl} className="sf-btn-primary" style={{ backgroundColor: 'white', color: 'var(--sf-primary)' }}>{ctaText}</Link>
      </div>
    </section>
  );
}
