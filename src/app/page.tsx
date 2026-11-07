import type { Metadata } from 'next';
import HomeExperience from '@/components/home/HomeExperience';
import Testimonials from '@/components/content/Testimonials';
import TrustStrip from '@/components/content/TrustStrip';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Page() {
  return <HomeExperience testimonials={<><TrustStrip /><Testimonials /></>} />;
}
