/**
 * Content blocks shared by guides and blog posts. Text fields accept [label](/path) links.
 * Image paths are relative to /public/images (e.g. 'places/paro.jpg').
 */
export type Img = { src: string; alt: string; credit?: string };
export type Block =
  | { p: string }
  | { h3: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string }
  /** Photo with caption. `wide` breaks out of the text column. */
  | { figure: Img & { caption?: string; wide?: boolean } }
  /** Two or three photos side by side. */
  | { gallery: Img[] }
  | { quote: { text: string; cite?: string } }
  /** Tick-box list, e.g. a packing list. */
  | { checklist: { title: string; items: string[] } }
  /** Big numbers with labels. */
  | { stats: { n: string; label: string }[] }
  | { cta: { title: string; text: string; href: string; label: string } };

export type Section = { id: string; h2: string; blocks: Block[] };
