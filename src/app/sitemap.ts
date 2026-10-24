import type { MetadataRoute } from 'next';
import { TOURS } from '@/lib/content';
import { siteUrl } from '@/lib/site';

// Only canonical, indexable URLs: no ?tour= map views (they canonicalise to /explore-bhutan) and no /ride-mode (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: base + '/', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: base + '/motorcycle-tours', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: base + '/explore-bhutan', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: base + '/plan-your-ride', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/faq', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
  for (const tour of TOURS) {
    pages.push({
      url: `${base}/motorcycle-tours/${tour.path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  }
  return pages;
}
