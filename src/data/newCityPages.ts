import type { CityData } from "./cityData";

/**
 * Lokakuussa 2026 lisättyjen kaupunkisivujen sisältö (tiilikaton pinnoitus ja talon maalaus).
 * Yhdistetään paikkakunnan perustietoihin tiedostossa cityData.ts.
 *
 * Paikkakuntafaktat (sijainti, järvet, taajamat) on tarkistettu julkisista lähteistä ja
 * talojen määrät Tilastokeskuksen rakennuskannasta 2025. Lähteet: docs/kaupunkisivut-lahteet.md.
 * Yrityksestä ei väitetä mitään uutta: vain toiminta-alue, ilmainen kuntotarkastus,
 * takuut (pinnoitus 5 v, maalaus 2 v) ja työvaiheet sivuston nykyisten tekstien mukaan.
 * Title ja description tuotetaan yhdestä mallista tiedostossa seo.ts.
 */

type Era = 1 | 2;

const era = (n: Era) => ({ uusiSivuEra: n });

export const newCityPages: Record<string, Partial<CityData>> = {
  // ───────────── Erä 1 ─────────────
  kangasala: {
    ...era(1),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Kangasalla: neljännes kaupungista on vettä",
    pinnoitusLocalHookText:
      "Kangasala on Tampereen itäpuolella. Noin neljännes kaupungin pinta-alasta on vettä, ja suurimmat järvet ovat Vesijärvi, Längelmävesi ja Roine. Veden ja puiden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Pinnoitamme tiilikattoja koko Kangasalla, myös Vatialassa, Ruutanassa, Sahalahdella ja Kuhmalahdella.",
  },
  pirkkala: {
    ...era(1),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Pirkkalassa, 10 kilometriä Tampereelta",
    pinnoitusLocalHookText:
      "Pirkkala on Tampereen naapurikunta Pyhäjärven rannalla, ja Tampereelle on matkaa 10 kilometriä. Pinnoitamme tiilikattoja koko Pirkkalassa. Asuinalueita ovat esimerkiksi Nuoliala, Toivio, Pere ja Kurikka.",
  },
  lempaala: {
    ...era(1),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Lempäälässä Vanajaveden ja Pyhäjärven välissä",
    pinnoitusLocalHookText:
      "Lempäälä on Tampereen eteläinen naapurikunta. Keskusta on kannaksella Vanajaveden ja Pyhäjärven välissä. Asutus jatkuu keskustasta yhtenäisenä Tampereen rajalle asti, esimerkiksi Kuljuun ja Sääksjärvelle.",
    maalausLocalHookTitle: "Talon maalaus Lempäälässä: Kulju, Sääksjärvi, Hakkari ja keskusta",
    maalausLocalHookText:
      "Lempäälä on Tampereen eteläinen naapurikunta, ja asutus jatkuu keskustasta yhtenäisenä Tampereen rajalle asti. Eemil maalaa taloja koko Lempäälässä, esimerkiksi Kuljussa, Sääksjärvellä ja Hakkarissa.",
  },
  valkeakoski: {
    ...era(1),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Valkeakoskella Mallasveden ja Vanajaveden välissä",
    pinnoitusLocalHookText:
      "Valkeakoski on 35 kilometriä Tampereelta etelään. Kaupunki on Mallasveden ja Vanajaveden yhtymäkohdassa, ja keskustan läpi kulkee kanava. Veden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Pinnoitamme tiilikattoja Valkeakosken keskustassa, Sääksmäellä ja Kärjenniemessä.",
    maalausLocalHookTitle: "Talon maalaus Valkeakoskella: joka kolmas talo on 1940- ja 1950-luvuilta",
    maalausLocalHookText:
      "Valkeakoski kasvoi paperi- ja selluloosatehtaiden ympärille. Eemil maalaa taloja Valkeakosken keskustassa, Sääksmäellä ja Kärjenniemessä.",
  },
  akaa: {
    ...era(1),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Akaassa: Toijala, Viiala ja Kylmäkoski",
    pinnoitusLocalHookText:
      "Akaa syntyi vuonna 2007, kun Toijala ja Viiala yhdistyivät. Kylmäkoski liittyi kaupunkiin vuonna 2011. Pinnoitamme tiilikattoja kaikissa kolmessa taajamassa ja niiden ympäristössä. Toijalasta on Tampereelle noin 41 kilometriä.",
    maalausLocalHookTitle: "Puutalon maalaus Toijalassa, Viialassa ja Kylmäkoskella",
    maalausLocalHookText:
      "Akaa syntyi vuonna 2007, kun Toijala ja Viiala yhdistyivät, ja Kylmäkoski liittyi kaupunkiin 2011. Akaassa on paljon vanhoja puutaloja. Eemil maalaa taloja Toijalassa, Viialassa ja Kylmäkoskella.",
  },
  orivesi: {
    ...era(1),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Orivedellä, yli 350 järven kaupungissa",
    pinnoitusLocalHookText:
      "Orivedeltä on Tampereelle noin 40 kilometriä. Kaupungissa on yli 350 järveä, ja maisemaa hallitsee Längelmävesi. Veden ja metsän lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Pinnoitamme tiilikattoja Oriveden keskustassa ja kylissä, esimerkiksi Eräjärvellä ja Hirsilässä.",
    maalausLocalHookTitle: "Talon maalaus Orivedellä: lähes puolet taloista on ajalta ennen 1960",
    maalausLocalHookText:
      "Orivedeltä on Tampereelle noin 40 kilometriä. Kaupungissa on yli 350 järveä, ja veden ja metsän lähellä seinät kuivuvat sateen jälkeen hitaasti. Eemil maalaa taloja Oriveden keskustassa ja kylissä, esimerkiksi Eräjärvellä ja Hirsilässä.",
  },

  // ───────────── Erä 2 ─────────────
  ikaalinen: {
    ...era(2),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Ikaalisissa Kyrösjärven rannalla",
    pinnoitusLocalHookText:
      "Ikaalisten keskusta on niemessä Kyrösjärven rannalla. Tampereelle on matkaa runsaat 50 kilometriä. Pinnoitamme tiilikattoja Ikaalisten keskustassa ja kylissä, esimerkiksi Kilvakkalassa.",
    maalausLocalHookTitle: "Talon maalaus Ikaalisissa: keskustasta Kilvakkalaan",
    maalausLocalHookText:
      "Ikaalisten keskusta on niemessä Kyrösjärven rannalla, ja Tampereelle on runsaat 50 kilometriä. Varjoisa seinä kuivuu hitaasti, ja siihen tulee helposti tummia homepilkkuja. Eemil maalaa taloja Ikaalisten keskustassa ja kylissä, esimerkiksi Kilvakkalassa.",
  },
  juupajoki: {
    ...era(2),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Juupajoella ja Korkeakoskella",
    pinnoitusLocalHookText:
      "Juupajoki on väkiluvultaan Pirkanmaan pienin kunta. Kunnan ainoa taajama on Korkeakoski, ja Tampereelle on matkaa 55 kilometriä. Pinnoitamme tiilikattoja Korkeakoskella ja kunnan kylissä.",
    maalausLocalHookTitle: "Talon maalaus Juupajoella: joka toinen talo on ajalta ennen 1960",
    maalausLocalHookText:
      "Juupajoki on Pirkanmaan pienin kunta, ja sen ainoa taajama on Korkeakoski. Juupajoella on paljon vanhoja puutaloja. Eemil maalaa taloja Korkeakoskella ja muualla Juupajoella.",
  },
  kihnio: {
    ...era(2),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Kihniössä Sulkuejärven rannalla",
    pinnoitusLocalHookText:
      "Kihniö on Pirkanmaan pohjoisosassa. Kirkonkylä on Sulkuejärven rannalla valtatien 23 varrella. Pinnoitamme tiilikattoja kirkonkylässä ja kunnan kylissä.",
    maalausLocalHookTitle: "Talon maalaus Kihniössä: kirkonkylä, Nerkoo ja Linnankylä",
    maalausLocalHookText:
      "Kihniö on Pirkanmaan pohjoisosassa, ja kirkonkylä on Sulkuejärven rannalla. Eemil maalaa taloja kirkonkylässä ja kylissä, esimerkiksi Nerkoossa ja Linnankylässä.",
  },
  "mantta-vilppula": {
    ...era(2),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Mäntässä, Vilppulassa ja Kolhossa",
    pinnoitusLocalHookText:
      "Mänttä-Vilppula syntyi vuonna 2009, kun Mänttä ja Vilppula yhdistyivät. Mäntän keskusta on kannaksella Keurusselän ja Kuoreveden välissä. Kaupungissa on 3 096 omakoti- ja paritaloa. Niistä 928 on rakennettu 1970- ja 1980-luvuilla, ja uusia taloja on vähän. Kun tiilen pinta on kulunut, tiili imee vettä ja sammal tarttuu siihen. Pinnoitamme tiilikattoja Mäntässä, Vilppulassa, Kolhossa ja Pohjaslahdella.",
    maalausLocalHookTitle: "Talon maalaus Mäntässä, Vilppulassa, Kolhossa ja Pohjaslahdella",
    maalausLocalHookText:
      "Mänttä-Vilppula on kasvanut metsäteollisuuden ympärille. Eemil maalaa taloja Mäntässä, Vilppulassa, Kolhossa ja Pohjaslahdella.",
  },
  parkano: {
    ...era(2),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Parkanossa: 881 taloa 1970- ja 1980-luvuilta",
    pinnoitusLocalHookText:
      "Parkano on valtateiden 3 ja 23 risteyksessä, noin tunnin matkan päässä Tampereelta. Kaupungin pinta-alasta 65 prosenttia on metsää. Puiden varjossa katto kuivuu hitaasti, ja sammal viihtyy kosteassa.",
    maalausLocalHookTitle: "Talon maalaus Parkanossa metsien keskellä",
    maalausLocalHookText:
      "Parkanon pinta-alasta 65 prosenttia on metsää. Puiden varjossa seinä kuivuu hitaasti, ja siihen tulee helposti tummia homepilkkuja. Eemil maalaa taloja Parkanon keskustassa ja kylissä. Kuvia kohteestamme Parkanossa näet tältä sivulta.",
  },
  palkane: {
    ...era(2),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Pälkäneellä: Onkkaala, Luopioinen ja Aitoo",
    pinnoitusLocalHookText:
      "Pälkäneeltä on Tampereelle 35 kilometriä. Kunnan keskusta Onkkaala on kannaksella Pälkäneveden ja Mallasveden välissä. Veden lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Pinnoitamme tiilikattoja Onkkaalassa, Luopioisissa ja Aitoossa.",
    maalausLocalHookTitle: "Talon maalaus Pälkäneellä: Onkkaalasta Luopioisiin",
    maalausLocalHookText:
      "Pälkäneeltä on Tampereelle 35 kilometriä, ja kunnan keskusta Onkkaala on kannaksella Pälkäneveden ja Mallasveden välissä. Pälkäneellä on paljon vanhoja puutaloja. Eemil maalaa taloja Onkkaalassa, Luopioisissa ja Aitoossa.",
  },
  ruovesi: {
    ...era(2),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Ruovedellä, Visuvedellä ja Jäminkipohjassa",
    pinnoitusLocalHookText:
      "Ruoveden kirkonkylä on Näsijärven Ruoveden rannalla. Tampereen keskustaan on matkaa 73 kilometriä. Veden ja metsän lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Pinnoitamme tiilikattoja kirkonkylässä, Visuvedellä ja Jäminkipohjassa.",
    maalausLocalHookTitle: "Talon maalaus Ruovedellä: yli puolet taloista on ajalta ennen 1960",
    maalausLocalHookText:
      "Ruoveden kirkonkylä on Näsijärven Ruoveden rannalla, ja Tampereen keskustaan on matkaa 73 kilometriä. Ruovedellä on paljon vanhoja puutaloja. Eemil maalaa taloja kirkonkylässä, Visuvedellä ja Jäminkipohjassa.",
  },
  urjala: {
    ...era(2),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Urjalassa valtatie 9:n varrella",
    pinnoitusLocalHookText:
      "Urjala on valtatie 9:n varrella, ja Tampereelle on matkaa 60 kilometriä. Kunnan ainoa taajama on kirkonkylä, ja yli puolet asukkaista asuu sen ulkopuolella. Pinnoitamme tiilikattoja kirkonkylässä ja kylissä, esimerkiksi Nuutajärvellä ja Huhdissa.",
    maalausLocalHookTitle: "Talon maalaus Urjalassa: toiminta-alueemme vanhimmat talot",
    maalausLocalHookText:
      "Urjala on valtatie 9:n varrella, ja Tampereelle on matkaa 60 kilometriä. Urjalassa on paljon vanhoja puutaloja, ja yli puolet asukkaista asuu kirkonkylän ulkopuolella. Eemil maalaa taloja Urjalan kirkonkylässä ja kylissä, esimerkiksi Nuutajärvellä ja Huhdissa.",
  },
  vesilahti: {
    ...era(2),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Vesilahdella Pyhäjärven rannalla",
    pinnoitusLocalHookText:
      "Vesilahti on Pyhäjärven etelä- ja kaakkoisrannalla, noin 30 kilometriä Tampereelta lounaaseen. Pinnoitamme tiilikattoja kirkonkylässä, Narvassa ja Koskenkylässä.",
    maalausLocalHookTitle: "Talon maalaus Vesilahdella: kirkonkylä, Narva ja Koskenkylä",
    maalausLocalHookText:
      "Vesilahti on noin 30 kilometriä Tampereelta lounaaseen. Eemil maalaa taloja kirkonkylässä, Narvassa ja Koskenkylässä.",
  },
  virrat: {
    ...era(2),
    pinnoitusLocalHookTitle: "Tiilikaton pinnoitus Virroilla, 269 järven kaupungissa",
    pinnoitusLocalHookText:
      "Virroilla on 269 järveä, ja asutus on keskittynyt järvien rannoille. Veden ja metsän lähellä katto pysyy sateen jälkeen pitkään kosteana, ja sammal viihtyy kosteassa. Pinnoitamme tiilikattoja Virtain keskustassa ja kylissä, esimerkiksi Killinkoskella ja Vaskivedellä.",
    maalausLocalHookTitle: "Talon maalaus Virroilla: keskusta, Killinkoski ja Vaskivesi",
    maalausLocalHookText:
      "Virroilla asutus on keskittynyt järvien rannoille, ja metsää on paljon. Varjoisa seinä kuivuu hitaasti, ja siihen tulee helposti tummia homepilkkuja. Eemil maalaa taloja Virtain keskustassa ja kylissä, esimerkiksi Killinkoskella ja Vaskivedellä.",
  },
};
