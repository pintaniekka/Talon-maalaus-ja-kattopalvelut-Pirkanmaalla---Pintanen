/**
 * Omat kohteet paikkakunnittain. Näytetään kaupunki- ja aluesivujen kohdelohkossa (CityProjects).
 * Vain oikeita kohteita: paikkakunta, työ ja vuosi tulevat Eerikiltä, kuvat kansiosta ~/GitHub/uudet-kuvat.
 */
export type ProjectService = "pinnoitus" | "maalaus";

export interface ProjectItem {
  /** cityData-slug, jonka sivuilla kohde näytetään. */
  city: string;
  services: ProjectService[];
  caption: string;
  alt: string;
  /** Yksittäinen kuva (perusnimi kansiossa public/images/Pictures-*). */
  image?: string;
  /** Ennen–jälkeen-pari: perusnimi ilman loppuosaa -ennen / -jalkeen. */
  pair?: string;
}

export const projectItems: ProjectItem[] = [
  // Tampere
  {
    city: "tampere",
    services: ["pinnoitus"],
    pair: "tiilikaton-pinnoitus-tampere-tiilitalo",
    caption: "Tiilikaton pinnoitus, Tampere 2026",
    alt: "Tiilikatto Tampereella ennen ja jälkeen pinnoituksen",
  },
  {
    city: "tampere",
    services: ["pinnoitus"],
    image: "aurinkopaneelit-suojattu-tiilikaton-pinnoitus-tampere",
    caption: "Aurinkopaneelit suojattuna pinnoituksen ajaksi, Tampere 2026",
    alt: "Aurinkopaneelit suojattuna tiilikaton pinnoituksen ajaksi Tampereella",
  },
  {
    city: "tampere",
    services: ["pinnoitus"],
    image: "tiilikaton-pesu-kesken-tampere",
    caption: "Tiilikaton pesu käynnissä, Tampere 2026",
    alt: "Tiilikaton pesu käynnissä Tampereella, puolet katosta pesty",
  },
  {
    city: "tampere",
    services: ["pinnoitus"],
    image: "harmaa-tiilikatto-ennen-pinnoitusta-tampere",
    caption: "Tiilikatto ennen pinnoitusta, Tampere 2026",
    alt: "Harmaa tiilikatto ennen pinnoitusta Tampereella",
  },
  {
    city: "tampere",
    services: ["pinnoitus"],
    image: "tummanharmaa-tiilikatto-pinnoituksen-jalkeen-tampere",
    caption: "Sama katto pinnoituksen jälkeen, Tampere 2026",
    alt: "Tummanharmaa tiilikatto pinnoituksen jälkeen Tampereella",
  },
  {
    city: "tampere",
    services: ["pinnoitus", "maalaus"],
    image: "puutalon-katon-ja-seinien-maalaus-tampere",
    caption: "Katon ja seinien maalaus samaan taloon, Tampere 2026",
    alt: "Puutalo Tampereella katon ja seinien maalauksen jälkeen",
  },
  {
    city: "tampere",
    services: ["maalaus"],
    image: "puutalon-seinien-maalaus-kaynnissa-tampere",
    caption: "Talon maalaus käynnissä, Tampere 2026",
    alt: "Puutalon maalaus käynnissä Tampereella",
  },
  {
    city: "tampere",
    services: ["pinnoitus"],
    image: "eerik-tiilikatolla-tampere",
    caption: "Eerik katolla, Tampere 2026",
    alt: "Eerik Pitkänen tiilikatolla Tampereella",
  },
  // Ylöjärvi
  {
    city: "ylojarvi",
    services: ["pinnoitus"],
    pair: "tiilikaton-pinnoitus-ylojarvi-punainen-katto",
    caption: "Tiilikaton pinnoitus, Ylöjärvi 2026",
    alt: "Punainen tiilikatto Ylöjärvellä ennen ja jälkeen pinnoituksen",
  },
  {
    city: "ylojarvi",
    services: ["pinnoitus"],
    image: "tiilikatto-puoliksi-pesty-ylojarvi",
    caption: "Työ kesken: vasen puoli on vielä käsittelemättä, Ylöjärvi 2026",
    alt: "Tiilikatto puoliksi pestynä Ylöjärvellä",
  },
  {
    city: "ylojarvi",
    services: ["pinnoitus"],
    image: "musta-tiilikatto-pinnoituksen-jalkeen-ylojarvi",
    caption: "Musta tiilikatto pinnoituksen jälkeen, Ylöjärvi 2026",
    alt: "Musta tiilikatto pinnoituksen jälkeen Ylöjärvellä",
  },
  {
    city: "ylojarvi",
    services: ["pinnoitus"],
    image: "ruskea-tiilikatto-pinnoituksen-jalkeen-ylojarvi",
    caption: "Ruskea tiilikatto pinnoituksen jälkeen, Ylöjärvi 2026",
    alt: "Ruskea tiilikatto pinnoituksen jälkeen Ylöjärvellä",
  },
  {
    city: "ylojarvi",
    services: ["pinnoitus"],
    image: "punainen-tiilikatto-pinnoituksen-jalkeen-ylojarvi",
    caption: "Punainen tiilikatto pinnoituksen jälkeen, Ylöjärvi 2026",
    alt: "Punainen tiilikatto pinnoituksen jälkeen Ylöjärvellä",
  },
  {
    city: "ylojarvi",
    services: ["pinnoitus"],
    image: "keltainen-talo-pinnoitettu-tiilikatto-ylojarvi",
    caption: "Pinnoitettu tiilikatto, Ylöjärvi 2026",
    alt: "Keltainen omakotitalo ja pinnoitettu punainen tiilikatto Ylöjärvellä",
  },
  // Nokia
  {
    city: "nokia",
    services: ["pinnoitus"],
    image: "tummanharmaa-tiilikatto-pinnoituksen-jalkeen-nokia",
    caption: "Tummanharmaa tiilikatto pinnoituksen jälkeen, Nokia 2026",
    alt: "Tummanharmaa tiilikatto pinnoituksen jälkeen Nokialla",
  },
  {
    city: "nokia",
    services: ["pinnoitus"],
    image: "tummanharmaa-pinnoitettu-tiilikatto-lahikuva-nokia",
    caption: "Pinnoitettu pinta läheltä, Nokia 2026",
    alt: "Tummanharmaa pinnoitettu tiilikatto läheltä Nokialla",
  },
  // Hämeenkyrö
  {
    city: "hameenkyro",
    services: ["pinnoitus"],
    image: "tummanharmaa-tiilikatto-pinnoituksen-jalkeen-kyroskoski",
    caption: "Tiilikatto pinnoituksen jälkeen, Kyröskoski 2026",
    alt: "Tummanharmaa tiilikatto pinnoituksen jälkeen Kyröskoskella Hämeenkyrössä",
  },
  // Kangasala
  {
    city: "kangasala",
    services: ["pinnoitus"],
    image: "keltainen-talo-pinnoitettu-tiilikatto-kangasala",
    caption: "Pinnoitettu tiilikatto, Kangasala 2026",
    alt: "Keltainen talo ja pinnoitettu punainen tiilikatto Kangasalla",
  },
  {
    city: "kangasala",
    services: ["pinnoitus"],
    image: "vaalea-talo-pinnoitettu-tiilikatto-kangasala",
    caption: "Pinnoitettu tiilikatto, Kangasala 2026",
    alt: "Vaalea omakotitalo ja pinnoitettu tiilikatto Kangasalla",
  },
  {
    city: "kangasala",
    services: ["pinnoitus"],
    image: "sammaleinen-tiilikatto-ennen-pinnoitusta-kangasala",
    caption: "Tiilikatto ennen pinnoitusta, Kangasala 2026",
    alt: "Sammaleinen tiilikatto ennen pinnoitusta Kangasalla",
  },
  {
    city: "kangasala",
    services: ["pinnoitus"],
    image: "harjatiivisteen-asennus-tiilikatto-kangasala",
    caption: "Harjatiivisteen asennus, Kangasala 2026",
    alt: "Harjatiivisteen asennus tiilikattoon Kangasalla",
  },
  // Orivesi
  {
    city: "orivesi",
    services: ["pinnoitus"],
    image: "tiilikatto-puoliksi-pesty-orivesi",
    caption: "Työ kesken: vasen puoli on vielä käsittelemättä, Orivesi 2026",
    alt: "Tiilikatto puoliksi pestynä Orivedellä",
  },
  {
    city: "orivesi",
    services: ["pinnoitus"],
    image: "punainen-tiilikatto-pinnoituksen-jalkeen-orivesi",
    caption: "Punainen tiilikatto pinnoituksen jälkeen, Orivesi 2026",
    alt: "Punainen tiilikatto pinnoituksen jälkeen Orivedellä",
  },
  {
    city: "orivesi",
    services: ["pinnoitus"],
    image: "punainen-pinnoitettu-tiilikatto-orivesi",
    caption: "Pinnoitettu tiilikatto, Orivesi 2026",
    alt: "Punainen pinnoitettu tiilikatto Orivedellä",
  },
  // Parkano
  {
    city: "parkano",
    services: ["maalaus"],
    pair: "talon-maalaus-parkano-keltainen-puutalo",
    caption: "Talon maalaus, Parkano 2026",
    alt: "Keltainen puutalo Parkanossa ennen ja jälkeen maalauksen",
  },
  {
    city: "parkano",
    services: ["maalaus"],
    image: "hilseileva-puutalo-ennen-maalausta-parkano",
    caption: "Hilseilevä seinä ennen maalausta, Parkano 2026",
    alt: "Hilseilevä puutalon seinä ennen maalausta Parkanossa",
  },
  {
    city: "parkano",
    services: ["maalaus"],
    image: "keltainen-puutalo-maalauksen-jalkeen-parkano",
    caption: "Sama talo maalauksen jälkeen, Parkano 2026",
    alt: "Keltainen puutalo maalauksen jälkeen Parkanossa",
  },
];

const matches = (item: ProjectItem, service?: ProjectService) => !service || item.services.includes(service);

export const getProjectItems = (city: string, service?: ProjectService): ProjectItem[] =>
  projectItems.filter((item) => item.city === city && matches(item, service));

/** Lähimmät paikkakunnat, joilta on kohteita. Käytetään täytteen järjestämiseen. */
const nearbyCities: Record<string, string[]> = {
  tampere: ["ylojarvi", "nokia", "kangasala"],
  ylojarvi: ["tampere", "nokia", "hameenkyro"],
  nokia: ["tampere", "ylojarvi", "hameenkyro"],
  hameenkyro: ["ylojarvi", "nokia", "tampere"],
  kangasala: ["tampere", "orivesi"],
  orivesi: ["kangasala", "tampere"],
  parkano: ["hameenkyro", "ylojarvi"],
};

export const MIN_PROJECT_ITEMS = 3;

/**
 * Paikkakunnan omat kohteet ja, jos niitä on alle kolme, täytteeksi kohteita muualta Pirkanmaalta
 * (lähimmät ensin). Yhden kortin "luettelo" näyttää tyhjältä. Jos omia kohteita ei ole, lohkoa ei näytetä.
 */
export const getProjectItemsWithNearby = (
  city: string,
  service?: ProjectService,
): { items: ProjectItem[]; hasNearby: boolean } => {
  const own = getProjectItems(city, service);
  if (own.length === 0 || own.length >= MIN_PROJECT_ITEMS) return { items: own, hasNearby: false };

  const order = nearbyCities[city] ?? [];
  const rank = (item: ProjectItem) => {
    const i = order.indexOf(item.city);
    return i === -1 ? order.length : i;
  };
  const others = projectItems
    .filter((item) => item.city !== city && matches(item, service))
    .sort((a, b) => rank(a) - rank(b) || Number(Boolean(b.pair)) - Number(Boolean(a.pair)));
  const fill = others.slice(0, MIN_PROJECT_ITEMS - own.length);
  return { items: [...own, ...fill], hasNearby: fill.length > 0 };
};

/** Nostot hintasivuille: ennen–jälkeen-parit ensin, sitten yksittäiset kuvat eri paikkakunnilta. */
export const getFeaturedProjectItems = (service: ProjectService, count = 3): ProjectItem[] => {
  const all = projectItems.filter((item) => matches(item, service));
  const picked: ProjectItem[] = [];
  for (const item of [...all.filter((i) => i.pair), ...all.filter((i) => !i.pair)]) {
    if (picked.length >= count) break;
    if (picked.some((p) => p.city === item.city && !item.pair)) continue;
    picked.push(item);
  }
  return picked;
};

/**
 * Paikkakunnan oma kohdekuva heroon (korjaus 1: kaupunkisivun hero näyttää paikkakunnan oman kohteen,
 * jos sellainen on). Ennen–jälkeen-parista käytetään jälkeen-kuvaa. Palauttaa undefined, jos kuvaa ei ole.
 */
export const getCityHeroBase = (city: string, service?: ProjectService): string | undefined => {
  const own = getProjectItems(city, service);
  const preferred = own.find((i) => i.pair) ?? own.find((i) => i.image && !/ennen|kesken|puoliksi|suojattu/.test(i.image)) ?? own[0];
  if (!preferred) return undefined;
  return preferred.pair ? `${preferred.pair}-jalkeen` : preferred.image;
};
