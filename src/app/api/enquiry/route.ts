import { NextResponse } from 'next/server';
import { CONTACT } from '@/lib/content';
import { EnquirySchema, type Enquiry } from '@/lib/enquiry';

// In-memory rate limit (per server instance). Use Upstash/Redis in production.
const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now(), w = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60_000);
  w.push(now); hits.set(ip, w); return w.length > 5;
};

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Enquiry as labelled rows, in the order the operator reads them. */
const rows = (e: Enquiry): [string, string][] => [
  ['Name', e.name],
  ['Email', e.email],
  ['Phone', e.phone || '—'],
  ['Country', e.country],
  ['Adventure', e.adventure],
  ['Duration', e.days + ' days'],
  ['Riding experience', e.experience],
  ['Places', e.destinations.join(', ')],
  ['Motorcycle', e.motorcycle],
  ['Travel date', (e.date || 'Not set') + (e.flexible ? ' (flexible)' : '')],
  ['Group', `${e.riders} rider(s), ${e.passengers} passenger(s) · ${e.group}`],
  ['Accommodation', e.accommodation],
  ['Notes', e.notes || '—'],
];

const html = (e: Enquiry) => `<div style="font-family:Arial,sans-serif;max-width:640px;color:#111">
<h2 style="margin:0 0 4px">New ride enquiry</h2>
<p style="margin:0 0 16px;color:#555">From the Bhutan Motorcycle Tours website. Reply to this email to answer ${esc(e.name)} directly.</p>
<table cellpadding="8" style="border-collapse:collapse;width:100%">${rows(e).map(([k, v]) =>
  `<tr><td style="border-bottom:1px solid #eee;color:#555;width:160px;vertical-align:top">${esc(k)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}</table>
<p style="color:#555">Price: custom quotation required.</p></div>`;

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (limited(ip)) return NextResponse.json({ ok: false, error: 'Too many requests. Try again in a few minutes.' }, { status: 429 });
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 }); }
  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: 'Please check the highlighted fields.', issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  const e = parsed.data;
  if (e.company_website) return NextResponse.json({ ok: true, mode: 'mock' }); // bot: drop silently, never deliver

  const text = rows(e).map(([k, v]) => k + ': ' + v).join('\n') + '\nPrice: Custom quotation required';
  // ENQUIRY_TO_EMAIL may list several addresses, comma-separated; defaults to the published contact emails.
  const key = process.env.RESEND_API_KEY, from = process.env.ENQUIRY_FROM_EMAIL;
  const to = (process.env.ENQUIRY_TO_EMAIL || CONTACT.emails.join(',')).split(',').map(s => s.trim()).filter(Boolean);
  if (!key || !from) {
    console.info('[enquiry:mock] NOT delivered\n' + text);
    return NextResponse.json({ ok: true, mode: 'mock' });
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, reply_to: e.email, subject: `Ride enquiry: ${e.name} · ${e.adventure}, ${e.days} days`, text, html: html(e) }),
  });
  if (!r.ok) {
    console.error('[enquiry] Resend rejected the email', r.status, await r.text());
    return NextResponse.json({ ok: false, error: 'Delivery failed.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, mode: 'sent' });
}
