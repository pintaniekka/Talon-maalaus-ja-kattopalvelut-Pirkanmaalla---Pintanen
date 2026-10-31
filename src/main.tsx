import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App, { motionFeaturesPromise } from "./App.tsx";
// Itse tarjoillut fontit (ei Google Fonts -kutsuja kävijän selaimesta).
// Esikatselu B: Montserrat (muuttuva 700–900) otsikoihin ja Open Sans (muuttuva 400–600) leipätekstiin,
// molemmat rajattu suomen merkkeihin, ks. src/fonts.css.
import "./fonts.css";
import "./index.css";

// index.html sisältää sivukohtaiset title/description/og-tagit niitä lukijoita varten,
// jotka eivät aja JavaScriptiä. Selaimessa SEO-komponentti (Helmet) tuottaa samat tagit
// uudelleen, joten staattiset kopiot poistetaan ennen renderöintiä. Muuten sivulla olisi
// kaksi meta descriptionia, joista ensimmäinen ei päivity sivua vaihdettaessa.
document.head
  .querySelectorAll(
    'meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], meta[name="robots"]',
  )
  .forEach((el) => el.remove());

const rootEl = document.getElementById("root")!;

const app = (motionFeatures?: Parameters<typeof App>[0]["motionFeatures"]) => (
  <HelmetProvider>
    <App motionFeatures={motionFeatures} />
  </HelmetProvider>
);

// Esirenderöity sivu: #root sisältää jo valmiin HTML:n (build-aikainen esirenderöinti).
// React liittää siihen (hydrateRoot) sen sijaan, että rakentaisi näkymän uudelleen:
// sivu on näkyvissä heti HTML:n saavuttua, ja koodipaketin lataus vain tekee siitä
// toimivan. Laiskasti ladattavan alasivun sisältö pysyy paikallaan, kunnes sen paketti
// on ladattu (Suspense-raja). Tyhjä #root (404-sivu, jonossa oleva artikkeli)
// renderöidään selaimessa kuten ennenkin.
//
// Hydraatio alkaa vasta, kun selain on piirtänyt valmiin HTML:n kerran (requestAnimationFrame
// + setTimeout): nopealla yhteydellä koodi ehtii perille ennen ensimmäistä piirtoa, eikä
// ensimmäisen piirron pidä odottaa Reactin työtä. Hinta on yksi ruudunpäivitys (noin 16 ms)
// ennen kuin napit toimivat.
//
// Hydraatio odottaa animaatio-ominaisuuksien paketin (39 kt, esiladattu modulepreloadilla):
// jos se valmistuu kesken hydraation, LazyMotionin tilapäivitys saa Reactin hylkäämään
// esirenderöidyn HTML:n ja rakentamaan laiskan alasivun uudelleen (#418/#421, 30.10.2026).
if (rootEl.firstElementChild) {
  requestAnimationFrame(() => {
    setTimeout(() => {
      motionFeaturesPromise.then((features) => hydrateRoot(rootEl, app(features)));
    }, 0);
  });
} else {
  createRoot(rootEl).render(app());
}
