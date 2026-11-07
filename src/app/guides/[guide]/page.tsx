import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Blocks } from '@/components/content/RichText';
import TrustStrip from '@/components/content/TrustStrip';
import { OPERATOR, img } from '@/lib/content';
import { GUIDES, findGuide } from '@/lib/guides';
import { SITE_NAME, breadcrumbLd, jsonLd, siteUrl } from '@/lib/site';

type Props = { params: Promise<{ guide: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map(g => ({ guide: g.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = findGuide((await params).guide);
  if (!g) return {};
  const url = `/guides/${g.slug}`, image = { url: img(g.img), alt: g.imgAlt };
  return {
    title: { absolute: g.title },
    description: g.description,
    alternates: { canonical: url },
    openGraph: { type: 'article', siteName: SITE_NAME, locale: 'en_US', title: g.title, description: g.description, url, images: [image], publishedTime: g.published, modifiedTime: g.updated },
    twitter: { card: 'summary_large_image', title: g.title, description: g.description, images: [image] },
  };
}

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function Page({ params }: Props) {
  const g = findGuide((await params).guide);
  if (!g) notFound();
  const url = `/guides/${g.slug}`;
  const related = g.related.map(findGuide).filter(Boolean) as typeof GUIDES;

  const article = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: g.h1, description: g.description, image: siteUrl() + img(g.img),
    datePublished: g.published, dateModified: g.updated, mainEntityOfPage: siteUrl() + url,
    author: { '@type': 'Organization', name: OPERATOR.name, url: OPERATOR.url },
    publisher: { '@id': siteUrl() + '/#org' },
  };
  const faq = g.faqs.length && {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: g.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <main id="main" className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd([['Home', '/'], ['Guides', '/guides'], [g.h1, url]]))} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faq)} />}

      <header style={{ display: 'grid', gap: 20 }}>
        <nav aria-label="Breadcrumb" className="crumbs mono"><Link href="/">Home</Link><span aria-hidden>/</span><Link href="/guides">Guides</Link><span aria-hidden>/</span><span aria-current="page">{g.kicker.replace('Guide · ', '')}</span></nav>
        <span className="mono" style={{ color: 'var(--orange)' }}>{g.kicker}</span>
        <h1 className="display" style={{ fontSize: 'clamp(44px,7vw,112px)' }}>{g.h1}</h1>
        <p className="prose" style={{ fontSize: 'clamp(18px,1.6vw,22px)' }}>{g.intro}</p>
        <p className="mono" style={{ color: 'var(--steel)', margin: 0 }}>By {OPERATOR.name} · Updated <time dateTime={g.updated}>{fmt(g.updated)}</time></p>
      </header>

      <figure style={{ margin: 0 }}>
        <div className="photo" style={{ aspectRatio: '21/9', minHeight: 220 }}>
          <Image src={img(g.img)} alt={g.imgAlt} fill priority sizes="(max-width:1280px) 100vw, 1280px" />
        </div>
      </figure>

      <div className="guide">
        <nav aria-label="On this page" className="guide-toc mono">
          <span style={{ color: 'var(--steel)' }}>On this page</span>
          {g.sections.map(s => <a key={s.id} href={'#' + s.id}>{s.h2}</a>)}
        </nav>
        <article className="guide-body">
          {g.sections.map(s => (
            <section key={s.id} id={s.id} aria-labelledby={s.id + '-h'} className="guide-section">
              <h2 id={s.id + '-h'} className="guide-h2">{s.h2}</h2>
              <Blocks blocks={s.blocks} />
            </section>
          ))}
          {g.faqs.length > 0 && (
            <section aria-labelledby="guide-faq" className="faq guide-section">
              <h2 id="guide-faq" className="guide-h2">Quick answers</h2>
              {g.faqs.map(f => <details key={f.q}><summary>{f.q}</summary><p className="prose">{f.a}</p></details>)}
            </section>
          )}
        </article>
      </div>

      <TrustStrip />

      <section aria-label="Next steps" style={{ background: 'var(--ti)', padding: 'clamp(28px,5vw,56px)', display: 'grid', gap: 18 }}>
        <h2 className="display" style={{ fontSize: 'clamp(36px,4vw,64px)' }}>Ready to ride Bhutan?</h2>
        <p className="prose">Tell us your dates and the passes you want. We reply with an itemised quote: SDF, visa, land cost and fuel estimate.</p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/plan-your-ride" className="btn btn-orange">Plan your ride →</Link>
          <Link href="/motorcycle-tours" className="btn btn-ghost">See the tours</Link>
        </div>
      </section>

      {related.length > 0 && (
        <nav aria-label="Related guides" style={{ display: 'grid', gap: 12 }}>
          <span className="mono" style={{ color: 'var(--steel)' }}>Keep reading</span>
          {related.map(r => <Link key={r.slug} href={`/guides/${r.slug}`} className="display" style={{ fontSize: 'clamp(28px,3.4vw,48px)', textDecoration: 'none' }}>{r.h1} →</Link>)}
        </nav>
      )}
    </main>
  );
}
