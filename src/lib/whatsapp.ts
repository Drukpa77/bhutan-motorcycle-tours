import { CONTACT } from './content';

/** WhatsApp chat link with a pre-filled itinerary request. Usable from server and client components. */
export const whatsappLink = (tourName: string, days?: number) =>
  `${CONTACT.whatsappHref}?text=${encodeURIComponent(`Hi! I’d like the full itinerary for the ${tourName} motorcycle tour${days ? ` (${days} days)` : ''}.`)}`;
