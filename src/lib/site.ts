export const LIVE_SITE_URL = 'https://bhutanmotorcycletours.com';

/** Canonical origin used in sitemap, robots, and metadata. No trailing slash. */
export function siteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || LIVE_SITE_URL;
  return raw.replace(/\/$/, '');
}
