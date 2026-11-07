import { OPERATOR } from '@/lib/content';
import { jsonLd, siteUrl } from '@/lib/site';
import { REVIEWS, VIDEO_TESTIMONIALS, type Review } from '@/lib/testimonials';
import VideoCard, { ytPoster } from './VideoCard';

const byTour = <T extends { tour?: string }>(list: T[], tour?: string) =>
  tour ? [...list.filter(x => x.tour === tour), ...list.filter(x => x.tour !== tour)] : list;

const Stars = ({ n }: { n: number }) => (
  <span role="img" aria-label={`${n} out of 5 stars`} style={{ color: 'var(--orange)', letterSpacing: 2 }}>{'★'.repeat(n)}<span style={{ color: 'var(--line)' }}>{'★'.repeat(5 - n)}</span></span>
);

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="rcard">
      <Stars n={r.rating} />
      <blockquote className="prose" style={{ margin: 0, fontSize: 16 }}>“{r.text}”</blockquote>
      <figcaption className="mono" style={{ color: 'var(--steel)', display: 'grid', gap: 6 }}>
        <span>{r.name}{r.country ? ' · ' + r.country : ''}</span>
        <span>
          {r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer">{r.source} review ↗</a> : r.source + ' review'}
          {' · '}<time dateTime={r.date}>{new Date(r.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</time>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Rider videos and reviews. With no entries yet it collapses to a compact "read our reviews" strip,
 * so pages are ready for testimonials without ever showing placeholders.
 */
export default function Testimonials({ tour, limit = 6 }: { tour?: string; limit?: number }) {
  const videos = byTour(VIDEO_TESTIMONIALS, tour).slice(0, 3);
  const reviews = byTour(REVIEWS, tour).slice(0, limit);
  const has = videos.length + reviews.length > 0;

  const videoLd = videos.map(v => ({
    '@context': 'https://schema.org', '@type': 'VideoObject',
    name: v.title, description: v.quote || `${v.name} on riding Bhutan with ${OPERATOR.name}.`,
    thumbnailUrl: v.poster ? (v.poster.startsWith('/') ? siteUrl() + v.poster : v.poster) : v.youtubeId ? ytPoster(v.youtubeId) : undefined,
    uploadDate: v.uploadDate, duration: v.duration,
    ...(v.youtubeId ? { embedUrl: `https://www.youtube.com/embed/${v.youtubeId}` } : { contentUrl: siteUrl() + v.src }),
  }));

  const links = (
    <p className="mono" style={{ margin: 0, display: 'flex', gap: '12px 24px', flexWrap: 'wrap', color: 'var(--steel)' }}>
      <span>{OPERATOR.award}</span>
      <a href={OPERATOR.tripadvisor} target="_blank" rel="noopener noreferrer">Read our Tripadvisor reviews ↗</a>
      {OPERATOR.googleReviews && <a href={OPERATOR.googleReviews} target="_blank" rel="noopener noreferrer">Google reviews ↗</a>}
    </p>
  );

  if (!has) return <section aria-label="Reviews" className="review-strip">{links}</section>;

  return (
    <section aria-labelledby="riders-title" style={{ display: 'grid', gap: 28 }}>
      {videoLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(d)} />)}
      <div style={{ display: 'grid', gap: 12 }}>
        <span className="mono" style={{ color: 'var(--orange)' }}>Riders on the road</span>
        <h2 id="riders-title" className="display" style={{ fontSize: 'clamp(36px,4vw,64px)' }}>In their words</h2>
      </div>
      {videos.length > 0 && <div className="vgrid">{videos.map((v, i) => <VideoCard key={i} v={v} />)}</div>}
      {reviews.length > 0 && <div className="cards">{reviews.map((r, i) => <ReviewCard key={i} r={r} />)}</div>}
      {links}
    </section>
  );
}
