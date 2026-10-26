import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
// Itse tarjoillut fontit (ei Google Fonts -kutsuja kävijän selaimesta).
// Vain neljä painoa (P14): Montserrat 700/800 otsikoihin ja painikkeisiin, Open Sans 400/600 leipätekstiin.
// Välipainot (500, Montserrat 400/600) selain johtaa lähimmästä ladatusta painosta.
import "@fontsource/montserrat/latin-700.css";
import "@fontsource/montserrat/latin-800.css";
import "@fontsource/open-sans/latin-400.css";
import "@fontsource/open-sans/latin-600.css";
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

const app = (
  <HelmetProvider>
    <App />
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
if (rootEl.firstElementChild) {
  requestAnimationFrame(() => {
    setTimeout(() => hydrateRoot(rootEl, app), 0);
  });
} else {
  createRoot(rootEl).render(app);
}
