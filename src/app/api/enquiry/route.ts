import { NextResponse } from 'next/server';
import { EnquirySchema } from '@/lib/enquiry';

// In-memory rate limit (per server instance). Use Upstash/Redis in production.
const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now(), w = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60_000);
  w.push(now); hits.set(ip, w); return w.length > 5;
};

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (limited(ip)) return NextResponse.json({ ok: false, error: 'Too many requests. Try again in a few minutes.' }, { status: 429 });
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 }); }
  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: 'Please check the highlighted fields.', issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  const e = parsed.data;
  if (e.company_website) return NextResponse.json({ ok: true, mode: 'mock' }); // bot: drop silently, never deliver

  const text = Object.entries(e).filter(([k]) => k !== 'company_website' && k !== 'consent').map(([k, v]) => k + ': ' + (Array.isArray(v) ? v.join(', ') : String(v))).join('\n') + '\nPrice: Custom quotation required';
  const key = process.env.RESEND_API_KEY, to = process.env.ENQUIRY_TO_EMAIL, from = process.env.ENQUIRY_FROM_EMAIL;
  if (!key || !to || !from) {
    console.info('[enquiry:mock] NOT delivered\n' + text);
    return NextResponse.json({ ok: true, mode: 'mock' });
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, reply_to: e.email, subject: 'Expedition enquiry: ' + e.name, text }),
  });
  if (!r.ok) return NextResponse.json({ ok: false, error: 'Delivery failed. Please email us directly.' }, { status: 502 });
  return NextResponse.json({ ok: true, mode: 'sent' });
}
