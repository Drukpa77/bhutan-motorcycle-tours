# Bhutan Motorcycle Tours — Audit, Assumptions & Asset Register
Accessed 10 Oct 2026.

## 1. Site audit status
- **bhutanmotorcycletours.com: INACCESSIBLE** from this environment. The domain did not appear in search, and none of its pages (Home, About, Motorcycle Tours, River Rafting, Bicycle Tours, Mountain Biking, Rock Climbing, Contact) could be inspected. No business facts were taken from it.
- Several similarly named operators exist (bhutanmotorcycletour.com, bhutanmototours.com, bhutanmotorcycle.com, bhutantuskmotorcycle.com). **None of their details were used**, to avoid attributing another company's facts to this one.

## 2. Needs confirmation from the owner
Company name/legal entity · phone · email · address · licence/TCB registration · fleet models & specs · tour names, durations, itineraries, road distances, prices · departure dates · guides & team bios · activity locations (rafting rivers/grades, MTB trails, climbing crags) · reviews · privacy/terms text.

## 3. Draft content (labelled in UI)
- Tours "Dragon’s Spine" and "Western Valleys" are **editorial route concepts**. They link real places, but are not operator tours.
- Map lines are **approximate straight connections**, not road geometry. Leg km = straight-line (haversine), labelled as such.
- Elevations are approximate public figures: Chele La 3,988 · Dochula 3,100 · Pele La 3,420 · Yotong La 3,425 · Punakha 1,250 · Phobjikha 2,900 m.
- The guide requirement ("all visitors accompanied by a licensed Bhutanese guide") is stated by multiple operators. Verify it against the Department of Tourism before launch.
- Motorcycle specs shown are published figures for the original Royal Enfield Himalayan (411 cc), via Wikimedia Commons file description. They are **illustrative, not fleet**.

## 4. Asset register (all hotlinked via Wikimedia `Special:FilePath`, not downloaded)
| File | Author | Licence (verify on file page) | Used | Bhutan? |
|---|---|---|---|---|
| Dochu_La_Pass,_108_Druk_Wangyal_Chortens_(15818199106).jpg | Flickr via Commons | CC BY 2.0 (Flickr import) | Home hero | Yes, Dochula |
| Dochula_on_Thimphu-Punakha_highway_Bhutan_-_panoramio.jpg | Panoramio user | CC BY-SA 3.0 (Panoramio import) | Seq. road, tour card, map | Yes |
| Druk_Wangyal_Chortens,_Bhutan_01.jpg | Bernard Gagnon | CC BY-SA (own work) | Story, map | Yes |
| Punakha_Dzong,_Bhutan_04.jpg | Bernard Gagnon | CC BY-SA (own work) | Story, map | Yes |
| Punakha_dzong.jpg | Stephen Shephard | CC BY-SA 2.5 / GFDL | Rafting tile | Yes, Mo Chhu |
| Gangte_Goemba_in_the_Phobjika_Valley,_Bhutan_(26)_-_44254128071.jpg | Prof. Mortel | CC BY 2.0 | Story, map | Yes |
| Phobjika_Valley,_Bhutan_(12)_-_44206217132.jpg | Prof. Mortel | CC BY 2.0 | Final CTA, map | Yes |
| The_Phobjikha_Valley.jpg | Phuentsho | Own work, check licence | Cycling tile | Yes |
| Masang_Kang_as_seen_from_Dochula_Pass.jpg | Kandukuru Nagarjun | CC BY 2.0 | Tour card, climbing tile | Yes |
| Simtokha_Dzong,_Bhutan_01.jpg | Bernard Gagnon | CC BY-SA (own work) | MTB tile, Thimphu | Yes |
| Druk_Wangyal_Lhakhang_Temple_at_Dochula_Pass.JPG | Dhruba Jyoti Baruah | Own work, check licence | Map (Paro stand-in) | Yes, but not Paro |
| Drametse_Lhakhang_(15658416298).jpg | Flickr via Commons | Check | Map (Bumthang stand-in) | Yes, eastern Bhutan, not Bumthang |
| A_tribute_to_the_'Royal_Enfield_Himalayan'.jpg | Commons | Check | Scroll sequence | Motorcycle, not fleet |
| Royal_Enfield_Himalayan.jpg | Tritinum | Own work, check licence | Showcase | Motorcycle, not fleet |
| Royal_Enfield_logo_on_motorcycle.JPG | Alfvanbeem | CC0 | Seq. detail | Detail, not fleet |

Stand-ins are flagged in map captions. Replace them with operator photography (Paro, Trongsa, Yotong La, Bumthang, fleet, team).

**Not sourced:** hero video, 3D model, HDRIs, audio. Licences for these could not be verified or downloaded here, so none were faked. The hero uses a photo with a headlight-style light reveal. Drop a licensed clip at `/videos/hero-motorcycle.mp4` in production.

## 5. Scope of this pass vs. the brief
Built as an interactive prototype (not the Next.js codebase): Home, Explore Bhutan (Leaflet + OSM, animated route), Plan Your Ride (9-step planner, session-persisted, validated, honeypot, **no fake success**: it shows "not sent" with email/print fallbacks).
Next: tour catalogue + detail template, motorcycles page, activity pages, about, gallery, journal, FAQ, contact, legal, then the Next.js handoff.
