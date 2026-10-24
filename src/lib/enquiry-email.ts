import { BRAND } from './assets';
import type { Enquiry } from './enquiry';
import { SITE_NAME, siteUrl } from './site';

// Email clients ignore <style> and web fonts unevenly, so everything here is table layout with inline styles.
const C = { ink: '#080B0D', ti: '#151A1E', orange: '#FF5A1F', lime: '#CEFF45', bg: '#EEF0F0', card: '#FFFFFF', text: '#14181B', muted: '#6B767C', line: '#E3E6E7' };
const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const MONO = "'SFMono-Regular',Menlo,Consolas,monospace";

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const fmtDate = (d: string) => {
  const t = Date.parse(d + 'T00:00:00Z');
  return isNaN(t) ? d : new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
};
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
const firstName = (e: Enquiry) => e.name.split(/\s+/)[0];

export const enquirySubject = (e: Enquiry) => `New ride enquiry · ${e.name} · ${e.adventure}, ${e.days} days`;

const travel = (e: Enquiry) => (e.date ? fmtDate(e.date) : 'Dates open') + (e.flexible ? ' · flexible' : '');
const crew = (e: Enquiry) => plural(e.riders, 'rider') + (e.passengers ? ', ' + plural(e.passengers, 'passenger') : '');

/** Plain-text part: grouped like the HTML so it still reads well in text-only clients. */
export function enquiryText(e: Enquiry) {
  const block = (title: string, rows: [string, string][]) => `${title.toUpperCase()}\n` + rows.map(([k, v]) => `  ${k.padEnd(14)} ${v}`).join('\n');
  return [
    `NEW RIDE ENQUIRY — ${SITE_NAME}`,
    `${e.adventure} · ${e.days} days · ${travel(e)}`,
    block('Rider', [['Name', e.name], ['Email', e.email], ['Phone', e.phone || '—'], ['Country', e.country], ['Experience', e.experience]]),
    block('The ride', [['Route', e.destinations.join(' → ')], ['Motorcycle', e.motorcycle], ['Group', `${crew(e)} · ${e.group}`], ['Accommodation', e.accommodation]]),
    e.notes ? `NOTES\n  ${e.notes.replace(/\n/g, '\n  ')}` : '',
    `Price: custom quotation required.\nReply to this email to answer ${firstName(e)} directly.`,
  ].filter(Boolean).join('\n\n');
}

export function enquiryHtml(e: Enquiry) {
  const site = siteUrl();
  const digits = e.phone.replace(/[^\d+]/g, '');
  const replyHref = `mailto:${encodeURIComponent(e.email)}?subject=${encodeURIComponent(`Your Bhutan motorcycle tour: ${e.adventure}, ${e.days} days`)}`;
  const received = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Thimphu', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' BTT';

  const label = (t: string, color = C.muted) => `<div style="font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${color};margin:0 0 6px">${esc(t)}</div>`;
  const heading = (t: string) => `<tr><td style="padding:32px 40px 4px">${label(t, C.orange)}<div style="height:2px;width:32px;background:${C.orange};line-height:2px;font-size:0">&nbsp;</div></td></tr>`;
  const rows = (items: [string, string][]) => `<tr><td style="padding:8px 40px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items.map(([k, v]) =>
    `<tr><td style="padding:13px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:13px;color:${C.muted};width:38%;vertical-align:top">${esc(k)}</td><td style="padding:13px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:15px;color:${C.text};font-weight:600;vertical-align:top">${v}</td></tr>`).join('')}</table></td></tr>`;
  const stat = (k: string, v: string, border: boolean) => `<td width="33%" style="padding:18px 16px;${border ? `border-left:1px solid ${C.line};` : ''}vertical-align:top">${label(k)}<div style="font-family:${SANS};font-size:17px;font-weight:700;color:${C.text};line-height:1.3">${esc(v)}</div></td>`;
  const button = (href: string, text: string, primary: boolean) => `<td style="padding:0 8px 8px 0"><a href="${href}" style="display:inline-block;padding:14px 22px;background:${primary ? C.orange : C.card};border:1px solid ${primary ? C.orange : C.ink};color:${C.ink};font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none">${esc(text)}</a></td>`;

  const link = (href: string, text: string) => `<a href="${href}" style="color:${C.text};text-decoration:none;border-bottom:1px solid ${C.orange}">${esc(text)}</a>`;
  const route = e.destinations.map(esc).join(` <span style="color:${C.orange}">→</span> `);

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(enquirySubject(e))}</title></head>
<body style="margin:0;padding:0;background:${C.bg}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(`${e.name} from ${e.country} · ${e.adventure}, ${e.days} days · ${travel(e)}`)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg}"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${C.card}">

<tr><td style="background:${C.ink};padding:28px 40px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="vertical-align:middle"><img src="${site}${BRAND.logo}" width="44" height="44" alt="${esc(SITE_NAME)}" style="display:block;border-radius:50%;background:#fff"></td>
    <td align="right" style="vertical-align:middle;font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.lime}">● New enquiry</td>
  </tr></table>
  <div style="font-family:${SANS};font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#8a969c;margin:28px 0 8px">${esc(SITE_NAME)}</div>
  <div style="font-family:${SANS};font-size:30px;line-height:1.15;font-weight:800;letter-spacing:-.3px;color:#F4F6F6;text-transform:uppercase">${esc(e.adventure)}</div>
  <div style="font-family:${SANS};font-size:15px;color:#c7cdcf;margin-top:8px">Enquiry from <b style="color:#F4F6F6">${esc(e.name)}</b>, ${esc(e.country)}</div>
</td></tr>
<tr><td style="height:4px;background:${C.orange};line-height:4px;font-size:0">&nbsp;</td></tr>

<tr><td style="padding:0 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid ${C.line}"><tr>
  ${stat('Duration', e.days + ' days', false)}${stat('Travel', travel(e), true)}${stat('Group', crew(e), true)}
</tr></table></td></tr>

<tr><td style="padding:28px 40px 0"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
  ${button(replyHref, `Reply to ${firstName(e)}`, true)}${digits ? button('tel:' + digits, 'Call', false) + button('https://wa.me/' + digits.replace('+', ''), 'WhatsApp', false) : ''}
</tr></table></td></tr>

${heading('The rider')}
${rows([['Name', esc(e.name)], ['Email', link('mailto:' + encodeURIComponent(e.email), e.email)], ['Phone', digits ? link('tel:' + digits, e.phone) : '<span style="color:#9aa3a8;font-weight:400">Not given</span>'], ['Country', esc(e.country)], ['Riding experience', esc(e.experience)]])}

${heading('The ride')}
${rows([['Route', route], ['Motorcycle', esc(e.motorcycle)], ['Group type', esc(e.group)], ['Accommodation', esc(e.accommodation)], ['Price', 'Custom quotation required']])}

${e.notes ? `${heading('Notes from the rider')}<tr><td style="padding:12px 40px 0"><div style="background:#F6F7F7;border-left:3px solid ${C.orange};padding:18px 20px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.text};white-space:pre-wrap">${esc(e.notes)}</div></td></tr>` : ''}

<tr><td style="padding:36px 40px 32px"><div style="font-family:${SANS};font-size:13px;line-height:1.6;color:${C.muted}">Hit reply to answer ${esc(firstName(e))} directly. Your reply goes to ${link('mailto:' + encodeURIComponent(e.email), e.email)}.</div></td></tr>

<tr><td style="background:${C.ti};padding:22px 40px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:${MONO};font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#8a969c">Received ${esc(received)}</td>
    <td align="right" style="font-family:${MONO};font-size:10px;letter-spacing:1.5px;text-transform:uppercase"><a href="${site}" style="color:#F4F6F6;text-decoration:none">${esc(site.replace(/^https?:\/\//, ''))}</a></td>
  </tr></table>
</td></tr>

</table>
<div style="font-family:${SANS};font-size:11px;color:#9aa3a8;padding:16px 0">Sent from the Build Your Ride planner on ${esc(SITE_NAME)}.</div>
</td></tr></table>
</body></html>`;
}
