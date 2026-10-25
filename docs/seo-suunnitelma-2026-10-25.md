# SEO/GEO-suunnitelma: ykköseksi Pirkanmaan hauissa

Päivä: 25.10.2026. Pohjana Eerikin viesti 25.10. ja vertailu lummeco.fi:hin (sivut haettu 25.10.2026: katon-pinnoitus-tampere, katon-pinnoitus-nokia, talon-maalaus-tampere, tiilikaton-pinnoitus, talon-maalaus, hinta-sivut, blogi). Lähtötaso: `docs/search-console/lahtotaso-2026-10-12.md` ja `docs/auditointi-2026-10.md`.

## 1. Mitä viestissä pyydettiin ja mitä siitä ajattelen

| Pyyntö | Arvio | Päätös |
|---|---|---|
| Ykköseksi hauilla "tiilikaton pinnoitus [kaupunki]", "talon maalaus [kaupunki]", "… Pirkanmaa", "… hinta", "tiilikaton pesu ja pinnoitus" | Oikeat hakusanat. Lähtötaso 9.10.: pinnoitus Tampere sija 12–16, maalaus-kaupunkisivut sija 52, "tiilikaton maalaus tampere" sija 5,5–9. | Hakusanakartta luvussa 4. Lisäehdotukset samassa. |
| Vertailukohde Lummeco | Lummecon kaupunkisivut ovat yksi ja sama pohja, jossa vain kunnan nimi vaihtuu (Tampere ja Nokia eroavat vain nimen kohdalta). Sivut voittavat iällä, 300 arvostelulla, 39 oppaalla ja linkeillä, eivät paikallisella sisällöllä. | Otetaan Lummecolta rakenne ja aiheet, ei kopioida. Pintasen etu on aito paikallisuus: omat kohteet, omat kuvat, Tilastokeskuksen talokanta. |
| Pinnoitus- ja maalaussivut jopa kokonaan uusiksi | Sivuilla on jo oikea runko ja 700–900 sanaa, Lummecolla 650–900. Puuttuu kolme isoa osiota ja rinnakkaissanat. Kokonaan uusiksi tekeminen nollaisi sen, mikä jo nousee (näyttökerrat +71 % uudistuksen jälkeen). | Sama runko, uusi osiojärjestys, lisätään puuttuvat osiot. Teksti kirjoitetaan uudelleen vain siellä, missä se on ohut. |
| Hintasivuja lisää | Lummecon hinta-sivut ovat pelkkä laskuri (alle 50 sanaa). Pintasen hintasivut ovat jo paremmat. Kaupunkikohtaisia hintasivuja ei kannata tehdä: "tiilikaton pinnoitus hinta tampere" vastataan kaupunkisivun hinta-H2:lla, muuten sivut kilpailevat keskenään. | Vahvistetaan kahta hintasivua. Ei uusia hintasivuja. |
| Etusivu vain myyväksi | Oikein. Asiakas tulee palvelusivulle hausta, etusivulle vain nimellä. | Etusivu: lyhyt, kaksi palvelua, arvostelut, tarjouspyyntö. Tehdään viimeisenä. |
| URL-maksimointi | Osoitteet ovat jo hakusanan muotoiset ja kaikki 24 kuntaa on katettu molemmilla palveluilla. Vaihto nollaa sivun historian ja lisää 301-ketjun. Ainoa heikko on `maalauspalvelut-<kunta>`, mutta sen rooli on "maalausliike <kunta>" ja se saa jo klikkejä (sija 25). | Ei vaihdeta yhtään osoitetta. Ei uusia osoitteita pesulle (palvelu loppunut). |
| Kuvien nimet, alt, metat, schemat | Kuvatiedostot on jo nimetty suomeksi ja kunnittain (97 kuvaa). Metat ja schemat (Service, FAQPage, BreadcrumbList, LocalBusiness) ovat staattisessa HTML:ssä. Puutteet: osa alt-teksteistä on muotoa "Toni Reunanen: kohde", title-tageista puuttuu rinnakkaissana, Service-schemasta puuttuu kaupunki ja hinta. | Luku 6. |
| "Miksi tiilikatto kannattaa pinnoittaa ajoissa" puuttuu kaupunkisivuilta | Totta. Osio on vain Pirkanmaa-sivulla. Maalauksen kaupunkisivuilla vastaava "Mistä tiedät, että talosi pitää maalata" on. | Osio kaikille pinnoituksen kaupunkisivuille, kaupungin nimi otsikkoon. |
| Paikallisosio oli tarkoitettu lyhyeksi erottajaksi, ei myyväksi | Totta, osio on kasvanut. | Paikallisosio lyhenee 3–4 virkkeeseen: järvi tai maasto, kaupunginosat, linkki kohteisiin. Kartta pysyy. |
| Vertaa Lummecoon ja kysy, onko Pintasella samoin | Tehty, luku 3 ja kysymykset luvussa 7. | Eerik vastaa, sitten kirjoitetaan. |
| Tarjouspyynnöt sanalistaksi | Paras aineisto, mitä on. | Luku 8: miten toimitetaan ja mitä niistä tehdään. |
| Kielisäännöt | Samat kuin CLAUDE.md:ssä, lisäksi: ei huutomerkkejä, ajatusviiva –, otsikoissa iso kirjain vain ensimmäisessä sanassa, 15–20 sanan lauseet. | Lisätään CLAUDE.md:hen. |

## 2. Miksi Lummeco on ykkönen (ja mitä se tarkoittaa meille)

- Sivusto on vuosia vanhempi, sillä on 300+ Google-arvostelua (4,8), 39 opasta, neljä maakuntaa ja 180 kaupunkisivua, jotka linkittävät toisiinsa.
- Kaupunkisivut ovat ohuita paikallisesti, mutta täydellisiä rakenteeltaan: ongelma → merkit → prosessi → hinta → takuu → UKK → kaikki paikkakunnat. Google saa jokaiseen kysymykseen vastauksen samalta sivulta.
- Schema: Article + FAQPage + BreadcrumbList + Organization jokaisella sivulla.
- Hinnat kerrotaan heti ja koon mukaan (pieni/keskikokoinen/suuri katto).
- "Miksi LummeCo" -lista (6 syytä), lukuina 9,4/10, 200 ammattilaista, 3000 taloa.

Meidän asema: kaikki sama rakenne on mahdollinen, ja lisäksi aito paikallisuus, jota Lummecolla ei ole. Arvostelujen määrä (28 vs 300) ja linkit ovat se, mitä sisältö ei korvaa. Siksi arvostelupyynnöt jokaisen työn jälkeen ja yritysprofiili kuuluvat tähän suunnitelmaan.

## 3. Lummecon kaupunkisivu vs Pintasen kaupunkisivu

Pinnoitus (Lummeco katon-pinnoitus-tampere, 903 sanaa; Pintanen tiilikaton-pinnoitus-tampere, 781 sanaa).

| Osio Lummecolla | Pintasella nyt | Toimenpide |
|---|---|---|
| H1 + johdanto: "pitää veden ulkona, kestää 10–15 vuotta, katto on kotisi paras vakuutus" | H1 + hinta, takuu, arviokäynti | Pidetään omamme, lisätään yksi virke siitä, mitä pinnoitus tekee katolle. |
| Luvut: 9,4/10, 200 ammattilaista, 3000 taloa | 5,0/5, yli 130 kattoa, 5 v takuu, 0 € arviokäynti | On. |
| "Tuo mielenrauhaa": miksi katto kuluu (UV, lämpötila, sade), huolto 10–15 v välein | Puuttuu kaupunkisivulta (on Pirkanmaa-sivulla) | **Lisätään "Miksi tiilikatto kannattaa pinnoittaa ajoissa [kaupunki]"** + merkkilista. |
| 6 arvostelua nimellä ja paikkakunnalla | 3 arvostelua kohteineen + karuselli | On, parempi kuin Lummecolla. |
| Prosessi 9 vaihetta (kuntoarvio, sopimus, yhteydenotto viikkoa ennen, suojaus, tarkastus, pesu, pohjamaali, Nowocoat, lopputarkastus, takuu) | 6 vaihetta | Lisätään: kirjallinen sopimus ja aikataulu, yhteydenotto ennen aloitusta, jos nämä pitävät paikkansa (kysymys 1). |
| "Miksi LummeCo" 6 syytä (vaivaton 2–3 pv, edullinen, luotettava, laatu, kotimainen, sijoitus) | Hero-badge "Eerik tekee työn" | **Lisätään "Miksi Pintanen [kaupunki]" 5–6 syytä** omilla faktoilla: sama mies arvioi ja tekee, 5 v takuu, ei matkakulua, viikon sisällä arviokäynti, 2–4 päivää, paikallinen. |
| Hinta heti: 3 500–7 900 €, mihin hinta vaikuttaa | Hinta 2 850–7 000 € ja syyt | On. Lisätään linkki hintasivulle ja laskuriin samaan kohtaan. |
| Takuu 2–5 v, oma osio | Takuu UKK:ssa ja prosessissa | Oma lyhyt H3 "Takuu 5 vuotta kirjallisesti". |
| "Tiivis pinta estää suuret vahingot" + merkkilista (haalistuminen, halkeilu, kasvusto) | Puuttuu kaupunkisivulta | Sama kuin "Miksi ajoissa" -osio. |
| UKK 6: rahoitus, kotitalousvähennys, milloin, miksi, hinta, kesto | UKK 10 | On. Lisätään "tiilikaton pesu ja pinnoitus" ja "katon pinnoitus vai maalaus" -kysymykset. |
| Kaikki 90 paikkakuntaa linkkeinä | Naapurikunnat 7 + alaviite | Alaviitteen kuntalista linkeiksi kaikille 24 kunnalle molempiin palveluihin. |
| Rahoitus OP 50 000 € | Ei | Vain jos Pintanen tarjoaa (kysymys 5). Ei keksitä. |
| Peltikatto | Ei | Ei markkinoida (Eerikin päätös). |
| Kuntoarvio "arvo 270 €", kirjallinen raportti | "Ilmainen kuntotarkastus" | Kysymys 3: saako asiakas kirjallisen raportin? |
| Schema Article + FAQPage | Service + FAQPage + Breadcrumb + LocalBusiness | On. Täydennetään (luku 6). |
| Lummecolla ei ole | Omat kohteet kuvineen, talokanta Tilastokeskuksesta, kartta, naapurikunnat | Pidetään. Tämä on etumme. |

Maalaus (Lummeco talon-maalaus-tampere, 651 sanaa; Pintanen talon-maalaus-tampere, 794 sanaa).

| Osio Lummecolla | Pintasella nyt | Toimenpide |
|---|---|---|
| "Miksi valita" + lupaus motivoituneesta maalarista | Hero-badge "Eemil maalaa" | **"Miksi Pintanen" -lista** kuten pinnoituksessa. |
| Hinta 4 000–11 000 €, mihin vaikuttaa, linkki laskuriin | Hinta 3 500–11 000 € | On. |
| Prosessi 7 vaihetta | Prosessi on vain Pirkanmaa-sivulla, kaupunkisivulla lyhyt kuvaus | **Lisätään ProcessList kaupunkisivuille** (homepesu harjoilla → kaavinta → kuivuminen → pohjamaali paljaisiin kohtiin → pintamaali pensselillä). |
| Milloin ajankohtaista + merkit (hilseily, haalistuminen, home) | "Mistä tiedät, että talosi pitää maalata" + merkit | On. |
| UKK 7 | UKK 9 | On. Lisätään "julkisivumaalaus" ja "ulkomaalaus" -sanat kysymyksiin. |
| Kaikki paikkakunnat | Naapurikunnat | Sama kuin edellä. |

Pääsivut (Pirkanmaa): Lummecon tiilikaton-pinnoitus-sivulla on kaksi asiaa, joita meillä ei ole: "Yleisimmät väärinymmärrykset" (haalistuminen on vain kosmeettista / katto pitää uusia / ei ole varaa) ja hinnat katon koon mukaan. Väärinymmärrykset sopii meille hyvin ja on tekoälyvastauksille (GEO) vahva muoto. Koon mukaiset hinnat ovat vastoin nykyistä sääntöä "ei hinnastoja": kysymys 6.

## 4. Hakusanakartta

Yksi sivu per hakuaihe. Rinnakkaismuodot samalle sivulle H2- ja UKK-tasolle, koska Google ei yhdistä niitä itse (lähtötaso: "tiilikaton maalaus tampere" sija 9, "katon maalaus tampere" sija 55).

| Hakusana | Sivu | Missä sana näkyy |
|---|---|---|
| tiilikaton pinnoitus [kaupunki] | /tiilikaton-pinnoitus-[kaupunki]/ | H1, title, 1. kappale |
| katon pinnoitus [kaupunki], kattopinnoitus | sama | H2 "Katon pinnoitus [kaupunki]: mitä se tarkoittaa" |
| tiilikaton maalaus [kaupunki], kattomaalaus, katon maalaus | sama | H2 "Tiilikaton maalaus ja pinnoitus ovat sama työ", title "Tiilikaton pinnoitus ja maalaus" (on jo) |
| tiilikaton pesu ja pinnoitus [kaupunki], katon pesu | sama | H2 "Tiilikaton pesu ja pinnoitus [kaupunki]" prosessin yhteydessä. Pesua ei myydä erikseen. |
| tiilikaton pinnoitus hinta [kaupunki] | sama | H2 "Mitä tiilikaton pinnoitus maksaa [kaupunki]" |
| tiilikaton pinnoitus Pirkanmaa | /tiilikaton-pinnoitus-pirkanmaa/ | on |
| tiilikaton pinnoitus hinta | /tiilikaton-pinnoitus-hinta-pirkanmaa/ | on, vahvistetaan |
| talon maalaus [kaupunki] | /talon-maalaus-[kaupunki]/ | H1, title |
| ulkomaalaus, julkisivumaalaus, puutalon maalaus, omakotitalon maalaus [kaupunki] | sama | H2 "Ulkomaalaus ja julkisivumaalaus [kaupunki]" (julkisivumaalaus putosi sijalta 1,3 sijalle 26, kun sana katosi sivuilta) |
| huoltomaalaus [kaupunki] | sama | UKK |
| talon maalaus hinta [kaupunki] | sama | H2 hinta |
| talon maalaus Pirkanmaa, talon maalaus hinta | pirkanmaa- ja hinta-sivu | on |
| maalausliike [kaupunki], maalari [kaupunki], kattomaalari | /maalauspalvelut-[kaupunki]/ | H1 on. Sivun rooli pysyy: yleissivu, linkit kahteen palvelusivuun. |
| tiilikaton pinnoitus kokemuksia | /kokemuksia/ | H2 lisätään |
| kattoremontti vai pinnoitus, tiilikaton pinnoitus itse, milloin pinnoittaa | artikkelit | on |

Ehdotus lisähakusanoiksi, joita Lummeco ei kata: "tiilikaton pinnoitus aurinkopaneelit" (meillä kohteita ja kuvia), "tiilikaton pinnoitus Ormax" (yleisin 2000-luvun tiili, Eerik 11.10.), "tiilikaton pinnoitus mökki". Kukin yhdeksi H2:ksi tai artikkeliksi, jos tarjouspyynnöt tukevat.

## 5. Uusi osiojärjestys

Pinnoituksen kaupunkisivu (tavoite 1 100–1 400 sanaa, joista paikallista noin 30 %):

1. Hero: H1 "Tiilikaton pinnoitus [kaupunki]", 2 virkettä, hinta, takuu, luvut, nappi.
2. Lyhyesti-nauha (on).
3. Paikallisosio, lyhyt: 3–4 virkettä, kartta. Ei myyntiä.
4. **Miksi tiilikatto kannattaa pinnoittaa ajoissa [kaupunki]** + "Merkit, että katto pitää pinnoittaa" (sama teksti kuin Pirkanmaa-sivulla, kaupunki otsikkoon).
5. **Tiilikaton pesu ja pinnoitus: näin työ etenee** (prosessi, täydennetty).
6. **Tiilikaton maalaus ja pinnoitus ovat sama työ** (rinnakkaissanat, Nowocoat, kaksi kerrosta).
7. Kohteita [kaupunki] + arvostelut (on).
8. Mitä tiilikaton pinnoitus maksaa [kaupunki] + kotitalousvähennys + linkit hintasivulle ja laskuriin (on, tiivistetään).
9. **Miksi Pintanen [kaupunki]** (5–6 syytä).
10. Talokanta [kaupunki] (on).
11. Eerik tekee työn (on).
12. UKK 10–12, mukana pesu, maalaus vs pinnoitus, kattoremontti (on, täydennetään).
13. Yhteystiedot + naapurikunnat + kaikki kunnat linkkeinä.

Maalauksen kaupunkisivu samalla kaavalla: hero, Lyhyesti, paikallisosio, Mistä tiedät että talo pitää maalata, Näin talon maalaus etenee (uusi), Ulkomaalaus ja julkisivumaalaus [kaupunki] (uusi), kohteet ja arvostelut, hinta, Miksi Pintanen, talokanta, Eemil maalaa, UKK, yhteystiedot.

Pirkanmaa-sivut: lisätään "Yleisimmät väärinymmärrykset" (3 kohtaa Pintasen faktoilla) ja "Mitä hintaan kuuluu" -lista. Hintasivut: lisätään UKK ja väärinymmärrykset, pidetään laskuri.

Etusivu: hero yhdellä lupauksella, kaksi palvelukorttia, arvostelukaruselli, kolme lukua, tarjouspyyntö. Ei pitkää tekstiä. Tehdään viimeisenä.

## 6. Tekninen SEO/GEO

- Title: "Tiilikaton pinnoitus ja maalaus [kaupunki] | Pintanen" pysyy. Maalaus: "Talon maalaus [kaupunki] – ulkomaalaus ja julkisivumaalaus | Pintanen" pysyy. Description: lisätään "pesu ja pinnoitus" pinnoitukseen.
- Alt-tekstit: kohdekuvien alt muotoon "Pinnoitettu punainen tiilikatto Tampereella, jälkeen", ei "Toni Reunanen: kohde". Muutos `projects.ts`-dataan.
- Service-schema: `areaServed` = kaupunki, `offers.priceSpecification` hintahaarukka, `provider` = yritys-@id, `serviceType` rinnakkaissanat ("Tiilikaton pinnoitus", "Katon maalaus"). FAQPage pysyy. Harkitaan `AggregateRating` LocalBusiness-entiteettiin (5,0 / 28) sivustolle, jolla arvostelut näkyvät.
- Sisäinen linkitys: jokaiselta kaupunkisivulta linkit kaikkiin 24 kuntaan (alaviite), hintasivulle, laskuriin, kahteen artikkeliin.
- llms.txt: päivittyy itsestään.
- Mitataan Search Consolesta 3.11. ja 1.12.: sijainti ja klikit hakusanakartan riveille.

## 7. Kysymykset Eerikille (vastaa kyllä, ei tai korjaa)

Lummeco kertoo nämä. Onko Pintasella samoin? Vain vahvistettu tieto menee sivulle.

1. Teettekö kirjallisen sopimuksen ja sovitun aikataulun tarjouksen hyväksymisen jälkeen? Otatteko yhteyttä ennen aloituspäivää?
2. Kuinka kauan pinnoitus kestää: 2–4 päivää (nyt sivulla) vai 2–3? Maalaus: montako päivää?
3. Saako asiakas arviokäynnistä kirjallisen raportin katon tai seinän kunnosta, vai vain tarjouksen?
4. Tarkistatteko aina saumat, piipun ympäryksen, läpiviennit ja aluskatteen? Vaihdatteko rikkinäiset tiilet aina hintaan kuuluvana?
5. Tarjoatteko rahoitusta tai osamaksua? Jos ette, sanotaanko mitään maksuajasta?
6. Saako hinnat kertoa katon koon mukaan (esim. alle 100 m², 100–200 m², yli 200 m²) kuten Lummeco? Nykyinen sääntö kieltää hinnastot. Vaihtoehto: kolme oikeaa kohde-esimerkkiä hintoineen.
7. Mitä pinnoituksen hintaan kuuluu: suojaus, pesu, kasvustontorjunta, tiilien vaihto, kaksi maalikerrosta, siivous, takuu? Entä maalauksen?
8. Miksi asiakas valitsee Pintasen: mitkä 5–6 syytä sinä sanoisit asiakkaalle kasvotusten?
9. Onko asiakkailta videoita tai lupaa käyttää nimeä ja paikkakuntaa arvostelujen yhteydessä (nyt näkyy nimi)?
10. Pyydätkö Google-arvostelua jokaisen työn jälkeen? Jos ei, tehdäänkö siitä rutiini (tekstiviesti linkillä)?
11. Kesto ja hinta mökeille ja piharakennuksille: sanotaanko haarukka?
12. Kuntoarvio: "ilmainen kuntotarkastus" vai "ilmainen arviokäynti"? Käytetään yhtä sanaa.
13. Aurinkopaneelit: kuinka monta kohdetta, voiko siitä tehdä oman H2:n?
14. Ormax ja muut tiilimerkit: saako mainita, mitä tiiliä pinnoitatte?

### Eerikin vastaukset 25.10.2026

1. Kyllä: kirjallinen sopimus ja aikataulu tarjouksen hyväksymisen jälkeen, yhteydenotto ennen aloituspäivää.
2. Pinnoitus 2–3 päivää peruskohteissa. Maalaus 3–7 päivää.
3. Asiakas saa kirjallisen tarjouksen (ei erillistä raporttia). Sanotaan sivuilla etuna, ei "emme"-lauseita.
4. Kyllä: saumat, piipun ympärys, läpiviennit ja aluskate tarkistetaan aina, rikkinäiset tiilet vaihdetaan.
5. Ei rahoitusta (vielä). Ei mainita.
6. Kyllä: hinnat saa kertoa katon koon mukaan. Luvut johdetaan hintalaskurista (Eerikin vahvistama data), ei keksitä.
7. Hintaan kuuluu: suojaus, pohjatyöt, pohjamaalaus, pintamaalaus, siivous, takuu.
8. Miksi Pintanen: yrittäjä tekee työn itse; kokemus ja työnjälki ovat itse tekijällä (5 vuotta, yli 130 kattoa); kilpailukykyinen hinta; maalia laitetaan aina tarpeeksi; Eerik ottaa itse vastuun lopputuloksesta. Kilpailijoista (aliurakoitsijat, ensimmäisen kesän maalarit) ei väitetä mitään sivuilla.
9. Ei videoita vielä.
10. Eerik kysyy arvostelua jokaisen työn jälkeen.
11. Mökeille ja piharakennuksille ei hintahaarukkaa.
12. Sana on "kuntotarkastus" (ei "kuntoarvio", ei "arviokäynti" pinnoituksessa). Maalauksessa sana pysyy "arviokäynti"? Käytetään "kuntotarkastus" molemmissa, kunnes Eerik sanoo toisin.
13. Aurinkopaneeleista ei omaa H2:ta.
14. Tiilimerkit (Ormax ym.) saa mainita.

## 8. Tarjouspyynnöt aineistona

- Toimitus: vie tarjouspyynnöt yhteen tekstitiedostoon tai taulukkoon. Poista nimet, osoitteet, puhelinnumerot ja sähköpostit ennen toimitusta. Jätä kunta, palvelu, vapaa teksti ja päivämäärä.
- Mitä teen: lasken sanat ja ilmaukset (esim. "katon pesu", "katon maalaus", "sammal", "haalistunut"), ryhmittelen ne hakusanakartan riveille, teen UKK-kysymyksiä asiakkaiden omilla sanoilla ja listaan uudet artikkeliaiheet.
- Tulos tallennetaan `docs/tarjouspyynnot-sanasto-<pvm>.md` ilman henkilötietoja.

## 9. Vaiheet

| Vaihe | Sisältö | Julkaisu |
|---|---|---|
| 0 | Eerik vastaa kysymyksiin (luku 7) ja toimittaa tarjouspyynnöt. CLAUDE.md:hen kielisäännöt. | – |
| 1 | Pinnoituksen kaupunkisivun uusi runko: "Miksi ajoissa", pesu ja pinnoitus, maalaus = pinnoitus, Miksi Pintanen, prosessi täydennetty, UKK, paikallisosio lyhyeksi, kuntalinkit. Esimerkki Tampere, sitten kaikki 24. | PR, esikatselu, Eerikin ok |
| 2 | Maalauksen kaupunkisivu samalla kaavalla. | PR, esikatselu, ok |
| 3 | Pirkanmaa-sivut ja hintasivut: väärinymmärrykset, mitä hintaan kuuluu, UKK. | PR, ok |
| 4 | Tekninen: alt-tekstit, Service-schema, description, kokemuksia-sivun H2:t. | PR, virhekorjauksena suoraan |
| 5 | Etusivu myyväksi. | PR, ok |
| 6 | Arvostelurutiini ja yritysprofiili (Q&A, palvelut, kuvat kunnittain). Uudet artikkelit tarjouspyyntöjen aiheista, yksi viikossa. | jatkuva |
| 7 | Mittaus: Search Console 3.11. ja 1.12., vertailu lähtötasoon. | – |

Jokainen vaihe päättyy toimintatestiin (laskuri, tarjouspyyntö, liukusäädin) ja `verify_dist.py` + `verify_live.py`.
