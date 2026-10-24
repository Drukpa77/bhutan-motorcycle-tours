import type { Metadata } from 'next';
import TerrainExplorer from '@/components/map/TerrainExplorer';
export const metadata: Metadata = { title: 'Explore Bhutan — Terrain System', description: 'Trace expedition routes across a real map of Bhutan.' };
export default async function Page({ searchParams }: { searchParams: Promise<{ tour?: string }> }) {
  const { tour } = await searchParams;
  return (
    <main id="main" style={{ paddingTop: 72 }}>
      <section className="stack" style={{ padding: 'clamp(24px,5vw,48px) var(--pad) 32px', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: 'clamp(16px,4vw,40px)', alignItems: 'end' }}>
        <div><div className="mono" style={{ color: 'var(--orange)' }}>Terrain system · 27.5°N 90.4°E</div><h1 className="display" style={{ fontSize: 'clamp(44px,7vw,112px)', marginTop: 12 }}>Ride the map<br />before the road</h1></div>
        <p style={{ color: '#c7cdcf', lineHeight: 1.6, margin: 0, maxWidth: '46ch' }}>Pick a route and press play. Every stop sits at its real position on OpenStreetMap. The lines between them are <em>approximate connections</em>, not traced road geometry.</p>
      </section>
      <TerrainExplorer initialTour={tour} />
    </main>
  );
}
