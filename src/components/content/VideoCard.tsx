'use client';
import { useState } from 'react';
import type { VideoTestimonial } from '@/lib/testimonials';

export const ytPoster = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Click-to-play: shows a poster only, so no YouTube scripts load until the visitor asks for the video. */
export default function VideoCard({ v }: { v: VideoTestimonial }) {
  const [on, setOn] = useState(false);
  const poster = v.poster || (v.youtubeId ? ytPoster(v.youtubeId) : undefined);
  const label = `Play video: ${v.title}${v.name ? ', ' + v.name : ''}`;
  return (
    <figure className="vcard">
      <div className="vcard-media">
        {on && v.youtubeId ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : on && v.src ? (
          <video src={v.src} poster={poster} controls autoPlay playsInline />
        ) : (
          <button className="vcard-play" onClick={() => setOn(true)} aria-label={label} style={poster ? { backgroundImage: `url('${poster}')` } : undefined}>
            <span aria-hidden className="vcard-icon">▶</span>
          </button>
        )}
      </div>
      <figcaption>
        {v.quote && <p className="prose" style={{ fontSize: 16 }}>“{v.quote}”</p>}
        <span className="mono" style={{ color: 'var(--steel)' }}>{v.name}{v.country ? ' · ' + v.country : ''}</span>
      </figcaption>
    </figure>
  );
}
