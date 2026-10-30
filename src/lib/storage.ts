/**
 * Pintanen Oy – kuvien osoitteet
 *
 * Kuvat ovat sivuston omia tiedostoja kansiossa `public/images/` ja ne julkaistaan
 * sivuston mukana osoitteessa `/images/…` (Cloudflare Pages). Kansiorakenne:
 * `Pictures-400|600|800|1200|1500/` (responsiiviset WebP-kuvat), `Pictures-200/` (henkilökuvat),
 * `Eerik-maalaa/` (etusivun hero, AVIF), `Icons/` ja juuressa logo, favicon ja kartta.
 *
 * Uusi kuva: lisää tiedostot kansioihin Pictures-400, -600, -800 ja -1200 nimellä
 * `<perusnimi>-<leveys>.webp` ja viittaa siihen perusnimellä.
 *
 * Kuvat, joilla on täysikokoinen alkuperäinen kansiossa `alkuperaiset/` (scripts/lisaa_kuva.py
 * --alkuperainen, 30.10.2026), haetaan tuotannossa Cloudflaren kuvamuunnoksen kautta.
 *
 * @module storage
 */

import { puuttuvatKuvakoot } from "../data/kuvakoot";
import { alkuperaiset } from "../data/alkuperaiset";

/** Sivuston osoite absoluuttisia kuvaosoitteita varten (og:image, JSON-LD, kuvasitemap). */
export const SITE_ORIGIN = "https://pintanen.fi";

/** Palauttaa sivuston sisäisen osoitteen kuvalle, esim. "Pintanen-logo.png" → "/images/Pintanen-logo.png". */
export function getStorageUrl(path: string): string {
  return `/images/${encodeURI(path)}`;
}

/**
 * Muuttaa sivuston sisäisen osoitteen absoluuttiseksi. Some-jakojen esikatselut, JSON-LD
 * ja kuvasitemap vaativat täyden osoitteen.
 */
export function toAbsoluteUrl(url: string): string {
  return url.startsWith("/") ? `${SITE_ORIGIN}${url}` : url;
}

/* ═══════════════════════════════════════════════════════
 *  RESPONSIIVINEN KUVARAKENNE
 *  Koot: 400w, 600w, 800w, 1200w, 1500w (kaikki WebP)
 *  Kansiot: Pictures-400/, Pictures-600/, Pictures-800/, Pictures-1200/, Pictures-1500/
 *  Tiedostonimet: [perusnimi]-[leveys].webp
 * ═══════════════════════════════════════════════════════ */

export type ResponsiveWidth = 400 | 600 | 800 | 1200 | 1500;

// Vain 400/600/800/1200 ovat aina saatavilla; 1500 puuttuu osasta
// kuvia, joten oletus-srcSet ei käytä sitä. Tämä estää tilanteen, jossa
// selain valitsee 1500w-version, saa 400-virheen eikä näytä kuvaa lainkaan.
// 600 px lisättiin 26.10.2026: puhelimen puolen leveyden kuvat (DPR 2,75–3) ja
// työpöydän 460–600 px:n kuvat saavat sen 800 px:n sijaan.
const RESPONSIVE_WIDTHS: ResponsiveWidth[] = [400, 600, 800, 1200];

/**
 * Kuvaversiot, joita ei ole kansiossa public/images. Ne jätetään pois srcsetistä, koska
 * selain ei yritä toista kokoa, jos valittu puuttuu. Lista tulee generoidusta tiedostosta
 * src/data/kuvakoot.ts (scripts/taydenna_kuvakoot.py): 600 px puuttuu kuvilta, joiden
 * 800 px:n tiedosto on jo niin pieni, ettei 600 px:n versio olisi sitä pienempi.
 */
const MISSING_VARIANTS: Record<string, ResponsiveWidth[]> = {};
for (const [width, bases] of Object.entries(puuttuvatKuvakoot)) {
  for (const base of bases) (MISSING_VARIANTS[base] ??= []).push(Number(width) as ResponsiveWidth);
}

/* ═══════════════════════════════════════════════════════
 *  CLOUDFLAREN KUVAMUUNNOS (30.10.2026)
 *  Muunnos toimii vain pintanen.fi-domainilla, jolla Images > Transformations on päällä.
 *  pages.dev-esikatseluissa se ei toimi (virhe 9524), eikä paikallisesti tai testeissä,
 *  joten siellä käytetään samoista alkuperäisistä tehtyjä WebP-kokoja.
 * ═══════════════════════════════════════════════════════ */

const ALKUPERAISET = new Set(alkuperaiset);

/**
 * Onko kuvamuunnos käytössä tässä buildissa: Cloudflare Pagesin tuotantobuild (main-haara),
 * ellei Pages-asetus KUVAMUUNNOS=0 kytke sitä pois. KUVAMUUNNOS=1 pakottaa sen päälle.
 */
export function kuvamuunnosKaytossa(env: Record<string, string | undefined> = {}): boolean {
  if (env.KUVAMUUNNOS === "1") return true;
  return env.CF_PAGES_BRANCH === "main" && env.KUVAMUUNNOS !== "0";
}

// vite.config.ts määrittää tämän selain- ja prerender-koodille; Node-puolella (build-plugin)
// arvo luetaan suoraan ympäristömuuttujista.
declare const __KUVAMUUNNOS__: boolean | undefined;
const KUVAMUUNNOS =
  typeof __KUVAMUUNNOS__ !== "undefined"
    ? __KUVAMUUNNOS__
    : kuvamuunnosKaytossa((globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env);

/**
 * Cloudflaren muunnososoite alkuperäiselle kuvalle. format=auto antaa selaimelle AVIF:n tai WebP:n;
 * onerror=redirect näyttää alkuperäisen, jos muunnos epäonnistuu.
 */
export function kuvamuunnosUrl(baseName: string, width: number): string {
  const asetukset = `width=${width},quality=82,format=auto,fit=scale-down,onerror=redirect`;
  return `/cdn-cgi/image/${asetukset}${getStorageUrl(`alkuperaiset/${baseName}.jpg`)}`;
}

/**
 * Palauttaa URL:n yksittäiselle responsiiviselle kuvaversiolle.
 * @param baseName - Kuvan perusnimi ilman leveyssuffiksia tai tiedostopäätettä, esim. "talon-maalaus-vihrea-puutalo-ulkomaalaus-jalkeen"
 * @param width - Haluttu leveys (400, 600, 800, 1200 tai 1500)
 */
export function getResponsiveUrl(baseName: string, width: ResponsiveWidth): string {
  if (KUVAMUUNNOS && ALKUPERAISET.has(baseName)) return kuvamuunnosUrl(baseName, width);
  return getStorageUrl(`Pictures-${width}/${baseName}-${width}.webp`);
}

/**
 * Palauttaa srcSet-merkkijonon (400, 600, 800 ja 1200 px).
 * Esim: "/images/Pictures-400/nimi-400.webp 400w, /images/Pictures-600/nimi-600.webp 600w, ..."
 */
export function getResponsiveSrcSet(
  baseName: string,
  widths: ResponsiveWidth[] = RESPONSIVE_WIDTHS
): string {
  const missing = MISSING_VARIANTS[baseName] ?? [];
  return widths
    .filter(w => !missing.includes(w))
    .map(w => `${getResponsiveUrl(baseName, w)} ${w}w`)
    .join(', ');
}

/**
 * Palauttaa oletuskokoisen (1200w) URL:n käytettäväksi src-attribuutissa.
 */
export function getResponsiveSrc(baseName: string): string {
  return getResponsiveUrl(baseName, 1200);
}
