/**
 * Omakoti- ja paritalojen määrä kunnittain valmistumisvuoden mukaan.
 * GENEROITU TIEDOSTO: älä muokkaa käsin, aja `python3 scripts/paivita_rakennuskanta.py`.
 *
 * Lähde: Tilastokeskus, rakennuskanta 2025, taulukko 15er (CC BY 4.0).
 */
export interface CityHousingStats {
  /** Omakoti- ja paritaloja yhteensä. */
  yhteensa: number;
  ennen1921: number;
  v1921_1939: number;
  v1940_1959: number;
  v1960: number;
  v1970: number;
  v1980: number;
  v1990: number;
  v2000: number;
  v2010: number;
  v2020: number;
  tuntematon: number;
}

export const HOUSING_STATS_YEAR = "2025";
export const HOUSING_STATS_SOURCE_URL = "https://pxdata.stat.fi/PxWeb/pxweb/fi/StatFin/StatFin__raku/15er.px/";
export const HOUSING_STATS_SOURCE_LABEL = `Tilastokeskus, rakennuskanta ${HOUSING_STATS_YEAR}`;

export const cityHousingStats: Record<string, CityHousingStats> = {
  "tampere": { yhteensa: 17153, ennen1921: 604, v1921_1939: 1577, v1940_1959: 2833, v1960: 1535, v1970: 1842, v1980: 2918, v1990: 2062, v2000: 1647, v2010: 1440, v2020: 685, tuntematon: 10 },
  "sastamala": { yhteensa: 8916, ennen1921: 1226, v1921_1939: 823, v1940_1959: 1961, v1960: 895, v1970: 1152, v1980: 1135, v1990: 621, v2000: 593, v2010: 345, v2020: 139, tuntematon: 26 },
  "hameenkyro": { yhteensa: 3748, ennen1921: 352, v1921_1939: 370, v1940_1959: 782, v1960: 333, v1970: 315, v1980: 405, v1990: 338, v2000: 447, v2010: 293, v2020: 102, tuntematon: 11 },
  "ylojarvi": { yhteensa: 8628, ennen1921: 471, v1921_1939: 457, v1940_1959: 1149, v1960: 637, v1970: 888, v1980: 1353, v1990: 852, v2000: 1565, v2010: 832, v2020: 414, tuntematon: 10 },
  "nokia": { yhteensa: 7272, ennen1921: 316, v1921_1939: 481, v1940_1959: 1546, v1960: 507, v1970: 649, v1980: 882, v1990: 571, v2000: 1139, v2010: 732, v2020: 446, tuntematon: 3 },
  "forssa": { yhteensa: 3621, ennen1921: 324, v1921_1939: 283, v1940_1959: 777, v1960: 415, v1970: 533, v1980: 537, v1990: 299, v2000: 325, v2010: 108, v2020: 17, tuntematon: 3 },
  "hameenlinna": { yhteensa: 14274, ennen1921: 922, v1921_1939: 1097, v1940_1959: 3337, v1960: 1213, v1970: 1358, v1980: 2043, v1990: 1415, v2000: 1603, v2010: 1002, v2020: 255, tuntematon: 29 },
  "huittinen": { yhteensa: 3577, ennen1921: 322, v1921_1939: 344, v1940_1959: 838, v1960: 325, v1970: 557, v1980: 468, v1990: 296, v2000: 247, v2010: 138, v2020: 35, tuntematon: 7 },
  "akaa": { yhteensa: 4998, ennen1921: 361, v1921_1939: 408, v1940_1959: 1410, v1960: 383, v1970: 497, v1980: 465, v1990: 383, v2000: 640, v2010: 353, v2020: 96, tuntematon: 2 },
  "ikaalinen": { yhteensa: 2812, ennen1921: 393, v1921_1939: 305, v1940_1959: 509, v1960: 236, v1970: 356, v1980: 404, v1990: 186, v2000: 219, v2010: 172, v2020: 28, tuntematon: 4 },
  "juupajoki": { yhteensa: 797, ennen1921: 102, v1921_1939: 92, v1940_1959: 224, v1960: 49, v1970: 65, v1980: 97, v1990: 62, v2000: 61, v2010: 35, v2020: 7, tuntematon: 3 },
  "kangasala": { yhteensa: 8011, ennen1921: 757, v1921_1939: 369, v1940_1959: 1326, v1960: 538, v1970: 822, v1980: 890, v1990: 830, v2000: 1269, v2010: 782, v2020: 421, tuntematon: 7 },
  "kihnio": { yhteensa: 892, ennen1921: 67, v1921_1939: 114, v1940_1959: 204, v1960: 82, v1970: 150, v1980: 129, v1990: 86, v2000: 39, v2010: 17, v2020: 3, tuntematon: 1 },
  "lempaala": { yhteensa: 5780, ennen1921: 258, v1921_1939: 246, v1940_1959: 1047, v1960: 365, v1970: 564, v1980: 675, v1990: 559, v2000: 1026, v2010: 709, v2020: 325, tuntematon: 6 },
  "mantta-vilppula": { yhteensa: 3096, ennen1921: 298, v1921_1939: 266, v1940_1959: 811, v1960: 407, v1970: 482, v1980: 446, v1990: 164, v2000: 136, v2010: 63, v2020: 21, tuntematon: 2 },
  "orivesi": { yhteensa: 3260, ennen1921: 401, v1921_1939: 387, v1940_1959: 760, v1960: 270, v1970: 309, v1980: 401, v1990: 186, v2000: 295, v2010: 201, v2020: 46, tuntematon: 4 },
  "parkano": { yhteensa: 2330, ennen1921: 144, v1921_1939: 174, v1940_1959: 495, v1960: 202, v1970: 514, v1980: 367, v1990: 221, v2000: 119, v2010: 80, v2020: 14, tuntematon: 0 },
  "pirkkala": { yhteensa: 3223, ennen1921: 72, v1921_1939: 79, v1940_1959: 568, v1960: 269, v1970: 342, v1980: 432, v1990: 352, v2000: 597, v2010: 367, v2020: 143, tuntematon: 2 },
  "palkane": { yhteensa: 2813, ennen1921: 358, v1921_1939: 300, v1940_1959: 623, v1960: 165, v1970: 219, v1980: 304, v1990: 260, v2000: 314, v2010: 177, v2020: 89, tuntematon: 4 },
  "ruovesi": { yhteensa: 1929, ennen1921: 432, v1921_1939: 177, v1940_1959: 396, v1960: 122, v1970: 134, v1980: 221, v1990: 141, v2000: 192, v2010: 80, v2020: 21, tuntematon: 13 },
  "urjala": { yhteensa: 2216, ennen1921: 305, v1921_1939: 267, v1940_1959: 665, v1960: 132, v1970: 227, v1980: 223, v1990: 179, v2000: 131, v2010: 61, v2020: 20, tuntematon: 6 },
  "valkeakoski": { yhteensa: 4827, ennen1921: 176, v1921_1939: 238, v1940_1959: 1579, v1960: 614, v1970: 590, v1980: 471, v1990: 217, v2000: 375, v2010: 408, v2020: 157, tuntematon: 2 },
  "vesilahti": { yhteensa: 1889, ennen1921: 212, v1921_1939: 205, v1940_1959: 244, v1960: 83, v1970: 104, v1980: 162, v1990: 204, v2000: 358, v2010: 188, v2020: 128, tuntematon: 1 },
  "virrat": { yhteensa: 2469, ennen1921: 362, v1921_1939: 188, v1940_1959: 534, v1960: 226, v1970: 292, v1980: 380, v1990: 214, v2000: 160, v2010: 87, v2020: 24, tuntematon: 2 },
};

export const getCityHousingStats = (slug: string): CityHousingStats | undefined => cityHousingStats[slug];
