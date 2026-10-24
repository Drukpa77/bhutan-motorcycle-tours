'use client';
import { useEffect, useRef, useState } from 'react';
import { img } from '@/lib/content';

type F = { adv: string; days: number; exp: string; dest: string[]; bike: string; date: string; flex: boolean; riders: number; pax: number; group: 'Private' | 'Join a group'; acc: string; name: string; email: string; phone: string; country: string; notes: string; consent: boolean; hp: string };
const DEF: F = { adv: '', days: 9, exp: '', dest: [], bike: '', date: '', flex: true, riders: 1, pax: 0, group: 'Private', acc: '', name: '', email: '', phone: '', country: '', notes: '', consent: false, hp: '' };
type Key = 'adv' | 'days' | 'exp' | 'dest' | 'bike' | 'dates' | 'acc' | 'contact' | 'summary';
type Step = { key: Key; title: string; hint: string; opts?: [string, string][]; multi?: boolean; img: string };
const STEPS: Step[] = [
  { key: 'adv', title: 'Mission type', hint: 'Start with the kind of journey you have in mind.', img: 'places/paro.jpg', opts: [['Motorcycle tour', 'Scheduled route, once published'], ['Private expedition', 'Your group, your dates'], ['Other adventure', 'Rafting, cycling, MTB, climbing'], ['Custom itinerary', 'Mix riding with culture']] },
  { key: 'days', title: 'Duration', hint: 'Allow for arrival in Paro and a rest day at altitude on longer trips.', img: 'places/trongsa.jpg' },
  { key: 'exp', title: 'Rider profile', hint: 'Eligibility depends on your licence and the operator’s requirements. A valid motorcycle licence is expected.', img: 'places/dochula.jpg', opts: [['Beginner', 'Limited mountain riding'], ['Intermediate', 'Comfortable on twisty roads'], ['Experienced', 'Multi-day touring, some gravel'], ['Advanced mountain', 'High passes, broken surfaces, weather']] },
  { key: 'dest', multi: true, title: 'Waypoints', hint: 'Pick as many as you like. Real places on the western and central routes.', img: 'places/punakha.jpg', opts: [['Paro', '2,200 m'], ['Chele La & Haa', '3,988 m'], ['Thimphu', '2,330 m'], ['Dochula', '3,100 m'], ['Punakha', '1,250 m'], ['Phobjikha', '2,900 m'], ['Trongsa', '2,180 m'], ['Bumthang', '2,600 m']] },
  { key: 'bike', title: 'Machine', hint: 'The fleet is not yet confirmed. State a preference and availability comes with your quote.', img: 'bike/himalayan.jpg', opts: [['Adventure single', 'Himalayan class (illustrative)'], ['Classic single', 'Upright, relaxed touring'], ['No preference', 'Recommend for my route'], ['Bring my own', 'Ask about permits']] },
  { key: 'dates', title: 'Window & crew', hint: 'Spring (Mar–May) and autumn (Sep–Nov) are usually the clearest seasons.', img: 'places/phobjikha-valley.jpg' },
  { key: 'acc', title: 'Basecamp', hint: 'A preference, not a guarantee of specific hotels.', img: 'places/phobjikha.jpg', opts: [['Comfortable hotels', 'Standard tourist-grade'], ['Boutique & heritage', 'Where available on route'], ['Farmhouse stays', 'Family-run, local food'], ['Mixed', 'Best fit for each night']] },
  { key: 'contact', title: 'Comms', hint: 'Used only to respond to this enquiry.', img: 'places/dochula-wide.jpg' },
  { key: 'summary', title: 'Mission brief', hint: 'Check everything. Edit any line before sending.', img: 'places/punakha-alt.jpg' },
];
const lbl = { display: 'grid', gap: 8, color: 'var(--steel)' } as const;
type Status = { kind: 'idle' | 'sending' | 'mock' | 'sent' | 'error'; msg?: string };

export default function Planner() {
  const [step, setStep] = useState(0), [f, setF] = useState<F>(DEF), [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const heading = useRef<HTMLHeadingElement>(null), moved = useRef(false);
  const go = (n: number) => { moved.current = true; setStep(n); };
  useEffect(() => { if (moved.current) heading.current?.focus(); moved.current = false; }, [step]);
  useEffect(() => { try { const s = JSON.parse(sessionStorage.getItem('bmt-planner') || 'null'); if (s) { setStep(s.step); setF({ ...DEF, ...s.f }); } } catch { /* ignore */ } }, []);
  useEffect(() => { try { sessionStorage.setItem('bmt-planner', JSON.stringify({ step, f })); } catch { /* ignore */ } }, [step, f]);
  const set = <K extends keyof F>(k: K, v: F[K]) => { setF(x => ({ ...x, [k]: v })); setStatus({ kind: 'idle' }); };
  const S = STEPS[step], last = step === STEPS.length - 1;

  const errs: Partial<Record<keyof F, string>> = {};
  if (f.name.trim().length < 2) errs.name = 'Please enter your name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) errs.email = 'Enter a valid email address';
  if (f.phone && !/^[+()\d\s-]{6,}$/.test(f.phone)) errs.phone = 'Use digits, spaces and + only';
  if (!f.country.trim()) errs.country = 'Country is required';
  if (!f.consent) errs.consent = 'Consent is required to respond to you';
  const valid = (i: number) => {
    const k = STEPS[i].key;
    if (k === 'dest') return f.dest.length > 0;
    if (k === 'adv' || k === 'exp' || k === 'bike' || k === 'acc') return !!f[k];
    if (k === 'contact') return Object.keys(errs).length === 0;
    return true;
  };
  const E = tried ? errs : {};
  const rows: [string, string, number][] = [['Mission', f.adv || '—', 0], ['Duration', f.days + ' days', 1], ['Rider', f.exp || '—', 2], ['Waypoints', f.dest.join(', ') || '—', 3], ['Machine', (f.bike || '—') + ' · availability TBC', 4], ['Window', (f.date || 'Not set') + (f.flex ? ' · flexible' : ''), 5], ['Crew', `${f.riders} rider(s), ${f.pax} passenger(s) · ${f.group}`, 5], ['Basecamp', f.acc || '—', 6], ['Comms', [f.name, f.email, f.phone, f.country].filter(Boolean).join(' · ') || '—', 7], ['Notes', f.notes || '—', 7]];
  const mailto = 'mailto:?subject=' + encodeURIComponent('Expedition enquiry: ' + f.name) + '&body=' + encodeURIComponent(rows.map(r => r[0] + ': ' + r[1]).join('\n') + '\nPrice: Custom quotation required');

  const submit = async () => {
    const bad = STEPS.findIndex((_, i) => i < STEPS.length - 1 && !valid(i));
    if (bad >= 0) { setTried(true); go(bad); return; }
    setStatus({ kind: 'sending' });
    try {
      const r = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ adventure: f.adv, days: f.days, experience: f.exp, destinations: f.dest, motorcycle: f.bike, date: f.date, flexible: f.flex, riders: f.riders, passengers: f.pax, group: f.group, accommodation: f.acc, name: f.name, email: f.email, phone: f.phone, country: f.country, notes: f.notes, consent: f.consent, company_website: f.hp }) });
      const j = await r.json();
      if (!r.ok || !j.ok) return setStatus({ kind: 'error', msg: j.error || 'Something went wrong' });
      setStatus({ kind: j.mode === 'sent' ? 'sent' : 'mock' });
    } catch { setStatus({ kind: 'error', msg: 'Network error. Please try again or email us.' }); }
  };
  const next = () => { if (last) return void submit(); if (!valid(step)) return setTried(true); setTried(false); go(step + 1); };
  const pick = (label: string) => {
    if (S.key === 'dest') { const on = f.dest.includes(label); set('dest', on ? f.dest.filter(d => d !== label) : [...f.dest, label]); }
    else if (S.key === 'adv' || S.key === 'exp' || S.key === 'bike' || S.key === 'acc') set(S.key, label);
  };
  const isOn = (label: string) => S.key === 'dest' ? f.dest.includes(label) : (S.key === 'adv' || S.key === 'exp' || S.key === 'bike' || S.key === 'acc') && f[S.key] === label;

  return (
    <main id="main" className="stack planner min-screen">
      <aside aria-label="Your selections" className="planner-aside" style={{ background: `#050708 url('${img(f.bike === 'Adventure single' ? 'bike/himalayan.jpg' : S.img)}') center/cover` }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(8,11,13,.3),rgba(8,11,13,.96))' }} />
        <div style={{ position: 'absolute', left: 'var(--pad)', right: 'var(--pad)', bottom: 'var(--pad)', display: 'grid', gap: 14 }}>
          <span className="mono" style={{ color: 'var(--lime)' }}>Expedition control</span>
          <span className="display" style={{ fontSize: 'clamp(36px,4.5vw,72px)' }}>{f.adv || 'Configure your ride'}</span>
          <div className="mono" style={{ display: 'grid', gap: 6, color: '#c7cdcf' }}>
            {([['Days', f.days], ['Rider', f.exp || '—'], ['Machine', f.bike || '—'], ['Waypoints', f.dest.length || '—']] as const).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1b2227', paddingTop: 6 }}><span style={{ color: 'var(--steel)' }}>{k}</span><span>{v}</span></div>
            ))}
          </div>
        </div>
      </aside>

      <section className="planner-main">
        <div style={{ display: 'flex', gap: 4 }} aria-hidden>{STEPS.map((_, i) => <span key={i} style={{ flex: 1, height: 3, background: i < step ? 'var(--orange)' : i === step ? 'var(--ice)' : '#1b2227' }} />)}</div>
        <div>
          <span className="mono" style={{ color: 'var(--steel)' }}>Step {String(step + 1).padStart(2, '0')} / 09</span>
          <h1 ref={heading} tabIndex={-1} className="display" style={{ fontSize: 'clamp(44px,6vw,96px)', marginTop: 10, outline: 'none', scrollMarginTop: 96 }}>{S.title}</h1>
          <p style={{ color: '#c7cdcf', lineHeight: 1.6, maxWidth: '56ch', margin: '14px 0 0' }}>{S.hint}</p>
          {tried && !valid(step) && S.opts && <p role="alert" style={{ color: '#ff8a5f', margin: '10px 0 0' }}>Choose an option to continue.</p>}
        </div>

        {S.opts && (
          <div role="group" aria-label={S.title} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(220px,100%),1fr))', gap: 1, background: '#1b2227', border: '1px solid #1b2227' }}>
            {S.opts.map(([label, sub], i) => {
              const on = isOn(label);
              return (
                <button key={label} aria-pressed={on} onClick={() => pick(label)} style={{ textAlign: 'left', background: on ? 'var(--lime)' : '#0b0f11', color: on ? 'var(--ink)' : 'var(--ice)', border: 0, padding: 20, cursor: 'pointer', display: 'grid', gap: 6, minHeight: 104 }}>
                  <span aria-hidden className="mono" style={{ fontSize: 10, opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
                  <b style={{ fontStretch: '75%', fontWeight: 800, fontSize: 22, textTransform: 'uppercase', lineHeight: 1 }}>{label}</b>
                  <span style={{ fontSize: 13, opacity: 0.75 }}>{sub}</span>
                </button>
              );
            })}
          </div>
        )}

        {S.key === 'days' && (
          <div style={{ display: 'grid', gap: 18, maxWidth: 560 }}>
            <div aria-hidden className="display" style={{ fontSize: 'clamp(96px,14vw,140px)' }}>{f.days}<span className="mono" style={{ fontSize: 14, color: 'var(--steel)' }}> days</span></div>
            <input type="range" min={2} max={21} value={f.days} onChange={e => set('days', +e.target.value)} aria-label="Trip duration in days" aria-valuetext={f.days + ' days'} style={{ accentColor: '#FF5A1F', width: '100%' }} />
          </div>
        )}

        {S.key === 'dates' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(200px,100%),1fr))', gap: 20, maxWidth: 720 }}>
            <label className="mono" style={lbl}>Departure<input className="field" type="date" value={f.date} onChange={e => set('date', e.target.value)} /></label>
            <label className="mono" style={lbl}>Riders<input className="field" type="number" inputMode="numeric" min={1} max={20} value={f.riders} onChange={e => set('riders', Math.max(1, +e.target.value || 1))} /></label>
            <label className="mono" style={lbl}>Passengers<input className="field" type="number" inputMode="numeric" min={0} max={20} value={f.pax} onChange={e => set('pax', Math.max(0, +e.target.value || 0))} /></label>
            <label style={{ display: 'flex', gap: 10, alignItems: 'center', minHeight: 44, cursor: 'pointer' }}><input type="checkbox" checked={f.flex} onChange={e => set('flex', e.target.checked)} style={{ width: 22, height: 22, accentColor: '#FF5A1F', flex: 'none' }} />My dates are flexible</label>
            <div role="group" aria-label="Group type" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, gridColumn: '1/-1' }}>
              {(['Private', 'Join a group'] as const).map(g => <button key={g} aria-pressed={f.group === g} onClick={() => set('group', g)} className="btn" style={{ background: f.group === g ? 'var(--ice)' : 'transparent', color: f.group === g ? 'var(--ink)' : 'var(--ice)', border: '1px solid #2a3238' }}>{g}</button>)}
            </div>
          </div>
        )}

        {S.key === 'contact' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap: 18, maxWidth: 760, position: 'relative' }}>
            {([['name', 'Full name', 'text', 'name'], ['email', 'Email', 'email', 'email'], ['phone', 'Phone / WhatsApp (optional)', 'tel', 'tel'], ['country', 'Country', 'text', 'country-name']] as const).map(([k, label, type, ac]) => (
              <label key={k} className="mono" style={lbl}>{label}
                <input className="field" type={type} autoComplete={ac} value={f[k]} aria-invalid={!!E[k]} aria-describedby={E[k] ? 'err-' + k : undefined} required={k !== 'phone'} onChange={e => set(k, e.target.value)} style={{ borderColor: E[k] ? '#ff8a5f' : undefined }} />
                <span id={'err-' + k} style={{ color: '#ff8a5f', fontSize: 12, textTransform: 'none', letterSpacing: 0, minHeight: 14 }}>{E[k]}</span>
              </label>
            ))}
            <label className="mono" style={{ ...lbl, gridColumn: '1/-1' }}>Anything else?<textarea className="field" rows={4} value={f.notes} onChange={e => set('notes', e.target.value)} style={{ resize: 'vertical' }} /></label>
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden value={f.hp} onChange={e => set('hp', e.target.value)} style={{ position: 'absolute', left: -9999 }} />
            <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', gridColumn: '1/-1', fontSize: 14, lineHeight: 1.5, color: '#c7cdcf' }}><input type="checkbox" checked={f.consent} aria-invalid={!!E.consent} aria-describedby={E.consent ? 'err-consent' : undefined} onChange={e => set('consent', e.target.checked)} style={{ width: 22, height: 22, accentColor: '#FF5A1F', marginTop: 1, flex: 'none' }} />I agree my details may be used to respond to this enquiry, as described in the privacy policy.</label>
            {E.consent && <span id="err-consent" role="alert" style={{ color: '#ff8a5f', fontSize: 12, gridColumn: '1/-1' }}>{E.consent}</span>}
          </div>
        )}

        {last && (
          <div style={{ display: 'grid', gap: 20, maxWidth: 760 }}>
            <div style={{ borderTop: '1px solid #2a3238' }}>
              {rows.map(([k, v, i]) => (
                <div key={k} className="brief-row">
                  <span className="mono" style={{ color: 'var(--steel)' }}>{k}</span><span style={{ overflowWrap: 'anywhere' }}>{v}</span>
                  <button onClick={() => go(i)} aria-label={'Edit ' + k} style={{ background: 'none', border: 0, color: 'var(--orange)', cursor: 'pointer', minHeight: 44, minWidth: 44, font: 'inherit' }}>Edit</button>
                </div>
              ))}
              <div style={{ padding: '18px 0', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}><span className="mono" style={{ color: 'var(--steel)' }}>Price</span><b className="display" style={{ fontSize: 28 }}>Custom quotation required</b></div>
            </div>
            {status.kind === 'mock' && (
              <div role="status" style={{ border: '1px solid var(--orange)', padding: 20, display: 'grid', gap: 12 }}>
                <b className="display" style={{ fontSize: 26 }}>Validated, but not delivered</b>
                <span style={{ color: '#c7cdcf' }}>The server accepted your enquiry in MOCK mode. Email delivery isn’t configured yet (set RESEND_API_KEY). Nothing was sent to the operator.</span>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><a className="btn btn-orange" href={mailto}>Send by email instead</a><button className="btn btn-ghost" onClick={() => print()}>Print brief</button></div>
              </div>
            )}
            {status.kind === 'sent' && <div role="status" style={{ border: '1px solid var(--lime)', padding: 20 }}><b className="display" style={{ fontSize: 26, color: 'var(--lime)' }}>Enquiry sent</b><p style={{ color: '#c7cdcf', margin: '8px 0 0' }}>The operator has received your brief and will reply by email.</p></div>}
            {status.kind === 'error' && <div role="alert" style={{ border: '1px solid #ff8a5f', padding: 20, color: '#ff8a5f' }}>{status.msg}</div>}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #1b2227' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" disabled={step === 0} style={{ opacity: step === 0 ? 0.35 : 1 }} onClick={() => go(Math.max(0, step - 1))}>← Back</button>
            <button className="mono" style={{ background: 'none', border: 0, color: 'var(--steel)', cursor: 'pointer', minHeight: 48, padding: '0 8px' }} onClick={() => { sessionStorage.removeItem('bmt-planner'); setF(DEF); go(0); setStatus({ kind: 'idle' }); }}>Reset</button>
          </div>
          <button className="btn btn-orange" disabled={status.kind === 'sending'} onClick={next}>{last ? (status.kind === 'sending' ? 'Sending…' : 'Submit enquiry') : 'Continue →'}</button>
        </div>
      </section>
    </main>
  );
}
