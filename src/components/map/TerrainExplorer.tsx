'use client';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import type * as Leaflet from 'leaflet';
import { PLACES, TOURS, haversine, img } from '@/lib/content';

export default function TerrainExplorer({ initialTour }: { initialTour?: string }) {
  const [ti, setTi] = useState(Math.max(0, TOURS.findIndex(t => t.slug === initialTour)));
  const [prog, setProg] = useState(0), [playing, setPlaying] = useState(false), [ready, setReady] = useState(false);
  const mapEl = useRef<HTMLDivElement>(null);
  const L = useRef<typeof Leaflet | null>(null), map = useRef<Leaflet.Map | null>(null);
  const layers = useRef<{ line?: Leaflet.Polyline; ghost?: Leaflet.Polyline; bike?: Leaflet.Marker }>({});
  const tour = TOURS[ti];
  const pts = useMemo(() => tour.stops.map(k => PLACES[k].ll), [tour]);
  const cum = useMemo(() => { const c = [0]; for (let i = 1; i < pts.length; i++) c.push(c[i - 1] + haversine(pts[i - 1], pts[i])); return c; }, [pts]);

  useEffect(() => {
    let alive = true;
    import('leaflet').then(mod => {
      if (!alive || !mapEl.current || map.current) return;
      L.current = mod;
      const touch = matchMedia('(pointer:coarse)').matches;
      const m = mod.map(mapEl.current, { scrollWheelZoom: false, dragging: !touch, keyboard: true }).setView([27.45, 90.1], 8);
      mod.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 14, attribution: '© OpenStreetMap contributors' }).addTo(m);
      Object.values(PLACES).forEach(p => mod.marker(p.ll, { title: p.name, icon: mod.divIcon({ className: '', html: `<div style="width:12px;height:12px;background:${p.pass ? '#080B0D' : '#F4F6F6'};border:2px solid ${p.pass ? '#F4F6F6' : '#080B0D'};${p.pass ? 'transform:rotate(45deg)' : 'border-radius:50%'}"></div>`, iconSize: [12, 12] }) }).addTo(m).bindTooltip(p.name + ' · ' + p.elev.toLocaleString() + ' m'));
      map.current = m; setReady(true);
    });
    return () => { alive = false; map.current?.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    const mod = L.current, m = map.current; if (!mod || !m) return;
    layers.current.line?.remove(); layers.current.ghost?.remove();
    layers.current.ghost = mod.polyline(pts, { color: '#FF5A1F', weight: 2, opacity: 0.45 }).addTo(m);
    layers.current.line = mod.polyline([], { color: '#CEFF45', weight: 3, dashArray: '2 8' }).addTo(m);
    if (!layers.current.bike) layers.current.bike = mod.marker(pts[0], { zIndexOffset: 1000, icon: mod.divIcon({ className: '', html: '<div style="width:28px;height:28px;border-radius:50%;background:#FF5A1F;border:2px solid #F4F6F6;box-shadow:0 0 0 6px rgba(255,90,31,.25)"></div>', iconSize: [28, 28] }) }).addTo(m);
    m.fitBounds(layers.current.ghost.getBounds(), { padding: [40, 40] });
    setProg(0);
  }, [pts, ready]);

  const tot = cum[cum.length - 1], d = prog * tot;
  let s = 0; while (s < pts.length - 2 && cum[s + 1] < d) s++;
  const seg = cum[s + 1] - cum[s], t = seg ? (d - cum[s]) / seg : 0;
  const a = pts[s], b = pts[s + 1];
  const pos: [number, number] = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const idx = t > 0.5 && s < pts.length - 1 ? s + 1 : s, here = PLACES[tour.stops[idx]];

  useEffect(() => { layers.current.line?.setLatLngs([...pts.slice(0, s + 1), pos]); layers.current.bike?.setLatLng(pos); });

  useEffect(() => {
    if (!playing) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setProg(1); setPlaying(false); return; }
    let raf = 0;
    const tick = () => { setProg(p => { const n = Math.min(1, p + 0.0016); if (n >= 1) setPlaying(false); return n; }); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [playing]);

  return (
    <div className="stack terrain">
      <div ref={mapEl} className="leaflet-dark terrain-map" role="region" aria-label="Map of Bhutan. Use the stop list for the same information." />
      <aside aria-label="Route controls" className="terrain-side">
        <div role="group" aria-label="Routes" style={{ display: 'flex', borderBottom: '1px solid var(--line)' }}>
          {TOURS.map((x, i) => <button key={x.slug} aria-pressed={i === ti} onClick={() => { setPlaying(false); setTi(i); }} style={{ flex: 1, background: 'none', border: 0, borderBottom: '2px solid ' + (i === ti ? 'var(--orange)' : 'transparent'), color: i === ti ? 'var(--ice)' : 'var(--steel)', padding: 16, minHeight: 52, fontStretch: '75%', fontWeight: 800, fontSize: 16, textTransform: 'uppercase', cursor: 'pointer' }}>{x.name}</button>)}
        </div>
        <div role="img" aria-label={here.name} style={{ height: 170, background: `#222 url('${img(here.img)}') center/cover`, position: 'relative' }}><span className="mono" style={{ position: 'absolute', left: 12, bottom: 10, fontSize: 10, letterSpacing: '.08em', background: 'rgba(0,0,0,.7)', padding: '3px 6px' }}>{here.credit}</span></div>
        <div aria-live="polite" style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 16, padding: '18px 20px', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 96, height: 96 }}>
            <svg aria-hidden width={96} height={96} viewBox="0 0 96 96" style={{ transform: 'rotate(-90deg)' }}><circle cx={48} cy={48} r={42} fill="none" stroke="#1b2227" strokeWidth={6} /><circle cx={48} cy={48} r={42} fill="none" stroke="#FF5A1F" strokeWidth={6} strokeDasharray={263.9} strokeDashoffset={263.9 * (1 - prog)} /></svg>
            <b className="display" aria-label={`Stop ${idx + 1} of ${pts.length}`} style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 30 }}>{String(idx + 1).padStart(2, '0')}</b>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 14px' }}>
            <div style={{ gridColumn: '1/-1' }}><span className="mono" style={{ color: 'var(--steel)' }}>Now at</span><b style={{ display: 'block', fontSize: 22, fontStretch: '75%', textTransform: 'uppercase' }}>{here.name}</b></div>
            <div><span className="mono" style={{ color: 'var(--steel)' }}>Elev.*</span><b style={{ display: 'block', fontSize: 20 }}>{here.elev.toLocaleString()} m</b></div>
            <div><span className="mono" style={{ color: 'var(--steel)' }}>Leg, straight</span><b style={{ display: 'block', fontSize: 20 }}>{idx ? Math.round(haversine(pts[idx - 1], pts[idx])) + ' km' : 'Start'}</b></div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--line)' }}>
          <button className="btn btn-orange" style={{ padding: '10px 14px', flex: 'none' }} onClick={() => { if (prog >= 1) setProg(0); setPlaying(p => !p); }}>{playing ? 'Pause ❚❚' : 'Play ▸'}</button>
          <input type="range" min={0} max={1000} value={Math.round(prog * 1000)} onChange={e => { setPlaying(false); setProg(+e.target.value / 1000); }} aria-label="Route progress" aria-valuetext={`${Math.round(prog * 100)}%, near ${here.name}`} style={{ flex: 1, minWidth: 0, accentColor: '#FF5A1F' }} />
          <span className="mono" aria-hidden style={{ minWidth: '4ch', textAlign: 'right' }}>{Math.round(prog * 100)}%</span>
        </div>
        <ol aria-label="Stops" style={{ listStyle: 'none', margin: 0, padding: 0, overflow: 'auto', flex: 1 }}>
          {tour.stops.map((k, j) => (
            <li key={j}><button aria-current={j === idx ? 'step' : undefined} onClick={() => { setPlaying(false); setProg(cum[j] / tot); }} style={{ width: '100%', textAlign: 'left', background: j === idx ? '#151A1E' : 'none', border: 0, borderBottom: '1px solid #13181b', color: 'var(--ice)', padding: '14px 20px', display: 'grid', gridTemplateColumns: '52px 1fr auto', gap: 10, cursor: 'pointer' }}>
              <span className="mono" style={{ color: 'var(--orange)' }}>Day {String(j + 1).padStart(2, '0')}</span>
              <span><span style={{ fontStretch: '75%', fontWeight: 800, fontSize: 18, textTransform: 'uppercase' }}>{PLACES[k].name}</span><small style={{ display: 'block', color: 'var(--steel)' }}>{PLACES[k].pass ? 'Mountain pass · ' : ''}{PLACES[k].elev.toLocaleString()} m</small></span>
              <span className="mono" style={{ color: 'var(--steel)' }}>{Math.round(cum[j])} km</span>
            </button></li>
          ))}
        </ol>
      </aside>
      <p className="mono" style={{ gridColumn: '1/-1', padding: '14px var(--pad)', margin: 0, color: 'var(--steel)', fontSize: 10, lineHeight: 1.8, borderTop: '1px solid var(--line)' }}>Editorial draft routes · *approximate public elevations · km are straight-line, not road distance · Map data © OpenStreetMap contributors</p>
    </div>
  );
}
