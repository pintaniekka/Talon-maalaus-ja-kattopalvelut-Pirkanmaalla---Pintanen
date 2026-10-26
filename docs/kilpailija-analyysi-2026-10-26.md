# Kilpailija-analyysi 26.10.2026: Lummeco, Väriset, Sorcolor, Maalausmestari, Tuplapensselit

Tavoite: ykkössija Pirkanmaan hauissa (tiilikaton pinnoitus [kaupunki], talon maalaus [kaupunki], hinta-haut). Sivustot luettu curlilla 25.–26.10.2026, kaupunki- ja palvelusivut sanatasolla. Raakatiedostot `%TEMP%\claude-pintanen-docs\` (ei repossa).

## Yhteenveto yhdellä silmäyksellä

| | Lummeco | Väriset | Sorcolor | Maalausmestari | Tuplapensselit | Pintanen nyt |
|---|---|---|---|---|---|---|
| Sivuja | n. 230 | 2 013 (+en, sv) | 544 | 131 | 119 | 91 |
| Kaupunkisivut | 180, yksi pohja | 1 848, yksi pohja (isot kaupungit käsin) | 262, yksi pohja, ei descriptionia | 49, yksi pohja | 15, orpoja | 48 + 24 aluesivua, yksilöllisiä |
| Palvelusivun sanamäärä | 900 | 1 700 | 1 730 | 470–740 | 730 | 1 200–1 400 |
| Hinta | haarukka + koon mukaan | taulukko m² mukaan + 3 kohdetta + vähennys | haarukka + 8 kokoesimerkkiä + toteutuneet kohteet | vain blogissa | vain UKK:ssa | kortit koon mukaan + hintasivut + laskuri |
| Arvostelut | 4,8 / 300+ | 4,8 / lähes 300 Google | 4,4 / 6 000 (Trustmary) | 5,0 / 8 lainausta | 5,0 / 10 | 5,0 / 28 |
| Asiakastarinat omina sivuina | 3 | 33 (7 videota) | 28 + 6 videota | 1 video | 2 videota | ei |
| Blogi | 33 | 69 | 152 | 30 | 80 (10/kk) | 7 (+1 jonossa) |
| Schema | Article + FAQPage | HomeAndConstructionBusiness joka kunnalle, FAQPage | Organization, Breadcrumb, ei FAQPage | FAQPage 3 kys. | Article kaikilla, ei FAQPage | LocalBusiness, Service, FAQPage, Breadcrumb |
| Kohdekartta | ei | 5 100 osoitetta | 19 289 pistettä | ei | ei | kuntakartta (ei kohteita) |
| Takuu | 2–5 v | 5 v / 3 v | 5 v | 5 v / 3 v / 2 v | "jopa 5 v" | 5 v / 2 v |

Johtopäätös: sisällön rakenteessa ja teknisessä toteutuksessa pintanen.fi on jo kilpailijoiden tasolla tai edellä (yksilölliset kaupunkisivut, FAQPage ja Service -schemat, kevyt HTML, kuvien nimet). Kilpailijat voittavat kolmessa asiassa: arvostelujen ja asiakastarinoiden määrä, toteutuneiden kohteiden näyttäminen (kartta, kohdehinnat, videot) ja sisällön määrä (blogi 30–150 artikkelia).

## Parhaat ideat, priorisoitu

### Suuri vaikutus

1. **Toteutuneet kohteet hintoineen referenssikortteina** (Sorcolor, Väriset). "Omakotitalon tiilikatto, Nokia, 210 m², 3 600 €, 2026" kuvalla ennen ja jälkeen. Palvelusivulle, hintasivulle ja kaupunkisivulle oman kunnan kohteet. Vastaa suoraan "paljonko maksaa" -kysymykseen ja on sallittu: toteutunut hinta ei ole hinnasto. **Tarvitaan Eerikiltä 5–10 oikeaa kohdetta hintoineen ja asiakkaan lupa.**
2. **Asiakastarinat omina sivuina** (Väriset 33, Sorcolor 28). Kohde, kunta, mitä tehtiin, asiakkaan sitaatti (Google-arvostelu sanasta sanaan), kuvat, linkki kaupunkisivulta. Tuo pitkän hännän haut ("talon maalaus Lempäälä kokemuksia") ja lainattavaa sisältöä tekoälyvastauksiin. Pintasella on jo 28 arvostelua ja kohdekuvia: materiaali on olemassa.
3. **Toteutettuja kohteita kartalla** (Väriset, Sorcolor). Kuntakartoissa on nyt vain kunnan muoto. Omat kohteet pisteinä kaupunginosan tarkkuudella (ei osoitetta) tekee jokaisesta kaupunkisivusta todistetusti paikallisen. Tarvitaan kohdelista kunnittain.
4. **Lyhyet videot** (Väriset 7, Sorcolor 6, Tuplapensselit 2, Maalausmestari 1). Puhelinvideo pesusta ja ruiskutuksesta tai tyytyväiseltä asiakkaalta, VideoObject-schemalla palvelusivuilla. Kahden veljeksen "teemme itse" -tarina toimii videolla paremmin kuin kenelläkään kilpailijalla.
5. **Taloyhtiöt ja isännöitsijät -sivu** (Väriset, Sorcolor, Maalausmestari, Tuplapensselit). Rivitaloyhtiöiden tiilikatot ovat isoja urakoita, ja isännöitsijät hakevat eri sanoilla. **Vain jos Eerik tekee taloyhtiökohteita.**
6. **Julkaisutahti ja vuosilukuotsikot** (Tuplapensselit 10/kk, Sorcolor 152 artikkelia). Pitkän hännän haut ("tiilikaton pinnoitus hinta 2027", "kotitalousvähennys maalaus 2027", "sammaleen poisto katolta") katetaan vain artikkeleilla. Nosto kahteen artikkeliin viikossa ja vuosiluku hinta- ja vähennysotsikoihin.

### Keskisuuri vaikutus

7. **Title-koukut luvuilla** (Sorcolor "katso 8 esimerkkiä", Tuplapensselit "Kysy tarjous 15 sekunnissa"). Esimerkiksi "Tiilikaton pinnoitus Tampere – hinta, 7 työvaihetta ja 5 v takuu | Pintanen". Pelkkä `seo.ts`-muutos, parantaa klikkausprosenttia.
8. **Oma sivu ilmaiselle kuntotarkastukselle** (Sorcolor 1 770 sanaa, Lummeco oma laskeutumissivu, Väriset "varaa kartoitus"). "Ilmainen katon kuntotarkastus Pirkanmaalla" + avoin lista "10 kohtaa, jotka katsomme". Tuo haut "katon kuntotarkastus tampere" (nyt sija 37) ja antaa tekoälyvastauksille siteerattavan listan.
9. **Kotitalousvähennys hintalaskurin tulokseen ja oma vähennyssivu** (Väriset "vähennyksen jälkeen jopa 1 400 € vähemmän", Sorcolor laskurisivu). Laskuri näyttää arvion ja nettohinnan samalla ruudulla. Prosentit vero.fi:stä ennen toteutusta.
10. **"Avainhuomio"-virke artikkelien jokaisen H2:n loppuun** (Tuplapensselit). Yhden virkkeen tiivistys luvulla, jonka Googlen AI-vastaukset poimivat. Pieni ArticleKit-lisäys.
11. **Tekijän suora yhteys artikkeleissa** (Tuplapensselit "Kysy suoraan minulta"): Eerikin tai Eemilin kuva, numero ja sähköposti tekijälaatikossa. Ei nappeja, joten artikkelisääntö pysyy.
12. **Kuvagalleria kunnittain** (Maalausmestari): referenssisivulle suodatus kunnan mukaan ja linkki kaupunkisivulta oman kunnan kuviin.
13. **Valmistajan hyväksyntä näkyviin** (Maalausmestari "BMI Ormaxin hyväksymä pinnoittaja"): jos Nowocoat on kouluttanut tai hyväksynyt Eerikin, se sanotaan pinnoitussivuilla. **Vain Eerikin vahvistamana.**

### Pieni vaikutus

14. Kuntasivujen schema: `areaServed` kunnan Wikipedia-sameAs:lla ja `sameAs` Google-profiiliin (Väriset).
15. Palvelulupaus lomakkeen viereen yhdellä rivillä: "Kuntotarkastus samalla viikolla, myös iltaisin" (Maalausmestari toistaa lupauksensa joka sivulla).
16. Lummecon "Yleisimmät väärinymmärrykset" ja Sorcolorin "3 merkkiä" ovat jo toteutettu (Kolme yleistä luuloa, merkkilistat).

## Mitä ei kannata kopioida

- Tuhannet identtiset kaupunkisivut (Väriset 1 848, Sorcolor 262): ohutta sisältöä, ei descriptionia, Google näyttää niitä kaukaa.
- Neliöhinnat ja laskuesimerkit (Sorcolor 20–40 €/m², Maalausmestari): vastoin hintasääntöjä.
- Rahoitus, verkkotapaaminen, verkkokauppa: vastoin Eerikin päätöksiä (ei rahoitusta, asiakas paikalla arviokäynnillä).
- Article-schema palvelusivuilla ja UKK ilman FAQPage-schemaa (Tuplapensselit, Lummeco).
- Tyhjät alt-tekstit (kaikilla kilpailijoilla), ristiriitaiset takuu- ja vähennysluvut (Tuplapensselit, Väriset, Maalausmestari).

## Mitä Pintanen tekee jo paremmin

Yksilölliset kaupunkisivut paikallisella sisällöllä, kartat, Tilastokeskuksen talokanta, FAQPage ja Service -schemat, kuvien hakusanan muotoiset nimet ja alt-tekstit, kevyt staattinen HTML, hintakortit koon mukaan ilman neliöhintoja, yrittäjät nimellä joka sivulla.

## Ehdotus seuraaviksi vaiheiksi

| Vaihe | Sisältö | Tarvitaan Eerikiltä |
|---|---|---|
| 8 | Referenssikortit toteutuneilla hinnoilla (5–10 kohdetta) palvelu-, hinta- ja kaupunkisivuille | kohdelista: kunta, katon tai talon koko, hinta, vuosi, lupa |
| 9 | Asiakastarinat omina sivuina Google-arvosteluista ja kohdekuvista | kohdetiedot arvosteluihin (kunta, mitä tehtiin) |
| 10 | Kohteet kuntakartalle pisteinä | kohteiden kaupunginosat |
| 11 | Ilmainen kuntotarkastus -sivu ja 10 kohdan lista | vahvistus, mitä tarkastuksessa katsotaan |
| 12 | Title-koukut, avainhuomiot artikkeleihin, tekijän yhteys artikkeleihin, kuntien schema | ei mitään |
| 13 | Videot (2–3 kpl) ja VideoObject | puhelinvideot |
| 14 | Taloyhtiöt-sivu | päätös, tehdäänkö taloyhtiöitä |
| 15 | Artikkelit 2/viikko vuosilukuotsikoilla | aiheiden hyväksyntä |
