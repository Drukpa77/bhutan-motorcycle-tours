'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CHAPTERS, PLACES, VIDEO, img } from '@/lib/content';

export default function RideMode() {
  const [i, setI] = useState(0), [t, setT] = useState(0), [paused, setPaused] = useState(false), [canFs, setCanFs] = useState(false);
  const vid = useRef<HTMLVideoElement>(null), root = useRef<HTMLElement>(null);
  useEffect(() => {
    setCanFs(!!document.fullscreenEnabled);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setPaused(true); vid.current?.pause(); }
  }, []);
  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => setT(x => { if (x + 0.01 >= 1) { setI(n => (n + 1) % CHAPTERS.length); return 0; } return x + 0.01; }), 120);
    return () => clearInterval(iv);
  }, [paused]);
  const ch = CHAPTERS[i], pl = PLACES[ch.place];
  const toggle = () => { const v = vid.current; const p = !paused; setPaused(p); if (v) p ? v.pause() : v.play(); };
  const fs = () => { if (!document.fullscreenElement) root.current?.requestFullscreen?.(); else document.exitFullscreen(); };
  return (
    <main id="main" ref={root} className="ridemode">
      <h1 className="sr-only">Ride mode</h1>
      <video ref={vid} aria-hidden className="cover" autoPlay muted loop playsInline poster={img('Dochu_La_Pass,_108_Druk_Wangyal_Chortens_(15818199106).jpg')} style={{ filter: 'saturate(.8) contrast(1.08)' }}>
        <source src={VIDEO.pov} type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: `url('${img(pl.img)}') center/cover`, opacity: t > 0.55 && t < 0.95 ? 0.9 : 0, transition: 'opacity 1.2s ease' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 45%,rgba(0,0,0,0),rgba(0,0,0,.75))', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', padding: '16px 24px 0', display: 'grid', gap: 8 }}>
        <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <span><span aria-hidden style={{ color: 'var(--orange)' }}>●</span> Ride mode<span className="hide-m"> · cinematic exploration</span></span>
          <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
            {canFs && <button onClick={fs} aria-label="Toggle full screen" className="mono" style={{ background: 'rgba(8,11,13,.55)', border: '1px solid rgba(244,246,246,.3)', color: 'var(--ice)', height: 44, padding: '0 14px', cursor: 'pointer' }}><span aria-hidden>⛶</span> Full</button>}
            <Link href="/" style={{ display: 'grid', placeItems: 'center', background: 'var(--ice)', color: 'var(--ink)', height: 44, padding: '0 16px', textDecoration: 'none' }}>Exit ✕</Link>
          </div>
        </div>
        <span className="mono" style={{ justifySelf: 'end', fontSize: 10, color: 'var(--steel)', textAlign: 'right', letterSpacing: '.1em' }}>Footage: Mixkit, temporary, not Bhutan.<br />No live telemetry.</span>
      </div>

      <div style={{ flex: 1 }} />

      <div className="ridemode-info" style={{ position: 'relative' }}>
        <div aria-live="polite" style={{ maxWidth: 'min(520px,100%)', display: 'grid', gap: 10 }}>
          <span className="mono" style={{ color: 'var(--lime)' }}>Chapter 0{i + 1} // {ch.kind}</span>
          <h2 className="display" style={{ fontSize: 'clamp(44px,min(9vw,14vh),140px)' }}>{pl.name}</h2>
          <p className="ride-note" style={{ margin: 0, fontWeight: 300, fontSize: 17, lineHeight: 1.5, color: '#dfe3e4' }}>{ch.note}</p>
          <Link href={'/explore-bhutan?tour=' + ch.tour} className="mono" style={{ justifySelf: 'start', borderBottom: '1px solid var(--orange)', padding: '14px 0', textDecoration: 'none' }}>Open on terrain map →</Link>
        </div>
        <div className="mono end-m-start" style={{ display: 'grid', gap: 4 }}>
          <span style={{ fontSize: 10, color: 'var(--steel)' }}>Elevation · approx.</span>
          <span className="display" style={{ fontFamily: 'var(--font-archivo)', fontSize: 'clamp(40px,min(6vw,11vh),88px)' }}>{pl.elev.toLocaleString()}<span style={{ fontSize: '.35em', color: 'var(--steel)' }}> m</span></span>
        </div>
      </div>

      <div style={{ position: 'relative', padding: '12px 24px 20px', background: 'linear-gradient(0deg,rgba(0,0,0,.85),rgba(0,0,0,0))', display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr)', gap: 16, alignItems: 'center' }}>
        <button onClick={toggle} aria-label={paused ? 'Play' : 'Pause'} style={{ width: 56, height: 56, background: 'var(--orange)', border: 0, color: 'var(--ink)', fontSize: 18, cursor: 'pointer' }}>{paused ? '▶' : '❚❚'}</button>
        <div role="group" aria-label="Chapters" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 6 }}>
          {CHAPTERS.map((c, j) => (
            <button key={c.place} aria-pressed={j === i} aria-label={`Chapter ${j + 1}: ${PLACES[c.place].name}`} onClick={() => { setI(j); setT(0); }} style={{ background: 'none', border: 0, color: j === i ? 'var(--ice)' : 'var(--steel)', textAlign: 'left', cursor: 'pointer', padding: '8px 0', display: 'grid', gap: 8, minHeight: 44 }}>
              <span aria-hidden style={{ height: 3, background: 'rgba(244,246,246,.2)', position: 'relative', overflow: 'hidden' }}><span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: j < i ? '100%' : j === i ? Math.round(t * 100) + '%' : '0%', background: j === i ? 'var(--orange)' : 'var(--ice)' }} /></span>
              <span aria-hidden className="mono" style={{ fontSize: 10, letterSpacing: '.08em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>0{j + 1}<span className="hide-m"> {PLACES[c.place].name}</span></span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
