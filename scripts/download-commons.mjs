import { mkdir, writeFile } from 'node:fs/promises';

const FILES = [
  ['places/paro.jpg', 'Rinpung_Dzong,_Bhutan_17.jpg'],
  ['places/chele-la.jpg', 'Chele_La_Pass_-_Paro_-_during_LGFC_-_Bhutan_2019_(01).jpg'],
  ['places/haa.jpg', 'Lhakhag_Karpo_Haa_Bhutan.jpg'],
  ['places/thimphu.jpg', 'Tashichho_Dzong_2012-11-19.jpg'],
  ['places/dochula.jpg', 'Druk_Wangyal_Chortens,_Bhutan_01.jpg'],
  ['places/dochula-wide.jpg', 'Dochu_La_Pass,_108_Druk_Wangyal_Chortens_(15818199106).jpg'],
  ['places/punakha.jpg', 'Punakha_Dzong,_Bhutan_04.jpg'],
  ['places/punakha-alt.jpg', 'Punakha_dzong.jpg'],
  ['places/phobjikha.jpg', 'Gangte_Goemba_in_the_Phobjika_Valley,_Bhutan_(26)_-_44254128071.jpg'],
  ['places/phobjikha-valley.jpg', 'Phobjika_Valley,_Bhutan_(12)_-_44206217132.jpg'],
  ['places/pele-la.jpg', 'Pele_La_Pass.jpg'],
  ['places/trongsa.jpg', 'Trongsa_Dzong_2001_a.jpg'],
  ['places/yotong-la.jpg', 'Pele_La_pass_on_the_Nubding_to_Wandue_Phodrang_highway_-_Bhutan_-_panoramio.jpg'],
  ['places/bumthang.jpg', 'Jakar_Dzong,_Bumthang.jpg'],
  ['bike/himalayan.jpg', 'Royal_Enfield_Himalayan.jpg'],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const [local, commons] of FILES) {
  const dest = new URL(`../public/images/${local}`, import.meta.url);
  await mkdir(new URL('.', dest), { recursive: true });
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(commons)}?width=2000`;
  const res = await fetch(url, { headers: { 'User-Agent': 'bhutan-motorcycle-tours/1.0 (local asset download)' } });
  if (!res.ok) throw new Error(`${commons} → ${res.status}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`${local} ${res.status} ${(await import('node:fs')).statSync(dest).size}`);
  await sleep(800);
}
