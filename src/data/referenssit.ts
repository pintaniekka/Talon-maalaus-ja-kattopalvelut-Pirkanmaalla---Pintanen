import { projectItems, type ProjectItem, type ProjectService } from "./projects";
import { getCityBySlug } from "./cityData";

/**
 * Referenssisivun kuvat (Eerik 27.10.2026: galleria uusiksi). Pohjana ovat samat kohteet kuin kaupunkisivuilla
 * (projects.ts), ja lisäksi vanhemmat ennen–jälkeen-parit, joista ei ole paikkakuntasivun tietoja (ei vuotta).
 * Lisäkohteita ei näytetä kaupunkisivuilla, siksi ne ovat täällä eivätkä projects.ts:ssä.
 */
export interface ReferenssiKohde {
  /** cityData-slug tai "pirkanmaa", kun paikkakuntaa ei tiedetä tarkemmin. */
  city: string;
  services: ProjectService[];
  /** Otsikko kortissa: mitä tehtiin. */
  title: string;
  /** Yksi lause kuvasta. */
  text: string;
  alt: string;
  /** Liukusäädin: perusnimi ilman -ennen / -jalkeen. */
  pair?: string;
  /** Ennen ja jälkeen vierekkäin, eri kuvakulma. */
  before?: string;
  after?: string;
  image?: string;
}

const lisakohteet: ReferenssiKohde[] = [
  // Eemilin kohde 9 (27.10.2026): toiminta-alueen ulkopuolella, paikkakuntaa ei kerrota.
  {
    city: "muu",
    services: ["maalaus"],
    title: "Talon maalaus",
    text: "Talossa on paljon nurkkia ja kulmia, joten jokainen nurkka tarkistettiin erikseen. Korkeimpiin kohtiin vuokrattiin nostin.",
    alt: "Valkoinen puutalo ja erkkeri ennen ja jälkeen maalauksen",
    pair: "talon-maalaus-valkoinen-puutalo-erkkeri",
  },
  {
    city: "muu",
    services: ["maalaus"],
    title: "Talon maalaus",
    text: "Parvekkeen puoli ennen ja jälkeen maalauksen.",
    alt: "Valkoisen puutalon parveke ennen ja jälkeen maalauksen",
    pair: "talon-maalaus-valkoinen-puutalo-parveke",
  },
  {
    city: "muu",
    services: ["maalaus"],
    title: "Talon maalaus",
    text: "Sivuseinä ennen ja jälkeen maalauksen.",
    alt: "Valkoisen puutalon sivuseinä ennen ja jälkeen maalauksen",
    pair: "talon-maalaus-valkoinen-puutalo-sivuseina",
  },
  {
    city: "muu",
    services: ["maalaus"],
    title: "Talon maalaus",
    text: "Pihan puoli keväällä ennen maalausta ja syksyllä maalauksen jälkeen.",
    alt: "Valkoinen puutalo pihan puolelta ennen ja jälkeen maalauksen",
    pair: "talon-maalaus-valkoinen-puutalo-piha",
  },
  {
    city: "tampere",
    services: ["maalaus"],
    title: "Talon maalaus ja värinvaihto",
    text: "Keltainen puutalo maalattiin violetiksi peittomaalilla.",
    alt: "Puutalo Tampereella ennen ja jälkeen värinvaihdon",
    before: "talon-maalaus-keltainen-puutalo-varinvaihto-ennen",
    after: "talon-maalaus-violetti-puutalo-varinvaihto-peittomaalaus-jalkeen",
  },
  {
    city: "hameenkyro",
    services: ["maalaus"],
    title: "Talon maalaus",
    text: "Tummansininen puutalo sai uuden pinnan samalla värillä.",
    alt: "Tummansininen puutalo Hämeenkyrössä ennen ja jälkeen maalauksen",
    before: "talon-maalaus-tummansininen-puutalo-ulkomaalaus-ennen",
    after: "talon-maalaus-tummansininen-puutalo-ulkomaalaus-jalkeen",
  },
  {
    city: "hameenkyro",
    services: ["maalaus"],
    title: "Talon maalaus",
    text: "Vihreä puutalo pestiin, kaavittiin ja maalattiin pensselillä.",
    alt: "Vihreä puutalo Hämeenkyrössä ennen ja jälkeen maalauksen",
    before: "talon-maalaus-vihrea-puutalo-ennen-ulkomaalausta",
    after: "talon-maalaus-vihrea-puutalo-ulkomaalaus-jalkeen",
  },
  {
    city: "hameenlinna",
    services: ["maalaus"],
    title: "Talon maalaus",
    text: "Keltainen omakotitalo huoltomaalattiin samalla värillä.",
    alt: "Keltainen omakotitalo Hämeenlinnassa ennen ja jälkeen maalauksen",
    before: "talon-maalaus-keltainen-omakotitalo-huoltomaalaus-ennen",
    after: "talon-maalaus-keltainen-omakotitalo-julkisivumaalaus-jalkeen",
  },
  {
    city: "pirkanmaa",
    services: ["maalaus"],
    title: "Talon maalaus ja värinvaihto",
    text: "Punainen omakotitalo maalattiin harmaaksi.",
    alt: "Omakotitalo Pirkanmaalla ennen ja jälkeen värinvaihdon harmaaksi",
    before: "talon-maalaus-punainen-omakotitalo-varinvaihto-ennen",
    after: "talon-maalaus-harmaa-omakotitalo-varinvaihto-jalkeen",
  },
  {
    city: "pirkanmaa",
    services: ["maalaus"],
    title: "Ulkoverhouksen huoltomaalaus",
    text: "Keltainen puuverhous ennen ja jälkeen huoltomaalauksen.",
    alt: "Keltainen puuverhous Pirkanmaalla ennen ja jälkeen huoltomaalauksen",
    before: "talon-maalaus-keltainen-puuverhous-ennen-julkisivumaalausta",
    after: "talon-maalaus-keltainen-ulkoverhous-huoltomaalaus-jalkeen",
  },
  {
    city: "ylojarvi",
    services: ["maalaus"],
    title: "Parvekkeen ja julkisivun maalaus",
    text: "Puutalon ja parvekkeen puuosat ennen ja jälkeen huoltomaalauksen.",
    alt: "Puutalo ja parveke Ylöjärvellä ennen ja jälkeen huoltomaalauksen",
    before: "talon-maalaus-puutalo-ja-parveke-ennen-maalausta",
    after: "talon-maalaus-puutalo-ja-parveke-huoltomaalaus-jalkeen",
  },
  {
    city: "valkeakoski",
    services: ["pinnoitus"],
    title: "Tiilikaton pesu ja pinnoitus",
    text: "Likainen tiilikatto pestiin ja maalattiin punaiseksi.",
    alt: "Tiilikatto Valkeakoskella ennen pesua ja pinnoituksen jälkeen",
    before: "tiilikaton-pesu-ja-pinnoitus-likainen-tiilikatto-ennen",
    after: "tiilikaton-pinnoitus-uudenveroinen-punainen-tiilikatto-jalkeen",
  },
  {
    city: "tampere",
    services: ["pinnoitus"],
    title: "Tiilikaton pinnoitus",
    text: "Haalistunut punainen tiilikatto sai uuden kirkkaan punaisen pinnan.",
    alt: "Punainen tiilikatto Tampereella ennen ja jälkeen pinnoituksen",
    before: "tiilikaton-pinnoitus-haalistunut-punainen-tiilikatto-ennen",
    after: "tiilikaton-pinnoitus-kirkkaan-punainen-tiilikatto-jalkeen",
  },
  {
    city: "pirkanmaa",
    services: ["maalaus"],
    title: "Talon maalaus",
    text: "Vaalea kartanomainen puutalo maalauksen jälkeen.",
    alt: "Vaalea kartanomainen puutalo ulkomaalauksen jälkeen",
    image: "talon-maalaus-vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
  },
  {
    city: "pirkanmaa",
    services: ["maalaus"],
    title: "Julkisivun maalaus",
    text: "Moderni tumma puutalo maalauksen jälkeen.",
    alt: "Moderni tumma puutalo julkisivumaalauksen jälkeen",
    image: "talon-maalaus-moderni-tumma-puutalo-julkisivumaalaus-valmis",
  },
  {
    city: "pirkanmaa",
    services: ["pinnoitus"],
    title: "Tiilikaton pinnoitus ja aurinkopaneelien suojaus",
    text: "Paneelit suojataan pinnoituksen ajaksi.",
    alt: "Tiilikaton pinnoitus ja aurinkopaneelien suojaus Pirkanmaalla",
    image: "tiilikaton-pinnoitus-ja-aurinkopaneelien-suojaus",
  },
  {
    city: "pirkanmaa",
    services: ["maalaus"],
    title: "Suojaus ennen maalausta",
    text: "Ikkunat, terassi ja piha suojataan ennen kuin maali avataan.",
    alt: "Talon julkisivun ja ikkunoiden suojaus ennen maalausta",
    image: "talon-maalaus-julkisivun-ja-ikkunoiden-suojaus",
  },
];

/** "Tiilikaton pinnoitus, Tampere 2026" -> otsikko "Tiilikaton pinnoitus" ja teksti ennallaan. */
const projektista = (p: ProjectItem): ReferenssiKohde => {
  const service = p.services.includes("maalaus") && p.services.includes("pinnoitus")
    ? "Katto ja seinät"
    : p.services[0] === "maalaus"
      ? "Talon maalaus"
      : "Tiilikaton pinnoitus";
  const kuvateksti = p.caption.replace(/,\s*[^,]+$/, "");
  // Kun kuvateksti olisi sama kuin otsikko ("Tiilikaton pinnoitus"), parille kerrotaan liukusäätimestä ja yksittäiselle kuvalle ei toisteta.
  const text =
    kuvateksti.toLowerCase() === service.toLowerCase()
      ? p.pair
        ? "Sama katto ennen ja jälkeen. Vedä liukusäädintä."
        : ""
      : kuvateksti;
  return { city: p.city, services: p.services, title: service, text: p.kertomus ?? text, alt: p.alt, pair: p.pair, before: p.before, after: p.after, image: p.image };
};

const vuosi = (p: ProjectItem): string | undefined => p.caption.match(/(20\d\d)\s*$/)?.[1];

export interface ReferenssiNakyma extends ReferenssiKohde {
  cityName: string;
  year?: string;
  /** Liukusäädin tai ennen–jälkeen-pari: näytetään ensin ja isompana. */
  ennenJalkeen: boolean;
}

export const cityLabel = (slug: string): string =>
  slug === "pirkanmaa" ? "Pirkanmaa" : slug === "muu" ? "Pirkanmaan ulkopuolella" : (getCityBySlug(slug)?.name ?? slug);

/** Kaikki referenssikohteet: ennen–jälkeen-parit ensin, sitten muut, kaupunkisivujen kohteet mukana. */
export const referenssit: ReferenssiNakyma[] = [
  ...projectItems.map((p) => ({ ...projektista(p), year: vuosi(p) })),
  ...lisakohteet,
]
  .map((k) => ({ ...k, cityName: cityLabel(k.city), ennenJalkeen: Boolean(k.pair || (k.before && k.after)) }))
  .sort((a, b) => Number(b.ennenJalkeen) - Number(a.ennenJalkeen));

export const referenssiKunnat = (): { slug: string; name: string }[] => {
  const seen = new Map<string, string>();
  for (const k of referenssit) if (!seen.has(k.city)) seen.set(k.city, k.cityName);
  return [...seen.entries()].map(([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name, "fi"));
};
