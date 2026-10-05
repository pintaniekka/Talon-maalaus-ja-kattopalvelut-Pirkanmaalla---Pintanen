import { useState } from "react";
import { createRoot } from "react-dom/client";
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

// Esirenderöity sivu: #root sisältää jo valmiin HTML:n (build-aikainen esirenderöinti).
// React rakentaa saman näkymän uudelleen. Siksi aikaa, kun sivun oma koodipaketti latautuu,
// näytetään tämä sama HTML, ettei ruutu välähdä tyhjäksi.
//
// Tilannekuvaa käytetään vain ensimmäisellä latauksella. Kun sovellus on kerran näkyvissä,
// se tyhjennetään: myöhemmissä sivunvaihdoissa latausnäkymä on tyhjä, ei vanha sivu.
let prerenderedHtml = rootEl.innerHTML.trim();

const InitialFallback = () => {
  // Arvo luetaan kerran tämän latausnäkymän syntyessä.
  const [html] = useState(prerenderedHtml);
  return html ? (
    <div data-prerender-snapshot dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <div className="min-h-screen" />
  );
};

const clearPrerenderedHtml = () => {
  prerenderedHtml = "";
};

createRoot(rootEl).render(
  <HelmetProvider>
    <App fallback={<InitialFallback />} onReady={clearPrerenderedHtml} />
  </HelmetProvider>
);
