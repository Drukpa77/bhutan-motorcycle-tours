import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import type { Block, Img } from '@/lib/blocks';
import { img } from '@/lib/content';

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Plain text with [label](/path) links. Internal paths use next/link; external links open in a new tab. */
export function RichText({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    const [, label, href] = m;
    out.push(href.startsWith('/')
      ? <Link key={m.index} href={href}>{label}</Link>
      : <a key={m.index} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out.map((n, i) => <Fragment key={i}>{n}</Fragment>)}</>;
}

const Credit = ({ c }: { c?: string }) => c ? <span className="credit mono"> Photo: {c} · Wikimedia Commons</span> : null;

function Photo({ im, sizes, ratio = '3/2' }: { im: Img; sizes: string; ratio?: string }) {
  return (
    <div className="photo zoom" style={{ aspectRatio: ratio }}>
      <Image src={img(im.src)} alt={im.alt} fill sizes={sizes} style={{ objectFit: 'cover' }} />
    </div>
  );
}

/** Renders guide and blog content. Every block gets `.reveal` (CSS scroll animation, no JS). */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if ('p' in b) return <p key={i} className="prose reveal"><RichText text={b.p} /></p>;
        if ('h3' in b) return <h3 key={i} className="guide-h3 reveal">{b.h3}</h3>;
        if ('note' in b) return <p key={i} className="prose guide-note reveal"><RichText text={b.note} /></p>;
        if ('ul' in b) return <ul key={i} className="prose guide-list reveal">{b.ul.map((x, j) => <li key={j}><RichText text={x} /></li>)}</ul>;
        if ('ol' in b) return <ol key={i} className="prose guide-list reveal">{b.ol.map((x, j) => <li key={j}><RichText text={x} /></li>)}</ol>;
        if ('figure' in b) {
          const f = b.figure;
          return (
            <figure key={i} className={'blk-figure reveal' + (f.wide ? ' wide' : '')}>
              <Photo im={f} sizes={f.wide ? '(max-width:1280px) 100vw, 1200px' : '(max-width:860px) 100vw, 760px'} ratio={f.wide ? '21/9' : '3/2'} />
              {(f.caption || f.credit) && <figcaption className="prose">{f.caption}<Credit c={f.credit} /></figcaption>}
            </figure>
          );
        }
        if ('gallery' in b) return (
          <div key={i} className="blk-gallery reveal" style={{ gridTemplateColumns: `repeat(${b.gallery.length},minmax(0,1fr))` }}>
            {b.gallery.map(im => <figure key={im.src}><Photo im={im} sizes="(max-width:860px) 100vw, 400px" ratio="4/5" /><figcaption><Credit c={im.credit} /></figcaption></figure>)}
          </div>
        );
        if ('quote' in b) return (
          <blockquote key={i} className="blk-quote reveal"><p>“{b.quote.text}”</p>{b.quote.cite && <cite className="mono">{b.quote.cite}</cite>}</blockquote>
        );
        if ('checklist' in b) return (
          <div key={i} className="blk-check reveal">
            <span className="mono" style={{ color: 'var(--lime)' }}>{b.checklist.title}</span>
            <ul>{b.checklist.items.map(x => <li key={x}><span aria-hidden className="tick" /><RichText text={x} /></li>)}</ul>
          </div>
        );
        if ('stats' in b) return (
          <dl key={i} className="blk-stats reveal">
            {b.stats.map(s => <div key={s.label}><dt className="mono">{s.label}</dt><dd className="display">{s.n}</dd></div>)}
          </dl>
        );
        if ('cta' in b) return (
          <aside key={i} className="blk-cta reveal">
            <strong className="display">{b.cta.title}</strong>
            <p className="prose" style={{ fontSize: 16 }}><RichText text={b.cta.text} /></p>
            <Link href={b.cta.href} className="btn btn-orange">{b.cta.label}</Link>
          </aside>
        );
        return (
          <div key={i} className="table-wrap reveal" role="region" aria-label="Table" tabIndex={0}>
            <table className="guide-table">
              <thead><tr>{b.table.head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>{b.table.rows.map((r, j) => <tr key={j}>{r.map((c, k) => k === 0 ? <th key={k} scope="row">{c}</th> : <td key={k}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
