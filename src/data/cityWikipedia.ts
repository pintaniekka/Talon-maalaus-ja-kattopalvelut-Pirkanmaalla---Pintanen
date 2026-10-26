/**
 * Kunnan suomenkielinen Wikipedia-sivu kaupunkisivujen Service-scheman areaServed.sameAs-kenttään
 * (kilpailija-analyysin vaihe 12, 27.10.2026). Artikkelin nimi on kunnan nimi; Nokia on poikkeus,
 * koska pelkkä "Nokia" on täsmennyssivu. Ei komponentti-importteja: luetaan myös build-aikana.
 */
const WIKIPEDIA_FI = "https://fi.wikipedia.org/wiki/";

const poikkeukset: Record<string, string> = { nokia: "Nokia_(kaupunki)" };

export const getCityWikipediaUrl = (city: { slug: string; name: string }): string =>
  `${WIKIPEDIA_FI}${encodeURI(poikkeukset[city.slug] ?? city.name)}`;
