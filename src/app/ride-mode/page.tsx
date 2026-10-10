import type { Metadata } from 'next';
import RideMode from '@/components/RideMode';
export const metadata: Metadata = { title: 'Ride Mode', description: 'A full-screen cinematic exploration of Bhutan’s riding chapters.' };
export default function Page() { return <RideMode />; }
