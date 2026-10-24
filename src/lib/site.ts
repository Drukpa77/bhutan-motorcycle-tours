export const LIVE_SITE_URL = 'https://bhutanmotorcycletours.com';
export const SITE_NAME = 'Bhutan Motorcycle Tours';
export const SITE_DESCRIPTION = 'Guided motorcycle tours across Bhutan’s Himalayan passes: Chele La, Dochula, Pele La and Yotong La, from Paro to Bumthang, or a custom route planned around you.';
/** Default social share image (Dochula, CC BY 2.0 — Arian Zwegers). */
export const SHARE_IMAGE = { url: '/images/places/dochula-wide.jpg', alt: 'The 108 chortens at Dochula pass, Bhutan' };

/** Canonical origin used in sitemap, robots, and metadata. No trailing slash. */
export function siteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || LIVE_SITE_URL;
  return raw.replace(/\/$/, '');
}

/** Serialise schema.org data for a <script type="application/ld+json"> tag. */
export const jsonLd = (data: object) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });

/** schema.org BreadcrumbList from [name, root-relative path] pairs. */
export const breadcrumbLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl() + path })),
});
