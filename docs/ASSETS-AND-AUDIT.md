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

## 4. Asset register (local copies in `/public`)
Authors and licences were read from the Commons API on 10 Oct 2026. Files were downloaded into `/public/images` on 24 Oct 2026. Re-fetch with `node scripts/download-commons.mjs`.

| Local path | Commons source | Author | Licence | Shows |
|---|---|---|---|---|
| `/brand/logo.png` | Operator artwork | — | Operator | Header mark, favicon, mobile menu |
| `/images/places/paro.jpg` | Rinpung_Dzong,_Bhutan_17.jpg | Bernard Gagnon | CC BY-SA 4.0 | Rinpung Dzong & Nemi Zam, Paro |
| `/images/places/chele-la.jpg` | Chele_La_Pass_-_Paro_-_during_LGFC_-_Bhutan_2019_(01).jpg | Vinayaraj | CC BY-SA 4.0 | Chele La |
| `/images/places/haa.jpg` | Lhakhag_Karpo_Haa_Bhutan.jpg | Christopher J. Fynn | CC BY-SA 3.0 | Lhakhang Karpo, Haa |
| `/images/places/thimphu.jpg` | Tashichho_Dzong_2012-11-19.jpg | Christopher J. Fynn | CC BY-SA 3.0 | Tashichho Dzong, Thimphu |
| `/images/places/dochula.jpg` | Druk_Wangyal_Chortens,_Bhutan_01.jpg | Bernard Gagnon | CC BY-SA 4.0 | Dochula |
| `/images/places/dochula-wide.jpg` | Dochu_La_Pass,_108_Druk_Wangyal_Chortens_(15818199106).jpg | Arian Zwegers | CC BY 2.0 | Dochula wide |
| `/images/places/punakha.jpg` | Punakha_Dzong,_Bhutan_04.jpg | Bernard Gagnon | CC BY-SA 4.0 | Punakha Dzong |
| `/images/places/punakha-alt.jpg` | Punakha_dzong.jpg | Stephen Shephard | CC BY-SA 3.0 | Punakha Dzong |
| `/images/places/phobjikha.jpg` | Gangte_Goemba_in_the_Phobjika_Valley,_Bhutan_(26)_-_44254128071.jpg | Prof. Mortel | CC BY 2.0 | Gangtey Goemba |
| `/images/places/phobjikha-valley.jpg` | Phobjika_Valley,_Bhutan_(12)_-_44206217132.jpg | Prof. Mortel | CC BY 2.0 | Phobjikha valley |
| `/images/places/pele-la.jpg` | Pele_La_Pass.jpg | RPSkokie | CC BY-SA 4.0 | Chorten at Pele La |
| `/images/places/trongsa.jpg` | Trongsa_Dzong_2001_a.jpg | Christopher Fynn | CC BY-SA 3.0 | Trongsa Dzong |
| `/images/places/bumthang.jpg` | Jakar_Dzong,_Bumthang.jpg | Christopher J. Fynn | CC BY-SA 3.0 | Jakar Dzong |
| `/images/places/yotong-la.jpg` | Pele_La_pass_on_the_Nubding_to_Wandue_Phodrang_highway_-_Bhutan_-_panoramio.jpg | David Broad | CC BY 3.0 | **Yotong La stand-in** |
| `/images/bike/himalayan.jpg` | Royal_Enfield_Himalayan.jpg | Tritinum | CC BY-SA 4.0 | Illustrative bike, not fleet |

Yotong La is the only stop without a photo of the place itself: Commons has none. Its credit is labelled "Stand-in" on the map. Replace it with operator photography, along with fleet and team photos.

Pele La and Yotong La coordinates were corrected to OpenStreetMap (Pele La 27.5372, 90.2029; OSM spells Yotong La "Yutong La", 27.5169, 90.5863).

**Not sourced:** hero video, 3D model, HDRIs, audio. Licences for these could not be verified or downloaded here, so none were faked. The hero uses a photo with a headlight-style light reveal. Drop a licensed clip at `/videos/hero-motorcycle.mp4` in production.

## 5. Scope of this pass vs. the brief
Built as an interactive prototype (not the Next.js codebase): Home, Explore Bhutan (Leaflet + OSM, animated route), Plan Your Ride (9-step planner, session-persisted, validated, honeypot, **no fake success**: it shows "not sent" with email/print fallbacks).
Next: tour catalogue + detail template, motorcycles page, activity pages, about, gallery, journal, FAQ, contact, legal, then the Next.js handoff.
