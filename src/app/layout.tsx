import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import { BRAND } from '@/lib/assets';
import { CONTACT, OPERATOR } from '@/lib/content';
import { SHARE_IMAGE, SITE_DESCRIPTION, SITE_NAME, jsonLd, siteUrl } from '@/lib/site';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'Bhutan Motorcycle Tours | Guided Rides Across the Himalayan Passes', template: '%s | Bhutan Motorcycle Tours' },
  description: SITE_DESCRIPTION,
  openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_US', images: [SHARE_IMAGE] },
  twitter: { card: 'summary_large_image', images: [SHARE_IMAGE.url] },
  icons: { icon: BRAND.logo, apple: BRAND.logo },
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
    <html lang="en" className={archivo.variable + ' ' + mono.variable}>
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
