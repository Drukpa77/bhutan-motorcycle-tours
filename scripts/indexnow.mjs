/**
 * Notify IndexNow search engines (Bing, Yahoo, DuckDuckGo via Bing, Yandex, Seznam, Naver) about site URLs.
 * Google does not use IndexNow; use Search Console "Request indexing" for Google.
 *
 * Usage (after the change is deployed):
 *   node scripts/indexnow.mjs                 # submit every URL in the live sitemap
 *   node scripts/indexnow.mjs /blog/new-post  # submit specific paths (e.g. a new blog post)
 *
 * The key file public/<KEY>.txt must be live at https://bhutanmotorcycletours.com/<KEY>.txt.
 */
const HOST = 'bhutanmotorcycletours.com';
const KEY = '3eedef66b8e006e7dd20e62a66d30707';
const ORIGIN = `https://${HOST}`;

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map(p => (p.startsWith('http') ? p : ORIGIN + (p.startsWith('/') ? p : '/' + p)));
} else {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}

const keyCheck = await fetch(`${ORIGIN}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file not live at ${ORIGIN}/${KEY}.txt. Deploy first.`);
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: urls }),
});
// 200 = accepted, 202 = accepted (key validation pending). Anything else is an error.
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status >= 300) { console.error(await res.text()); process.exit(1); }
