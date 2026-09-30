import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
// Itse tarjoillut fontit (ei Google Fonts -kutsuja kävijän selaimesta)
import "@fontsource/montserrat/latin-400.css";
import "@fontsource/montserrat/latin-500.css";
import "@fontsource/montserrat/latin-600.css";
import "@fontsource/montserrat/latin-700.css";
import "@fontsource/montserrat/latin-800.css";
import "@fontsource/open-sans/latin-400.css";
import "@fontsource/open-sans/latin-500.css";
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

// Esirenderöity sivu: #root sisältää jo valmiin HTML:n (build-aikainen esirenderöinti).
// React rakentaa saman näkymän uudelleen. Siksi aikaa, kun sivun oma koodipaketti latautuu,
// näytetään tämä sama HTML, ettei ruutu välähdä tyhjäksi.
const prerenderedHtml = rootEl.innerHTML.trim();
const initialFallback = prerenderedHtml ? (
  <div dangerouslySetInnerHTML={{ __html: prerenderedHtml }} />
) : undefined;

createRoot(rootEl).render(
  <HelmetProvider>
    <App fallback={initialFallback} />
  </HelmetProvider>
);
