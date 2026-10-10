import Link from 'next/link';
export default function NotFound() {
  return <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 28 }}><div><p className="mono" style={{ color: 'var(--orange)' }}>404 // Off route</p><h1 className="display" style={{ fontSize: 'clamp(64px,12vw,180px)' }}>Wrong turn</h1><Link className="btn btn-orange" href="/" style={{ marginTop: 24 }}>Back to base →</Link></div></main>;
}
