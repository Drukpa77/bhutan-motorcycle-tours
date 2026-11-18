import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Testimonials from '@/components/content/Testimonials';
import ItineraryRequest, { EnquireButton } from '@/components/enquiry/ItineraryRequest';
import { whatsappLink } from '@/lib/whatsapp';
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
          <span><span style={{ color: 'var(--steel)' }}>Duration</span> {t.lengths ? t.lengths.map(l => l.days).join(', ') + ' days' : t.days ? `${t.days} days / ${t.days - 1} nights` : 'Flexible, set to your pace'}</span>
          <span><span style={{ color: 'var(--steel)' }}>Bike</span> {OPERATIONS.fleet}</span>
          <span><span style={{ color: 'var(--steel)' }}>Support</span> Guide, mechanic, backup vehicle</span>
          <span><span style={{ color: 'var(--steel)' }}>Price</span> TBA</span>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <EnquireButton>Get the full itinerary →</EnquireButton>
          <Link href={'/explore-bhutan?tour=' + t.slug} className="btn btn-ghost">Trace it on the map</Link>
        </div>
      </div>

      {t.facts && (
        <dl className="blk-stats tour-facts" aria-label="At a glance">
          {t.facts.map(([k, v]) => <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>)}
        </dl>
      )}

      <figure style={{ margin: 0 }}>
        <div className="photo hero-photo">
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

      {t.lengths && (
        <section aria-labelledby="len-title" style={{ display: 'grid', gap: 24 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <span className="mono" style={{ color: 'var(--orange)' }}>One route, three lengths</span>
            <h2 id="len-title" className="display" style={{ fontSize: 'clamp(40px,5vw,80px)' }}>Choose your expedition</h2>
          </div>
          <div className="len-cards">
            {t.lengths.map(l => (
              <article key={l.days} className={'len-card reveal' + (l.days === t.days ? ' is-main' : '')}>
                <span className="mono" style={{ color: 'var(--lime)' }}>{l.label}{l.days === t.days ? ' · shown below' : ''}</span>
                <h3 className="display">{l.days} days</h3>
                <p className="prose" style={{ fontSize: 16 }}>{l.note}</p>
                <EnquireButton days={l.days} className="btn btn-ghost">Get the {l.days}-day plan →</EnquireButton>
              </article>
            ))}
          </div>
        </section>
      )}

      {t.itinerary && (
        <section aria-labelledby="itin-title" style={{ display: 'grid', gap: 24 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <span className="mono" style={{ color: 'var(--orange)' }}>{t.days} days · {t.days! - 1} nights{t.gated ? ' · highlights' : ''}</span>
            <h2 id="itin-title" className="display" style={{ fontSize: 'clamp(40px,5vw,80px)' }}>Day-by-day {t.gated ? 'highlights' : 'itinerary'}</h2>
            <p className="prose">Riding times are approximate and include photo stops. As a private tour, the pace and the stops are yours to adjust with your guide.</p>
          </div>
          <ol className="itin">
            {t.itinerary.map(d => (
              <li key={d.day} className="reveal">
                <span className="mono itin-day">Day {String(d.day).padStart(2, '0')}</span>
                <div style={{ display: 'grid', gap: 8 }}>
                  <h3>{d.title}</h3>
                  <p className="prose" style={{ fontSize: 16 }}>{d.detail}</p>
                  {(d.km || d.ride || d.elev) ? (
                    <ul className="itin-chips mono" aria-label="Day facts">
                      {d.km && <li><span>Distance</span> {d.km}</li>}
                      {d.ride && <li><span>Riding</span> {d.ride}</li>}
                      {d.elev && <li><span>Night at</span> {d.elev.toLocaleString()} m</li>}
                      <li><span>Overnight</span> {d.night}</li>
                    </ul>
                  ) : <span className="mono" style={{ color: 'var(--steel)' }}>Night: {d.night}</span>}
                </div>
              </li>
            ))}
          </ol>
          <aside className="itin-gate reveal" aria-labelledby="gate-title">
            <div style={{ display: 'grid', gap: 12 }}>
              <span className="mono" style={{ color: 'var(--lime)' }}>The full itinerary</span>
              <h3 id="gate-title" className="display">Want every detail?</h3>
              <p className="prose" style={{ fontSize: 16 }}>We send the complete plan by email, built around your dates and group.</p>
            </div>
            <ul className="blk-check-list">
              {['Hotels, homestays and camps for every night', 'Every visit, ride and experience, hour by hour', 'Meals, flights and logistics', t.lengths ? 'Day plans for every length of this route' : 'Options to shorten or extend the route', 'An itemised quote for your group'].map(x => <li key={x}><span aria-hidden className="tick" />{x}</li>)}
            </ul>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <EnquireButton>Send me the full itinerary →</EnquireButton>
              <a className="btn btn-ghost" href={whatsappLink(t.name, t.days)} target="_blank" rel="noopener noreferrer">WhatsApp us ↗</a>
            </div>
          </aside>
        </section>
      )}

      <section aria-labelledby="book-title" className="stack incl" style={{ background: 'var(--ti)', padding: 'clamp(28px,5vw,56px)' }}>
        <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
          <h2 id="book-title" className="display" style={{ fontSize: 'clamp(36px,4vw,64px)' }}>Dates, price and what’s included</h2>
          <p className="prose">Every departure is private and quoted individually, based on your dates, group size and hotel grade. Price: TBA. Your quote itemises the land cost, Bhutan’s Sustainable Development Fee (included) and a fuel estimate. <Link href="/guides/bhutan-motorcycle-tour-cost">How tour pricing works →</Link></p>
          <EnquireButton className="btn btn-orange enq-start">Get the itinerary and a quote →</EnquireButton>
          <ul className="prose guide-list" aria-label="Also available" style={{ fontSize: 15 }}>{OPERATIONS.extras.map(x => <li key={x}>{x}</li>)}</ul>
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

      <div className="enq-bar" role="region" aria-label="Enquire about this tour">
        <span className="mono"><b>{t.name}</b>{t.days ? ` · ${t.lengths ? t.lengths.map(l => l.days).join(' / ') : t.days} days` : ''}</span>
        <EnquireButton>Get the full itinerary →</EnquireButton>
      </div>
      <ItineraryRequest tour={{ slug: t.slug, name: t.name, title: t.title, days: t.days, lengths: t.lengths?.map(l => ({ days: l.days, label: l.label })), places: [...new Set(t.stops.map(s => PLACES[s].name))] }} />
    </main>
  );
}
