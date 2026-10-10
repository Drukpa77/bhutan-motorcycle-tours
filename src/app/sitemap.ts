import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return ['', '/explore-bhutan', '/ride-mode', '/plan-your-ride'].map(p => ({ url: base + p, lastModified: new Date() }));
}
