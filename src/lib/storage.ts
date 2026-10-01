/**
 * Pintanen Oy – kuvien osoitteet
 *
 * Kuvat ovat sivuston omia tiedostoja kansiossa `public/images/` ja ne julkaistaan
 * sivuston mukana osoitteessa `/images/…` (Cloudflare Pages). Kansiorakenne:
 * `Pictures-400|800|1200|1500/` (responsiiviset WebP-kuvat), `Pictures-200/` (henkilökuvat),
 * `Eerik-maalaa/` (etusivun hero, AVIF), `Icons/` ja juuressa logo, favicon ja kartta.
 *
 * Uusi kuva: lisää tiedostot kansioihin Pictures-400, -800 ja -1200 nimellä
 * `<perusnimi>-<leveys>.webp` ja viittaa siihen perusnimellä.
 *
 * @module storage
 */

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
 *  UUSI NELIPORTAINEN RESPONSIIVINEN KUVARAKENNE
 *  Koot: 400w, 800w, 1200w, 1500w (kaikki WebP)
 *  Kansiot: Pictures-400/, Pictures-800/, Pictures-1200/, Pictures-1500/
 *  Tiedostonimet: [perusnimi]-[leveys]w.webp
 * ═══════════════════════════════════════════════════════ */

export type ResponsiveWidth = 400 | 800 | 1200 | 1500;

// Vain 400/800/1200 ovat aina saatavilla; 1500 puuttuu osasta
// kuvia, joten oletus-srcSet ei käytä sitä. Tämä estää tilanteen, jossa
// selain valitsee 1500w-version, saa 400-virheen eikä näytä kuvaa lainkaan.
const RESPONSIVE_WIDTHS: ResponsiveWidth[] = [400, 800, 1200];

/**
 * Kuvaversiot, joita ei ole kansiossa public/images. Ne jätetään pois srcsetistä, koska
 * selain ei yritä toista kokoa, jos valittu puuttuu. Tällä hetkellä kaikki koot ovat olemassa.
 */
const MISSING_VARIANTS: Record<string, ResponsiveWidth[]> = {};

/**
 * Palauttaa URL:n yksittäiselle responsiiviselle kuvaversiolle.
 * @param baseName - Kuvan perusnimi ilman leveyssuffiksia tai tiedostopäätettä, esim. "vihrea-puutalo-ulkomaalaus-jalkeen"
 * @param width - Haluttu leveys (400, 800, 1200 tai 1500)
 */
export function getResponsiveUrl(baseName: string, width: ResponsiveWidth): string {
  return getStorageUrl(`Pictures-${width}/${baseName}-${width}.webp`);
}

/**
 * Palauttaa täydellisen neliportaisen srcSet-merkkijonon.
 * Esim: ".../Pictures-400/nimi-400w.webp 400w, .../Pictures-800/nimi-800w.webp 800w, ..."
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
