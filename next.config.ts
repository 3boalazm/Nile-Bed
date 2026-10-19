import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Vercel compresses at the edge; keep the Next header off the response.
  poweredByHeader: false,
  // Allow the hosted preview domain to talk to the dev server.
  allowedDevOrigins: ['*.e2b.app', '*.arena.ai'],
  // The site uses static public assets with standard img tags; Next's image
  // optimizer is not needed. Keep SVG handling strict for predictable deploys.
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [
      {
        // Brand assets may be cached aggressively; they change rarely.
        source: '/:path(logo-on-light.svg|logo-on-dark.svg|og.png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
