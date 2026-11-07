import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Testimonials from '@/components/content/Testimonials';
import TrustStrip from '@/components/content/TrustStrip';
import { OPERATIONS, PLACES, TOURS, img } from '@/lib/content';
import { GUIDES } from '@/lib/guides';
import { breadcrumbLd, jsonLd, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Bhutan Motorcycle Tours: Guided Royal Enfield Rides' },
  description: 'Guided Bhutan motorcycle tours on Royal Enfield 500s with a guide, mechanic and backup 4x4: the 16-day West to East, Dragon’s Spine, Western Valleys or a private route.',
  alternates: { canonical: '/motorcycle-tours' },
};

const LIST = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Bhutan motorcycle tours',
  itemListElement: TOURS.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: `${siteUrl()}/motorcycle-tours/${t.path}`, name: t.title })),
};

// How a tour runs, end to end. Every step reflects the operator's published process and terms.
const STEPS: [string, string][] = [
  ['Plan & quote', 'Send your dates, group size, experience and the passes you want. You get an itemised quote: SDF, visa, land cost and a fuel estimate.'],
  ['Confirm', 'A 50% deposit on the land cost confirms your dates. We hold hotels and, if you want, Paro flights, which fill early in peak season.'],
  ['Visa & permits', 'We apply for your Bhutan visa (approval usually in 5–7 working days) and arrange the route permits checked at road checkpoints.'],
  ['Handover', 'We meet you at Paro airport. You get your Royal Enfield 500, a briefing, a gear and document check, and a short test ride before the first pass.'],
  ['On the road', 'Your guide leads, and the mechanic and the backup 4x4 with your luggage travel with the group. Days are planned in riding hours, not kilometres.'],
  ['Return', 'Bike handover in Paro, a farewell dinner, and a transfer to your flight. The balance was settled 30 days before departure, so there are no surprises at the end.'],
];

export default function Page() {
  return (
    <main id="main" className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(LIST)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd([['Home', '/'], ['Motorcycle tours', '/motorcycle-tours']]))} />
      <div style={{ display: 'grid', gap: 20 }}>
        <nav aria-label="Breadcrumb" className="crumbs mono"><Link href="/">Home</Link><span aria-hidden>/</span><span aria-current="page">Motorcycle tours</span></nav>
        <h1 className="display" style={{ fontSize: 'clamp(48px,8vw,128px)' }}>Bhutan motorcycle tours</h1>
        <p className="prose">Guided motorcycle tours across the Kingdom of Bhutan on {OPERATIONS.fleet} bikes, from the Paro valley over the high passes of the Himalaya to the temples of Bumthang and the far east. Every tour is private to your group and run by a licensed Bhutanese operator. A guide, a mechanic and a backup 4x4 travel with you, and we handle the visa, the permits and the Sustainable Development Fee.</p>
      </div>

      <section aria-label="Tours" className="cards">
        {TOURS.map((t, i) => (
          <Link key={t.slug} href={`/motorcycle-tours/${t.path}`} className="card">
            <div className="photo" style={{ aspectRatio: '16/10' }}>
              <Image src={img(t.img)} alt={t.imgAlt} fill sizes="(max-width:860px) 100vw, 50vw" priority={i === 0} />
            </div>
            <span className="mono" style={{ color: 'var(--orange)' }}>{t.code} · {t.days ? t.days + ' days' : 'Flexible length'} · High point {t.high}</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px,4vw,56px)' }}>{t.name}</h2>
            <p className="prose" style={{ fontSize: 16 }}>{t.summary}</p>
            <span className="mono" style={{ color: 'var(--ice)' }}>{t.itinerary ? 'Day-by-day itinerary →' : 'View route →'}</span>
          </Link>
        ))}
        <Link href="/plan-your-ride" className="card">
          <div className="photo" style={{ aspectRatio: '16/10' }}>
            <Image src={img(PLACES.phob.img!)} alt={PLACES.phob.alt} fill sizes="(max-width:860px) 100vw, 50vw" />
          </div>
          <span className="mono" style={{ color: 'var(--orange)' }}>E-00 · Private / custom</span>
          <h2 className="display" style={{ fontSize: 'clamp(36px,4vw,56px)' }}>Your own line</h2>
          <p className="prose" style={{ fontSize: 16 }}>Your dates, your pace, your passes. Tell us what you want to ride and we will quote it individually.</p>
          <span className="mono" style={{ color: 'var(--ice)' }}>Plan your ride →</span>
        </Link>
      </section>

      <section aria-labelledby="how-title" style={{ display: 'grid', gap: 28 }}>
        <div style={{ display: 'grid', gap: 12 }}>
          <span className="mono" style={{ color: 'var(--orange)' }}>Operations</span>
          <h2 id="how-title" className="display" style={{ fontSize: 'clamp(40px,5vw,80px)' }}>How a Bhutan motorcycle tour works</h2>
          <p className="prose">Riding Bhutan is mostly logistics: visas, permits, government fees, fuel stops, mountain weather and a road that rarely runs straight. We run all of it so you only have to ride.</p>
        </div>
        <ol className="steps">
          {STEPS.map(([h, p], i) => (
            <li key={h}><span className="mono" style={{ color: 'var(--lime)' }}>{String(i + 1).padStart(2, '0')}</span><h3>{h}</h3><p className="prose" style={{ fontSize: 16 }}>{p}</p></li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="incl-title" className="stack incl">
        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <h2 id="incl-title" className="display" style={{ fontSize: 'clamp(36px,4vw,64px)' }}>What every tour includes</h2>
          <p className="prose" style={{ fontSize: 16 }}>Fuel, monument entry fees, insurance and tips are extra. The full breakdown, with payment and cancellation terms, is in <Link href="/guides/bhutan-motorcycle-tour-cost">what a Bhutan motorcycle tour costs</Link>.</p>
        </div>
        <ul className="prose guide-list">{OPERATIONS.included.map(x => <li key={x}>{x}</li>)}</ul>
      </section>

      <TrustStrip />
      <Testimonials />

      <nav aria-label="Rider guides" style={{ display: 'grid', gap: 12 }}>
        <span className="mono" style={{ color: 'var(--steel)' }}>Before you book</span>
        {GUIDES.map(g => <Link key={g.slug} href={`/guides/${g.slug}`} className="display" style={{ fontSize: 'clamp(26px,3vw,44px)', textDecoration: 'none' }}>{g.h1} →</Link>)}
        <Link href="/faq" className="display" style={{ fontSize: 'clamp(26px,3vw,44px)', textDecoration: 'none' }}>Rider FAQ →</Link>
      </nav>
    </main>
  );
}
