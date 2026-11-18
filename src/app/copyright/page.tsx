import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, OPERATOR } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Copyright & Content Use',
  description: 'Copyright and permitted use of the tours, itineraries, guides, photos and design on Bhutan Motorcycle Tours.',
  alternates: { canonical: '/copyright' },
  robots: { index: false, follow: true },
};

const YEAR = 2026;

export default function Page() {
  return (
    <main id="main" className="page">
      <div style={{ display: 'grid', gap: 20 }}>
        <nav aria-label="Breadcrumb" className="crumbs mono"><Link href="/">Home</Link><span aria-hidden>/</span><span aria-current="page">Copyright</span></nav>
        <h1 className="display" style={{ fontSize: 'clamp(48px,8vw,112px)' }}>Copyright &amp; content use</h1>
        <p className="prose">© {YEAR} {OPERATOR.name} ({OPERATOR.tradingName}), Thimphu, Bhutan. All rights reserved.</p>
      </div>

      <article className="guide-body" style={{ maxWidth: 820 }}>
        <section className="guide-section">
          <h2 className="guide-h2">What we own</h2>
          <p className="prose">Everything on this website that we created is protected by copyright and belongs to {OPERATOR.name}. That includes our tour descriptions and itineraries, route and day plans, distances and riding times, guides, blog posts and FAQs, and the selection and arrangement of our route data, as well as the site’s design, layout, code and branding.</p>
        </section>

        <section className="guide-section">
          <h2 className="guide-h2">What you may do</h2>
          <ul className="prose guide-list">
            <li>Read, print or save pages for planning your own trip.</li>
            <li>Link to any page on this site.</li>
            <li>Quote up to two sentences, with credit to Bhutan Motorcycle Tours and a link to the page.</li>
          </ul>
        </section>

        <section className="guide-section">
          <h2 className="guide-h2">What needs our written permission</h2>
          <p className="prose">Copying, republishing, translating or adapting our itineraries, tour pages, guides or posts, in whole or in part, on another website, in a brochure, on a marketplace listing or in a product, including by automated scraping. This applies to commercial and non-commercial use. If you would like to use our content, ask us first. We are often happy to say yes, with credit.</p>
        </section>

        <section className="guide-section">
          <h2 className="guide-h2">Photos and third-party material</h2>
          <p className="prose">Some photos come from Wikimedia Commons and remain under their own Creative Commons licences. Each is credited where it appears. Map data is © OpenStreetMap contributors, and the 3D motorcycle model is by Addere Creations (CC BY 4.0). We claim no ownership of this material; reuse it under its own licence.</p>
        </section>

        <section className="guide-section">
          <h2 className="guide-h2">Report a copy, or ask permission</h2>
          <p className="prose">If you find our content used elsewhere without permission, or you want to request permission, email <a href={'mailto:' + CONTACT.emails[0]}>{CONTACT.emails[0]}</a> with the page address and where it appears. We act on unauthorised copies, including takedown requests to hosting providers and search engines.</p>
        </section>
      </article>
    </main>
  );
}
