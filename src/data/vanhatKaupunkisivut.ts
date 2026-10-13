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
      "Tampere on Näsijärven ja Pyhäjärven välissä. Veden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Kun tiilen tehdaspinta on kulunut, sammal tarttuu siihen helposti. Pinnoitamme tiilikattoja koko Tampereella, esimerkiksi Hervannassa, Lielahdessa, Tesomalla, Kaukajärvellä ja Linnainmaalla. Kuvia kohteistamme Tampereella näet tältä sivulta. Tulemme katsomaan kattosi ilmaiseksi.",
    maalausLocalHookTitle: "Talon maalaus Tampereella: Pispalasta Hervantaan",
    maalausLocalHookText:
      "Tampereella on vanhoja puutaloja Pispalassa ja Pyynikillä ja uudempia omakotitaloalueita esimerkiksi Vuoreksessa ja Linnainmaalla. Järvien lähellä seinät kuivuvat sateen jälkeen hitaasti, ja pohjoisseinään tulee helposti homepilkkuja. Eemil maalaa taloja koko Tampereella. Hän pesee seinät homepesuaineella, kaapii irtoavan maalin, pohjamaalaa paljaat kohdat ja maalaa pintamaalin pensselillä. Kuvia kohteistamme Tampereella näet tältä sivulta. Arviokäynti on ilmainen.",
  },
  nokia: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Nokialla Pyhäjärven ja Nokianvirran rannalla",
    pinnoitusLocalHookText:
      "Nokia on Tampereen länsinaapuri. Kaupunki on Pyhäjärven ja Nokianvirran rannalla, ja veden lähellä katto pysyy sateen jälkeen pitkään kosteana. Kostealla ja kuluneella tiilellä sammal kasvaa nopeasti. Pinnoitamme tiilikattoja koko Nokialla, esimerkiksi Harjuniityssä, Viholassa, Koskenmäellä, Siurossa ja Linnavuoressa. Kuvia kohteistamme Nokialla näet tältä sivulta. Tulemme katsomaan kattosi ilmaiseksi.",
    maalausLocalHookTitle: "Talon maalaus Nokialla: keskusta, Siuro ja Linnavuori",
    maalausLocalHookText:
      "Nokia on Tampereen länsinaapuri Pyhäjärven rannalla. Nokialla on 1 531 omakoti- ja paritaloa 1970- ja 1980-luvuilta. Sen ikäinen puutalo on maalattu jo monta kertaa. Silloin pohjatyöt ratkaisevat: irtoava maali kaavitaan pois ennen uutta maalia. Eemil maalaa taloja koko Nokialla, esimerkiksi keskustassa, Harjuniityssä, Siurossa, Linnavuoressa ja Tottijärvellä. Arviokäynti on ilmainen.",
  },
  ylojarvi: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Ylöjärvellä Näsijärven länsirannalla",
    pinnoitusLocalHookText:
      "Ylöjärvi on Tampereen luoteinen naapurikunta Näsijärven länsirannalla. Asuinalueet ovat usein metsän reunassa, ja puiden varjossa katto kuivuu sateen jälkeen hitaasti. Siksi sammal tarttuu kuluneeseen tiileen helposti. Pinnoitamme tiilikattoja koko Ylöjärvellä, esimerkiksi Vuorentaustassa, Metsäkylässä, Siivikkalassa, Viljakkalassa ja Kurussa. Kuvia kohteistamme Ylöjärvellä näet tältä sivulta. Tulemme katsomaan kattosi ilmaiseksi.",
    maalausLocalHookTitle: "Talon maalaus Ylöjärvellä: Vuorentausta, Metsäkylä ja Siivikkala",
    maalausLocalHookText:
      "Ylöjärvi on Tampereen luoteinen naapurikunta. Metsäisillä tonteilla seinät ovat varjossa ja kuivuvat hitaasti, joten puuverhoukseen tulee helposti homepilkkuja. Ne pestään pois homepesuaineella ennen maalausta. Eemil maalaa taloja koko Ylöjärvellä, esimerkiksi Vuorentaustassa, Metsäkylässä, Siivikkalassa ja Asuntilassa. Arviokäynti on ilmainen.",
  },
  sastamala: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Sastamalassa Rautaveden ja Liekoveden rannoilla",
    pinnoitusLocalHookText:
      "Sastamala on Tampereelta länteen. Kaupungin keskusta Vammala on Rautaveden ja Liekoveden välissä. Veden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Pinnoitamme tiilikattoja koko Sastamalassa, esimerkiksi Vammalassa, Mouhijärvellä, Karkussa, Kiikassa ja Suodenniemellä. Tulemme katsomaan kattosi ilmaiseksi.",
    maalausLocalHookTitle: "Talon maalaus Sastamalassa: Vammala, Mouhijärvi ja Karkku",
    maalausLocalHookText:
      "Sastamala on laaja kunta Tampereelta länteen. Siellä on paljon vanhoja puutaloja ja maatilojen rakennuksia. Vanha puutalo kestää hyvin, kun maali pidetään kunnossa. Eemil maalaa taloja koko Sastamalassa, esimerkiksi Vammalassa, Mouhijärvellä, Karkussa, Kiikassa ja Häijäässä. Arviokäynti on ilmainen.",
  },
  hameenkyro: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Hämeenkyrössä Kyrösjärven rannalla",
    pinnoitusLocalHookText:
      "Hämeenkyrö on Tampereelta luoteeseen Kyrösjärven rannalla. Peltojen keskellä katto on avoin tuulelle ja sateelle, ja järven lähellä se kuivuu hitaasti. Kulunut tiili imee vettä, ja vesi rikkoo tiilen talvella. Pinnoitamme tiilikattoja koko Hämeenkyrössä, esimerkiksi Kyröskoskella, Sasissa ja Mahnalassa. Kuvia kohteistamme Hämeenkyrössä näet tältä sivulta. Tulemme katsomaan kattosi ilmaiseksi.",
    maalausLocalHookTitle: "Talon maalaus Hämeenkyrössä: kirkonkylä, Kyröskoski ja Sasi",
    maalausLocalHookText:
      "Hämeenkyrö on Tampereelta luoteeseen. Avoimilla peltomaisemilla viistosade osuu suoraan seinään, ja maali kuluu nopeammin kuin suojaisella tontilla. Eemil maalaa taloja koko Hämeenkyrössä, esimerkiksi kirkonkylällä, Kyröskoskella, Sasissa ja Mahnalassa. Hän pesee seinät homepesuaineella, kaapii irtoavan maalin, pohjamaalaa paljaat kohdat ja maalaa pintamaalin pensselillä. Arviokäynti on ilmainen.",
  },
  forssa: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Forssassa Loimijoen varrella",
    pinnoitusLocalHookText:
      "Forssa on Kanta-Hämeessä Loimijoen varrella. Käymme Forssassa säännöllisesti, vaikka matka Tampereelta on pitkä. Joen lähellä katto pysyy sateen jälkeen pitkään kosteana, ja kuluneella tiilellä sammal kasvaa nopeasti. Pinnoitamme tiilikattoja koko Forssassa, esimerkiksi keskustassa, Koijärvellä, Matkussa ja Vieremällä. Tulemme katsomaan kattosi ilmaiseksi.",
    maalausLocalHookTitle: "Talon maalaus Forssassa ja Lounais-Hämeessä",
    maalausLocalHookText:
      "Forssa on Kanta-Hämeessä Loimijoen varrella. Forssassa on paljon vanhoja puutaloja, jotka on maalattu jo monta kertaa. Silloin pohjatyöt ratkaisevat: irtoava maali kaavitaan pois ja paljaat kohdat pohjamaalataan ennen pintamaalia. Eemil maalaa taloja koko Forssassa, esimerkiksi keskustassa, Koijärvellä, Matkussa ja Kaukjärvellä. Arviokäynti on ilmainen.",
  },
  hameenlinna: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Hämeenlinnassa Vanajaveden rannalla",
    pinnoitusLocalHookText:
      "Hämeenlinna on Kanta-Hämeen keskus Vanajaveden rannalla. Käymme Hämeenlinnassa säännöllisesti. Veden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal tarttuu kuluneeseen tiileen helposti. Pinnoitamme tiilikattoja koko Hämeenlinnassa, esimerkiksi keskustassa, Iittalassa, Hauholla, Lammilla, Kalvolassa ja Rengossa. Tulemme katsomaan kattosi ilmaiseksi.",
    maalausLocalHookTitle: "Talon maalaus Hämeenlinnassa: keskustasta Lammille ja Hauholle",
    maalausLocalHookText:
      "Hämeenlinna on Kanta-Hämeen keskus Vanajaveden rannalla. Kaupunkiin liittyivät vuonna 2009 Hauho, Kalvola, Lammi, Renko ja Tuulos, joten alueella on paljon maaseudun puutaloja. Vanha puutalo kestää hyvin, kun maali pidetään kunnossa. Eemil maalaa taloja koko Hämeenlinnassa. Hän pesee seinät homepesuaineella, kaapii irtoavan maalin, pohjamaalaa paljaat kohdat ja maalaa pintamaalin pensselillä. Arviokäynti on ilmainen.",
  },
  huittinen: {
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Huittisissa Kokemäenjoen ja Loimijoen yhtymäkohdassa",
    pinnoitusLocalHookText:
      "Huittinen on Satakunnassa Pirkanmaan rajalla. Kaupunki on kohdassa, jossa Loimijoki laskee Kokemäenjokeen. Jokien lähellä ja avoimilla pelloilla katto saa sateen ja tuulen suoraan, ja kulunut tiili imee vettä. Pinnoitamme tiilikattoja koko Huittisissa, esimerkiksi Lauttakylässä, Vampulassa ja Suttilassa. Tulemme katsomaan kattosi ilmaiseksi.",
    maalausLocalHookTitle: "Talon maalaus Huittisissa: Lauttakylä ja Vampula",
    maalausLocalHookText:
      "Huittinen on Satakunnassa Pirkanmaan rajalla, ja käymme siellä säännöllisesti. Avoimilla peltomaisemilla viistosade osuu suoraan seinään, ja maali kuluu nopeammin kuin suojaisella tontilla. Eemil maalaa taloja koko Huittisissa, esimerkiksi Lauttakylässä, Vampulassa ja Suttilassa. Arviokäynti on ilmainen.",
  },
  kangasala: {
    maalausLocalHookTitle: "Talon maalaus Kangasalla: Vatiala, Ruutana ja Sahalahti",
    maalausLocalHookText:
      "Kangasala on Tampereen itäpuolella, ja Kangasalan kirkolta on Tampereelle 17 kilometriä. Noin neljännes kaupungin pinta-alasta on vettä. Veden lähellä seinät kuivuvat sateen jälkeen hitaasti, ja puuverhoukseen tulee helposti homepilkkuja. Ne pestään pois homepesuaineella ennen maalausta. Eemil maalaa taloja koko Kangasalla, esimerkiksi Vatialassa, Ruutanassa, Sahalahdella ja Kuhmalahdella. Arviokäynti on ilmainen.",
  },
  pirkkala: {
    maalausLocalHookTitle: "Talon maalaus Pirkkalassa, 10 kilometriä Tampereelta",
    maalausLocalHookText:
      "Pirkkala on Tampereen naapurikunta Pyhäjärven rannalla, ja Tampereelle on matkaa 10 kilometriä. Pirkkalassa on 774 omakoti- ja paritaloa 1970- ja 1980-luvuilta. Sen ikäinen puutalo on maalattu jo monta kertaa. Silloin irtoava maali kaavitaan pois ja paljaat kohdat pohjamaalataan ennen pintamaalia. Eemil maalaa taloja koko Pirkkalassa, esimerkiksi Nuolialassa, Toiviossa, Peressä ja Kurikassa. Arviokäynti on ilmainen.",
  },
};
