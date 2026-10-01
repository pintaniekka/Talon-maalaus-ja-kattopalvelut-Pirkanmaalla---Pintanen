/**
 * Pintanen Oy – Kuvaresurssien hallinta
 *
 * Kaikki julkiset kuvat haetaan **aina** Pintanen-tilin Supabase Storage
 * -bucketista (projekti: fndkkgfpsgghvewvoysr, bucket: "images").
 *
 * ⚠️  ÄLÄ muuta FIXED_SUPABASE_URL-arvoa äläkä vaihda polkuja suhteellisiksi.
 *     Kuvat on tarkoitettu ladattaviksi pilvestä kaikissa ympäristöissä.
 *
 * @module storage
 */

/** Kiinteä Supabase-osoite Pintanen-projektille (fndkkgfpsgghvewvoysr). */
const FIXED_SUPABASE_URL = "https://fndkkgfpsgghvewvoysr.supabase.co";

/**
 * Palauttaa absoluuttisen URL-osoitteen Lovable Cloudin tallennustilasta (images-bucket).
 */
export function getStorageUrl(path: string): string {
  return `${FIXED_SUPABASE_URL}/storage/v1/object/public/images/${encodeURI(path)}`;
}

/**
 * Palauttaa mobiilioptimoitua kuvan URL:n annetusta desktop-URL:sta.
 * Mobiiliversiot sijaitsevat pictures-480/ tai pictures-750/ -kansiossa.
 * @deprecated Käytä getResponsiveSrcSet uusille kuville.
 */
export function getMobileImageUrl(desktopUrl: string, width: 480 | 750): string {
  if (!desktopUrl.includes('/storage/v1/object/public/images/')) return desktopUrl;
  const basePath = desktopUrl.split('/storage/v1/object/public/images/')[1];
  const segments = basePath.split('/');
  const encodedFilename = segments[segments.length - 1];
  const filename = decodeURI(encodedFilename);
  const dotIdx = filename.lastIndexOf('.');
  const name = filename.substring(0, dotIdx);
  const ext = filename.substring(dotIdx);
  const folder = width === 750 ? 'pictures-750' : 'pictures-480';
  return `${FIXED_SUPABASE_URL}/storage/v1/object/public/images/${folder}/${encodeURI(`${name}-${width}${ext}`)}`;
}

/** @deprecated Käytä getResponsiveSrcSet uusille kuville. */
export function getHeroSrcSet(desktopUrl: string): string {
  return `${getMobileImageUrl(desktopUrl, 750)} 750w, ${desktopUrl} 1125w`;
}

/** @deprecated Käytä getResponsiveSrcSet uusille kuville. */
export function getImageSrcSet(desktopUrl: string): string {
  return `${getMobileImageUrl(desktopUrl, 480)} 480w, ${desktopUrl} 900w`;
}

/* ═══════════════════════════════════════════════════════
 *  UUSI NELIPORTAINEN RESPONSIIVINEN KUVARAKENNE
 *  Koot: 400w, 800w, 1200w, 1500w (kaikki WebP)
 *  Kansiot: Pictures-400/, Pictures-800/, Pictures-1200/, Pictures-1500/
 *  Tiedostonimet: [perusnimi]-[leveys]w.webp
 * ═══════════════════════════════════════════════════════ */

export type ResponsiveWidth = 400 | 800 | 1200 | 1500;

// Vain 400/800/1200 ovat aina saatavilla bucketissa; 1500 puuttuu osasta
// kuvia, joten oletus-srcSet ei käytä sitä. Tämä estää tilanteen, jossa
// selain valitsee 1500w-version, saa 400-virheen eikä näytä kuvaa lainkaan.
const RESPONSIVE_WIDTHS: ResponsiveWidth[] = [400, 800, 1200];

/**
 * Kuvaversiot, jotka puuttuvat bucketista (tarkistettu 1.10.2026, palvelin vastaa 400).
 * Ne jätetään pois srcsetistä, koska selain ei yritä toista kokoa, jos valittu puuttuu:
 * kuva jäisi kokonaan näkymättä niillä näytöillä, joille 800 px osuu.
 * Kun tiedosto on ladattu bucketiin, rivin voi poistaa.
 */
const MISSING_VARIANTS: Record<string, ResponsiveWidth[]> = {
  "violetti-puutalo-varinvaihto-peittomaalaus-jalkeen": [800],
  "vihrea-puutalo-ulkomaalaus-jalkeen": [800],
};

/**
 * Palauttaa URL:n yksittäiselle responsiiviselle kuvaversiolle.
 * @param baseName - Kuvan perusnimi ilman leveyssuffiksia tai tiedostopäätettä, esim. "vihrea-puutalo-ulkomaalaus-jalkeen"
 * @param width - Haluttu leveys (400, 800, 1200 tai 1500)
 */
export function getResponsiveUrl(baseName: string, width: ResponsiveWidth): string {
  return `${FIXED_SUPABASE_URL}/storage/v1/object/public/images/Pictures-${width}/${encodeURI(baseName)}-${width}.webp`;
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
