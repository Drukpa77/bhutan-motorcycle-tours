import type { MetadataRoute } from 'next';
import { TOURS } from '@/lib/content';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: base + '/', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: base + '/explore-bhutan', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: base + '/plan-your-ride', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/ride-mode', lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];
  for (const tour of TOURS) {
    pages.push({
      url: `${base}/explore-bhutan?tour=${tour.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }
  return pages;
}
