# Bhutan Motorcycle Tours — Future of the Ride

Next.js 15 (App Router) · React 19 · TypeScript strict · Leaflet + OpenStreetMap · Zod.

## Run
```bash
npm install
cp .env.example .env.local   # optional: RESEND_* vars for real email delivery
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Routes
- `/`: ignition intro → riding video hero → scroll-scrubbed POV ride → 3D machine → expedition selector → finale
- `/ride-mode`: full-screen cinematic chapters with play/pause, fullscreen and exit
- `/explore-bhutan?tour=spine`: Leaflet/OSM map with animated route marker, scrubber and instrument cluster
- `/plan-your-ride`: 9-step Expedition Control planner, session-persisted
- `/api/enquiry`: POST with Zod validation, honeypot and rate limit. Runs in **mock mode** (and the UI says so) until RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL are set

## Editing content
`src/lib/content.ts`: places, draft tours, chapters, motorcycle components, video URLs, Sketchfab ID.

## Before launch
- Replace temporary Mixkit video (not Bhutan) with licensed footage in `public/videos/` and update `VIDEO`.
- Check that the Sketchfab model ID renders, or swap in a verified model.
- Confirm business facts (ASSETS-AND-AUDIT.md). Tours are editorial drafts.
- Images are hotlinked from Wikimedia Commons. Download them locally and keep attributions.
- Not yet built: /motorcycle-tours, /our-motorcycles, /about, /activities/*, /gallery, /journal, /faq, /contact, /privacy, /terms.
- Not yet compiled or tested here. Run `npm run typecheck` and `npm run build`.
