import type { MetadataRoute } from 'next';
import { TOURS } from '@/lib/content';
import { siteUrl } from '@/lib/site';

// Only canonical, indexable URLs: no ?tour= map views (they canonicalise to /explore-bhutan) and no /ride-mode (noindex).
// lastModified is deliberately omitted: stamping every URL with the build time teaches Google to ignore lastmod.
// Add a real per-page date here if you start tracking content changes.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const pages: MetadataRoute.Sitemap = [
    { url: base + '/', changeFrequency: 'weekly', priority: 1 },
    { url: base + '/motorcycle-tours', changeFrequency: 'weekly', priority: 0.9 },
    { url: base + '/explore-bhutan', changeFrequency: 'monthly', priority: 0.7 },
    { url: base + '/plan-your-ride', changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/faq', changeFrequency: 'monthly', priority: 0.7 },
  ];
  for (const tour of TOURS) {
    pages.push({
      url: `${base}/motorcycle-tours/${tour.path}`,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  }
  return pages;
}
