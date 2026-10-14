/**
 * Kotitalousvähennys-palikan yhteiset tekstit vaihtoehdoille A–E (tarkastus 12.10.2026, luku 4).
 * Luvut tulevat lauseesta KOTITALOUSVAHENNYS (src/data/company.ts); tässä on otsikko, linkki,
 * laattojen jako ja sama sääntö lukuina esimerkkilaskelmaa varten. Lause "Erittelemme työn osuuden
 * laskuun, joten vähennyksen hakeminen on helppoa" on korvattu (T48).
 */
export const VAHENNYS_OTSIKKO = "Työn osuudesta saat kotitalousvähennyksen";

export const VAHENNYS_ERITTELY = "Työn osuus on laskussa eriteltynä.";

export const VAHENNYS_ARTIKKELI = "/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/";

export const VAHENNYS_VUODET = "2026–2027";

/**
 * Sääntö lukuina (sama kuin KOTITALOUSVAHENNYS-lauseessa ja artikkelissa kotitalousvahennys-katto-ja-maalaustyot):
 * 40 % työn osuudesta, omavastuu 150 €, enintään 2 100 € yhdeltä ihmiseltä vuodessa. Jos lause muuttuu, päivitä nämä.
 */
export const VAHENNYS_SAANTO = { osuus: 0.4, omavastuu: 150, enimmaismaara: 2100 } as const;

/** Kuukausierät: sama lause kuin hintakorttien alla (src/components/pinnoitus/PinnoitusPricingCards.tsx). */

/** Laatat (B) ja iso luku (C). Samat luvut kuin KOTITALOUSVAHENNYS-lauseessa; jos lause muuttuu, päivitä nämä. */
export const VAHENNYS_LUVUT = [
  { value: "40 %", label: "työn osuudesta" },
  { value: "2 100 €", label: "enintään vuodessa" },
  { value: "150 €", label: "omavastuu" },
] as const;

export const VAHENNYS_BTN_OUTLINE =
  "inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-xl border-2 border-accent-ink text-accent-ink font-heading font-extrabold text-[15px] hover:bg-card transition-colors whitespace-nowrap";
export const VAHENNYS_LINK_ARROW =
  "inline-flex items-center gap-1.5 min-h-[44px] font-bold text-[15px] text-accent-ink hover:underline underline-offset-4";
