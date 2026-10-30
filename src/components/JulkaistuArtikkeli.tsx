import { Suspense, type ReactNode } from "react";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

const Tarkistin = lazyWithRetry(() => import("./JulkaistuArtikkeliTarkistin"));

/**
 * Näyttää lapsensa (yleensä linkin artikkeliin) vasta artikkelin julkaisupäivästä: jonossa oleva artikkeli on
 * noindex-kuori. Julkaisupäivä tarkistetaan selaimessa kuten ennenkin, mutta artikkelilista (articles.ts)
 * ladataan laiskasti omana pakettinaan, jotta se ei kasvata palvelu- ja kaupunkisivujen JavaScriptiä
 * (laaja auditointi 30.10.2026). Esirenderöinti odottaa laiskat osat, joten staattinen HTML ei muutu.
 */
const JulkaistuArtikkeli = ({ slug, children }: { slug: string; children: ReactNode }) => (
  <Suspense fallback={null}>
    <Tarkistin slug={slug}>{children}</Tarkistin>
  </Suspense>
);

export default JulkaistuArtikkeli;
