import type { Metadata } from 'next';
import RideMode from '@/components/ride/RideMode';
// Visual-only page with almost no text: keep it out of the index so it doesn't compete with tour pages.
export const metadata: Metadata = {
  title: 'Ride Mode',
  description: 'A full-screen cinematic exploration of Bhutan’s riding chapters.',
  alternates: { canonical: '/ride-mode' },
  robots: { index: false, follow: true },
};
export default function Page() { return <RideMode />; }
