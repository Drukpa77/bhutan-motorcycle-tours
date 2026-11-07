/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first (smallest), WebP fallback. Source JPEGs in /public are ~1–2 MB; these serve ~100–300 KB.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: 'https', hostname: 'commons.wikimedia.org' }, { protocol: 'https', hostname: 'upload.wikimedia.org' }, { protocol: 'https', hostname: 'i.ytimg.com' }],
  },
  async headers() {
    // Low-risk security headers flagged by Lighthouse "Trust and safety". No CSP yet: the site relies on
    // inline JSON-LD and Next.js inline scripts, so a CSP needs nonces and its own testing pass.
    return [{
      source: '/:path*',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      ],
    }];
  },
  async redirects() {
    // Map legacy WordPress URLs once the original sitemap is confirmed.
    return [];
  },
};
export default nextConfig;
