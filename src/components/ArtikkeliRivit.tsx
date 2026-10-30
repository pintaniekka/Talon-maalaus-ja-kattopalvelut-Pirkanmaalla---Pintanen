import { Suspense } from "react";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
import type { ArtikkeliRivitProps } from "./ArtikkeliRivitSisalto";

const Sisalto = lazyWithRetry(() => import("./ArtikkeliRivitSisalto"));

/**
 * Lyhyt artikkelilista (ArtikkeliRivitSisalto.tsx) laiskasti ladattuna. Artikkelilista (articles.ts) kasvaa
 * kahdella artikkelilla viikossa, ja ennen tätä se oli jokaisen sivun pääpaketissa (laaja auditointi 30.10.2026).
 * Nyt se latautuu omana pakettinaan vain sivuilla, joilla on artikkelilista.
 *
 * Ulkoasu ja julkaisu eivät muutu: esirenderöinti odottaa laiskat osat (entry-prerender.tsx, onAllReady), joten
 * staattisessa HTML:ssä on sama lista, ja selain jättää sen paikalleen, kunnes paketti on ladattu. Lista
 * lasketaan selaimessa päivämäärästä kuten ennenkin, joten jonossa oleva artikkeli tulee näkyviin
 * julkaisupäivänään ilman uutta buildia.
 */
const ArtikkeliRivit = (props: ArtikkeliRivitProps) => (
  <Suspense fallback={null}>
    <Sisalto {...props} />
  </Suspense>
);

export default ArtikkeliRivit;
