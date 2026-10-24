import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/layout/SiteHeader';
import { BRAND } from '@/lib/assets';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Bhutan Motorcycle Tours — Future of the Ride', template: '%s — Bhutan Motorcycle Tours' },
  description: 'Guided motorcycle expeditions across Bhutan’s high passes and valleys.',
  openGraph: { type: 'website', siteName: 'Bhutan Motorcycle Tours' },
  icons: { icon: BRAND.logo, apple: BRAND.logo },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#080B0D', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable + ' ' + mono.variable}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
