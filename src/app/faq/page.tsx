import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQS } from '@/lib/faq';
import { breadcrumbLd, jsonLd } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Bhutan Motorcycle Tour FAQ: Licence, SDF Fee, Guides & Best Season',
  description: 'Answers for riders planning a Bhutan motorcycle tour: licence and permit rules, the Sustainable Development Fee, guides, road conditions, altitude and the best months to ride.',
  alternates: { canonical: '/faq' },
};

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Page() {
  return (
    <main id="main" className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(FAQ_LD)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd([['Home', '/'], ['FAQ', '/faq']]))} />
      <div style={{ display: 'grid', gap: 20 }}>
        <nav aria-label="Breadcrumb" className="crumbs mono"><Link href="/">Home</Link><span aria-hidden>/</span><span aria-current="page">FAQ</span></nav>
        <h1 className="display" style={{ fontSize: 'clamp(48px,8vw,128px)' }}>Bhutan motorcycle tour FAQ</h1>
        <p className="prose">What riders ask before booking a motorcycle tour in Bhutan. Government fees and entry rules change from time to time, so treat these as a starting point and confirm the details when you plan your ride.</p>
      </div>
      <section aria-label="Questions" className="faq">
        {FAQS.map((f, i) => (
          <details key={f.q} open={i === 0}><summary>{f.q}</summary><p className="prose">{f.a}</p></details>
        ))}
      </section>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <Link href="/motorcycle-tours" className="btn btn-ice">See the tours</Link>
        <Link href="/plan-your-ride" className="btn btn-orange">Plan your ride →</Link>
      </div>
    </main>
  );
}
