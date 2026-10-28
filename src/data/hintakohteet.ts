/**
 * Toteutuneiden urakoiden hinnat hintasivuille (Eerik 28.10.2026: CRM:n lista toteutuneista urakoista,
 * hinnat nimettöminä). Vain kohteet, joiden kuva on varmasti sama urakka. Hinta on asiakkaan maksama
 * urakkahinta sis. alv, ennen kotitalousvähennystä, pyöristettynä lähimpään kymmeneen euroon.
 * Asiakkaiden nimiä ei kirjata tähän tiedostoon eikä muualle repoon.
 */
import type { ProjectService } from "./projects";

export interface HintaKohde {
  services: ProjectService[];
  /** cityData-slug. */
  city: string;
  /** Urakkahinta € sis. alv. */
  hinta: number;
  /** Lyhyt kuvaus kohteesta ja työstä, ei nimiä. */
  kuvaus: string;
  alt: string;
  image?: string;
  pair?: string;
  before?: string;
  after?: string;
}

export const hintakohteet: HintaKohde[] = [
  // Katot
  {
    services: ["pinnoitus"],
    city: "ylojarvi",
    hinta: 5200,
    kuvaus: "Jyrkkä katto ja kattoikkuna. Pesu, pinnoitus kahteen kertaan ja ikkunan suojaus. Kolme työpäivää.",
    alt: "Jyrkkä tiilikatto Ylöjärvellä pesun aikana ja pinnoituksen jälkeen",
    before: "tiilikaton-pesu-ja-pinnoitus-ylojarvi-puoliksi-pesty",
    after: "tiilikaton-pinnoitus-ylojarvi-keltainen-talo-jalkeen",
  },
  {
    services: ["pinnoitus"],
    city: "tampere",
    hinta: 3130,
    kuvaus: "Kulunut tiilikatto. Pesu, pinnoitus kahteen kertaan ja harjatiiviste.",
    alt: "Pinnoitettu tummanharmaa tiilikatto Tampereella läheltä",
    image: "tiilikaton-pinnoitus-tampere-tummanharmaa-tiilikatto-lahikuva",
  },
  // Katto ja seinät samalla kertaa
  {
    services: ["pinnoitus", "maalaus"],
    city: "tampere",
    hinta: 11470,
    kuvaus: "Katto ja seinät samalla kertaa. Katon pinnoitus ja puutalon maalaus koristeikkunoineen.",
    alt: "Puutalo Tampereella katon pinnoituksen ja seinien maalauksen jälkeen",
    image: "talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen",
  },
  // Seinät
  {
    services: ["maalaus"],
    city: "nokia",
    hinta: 3640,
    kuvaus: "Yksikerroksinen puutalo. Pesu ja huoltomaalaus samalla värillä.",
    alt: "Vaaleansinisen puutalon pääty Nokialla ennen ja jälkeen huoltomaalauksen",
    pair: "talon-maalaus-nokia-vaaleansininen-talo-paaty",
  },
  {
    services: ["maalaus"],
    city: "orivesi",
    hinta: 4580,
    kuvaus: "Puolitoistakerroksinen rintamamiestalo. Homepesu, hilseilevän maalin kaavinta, pohjamaali ja pintamaali.",
    alt: "Rintamamiestalon sivuseinä Orivedellä ennen ja jälkeen maalauksen",
    pair: "talon-maalaus-orivesi-rintamamiestalo-sivuseina",
  },
  {
    services: ["maalaus"],
    city: "akaa",
    hinta: 5310,
    kuvaus: "Iso yksikerroksinen talo. Pesu ja huoltomaalaus, pensselinjäljet viimeisteltiin tarkasti.",
    alt: "Keltaisen omakotitalon pääty Akaalla ennen ja jälkeen huoltomaalauksen",
    pair: "talon-maalaus-akaa-keltainen-omakotitalo-paaty",
  },
  {
    services: ["maalaus"],
    city: "orivesi",
    hinta: 6140,
    kuvaus: "Hirsimökki, josta maalattiin kaikki: seinät, kaiteet, ikkunanpuitteet ja ovet. Terassi öljyttiin samalla.",
    alt: "Hirsimökin pääty Orivedellä ennen ja jälkeen maalauksen",
    pair: "talon-maalaus-orivesi-hirsimokki-paaty",
  },
];

/** Hintasivun kohteet: oman palvelun kohteet ensin halvimmasta, katto + seinät -paketti viimeisenä. */
export const getHintakohteet = (service: ProjectService): HintaKohde[] =>
  hintakohteet
    .filter((k) => k.services.includes(service))
    .sort((a, b) => a.services.length - b.services.length || a.hinta - b.hinta);
