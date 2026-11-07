import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import { BRAND } from '@/lib/assets';
import { CONTACT, OPERATOR } from '@/lib/content';
import { SHARE_IMAGE, SITE_DESCRIPTION, SITE_NAME, jsonLd, siteUrl } from '@/lib/site';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
// Condensed headings need their own width-matched fallbacks (see @font-face in globals.css), otherwise the
// swap from Arial to condensed Archivo re-wraps headings and shifts the page (CLS). First family = hashed Archivo.
const ARCHIVO = archivo.style.fontFamily.split(',')[0];
const FONT_VARS = {
  '--font-display': `${ARCHIVO}, 'Display Fallback', sans-serif`,
  '--font-heading': `${ARCHIVO}, 'Heading Fallback', sans-serif`,
} as React.CSSProperties;
// preload: false — the mono face only styles small labels, so it shouldn't compete with Archivo
// (which renders the hero headline, the mobile LCP element) for bandwidth on first load.
// The auto-generated fallback (scaled Arial) wraps uppercase labels differently and caused layout shift.
// 'Mono Fallback' (globals.css) is Courier New: same 0.6em advance as JetBrains Mono, so labels don't reflow.
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-mono', display: 'swap', preload: false, adjustFontFallback: false, fallback: ['Mono Fallback', 'monospace'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'Bhutan Motorcycle Tours | Guided Rides Across the Himalayan Passes', template: '%s | Bhutan Motorcycle Tours' },
  description: SITE_DESCRIPTION,
  openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_US', images: [SHARE_IMAGE] },
  twitter: { card: 'summary_large_image', images: [SHARE_IMAGE.url] },
  // Favicons come from the file conventions src/app/icon1.png (96px) and apple-icon.png (180px).
  // Don't point icons at /brand/logo.png: it is 1.4 MB and browsers download it on every page.
};

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': siteUrl() + '/#org',
  name: SITE_NAME,
  url: siteUrl(),
  logo: siteUrl() + BRAND.logo,
  image: siteUrl() + SHARE_IMAGE.url,
  description: SITE_DESCRIPTION,
  areaServed: { '@type': 'Country', name: 'Bhutan' },
  telephone: CONTACT.phoneHref.replace('tel:', ''),
  email: CONTACT.emails[0],
  address: { '@type': 'PostalAddress', streetAddress: CONTACT.address.slice(0, 3).join(', '), addressLocality: 'Thimphu', postalCode: '11001', addressCountry: 'BT' },
  geo: { '@type': 'GeoCoordinates', latitude: 27.4398, longitude: 89.6434 }, // Babesa, Thimphu
  knowsAbout: ['Motorcycle touring in Bhutan', 'Royal Enfield motorcycle tours', 'Bhutan travel permits and the Sustainable Development Fee'],
  // The licensed operator behind the brand. Its profiles are listed here; add the brand's own social URLs to `sameAs` if you create them.
  parentOrganization: {
    '@type': 'TravelAgency', name: OPERATOR.name, alternateName: OPERATOR.tradingName, url: OPERATOR.url,
    sameAs: [OPERATOR.social.facebook, OPERATOR.social.instagram, OPERATOR.social.x, OPERATOR.social.youtube, OPERATOR.tripadvisor, OPERATOR.licenceUrl].filter(Boolean),
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#080B0D', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable + ' ' + mono.variable} style={FONT_VARS}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ORG)} />
        <a href="#main" className="skip">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
