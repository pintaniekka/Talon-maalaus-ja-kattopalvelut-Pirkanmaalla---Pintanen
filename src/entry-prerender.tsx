/**
 * Build-aikainen esirenderöinti. vite-plugin-spa-routes lataa tämän moduulin
 * Viten SSR-lataajalla ja kutsuu render(polku) jokaiselle kanoniselle reitille.
 * Tulos kirjoitetaan reitin index.html:n #root-elementtiin, jolloin sivun sisältö
 * on luettavissa ilman JavaScriptiä (hakukoneet, tekoälyhakujen crawlerit, some-botit).
 */
import { Writable } from "node:stream";
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
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });
    sink.on("finish", () =>
      resolve({ html, headScripts: helmetContext.helmet?.script.toString() ?? "" }),
    );

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
        onShellError: reject,
        onError(error) {
          reject(error);
        },
      },
    );
    setTimeout(() => reject(new Error(`esirenderöinti aikakatkaistiin: ${url}`)), 20000);
  });
