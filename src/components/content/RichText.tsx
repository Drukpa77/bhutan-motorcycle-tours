import Link from 'next/link';
import { Fragment } from 'react';
import type { Block } from '@/lib/guides';

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

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if ('p' in b) return <p key={i} className="prose"><RichText text={b.p} /></p>;
        if ('h3' in b) return <h3 key={i} className="guide-h3">{b.h3}</h3>;
        if ('note' in b) return <p key={i} className="prose guide-note"><RichText text={b.note} /></p>;
        if ('ul' in b) return <ul key={i} className="prose guide-list">{b.ul.map((x, j) => <li key={j}><RichText text={x} /></li>)}</ul>;
        if ('ol' in b) return <ol key={i} className="prose guide-list">{b.ol.map((x, j) => <li key={j}><RichText text={x} /></li>)}</ol>;
        return (
          <div key={i} className="table-wrap" role="region" aria-label="Table" tabIndex={0}>
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
