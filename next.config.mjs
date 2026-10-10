/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: 'commons.wikimedia.org' }, { protocol: 'https', hostname: 'upload.wikimedia.org' }] },
  async redirects() {
    // Map legacy WordPress URLs once the original sitemap is confirmed.
    return [];
  },
};
export default nextConfig;
