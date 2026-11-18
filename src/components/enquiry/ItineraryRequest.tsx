'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { whatsappLink } from '@/lib/whatsapp';

/**
 * "Get the full itinerary" enquiry: a slide-in panel opened by any <EnquireButton/> on the page.
 * Posts to /api/enquiry with kind: 'itinerary', so the operator's email says exactly which tour and length.
 */
export type EnquiryTour = { slug: string; name: string; title: string; days?: number; lengths?: { days: number; label: string }[]; places: string[] };

const OPEN = 'bmt:enquire';
const EXPERIENCE: [string, string][] = [['Beginner', 'New to mountain roads'], ['Intermediate', 'Happy on twisty roads'], ['Experienced', 'Multi-day touring'], ['Advanced mountain', 'High passes, rough roads']];
type Status = { kind: 'idle' | 'sending' | 'sent' | 'mock' | 'error'; msg?: string };

/** Opens the panel from anywhere: a hero button, the itinerary gate, the sticky bar. */
export function EnquireButton({ days, className = 'btn btn-orange', children }: { days?: number; className?: string; children: React.ReactNode }) {
  return <button type="button" className={className} onClick={() => dispatchEvent(new CustomEvent(OPEN, { detail: { days } }))}>{children}</button>;
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="enq-stepper">
      <span>{label}</span>
      <div role="group" aria-label={label}>
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
        <output aria-live="polite">{value}</output>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  );
}

export default function ItineraryRequest({ tour }: { tour: EnquiryTour }) {
  const lengths = tour.lengths?.length ? tour.lengths : tour.days ? [{ days: tour.days, label: '' }] : [];
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState(tour.days ?? 9);
  const [months, setMonths] = useState<string[]>([]);
  const [month, setMonth] = useState('');
  const [riders, setRiders] = useState(2), [pax, setPax] = useState(0);
  const [exp, setExp] = useState('');
  const [f, setF] = useState({ name: '', email: '', phone: '', country: '', notes: '', consent: false, hp: '' });
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const panel = useRef<HTMLDivElement>(null), opener = useRef<HTMLElement | null>(null);

  // Month chips are date-dependent, so build them on the client to avoid hydration mismatches.
  useEffect(() => {
    const now = new Date();
    setMonths(Array.from({ length: 12 }, (_, i) => new Date(now.getFullYear(), now.getMonth() + 1 + i, 1).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })));
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<{ days?: number }>).detail?.days;
      if (d) setDays(d);
      opener.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    addEventListener(OPEN, onOpen);
    return () => removeEventListener(OPEN, onOpen);
  }, []);

  const close = useCallback(() => { setOpen(false); opener.current?.focus(); }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return close();
      if (e.key !== 'Tab' || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>('button:not([disabled]), a, input, textarea')];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; removeEventListener('keydown', onKey); };
  }, [open, close]);

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => { setF(x => ({ ...x, [k]: v })); if (status.kind === 'error') setStatus({ kind: 'idle' }); };
  const errs: Partial<Record<'name' | 'email' | 'phone' | 'country' | 'consent' | 'exp', string>> = {};
  if (!exp) errs.exp = 'Pick the closest match';
  if (f.name.trim().length < 2) errs.name = 'Please enter your name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) errs.email = 'Enter a valid email address';
  if (f.phone && !/^[+()\d\s-]{6,}$/.test(f.phone)) errs.phone = 'Use digits, spaces and + only';
  if (!f.country.trim()) errs.country = 'Where are you riding from?';
  if (!f.consent) errs.consent = 'Needed so we can reply to you';
  const E = tried ? errs : {};

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (Object.keys(errs).length) { setTried(true); panel.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(); return; }
    setStatus({ kind: 'sending' });
    try {
      const r = await fetch('/api/enquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'itinerary', tour: tour.title, page: location.href,
          adventure: `Motorcycle tour: ${tour.name}`, days, experience: exp,
          destinations: tour.places.slice(0, 12), motorcycle: 'Royal Enfield Himalayan (standard)',
          date: month, flexible: !month, riders, passengers: pax, group: 'Private', accommodation: '3-star premium (standard)',
          name: f.name, email: f.email, phone: f.phone, country: f.country, notes: f.notes, consent: f.consent, company_website: f.hp,
        }),
      });
      const j = await r.json();
      if (r.status === 502) return setStatus({ kind: 'error', msg: 'We couldn’t send that just now. Please try again in a minute, or message us on WhatsApp.' });
      if (!r.ok || !j.ok) return setStatus({ kind: 'error', msg: j.error || 'Something went wrong. Please try again.' });
      setStatus({ kind: j.mode === 'sent' ? 'sent' : 'mock' });
    } catch { setStatus({ kind: 'error', msg: 'Network error. Please try again, or message us on WhatsApp.' }); }
  };

  const summary = [`${days} days`, month || 'Dates open', `${riders} rider${riders === 1 ? '' : 's'}${pax ? ` + ${pax} pillion` : ''}`].join(' · ');
  const done = status.kind === 'sent' || status.kind === 'mock';

  return (
    <>
      {open && <div className="enq-scrim" onClick={close} aria-hidden />}
      <div ref={panel} className={'enq-panel' + (open ? ' open' : '')} role="dialog" aria-modal="true" aria-labelledby="enq-title" hidden={!open}>
        <header className="enq-head">
          <div>
            <span className="mono" style={{ color: 'var(--orange)' }}>Full itinerary · {tour.name}</span>
            <h2 id="enq-title">{done ? 'Request sent' : 'Get the full day-by-day plan'}</h2>
            {!done && <p className="mono enq-summary" aria-live="polite">{summary}</p>}
          </div>
          <button type="button" className="enq-close" onClick={close} aria-label="Close">✕</button>
        </header>

        {done ? (
          <div className="enq-done">
            <div className="enq-tick" aria-hidden>✓</div>
            <p className="prose">Thank you, {f.name.split(/\s+/)[0]}. We’ll email the full {days}-day itinerary for {tour.name}, with hotels, every visit and a quote, to <b>{f.email}</b>.</p>
            {status.kind === 'mock' && <p className="mono" style={{ color: 'var(--steel)' }}>Demo mode: email delivery isn’t configured on this server.</p>}
            <a className="btn btn-ghost" href={whatsappLink(tour.name, days)} target="_blank" rel="noopener noreferrer">Chat now on WhatsApp ↗</a>
            <button type="button" className="btn btn-orange" onClick={close} data-autofocus>Back to the tour</button>
          </div>
        ) : (
          <form className="enq-form" onSubmit={submit} noValidate>
            {lengths.length > 0 ? (
              <fieldset>
                <legend>Tour length</legend>
                <div className="enq-chips">
                  {lengths.map((l, i) => (
                    <button key={l.days} type="button" aria-pressed={days === l.days} onClick={() => setDays(l.days)} data-autofocus={i === 0 ? '' : undefined}>
                      <b>{l.days} days</b>{l.label && <small>{l.label}</small>}
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : (
              <Stepper label="Days" value={days} min={4} max={21} onChange={setDays} />
            )}

            <fieldset>
              <legend>When would you like to ride?</legend>
              <div className="enq-chips enq-chips-sm">
                <button type="button" aria-pressed={!month} onClick={() => setMonth('')}>Not sure yet</button>
                {months.map(m => <button key={m} type="button" aria-pressed={month === m} onClick={() => setMonth(m)}>{m}</button>)}
              </div>
              <small className="enq-hint">Best riding: March–May and late September–November.</small>
            </fieldset>

            <fieldset>
              <legend>Who’s coming?</legend>
              <div className="enq-steppers">
                <Stepper label="Riders" value={riders} min={1} max={20} onChange={setRiders} />
                <Stepper label="Pillions" value={pax} min={0} max={20} onChange={setPax} />
              </div>
            </fieldset>

            <fieldset aria-invalid={!!E.exp} aria-describedby={E.exp ? 'enq-exp-err' : undefined}>
              <legend>Riding experience</legend>
              <div className="enq-chips enq-chips-2">
                {EXPERIENCE.map(([v, hint]) => (
                  <button key={v} type="button" aria-pressed={exp === v} onClick={() => setExp(v)}><b>{v}</b><small>{hint}</small></button>
                ))}
              </div>
              {E.exp && <span id="enq-exp-err" className="enq-err">{E.exp}</span>}
            </fieldset>

            <fieldset>
              <legend>Where should we send it?</legend>
              <div className="enq-fields">
                {([['name', 'Name', 'text', 'name'], ['email', 'Email', 'email', 'email'], ['phone', 'WhatsApp / phone (optional)', 'tel', 'tel'], ['country', 'Country', 'text', 'country-name']] as const).map(([k, label, type, ac]) => (
                  <label key={k}>
                    <span>{label}</span>
                    <input className="field" type={type} autoComplete={ac} value={f[k]} onChange={e => set(k, e.target.value)}
                      aria-invalid={!!E[k]} aria-describedby={E[k] ? `enq-${k}-err` : undefined} />
                    {E[k] && <span id={`enq-${k}-err`} className="enq-err">{E[k]}</span>}
                  </label>
                ))}
                <label className="enq-wide">
                  <span>Anything we should know? (optional)</span>
                  <textarea className="field" rows={3} value={f.notes} onChange={e => set('notes', e.target.value)} placeholder="Pillion plans, festivals you’d like to catch, hotel upgrades…" />
                </label>
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="sr-only" value={f.hp} onChange={e => set('hp', e.target.value)} />
              </div>
            </fieldset>

            <label className="enq-consent">
              <input type="checkbox" checked={f.consent} onChange={e => set('consent', e.target.checked)} aria-invalid={!!E.consent} />
              <span>Bhutan Mind Vacation Tours may contact me about this request.</span>
            </label>
            {E.consent && <span className="enq-err">{E.consent}</span>}
            {status.kind === 'error' && <p role="alert" className="enq-err">{status.msg}</p>}

            <div className="enq-actions">
              <button type="submit" className="btn btn-orange" disabled={status.kind === 'sending'}>{status.kind === 'sending' ? 'Sending…' : 'Send me the full itinerary →'}</button>
              <a className="btn btn-ghost" href={whatsappLink(tour.name, days)} target="_blank" rel="noopener noreferrer">WhatsApp us ↗</a>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
