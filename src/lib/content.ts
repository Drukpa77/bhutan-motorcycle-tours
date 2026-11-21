export { BRAND, img, optimized } from './assets';

/**
 * Flip to true once info@bhutanmotorcycletours.com can RECEIVE mail (the domain needs MX records).
 * Until then it stays off the site and out of the enquiry recipients, so nothing bounces.
 */
const BRAND_MAILBOX_LIVE = false;

export const CONTACT = {
  country: 'Bhutan',
  phone: '+975 7763 6226',
  phoneHref: 'tel:+97577636226',
  whatsapp: '+975 7763 6226',
  whatsappHref: 'https://wa.me/97577636226',
  /** Shown on the site (footer, contact strip, schema, mailto links) and the default enquiry recipients. First = primary. */
  emails: BRAND_MAILBOX_LIVE
    ? ['info@bhutanmotorcycletours.com', 'bhutanmotorcycletours@gmail.com']
    : ['bhutanmotorcycletours@gmail.com'],
  address: ['House No PHA-1-38', 'Unit 01-01', 'Babesa', 'Thimphu 11001', 'Bhutan'],
};

/**
 * The licensed Bhutanese operator behind this site. Facts from bhutanmindvacation.com and the operator's
 * 16-day motorcycle tour PDF (2025). The licence link is the Department of Tourism's public operator listing.
 * Social links are the operator's own accounts; swap in dedicated motorcycle-brand accounts here if you create them.
 */
export const OPERATOR = {
  name: 'Bhutan Mind Vacation Tours',
  tradingName: 'BMV Tours and Treks',
  url: 'https://www.bhutanmindvacation.com',
  motorcyclePage: 'https://www.bhutanmindvacation.com/tour-types/bhutan-motorcycle-tour',
  licenceUrl: 'https://www.tourism.gov.bt/tour-operators/1028761',
  tripadvisor: 'https://www.tripadvisor.com/Attraction_Review-g293845-d14803907-Reviews-Bhutan_Mind_Vacation_Tours-Thimphu_Thimphu_District.html',
  award: 'Tripadvisor Travellers’ Choice 2024',
  social: {
    facebook: 'https://www.facebook.com/Bhutanmindvacation',
    instagram: 'https://www.instagram.com/bmvtours',
    x: 'https://twitter.com/bmvtnt',
    youtube: '', // Add a channel URL when testimonial videos go up.
  },
  /** Google Business Profile review link (g.page/r/... or the "Get more reviews" link). Empty hides it. */
  googleReviews: '',
};

/**
 * How tours are run. Source: the operator's 2026–27 itineraries (12, 13 and 16 days; originals in /itenaries,
 * which is git-ignored because they name clients). Confirmed per booking on the quote.
 */
export const OPERATIONS = {
  fleet: 'Royal Enfield Himalayan 411 & 450',
  crew: ['Motorcycle tour guide / road captain (English-speaking, trained by the Department of Tourism)', 'Motorcycle technician', 'Driver with a dedicated backup vehicle'],
  included: [
    'Royal Enfield Himalayan (411cc or 450cc) for every rider',
    'Dedicated backup vehicle with driver, carrying luggage, spares and any rider who needs a break',
    'English-speaking motorcycle tour guide and road captain, trained by Bhutan’s Department of Tourism',
    'Motorcycle technician on the road with the group',
    'Bhutan visa and route permits, applied for by us',
    'Bhutan’s Sustainable Development Fee and applicable taxes (current rates confirmed on your quote)',
    '3-star premium hotels and resorts, with village homestays and camps on remote routes',
    'Full board: breakfast, lunch and dinner every day',
    'Entry fees to dzongs, monasteries, temples and museums',
    'Sightseeing, airport transfers and baggage handling',
    'Farewell dinner with a Bhutanese cultural show, and a Bhutan T-shirt',
  ],
  excluded: [
    'Motorcycle fuel',
    'Travel and medical insurance (strongly recommended, covering motorcycle riding)',
    'Tips for your guide, technician and driver (at your discretion)',
    'Personal expenses and bank transfer charges',
  ],
  /** Extras the operator offers; good to mention, details on enquiry. */
  extras: [
    'Flights to Paro: the operator is an authorised sales agent for both Bhutanese airlines',
    'Moto camping, with a camping crew, chef and dining tent travelling with the group',
    'Guides who also speak German, French, Japanese, Mandarin or Hindi, on request',
    'Hotel upgrades to 4- and 5-star properties',
    'Rafting, mountain biking, trekking, heli tours and hot-stone baths',
  ],
  // Prices, fees and booking terms are TBA on the live site until the operator confirms them for 2026–27.
  // The operator's 2025 tour PDF had a deposit and cancellation schedule; re-add here once confirmed.
  payment: 'Deposit, payment schedule and cancellation terms: TBA. They are set out in full on your quote.',
};

/** Placeholder for any price, fee or permit detail not yet confirmed by the operator. */
export const TBA = 'TBA';

export const VIDEO = {
  // Temporary Mixkit footage (Mixkit Free License). NOT Bhutan. Replace with files in /public/videos/.
  hero: 'https://assets.mixkit.co/videos/31440/31440-720.mp4',
  pov: 'https://assets.mixkit.co/videos/31974/31974-720.mp4',
};

/** `img`/`credit` are optional: a stop without a photo renders as a text-only card. */
export type Place = { id: string; name: string; ll: [number, number]; elev: number; pass?: boolean; img?: string; credit?: string; alt: string; blurb: string };

// Coordinates: OpenStreetMap / public gazetteers. Elevations: approximate public figures.
// Photos: local copies in /public/images/places from Wikimedia Commons.
export const PLACES: Record<string, Place> = {
  paro: { id: 'paro', name: 'Paro', ll: [27.4305, 89.4133], elev: 2200, img: 'places/paro.jpg', credit: 'Rinpung Dzong · B. Gagnon · CC BY-SA 4.0', alt: 'Rinpung Dzong above the Paro Chhu river, Paro, Bhutan',
    blurb: 'Home to Bhutan’s only international airport, so most rides start here. Rinpung Dzong guards the Paro Chhu, and Taktsang (Tiger’s Nest) clings to the cliffs above the valley.' },
  chele: { id: 'chele', name: 'Chele La', ll: [27.3699, 89.3467], elev: 3988, pass: true, img: 'places/chele-la.jpg', credit: 'Chele La · Vinayaraj · CC BY-SA 4.0', alt: 'Prayer flags at Chele La pass between Paro and Haa, Bhutan',
    blurb: 'The highest motorable pass in western Bhutan, on the road between Paro and Haa. A long climb through forest to prayer flags at nearly 4,000 m, with views to Jomolhari on clear mornings.' },
  haa: { id: 'haa', name: 'Haa', ll: [27.387, 89.28], elev: 2670, img: 'places/haa.jpg', credit: 'Lhakhang Karpo · C. J. Fynn · CC BY-SA 3.0', alt: 'Lhakhang Karpo, the White Temple, in the Haa valley, Bhutan',
    blurb: 'A quiet border valley that only opened to visitors in 2002. Little traffic, farmhouses and the White and Black Temples (Lhakhang Karpo and Nagpo).' },
  thimphu: { id: 'thimphu', name: 'Thimphu', ll: [27.4728, 89.639], elev: 2330, img: 'places/thimphu.jpg', credit: 'Tashichho Dzong · C. J. Fynn · CC BY-SA 3.0', alt: 'Tashichho Dzong, the seat of government in Thimphu, Bhutan',
    blurb: 'The capital, and famously without traffic lights. Tashichho Dzong houses the throne room and government offices on the banks of the Wang Chhu.' },
  dochula: { id: 'dochula', name: 'Dochula', ll: [27.4914, 89.7503], elev: 3100, pass: true, img: 'places/dochula.jpg', credit: 'Druk Wangyal Chortens · B. Gagnon · CC BY-SA 4.0', alt: 'The 108 Druk Wangyal chortens on Dochula pass, Bhutan',
    blurb: 'The pass between Thimphu and Punakha, crowned by the 108 Druk Wangyal chortens. On clear days the eastern Himalaya lines the horizon.' },
  punakha: { id: 'punakha', name: 'Punakha', ll: [27.581, 89.8631], elev: 1250, img: 'places/punakha.jpg', credit: 'Punakha Dzong · B. Gagnon · CC BY-SA 4.0', alt: 'Punakha Dzong at the confluence of the Pho Chhu and Mo Chhu rivers, Bhutan',
    blurb: 'The former capital, in a warm, low valley. Punakha Dzong sits where the Pho Chhu and Mo Chhu rivers meet, at the bottom of a long descent from Dochula.' },
  phob: { id: 'phob', name: 'Phobjikha', ll: [27.4626, 90.18], elev: 2900, img: 'places/phobjikha.jpg', credit: 'Gangtey Goemba · Prof. Mortel · CC BY 2.0', alt: 'Gangtey Goemba monastery above the Phobjikha valley, Bhutan',
    blurb: 'A wide glacial valley watched over by Gangtey Goemba, and the winter home of endangered black-necked cranes.' },
  pele: { id: 'pele', name: 'Pele La', ll: [27.5372, 90.2029], elev: 3420, pass: true, img: 'places/pele-la.jpg', credit: 'Chorten at Pele La · RPSkokie · CC BY-SA 4.0', alt: 'Chorten and prayer flags at Pele La pass, Bhutan',
    blurb: 'The crossing of the Black Mountains and the traditional divide between western and central Bhutan. Yak pasture and dwarf bamboo near the top.' },
  trongsa: { id: 'trongsa', name: 'Trongsa', ll: [27.4997, 90.5072], elev: 2180, img: 'places/trongsa.jpg', credit: 'Trongsa Dzong · C. J. Fynn · CC BY-SA 3.0', alt: 'Trongsa Dzong on a ridge above the Mangde Chhu gorge, Bhutan',
    blurb: 'The ancestral seat of Bhutan’s royal family. Trongsa Dzong spills down a ridge above the Mangde Chhu gorge, and the road reveals it long before you arrive.' },
  yotong: { id: 'yotong', name: 'Yotong La', ll: [27.5169, 90.5863], elev: 3425, pass: true, img: 'places/yotong-la.jpg', credit: 'Stand-in: prayer flags near Pele La · D. Broad · CC BY 3.0', alt: 'Prayer flags on a high Bhutanese pass (stand-in photo for Yotong La)',
    blurb: 'The last big climb of the lateral road, between Trongsa and Bumthang, through fir and rhododendron forest.' },
  bumthang: { id: 'bumthang', name: 'Bumthang', ll: [27.5492, 90.7525], elev: 2600, img: 'places/bumthang.jpg', credit: 'Jakar Dzong · C. J. Fynn · CC BY-SA 3.0', alt: 'Jakar Dzong overlooking the Chamkhar valley, Bumthang, Bhutan',
    blurb: 'Bhutan’s spiritual heartland: four valleys holding some of the country’s oldest temples, including Jambay Lhakhang and Kurjey, below Jakar Dzong.' },
  // Eastern Bhutan. Coordinates: OpenStreetMap (Nominatim). Elevations: Open-Meteo DEM at that point, rounded.
  // Photos: Wikimedia Commons (files named in each credit), local copies in /public/images/places.
  ura: { id: 'ura', name: 'Ura', ll: [27.4789, 90.9057], elev: 3100, img: 'places/ura.jpg', credit: 'Ura Mang gi Lhakhang · C. J. Fynn · CC BY-SA 4.0', alt: 'Ura Mang gi Lhakhang temple in Ura village, Bumthang, Bhutan',
    blurb: 'A stone-built village at about 3,100 m, one of the highest in central Bhutan. Narrow lanes, buckwheat fields, and pancakes and ara with a local family.' },
  thrumshing: { id: 'thrumshing', name: 'Thrumshing La', ll: [27.4017, 90.9962], elev: 3750, pass: true, img: 'places/thrumshing-la.jpg', credit: 'Thrumshing La · Wmarcc · CC BY-SA 3.0', alt: 'The road over Thrumshing La under prayer flags and fir trees, Bhutan',
    blurb: 'The highest pass on the lateral road, at about 3,750 m, inside Thrumshingla National Park. On the far side the road drops through cliffs and cloud forest towards Sengor and Mongar.' },
  mongar: { id: 'mongar', name: 'Mongar', ll: [27.2757, 91.2403], elev: 1600, img: 'places/mongar.jpg', credit: 'View of Mongar town · C. J. Fynn · CC BY-SA 3.0', alt: 'Mongar town on its ridge, eastern Bhutan',
    blurb: 'The gateway to eastern Bhutan, unusually built on a ridge rather than a valley floor. A working town that sees few visitors.' },
  lhuentse: { id: 'lhuentse', name: 'Lhuentse', ll: [27.6656, 91.1867], elev: 1470, img: 'places/lhuentse.jpg', credit: 'Lhuentse Dzong · muddum27 · CC BY 2.0', alt: 'Lhuentse Dzong above the Kuri Chhu, Bhutan',
    blurb: 'The ancestral home of Bhutan’s royal family, reached by a quiet road up the Kuri Chhu gorge. Lhuentse Dzong sits on a spur high above the river, Takila has a 154-foot statue of Guru Nangsa Zelen, and nearby Khoma village is famous for weaving Kishuthara, one of Bhutan’s most prized textiles.' },
  trashigang: { id: 'trashigang', name: 'Trashigang', ll: [27.3363, 91.5513], elev: 1000, img: 'places/trashigang.jpg', credit: 'Trashigang Dzong · C. J. Fynn · CC BY-SA 3.0', alt: 'Trashigang Dzong above the Drangme Chhu, eastern Bhutan',
    blurb: 'The far east’s biggest town, below a 17th-century dzong built on a spur above the Drangme Chhu. The road in from Mongar crosses Kori La at about 2,400 m.' },
  yangtse: { id: 'yangtse', name: 'Trashi Yangtse', ll: [27.6060, 91.4949], elev: 1740, img: 'places/chorten-kora.jpg', credit: 'Chorten Kora · Vikramjit Kakati · CC BY-SA 4.0', alt: 'Chorten Kora stupa, Trashi Yangtse, Bhutan',
    blurb: 'A valley known for wood turning and traditional crafts, with the white stupa of Chorten Kora on the riverbank.' },
  // Southern and central Bhutan, from the operator's 2026–27 itineraries. Coordinates: OpenStreetMap (Nominatim).
  // Elevations: the operator's overnight figures (Panbang camp, Nabji) cross-checked with Open-Meteo DEM.
  panbang: { id: 'panbang', name: 'Panbang', ll: [26.8504, 90.9617], elev: 300, img: 'places/panbang.jpg', credit: 'Panbang · DEBANUTOSH · CC0', alt: 'White prayer flags in the subtropical forest at Panbang, southern Bhutan',
    blurb: 'Bhutan’s subtropical south, on the Manas river near Royal Manas National Park. The lowest point on any of our routes: a jungle camp among palms, bamboo and some of the richest forest in the Himalaya.' },
  zhemgang: { id: 'zhemgang', name: 'Zhemgang', ll: [27.2134, 90.6550], elev: 1900, alt: 'Zhemgang Dzong and the Trong heritage village, central Bhutan',
    blurb: 'Home of the Kheng people. Trong, a heritage village of cobbled lanes and stone houses, sits just above Zhemgang Dzong, and the road north runs through a protected corridor known for golden langurs.' },
  nabji: { id: 'nabji', name: 'Nabji', ll: [27.1913, 90.5176], elev: 1300, img: 'places/nabji.jpg', credit: 'Nabji and Korphu · Phuentsho · CC BY-SA 4.0', alt: 'Rice terraces of Nabji and Korphu below forested hills, central Bhutan',
    blurb: 'A remote valley of rice terraces, home to the Monpa, traditionally regarded as among the earliest inhabitants of Bhutan. Village guesthouses, no crowds, and the neighbouring hilltop village of Korphu.' },
};

/** `km` and `elev` (overnight, metres) are shown as chips; keep `detail` to a one-line teaser on gated tours. */
export type ItineraryDay = { day: number; title: string; ride?: string; km?: string; elev?: number; detail: string; night: string };
/** Alternative lengths of the same route. Only the headline difference is public; the full plan is sent on request. */
export type TourLength = { days: number; label: string; note: string };
export type Tour = {
  slug: string; path: string; code: string; name: string; title: string; description: string; status: string; summary: string; intro: string;
  stops: string[]; high: string; img: string; imgAlt: string; days?: number; itinerary?: ItineraryDay[];
  /** Other lengths offered for this route. */
  lengths?: TourLength[];
  /** Headline facts for the "at a glance" strip (and for AI/search answers). */
  facts?: [string, string][];
  /** true: show day headlines only, and offer the full itinerary on request. */
  gated?: boolean;
};
// E-01 and E-02 are private route outlines: the operator sets days and pace per group, so no fixed duration or price.
// E-03 is the operator's own 16-day West to East itinerary (first run in 2025), from its published tour PDF.
// E-04 is from the operator's 2026–27 itineraries (12, 13, 16 days). Public page = 13-day headlines only, by design:
// hotels, meals, every visit and the other lengths' day plans are what the "full itinerary" enquiry delivers.
// `slug` keys the map (?tour=); `path` is the public tour page URL under /motorcycle-tours/.
export const TOURS: Tour[] = [
  { slug: 'spine', path: 'dragons-spine-paro-to-bumthang', code: 'E-01', name: 'Dragon’s Spine', status: 'Private · flexible length',
    title: 'Dragon’s Spine: Paro to Bumthang Motorcycle Tour',
    description: 'Ride Bhutan west to centre on the lateral road: Paro, Thimphu, Dochula, Punakha, Phobjikha, Pele La, Trongsa and Yotong La to Bumthang. Three passes above 3,000 m.',
    summary: 'West to centre along the lateral road. Three passes above 3,000 m, a valley floor at 1,250 m, and the dzongs between.',
    intro: 'Bhutan’s classic motorcycle route follows the lateral road from the Paro valley to Bumthang in the centre of the country. It crosses three passes above 3,000 m (Dochula, Pele La and Yotong La), drops to the river confluence at Punakha, and passes the great dzongs of Thimphu, Punakha and Trongsa on the way.',
    stops: ['paro', 'thimphu', 'dochula', 'punakha', 'phob', 'pele', 'trongsa', 'yotong', 'bumthang'], high: 'Yotong La 3,425 m', img: 'places/dochula-wide.jpg', imgAlt: 'The 108 chortens at Dochula pass on the road from Thimphu to Punakha, Bhutan' },
  { slug: 'west', path: 'western-valleys-chele-la-haa-punakha', code: 'E-02', name: 'Western Valleys', status: 'Private · flexible length',
    title: 'Western Valleys: Chele La, Haa & Punakha Motorcycle Tour',
    description: 'A western Bhutan motorcycle loop over Chele La (3,988 m), the highest motorable pass in the west, through the Haa valley, Thimphu and Dochula to Punakha.',
    summary: 'Chele La, the highest stop on the western circuit, then Haa, Thimphu and the drop to Punakha.',
    intro: 'A shorter ride that packs in western Bhutan’s biggest climb. From Paro the road winds up to Chele La at nearly 4,000 m, down into the quiet Haa valley and back, then east through Thimphu and over Dochula to the warm valley of Punakha.',
    stops: ['paro', 'chele', 'haa', 'paro', 'thimphu', 'dochula', 'punakha'], high: 'Chele La 3,988 m', img: 'places/chele-la.jpg', imgAlt: 'Prayer flags at Chele La pass between Paro and Haa, Bhutan' },
  { slug: 'east', path: 'west-to-east-bhutan-16-day-motorcycle-tour', code: 'E-03', name: 'West to East', status: '16 days · signature route', days: 16,
    title: '16-Day West to East Bhutan Motorcycle Tour',
    description: 'Ride all of Bhutan in 16 days on Royal Enfield Himalayans: Paro to Trashigang and back over Dochula, Pele La, Thrumshing La and Chele La, with full crew support.',
    summary: 'The whole kingdom in 16 days: every major pass on the lateral road, the remote east, and Chele La to finish.',
    intro: 'Our signature ride crosses Bhutan from the Paro valley to Trashigang in the far east and back, on the full length of the lateral road. You cross every major pass, from Dochula to Thrumshing La, the highest on the route east, ride into valleys that few visitors reach, and finish over Chele La above Paro. A guide, a motorcycle technician and a backup vehicle with driver travel with the group the whole way.',
    stops: ['paro', 'thimphu', 'dochula', 'punakha', 'pele', 'trongsa', 'yotong', 'bumthang', 'thrumshing', 'mongar', 'lhuentse', 'trashigang', 'yangtse', 'trashigang', 'mongar', 'thrumshing', 'ura', 'bumthang', 'yotong', 'trongsa', 'pele', 'phob', 'dochula', 'thimphu', 'haa', 'chele', 'paro'],
    high: 'Chele La 3,988 m', img: 'places/trongsa.jpg', imgAlt: 'Trongsa Dzong above the Mangde Chhu gorge on the lateral road, Bhutan',
    itinerary: [
      { day: 1, title: 'Arrive Paro, ride to Thimphu', ride: 'About 1 hour (transfer)', night: 'Thimphu',
        detail: 'Your guide and driver meet you at Paro airport. In Thimphu you get your Royal Enfield, a briefing and a test ride up to the Buddha Dordenma statue above the valley, then Tashichho Dzong after office hours.' },
      { day: 2, title: 'Thimphu to Punakha over Dochula', ride: 'About 2.5 hours', night: 'Punakha',
        detail: 'Climb to Dochula (about 3,100 m) and its 108 chortens, with the eastern Himalaya on clear mornings, then descend nearly 1,900 m to Punakha. Walk to Chimi Lhakhang, visit Punakha Dzong and cross the long suspension bridge.' },
      { day: 3, title: 'Punakha to Bumthang: Pele La, Trongsa, Yotong La', ride: '6–7 hours', night: 'Bumthang',
        detail: 'The big day on the lateral road. Over Pele La (3,420 m), past the Nepali-style Chendebji Chorten, to Trongsa Dzong and its watchtower museum, then over Yotong La into Bumthang.' },
      { day: 4, title: 'Rest and short rides in Bumthang', ride: 'Short local rides', night: 'Bumthang',
        detail: 'A day without a long ride, around the Chhokhor valley: Jakar Dzong, Jambay Lhakhang (among the oldest temples in Bhutan), Kurjey and Tamshing, and the Red Panda brewery in Chamkhar town.' },
      { day: 5, title: 'Bumthang to Mongar over Thrumshing La', ride: '6–7 hours', night: 'Mongar',
        detail: 'Cross Thrumshing La, the highest pass on the lateral road at about 3,750 m, then a long descent past waterfalls, cliffs and changing forest. Stop at Sengor village and its temple on the way to Mongar.' },
      { day: 6, title: 'Mongar to Lhuentse', ride: '2–3 hours, plus village rides', night: 'Takila, Lhuentse',
        detail: 'Up the Kuri Chhu gorge to Lhuentse, the royal family’s ancestral district, with rides to the weaving villages of Khoma and Gangzur. Visit Lhuentse Dzong and stay below the giant Guru statue at Takila.' },
      { day: 7, title: 'Lhuentse to Trashigang via Kori La', ride: '4–5 hours', night: 'Trashigang',
        detail: 'Back down the gorge and over Kori La (about 2,400 m), with a butter-lamp offering at the pass. Visit Trashigang Dzong and the village of Rangjung.' },
      { day: 8, title: 'Excursion to Trashi Yangtse', ride: '2–3 hours each way', night: 'Trashigang',
        detail: 'Ride north to Chorten Kora and the wood-turning town of Trashi Yangtse, with a visit to a remote primary school, then back to Trashigang.' },
      { day: 9, title: 'Trashigang to Mongar', ride: '2–3 hours', night: 'Mongar',
        detail: 'A short day west, with the afternoon off to rest or use the hotel spa.' },
      { day: 10, title: 'Mongar to Ura', ride: '5–6 hours', night: 'Ura (village guest house)',
        detail: 'Back over Thrumshing La to Ura, a stone village at about 3,100 m. Evening walk through the village, with buckwheat pancakes and ara in a family home.' },
      { day: 11, title: 'Ura to Phobjikha', ride: '5–6 hours', night: 'Phobjikha (homestay or hotel)',
        detail: 'West over Yotong La and Pele La to the glacial valley of Phobjikha. Gangtey Goemba, the black-necked crane centre, a farmhouse visit and a Bhutanese cooking evening.' },
      { day: 12, title: 'Phobjikha to Thimphu', ride: '3–4 hours', night: 'Thimphu',
        detail: 'Via Wangdue Phodrang Dzong and lunch at Lobesa, then the Memorial Chorten, the 13 traditional arts school, the takin reserve and the Sangaygang viewpoint.' },
      { day: 13, title: 'Thimphu to Haa', ride: 'About 3 hours', night: 'Haa',
        detail: 'The old highway through quiet villages to Dobji Dzong, then into the Haa valley for the White and Black Temples (Lhakhang Karpo and Nagpo).' },
      { day: 14, title: 'Haa to Paro over Chele La', ride: 'About 2.5 hours', night: 'Paro',
        detail: 'The last and highest pass of the tour: Chele La at 3,988 m, with prayer flags to hoist and Jomolhari on the skyline. Then Paro Dzong, the National Museum and Kyichu Lhakhang.' },
      { day: 15, title: 'Tiger’s Nest and farewell', ride: 'Short ride to the trailhead', night: 'Paro',
        detail: 'Hike to Taktsang (Tiger’s Nest), about 3 hours up and 2 down. A traditional hot-stone bath at a farmhouse, bike handover, and a farewell dinner with a cultural programme.' },
      { day: 16, title: 'Depart Paro', night: '—',
        detail: 'Transfer to Paro airport for your flight out.' },
    ] },
  { slug: 'hidden', path: 'hidden-bhutan-motorcycle-expedition', code: 'E-04', name: 'Hidden Bhutan', status: '12, 13 or 16 days · off the tourist trail', days: 13, gated: true,
    title: 'Hidden Bhutan Motorcycle Expedition: East & Jungles',
    description: 'A 12 to 16-day Bhutan motorcycle expedition off the tourist trail: Thrumshing La, Khoma weavers, a jungle camp at Panbang, Monpa villages and Chele La.',
    summary: 'Over Thrumshing La to the weavers of Khoma, down to a jungle camp at 300 m, and back through Monpa villages most visitors never see.',
    intro: 'Our expedition route leaves the usual tourist circuit behind. From the passes of central Bhutan you ride east over Thrumshing La to Khoma, a weaving village in the royal district of Lhuentse, then drop through gorges into the subtropical jungle at Panbang, the lowest point of any of our routes. The way back climbs through the Kheng and Monpa villages of central Bhutan to the crane valley of Phobjikha, Punakha and finally Chele La above Paro. Homestays, a jungle camp and village guesthouses sit alongside 3-star hotels, and a guide, technician and backup vehicle ride with you throughout.',
    stops: ['paro', 'thimphu', 'dochula', 'pele', 'trongsa', 'bumthang', 'ura', 'thrumshing', 'mongar', 'lhuentse', 'panbang', 'zhemgang', 'nabji', 'phob', 'punakha', 'dochula', 'paro', 'chele', 'paro'],
    high: 'Chele La 3,988 m', img: 'places/nabji.jpg', imgAlt: 'Rice terraces of Nabji and Korphu in the remote Monpa country of central Bhutan',
    facts: [
      ['Length', '12, 13 or 16 days'],
      ['Riding', 'About 1,400 km (13 days)'],
      ['Altitude range', '300 m to 3,988 m'],
      ['Longest day', 'Khoma to Panbang, 7–8 hours'],
      ['Bike', 'Royal Enfield Himalayan 411 / 450'],
      ['Stays', 'Hotels, homestay, jungle camp, village guesthouse'],
    ],
    lengths: [
      { days: 12, label: 'Classic loop', note: 'Phobjikha early in the ride instead of near the end, the same eastern loop through Khoma, Panbang and Nabji, and back via Punakha to Paro. No Chele La morning.' },
      { days: 13, label: 'With Chele La', note: 'The route shown below: the full eastern loop, Phobjikha on the way back, a morning on Chele La at 3,988 m, and Tiger’s Nest to finish.' },
      { days: 16, label: 'Grand expedition', note: 'Adds a day in Thimphu meeting Bhutanese women riders, a Bumthang festival in season, a night at Zhemgang, a village homestay, a stay with nuns near Paro, and an overland exit via Phuentsholing into India.' },
    ],
    itinerary: [
      { day: 1, title: 'Arrive Paro, ride Thimphu', km: 'Under 50 km', ride: '1–2 h', elev: 2300, night: 'Thimphu',
        detail: 'Bike handover and an orientation ride around the capital, up to the giant Buddha Dordenma above the valley.' },
      { day: 2, title: 'Thimphu to Bumthang over Dochula and Pele La', km: '250 km', ride: '6–7 h', elev: 2600, night: 'Bumthang',
        detail: 'The big day on the lateral road: two high passes, Trongsa Dzong, and a women’s weaving workshop in Chumey.' },
      { day: 3, title: 'Bumthang: temples and the Burning Lake', km: 'Under 100 km', ride: '2–3 h', elev: 2600, night: 'Bumthang',
        detail: 'Short rides between 7th-century temples, the Burning Lake of Mebar Tsho and Bumthang’s craft brewery.' },
      { day: 4, title: 'Over Thrumshing La to Mongar', km: '180 km', ride: '5–6 h', elev: 1600, night: 'Mongar',
        detail: 'Through Ura and over the highest pass on the lateral road, then down past cliffs and waterfalls into the east.' },
      { day: 5, title: 'Mongar to Khoma', km: '90 km', ride: '2–3 h', elev: 1500, night: 'Khoma (village homestay)',
        detail: 'The great Guru statue at Takila, then a night in Khoma with the weavers of Kishuthara.' },
      { day: 6, title: 'Khoma to the Panbang jungle', km: '210 km', ride: '7–8 h', elev: 300, night: 'Panbang (jungle camp)',
        detail: 'The longest day: from the eastern highlands down through gorges and subtropical forest to a riverside camp.' },
      { day: 7, title: 'Panbang to Nabji via Trong', km: '160 km', ride: '5–6 h', elev: 1300, night: 'Nabji (village guesthouse)',
        detail: 'Climb back into the hills through the Trong heritage village to the Monpa valley of Nabji and Korphu.' },
      { day: 8, title: 'Nabji to Phobjikha', km: '160 km', ride: '5–6 h', elev: 2900, night: 'Phobjikha',
        detail: 'From subtropical valleys up to the glacial valley of the black-necked cranes.' },
      { day: 9, title: 'Phobjikha to Punakha', km: '100 km', ride: '2–3 h', elev: 1300, night: 'Punakha',
        detail: 'Down to the warm Punakha valley, its dzong at the river confluence, and optional rafting.' },
      { day: 10, title: 'Punakha to Paro', km: '112 km', ride: '3 h', elev: 2200, night: 'Paro',
        detail: 'Himalayan viewpoints, a women-owned café, and tea with the nuns of a hilltop nunnery.' },
      { day: 11, title: 'Chele La and the Paro valley', km: 'Under 50 km', ride: '1–2 h', elev: 2200, night: 'Paro',
        detail: 'A morning ride to Chele La at 3,988 m for Jomolhari views, then the National Museum and Kyichu Lhakhang.' },
      { day: 12, title: 'Tiger’s Nest', elev: 2200, night: 'Paro',
        detail: 'The hike to Taktsang, a hot-stone bath at a farmhouse, and a farewell dinner with a cultural show.' },
      { day: 13, title: 'Depart Paro', night: '—',
        detail: 'Transfer to the airport for your flight out.' },
    ] },
];

export const haversine = (a: [number, number], b: [number, number]) => {
  const R = 6371, r = (x: number) => (x * Math.PI) / 180, dLa = r(b[0] - a[0]), dLo = r(b[1] - a[1]);
  const h = Math.sin(dLa / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

export const CHAPTERS = [
  { place: 'paro', kind: 'Start', note: 'Briefing, bike check, first kilometres along the Paro Chhu.', tour: 'spine' },
  { place: 'dochula', kind: 'Pass', note: '108 chortens on the ridge between Thimphu and Punakha.', tour: 'spine' },
  { place: 'punakha', kind: 'Valley', note: 'The road drops nearly 1,900 m to the dzong at the river confluence.', tour: 'spine' },
  { place: 'pele', kind: 'Pass', note: 'Across the Black Mountains toward central Bhutan, after Phobjikha.', tour: 'spine' },
  { place: 'bumthang', kind: 'Destination', note: 'Over Yotong La into the spiritual heartland.', tour: 'spine' },
];

export const PARTS = [
  { code: '01', t: 'Engine', d: 'Royal Enfield Himalayan: a 411cc air-cooled or 450cc liquid-cooled single. Torque for long climbs, and our technician rides with the group.' },
  { code: '02', t: 'Headlamp', d: 'Round headlamp and nacelle. Lighting checks are part of every pre-ride inspection.' },
  { code: '03', t: 'Wheels', d: 'Spoked wheels tolerate broken tarmac, gravel and the short farm-road sections in remote villages.' },
  { code: '04', t: 'Suspension', d: 'Long-travel adventure suspension, built for broken mountain roads at a steady touring pace.' },
  { code: '05', t: 'Seat', d: 'Upright adventure position for long climbs. Tell us about pillion plans when you enquire.' },
  { code: '06', t: 'Luggage', d: 'Ride light: main luggage travels in the backup vehicle with our driver.' },
];

// "Bike - Royal Enfield" by Addere Creations, CC BY 4.0. Attribution is required wherever it is shown.
export const SKETCHFAB_ID = 'c281cd335877408bb541c9f5e3f647d0';
export const SKETCHFAB_CREDIT = {
  title: 'Bike - Royal Enfield',
  author: 'Addere Creations',
  url: 'https://sketchfab.com/3d-models/bike-royal-enfield-c281cd335877408bb541c9f5e3f647d0',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
};
