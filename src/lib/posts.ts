import type { Section } from './blocks';
import { OPERATIONS } from './content';
import type { Faq } from './faq';

/**
 * Blog posts, newest first. Publishing a post = add an entry here, commit, push.
 * Write `title` for Google (≤60 chars), `description` for the search snippet (≤160), and `h1` for readers.
 * Check every fact before publishing; rules on fees and permits change, so date-stamp them in the text.
 */
export type Post = {
  slug: string; title: string; description: string; h1: string; category: string;
  published: string; updated: string;
  cover: string; coverAlt: string; coverCredit?: string;
  standfirst: string; sections: Section[]; faqs: Faq[];
  /** Tour slugs this post should send readers to: 'spine' | 'west' | 'east'. */
  tours: string[];
};

const W = (s: Section[]) => s; // keeps section literals typed without repeating the annotation

export const POSTS: Post[] = [
  {
    slug: 'is-bhutan-worth-it-for-a-motorcycle-trip',
    title: 'Is Bhutan Worth It for a Motorcycle Trip? An Honest Answer',
    description: 'The honest case for and against a Bhutan motorcycle trip: the roads, the cost, the rules, who it suits, and how it compares with Ladakh and Nepal.',
    h1: 'Is Bhutan worth it for a motorcycle trip?',
    category: 'Planning',
    published: '2026-11-07', updated: '2026-11-07',
    cover: 'places/dochula-wide.jpg', coverAlt: 'The 108 chortens of Dochula with the eastern Himalaya on the horizon', coverCredit: 'Arian Zwegers · CC BY 2.0',
    standfirst: 'Bhutan isn’t the cheapest or the wildest place to ride in the Himalaya, and we would rather tell you that up front. What it offers is something the others can’t: empty mountain roads, an intact culture, and the most organised way to ride the range. Here is the honest version, from the people who run the tours.',
    sections: W([
      { id: 'short-answer', h2: 'The short answer', blocks: [
        { p: 'Yes, if you want to ride beautiful, quiet mountain roads at an unhurried pace, through a country that still looks and feels like itself, with every logistic handled. Probably not, if you want cheap, fast, solo or off-road.' },
        { stats: [
          { n: '30–40', label: 'Typical average km/h on the lateral road' },
          { n: '6', label: 'Major passes on our routes' },
          { n: '3,988 m', label: 'Highest pass on our routes' },
        ] },
      ] },
      { id: 'why-yes', h2: 'Why riders love it', blocks: [
        { ul: [
          'The roads are almost empty. Outside Thimphu and Paro, traffic is a few trucks, buses and the odd herd of cows.',
          'The riding is all corners. The lateral road climbs over a pass between every valley, from about 1,000 m to near 4,000 m.',
          'The culture is intact. You ride past working dzongs, prayer-flag ridges and villages where national dress is everyday clothing.',
          'It’s calm and safe. Drivers are patient, the horn is rarely used, and the country is famously relaxed.',
          'It’s organised. Visa, permits, hotels and the government fee are arranged before you land, and a mechanic and backup 4x4 travel with you.',
        ] },
        { figure: { src: 'places/trongsa.jpg', alt: 'Trongsa Dzong spilling down a ridge above the Mangde Chhu gorge', caption: 'Trongsa Dzong, seen from the road long before you reach it. This is the kind of view that comes round every corner.', credit: 'C. J. Fynn · CC BY-SA 3.0' } },
      ] },
      { id: 'why-not', h2: 'The honest downsides', blocks: [
        { ul: [
          'Cost. On top of the tour, Bhutan charges a Sustainable Development Fee for every night you stay, which makes it pricier than its neighbours. See [how tour pricing works](/guides/bhutan-motorcycle-tour-cost).',
          'No solo riding. International visitors travel with a licensed guide on an operator-arranged tour. If total independence matters most, Bhutan will frustrate you.',
          'It’s slow. Averages of 30–40 km/h are normal. Days are measured in hours, not kilometres.',
          'Roadworks. Sections of the lateral road are often being widened or repaired, especially after the monsoon.',
          'Little real off-road. Bhutan is a tarmac-and-corners destination, not a dirt one.',
        ] },
        { note: 'If the SDF makes you hesitate, remember what it pays for: free healthcare and education for Bhutanese people, and conservation of the forests you ride through. It is also identical with every operator, so compare tours on everything else.' },
      ] },
      { id: 'compared', h2: 'How Bhutan compares with Ladakh and Nepal', blocks: [
        { table: { head: ['', 'Bhutan', 'Ladakh', 'Nepal'], rows: [
          ['Traffic', 'Very light', 'Heavy in peak season', 'Busy near cities'],
          ['Highest roads', 'Near 4,000 m', 'Over 5,000 m', 'Varies by route'],
          ['Landscape', 'Green, forested, monastic', 'High-altitude desert', 'Mixed, dramatic'],
          ['Riding style', 'Tarmac corners', 'Rough roads and passes', 'Mixed, often rough'],
          ['Independent riding', 'Guided only', 'Possible', 'Possible'],
          ['Daily cost', 'Higher (SDF)', 'Lower', 'Lower'],
        ] } },
        { p: 'Ladakh is higher and harder; Nepal is cheaper and freer. Bhutan is the one you choose for empty roads, forests, culture and a trip where everything simply works.' },
      ] },
      { id: 'who-for', h2: 'Who Bhutan suits best', blocks: [
        { checklist: { title: 'Bhutan is a great fit if you…', items: [
          'Enjoy flowing mountain corners more than top speed',
          'Want culture and landscape as much as riding',
          'Prefer a crew to handle logistics, breakdowns and permits',
          'Are riding with a partner, who can ride pillion or travel in the 4x4',
          'Have ridden a mid-size motorcycle on twisty roads before',
        ] } },
        { cta: { title: 'Try it on the full route', text: 'The [16-day West to East tour](/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour) rides the whole kingdom, or start shorter with the [Western Valleys](/motorcycle-tours/western-valleys-chele-la-haa-punakha).', href: '/motorcycle-tours', label: 'Compare the tours →' } },
      ] },
    ]),
    faqs: [
      { q: 'Is a Bhutan motorcycle tour worth the money?', a: 'If you value empty mountain roads, culture and fully handled logistics, yes. If you want the cheapest or most independent Himalayan ride, Ladakh or Nepal will suit you better.' },
      { q: 'Can I ride Bhutan on my own?', a: 'International visitors travel with a licensed guide on a tour arranged by a licensed operator. Indian riders have different rules for entry.' },
      { q: 'Is Bhutan good for beginners on a motorcycle?', a: 'Riders comfortable on a mid-size bike on twisty roads usually do well, because speeds are low and traffic is light. Tell us your experience and we will suggest a route.' },
    ],
    tours: ['east', 'west', 'spine'],
  },
  {
    slug: 'chele-la-and-haa-valley-by-motorcycle',
    title: 'Chele La & the Haa Valley by Motorcycle: Ride Guide',
    description: 'Ride Chele La (3,988 m), the highest pass on our routes, and drop into the quiet Haa valley: the climb from Paro, Jomolhari views, temples and when to go.',
    h1: 'Chele La and the Haa valley: Bhutan’s highest ride',
    category: 'Routes',
    published: '2026-11-07', updated: '2026-11-07',
    cover: 'places/chele-la.jpg', coverAlt: 'Prayer flags on the ridge of Chele La between Paro and Haa', coverCredit: 'Vinayaraj · CC BY-SA 4.0',
    standfirst: 'From the Paro valley, one road climbs through pine and rhododendron to a ridge of prayer flags at almost 4,000 m, then drops into a valley that only opened to visitors in 2002. It’s the highest pass on our routes, and one of the best half-days of riding in the country.',
    sections: W([
      { id: 'numbers', h2: 'The ride in numbers', blocks: [
        { stats: [
          { n: '3,988 m', label: 'Chele La summit' },
          { n: '7,326 m', label: 'Jomolhari, on the skyline' },
          { n: '2,670 m', label: 'Haa valley floor' },
        ] },
        { p: 'Chele La is often described as the highest motorable pass in Bhutan. Compare it with every other pass in our [mountain passes guide](/guides/bhutan-mountain-passes-by-motorcycle).' },
      ] },
      { id: 'the-climb', h2: 'The climb from Paro', blocks: [
        { p: 'The road leaves the Paro valley just below the town and starts climbing almost at once, a long series of switchbacks through blue pine, then hemlock and rhododendron. There is very little traffic: mostly taxis heading for the viewpoint and the occasional truck to Haa.' },
        { figure: { src: 'places/paro.jpg', alt: 'Rinpung Dzong above the Paro Chhu, where the ride to Chele La begins', caption: 'The ride starts in the Paro valley, below Rinpung Dzong.', credit: 'B. Gagnon · CC BY-SA 4.0' } },
        { p: 'Ride it early. Cloud usually builds by late morning, and the first hour after sunrise gives the best chance of seeing Jomolhari and the snow peaks along the Tibetan border.' },
      ] },
      { id: 'summit', h2: 'On top of Chele La', blocks: [
        { p: 'The summit is a ridge strung with prayer flags, cold and windy even in spring. It is a tradition to hoist a string of flags here, and your guide will help you choose ones with prayers for safe travel. Below the pass, the Kila nunnery clings to the cliffs on the Paro side.' },
        { quote: { text: 'Bring a warm layer even on a sunny day. At almost 4,000 m the wind on Chele La is cold in every season.' } },
      ] },
      { id: 'haa', h2: 'Down into Haa', blocks: [
        { p: 'The far side drops into the Haa valley, a quiet border district that only opened to tourism in 2002. There are farmhouses, barley fields and almost no other visitors. In the valley stand the White and Black Temples, Lhakhang Karpo and Lhakhang Nagpo.' },
        { gallery: [
          { src: 'places/haa.jpg', alt: 'Lhakhang Karpo, the White Temple, in the Haa valley', credit: 'C. J. Fynn · CC BY-SA 3.0' },
          { src: 'places/chele-la.jpg', alt: 'Prayer flags lining the Chele La ridge above Haa', credit: 'Vinayaraj · CC BY-SA 4.0' },
        ] },
        { p: 'From Haa you can return over Chele La to Paro, or take the old highway east past Dobji Dzong towards Thimphu, which is how our 16-day tour reaches Haa before crossing Chele La on its final riding day.' },
      ] },
      { id: 'when-and-how', h2: 'When to ride it', blocks: [
        { ul: [
          'Best views: October to December, when the air is clearest.',
          'Spring (March to May): rhododendrons in flower, slightly hazier views.',
          'Winter: possible on clear days, but snow and ice can close the pass.',
          'Monsoon (June to August): mostly cloud on top; the Haa Summer Festival usually falls in July.',
        ] },
        { cta: { title: 'Ride Chele La with us', text: 'It’s the high point of the [Western Valleys tour](/motorcycle-tours/western-valleys-chele-la-haa-punakha) and the last pass of the [16-day West to East](/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour).', href: '/motorcycle-tours/western-valleys-chele-la-haa-punakha', label: 'See the Western Valleys →' } },
      ] },
    ]),
    faqs: [
      { q: 'How high is Chele La?', a: 'About 3,988 m. It is the highest point on our routes and is often described as the highest motorable pass in Bhutan.' },
      { q: 'Can you see Mount Jomolhari from Chele La?', a: 'Yes, on clear mornings, especially from October to December. Cloud usually builds by late morning, so ride early.' },
      { q: 'Is Chele La open in winter?', a: 'On clear days, yes, but snow and ice can close it temporarily. Spring and autumn are more reliable.' },
    ],
    tours: ['west', 'east'],
  },
  {
    slug: 'riding-bhutan-in-october',
    title: 'Riding Bhutan in October: Weather, Festivals & Roads',
    description: 'Why October is the best month for a Bhutan motorcycle tour: clear Himalayan views, dry roads, Thimphu Tshechu, cranes in Phobjikha, and how to plan around the crowds.',
    h1: 'Riding Bhutan in October',
    category: 'Seasons',
    published: '2026-11-07', updated: '2026-11-07',
    cover: 'places/phobjikha-valley.jpg', coverAlt: 'The wide Phobjikha valley, where black-necked cranes arrive from late October', coverCredit: 'Prof. Mortel · CC BY 2.0',
    standfirst: 'If we could only ride Bhutan in one month, it would be October. The monsoon has washed the air clean, the roads have dried out, and the Himalaya is visible from the passes more often than at any other time of year. It is also the busiest month, so here’s how to make the most of it.',
    sections: W([
      { id: 'why-october', h2: 'Why October', blocks: [
        { stats: [
          { n: 'Clearest', label: 'Mountain views of the year' },
          { n: 'Dry', label: 'Roads after the monsoon' },
          { n: 'Peak', label: 'Season: book early' },
        ] },
        { ul: [
          'The rains are over. Landslide repairs from the summer are mostly done and the lateral road is at its best.',
          'The views are reliable. Clear mornings from Dochula, Pele La and Chele La are the norm, not the exception.',
          'The temperatures suit riding: mild in the valleys by day, cold on the passes and at night.',
          'Every pass is open, including Thrumshing La, so the full [West to East route](/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour) is on.',
        ] },
      ] },
      { id: 'weather', h2: 'What the weather is like', blocks: [
        { table: { head: ['Where', 'Daytime', 'Night / early morning'], rows: [
          ['Valleys (Paro, Thimphu, Bumthang)', 'Mild, often 15–25 °C', 'Cool to cold'],
          ['Low valleys (Punakha)', 'Warm', 'Mild'],
          ['High passes (3,000–4,000 m)', 'Cool, windy', 'Near freezing'],
        ] } },
        { p: 'Early October can still bring the odd shower as the monsoon fades; by late October skies are usually settled. Pack layers: our [packing list](/blog/what-to-pack-for-a-bhutan-motorcycle-tour) is built for exactly this range.' },
      ] },
      { id: 'festivals', h2: 'Festivals and wildlife', blocks: [
        { p: 'October is festival season. Dates follow the lunar calendar and move each year, so ask us for the exact dates before you book.' },
        { table: { head: ['What', 'Where', 'Usually'], rows: [
          ['Thimphu Tshechu', 'Thimphu', 'September – October'],
          ['Jambay Lhakhang Drup', 'Bumthang', 'October – November'],
          ['Black-necked cranes arrive', 'Phobjikha valley', 'From late October'],
          ['Black-necked Crane Festival', 'Phobjikha (Gangtey)', '11 November'],
        ] } },
        { figure: { src: 'places/bumthang.jpg', alt: 'Jakar Dzong above the Chamkhar valley in Bumthang', caption: 'Bumthang, home of the Jambay Lhakhang Drup festival, among the oldest temples in Bhutan.', credit: 'C. J. Fynn · CC BY-SA 3.0' } },
      ] },
      { id: 'crowds', h2: 'Planning around the peak season', blocks: [
        { checklist: { title: 'How we plan October tours', items: [
          'Book three to six months ahead: Paro flights and the best hotels fill first',
          'Time Thimphu around its Tshechu if you want the festival, or around it if you don’t',
          'Start riding days early for clear views before cloud builds on the passes',
          'Spend nights in quieter places such as Haa, Phobjikha and Ura, rather than only the main towns',
        ] } },
        { p: 'Can’t make October? Late September and November are nearly as good, and March to May is the spring alternative. See [the best time to ride](/guides/best-time-for-a-motorcycle-tour-in-bhutan) for every season.' },
        { cta: { title: 'Plan an October ride', text: 'Tell us your dates now and we’ll hold the hotels and flights before they fill.', href: '/plan-your-ride', label: 'Plan your ride →' } },
      ] },
    ]),
    faqs: [
      { q: 'Is October a good time for a motorcycle tour in Bhutan?', a: 'It is the best month for most riders: dry roads after the monsoon, the clearest Himalayan views and every pass open. It is also peak season, so book early.' },
      { q: 'How cold is Bhutan in October?', a: 'Valleys are mild by day, often 15–25 °C, while high passes and early mornings can be near freezing. Pack layers.' },
      { q: 'What festivals are in Bhutan in October?', a: 'Thimphu Tshechu usually falls in September or October, and Jambay Lhakhang Drup in Bumthang in October or November. Dates follow the lunar calendar.' },
    ],
    tours: ['east', 'spine'],
  },
  {
    slug: 'bhutan-bike-trip-from-india',
    title: 'Bhutan Bike Trip from India: Border Crossings & Route',
    description: 'Planning a Bhutan bike trip from India? Phuentsholing and the other border crossings, the road to Thimphu, riding your own bike vs ours, and what changes on Bhutanese roads.',
    h1: 'Riding into Bhutan from India: the border and the road in',
    category: 'Planning',
    published: '2026-11-07', updated: '2026-11-07',
    cover: 'places/thimphu.jpg', coverAlt: 'Tashichho Dzong on the Wang Chhu in Thimphu, the end of the first day’s ride from the Indian border', coverCredit: 'Tashichho Dzong · C. J. Fynn · CC BY-SA 3.0',
    standfirst: 'Bhutan is one of the few foreign countries Indian riders can reach on their own wheels, with a road straight from the plains into the Himalaya. Here is where to cross, what the first day on the road looks like, and when it makes more sense to fly in.',
    sections: W([
      { id: 'short-answer', h2: 'The short answer', blocks: [
        { stats: [
          { n: '3', label: 'Main road crossings' },
          { n: '~150 km', label: 'Phuentsholing to Thimphu' },
          { n: 'TBA', label: 'Entry fees and permits' },
        ] },
        { p: 'Indian riders can enter Bhutan overland, most often at Phuentsholing. Entry permits, the Sustainable Development Fee for Indian nationals, and the paperwork for Indian-registered bikes are TBA here: Bhutan updates these rules from time to time, so we confirm the current requirements for your dates when you book.' },
      ] },
      { id: 'border-crossings', h2: 'Where to cross the border', blocks: [
        { p: 'Most riders enter at Phuentsholing, opposite Jaigaon in West Bengal, a short ride from Siliguri and Bagdogra airport. It is the busiest crossing and the most direct way to Thimphu and Paro.' },
        { figure: { src: 'places/phuentsholing-gate.jpg', alt: 'The ornate Bhutan Gate at Phuentsholing at night, with traffic passing through from Jaigaon', caption: 'The Bhutan Gate at Phuentsholing, the main crossing from West Bengal. Expect queues at the immigration office in October–November and March–April.', credit: 'Afifa Afrin · CC BY-SA 3.0' } },
        { table: { head: ['Crossing', 'Indian side', 'Best for'], rows: [
          ['Phuentsholing', 'Jaigaon, West Bengal', 'Thimphu, Paro and the classic western routes'],
          ['Gelephu', 'Assam', 'Central Bhutan via Zhemgang towards Trongsa and Bumthang'],
          ['Samdrup Jongkhar', 'Assam (near Guwahati)', 'Eastern Bhutan: Trashigang, Mongar and the far east'],
        ] } },
        { p: 'From Phuentsholing the road climbs about 150 km to Thimphu, from the plains to over 2,000 m. Allow most of a day: it is slow, winding and often under repair. Our [riding rules guide](/guides/riding-a-motorcycle-in-bhutan) explains why we plan in hours, not kilometres.' },
      ] },
      { id: 'paperwork', h2: 'Your paperwork, rider and bike', blocks: [
        { p: 'You will need your driving licence with the motorcycle category. The full document list for riders and for Indian-registered motorcycles is TBA: we confirm the current requirements and fees for your dates, so you don’t ride to the border with the wrong papers.' },
        { cta: { title: 'Check before you ride', text: 'Tell us your entry point and dates, and we’ll send the current entry and vehicle requirements.', href: '/plan-your-ride', label: 'Ask us →' } },
      ] },
      { id: 'own-bike-or-ours', h2: 'Your own bike, or fly in and ride ours?', blocks: [
        { p: 'Riding your own bike in is a great adventure, but it adds two days of plains riding, border queues and vehicle paperwork. Many riders, especially on shorter trips, fly into Paro instead: there are flights from Delhi and Kolkata, and your bike is waiting at the airport.' },
        { table: { head: ['', 'Your own bike', 'Fly in, ride ours'], rows: [
          ['Time to the mountains', '1–2 days from Siliguri', 'Same day you land'],
          ['Paperwork', 'Rider and vehicle paperwork', 'We handle it'],
          ['Breakdowns', 'Your problem', 'Our mechanic and backup 4x4'],
          ['Bike', 'Your own, loaded with luggage', `${OPERATIONS.fleet}, luggage in the 4x4`],
        ] } },
        { cta: { title: 'Ride ours', text: 'Fly into Paro and start on the [16-day West to East tour](/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour), or a shorter private route built around your leave.', href: '/plan-your-ride', label: 'Plan your ride →' } },
      ] },
      { id: 'on-the-road', h2: 'Riding in Bhutan if you are used to Indian roads', blocks: [
        { ul: [
          'You still ride on the left, so nothing changes there.',
          'Traffic is far lighter and much calmer. Bhutanese drivers rarely use the horn except on blind bends.',
          'Helmets are compulsory for rider and pillion.',
          'Speeds are low. Averages of 30–40 km/h on the lateral road are normal, because the road almost never runs straight.',
          'The Ngultrum is pegged to the rupee and Indian rupees are widely accepted, but carry some cash for fuel stops in remote areas.',
        ] },
        { quote: { text: 'Plan the day in hours, not kilometres. A 150 km stretch in Bhutan can easily be a six-hour ride.', cite: 'How we plan every tour' } },
      ] },
    ]),
    faqs: [
      { q: 'What do Indian riders need to enter Bhutan?', a: 'Entry requirements and fees for Indian nationals are TBA here, as Bhutan updates them from time to time. We confirm the current rules for your dates when you book.' },
      { q: 'Can I take my own motorcycle from India to Bhutan?', a: 'Yes, Indian riders often do. The paperwork needed for the bike is TBA here; we confirm the current requirements for your travel dates.' },
      { q: 'Which border crossing is best for a Bhutan bike trip?', a: 'Phuentsholing, opposite Jaigaon in West Bengal, for Thimphu, Paro and the west. Gelephu and Samdrup Jongkhar in Assam suit central and eastern Bhutan.' },
    ],
    tours: ['east', 'west'],
  },
  {
    slug: 'riding-thrumshing-la',
    title: 'Riding Thrumshing La: Bhutan’s Highest Lateral Road Pass',
    description: 'What it is like to ride Thrumshing La on a motorcycle: the climb from Ura, the 3,750 m summit, the cliff road down to Mongar, and when to go.',
    h1: 'Thrumshing La: the pass that takes you into eastern Bhutan',
    category: 'Routes',
    published: '2026-11-07', updated: '2026-11-07',
    cover: 'places/thrumshing-la-pass.jpg', coverAlt: 'Prayer flags strung across the summit of Thrumshing La, with fir trees and a wooden shrine', coverCredit: 'Arian Zwegers · CC BY 2.0',
    standfirst: 'Most visitors to Bhutan never go further east than Bumthang. The ones who do cross Thrumshing La, the highest pass on the lateral road, and drop off the far side into a different country: steeper, greener, quieter and almost empty of tourists.',
    sections: W([
      { id: 'numbers', h2: 'The pass in numbers', blocks: [
        { stats: [
          { n: '3,750 m', label: 'Summit, approx.' },
          { n: '~3,000 m', label: 'Descent to the Kuri Chhu' },
          { n: '6–7 hrs', label: 'Bumthang to Mongar' },
        ] },
        { p: 'Thrumshing La sits on the lateral road between Bumthang and Mongar, inside Thrumshingla National Park. Published heights range from 3,750 to 3,800 m. Only Chele La, above Paro, takes our riders higher. See [all the passes compared](/guides/bhutan-mountain-passes-by-motorcycle).' },
      ] },
      { id: 'the-climb', h2: 'The climb from Ura', blocks: [
        { p: 'The day starts in the Bumthang valleys and climbs past Ura, a stone-built village at about 3,100 m and one of the highest in central Bhutan. On our 16-day tour we spend a night there on the way back west, in a village guest house, sharing buckwheat pancakes and ara with a local family.' },
        { figure: { src: 'places/ura.jpg', alt: 'Ura Mang gi Lhakhang temple behind a whitewashed wall in Ura village', caption: 'Ura’s village temple. The climb to Thrumshing La starts just above the village.', credit: 'C. J. Fynn · CC BY-SA 4.0' } },
        { p: 'Above Ura the road winds up through fir, hemlock and rhododendron. In spring the rhododendrons flower in reds and pinks the whole way up. Expect the temperature to fall fast: it can be near freezing at the top on an autumn morning while the valley below is mild.' },
      ] },
      { id: 'summit', h2: 'On top', blocks: [
        { figure: { src: 'places/thrumshing-la.jpg', alt: 'The road over Thrumshing La passing a chorten and hillsides covered in prayer flags under a blue sky', caption: 'The summit on a clear day: a small chorten, thousands of prayer flags and the road tipping east.', credit: 'Wmarcc · CC BY-SA 3.0', wide: true } },
        { p: 'The summit is a ridge of prayer flags and a small chorten. Riders stop here to add a string of flags. Your guide will help you choose ones with prayers for safe travel. On clear days in autumn and winter you can see the snow peaks of the Himalaya to the north.' },
        { quote: { text: 'Everything east of Thrumshing La feels like a different kingdom. You leave the tour buses behind at the top.' } },
      ] },
      { id: 'descent', h2: 'The descent: cliffs, waterfalls and cloud forest', blocks: [
        { p: 'This is the part riders talk about afterwards. The road drops roughly 3,000 m to the Kuri Chhu river before climbing again to Mongar, through every kind of forest Bhutan has, from alpine fir to subtropical jungle.' },
        { p: 'Below Sengor village the road is cut into near-vertical cliffs, with waterfalls crossing the tarmac and long drops on the outside edge. It has been widened in recent years, but take it slowly: expect roadworks, wet patches and fog that can roll in within minutes. The forest around Yongkola, lower down, is one of Bhutan’s best areas for birdwatching. Keep an eye out at photo stops.' },
        { gallery: [
          { src: 'places/mongar.jpg', alt: 'Mongar town spread along a ridge above forested valleys', credit: 'C. J. Fynn · CC BY-SA 3.0' },
          { src: 'places/lhuentse.jpg', alt: 'Lhuentse Dzong on a spur above the Kuri Chhu valley', credit: 'muddum27 · CC BY 2.0' },
        ] },
        { p: 'Mongar itself sits on a ridge rather than a valley floor, unusually for Bhutan, and is the gateway to the east: Lhuentse, Trashigang and Trashi Yangtse are all within a day’s ride.' },
      ] },
      { id: 'when-and-how', h2: 'When to ride it, and how', blocks: [
        { ul: [
          'Best: March to May (rhododendrons) and October to November (clearest views).',
          'Winter: snow and ice can close or slow the pass. We don’t schedule it from December to February.',
          'Monsoon (June to August): landslides on the descent are common, so we avoid it for long eastern routes.',
          'Start early. Cloud usually builds on the pass by late morning.',
          'Pack a proper warm layer and waterproofs, even on a sunny day. See [what to pack](/blog/what-to-pack-for-a-bhutan-motorcycle-tour).',
        ] },
        { cta: { title: 'Ride it twice', text: 'Our [16-day West to East tour](/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour) crosses Thrumshing La on day 5 heading east and again on day 10 coming back, with a night in Ura.', href: '/motorcycle-tours/west-to-east-bhutan-16-day-motorcycle-tour', label: 'See the itinerary →' } },
      ] },
    ]),
    faqs: [
      { q: 'How high is Thrumshing La?', a: 'About 3,750 m (published figures range up to 3,800 m). It is the highest pass on Bhutan’s lateral road.' },
      { q: 'Is Thrumshing La open all year?', a: 'Mostly, but snow and ice can close or slow it in winter, and landslides affect the descent in the monsoon. Spring and autumn are the reliable seasons.' },
      { q: 'How long does it take to ride from Bumthang to Mongar?', a: 'Plan on 6–7 hours including stops. The distance is modest, but the road is steep, narrow and winding.' },
    ],
    tours: ['east'],
  },
  {
    slug: 'what-to-pack-for-a-bhutan-motorcycle-tour',
    title: 'What to Pack for a Bhutan Motorcycle Tour (Checklist)',
    description: 'The packing list we send every rider: riding gear for 4,000 m passes and warm valleys, documents, electronics, money, and what to wear in the dzongs.',
    h1: 'What to pack for a Bhutan motorcycle tour',
    category: 'Planning',
    published: '2026-11-07', updated: '2026-11-07',
    cover: 'places/pele-la.jpg', coverAlt: 'Chorten and prayer flags at Pele La, a cold 3,420 m pass on the lateral road', coverCredit: 'RPSkokie · CC BY-SA 4.0',
    standfirst: 'In a single day in Bhutan you can ride from a frosty pass near 4,000 m to a river valley where it is warm enough for a T-shirt. This is the packing list we send every rider, built around that range and around one useful fact: your main bag rides in our backup 4x4, not on the bike.',
    sections: W([
      { id: 'the-rule', h2: 'The one rule: layers', blocks: [
        { stats: [
          { n: '~0 °C', label: 'Autumn morning on a high pass' },
          { n: '20 °C+', label: 'Punakha valley, same day' },
          { n: '1 bag', label: 'Main luggage, in the 4x4' },
        ] },
        { p: 'Temperature swings, not extremes, are the challenge. Pack so you can add and remove layers at every stop. Because your main bag travels in the backup 4x4, you only carry what you need for the day: layers, rain gear, documents and a camera.' },
        { gallery: [
          { src: 'places/chele-la.jpg', alt: 'Prayer flags on the cold, high ridge of Chele La', credit: 'Vinayaraj · CC BY-SA 4.0' },
          { src: 'places/punakha.jpg', alt: 'Punakha Dzong in the warm valley at the river confluence', credit: 'B. Gagnon · CC BY-SA 4.0' },
        ] },
      ] },
      { id: 'riding-gear', h2: 'Riding gear', blocks: [
        { checklist: { title: 'On the bike', items: [
          'Your own helmet. Helmets are compulsory, and one that fits you is safer and quieter',
          'Riding jacket with armour, with a removable thermal liner',
          'Riding trousers, or armoured jeans plus a thermal base layer',
          'Two pairs of gloves: summer and insulated winter',
          'Boots that cover the ankle, waterproof if possible',
          'Rain jacket and over-trousers, even in the dry season',
          'Neck warmer or buff, which makes a big difference on the passes',
          'Sunglasses or a tinted visor: UV is strong at altitude',
        ] } },
        { note: 'Tell us your helmet and boot plans when you book. If you can’t bring your own kit, we will discuss what can be arranged.' },
      ] },
      { id: 'clothes', h2: 'Off the bike', blocks: [
        { checklist: { title: 'Clothing', items: [
          'Thermal base layers (top and bottom) for cold mornings and evenings',
          'A warm fleece or down jacket for evenings above 2,500 m',
          'Long trousers and a long-sleeved collared shirt for visiting dzongs and temples',
          'Comfortable walking shoes for the Tiger’s Nest hike (about 3 hours up, 2 down)',
          'Light clothes for warm valleys like Punakha',
        ] } },
        { p: 'Dzongs and temples expect respectful dress: long sleeves, long trousers or skirts, no hats inside, and no shorts. Your guide will tell you where photography isn’t allowed.' },
      ] },
      { id: 'documents', h2: 'Documents and money', blocks: [
        { checklist: { title: 'Keep these in your jacket', items: [
          'Passport valid for six months, plus a printout of your visa approval',
          'Full home motorcycle licence and an International Driving Permit with the motorcycle category',
          'Travel insurance documents that cover motorcycle riding and evacuation',
          'Some cash in Ngultrum or Indian rupees (the two are pegged one to one) for fuel and small purchases',
          'A card for larger hotels and shops in towns; ATMs can be scarce in remote areas',
        ] } },
        { p: 'Fuel is paid on the road and isn’t in the tour price. See [what a tour costs](/guides/bhutan-motorcycle-tour-cost) for everything that is and isn’t included.' },
      ] },
      { id: 'electronics-health', h2: 'Electronics and health', blocks: [
        { checklist: { title: 'Small things that matter', items: [
          'Universal travel adapter: Bhutan runs on 230 V',
          'Power bank and a handlebar phone mount',
          'Helmet intercom if you ride with a pillion or a friend',
          'Sunscreen and lip balm with SPF',
          'Personal medication, and a word with your doctor about altitude if you have any concerns',
          'A small first-aid kit for blisters and scrapes (our crew carries a full kit)',
        ] } },
        { p: 'Most nights are spent between 1,000 and 3,100 m, so altitude rarely causes problems, but drink plenty of water and tell your guide early if you feel unwell. More in [Bhutan’s mountain passes](/guides/bhutan-mountain-passes-by-motorcycle).' },
      ] },
      { id: 'leave-at-home', h2: 'What to leave at home', blocks: [
        { ul: [
          'Hard panniers and a tank bag full of luggage: the 4x4 carries your bag.',
          'A drone, unless you have cleared it with us first: drones need prior permission in Bhutan.',
          'Too many clothes: most hotels offer laundry.',
        ] },
        { cta: { title: 'Ready to ride?', text: 'Pick a route and we’ll send the full pre-departure pack with your quote.', href: '/motorcycle-tours', label: 'See the tours →' } },
      ] },
    ]),
    faqs: [
      { q: 'Should I bring my own helmet to Bhutan?', a: 'Yes, if you can. Helmets are compulsory, and your own fitted helmet is safer and more comfortable for long days.' },
      { q: 'How cold does it get on a Bhutan motorcycle tour?', a: 'High passes can be near freezing on spring and autumn mornings, while valleys like Punakha can be over 20 °C the same day. Pack layers.' },
      { q: 'Do I need to carry all my luggage on the motorcycle?', a: 'No. On our tours your main bag travels in the backup 4x4, so you only carry what you need for the day.' },
    ],
    tours: ['east', 'spine', 'west'],
  },
];

export const findPost = (slug: string) => POSTS.find(p => p.slug === slug);
export const readingMinutes = (p: Post) => {
  const words = [p.standfirst, ...p.sections.flatMap(s => s.blocks.map(b => JSON.stringify(b)))].join(' ').split(/\s+/).length;
  return Math.max(3, Math.round(words / 220));
};
