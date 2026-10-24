# Bhutan Motorcycle Tours — Future of the Ride

Next.js 15 (App Router) · React 19 · TypeScript · Leaflet + OpenStreetMap · Zod.

## Run
```bash
npm install
cp .env.example .env.local   # optional: RESEND_* vars for real email delivery
npm run dev                  # http://localhost:3000
npm run typecheck
npm run build && npm start
```

## Folder layout
```
public/                 files served at the site root
  brand/logo.png        header, favicon, mobile menu
  images/places/        stop and tour photos
  images/bike/          illustrative motorcycle
  videos/               drop licensed clips here later
src/
  app/                  routes and API
  components/
    layout/             header
    home/               home page experience
    map/                terrain explorer
    planner/            expedition planner
    ride/               ride mode
  lib/
    assets.ts           public-file paths
    content.ts          places, tours, chapters
    enquiry.ts          form schema
docs/                   audit notes and asset credits
scripts/                Commons photo download helper
```

Add or replace a photo by putting the file in `public/images/...` and pointing at it from `src/lib/content.ts`. Paths are site-root relative: `/images/places/paro.jpg`.

## Routes
- `/`: ignition intro → riding video hero → scroll-scrubbed POV ride → 3D machine → expedition selector → finale
- `/ride-mode`: full-screen cinematic chapters with play/pause, fullscreen and exit
- `/explore-bhutan?tour=spine`: Leaflet/OSM map with animated route marker, scrubber and instrument cluster
- `/plan-your-ride`: 9-step Expedition Control planner, session-persisted
- `/api/enquiry`: POST with Zod validation, honeypot and rate limit. Runs in **mock mode** until RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL are set

## Before launch
- Replace temporary Mixkit video (not Bhutan) with licensed footage in `public/videos/` and update `VIDEO` in `src/lib/content.ts`.
- Confirm business facts (`docs/ASSETS-AND-AUDIT.md`). Tours are editorial drafts.
- Keep Commons attributions wherever those photos are shown.
- Not yet built: /motorcycle-tours, /our-motorcycles, /about, /activities/*, /gallery, /journal, /faq, /contact, /privacy, /terms.
