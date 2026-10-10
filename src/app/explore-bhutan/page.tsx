import type { Metadata } from 'next';
import TerrainExplorer from '@/components/TerrainExplorer';
export const metadata: Metadata = { title: 'Explore Bhutan — Terrain System', description: 'Trace expedition routes across a real map of Bhutan.' };
export default async function Page({ searchParams }: { searchParams: Promise<{ tour?: string }> }) {
  const { tour } = await searchParams;
  return (
    <main style={{ paddingTop: 72 }}>
      <section className="stack" style={{ padding: '48px 28px 32px', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: 40, alignItems: 'end' }}>
        <div><div className="mono" style={{ color: 'var(--orange)' }}>Terrain system · 27.5°N 90.4°E</div><h1 className="display" style={{ fontSize: 'clamp(48px,7vw,112px)', marginTop: 12 }}>Ride the map<br />before the road</h1></div>
        <p style={{ color: '#c7cdcf', lineHeight: 1.6, margin: 0, maxWidth: '46ch' }}>Pick a route and press play. Every stop sits at its real position on OpenStreetMap. The lines between them are <em>approximate connections</em>, not traced road geometry.</p>
      </section>
      <TerrainExplorer initialTour={tour} />
    </main>
  );
}
