/**
 * Hintalaskurin laskukaavat. Sama logiikka kuin etusivun chat-laskurissa; molemmat lukevat tämän tiedoston.
 */
const interpolateWallPrice = (m2: number): number => {
  const pts = [
    { m2: 50, price: 2800 },
    { m2: 100, price: 4230 },
    { m2: 200, price: 6000 },
    { m2: 300, price: 7800 },
    { m2: 350, price: 8700 },
  ];
  if (m2 <= pts[0].m2) return pts[0].price;
  if (m2 >= pts[pts.length - 1].m2) return pts[pts.length - 1].price;
  for (let i = 0; i < pts.length - 1; i++) {
    if (m2 >= pts[i].m2 && m2 <= pts[i + 1].m2) {
      const ratio = (m2 - pts[i].m2) / (pts[i + 1].m2 - pts[i].m2);
      return pts[i].price + ratio * (pts[i + 1].price - pts[i].price);
    }
  }
  return pts[0].price;
};

export const calculateWallPrice = (m2: number, stories: string, peeling: string) => {
  const base = interpolateWallPrice(m2);
  const storyMul: Record<string, number> = { '1': 1.0, '1.5': 1.225, '2': 1.475 };
  const peelingMul: Record<string, number> = { none: 1.0, '1-2': 1.15, '3+': 1.275 };
  const final = base * (storyMul[stories] || 1) * (peelingMul[peeling] || 1);
  return { min: Math.round(final * 0.9), max: Math.round(final * 1.1) };
};

export const calculateRoofPrice = (m2: number, slope: string) => {
  let minPer: number, maxPer: number;
  switch (slope) {
    case 'loiva': minPer = 15; maxPer = 17; break;
    case 'normaali': minPer = 18; maxPer = 21; break;
    case 'jyrkka': minPer = 22; maxPer = 25; break;
    default: minPer = 18; maxPer = 21;
  }
  return { min: Math.max(2850, m2 * minPer), max: Math.max(2850, m2 * maxPer) };
};

export const formatPriceRange = (p: { min: number; max: number }) =>
  `${p.min.toLocaleString('fi-FI')} – ${p.max.toLocaleString('fi-FI')} €`;
