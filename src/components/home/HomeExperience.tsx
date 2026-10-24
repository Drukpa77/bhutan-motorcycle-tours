'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CHAPTERS, PARTS, PLACES, SKETCHFAB_CREDIT, SKETCHFAB_ID, TOURS, VIDEO, img } from '@/lib/content';

const M = { fontFamily: 'var(--font-mono)' } as const;
const ELEV = ['paro', 'thimphu', 'dochula', 'punakha', 'phob', 'pele', 'trongsa', 'yotong', 'bumthang'].map(k => PLACES[k].elev);
const proj = ([la, lo]: [number, number]) => [Math.round(((lo - 89.2) / 1.65) * 280 + 10), Math.round(((27.65 - la) / 0.32) * 120 + 8)];
const MISSIONS = [...TOURS.map(t => ({ ...t, href: '/motorcycle-tours/' + t.path, cta: 'View route' })),
  { slug: 'custom', code: 'E-00', name: 'Your own line', status: 'Private / custom', summary: 'Your dates, your pace, your passes. Configure an expedition and the operator will quote it individually.', stops: ['paro', 'thimphu', 'punakha', 'phob'], high: 'You decide', img: 'places/phobjikha.jpg', href: '/plan-your-ride', cta: 'Configure' }];

function Ignition({ onDone }: { onDone: () => void }) {
  const [lit, setLit] = useState(false), [go, setGo] = useState(false);
  const finish = (instant: boolean) => { sessionStorage.setItem('bmt-ignited', '1'); if (instant) return onDone(); setGo(true); setTimeout(onDone, 1300); };
  useEffect(() => {
    const t = setTimeout(() => setLit(true), 400);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') finish(true); };
    addEventListener('keydown', onKey);
    return () => { clearTimeout(t); document.body.style.overflow = prev; removeEventListener('keydown', onKey); };
  }, []);
  return (
    <div role="dialog" aria-modal="true" aria-label="Ignition intro" style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#030405', overflow: 'hidden', opacity: go ? 0 : 1, transition: 'opacity 1.1s cubic-bezier(.7,0,.2,1)' }}>
      <div style={{ position: 'absolute', inset: '-4%', background: `url('${img('bike/himalayan.jpg')}') center/cover`, filter: `grayscale(.6) contrast(1.25) brightness(${lit ? 0.9 : 0.15})`, transform: `scale(${go ? 3.2 : 1.04})`, transition: 'transform 1.4s cubic-bezier(.7,0,.2,1), filter 2.4s ease' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 40% 50% at 50% 50%, rgba(3,4,5,0) 0, rgba(3,4,5,.7) ${lit ? '70%' : '4%'}, #030405 ${lit ? '140%' : '12%'})`, transition: 'all 2.6s cubic-bezier(.2,.7,.2,1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,rgba(255,255,255,.025) 0 1px,transparent 1px 3px)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: 'var(--lime)', opacity: 0.5, animation: 'scan 3.2s linear infinite' }} />
      <div className="mono" style={{ position: 'absolute', top: 28, left: 'var(--pad)', right: 'var(--pad)', display: 'flex', justifyContent: 'space-between', gap: 16, color: 'var(--steel)' }}>
        <span>BMT // Expedition System</span><span aria-live="polite"><span aria-hidden style={{ color: 'var(--lime)', animation: 'blink 1.4s infinite' }}>●</span> {lit ? 'Systems ready' : 'Ignition'}</span>
      </div>
      <div className="stack" style={{ position: 'absolute', left: 'var(--pad)', right: 'var(--pad)', bottom: 40, gridTemplateColumns: 'minmax(0,1fr) auto', gap: 32, alignItems: 'end' }}>
        <div>
          <div className="mono" style={{ color: 'var(--orange)', fontSize: 12 }}>Expedition system // Bhutan</div>
          <div className="display" style={{ fontSize: 'clamp(44px,min(11vw,18vh),180px)', marginTop: 12 }}>Bhutan<br />Motorcycle Tours</div>
        </div>
        <div className="end-m-start" style={{ display: 'grid', gap: 12 }}>
          <button autoFocus className="btn btn-orange" style={{ padding: '22px 30px', fontSize: 18 }} onClick={() => finish(false)}>Start the journey <span aria-hidden>→</span></button>
          <button className="mono" onClick={() => finish(true)} style={{ background: 'none', border: 0, color: 'var(--steel)', cursor: 'pointer', minHeight: 44 }}>Skip intro ↓</button>
        </div>
      </div>
    </div>
  );
}

export default function HomeExperience() {
  const [intro, setIntro] = useState(false);
  const [paused, setPaused] = useState(false);
  const [p, setP] = useState(0);
  const [mi, setMi] = useState(0);
  const [pi, setPi] = useState(0);
  const [fine, setFine] = useState(true);
  const hero = useRef<HTMLVideoElement>(null), ride = useRef<HTMLVideoElement>(null), rideSec = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIntro(!sessionStorage.getItem('bmt-ignited') && !reduce);
    setFine(matchMedia('(pointer:fine)').matches);
  }, []);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, cur = -1, target = 0;
    const measure = () => {
      const el = rideSec.current; if (!el) return;
      const r = el.getBoundingClientRect();
      target = Math.min(1, Math.max(0, -r.top / (el.offsetHeight - innerHeight)));
    };
    const tick = () => {
      raf = 0;
      const diff = target - cur;
      cur = reduce || cur < 0 || Math.abs(diff) < 0.0005 ? target : cur + diff * 0.14;
      setP(cur);
      const v = ride.current;
      if (v && fine && v.duration && !v.seeking) { const t = cur * (v.duration - 0.1); if (Math.abs(v.currentTime - t) > 0.04) v.currentTime = t; }
      if (cur !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => { measure(); if (!raf) raf = requestAnimationFrame(tick); };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [fine]);

  const ci = Math.min(4, Math.floor(p * 5)), ch = CHAPTERS[ci], cp = PLACES[ch.place];
  const layer = (j: number) => Math.min(1, Math.max(0, (0.85 - Math.abs(p * 5 - (j + 0.5))) / 0.5));
  const prof = ELEV.map((e, i) => [(i / (ELEV.length - 1)) * 1000, 115 - ((e - 1000) / 2600) * 110]);
  const profD = 'M' + prof.map(q => q.join(',')).join(' L');
  const mission = MISSIONS[mi], pts = mission.stops.map(k => proj(PLACES[k].ll));

  const toggle = () => { const v = hero.current; if (!v) return; if (v.paused) { v.play(); setPaused(false); } else { v.pause(); setPaused(true); } };

  return (
    <main id="main">
      {intro && <Ignition onDone={() => setIntro(false)} />}

      <section aria-label="Ride hero" className="screen" style={{ position: 'relative', minHeight: 520, overflow: 'hidden', background: '#000' }}>
        <video ref={hero} className="cover" autoPlay muted loop playsInline preload="auto" poster={img('places/dochula-wide.jpg')} aria-hidden style={{ filter: 'saturate(.75) contrast(1.1) brightness(.8)' }}>
          <source src={VIDEO.hero} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(8,11,13,.55) 0%,rgba(8,11,13,0) 30%,rgba(8,11,13,0) 55%,#080B0D 100%)' }} />
        <div className="mono hud hide-m" style={{ position: 'absolute', top: 88, left: 'var(--pad)', display: 'grid', gap: 6 }}>
          <span><span style={{ color: 'var(--steel)' }}>Route //</span> Himalayan expedition</span>
          <span><span style={{ color: 'var(--steel)' }}>Location //</span> Bhutan</span>
          <span><span style={{ color: 'var(--steel)' }}>Mode //</span> <span style={{ color: 'var(--lime)' }}>Explore</span></span>
        </div>
        <div className="stack" style={{ position: 'absolute', left: 'var(--pad)', right: 'var(--pad)', bottom: 'clamp(20px,4vh,36px)', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 24, alignItems: 'end' }}>
          <div>
            <h1 className="display" style={{ fontSize: 'clamp(44px,min(16vw,22vh),260px)', lineHeight: 0.78 }}><span className="mono" style={{ display: 'block', fontSize: 12, lineHeight: 1.4, color: 'var(--orange)', marginBottom: 'clamp(12px,2vh,20px)' }}>Bhutan Motorcycle Tours</span>The road<br /><span style={{ WebkitTextStroke: '2px var(--ice)', color: 'transparent' }}>is calling.</span></h1>
            <div style={{ display: 'flex', gap: '14px 28px', alignItems: 'center', flexWrap: 'wrap', marginTop: 'clamp(16px,3vh,28px)' }}>
              <p style={{ margin: 0, fontWeight: 200, fontSize: 'clamp(18px,1.8vw,24px)', flexBasis: 'auto' }}>Ride beyond the ordinary.</p>
              <a href="#missions" className="btn btn-ice">Explore expeditions</a>
              <Link href="/plan-your-ride" className="btn btn-ghost">Build your ride →</Link>
            </div>
          </div>
          <div className="mono end-m-start" style={{ display: 'grid', gap: 10, color: 'var(--steel)', fontSize: 10 }}>
            <button onClick={toggle} aria-label={paused ? 'Play video' : 'Pause video'} style={{ background: 'rgba(8,11,13,.5)', border: '1px solid rgba(244,246,246,.3)', color: 'var(--ice)', width: 48, height: 48, cursor: 'pointer' }}>{paused ? '▶' : '❚❚'}</button>
            <span>Footage: Mixkit · temporary · not Bhutan</span>
          </div>
        </div>
      </section>

      <section ref={rideSec} aria-label="Scroll-controlled ride" style={{ position: 'relative', height: '420vh' }}>
        <div className="screen" style={{ position: 'sticky', top: 0, overflow: 'hidden' }}>
          <video ref={ride} aria-hidden className="cover" muted playsInline preload="auto" loop={!fine} autoPlay={!fine} poster={img('places/paro.jpg')} style={{ filter: 'grayscale(.35) contrast(1.15) brightness(.55)', transform: `scale(${1 + p * 0.15})`, willChange: 'transform' }}>
            <source src={VIDEO.pov} type="video/mp4" />
          </video>
          {CHAPTERS.map((c, j) => (
            <div key={c.place} aria-hidden style={{ position: 'absolute', inset: 0, background: `url('${img(PLACES[c.place].img)}') center/cover`, opacity: layer(j) * 0.55, mixBlendMode: 'luminosity', willChange: 'opacity' }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%,rgba(8,11,13,0),rgba(8,11,13,.85))' }} />
          <div aria-hidden className="display" style={{ position: 'absolute', top: '50%', left: 0, whiteSpace: 'nowrap', transform: `translate3d(${-p * 70}%,-50%,0)`, willChange: 'transform', fontSize: 'clamp(120px,26vw,420px)', color: 'transparent', WebkitTextStroke: '1px rgba(244,246,246,.35)' }}>Paro · Thimphu · Dochula · Punakha · Phobjikha · Pele La · Trongsa · Yotong La · Bumthang</div>
          <div className="ride-overlay">
            <div key={ci} aria-live="polite" style={{ display: 'grid', gap: 8, maxWidth: 420, animation: 'chapterIn .6s cubic-bezier(.2,.7,.2,1) both' }}>
              <span className="mono" style={{ color: 'var(--lime)' }}>Chapter 0{ci + 1} / 05</span>
              <h2 className="display" style={{ fontSize: 'clamp(40px,min(7vw,12vh),104px)' }}>{cp.name}</h2>
              <span style={{ ...M, fontSize: 14, color: 'var(--orange)' }}>{cp.elev.toLocaleString()} m · {ch.kind.toLowerCase()}</span>
              <p className="ride-note" style={{ margin: 0, fontWeight: 300, fontSize: 17, lineHeight: 1.55, color: '#c7cdcf' }}>{ch.note}</p>
            </div>
            <div>
              <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="ride-profile" role="img" aria-label="Approximate altitude profile, Paro to Bumthang">
                <path d={profD} fill="none" stroke="rgba(244,246,246,.25)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                <path d={profD} fill="none" stroke="#FF5A1F" strokeWidth={2.5} vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
                <line x1={p * 1000} x2={p * 1000} y1={0} y2={120} stroke="#CEFF45" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, color: 'var(--steel)', fontSize: 10 }}>
                <span>Paro 2,200 m</span><span className="hide-m">Approx. public elevations · stops evenly spaced</span><span>Bumthang 2,600 m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="machine" aria-labelledby="machine-title" className="stack machine min-screen">
        <div className="machine-view">
          <iframe title={`${SKETCHFAB_CREDIT.title} 3D scan by ${SKETCHFAB_CREDIT.author} (${SKETCHFAB_CREDIT.license}), Sketchfab`} src={`https://sketchfab.com/models/${SKETCHFAB_ID}/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=2&dnt=1&transparent=1`} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span className="mono" style={{ color: 'var(--orange)' }}>Inspection // 3D</span>
          <h2 id="machine-title" className="display" style={{ fontSize: 'clamp(48px,6vw,96px)' }}>The<br />machine</h2>
          <div role="group" aria-label="Components" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
            {PARTS.map((x, i) => (
              <button key={x.code} aria-pressed={i === pi} onClick={() => setPi(i)} className="mono" style={{ background: i === pi ? 'var(--lime)' : '#0d1114', color: i === pi ? 'var(--ink)' : 'var(--ice)', border: 0, padding: 14, textAlign: 'left', cursor: 'pointer', minHeight: 48 }}>{x.code} {x.t}</button>
            ))}
          </div>
          <div aria-live="polite" style={{ borderLeft: '2px solid var(--lime)', padding: '4px 0 4px 16px', minHeight: 110 }}>
            <div style={{ fontStretch: '80%', fontWeight: 800, fontSize: 22, textTransform: 'uppercase' }}>{PARTS[pi].t}</div>
            <p style={{ margin: '8px 0 0', fontWeight: 300, lineHeight: 1.6, color: '#c7cdcf' }}>{PARTS[pi].d}</p>
          </div>
          <p style={{ ...M, margin: 'auto 0 0', fontSize: 10, lineHeight: 1.7, color: 'var(--steel)' }}>Illustrative 3D scan: <a href={SKETCHFAB_CREDIT.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>“{SKETCHFAB_CREDIT.title}”</a> by {SKETCHFAB_CREDIT.author}, <a href={SKETCHFAB_CREDIT.licenseUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{SKETCHFAB_CREDIT.license}</a>, via Sketchfab. The operator’s fleet is unconfirmed.</p>
        </div>
      </section>

      <section id="missions" aria-label="Choose an expedition" className="missions">
        {MISSIONS.map((m, i) => (
          <div key={m.slug} aria-hidden style={{ position: 'absolute', inset: 0, background: `url('${img(m.img)}') center/cover`, opacity: i === mi ? 1 : 0, transform: `scale(${i === mi ? 1 : 1.08})`, transition: 'opacity 1s ease, transform 6s cubic-bezier(.2,.7,.2,1)', filter: 'saturate(.7) brightness(.6)' }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(8,11,13,.92) 0,rgba(8,11,13,.4) 50%,rgba(8,11,13,.85) 100%)' }} />
        <div className="stack missions-inner">
          <div aria-live="polite" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 18 }}>
            <span className="mono" style={{ color: 'var(--lime)' }}>Expedition {mission.code} // {mission.status}</span>
            <h2 className="display" style={{ fontSize: 'clamp(48px,min(12vw,20vh),200px)', lineHeight: 0.8 }}>{mission.name}</h2>
            <p style={{ margin: 0, maxWidth: '52ch', fontWeight: 300, fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.55, color: '#d6dbdc' }}>{mission.summary}</p>
            <div className="mono" style={{ display: 'flex', gap: 28, flexWrap: 'wrap', fontSize: 12 }}>
              <span><span style={{ color: 'var(--steel)' }}>Stops</span> {mission.stops.length}</span><span><span style={{ color: 'var(--steel)' }}>High point</span> {mission.high}</span><span><span style={{ color: 'var(--steel)' }}>Duration</span> TBC</span><span><span style={{ color: 'var(--steel)' }}>Price</span> Custom quote</span>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href={mission.href} className="btn btn-orange">{mission.cta} →</Link>
              <Link href="/plan-your-ride" className="btn btn-ghost">Configure</Link>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
            <svg viewBox="0 0 300 150" className="hide-m" style={{ width: '100%', maxWidth: 340, alignSelf: 'flex-end', border: '1px solid rgba(244,246,246,.18)', background: 'rgba(8,11,13,.5)' }} role="img" aria-label="Route preview, approximate connections">
              <polyline points={pts.map(q => q.join(',')).join(' ')} fill="none" stroke="#FF5A1F" strokeWidth={2} strokeDasharray="3 4" />
              {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill="#F4F6F6" />)}
              <text x={8} y={142} fill="#738087" fontFamily="var(--font-mono)" fontSize={8} letterSpacing={1}>APPROX. CONNECTIONS · REAL COORDINATES</text>
            </svg>
            <div role="group" aria-label="Expeditions" style={{ display: 'grid', gap: 1, background: 'rgba(244,246,246,.15)' }}>
              {MISSIONS.map((m, i) => (
                <button key={m.slug} aria-pressed={i === mi} onClick={() => setMi(i)} style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 10, alignItems: 'center', textAlign: 'left', background: i === mi ? 'rgba(244,246,246,.12)' : 'rgba(8,11,13,.75)', color: 'var(--ice)', border: 0, padding: 16, cursor: 'pointer', minHeight: 56 }}>
                  <span className="mono" style={{ color: i === mi ? 'var(--orange)' : 'var(--steel)' }}>{m.code}</span>
                  <span style={{ fontStretch: '75%', fontWeight: 800, fontSize: 20, textTransform: 'uppercase' }}>{m.name}</span>
                  <span aria-hidden style={{ width: 28, height: 2, background: i === mi ? 'var(--orange)' : 'var(--steel)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-title" className="page" style={{ paddingTop: 'clamp(56px,8vw,96px)', paddingBottom: 'clamp(56px,8vw,96px)' }}>
        <div style={{ display: 'grid', gap: 20 }}>
          <span className="mono" style={{ color: 'var(--orange)' }}>Guided motorcycle tours in Bhutan</span>
          <h2 id="about-title" className="display" style={{ fontSize: 'clamp(40px,5vw,80px)' }}>Ride the Kingdom<br />of the Thunder Dragon</h2>
          <p className="prose">Bhutan is one of the last great motorcycle roads in the Himalaya: a single winding lateral highway that climbs from river valleys at 1,200 m to passes near 4,000 m, past cliffside monasteries, fortress dzongs and prayer-flag ridges. Our guided Bhutan motorcycle tours start in Paro and follow that road over Chele La, Dochula, Pele La and Yotong La to the temples of Bumthang, or go wherever your own route takes you.</p>
        </div>
        <ul className="cards" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {TOURS.map(t => (
            <li key={t.slug} style={{ background: 'var(--ink)', padding: 24, display: 'grid', gap: 12 }}>
              <span className="mono" style={{ color: 'var(--steel)' }}>{t.code} · High point {t.high}</span>
              <h3 className="display" style={{ fontSize: 'clamp(28px,3vw,44px)' }}><Link href={'/motorcycle-tours/' + t.path} style={{ textDecoration: 'none' }}>{t.name} →</Link></h3>
              <p className="prose" style={{ fontSize: 16 }}>{t.summary}</p>
            </li>
          ))}
          <li style={{ background: 'var(--ink)', padding: 24, display: 'grid', gap: 12 }}>
            <span className="mono" style={{ color: 'var(--steel)' }}>Licence · SDF fee · Best season</span>
            <h3 className="display" style={{ fontSize: 'clamp(28px,3vw,44px)' }}><Link href="/faq" style={{ textDecoration: 'none' }}>Rider FAQ →</Link></h3>
            <p className="prose" style={{ fontSize: 16 }}>What you need to know before riding in Bhutan: licences, guides, the Sustainable Development Fee and when to go.</p>
          </li>
        </ul>
      </section>

      <section aria-label="Terrain" className="stack stats">
        <Link href="/explore-bhutan" style={{ padding: 'clamp(36px,6vw,56px) var(--pad)', textDecoration: 'none', display: 'grid', gap: 14, background: 'var(--ti)' }}>
          <span className="mono" style={{ color: 'var(--lime)' }}>Terrain system</span>
          <span className="display" style={{ fontSize: 'clamp(48px,6vw,96px)' }}>Trace the route<br />on the real map →</span>
        </Link>
        {[{ n: 'Chele La', e: '3,988', t: 'Highest stop · m' }, { n: 'Punakha', e: '1,250', t: 'Lowest stop · m' }].map(x => (
          <div key={x.n} style={{ padding: 'clamp(28px,6vw,56px) var(--pad)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
            <span className="mono" style={{ color: 'var(--steel)' }}>{x.t}</span>
            <span><span className="display" style={{ display: 'block', fontSize: 'clamp(44px,6vw,104px)' }}>{x.e}</span><span className="mono" style={{ color: 'var(--orange)', fontSize: 12 }}>{x.n}</span></span>
          </div>
        ))}
      </section>

      <section aria-label="Finale" className="screen" style={{ position: 'relative', minHeight: 480, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <video aria-hidden className="cover" autoPlay muted loop playsInline preload="none" poster={img('places/phobjikha-valley.jpg')} style={{ filter: 'grayscale(.5) brightness(.5) contrast(1.2)' }}>
          <source src={VIDEO.pov} type="video/mp4" />
        </video>
        <div style={{ position: 'relative', padding: '0 var(--pad) 40px', display: 'grid', gap: 28, width: '100%' }}>
          <h2 className="display" style={{ fontSize: 'clamp(40px,min(11vw,16vh),190px)', lineHeight: 0.8 }}>This is not a tour.<br /><span style={{ color: 'var(--orange)' }}>This is your next adventure.</span></h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap', borderTop: '1px solid rgba(244,246,246,.25)', paddingTop: 20 }}>
            <Link href="/plan-your-ride" className="btn" style={{ background: 'var(--lime)', color: 'var(--ink)', padding: '20px 28px', fontSize: 16 }}>Initiate your expedition →</Link>
            <span className="mono" style={{ fontSize: 10, color: 'var(--steel)' }}>Contact details awaiting verification · Photos: Wikimedia Commons · Map © OpenStreetMap</span>
          </div>
        </div>
      </section>
    </main>
  );
}
