import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PLACES, TOURS, img } from '@/lib/content';
import { FAQS } from '@/lib/faq';
import { breadcrumbLd, jsonLd, siteUrl } from '@/lib/site';

type Props = { params: Promise<{ tour: string }> };
const find = (path: string) => TOURS.find(t => t.path === path);

export const dynamicParams = false;
export const generateStaticParams = () => TOURS.map(t => ({ tour: t.path }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = find((await params).tour);
  if (!t) return {};
  const url = `/motorcycle-tours/${t.path}`;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: url },
    openGraph: { title: t.title, description: t.description, url, images: [{ url: img(t.img), alt: t.imgAlt }] },
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
          <span><span style={{ color: 'var(--steel)' }}>Price</span> Custom quote</span>
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
              <li key={s + i} className="stop">
                <figure style={{ margin: 0 }}>
                  <div className="photo" style={{ aspectRatio: '4/3' }}>
                    <Image src={img(p.img)} alt={p.alt} fill sizes="(max-width:860px) 100vw, 40vw" />
                  </div>
                  <figcaption className="mono credit">Photo: {p.credit} · Wikimedia Commons</figcaption>
                </figure>
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

      <section aria-labelledby="book-title" style={{ background: 'var(--ti)', padding: 'clamp(28px,5vw,56px)', display: 'grid', gap: 18 }}>
        <h2 id="book-title" className="display" style={{ fontSize: 'clamp(36px,4vw,64px)' }}>Dates, duration and price</h2>
        <p className="prose">Every departure is quoted individually, based on your dates, group size, riding experience and how many days you want in the saddle. Bhutan’s Sustainable Development Fee is charged per night on top of the tour price.</p>
        <Link href="/plan-your-ride" className="btn btn-orange" style={{ justifySelf: 'start' }}>Plan your ride →</Link>
      </section>

      <section aria-labelledby="faq-title" className="faq">
        <h2 id="faq-title" className="display" style={{ fontSize: 'clamp(36px,4vw,64px)', marginBottom: 16 }}>Before you ride</h2>
        {FAQS.slice(0, 4).map(f => (
          <details key={f.q}><summary>{f.q}</summary><p className="prose">{f.a}</p></details>
        ))}
        <p className="mono" style={{ marginTop: 20 }}><Link href="/faq">All questions →</Link></p>
      </section>

      {others.length > 0 && (
        <nav aria-label="Other tours" style={{ display: 'grid', gap: 12 }}>
          <span className="mono" style={{ color: 'var(--steel)' }}>Other Bhutan motorcycle tours</span>
          {others.map(o => <Link key={o.slug} href={`/motorcycle-tours/${o.path}`} className="display" style={{ fontSize: 'clamp(32px,4vw,56px)', textDecoration: 'none' }}>{o.name} →</Link>)}
        </nav>
      )}
    </main>
  );
}
