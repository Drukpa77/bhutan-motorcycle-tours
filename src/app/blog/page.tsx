import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { img } from '@/lib/content';
import { POSTS, readingMinutes, type Post } from '@/lib/posts';
import { breadcrumbLd, jsonLd, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Bhutan Motorcycle Blog: Routes, Riding & Planning' },
  description: 'Stories and practical advice from the team that runs Bhutan motorcycle tours: passes and routes, riding from India, packing lists and life on the road.',
  alternates: { canonical: '/blog' },
};

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const Meta = ({ p }: { p: Post }) => (
  <span className="mono" style={{ color: 'var(--steel)' }}><span style={{ color: 'var(--orange)' }}>{p.category}</span> · <time dateTime={p.published}>{fmt(p.published)}</time> · {readingMinutes(p)} min read</span>
);

const LIST = {
  '@context': 'https://schema.org', '@type': 'Blog', name: 'Bhutan Motorcycle Tours blog', url: siteUrl() + '/blog',
  blogPost: POSTS.map(p => ({ '@type': 'BlogPosting', headline: p.h1, url: `${siteUrl()}/blog/${p.slug}`, datePublished: p.published, image: siteUrl() + img(p.cover) })),
};

export default function Page() {
  const [lead, ...rest] = POSTS;
  return (
    <main id="main" className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(LIST)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd([['Home', '/'], ['Blog', '/blog']]))} />
      <div style={{ display: 'grid', gap: 20 }}>
        <nav aria-label="Breadcrumb" className="crumbs mono"><Link href="/">Home</Link><span aria-hidden>/</span><span aria-current="page">Blog</span></nav>
        <h1 className="display" style={{ fontSize: 'clamp(56px,10vw,160px)' }}>From the road</h1>
        <p className="prose">Routes, passes and practical advice from the team that runs our Bhutan motorcycle tours.</p>
      </div>

      {lead && (
        <Link href={`/blog/${lead.slug}`} className="post-lead">
          <div className="photo zoom">
            <Image src={img(lead.cover)} alt={lead.coverAlt} fill priority sizes="(max-width:860px) 100vw, 1280px" style={{ objectFit: 'cover' }} />
          </div>
          <div className="post-lead-text">
            <Meta p={lead} />
            <h2 className="display" style={{ fontSize: 'clamp(40px,5.5vw,88px)' }}>{lead.h1}</h2>
            <p className="prose">{lead.standfirst}</p>
            <span className="mono" style={{ color: 'var(--ice)' }}>Read the story →</span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <section aria-label="More posts" className="post-grid">
          {rest.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card reveal">
              <div className="photo zoom" style={{ aspectRatio: '4/3' }}>
                <Image src={img(p.cover)} alt={p.coverAlt} fill sizes="(max-width:860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
              <Meta p={p} />
              <h2 className="display" style={{ fontSize: 'clamp(30px,3.4vw,52px)' }}>{p.h1}</h2>
              <p className="prose" style={{ fontSize: 16 }}>{p.description}</p>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
