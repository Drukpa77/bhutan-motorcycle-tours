import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { img } from '@/lib/content';
import { GUIDES } from '@/lib/guides';
import { breadcrumbLd, jsonLd, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Bhutan Motorcycle Travel Guides: Costs, Permits & Passes' },
  description: 'Practical guides for riding Bhutan by motorcycle: what a tour costs, licence and permit rules, the best season to ride, and every major mountain pass.',
  alternates: { canonical: '/guides' },
};

const LIST = {
  '@context': 'https://schema.org', '@type': 'ItemList', name: 'Bhutan motorcycle travel guides',
  itemListElement: GUIDES.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: `${siteUrl()}/guides/${g.slug}`, name: g.h1 })),
};

export default function Page() {
  return (
    <main id="main" className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(LIST)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd([['Home', '/'], ['Guides', '/guides']]))} />
      <div style={{ display: 'grid', gap: 20 }}>
        <nav aria-label="Breadcrumb" className="crumbs mono"><Link href="/">Home</Link><span aria-hidden>/</span><span aria-current="page">Guides</span></nav>
        <h1 className="display" style={{ fontSize: 'clamp(48px,8vw,128px)' }}>Bhutan motorcycle guides</h1>
        <p className="prose">The briefing we give every rider, published in full: what a tour costs and why, the paperwork, when to go, and what each pass is like from the saddle. Written by the team that runs the tours.</p>
      </div>
      <section aria-label="Guides" className="cards">
        {GUIDES.map((g, i) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="card">
            <div className="photo" style={{ aspectRatio: '16/10' }}>
              <Image src={img(g.img)} alt={g.imgAlt} fill sizes="(max-width:860px) 100vw, 50vw" priority={i === 0} />
            </div>
            <span className="mono" style={{ color: 'var(--orange)' }}>{g.kicker}</span>
            <h2 className="display" style={{ fontSize: 'clamp(30px,3.4vw,48px)' }}>{g.h1}</h2>
            <p className="prose" style={{ fontSize: 16 }}>{g.description}</p>
            <span className="mono" style={{ color: 'var(--ice)' }}>Read the guide →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
