'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { RUNWAY_BODY_MARKUP } from './runwayMarkup';

export default function RunwaySection() {
  useEffect(() => {
    // Set global store context for live storefront-backend API synchronization
    if (typeof window !== 'undefined') {
      (window as any).__OMNISTORE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      (window as any).__OMNISTORE_SLUG = process.env.NEXT_PUBLIC_STORE_SLUG || 'omnistore-demo';
    }
  }, []);

  return (
    <div className="runway-root-container w-full min-h-screen bg-white text-[#151413]">
      {/* Exact Runway stylesheet with embedded Inter 600 font & tokens */}
      <link rel="stylesheet" href="/runway/style.css" />

      {/* Exact static export markup */}
      <div
        id="runway-markup-host"
        dangerouslySetInnerHTML={{ __html: RUNWAY_BODY_MARKUP }}
      />

      {/* Deferred custom element script: 3D ring carousel, springs, cursor, FLIP popup & styling bag */}
      <Script
        src="/runway/app.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
