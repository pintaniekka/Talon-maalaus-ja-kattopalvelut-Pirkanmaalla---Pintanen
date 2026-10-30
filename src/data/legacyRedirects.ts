/**
 * Vanhat osoitteet ja niiden nykyiset sivut (ks. routes.ts). Erillinen tiedosto, koska App.tsx tuo tämän
 * pääpakettiin: routes.ts tuo mukanaan artikkeli-, UKK- ja kohdelistat.
 */
import { cities as fullServiceCities, allCities, maalausCities, puhdistusCities } from "./cityData";

export interface LegacyRedirect {
  /** Vanha osoite ilman loppukauttaviivaa. */
  from: string;
  /** Nykyinen kanoninen sivu ilman loppukauttaviivaa. */
  to: string;
}

/**
 * Vanhat osoitteet ja niiden nykyiset sivut. Yksi lähde kolmeen käyttöön:
 *  - vite-plugin-spa-routes.ts kirjoittaa dist/_redirects-tiedoston (Cloudflare Pages 301)
 *  - App.tsx ohjaa selaimessa <Navigate>-reitillä, jos palvelinohjaus jostain syystä puuttuu
 *  - routes.test.ts tarkistaa, että jokainen kohde on kanoninen sivu
 * Vanhoille osoitteille ei enää luoda index.html-kuoria: kuori palautti 200:n etusivun
 * otsikolla ilman canonicalia, ja Google indeksoi niitä (auditointi 11.10.2026, osa 4, luku 5).
 */
export const legacyRedirects: LegacyRedirect[] = [
  { from: "/kattopalvelut/pinnoitus", to: "/tiilikaton-pinnoitus-pirkanmaa" },
  { from: "/kattopalvelut/puhdistus", to: "/tiilikaton-pinnoitus-pirkanmaa" },
  { from: "/talon-maalaus", to: "/talon-maalaus-pirkanmaa" },
  { from: "/hinnat", to: "/hintalaskuri" },
  { from: "/maalauspalvelut-hinta-pirkanmaa", to: "/hintalaskuri" },
  { from: "/hinnat/tiilikaton-pinnoitus", to: "/tiilikaton-pinnoitus-hinta-pirkanmaa" },
  { from: "/hinnat/katon-puhdistus", to: "/tiilikaton-pinnoitus-hinta-pirkanmaa" },
  { from: "/hinnat/talon-maalaus", to: "/talon-maalaus-hinta-pirkanmaa" },
  { from: "/artikkelit/tiilikaton-pinnoituksen-hinta", to: "/tiilikaton-pinnoitus-hinta-pirkanmaa" },
  // Eerik 28.10.2026: kuntotarkastus omiksi sivuiksi katolle ja seinille.
  { from: "/ilmainen-kuntotarkastus", to: "/ilmainen-katon-kuntotarkastus" },
  ...allCities.map((c) => ({ from: `/alue/${c.slug}`, to: `/maalauspalvelut-${c.slug}` })),
  ...fullServiceCities.map((c) => ({ from: `/kattopalvelut/pinnoitus/${c.slug}`, to: `/tiilikaton-pinnoitus-${c.slug}` })),
  ...fullServiceCities.map((c) => ({ from: `/kattopalvelut/puhdistus/${c.slug}`, to: `/tiilikaton-pinnoitus-${c.slug}` })),
  // Katon puhdistus on loppunut (Eerik 11.10.2026): puhdistussivut ohjataan saman paikkakunnan pinnoitussivulle.
  { from: "/katon-puhdistus-pirkanmaa", to: "/tiilikaton-pinnoitus-pirkanmaa" },
  { from: "/katon-puhdistus-hinta-pirkanmaa", to: "/tiilikaton-pinnoitus-hinta-pirkanmaa" },
  ...puhdistusCities.map((c) => ({ from: `/katon-puhdistus-${c.slug}`, to: `/tiilikaton-pinnoitus-${c.slug}` })),
  ...maalausCities.map((c) => ({ from: `/talon-maalaus/${c.slug}`, to: `/talon-maalaus-${c.slug}` })),
];
