/**
 * Rider testimonials. Empty arrays render nothing except the "read our reviews" links, so the site never
 * shows placeholder reviews. Add entries as they come in; newest first.
 *
 * VIDEOS
 *   - YouTube (recommended: fast pages, free hosting, extra discovery): set `youtubeId` (the part after v=).
 *     The poster is taken from YouTube automatically unless you set `poster`.
 *   - Self-hosted: put the .mp4 in /public/videos/ and set `src: '/videos/name.mp4'` plus a `poster` image.
 *   `uploadDate` (YYYY-MM-DD) is required: Google uses it for video rich results.
 *
 * REVIEWS
 *   Copy reviews word for word from Google or Tripadvisor (with the reviewer's permission for anything not public),
 *   and link `url` to the original so visitors can verify it. Never edit wording or invent reviews.
 *   Note: Google does not show star snippets for reviews a business publishes about itself, so we deliberately
 *   output no Review/AggregateRating schema. The value of these is trust and conversion, not stars in search.
 *
 * `tour` (optional) is a tour slug: 'spine' | 'west' | 'east'. Tour pages show matching entries first.
 */
export type VideoTestimonial = {
  name: string; country?: string; tour?: string; title: string; quote?: string;
  uploadDate: string; youtubeId?: string; src?: string; poster?: string; duration?: string; // ISO 8601, e.g. 'PT1M42S'
};
export type Review = {
  name: string; country?: string; tour?: string; date: string; rating: 1 | 2 | 3 | 4 | 5;
  text: string; source: 'Google' | 'Tripadvisor' | 'Direct'; url?: string;
};

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  // { name: 'Jane D.', country: 'Australia', tour: 'east', title: 'Riding West to East Bhutan', quote: 'Thrumshing La was the ride of my life.',
  //   uploadDate: '2026-12-01', youtubeId: 'dQw4w9WgXcQ', duration: 'PT1M42S' },
];

export const REVIEWS: Review[] = [
  // { name: 'Mark T.', country: 'United Kingdom', tour: 'spine', date: '2026-10-20', rating: 5, source: 'Google',
  //   url: 'https://maps.app.goo.gl/...', text: 'Exact review text here.' },
];
