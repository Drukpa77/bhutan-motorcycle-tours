# Keyword strategy: bhutanmotorcycletours.com

Prepared 7 November 2026. Owner: site team. Review quarterly, or whenever a page is added.

## 1. Method and limits

- **Inputs:**
  - The 7 competitor pages you supplied, all fetched and analysed.
  - SERP sampling for the head term and related queries.
  - The operator's own published tour terms: Bhutan Mind Vacation Tours, 16-Day Happiness Tour PDF (2025).
- **No search-volume tool was used.** Priorities are based on SERP intent, how many competitors target a phrase, and how thinly they cover it. They are not based on volume figures. After 4–6 weeks, replace these estimates with real data from Google Search Console (Performance → Queries).
- **Every fact on the site is sourced:**
  - Operator facts come from the operator's PDF and website.
  - Government fees come from multiple 2026 sources.
  - Coordinates and elevations come from OpenStreetMap and Open-Meteo.
  - Re-check the SDF, visa and permit rules each season.

## 2. Competitor findings (page 1 for "bhutan motorcycle tours")

| Competitor | Strength | Weakness we exploit |
|---|---|---|
| Bhutan Dragon Riders (bhutanmototours.com) | Brand, licence no., socials | ~250 words, no itinerary/price/bikes |
| Bhutan & Beyond (bhutan.com.au) | Cost transparency (fuel, tips) | No itinerary, no package price |
| Bhutan TUSK | Price-from table, trust stack, SDF/visa explained | No day-by-day, stale "next departure", unverified claims |
| Extreme Bike Tours | Full price, inclusions, FAQ, Trustpilot | Itinerary gated behind form, sub-page of multi-country site |
| MotoBirds | Broad destination copy (~1,300 words) | No tour detail, Polish labels, typos |
| Two Wheeled Expeditions | Price, stats, Tripadvisor badges | Itinerary gated, departure already passed |
| Motorcycle Paradise (blog) | First-person day-by-day | Not an operator: no booking path |

**Gaps that none of them fill and that we now cover:**
1. An open day-by-day itinerary on the sales page.
2. An itemised cost breakdown with payment and cancellation terms.
3. Licence and permit rules for riders.
4. Named passes with heights.
5. Altitude advice.
6. Season-by-route advice.
7. An operations walkthrough of how a tour actually runs.

## 3. Keyword map (one primary cluster per URL, to avoid pages competing with each other)

| Priority | Cluster (primary → supporting) | Intent | URL |
|---|---|---|---|
| P1 | **bhutan motorcycle tours** → motorcycle tour bhutan, bhutan motorbike tour, bhutan bike tour, guided motorcycle tour bhutan, royal enfield bhutan tour | Commercial | `/motorcycle-tours` (+ home) |
| P1 | **bhutan motorcycle tour itinerary** → west to east bhutan motorcycle tour, 16 day bhutan motorcycle tour, eastern bhutan motorcycle | Commercial | `/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour` |
| P1 | **bhutan motorcycle tour cost** → bhutan bike trip cost, bhutan SDF motorcycle, bhutan motorcycle tour price | Commercial/info | `/guides/bhutan-motorcycle-tour-cost` |
| P2 | **ride motorcycle in bhutan** → bhutan motorcycle permit, international driving permit bhutan, can you ride in bhutan without a guide, bhutan bike trip from india | Info | `/guides/riding-a-motorcycle-in-bhutan` |
| P2 | **best time for motorcycle tour bhutan** → bhutan monsoon riding, bhutan festivals dates | Info | `/guides/best-time-for-a-motorcycle-tour-in-bhutan` |
| P2 | **bhutan mountain passes** → chele la pass, thrumshing la, dochula pass, pele la, highest motorable pass bhutan | Info | `/guides/bhutan-mountain-passes-by-motorcycle` |
| P3 | paro to bumthang motorcycle, lateral road bhutan | Commercial | `/motorcycle-tours/dragons-spine-paro-to-bumthang` |
| P3 | chele la haa motorcycle, western bhutan motorcycle loop | Commercial | `/motorcycle-tours/western-valleys-chele-la-haa-punakha` |
| P3 | bhutan motorcycle route map | Info | `/explore-bhutan` |

### Next content to build (in order)
1. **Bhutan bike trip from India.** Indian riders are a large search segment: Phuentsholing entry, own-bike permits, ₹1,200 SDF. Only write this once the operator confirms current own-bike permit rules.
2. **Royal Enfield 500 in Bhutan: the fleet.** Give specs, seat height and pillion setup. This needs fleet photos.
3. **Bhutan motorcycle rental.** Only if the operator offers guided rental without a full tour.
4. **Rider stories.** Turn each testimonial video into a short write-up with the embedded video.

## 4. What was built (7 Nov 2026)

- **New 16-day West to East tour page,** using the operator's real itinerary, crew, fleet and terms. It has 1,980 words and a day-by-day table.
- **Four guides** (830–1,080 words each), with Article, FAQPage and Breadcrumb schema and internal links to the tours.
- **Tours hub:** an operations walkthrough of how a tour runs, a list of what's included, the trust strip and testimonials.
- **Every tour page:** duration, bike, support crew, itinerary, inclusions, trust strip, testimonials and links to the guides.
- **Site-wide footer:** links to tours and guides, a link to the operator and its licence, and links to its social profiles.
- **Structured data:** TravelAgency schema now includes `parentOrganization` (Bhutan Mind Vacation Tours), with `sameAs` links to its Facebook, Instagram, X, Tripadvisor and Department of Tourism profiles.
- **Testimonials system ready** (`src/lib/testimonials.ts`). See section 6.

## 5. Backlink plan

Links *from* other sites are what count. Links from our site to others help with trust but are not backlinks. Work through these in order:

| # | Source | Action | Anchor text |
|---|---|---|---|
| 1 | bhutanmindvacation.com/tour-types/bhutan-motorcycle-tour | Add a prominent link to our tours hub | "Bhutan motorcycle tours" |
| 2 | bhutanmindvacation.com footer or home | Add a site-wide link | "Bhutan Motorcycle Tours" |
| 3 | Google Business Profile | Create the profile, set the website field, then add the review link to `OPERATOR.googleReviews` | n/a |
| 4 | Tripadvisor listing (BMV) | Mention the motorcycle site in the owner's description or responses | n/a |
| 5 | Facebook page and Instagram bio (BMV, or new brand accounts) | Add the site link to the bio; post each guide | Page URL |
| 6 | Department of Tourism operator listing | Ask for the website field to include this site | n/a |
| 7 | Rider forums: ADVrider, Horizons Unlimited, Royal Enfield owner groups | Post useful answers and trip reports. No link spam. | Natural |
| 8 | Rider bloggers (e.g. motorcycleparadise.net) | Invite a ride or offer a guest post with real itinerary data | Natural |
| 9 | Hotels on the route (Aja Village, Valley Resort, etc.) | Ask for a partner link on their "getting here" or activities page | "motorcycle tours in Bhutan" |

Avoid buying links, joining link networks and running comment spam. They put the domain at risk.

## 6. Testimonials and reviews

- **Videos:** upload to YouTube, which hosts them free and makes them discoverable in YouTube search. Then add the ID to `VIDEO_TESTIMONIALS`. The site shows a click-to-play poster, so no YouTube scripts load until a visitor clicks, and it outputs `VideoObject` schema.
- **Reviews:** copy them word for word from Google or Tripadvisor into `REVIEWS`, with the link to the original.
- **Star ratings in search:** we deliberately don't output Review or AggregateRating schema. Google ignores self-published reviews for star snippets, and it risks a manual action. Stars in search come from your Google Business Profile.

## 7. Measurement

- **Search Console:** Performance → Queries, filtered by page. Track position and click-through rate for each P1 cluster monthly.
- **Low click-through:** if a page shows high impressions but low CTR, rewrite its title and description first.
- **Positions 8–20:** if a page sits there for a P1 term, add depth to it: photos, video, a rider story or more FAQs.
