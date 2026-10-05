import type { CityData } from "./cityData";

/**
 * Lokakuussa 2026 lisättyjen kaupunkisivujen sisältö (tiilikaton pinnoitus ja talon maalaus).
 * Yhdistetään paikkakunnan perustietoihin tiedostossa cityData.ts.
 *
 * Paikkakuntafaktat (sijainti, järvet, taajamat) on tarkistettu julkisista lähteistä ja
 * talojen määrät Tilastokeskuksen rakennuskannasta 2025. Lähteet: docs/kaupunkisivut-lahteet.md.
 * Yrityksestä ei väitetä mitään uutta: vain toiminta-alue, ilmainen kuntotarkastus,
 * takuut (pinnoitus 5 v, maalaus 2 v) ja työvaiheet sivuston nykyisten tekstien mukaan.
 */

type Era = 1 | 2;

const pinnoitusMeta = (name: string, cityIn: string, paikat?: string) => ({
  pinnoitusMetaTitle: `Tiilikaton pinnoitus ${name} | Hinta 2 850–7 000 €`,
  pinnoitusMetaDesc: `Tiilikaton pinnoitus ${cityIn}${paikat ? `: ${paikat}` : ""}. Yrittäjä tekee työn itse. Ilmainen kuntotarkastus, 5 v takuu ja kotitalousvähennys. Hinta 2 850–7 000 €.`,
});

const maalausMeta = (name: string, cityIn: string, paikat?: string) => ({
  maalausMetaTitle: `Talon maalaus ${name} | Hintalaskuri | Pintanen`,
  maalausMetaDesc: `Talon maalaus ${cityIn}${paikat ? `: ${paikat}` : ""}. Eemil tekee työn itse pensselillä. Ilmainen arviokäynti, 2 v takuu ja kotitalousvähennys.`,
});

const era = (n: Era) => ({ uusiSivuEra: n });

export const newCityPages: Record<string, Partial<CityData>> = {
  // ───────────── Erä 1 ─────────────
  kangasala: {
    ...era(1),
    ...pinnoitusMeta("Kangasala", "Kangasalla", "Vatiala, Ruutana ja Sahalahti"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Kangasalla: neljännes kaupungista on vettä",
    pinnoitusLocalHookText:
      "Kangasala on Tampereen itäpuolella. Kangasalan kirkolta on Tampereelle 17 kilometriä. Noin neljännes kaupungin pinta-alasta on vettä, ja suurimmat järvet ovat Vesijärvi, Längelmävesi ja Roine. Veden ja puiden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Teemme tiilikaton pinnoituksia koko Kangasalla, myös Vatialassa, Ruutanassa, Sahalahdella ja Kuhmalahdella. Tulemme katsomaan kattosi ilmaiseksi.",
  },
  pirkkala: {
    ...era(1),
    ...pinnoitusMeta("Pirkkala", "Pirkkalassa", "Nuoliala, Toivio, Pere ja Kurikka"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Pirkkalassa, 10 kilometriä Tampereelta",
    pinnoitusLocalHookText:
      "Pirkkala on Tampereen naapurikunta Pyhäjärven rannalla, ja Tampereelle on matkaa 10 kilometriä. Pirkkalassa on 3 223 omakoti- ja paritaloa. Niistä 774 on rakennettu 1970- ja 1980-luvuilla ja 597 vuosina 2000–2009. Kun tiilen tehdaspinta kuluu, tiili alkaa imeä vettä ja sammal tarttuu siihen. Teemme tiilikaton pinnoituksia koko Pirkkalassa. Tuttuja asuinalueita ovat esimerkiksi Nuoliala, Toivio, Pere ja Kurikka. Tulemme katsomaan kattosi ilmaiseksi.",
  },
  lempaala: {
    ...era(1),
    ...pinnoitusMeta("Lempäälä", "Lempäälässä", "keskusta, Kulju ja Sääksjärvi"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Lempäälässä Vanajaveden ja Pyhäjärven välissä",
    pinnoitusLocalHookText:
      "Lempäälä on Tampereen eteläinen naapurikunta. Keskusta on kannaksella Vanajaveden ja Pyhäjärven välissä. Asutus jatkuu keskustasta yhtenäisenä Tampereen rajalle asti, esimerkiksi Kuljuun ja Sääksjärvelle. Lempäälässä on paljon melko uusia taloja: yli kolmasosa omakoti- ja paritaloista on rakennettu vuonna 2000 tai sen jälkeen. 2000-luvun alun tiilikatoissa tehdaspinta alkaa nyt kulua. Tulemme katsomaan kattosi ilmaiseksi ja kerromme, tarvitseeko se jo pinnoituksen.",
    ...maalausMeta("Lempäälä", "Lempäälässä", "keskusta, Kulju ja Sääksjärvi"),
    maalausLocalHookTitle: "Talon maalaus Lempäälässä: Kulju, Sääksjärvi, Hakkari ja keskusta",
    maalausLocalHookText:
      "Lempäälä on Tampereen eteläinen naapurikunta, ja asutus jatkuu keskustasta yhtenäisenä Tampereen rajalle asti. Eemil maalaa taloja koko Lempäälässä, esimerkiksi Kuljussa, Sääksjärvellä ja Hakkarissa. Lempäälässä on 1 026 omakoti- ja paritaloa, jotka on rakennettu vuosina 2000–2009. Puutalo maalataan yleensä 10–15 vuoden välein. Jos sen ikäistä taloa ei ole vielä maalattu uudelleen, seinät kannattaa katsoa läpi. Arviokäynti on ilmainen.",
  },
  valkeakoski: {
    ...era(1),
    ...pinnoitusMeta("Valkeakoski", "Valkeakoskella", "keskusta ja Sääksmäki"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Valkeakoskella Mallasveden ja Vanajaveden välissä",
    pinnoitusLocalHookText:
      "Valkeakoski on 35 kilometriä Tampereelta etelään. Kaupunki on Mallasveden ja Vanajaveden yhtymäkohdassa, ja keskustan läpi kulkee kanava. Veden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Kun tiilen pinta on kulunut, sammal tarttuu siihen helposti. Teemme tiilikaton pinnoituksia Valkeakosken keskustassa, Sääksmäellä ja Kärjenniemessä. Kuntotarkastus on ilmainen.",
    ...maalausMeta("Valkeakoski", "Valkeakoskella", "keskusta ja Sääksmäki"),
    maalausLocalHookTitle: "Talon maalaus Valkeakoskella: joka kolmas talo on 1940- ja 1950-luvuilta",
    maalausLocalHookText:
      "Valkeakoski kasvoi paperi- ja selluloosatehtaiden ympärille. Kaupungin 4 827 omakoti- ja paritalosta 1 579 on rakennettu vuosina 1940–1959, eli joka kolmas. Osuus on suurempi kuin missään muussa toiminta-alueemme kunnassa. Sen ikäinen puutalo on maalattu jo monta kertaa. Silloin pohjatyöt ratkaisevat: irtoava maali kaavitaan pois ennen uutta maalia. Eemil maalaa taloja Valkeakosken keskustassa, Sääksmäellä ja Kärjenniemessä. Arviokäynti on ilmainen.",
  },
  akaa: {
    ...era(1),
    ...pinnoitusMeta("Akaa", "Akaassa", "Toijala, Viiala ja Kylmäkoski"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Akaassa: Toijala, Viiala ja Kylmäkoski",
    pinnoitusLocalHookText:
      "Akaa syntyi vuonna 2007, kun Toijala ja Viiala yhdistyivät. Kylmäkoski liittyi kaupunkiin vuonna 2011. Teemme tiilikaton pinnoituksia kaikissa kolmessa taajamassa ja niiden ympäristössä. Toijalasta on Tampereelle noin 41 kilometriä. Tulemme ensin katsomaan kattosi, ja käynti on ilmainen. Katsomme tiilet, aluskatteen ja läpiviennit. Sen jälkeen kerromme suoraan, riittääkö pinnoitus.",
    ...maalausMeta("Akaa", "Akaassa", "Toijala, Viiala ja Kylmäkoski"),
    maalausLocalHookTitle: "Puutalon maalaus Toijalassa, Viialassa ja Kylmäkoskella",
    maalausLocalHookText:
      "Akaassa on paljon vanhoja taloja. Kaupungin 4 998 omakoti- ja paritalosta 2 179 on rakennettu ennen vuotta 1960. Vanha puutalo kestää hyvin, kun maali pidetään kunnossa. Eemil maalaa taloja Toijalassa, Viialassa ja Kylmäkoskella. Hän pesee seinät homepesuaineella, kaapii irtoavan maalin, pohjamaalaa paljaat puukohdat ja maalaa pintamaalin pensselillä. Arviokäynti on ilmainen.",
  },
  orivesi: {
    ...era(1),
    ...pinnoitusMeta("Orivesi", "Orivedellä", "keskusta, Eräjärvi ja Hirsilä"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Orivedellä, yli 350 järven kaupungissa",
    pinnoitusLocalHookText:
      "Orivedeltä on Tampereelle noin 40 kilometriä. Kaupungissa on yli 350 järveä, ja maisemaa hallitsee Längelmävesi. Veden ja metsän lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Kun tiilen pinta on kulunut, sammal tarttuu siihen helposti. Teemme tiilikaton pinnoituksia Oriveden keskustassa ja kylissä, esimerkiksi Eräjärvellä ja Hirsilässä. Kuvia kohteistamme Orivedellä näet tältä sivulta.",
    ...maalausMeta("Orivesi", "Orivedellä", "keskusta, Eräjärvi ja Hirsilä"),
    maalausLocalHookTitle: "Talon maalaus Orivedellä: lähes puolet taloista on ajalta ennen 1960",
    maalausLocalHookText:
      "Orivedellä on 3 260 omakoti- ja paritaloa. Niistä 1 548 on rakennettu ennen vuotta 1960, eli lähes puolet. Vanha puutalo kestää hyvin, kun maali pidetään kunnossa. Eemil maalaa taloja Oriveden keskustassa ja kylissä, esimerkiksi Eräjärvellä ja Hirsilässä. Hän tulee ensin katsomaan seinät ja kertoo, paljonko pohjatöitä ne tarvitsevat. Käynti on ilmainen, ja Orivedeltä on Tampereelle vain noin 40 kilometriä.",
  },

  // ───────────── Erä 2 ─────────────
  ikaalinen: {
    ...era(2),
    ...pinnoitusMeta("Ikaalinen", "Ikaalisissa", "keskusta ja kylät"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Ikaalisissa Kyrösjärven rannalla",
    pinnoitusLocalHookText:
      "Ikaalisten keskusta on niemessä Kyrösjärven rannalla. Tampereelle on matkaa runsaat 50 kilometriä. Ikaalisissa on 2 812 omakoti- ja paritaloa, ja niistä 760 on rakennettu 1970- ja 1980-luvuilla. Kun tiilen pinta kuluu, tiili alkaa imeä vettä ja sammal tarttuu siihen. Teemme tiilikaton pinnoituksia Ikaalisten keskustassa ja kylissä, esimerkiksi Kilvakkalassa. Tulemme katsomaan kattosi ilmaiseksi.",
    ...maalausMeta("Ikaalinen", "Ikaalisissa", "keskusta ja kylät"),
    maalausLocalHookTitle: "Talon maalaus Ikaalisissa: keskustasta Kilvakkalaan",
    maalausLocalHookText:
      "Eemil maalaa taloja Ikaalisten keskustassa ja kylissä, esimerkiksi Kilvakkalassa. Keskusta on niemessä Kyrösjärven rannalla, ja Tampereelle on runsaat 50 kilometriä. Varjoisa seinä kuivuu hitaasti, ja siihen tulee helposti tummia homepilkkuja. Siksi pesemme seinät aina homepesuaineella ennen maalausta. Arviokäynti Ikaalisissa on ilmainen.",
  },
  juupajoki: {
    ...era(2),
    ...pinnoitusMeta("Juupajoki", "Juupajoella", "Korkeakoski ja kylät"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Juupajoella ja Korkeakoskella",
    pinnoitusLocalHookText:
      "Juupajoki on väkiluvultaan Pirkanmaan pienin kunta. Kunnan ainoa taajama on Korkeakoski, ja Tampereelle on matkaa 55 kilometriä. Juupajoella on 797 omakoti- ja paritaloa. Tulemme Juupajoelle samalla tavalla kuin lähemmäskin. Kuntotarkastus on ilmainen, ja teemme työn itse alusta loppuun. Tiilikaton pinnoitukselle saat 5 vuoden kirjallisen takuun.",
    ...maalausMeta("Juupajoki", "Juupajoella", "Korkeakoski ja kylät"),
    maalausLocalHookTitle: "Talon maalaus Juupajoella: joka toinen talo on ajalta ennen 1960",
    maalausLocalHookText:
      "Juupajoella on paljon vanhoja taloja. Kunnan 797 omakoti- ja paritalosta 418 on rakennettu ennen vuotta 1960. Vanha puutalo kestää hyvin, kun maali pidetään kunnossa. Eemil pesee seinät homepesuaineella, kaapii irtoavan maalin, pohjamaalaa paljaat puukohdat ja maalaa pintamaalin pensselillä. Arviokäynti Korkeakoskella ja muualla Juupajoella on ilmainen.",
  },
  kihnio: {
    ...era(2),
    ...pinnoitusMeta("Kihniö", "Kihniössä", "kirkonkylä, Nerkoo ja Linnankylä"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Kihniössä Sulkuejärven rannalla",
    pinnoitusLocalHookText:
      "Kihniö on Pirkanmaan pohjoisosassa. Kirkonkylä on Sulkuejärven rannalla valtatien 23 varrella. Kihniössä on 892 omakoti- ja paritaloa. Niistä 279 on rakennettu 1970- ja 1980-luvuilla, ja 2000-luvulla taloja on rakennettu vähän. Tulemme myös Kihniöön. Kuntotarkastus on ilmainen, ja saat tarjouksen käynnin jälkeen.",
    ...maalausMeta("Kihniö", "Kihniössä", "kirkonkylä, Nerkoo ja Linnankylä"),
    maalausLocalHookTitle: "Talon maalaus Kihniössä: kirkonkylä, Nerkoo ja Linnankylä",
    maalausLocalHookText:
      "Kihniö on Pirkanmaan pohjoisosassa, ja kirkonkylä on Sulkuejärven rannalla. Eemil maalaa taloja kirkonkylässä ja kylissä, esimerkiksi Nerkoossa ja Linnankylässä. Kihniön 892 omakoti- ja paritalosta lähes kaikki on rakennettu ennen vuotta 2010. Puutalo maalataan yleensä 10–15 vuoden välein, joten moni talo on jo maalattu ainakin kerran uudelleen. Arviokäynti on ilmainen.",
  },
  "mantta-vilppula": {
    ...era(2),
    ...pinnoitusMeta("Mänttä-Vilppula", "Mänttä-Vilppulassa", "Mänttä, Vilppula ja Kolho"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Mäntässä, Vilppulassa ja Kolhossa",
    pinnoitusLocalHookText:
      "Mänttä-Vilppula syntyi vuonna 2009, kun Mänttä ja Vilppula yhdistyivät. Mäntän keskusta on kannaksella Keurusselän ja Kuoreveden välissä. Kaupungissa on 3 096 omakoti- ja paritaloa. Niistä 928 on rakennettu 1970- ja 1980-luvuilla, ja uusia taloja on vähän. Kun tiilen pinta on kulunut, tiili imee vettä ja sammal tarttuu siihen. Teemme tiilikaton pinnoituksia Mäntässä, Vilppulassa, Kolhossa ja Pohjaslahdella.",
    ...maalausMeta("Mänttä-Vilppula", "Mänttä-Vilppulassa", "Mänttä, Vilppula ja Kolho"),
    maalausLocalHookTitle: "Talon maalaus Mäntässä, Vilppulassa, Kolhossa ja Pohjaslahdella",
    maalausLocalHookText:
      "Mänttä-Vilppula on kasvanut metsäteollisuuden ympärille. Kaupungin 3 096 omakoti- ja paritalosta 1 375 on rakennettu ennen vuotta 1960. Vanha puutalo kestää hyvin, kun maali pidetään kunnossa. Eemil maalaa taloja Mäntässä, Vilppulassa, Kolhossa ja Pohjaslahdella. Hän tulee ensin katsomaan seinät ja kertoo, paljonko pohjatöitä ne tarvitsevat. Käynti on ilmainen.",
  },
  parkano: {
    ...era(2),
    ...pinnoitusMeta("Parkano", "Parkanossa", "keskusta ja kylät"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Parkanossa: 881 taloa 1970- ja 1980-luvuilta",
    pinnoitusLocalHookText:
      "Parkano on valtateiden 3 ja 23 risteyksessä, noin tunnin matkan päässä Tampereelta. Kaupungin pinta-alasta 65 prosenttia on metsää. Puiden varjossa katto kuivuu hitaasti, ja sammal viihtyy kosteassa. Parkanossa on 2 330 omakoti- ja paritaloa, ja niistä 881 on rakennettu 1970- ja 1980-luvuilla. Osuus on suurempi kuin missään muussa toiminta-alueemme kunnassa. Tulemme katsomaan kattosi ilmaiseksi.",
    ...maalausMeta("Parkano", "Parkanossa", "keskusta ja kylät"),
    maalausLocalHookTitle: "Talon maalaus Parkanossa metsien keskellä",
    maalausLocalHookText:
      "Parkanon pinta-alasta 65 prosenttia on metsää. Puiden varjossa seinä kuivuu hitaasti, ja siihen tulee helposti tummia homepilkkuja. Siksi pesemme seinät aina homepesuaineella ennen maalausta. Kuvia kohteestamme Parkanossa näet tältä sivulta. Eemil tulee katsomaan talosi ilmaiseksi, ja saat kirjallisen tarjouksen käynnin jälkeen.",
  },
  palkane: {
    ...era(2),
    ...pinnoitusMeta("Pälkäne", "Pälkäneellä", "Onkkaala, Luopioinen ja Aitoo"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Pälkäneellä: Onkkaala, Luopioinen ja Aitoo",
    pinnoitusLocalHookText:
      "Pälkäneeltä on Tampereelle 35 kilometriä. Kunnan keskusta Onkkaala on kannaksella Pälkäneveden ja Mallasveden välissä. Veden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Kun tiilen pinta on kulunut, sammal tarttuu siihen helposti. Teemme tiilikaton pinnoituksia Onkkaalassa, Luopioisissa ja Aitoossa. Tulemme katsomaan kattosi ilmaiseksi.",
    ...maalausMeta("Pälkäne", "Pälkäneellä", "Onkkaala, Luopioinen ja Aitoo"),
    maalausLocalHookTitle: "Talon maalaus Pälkäneellä: Onkkaalasta Luopioisiin",
    maalausLocalHookText:
      "Pälkäneellä on 2 813 omakoti- ja paritaloa, ja niistä 1 281 on rakennettu ennen vuotta 1960. Vanha puutalo kestää hyvin, kun maali pidetään kunnossa. Eemil maalaa taloja Onkkaalassa, Luopioisissa ja Aitoossa. Hän pesee seinät homepesuaineella, kaapii irtoavan maalin, pohjamaalaa paljaat puukohdat ja maalaa pintamaalin pensselillä. Pälkäneeltä on Tampereelle vain 35 kilometriä, ja arviokäynti on ilmainen.",
  },
  ruovesi: {
    ...era(2),
    ...pinnoitusMeta("Ruovesi", "Ruovedellä", "kirkonkylä, Visuvesi ja Jäminkipohja"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Ruovedellä, Visuvedellä ja Jäminkipohjassa",
    pinnoitusLocalHookText:
      "Ruoveden kirkonkylä on Näsijärven Ruoveden rannalla. Tampereen keskustaan on matkaa 73 kilometriä. Veden ja metsän lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Kun tiilen pinta on kulunut, sammal tarttuu siihen helposti. Teemme tiilikaton pinnoituksia kirkonkylässä, Visuvedellä ja Jäminkipohjassa. Kuntotarkastus on ilmainen, ja pinnoitukselle saat 5 vuoden kirjallisen takuun.",
    ...maalausMeta("Ruovesi", "Ruovedellä", "kirkonkylä, Visuvesi ja Jäminkipohja"),
    maalausLocalHookTitle: "Talon maalaus Ruovedellä: yli puolet taloista on ajalta ennen 1960",
    maalausLocalHookText:
      "Ruovedellä on 1 929 omakoti- ja paritaloa. Niistä 1 005 on rakennettu ennen vuotta 1960, eli yli puolet. Vanha puutalo kestää hyvin, kun maali pidetään kunnossa. Eemil maalaa taloja kirkonkylässä, Visuvedellä ja Jäminkipohjassa. Hän tulee ensin katsomaan seinät ja kertoo, paljonko pohjatöitä ne tarvitsevat. Käynti on ilmainen.",
  },
  urjala: {
    ...era(2),
    ...pinnoitusMeta("Urjala", "Urjalassa", "kirkonkylä, Nuutajärvi ja Huhti"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Urjalassa valtatie 9:n varrella",
    pinnoitusLocalHookText:
      "Urjala on valtatie 9:n varrella, ja Tampereelle on matkaa 60 kilometriä. Kunnan ainoa taajama on kirkonkylä, ja yli puolet asukkaista asuu sen ulkopuolella. Teemme tiilikaton pinnoituksia kirkonkylässä ja kylissä, esimerkiksi Nuutajärvellä ja Huhdissa. Tulemme ensin katsomaan kattosi, ja käynti on ilmainen. Katsomme tiilet, aluskatteen ja läpiviennit. Sen jälkeen kerromme suoraan, riittääkö pinnoitus.",
    ...maalausMeta("Urjala", "Urjalassa", "kirkonkylä, Nuutajärvi ja Huhti"),
    maalausLocalHookTitle: "Talon maalaus Urjalassa: toiminta-alueemme vanhimmat talot",
    maalausLocalHookText:
      "Urjalassa on 2 216 omakoti- ja paritaloa, ja niistä 1 237 on rakennettu ennen vuotta 1960. Osuus on suurempi kuin missään muussa toiminta-alueemme kunnassa. Vanha puutalo kestää hyvin, kun maali pidetään kunnossa. Eemil maalaa taloja Urjalan kirkonkylässä ja kylissä, esimerkiksi Nuutajärvellä ja Huhdissa. Arviokäynti on ilmainen.",
  },
  vesilahti: {
    ...era(2),
    ...pinnoitusMeta("Vesilahti", "Vesilahdella", "kirkonkylä, Narva ja Koskenkylä"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Vesilahdella Pyhäjärven rannalla",
    pinnoitusLocalHookText:
      "Vesilahti on Pyhäjärven etelä- ja kaakkoisrannalla, noin 30 kilometriä Tampereelta lounaaseen. Vesilahdella on paljon melko uusia taloja: yli kolmasosa omakoti- ja paritaloista on rakennettu vuonna 2000 tai sen jälkeen. 2000-luvun alun tiilikatoissa tehdaspinta alkaa nyt kulua. Teemme tiilikaton pinnoituksia kirkonkylässä, Narvassa ja Koskenkylässä. Tulemme katsomaan kattosi ilmaiseksi ja kerromme, tarvitseeko se jo pinnoituksen.",
    ...maalausMeta("Vesilahti", "Vesilahdella", "kirkonkylä, Narva ja Koskenkylä"),
    maalausLocalHookTitle: "Talon maalaus Vesilahdella: kirkonkylä, Narva ja Koskenkylä",
    maalausLocalHookText:
      "Vesilahti on noin 30 kilometriä Tampereelta lounaaseen. Vesilahdella on 358 omakoti- ja paritaloa, jotka on rakennettu vuosina 2000–2009. Puutalo maalataan yleensä 10–15 vuoden välein. Jos sen ikäistä taloa ei ole vielä maalattu uudelleen, seinät kannattaa katsoa läpi. Eemil maalaa taloja kirkonkylässä, Narvassa ja Koskenkylässä. Arviokäynti on ilmainen.",
  },
  virrat: {
    ...era(2),
    ...pinnoitusMeta("Virrat", "Virroilla", "keskusta, Killinkoski ja Vaskivesi"),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Virroilla, 269 järven kaupungissa",
    pinnoitusLocalHookText:
      "Virroilla on 269 järveä, ja asutus on keskittynyt järvien rannoille. Veden ja metsän lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Virroilla on 2 469 omakoti- ja paritaloa, ja niistä 672 on rakennettu 1970- ja 1980-luvuilla. Teemme tiilikaton pinnoituksia Virtain keskustassa ja kylissä, esimerkiksi Killinkoskella ja Vaskivedellä. Kuntotarkastus on ilmainen.",
    ...maalausMeta("Virrat", "Virroilla", "keskusta, Killinkoski ja Vaskivesi"),
    maalausLocalHookTitle: "Talon maalaus Virroilla: keskusta, Killinkoski ja Vaskivesi",
    maalausLocalHookText:
      "Virroilla asutus on keskittynyt järvien rannoille, ja metsää on paljon. Varjoisa seinä kuivuu hitaasti, ja siihen tulee helposti tummia homepilkkuja. Siksi pesemme seinät aina homepesuaineella ennen maalausta. Eemil maalaa taloja Virtain keskustassa ja kylissä, esimerkiksi Killinkoskella ja Vaskivedellä. Arviokäynti on ilmainen, ja saat kirjallisen tarjouksen käynnin jälkeen.",
  },
};
