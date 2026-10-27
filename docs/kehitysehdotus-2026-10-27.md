# Pintanen.fi: kehitysehdotus 27.10.2026

Tämä on yhteenveto kaikista 34 dokumentista `docs/`-kansiossa (auditoinnit, hakutulos- ja kilpailija-analyysit, Search Console, suorituskyky, saavutettavuus, yöajojen raportit, artikkeliohjelma, asiakaskysymykset). Tavoite on edelleen ykkössija Pirkanmaan hauissa "tiilikaton pinnoitus [kaupunki]", "talon maalaus [kaupunki]" ja hinta-hauissa sekä tekoälyvastauksissa. Dokumentti kertoo, missä ollaan, mikä estää ykkössijan, mitä tehdään seuraavaksi ja mitä Eerikin pitää päättää.

## 1. Missä ollaan

**Sivusto on teknisesti valmis.** 94 sivua, kaikki prerenderöity, Lighthouse mobiili 93 ja työpöytä 100 (mediaani 91 sivulta, 26.10.), LCP mobiilissa 2,9 s, saavutettavuus 100 kontrastikorjauksen jälkeen, 0 rikkinäistä linkkiä, schemat kunnossa, 431 ohjaussääntöä. Kaupunkisivuilla on yksilöllinen paikallinen sisältö, kartat, talokanta ja rakennusjärjestysten värisääntö. Sisältöä on enemmän kuin yhdelläkään kilpailijalla kaupunkitasolla. Jonossa on 54 artikkelia huhtikuun 2027 loppuun.

**Haku ei vielä tuo asiakkaita.** Search Console 16 kk (data alkaa 15.2.2026): 27 711 näyttöä, 710 klikkiä, joista 299 brändihakuja ja etusivulta 448. Palvelusivut ovat saaneet alle 100 klikkiä kahdeksassa kuukaudessa. Lokakuussa näyttökerrat kolminkertaistuivat (100–140 → 260–360 päivässä 12.10. alkaen) uusien sivujen myötä, mutta klikkaukset eivät vielä: CTR 1,2 %.

| Haku | Näytöt 16 kk | Klikit | Sija | Mikä sivu näkyy |
|---|---|---|---|---|
| tiilikaton pinnoitus tampere | 1 090 | 3 | 19,6 | Pirkanmaa-sivu ja etusivu, ei Tampere-sivu |
| tiilikaton maalaus tampere | 981 | 2 | 11,9 | aluesivu maalauspalvelut-tampere |
| talon maalaus pirkanmaa | 844 | 0 | 35,7 | 10 eri sivua |
| talon maalaus tampere | 712 | 0 | 50,7 | 8 eri sivua |
| tiilikaton pinnoitus hinta | 569 | 0 | 47,0 | artikkeli, ei hintasivu |
| maalausliike tampere | 663 | 2 | 8,4 | etusivu |
| julkisivumaalaus tampere | 341 | 1 | 5,9 | etusivu |
| tiilikaton pinnoitus nokia | 311 | 1 | 8,1 | Nokian sivu |

Sijoitusseuranta 26.10. (mobiili, Tampere, 30 hakua): top 10 viidellä haulla, sijat 11–14 seitsemällä, ja **10 haulla 30:stä Google näyttää väärän sivun**. Paikallisessa karttaruudukossa "tiilikaton pinnoitus" keskisija 2,2, eli Google-profiili toimii paremmin kuin sivusto.

**Tekoälyvastaukset** (25 kysymystä, ChatGPT, Gemini, AI Overview): Pintanen mainitaan 10 vastauksessa 64:stä (16 %). Tampere-kysymyksissä pintanen.fi on useimmin lainattu lähde (16 kertaa, priimamaalaus 11, loistepinta 8). Yleiskysymyksissä (kesto, takuu, kotitalousvähennys, Nowocoat, Ormax, sammal) 0 mainintaa. Googlen AI Overview näkyi 58 haussa 60:stä, eikä Pintanen ollut kertaakaan lähteenä.

**Kilpailijat** voittavat kahdessa asiassa: linkit ja sisällön määrä. Linkittäviä sivustoja: pintanen.fi 2, lummeco 62, variset 128, sorcolor 157. Top 100 -hakusanoja: pintanen 2, lummeco 498, variset 465, sorcolor 472. Artikkeleita: Sorcolor 151, Lummeco 157, Väriset 69, Pintanen 6 julkaistua. Kilpailijoiden artikkelit ovat 420–830 sanaa, meidän 300–480.

## 2. Mikä estää ykkössijan

1. **Luottamus puuttuu.** Kaksi linkittävää sivustoa ja ensimmäinen kokonainen vuosi verkossa. Google näyttää sivustoa paljon (näytöt kasvavat), mutta ei nosta sitä kärkeen. Tämä ratkeaa vain linkeillä, arvosteluilla ja ajalla, ei sivuston muutoksilla.
2. **Google valitsee väärän sivun.** Tampere-hauilla näkyvät etusivu, Pirkanmaa-sivu ja aluesivu, ja kaupunkihauilla toisen kunnan sivu. Syitä on kolme ja kaikki ovat totta: sivut ovat liian samanlaisia, kaupunkisivut toistavat "Pirkanmaa" ja "Tampere", ja uudet sivut ovat kaksi viikkoa vanhoja. Korjaukset 26.–27.10. (sivuroolit, alatunniste, Pirkanmaa-toistot 5 kunnalta) ovat oikeat, mutta vasta puolivälissä.
3. **Klikkausprosentti on heikko hyvilläkin sijoilla.** "maalausliike tampere" sijalla 8 ja 663 näyttöä: 2 klikkiä. Etusivun title ja kuvaus eivät vastaa hakuihin, joilla se näkyy.
4. **Yleiskysymyksissä ei ole lainattavaa.** Takuusta, Nowocoatista, Ormaxista ja kestosta ei ole omaa, selkeää H2-tason vastausta yhdellä sivulla, ja artikkelit ovat lyhyitä.
5. **Mittarit puuttuvat.** GA4:ssä ei ole avaintapahtumaa tarjouspyynnöille, sijoitusseuranta ja tekoälyseuranta ovat pois päältä, ja tuotannon nopeutta ei ole mitattu kenttädatalla.
6. **Jonossa on sisältöä, jonka faktoja ei ole vahvistettu.** Neljä artikkelia (10.12. harjatiiviste, 24.12. lasku toisen nimiin, 1.3. katto ja seinät samalla kertaa, 26.4. aurinkopaneelit) julkaistuvat automaattisesti oletuksilla, joihin Eerik ei ole vastannut.

## 3. Ehdotus: kuusi painopistettä

Järjestys on vaikutuksen mukaan. Jokaisen kohdalla lukee, kuka tekee ja milloin.

### P1. Linkit, arvostelut ja Google-profiili (Eerik, marraskuu–maaliskuu)

Suurin yksittäinen tekijä. Tavoite: 10–15 linkittävää sivustoa ja 50 Google-arvostelua kevääseen 2027 mennessä.

- Ilmaiset yritysprofiilit, joissa kilpailijat jo ovat: urakkamaailma.fi, omaurakka.fi, remppakamu.fi, kodinplaza.fi, kokemuksia.fi, Trustmary. Listat osoitteineen: `docs/hakutulosanalyysi-2026-10-26.md` luku 7 ja `docs/kilpailijat-hakusanat-2026-10-28.md` kohta 3 b (38 sivustoa, jotka linkittävät vähintään kahteen kilpailijaan).
- Toimittajat ja yhteistyö: Nowocoat (jälleenmyyjä- tai urakoitsijalista), Tikkurila (ammattilaishaku), paikallinen maalikauppa, Pirkanmaan Yrittäjät. Linkin kohde aina `/tiilikaton-pinnoitus-tampere/`, toiseksi hintasivu, kolmanneksi `/talon-maalaus-tampere/`.
- Maksulliset vasta, jos ilmaiset on tehty: pintaurakoitsijat.fi, kauppakamari (Eerik päättää, kysymys D3).
- Google-profiili: 8 valmista julkaisua maanantaille 2.11.–21.12. (`docs/gbp-julkaisut-2026-11.md`), vastaukset viiteen arvosteluun, joihin ei ole vastattu, toimialat ja palvelut (`docs/yritysprofiili-2026-10-14.md`), arvostelupyyntö jokaisen työn jälkeen tekstiviestillä.
- Claude tekee: valmiit tekstit profiileihin, sähköpostipohjat toimittajille ja arvosteluvastausten luonnokset.

### P2. Kannibalisoinnin loppuun vienti (Claude, marraskuun 1. viikko, seuranta 1.12.)

- "Pirkanmaa"- ja "Tampere"-toistot pois leipätekstistä kaikilta 24 kaupunkisivulta ja 24 aluesivulta, yksi maininta riittää (tehty 5:lle).
- Hintasivu hintahakujen kohteeksi: `/tiilikaton-pinnoitus-hinta-pirkanmaa/` saa ensimmäiseen kappaleeseen suoran vastauksen "paljonko tiilikaton pinnoitus maksaa" ja artikkeli "pinnoitus vai uusi katto" linkittää hintasivulle tarkalla ankkurilla. Hinta-aiheista ei kirjoiteta uutta artikkelia (ristiriita ratkaistu: artikkeli vie hintahaun jo nyt).
- Etusivun description ja title vastaamaan hakuihin, joilla etusivu jo näkyy: "maalausliike Tampere" ja "julkisivumaalaus Tampere" mukaan kuvaukseen; title pidetään, uudelleenarvio tammikuussa.
- Aluesivut `/maalauspalvelut-<kunta>/`: ei 301:tä vielä. Päätös 1.12. Search Consolen kysely–sivu-datalla: jos Tampere-haut näkyvät yhä aluesivulla, aluesivun palveluosio lyhennetään pelkäksi linkkikortiksi.
- Mittari: Tampere-sivujen sija (nyt 52 ja 45 keskimäärin, mobiilissa 14 ja 12) ja etusivun osuus Tampere-hauista (nyt 30 %).

### P3. Tekoälyvastaukset yleiskysymyksissä (Claude, marraskuu)

- Takuu omaksi H2-osioksi palvelusivuille ja UKK:hon: mitä 5 ja 2 vuotta kattavat (tarvitaan Eerikin vastaus, kysymys A5).
- Ormax-UKK pinnoitussivuille ("Voiko Ormax-tiilikaton pinnoittaa?") ja Nowocoat-kappale: mitä maali on ja miksi se (artikkeli 21.1. jonossa, kappale sivulle heti).
- Kestot yhteen muotoon koko sivustolla: pinnoitus "2–3 työpäivää, suuri tai jyrkkä katto 2–4", maalaus "3–7 päivää". Nyt `prices.ts`:n maalauskortti sanoo 2–4 ja kolme artikkelia samoin (kysymys A6).
- Jonossa olevien artikkelien pituus: kilpailijoiden mediaani 700+ sanaa, meidän 300–480. Artikkelit, joiden aihe on tärkeä (kotitalousvähennys, Nowocoat, tiilikaton kesto, milloin maalata), laajennetaan 800–1 000 sanaan ennen julkaisupäivää.
- Tekoälyseuranta kerran kuussa (150 krediittiä), seuraava ajo 1.12.

### P4. Oikeat kohteet ja tarinat (Eerik antaa materiaalin, Claude rakentaa; joulukuu–tammikuu)

Tämä erottaa Pintasen kilpailijoista pysyvästi, mutta sitä ei voi tehdä ilman Eerikiä.

- 5–10 toteutunutta kohdetta: kunta, katon tai talon koko, toteutunut hinta, vuosi, asiakkaan lupa. Niistä referenssikortit hintasivuille ja kaupunkisivuille.
- Asiakastarinat omina sivuina Google-arvosteluista ja kohdekuvista (28 arvostelua on jo).
- 2–3 puhelinvideota (pesu, ruiskutus, tyytyväinen asiakas) VideoObject-schemalla.
- Kohteet kuntakartoille pisteinä kaupunginosan tarkkuudella.
- "Yli 200 kohdetta" selitetään Meistä-sivulla (katot yli 130, talot yli 80, mistä vuodesta), koska asiakas on jo epäillyt lukua.

### P5. Sisällön johdonmukaisuus ja jonon tarkistus (Claude, marraskuu; Eerik vastaa kysymyksiin)

- Neljä automaattisesti julkaistuvaa artikkelia (10.12., 24.12., 1.3., 26.4.) tarkistetaan Eerikin vastauksilla ennen päivää tai siirretään.
- Jonon 54 artikkelin aihelista Eerikin hyväksyttäväksi (hylättävät slugit), ja aiheet, jotka menevät päällekkäin (kesto ja Nowocoat kahdessa dokumentissa), yhdistetään.
- Säännöt ajan tasalle CLAUDE.md:hen: kaksi artikkelia viikossa, alatunnisteen viisi linkkiä, hintakorttien "alk."-luvut 40 %:lla, esimerkkitaulukot sallittu korttien luvuilla.
- Sanat, jotka ovat sääntöjen rajalla: "pinnoittaa ja huoltaa tiilikattoja" tekijäesittelyssä ja "Katon huoltomaalaus" Google-profiilissa (sääntö kieltää "kattohuollon"); "etätarjousta ei tehdä" vs. käytäntö tarjota kuvista. Eerik päättää (kysymykset A7, A8).
- Rakennusjärjestystekstit 24 kunnalle: 16 kunnan sääntö vanhenee 1.1.2027, tarkistus tammikuussa kalenteriin; 7 kunnan asiakirjat puuttuvat.

### P6. Tekniikka ja prosessi (Claude, pieniä PR:iä marraskuussa)

Kaikki näkymättömiä, ei tarvitse esikatselua:

- `verify_dist.py` palauttamaan virhekoodin, jotta CI kaatuu löydöksiin.
- E2E-työn verify_live odottamaan oikeaa esikatselubuildia (nyt voi testata edellisen pushin).
- `llms.txt` linkittämään `llms-full.txt`:hen; `axe-sallitut.json`:sta kontrastisääntö pois.
- Hintalaskurin kahdelle valintakuvalle `priority`; artikkelien `Figure`-kuville mitat (CLS).
- GA4-avaintapahtuma tarjouspyynnölle ja soitolle (Eerik GA4:ssä, Claude koodissa `generate_lead`).
- react-router 7 ja 35 käyttämättömän shadcn-komponentin siivous omana PR:nä.
- Myöhemmin, ei nyt: Content-Security-Policy, kriittinen CSS (FOUC-riski), etusivun karusellin DOM-koko.

## 4. Mitä ei tehdä

Päätetty aiemmin ja pysyy: peltikattoja ei markkinoida (vain UKK), puhdistussisältöjä ei tehdä (puhdistussivut ohjautuvat jo pinnoitussivuille), ei neliöhintoja, ei rahoitusta, ei kuntasivujen monistusta tuhansille paikkakunnille, ei palvelujen ulkopuolisia artikkeleita (punamulta, terassin öljyäminen, sokkeli), ei HowTo-schemaa, ei kriittisen CSS:n inlinettämistä.

## 5. Päätökset Eerikiltä

Dokumenteissa on yhteensä noin 60 avointa kysymystä. Alla ne 15, jotka vaikuttavat sisältöön tai rahaan. Loput ovat teknisiä ja Claude päättää ne oletuksilla.

**A. Faktat, joita ilman sisältö jää vajaaksi tai väärään muotoon**

1. Harjatiiviste ja harjatiilet: kuuluvatko hintaan vai lisätyö? (artikkeli 10.12.)
2. Aurinkopaneelit: irrotetaanko vai suojataan paikallaan? (artikkeli 26.4.)
3. Katto ja seinät samalla kertaa: kumpi ensin ja kauanko yhteensä? (artikkeli 1.3.)
4. Lasku voi olla toisen henkilön nimissä vähennystä varten: saako näin sanoa? (artikkeli 24.12.)
5. Takuu: mitä 5 vuotta ja 2 vuotta kattavat ja mitä eivät? (P3)
6. Maalauksen kesto: hintakortti sanoo 1-kerroksiselle 2–4 päivää, sääntö 3–7. Kumpi?
7. "Pinnoittaa ja huoltaa tiilikattoja" ja Google-profiilin "Katon huoltomaalaus": pidetäänkö?
8. Etätarjous kuvista: sivusto sanoo "ei", käytännössä tarjotaan. Kumpi linja?
9. Toiminta-alueen raja: Loimaa, Hämeenlinna, Kirkkonummi kyllä vai ei?
10. Kuullote hirsitaloon: teettekö ja suositteletteko?

**B. Strategia**

11. Aluesivut: jos Tampere-haut näkyvät 1.12. yhä aluesivulla, lyhennetäänkö aluesivun palveluosio linkkikortiksi?
12. Jonon 54 artikkelia: lista hyväksyttäväksi, hylättävät slugit.

**C. Raha**

13. OpenSEO: tekoälyseuranta kuukausittain (150 krediittiä/kk) ja sijoitusseuranta kerran kuussa käsin (noin 950 krediittiä): kyllä vai ei?
14. Maksulliset hakemistot (pintaurakoitsijat.fi, kauppakamari): kyllä vai ei?

**D. Materiaali**

15. 5–10 toteutunutta kohdetta hintoineen ja lupineen, 2–3 puhelinvideota, vastaukset viiteen Google-arvosteluun.

## 6. Aikataulu ja mittarit

| Milloin | Mitä | Kuka |
|---|---|---|
| vko 45 (2.–8.11.) | P2 kannibalisointi loppuun, P6 pienet PR:t, GBP-julkaisu 1, profiilit 3 kpl | Claude, Eerik |
| vko 46–47 | P3 takuu, Ormax, Nowocoat, kestot; artikkelien laajennus; vastaukset A1–A10 | Claude, Eerik |
| 1.12. | Search Console -mittaus, sijoitusseuranta, tekoälyseuranta; päätös aluesivuista | Claude |
| joulukuu | P4 kohteet ja tarinat, jos materiaali on tullut; linkit 5 kpl | Eerik, Claude |
| tammikuu | rakennusjärjestysten tarkistus, etusivun title uudelleen, toinen mittaus | Claude |
| maaliskuu | 10–15 linkkiä, 50 arvostelua, kauden avaus | Eerik |

Tavoitteet, joilla ykkössija todetaan tai hylätään:

| Mittari | Nyt (26.10.) | 1.2.2027 | 1.5.2027 |
|---|---|---|---|
| tiilikaton pinnoitus tampere, sija (mobiili, oikea sivu) | 14, väärä sivu | top 10, oikea sivu | top 3 |
| talon maalaus tampere | 12, väärä sivu | top 10, oikea sivu | top 5 |
| tiilikaton pinnoitus hinta | 47 | top 20, hintasivu | top 10 |
| ei-brändiklikit viikossa | noin 2 | 15 | 40 |
| tekoälymaininnat 25 kysymyksessä | 16 % | 30 % | 50 % |
| linkittävät sivustot | 2 | 8 | 15 |
| Google-arvostelut | 28 | 38 | 50 |

## 7. Ristiriidat dokumenteissa, ratkaistu tässä

- Väärän sivun syy: linkitys, samankaltaisuus ja ikä ovat kaikki totta. Linkitys on korjattu, samankaltaisuus korjataan P2:ssa, ikä odotetaan 1.12. asti.
- Hinta-artikkelit: ei kirjoiteta, hintasivut ovat kohde.
- Julkaisutahti: kaksi viikossa, koska jono on jo rakennettu niin; CLAUDE.md päivitetään.
- Hintalaskurisivun teksti: Eerik hyväksyi 26.10., PR #146 on tuotannossa.
- Puhdistussivut: ohjautuvat jo pinnoitussivuille; dokumentit, jotka sanovat muuta, ovat vanhentuneet.
- Peltikatto: ei artikkelia, vain UKK.
- Kesto- ja Nowocoat-artikkelit: paketti B:n artikkelit (25.2. ja 21.1.) riittävät, erillisiä ei tehdä.
