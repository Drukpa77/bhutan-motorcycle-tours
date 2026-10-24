import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PLACES, TOURS, img } from '@/lib/content';
import { breadcrumbLd, jsonLd, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Bhutan Motorcycle Tours: Guided Routes Over the Himalayan Passes' },
  description: 'Compare guided motorcycle tours in Bhutan: the Dragon’s Spine from Paro to Bumthang, the Western Valleys loop over Chele La and Haa, or a private custom route.',
  alternates: { canonical: '/motorcycle-tours' },
};

const LIST = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Bhutan motorcycle tours',
  itemListElement: TOURS.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: `${siteUrl()}/motorcycle-tours/${t.path}`, name: t.title })),
};

export default function Page() {
  return (
    <main id="main" className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(LIST)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd([['Home', '/'], ['Motorcycle tours', '/motorcycle-tours']]))} />
      <div style={{ display: 'grid', gap: 20 }}>
        <nav aria-label="Breadcrumb" className="crumbs mono"><Link href="/">Home</Link><span aria-hidden>/</span><span aria-current="page">Motorcycle tours</span></nav>
        <h1 className="display" style={{ fontSize: 'clamp(48px,8vw,128px)' }}>Bhutan motorcycle tours</h1>
        <p className="prose">Guided rides across the Kingdom of Bhutan, from the Paro valley over the high passes of the Himalaya to the temples of Bumthang. Pick a route below to see every stop and elevation, or build your own and get a quote for the dates, pace and passes you want.</p>
      </div>

      <section aria-label="Tours" className="cards">
        {TOURS.map((t, i) => (
          <Link key={t.slug} href={`/motorcycle-tours/${t.path}`} className="card">
            <div className="photo" style={{ aspectRatio: '16/10' }}>
              <Image src={img(t.img)} alt={t.imgAlt} fill sizes="(max-width:860px) 100vw, 50vw" priority={i === 0} />
            </div>
            <span className="mono" style={{ color: 'var(--orange)' }}>{t.code} · High point {t.high}</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px,4vw,56px)' }}>{t.name}</h2>
            <p className="prose" style={{ fontSize: 16 }}>{t.summary}</p>
            <span className="mono" style={{ color: 'var(--ice)' }}>{t.stops.length} stops · View route →</span>
          </Link>
        ))}
        <Link href="/plan-your-ride" className="card">
          <div className="photo" style={{ aspectRatio: '16/10' }}>
            <Image src={img(PLACES.phob.img)} alt={PLACES.phob.alt} fill sizes="(max-width:860px) 100vw, 50vw" />
          </div>
          <span className="mono" style={{ color: 'var(--orange)' }}>E-00 · Private / custom</span>
          <h2 className="display" style={{ fontSize: 'clamp(36px,4vw,56px)' }}>Your own line</h2>
          <p className="prose" style={{ fontSize: 16 }}>Your dates, your pace, your passes. Configure an expedition and the operator will quote it individually.</p>
          <span className="mono" style={{ color: 'var(--ice)' }}>Plan your ride →</span>
        </Link>
      </section>

      <p className="mono" style={{ color: 'var(--steel)', margin: 0 }}>Questions about licences, fees or seasons? <Link href="/faq" style={{ color: 'var(--ice)' }}>Read the FAQ →</Link></p>
    </main>
  );
}
