# Kilpailijoiden artikkelit 26.10.2026: Sorcolor, Lummeco, Väriset

Tavoite: tietää, montako artikkelia kilpailijoilla on, mistä ne kertovat ja mitä lukuja niissä väitetään, jotta Pintasen omat artikkelit kattavat aiheet laidasta laitaan ja käyttävät samoja lukuja joka artikkelissa.

Menetelmä: kolmen sivuston sitemapit ja jokainen artikkelisivu haettiin 26.10.2026. Artikkelit luokiteltiin aiheen mukaan otsikosta ja osoitteesta, ja teksteistä poimittiin luvut (hinnat, vuodet, päivät, takuut, lämpötilat) ja menetelmäväitteet. Koko lista on liitteenä: `docs/kilpailijoiden-artikkelit-2026-10-26.csv` (377 riviä, puolipiste erottimena). Yleinen sivustovertailu (kaupunkisivut, arvostelut, rakenne) on erikseen tiedostossa `docs/kilpailija-analyysi-2026-10-26.md`.

## 1. Määrät yhdellä silmäyksellä

| | Sorcolor (`/blogi/`) | Lummeco (etusivun alla) | Väriset (`/tietopankki/`) | Pintanen (`/artikkelit/`) |
|---|---|---|---|---|
| Artikkeleita sitemapissa | 151 | 176 osoitetta, joista 19 ohjaa toiseen artikkeliin: 157 sivua | 69 | 8 (5 julkaistu, 3 jonossa) |
| Oppaita ja neuvoja | 101 | 141 | 66 | 8 |
| Yritysuutisia, rekrytointia, asiakastarinoita | 50 | 16 | 3 | 0 |
| Julkaistu viimeisen 12 kk aikana | 21 | 17 | 25 | 8 |
| Julkaisuvuodet | 2017–2026, eniten 2024 (37) | 2023–2026, 2023 48, 2024 44, 2025 48, 2026 16 | 2020–2026, 2026 jo 22 | 2026 |
| Tyypillinen pituus (mediaani, sanaa) | 424 | 719 | 832 | 300–480 |
| Pisin artikkeli | 1 588 | 3 128 | 1 964 | 482 |

Huomioita määristä:

- Lummecolla on 180 kaupunkikohtaista "artikkelia" samassa sitemapissa (esimerkiksi "Katon pinnoitus Nokia"). Ne eivät ole artikkeleita vaan kaupunkisivuja, ja ne jätettiin laskuista pois. Lummecon oppaista 39 on julkaistu samana päivänä 6.12.2023 ja 33 samana päivänä 25.9.2024. Samasta aiheesta on usein 5–10 lähes samanlaista tekstiä (esimerkiksi "Miten sammal vaikuttaa tiilikaton kestävyyteen" on kolmena eri osoitteena).
- Väristen 19 vanhinta artikkelia on päivätty 11.2.2020, joka on sivuston siirtopäivä, ei julkaisupäivä. Vuonna 2026 Väriset on julkaissut tammi–elokuussa 22 artikkelia, eli noin kolme kuukaudessa. Ne ovat pitkiä ja hintavetoisia.
- Sorcolorilla kolmannes blogista on yritystarinaa: työntekijähaastatteluja, kesätyöt, arvonnat, vastineita keskustelupalstoille. Opasartikkelit ovat lyhyitä, usein alle 400 sanaa.
- Pintasen artikkelit ovat kilpailijoiden lyhyimmän kolmanneksen pituisia. Väristen 2026-artikkelit ovat 1 000–2 000 sanaa ja nousevat hinta-hauissa.

## 2. Mistä he kirjoittavat

Aihejakauma (uniikit artikkelit, luokittelu otsikon perusteella):

| Aihe | Sorcolor | Lummeco | Väriset | Pintanen |
|---|---|---|---|---|
| Tiilikaton pinnoitus ja maalaus | 11 | 31 | 17 | 5 |
| Katon sammal, pesu, huolto, rännit | 12 | 50 | 16 | 0 (sääntö: ei uusia puhdistussisältöjä) |
| Talon ja seinien maalaus (myös sisämaalaus) | 62 | 46 | 25 | 2 |
| Peltikatto | 2 | 2 | 4 | 0 (ei markkinoida) |
| Terassi, öljyäminen, pihakalusteet | 0 | 10 | 1 | 0 |
| Taloyhtiöt | 7 | 0 | 1 | 0 |
| Kotitalousvähennys | 1 | 0 | 1 | 1 |
| Aurinkopaneelit | 0 | 0 | 1 | 0 |
| Yritys, rekrytointi, asiakastarinat | 50 | 16 | 3 | 0 |

Mitä jakaumasta seuraa:

- Katto on Lummecon pääaihe (81 kattoartikkelia), seinät Sorcolorin (62). Väriset on tasapainossa ja kirjoittaa eniten hinnoista: 12 artikkelia, joiden otsikossa on "hinta".
- Kaikki kolme kirjoittavat samoista 15–20 kysymyksestä. Erot ovat luvuissa, ei aiheissa. Luvut on koottu lukuun 3.
- Sorcolorin seinäartikkeleista noin 15 on sisämaalausta (keittiö, portaat, betonilattia, muuttomaalaus). Ne eivät koske Pintasta.

## 3. Mitä he väittävät: luvut aiheittain

Taulukossa on jokaisen sivuston yleisin väite ja sen vaihtelu. Viimeinen sarake on Pintasen lukittu arvo (lähteet: `CLAUDE.md`, `src/data/prices.ts`, `src/data/faqData.ts`, julkaistut artikkelit).

### Tiilikatto

| Asia | Sorcolor | Lummeco | Väriset | Pintanen |
|---|---|---|---|---|
| Milloin pinnoitus on ajankohtainen | 10–15 vuoden välein (2026). Vanhoissa teksteissä 15–20 vuoden välein (2020). | Ikäportaat: 0–10 v ei tarvetta, 10–18 v pesu ja kasvustonesto, 18–25 v pinnoitus. Toisaalla "yli 15 v vanha" tai "edellisestä pinnoituksesta 10–15 v", oppaassa "20–30 v asennuksesta". | 10–15 vuoden iässä. Pinnoitusväli 10–15 v. Yhdessä artikkelissa "noin 10 vuoden välein", toisessa "15 vuoden välein". | Noin 10–15 vuoden iässä. |
| Paljonko pinnoitus pidentää käyttöikää | Ei lukua. "Suojaa tiiltä jopa kymmeniä vuosia." | 15–25 vuotta (toistuu yli 20 artikkelissa). Oppaassa "optimiolosuhteissa 15–20, jopa 25". | 10–20 vuotta (2026). Vanhemmissa "jopa vuosikymmeniä". | Jopa 15 vuotta. |
| Tiilikaton koko käyttöikä | Ei lukua. | 50–60 v hoidettuna, uusiminen 20–30 v jälkeen jos laiminlyöty. Toisaalla 30–50 v. | 40–70 v, parhaimmillaan 100 v. Betonitiili 70 v, savitiili 100 v. | Ei lukua. Jos tarvitaan, lähde (valmistaja) kirjataan docs-kansioon. |
| Väritön suojakäsittely (kylläste) | Vaihtoehto pinnoitukselle: korkeapainepesu, torjunta-aine ja väritön kylläste, 800–2 000 €. | Kyllästeaine estää veden imeytymisen 5–7 v, ei uudista ulkonäköä. | Väritön pinnoite suojaa 5–7 v, 2 000–4 000 €. Tikkurila Kilpi Pro Block. | Ei tarjota. Pinnoitus on aina kaksi kerrosta maalia. |
| Pinnoituksen hinta, omakotitalo | Useimmat 2 500–5 500 €. Esimerkit: 150 m² 3 550 €, 200 m² 4 000 €, 250 m² 4 500 €. Toisaalla 100–150 m² 3 000–3 500 €, 150–200 m² 3 500–4 200 €, 200–300 m² 4 200–5 400 €. | Pinnoitus 2 500–6 500 € ja pesu 500–2 000 €. Pieni katto 2 500–3 500 €, 100–200 m² 3 500–5 000 €, yli 200 m² 5 000+ €. Neliöhinta 14–35 €/m². | 3 000–7 000 € maalauspinnoitus. Neliöhinta 15–25 €/m². Pieni katto 3 000–4 500 €. | 2 850–7 000 €. Kortit: 150–180 m² 2 850–3 200 €, 190–240 m² 3 300–3 700 €, 250–300 m² 3 750–4 880 €. Ei neliöhintoja. |
| Työn kesto | Ei lukua. | 3–5 työpäivää (150–200 m²), kuivuminen 1–3 pv ennen pinnoitusta, kovettuminen 7 pv. | Ei lukua. | 2–3 työpäivää peruskohteessa. |
| Takuu pinnoitukselle | 5 vuotta. | 5 vuotta. | Ei lukua artikkeleissa. | 5 vuotta kirjallisesti. |
| Pesu ja maalaus | Korkeapainepesu, kasvustontorjunta matalapaineruiskulla, pohjamaalaus ohennetulla maalilla, pintamaali korkeapaineruiskulla, aina kaksi kertaa. | Korkeapainepesu 250 bar, kasvustonestoaine, "pohjuste" tai "primer", pinnoite ruiskulla, telalla tai siveltimellä, 2–3 kerrosta. Tuote "TileGuard Pro", "keraami-polymeeripinnoite". | Painepesu, sammaleenpoistoaine matalapaineruiskulla, pohjamaali on 10–20 % ohennettua pintamaalia, pintamaali ruiskulla, reunat pensselillä. Tikkurila Kilpi Tiilikattomaali. | Painepesu, kasvustontorjunta-aine, rikkinäiset tiilet vaihdetaan, pohjamaali ja pintamaali korkeapaineruiskulla (aina kaksi kerrosta), reunat telalla. Nowocoat. Kielletyt sanat: tehopesu, pohjuste, pohjustus, primer. |
| Pelkkä painepesu ilman pinnoitusta | "Pelkkä painepesu ei ole suositeltava työohje", "tehokas pesuri syö pinnoitetta ja betonitiiltä". | Suosittelee pesua itse tehtynä ja myy pesua erikseen (500–2 000 €). Pinnoitetulle katolle matalapainepesu. | "Painepesuria ei tule käyttää, jos kattoa ei pinnoiteta", koska se kuluttaa tiilen pinnoitetta. | "Teemme pesun aina pinnoituksen yhteydessä." Puhdistus mekaanisesti, ei painepesua. Palvelu on loppunut. |
| Sammaleen esto pinnoituksen jälkeen | Sammalenestokäsittely vähintään 3 vuoden välein (taloyhtiöt). | Pinnoite estää sammaleen kasvua noin 5 vuotta. | Puhdistus 3–6 vuoden välein tuo 3–6 vuotta lisää elinkaarta. | Ei lukua. Ei luvata vuosia. |
| Paras ajankohta | Parhaat kuukaudet keväästä syksyyn, oma artikkeli. 10 artikkelia syksyn eduista. | Syksy on parasta aikaa (10 artikkelia). Lämpötila vähintään +15 °C ja kosteus alle 70 % yhdessä artikkelissa, toisessa +5–25 °C ja alle 80 %. | Kevät on parasta aikaa tarkistaa katto. | Kausi huhti–toukokuusta elo–syyskuuhun. Sateen jäljet korjataan ilman lisähintaa. |
| Kattoremontin hinta vertailuna | Peltikattoremontti 15 000–25 000 €. | Pinnoitus on 25–35 % uuden katon hinnasta. | Peltikattoremontti 15 000–20 000 €. | Kattoremontti 15 000–30 000 € (lähteet docs-kansiossa). |

### Talon maalaus

| Asia | Sorcolor | Lummeco | Väriset | Pintanen |
|---|---|---|---|---|
| Maalausväli, puutalo | 10–15 v useimmissa. Myös 7–15 v, "10 vuoden välein" ja "yli 9 v, tarkista kunto". | 7–15 v. Maalin mukaan: Tikkurila Vinha 8–10 v, Ultra ja Teknos Akrylin 10–15 v. Hirsi 8–12 v, rappaus 15–20 v, punamulta 7–15 v. | 10–15 v. | 10–15 vuoden välein. |
| Hinta, omakotitalo | 4 000–10 000 € (2026). Sama kirjoittaja: 4 000–15 000 € (2023, päivitetty 2026) ja 4 000–8 000 € (2024). Neliöhinta 25–35 €/m² ja toisaalla 17–40 €/m². Esimerkki: 100 m² talo 5 300 €, hilseilevänä 9 500 €. Rintamamiestalo 4 500–6 000 € tai 5 500–9 000 €. | 5 000–12 000 €, 20–40 €/m². Rapattu 25–45 €/m². Mökki 1 000–4 000 €. | 5 000–12 000 €, 20–40 €/m². Rintamamiestalo 5 000–10 000 €, 20–45 €/m². Rivitalo 15–40 €/m², 5 000–25 000 €. | 3 500–11 000 €. Kortit: 1-kerroksinen 3 500–5 000 €, 1,5-kerroksinen 5 000–7 000 €, 2-kerroksinen 7 000–11 000 €. Ei neliöhintoja, ei laskuesimerkkejä. |
| Työn kesto | 3–7 pv. Pieni 1-kerroksinen 2–3 pv, 2-kerroksinen 5–6 pv, rintamamiestalo 3–4 pv. | 3–5 työpäivää tai 3–10 pv. | 2–8 pv. | 3–7 päivää. Kortit: 2–4, 3–5 ja 4–8 työpäivää. |
| Takuu maalaukselle | 2 vuotta (2020 ja 2024) ja 3 vuotta (2023 ja 2026). Lisäksi tyytyväisyystakuu 1.5.2026 alkaen yli 3 750 € urakoille ja 10 vuoden lisätakuu huoltosopimuksella. | 3 vuotta ("nostettu 2:sta 3:een"). Yhdessä artikkelissa yhä 2 vuotta. Peltikatto 2 v. | Ei lukua ("annamme takuun"). | 2 vuotta. |
| Työvaiheet | Märkähomepesu harjalla ja letkulla, kaavinta, maali ruiskulla ja "aina hierotaan pensselillä". | Pesu, kaavinta, pohjamaalaus tarvittaessa, pintamaali. Oma artikkeli: ruiskumaalaus on "nopeaa, tehokasta ja riskialtista". Painepesu "harkiten". | Homepesu, kaavinta, pohjamaalaus paljaille kohdille, pintamaali. "Monesti talon maalaus suoritetaan pensselillä alusta loppuun", ruiskussakin pensselillä jälkihierto. | Homepesu harjoilla, kaavinta, kuivuminen, pohjamaali paljaisiin puukohtiin, pintamaali pensselillä (ei ruiskulla). Lautoja ei vaihdeta eikä lahoa korjata: ei väitetä kumpaakaan. |
| Maali | Teknos (Nordica), Tikkurila. | Tikkurila Vinha ja Ultra, Teknos Akrylin ja Nordica. | Tikkurila (Huoltopesu, Homeenpoisto, Maalilinja). | Pääsääntöisesti Tikkurila. |
| Sää | Yli +5 °C, ilmankosteus alle 80 %, pinta kuiva. Optimi +10–25 °C. | Yli +5 °C ja alle 80 % useimmissa. Myös +10–25 °C, +15–22 °C ja 18–22 °C eri artikkeleissa. Kosteus 30–70 %, 40–70 %, 45–60 % tai 50–70 %. | Vähintään +5 °C, alle 80 %. Optimi +10–25 °C, 40–70 %. | Vähintään +5 astetta ja puu kuivaa. |
| Kotitalousvähennys | 2026-artikkeleissa sekä 1 600 € / 3 200 € (pariskunta) että 2 100 € / 4 200 €. Prosentti 35 % (2024–2025). Yhdessä "jopa 2 250 €". | 35 %, enintään 1 600 €, omavastuu 150 € (artikkeli päivätty 2026). | 40 %, enintään 2 100 €, omavastuu 150 € (2026). Toisessa artikkelissa "ehdotettu korotus 40 %:iin". | 40 % työn osuudesta vuosina 2026 ja 2027, enintään 2 100 € vuodessa, pariskunta 4 200 €, omavastuu 150 €. |
| Kuntoarvio | Ilmainen kuntokartoitus ja kuntoraportti. | Katon kuntoarvio 149–249 € yhdessä, "maksuton (arvo 270 €)" toisessa, julkisivun kuntoarvio "0 € (arvo 180 €)" kolmannessa. | Maksuton kartoitus. | Ilmainen kuntotarkastus (katto) ja arviokäynti (seinät) samalla viikolla, myös iltaisin. Kirjallinen tarjous kiinteällä hinnalla. Ei erillistä raporttia. |
| Muut hinnat | Rännien puhdistus 200–500 €. Katon vuosihuolto 349–549 €/v. | Katon pesu 500–2 000 €, sammaleen poisto 6–10 €/m², terassin öljyäminen 25–40 €/m². | Rännien puhdistus 200–400 €, vuosihuolto alkaen 300 €. | Ei tällaisia palveluita. |

## 4. Missä kilpailijat sotivat itseään vastaan

Nämä löytyivät samalta sivustolta. Ne ovat juuri se, mitä Pintasen artikkeleissa pitää välttää.

1. **Sorcolor, maalauksen takuu**: 2 vuotta (2020, 2024) ja 3 vuotta (2023, 2026). Lukija ei tiedä, kumpi pätee.
2. **Sorcolor, pinnoitusväli**: 10–15 vuoden välein (2026) ja 15–20 vuoden välein (2020). Vanhoja artikkeleita ei ole päivitetty.
3. **Sorcolor, kotitalousvähennys**: samana vuonna 2026 yhdessä artikkelissa 1 600 € ja pariskunnalle 3 200 €, toisessa 2 100 € ja 4 200 €. Prosentti vaihtelee 35 ja 40 välillä.
4. **Sorcolor, maalauksen hinta**: 4 000–8 000, 4 000–10 000 ja 4 000–15 000 €. Neliöhinta 25–35 tai 17–40 €/m².
5. **Lummeco, pinnoitteen kesto**: 15–25 vuotta kymmenissä artikkeleissa, pääoppaassa 15–20 vuotta.
6. **Lummeco, pinnoituksen ajankohta**: 18–25 vuoden ikä, "yli 15 vuotta" ja "20–30 vuotta asennuksesta".
7. **Lummeco, maalauksen takuu**: 3 vuotta lähes kaikkialla, yhdessä 2025-artikkelissa 2 vuotta.
8. **Lummeco, kuntoarvion hinta**: 149–249 €, maksuton (arvo 270 €) ja 0 € (arvo 180 €).
9. **Lummeco, kotitalousvähennys**: 35 % ja 1 600 € artikkelissa, joka on päivätty 2026. Luvut ovat vuoden 2025.
10. **Lummeco, sää**: pinnoitukseen "vähintään +15 °C ja alle 70 %" ja "+5–25 °C, alle 80 %". Maalaukseen neljä eri lämpötilahaarukkaa.
11. **Lummeco, painepesu**: ohjeistaa pesemään katon itse painepesurilla, mutta toisaalla kertoo painepesun kuluttavan pintaa ja neuvoo matalapainepesua.
12. **Lummeco, samat artikkelit moneen kertaan**: 19 osoitetta ohjaa toiseen artikkeliin, ja syksyn sammalartikkeleita on 25 lähes samaa. Ne kilpailevat keskenään hauissa.
13. **Väriset, pinnoitusväli**: 10–15 vuotta, "noin 10 vuoden välein" ja "noin 15 vuoden välein". Käyttöiän pidennys 10–20 vuotta tai "jopa vuosikymmeniä".
14. **Väriset ja Sorcolor vastaan Lummeco, pesu**: Väriset ja Sorcolor kieltävät painepesun ilman pinnoitusta, Lummeco myy sitä. Pintasen linja on sama kuin Väristen ja Sorcolorin.

Yhteinen syy: luvut on kirjoitettu artikkeli kerrallaan eikä yhdestä lähteestä, ja vanhoja artikkeleita ei päivitetä, kun luku muuttuu (takuu, vähennys, hinta).

## 5. Pintasen faktapohja artikkeleihin

Nämä luvut ja sanat menevät jokaiseen artikkeliin samanlaisina. Lähde on aina `src/data/prices.ts`, `src/data/faqData.ts` tai `CLAUDE.md`, ei artikkeli.

| Fakta | Arvo |
|---|---|
| Pinnoitus on ajankohtainen | Noin 10–15 vuoden iässä. Merkit: haalistunut tai laikukas väri, karhea pinta, sammal palaa pian puhdistuksen jälkeen, halkeamat. |
| Pinnoitus pidentää käyttöikää | Jopa 15 vuotta. Ei "15–20", ei "15–25". |
| Pinnoituksen hinta | Yleensä 2 850–7 000 €. Koon mukaan: 150–180 m² 2 850–3 200 €, 190–240 m² 3 300–3 700 €, 250–300 m² 3 750–4 880 €. Hintaan kuuluu suojaus, pohjatyöt, pohjamaalaus, pintamaalaus, siivous ja takuu. Ei "alk.", ei €/m², ei laskuesimerkkejä. |
| Pinnoituksen kesto | 2–3 työpäivää peruskohteessa. |
| Pinnoituksen työvaiheet | Ilmainen kuntotarkastus, painepesu, kasvustontorjunta-aine, rikkinäiset tiilet vaihdetaan uusiin, pohjamaali ja pintamaali korkeapaineruiskulla (aina kaksi kerrosta), reunat telalla. Aluskate, läpiviennit, saumat ja piipun ympärys tarkistetaan aina. Maali: vain Nowocoat. |
| Pesu | Teemme pesun aina pinnoituksen yhteydessä. Pelkkää pesua ei tarjota, puhdistus oli mekaaninen. |
| Takuu | Pinnoitus 5 vuotta kirjallisesti, maalaus 2 vuotta. |
| Maalausväli, puutalo | 10–15 vuoden välein. Merkit: hilseily, haalistuminen, liituava pinta, homepilkut. |
| Maalauksen hinta | Yleensä 3 500–11 000 €. Koon mukaan: 1-kerroksinen 3 500–5 000 €, 1,5-kerroksinen 5 000–7 000 €, 2-kerroksinen 7 000–11 000 €. |
| Maalauksen kesto | 3–7 päivää. |
| Maalauksen työvaiheet | Homepesu harjoilla, kaavinta, kuivuminen, pohjamaali paljaisiin puukohtiin, pintamaali pensselillä (ei ruiskulla). Maali pääsääntöisesti Tikkurila. Lautoja ei vaihdeta eikä lahoa korjata: ei väitetä kumpaakaan. Myös hirsitalot, rintamamiestalot, mökit ja piharakennukset. |
| Sää | Vähintään +5 astetta ja puu kuivaa. Kausi huhti–toukokuusta elo–syyskuuhun. Sateen jäljet korjataan ilman lisähintaa. |
| Kotitalousvähennys | 40 % työn osuudesta vuosina 2026 ja 2027, enintään 2 100 € vuodessa, pariskunta 4 200 €, omavastuu 150 €. Työn osuus, ei maalit eikä matkat. |
| Kattoremontti vertailuna | 15 000–30 000 €. |
| Tilaaminen | Ilmainen kuntotarkastus tai arviokäynti samalla viikolla, myös iltaisin ja viikonloppuisin, asiakas paikalla. Kirjallinen tarjous kiinteällä hinnalla, kirjallinen sopimus ja aikataulu, yhteydenotto ennen aloituspäivää. Ennakkomaksu 10 % tarjouksen hyväksymisen jälkeen, loput työn valmistuttua. Ei matkakulua. Katto ja seinät samalla kertaa on edullisempi pakettihinta. |
| Yritys | Tamperelainen yritys, yrittäjä tekee työn itse, Eerik vastaa lopputuloksesta. Ei kohdemääriä, ei arvosteluja muuten kuin sanasta sanaan. |
| Sanat, joita ei käytetä | Tehopesu, pohjuste, pohjustus, primer, kattohuolto, "Pirkanmaan tyytyväisimmät asiakkaat", huutomerkit, "ei vain X vaan Y". Ajatusviiva on –. Otsikossa iso alkukirjain vain ensimmäisessä sanassa. |

Kilpailijoilta tulevat yleiset faktat (tiilen käyttöikä, ilmankosteus 80 %, maalin kuivumisajat) eivät kelpaa lähteeksi sellaisenaan. Ne tarkistetaan valmistajalta tai Verohallinnolta ja lähde kirjataan `docs/sisallon-lahteet-2026-10-12.md`-tiedostoon.

## 6. Aihekartta ja ehdotus artikkelilistaksi

Pintasen artikkelit nyt: milloin pinnoittaa, kotitalousvähennys, kuinka usein puutalo maalataan, pinnoitus vai uusi katto, pinnoituksen työvaiheet, huoltomaalaus vai uusi ulkoverhous (27.10.), voiko pinnoittaa itse (3.11.), pesu ja pinnoitus (10.11.).

Alla ovat aiheet, joista vähintään yksi kilpailija kirjoittaa ja joista Pintasella ei vielä ole artikkelia. Sulkeissa on, kenellä aihe on. Jako noin 65 % katto ja 35 % seinät. Kaikkiin riittää luvun 5 faktapohja, ellei toisin sanota. Hinnat vuosilukuotsikoissa ovat vuoden 2027 otsikoita, koska maalauskausi on ohi.

### Katto (noin 20 aihetta)

1. Tiilikaton pinnoituksen hinta 2027: mitä se maksaa katon koon mukaan (kaikki kolme). Luvut hintakorteista.
2. Milloin tiilikaton voi pinnoittaa: kuukaudet ja sää (Sorcolor, Lummeco 10 artikkelia). Kausi huhti–syyskuu, +5 astetta, sateen jäljet korjataan.
3. Pinnoitus ennen talvea: kestääkö kattosi talven (Sorcolor, Lummeco).
4. Betonitiili vai savitiili: miten ne eroavat ja kumpi pinnoitetaan (Sorcolor, Väriset). Yleiset faktat tarkistetaan valmistajalta.
5. Ormax-tiilikaton pinnoitus (Lummeco "Ormax-tiilikaton pesu"). Ormax saa mainita.
6. Aurinkopaneelit tiilikatolla: pinnoitus paneelien alla ja ympärillä (vain Väriset, ja sekin ohut). Pintasella on omia kohteita ja kuvia Tampereelta, Sastamalasta ja Valkeakoskelta.
7. Rikkinäisen kattotiilen vaihto: miksi vaihdamme tiilet ennen maalausta (Väriset).
8. Mitä ilmaisessa kuntotarkastuksessa katsotaan: aluskate, läpiviennit, saumat, piippu (Sorcolor "miksi tarjoamme ilmaisen kuntokartoituksen", Lummeco). Lista kohdista on tekoälyvastauksille vahva.
9. Miksi tiilikaton väri haalistuu ja pinta muuttuu karheaksi (Lummeco, Väriset).
10. Pinnoitetun tiilikaton hoito: mitä tehdä pinnoituksen jälkeen (Lummeco). Kysy Eerikiltä, mitä neuvomme, ettei siitä tule puhdistussisältöä.
11. Miksi maalaamme tiilikaton aina kahteen kertaan (Sorcolor UKK). Pintasen oma vahvuus: maalia aina tarpeeksi.
12. Mitä 5 vuoden takuu kattaa (Sorcolor "mitä takuu sinulle tarkoittaa"). Sisältö Eerikiltä.
13. Nowocoat: millainen maali tiilikatolle (ei kenelläkään). Valmistajan tiedot tarkistetaan Nowocoatin sivuilta.
14. Mökin tiilikaton pinnoitus (Lummeco vapaa-ajan asunnot). Mökit ovat sallittuja.
15. Tiilikaton pinnoitus Pirkanmaalla: miten työ etenee tilauksesta valmiiseen kattoon, sopimus, aikataulu, 10 % ennakko (ei kenelläkään selkeästi).
16. Sade pinnoituksen aikana ja jälkeen: mitä tapahtuu ja mitä korjaamme (Lummeco "kovettuminen 7 päivää", tarkistettava Nowocoatilta).
17. Pinnoitus vai väritön suojakäsittely: miksi teemme vain värillisen maalauksen (Sorcolor, Lummeco, Väriset). Vaatii Eerikin perustelun.
18. Katto ja seinät samalla kertaa: pakettihinta (Väriset "Talon julkisivun ja katon maalaus").
19. Tiilikaton pinnoitus taloyhtiössä tai rivitalossa (Sorcolor 7, Väriset). Vain jos Eerik tekee taloyhtiökohteita.
20. Kattoremontin hinta 2027 vai pinnoitus (kaikki). Olemassa oleva artikkeli päivitetään vuosiluvulla, ei uutta.

Ei tehdä: sammal- ja pesuartikkelit (Lummeco 50 kpl), peltikaton maalaus (Sorcolor, Lummeco, Väriset), katon vuosihuolto ja rännit (Sorcolor, Väriset). Nämä ovat vastoin sääntöjä "ei uusia puhdistussisältöjä" ja "peltikattoja ei markkinoida".

### Seinät (noin 11 aihetta)

21. Talon maalauksen hinta 2027: mitä se maksaa talon koon mukaan (kaikki kolme). Luvut hintakorteista, ei €/m².
22. Ruiskulla vai pensselillä: miksi maalaamme pensselillä (Väriset, Lummeco, Sorcolor). Kilpailijat myöntävät, että ruiskun jälkeen pitää hieroa pensselillä. Tästä ei väitetä mitään kilpailijoista.
23. Milloin talon voi maalata: lämpötila, kosteus ja kuukausikalenteri (Sorcolor 6 artikkelia, Väriset, Lummeco). Pintasen luku on +5 astetta, kosteusraja tarkistetaan Tikkurilalta.
24. Rintamamiestalon maalaus (Sorcolor, Lummeco, Väriset).
25. Hirsitalon maalaus (Sorcolor, Lummeco). Maalaamme hirsitaloja.
26. Mökin ja piharakennusten maalaus (Lummeco 6, Sorcolor, Väriset).
27. Mustat pilkut ja home ulkoseinässä: miksi pesemme ennen maalausta (Väriset, Lummeco).
28. Miksi vanha maali kaavitaan pois (Sorcolor, Väriset).
29. Kuinka kauan talon maalaus kestää: 3–7 päivää ja mitä päivinä tapahtuu (Sorcolor).
30. Talon värin valinta ja vaihto (Sorcolor 3, Väriset, Lummeco). Ei faktoja yrityksestä, Tikkurilan värikartat.
31. Miten valitset maalausliikkeen: kysymykset ennen tilausta (Sorcolor, Väriset). Vain Pintasen omat syyt, ei väitteitä muista.

Kysyttävä Eerikiltä ennen kirjoittamista: sokkelin maalaus (Lummeco, Väriset), punamultamaalaus (kaikki kolme), kattoremontin yhteistyö ja taloyhtiöt. Jos Pintanen ei tee näitä, niistä ei kirjoiteta.

Tahti: kilpailijat julkaisevat 1–3 artikkelia kuukaudessa, Väriset 2026 kolme. Pintasen sääntö on yksi viikossa. Listassa on 31 aihetta eli noin 8 kuukautta.

## 7. Mitä ei kannata kopioida

- Neliöhinnat, hinnastot ja laskuesimerkit (Lummeco, Väriset, Sorcolor). Vastoin hintasääntöjä.
- Itse tehdyn painepesun ohjeet ja pesun myynti erikseen (Lummeco). Pintasen linja on Väristen ja Sorcolorin: pesu vain pinnoituksen kanssa.
- Sanat pohjuste, primer ja tehopesu (Lummeco), keksityt tuotenimet ("TileGuard Pro", "keraami-polymeeripinnoite").
- Samasta aiheesta kymmenen lähes samaa artikkelia (Lummeco). Yksi hyvä artikkeli aihetta kohti.
- Yritystarinat, arvonnat ja vastineet keskustelupalstoille blogissa (Sorcolor). Ei sovi Pintasen tyyliin.
- Rahoitus, verkkokauppa, taloyhtiöt ilman Eerikin päätöstä (Väriset, Sorcolor).
- Lupaukset "estää sammaleen 5 vuotta" tai "kestää 15–25 vuotta" ilman lähdettä. Pintanen sanoo "jopa 15 vuotta".

## Liite

`docs/kilpailijoiden-artikkelit-2026-10-26.csv`: sivusto, julkaisupäivä, aihe, sanamäärä, otsikko ja osoite jokaisesta 377 artikkelista. Julkaisupäivä on sivun oma `article:published_time`. Väristen "2020-02-11" on sivuston siirtopäivä.
