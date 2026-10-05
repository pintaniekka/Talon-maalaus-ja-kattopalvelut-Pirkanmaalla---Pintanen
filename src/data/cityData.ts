import { newCityPages } from "./newCityPages";
import { vanhatKaupunkisivut } from "./vanhatKaupunkisivut";

export interface CityData {
  name: string;
  cityIn: string;
  cityGenitive: string;
  slug: string;
  /** Pinnoituksen kaupunkisivun paikallinen teksti. Sivu on olemassa vain, jos otsikko on annettu. */
  pinnoitusLocalHookTitle?: string;
  pinnoitusLocalHookText?: string;
  /** Katon puhdistuksen kaupunkisivu (vain vanhat 8 paikkakuntaa; palvelu poistuu). */
  puhdistusIntro?: string;
  puhdistusMetaTitle?: string;
  puhdistusMetaDesc?: string;
  /** Maalauksen kaupunkisivun paikallinen teksti. Sivu on olemassa vain, jos otsikko on annettu. */
  maalausLocalHookTitle?: string;
  maalausLocalHookText?: string;
  /** Puhdistussivun "Palvelu alueella" -teksti. */
  localSection?: string;
  /**
   * Uusien kaupunkisivujen julkaisuerä (1 tai 2). Puuttuu paikkakunnilta,
   * joiden palvelusivut olivat olemassa jo ennen lokakuuta 2026.
   */
  uusiSivuEra?: 1 | 2;
}

/**
 * Vanhat kahdeksan paikkakuntaa, joilla on pinnoitus-, puhdistus- ja maalaussivut.
 * Title- ja description-tekstit tuotetaan mallista tiedostossa seo.ts; paikalliset
 * hook-tekstit tulevat tiedostosta vanhatKaupunkisivut.ts.
 */
const citiesBase: CityData[] = [
  {
    name: "Tampere",
    cityIn: "Tampereella",
    cityGenitive: "Tampereen",
    slug: "tampere",
    puhdistusMetaTitle: "Katon puhdistus Tampere – Poistaa sammaleen",
    puhdistusMetaDesc:
      "Tiilikaton puhdistus Tampereella edullisesti ja tehokkaasti. Sammaleet ja lika poistetaan mekaanisesti. Kysy tarjous.",
    puhdistusIntro:
      "Tampereen kosteassa ilmastossa tiilikatot sammaloituvat nopeasti, erityisesti varjoisilla tonteilla ja järvien läheisyydessä. Mekaaninen puhdistus ja sammaleentorjuntakäsittely ovat edullisin tapa pitää katto kunnossa ilman suurempaa huoltoa. Puhdistamme katon käsityövälineillä – emme käytä painepesua, joka voi vahingoittaa tiilen pintaa. Palvelemme koko Tampereen aluetta nopealla aikataululla.",
    localSection:
      "Tampere sijaitsee Näsijärven ja Pyhäjärven välissä, mikä tekee ilmastosta kostean ja vaativan rakennusten pinnoille. Järvien läheisyys nostaa ilmankosteutta erityisesti kesäisin ja syksyisin, mikä kiihdyttää sammalen ja levän kasvua katoilla. Tampereen omakotitaloalueet – Hervanta, Leinola, Kämmenniemi, Atala ja Kalkku – koostuvat pääosin 70–90-luvun pientaloista, joiden tiilikatot ovat saavuttaneet iän, jossa huolto on välttämätöntä. Talvisin lumi- ja jääkuorma rasittaa kattoja, ja keväisin sulamisvedet voivat aiheuttaa ongelmia kuluneella kattopinnalla. Tampereen olosuhteissa säännöllinen kunnossapito on paras tapa välttää kalliit korjaukset.",
  },
  {
    name: "Sastamala",
    cityIn: "Sastamalassa",
    cityGenitive: "Sastamalan",
    slug: "sastamala",
    puhdistusMetaTitle: "Katon puhdistus Sastamala – Katto puhtaaksi kerralla",
    puhdistusMetaDesc:
      "Tiilikaton puhdistus Sastamalassa tehokkaasti ja edullisesti. Laita katto kunnossa ajoissa. Kysy tarjous.",
    puhdistusIntro:
      "Sastamalan metsäisessä ympäristössä sammalen ja jäkälän kasvu katoilla on yleistä. Varsinkin Rautaveden ja Kuloveden lähellä ilmankosteus pitää katot kosteina pitkään. Mekaaninen puhdistus käsityövälineillä ja kasvustontorjuntakäsittely pitävät kattosi kunnossa vuosiksi eteenpäin. Palvelemme Sastamalaa joustavalla aikataululla.",
    localSection:
      "Sastamala on pinta-alaltaan laaja kunta, jossa metsät, pellot ja vesistöt vaihtelevat. Rautaveden ja Kuloveden rannoilla sijaitsevat kiinteistöt altistuvat erityisesti kosteudelle, joka edistää sammalen ja jäkälän kasvua katoilla. Metsäisillä tonteilla lehdet ja neulaset kertyvät kattopinnoille ja pidättävät kosteutta. Alueella on paljon perinteisiä puutaloja ja maatilarakennuksia, joiden tiilikatot ja puujulkisivut tarvitsevat säännöllistä hoitoa. Talvisin runsas lumi rasittaa kattoja, ja avoimilla peltoalueilla tuuli tehostaa sään kuluttavaa vaikutusta rakennusten pintoihin.",
  },
  {
    name: "Hämeenkyrö",
    cityIn: "Hämeenkyrössä",
    cityGenitive: "Hämeenkyrön",
    slug: "hameenkyro",
    puhdistusMetaTitle: "Katon puhdistus Hämeenkyrö – Turvallisesti ja huolellisesti",
    puhdistusMetaDesc:
      "Tiilikaton puhdistus Hämeenkyrössä edullisesti ja huolellisesti. Sammaleet ja lika pois katolta. Kysy tarjous.",
    puhdistusIntro:
      "Hämeenkyrössä metsäiset tontit tarkoittavat, että tiilikatot sammaloituvat nopeasti. Neulasia ja lehtiä kertyy kattopinnoille, ja kosteus edistää kasvustoa. Puhdistamme katon mekaanisesti ja käsittelemme sen kasvustonestolla – näin katto pysyy puhtaana pidempään ilman uusintapesua.",
    localSection:
      "Hämeenkyrö on luonnonläheinen kunta Kyrösjärven rannalla. Järven tuoma kosteus ja metsäiset tontit luovat olosuhteet, joissa kattojen ja julkisivujen pinnat kuluvat nopeammin kuin avoimemmilla alueilla. Alueen omakotitalot ovat pääosin 70–90-luvuilta, ja monessa kohteessa katon pinnoitus tai julkisivun huoltomaalaus on tullut ajankohtaiseksi. Talvisin lumi kertyy erityisesti suojaisten metsätonttien katoille, ja keväisin sulamisvedet koettelevat kulunutta kattopintaa. Hämeenkyrön olosuhteet tekevät ennaltaehkäisevästä huollosta erityisen järkevän investoinnin.",
  },
  {
    name: "Ylöjärvi",
    cityIn: "Ylöjärvellä",
    cityGenitive: "Ylöjärven",
    slug: "ylojarvi",
    puhdistusMetaTitle: "Katon puhdistus Ylöjärvi – Pidentää katon ikää",
    puhdistusMetaDesc:
      "Tiilikaton puhdistus Ylöjärvellä edullisesti ja tehokkaasti. Sammaleet ja lika poistetaan huolellisesti. Pyydä tarjous.",
    puhdistusIntro:
      "Ylöjärven metsäisillä ja järvenrantaisilla tonteilla katot keräävät nopeasti sammalta, neulasia ja lehtiä. Säännöllinen mekaaninen puhdistus ja sammaleentorjuntakäsittely ovat edullisin tapa pitää katto kunnossa. Puhdistamme katon käsityövälineillä ilman painepesua ja palvelemme koko Ylöjärven aluetta.",
    localSection:
      "Ylöjärvi on Tampereen naapurikaupunki, joka on kasvanut nopeasti viime vuosikymmeninä. Asuinalueet ovat usein metsäisiä ja luonnonläheisiä – Näsijärven pohjoisranta ja lukuisat pienemmät järvet tuovat kosteutta ilmaan. Siivikkalan, Metsäkylän ja Vuorentaustan omakotitaloalueet koostuvat eri vuosikymmenten pientaloista. Metsätonteilla katot keräävät neulasia ja lehtiä, jotka pidättävät kosteutta ja luovat sammaleelle kasvualustan. Talvisin suojaisilla tonteilla lumi ei puhdistu tuulen avulla, ja keväisin sulamisvedet rasittavat kulunutta kattopintaa.",
  },
  {
    name: "Nokia",
    cityIn: "Nokialla",
    cityGenitive: "Nokian",
    slug: "nokia",
    puhdistusMetaTitle: "Katon puhdistus Nokia – Ammattitaidolla",
    puhdistusMetaDesc:
      "Tiilikaton puhdistus Nokialla tehokkaasti ja edullisesti. Katto puhtaaksi laadukkailla työmenetelmillä. Kysy tarjous.",
    puhdistusIntro:
      "Nokian kosteassa ympäristössä katot sammaloituvat nopeasti – erityisesti metsäisillä tonteilla ja vesistöjen lähellä. Mekaaninen puhdistus poistaa sammalen ja jäkälän vahingoittamatta tiilen pintaa, ja kasvustonestokäsittely hidastaa uuden kasvuston muodostumista merkittävästi.",
    localSection:
      "Nokia sijaitsee Kokemäenjoen ja Pyhäjärven varrella, ja vesistöjen vaikutus näkyy ilmankosteudessa selvästi. Kosteassa ympäristössä kattojen pinnat kuluvat nopeammin ja sammal tarttuu tiiliin helposti. Nokian asuinalueet Alhoniityssä, Kankaantaassa ja Linnavuoressa koostuvat pääosin 80–2000-luvun pientaloista. Metsäisten tonttien katot keräävät neulasia ja lehtiä, jotka muodostavat kosteutta pidättävän kerroksen. Talven jäätymis-sulamissyklit rasittavat erityisesti pinnoittamattomia tiiliä – vesi imeytyy huokoiseen tiilen ja laajenee jäätyessään.",
  },
  {
    name: "Forssa",
    cityIn: "Forssassa",
    cityGenitive: "Forssan",
    slug: "forssa",
    puhdistusMetaTitle: "Katon puhdistus Forssa – Säännöllinen huolto kannattaa",
    puhdistusMetaDesc:
      "Tiilikaton puhdistus Forssassa tehokkaasti ja edullisesti. Katto kuntoon ennen vaurioita. Pyydä tarjous.",
    puhdistusIntro:
      "Forssan seudulla katot keräävät kasvustoa erityisesti Loimijoen varren kosteissa olosuhteissa. Vaikka alue on avoin, varjoisilla tonteilla sammal kasvaa silti tehokkaasti. Puhdistamme tiilikatot mekaanisesti ja käsittelemme ne sammaleentorjunta-aineella. Palvelemme Forssan aluetta joustavasti.",
    localSection:
      "Forssa sijaitsee Etelä-Hämeessä, missä laajat peltoaukeat ja Loimijoen varsi muodostavat maiseman. Avoimilla alueilla rakennukset altistuvat tuulelle ja viistosateelle, mikä kuluttaa julkisivuja ja kattopintoja tehokkaasti. Loimijoen varren kiinteistöissä ilmankosteus edistää kasvustoa katoilla. Forssan seutu koostuu pääosin perinteisistä puutaloista ja maatilakiinteistöistä, joiden tiilikatot ja puujulkisivut vaativat säännöllistä hoitoa. Talvisin lumikuorma voi olla merkittävä, ja avoimen maaston tuuli pakkaa lunta epätasaisesti katoille.",
  },
  {
    name: "Hämeenlinna",
    cityIn: "Hämeenlinnassa",
    cityGenitive: "Hämeenlinnan",
    slug: "hameenlinna",
    puhdistusMetaTitle: "Katon puhdistus Hämeenlinna – Ilmainen arvio",
    puhdistusMetaDesc:
      "Tiilikaton puhdistus Hämeenlinnassa edullisesti ja tehokkaasti. Sammaleet ja lika poistetaan huolellisesti. Kysy tarjous.",
    puhdistusIntro:
      "Hämeenlinnan metsäisillä ja Vanajaveden läheisillä tonteilla tiilikatot sammaloituvat tehokkaasti. Mekaaninen puhdistus ja kasvustonestokäsittely ovat hyvä tapa pitää katto kunnossa ilman täyttä pinnoitusta. Puhdistamme katot ammattitaidolla ja nopealla aikataululla.",
    localSection:
      "Hämeenlinna sijaitsee Vanajaveden rannalla Kanta-Hämeessä. Järven läheisyys nostaa ilmankosteutta ja luo olosuhteet, joissa sammalen ja jäkälän kasvu katoilla on yleistä. Kaupungin metsäiset omakotitaloalueet keräävät lehtiä ja neulasia kattopinnoille. Hämeenlinnan seudulla on eri-ikäisiä omakotitaloja ja rivitaloja, joiden tiilikatot ja puujulkisivut tarvitsevat huoltoa. Etelä-Hämeen vaihteleva talvi – lumen ja vesisateen vuorottelu – rasittaa kattopintoja erityisesti, kun vesi jäätyy ja sulaa toistuvasti tiilen huokosissa.",
  },
  {
    name: "Huittinen",
    cityIn: "Huittisissa",
    cityGenitive: "Huittisten",
    slug: "huittinen",
    puhdistusMetaTitle: "Katon puhdistus Huittinen – Poistaa levän ja sammaleen",
    puhdistusMetaDesc:
      "Tiilikaton puhdistus Huittisissa tehokkaasti ja edullisesti. Katto pysyy kunnossa pidempään. Kysy tarjous.",
    puhdistusIntro:
      "Huittisten jokivarsien kosteassa ympäristössä katot keräävät sammalta ja jäkälää tehokkaasti. Mekaaninen puhdistus ja torjuntakäsittely pitävät katon kunnossa pitkään. Palvelemme Huittisten aluetta joustavasti – ota yhteyttä ja sovitaan ajankohta.",
    localSection:
      "Huittinen sijaitsee Kokemäenjoen ja Loimijoen yhtymäkohdassa Satakunnan rajalla. Jokien läheisyys nostaa ilmankosteutta ja tekee ympäristöstä vaativan rakennusten pinnoille. Maatalousympäristössä avoimet peltoalueet altistavat rakennukset tuulelle ja viistosateelle. Huittisten seudulle tyypilliset perinteiset puutalot ja maatilarakennukset vaativat säännöllistä kunnossapitoa. Talvisin lumikuorma ja jäätymis-sulamissyklit rasittavat erityisesti huoltamattomia tiiliä ja maalipintoja.",
  },
];

/** Cities with area page but NO dedicated service subpages */
const simpleCitiesBase: CityData[] = [
  {
    name: "Akaa",
    cityIn: "Akaassa",
    cityGenitive: "Akaan",
    slug: "akaa",
  },
  {
    name: "Ikaalinen",
    cityIn: "Ikaalisissa",
    cityGenitive: "Ikaalisten",
    slug: "ikaalinen",
  },
  {
    name: "Juupajoki",
    cityIn: "Juupajoella",
    cityGenitive: "Juupajoen",
    slug: "juupajoki",
  },
  {
    name: "Kangasala",
    cityIn: "Kangasalla",
    cityGenitive: "Kangasalan",
    slug: "kangasala",
  },
  {
    name: "Kihniö",
    cityIn: "Kihniössä",
    cityGenitive: "Kihniön",
    slug: "kihnio",
  },
  {
    name: "Lempäälä",
    cityIn: "Lempäälässä",
    cityGenitive: "Lempäälän",
    slug: "lempaala",
  },
  {
    name: "Mänttä-Vilppula",
    cityIn: "Mänttä-Vilppulassa",
    cityGenitive: "Mänttä-Vilppulan",
    slug: "mantta-vilppula",
  },
  {
    name: "Orivesi",
    cityIn: "Orivedellä",
    cityGenitive: "Oriveden",
    slug: "orivesi",
  },
  {
    name: "Parkano",
    cityIn: "Parkanossa",
    cityGenitive: "Parkanon",
    slug: "parkano",
  },
  {
    name: "Pirkkala",
    cityIn: "Pirkkalassa",
    cityGenitive: "Pirkkalan",
    slug: "pirkkala",
  },
  {
    name: "Pälkäne",
    cityIn: "Pälkäneellä",
    cityGenitive: "Pälkäneen",
    slug: "palkane",
  },
  {
    name: "Ruovesi",
    cityIn: "Ruovedellä",
    cityGenitive: "Ruoveden",
    slug: "ruovesi",
  },
  {
    name: "Urjala",
    cityIn: "Urjalassa",
    cityGenitive: "Urjalan",
    slug: "urjala",
  },
  {
    name: "Valkeakoski",
    cityIn: "Valkeakoskella",
    cityGenitive: "Valkeakosken",
    slug: "valkeakoski",
  },
  {
    name: "Vesilahti",
    cityIn: "Vesilahdella",
    cityGenitive: "Vesilahden",
    slug: "vesilahti",
  },
  {
    name: "Virrat",
    cityIn: "Virroilla",
    cityGenitive: "Virtain",
    slug: "virrat",
  },
];

/**
 * Julkaistavat uusien kaupunkisivujen erät. Erän pois jättäminen piilottaa sen
 * paikkakuntien uudet pinnoitus- ja maalaussivut (reitit, sitemap ja linkit).
 */
export const JULKAISTAVAT_ERAT: ReadonlyArray<1 | 2> = [1, 2];

export const cities: CityData[] = citiesBase.map((c) => ({ ...c, ...(vanhatKaupunkisivut[c.slug] ?? {}) }));

/** Aluesivun paikkakunnat, joiden palvelusivujen sisältö tulee tiedostosta newCityPages.ts. */
export const simpleCities: CityData[] = simpleCitiesBase.map((c) => {
  const extra = newCityPages[c.slug];
  const vanha = vanhatKaupunkisivut[c.slug] ?? {};
  if (!extra || !extra.uusiSivuEra || !JULKAISTAVAT_ERAT.includes(extra.uusiSivuEra)) return { ...c, ...vanha };
  return { ...c, ...vanha, ...extra };
});

/** All cities combined */
export const allCities: CityData[] = [...cities, ...simpleCities];

export const getCityBySlug = (slug: string): CityData | undefined => {
  return allCities.find((c) => c.slug === slug);
};

/** Paikkakunnat, joilla on oma tiilikaton pinnoituksen sivu. */
export const pinnoitusCities: CityData[] = allCities.filter((c) => !!c.pinnoitusLocalHookTitle);

/** Paikkakunnat, joilla on oma katon puhdistuksen sivu (ei laajenneta uusille paikkakunnille). */
export const puhdistusCities: CityData[] = allCities.filter((c) => !!c.puhdistusIntro);

/** Paikkakunnat, joilla on oma talon maalauksen sivu. */
export const maalausCities: CityData[] = allCities.filter((c) => !!c.maalausLocalHookTitle);

const hasPage = (list: CityData[], slug: string) => list.some((c) => c.slug === slug);
export const hasPinnoitusPage = (slug: string) => hasPage(pinnoitusCities, slug);
export const hasPuhdistusPage = (slug: string) => hasPage(puhdistusCities, slug);
export const hasMaalausPage = (slug: string) => hasPage(maalausCities, slug);
