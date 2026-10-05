/**
 * Staattisten pakettitiedostojen (/assets/*) välitys (Cloudflare Pages Function).
 *
 * Miksi: public/_headers antaa polulle /assets/* otsakkeen
 * "Cache-Control: public, max-age=31536000, immutable", ja Pages liittää sen myös
 * 404-vastauksiin. Kun julkaisu vaihtuu, hashattua tiedostoa voidaan pyytää ennen kuin
 * se on jakelussa, ja 404 jää vuodeksi sekä Cloudflaren reunavälimuistiin
 * (cf-cache-status: HIT) että selaimeen. Sen jälkeen sivun JavaScript ei lataudu
 * (tuotanto 5.10.2026: vendor-react-*.js → 404 HIT, vaikka tiedosto oli julkaisussa;
 * korjaantui vasta Purge Everything -tyhjennyksellä).
 *
 * Tämä funktio hakee tiedoston staattisesta jakelusta (env.ASSETS) ja asettaa
 * Cache-Controlin vastauksen tilan mukaan: onnistunut vastaus (2xx tai 304) pysyy
 * vuoden immutable-välimuistissa, kaikki muu (404, 5xx) saa "no-store", jota sekä
 * Cloudflaren reuna että selain noudattavat: 404:ää ei tallenneta lainkaan.
 * Edellytys: zonen Cache Rules ei saa ohittaa origin-otsakkeita (Edge TTL
 * "Override origin"). Reitti on rajattu tiedostossa public/_routes.json polkuihin
 * /assets/* ja /api/*.
 */

interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetsBinding;
}

interface PagesContext {
  request: Request;
  env: Env;
}

export const IMMUTABLE = "public, max-age=31536000, immutable";
export const NO_STORE = "no-store";

/** Rakentaa vastauksen, jonka Cache-Control riippuu tilasta. Muut otsakkeet säilyvät. */
export const withCacheControl = (res: Response): Response => {
  const headers = new Headers(res.headers);
  headers.set("Cache-Control", res.ok || res.status === 304 ? IMMUTABLE : NO_STORE);
  if (!headers.has("X-Content-Type-Options")) headers.set("X-Content-Type-Options", "nosniff");
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
};

export const onRequest = async ({ request, env }: PagesContext): Promise<Response> => {
  const res = await env.ASSETS.fetch(request);
  return withCacheControl(res);
};
