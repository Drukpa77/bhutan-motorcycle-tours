import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Testimonials from '@/components/content/Testimonials';
import TrustStrip from '@/components/content/TrustStrip';
import { OPERATIONS, PLACES, TOURS, img } from '@/lib/content';
import { GUIDES } from '@/lib/guides';
import { SITE_NAME, breadcrumbLd, jsonLd, siteUrl } from '@/lib/site';

type Props = { params: Promise<{ tour: string }> };
const find = (path: string) => TOURS.find(t => t.path === path);

export const dynamicParams = false;
export const generateStaticParams = () => TOURS.map(t => ({ tour: t.path }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = find((await params).tour);
  if (!t) return {};
  const url = `/motorcycle-tours/${t.path}`;
  const image = { url: img(t.img), alt: t.imgAlt };
  // Next.js replaces (not merges) the root openGraph/twitter objects, so repeat the site-wide fields here.
  return {
    // Absolute: the tour titles already say "Motorcycle Tour", so the site suffix only pushed them past ~60 chars.
    title: { absolute: t.title },
    description: t.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_US', title: t.title, description: t.description, url, images: [image] },
    twitter: { card: 'summary_large_image', title: t.title, description: t.description, images: [image] },
  };
}

export default async function Page({ params }: Props) {
  const t = find((await params).tour);
  if (!t) notFound();
  const url = `/motorcycle-tours/${t.path}`;
  const passes = t.stops.filter((s, i) => PLACES[s].pass && t.stops.indexOf(s) === i).map(s => PLACES[s]);
  const others = TOURS.filter(o => o.slug !== t.slug);

  const trip = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: t.title,
    description: t.description,
    url: siteUrl() + url,
    image: siteUrl() + img(t.img),
    touristType: 'Motorcycle touring',
    provider: { '@id': siteUrl() + '/#org' },
    ...(t.itinerary && { subjectOf: { '@type': 'CreativeWork', name: `${t.days}-day itinerary`, text: t.itinerary.map(d => `Day ${d.day}: ${d.title}`).join('; ') } }),
    itinerary: {
      '@type': 'ItemList',
      itemListElement: t.stops.map((s, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'Place', name: PLACES[s].name + ', Bhutan', geo: { '@type': 'GeoCoordinates', latitude: PLACES[s].ll[0], longitude: PLACES[s].ll[1], elevation: PLACES[s].elev } },
      })),
    },
  };

  return (
    <main id="main" className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(trip)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd([['Home', '/'], ['Motorcycle tours', '/motorcycle-tours'], [t.name, url]]))} />

      <div style={{ display: 'grid', gap: 20 }}>
        <nav aria-label="Breadcrumb" className="crumbs mono"><Link href="/">Home</Link><span aria-hidden>/</span><Link href="/motorcycle-tours">Motorcycle tours</Link><span aria-hidden>/</span><span aria-current="page">{t.name}</span></nav>
        <span className="mono" style={{ color: 'var(--orange)' }}>{t.code} · Bhutan motorcycle tour</span>
        <h1 className="display" style={{ fontSize: 'clamp(48px,8vw,128px)' }}>{t.name}</h1>
        <p className="prose">{t.intro}</p>
        <div className="mono" style={{ display: 'flex', gap: '12px 28px', flexWrap: 'wrap', fontSize: 12 }}>
          <span><span style={{ color: 'var(--steel)' }}>Start</span> {PLACES[t.stops[0]].name}</span>
          <span><span style={{ color: 'var(--steel)' }}>Finish</span> {PLACES[t.stops[t.stops.length - 1]].name}</span>
          <span><span style={{ color: 'var(--steel)' }}>High point</span> {t.high}</span>
          <span><span style={{ color: 'var(--steel)' }}>Passes</span> {passes.map(p => p.name).join(', ')}</span>
          <span><span style={{ color: 'var(--steel)' }}>Duration</span> {t.days ? `${t.days} days / ${t.days - 1} nights` : 'Flexible, set to your pace'}</span>
          <span><span style={{ color: 'var(--steel)' }}>Bike</span> {OPERATIONS.fleet}</span>
          <span><span style={{ color: 'var(--steel)' }}>Support</span> Guide, mechanic, backup 4x4</span>
          <span><span style={{ color: 'var(--steel)' }}>Price</span> Itemised quote</span>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/plan-your-ride" className="btn btn-orange">Get a quote for this route →</Link>
          <Link href={'/explore-bhutan?tour=' + t.slug} className="btn btn-ghost">Trace it on the map</Link>
        </div>
      </div>

      <figure style={{ margin: 0 }}>
        <div className="photo" style={{ aspectRatio: '21/9', minHeight: 240 }}>
          <Image src={img(t.img)} alt={t.imgAlt} fill priority sizes="(max-width:1280px) 100vw, 1280px" />
        </div>
      </figure>

      <section aria-labelledby="route-title">
        <h2 id="route-title" className="display" style={{ fontSize: 'clamp(40px,5vw,80px)', marginBottom: 24 }}>The route, stop by stop</h2>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {t.stops.map((s, i) => {
            const p = PLACES[s], again = t.stops.indexOf(s) < i;
            if (again) return (
              <li key={s + i} className="mono" style={{ borderTop: '1px solid var(--line)', padding: '20px 0', color: 'var(--steel)' }}>
                {String(i + 1).padStart(2, '0')} · Back through {p.name} ({p.elev.toLocaleString()} m)
              </li>
            );
            return (
              <li key={s + i} className={p.img ? 'stop' : 'stop stop-text'}>
                {p.img && (
                  <figure style={{ margin: 0 }}>
                    <div className="photo" style={{ aspectRatio: '4/3' }}>
                      <Image src={img(p.img)} alt={p.alt} fill sizes="(max-width:860px) 100vw, 40vw" />
                    </div>
                    <figcaption className="mono credit">Photo: {p.credit} · Wikimedia Commons</figcaption>
                  </figure>
                )}
                <div style={{ display: 'grid', gap: 12 }}>
                  <span className="mono" style={{ color: 'var(--lime)' }}>Stop {String(i + 1).padStart(2, '0')}{p.pass ? ' · Mountain pass' : ''}</span>
                  <h3 className="display" style={{ fontSize: 'clamp(36px,4vw,64px)' }}>{p.name}</h3>
                  <span className="mono" style={{ color: 'var(--orange)', fontSize: 13 }}>Approx. {p.elev.toLocaleString()} m</span>
                  <p className="prose">{p.blurb}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {t.itinerary && (
        <section aria-labelledby="itin-title" style={{ display: 'grid', gap: 24 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <span className="mono" style={{ color: 'var(--orange)' }}>{t.days} days · {t.days! - 1} nights</span>
            <h2 id="itin-title" className="display" style={{ fontSize: 'clamp(40px,5vw,80px)' }}>Day-by-day itinerary</h2>
            <p className="prose">Riding times are approximate and include photo stops. As a private tour, the pace and the stops are yours to adjust with your guide.</p>
          </div>
          <ol className="itin">
            {t.itinerary.map(d => (
              <li key={d.day}>
                <span className="mono itin-day">Day {String(d.day).padStart(2, '0')}</span>
                <div style={{ display: 'grid', gap: 8 }}>
                  <h3>{d.title}</h3>
                  <p className="prose" style={{ fontSize: 16 }}>{d.detail}</p>
                  <span className="mono" style={{ color: 'var(--steel)' }}>{d.ride ? 'Ride: ' + d.ride + ' · ' : ''}Night: {d.night}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section aria-labelledby="book-title" className="stack incl" style={{ background: 'var(--ti)', padding: 'clamp(28px,5vw,56px)' }}>
        <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
          <h2 id="book-title" className="display" style={{ fontSize: 'clamp(36px,4vw,64px)' }}>Dates, price and what’s included</h2>
          <p className="prose">Every departure is private and quoted individually, based on your dates, group size and hotel grade. Your quote itemises the land cost, the Sustainable Development Fee (US$100 per person per night, included) and a fuel estimate. <Link href="/guides/bhutan-motorcycle-tour-cost">How tour pricing works →</Link></p>
          <Link href="/plan-your-ride" className="btn btn-orange" style={{ justifySelf: 'start' }}>Get a quote for this route →</Link>
        </div>
        <ul className="prose guide-list">{OPERATIONS.included.map(x => <li key={x}>{x}</li>)}</ul>
      </section>

      <TrustStrip />
      <Testimonials tour={t.slug} />

      <nav aria-label="Before you ride" style={{ display: 'grid', gap: 12 }}>
        <span className="mono" style={{ color: 'var(--steel)' }}>Before you ride</span>
        {GUIDES.map(g => <Link key={g.slug} href={`/guides/${g.slug}`} className="mono" style={{ fontSize: 13 }}>{g.h1} →</Link>)}
        <Link href="/faq" className="mono" style={{ fontSize: 13 }}>Rider FAQ →</Link>
      </nav>

      {others.length > 0 && (
        <nav aria-label="Other tours" style={{ display: 'grid', gap: 12 }}>
          <span className="mono" style={{ color: 'var(--steel)' }}>Other Bhutan motorcycle tours</span>
          {others.map(o => <Link key={o.slug} href={`/motorcycle-tours/${o.path}`} className="display" style={{ fontSize: 'clamp(32px,4vw,56px)', textDecoration: 'none' }}>{o.name} →</Link>)}
        </nav>
      )}
    </main>
  );
}
