import { getCityHeroBase } from "./projects";
import { HERO_BASE } from "./seo";

/**
 * Kaupunkisivun hero-kuva: paikkakunnan oma kohde, jos sellainen on, muuten palvelun vakiokuva.
 * Omassa tiedostossaan, koska se tarvitsee kohdelistan (projects.ts): seo.ts on jokaisen sivun pääpaketissa,
 * ja routeSeo.ts tuo artikkelilistan, jota kaupunkisivut eivät tarvitse.
 */
export const cityHeroBase = (slug: string, service: "pinnoitus" | "maalaus" | "alue"): string =>
  getCityHeroBase(slug, service === "alue" ? undefined : service) ??
  (service === "pinnoitus" ? HERO_BASE.pinnoitus : service === "maalaus" ? HERO_BASE.maalaus : HERO_BASE.alue);
