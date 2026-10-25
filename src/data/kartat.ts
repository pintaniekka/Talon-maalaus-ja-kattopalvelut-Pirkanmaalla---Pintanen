/**
 * Kunnat, joille on siluettikartta public/images/kartat/<slug>.svg, ja kuvan mitat.
 * Tiedoston kirjoittaa scripts/tee_kuntakartta.py; älä muokkaa käsin.
 * Lähteet: Tilastokeskus kuntajako 2026 (CC BY 4.0), järvet OpenStreetMap (ODbL).
 */
export const kuntakartat: Record<string, [number, number]> = {
  "akaa": [600, 537],
  "forssa": [600, 745],
  "hameenkyro": [600, 415],
  "hameenlinna": [600, 461],
  "huittinen": [600, 781],
  "ikaalinen": [600, 399],
  "juupajoki": [600, 614],
  "kangasala": [600, 375],
  "kihnio": [600, 788],
  "lempaala": [600, 606],
  "mantta-vilppula": [600, 652],
  "nokia": [600, 641],
  "orivesi": [600, 531],
  "palkane": [600, 375],
  "parkano": [600, 595],
  "pirkkala": [600, 597],
  "ruovesi": [600, 675],
  "sastamala": [600, 828],
  "tampere": [600, 857],
  "urjala": [600, 602],
  "valkeakoski": [600, 594],
  "vesilahti": [600, 489],
  "virrat": [600, 537],
  "ylojarvi": [600, 857],
};

export const hasKuntakartta = (slug: string): boolean => slug in kuntakartat;

export const kuntakarttaUrl = (slug: string): string => `/images/kartat/${slug}.svg`;

export const kuntakarttaKoko = (slug: string): [number, number] => kuntakartat[slug] ?? [600, 480];
