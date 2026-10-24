export { BRAND, img } from './assets';

export const VIDEO = {
  // Temporary Mixkit footage (Mixkit Free License). NOT Bhutan. Replace with files in /public/videos/.
  hero: 'https://assets.mixkit.co/videos/31440/31440-720.mp4',
  pov: 'https://assets.mixkit.co/videos/31974/31974-720.mp4',
};

export type Place = { id: string; name: string; ll: [number, number]; elev: number; pass?: boolean; img: string; credit: string };

// Coordinates: OpenStreetMap / public gazetteers. Elevations: approximate public figures.
// Photos: local copies in /public/images/places from Wikimedia Commons.
export const PLACES: Record<string, Place> = {
  paro: { id: 'paro', name: 'Paro', ll: [27.4305, 89.4133], elev: 2200, img: 'places/paro.jpg', credit: 'Rinpung Dzong · B. Gagnon · CC BY-SA 4.0' },
  chele: { id: 'chele', name: 'Chele La', ll: [27.3699, 89.3467], elev: 3988, pass: true, img: 'places/chele-la.jpg', credit: 'Chele La · Vinayaraj · CC BY-SA 4.0' },
  haa: { id: 'haa', name: 'Haa', ll: [27.387, 89.28], elev: 2670, img: 'places/haa.jpg', credit: 'Lhakhang Karpo · C. J. Fynn · CC BY-SA 3.0' },
  thimphu: { id: 'thimphu', name: 'Thimphu', ll: [27.4728, 89.639], elev: 2330, img: 'places/thimphu.jpg', credit: 'Tashichho Dzong · C. J. Fynn · CC BY-SA 3.0' },
  dochula: { id: 'dochula', name: 'Dochula', ll: [27.4914, 89.7503], elev: 3100, pass: true, img: 'places/dochula.jpg', credit: 'Druk Wangyal Chortens · B. Gagnon · CC BY-SA 4.0' },
  punakha: { id: 'punakha', name: 'Punakha', ll: [27.581, 89.8631], elev: 1250, img: 'places/punakha.jpg', credit: 'Punakha Dzong · B. Gagnon · CC BY-SA 4.0' },
  phob: { id: 'phob', name: 'Phobjikha', ll: [27.4626, 90.18], elev: 2900, img: 'places/phobjikha.jpg', credit: 'Gangtey Goemba · Prof. Mortel · CC BY 2.0' },
  pele: { id: 'pele', name: 'Pele La', ll: [27.5372, 90.2029], elev: 3420, pass: true, img: 'places/pele-la.jpg', credit: 'Chorten at Pele La · RPSkokie · CC BY-SA 4.0' },
  trongsa: { id: 'trongsa', name: 'Trongsa', ll: [27.4997, 90.5072], elev: 2180, img: 'places/trongsa.jpg', credit: 'Trongsa Dzong · C. J. Fynn · CC BY-SA 3.0' },
  yotong: { id: 'yotong', name: 'Yotong La', ll: [27.5169, 90.5863], elev: 3425, pass: true, img: 'places/yotong-la.jpg', credit: 'Stand-in: prayer flags near Pele La · D. Broad · CC BY 3.0' },
  bumthang: { id: 'bumthang', name: 'Bumthang', ll: [27.5492, 90.7525], elev: 2600, img: 'places/bumthang.jpg', credit: 'Jakar Dzong · C. J. Fynn · CC BY-SA 3.0' },
};

export type Tour = { slug: string; code: string; name: string; status: string; summary: string; stops: string[]; high: string; img: string };
// EDITORIAL DRAFT: route concepts only, not verified operator tours. No durations or prices until confirmed.
export const TOURS: Tour[] = [
  { slug: 'spine', code: 'E-01', name: 'Dragon’s Spine', status: 'Draft route', summary: 'West to centre along the lateral road. Three passes above 3,000 m, a valley floor at 1,250 m, and the dzongs between.', stops: ['paro', 'thimphu', 'dochula', 'punakha', 'phob', 'pele', 'trongsa', 'yotong', 'bumthang'], high: 'Yotong La 3,425 m', img: 'places/dochula-wide.jpg' },
  { slug: 'west', code: 'E-02', name: 'Western Valleys', status: 'Draft route', summary: 'Chele La, the highest stop on the western circuit, then Haa, Thimphu and the drop to Punakha.', stops: ['paro', 'chele', 'haa', 'paro', 'thimphu', 'dochula', 'punakha'], high: 'Chele La 3,988 m', img: 'places/chele-la.jpg' },
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
