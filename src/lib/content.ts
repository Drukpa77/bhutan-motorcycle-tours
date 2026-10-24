export { BRAND, img } from './assets';

export const CONTACT = {
  country: 'Bhutan',
  phone: '+975 7763 6226',
  phoneHref: 'tel:+97577636226',
  whatsapp: '+975 7763 6226',
  whatsappHref: 'https://wa.me/97577636226',
  emails: ['info@bhutanmindvacation.com', 'mindvacationtoursbhutan@gmail.com'] as const,
  address: ['House No PHA-1-38', 'Unit 01-01', 'Babesa', 'Thimphu 11001', 'Bhutan'],
};

export const VIDEO = {
  // Temporary Mixkit footage (Mixkit Free License). NOT Bhutan. Replace with files in /public/videos/.
  hero: 'https://assets.mixkit.co/videos/31440/31440-720.mp4',
  pov: 'https://assets.mixkit.co/videos/31974/31974-720.mp4',
};

export type Place = { id: string; name: string; ll: [number, number]; elev: number; pass?: boolean; img: string; credit: string; alt: string; blurb: string };

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
};

export type Tour = { slug: string; path: string; code: string; name: string; title: string; description: string; status: string; summary: string; intro: string; stops: string[]; high: string; img: string; imgAlt: string };
// EDITORIAL DRAFT: route concepts only, not verified operator tours. No durations or prices until confirmed.
// `slug` keys the map (?tour=); `path` is the public tour page URL under /motorcycle-tours/.
export const TOURS: Tour[] = [
  { slug: 'spine', path: 'dragons-spine-paro-to-bumthang', code: 'E-01', name: 'Dragon’s Spine', status: 'Draft route',
    title: 'Dragon’s Spine: Paro to Bumthang Motorcycle Tour',
    description: 'Ride Bhutan west to centre on the lateral road: Paro, Thimphu, Dochula, Punakha, Phobjikha, Pele La, Trongsa and Yotong La to Bumthang. Three passes above 3,000 m.',
    summary: 'West to centre along the lateral road. Three passes above 3,000 m, a valley floor at 1,250 m, and the dzongs between.',
    intro: 'Bhutan’s classic motorcycle route follows the lateral road from the Paro valley to Bumthang in the centre of the country. It crosses three passes above 3,000 m (Dochula, Pele La and Yotong La), drops to the river confluence at Punakha, and passes the great dzongs of Thimphu, Punakha and Trongsa on the way.',
    stops: ['paro', 'thimphu', 'dochula', 'punakha', 'phob', 'pele', 'trongsa', 'yotong', 'bumthang'], high: 'Yotong La 3,425 m', img: 'places/dochula-wide.jpg', imgAlt: 'The 108 chortens at Dochula pass on the road from Thimphu to Punakha, Bhutan' },
  { slug: 'west', path: 'western-valleys-chele-la-haa-punakha', code: 'E-02', name: 'Western Valleys', status: 'Draft route',
    title: 'Western Valleys: Chele La, Haa & Punakha Motorcycle Tour',
    description: 'A western Bhutan motorcycle loop over Chele La (3,988 m), the highest motorable pass in the west, through the Haa valley, Thimphu and Dochula to Punakha.',
    summary: 'Chele La, the highest stop on the western circuit, then Haa, Thimphu and the drop to Punakha.',
    intro: 'A shorter ride that packs in western Bhutan’s biggest climb. From Paro the road winds up to Chele La at nearly 4,000 m, down into the quiet Haa valley and back, then east through Thimphu and over Dochula to the warm valley of Punakha.',
    stops: ['paro', 'chele', 'haa', 'paro', 'thimphu', 'dochula', 'punakha'], high: 'Chele La 3,988 m', img: 'places/chele-la.jpg', imgAlt: 'Prayer flags at Chele La pass between Paro and Haa, Bhutan' },
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
  { code: '01', t: 'Engine', d: 'Air-cooled single-cylinder. Torque-led and simple to maintain far from a workshop. Fleet specs to be confirmed.' },
  { code: '02', t: 'Headlamp', d: 'Round headlamp and nacelle. Lighting checks are part of every pre-ride inspection.' },
  { code: '03', t: 'Wheels', d: 'Spoked wheels tolerate broken tarmac and gravel shoulders. Pressures are adjusted for altitude.' },
  { code: '04', t: 'Suspension', d: 'Telescopic fork and twin rear shocks, suited to a steady touring pace.' },
  { code: '05', t: 'Seat', d: 'Upright position for long climbs. Seat height and pillion arrangements to be confirmed.' },
  { code: '06', t: 'Luggage', d: 'Mounting varies by bike. Main luggage typically travels in support. Confirm with operator.' },
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
