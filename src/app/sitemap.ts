import type { MetadataRoute } from 'next';
import type { Section } from '@/lib/blocks';
import { PLACES, TOURS, img } from '@/lib/content';
import { GUIDES } from '@/lib/guides';
import { POSTS } from '@/lib/posts';
import { SHARE_IMAGE, siteUrl } from '@/lib/site';

// Only canonical, indexable URLs: no ?tour= map views (they canonicalise to /explore-bhutan) and no /ride-mode (noindex).
// lastModified only where we have a real date (guides, posts): build-time stamps teach Google to ignore lastmod.
// `images` makes this an image sitemap, so the place photos can rank in Google Images and lead back to the page.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const abs = (file?: string) => (file ? base + img(file) : undefined);
  const uniq = (xs: (string | undefined)[]) => [...new Set(xs.filter(Boolean) as string[])];
  const blockImages = (sections: Section[]) => sections.flatMap(s => s.blocks.flatMap(b =>
    'figure' in b ? [abs(b.figure.src)] : 'gallery' in b ? b.gallery.map(g => abs(g.src)) : []));

  const pages: MetadataRoute.Sitemap = [
    { url: base + '/', changeFrequency: 'weekly', priority: 1, images: uniq([base + SHARE_IMAGE.url, ...TOURS.map(t => abs(t.img))]) },
    { url: base + '/motorcycle-tours', changeFrequency: 'weekly', priority: 0.9, images: uniq([...TOURS.map(t => abs(t.img)), abs(PLACES.phob.img)]) },
    { url: base + '/explore-bhutan', changeFrequency: 'monthly', priority: 0.7 },
    { url: base + '/plan-your-ride', changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/faq', changeFrequency: 'monthly', priority: 0.7 },
    { url: base + '/guides', changeFrequency: 'monthly', priority: 0.7, images: uniq(GUIDES.map(g => abs(g.img))) },
    { url: base + '/blog', lastModified: POSTS[0]?.published, changeFrequency: 'weekly', priority: 0.7, images: uniq(POSTS.map(p => abs(p.cover))) },
  ];
  for (const p of POSTS) {
    pages.push({ url: `${base}/blog/${p.slug}`, lastModified: p.updated, changeFrequency: 'monthly', priority: 0.7, images: uniq([abs(p.cover), ...blockImages(p.sections)]) });
  }
  for (const g of GUIDES) {
    pages.push({ url: `${base}/guides/${g.slug}`, lastModified: g.updated, changeFrequency: 'monthly', priority: 0.8, images: uniq([abs(g.img), ...blockImages(g.sections)]) });
  }
  for (const t of TOURS) {
    // Every stop photo on the tour page, so e.g. the Thrumshing La or Trongsa Dzong photo can surface in image search.
    pages.push({ url: `${base}/motorcycle-tours/${t.path}`, changeFrequency: 'monthly', priority: 0.9, images: uniq([abs(t.img), ...t.stops.map(s => abs(PLACES[s].img))]) });
  }
  return pages;
}
