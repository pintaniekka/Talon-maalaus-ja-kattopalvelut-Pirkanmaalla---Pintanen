/**
 * Aluesivujen (/maalauspalvelut-{kunta}) paikalliset tekstit kaikille 24 paikkakunnalle.
 * Kirjoitettu uudelleen lokakuussa 2026 (auditointi S17–S18) samalla kaavalla kuin
 * kaupunkisivujen hook-tekstit: 1) missä kunta on ja mikä vesistö tai metsä, 2) mitä se tekee
 * katolle ja seinille, 3) mitä me teemme ja missä kylissä, 4) käynti on ilmainen.
 * Lyhyet virkkeet, ei vieraita sanoja, ei ylisanoja. Title ja description tuotetaan seo.ts:ssä.
 * Paikkafaktat: docs/kaupunkisivut-lahteet.md ja kuntien julkiset perustiedot.
 */

export interface AreaCityContent {
  slug: string;
  alueLocalHookTitle: string;
  alueLocalHookText: string;
}

export const areaCityContent: AreaCityContent[] = [
  {
    slug: "tampere",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Tampereella",
    alueLocalHookText:
      "Tampere on Näsijärven ja Pyhäjärven välissä. Veden lähellä katto ja seinät pysyvät sateen jälkeen pitkään kosteina. Siksi tiilikatto sammaloituu ja maali kuluu nopeammin. Pinnoitamme kattoja ja maalaamme taloja koko Tampereella, esimerkiksi Hervannassa, Pispalassa, Lielahdessa ja Linnainmaalla. Käynti on ilmainen.",
  },
  {
    slug: "sastamala",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Sastamalassa",
    alueLocalHookText:
      "Sastamala on laaja kunta Tampereelta länteen. Keskusta Vammala on Rautaveden ja Liekoveden välissä. Veden lähellä katto pysyy kosteana, ja avoimilla pelloilla viistosade osuu suoraan seinään. Pinnoitamme kattoja ja maalaamme taloja koko Sastamalassa, esimerkiksi Vammalassa, Mouhijärvellä, Karkussa ja Kiikassa. Käynti on ilmainen.",
  },
  {
    slug: "hameenkyro",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Hämeenkyrössä",
    alueLocalHookText:
      "Hämeenkyrö on Tampereelta luoteeseen Kyrösjärven rannalla. Peltojen keskellä talo on avoin tuulelle ja sateelle, joten tiilen pinta ja maali kuluvat nopeammin. Pinnoitamme kattoja ja maalaamme taloja koko Hämeenkyrössä, esimerkiksi kirkonkylällä, Kyröskoskella, Sasissa ja Mahnalassa. Käynti on ilmainen.",
  },
  {
    slug: "ylojarvi",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Ylöjärvellä",
    alueLocalHookText:
      "Ylöjärvi on Tampereen luoteinen naapurikunta Näsijärven länsirannalla. Asuinalueet ovat usein metsän reunassa. Puiden varjossa katto ja seinät kuivuvat hitaasti, ja sammal ja home viihtyvät kosteassa. Pinnoitamme kattoja ja maalaamme taloja koko Ylöjärvellä, esimerkiksi Vuorentaustassa, Metsäkylässä, Siivikkalassa ja Kurussa. Käynti on ilmainen.",
  },
  {
    slug: "nokia",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Nokialla",
    alueLocalHookText:
      "Nokia on Tampereen länsinaapuri Pyhäjärven ja Nokianvirran rannalla. Veden lähellä katto ja seinät pysyvät sateen jälkeen pitkään kosteina. Nokialla on 1 531 omakoti- ja paritaloa 1970- ja 1980-luvuilta. Sen ikäisessä talossa katto ja maali ovat usein huollon iässä. Pinnoitamme kattoja ja maalaamme taloja koko Nokialla, esimerkiksi Harjuniityssä, Viholassa, Siurossa ja Linnavuoressa. Käynti on ilmainen.",
  },
  {
    slug: "forssa",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Forssassa",
    alueLocalHookText:
      "Forssa on Kanta-Hämeessä Loimijoen varrella. Käymme Forssassa säännöllisesti. Joen lähellä katto pysyy kosteana, ja kaupungin vanhat puutalot on maalattu jo monta kertaa, joten pohjatyöt ratkaisevat. Pinnoitamme kattoja ja maalaamme taloja koko Forssassa, esimerkiksi keskustassa, Koijärvellä, Matkussa ja Vieremällä. Käynti on ilmainen.",
  },
  {
    slug: "hameenlinna",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Hämeenlinnassa",
    alueLocalHookText:
      "Hämeenlinna on Kanta-Hämeen keskus Vanajaveden rannalla. Veden lähellä katto ja seinät kuivuvat sateen jälkeen hitaasti. Kaupunkiin kuuluvat myös Hauho, Kalvola, Lammi, Renko ja Tuulos, joissa on paljon maaseudun puutaloja. Pinnoitamme kattoja ja maalaamme taloja koko Hämeenlinnassa. Käynti on ilmainen.",
  },
  {
    slug: "huittinen",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Huittisissa",
    alueLocalHookText:
      "Huittinen on Satakunnassa Pirkanmaan rajalla, kohdassa jossa Loimijoki laskee Kokemäenjokeen. Avoimilla pelloilla tuuli ja viistosade osuvat suoraan kattoon ja seiniin. Pinnoitamme kattoja ja maalaamme taloja koko Huittisissa, esimerkiksi Lauttakylässä, Vampulassa ja Suttilassa. Käynti on ilmainen.",
  },
  {
    slug: "akaa",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Akaassa",
    alueLocalHookText:
      "Akaa syntyi vuonna 2007, kun Toijala ja Viiala yhdistyivät. Kylmäkoski liittyi mukaan vuonna 2011. Toijalasta on Tampereelle noin 41 kilometriä. Akaassa on paljon vanhoja puutaloja, joiden maali on uusittu monta kertaa, ja tiilikattoja, joiden tehdaspinta on kulunut. Pinnoitamme kattoja ja maalaamme taloja Toijalassa, Viialassa ja Kylmäkoskella. Käynti on ilmainen.",
  },
  {
    slug: "ikaalinen",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Ikaalisissa",
    alueLocalHookText:
      "Ikaalinen on Kyrösjärven rannalla, ja Tampereelle on matkaa runsaat 50 kilometriä. Veden lähellä katto ja seinät pysyvät sateen jälkeen pitkään kosteina, ja sammal viihtyy kosteassa. Pinnoitamme kattoja ja maalaamme taloja koko Ikaalisissa, esimerkiksi keskustassa, Kilvakkalassa, Luhalahdessa ja Tevaniemessä. Käynti on ilmainen.",
  },
  {
    slug: "juupajoki",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Juupajoella",
    alueLocalHookText:
      "Juupajoki on Pirkanmaan pienin kunta, ja Tampereelle on 55 kilometriä. Tontit ovat usein metsän keskellä. Puiden varjossa katto ja seinät kuivuvat hitaasti, ja neulaset pitävät katon kosteana. Pinnoitamme kattoja ja maalaamme taloja koko Juupajoella, esimerkiksi kirkonkylällä, Korkeakoskella ja Lylyssä. Käynti on ilmainen.",
  },
  {
    slug: "kangasala",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Kangasalla",
    alueLocalHookText:
      "Kangasala on Tampereen itäpuolella, ja Kangasalan kirkolta on Tampereelle 17 kilometriä. Noin neljännes kaupungin pinta-alasta on vettä. Veden lähellä katto ja seinät pysyvät sateen jälkeen pitkään kosteina. Pinnoitamme kattoja ja maalaamme taloja koko Kangasalla, esimerkiksi Vatialassa, Ruutanassa, Sahalahdella ja Kuhmalahdella. Käynti on ilmainen.",
  },
  {
    slug: "kihnio",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Kihniössä",
    alueLocalHookText:
      "Kihniö on Pirkanmaan pohjoisosassa, noin 110 kilometriä Tampereelta. Talvet ovat pitkiä ja pakkaset kovia. Kun kulunut tiili tai halkeileva maali päästää veden sisään, jää rikkoo pinnan nopeasti. Tulemme myös Kihniöön: pinnoitamme kattoja ja maalaamme taloja kirkonkylällä, Nerkoossa ja Linnankylässä. Käynti on ilmainen.",
  },
  {
    slug: "lempaala",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Lempäälässä",
    alueLocalHookText:
      "Lempäälä on Tampereen eteläinen naapurikunta. Keskusta on Vanajaveden ja Pyhäjärven välissä, ja asutus jatkuu yhtenäisenä Tampereen rajalle. Lempäälässä on paljon 2000-luvun alun taloja, joiden katon tehdaspinta ja ensimmäinen maali alkavat nyt kulua. Pinnoitamme kattoja ja maalaamme taloja koko Lempäälässä, esimerkiksi Kuljussa, Sääksjärvellä ja Hakkarissa. Käynti on ilmainen.",
  },
  {
    slug: "mantta-vilppula",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Mänttä-Vilppulassa",
    alueLocalHookText:
      "Mänttä-Vilppula on Pohjois-Pirkanmaalla, ja Tampereelle on 90 kilometriä. Kaupunki syntyi vuonna 2009, kun Mänttä ja Vilppula yhdistyivät. Järvien ja metsien keskellä katto ja seinät kuivuvat sateen jälkeen hitaasti. Pinnoitamme kattoja ja maalaamme taloja Mäntässä, Vilppulassa, Kolhossa ja Pohjaslahdella. Käynti on ilmainen.",
  },
  {
    slug: "orivesi",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Orivedellä",
    alueLocalHookText:
      "Orivesi on noin 40 kilometriä Tampereelta. Kaupungissa on yli 350 järveä, ja suurin niistä on Längelmävesi. Veden lähellä katto ja seinät pysyvät sateen jälkeen pitkään kosteina. Pinnoitamme kattoja ja maalaamme taloja koko Orivedellä, esimerkiksi keskustassa, Eräjärvellä ja Hirsilässä. Kuvia kohteistamme Orivedellä näet tältä sivulta. Käynti on ilmainen.",
  },
  {
    slug: "parkano",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Parkanossa",
    alueLocalHookText:
      "Parkano on Pirkanmaan, Satakunnan ja Etelä-Pohjanmaan rajalla valtateiden 3 ja 23 risteyksessä. Tampereelle on noin tunnin matka. Mäntymetsien keskellä neulaset pitävät katon kosteana, ja talven pakkaset rikkovat kuluneen tiilen. Pinnoitamme kattoja ja maalaamme taloja koko Parkanossa. Kuvia kohteestamme Parkanossa näet tältä sivulta. Käynti on ilmainen.",
  },
  {
    slug: "pirkkala",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Pirkkalassa",
    alueLocalHookText:
      "Pirkkala on Tampereen naapurikunta Pyhäjärven rannalla, ja Tampereelle on matkaa 10 kilometriä. Pirkkalassa on 774 omakoti- ja paritaloa 1970- ja 1980-luvuilta. Sen ikäisessä talossa katto ja maali ovat usein huollon iässä. Pinnoitamme kattoja ja maalaamme taloja koko Pirkkalassa, esimerkiksi Nuolialassa, Toiviossa, Peressä ja Kurikassa. Käynti on ilmainen.",
  },
  {
    slug: "palkane",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Pälkäneellä",
    alueLocalHookText:
      "Pälkäne on 35 kilometriä Tampereelta. Kunta on järvien ja peltojen keskellä, ja osa Roineesta kuuluu Pälkäneelle. Veden lähellä katto pysyy kosteana, ja avoimilla pelloilla viistosade osuu suoraan seinään. Pinnoitamme kattoja ja maalaamme taloja koko Pälkäneellä, esimerkiksi Onkkaalassa, Luopioisissa ja Aitoossa. Käynti on ilmainen.",
  },
  {
    slug: "ruovesi",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Ruovedellä",
    alueLocalHookText:
      "Ruovesi on Pohjois-Pirkanmaalla, ja Tampereen keskustaan on matkaa 73 kilometriä. Kunta on Näsijärven vesistön rannalla metsien keskellä. Rantatonteilla katto ja seinät kuivuvat sateen jälkeen hitaasti. Pinnoitamme kattoja ja maalaamme taloja koko Ruovedellä, esimerkiksi kirkonkylällä, Visuvedellä ja Jäminkipohjassa. Käynti on ilmainen.",
  },
  {
    slug: "urjala",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Urjalassa",
    alueLocalHookText:
      "Urjala on valtatie 9:n varrella Tampereelta Turkuun päin, ja Tampereelle on 60 kilometriä. Urjalassa on paljon vanhoja puutaloja, jotka on maalattu jo monta kertaa. Silloin pohjatyöt ratkaisevat. Pinnoitamme kattoja ja maalaamme taloja koko Urjalassa, esimerkiksi Laukeelassa, Nuutajärvellä ja Huhdissa. Käynti on ilmainen.",
  },
  {
    slug: "valkeakoski",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Valkeakoskella",
    alueLocalHookText:
      "Valkeakoski on 35 kilometriä Tampereelta etelään Mallasveden ja Vanajaveden yhtymäkohdassa. Kaupunki kasvoi tehtaiden ympärille, ja joka kolmas omakotitalo on 1940- ja 1950-luvuilta. Veden lähellä katto ja seinät pysyvät kosteina. Pinnoitamme kattoja ja maalaamme taloja Valkeakosken keskustassa, Sääksmäellä ja Kärjenniemessä. Käynti on ilmainen.",
  },
  {
    slug: "vesilahti",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Vesilahdella",
    alueLocalHookText:
      "Vesilahti on Pyhäjärven etelä- ja kaakkoisrannalla, noin 30 kilometriä Tampereelta lounaaseen. Veden lähellä katto ja seinät pysyvät sateen jälkeen pitkään kosteina, ja avoimilla pelloilla viistosade osuu suoraan seinään. Pinnoitamme kattoja ja maalaamme taloja koko Vesilahdella, esimerkiksi kirkonkylällä, Narvassa ja Koskenkylässä. Käynti on ilmainen.",
  },
  {
    slug: "virrat",
    alueLocalHookTitle: "Tiilikaton pinnoitus ja talon maalaus Virroilla",
    alueLocalHookText:
      "Virrat on Pirkanmaan pohjoisosassa Tampereen, Porin ja Jyväskylän välimaastossa, noin tunnin matkan päässä Tampereelta. Kaupungissa on 269 järveä. Talvet ovat pitkiä, ja pakkanen rikkoo kuluneen tiilen ja halkeilevan maalin alla olevan puun. Pinnoitamme kattoja ja maalaamme taloja koko Virroilla, esimerkiksi keskustassa, Killinkoskella ja Vaskivedellä. Käynti on ilmainen.",
  },
];

export const getAreaCityContent = (slug: string): AreaCityContent | undefined => areaCityContent.find((c) => c.slug === slug);
