import type { Metadata } from 'next';
import Planner from '@/components/planner/Planner';
export const metadata: Metadata = {
  title: 'Plan a Custom Bhutan Motorcycle Tour',
  description: 'Build a private Bhutan motorcycle tour: choose your dates, riding experience, bike and the passes you want to ride, then send it for an individual quote.',
  alternates: { canonical: '/plan-your-ride' },
};
export default function Page() { return <Planner />; }
