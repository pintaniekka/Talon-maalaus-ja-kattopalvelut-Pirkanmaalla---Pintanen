import type { CityData } from "./cityData";

/**
 * Paikalliset hook-tekstit vanhoille kahdeksalle paikkakunnalle (pinnoitus ja maalaus) sekä
 * Kangasalan ja Pirkkalan maalaussivuille (auditointi 10.3). Sama kaava kuin newCityPages.ts:ssä:
 * 1) missä kunta on ja mikä vesistö, 2) mitä se tekee katolle tai seinälle, 3) missä kylissä käymme,
 * 4) käynti on ilmainen. Kuvista puhutaan vain, jos paikkakunnalta on kohde tiedostossa projects.ts.
 * Paikkafaktat: kuntien ja Wikipedian julkiset perustiedot (sijainti, järvet, taajamat).
 */
export const vanhatKaupunkisivut: Record<string, Partial<CityData>> = {
  tampere: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Tampereella Näsijärven ja Pyhäjärven välissä",
    pinnoitusLocalHookText:
      // SEO-suunnitelma 25.10.2026: paikallisosio on lyhyt erottaja, ei myyntiteksti. Esimerkki Tampere.
      "Tampere on Näsijärven ja Pyhäjärven välissä. Veden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Pinnoitamme tiilikattoja koko Tampereella, esimerkiksi Hervannassa, Lielahdessa, Tesomalla, Kaukajärvellä ja Linnainmaalla. Kuvia kohteistamme Tampereella näet tältä sivulta.",
    maalausLocalHookTitle: "Talon maalaus Tampereella: Pispalasta Hervantaan",
    maalausLocalHookText:
      "Tampereella on vanhoja puutaloja Pispalassa ja Pyynikillä ja uudempia omakotitaloalueita esimerkiksi Vuoreksessa ja Linnainmaalla. Järvien lähellä seinät kuivuvat sateen jälkeen hitaasti, ja pohjoisseinään tulee helposti homepilkkuja. Eemil maalaa taloja koko Tampereella. Kuvia kohteistamme Tampereella näet tältä sivulta.",
  },
  nokia: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Nokialla Pyhäjärven ja Nokianvirran rannalla",
    pinnoitusLocalHookText:
      "Nokia on Tampereen länsinaapuri. Kaupunki on Pyhäjärven ja Nokianvirran rannalla, ja veden lähellä katto pysyy sateen jälkeen pitkään kosteana. Pinnoitamme tiilikattoja koko Nokialla, esimerkiksi Harjuniityssä, Viholassa, Koskenmäellä, Siurossa ja Linnavuoressa. Kuvia kohteistamme Nokialla näet tältä sivulta.",
    maalausLocalHookTitle: "Talon maalaus Nokialla: keskusta, Siuro ja Linnavuori",
    maalausLocalHookText:
      "Nokia on Tampereen länsinaapuri Pyhäjärven ja Nokianvirran rannalla. Veden lähellä seinät kuivuvat sateen jälkeen hitaasti, ja pohjoisseinään tulee helposti homepilkkuja. Eemil maalaa taloja koko Nokialla, esimerkiksi keskustassa, Harjuniityssä, Siurossa, Linnavuoressa ja Tottijärvellä.",
  },
  ylojarvi: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Ylöjärvellä Näsijärven länsirannalla",
    pinnoitusLocalHookText:
      "Ylöjärvi on Tampereen luoteinen naapurikunta Näsijärven länsirannalla. Asuinalueet ovat usein metsän reunassa, ja puiden varjossa katto kuivuu sateen jälkeen hitaasti. Pinnoitamme tiilikattoja koko Ylöjärvellä, esimerkiksi Vuorentaustassa, Metsäkylässä, Siivikkalassa, Viljakkalassa ja Kurussa. Kuvia kohteistamme Ylöjärvellä näet tältä sivulta.",
    maalausLocalHookTitle: "Talon maalaus Ylöjärvellä: Vuorentausta, Metsäkylä ja Siivikkala",
    maalausLocalHookText:
      "Ylöjärvi on Tampereen luoteinen naapurikunta. Metsäisillä tonteilla seinät ovat varjossa ja kuivuvat hitaasti, joten puuverhoukseen tulee helposti homepilkkuja. Eemil maalaa taloja koko Ylöjärvellä, esimerkiksi Vuorentaustassa, Metsäkylässä, Siivikkalassa ja Asuntilassa.",
  },
  sastamala: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Sastamalassa Rautaveden ja Liekoveden rannoilla",
    pinnoitusLocalHookText:
      "Sastamala on Tampereelta länteen. Kaupungin keskusta Vammala on Rautaveden ja Liekoveden välissä. Veden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Pinnoitamme tiilikattoja koko Sastamalassa, esimerkiksi Vammalassa, Mouhijärvellä, Karkussa, Kiikassa ja Suodenniemellä.",
    maalausLocalHookTitle: "Talon maalaus Sastamalassa: Vammala, Mouhijärvi ja Karkku",
    maalausLocalHookText:
      "Sastamala on laaja kunta Tampereelta länteen. Siellä on paljon vanhoja puutaloja ja maatilojen rakennuksia. Eemil maalaa taloja koko Sastamalassa, esimerkiksi Vammalassa, Mouhijärvellä, Karkussa, Kiikassa ja Häijäässä.",
  },
  hameenkyro: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Hämeenkyrössä Kyrösjärven rannalla",
    pinnoitusLocalHookText:
      "Hämeenkyrö on Tampereelta luoteeseen Kyrösjärven rannalla. Peltojen keskellä katto on avoin tuulelle ja sateelle, ja järven lähellä se kuivuu hitaasti. Pinnoitamme tiilikattoja koko Hämeenkyrössä, esimerkiksi Kyröskoskella, Sasissa ja Mahnalassa. Kuvia kohteistamme Hämeenkyrössä näet tältä sivulta.",
    maalausLocalHookTitle: "Talon maalaus Hämeenkyrössä: kirkonkylä, Kyröskoski ja Sasi",
    maalausLocalHookText:
      "Hämeenkyrö on Tampereelta luoteeseen. Avoimilla peltomaisemilla viistosade osuu suoraan seinään, ja maali kuluu nopeammin kuin suojaisella tontilla. Eemil maalaa taloja koko Hämeenkyrössä, esimerkiksi kirkonkylällä, Kyröskoskella, Sasissa ja Mahnalassa.",
  },
  forssa: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Forssassa Loimijoen varrella",
    pinnoitusLocalHookText:
      "Forssa on Kanta-Hämeessä Loimijoen varrella. Joen lähellä katto pysyy sateen jälkeen pitkään kosteana, ja kuluneella tiilellä sammal kasvaa nopeasti. Pinnoitamme tiilikattoja koko Forssassa, esimerkiksi keskustassa, Koijärvellä, Matkussa ja Vieremällä.",
    maalausLocalHookTitle: "Talon maalaus Forssassa ja Lounais-Hämeessä",
    maalausLocalHookText:
      "Forssa on Kanta-Hämeessä Loimijoen varrella. Forssassa on paljon vanhoja puutaloja, jotka on maalattu jo monta kertaa. Eemil maalaa taloja koko Forssassa, esimerkiksi keskustassa, Koijärvellä, Matkussa ja Kaukjärvellä.",
  },
  hameenlinna: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Hämeenlinnassa Vanajaveden rannalla",
    pinnoitusLocalHookText:
      "Hämeenlinna on Kanta-Hämeen keskus Vanajaveden rannalla. Veden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal tarttuu kuluneeseen tiileen helposti. Pinnoitamme tiilikattoja koko Hämeenlinnassa, esimerkiksi keskustassa, Iittalassa, Hauholla, Lammilla, Kalvolassa ja Rengossa.",
    maalausLocalHookTitle: "Talon maalaus Hämeenlinnassa: keskustasta Lammille ja Hauholle",
    maalausLocalHookText:
      "Hämeenlinna on Kanta-Hämeen keskus Vanajaveden rannalla. Kaupunkiin liittyivät vuonna 2009 Hauho, Kalvola, Lammi, Renko ja Tuulos, joten alueella on paljon maaseudun puutaloja. Eemil maalaa taloja koko Hämeenlinnassa.",
  },
  huittinen: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Huittisissa Kokemäenjoen ja Loimijoen yhtymäkohdassa",
    pinnoitusLocalHookText:
      "Huittinen on Satakunnassa Pirkanmaan rajalla. Kaupunki on kohdassa, jossa Loimijoki laskee Kokemäenjokeen. Jokien lähellä ja avoimilla pelloilla katto saa sateen ja tuulen suoraan, ja kulunut tiili imee vettä. Pinnoitamme tiilikattoja koko Huittisissa, esimerkiksi Lauttakylässä, Vampulassa ja Suttilassa.",
    maalausLocalHookTitle: "Talon maalaus Huittisissa: Lauttakylä ja Vampula",
    maalausLocalHookText:
      "Huittinen on Satakunnassa Pirkanmaan rajalla, kohdassa jossa Loimijoki laskee Kokemäenjokeen. Avoimilla peltomaisemilla viistosade osuu suoraan seinään, ja maali kuluu nopeammin kuin suojaisella tontilla. Eemil maalaa taloja koko Huittisissa, esimerkiksi Lauttakylässä, Vampulassa ja Suttilassa.",
  },
  kangasala: {
    maalausLocalHookTitle: "Talon maalaus Kangasalla: Vatiala, Ruutana ja Sahalahti",
    maalausLocalHookText:
      "Kangasala on Tampereen itäpuolella, ja Kangasalan kirkolta on Tampereelle 17 kilometriä. Noin neljännes kaupungin pinta-alasta on vettä. Veden lähellä seinät kuivuvat sateen jälkeen hitaasti, ja puuverhoukseen tulee helposti homepilkkuja. Eemil maalaa taloja koko Kangasalla, esimerkiksi Vatialassa, Ruutanassa, Sahalahdella ja Kuhmalahdella.",
  },
  pirkkala: {
    maalausLocalHookTitle: "Talon maalaus Pirkkalassa, 10 kilometriä Tampereelta",
    maalausLocalHookText:
      "Pirkkala on Pyhäjärven rannalla, ja keskustaan on matkaa 10 kilometriä. Eemil maalaa taloja koko Pirkkalassa, esimerkiksi Nuolialassa, Toiviossa, Peressä ja Kurikassa.",
  },
};
