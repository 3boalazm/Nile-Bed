import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Vercel compresses at the edge; keep the Next header off the response.
  poweredByHeader: false,
  // Allow the hosted preview domain to talk to the dev server.
  allowedDevOrigins: ['*.e2b.app', '*.arena.ai'],
  // The only raster asset is a small OG image, so the optimiser is not needed
  // for the SVG artwork. Keeping it strict avoids surprises on deploy.
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [
      {
        // Brand assets may be cached aggressively; they change rarely.
        source: '/:path(logo-on-light.svg|logo-on-dark.svg|nilebed-springs.svg|og.png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
