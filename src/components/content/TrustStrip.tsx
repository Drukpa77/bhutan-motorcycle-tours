import { OPERATIONS, OPERATOR } from '@/lib/content';

/** Operator credentials: who runs the tours, licence, crew and fleet. Each claim links to its source. */
export default function TrustStrip() {
  const items: [string, React.ReactNode][] = [
    ['Licensed operator', <><a href={OPERATOR.licenceUrl} target="_blank" rel="noopener noreferrer">{OPERATOR.name} ↗</a>, registered with Bhutan’s Department of Tourism</>],
    ['Local & family owned', <>Bhutanese family business, running tours for almost two decades</>],
    ['On the road', <>Guide, mechanic and a backup 4x4 with driver on every tour</>],
    ['The fleet', <>{OPERATIONS.fleet} for every rider</>],
    ['Reviews', <><a href={OPERATOR.tripadvisor} target="_blank" rel="noopener noreferrer">{OPERATOR.award} ↗</a></>],
  ];
  return (
    <section aria-label="Why ride with us" className="trust">
      {items.map(([k, v]) => (
        <div key={k}><span className="mono">{k}</span><p>{v}</p></div>
      ))}
    </section>
  );
}
