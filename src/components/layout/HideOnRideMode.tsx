'use client';
import { usePathname } from 'next/navigation';

/** Renders server-built children everywhere except the full-screen ride mode. */
export default function HideOnRideMode({ children }: { children: React.ReactNode }) {
  return usePathname() === '/ride-mode' ? null : <>{children}</>;
}
