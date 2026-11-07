import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Blocks } from '@/components/content/RichText';
import { OPERATOR, TOURS, img } from '@/lib/content';
import { POSTS, findPost, readingMinutes } from '@/lib/posts';
import { SITE_NAME, breadcrumbLd, jsonLd, siteUrl } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = findPost((await params).slug);
  if (!p) return {};
  const url = `/blog/${p.slug}`, image = { url: img(p.cover), alt: p.coverAlt };
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: url },
    openGraph: { type: 'article', siteName: SITE_NAME, locale: 'en_US', title: p.title, description: p.description, url, images: [image], publishedTime: p.published, modifiedTime: p.updated },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description, images: [image] },
  };
}

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function Page({ params }: Props) {
  const p = findPost((await params).slug);
  if (!p) notFound();
  const url = `/blog/${p.slug}`;
  const tours = p.tours.map(s => TOURS.find(t => t.slug === s)).filter(Boolean) as typeof TOURS;
  const more = POSTS.filter(x => x.slug !== p.slug).slice(0, 2);

  const article = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: p.h1, description: p.description, image: siteUrl() + img(p.cover),
    datePublished: p.published, dateModified: p.updated, mainEntityOfPage: siteUrl() + url, articleSection: p.category,
    author: { '@type': 'Organization', name: OPERATOR.name, url: OPERATOR.url },
    publisher: { '@id': siteUrl() + '/#org' },
  };
  const faq = p.faqs.length && {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: p.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd([['Home', '/'], ['Blog', '/blog'], [p.h1, url]]))} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faq)} />}
      <div className="read-progress" aria-hidden />

      <header className="post-hero">
        <Image src={img(p.cover)} alt={p.coverAlt} fill priority sizes="100vw" className="post-hero-img" />
        <div className="post-hero-shade" />
        <div className="post-hero-text">
          <nav aria-label="Breadcrumb" className="crumbs mono"><Link href="/">Home</Link><span aria-hidden>/</span><Link href="/blog">Blog</Link><span aria-hidden>/</span><span aria-current="page">{p.category}</span></nav>
          <h1 className="display" style={{ fontSize: 'clamp(44px,7.5vw,128px)' }}>{p.h1}</h1>
          <p className="mono" style={{ margin: 0, color: '#c7cdcf' }}>
            <span style={{ color: 'var(--orange)' }}>{p.category}</span> · <time dateTime={p.published}>{fmt(p.published)}</time> · {readingMinutes(p)} min read · By {OPERATOR.name}
          </p>
        </div>
        {p.coverCredit && <span className="mono credit post-hero-credit">Photo: {p.coverCredit} · Wikimedia Commons</span>}
      </header>

      <div className="page" style={{ paddingTop: 'clamp(40px,6vw,72px)' }}>
        <p className="post-standfirst">{p.standfirst}</p>

        <div className="guide">
          <nav aria-label="On this page" className="guide-toc mono">
            <span style={{ color: 'var(--steel)' }}>In this story</span>
            {p.sections.map(s => <a key={s.id} href={'#' + s.id}>{s.h2}</a>)}
          </nav>
          <article className="guide-body">
            {p.sections.map(s => (
              <section key={s.id} id={s.id} aria-labelledby={s.id + '-h'} className="guide-section">
                <h2 id={s.id + '-h'} className="guide-h2 reveal">{s.h2}</h2>
                <Blocks blocks={s.blocks} />
              </section>
            ))}
            {p.faqs.length > 0 && (
              <section aria-labelledby="post-faq" className="faq guide-section">
                <h2 id="post-faq" className="guide-h2">Quick answers</h2>
                {p.faqs.map(f => <details key={f.q}><summary>{f.q}</summary><p className="prose">{f.a}</p></details>)}
              </section>
            )}
          </article>
        </div>

        {tours.length > 0 && (
          <section aria-labelledby="ride-title" style={{ display: 'grid', gap: 20 }}>
            <h2 id="ride-title" className="display" style={{ fontSize: 'clamp(36px,4vw,64px)' }}>Ride it with us</h2>
            <div className="cards">
              {tours.map(t => (
                <Link key={t.slug} href={`/motorcycle-tours/${t.path}`} className="card reveal">
                  <div className="photo zoom" style={{ aspectRatio: '16/10' }}>
                    <Image src={img(t.img)} alt={t.imgAlt} fill sizes="(max-width:860px) 100vw, 50vw" />
                  </div>
                  <span className="mono" style={{ color: 'var(--orange)' }}>{t.code} · {t.days ? t.days + ' days' : 'Flexible length'}</span>
                  <h3 className="display" style={{ fontSize: 'clamp(30px,3.4vw,48px)' }}>{t.name}</h3>
                  <p className="prose" style={{ fontSize: 16 }}>{t.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {more.length > 0 && (
          <nav aria-label="More from the blog" style={{ display: 'grid', gap: 12 }}>
            <span className="mono" style={{ color: 'var(--steel)' }}>More from the road</span>
            {more.map(m => <Link key={m.slug} href={`/blog/${m.slug}`} className="display" style={{ fontSize: 'clamp(26px,3vw,44px)', textDecoration: 'none' }}>{m.h1} →</Link>)}
          </nav>
        )}
      </div>
    </main>
  );
}
