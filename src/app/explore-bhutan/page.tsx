import type { Metadata } from 'next';
import TerrainExplorer from '@/components/map/TerrainExplorer';
// ?tour= variants are views of this one page, so they all canonicalise here.
export const metadata: Metadata = {
  title: 'Bhutan Motorcycle Route Map: Paro to Bumthang',
  description: 'Interactive map of Bhutan motorcycle routes. Trace every stop, pass and elevation from Paro over Dochula, Pele La and Yotong La to Bumthang, on OpenStreetMap.',
  alternates: { canonical: '/explore-bhutan' },
};
export default async function Page({ searchParams }: { searchParams: Promise<{ tour?: string }> }) {
  const { tour } = await searchParams;
  return (
    <main id="main" style={{ paddingTop: 72 }}>
      <section className="stack" style={{ padding: 'clamp(24px,5vw,48px) var(--pad) 32px', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: 'clamp(16px,4vw,40px)', alignItems: 'end' }}>
        <div><div className="mono" style={{ color: 'var(--orange)' }}>Bhutan route map · 27.5°N 90.4°E</div><h1 className="display" style={{ fontSize: 'clamp(44px,7vw,112px)', marginTop: 12 }}>Ride the map<br />before the road</h1></div>
        <p style={{ color: '#c7cdcf', lineHeight: 1.6, margin: 0, maxWidth: '46ch' }}>Pick a Bhutan motorcycle route and press play. Every stop sits at its real position on OpenStreetMap. The lines between them are <em>approximate connections</em>, not traced road geometry.</p>
      </section>
      <TerrainExplorer initialTour={tour} />
    </main>
  );
}
