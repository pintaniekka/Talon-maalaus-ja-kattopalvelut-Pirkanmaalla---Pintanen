/**
 * Kotitalousvähennys-palikan yhteiset tekstit vaihtoehdoille A–E (tarkastus 12.10.2026, luku 4).
 * Luvut tulevat lauseesta KOTITALOUSVAHENNYS (src/data/company.ts); tässä on otsikko, linkki,
 * laattojen jako ja sama sääntö lukuina esimerkkilaskelmaa varten. Lause "Erittelemme työn osuuden
 * laskuun, joten vähennyksen hakeminen on helppoa" on korvattu (T48).
 */
export const VAHENNYS_OTSIKKO = "Työn osuudesta saat kotitalousvähennyksen";

export const VAHENNYS_ERITTELY = "Työn osuus on laskussa eriteltynä.";

/** "Lue lisää" vie kotitalousvähennyssivulle (Eerik 26.10.2026); aiemmin artikkeliin kotitalousvahennys-katto-ja-maalaustyot. */
export const VAHENNYS_ARTIKKELI = "/kotitalousvahennys/";

export const VAHENNYS_VUODET = "2026–2027";

/**
 * Sääntö lukuina (sama kuin KOTITALOUSVAHENNYS-lauseessa ja artikkelissa kotitalousvahennys-katto-ja-maalaustyot):
 * 40 % työn osuudesta, omavastuu 150 €, enintään 2 100 € yhdeltä ihmiseltä vuodessa. Jos lause muuttuu, päivitä nämä.
 */
export const VAHENNYS_SAANTO = { osuus: 0.4, omavastuu: 150, enimmaismaara: 2100 } as const;

/**
 * Työn osuus urakkahinnasta hintalaskurin riville "Kotitalousvähennyksen jälkeen" (Eerik 26.10.2026: materiaalit
 * noin 20 %, lukua ei kirjoiteta sivuille). Vähennys lasketaan yhden maksajan enimmäismäärällä (Eerik 26.10.2026,
 * yöajon kysymys 19).
 */
export const VAHENNYS_TYON_OSUUS = 0.8;

/**
 * Hinta kotitalousvähennyksen jälkeen, pyöristettynä kymmeneen euroon. Sama kaava kuin hintakorttien afterFrom-luvuissa
 * (src/data/prices.ts): työn osuus 80 % hinnasta, siitä 40 %, enintään 2 100 €. Omavastuuta ei vähennetä, koska se on
 * henkilökohtainen ja vähennetään kerran vuodessa, ei joka työstä (Eerik 26.10.2026). Omavastuu kerrotaan rivin alla.
 */
/**
 * Hinta-arvion vähennys "alennuksena" (Eki 31.10.2026): vähennys hintavälin keskikohdasta, sama kaava kuin
 * hintaVahennyksenJalkeen, pyöristettynä kymmeneen euroon. Näytetään muodossa "~1 240 €".
 */
export const vahennysArvio = (min: number, max: number): number => {
  const keski = (min + max) / 2;
  const vahennys = Math.min(keski * VAHENNYS_TYON_OSUUS * VAHENNYS_SAANTO.osuus, VAHENNYS_SAANTO.enimmaismaara);
  return Math.round(vahennys / 10) * 10;
};

/** "~1 240 €". */
export const vahennysTeksti = (min: number, max: number) => `~${vahennysArvio(min, max).toLocaleString("fi-FI")} €`;

export const hintaVahennyksenJalkeen = (hinta: number): number => {
  const tyo = hinta * VAHENNYS_TYON_OSUUS;
  const vahennys = Math.min(Math.round(tyo * VAHENNYS_SAANTO.osuus), VAHENNYS_SAANTO.enimmaismaara);
  return Math.round((hinta - vahennys) / 10) * 10;
};

/**
 * Pieni teksti vähennysrivin alla laskureissa ja hintasivujen esimerkissä (Eerik 26.10.2026). Perustelu: vero.fi,
 * Kotitalousvähennyksen määrä (päivitetty 13.10.2026): "Omavastuu vähennetään vain kerran vuodessa. Jos teetät saman
 * vuoden aikana lisää vähennykseen oikeuttavaa työtä, omavastuuta ei vähennetä enää uudelleen."
 * (docs/lahteet-kotitalousvahennys-2026-10-27.md). Siksi laskuri ei vähennä omavastuuta, vaan kertoo sen.
 */
export const VAHENNYS_OMAVASTUU_HUOMAUTUS = "Omavastuu 150 € vuodessa, jos et ole käyttänyt sitä muihin töihin.";

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
