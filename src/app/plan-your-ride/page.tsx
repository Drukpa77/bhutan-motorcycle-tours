import type { Metadata } from 'next';
import Planner from '@/components/planner/Planner';
export const metadata: Metadata = { title: 'Expedition Control — Plan your ride', description: 'Configure a custom Bhutan motorcycle expedition and send an enquiry.' };
export default function Page() { return <Planner />; }
