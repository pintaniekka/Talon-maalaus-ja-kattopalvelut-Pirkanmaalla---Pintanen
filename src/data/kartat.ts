/**
 * Kunnat, joille on siluettikartta public/images/kartat/<slug>.svg (scripts/tee_kuntakartta.py).
 * Lähteet: Tilastokeskus kuntajako 2026 (CC BY 4.0), järvet OpenStreetMap (ODbL).
 */
export const kuntakartat = new Set<string>(["tampere"]);

export const hasKuntakartta = (slug: string): boolean => kuntakartat.has(slug);

export const kuntakarttaUrl = (slug: string): string => `/images/kartat/${slug}.svg`;
