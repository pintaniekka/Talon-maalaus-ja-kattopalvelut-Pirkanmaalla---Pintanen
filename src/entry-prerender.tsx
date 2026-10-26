/**
 * Build-aikainen esirenderöinti. vite-plugin-spa-routes lataa tämän moduulin
 * Viten SSR-lataajalla ja kutsuu render(polku) jokaiselle kanoniselle reitille.
 * Tulos kirjoitetaan reitin index.html:n #root-elementtiin, jolloin sivun sisältö
 * on luettavissa ilman JavaScriptiä (hakukoneet, tekoälyhakujen crawlerit, some-botit).
 */
import { Writable } from "node:stream";
import { StringDecoder } from "node:string_decoder";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { AppContent } from "./App";

export interface PrerenderResult {
  html: string;
  /** Helmetin tuottamat JSON-LD-skriptit (FAQ, Service, murupolku, artikkeli). */
  headScripts: string;
}

export const render = (url: string): Promise<PrerenderResult> =>
  new Promise((resolve, reject) => {
    const helmetContext: { helmet?: HelmetServerState } = {};
    let html = "";
    // Reactin virta katkoo UTF-8-merkkejä lohkojen rajalla, joten tavut kootaan StringDecoderilla.
    // Lisäksi React täyttää lohkon lopun NUL-tavuilla, kun monitavuinen merkki ei mahdu lohkoon
    // (yöajo 3, 28.10.2026: 16 sivun HTML:ssä oli NUL-tavu sanan keskellä). Ne poistetaan.
    const decoder = new StringDecoder("utf8");
    // Aikakatkaisu puretaan aina, muuten ajastimet pitäisivät build-prosessin käynnissä.
    const timer = setTimeout(() => fail(new Error(`esirenderöinti aikakatkaistiin: ${url}`)), 20000);
    const fail = (error: unknown) => {
      clearTimeout(timer);
      reject(error);
    };
    const sink = new Writable({
      write(chunk: Buffer, _encoding, callback) {
        html += decoder.write(chunk).replace(/\0/g, "");
        callback();
      },
    });
    sink.on("finish", () => {
      clearTimeout(timer);
      html += decoder.end().replace(/\0/g, "");
      resolve({ html, headScripts: helmetContext.helmet?.script.toString() ?? "" });
    });

    const stream = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppContent />
        </StaticRouter>
      </HelmetProvider>,
      {
        // Odota kaikki laiskasti ladattavat osat, jotta HTML on kokonainen.
        onAllReady() {
          stream.pipe(sink);
        },
        onShellError: fail,
        onError: fail,
      },
    );
  });
