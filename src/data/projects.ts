/**
 * Omat kohteet paikkakunnittain. Näytetään kaupunki- ja aluesivujen kohdelohkossa (CityProjects).
 * Vain oikeita kohteita: paikkakunta, työ ja vuosi tulevat Eerikiltä, kuvat kansiosta ~/GitHub/uudet-kuvat.
 */
import { reviewCaseImages } from "./reviewCases";

export type ProjectService = "pinnoitus" | "maalaus";

export interface ProjectItem {
  /** cityData-slug, jonka sivuilla kohde näytetään. */
  city: string;
  services: ProjectService[];
  caption: string;
  alt: string;
  /** Yksittäinen kuva (perusnimi kansiossa public/images/Pictures-*). */
  image?: string;
  /** Ennen–jälkeen-pari liukusäätimellä: perusnimi ilman loppuosaa -ennen / -jalkeen (kuvat samasta kohdasta). */
  pair?: string;
  /** Ennen- ja jälkeen-kuvat vierekkäin, kun kuvakulma ei ole sama. */
  before?: string;
  after?: string;
  /** Tekijän lyhyt kertomus kohteesta referenssisivulle (Eemilin kommentit 27.10.2026). */
  kertomus?: string;
}

export const projectItems: ProjectItem[] = [
  // Tampere
  {
    city: "tampere",
    services: ["pinnoitus", "maalaus"],
    pair: "tiilikaton-pinnoitus-tampere-tiilitalo",
    caption: "Katto pinnoitettiin ja seinät maalattiin, Tampere 2026",
    alt: "Tiilitalo Tampereella ennen ja jälkeen katon pinnoituksen ja seinien maalauksen",
  },
  {
    city: "tampere",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-tampere-aurinkopaneelit-suojattu",
    caption: "Aurinkopaneelit suojattuna pinnoituksen ajaksi, Tampere 2026",
    alt: "Aurinkopaneelit suojattuna tiilikaton pinnoituksen ajaksi Tampereella",
  },
  {
    city: "tampere",
    services: ["pinnoitus"],
    image: "tiilikaton-pesu-ja-pinnoitus-tampere-pesu-kesken",
    caption: "Tiilikaton pesu käynnissä, Tampere 2026",
    alt: "Tiilikaton pesu käynnissä Tampereella, puolet katosta pesty",
  },
  {
    city: "tampere",
    services: ["pinnoitus", "maalaus"],
    image: "talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen",
    caption: "Katto pinnoitettiin ja seinät maalattiin, Tampere 2026",
    alt: "Puutalo Tampereella katon ja seinien maalauksen jälkeen",
  },
  {
    city: "tampere",
    services: ["maalaus"],
    image: "talon-maalaus-tampere-puutalon-seinien-maalaus-kaynnissa",
    caption: "Talon maalaus käynnissä, Tampere 2026",
    alt: "Puutalon maalaus käynnissä Tampereella",
  },
  {
    city: "tampere",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-tampere-eerik-pitkanen-katolla",
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
    image: "tiilikaton-pesu-ja-pinnoitus-ylojarvi-puoliksi-pesty",
    caption: "Pesu kesken: oikea puoli pesty, vasen vielä pesemättä, Ylöjärvi 2026",
    alt: "Tiilikatto puoliksi pestynä Ylöjärvellä",
  },
  {
    city: "ylojarvi",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-ylojarvi-musta-tiilikatto-jalkeen",
    caption: "Musta tiilikatto pinnoituksen jälkeen, Ylöjärvi 2026",
    alt: "Musta tiilikatto pinnoituksen jälkeen Ylöjärvellä",
  },
  {
    city: "ylojarvi",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-ylojarvi-ruskea-tiilikatto-jalkeen",
    caption: "Ruskea tiilikatto pinnoituksen jälkeen, Ylöjärvi 2026",
    alt: "Ruskea tiilikatto pinnoituksen jälkeen Ylöjärvellä",
  },
  {
    city: "ylojarvi",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-ylojarvi-punainen-tiilikatto-jalkeen",
    caption: "Punainen tiilikatto pinnoituksen jälkeen, Ylöjärvi 2026",
    alt: "Punainen tiilikatto pinnoituksen jälkeen Ylöjärvellä",
  },
  {
    city: "ylojarvi",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-ylojarvi-keltainen-talo-jalkeen",
    caption: "Pinnoitettu tiilikatto, Ylöjärvi 2026",
    alt: "Keltainen omakotitalo ja pinnoitettu punainen tiilikatto Ylöjärvellä",
  },
  // Nokia
  {
    city: "nokia",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-nokia-tummanharmaa-tiilikatto-jalkeen",
    caption: "Tummanharmaa tiilikatto pinnoituksen jälkeen, Nokia 2026",
    alt: "Tummanharmaa tiilikatto pinnoituksen jälkeen Nokialla",
  },
  {
    city: "nokia",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-nokia-tummanharmaa-tiilikatto-lahikuva",
    caption: "Pinnoitettu pinta läheltä, Nokia 2026",
    alt: "Tummanharmaa pinnoitettu tiilikatto läheltä Nokialla",
  },
  // Hämeenkyrö
  {
    city: "hameenkyro",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-hameenkyro-kyroskoski-tummanharmaa-tiilikatto-jalkeen",
    caption: "Tiilikatto pinnoituksen jälkeen, Kyröskoski 2026",
    alt: "Tummanharmaa tiilikatto pinnoituksen jälkeen Kyröskoskella Hämeenkyrössä",
  },
  // Kangasala
  {
    city: "kangasala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-kangasala-keltainen-talo-jalkeen",
    caption: "Pinnoitettu tiilikatto, Kangasala 2026",
    alt: "Keltainen talo ja pinnoitettu punainen tiilikatto Kangasalla",
  },
  {
    city: "kangasala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-kangasala-vaalea-talo-jalkeen",
    caption: "Pinnoitettu tiilikatto, Kangasala 2026",
    alt: "Vaalea omakotitalo ja pinnoitettu tiilikatto Kangasalla",
  },
  {
    city: "kangasala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-kangasala-sammaleinen-tiilikatto-ennen",
    caption: "Tiilikatto ennen pinnoitusta, Kangasala 2026",
    alt: "Sammaleinen tiilikatto ennen pinnoitusta Kangasalla",
  },
  {
    city: "kangasala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-kangasala-harjatiivisteen-asennus",
    caption: "Harjatiivisteen asennus, Kangasala 2026",
    alt: "Harjatiivisteen asennus tiilikattoon Kangasalla",
  },
  // Orivesi
  {
    city: "orivesi",
    services: ["pinnoitus"],
    image: "tiilikaton-pesu-ja-pinnoitus-orivesi-puoliksi-pesty",
    caption: "Pesu kesken: oikea puoli pesty, vasen vielä pesemättä, Orivesi 2026",
    alt: "Tiilikatto puoliksi pestynä Orivedellä",
  },
  {
    city: "orivesi",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-orivesi-punainen-tiilikatto-jalkeen",
    caption: "Punainen tiilikatto pinnoituksen jälkeen, Orivesi 2026",
    alt: "Punainen tiilikatto pinnoituksen jälkeen Orivedellä",
  },
  {
    city: "orivesi",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-orivesi-punainen-tiilikatto-pinnoitettu",
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
    image: "talon-maalaus-parkano-hilseileva-puutalo-ennen",
    caption: "Hilseilevä seinä ennen maalausta, Parkano 2026",
    alt: "Hilseilevä puutalon seinä ennen maalausta Parkanossa",
  },
  {
    city: "parkano",
    services: ["maalaus"],
    image: "talon-maalaus-parkano-keltainen-puutalo-maalauksen-jalkeen",
    caption: "Keltainen puutalo maalauksen jälkeen, Parkano 2026",
    alt: "Keltainen puutalo maalauksen jälkeen Parkanossa",
  },
  // Lokakuussa 2026 lisätyt kohteet (vuotta ei kuvateksteissä, koska sitä ei ole vahvistettu)
  {
    city: "nokia",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-nokia-ruskea-tiilikatto-jalkeen",
    caption: "Ruskea tiilikatto pinnoituksen jälkeen, Nokia",
    alt: "Ruskea tiilikatto pinnoituksen jälkeen Nokialla",
  },
  {
    city: "pirkkala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-pirkkala-punainen-tiilikatto-jalkeen",
    caption: "Punainen tiilikatto pinnoituksen jälkeen, Pirkkala",
    alt: "Punainen tiilikatto pinnoituksen jälkeen Pirkkalassa",
  },
  {
    city: "pirkkala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-pirkkala-tummanharmaa-tiilikatto-jalkeen",
    caption: "Tummanharmaa tiilikatto pinnoituksen jälkeen, Pirkkala",
    alt: "Tummanharmaa tiilikatto pinnoituksen jälkeen Pirkkalassa",
  },
  {
    city: "pirkkala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-pirkkala-punainen-tiilikatto-harja",
    caption: "Pinnoitettu harja ja tiilet läheltä, Pirkkala",
    alt: "Pinnoitettu punainen tiilikatto ja harja läheltä Pirkkalassa",
  },
  {
    city: "sastamala",
    services: ["pinnoitus"],
    before: "tiilikaton-pinnoitus-sastamala-aurinkopaneelit-ennen",
    after: "tiilikaton-pinnoitus-sastamala-aurinkopaneelit-jalkeen",
    caption: "Tiilikatto ja aurinkopaneelit ennen ja jälkeen pinnoituksen, Sastamala",
    alt: "Tiilikatto ja aurinkopaneelit Sastamalassa ennen ja jälkeen pinnoituksen",
  },
  {
    city: "sastamala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-sastamala-punainen-tiilikatto-jalkeen",
    caption: "Punainen tiilikatto pinnoituksen jälkeen, Sastamala",
    alt: "Punainen tiilikatto pinnoituksen jälkeen Sastamalassa",
  },
  {
    city: "sastamala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-sastamala-sammaleinen-tiilikatto-ennen",
    caption: "Sammaleinen tiilikatto ennen pinnoitusta, Sastamala",
    alt: "Sammaleinen tiilikatto ennen pinnoitusta Sastamalassa",
  },
  {
    city: "valkeakoski",
    services: ["pinnoitus"],
    pair: "tiilikaton-pinnoitus-valkeakoski-harmaa-katto",
    caption: "Tiilikaton pinnoitus, Valkeakoski",
    alt: "Tiilikatto Valkeakoskella ennen ja jälkeen pinnoituksen",
  },
  {
    city: "valkeakoski",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-valkeakoski-punainen-tiilikatto-aurinkopaneelit-jalkeen",
    caption: "Pinnoitettu tiilikatto ja aurinkopaneelit, Valkeakoski",
    alt: "Pinnoitettu punainen tiilikatto ja aurinkopaneelit Valkeakoskella",
  },
  {
    city: "valkeakoski",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-valkeakoski-aurinkopaneelit-ennen",
    caption: "Tiilikatto ja aurinkopaneelit ennen pinnoitusta, Valkeakoski",
    alt: "Sammaleinen tiilikatto ja aurinkopaneelit ennen pinnoitusta Valkeakoskella",
  },
  {
    city: "valkeakoski",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-valkeakoski-pinnoitettu-tiilikatto-lahikuva",
    caption: "Pinnoitettu pinta läheltä, Valkeakoski",
    alt: "Pinnoitettu tiilikatto läheltä Valkeakoskella",
  },
  {
    city: "valkeakoski",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-valkeakoski-punainen-tiilikatto-jalkeen",
    caption: "Punainen tiilikatto pinnoituksen jälkeen, Valkeakoski",
    alt: "Punainen tiilikatto pinnoituksen jälkeen Valkeakoskella",
  },
  {
    city: "lempaala",
    services: ["pinnoitus"],
    before: "tiilikaton-pinnoitus-lempaala-harmaa-tiilikatto-ennen",
    after: "tiilikaton-pinnoitus-lempaala-tummanharmaa-tiilikatto-jalkeen",
    caption: "Harmaa tiilikatto ennen ja jälkeen pinnoituksen, Lempäälä",
    alt: "Harmaa tiilikatto Lempäälässä ennen ja jälkeen pinnoituksen",
  },
  {
    city: "lempaala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-lempaala-punainen-tiilikatto-pinnoitettu",
    caption: "Pinnoitettu tiilikatto, Lempäälä",
    alt: "Pinnoitettu punainen tiilikatto Lempäälässä",
  },
  {
    city: "palkane",
    services: ["pinnoitus"],
    pair: "tiilikaton-pinnoitus-palkane-harmaa-katto",
    caption: "Tiilikaton pinnoitus, Pälkäne",
    alt: "Tiilikatto Pälkäneellä ennen ja jälkeen pinnoituksen",
  },
  {
    city: "palkane",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-palkane-punainen-tiilikatto-jalkeen",
    caption: "Punainen tiilikatto pinnoituksen jälkeen, Pälkäne",
    alt: "Punainen tiilikatto pinnoituksen jälkeen Pälkäneellä",
  },
  {
    city: "palkane",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-palkane-tummanharmaa-tiilikatto-jalkeen",
    caption: "Tummanharmaa tiilikatto pinnoituksen jälkeen, Pälkäne",
    alt: "Tummanharmaa tiilikatto pinnoituksen jälkeen Pälkäneellä",
  },
  {
    city: "urjala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-urjala-tummanharmaa-tiilikatto-jalkeen",
    caption: "Tummanharmaa tiilikatto pinnoituksen jälkeen, Urjala",
    alt: "Tummanharmaa tiilikatto pinnoituksen jälkeen Urjalassa",
  },
  {
    city: "urjala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-urjala-musta-tiilikatto-jalkeen",
    caption: "Musta tiilikatto pinnoituksen jälkeen, Urjala",
    alt: "Musta tiilikatto pinnoituksen jälkeen Urjalassa",
  },
  {
    city: "urjala",
    services: ["pinnoitus"],
    image: "tiilikaton-pinnoitus-urjala-punainen-tiilikatto-lahikuva",
    caption: "Pinnoitettu pinta läheltä, Urjala",
    alt: "Pinnoitettu punainen tiilikatto läheltä Urjalassa",
  },
  // Eemilin kohteet 1–9 (sähköpostit myynti@pintanen.fi 27.10.2026, lisätty 28.10.2026). Kertomukset ovat Eemilin
  // kommentteja lyhennettyinä. Arvostelun antaneiden asiakkaiden kohteet ovat reviewCases.ts:ssä; tässä ovat muut kuvat.
  // Vuotta ei kuvateksteissä (sama käytäntö kuin lokakuun 2026 lisäyksissä).
  // 1: Orivesi, Hirsilä, rintamamiestalo (arvostelu: Satu Junkkila)
  {
    city: "orivesi",
    services: ["maalaus"],
    pair: "talon-maalaus-orivesi-rintamamiestalo-sivuseina",
    caption: "Rintamamiestalon sivuseinä ennen ja jälkeen maalauksen, Orivesi",
    alt: "Rintamamiestalon sivuseinä Orivedellä ennen ja jälkeen maalauksen",
    kertomus: "Seinät pestiin perusteellisesti homepesuaineella, hilseilevä maali kaavittiin ja paljaat puupinnat pohjamaalattiin ennen pintamaalia.",
  },
  {
    city: "orivesi",
    services: ["maalaus"],
    image: "talon-maalaus-orivesi-rintamamiestalo-kuisti-jalkeen",
    caption: "Rintamamiestalo ja kuisti maalauksen jälkeen, Orivesi",
    alt: "Vaalea rintamamiestalo ja kuisti maalauksen jälkeen Orivedellä",
  },
  {
    city: "orivesi",
    services: ["maalaus"],
    image: "talon-maalaus-orivesi-homepesu-ja-suojaus-kaynnissa",
    caption: "Homepesu käynnissä, sokkeli suojattuna, Orivesi",
    alt: "Puutalon seinän homepesu käynnissä Orivedellä, sokkeli suojattu muovilla",
  },
  // 3: Orivesi, hirsimökki (arvostelu: Päivi Tuominen)
  {
    city: "orivesi",
    services: ["maalaus"],
    pair: "talon-maalaus-orivesi-hirsimokki-paaty",
    caption: "Hirsimökin pääty ennen ja jälkeen maalauksen, Orivesi",
    alt: "Hirsimökin pääty Orivedellä ennen ja jälkeen maalauksen",
    kertomus: "Mökistä maalattiin kaikki: seinät, kaiteet, ikkunanpuitteet ja ovet. Tummat listat maalattiin tarkasti niin, ettei maalia päässyt hirrelle.",
  },
  {
    city: "orivesi",
    services: ["maalaus"],
    before: "talon-maalaus-orivesi-hirsimokki-ikkuna-ennen",
    after: "talon-maalaus-orivesi-hirsimokki-ikkuna-jalkeen",
    caption: "Hirsimökin ikkuna ja puitteet ennen ja jälkeen maalauksen, Orivesi",
    alt: "Hirsimökin ikkuna Orivedellä ennen ja jälkeen puitteiden maalauksen",
  },
  {
    city: "orivesi",
    services: ["maalaus"],
    image: "talon-maalaus-orivesi-hirsimokki-kaide-ja-terassi-jalkeen",
    caption: "Hirsimökin kaide ja terassi maalauksen jälkeen, Orivesi",
    alt: "Hirsimökin maalattu kaide ja öljytty terassi Orivedellä",
  },
  // 2: Nokia, vaaleansininen omakotitalo (arvostelu: Lotta Härkönen)
  {
    city: "nokia",
    services: ["maalaus"],
    pair: "talon-maalaus-nokia-vaaleansininen-talo-paaty",
    caption: "Vaaleansinisen talon pääty ennen ja jälkeen huoltomaalauksen, Nokia",
    alt: "Vaaleansinisen puutalon pääty Nokialla ennen ja jälkeen huoltomaalauksen",
    kertomus: "Seinät pestiin ja huoltomaalattiin samalla värillä.",
  },
  {
    city: "nokia",
    services: ["maalaus"],
    image: "talon-maalaus-nokia-vaaleansininen-talo-sivuseina-jalkeen",
    caption: "Vaaleansininen puutalo huoltomaalauksen jälkeen, Nokia",
    alt: "Vaaleansininen puutalo Nokialla huoltomaalauksen jälkeen",
  },
  {
    city: "nokia",
    services: ["maalaus"],
    image: "talon-maalaus-nokia-vaaleansininen-talo-kuisti-jalkeen",
    caption: "Kuisti ja ovi maalauksen jälkeen, Nokia",
    alt: "Vaaleansinisen puutalon kuisti ja valkoinen ovi maalauksen jälkeen Nokialla",
  },
  // 4: Akaa, keltainen omakotitalo (arvostelu: Ari Reunanen)
  {
    city: "akaa",
    services: ["maalaus"],
    pair: "talon-maalaus-akaa-keltainen-omakotitalo-paaty",
    caption: "Keltaisen talon pääty ennen ja jälkeen huoltomaalauksen, Akaa",
    alt: "Keltaisen omakotitalon pääty Akaassa ennen ja jälkeen huoltomaalauksen",
    kertomus: "Uusi keltainen oli hieman vanhaa tummempi, joten pensselinjäljet viimeisteltiin tarkasti. Lopputulos oli erittäin hyvä.",
  },
  {
    city: "akaa",
    services: ["maalaus"],
    before: "talon-maalaus-akaa-keltainen-omakotitalo-terassi-ennen",
    after: "talon-maalaus-akaa-keltainen-omakotitalo-terassi-jalkeen",
    caption: "Terassi ja seinä ennen ja jälkeen maalauksen, Akaa",
    alt: "Keltaisen omakotitalon terassi Akaassa ennen ja jälkeen maalauksen",
  },
  {
    city: "akaa",
    services: ["maalaus"],
    image: "talon-maalaus-akaa-keltainen-omakotitalo-sivuseina-jalkeen",
    caption: "Keltainen omakotitalo huoltomaalauksen jälkeen, Akaa",
    alt: "Keltainen omakotitalo Akaassa huoltomaalauksen jälkeen",
  },
  // 5: Tampere, hilseilevä pääty (arvostelu: Jukka Loukkola)
  {
    city: "tampere",
    services: ["maalaus"],
    pair: "talon-maalaus-tampere-hilseileva-ulkoverhous-lahikuva",
    caption: "Hilseilevä ulkoverhous ennen ja jälkeen maalauksen, Tampere",
    alt: "Hilseilevä ulkoverhous Tampereella ennen kaavintaa ja maalauksen jälkeen",
  },
  // 6: Ylöjärvi, vaalea puurakennus (yritysasiakas)
  {
    city: "ylojarvi",
    services: ["maalaus"],
    pair: "talon-maalaus-ylojarvi-vaalea-puurakennus-paaty",
    caption: "Puurakennuksen pääty ennen ja jälkeen maalauksen, Ylöjärvi",
    alt: "Vaalean puurakennuksen pääty Ylöjärvellä ennen ja jälkeen maalauksen",
    kertomus: "Pesu, hilseilevän maalin kaavinta, pohjamaalaus ja pintamaalaus. Työmaalla oli samaan aikaan muitakin urakoitsijoita, ja työ sovitettiin heidän kanssaan.",
  },
  // 7: Virrat, hirsimökki
  {
    city: "virrat",
    services: ["maalaus"],
    pair: "talon-maalaus-virrat-hirsimokki-paaty",
    caption: "Hirsimökin pääty ennen ja jälkeen maalauksen, Virrat",
    alt: "Hirsimökin pääty Virroilla ennen ja jälkeen maalauksen",
    kertomus: "Hirsimökki maalattiin Virtasen 4 öljyn maalilla. Tuulisesta säästä ja ampiaisista huolimatta työ tehtiin loppuun suunnitellusti.",
  },
  {
    city: "virrat",
    services: ["maalaus"],
    before: "talon-maalaus-virrat-hirsimokki-terassi-ennen",
    after: "talon-maalaus-virrat-hirsimokki-terassi-jalkeen",
    caption: "Hirsimökin terassi ja kuisti ennen ja jälkeen maalauksen, Virrat",
    alt: "Hirsimökin terassi ja kuisti Virroilla ennen ja jälkeen maalauksen",
  },
  {
    city: "virrat",
    services: ["maalaus"],
    pair: "talon-maalaus-virrat-hirsimokki-ikkuna",
    caption: "Ikkunan puitteet ennen ja jälkeen maalauksen, Virrat",
    alt: "Hirsimökin ikkunan puitteet Virroilla ennen ja jälkeen maalauksen",
  },
  {
    city: "virrat",
    services: ["maalaus"],
    before: "talon-maalaus-virrat-hirsimokki-raystas-ennen",
    after: "talon-maalaus-virrat-hirsimokki-raystas-jalkeen",
    caption: "Räystään alapinta ennen ja jälkeen maalauksen, Virrat",
    alt: "Hirsimökin räystään alapinta Virroilla ennen ja jälkeen maalauksen",
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
  pirkkala: ["tampere", "nokia", "lempaala"],
  sastamala: ["nokia", "hameenkyro", "urjala"],
  valkeakoski: ["lempaala", "palkane", "kangasala"],
  lempaala: ["tampere", "pirkkala", "valkeakoski"],
  palkane: ["kangasala", "valkeakoski"],
  urjala: ["sastamala", "valkeakoski", "lempaala"],
};

export const MIN_PROJECT_ITEMS = 3;

/**
 * Paikkakunnan omat kohteet ja, jos niitä on alle kolme, täytteeksi kohteita muualta Pirkanmaalta
 * (lähimmät ensin). Yhden kortin "luettelo" näyttää tyhjältä. Jos omia kohteita ei ole lainkaan, näytetään
 * kolme kohdetta muualta Pirkanmaalta ja otsikko kertoo sen (Eerik 14.10.2026: sivu ilman kuvia ei käy).
 */
export const getProjectItemsWithNearby = (
  city: string,
  service?: ProjectService,
  exclude: Set<string> = new Set(),
): { items: ProjectItem[]; hasNearby: boolean; hasOwn: boolean } => {
  const all = getProjectItems(city, service).filter(
    (item) => ![item.image, item.before, item.after].some((x) => x && exclude.has(x)),
  );
  // Sivun hero näyttää jo paikkakunnan oman kuvan: sitä ei toisteta heti alla kohdelohkossa,
  // jos muita omia kuvia on tarpeeksi.
  const hero = getCityHeroBase(city, service);
  const withoutHero = all.filter((item) => item.image !== hero);
  // Jos ainoa oma kuva on jo herossa ja paikkakunnalla on arvostelukortti kuvineen, ruudukko jää pois.
  const own = withoutHero.length > 0 ? withoutHero : exclude.size > 0 ? [] : all;
  if (own.length >= MIN_PROJECT_ITEMS) return { items: own, hasNearby: false, hasOwn: true };

  const order = nearbyCities[city] ?? [];
  const rank = (item: ProjectItem) => {
    const i = order.indexOf(item.city);
    return i === -1 ? order.length : i;
  };
  // Muiden kuntien sivuille ei täytetä Tampereen kohteita: kuvateksti "Tampere 2026" toistaisi sanan
  // leipätekstissä (Eerik 27.10.2026: Tampere enintään kerran muiden kuntien sivuilla).
  const others = projectItems
    .filter((item) => item.city !== city && matches(item, service) && (city === "tampere" || item.city !== "tampere"))
    .sort((a, b) => rank(a) - rank(b) || Number(Boolean(b.pair)) - Number(Boolean(a.pair)));
  const fill = others.slice(0, MIN_PROJECT_ITEMS - own.length);
  return { items: [...own, ...fill], hasNearby: fill.length > 0, hasOwn: own.length > 0 };
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
  // Arvostelukorttien kuvia ei nosteta heroon: ne näkyvät jo kortissa.
  const used = reviewCaseImages(city);
  const own = getProjectItems(city, service).filter((i) => !(i.image && used.has(i.image)));
  // Yksittäinen valmis kuva ensin: parin jälkeen-kuva näkyy jo liukusäätimessä kohdelohkossa.
  const preferred = own.find((i) => i.image && !/ennen|kesken|puoliksi|suojattu|lahikuva|asennus/.test(i.image)) ?? own.find((i) => i.pair) ?? own.find((i) => i.image) ?? own[0];
  if (!preferred) return undefined;
  return preferred.pair ? `${preferred.pair}-jalkeen` : preferred.image ?? preferred.after;
};
