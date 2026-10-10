'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { href: '/#missions', label: 'Expeditions' },
  { href: '/explore-bhutan', label: 'Terrain' },
  { href: '/#machine', label: 'Machine' },
  { href: '/ride-mode', label: 'Ride mode' },
  { href: '/plan-your-ride', label: 'Build your ride →' },
];

export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null), panel = useRef<HTMLDivElement>(null);
  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLElement>('button, a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setOpen(false);
      if (e.key !== 'Tab' || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>('button, a');
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; removeEventListener('keydown', onKey); menuBtn.current?.focus(); };
  }, [open]);

  if (path === '/ride-mode') return null;
  return (
    <>
      <header className="sitehead">
        <Link href="/" className="display" aria-label="Bhutan Motorcycle Tours, home" style={{ fontSize: 22, textDecoration: 'none', padding: '11px 0' }}>BMT/</Link>
        <nav aria-label="Primary" className="mono">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? 'page' : undefined} style={path === l.href ? { color: 'var(--orange)' } : undefined}>{l.label}</Link>
          ))}
        </nav>
        <button ref={menuBtn} className="menu mono" aria-expanded={open} aria-controls="mobilenav" onClick={() => setOpen(true)}>Menu</button>
      </header>
      {open && (
        <div ref={panel} id="mobilenav" className="mobilenav" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="btn btn-ghost" style={{ position: 'absolute', top: 16, right: 16 }} onClick={() => setOpen(false)}>Close ✕</button>
          <nav aria-label="Mobile" style={{ display: 'grid', gap: 8 }}>
            <Link href="/" aria-current={path === '/' ? 'page' : undefined} onClick={() => setOpen(false)}>Home</Link>
            {LINKS.map(l => <Link key={l.href} href={l.href} aria-current={path === l.href ? 'page' : undefined} onClick={() => setOpen(false)}>{l.label.replace(' →', '')}</Link>)}
          </nav>
        </div>
      )}
    </>
  );
}
