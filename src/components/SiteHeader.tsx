'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  useEffect(() => setOpen(false), [path]);
  if (path === '/ride-mode') return null;
  return (
    <>
      <header className="sitehead">
        <Link href="/" className="display" style={{ fontSize: 22, textDecoration: 'none' }}>BMT/</Link>
        <nav aria-label="Primary" className="mono">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? 'page' : undefined} style={path === l.href ? { color: 'var(--orange)' } : undefined}>{l.label}</Link>
          ))}
        </nav>
        <button className="menu mono" aria-expanded={open} aria-controls="mobilenav" onClick={() => setOpen(true)}>Menu</button>
      </header>
      {open && (
        <div id="mobilenav" className="mobilenav" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="btn btn-ghost" style={{ position: 'absolute', top: 18, right: 18 }} onClick={() => setOpen(false)}>Close ✕</button>
          <Link href="/">Home</Link>
          {LINKS.map(l => <Link key={l.href} href={l.href}>{l.label.replace(' →', '')}</Link>)}
        </div>
      )}
    </>
  );
}
