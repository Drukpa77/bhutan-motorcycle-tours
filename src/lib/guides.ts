import { OPERATIONS, OPERATOR } from './content';
import type { Faq } from './faq';

/**
 * Long-form guides, each targeting one keyword cluster (see docs/seo/keyword-strategy.md).
 * Inline links use [text](/path) and are rendered by <RichText>. Government fees and rules change:
 * re-check the SDF, visa and permit facts each season and bump `updated` when you do.
 */
export type Block =
  | { p: string }
  | { h3: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string };
export type Section = { id: string; h2: string; blocks: Block[] };
export type Guide = {
  slug: string; title: string; description: string; h1: string; kicker: string;
  published: string; updated: string; img: string; imgAlt: string;
  intro: string; sections: Section[]; faqs: Faq[]; related: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: 'bhutan-motorcycle-tour-cost',
    title: 'Bhutan Motorcycle Tour Cost: SDF, Visa & What’s Included',
    description: 'What a Bhutan motorcycle tour really costs: the US$100 SDF, visa, bikes, fuel, hotels, guides and tips, plus what our tours include and how payment works.',
    h1: 'What a Bhutan motorcycle tour costs',
    kicker: 'Guide · Costs & fees',
    published: '2026-11-07', updated: '2026-11-07',
    img: 'places/paro.jpg', imgAlt: 'Rinpung Dzong above the Paro Chhu, where most Bhutan motorcycle tours begin',
    intro: 'A Bhutan motorcycle tour is priced in three layers: government fees that are identical with every operator, the land cost of the tour itself, and a few personal costs on the road. Our quotes itemise all three, so you can compare operators line by line instead of headline price against headline price.',
    sections: [
      { id: 'government-fees', h2: 'Government fees: the SDF and your visa', blocks: [
        { p: 'Bhutan charges every visitor a Sustainable Development Fee (SDF) for each night in the country. It is set by the Government of Bhutan, funds free healthcare, education and conservation, and is the same whichever operator you ride with.' },
        { table: { head: ['Fee', 'Who pays', 'Amount'], rows: [
          ['Sustainable Development Fee', 'International visitors', 'US$100 per person, per night'],
          ['Sustainable Development Fee', 'Indian nationals', '₹1,200 per person, per night'],
          ['Tourist visa', 'International visitors', 'US$40, once per trip'],
        ] } },
        { p: 'Count nights, not days. A 16-day tour is 15 nights, so the SDF alone is US$1,500 per rider. Young children are exempt and older children pay a reduced rate; we confirm the exact figure on your quote.' },
        { note: 'Bhutan cut the SDF from US$200 to US$100 per night in 2023, and the reduced rate is currently scheduled to run until 31 August 2027. If a quote looks far cheaper than everyone else’s, check whether the SDF is in it.' },
      ] },
      { id: 'included', h2: 'What our tour price includes', blocks: [
        { p: 'Every rider on our guided tours gets the same operational package. The crew and backup vehicle travel with the group from the first kilometre to the last.' },
        { ul: OPERATIONS.included },
        { p: 'You can see exactly how this works day by day on our [16-day West to East tour](/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour).' },
      ] },
      { id: 'not-included', h2: 'What you pay on the road', blocks: [
        { ul: OPERATIONS.excluded },
        { p: 'Fuel is the main running cost. A 500cc single is frugal, but the total depends on your route, so we estimate it per tour on your quote instead of padding the price.' },
      ] },
      { id: 'price-factors', h2: 'What changes the price', blocks: [
        { ul: [
          'Number of nights. Each extra night adds hotel, meals, crew time and the SDF.',
          'Group size. The guide, mechanic, driver and backup 4x4 are fixed costs shared across the group, so the per-rider price falls as the group grows.',
          'Hotel grade. Our standard is 3-star premium hotels and resorts, with farm and village stays where the route allows. 4- and 5-star upgrades are available at a top-up.',
          'Season. Spring and autumn are peak months for hotels and flights into Paro.',
          'Pillions and non-riding partners. A partner can ride pillion or travel in the backup 4x4.',
          'Flights. We can book Paro flights with your tour, or you can arrange your own.',
        ] },
      ] },
      { id: 'payment', h2: 'Payment and cancellation terms', blocks: [
        { p: OPERATIONS.payment },
        { table: { head: ['Notice before departure', 'Cancellation charge'], rows: OPERATIONS.cancellation } },
        { p: 'Cancellations must be made in writing. Because these charges apply, we strongly recommend travel insurance that covers cancellation as well as motorcycle riding.' },
      ] },
      { id: 'quote', h2: 'Get an itemised quote', blocks: [
        { p: 'Tell us your dates, group size, riding experience and the passes you want, using [Plan your ride](/plan-your-ride). We reply with an itemised quote: SDF, visa, land cost and estimated fuel, each on its own line.' },
      ] },
    ],
    faqs: [
      { q: 'Is the SDF included in your motorcycle tour price?', a: 'Yes. The Sustainable Development Fee of US$100 per person per night is included in our tour price and shown as its own line on your quote.' },
      { q: 'Is the Bhutan SDF charged per day or per night?', a: 'Per night. A 16-day tour has 15 nights, so the SDF is US$1,500 per international rider.' },
      { q: 'Do Indian riders pay the same SDF?', a: 'No. Indian nationals pay ₹1,200 per person per night and do not need a visa, though an entry permit is still required.' },
      { q: 'Is fuel included?', a: 'No. Fuel depends on your route, so we estimate it per tour on your quote and you pay for it on the road.' },
    ],
    related: ['riding-a-motorcycle-in-bhutan', 'best-time-for-a-motorcycle-tour-in-bhutan'],
  },
  {
    slug: 'riding-a-motorcycle-in-bhutan',
    title: 'Riding a Motorcycle in Bhutan: Licence, Permits & Rules',
    description: 'What riders need before a Bhutan motorcycle tour: licence and IDP, visa and route permits, guide rules, road rules, and what the roads are really like.',
    h1: 'Riding a motorcycle in Bhutan: licence, permits and road rules',
    kicker: 'Guide · Rules & permits',
    published: '2026-11-07', updated: '2026-11-07',
    img: 'places/dochula.jpg', imgAlt: 'The 108 chortens at Dochula on the road from Thimphu to Punakha, Bhutan',
    intro: 'International riders can tour Bhutan by motorcycle, but not independently. Your visa, permits and SDF go through a licensed Bhutanese operator, and a licensed guide rides with you. This is the paperwork and road-rule briefing we give every rider before they book.',
    sections: [
      { id: 'can-you-ride', h2: 'Can you ride a motorcycle in Bhutan?', blocks: [
        { p: 'Yes. Most international visitors travel on a tour arranged by a licensed Bhutanese operator, and that includes riders. We hold the operator licence, apply for your visa and route permits, pay the SDF to the government, and supply the bike, guide, mechanic and backup vehicle.' },
        { p: `We operate as ${OPERATOR.name}, a family-owned company [registered with the Department of Tourism](${OPERATOR.licenceUrl}).` },
      ] },
      { id: 'documents', h2: 'Licence, International Driving Permit and documents', blocks: [
        { p: 'Bring these and keep them with you on the bike. We check them at the bike handover.' },
        { ul: [
          'A passport valid for at least six months from your entry date.',
          'Your full home motorcycle licence (not a learner or car-only licence).',
          'An International Driving Permit with the motorcycle category, issued before you travel.',
          'Travel and medical insurance that covers riding a motorcycle of 500cc, plus emergency evacuation.',
          'Your own riding gear. Helmets are compulsory in Bhutan, and most riders prefer to wear their own.',
        ] },
      ] },
      { id: 'visa-permits', h2: 'Visa, SDF and route permits: how we handle them', blocks: [
        { ol: [
          'You send a scan of your passport (minimum six months’ validity).',
          'Once your tour is paid, we apply for your Bhutan visa. Approval normally arrives by email within 5–7 working days.',
          'We pay the Sustainable Development Fee to the government as part of your tour price.',
          'We arrange the route permits needed beyond Thimphu and Paro before you land. Permits are checked at road checkpoints, so your guide carries them.',
          'You show your visa approval on arrival at Paro, and we meet you at the airport.',
        ] },
        { p: 'More detail on fees is in [what a Bhutan motorcycle tour costs](/guides/bhutan-motorcycle-tour-cost).' },
      ] },
      { id: 'india', h2: 'Riders from India', blocks: [
        { p: 'Indian nationals do not need a visa. You need an entry permit, issued against a passport or voter ID, and you pay the SDF at ₹1,200 per person per night. Many Indian riders enter overland at Phuentsholing.' },
        { p: 'Bringing your own motorcycle needs a vehicle permit and the bike’s original registration, insurance and pollution papers. These requirements change, so tell us your entry point and we will confirm what is needed when you book.' },
      ] },
      { id: 'road-rules', h2: 'Rules of the road', blocks: [
        { ul: [
          'Ride on the left.',
          'Helmets are compulsory for rider and pillion.',
          'Ride at the pace your guide sets. On the lateral road, averages of 30–40 km/h are normal.',
          'Use the horn on blind bends. Expect trucks, cattle and dogs around every corner.',
          'Plan to arrive before dark. Our day plans are built in riding hours for this reason.',
          'Drones need prior permission from the authorities. Don’t bring one without clearing it with us first.',
        ] },
      ] },
      { id: 'roads', h2: 'What the roads are really like', blocks: [
        { p: 'The lateral road is Bhutan’s east–west national highway and the spine of every tour we run. It has been widened and is mostly paved, but it is narrow, rarely straight for more than a few hundred metres, and climbs from river valleys near 1,000 m to passes near 4,000 m.' },
        { p: 'Expect roadworks, gravel patches, and landslide repairs, especially after the monsoon. This is why we plan days in hours, not kilometres: a 150 km day can be a six-hour ride.' },
        { p: 'Altitude and cold are part of the ride. See [Bhutan’s mountain passes](/guides/bhutan-mountain-passes-by-motorcycle) for heights and how we pace the climbs.' },
      ] },
      { id: 'checklist', h2: 'Before you book: rider checklist', blocks: [
        { ul: [
          'You hold a full motorcycle licence and can get an IDP before travel.',
          'You are comfortable riding a 500cc single on tight mountain roads for 5–7 hours.',
          'Your insurance covers motorcycle riding and evacuation.',
          'You have chosen a season. See [the best time to ride Bhutan](/guides/best-time-for-a-motorcycle-tour-in-bhutan).',
        ] },
      ] },
    ],
    faqs: [
      { q: 'Do I need an International Driving Permit to ride in Bhutan?', a: 'Yes. Bring your full home motorcycle licence and an International Driving Permit with the motorcycle category. We check both at the bike handover.' },
      { q: 'Can I ride a motorcycle in Bhutan without a guide?', a: 'International visitors travel with a licensed Bhutanese guide on a tour arranged by a licensed operator. Your guide also carries the route permits checked on the road.' },
      { q: 'Can I bring my own motorcycle to Bhutan?', a: 'Indian riders often do, with a vehicle permit and the bike’s original papers. For other nationalities it is rarely practical, which is why our tours include a Royal Enfield 500cc for every rider.' },
      { q: 'Which side of the road does Bhutan drive on?', a: 'The left, as in India and the UK.' },
    ],
    related: ['bhutan-motorcycle-tour-cost', 'bhutan-mountain-passes-by-motorcycle'],
  },
  {
    slug: 'best-time-for-a-motorcycle-tour-in-bhutan',
    title: 'Best Time for a Motorcycle Tour in Bhutan (By Season)',
    description: 'When to ride Bhutan: spring and autumn for dry roads and clear passes, what monsoon and winter mean for riders, and the festivals worth timing a ride around.',
    h1: 'The best time for a motorcycle tour in Bhutan',
    kicker: 'Guide · Seasons',
    published: '2026-11-07', updated: '2026-11-07',
    img: 'places/phobjikha-valley.jpg', imgAlt: 'The Phobjikha valley, winter home of the black-necked cranes, Bhutan',
    intro: 'The best months to ride Bhutan are March to May and late September to November. Roads are driest, the passes are clear, and the Himalaya is most likely to be visible from the top. Here is what each season means on a motorcycle.',
    sections: [
      { id: 'at-a-glance', h2: 'Riding seasons at a glance', blocks: [
        { table: { head: ['Season', 'Months', 'Roads', 'Mountain views', 'Verdict'], rows: [
          ['Spring', 'March – May', 'Dry, warming up', 'Good, hazier by May', 'Best'],
          ['Monsoon', 'June – August', 'Rain, landslides', 'Mostly cloud', 'Avoid for long routes'],
          ['Autumn', 'Late Sept – November', 'Dry after the rains', 'Clearest of the year', 'Best'],
          ['Winter', 'December – February', 'Dry, ice on high passes', 'Very clear, very cold', 'Western valleys only'],
        ] } },
      ] },
      { id: 'spring', h2: 'Spring (March to May)', blocks: [
        { p: 'Warm valley days, cold mornings on the passes, and rhododendron forests flowering on Dochula, Pele La and Thrumshing La. Visibility is good early in the season and hazier by May. Paro Tshechu, one of the biggest festivals of the year, usually falls in March or April.' },
      ] },
      { id: 'autumn', h2: 'Autumn (late September to November)', blocks: [
        { p: 'The monsoon has washed the air clean and the roads have dried out. October and November give the most reliable Himalayan views from the passes. Thimphu Tshechu usually falls in September or October, and the black-necked cranes return to Phobjikha from late October.' },
        { p: 'Autumn is peak season: hotels and Paro flights fill early, so book three to six months ahead.' },
      ] },
      { id: 'monsoon', h2: 'Monsoon (June to August)', blocks: [
        { p: 'Heavy rain brings landslides that can close sections of the lateral road for hours or days. Short western routes are possible with flexible plans. We don’t recommend long east–west tours in this window.' },
      ] },
      { id: 'winter', h2: 'Winter (December to February)', blocks: [
        { p: 'Skies are crisp and clear, but the high passes can carry snow and ice, especially Thrumshing La and Chele La. Valley riding around Paro, Thimphu and Punakha stays pleasant, and Punakha is warm even in January. The Dochula festival is held on 13 December each year.' },
      ] },
      { id: 'by-route', h2: 'Choosing a season by route', blocks: [
        { ul: [
          '[West to East, 16 days](/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour): March to May or October to November. It crosses Thrumshing La twice, so it needs dry, snow-free passes.',
          '[Dragon’s Spine](/motorcycle-tours/dragons-spine-paro-to-bumthang): spring or autumn, into early December in a dry year.',
          '[Western Valleys](/motorcycle-tours/western-valleys-chele-la-haa-punakha): the most flexible. Spring, autumn, or a clear winter week, with Chele La weather permitting.',
        ] },
      ] },
      { id: 'festivals', h2: 'Festivals worth timing a ride around', blocks: [
        { table: { head: ['Festival', 'Where', 'Usually'], rows: [
          ['Punakha Drubchen and Tshechu', 'Punakha', 'February – March'],
          ['Paro Tshechu', 'Paro', 'March – April'],
          ['Thimphu Tshechu', 'Thimphu', 'September – October'],
          ['Jambay Lhakhang Drup', 'Bumthang', 'October – November'],
          ['Black-necked Crane Festival', 'Phobjikha', '11 November'],
          ['Druk Wangyel Festival', 'Dochula', '13 December'],
        ] } },
        { note: 'Most festival dates follow the lunar calendar and move each year. Ask us for exact dates before you fix your trip.' },
      ] },
    ],
    faqs: [
      { q: 'What is the best month for a motorcycle tour in Bhutan?', a: 'October and November for the clearest views and driest roads, followed by March to May.' },
      { q: 'Can you ride in Bhutan during the monsoon?', a: 'Short western routes are possible with flexible plans, but landslides can close the lateral road, so we don’t recommend long east–west tours from June to August.' },
      { q: 'Is winter too cold to ride Bhutan?', a: 'Valleys are pleasant and skies are clear, but high passes like Thrumshing La and Chele La can have snow and ice. Winter suits shorter western routes.' },
    ],
    related: ['bhutan-mountain-passes-by-motorcycle', 'riding-a-motorcycle-in-bhutan'],
  },
  {
    slug: 'bhutan-mountain-passes-by-motorcycle',
    title: 'Bhutan’s Mountain Passes by Motorcycle: Heights & Routes',
    description: 'Every major pass on a Bhutan motorcycle tour, from Chele La (3,988 m) and Thrumshing La to Dochula, Pele La and Yotong La: heights, routes and riding notes.',
    h1: 'Bhutan’s mountain passes by motorcycle',
    kicker: 'Guide · Passes & altitude',
    published: '2026-11-07', updated: '2026-11-07',
    img: 'places/chele-la.jpg', imgAlt: 'Prayer flags on Chele La, the highest pass on our routes, between Paro and Haa',
    intro: 'Riding Bhutan means riding its passes. The lateral road climbs over a ridge between every major valley, and the western loop adds Chele La, the highest pass on any of our routes. These are the heights, where each pass sits, and what to expect on the bike.',
    sections: [
      { id: 'table', h2: 'The passes at a glance', blocks: [
        { table: { head: ['Pass', 'Height (approx.)', 'Between', 'On our tours'], rows: [
          ['Chele La', '3,988 m', 'Paro – Haa', 'Western Valleys, West to East'],
          ['Thrumshing La', '3,750 m', 'Bumthang – Mongar', 'West to East (twice)'],
          ['Yotong La', '3,425 m', 'Trongsa – Bumthang', 'Dragon’s Spine, West to East'],
          ['Pele La', '3,420 m', 'Wangdue – Trongsa', 'Dragon’s Spine, West to East'],
          ['Dochula', '3,100 m', 'Thimphu – Punakha', 'All three tours'],
          ['Kori La', '2,400 m', 'Mongar – Trashigang', 'West to East'],
        ] } },
        { note: 'Published heights vary by 50–200 m between sources. Ours are rounded and cross-checked against elevation data at each pass.' },
      ] },
      { id: 'chele-la', h2: 'Chele La (3,988 m)', blocks: [
        { p: 'Often described as the highest motorable pass in Bhutan, and the highest point on our routes. The road climbs from Paro through blue pine and rhododendron forest to a ridge of prayer flags, with Jomolhari (7,326 m) on the skyline on clear mornings. Ride it early, before cloud builds. It is cold at the top even in spring.' },
      ] },
      { id: 'thrumshing-la', h2: 'Thrumshing La (3,750 m)', blocks: [
        { p: 'The highest pass on the lateral road and the gateway to eastern Bhutan, inside Thrumshingla National Park. The descent towards Mongar is one of the most dramatic stretches of road in the Himalaya: cliffs, waterfalls and a drop of over 2,000 m. It can carry snow in winter, which is why our [West to East tour](/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour) runs in spring and autumn.' },
      ] },
      { id: 'yotong-pele', h2: 'Pele La (3,420 m) and Yotong La (3,425 m)', blocks: [
        { p: 'The twin crossings of central Bhutan. Pele La crosses the Black Mountains, with yak pasture and dwarf bamboo near the top. Yotong La links Trongsa with Bumthang through fir and rhododendron forest. Both are on the long Punakha to Bumthang day, so we allow 6–7 hours for it.' },
      ] },
      { id: 'dochula', h2: 'Dochula (3,100 m)', blocks: [
        { p: 'The pass every rider crosses, between Thimphu and Punakha, crowned by the 108 Druk Wangyal chortens. On a clear day the eastern Himalaya lines the horizon. From the top, the road drops nearly 1,900 m to the warm valley of Punakha.' },
      ] },
      { id: 'altitude', h2: 'Altitude, cold and how we pace the climbs', blocks: [
        { ul: [
          'Most nights are spent between 1,000 and 3,100 m. You ride over the high passes but rarely sleep near them.',
          'Tours start low and build up. Day 1 of the West to East tour is a short test ride around Thimphu (2,330 m) before the first big pass.',
          'Drink more water than you think you need, and tell your guide about headaches or breathlessness early.',
          'Pack layers. It can be near freezing on a pass and over 20 °C in Punakha on the same day.',
          'The backup 4x4 follows the group, so any rider who feels unwell can ride in it while the mechanic or driver brings the bike.',
        ] },
      ] },
    ],
    faqs: [
      { q: 'What is the highest pass on a Bhutan motorcycle tour?', a: 'Chele La, between Paro and Haa, at about 3,988 m. It is often described as the highest motorable pass in Bhutan. On the lateral road east, Thrumshing La at about 3,750 m is the highest.' },
      { q: 'Will I get altitude sickness riding in Bhutan?', a: 'Most riders don’t, because you cross the high passes rather than sleep on them. Most nights are between 1,000 and 3,100 m. Hydrate, and tell your guide early if you feel unwell.' },
      { q: 'Are the passes open all year?', a: 'Mostly, but snow and ice can close or slow Thrumshing La and Chele La in winter, and landslides affect the lateral road in the monsoon.' },
    ],
    related: ['best-time-for-a-motorcycle-tour-in-bhutan', 'riding-a-motorcycle-in-bhutan'],
  },
];

export const findGuide = (slug: string) => GUIDES.find(g => g.slug === slug);
