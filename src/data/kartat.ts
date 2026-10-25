/**
 * Kunnat, joille on siluettikartta public/images/kartat/<slug>.svg, ja kuvan mitat.
 * Tiedoston kirjoittaa scripts/tee_kuntakartta.py; älä muokkaa käsin.
 * Lähteet: Tilastokeskus kuntajako 2026 (CC BY 4.0), järvet OpenStreetMap (ODbL).
 */
export const kuntakartat: Record<string, [number, number]> = {
  "tampere": [600, 857],
};

export const hasKuntakartta = (slug: string): boolean => slug in kuntakartat;

export const kuntakarttaUrl = (slug: string): string => `/images/kartat/${slug}.svg`;

export const kuntakarttaKoko = (slug: string): [number, number] => kuntakartat[slug] ?? [600, 480];
