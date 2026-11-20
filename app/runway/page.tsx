import type { Metadata } from 'next';
import RunwaySection from '@/components/theme/runway/RunwaySection';

export const metadata: Metadata = {
  title: 'Try the Look — Runway',
  description: 'Six looks, styled head to toe. Explore the runway, isolate a look, and tap a pin to see the piece.',
  themeColor: '#ffffff',
};

export default function RunwayPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://reel-ref-try-the-look.vercel.app/assets/model-1-640.webp"
        fetchPriority="high"
      />
      <RunwaySection />
    </>
  );
}
