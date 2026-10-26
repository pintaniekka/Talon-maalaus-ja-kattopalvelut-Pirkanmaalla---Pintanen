# Search Console -analyysi (yöajo 2, paketti H)

Päivämäärä 26.10.2026. Lähde: Search Console OpenSEO-yhteyden kautta (ominaisuus `sc-domain:pintanen.fi`), ei CSV-vientiä. Jaksot: 16 kuukautta (26.6.2025–23.10.2026) kokonaiskuvaan ja 3 kuukautta (23.7.–23.10.2026, 930 kysely–sivu-riviä) nykyisten osoitteiden tarkasteluun, koska osoitteet uusittiin lokakuussa 2026. Luvut ovat Googlen keskiarvoja, ja viimeiset kolme päivää voivat olla vajaita. Vertailupiste ennen tätä: `docs/search-console/tulokset-28pv-2026-10-26.md`.

Tiivistelmä: lähes kaikki klikkaukset ovat brändihakuja (16 kk: "pintanen" ja "pintanen oy" yhteensä 299 klikkausta, kaikki muut kyselyt yhteensä noin 30). Rahakyselyillä on paljon näyttöjä mutta sijoitukset 10–50, ja etusivu näkyy niissä omien palvelusivujen edellä. Neljä asiaa ratkaisee: (1) Tampereen palvelusivujen nousu etusivun ohi, (2) "tiilikattoremontti [kunta]" -haut, joihin sivusto ei vastaa, (3) etusivun klikkausprosentti sijoilla 2–10 ja (4) puhdistussivujen kohtalo.

## 1. Mitä 16 kuukautta kertoo

| Kysely | Näytöt | Klikit | Sijainti | Huomio |
| --- | --- | --- | --- | --- |
| tiilikaton pinnoitus tampere | 1 090 | 3 | 19,6 | Tärkein tavoitehaku |
| tiilikaton maalaus tampere | 981 | 2 | 11,9 | Sama tarve toisella sanalla |
| talon maalaus pirkanmaa | 844 | 0 | 35,7 | |
| talon maalaus tampere | 712 | 0 | 50,7 | |
| maalaus tampere | 698 | 1 | 9,2 | Yleishaku, etusivu |
| maalausliike tampere | 663 | 2 | 8,4 | Yleishaku, etusivu |
| tiilikaton pinnoitus hinta | 569 | 0 | 47,0 | Hintasivu |
| ulkomaalaus tampere | 506 | 2 | 32,5 | |
| katon pinnoitus tampere | 418 | 0 | 20,1 | |
| ulkomaalaus pirkanmaa | 346 | 1 | 12,1 | |
| julkisivumaalaus tampere | 341 | 1 | 5,9 | Etusivu sijalla 6, ei klikkauksia |
| tiilikaton pinnoitus nokia | 311 | 1 | 8,1 | Paras kaupunkisivu |
| tiilikatto pinnoitus hinta | 300 | 0 | 55,9 | |
| katon maalaus tampere | 289 | 1 | 36,6 | |
| talon maalaus hinta | 275 | 0 | 45,9 | |
| tiilikaton pinnoitus lempäälä | 275 | 0 | 11,4 | |
| maalausliike pirkanmaa | 245 | 0 | 34,8 | |
| katon puhdistus tampere | 242 | 0 | 27,9 | Palvelu loppunut |
| talon maalaus lempäälä | 237 | 0 | 26,1 | |
| sammaleen poisto tampere | 234 | 0 | 22,6 | Palvelu loppunut |
| katon puhdistus hinta | 228 | 0 | 54,6 | Palvelu loppunut |
| kattojen pesu tampere | 225 | 0 | 22,4 | Palvelu loppunut |
| pinnoitus tampere | 209 | 1 | 7,1 | |
| katon puhdistus sammaleesta hinta | 209 | 0 | 57,0 | Palvelu loppunut |
| tiilikattoremontti pälkäne | 200 | 0 | 25,3 | Ei omaa vastausta, ks. luku 4 |
| peltikaton pinnoitus tampere | 183 | 0 | 14,5 | Ei markkinoida |
| omakotitalon maalaus hinta | 182 | 0 | 47,5 | |
| tiilikattoremontti huittinen | 188 | 0 | 29,9 | |
| tiilikattoremontti parkano | 176 | 0 | 27,7 | |
| tiilikattoremontti hämeenkyrö | 171 | 0 | 17,3 | |
| talon maalaus hämeenlinna | 156 | 0 | 34,4 | |
| kattopinnoite tampere | 152 | 0 | 6,8 | Etusivu sijalla 7, ei klikkauksia |

Kaikki "tiilikattoremontti [kunta]" -haut yhteensä 16 kk: noin 2 200 näyttöä 16 kunnassa, 0 klikkausta. Kaikki "peltikaton maalaus/pinnoitus [kunta]": noin 480 näyttöä, 0 klikkausta. Puhdistus- ja pesuhaut: noin 1 400 näyttöä, 0 klikkausta.

Sivut 16 kk: etusivu 448 klikkausta ja 11 785 näyttöä (sijainti 9,8). Seuraavaksi parhaat: `/talon-maalaus-pirkanmaa/` 23 klikkausta (1 581 näyttöä, sijainti 28), `/katon-puhdistus-forssa/` 13, `/maalauspalvelut-huittinen/` 12, `/katon-puhdistus-hameenlinna/` 11, `/maalauspalvelut-hinta-pirkanmaa/` 10, `/maalauspalvelut-pirkkala/` 10. Tampereen palvelusivut: `/tiilikaton-pinnoitus-tampere/` 3 klikkausta (399 näyttöä, sijainti 43,7), `/talon-maalaus-tampere/` 2 klikkausta (1 350 näyttöä, sijainti 50).

## 2. Kannibalisointi (3 kk): monta omaa sivua samalla haulla

Taulukossa kysely, näytöt yhteensä ja omat sivut, joilla vähintään 10 näyttöä (näytöt ja sijainti). Lihavoitu sivu on se, jonka pitäisi näkyä.

| Kysely | Näytöt | Sivut |
| --- | --- | --- |
| tiilikaton pinnoitus tampere | 927 | etusivu 277 (13,5), tiilikaton-pinnoitus-pirkanmaa 264 (43,8), maalauspalvelut-tampere 256 (17,6), **tiilikaton-pinnoitus-tampere 49 (52,4)**, katon-puhdistus-tampere 44 (72) |
| tiilikaton maalaus tampere | 958 | maalauspalvelut-tampere 377 (4,8), etusivu 351 (10,6), tiilikaton-pinnoitus-pirkanmaa 172 (60,8), **tiilikaton-pinnoitus-tampere 35 (63,8)** |
| talon maalaus pirkanmaa | 1 030 | talon-maalaus-hinta-pirkanmaa 182 (29,2), etusivu 178 (17,7), **talon-maalaus-pirkanmaa 175 (49,6)**, talon-maalaus-forssa 97 (82), maalauspalvelut-pirkkala 89 (90), talon-maalaus-tampere 64 (83) ja 6 muuta |
| talon maalaus tampere | 676 | **talon-maalaus-tampere 235 (45,2)**, talon-maalaus-hinta-pirkanmaa 171 (53,3), etusivu 101 (18,1), maalauspalvelut-tampere 46 (41), 3 muuta kaupunkisivua |
| ulkomaalaus pirkanmaa | 571 | etusivu 126 (4,3), maalauspalvelut-pirkkala 87 (38,8), **talon-maalaus-pirkanmaa 85 (39,7)**, talon-maalaus-hinta-pirkanmaa 55 (54), 8 muuta |
| ulkomaalaus tampere | 453 | **talon-maalaus-tampere 159 (42,1)**, etusivu 140 (10,1), maalauspalvelut-tampere 68 (27,2), 4 muuta |
| katon pinnoitus tampere | 262 | etusivu 126 (6,5), tiilikaton-pinnoitus-pirkanmaa 73 (35,8), maalauspalvelut-tampere 29 (17,5), **tiilikaton-pinnoitus-tampere 17 (53,5)** |
| julkisivumaalaus tampere | 305 | etusivu 196 (1,6), **talon-maalaus-tampere 101 (34,5)** |
| tiilikaton pinnoitus nokia | 219 | **tiilikaton-pinnoitus-nokia 117 (10,6)**, maalauspalvelut-nokia 89 (14,9) |
| tiilikaton pinnoitus lempäälä | 143 | maalauspalvelut-lempaala 100 (10,9), **tiilikaton-pinnoitus-lempaala 13 (26,1)** |
| talon maalaus lempäälä | 190 | maalauspalvelut-lempaala 100 (25,3), talon-maalaus-hinta-pirkanmaa 41 (45), **talon-maalaus-lempaala 35 (24,9)** |
| talon maalaus hämeenlinna | 98 | maalauspalvelut-hameenlinna 42 (23,1), **talon-maalaus-hameenlinna 38 (23,1)** |

Mitä tämä tarkoittaa:

- Tampereen palvelusivut (julkaistu lokakuussa 2026) ovat sijoilla 45–64, kun vanha aluesivu `/maalauspalvelut-tampere/` on sijalla 5–18 ja etusivu 7–18 samoilla hauilla. Google ei ole vielä siirtänyt painoa uusille sivuille. Aluesivulla on vain 1 sisäinen linkki ja Tampereen palvelusivuilla 30–33 (`docs/linkkikartta-2026-10-27.md`), eli linkitys on jo kunnossa. Ikä ratkaisee: aluesivu on ollut olemassa koko 16 kk, palvelusivu kolme viikkoa. Korjaus #118 (26.10.) teki aluesivun otsikot neutraaleiksi ja lisäsi etusivulle suorat linkit; sen vaikutus ei näy vielä tässä aineistossa.
- Hintasivu `/talon-maalaus-hinta-pirkanmaa/` näkyy "talon maalaus [kunta]" -hauilla palvelusivujen edellä. Hintasivu kertoo hinnan ja linkittää kaupunkisivuille, joten tämä ei ole paha kannibalisointi: hakija saa hinnan. Ei muutosta nyt.
- Pienissä kunnissa (Lempäälä, Hämeenlinna, Nokia) aluesivu ja palvelusivu ovat lähes tasoissa. Kun palvelusivut ikääntyvät, aluesivun pitäisi jäädä taakse, koska sen title ei enää sisällä palvelusanoja.
- Vanhat osoitteet (`/alue/...`, `/kattopalvelut/...`, `/hinnat/...`) saavat yhä näyttöjä 16 kk:n aineistossa, mutta 3 kk:n aineistossa niitä ei ole: 301-ohjaukset toimivat.

## 3. Sijat 4–20: nopeimmat voitot (3 kk, vähintään 20 näyttöä)

| Kysely | Näytöt | Klikit | Sijainti | Sivu | Toimenpide |
| --- | --- | --- | --- | --- | --- |
| maalausliike tampere | 485 | 2 | 9,8 | etusivu | Etusivun kuvaus (tehty) ja title (H1) |
| maalaus tampere | 348 | 0 | 9,5 | etusivu | sama |
| julkisivumaalaus tampere | 305 | 0 | 14,1 (etusivu 1,6) | etusivu | sama; "julkisivumaalaus" on Tampereen maalaussivun kuvauksessa jo |
| tiilikaton pinnoitus nokia | 219 | 0 | 15,5 | tiilikaton-pinnoitus-nokia | Odotetaan, title ja H1 kunnossa |
| pinnoitus tampere | 144 | 0 | 11,8 | etusivu | Etusivun title (H1) |
| kattopinnoite tampere | 95 | 0 | 5,9 | etusivu | Sana "kattopinnoite" puuttuu sivustolta: B-paketin artikkeli "Kattopinnoite vai kattomaali" |
| tiilikaton pinnoitus hinta | 93 | 0 | 19,2 | tiilikaton-pinnoitus-hinta-pirkanmaa | Title on jo "Tiilikaton pinnoitus hinta 2027: 2 850–7 000 €"; odotetaan |
| tiilikaton pinnoitus laskuri | 82 | 0 | 13,9 | tiilikaton-pinnoitus-hinta-pirkanmaa | Hintasivun H2 "Laske oman kattosi hinta minuutissa" riittää; `/hintalaskuri/` ei nouse, koska sen sisältö on laskuri ilman tekstiä (H2) |
| katon pinnoitus | 82 | 0 | 16,9 | etusivu | Yleishaku, ei toimenpidettä |
| tiilikattoremontti mänttä-vilppula, valkeakoski, lempäälä, tampere | 98, 92, 77, 33 | 0 | 14–18 | aluesivut | Aluesivun UKK (tehty, luku 4) |
| talon maalaus hinta laskuri | 54 | 1 | 18,3 | talon-maalaus-hinta-pirkanmaa | Kuten pinnoituksen laskuri |
| paljonko maksaa talon maalaus | 28 | 0 | 18,5 | talon-maalaus-hinta-pirkanmaa | Hintasivun UKK vastaa jo; odotetaan |
| tiilikaton sammaleen poisto | 24 | 0 | 10,1 | katon-puhdistus-hinta-pirkanmaa | Puhdistus, ks. luku 5 |

Epäolennaiset haut, joilla etusivu on sijoilla 2–8 (jauhemaalaus, pulverimaalaus, parkkiruutujen maalaus, sisämaalaus, rakennusmaalaus, polyureapinnoitus, teollisuusmaalaamo): yhteensä noin 700 näyttöä 16 kk. Ne eivät haittaa, mutta selittävät osan etusivun matalasta klikkausprosentista.

## 4. Kyselyt, joille ei ole omaa sivua

| Hakuryhmä | Näytöt 3 kk | Mihin osuu nyt | Ratkaisu |
| --- | --- | --- | --- |
| tiilikattoremontti [kunta] (15 kuntaa) | noin 1 500 | aluesivut sijoilla 15–45 | **Tehty:** aluesivun UKK:hon "Tiilikattoremontti vai pinnoitus [kunta]?" vastauksella pinnoitus 2 850–7 000 € vs. remontti 15 000–30 000 € ja linkki artikkeliin "Pinnoitus vai uusi katto". Hakija, joka luulee tarvitsevansa remontin, saa vastauksen omalta kuntasivulta |
| peltikaton maalaus / pinnoitus [kunta] | noin 400 | aluesivut ja etusivu, sijat 14–60 | **Tehty:** aluesivun UKK:hon "Maalaatteko myös peltikattoja?" samalla vastauksella kuin pinnoituksen UKK:ssa (Eerik 26.10.2026). Peltikattoa ei markkinoida, mutta hakija saa vastauksen |
| katon puhdistus / pesu / sammaleen poisto [kunta] | noin 600 | puhdistussivut sijoilla 20–60 | Palvelu on loppunut. Ohjaussuunnitelma luvussa 5, päätös Eerikille (H3) |
| maalausliike / maalausfirmat / maalaus tampere | noin 970 | etusivu sijoilla 5–14 | Etusivun kuvaus (tehty) ja title-kysymys H1 |
| tiilikaton pinnoitus laskuri, talon maalaus hinta laskuri, katto hintalaskuri | noin 150 | hintasivut sijoilla 14–18 | Ei uutta sivua: hintasivut vastaavat ja linkittävät laskuriin. `/hintalaskuri/`-sivulle ei lisätä tekstiä ilman lupaa (ulkoasu) |
| kattourakoitsija (yleinen) | 92 | etusivu 15,7 | Ei toimenpidettä, ei paikallinen |
| katonkorjaus / kattotyö tampere | 63 | etusivu 12–18 | Vastaus riippuu kysymyksestä K3 (pienet kattokorjaukset) `docs/asiakaskysymykset-2026.md`-tiedostossa |
| englanninkieliset (painting, roofing, coating, painting contractor) | noin 300 (16 kk) | etusivu | Ei englanninkielistä sivua; ei toimenpidettä |

## 5. Puhdistussivut: ohjaussuunnitelma

Puhdistuspalvelu on loppunut (Eerik 11.10.2026), ja CLAUDE.md:n mukaan sivut poistetaan talven 2026–2027 aikana 301-ohjauksella pinnoitussivuille. Aineisto tukee sitä: puhdistussivut saavat yhä näyttöjä (3 kk: `/katon-puhdistus-tampere/` 204, `/katon-puhdistus-hinta-pirkanmaa/` 127) ja 16 kk:n aineistossa `/katon-puhdistus-forssa/` (13 klikkausta) ja `/katon-puhdistus-hameenlinna/` (11) ovat sivuston parhaita sivuja etusivun jälkeen. Kun ohjaus tehdään, nämä klikkaukset siirtyvät pinnoitussivuille, joiden UKK sanoo jo "pesu aina pinnoituksen yhteydessä".

Ehdotettu ohjaus (ei tehty, odottaa päätöstä H3):

| Vanha | Uusi |
| --- | --- |
| `/katon-puhdistus-pirkanmaa/` | `/tiilikaton-pinnoitus-pirkanmaa/` |
| `/katon-puhdistus-hinta-pirkanmaa/` | `/tiilikaton-pinnoitus-hinta-pirkanmaa/` |
| `/katon-puhdistus-<kunta>/` (8 kuntaa) | `/tiilikaton-pinnoitus-<kunta>/` |

Toteutus: reitit pois `routes.ts`:stä ja `App.tsx`:stä, vanhat polut `legacyRedirects`-listaan, puhdistuksen UKK:t ja sisällöt pois datasta, sitemapin prioriteetti 0.3 poistuu itsestään. Artikkeli "Tiilikaton pesu ja pinnoitus" jää, koska se kertoo, miksi pesu ei riitä.

## 6. Sivut, joilla näyttöjä mutta ei klikkauksia (3 kk, yli 300 näyttöä)

| Sivu | Näytöt | Klikit | Sijainti | Syy ja toimenpide |
| --- | --- | --- | --- | --- |
| etusivu | 4 300 | 55 | 12 | Klikit brändistä. Muilla hauilla sijat 2–10 ilman klikkejä: kuvaus muutettu, title-kysymys H1 |
| /talon-maalaus-hinta-pirkanmaa/ | 1 110 | 2 | 25 | Näkyy "talon maalaus [kunta]" -hauilla sijoilla 30–50. Ei muutosta: hintasivu on oikea vastaus hinta-hauille, ja kaupunkihaut siirtyvät palvelusivuille niiden ikääntyessä |
| /maalauspalvelut-tampere/ | 1 020 | 2 | 25 | Vanha aluesivu kantaa Tampereen hakuja. Korjaus #118 ohjaa palvelusivuille |
| /talon-maalaus-tampere/ | 700 | 0 | 45 | Uusi sivu, sijainti liian kaukana klikkeihin. Odotetaan ja seurataan |
| /tiilikaton-pinnoitus-pirkanmaa/ | 670 | 0 | 44 | Näkyy "tiilikaton pinnoitus tampere" -haulla, jolle Tampereen sivu on oikea. Ei muutosta |
| /tiilikaton-pinnoitus-tampere/ | 300 | 0 | 50 | Kuten maalauksen Tampere-sivu |
| /maalauspalvelut-pirkkala/ | 400 | 2 | 45 | "ulkomaalaus pirkanmaa", "talon maalaus pirkanmaa": aluesivu näkyy Pirkanmaa-hauilla, koska Pirkkala ja Pirkanmaa muistuttavat toisiaan. Ei muutosta |
| /maalauspalvelut-lempaala/ | 380 | 0 | 22 | "tiilikaton pinnoitus lempäälä" sijalla 11: Lempäälän palvelusivu (26) ei vielä ohita. Odotetaan |

Indeksointi tarkistettiin (`inspect_urls`): Tampereen palvelusivut, Pirkanmaa-sivut, hintasivut, hintalaskuri ja aluesivu ovat indeksissä, kanoninen osoite on oikea ja viimeisin indeksointi 14.–26.10.2026. Rikastetuista tuloksista Google tunnistaa murupolun; UKK-schema ei enää tuota rikastettua tulosta muille kuin viranomaissivuille, joten sen puuttuminen listasta on normaalia.

## 7. Muutokset tässä PR:ssä

1. `src/pages/ServiceAreaPage.tsx`: aluesivun UKK:hon kaksi kysymystä, "Tiilikattoremontti vai pinnoitus [kunta]?" ja "Maalaatteko myös peltikattoja?". Vastaukset ovat samat kuin yleisessä ja pinnoituksen UKK:ssa.
2. `src/data/seo.ts`: etusivun kuvaus alkaa sanalla "Tamperelainen" (Eerik 5.10. ja 11.10.2026: tamperelainen yritys) ja loppu lyhenee ("Oy" ja "kirjallinen" pois), jotta pituus pysyy alle 160 merkin. Vanha: "Pintanen Oy pinnoittaa tiilikattoja ja maalaa taloja Pirkanmaalla ja lähikunnissa. Eerik ja Eemil tekevät työn itse. Ilmainen arviokäynti ja kirjallinen takuu."
3. Tämä raportti.

Ei muutoksia title-tageihin, H1-otsikoihin, hintakortteihin tai vanhoihin teksteihin. Ei uusia 301-ohjauksia.

## 8. Kysymykset Eerikille

- **H1. Etusivun title.** Nyt "Tiilikaton pinnoitus ja talon maalaus Pirkanmaa | Pintanen" ja H1 "Tiilikaton pinnoitus ja talon maalaus Pirkanmaalla". Etusivu näkyy hauilla "maalausliike tampere" (sija 9,8), "julkisivumaalaus tampere" (1,6), "ulkomaalaus pirkanmaa" (4,3), "katon pinnoitus tampere" (6,5) ja "kattopinnoite tampere" (5,9) lähes ilman klikkauksia. Vaihtoehdot: (a) pidetään nykyinen ja odotetaan Tampereen palvelusivujen nousua; (b) "Tiilikaton pinnoitus ja talon maalaus Tampere | Pintanen" (56 merkkiä), jolloin etusivu kilpailee Tampereen palvelusivujen kanssa; (c) "Maalausliike Tampere: tiilikaton pinnoitus ja talon maalaus" (60 + brändi = 71 merkkiä, katkeaa). Suositus: (a) nyt, (b) uudelleen harkintaan tammikuussa, jos palvelusivut eivät ole nousseet.
- **H2. Hintalaskurisivu.** Haut "tiilikaton pinnoitus laskuri" ja "talon maalaus hinta laskuri" (yhteensä noin 150 näyttöä 3 kk) osuvat hintasivuille, ei `/hintalaskuri/`-sivulle, jolla ei ole tekstiä laskurin ympärillä. Saako laskurisivulle lisätä yhden tekstikappaleen ja UKK:n laskurin alle (ulkoasumuutos)? Jos ei, nykyinen tilanne on hyvä: hintasivu vastaa ja linkittää laskuriin.
- **H3. Puhdistussivujen 301.** Tehdäänkö luvun 5 ohjaus nyt marraskuussa vai vasta keväällä? Ohjaus on yhden PR:n työ. Aineisto puoltaa nyt: puhdistussivut tuovat 3 kk:ssa noin 600 näyttöä palvelulle, jota ei ole.
- **H4. Peltikattohaut.** "peltikaton maalaus/pinnoitus [kunta]" saa noin 400 näyttöä 3 kk. Pidetäänkö linja "ei markkinoida", vai haluatko yhden artikkelin "Peltikaton maalaus: milloin se kannattaa ja mitä se vaatii", joka ohjaa kysymään tarjousta? Nyt vastaus on vain UKK:ssa.
- **H5. Kattopinnoite.** "kattopinnoite tampere" (95 näyttöä, etusivu sijalla 5,9): saako B-pakettiin artikkelin "Kattopinnoite vai kattomaali: mitä sanat tarkoittavat", jossa kerrotaan, että Nowocoat on kattomaali ja pinnoitus tarkoittaa samaa työtä?

## 9. Seuranta

Sama analyysi kannattaa toistaa tammikuussa 2027 (3 kk:n jakso 24.10.2026–23.1.2027). Mittarit: Tampereen palvelusivujen sijainti hauilla "tiilikaton pinnoitus tampere" ja "talon maalaus tampere" (nyt 52 ja 45), etusivun osuus näistä hauista (nyt 30 % näytöistä), "tiilikattoremontti [kunta]" -hakujen klikkaukset (nyt 0) ja ei-brändiklikkaukset viikossa (nyt noin 2).
