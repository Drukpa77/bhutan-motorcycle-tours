# Backlink outreach kit

Use this alongside [keyword-strategy.md](keyword-strategy.md). Work top to bottom: the first section is the fastest and highest value.
Tick items off as you go, and note the date the link went live.

## Business details: use exactly this everywhere

Search engines cross-check these details across sites. Copy them character for character:

```
Name:     Bhutan Motorcycle Tours (by Bhutan Mind Vacation Tours)
Website:  https://bhutanmotorcycletours.com
Address:  House No PHA-1-38, Unit 01-01, Babesa, Thimphu 11001, Bhutan
Phone:    +975 7763 6226  (WhatsApp same)
Email:    info@bhutanmindvacation.com
Category: Motorcycle tour operator / Tour operator
Short description (150 chars):
  Guided Bhutan motorcycle tours on Royal Enfield 500s with guide, mechanic and backup 4x4. Licensed Bhutanese operator.
```

---

## Tier 1: links you control (do this week)

### 1. bhutanmindvacation.com, motorcycle page
Paste near the top of https://www.bhutanmindvacation.com/tour-types/bhutan-motorcycle-tour:

```html
<p>
  Full itineraries, routes and rider guides are on our dedicated motorcycle site:
  <a href="https://bhutanmotorcycletours.com/motorcycle-tours">Bhutan motorcycle tours</a>
  (including the <a href="https://bhutanmotorcycletours.com/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour">16-day West to East tour</a>).
</p>
```
Don't add `rel="nofollow"`. This is your own brand, so a normal link is correct.

### 2. bhutanmindvacation.com, footer (every page)
```html
<a href="https://bhutanmotorcycletours.com">Bhutan Motorcycle Tours</a>
```

### 3. The new BMV website (bhutan-mind-vision redesign)
When it is built, link the "Adventure" experience (`src/content/index.ts`, id `adventure`, which mentions "motorcycle routes") to `https://bhutanmotorcycletours.com/motorcycle-tours`, and keep the footer link.

### 4. Social profiles
| Profile | Where | What |
|---|---|---|
| Facebook (facebook.com/Bhutanmindvacation) | About → Website | Add `https://bhutanmotorcycletours.com` as a second website |
| Instagram (@bmvtours) | Bio links | Add the tours page |
| X (@bmvtnt) | Bio | Add the site |
| YouTube (when created) | Channel → Links, and the description of every testimonial video | Link the tour the rider did |

Social links don't pass much ranking value on their own, but Google uses them to connect the brand, and they bring real visitors.

---

## Tier 2: listings and directories (free; do within 2 weeks)

| # | Site | How | Notes |
|---|---|---|---|
| 5 | **Google Business Profile** | business.google.com → add the business, or a service area under the BMV address | The biggest single local signal. Put the review link in `OPERATOR.googleReviews` in `src/lib/content.ts` |
| 6 | **Bing Places** | bingplaces.com → import from Google | 5 minutes after Google is done |
| 7 | **Apple Business Connect** | businessconnect.apple.com | Shows in Apple Maps |
| 8 | **Tripadvisor** (BMV listing) | Management Center → add a "Bhutan Motorcycle Tour" product, and mention the site in owner responses | The listing already has Travellers' Choice 2024 |
| 9 | **Horizons Unlimited tour operator links** | [horizonsunlimited.com/links/tour-operators](https://www.horizonsunlimited.com/links/tour-operators) → submit a link | The main rider directory; competitors such as Wild Triumph and Ferris Wheels are listed under Bhutan |
| 10 | **ABTO member directory** | [abto.org.bt](https://abto.org.bt/membership): if BMV is a member, use the Member Directory Update Form to add the website; if not, membership is open to licensed operators | Bhutan-specific and high trust |
| 11 | **Department of Tourism operator listing** | [tourism.gov.bt/tour-operators/1028761](https://www.tourism.gov.bt/tour-operators/1028761): ask DoT to add or update the website field | A government link is the most authoritative one available |

---

## Tier 3: outreach (ongoing, 2–3 emails a week)

### 12. Partner hotels on the route
Targets from the operator's itinerary: Aja Village Resort (Paro), Valley Resort (Bumthang), Hotel Drukgyal Twin Tower (Thimphu), Hotel River Valley (Punakha), Sonam Zhiday Resort (Haa), Druk Doethjong Resort (Trashigang), Hotel Wangchuk (Mongar).
Many have only booking-site listings. Ask the ones with their own website.

> **Subject:** Our riders stay with you: a link swap?
>
> Kuzuzangpo [name],
>
> Our motorcycle groups have stayed at [hotel] on our [West to East Bhutan] tour, and riders always mention [the hot stone bath / the view / secure bike parking].
>
> We've just published our full itinerary at bhutanmotorcycletours.com, and we'd like to mention [hotel] as a recommended stop. Would you be open to adding a line on your site, on an activities or "getting here" page, linking to our motorcycle tours?
>
> Suggested text: "Exploring Bhutan by motorcycle? See guided Royal Enfield tours from [Bhutan Motorcycle Tours](https://bhutanmotorcycletours.com/motorcycle-tours)."
>
> Thank you, and see you next season.
> [Name], Bhutan Mind Vacation Tours · +975 7763 6226

### 13. Rider bloggers and travel writers
Targets: Motorcycle Paradise (motorcycleparadise.net, which ranks on page 1 for your keyword), TravelTriangle (covered the Royal Enfield Tour of Bhutan 2025), and riders who post Bhutan trips on YouTube.

> **Subject:** Day-by-day data for your Bhutan motorcycle readers
>
> Hi [name],
>
> I read your [post title], and your honest take on [specific detail, e.g. the cold at the passes] is exactly what riders need.
>
> We're a licensed Bhutanese operator, and we've just published a free guide with every pass height, the SDF and permit rules, and a 16-day day-by-day itinerary: [link to the most relevant guide].
>
> If it's useful, feel free to link to it for readers planning a trip. If you're ever riding in Bhutan again, we'd be glad to host you on a route.
>
> [Name], Bhutan Motorcycle Tours

Swap in the guide that best fits each target:
- Costs → `/guides/bhutan-motorcycle-tour-cost`
- Rules → `/guides/riding-a-motorcycle-in-bhutan`
- Season → `/guides/best-time-for-a-motorcycle-tour-in-bhutan`
- Passes → `/guides/bhutan-mountain-passes-by-motorcycle`

### 14. Forums: help, don't advertise
On Horizons Unlimited (the HUBB Bhutan threads) and ADVrider, answer real questions such as permits, SDF, season and which passes. Link to a guide only when it directly answers the question. Disclose that you're the operator. Undisclosed self-promotion gets accounts banned.

### 15. Past riders
After every tour, email the group: ask for a Google review, permission to use their video, and, if they blog or post, a link to the tour they rode.

---

## Don't
- Buy links, use "SEO packages" offering hundreds of backlinks, or join link-exchange networks. Google penalises them.
- Post the same comment on many blogs.
- Change the business details between listings.

## Tracking
| # | Target | Date asked | Live? | URL of link |
|---|---|---|---|---|
| 1 | BMV motorcycle page | | | |
| 2 | BMV footer | | | |
| 5 | Google Business Profile | | | |
| 9 | Horizons Unlimited | | | |
| 10 | ABTO directory | | | |
| 11 | DoT listing | | | |

Check progress in Search Console → Links → Top linking sites (new links take 2–8 weeks to appear).
