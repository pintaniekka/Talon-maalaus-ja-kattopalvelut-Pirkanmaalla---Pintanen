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
 * AVIF (30.10.2026): kuvilla, jotka on tehty täysikokoisesta alkuperäisestä
 * (scripts/lisaa_kuva.py --avif), on samoissa kansioissa myös `<perusnimi>-<leveys>.avif`.
 * Selain valitsee AVIF:n <picture>-elementin kautta (AvifKuva), ja WebP jää varamuodoksi.
 * Omat AVIF-tiedostot ovat samalla laadulla noin 25 % pienempiä kuin Cloudflaren kuvamuunnos.
 *
 * @module storage
 */

import { puuttuvatKuvakoot } from "../data/kuvakoot";
import { avifKuvat } from "../data/avifkuvat";

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

/**
 * Palauttaa URL:n yksittäiselle responsiiviselle kuvaversiolle.
 * @param baseName - Kuvan perusnimi ilman leveyssuffiksia tai tiedostopäätettä, esim. "talon-maalaus-vihrea-puutalo-ulkomaalaus-jalkeen"
 * @param width - Haluttu leveys (400, 600, 800, 1200 tai 1500)
 */
export function getResponsiveUrl(baseName: string, width: ResponsiveWidth): string {
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

/* ═══════════════════════════════════════════════════════
 *  AVIF (30.10.2026)
 *  Samat koot ja nimet kuin WebP:llä, pääte .avif. Luettelo kuvista, joilla AVIF on,
 *  tulee generoidusta tiedostosta src/data/avifkuvat.ts (scripts/lisaa_kuva.py --avif).
 * ═══════════════════════════════════════════════════════ */

const AVIF_KUVAT = new Set(avifKuvat);

/** Responsiivisen WebP-kuvan osoite: perusnimi on ryhmässä 1. */
const WEBP_OSOITE = /\/Pictures-\d+\/([a-z0-9-]+)-\d+\.webp/;

/** Onko kuvalla AVIF-versiot. */
export function hasAvif(baseName: string): boolean {
  return AVIF_KUVAT.has(baseName);
}

/**
 * Muuttaa WebP-kuvan srcSetin tai src-osoitteen AVIF-vastineeksi (samat leveydet), jos kuvalla on
 * AVIF-versiot. Muuten palauttaa undefined, jolloin kuva näytetään pelkkänä WebP:nä.
 */
export function avifVastine(webp: string | undefined): string | undefined {
  if (!webp) return undefined;
  const base = WEBP_OSOITE.exec(webp)?.[1];
  if (!base || !hasAvif(base)) return undefined;
  return webp.replace(/\.webp(?=\s|,|$)/g, ".avif");
}
