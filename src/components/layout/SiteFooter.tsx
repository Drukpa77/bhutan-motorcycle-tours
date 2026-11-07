import Link from 'next/link';
import { CONTACT, OPERATOR, TOURS } from '@/lib/content';
import { GUIDES } from '@/lib/guides';
import { POSTS } from '@/lib/posts';
import HideOnRideMode from './HideOnRideMode';

const SOCIAL: [string, string][] = ([
  ['Facebook', OPERATOR.social.facebook],
  ['Instagram', OPERATOR.social.instagram],
  ['YouTube', OPERATOR.social.youtube],
  ['X', OPERATOR.social.x],
  ['Tripadvisor', OPERATOR.tripadvisor],
] as [string, string][]).filter(([, u]) => u);

const short = (t: string) => t.split(':')[0].replace(/ \(.*\)$/, '');

export default function SiteFooter() {
  return (
    <HideOnRideMode>
    <footer className="sitefoot">
      <nav aria-label="Footer" className="foot-cols">
        <div>
          <span className="mono">Tours</span>
          <Link href="/motorcycle-tours">All Bhutan motorcycle tours</Link>
          {TOURS.map(t => <Link key={t.slug} href={`/motorcycle-tours/${t.path}`}>{t.title}</Link>)}
          <Link href="/plan-your-ride">Plan a private tour</Link>
        </div>
        <div>
          <span className="mono">Guides</span>
          {GUIDES.map(g => <Link key={g.slug} href={`/guides/${g.slug}`}>{short(g.title)}</Link>)}
          <Link href="/faq">Rider FAQ</Link>
          <Link href="/explore-bhutan">Route map</Link>
          <Link href="/ride-mode">Ride mode</Link>
        </div>
        <div>
          <span className="mono">Blog</span>
          {POSTS.slice(0, 4).map(p => <Link key={p.slug} href={`/blog/${p.slug}`}>{p.h1}</Link>)}
          <Link href="/blog">All posts →</Link>
        </div>
        <div>
          <span className="mono">Operated by</span>
          <a href={OPERATOR.motorcyclePage} target="_blank" rel="noopener">{OPERATOR.name}</a>
          <a href={OPERATOR.licenceUrl} target="_blank" rel="noopener noreferrer">Department of Tourism licence ↗</a>
          <span>{CONTACT.address.slice(2, 4).join(', ')}</span>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={'mailto:' + CONTACT.emails[0]}>{CONTACT.emails[0]}</a>
        </div>
        <div>
          <span className="mono">Follow</span>
          {SOCIAL.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer me">{n} ↗</a>)}
        </div>
      </nav>
      <p className="mono" style={{ color: 'var(--steel)', margin: 0, fontSize: 10 }}>© {new Date().getFullYear()} Bhutan Motorcycle Tours · a {OPERATOR.name} brand</p>
    </footer>
    </HideOnRideMode>
  );
}
