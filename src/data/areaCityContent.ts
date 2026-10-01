/**
 * Aluekohtaiset Local Hook -tekstit ja metatiedot kaikille 24 kaupungille.
 * Nämä yhdistetään cityData.ts:n dataan ServiceAreaPage-templatessa.
 */

export interface AreaCityContent {
  slug: string;
  alueMetaTitle: string;
  alueMetaDesc: string;
  alueLocalHookTitle: string;
  alueLocalHookText: string;
}

export const areaCityContent: AreaCityContent[] = [
  {
    slug: "tampere",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Tampere | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Tampereella. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Näsijärven ja Pyhäjärven kosteuden vaikutus Tampereen kiinteistöihin",
    alueLocalHookText: "Tampereen sijainti kahden suuren järven välissä ja harjumaisemien tuomat korkeuserot koettelevat talojen ulkopintoja. Ilmankosteus saa betonitiilikattojen pinnan kulumaan nopeasti, ja se luo ihanteelliset olosuhteet puuverhouksen homepilkuille. Ennakoiva katon pinnoitus ja asiantunteva talon ulkomaalaus pitävät Tampereen vaihtelevan sään aiheuttaman pakkasrapautumisen ja lahoamisen loitolla.",
  },
  {
    slug: "sastamala",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Sastamala | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Sastamalassa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Kiinteistöjen suojaaminen Sastamalan järvimaisemien säärasituksilta",
    alueLocalHookText: "Sastamalan historialliset maisemat Rautaveden ja Liekoveden rannoilla ovat upeita, mutta laajat vesistöt tuovat mukanaan kosteusrasitusta koko kiinteistön ulkokuorelle. Kosteus pitää katot märkinä, houkutellen sammalta, ja järvituuli puskee viistosateen suoraan puujulkisivuihin, heikentäen maalin tartuntaa. Säännöllinen huoltomaalaus ja tiilikaton pinnoitus ovat Sastamalassa elintärkeä sijoitus kotisi rakenteiden säilymiselle.",
  },
  {
    slug: "hameenkyro",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Hämeenkyrö | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Hämeenkyrössä. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Hämeenkyrön kansallismaisemien vaatima säänkestävyys koteihin",
    alueLocalHookText: "Hämeenkyrön laajat viljelysaukeat ja Kyrösjärven läheisyys altistavat pientalot suoralle tuulelle ja rankoille sateille. Esteettömässä maastossa tiilikaton pinta ja puuverhouksen maalikerros kuluvat mekaanisesti nopeammin, mikä avaa oven kosteusvaurioille. Pintasen toteuttama huoltomaalaus ja katon suojapinnoitus palauttavat kiinteistösi vedenhylkivyyden ja säilyttävät sen arvon.",
  },
  {
    slug: "ylojarvi",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Ylöjärvi | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Ylöjärvellä. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Ylöjärven metsäisten asuinalueiden kattojen ja julkisivujen suojaus",
    alueLocalHookText: "Ylöjärvellä asuinalueet sijaitsevat usein aivan metsän reunassa tai Näsijärven rantamaisemissa. Puiden varjostus hidastaa rakenteiden kuivumista sateen jälkeen, mikä kiihdyttää katon sammaloitumista ja julkisivulaudoituksen mikrobikasvustoa. Oikeaoppinen homepesu, ulkoverhouksen maalaus ja katon pinnoitus varmistavat, ettei Ylöjärven vehreä luonto pääse rapauttamaan kotisi suojakuorta.",
  },
  {
    slug: "nokia",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Nokia | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Nokialla. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Nokianvirran alueen pientalojen elinkaaren maksimointi",
    alueLocalHookText: "Nokian asuinalueet levittäytyvät Nokianvirran ja Pyhäjärven vaikutuspiirissä, missä jokilaakson ilmankosteus koettelee jatkuvasti talojen ulkopintoja. Veden imeytyminen huokoistuneeseen tiileen ja halkeilevaan ulkoverhoukseen on suurin syy ennenaikaisiin remontteihin. Fiksusti ennakoivat asunnonomistajat valitsevat Nokialla ajoissa tehdyn ammattitason maalauksen ja katon pinnoituksen pitääkseen kosteuden ulkopuolella.",
  },
  {
    slug: "forssa",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Forssa | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Forssassa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Forssan ja Lounais-Hämeen lämpötilavaihteluiden hallinta",
    alueLocalHookText: "Lounais-Hämeen sydämessä Forssan seudulla nopeat säänvaihtelut ja Loimijoen laakson kosteus iskevät armotta talojen ulkokuoreen. Jatkuva jäätyminen ja sulaminen murentavat huokoista tiilikattoa pakkasrapautumisen myötä ja repivät puujulkisivun maalipintaa kosteuselämisen seurauksena. Vahvistamalla pintojen suojakerrokset laadukkaalla maalauksella ja pinnoituksella Forssan talojen rakenteet pysyvät terveinä ympäri vuoden.",
  },
  {
    slug: "hameenlinna",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Hämeenlinna | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Hämeenlinnassa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Hämeenlinnan pientalojen suojaaminen Vanajaveden kosteudelta",
    alueLocalHookText: "Hämeenlinnassa asutus mukailee Vanajaveden kauniita rantoja, mikä luo ympäristöön pysyvän ilmankosteuden. Tämä hidastaa julkisivujen luontaista kuivumista, mikä johtaa nopeammin maalin hilseilyyn ja tiilikattojen huokoistumiseen. Oikein suoritettu homepesu, talon ulkomaalaus ja katon pinnoitus ovat tehokkain tapa säilyttää kotisi tekninen kunto Hämeenlinnan historiallisissa ja moderneissa kaupunginosissa.",
  },
  {
    slug: "huittinen",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Huittinen | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Huittisissa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Satakunnan avarien peltomaisemien tuulikuorma Huittisissa",
    alueLocalHookText: "Huittisten avoimet peltomaisemat jättävät pientalot alttiiksi sään armottomalle piiskaukselle. Esteettömässä ympäristössä tuuli puskee viistosateen voimalla päin ulkoverhousta ja katon saumoja. Tällöin niin puupinnan kuin tiilenkin on oltava ehdottoman tiiviitä. Pintasen laadukas ulkomaalaus ja tiilikaton pinnoitus antavat huittislaisille kodeille vahvan suojan sääilmiöitä ja lahoamista vastaan.",
  },
  {
    slug: "akaa",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Akaa | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Akaassa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Akaan vaihtelevien sääolosuhteiden torjunta julkisivuilta ja katoilta",
    alueLocalHookText: "Toijalan ja Viialan taajamat Akaassa sijaitsevat Vanajaveden välittömässä läheisyydessä, missä syyssateet ja aamusumut rasittavat kiinteistöjen ulkopintoja voimakkaasti. Kosteus hiipii kuluneen maalin alle lahottaen puuta ja imeytyy betonitiileen jäätyen talvella. Ennakoiva talon maalaus ja katon pinnoituksemme pysäyttävät tämän tuhokierteen heti, turvaten akaalaisten kotien rakenteet.",
  },
  {
    slug: "ikaalinen",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Ikaalinen | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Ikaalisissa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Ikaalisten Kyrösjärven tuomien säärasitusten nujertaminen",
    alueLocalHookText: "Ikaalisissa elämä kytkeytyy vahvasti Kyrösjärveen, jonka laaja selkä tuo pihoille jatkuvaa järvituulta. Kun sää koettelee kotia, puuverhouksen maalipinta alkaa liituuntua ja tiilikatto menettää hydrofobisen ominaisuutensa. Huolellisella pohjatyöllä, säänkestävällä ulkomaalauksella ja katon pinnoitteilla luomme Ikaalisten pientaloihin suojakerroksen, joka kestää järviluonnon vaatimukset.",
  },
  {
    slug: "juupajoki",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Juupajoki | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Juupajoella. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Juupajoen metsäisten tonttien kiinteistöhuollon ratkaisut",
    alueLocalHookText: "Juupajoella, kuten Korkeakosken ympäristössä, talot sijaitsevat usein jykevien havupuiden katveessa. Varjostus hidastaa seinien ja kattojen kuivumista, jolloin neulaset ja biomassa saavat katon sammaloitumaan ja julkisivun keräämään mikrobikasvustoa. Säännöllinen pesu, ammattimainen ulkomaalaus ja tiilikaton pinnoitus ovat Juupajoella asuville paras vakuutus rakennusten eliniän pidentämiseksi.",
  },
  {
    slug: "kangasala",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Kangasala | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Kangasalla. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Kangasalan harjujen ja vesistöjen asettamat vaatimukset kodillesi",
    alueLocalHookText: "Roineen, Längelmäveden ja Vesijärven ympäröimä Kangasala on ainutlaatuinen harjukaupunki, jossa korkeuserot altistavat talot ylävillä paikoilla voimakkaalle UV-säteilylle ja rannoilla järvikosteudelle. Säteily haalistaa ulkomaalin, ja kosteus rapauttaa tiilikatot. Pintasen asiantunteva huoltomaalaus ja katon pinnoitus palauttavat kangasalalaisten kotien suojakilvet ennalleen ennen vaurioiden syntymistä.",
  },
  {
    slug: "kihnio",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Kihniö | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Kihniössä. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Pohjois-Pirkanmaan ankarat talvet ja Kihniön kotien kestävyys",
    alueLocalHookText: "Kihniössä, Pohjois-Pirkanmaalla, talvet ovat todella runsaslumisia ja pakkaset ovat kireitä. Tiilikaton raskaat lumikuormat ja puuverhouksen jatkuva lämpöeläminen vaativat pinnoilta täydellistä kuntoa. Laadukkaalla pinnoituksella ja säänkestävällä maalauksella voimme turvata kotisi rakenteet Kihniön ankarimpienkin pakkasten varalta.",
  },
  {
    slug: "lempaala",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Lempäälä | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Lempäälässä. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Lempäälän vesistöjen läheisyyden rasitukset omakotitaloille",
    alueLocalHookText: "Lempäälä on idyllinen paikka Pyhäjärven rantamaisemissa ja kanavan läheisyydessä, mutta jatkuva rannikkokosteus rasittaa sekä puujulkisivuja että kattorakenteita. Kun ulkomaali hilseilee ja tehdaspinnoite kuluu tiilestä pois, vesi pääsee rakenteisiin. Huolellinen maalaus ja katon pinnoitus takaavat, että Lempäälän kodit hylkivät sateita ja järvituulia moitteettomasti.",
  },
  {
    slug: "mantta-vilppula",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Mänttä-Vilppula | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Mänttä-Vilppulassa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Taidekaupungin kiinteistöjen suojelu Mänttä-Vilppulan oloissa",
    alueLocalHookText: "Mänttä-Vilppulan rikas teollisuushistoria ja Keurusselän läheisyys luovat ympäristön, jossa talojen ulkopinnat keräävät helposti epäpuhtauksia ja kosteutta. Vuosien varrella lika heikentää maalipinnan tartuntaa ja huokoistaa tiilikattoa. Perusteellinen homepesu, ulkomaalaus ja katon pinnoitus pitävät taidekaupungin kodit arvokkaan näköisinä ja täysin säänkestävinä.",
  },
  {
    slug: "orivesi",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Orivesi | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Orivedellä. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Oriveden korkeuserojen ja järviluonnon haasteet pientaloille",
    alueLocalHookText: "Orivedellä asutus levittäytyy mäkisiin maastoihin ja Längelmäveden rantamille, missä tuulen mukana tuleva viistosade iskee voimalla seiniin ja kattoihin. Mikäli julkisivun maalipinta tai tiilikaton suojakerros on antanut periksi, vesi puskee materiaalin läpi. Täsmällisesti ajoitettu ulkomaalaus ja katon pinnoitus varmistavat, että kotisi Orivedellä on valmis kohtaamaan tulevatkin myrskyt.",
  },
  {
    slug: "parkano",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Parkano | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Parkanossa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Parkanon mäntymetsien ja talvipakkasten vaatima suoja kodille",
    alueLocalHookText: "Parkanon laajat metsämaisemat ja talvipakkaset vaativat kodeilta suojaa. Jos kattoa ja ulkoverhousta ei huolleta, kosteus murentaa betonitiilen ja lahottaa paneelit nopeasti käyttökelvottomaksi. Ennakoivalla maalauksella ja pinnoituksella voimme suojata kotisi kestämään Parkanon metsäisten tonttien luomat vaatimukset.",
  },
  {
    slug: "pirkkala",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Pirkkala | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Pirkkalassa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Pirkkalan tiheän asutuksen ja Pyhäjärven säärasituksen hallinta",
    alueLocalHookText: "Pirkkalan arvostetut asuinalueet sijaitsevat urbaanin ympäristön ja Pyhäjärven luonnon välimaastossa. Tämä yhdistelmä tuo katoille ja julkisivuihin sekä ilman epäpuhtauksia että järveltä nousevaa kosteuttakin, vanhentaen pintoja. Uusimalla kuluneen suojakerroksen ammattitason maalauksella ja katon pinnoitteella voimme varmistaa, että pirkkalalaiset kodit säilyttävät teknisen kuntonsa ja näyttävyytensä.",
  },
  {
    slug: "palkane",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Pälkäne | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Pälkäneellä. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Pälkäneen peltoaukeiden ja järvimaisemien vaatima säänkestävyys",
    alueLocalHookText: "Pälkäne on tunnettu avarista peltomaisemistaan, joissa tuuli riepottelee taloja vapaasti. Tällaisissa olosuhteissa puuverhouksen maalikalvon ja tiilikaton on oltava täysin tiiviitä, jottei kosteus imeydy rakenteisiin sateiden mukana. Asiantunteva ulkomaalaus ja katon pinnoitus takaavat, että pälkäneläiset pientalot hylkivät vettä yhtä tehokkaasti kuin uudisrakennukset.",
  },
  {
    slug: "ruovesi",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Ruovesi | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Ruovedellä. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Ruoveden rantatonttien ja metsien tuoma rasitus kiinteistöille",
    alueLocalHookText: "Ruovedellä upeat järvimaisemat Tarjanteen rannoilla ja tiheät metsäalueet luovat ympäristön, jossa kiinteistöt pysyvät sateen jälkeen pitkään varjoisina. Tämä mikroklima ruokkii tiilikattojen sammaloitumista ja julkisivujen homepilkkuja. Perusteellinen homepesu, ulkomaalaus ja katon pinnoitus ovat ratkaiseva askel Ruovedellä sijaitsevien talojen ja huviloiden suojauksessa.",
  },
  {
    slug: "urjala",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Urjala | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Urjalassa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Urjalan maaseutuilmaston ja säänvaihteluiden vaatima tuki taloille",
    alueLocalHookText: "Urjalan rauhallinen maaseutuilmasto ja Nuutajärven paikallinen kosteus pitävät huolen siitä, että alueen omakotitalot kokevat neljä vuodenaikaa voimakkaasti. Kun katon alkuperäinen väri haalistuu tai seinämaali liituuntuu, suojakerros on pettänyt. Ajoissa tehty talon maalaus ja tiilikaton pinnoitus elvyttävät pintojen ominaisuudet ja antavat urjalalaisille kodeille pitkäikäisen suojakilven rakenteiden turvaksi.",
  },
  {
    slug: "valkeakoski",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Valkeakoski | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Valkeakoskella. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Valkeakosken vesistöjen risteyskohdan tuoma ilmankosteus",
    alueLocalHookText: "Valkeakoski on upea paikka asua, mutta ympäröivät vesistöt tarkoittavat jatkuvaa ilmankosteuden rasitusta talojen ulkokuorelle. Kosteus kiihdyttää puujulkisivujen huoltomaalaustarvetta ja tiilikattojen huokoistumista. Ammattitason ulkomaalaus ja ruiskupinnoitus pysäyttävät tämän ilmiön, suojaten kotiasi Valkeakosken vaihtelevassa vesistöilmastossa.",
  },
  {
    slug: "vesilahti",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Vesilahti | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Vesilahdessa. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Vesilahden kulttuurimaisemien ja sään rasitukset omakotitaloille",
    alueLocalHookText: "Vesilahden avarat maalaismaisemat ja Pyhäjärven läheisyys altistavat talot suorille viistosateille ja luonnon kerryttämälle lialle. Sammal ottaa nopeasti otteen tiilikaton pinnasta, ja kosteus lahottaa huoltamattoman puuverhouksen. Laadukas talon maalaus ja katon pinnoitustyö palauttavat pintojen ehjyyden, varmistaen että vesilahtelaisten kodit pysyvät terveinä ja visuaalisesti edustavina sukupolvelta toiselle.",
  },
  {
    slug: "virrat",
    alueMetaTitle: "Tiilikaton pinnoitus ja talon maalaus Virrat | Pintanen",
    alueMetaDesc: "Tiilikaton pinnoitus ja talon maalaus Virroilla. Laske hinta-arvio hintalaskurilla. Tilaa ilmainen arviokäynti ja hyödynnä kotitalousvähennys. Kirjallinen takuu.",
    alueLocalHookTitle: "Virtain pohjoisen sijainnin ja kovien pakkasten vaatima lujuus",
    alueLocalHookText: "Virtain kaupunki sijaitsee Pirkanmaan pohjoisosassa, mikä tarkoittaa pidempiä talvia ja kireämpiä pakkasia. Jos tiilikatto tai halkeileva ulkoverhous pääsee imemään vettä syksyn sateilla, jäätyminen vahingoittaa rakenteita erittäin nopeasti. Perusteellisilla pohjatöillä tehdyllä maalauksella ja katon pinnoituksella voimme varmistaa, että kattosi ja seinäsi Virroilla kestävät ankarimmatkin talviolosuhteet ilman pelkoa pakkasrapautumisesta.",
  },
];

export const getAreaCityContent = (slug: string): AreaCityContent | undefined => {
  return areaCityContent.find((c) => c.slug === slug);
};
