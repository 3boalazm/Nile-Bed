import type { MetadataRoute } from 'next';
export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
}
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: new URL('/', base).href, changeFrequency: 'monthly', priority: 1 },
    { url: new URL('/catalog', base).href, changeFrequency: 'weekly', priority: 0.9 },
  ];
}
