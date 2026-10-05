# pintanen.fi – SEO- ja GEO-auditointi, lokakuu 2026

**Päiväys:** 5.10.2026
**Kohde:** pintanen.fi, repon `Talon-maalaus-ja-kattopalvelut-Pirkanmaalla---Pintanen` versio `0a1fb20` (merge PR #78), tuotantobuild `npm run build` 5.10.2026 → 97 esirenderöityä sivua.
**Lähtötason data:** Search Consolen vienti 30.6.–29.9.2026 (ennen 5.10.2026 julkaisua: 30 uutta kaupunkisivua, uusi etusivu, maalauksen kaupunkisivujen uudet tekstit). Luvut kuvaavat vanhaa sivustoa, eivät nykytilaa.
**Tekijä:** Claude Code (automaattinen auditointi). Sivustoa ei muutettu. Yhtään lomaketta ei lähetetty.

> **Tärkein rajoite:** live-sivustoa pintanen.fi ei tavoitettu tästä ympäristöstä (välityspalvelin estää yhteyden). Kaikki tekniset havainnot on tehty repon koodista ja paikallisesta tuotantobuildista (`vite preview`). Se, mitä ei tällä tavalla voi nähdä (HTTP-statukset, Cloudflaren uudelleenohjaukset, todelliset latausajat, indeksoinnin tila), on listattu luvussa 11.

## Lukuohje

| Merkintä | Tarkoitus |
|---|---|
| **[Tarkistettu]** | Havainto on todettu koodista, buildista, kuvakaappauksesta tai Search Consolen viennistä. |
| **[Oletus]** | Päätelmä, jota ei voitu varmistaa (esim. live-palvelimen käytös tai yrityksen tosiasiat). |
| **Search Console** | Luku on suoraan viennistä (30.6.–29.9.2026). |
| **arvio** | Luku on oma arvio, ei mitattu. |
| Vaikutus | suuri / keskisuuri / pieni (hakunäkyvyys + liidit + luottamus). |
| Työmäärä | arvio tunteina koodityötä; "teksti" = pelkkä tekstimuutos datatiedostoon. |

Säännöt, joita ehdotuksissa noudatetaan: ei keksittyjä lukuja, referenssejä, kohteita tai arvosteluja; yksinkertainen suomi, lyhyet virkkeet, sinuttelu ja me-muoto; pinnoituksen hinta 2 850–7 000 € ilman "alk."-sanaa, ei neliöhintaa, ei minimihintaa, ei hinnastotaulukoita, ei laskuesimerkkejä; hintakortteihin ei kosketa; katto pestään painepesulla ja maalataan ruiskulla kahteen kertaan (pohjamaali ja pintamaali), ei sanoja tehopesu/pohjuste/primer; rikkinäiset tiilet vaihdetaan uusiin; ei väitetä seinien tai pihan suojaamista kattotyössä; talon maalaus = homepesu, kaavinta, pohjamaali paljaisiin kohtiin, pintamaali pensselillä; lautoja ei vaihdeta; ei paikkakuntakohtaisia kohdemääriä. Katon puhdistuksen sivuja ei ehdoteta parannettavaksi (palvelu poistuu); niistä mainitaan vain virheet, jotka vuotavat muille sivuille.

## Yhteenveto

Sivusto on teknisesti hyvässä kunnossa: jokaisella 97 sivulla on yksi H1, oma title ja kuvaus, canonical, JSON-LD (yritys, WebSite, murupolku, Service, FAQ), sivukartat, llms.txt, ja esirenderöinti toimii. Uudet 30 kaupunkisivua ja etusivun ensimmäinen osio ovat selvästi parasta tasoa: tekstit ovat yksinkertaisia, faktat (Tilastokeskuksen talokanta, etäisyydet, kylät) ovat lähteistettyjä ja ulkoasu on moderni.

Suurimmat ongelmat ovat kolmessa paikassa:

1. **Näkyvyys ennen JavaScriptiä.** Kaikilla alasivuilla hero-osio (H1 ja ingressi) on esirenderöity `opacity:0`-tilaan ja näkyy vasta, kun ~220 kB (gzip) JavaScriptiä on ladattu ja ajettu. Etusivulla näin ei ole. Kuvat `32–34-*-ennen-javascriptia.jpg` näyttävät eron. Tämä hidastaa koettua latausta erityisesti puhelimella ja vie etusivun modernin ilmeen hyödyn alasivuilta.
2. **Ristiriitaiset luvut ja väitteet.** Sama asia sanotaan sivustolla monella eri tavalla: katon lisäikä "10–15" ja "15–20 vuotta", pinnoitus "10–20 % uuden katon hinnasta" vaikka hintasivun luvuilla osuus on 10–47 %, maalauksen hinta kolmena eri haarukkana, "alkaen 2 050 €" / "jopa alle 2 100 €" vastoin sääntöä, yritys on sekä "pirkanmaalainen" että "Oulusta kotoisin", ja kaikilla 24 pinnoituksen kaupunkisivulla yrittäjä sanoo hoitavansa pinnoitukset "Tampereella" ja tuntevansa "tamperelaiset katot". Tekoälyhaku poimii juuri tällaiset lauseet.
3. **Sivut kilpailevat keskenään Tampereen maalaushauista.** Search Consolessa "talon maalaus tampere" (394 näyttöä, sija 46,7) ja "talon maalaus pirkanmaa" (425 näyttöä, sija 31,2) tuottivat nolla klikkiä, vaikka hauille on kolme–viisi mahdollista laskeutumissivua. Etusivu, Tampereen aluesivu, Talon maalaus Tampere ja Talon maalaus Pirkanmaa tarvitsevat selvät roolit ja johdonmukaiset sisäiset linkit.

Lisäksi: FAQ-vastaukset ja pinnoituksen työvaiheet eivät ole lainkaan HTML:ssä (vain JSON-LD:ssä tai vasta klikkauksen jälkeen), arvostelukaruselli toistaa samat arvostelut neljä kertaa jokaisen sivun HTML:ssä, ja kaikki yleiset sisäiset linkit osoittavat osoitteisiin ilman loppukauttaviivaa, vaikka canonical on kauttaviivallinen.

## 1. Kymmenen tärkeintä korjausta (vaikutuksen mukaan)

| # | Korjaus | Sivut | Mikä on vialla | Ehdotus | Vaikutus | Työmäärä (arvio) |
|---|---|---|---|---|---|---|
| 1 | **Hero näkyväksi ilman JavaScriptiä ja etusivun hero-tyyli kaikille alasivuille** | kaikki 96 alasivua | `ServicePageHero` ja useimmat osiot käyttävät framer-motionin `initial={{opacity:0}}` → esirenderöidyssä HTML:ssä H1, ingressi ja 20–64 % sivun sanoista on `opacity:0`, kunnes ~220 kB gzip JS on ladattu (`verify_dist.py`: mediaani 32 %, max 81 %). Etusivun `Hero.tsx` ei käytä motionia ja näkyy heti. [Tarkistettu] | Poista sisääntuloanimaatio hero-osiosta ja ensimmäisestä näytöllisestä (tai aja animaatio vain hydrauksen jälkeen `initial={false}` esirenderöinnissä). Rakenna alasivujen hero samalla pohjalla kuin etusivun: valkoinen kortti, vasemmalle tasattu H1, keltainen pääpainike, kuva oikealla, luottamusrivi kortin sisällä. | suuri | 6–10 h (hero-komponentti + animaatiolinja) |
| 2 | **Lopeta Tampereen maalaushakujen keskinäinen kilpailu** | `/`, `/maalauspalvelut-tampere/`, `/talon-maalaus-tampere/`, `/talon-maalaus-pirkanmaa/`, `/talon-maalaus-hinta-pirkanmaa/` | Search Console: "talon maalaus tampere" 394 näyttöä sija 46,7, "talon maalaus pirkanmaa" 425 näyttöä sija 31,2, "ulkomaalaus tampere" 278 sija 25,6, "maalausliike tampere" 504 sija 5,2 – yhteensä 0–2 klikkiä. Aluesivun title "Tiilikaton pinnoitus ja talon maalaus Tampere" ja etusivun H1 "Tiilikaton pinnoitus ja talon maalaus Pirkanmaalla" kattavat samat sanat kuin palvelusivut. [Tarkistettu luvut; sivujen keskinäinen järjestys on arvio, koska viennissä ei ole kysely×sivu-tietoa] | Anna jokaiselle sivulle yksi päätehtävä ja näytä se titlessä ja H1:ssä: etusivu = yritys + kaksi palvelua Pirkanmaalla; `/talon-maalaus-pirkanmaa/` = "Talon maalaus Pirkanmaa – ulkomaalaus ja julkisivumaalaus"; `/talon-maalaus-tampere/` = "Talon maalaus Tampere – ulkomaalaus ja julkisivumaalaus"; aluesivu = "Maalaus- ja kattopalvelut Tampere" (kokoava sivu, joka linkittää alasivuille). Linkitä aluesivulta ja etusivulta palvelusivuille aina ankkurilla "Talon maalaus Tampere" / "Tiilikaton pinnoitus Tampere". Lisää sana "julkisivumaalaus" näkyvään tekstiin maalaussivuilla (221 näyttöä sijalla 1,3, 0 klikkiä). | suuri | 3–5 h |
| 3 | **Yhtenäiset luvut ja sääntöjen mukaiset hintalauseet** | n. 60 sivua | Katon lisäikä "15–20 vuotta" (etusivu + 24 aluesivua + 24 pinnoituksen kaupunkisivun meta) vs "10–15 vuotta" (palvelusivu, artikkeli, FAQ). Pinnoitus "noin 10–20 % uuden katon hinnasta" ja "säästää jopa 15 000 euroa" (26 sivua) vs hintasivun 2 850–7 000 € ja 15 000–30 000 €. "Kotitalousvähennyksen jälkeen hinta on alkaen 2 050 €" (hintasivu, artikkeli, llms.txt), "jopa alle 2 100 €" (25 sivun FAQ). Maalauksen hinta: 3 500–11 000 € (hintasivu), "4 000–8 000 €" (palvelusivun FAQ), "3 000–10 000 €" (TalonMaalaus.tsx FAQ), "5 000–6 500 €" (24 kaupunkisivun FAQ), "n. 2000–10 000 €" (Sastamalan meta). [Tarkistettu] | Valitse yksi luku per asia ja käytä sitä kaikkialla: lisäikä 10–15 v (lähde: oma artikkeli), pinnoitus 2 850–7 000 €, maalaus 3 500–11 000 €. Poista "alkaen"-lauseet hero-tekstistä, artikkelista ja llms.txt:stä (hintakortteihin ei kosketa). Korvaa prosentti- ja säästöväitteet lauseella "Pinnoitus maksaa yleensä selvästi vähemmän kuin uusi katto." Sanamuodot luvussa 5. | suuri | 2–3 h tekstiä |
| 4 | **Kaupunkisivujen yhteinen runko ei saa väittää vääriä paikkakuntia** | 24 pinnoituksen ja 24 maalauksen kaupunkisivua | `PinnoitusEntrepreneur.tsx` sanoo joka sivulla "Hoidan tiilikattojen pinnoitukset Tampereella" ja "tamperelaiset katot" (24 sivua). `PinnoitusProblemSection.tsx` ja `MaalausCitySections.tsx` antavat samalle kuvalle alt-tekstin "…pinnoituksen jälkeen Orivesi" / "Keltainen puutalo ennen maalausta – Valkeakoski", vaikka kuva on sama kaikilla sivuilla (todellinen kohde on Referenssit-sivun mukaan Tampere). [Tarkistettu] | Käytä yrittäjätekstissä `cityIn`-muotoa tai neutraalia "Pirkanmaalla". Poista paikkakunta alt-teksteistä, joiden kuva ei ole kyseiseltä paikkakunnalta; käytä kuvan oikeaa paikkaa tai jätä paikka pois. Tämä on myös sääntö "ei keksittyjä kohteita". | suuri | 1 h |
| 5 | **FAQ-vastaukset ja työvaiheet näkyviin HTML:ään** | 91 FAQ-sivua, 24 pinnoituksen kaupunkisivua, palvelusivut | Radix-haitarin sisältöä ei renderöidä suljettuna: FAQ-vastaukset ovat vain JSON-LD:ssä (`<script>`), eivät sivun tekstissä; pinnoitusprosessin kuusi vaihetta puuttuvat HTML:stä kokonaan ("Poistamme pinttyneen lian…", "Tikkurilan ja Nowocoatin…" = 0 osumaa buildissa). Googlen ohje: FAQ-schemaa vastaavan sisällön pitää olla sivulla näkyvissä; tekoälyhaut lukevat HTML:n, eivät klikkaa. [Tarkistettu] | Renderöi vastaukset HTML:ään (`forceMount` + CSS-piilotus tai natiivi `<details>`), tai näytä ensimmäiset 2–3 vastausta avoimena. Sama prosessihaitarille. | suuri | 2–3 h |
| 6 | **Ohenna kaupunkisivujen toistoa** | 24 + 24 kaupunkisivua, aluesivut | Arvostelukaruselli monistaa samat 9 arvostelua neljä kertaa HTML:ään (38 "Google-arvostelu"-lohkoa per pinnoitussivu, 26 per maalaussivu). Kaupunkisivut ovat 2 560–2 660 sanaa ja 86–88 % tekstistä on sama kuin muilla kaupungeilla (`sivujen_paallekkaisyys.py`; ilman karusellia ja aluelinkkipalkkia 81 %). Toiminta-alueet-palkki lisää noin 70 linkkiä jokaiselle sivulle. [Tarkistettu] | Renderöi karusellin kopiot vasta selaimessa (`aria-hidden`, ei esirenderöintiin). Siirrä paikallinen sisältö (hook, talokanta, kohteet, paikallinen FAQ) ylös ja lyhennä yhteistä runkoa. Näytä Toiminta-alueet-palkki vain etusivulla, toiminta-alueet-sivulla ja aluesivuilla; muualla riittää naapurikuntien linkit. | keskisuuri–suuri | 4–6 h |
| 7 | **Sisäiset linkit canonical-muotoon (loppukauttaviiva)** | kaikki sivut | Header, Footer, Hero, ToimintaAlueetBanner ym. linkittävät muotoon `/hintalaskuri`, `/tarjouspyynto`, `/maalauspalvelut-x` – 97 sivulla yhteensä yli 2 000 linkkiä ilman kauttaviivaa, vaikka canonical ja sivukartta ovat kauttaviivallisia. Cloudflare Pages ohjaa `/x` → `/x/` (308) [Oletus: dokumentoitu käytös, ei testattu livenä]. Search Consolessa on jo 4 kauttaviivatonta URL:ia näyttökerroilla. [Tarkistettu] | Lisää kauttaviiva kaikkiin `to=`/`href=`-arvoihin (yksi hakukorvaus) ja lisää lint-sääntö tai testi, joka estää kauttaviivattomat sisäiset linkit. | keskisuuri | 1 h |
| 8 | **Meistä-sivun faktat kuntoon** | `/meista/`, schema | Hero: "Olemme pirkanmaalainen perheyritys"; seuraava kappale: "Pintanen on uudehko Oulusta kotoisin oleva perheyritys". Schema: osoite Tampere 33300. Lisäksi "sisäpinnat", "Suuret taloyhtiöt" ja "Leikkimökeistä taloyhtiöihin" – Search Consolessa "sisämaalaus pirkanmaa" 74 näyttöä. Luvut: etusivu "200+ projektia", aluesivut "Yli 200 onnistunutta urakkaa", Meistä "200+ tyytyväistä asiakasta", pinnoitus "Yli 100 pinnoitettua kattoa" + maalaus "Yli 60 maalattua taloa". [Tarkistettu] | Kirjoita yksi totuus (Eerik päättää): mistä yritys on, missä se toimii, tehdäänkö sisämaalausta ja taloyhtiöitä. Käytä samaa lukusarjaa joka sivulla (esim. "yli 100 kattoa, yli 60 taloa" tai "yli 200 urakkaa" – ei molempia, elleivät ne täsmää). | keskisuuri | 1 h tekstiä |
| 9 | **Kotitalousvähennys-lohko: sama sanoma ja oikea esimerkki** | 63 sivua (`KotitalousVahennys`) + 25 FAQ-sivua | Lohko sanoo varmana: "Saat vähentää vuosina 2026 ja 2027 40 %… enintään 2 100 €… omavastuu 150 €", mutta esimerkkilaskelma (5 000 € → vähennys 1 600 € → 3 400 €) ei vähennä 150 € omavastuuta. Artikkeli sanoo saman asian varauksella ("perustuu hallituksen esitykseen… vaatii vielä eduskunnan hyväksynnän"). Verkkolähteiden mukaan hallitus päätti korotuksesta kehysriihessä 22.4.2026 ja se koskee vuosia 2026–2027; lopullinen vahvistus on tarkistettava. [Tarkistettu teksti; lain tila: Oletus] | Yksi lause kaikkialle: "Vuosina 2026 ja 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 € vuodessa. Omavastuu on 150 €." Korjaa esimerkki (1 600 € − 150 € = 1 450 €) tai poista se (sääntö: ei laskuesimerkkejä). FAQ:n "säästö on usein noin tuhat euroa" ja "jopa 80 % kokonaishinnasta" pois. | keskisuuri | 1 h |
| 10 | **Vastaa hakuihin, jotka nyt jäävät ilman sivua** | pinnoituksen kaupunkisivut, palvelusivut | Search Console: 14 "tiilikattoremontti <kunta>" -kyselyä yhteensä ~1 190 näyttöä sijoilla 10–42, "kattourakoitsija" 110 näyttöä, "tiilikaton maalaus tampere" 434 näyttöä (sija 5,5), "katon maalaus tampere/pirkanmaa" 167 näyttöä, "peltikaton pinnoitus/maalaus" 229 näyttöä. Sivuilla ei ole osiota, joka vastaisi suoraan "kattoremontti vai pinnoitus?" paikkakunnittain, eikä sanaa "tiilikaton maalaus" käytetä H2-tasolla. | Lisää pinnoituksen kaupunkisivuille H2 "Tiilikattoremontti vai pinnoitus {cityIn}?" (3–4 virkettä, sama sisältö kuin hintasivun vertailussa) ja käytä rinnakkaissanaa "tiilikaton maalaus" H2:ssa ja FAQ:ssa ("Tiilikaton pinnoitus tarkoittaa katon pesua ja maalausta ruiskulla kahteen kertaan"). Julkaise jonossa oleva artikkeli "Pinnoitus vai uusi katto?" (ajastettu 13.10.2026) ja korjaa siitä "säästää jopa 15 000 euroa". Jos peltikattoja ei maalata, sano se FAQ:ssa yhdellä lauseella, jotta väärät liidit vähenevät; jos maalataan, se on oma sivunsa. | suuri (näkyvyys), keskisuuri (liidit) | 3–4 h |

## 2. Avainsana-analyysi (Search Console 30.6.–29.9.2026)

Kaikki tämän luvun luvut ovat **Search Console** -lukuja, ellei toisin sanota. Vienti sisältää kyselyt, sivut, laitteet, maat ja päivät erikseen – ei kysely×sivu-yhdistelmiä. Siksi "mikä sivu sijoittuu millekin haulle" on aina **arvio**. Data on ajalta ennen 5.10.2026 julkaisua, joten se on lähtötaso, ei nykytila.

### 2.1 Kokonaiskuva

| Mittari | Arvo (Search Console) |
|---|---|
| Klikkaukset | 203 |
| Näyttökerrat | 12 492 |
| CTR | 1,63 % |
| Keskisijainti (Suomi) | 14,2 |
| Heinäkuu 2026 | 82 klikkiä / 4 146 näyttöä / sija 16,4 |
| Elokuu 2026 | 83 / 4 741 / 13,8 |
| Syyskuu 2026 | 36 / 3 474 / 11,9 |
| Brändihaut (pintanen, pitkänen…) | 64 klikkiä / 175 näyttöä (CTR 37 %) |
| Ei-brändihaut (nimetyt kyselyt) | 15 klikkiä / 8 526 näyttöä (CTR 0,18 %) |
| Mobiili | 137 klikkiä / 3 797 näyttöä / sija 7,6 |
| Tietokone | 60 / 8 574 / 17,1 |
| Tabletti | 6 / 121 / 7,9 |

Tulkinta [Tarkistettu luvut, päätelmät arvioita]:

- Noin kolmannes klikeistä on brändihakuja. Nimetyistä ei-brändihauista tuli vain 15 klikkiä koko kesänä, vaikka näyttökertoja oli 8 500. Ongelma ei ole näkyvyyden puute vaan klikkaamattomuus: otsikot ja kuvaukset eivät voita, ja osa näytöistä on vääriä aiheita.
- Syyskuussa keskisijainti parani (11,9) mutta klikit putosivat (36). Kausi loppuu, mutta myös kauttaviivattomien ja vanhojen URL-osoitteiden siivous näkyy datassa.
- Mobiilissa sijoitus on paljon parempi (7,6) kuin tietokoneella (17,1). Tietokoneen näyttökerroista iso osa on teollisuusmaalauksen hakuja (jauhe-, pulveri-, polyurea-), jotka eivät ole asiakkaita.

### 2.2 Sijoitusjakauma (ei-brändi, nimetyt kyselyt)

| Sijoitus | Kyselyitä | Näyttöjä | Klikkejä |
|---|---|---|---|
| 1–2 | 50 | 1 221 | 4 |
| 3–4 | 34 | 142 | 1 |
| 5–9 | 79 | 2 243 | 5 |
| 10–19 | 70 | 1 853 | 2 |
| 20–49 | 62 | 2 891 | 3 |
| 50–100 | 18 | 176 | 0 |

Sijoilla 1–2 on 1 221 näyttöä mutta 4 klikkiä. Näistä suurin osa on vääriä aiheita (ks. 2.6). Oikeista aiheista parhaat sijat ovat "julkisivumaalaus tampere" (221 näyttöä, sija 1,3, 0 klikkiä), "ulkomaalaus pirkanmaa" (153, sija 2,0, 0 klikkiä), "kattopinnoite tampere" (107, sija 2,3, 0 klikkiä) ja "pinnoitus tampere" (121, sija 1,7, 1 klikki). Kärkisija ilman klikkejä kertoo, että hakutuloksen otsikko/kuvaus ei puhuttele tai että tulos on väärä sivu (**arvio**).

### 2.3 Teemat

| Teema | Kyselyitä | Näyttöjä | Klikkejä | Painotettu sija |
|---|---|---|---|---|
| Talon/ulkomaalaus, maalausliike, julkisivu | 81 | 4 053 | 11 | 16,1 |
| Tiilikaton pinnoitus / kattopinnoite | 49 | 1 806 | 2 | 12,2 |
| Kattoremontti / kattourakoitsija | 41 | 1 440 | 0 | 21,5 |
| Katon maalaus / tiilikaton maalaus | 13 | 766 | 3 | 15,0 |
| Puhdistus / pesu / sammal | 33 | 641 | 0 | 32,8 |
| Hinta / laskuri | 29 | 576 | 1 | 30,2 |
| Väärä aihe (jauhe-, pulveri-, teollisuus-, sisämaalaus, polyurea, parkkiruudut) | 34 | 772 | 3 | 7,1 |
| Englanninkieliset (painting, roofing, roof coating…) | 50 | 138 | 0 | – |

### 2.4 Tärkeimmät kyselyt

| Kysely | Klikit | Näytöt | Sija | Huomio |
|---|---|---|---|---|
| maalausliike tampere | 2 | 504 | 5,2 | Suurin ei-brändihaku. Sivustolla sana "maalausliike" esiintyy vain etusivun SEO-tekstin H2:ssa. |
| tiilikaton pinnoitus tampere | 1 | 450 | 15,6 | Oma sivu `/tiilikaton-pinnoitus-tampere/` sai vain 16 näyttöä (sija 7,4) – haku ohjautuu arviolta etusivulle tai aluesivulle (**arvio**). |
| tiilikaton maalaus tampere | 2 | 434 | 5,5 | Sanaa "tiilikaton maalaus" ei käytetä otsikoissa. |
| talon maalaus pirkanmaa | 0 | 425 | 31,2 | Palvelusivu `/talon-maalaus-pirkanmaa/` sija 29,6 – otsikko "Talon maalaus Pirkanmaa \| Hintalaskuri" ei erotu. |
| maalaus tampere | 0 | 404 | 6,8 | Yleishaku, sisältää myös sisä- ja teollisuusmaalauksen. |
| talon maalaus tampere | 0 | 394 | 46,7 | `/talon-maalaus-tampere/` 705 näyttöä, sija 49,4 → sivu ei sijoitu; uusi teksti julkaistiin vasta 5.10. |
| ulkomaalaus tampere | 2 | 278 | 25,6 | |
| julkisivumaalaus tampere | 0 | 221 | 1,3 | Sija 1 ja 0 klikkiä: otsikko/kuvaus ei vastaa hakua (**arvio**). |
| tiilikaton pinnoitus hinta | 0 | 177 | 20,2 | Hintasivu 386 näyttöä, sija 18,6. |
| ulkomaalaus pirkanmaa | 0 | 153 | 2,0 | Sama kuin yllä: kärkisija, ei klikkejä. |
| katon pinnoitus tampere | 0 | 150 | 6,9 | |
| maalausliike pirkanmaa | 0 | 131 | 40,2 | |
| tiilikaton pinnoitus nokia | 0 | 122 | 8,2 | Vanha Nokia-sivu, 143 näyttöä, sija 11,0. |
| tiilikaton pinnoitus lempäälä | 0 | 115 | 10,0 | Lempäälällä ei ollut pinnoitussivua ennen 5.10. – nyt on. |
| katon puhdistus tampere | 0 | 114 | 20,4 | Palvelu poistuu. |
| peltikaton pinnoitus tampere | 0 | 110 | 9,2 | Palvelua ei ole sivustolla. Ks. 2.6. |
| kattourakoitsija | 0 | 110 | 17,1 | |
| kattopinnoite tampere | 0 | 107 | 2,3 | |
| tiilikattoremontti hämeenkyrö / mänttä-vilppula / ikaalinen / valkeakoski / pälkäne / parkano / huittinen / lempäälä / akaa / virrat / kangasala / orivesi / ylöjärvi / sastamala | 0 | 53–97 kukin, yht. ~1 190 | 10–42 | Hakija miettii remonttia; pinnoitussivu vastaa, jos siinä on vertailu. |
| tiilikaton pinnoitus laskuri | 0 | 86 | 14,6 | |
| katon puhdistus hinta | 0 | 96 | 49,6 | Palvelu poistuu. |

Kaikki klikatut ei-brändikyselyt (yhteensä 15): maalausliike tampere 2, tiilikaton maalaus tampere 2, ulkomaalaus tampere 2, jauhemaalaus tampere 2 (väärä aihe), tiilikaton pinnoitus tampere 1, pinnoitus tampere 1, katon maalaus tampere 1, teollisuusmaalaamo tampere 1 (väärä aihe), talon maalaus hinta laskuri 1, pientalon rakennesuunnittelu 1 (väärä aihe), maalausyritys 1.

### 2.5 Sivutyypit Search Consolessa

| Sivutyyppi (vanha sivusto) | Sivuja | Näyttöjä | Klikkejä | Painotettu sija |
|---|---|---|---|---|
| Etusivu | 1 | 6 899 | 110 | 7,1 |
| Aluesivut `/maalauspalvelut-x/` | 25 | 4 410 | 37 | 23,3 |
| Hintasivut + laskuri | 4 | 1 618 | 5 | 27,8 |
| Maalauksen kaupunkisivut | 9 | 1 442 | 2 | 55,3 |
| Palvelusivut `-pirkanmaa` | 3 | 1 389 | 9 | 39,0 |
| Puhdistuksen kaupunkisivut | 10 | 1 075 | 34 | 22,1 |
| Pinnoituksen kaupunkisivut | 8 | 496 | 7 | 19,1 |
| Muut (meistä, toiminta-alueet, /alue/tampere/) | 3 | 160 | 2 | 32,2 |

Huomioita:

- Etusivu tuo 54 % klikeistä, mutta siitä iso osa on brändihakuja (**arvio**: 60–65 klikkiä). Aluesivut ovat toiseksi tärkein ryhmä.
- Maalauksen kaupunkisivut olivat ennen 5.10. käytännössä näkymättömiä (sija 55). Uudet tekstit ovat hyvä korjaus; seuraa niitä marraskuussa.
- `/tiilikaton-pinnoitus-tampere/` sai vain 16 näyttöä, vaikka Tampereen pinnoitushakuja oli yli 800. Tämä on selvin merkki siitä, että etusivu/aluesivu syö sivun näkyvyyden (**arvio**).
- Search Consolessa näkyy edelleen `/alue/tampere/` (12 näyttöä) ja neljä kauttaviivatonta URL:ia (`/katon-puhdistus-nokia`, `/talon-maalaus-forssa`, `/katon-puhdistus-hameenlinna`, `/maalauspalvelut-mantta-vilppula`). Uudelleenohjaukset ovat `_redirects`-tiedostossa; siivous tapahtuu ajan kanssa, kun sisäiset linkit on korjattu (korjaus 7).
- `/maalauspalvelut-hinta-pirkanmaa/` (189 näyttöä, sija 7,3) ohjataan nykyään hintalaskuriin. Tarkista, että 301 pitää (ei testattu livenä).

### 2.6 Väärät aiheet ja niiden hoito

Teollisuus- ja sisämaalauksen haut (jauhemaalaus, pulverimaalaus, polyureapinnoitus, teollisuusmaalaamo, parkkiruutujen maalaus, sisämaalaus pirkanmaa, betonilattian pinnoitus) toivat 772 näyttöä sijalta 7,1 ja 3 klikkiä. Ne nostavat näyttökertoja ja laskevat CTR:ää, mutta eivät ole asiakkaita. Todennäköinen syy on sana "pinnoitus" ilman tarkenteita ja Meistä-sivun "sisäpinnat" (**arvio**). Ei kannata optimoida pois, mutta:

- Käytä aina "tiilikaton pinnoitus" tai "katon pinnoitus", ei pelkkää "pinnoitus" otsikoissa.
- Poista "sisäpinnat", ellei sisämaalausta tehdä.
- Peltikatot: "peltikaton pinnoitus tampere" (110 näyttöä, sija 9,2) ja "peltikaton maalaus nokia/lempäälä" (119 näyttöä). Jos peltikattoja ei maalata, lisää pinnoitussivun FAQ:hon: "Maalaammeko peltikattoja? Emme. Teemme vain tiilikattoja." Jos maalataan, aiheesta kannattaa tehdä oma sivu – mutta vain, jos se on totta.
- Englanninkieliset haut (50 kyselyä, 138 näyttöä, 0 klikkiä) ovat pieniä; englanninkielistä sivua ei tarvita.

### 2.7 Mitä hakuja puuttuu kokonaan tai lähes

| Haku / aihe | Search Console | Nykyinen vastaus sivustolla | Ehdotus |
|---|---|---|---|
| tiilikattoremontti + kunta (14 kuntaa) | ~1 190 näyttöä, sija 10–42 | Hintasivulla on "Kannattaako pinnoitus vai uusi katto?" -osio; kaupunkisivuilla `PinnoitusComparison` (lukuvirheineen). | H2 "Tiilikattoremontti vai pinnoitus {cityIn}?" jokaiselle pinnoituksen kaupunkisivulle + artikkeli "Pinnoitus vai uusi katto?" (ajastettu 13.10.). |
| tiilikaton maalaus / katon maalaus | 434 + 95 + 72 näyttöä | Sana esiintyy lähinnä arvosteluissa. | Sano palvelusivulla ja kaupunkisivuilla suoraan: "Tiilikaton pinnoitus on käytännössä katon pesu ja maalaus ruiskulla kahteen kertaan." H2: "Tiilikaton maalaus vai pinnoitus – sama asia?" |
| maalausliike tampere / pirkanmaa | 635 näyttöä | Etusivun SEO-tekstin H2 "Luotettava maalausliike ja kattoasiantuntija Pirkanmaalla". | Lisää sana "maalausliike" maalauksen palvelusivun ja Tampereen maalaussivun ingressiin: "Olemme pieni maalausliike, jossa yrittäjä maalaa itse." |
| kattourakoitsija (tampere) | 126 näyttöä | – | Pinnoitussivun FAQ: "Oletteko kattourakoitsija? Teemme tiilikaton pinnoituksia, emme kattoremontteja." (jos totta). |
| julkisivumaalaus tampere | 221 näyttöä, sija 1,3 | Sana vain Referenssit-kuvateksteissä ja schema `knowsAbout`. | Title/H2 Tampereen maalaussivulle: "Talon maalaus ja julkisivumaalaus Tampere". |
| milloin / kuinka usein / voiko itse -kysymykset | pieniä määriä, nousussa | Artikkelit vastaavat hyvin. | Jatka artikkelisarjaa (5 ajastettu). |
| "hinta" + kunta | ei näy | Kaupunkisivuilla on hintakortit. | Ei uutta sivua; riittää, että kaupunkisivun FAQ vastaa hintaan haarukalla. |

### 2.8 Keskenään kilpailevat sivut (arvio titlejen, H1:ien ja SC-sivudatan perusteella)

| Ryhmä | Sivut | Mistä kilpailu syntyy | Ratkaisu |
|---|---|---|---|
| Tampere + maalaus | `/` (H1 "…talon maalaus Pirkanmaalla"), `/maalauspalvelut-tampere/` (title "Tiilikaton pinnoitus ja talon maalaus Tampere"), `/talon-maalaus-tampere/`, `/talon-maalaus-pirkanmaa/`, `/talon-maalaus-hinta-pirkanmaa/` | Sama avainsana titlessä ja H1:ssä neljällä sivulla. Aluesivun otsikko on käytännössä sama kuin etusivun. | Aluesivun title → "Maalaus- ja kattopalvelut Tampere \| Pintanen", H1 "Pintanen Tampereella: tiilikaton pinnoitus ja talon maalaus" – ja heti alussa kaksi isoa linkkiä palvelusivuille. |
| Tampere + pinnoitus | `/tiilikaton-pinnoitus-tampere/`, `/maalauspalvelut-tampere/`, `/`, `/tiilikaton-pinnoitus-pirkanmaa/` (title "…Pirkanmaa & Tampere") | Palvelusivun title sisältää myös "Tampere". | Poista "& Tampere" Pirkanmaa-sivun titlestä; Pirkanmaa-sivu linkittää Tampereen sivulle ankkurilla "Tiilikaton pinnoitus Tampere". |
| Hinta | `/tiilikaton-pinnoitus-hinta-pirkanmaa/`, `/hintalaskuri/`, `/tiilikaton-pinnoitus-pirkanmaa/` (sisältää samat hintakortit), 24 kaupunkisivua (samat kortit) | Samat hintakortit ja sama hintateksti 26 sivulla. | Hintasivu = hinta-aiheen pääsivu; muualla lyhyt haarukka + linkki hintasivulle. Kortit saavat jäädä, mutta niiden ympärillä oleva teksti ei saa olla sama kuin hintasivulla. |
| Puhdistus | 8 kaupunkisivua + palvelusivu + hintasivu | Palvelu poistuu. | Kun palvelu lopetetaan: 301 puhdistussivuilta vastaavalle pinnoitussivulle (kaupunki → kaupunki, pirkanmaa → pirkanmaa, hinta → pinnoituksen hinta). Puhdistussivut toivat 34 klikkiä kesässä – ohjaus säilyttää osan. |

## 3. Virheet (tarkistetut havainnot)

Kaikki tämän luvun kohdat on todettu koodista tai buildista [Tarkistettu]. Numerot viittaavat luvun 1 korjauksiin, jos sellainen on.

| # | Sivu(t) | Mikä on vialla | Ehdotus | Vaikutus | Työmäärä |
|---|---|---|---|---|---|
| V1 | 24 pinnoituksen kaupunkisivua (`PinnoitusEntrepreneur.tsx`) | "Hoidan tiilikattojen pinnoitukset Tampereella henkilökohtaisesti… Tiedän, miten tamperelaiset katot kestävät" – myös Orivedellä, Virroilla ja Hämeenlinnassa. | Käytä `cityIn`: "Hoidan tiilikattojen pinnoitukset {cityIn} ja muualla Pirkanmaalla itse alusta loppuun." Poista "tamperelaiset". (korjaus 4) | suuri | 15 min |
| V2 | 24 pinnoituksen kaupunkisivua (`PinnoitusProblemSection.tsx` rivi 49), 24 maalauksen kaupunkisivua (`MaalausCitySections.tsx` rivi 65) | Sama ennen/jälkeen-kuva saa alt-tekstin "Kirkkaan punainen tiilikatto pinnoituksen jälkeen {city}" ja "Sama puutalo violettina maalauksen jälkeen – {city}". Kuva väittää olevansa paikkakunnalta, jolta se ei ole. | Alt ilman paikkakuntaa ("Punainen tiilikatto ennen ja jälkeen pinnoituksen") tai kuvan oikea paikka. (korjaus 4) | suuri | 15 min |
| V3 | `/meista/` | "Olemme pirkanmaalainen perheyritys" (hero) ja "Pintanen on uudehko Oulusta kotoisin oleva perheyritys" (seuraava kappale). Schema-osoite Tampere. Forssan vanha alueIntro (ei renderöidy) sanoo "Pintasen kotikaupunki on Tampere". | Yksi selvä lause. Jos juuret ovat Oulussa: "Olemme kotoisin Oulusta. Yrityksemme toimii Pirkanmaalla ja Kanta-Hämeessä." (korjaus 8) | keskisuuri | teksti |
| V4 | `/meista/` | "Eemil… julkisivut ja sisäpinnat", "Suuret taloyhtiöt", "Leikkimökeistä taloyhtiöihin", "ammatilla, kunnialla ja sopivaan hintaan". Sisämaalaus ja taloyhtiöt eivät näy missään muualla sivustolla. | Eerik päättää, mitkä palvelut ovat totta. Jos vain omakotitalot ja kesämökit: sano se. (korjaus 8) | keskisuuri | teksti |
| V5 | Etusivu `Services.tsx`, 24 aluesivua `CityServices`, 24 pinnoituksen kaupunkisivun meta (`seo.ts` rivi 152) | "pidentää katon käyttöikää jopa 15-20 vuotta" (etusivulla jopa väärä viiva) vs. "10–15 vuotta" palvelusivulla, artikkelissa ja FAQ:ssa. | Yhtenäinen "10–15 vuotta". (korjaus 3) | suuri | 15 min |
| V6 | 26 sivua (`PinnoitusComparison.tsx`) | "Pinnoitus… maksaa tyypillisesti vain noin 10–20 % uuden katon hinnasta… voit säästää jopa 15 000 euroa… jopa 15 vuodella." Hintasivun luvuilla (2 850–7 000 € vs 15 000–30 000 €) osuus on 10–47 %. "Jopa 15 000 €" on keksitty säästöluku. Sama lause on ajastetussa artikkelissa `pinnoitus-vai-uusi-katto.tsx` rivi 96. | "Pinnoitus maksaa yleensä 2 850–7 000 €. Uusi katto maksaa yleensä paljon enemmän. Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa." | suuri | 15 min |
| V7 | `/tiilikaton-pinnoitus-hinta-pirkanmaa/` hero, `/talon-maalaus-hinta-pirkanmaa/` hero, artikkeli kotitalousvähennys, `llms.txt` | "Kotitalousvähennyksen jälkeen hinta on alkaen 2 050 €" / "alkaen 2 380 €" / "alkaen 15 €/m²". Sääntö: ei minimihintaa, ei neliöhintaa. (Hintakortteihin ei kosketa.) | Poista lauseet; korvaa "Työn osuudesta saat kotitalousvähennyksen." llms.txt: vain haarukka 2 850–7 000 €. (korjaus 3) | suuri | 30 min |
| V8 | 25 sivun FAQ (`faqData.ts` pinnoitusFAQ ja getPinnoitusCityFAQ) | "Lopullinen kustannus… jopa alle 2 100 €", "työn osuus on tyypillisesti jopa 80 % kokonaishinnasta", "säästö on usein noin tuhat euroa", "maksimietu on jopa 4 200 euroa". Nämä ovat minimihinta ja arvioita, jotka esitetään lupauksina. | Ks. luku 5 rivit S7–S8. (korjaus 3 ja 9) | suuri | 30 min |
| V9 | `/talon-maalaus-pirkanmaa/` FAQ ("4 000 – 8 000 euroa"), `TalonMaalaus.tsx` FAQ ("3 000 eurosta ja 10 000 euroon"), 24 maalauksen kaupunkisivun FAQ ("5 000 ja 6 500 euron väliin"), Sastamalan maalaus-meta ("Hinta n. 2000 € – 10 000 €"), hintasivu ja llms.txt (3 500–11 000 €) | Viisi eri haarukkaa samalle palvelulle. | Yksi haarukka: 3 500–11 000 €. (korjaus 3) | suuri | 30 min |
| V10 | `/tiilikaton-pinnoitus-pirkanmaa/` meta description + Service-schema + llms.txt | "Säästä jopa 80 % vs. kattoremontti!" – prosentti ei täsmää hintasivun lukuihin, ja huutomerkkityyli ei sovi muuhun sivustoon. | "Tiilikaton pinnoitus Pirkanmaalla. Pesemme katon painepesulla ja maalaamme sen ruiskulla kahteen kertaan. Hinta yleensä 2 850–7 000 €, 5 vuoden takuu, ilmainen kuntotarkastus." | keskisuuri | 10 min |
| V11 | 63 sivua (`KotitalousVahennys`-lohko) | Esimerkkilaskelma 5 000 € → vähennys 1 600 € → 3 400 € ei huomioi 150 € omavastuuta, joka mainitaan rivin yläpuolella. Sääntö: ei laskuesimerkkejä. | Poista esimerkki tai korjaa (1 450 €). (korjaus 9) | keskisuuri | 15 min |
| V12 | 91 FAQ-sivua, 24 pinnoituksen kaupunkisivua, `/tiilikaton-pinnoitus-pirkanmaa/` prosessi | Haitarin sisältö ei ole HTML:ssä: FAQ-vastaukset vain JSON-LD:ssä, prosessivaiheet eivät missään (buildissa 0 osumaa lauseille "Poistamme pinttyneen lian", "Tikkurilan ja Nowocoatin"). Maalauksen kaupunkisivun prosessi sen sijaan on HTML:ssä. | `forceMount` tai `<details>`; ks. korjaus 5. | suuri | 2–3 h |
| V13 | kaikki sivut, joilla arvostelukaruselli (`TestimonialsMarquee`) | Karusellin kopiot esirenderöidään: pinnoituksen kaupunkisivulla 38 arvostelulohkoa, maalauksen 26, palvelusivuilla 38/26. Sama teksti neljästi HTML:ssä paisuttaa sivua (etusivu 454 kB, pinnoitus-Tampere 274 kB) ja laimentaa paikallista sisältöä. | Renderöi vain yksi sarja; kopiot `aria-hidden="true"` ja vasta selaimessa. (korjaus 6) | keskisuuri | 1–2 h |
| V14 | Header, Footer, Hero, ToimintaAlueetBanner, SEOTextSection, RelatedArticles, ArticleLayout, ServiceAreaPage | Sisäiset linkit ilman loppukauttaviivaa: `/hintalaskuri` 173 linkkiä/97 sivua, `/tarjouspyynto` 150, `/artikkelit`, `/katon-puhdistus-pirkanmaa`, kaikki `/maalauspalvelut-x` jne. Canonical ja sivukartta ovat kauttaviivallisia. | Lisää kauttaviiva kaikkiin; lisää testi. (korjaus 7) | keskisuuri | 1 h |
| V15 | `/talon-maalaus-<kaupunki>/` (`TeamContactSection.tsx`) | Yhteydenottolomakkeessa ei ole tietosuojalausetta eikä honeypot-kenttää, toisin kuin `ServiceContactSection`issa. Yhteystiedoissa "myynti@pintanen.fi" ja "Yrittäjä – Kattopalvelut", muualla "eerik@pintanen.fi" ja "Kattomaalari". | Käytä samaa lomakekomponenttia (tai lisää tietosuojalause + honeypot). Yhtenäiset sähköpostit ja tittelit. | keskisuuri | 1 h |
| V16 | `index.html` yritys-schema | `areaServed` listaa 11 kuntaa 24:stä (puuttuvat mm. Akaa, Ikaalinen, Orivesi, Valkeakoski, Virrat…). `sameAs`-linkki Google-profiiliin on `share.google`-lyhytosoite. | Generoi areaServed `allCities`-listasta. Käytä Google-profiilin pysyvää Maps-osoitetta. | pieni | 30 min |
| V17 | `src/data/cityData.ts` | `alueIntro`-tekstit (24 kpl) ja `alueMetaDesc` "Hinnat alk. 2 850 €" eivät renderöidy missään (areaCityContent korvaa ne), mutta ne sisältävät kiellettyjä muotoja ("alk.") ja kirjoitusvirheitä ("aieutuneet", "Pirkanmaalainen" isolla). Kuollut data sekoittaa seuraavaa tekijää. | Poista käyttämättömät kentät tai merkitse ne selvästi vanhentuneiksi. | pieni | 30 min |
| V18 | `cityData.ts` metat (vanhat 8 kaupunkia) | "Yrittäjät tekee työn" (Huittinen pinnoitus-meta), "Nokiassa" (Nokian puhdistus-meta; oikein "Nokialla"), Sastamalan maalaus-meta "n. 2000 € – 10 000 €". | Korjaa kielivirheet; Sastamala haarukkaan 3 500–11 000 €. | pieni | 10 min |
| V19 | `/tiilikaton-pinnoitus-hinta-pirkanmaa/`, `/referenssit/`, kuvasivukartta | Hero-kuvan tiedostonimi `tiilikaton-tehopesu-ja-sammaleenpoisto-1200.webp` sisältää kielletyn sanan "tehopesu". Alt on tyhjä (koriste), mutta nimi näkyy kuvasivukartassa ja URL:ssa. | Käytä toista kuvaa tai nimeä tiedosto uudelleen (`tiilikaton-pesu-ja-sammaleenpoisto`) ja päivitä viittaukset (`seo.ts`, `Referenssit.tsx`, `articles.ts`). | pieni | 30 min |
| V20 | Ajastettu artikkeli `tiilikaton-pinnoituksen-tyovaiheet.tsx` (julkaisu 20.10.2026) | Rivi 74: "maalaamme telalla" – vastoin sääntöä (ruiskulla). Sama artikkeli: "Käytämme Tikkurilan ja Nowocoatin kattomaaleja" (ok, jos totta). | Korjaa ennen julkaisupäivää: "Maalaamme katon ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali." | suuri (jos julkaistaan sellaisenaan) | 10 min |
| V21 | `MaalausProcessAccordion.tsx` (`/talon-maalaus-pirkanmaa/`) | Vaihe "4. Pohjustus ja puupuhtaiden pintojen käsittely" – "pohjustus" on lähellä kiellettyä "pohjuste"-sanaa ja epäselvä. | "4. Pohjamaali paljaisiin kohtiin". | pieni | 5 min |
| V22 | 30 sivua title > 60 merkkiä (max 70: `/tiilikaton-pinnoitus-hinta-pirkanmaa/`, `/katon-puhdistus-hameenkyro/`); 38 sivua description > 160 merkkiä (max 175: Ruovesi pinnoitus); 4 sivua description < 110 (puhdistus) | Google katkaisee pitkät otsikot; pitkät kuvaukset katkeavat kesken lauseen. | Pinnoituksen kaupunkisivujen meta-malli: pudota kaupunginosalista kuvauksesta tai lyhennä loppu ("Hinta 2 850–7 000 €." riittää kerran). Title-malli "Tiilikaton pinnoitus {city} \| Hinta 2 850–7 000 € \| Pintanen" → "Tiilikaton pinnoitus {city} – hinta 2 850–7 000 € \| Pintanen" säästää merkkejä vain vähän; harkitse "\| Pintanen" pudottamista pitkillä kuntanimillä. | pieni | 30 min |
| V23 | Etusivu | "200+ projektia" (hero), "Yli 200 onnistunutta urakkaa" (aluesivut), "200+ tyytyväistä asiakasta" (Meistä), "Yli 100 pinnoitettua kattoa" + "Yli 60 maalattua taloa" (palvelusivut) eivät täsmää keskenään. | Yksi lukusarja (Eerik). | keskisuuri | teksti |
| V24 | `og:image` (kaikki sivut, joilla ei omaa kuvaa) | Pystykuva 1500×2000 px. Facebook/LinkedIn/WhatsApp näyttävät vaakakuvan (1200×630) – pystykuva rajautuu. | Yksi vaakamuotoinen jakokuva (1200×630), mielellään oman kohteen kuva + logo. | pieni | 30 min |
| V25 | `index.html` | `<meta name="keywords">` on turha (Google ei käytä). | Poista. | pieni | 1 min |

## 4. Puutteet (asiat, jotka puuttuvat tai ovat vajaita)

| # | Sivu(t) | Mikä puuttuu | Ehdotus | Vaikutus | Työmäärä |
|---|---|---|---|---|---|
| P1 | Pinnoituksen kaupunkisivut, palvelusivu | Suora vastaus hakuun "tiilikattoremontti {kunta}" ja "kattoremontti vai pinnoitus". | H2 "Tiilikattoremontti vai pinnoitus {cityIn}?" + 3–4 virkettä: milloin pinnoitus riittää (aluskate ja rakenteet kunnossa), milloin ei (laaja rapautuminen, vuotava aluskate), mitä kumpikin yleensä maksaa (haarukat, ei prosentteja). (korjaus 10) | suuri | 1 h + teksti |
| P2 | Palvelusivut, kaupunkisivut | Sanaa "tiilikaton maalaus" ei käytetä otsikoissa, vaikka se on toiseksi suurin oikea haku (434 näyttöä). | Yksi H2 tai FAQ: "Onko tiilikaton pinnoitus sama kuin tiilikaton maalaus?" – "Käytännössä kyllä. Pesemme katon painepesulla ja maalaamme sen ruiskulla kahteen kertaan…" | suuri | teksti |
| P3 | `/hintalaskuri/` | Sivulla on 243 sanaa ja vain valinta "Mitä haluat laskea?". Hakija, joka tulee haulla "tiilikaton pinnoitus laskuri" (86 näyttöä), ei näe ennen klikkausta, mihin arvio perustuu. | 3–4 virkettä laskurin yläpuolelle: mihin arvio perustuu (katon koko, jyrkkyys, kunto / talon koko, kerrokset, pohjatyöt), että arvio on suuntaa antava, ja että tarkka hinta tulee ilmaisen käynnin jälkeen. Ei hintoja. | keskisuuri | teksti |
| P4 | `/tarjouspyynto/` | Ei kerro, mitä tapahtuu lomakkeen jälkeen muulla kuin sivupalkissa; ei FAQ:ta ("Sitooko tarjouspyyntö?", "Kuinka nopeasti soitatte?"). | Lyhyt FAQ (3 kysymystä) lomakkeen alle. Ei schemaa tarvita. | pieni | teksti |
| P5 | Kaikki palvelusivut ja kaupunkisivut | Näkyvä "Päivitetty pp.kk.vvvv" puuttuu (artikkeleissa on). Tekoälyhaut ja Google suosivat tuoreutta. | Pieni rivi heron alle tai FAQ:n yläpuolelle: "Päivitetty 5.10.2026". Sivukarttaan `lastmod` kaikille sivuille buildin tai sisällön muutospäivästä (nyt vain 3 artikkelilla). | keskisuuri | 1–2 h |
| P6 | Service-schema (85 sivua) | Ei `offers`/`priceRange`-tietoa, vaikka hinta on sivulla. `ServiceSchema.tsx` tukee `priceRange`-propsia, mutta sitä ei anneta. | Anna pinnoitussivuille `AggregateOffer` lowPrice 2850 / highPrice 7000 / EUR, maalaussivuille 3500 / 11000. Ei tarvitse näkyviä muutoksia. | pieni–keskisuuri | 30 min |
| P7 | Kaikki sivut paitsi artikkelit | Murupolku on vain JSON-LD:ssä, ei näkyvissä. Google näyttää murupolun hakutuloksessa luotettavammin, kun se on myös sivulla. | Pieni näkyvä murupolku heron yläpuolelle ("Etusivu / Tiilikaton pinnoitus / Tampere"). Samalla sisäinen linkitys paranee (kaupunkisivu → palvelusivu). | keskisuuri | 2 h |
| P8 | Pinnoituksen palvelusivu ja kaupunkisivut | Työvaiheiden tiivistelmä yhtenä kappaleena heti alussa puuttuu (on vain haitarissa, joka ei ole HTML:ssä). Tekoälyhaku lainaa mieluiten 2–4 virkkeen tiivistelmää. | Heron alle "Lyhyesti"-laatikko: Pesemme katon painepesulla. Vaihdamme rikkinäiset tiilet uusiin. Maalaamme katon ruiskulla kahteen kertaan: pohjamaali ja pintamaali. Työ kestää 2–4 päivää. Takuu 5 vuotta. Hinta yleensä 2 850–7 000 €. | suuri (GEO) | teksti + 1 h |
| P9 | Maalauksen palvelusivu | Sama "Lyhyesti"-laatikko maalaukselle: homepesu, kaavinta, pohjamaali paljaisiin kohtiin, pintamaali pensselillä, 3–7 päivää, 2 vuoden takuu, 3 500–11 000 €. Kaupunkisivuilla prosessi on jo HTML:ssä; palvelusivulla se on haitarissa. | Lisää laatikko. | suuri (GEO) | teksti + 1 h |
| P10 | `llms.txt` | Hyvä pohja, mutta sisältää kielletyt muodot (ks. V7, V10) eikä kerro työvaiheita, aluetta kunnittain tai sitä, mitä ei tehdä. | Lisää osiot "Näin työ tehdään" (ks. P8–P9), "Mitä emme tee" (jos esim. peltikatot, sisämaalaus, kattoremontit) ja kunnat luettelona pinnoitus-/maalaussivuineen. | keskisuuri | 30 min |
| P11 | Ulkoiset signaalit | Sivustolla ei ole linkkiä Google-yritysprofiilin arvosteluihin muualla kuin footerissa ("Google-arvostelut") ja karusellin "Lue lisää". Artikkeleissa ei ole ulkoisia lähdelinkkejä muualle kuin Verohallintoon ja K-Rautaan (hyvä). | Ei lisättävää sivustolle; Google-profiilin täydellisyys ja arvostelujen määrä kannattaa tarkistaa erikseen (ei voitu tarkistaa). | – | – |
| P12 | `_headers` | Puuttuvat `Referrer-Policy` ja `Content-Security-Policy`. Ei vaikuta hakuun, mutta Lighthousen "Best practices" -pisteisiin. | `Referrer-Policy: strict-origin-when-cross-origin`; CSP vasta, kun GA:n ja Resendin tarpeet on listattu. | pieni | 1 h |
| P13 | Kuvat | 13 kuvalla 29:stä etusivun HTML:ssä ei ole `width`/`height`-attribuutteja (mm. hero-AVIF ja palvelukorttien kuvat) → layout voi hyppiä (CLS) ennen kuin kuva latautuu, ellei CSS anna kiinteää suhdetta. | Lisää `width`/`height` tai `aspect-ratio` kaikkiin `<img>`-elementteihin. | pieni–keskisuuri | 1 h |
| P14 | Fontit | 8 fonttitiedostoa (Montserrat 400/500/600/700/800, Open Sans 400/500/600) ≈ 150 kB jokaisella ensikäynnillä. | Pudota painot kolmeen (esim. Montserrat 700/800 otsikoihin, Open Sans 400 + synteettinen lihavointi 600:n sijaan) tai `font-display: swap` + `preload` vain kahdelle tärkeimmälle. | pieni | 1 h |
| P15 | Puhdistuksen sivut (8 kaupunkia + 2) | Poistuvalle palvelulle ei ole suunnitelmaa: 10 indeksoitua sivua, 34 klikkiä kesässä, FAQ-tekstejä, jotka rikkovat sääntöjä ("suojaamalla pihan", "Hinnat alkaen 800€"). | Kun palvelu lopetetaan: 301-ohjaukset pinnoitussivuille, poisto sivukartasta ja navigaatiosta, `puhdistusCities`-lista tyhjäksi. Siihen asti: poista puhdistus "Haluan tarjouksen" -valinnoista, jos tarjouksia ei enää tehdä. | keskisuuri | 2 h |
| P16 | Etusivu | Hero sanoo "Pirkanmaalla", mutta sivusto palvelee myös Kanta-Hämettä (Forssa, Hämeenlinna) ja Huittista. Toiminta-alueet-sivu ja llms.txt sanovat "noin tunnin säteellä Tampereelta". | Yksi muoto: "Pirkanmaalla ja lähikunnissa noin tunnin säteellä Tampereelta". | pieni | teksti |

## 5. Sanavalinnat

Taulukossa on sivu, nykyinen lause (lyhennetty, mutta sanatarkka), ehdotus ja perustelu. Ehdotukset noudattavat sovittua sanastoa ja tyyliä (lyhyet virkkeet, sinuttelu, me-muoto). Hintakortteja ei ole mukana. Missä sama lause toistuu monella sivulla, sivumäärä on suluissa.

| # | Sivu | Nykyinen lause | Ehdotus | Perustelu |
|---|---|---|---|---|
| S1 | Etusivu, palvelukortti (`Services.tsx`) ja 24 aluesivua (`CityServices`) | "Tiilikaton maalauspinnoitus pidentää katon käyttöikää jopa 15-20 vuotta murto-osalla uuden katon hinnasta." | "Pesemme katon painepesulla ja maalaamme sen ruiskulla kahteen kertaan. Katto saa jopa 10–15 vuotta lisää ikää." | Luku ristiriidassa muun sivuston kanssa; "murto-osalla" on väite ilman lukua; kertoo heti, mitä tehdään. |
| S2 | 24 pinnoituksen kaupunkisivun meta description (`seo.ts` rivi 152, vain vanhat 8 kaupunkia käyttävät) | "Tiilikaton maalauspinnoitus {city} – pidentää katon ikää jopa 15-20 vuotta. 5 vuoden takuu." | "Tiilikaton pinnoitus {cityIn}. Yrittäjä tekee työn itse. Ilmainen kuntotarkastus, 5 v takuu ja kotitalousvähennys. Hinta 2 850–7 000 €." | Sama malli kuin uusilla kaupunkisivuilla; yhtenäinen luku. |
| S3 | `/tiilikaton-pinnoitus-pirkanmaa/` hero | "Pysäytä katon rapautuminen ennen kuin on liian myöhäistä. Laadukas tiilikaton pinnoitus Pirkanmaalla säästää sinut kalliilta kattoremontilta. Pintasen ammattimainen pesu ja pinnoitus palauttavat katon loiston ja antavat sille jopa 10–15 vuotta lisäaikaa." | "Pesemme tiilikaton painepesulla ja maalaamme sen ruiskulla kahteen kertaan. Katto saa jopa 10–15 vuotta lisää ikää. Hinta on yleensä 2 850–7 000 €, ja annamme työlle 5 vuoden takuun. Tulemme katsomaan kattosi ilmaiseksi." | Vastaa heti kysymyksiin mitä, paljonko, millä takuulla. Tekoälyhaku voi lainata suoraan. Ei pelottelua. |
| S4 | 24 pinnoituksen kaupunkisivun hero (`KattopalvelutPinnoitusCity.tsx`) | "Pysäytä katon kuluminen ennen kuin vauriot tulevat liian kalliiksi. Laadukas tiilikaton pinnoitus {cityIn} on järkevin tapa estää kalliiden kattoremonttien tarve. Pintasen asiantuntija toteuttaa pinnoitukset ammattitaidolla, jolloin katto saa takaisin alkuperäisen suojansa. Tämä myös parantaa talon julkisivun ilmettä ja antaa katolle jopa 10–15 vuotta lisäaikaa." | "Pinnoitamme tiilikattoja {cityIn}. Pesemme katon painepesulla, vaihdamme rikkinäiset tiilet uusiin ja maalaamme katon ruiskulla kahteen kertaan. Hinta on yleensä 2 850–7 000 €. Tulemme katsomaan kattosi ilmaiseksi." | Neljä pitkää virkettä → neljä lyhyttä. "Asiantuntija toteuttaa" → me-muoto. |
| S5 | 24 pinnoituksen kaupunkisivua (`PinnoitusEntrepreneur.tsx`) | "Hoidan tiilikattojen pinnoitukset Tampereella henkilökohtaisesti alusta loppuun. Olen työskennellyt alalla jo viiden vuoden ajan, ja olen onnistuneesti suorittanut yli 100 urakkaa. Tiedän, miten tamperelaiset katot kestävät vaihtelevia sääolosuhteita." | "Hoidan tiilikattojen pinnoitukset {cityIn} ja muualla Pirkanmaalla itse alusta loppuun. Olen tehnyt tätä työtä viisi vuotta. Tiedät aina, kuka on katollasi ja kuka vastaa jäljestä." | Väärä paikkakunta 23 sivulla. Urakkamäärä jätetty pois, koska luvut eivät täsmää sivustolla (V23); jos luku vahvistetaan, sen voi lisätä. |
| S6 | 26 sivua (`PinnoitusComparison.tsx`) | "Pinnoitus on ympäristöystävällinen valinta, joka maksaa tyypillisesti vain noin 10–20 % uuden katon hinnasta. Tehtyäsi pinnoituksen ajoissa, voit säästää jopa 15 000 euroa, välttää pidemmän remonttimelun ja pidentää nykyisen kattosi käyttöikää jopa 15 vuodella." | "Pinnoitus maksaa yleensä 2 850–7 000 €. Uusi katto maksaa yleensä paljon enemmän. Jos aluskate ja rakenteet ovat kunnossa, pinnoitus riittää. Katto saa jopa 10–15 vuotta lisää ikää." | Prosentti ja säästöluku eivät täsmää; "15 vuodella" vs "10–15". |
| S7 | 25 sivun FAQ "Mitä tiilikaton pinnoitus maksaa?" | "Tiilikaton pinnoituksen hinta asettuu tyypillisesti 2 850 € ja 7 000 € välille katon koosta ja jyrkkyydestä riippuen. Lopullinen kustannus asiakkaalle on kuitenkin huomattavasti edullisempi kotitalousvähennyksen ansiosta – jopa alle 2 100 €. Hintamme sisältävät aina avaimet käteen -toteutuksen ja loppusiivouksen." | "Tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 €. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Hintaan kuuluu koko työ ja siivous. Työn osuudesta saat kotitalousvähennyksen." | "Jopa alle 2 100 €" on minimihinta. Lyhyet virkkeet. |
| S8 | 25 sivun FAQ "Saako… kotitalousvähennystä?" | "Kyllä saa! Tiilikaton pesu ja pinnoitus oikeuttavat merkittävään kotitalousvähennykseen. Voit vähentää 40 % työn osuudesta… Koska pinnoitusurakoissa työn osuus on tyypillisesti jopa 80 % kokonaishinnasta, vähennyksen tuoma säästö on usein noin tuhat euroa. Puolisot voivat hyödyntää vähennyksen yhdessä, jolloin maksimietu on jopa 4 200 euroa vuodessa." | "Kyllä. Vuosina 2026 ja 2027 saat vähentää 40 % työn osuudesta. Vähennys on enintään 2 100 € vuodessa yhdeltä ihmiseltä, ja omavastuu on 150 €. Erittelemme työn osuuden laskuun, joten vähennyksen hakeminen on helppoa." | Poistaa arviot ("jopa 80 %", "noin tuhat euroa"), jotka voidaan lukea lupauksina. Sama lause kuin artikkelissa. |
| S9 | 25 sivun FAQ "Kuinka kauan tiilikaton pinnoitus kestää?" | "…Työ pitää sisällään huolelliset pohjatyöt (kuten painepesun ja torjunta-ainekäsittelyn), riittävän kuivumisajan sekä kaksinkertaisen ruiskumaalauksen." | "Omakotitalon katto valmistuu yleensä 2–4 työpäivässä. Pesemme katon painepesulla, vaihdamme rikkinäiset tiilet uusiin ja maalaamme katon ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali. Välissä katto saa kuivua." | Sovittu sanasto; "torjunta-ainekäsittely" ei kuulu sovittuun kuvaukseen (jos käsittely tehdään, sano se omana lyhyenä virkkeenä). |
| S10 | `/tiilikaton-pinnoitus-hinta-pirkanmaa/` hero | "Kotitalousvähennyksen jälkeen hinta on alkaen 2 050 €." | "Työn osuudesta saat kotitalousvähennyksen." | Sääntö: ei minimihintaa. |
| S11 | `/talon-maalaus-hinta-pirkanmaa/` hero | "Kotitalousvähennyksen jälkeen hinta on alkaen 2 380 €." | "Työn osuudesta saat kotitalousvähennyksen." | Sama. |
| S12 | Artikkeli "Kotitalousvähennys…" | "Meillä tiilikaton pinnoitus maksaa kotitalousvähennyksen jälkeen alkaen 2 050 euroa." | "Tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 euroa. Työn osuudesta saat vähennyksen." | Sama. |
| S13 | `llms.txt` (routes.ts `buildLlmsTxt`) | "Tiilikaton pinnoitus: omakotitalo yleensä 2 850–7 000 €, alkaen 15 €/m²; esimerkit 150–180 m² 2 850–3 200 €, 190–240 m² 3 300–3 700 €, 250–300 m² 3 750–4 880 €" | "Tiilikaton pinnoitus: omakotitalo yleensä 2 850–7 000 €. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta." | Sääntö: ei neliöhintaa eikä hinnastotaulukkoa. llms.txt on se tiedosto, jonka tekoälyhaku lukee ensin. |
| S14 | `llms.txt` ja `/tiilikaton-pinnoitus-pirkanmaa/` meta | "Tiilikaton pinnoitus Pirkanmaalla. Säästä jopa 80 % vs. kattoremontti! Hyödynnä kotitalousvähennys ja tilaa ilmainen kuntoarvio. 5 vuoden takuu työlle." | "Tiilikaton pinnoitus Pirkanmaalla. Pesemme katon painepesulla ja maalaamme sen ruiskulla kahteen kertaan. Hinta yleensä 2 850–7 000 €, 5 vuoden takuu, ilmainen kuntotarkastus." | Ei prosenttiväitettä; kertoo työn. |
| S15 | `/tiilikaton-pinnoitus-hinta-pirkanmaa/` "Mitä hintaan kuuluu?" | "Suunnittelu ja tarvittavat suojaustyöt · Katon pesu · Kasvustontorjunta-aine · Rikkinäisten tiilien vaihto · Pohjamaali · Pintamaali · Siivous" | "Katon pesu painepesulla · Rikkinäisten tiilien vaihto uusiin · Pohjamaali ruiskulla · Pintamaali ruiskulla · Siivous" (+ "Kasvustontorjunta-aine", jos se kuuluu hintaan) | Sanasto; "tarvittavat suojaustyöt" voi lukea pihan suojaamiseksi. |
| S16 | 24 aluesivun hero (`ServiceAreaPage.tsx`) | "Suojaa kotisi arvokkaimmat rakenteet säänvaihteluilta. Pintanen tarjoaa ammattimaiset tiilikattojen pinnoitukset, kattojen puhdistukset sekä talojen ulkomaalaukset {cityIn} ja koko Pirkanmaalla. Yrittäjät tekevät itse työn." | "Pinnoitamme tiilikattoja ja maalaamme taloja {cityIn}. Teemme työn itse. Tulemme katsomaan kohteen ilmaiseksi." | Lyhyempi, me-muoto, ei "arvokkaimmat rakenteet" -tyyppistä korulausetta. Puhdistus pois, kun palvelu loppuu. |
| S17 | Aluesivu Tampere (`areaCityContent.ts`) | H2 "Näsijärven ja Pyhäjärven kosteuden vaikutus Tampereen kiinteistöihin" + "Tampereen sijainti kahden suuren järven välissä ja harjumaisemien tuomat korkeuserot koettelevat talojen ulkopintoja. Ilmankosteus saa betonitiilikattojen pinnan kulumaan nopeasti, ja se luo ihanteelliset olosuhteet puuverhouksen homepilkuille. Ennakoiva katon pinnoitus ja asiantunteva talon ulkomaalaus pitävät Tampereen vaihtelevan sään aiheuttaman pakkasrapautumisen ja lahoamisen loitolla." | H2 "Tiilikaton pinnoitus ja talon maalaus Tampereella" + "Tampere on Näsijärven ja Pyhäjärven välissä. Veden lähellä katto ja seinät pysyvät sateen jälkeen pitkään kosteina. Siksi tiilikatto sammaloituu ja maali kuluu nopeammin. Pinnoitamme kattoja ja maalaamme taloja koko Tampereella, esimerkiksi Hervannassa, Pispalassa ja Lielahdessa." | Nykyinen teksti on mainosmaista ja raskasta. Uusien pinnoitus-/maalaussivujen hook-tekstit ovat jo oikeaa tyyliä – käytä samaa tyyliä. |
| S18 | Aluesivut Ikaalinen, Nokia, Sastamala, Valkeakoski, Pirkkala, Juupajoki, Mänttä-Vilppula ym. (`areaCityContent.ts`, kaikki 24) | Esim. "tiilikatto menettää hydrofobisen ominaisuutensa" (Ikaalinen), "Nokianvirran alueen pientalojen elinkaaren maksimointi" (Nokia), "Ammattitason ulkomaalaus ja ruiskupinnoitus" (Valkeakoski), "elintärkeä sijoitus kotisi rakenteiden säilymiselle" (Sastamala), "Pirkkalan arvostetut asuinalueet sijaitsevat urbaanin ympäristön ja Pyhäjärven luonnon välimaastossa", "Taidekaupungin kiinteistöjen suojelu" (Mänttä-Vilppula), "Ikaalisten Kyrösjärven tuomien säärasitusten nujertaminen". | Kirjoita kaikki 24 uudelleen samalla kaavalla kuin S17: 1) missä kunta on ja mikä vesistö/metsä, 2) mitä se tekee katolle ja seinille (yksi syy), 3) mitä me teemme ja missä kylissä, 4) käynti on ilmainen. Lainaa suoraan `newCityPages.ts`-tekstien tyyliä. | Vieraat sanat (hydrofobinen, mikroklima, urbaani), abstraktit otsikot ja ylisanat. Aluesivut olivat toiseksi suurin liikenteen lähde, joten tekstin laatu vaikuttaa. |
| S19 | 24 maalauksen kaupunkisivun hero + `/talon-maalaus-pirkanmaa/` hero | "Suojaa kotisi säänvaihteluilta ja pidennä ulkoverhouksen ikää laadukkaalla maalauksella. Meiltä saat perusteelliset pohjatyöt, säänkestävän lopputuloksen ja täysin läpinäkyvän hinnoittelun. Kokeile avointa hintalaskuriamme heti verkossa tai kutsu meidät maksuttomalle arviokäynnille suoraan kotiovellesi – palvelemme paikallisesti ja joustavasti!" | "Maalaamme taloja {cityIn}. Pesemme seinät homepesuaineella, kaavimme irtoavan maalin, pohjamaalaamme paljaat kohdat ja maalaamme pintamaalin pensselillä. Hinta on yleensä 3 500–11 000 €. Arviokäynti on ilmainen." | Kertoo työn ja hinnan heti; ei huutomerkkejä. |
| S20 | `/talon-maalaus-pirkanmaa/` FAQ ("Mikä on talon ulkomaalauksen hinta-arvio?"), `TalonMaalaus.tsx` FAQ ja 24 kaupunkisivun FAQ ("Mitä omakotitalon maalaus… maksaa?") | "Keskikokoisen omakotitalon maalaus… maksaa tyypillisesti 4 000 – 8 000 euroa." / "3 000 eurosta ja 10 000 euroon" / "Keskikokoisen puutalon huoltomaalaus asettuu useimmiten 5 000 ja 6 500 euron väliin… Tulemme mielellämme tekemään ilmaisen tarkan kuntoarvion paikan päälle!" | "Omakotitalon maalaus maksaa meillä yleensä 3 500–11 000 €. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen." | Yksi haarukka koko sivustolle. |
| S21 | 24 maalauksen kaupunkisivun FAQ "Mitä pohjatöitä teette…" | "Kestävä lopputulos vaatii aina huolelliset pohjatyöt, ja siksi panostamme niihin erityisesti. Poistamme hilseilevän vanhan maalin huolellisesti ja teemme julkisivulle perusteellisen homepesun. Lisäksi pohjamaalaamme paljaat puupinnat ennen varsinaista pintamaalin levitystä." | "Pesemme seinät homepesuaineella. Kaavimme irtoavan maalin pois. Pohjamaalaamme paljaat kohdat. Sitten maalaamme pintamaalin pensselillä. Lautoja emme vaihda." | Lyhyet virkkeet; sama järjestys kuin prosessissa; kertoo myös, mitä ei tehdä. |
| S22 | `/talon-maalaus-pirkanmaa/` prosessi (`MaalausProcessAccordion.tsx`) | "4. Pohjustus ja puupuhtaiden pintojen käsittely" | "4. Pohjamaali paljaisiin kohtiin" | Sanasto. |
| S23 | `/talon-maalaus-pirkanmaa/` SEO-osiot | H2 "Miksi talon huoltomaalaus on tärkeää juuri nyt?", H3 "Estä kosteuseläminen ja lahottajasienien kasvu", "UV-säteily – Puukuidun ja sideaineiden kuluttaja" | "Miksi talo kannattaa maalata ajoissa?", "Maali pitää veden pois puusta", "Aurinko haalistaa ja haurastuttaa maalin" | Otsikot kysymyksinä ja arkikielellä; sama sisältö. |
| S24 | `/tiilikaton-pinnoitus-pirkanmaa/` SEO-osiot | H2 "Miksi tiilikaton pinnoitus on elintärkeää juuri nyt?", H3 "Sammaleen poisto on vain puolet ratkaisusta" | "Miksi tiilikatto kannattaa pinnoittaa ajoissa?", "Pesu ei riitä, jos tiilen pinta on kulunut" | "Elintärkeää" on liioittelua. |
| S25 | 24 pinnoituksen kaupunkisivua (`PinnoitusProblemSection.tsx`) | "Kun tiilen suoja kuluu pois, tiili imee kosteutta kuin kuiva pesusieni. Siinä vaiheessa pelkkä puhdistus ei riitä. Katto tarvitsee ammattitaitoista pinnoitusta, jotta se kestää teknisesti pitkään." / "vain ammattimainen tiilikaton pinnoitus sulkee tiilen huokoset. Se luo katolle vettä hylkivän suojakilven" | "Kun tiilen pinta kuluu, tiili alkaa imeä vettä. Vesi jäätyy talvella ja rikkoo tiiltä. Pesu ei silloin riitä. Uusi maalipinta pitää veden tiilen ulkopuolella." | Sama asia ilman kielikuvia; "ammattitaitoista"/"ammattimainen" toistuu. |
| S26 | 24 pinnoituksen kaupunkisivua, prosessihaitari (`PinnoitusCityProcess.tsx`) | "2. Tarvittavat suojaukset – Katon pesu on sotkuista työtä. Teemme ennen pesua kohteen vaatimat suojaukset. Jätämme pihasi vähintään yhtä siistiksi kuin se oli saapuessamme." · "3. Painepesu ja rännien puhdistus – Poistamme pinttyneen lian ja sammaleen tehokkaalla ammattitason pesurilla." · "5. Kaksinkertainen pinnoitus – Käytämme vain parhaita Tikkurilan ja Nowocoatin kattomaaleja. Kaksinkertainen ruiskumaalaus takaa tasaisen ja erittäin kestävän pinnan." | "2. Suojaus – Suojaamme tarvittaessa esimerkiksi aurinkopaneelit. Siivoamme jälkemme." · "3. Pesu – Pesemme katon painepesulla ja huuhtelemme sadevesikourut." · "5. Maalaus kahteen kertaan – Maalaamme katon ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali." | "Tarvittavat suojaukset" voi lukea pihan tai seinien suojaamiseksi; aurinkopaneelien suojaus näkyy omassa kuvassa (Tampere 2026), joten se voidaan sanoa. "Vain parhaita" on ylisana. |
| S27 | `/meista/` | "Pintanen on uudehko Oulusta kotoisin oleva perheyritys, jonka tekeminen nojaa vahvaan ja monipuoliseen kokemukseen." | "Pintanen on nuori perheyritys. Olemme kotoisin Oulusta ja teemme töitä Pirkanmaalla ja Kanta-Hämeessä." (tai ilman Oulua, jos se ei ole totta) | Ristiriita saman sivun kanssa; tekoälyhaku voi vastata "oululainen yritys". |
| S28 | `/meista/` | "Eemil on erikoistunut seinien maalaukseen ja pintakäsittelyyn. Hän huolehtii siitä, että julkisivut ja sisäpinnat saavat kestävän ja silmiä hivelevän lopputuloksen." | "Eemil maalaa talojen ulkoseinät. Hän pesee, kaapii, pohjamaalaa paljaat kohdat ja maalaa pintamaalin pensselillä." | Sisäpinnat pois, ellei totta; kuvaa työn. |
| S29 | `/meista/` | "Päätimme hypätä kilpailuun eri taktiikalla: Huomasimme, kuinka raskaat kulurakenteet ja byrokratia nostavat isojen maalausyritysten hintoja – ilman, että se välttämättä näkyy itse työn jäljessä. Me karsimme kaiken turhan." | "Meillä ei ole välikäsiä eikä toimistoa. Siksi hinta on kohtuullinen ja tiedät aina, kuka työn tekee." | Lyhyempi; ei arvostele kilpailijoita. |
| S30 | `/referenssit/` hero | "Näet selkeästi ennen ja jälkeen -kuvat, jotka kertovat työn jäljestä enemmän kuin sanat. Laatu puhuu puolestaan – jokainen kohde on tehty huolellisesti ja viimeistellysti." | "Tässä on kuvia töistämme Pirkanmaalla ja lähikunnissa. Kuvat ovat omista kohteistamme." | Lyhyt ja totta; "kuvat ovat omista kohteistamme" on vahva luottamuslause, jota käytetään jo kaupunkisivuilla. |
| S31 | `/toiminta-alueet/` | "Pintanen Oy suorittaa tiilikattojen pinnoitukset, katon puhdistukset ja talojen ulkomaalaukset pääasiassa Pirkanmaan alueella." | "Pinnoitamme tiilikattoja ja maalaamme taloja Pirkanmaalla ja lähikunnissa noin tunnin säteellä Tampereelta." | Me-muoto; sama aluekuvaus kuin llms.txt:ssä. |
| S32 | Etusivu `MiksiPintanen.tsx` | H2 "Miksi kannattaa tilata katon huolto tai maalaus Pintaselta?" | "Miksi Pintanen?" tai "Miksi tilata meiltä?" | Lyhyempi; sisältö jo vastaa. (pieni) |
| S33 | Etusivu SEO-teksti (`SEOTextSection.tsx`) | H3 "Tiilikaton pinnoitus ja puhdistus – jatka kattosi elinikää" | "Tiilikaton pinnoitus – lisää katon ikää 10–15 vuotta" | "Jatka elinikää" on kömpelö; puhdistus poistuu. |
| S34 | Hinta- ja palvelusivujen yhteydenotto (`ServiceContactSection`) | "Pyydä ilmainen arviokäynti tai tarjouspyyntö. Vastaamme vuorokauden sisään!" | "Pyydä ilmainen arviokäynti. Vastaamme viimeistään seuraavana arkipäivänä." | "Tarjouspyynnön pyytäminen" on kömpelö; lupaus kannattaa sitoa arkipäiviin (Eerik vahvistaa). |
| S35 | `/katon-puhdistus-pirkanmaa/` FAQ (palvelu poistuu – vain tiedoksi) | "Aloitamme suojaamalla pihan…", "Hinnat alkaen 800€" | Ei ehdotusta; varmista vain, ettei lausetta kopioida pinnoitussivuille, ja ohjaa sivu 301:llä, kun palvelu loppuu. | Sääntö. |

## 6. Tekniikka

Kaikki havainnot buildista `dist/` (97 sivua) ja lähdekoodista. Live-palvelimen käytöstä ei testattu.

### 6.1 Otsikot (title) ja kuvaukset

- [Tarkistettu] 97 uniikkia titleä ja 97 uniikkia kuvausta. Ei tuplia.
- [Tarkistettu] Title-pituudet 28–70 merkkiä; 30 sivulla yli 60 merkkiä (katkeaa Googlen tuloksessa). Pisimmät: `/tiilikaton-pinnoitus-hinta-pirkanmaa/` (70, "Tiilikaton pinnoitus hinta 2027 – hintaesimerkit ja laskuri | Pintanen"), `/katon-puhdistus-hameenkyro/` (70), `/tiilikaton-pinnoitus-mantta-vilppula/` (69), `/katon-puhdistus-hinta-pirkanmaa/` (69).
- [Tarkistettu] Kuvaukset 103–175 merkkiä; 38 sivulla yli 160 (pinnoituksen uudet kaupunkisivut 164–175, aluesivut 159–170), 4 puhdistussivulla alle 110.
- [Tarkistettu] Title-mallit: pinnoitus "Tiilikaton pinnoitus {city} | Hinta 2 850–7 000 € | Pintanen" (hyvä: hinta otsikossa erottuu); maalaus "Talon maalaus {city} | Hintalaskuri | Pintanen" (heikompi: "Hintalaskuri" ei ole hakutermi – vaihda esim. "| Ilmainen arviokäynti" tai "| Yrittäjä maalaa itse"); aluesivut "Tiilikaton pinnoitus ja talon maalaus {city} | Pintanen" (kilpailee palvelusivujen kanssa, ks. 2.8).
- [Tarkistettu] Hintasivujen titlessä on vuosiluku 2027 ("Tiilikaton pinnoitus hinta 2027"), vaikka nyt on lokakuu 2026. Vuosiluku otsikossa toimii, jos se on kuluva tai heti seuraava vuosi ja sivu päivitetään vuosittain – muista vaihtaa 2028 ensi syksynä. Artikkelin otsikko "Kotitalousvähennys… 2027" vastaa sisältöä ("2026 ja 2027").
- Ehdotus: lisää "julkisivumaalaus"/"ulkomaalaus" maalaussivujen titleen (ks. 2.7); poista "& Tampere" Pirkanmaa-pinnoitussivun titlestä; lyhennä pinnoituksen kaupunkisivujen kuvaus pudottamalla toinen hintamaininta tai kaupunginosalista.

### 6.2 Otsikkotasot

- [Tarkistettu] Jokaisella sivulla täsmälleen yksi H1. H1 vastaa titleä.
- [Tarkistettu] H2-määrät: etusivu 10, palvelusivut 10–11, pinnoituksen kaupunkisivut 13–14, maalauksen 13–14, aluesivut 8–9, hintasivut 8–10, artikkelit 8–9. Kaupunkisivuilla 13–14 H2:ta on paljon: sivu on 2 600 sanaa ja 13 000 px korkea tietokoneella (kuva 17-…-koko-sivu.jpg).
- [Tarkistettu] Hero-H1 on jaettu kahteen `<span>`-elementtiin (esim. "Tiilikaton pinnoitus" + "Pirkanmaa"), mikä on ok. `verify_dist.py`-skripti raportoi H1:t tyhjinä väleinä ("Tiilikaton pinnoitus", "", "Pirkanmaa") – vain kosmeettista.
- [Tarkistettu] Toistuvia H2-otsikoita, jotka eivät kerro aiheesta: "Ota yhteyttä", "Usein kysytyt kysymykset", "Toiminta-alueet" jokaisella sivulla. Ok, mutta FAQ-H2 voisi kantaa avainsanan: "Usein kysyttyä tiilikaton pinnoituksesta {cityIn}".
- [Tarkistettu] FAQ-kysymykset ovat H3-tasolla ja vastaukset puuttuvat HTML:stä (V12).

### 6.3 Sisäiset linkit

- [Tarkistettu] 83–87 uniikkia sisäistä linkkiä sivua kohti; näistä noin 70 tulee `ToimintaAlueetBanner`ista (24 kuntaa × 3 palvelua = 72 linkkiä) ja loput headerista, footerista ja sisällöstä. Artikkelisivuilla 35–47.
- [Tarkistettu] Yli 2 000 linkkiä (kaikilla sivuilla yhteensä) osoittaa kauttaviivattomaan muotoon (`/hintalaskuri` 173 kpl, `/tarjouspyynto` 150, `/artikkelit` 97, `/katon-puhdistus-pirkanmaa` 97, jokainen `/maalauspalvelut-x` 97). Lähteet: `Header.tsx`, `Footer.tsx`, `Hero.tsx`, `ToimintaAlueetBanner.tsx`, `SEOTextSection.tsx`, `RelatedArticles.tsx`, `ArticleLayout.tsx`, `ServiceAreaPage.tsx`, kaksi artikkelia, `App.tsx`. Canonical on kauttaviivallinen → jokainen klikkaus kulkee uudelleenohjauksen kautta [Oletus: Cloudflare Pages 308]. Korjaus 7.
- [Tarkistettu] Rikkinäisiä sisäisiä linkkejä ei löytynyt (kaikki kohteet ovat sivukartassa tai `_redirects`-säännöissä).
- [Tarkistettu] Kaupunkisivuilla on hyvä ristiinlinkitys: pinnoitus ↔ maalaus ↔ aluesivu samalle kunnalle ja naapurikunnat (`CityNeighborLinks`). Palvelusivut `-pirkanmaa` eivät linkitä kaupunkisivuille muuten kuin Toiminta-alueet-palkin kautta – lisää tekstilinkki "Tiilikaton pinnoitus Tampereella, Nokialla, Ylöjärvellä…" sisältöön.
- [Tarkistettu] Ankkuritekstit ovat hyviä ("Tiilikaton pinnoitus Kangasala"), eivät "lue lisää".
- Ehdotus: Toiminta-alueet-palkki vain etusivulle, toiminta-alueet-sivulle ja aluesivuille (korjaus 6). Muualla footerin kuntalista + naapurikunnat riittävät. Vähentää HTML:ää ~10 kB/sivu ja keskittää linkkiarvon.

### 6.4 Rakenteinen data (JSON-LD)

| Tyyppi | Sivuja | Tila |
|---|---|---|
| `RoofingContractor` + `HousePainter` (`#yritys`) | 97 | Hyvä: nimi, Y-tunnus, puhelin, sähköposti, perustajat, `knowsAbout`, `hasOfferCatalog`, `sameAs` (FB, IG, X, Google). Puutteet: `areaServed` 11/24 kuntaa (V16), `address` vain postinumero 33300 Tampere (jos toimipaikkaa ei ole, `address` voi olla pelkkä kunta + maa), ei `openingHours`, ei `geo`. Google-profiilin `sameAs` on share-lyhytosoite. |
| `WebSite` | 97 | Ok. Ei `SearchAction`ia (ei tarvita). |
| `BreadcrumbList` | 96 | Ok, mutta vain 2 tasoa kaupunkisivuilla (Etusivu → "Tiilikaton pinnoitus Tampere"). Parempi: Etusivu → Tiilikaton pinnoitus → Tampere, ja sama näkyvänä (P7). |
| `Service` | 85 | `provider` viittaa `#yritys`, `areaServed` kaupunki. Ei `offers` (P6). Description-kenttä kopioi meta descriptionin, joten V10:n "Säästä jopa 80 %" on myös schemassa. |
| `FAQPage` | 91 | Validi JSON. Ongelma: vastaukset eivät ole näkyvässä HTML:ssä (V12) ja sisältävät `<strong>`-tageja (sallittu, mutta turha). Google näyttää FAQ-rikastettuja tuloksia enää vain viranomais- ja terveyssivustoille (2023 alkaen), joten FAQ-scheman hyöty on lähinnä tekoälyhauissa – ja ne lukevat näkyvän tekstin. |
| `Article` | 3 | Hyvä: `author` (Person + worksFor), `datePublished`, `dateModified`, `image`, `publisher` logolla. |
| Puuttuu | – | `AggregateRating` ei ole, vaikka sivuilla näytetään "5,0 / 5 Google-arvostelut". Googlen ohje kieltää itse kerätyt arviot LocalBusiness-tähtiin, joten tämä on oikein jätetty pois. `ImageObject`-tietoja referenssikuville ei tarvita. |

- [Tarkistettu] Kaikki 97 sivun JSON-LD:t jäsentyvät virheettä (oma tarkistus) ja `verify_dist.py` raportoi "ONGELMAT: 0".

### 6.5 Kuvien alt-tekstit

- [Tarkistettu] Sisältökuvilla on kuvaavat alt-tekstit (esim. "Tiilikatto Tampereella ennen ja jälkeen pinnoituksen: jälkeen"). Hyvä taso.
- [Tarkistettu] Tyhjä alt (`alt=""`, koriste) on: palvelukorttien ikoneilla (3 kpl/sivu), kaikkien alasivujen hero-taustakuvalla (1/sivu), aluesivujen palvelukorttien ikoneilla (4/sivu), artikkelilistan kirjoittajakuvilla. Koristekuville tyhjä alt on oikein. Hero-kuva on kuitenkin sivun suurin kuva ja sillä on `fetchpriority="high"` – jos se halutaan kuvahakuun, anna sille lyhyt alt ("Punainen tiilikatto pinnoituksen jälkeen"); muuten nykyinen on hyväksyttävä.
- [Tarkistettu] Virheelliset alt-tekstit: V2 (paikkakunta vaihdetaan kuvaan, joka ei ole sieltä). Lisäksi `/hintalaskuri/`-sivulla valintakorttien kuvien alt on "Tiilikaton pinnoitus" / "Talon maalaus" (ok).
- [Tarkistettu] Kuvasivukartassa 95 kuvaa otsikoineen; otsikot ovat sivun titlejä, eivät kuvan sisältöä (esim. "Tiilikaton pinnoitus Pirkanmaa & Tampere"). Pieni asia: käytä kuvan alt-tekstiä `image:title`nä.

### 6.6 Nopeus

Mittaukset paikallisesta `vite preview`stä (ei verkkoviivettä), joten absoluuttiset ajat eivät kerro tuotannosta. Koot ovat tarkkoja.

| Mitä | Arvo | Huomio |
|---|---|---|
| JavaScript jokaisella sivulla (modulepreload) | `index` 334 kB (91 kB gzip) + `vendor-ui` 243 kB (79 kB) + `vendor-motion` 120 kB (40 kB) + `vendor-react` 21 kB (8 kB) = **~218 kB gzip** + reittikohtainen 5–10 kB gzip | Paljon markkinointisivustolle. `vendor-motion` (framer-motion) on syy sekä kokoon että näkymättömään heroon. `vendor-ui` sisältää Radix-komponentit koko sivustolle. |
| CSS | 110 kB (18 kB gzip) | Ok. |
| Fontit | 8 woff2-tiedostoa, ~150 kB | P14. |
| HTML | etusivu 454 kB, pinnoituksen kaupunkisivu 274 kB, maalauksen 211 kB, aluesivu 163 kB, hintasivu 88 kB | Etusivulla 571 inline-SVG:tä (275 kB; Suomen kartta + ikonit) ja karusellin toistot. Gzip pienentää paljon, mutta jäsennys vie aikaa puhelimella. |
| Hero-kuva | Etusivu AVIF 30 kB (1200 w) + preload + `fetchpriority=high`; alasivut WebP 44–51 kB (1200 w), srcset 400/800/1200, preload | Hyvä. |
| Muut kuvat | `loading="lazy"` 24 kuvaa etusivulla; `width`/`height` vain 16/29 kuvalla | P13. |
| Esirenderöity teksti `opacity:0` | mediaani 32 % sanoista, max 81 % (`verify_dist.py`); oma mittaus: etusivu 20 %, pinnoitus-Pirkanmaa 31 %, maalaus-Pirkanmaa 44 %, hintasivu 41 %, Meistä 64 %, puhdistus 47 %, aluesivu 26 %, pinnoitus-Tampere 33 %, maalaus-Tampere 27 %, artikkeli 0 % | Korjaus 1. `<noscript>`-sääntö auttaa vain, jos JS on kokonaan pois päältä – ei hitaan latauksen aikana. |
| Ulkoiset pyynnöt ennen evästesuostumusta | 0 | Hyvä: GA (`G-QCNVJFMDFY`) ladataan vasta hyväksynnän jälkeen. |
| Konsolivirheet, vaakavieritys | 0 / ei | Hyvä, kaikilla 21 sivupohjalla kummallakin leveydellä. |
| Sivun korkeus puhelimella (390 px) | etusivu 19 600 px, pinnoituksen kaupunkisivu 21 200 px, maalauksen 20 100 px, aluesivu 14 400 px, palvelusivu 16 700 px | 20 000 px on noin 25 näytöllistä. Ks. luku 8. |

Ehdotukset nopeuteen, tärkeysjärjestyksessä: (1) hero ja ensimmäinen näytöllinen ilman motion-animaatiota (korjaus 1); (2) karusellin kopiot pois HTML:stä (V13); (3) Toiminta-alueet-palkki vain tarvittaville sivuille; (4) kartta-SVG ladataan `<img>`-elementtinä tai vain näkyviin tullessa; (5) fonttipainot kolmeen; (6) framer-motionin korvaaminen CSS-animaatioilla (iso työ, 1–2 päivää, säästö ~40 kB gzip ja hydraatioaikaa – tehdään vasta, jos Core Web Vitals -kenttädata on heikko).

### 6.7 Sivustokartta, robots, uudelleenohjaukset, 404

- [Tarkistettu] `sitemap.xml`: 97 URL:ia, kaikki kauttaviivallisia ja canonicalin mukaisia; `lastmod` vain kolmella artikkelilla. `image-sitemap.xml`: 95 kuvaa. `robots.txt`: sallii kaikki (myös tekoälybotit), estää `/cdn-cgi/`, viittaa molempiin sivukarttoihin. Hyvä.
- [Tarkistettu] `_redirects`: 75 riviä – vanhat `/kattopalvelut/...`, `/talon-maalaus/<kunta>`, `/hinnat/...`, `/alue/<kunta>` ja `/maalauspalvelut-hinta-pirkanmaa` → uudet osoitteet 301:llä. SPA-fallback `/* /index.html 200`. Hyvä kattavuus. Ei testattu livenä.
- [Tarkistettu] `404.html` generoidaan `noindex`-metalla ja oikealla otsikolla; `NotFound.tsx` asettaa noindexin. HTTP-statusta (404 vs 200) ei voitu tarkistaa – Cloudflare Pagesissa `/* /index.html 200` -sääntö voi palauttaa 200 tuntemattomille poluille, jolloin Google näkee "soft 404" -sivuja. Tarkista livenä `curl -I https://pintanen.fi/ei-ole-olemassa/`. Jos status on 200, poista fallback-rivi (esirenderöidyt sivut eivät sitä tarvitse) tai käytä `404.html`-mekanismia.
- [Tarkistettu] `_headers`: HSTS, nosniff, X-Frame-Options, Permissions-Policy, assets immutable 1 v, kuvat 30 pv, llms.txt utf-8. Puuttuu Referrer-Policy ja CSP (P12).
- [Tarkistettu] Search Console näyttää yhä `/alue/tampere/` ja neljä kauttaviivatonta URL:ia (2.5). Ohjaukset ovat olemassa; ne poistuvat, kun sisäiset linkit on korjattu ja Google käy ne uudelleen.
- [Tarkistettu] Ei `hreflang`-tageja (ei tarvita, yksi kieli). `lang="fi"` on. `og:locale fi_FI` on.

### 6.8 llms.txt ja tekoälybotit

- [Tarkistettu] `llms.txt` generoituu buildissa, sisältää perustiedot, hinnat, palvelut, artikkelit ja 24 aluesivua. Hyvä käytäntö. Ongelmat: V7/V10 (alkaen 15 €/m², esimerkkitaulukko, "Säästä jopa 80 %"), ei työvaiheita eikä "mitä emme tee" (P10), kunnilta linkitetään vain aluesivu – lisää pinnoitus- ja maalaussivut.
- [Tarkistettu] `robots.txt` ei estä GPTBot/ClaudeBot/PerplexityBot -botteja. Oikea valinta, kun halutaan näkyä tekoälyhauissa.

## 7. GEO – näkyvyys tekoälyhauissa

Arvioitu kolmella kysymyksellä: (1) vastaako sivu heti kysymykseen, johon hakija tuli, (2) ovatko faktat (hinta, kesto, takuu, työvaiheet, alue, yhteystiedot) poimittavissa yhdestä kohdasta ilman klikkausta, (3) mitä tekoälyhaku todennäköisesti lainaisi – ja onko se oikein. Arviot perustuvat esirenderöityyn HTML:ään, jonka botit lukevat.

### 7.1 Yleiset havainnot

- **Vahvuudet [Tarkistettu]:** Y-tunnus, puhelin, sähköposti ja takuut ovat samoina kaikkialla (schema, footer, llms.txt). Artikkelit on kirjoitettu juuri oikein: ensimmäinen kappale vastaa otsikon kysymykseen, "Lyhyesti"-laatikko listaa faktat, FAQ-vastaukset ovat näkyvissä, lähteet on nimetty, kirjoittajalla on nimi ja rooli. Uusien kaupunkisivujen paikallistekstit ovat konkreettisia (etäisyys, järvet, talomäärät lähteineen).
- **Heikkoudet [Tarkistettu]:**
  1. FAQ-vastaukset ja pinnoituksen työvaiheet puuttuvat HTML:stä (V12). Tekoälyhaku näkee kysymyksen "Mitä tiilikaton pinnoitus maksaa?" mutta ei vastausta – paitsi JSON-LD:stä, jota kaikki botit eivät lue.
  2. Ristiriitaiset luvut (V5–V9). Jos malli löytää sekä "10–15" että "15–20 vuotta", se joko valitsee satunnaisesti tai ei lainaa lainkaan.
  3. Hero-tekstit ovat myyntipuhetta ("Pysäytä katon rapautuminen ennen kuin on liian myöhäistä"), eivät vastauksia. Malli lainaa mieluummin virkkeen, jossa on subjekti, luku ja yksikkö.
  4. "Oulusta kotoisin" (V3) – kysymykseen "Mistä Pintanen on?" sivusto antaa kaksi vastausta.
  5. Kaupunkisivun yrittäjäteksti sanoo "Tampereella" kaikille kunnille (V1) – kysymykseen "Tekeekö Pintanen pinnoituksia Virroilla?" malli voi vastata "Pintanen hoitaa pinnoitukset Tampereella".
  6. Arvostelut toistuvat neljästi ja Toiminta-alueet-palkki on 72 linkkiä: sivun "signaali–kohina"-suhde on heikko; paikallinen fakta hukkuu.

### 7.2 Sivupohjittain

| Sivupohja | Vastaako suoraan? | Faktat poimittavissa? | Mitä tekoälyhaku todennäköisesti lainaisi | Arvio |
|---|---|---|---|---|
| Etusivu | Kyllä: H1 + ingressi kertovat kuka ja mitä. | Osittain: luottamusrivi (5,0/5, 200+, 5+ v, 0 €) ilman selitystä; palvelukortti sanoo "15-20 vuotta". | "Perheyritys, jossa yrittäjät tekevät työn itse – tiilikaton pinnoitukset ja talon maalaukset Pirkanmaalla." Hyvä. Riski: "15-20 vuotta". | hyvä, kun V5 korjattu |
| Tiilikaton pinnoitus Pirkanmaa | Ei heti: hero ei kerro mitä tehdään tai mitä maksaa. | Hinta ja kesto vasta hintakorteissa ja FAQ:ssa (ei HTML:ssä). Työvaiheet haitarissa (ei HTML:ssä). | "Laadukas tiilikaton pinnoitus Pirkanmaalla säästää sinut kalliilta kattoremontilta" – ei faktaa. | heikko → P8 korjaa |
| Talon maalaus Pirkanmaa | Ei heti. | Prosessi haitarissa; hinta korteissa; FAQ ei HTML:ssä. | "Meiltä saat perusteelliset pohjatyöt, säänkestävän lopputuloksen…" – ei faktaa. | heikko → P9 korjaa |
| Hintasivut (pinnoitus, maalaus) | Kyllä: ensimmäinen virke antaa haarukan ja mistä hinta riippuu. | Hyvin: "Mitä hintaan kuuluu", "Mistä hinta syntyy", vertailu uuteen kattoon, FAQ (ei HTML:ssä). | "Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 €." Erinomainen lainaus. Riski: seuraava virke "alkaen 2 050 €". | hyvä, kun V7 korjattu |
| Hintalaskuri | Ei: sivu on työkalu ilman selitystä. | Ei. | Ei mitään lainattavaa. | heikko → P3 |
| Tarjouspyyntö | Kyllä: "Me yrittäjät soitamme sinulle itse ja tulemme ilmaiselle kuntotarkastukselle." + 3 vaihetta. | Kyllä. | Vaiheet 1–3. Hyvä. | hyvä |
| Referenssit | Kyllä. | Kuvien paikat ja vuodet. | "Teemme töitä noin tunnin ajomatkan säteellä Tampereelta." | ok |
| Meistä | Kyllä, mutta ristiriitaisesti (Pirkanmaa/Oulu). | Luvut 200+/yli 5/2–5/100 % ilman selitystä. | "Pintanen on uudehko Oulusta kotoisin oleva perheyritys" – todennäköisin lainaus, koska se on sivun ensimmäinen leipätekstivirke. | heikko → V3, V4 |
| Artikkelit (3) | Kyllä, erinomaisesti. | Kyllä ("Lyhyesti", FAQ näkyvissä, lähteet). | Esim. "Puutalo maalataan yleensä 10–15 vuoden välein." | erinomainen – käytä mallina |
| Toiminta-alueet | Kyllä. | Kuntalista. | "Palvelemme koko Pirkanmaan alueella ja lähikunnissa noin tunnin säteellä Tampereelta." | hyvä |
| Aluesivu (24) | Osittain: H1 kertoo paikan, hook-teksti ei vastaa kysymykseen vaan kuvailee säätä. | Palvelut, kaupunginosat, kohteet, FAQ (ei HTML:ssä). | Hook-tekstin ensimmäinen virke, esim. "Tampereen sijainti kahden suuren järven välissä ja harjumaisemien tuomat korkeuserot koettelevat talojen ulkopintoja." Ei faktaa yrityksestä. | heikko → S17–S18 |
| Pinnoituksen kaupunkisivu (24) | Hook vastaa hyvin ("Pirkkalassa on 3 223 omakoti- ja paritaloa…"), hero ei. | Talokanta kyllä; hinta korteissa; prosessi ja FAQ eivät HTML:ssä; yrittäjäteksti väärä kunta. | Hook-tekstin faktavirke – hyvä. Riski: "Hoidan tiilikattojen pinnoitukset Tampereella". | kohtalainen → V1, V12, S4 |
| Maalauksen kaupunkisivu (24) | Hook vastaa hyvin; prosessi on HTML:ssä (7 vaihetta, selkeät virkkeet). | Talokanta kyllä; hinta korteissa; FAQ ei HTML:ssä. | "Pesemme seinät homepesuaineella ja harjoilla. … Maalaamme seinät pensselillä." – juuri oikein. | hyvä → paras kaupunkipohja; kopioi rakenne pinnoitukseen |
| Katon puhdistus (10 sivua) | – | – | "Käytämme mekaanista puhdistusta ilman painepesua" – ristiriidassa pinnoituksen "painepesu" kanssa, jos malli yhdistää. | palvelu poistuu; ohjaa pois |

### 7.3 Suositukset GEO:lle

1. **"Lyhyesti"-laatikko jokaisen palvelu- ja kaupunkisivun alkuun** (P8–P9), samalla kaavalla kuin artikkeleissa: 4–6 lyhyttä virkettä, joissa on luku ja yksikkö: mitä tehdään, kauanko kestää, mitä maksaa (haarukka), takuu, alue, ilmainen käynti.
2. **FAQ ja työvaiheet näkyviin HTML:ään** (korjaus 5). Pidä kysymykset sellaisina kuin ihmiset kysyvät ("Paljonko tiilikaton pinnoitus maksaa Nokialla?") ja vastaus ensimmäisessä virkkeessä.
3. **Yksi totuus per fakta** (korjaus 3, 8, 9): lisäikä, hinnat, kesto, takuu, urakkamäärät, kotipaikka, palvelut.
4. **llms.txt täydennys** (P10): työvaiheet, mitä ei tehdä, kunnat palvelusivuineen. Pidä se sääntöjen mukaisena – se on helpoin paikka, josta malli hakee hinnan.
5. **Päivämäärät näkyviin** (P5) ja `dateModified` palvelusivuille (WebPage-schema) – tuoreus painaa tekoälyhauissa.
6. **Entiteetti selväksi**: sama nimi "Pintanen Oy" kaikkialla, sama osoitemuoto, Google-profiilin pysyvä linkki `sameAs`-kenttään, ja Meistä-sivulle lyhyt faktalaatikko (perustettu vuonna X, kotipaikka, yrittäjät, Y-tunnus, toimialue) – vain tiedot, jotka Eerik vahvistaa.
7. **Kysymysmuotoiset H2:t** siellä, missä sisältö vastaa kysymykseen (S23–S24), mutta ei väkisin.

## 8. Ulkoasu

Kuvakaappaukset otettiin paikallisesta tuotantobuildista Chromiumilla, tietokoneen leveydellä 1366 × 850 px ja puhelimen leveydellä 390 × 844 px (iPhone-kokoluokka), evästevalinta tehtynä ("denied", jotta banneri ei peitä sisältöä). Kuvat ovat kansiossa `docs/auditointi-kuvat/`; luettelo luvussa 12. Kaikista 21 sivupohjasta on kuva molemmilla leveyksillä; kahdeksasta on lisäksi koko sivun kuva. Tavoite: etusivun ensimmäisen osion kaltainen moderni ilme koko sivustolle.

### 8.1 Mikä etusivun herossa toimii (kuva 01-etusivu-tietokone.jpg, 01-etusivu-puhelin.jpg)

- Valkoinen kortti vaalealla pohjalla, vasemmalle tasattu iso H1, sininen korostussana, yläpuolella pieni sininen "PIRKANMAAN PAIKALLINEN PERHEYRITYS" -rivi.
- Yksi selvä pääpainike (keltainen "Laske hinta →") ja toissijainen ääriviivapainike.
- Luottamusrivi (5,0/5 · 200+ · 5+ v · 0 €) kortin sisällä, ei erillisinä laatikoina.
- Oikealla vino valokuva oikeasta työstä ja punainen "Yrittäjät itse paikalla" -laatikko.
- Teksti näkyy heti, myös ennen JavaScriptiä (kuva 32-etusivu-tietokone-ennen-javascriptia.jpg).

### 8.2 Alasivujen hero on toista sukupolvea (kuvat 02–07, 10, 11, 14–20)

[Tarkistettu] Kaikki muut sivupohjat (palvelusivut, hintasivut, referenssit, meistä, toiminta-alueet, aluesivut, kaupunkisivut) käyttävät `ServicePageHero`a: koko leveyden tumma valokuva, sen päällä puoliläpinäkyvä tumma laatikko, keskitetty valkoinen H1 ja pitkä ingressi, kaksi painiketta keskellä, alla neljä erillistä luottamuskorttia. Erot etusivuun:

| | Etusivu | Alasivut |
|---|---|---|
| Pohja | vaalea, valkoinen kortti | tumma kuva + tumma laatikko |
| H1 | vasemmalle, 2 riviä | keskitetty, 2–3 riviä; puhelimella ingressi 8–10 riviä (kuva 17-…-puhelin.jpg) |
| Pääpainike | keltainen, erottuu | sininen, sama väri kuin headerin "Pyydä tarjous" |
| Luottamus | yksi rivi kortissa | 4 korttia, 2 näytöllistä alempana puhelimella |
| Näkyvyys ennen JS:ää | kyllä | ei – kuvat 33 ja 34 näyttävät pelkän taustakuvan |
| Kuva | oikea työ, Eerik katolla | sama tausta kaikilla 24 kaupunkisivulla; aluesivuilla ja Meistä-sivulla telakuva, joka ei liity tiilikattoon |

Suositus (korjaus 1): yksi `PageHero`-komponentti etusivun pohjalta, propseilla eyebrow (esim. "TIILIKATON PINNOITUS · TAMPERE"), H1, 2–3 virkkeen ingressi ("Lyhyesti"-sisältö), pääpainike keltaisena, toissijainen ääriviivana, luottamusrivi kortin sisällä, kuva oikealla (kaupunkisivulla paikkakunnan oma kohdekuva, jos sellainen on `projects.ts`:ssä; muuten palvelun vakiokuva). Ei animaatiota ensimmäisessä näytöllisessä.

### 8.3 Sivukohtaiset huomiot

| Sivupohja | Kuvat | Havainnot | Ehdotus |
|---|---|---|---|
| Etusivu | 01-*, 40-etusivu-puhelin-palvelut.jpg | Hero hyvä. Sen jälkeen rytmi vaihtelee: arvostelukortit, "Meidän palvelut" (kolme kuvakorttia, joissa teksti kuvan päällä), hintalaskuri-osio, "Miksi kannattaa tilata" pitkänä tekstinä + yrittäjäkuva, kohteet, lisää arvosteluja (karuselli), FAQ, kotitalousvähennys, yhteydenotto, SEO-teksti, Toiminta-alueet, footer. Koko sivu 12 000 px tietokoneella ja 19 600 px puhelimella. Kaksi erillistä arvosteluosiota. | Yhdistä arvostelut yhteen osioon. Lyhennä "Miksi kannattaa tilata" -tekstiä puoleen. SEO-tekstiosio sivun lopussa on vanhan sivuston perintö – siirrä sen asia palvelukortteihin ja poista osio tai tiivistä kolmeen kappaleeseen. |
| Palvelusivut (pinnoitus, maalaus) | 02-*, 03-*, 02-…-koko-sivu.jpg | Hero vanhaa tyyliä. Osiot: 4 luottamuskorttia, arvostelukaruselli, "Miksi… elintärkeää", prosessi (haitari), vertailu kattoremonttiin, hintakortit, kotitalousvähennys, rahoitus, yrittäjäterveiset, FAQ, artikkelit, yhteydenotto, Toiminta-alueet. Visuaalisesti siisti, mutta 11 000 px ja kaikki osiot keskitettyjä. | Uusi hero; prosessi avoimena listana haitarin sijaan (näkyy myös boteille); yksi arvostelupaikka; hintakortit säilytetään. |
| Katon puhdistus | 04-* | Sama pohja; otsikko "Tiilikaton puhdistus Pirkanmaa" ja ingressi "Ammattimainen mekaaninen puhdistus…". | Palvelu poistuu – ei muutoksia. |
| Hintasivut | 05-*, 06-*, 07-*, 39-hinta-pinnoitus-puhelin-hintakortit.jpg | Hero vanhaa tyyliä, mutta teksti on sivuston parasta (hinta heti). Hintakortit ovat selkeät myös puhelimella; keskikortti korostettu. "Mitä hintaan kuuluu" -lista ja viisi hintatekijää ovat hyviä. Kotitalousvähennyksen esimerkkilaskelma (V11). | Uusi hero; muuten pidä rakenne. |
| Hintalaskuri | 08-* | Tumma sumea tausta ja valkoinen kortti "Mitä haluat laskea?" kahdella kuvavalinnalla. Toimiva, mutta tyhjä: ei selitystä. Puhelimella chat-nappi peittää oikean valintakortin alakulman. | P3; siirrä chat-nappi hieman ylemmäs tai piilota se laskurisivulla. |
| Tarjouspyyntö | 09-* | Kolmivaiheinen lomake, sivupalkissa yrittäjät ja "Mitä seuraavaksi tapahtuu" – selkeä ja luottamusta herättävä. Puhelimella alapalkki peittää "Jatka"-painikkeen juuri sivun alalaidassa (kuva 09-…-puhelin.jpg). | Lisää lomakkeen alle tyhjää (padding-bottom) alapalkin verran tai piilota alapalkki tarjouspyyntösivulla, jossa se on turha. |
| Referenssit | 10-* | Hero vanhaa tyyliä, kuvagalleria korteissa, suodatinnapit. Hyvä. Hero-kuvan tiedostonimi sisältää "tehopesu" (V19). | Uusi hero; galleria säilyy. |
| Meistä | 11-*, 11-…-koko-sivu.jpg, 34-…-ennen-javascriptia.jpg | Hero vanhaa tyyliä telakuvalla. Pitkä tekstisivu, jossa luvut laatikoissa (200+, yli 5, 2–5, 100 %), arvot kolmena korttina, "Miksi valita" -lista, FAQ, yhteydenotto, Toiminta-alueet. 64 % sanoista piilossa ennen JS:ää – pahin kaikista sivuista. | Uusi hero yrittäjien kuvalla (sama kuva kuin tarjouspyynnössä), tekstit puoleen (S27–S29), yksi lukusarja (V23). |
| Artikkelit, artikkeli | 12-*, 13-*, 13-…-koko-sivu.jpg | Puhtain ja modernein pohja koko sivustolla: vaalea, kapea palsta, murupolku, kirjoittaja, "Lyhyesti"-laatikko, kuvat kuvateksteillä, FAQ auki, lähteet, kirjoittajalaatikko, "Lue myös". Ei animaatiota. | Käytä tätä mallina muillekin: luettavuus ja tiedon järjestys ovat kohdallaan. |
| Toiminta-alueet | 14-* | Hero vanhaa tyyliä, kuntalista nappeina, teksti. Ok. | Uusi hero; lisää kartta tältä sivulta (sama SVG kuin Toiminta-alueet-palkissa) näkyvämmin. |
| Aluesivu | 15-*, 16-*, 15-…-koko-sivu.jpg | Hero vanhaa tyyliä telakuvalla (ei liity kattoon). Osiot: hook-teksti, 3 palvelukorttia, kaupunginosat, kohteet, arvostelut, yrittäjät, yhteydenotto, FAQ, Toiminta-alueet. 8 600 px. Paras rakenne kaupunkisivuista, mutta hook-teksti heikko (S17–S18). | Uusi hero kaupungin omalla kohdekuvalla; palvelukortit heti heron alle (sivun tehtävä on ohjata palvelusivuille). |
| Pinnoituksen kaupunkisivu | 17-*, 18-*, 17-…-koko-sivu.jpg (tietokone ja puhelin), 35–38-*.jpg | Pisin sivupohja: 13 700 px tietokoneella, 21 200 px puhelimella. Järjestys: hero → 4 luottamuskorttia → hook → kohteet → arvostelukaruselli → "Onko kattosi vaarassa" (ennen/jälkeen-liukusäädin + 4 hälytysmerkkiä) → talokanta (palkkikaavio, hyvä) → prosessi (haitari) → vertailu → hintakortit → kotitalousvähennys → rahoitus → yrittäjä → FAQ → yhteydenotto → naapurikunnat → Toiminta-alueet → footer. Paikallinen sisältö (hook, kohteet, talokanta) on hyvää, mutta sen välissä on yleisiä osioita, jotka toistuvat 24 kertaa. | Järjestys: hero (paikallinen kuva) → "Lyhyesti" → hook → talokanta → kohteet → prosessi avoimena → hinta → FAQ (paikalliset kysymykset ensin) → yhteydenotto → naapurikunnat. Pois: erillinen "Onko kattosi vaarassa" (sisältö prosessiin tai hookiin), rahoitus (yksi lause hintaosioon), Toiminta-alueet-palkki, karusellin kopiot. Tavoite alle 8 000 px tietokoneella. |
| Maalauksen kaupunkisivu | 19-*, 20-*, 19-…-koko-sivu.jpg | 12 600 px. Sama rakenne, mutta "Mistä tiedät, että talosi pitää maalata" (5 merkkiä numeroituna) ja 7-vaiheinen prosessi ovat avoimina ja hyvin luettavia. | Sama tiivistys kuin pinnoituksella; tämä on parempi lähtökohta. |
| 404 | 21-* | Selkeä: "Virhe 404 / Sivua ei löytynyt", keltainen "Etusivulle" ja "Hintalaskuriin". Etusivun tyylinen. | Ei muutoksia. |

### 8.4 Puhelin: kelluvat elementit (kuvat 30, 31, 08-…-puhelin, 09-…-puhelin)

[Tarkistettu] Ensikäynnillä puhelimella ruudun alaosassa on samanaikaisesti: evästebanneri (n. 180 px), kiinteä alapalkki "Soita meille / Pyydä tarjous" (n. 80 px) ja chat-avatar (60 px, osittain bannerin päällä). Yhdessä ne peittävät noin 40 % 844 px:n näytöstä ja heron painikkeet jäävät niiden alle (kuva 30). Evästevalinnan jälkeen alapalkki + avatar peittävät n. 15 % jokaisella sivulla, ja avatar menee lomakkeiden ja korttien päälle (hintalaskuri, tarjouspyyntö). Tietokoneella oikeassa reunassa on lisäksi pystysuora "Tilaa maksuton arviokäynti" -välilehti ja avatar oikeassa alakulmassa; ne eivät peitä sisältöä.

Suositus: (1) näytä evästebanneri pienempänä yhden rivin palkkina tai vasta ensimmäisen vierityksen jälkeen; (2) piilota chat-avatar, kun alapalkki näkyy puhelimella, tai yhdistä ne (avatar alapalkin sisään); (3) piilota alapalkki tarjouspyyntö- ja hintalaskurisivuilla; (4) lisää `padding-bottom` sivun loppuun alapalkin verran, ettei footerin viimeinen rivi jää piiloon. Evästebannerin "Hyväksy"/"Asetukset" ilman tasavertaista "Hylkää"-painiketta on Eerikin 5.10. tekemä päätös (koodikommentti) – tiedoksi, että Traficomin ohje edellyttää hylkäämisen olevan yhtä helppoa kuin hyväksymisen.

### 8.5 Typografia ja värit

[Tarkistettu] Montserrat otsikoissa ja Open Sans leipätekstissä, tumma sininen header, sininen korostus, keltainen pääpainike etusivulla. Yhtenäistä. Puhelimella leipäteksti on riittävän suuri (16–18 px) ja riviväli hyvä. Kontrasti tumman heron läpinäkyvässä laatikossa on paikoin heikko (vaaleanharmaa ingressi kuvan päällä, esim. kuva 17-…-puhelin.jpg) – uusi hero poistaa ongelman. Ei vaakavieritystä millään sivulla; kosketuskohteet ovat riittävän suuria (oma mittaus: alle 32 px korkeita linkkejä 7 kpl näkymässä, kaikki tekstilinkkejä headerin yläpalkissa).

## 9. Sivupohjat yksitellen

Lyhyt kooste jokaisesta sivupohjasta: tehtävä, nykytila ja viittaukset edellisten lukujen kohtiin.

| Sivupohja (URL) | Title / H1 | Sanat | Tila ja tärkeimmät kohdat |
|---|---|---|---|
| Etusivu `/` | "Tiilikaton pinnoitus ja talon maalaus Pirkanmaa \| Pintanen" / "…Pirkanmaalla" | 3 695 | Hero hyvä. V5 (15-20 v), V13 (karuselli), V23 (luvut), P16 (alue). Toinen arvosteluosio ja SEO-teksti sivun lopussa ovat turhaa pituutta. Search Console: 110 klikkiä / 6 899 näyttöä, sija 7,1. |
| Tiilikaton pinnoitus Pirkanmaa | "Tiilikaton pinnoitus Pirkanmaa & Tampere \| 5v takuu \| Pintanen" / "Tiilikaton pinnoitus Pirkanmaa" | 2 425 | Hero ei vastaa kysymykseen (S3). Prosessi ja FAQ eivät HTML:ssä (V12). "Säästä jopa 80 %" metassa (V10). Title "& Tampere" kilpailee Tampereen sivun kanssa (2.8). SC: 730 näyttöä, sija 45,1 – heikko sijoitus pääpalvelusivulle; P8 ja korjaus 2 auttavat. |
| Talon maalaus Pirkanmaa | "Talon maalaus Pirkanmaa \| Hintalaskuri \| Pintanen" / "Talon maalaus Pirkanmaa" | 1 917 | Hero S19; FAQ-haarukka V9; "Pohjustus" V21; SEO-otsikot S23. Title-loppu "Hintalaskuri" vaihdettava hakutermiin ("ulkomaalaus ja julkisivumaalaus"). SC: 599 näyttöä, sija 29,6. |
| Katon puhdistus Pirkanmaa | "Katon puhdistus Pirkanmaa – Ilmainen arvio \| Pintanen" | 766 | Palvelu poistuu. Kuvaus 103 merkkiä. FAQ rikkoo sääntöjä (S35). P15: 301-suunnitelma. |
| Tiilikaton pinnoituksen hinta | "Tiilikaton pinnoitus hinta 2027 – hintaesimerkit ja laskuri \| Pintanen" (70) / "Tiilikaton pinnoituksen hinta" | 818 | Sivuston paras hintateksti. V7 ("alkaen 2 050 €"), V11 (laskelma), V19 (hero-kuvan nimi), S15 (sanasto). Title 70 merkkiä. SC: 386 näyttöä, sija 18,6 haulle "tiilikaton pinnoitus hinta" (177 näyttöä). |
| Talon maalauksen hinta | "Talon maalaus hinta 2027 – hintaesimerkit ja laskuri \| Pintanen" / "Talon maalauksen hinta" | 788 | Hyvä. V7 ("alkaen 2 380 €"), V11. Teksti "Talon maalaus vai kokonaan uusi ulkoverhousremontti?" sanoo oikein, että laudoitusta ei vaihdeta, jos puu on kovaa. SC: 643 näyttöä, sija 29,4. |
| Katon puhdistuksen hinta | "Katon puhdistus hinta – Sammaleen poisto ja suojakäsittely \| Pintanen" (69) | 616 | Palvelu poistuu. Sisältää "Hinnat sisältävät ALV 25,5 %" – ainoa paikka, jossa ALV mainitaan; lisää sama maininta pinnoituksen ja maalauksen hintasivuille ("Hinnat sisältävät ALV:n"). |
| Hintalaskuri | "Hintalaskuri – laske pinnoituksen tai maalauksen hinta \| Pintanen" (65) / "Hintalaskuri" | 243 | Ohut (P3). Kuvaus 161 merkkiä. Laskurin vaiheita ei testattu loppuun (ei lähetyksiä). |
| Tarjouspyyntö | "Pyydä tarjous – ilmainen kuntotarkastus \| Pintanen" / "Pyydä tarjous" | 243 | Hyvä. Ei FAQ:ta (P4). Alapalkki peittää "Jatka" puhelimella (8.3). Lomaketta ei lähetetty. |
| Referenssit | "Referenssit – Katon pinnoitus ja talon maalaus \| Pintanen" / "Referenssit" | 536 | Hyvä galleria; kuvateksteissä paikkakunnat ja vuodet. S30, V19. |
| Meistä | "Pintanen Oy – Perheyritys katto- ja maalaustöissä \| Pintanen" / "Tutustu Pintaseen" | 876 | V3, V4, V23, S27–S29; 64 % tekstistä piilossa ennen JS:ää. SC: 69 näyttöä, sija 3,1 (brändihaut). |
| Artikkelit (lista) | "Artikkelit ja oppaat \| Pintanen" | 257 | Hyvä. 3 julkaistua; 5 ajastettua: Pinnoitus vai uusi katto (13.10.), Tiilikaton pinnoituksen työvaiheet (20.10. – V20 korjattava ennen julkaisua), Huoltomaalaus vai uusi ulkoverhous (27.10.), Voiko tiilikaton pinnoittaa itse (3.11.), Tiilikaton puhdistus itse vai ammattilainen (10.11. – harkitse, kun palvelu poistuu). |
| Artikkeli | esim. "Milloin tiilikatto pitää pinnoittaa? 5 merkkiä \| Pintanen" | 715–799 | Erinomainen pohja (7.2). Kotitalousvähennys-artikkeli: "alkaen 2 050 euroa" (S12). |
| Toiminta-alueet | "Toiminta-alueet Pirkanmaa ja lähikunnat \| Pintanen" / "Toiminta-alueemme" | 343 | Ok. S31. SC: 79 näyttöä, sija 55,5. |
| Aluesivu `/maalauspalvelut-<kunta>/` (24) | "Tiilikaton pinnoitus ja talon maalaus {city} \| Pintanen" | 955–1 359 | Toiseksi suurin liikenteen lähde (SC 4 410 näyttöä, 37 klikkiä). Title kilpailee palvelusivujen kanssa (2.8). Hook-tekstit mainosmaisia (S17–S18). CityServices "15–20 vuotta" (V5). Kuvaukset 159–170 merkkiä. Hero-kuva telakuva. |
| Pinnoituksen kaupunkisivu (24) | "Tiilikaton pinnoitus {city} \| Hinta 2 850–7 000 € \| Pintanen" | 2 561–2 661 | Paikallinen sisältö hyvää (hook, talokanta, kohteet 7 kunnalta). V1, V2, V6, V8, V12, V13, S4–S6, S25–S26. Päällekkäisyys muiden kaupunkien kanssa 86–88 %. Pisin sivupohja. |
| Maalauksen kaupunkisivu (24) | "Talon maalaus {city} \| Hintalaskuri \| Pintanen" | 1 955–2 031 | Paras kaupunkipohja: prosessi ja "5 merkkiä" HTML:ssä, hook-tekstit sääntöjen mukaisia. V2, V9 (FAQ 5 000–6 500), V15 (lomake), S19–S21. Title-loppu "Hintalaskuri" (6.1). Vanhan version SC-sija 55 – uutta tekstiä seurattava. |
| Puhdistuksen kaupunkisivu (8) | "Katon puhdistus {city} – …" | 530–573 | Palvelu poistuu; ohuin sisältö (530 sanaa); FAQ väittää "Teemme {kunnan} alueella säännöllisesti kattojen puhdistuksia". P15. |
| 404 | "Sivua ei löytynyt \| Pintanen" | – | Hyvä. HTTP-status tarkistettava livenä (6.7). |
| Tietosuojaseloste | "Tietosuojaseloste \| Pintanen" | 644 | Päivitetty 5.10.2026, kattaa lomakkeet, chatin ja laskurin, GA:n suostumuksella. Hyvä. |

## 10. Kaupunkisivujen paikkakuntatekstit (24 paikkakuntaa)

Tarkistettu kolme tekstilähdettä: `newCityPages.ts` (uusien pinnoitus- ja maalaussivujen hook-tekstit, 16 + 14 kpl), `areaCityContent.ts` (aluesivujen hook-tekstit, 24 kpl) ja `cityData.ts` (vanhojen 8 kaupungin metat; `alueIntro`-kentät eivät renderöidy). Sanastohaku kiellettyjen sanojen varalta (tehopesu, pohjuste, primer, "alk.", €/m², minimihinta, lautojen vaihto, pihan/seinien suojaus kattotyössä, kohdemäärät) tehtiin koko `src/`-hakemistoon.

### 10.1 Yhteenveto

- **Uudet pinnoitus- ja maalaussivujen hook-tekstit (30 kpl): sääntöjen mukaisia.** [Tarkistettu] Lyhyet virkkeet, me-muoto, ei hintoja, ei kohdemääriä, maalauksen työvaiheet oikein ("pesee seinät homepesuaineella, kaapii irtoavan maalin, pohjamaalaa paljaat puukohdat ja maalaa pintamaalin pensselillä"), talomäärät Tilastokeskuksesta ja paikkafaktat Wikipediasta lähteistettynä (`docs/kaupunkisivut-lahteet.md`). Ainoa toistuva huomio: lause "Teemme tiilikaton pinnoituksia {kylissä}" / "Eemil maalaa taloja {kylissä}" voidaan lukea väitteeksi jo tehdyistä töistä juuri niissä kylissä. Se ei ole kohdemäärä eikä referenssi, mutta turvallisempi muoto on "Tulemme myös {kyliin}" tai "Palvelemme koko kuntaa, myös {kylät}". Kuvia kohteista on vain Tampereelta, Ylöjärveltä, Kangasalta, Parkanosta, Orivedeltä, Nokialta ja Hämeenkyröstä (`projects.ts`), ja vain niillä sivuilla sanotaan "Kuvia kohteistamme näet tältä sivulta" – oikein.
- **Aluesivujen hook-tekstit (24 kpl): kielellisesti vastoin sääntöjä.** [Tarkistettu] Ei faktavirheitä eikä kiellettyjä sanoja ("ruiskupinnoitus" Valkeakoskella on rajatapaus), mutta tyyli on raskasta mainoskieltä: pitkät virkkeet, vieraat sanat (hydrofobinen, mikroklima, urbaani, biomassa), abstraktit otsikot ("elinkaaren maksimointi", "säärasitusten nujertaminen", "lämpötilavaihteluiden hallinta") ja ylisanat ("elintärkeä", "armoton", "täydellinen kunto"). Ehdotus S18: kirjoita uudelleen samalla kaavalla kuin uudet hook-tekstit.
- **Yhteiset komponentit rikkovat paikkakuntalupauksen:** V1 ("Tampereella", "tamperelaiset katot" kaikilla 24 pinnoitussivulla) ja V2 (alt-teksti väittää kuvan olevan paikkakunnalta).

### 10.2 Paikkakunnittain

Merkinnät: P = pinnoitussivu, M = maalaussivu, A = aluesivu. "uusi" = 5.10.2026 julkaistu teksti (`newCityPages.ts`); "vanha" = aiempi sivu (`cityData.ts` + yhteiset komponentit).

| Kunta | P | M | A: hook-otsikko (ongelma) | Huomiot |
|---|---|---|---|---|
| Tampere | vanha | vanha (uusi teksti 5.10.) | "Näsijärven ja Pyhäjärven kosteuden vaikutus Tampereen kiinteistöihin" (raskas) | P-hook "Tiilikaton suojaaminen Näsijärven ja Pyhäjärven kosteudelta" on ok mutta pitkä. M-hook "Tampereen harjutuulten ja kahden järven kosteusrasituksen hallinta" nimeää Pispalan, Pyynikin, Tahmelan, Ranta-Tampellan, Atalan – kaupunginosat oikein, mutta "voimakas harjutuuli" on väite ilman lähdettä [Oletus]. Vanhan `alueIntro`n "aieutuneet" ja "Pirkanmaalainen" eivät renderöidy. 8 kohdekuvaa – paras kuvitus. |
| Nokia | vanha | vanha | "Nokianvirran alueen pientalojen elinkaaren maksimointi" (abstrakti) | Puhdistus-meta "Nokiassa" → "Nokialla" (V18). 2 kohdekuvaa. SC: "tiilikaton pinnoitus nokia" 122 näyttöä, sija 8,2 – Nokian sivu on potentiaalinen nopea voitto, kun V1 ja hero on korjattu. |
| Ylöjärvi | vanha | vanha | "Ylöjärven metsäisten asuinalueiden kattojen ja julkisivujen suojaus" | 6 kohdekuvaa. Kaupunginosat Siivikkala, Metsäkylä, Vuorentausta ok. |
| Kangasala | **uusi P** | vanha | "Kangasalan harjujen ja vesistöjen asettamat vaatimukset kodillesi" | P-hook hyvä ("neljännes kaupungin pinta-alasta on vettä", Vatiala, Ruutana, Sahalahti, Kuhmalahti). 4 kohdekuvaa. Maalaussivulla ei hook-tekstiä (vanha pohja) – lisää samalla kaavalla. |
| Pirkkala | **uusi P** | vanha | "Pirkkalan tiheän asutuksen ja Pyhäjärven säärasituksen hallinta" ("urbaani", "arvostetut asuinalueet") | P-hook hyvä (10 km, 3 223 taloa, Nuoliala, Toivio, Pere, Kurikka). "Tuttuja asuinalueita ovat…" – vihjaa kokemukseen; vaihda "Asuinalueita ovat esimerkiksi…". Ei kohdekuvia. Maalaussivulla ei hookia. |
| Lempäälä | **uusi P + M** | | "Lempäälän vesistöjen läheisyyden rasitukset omakotitaloille" ("rannikkokosteus" – Lempäälässä ei ole rannikkoa) | P- ja M-hook hyviä (Kulju, Sääksjärvi, Hakkari; 1 026 taloa 2000–2009). SC: "tiilikaton pinnoitus lempäälä" 115 näyttöä sija 10,0 ja "talon maalaus lempäälä" 94 näyttöä – uudet sivut osuvat kysyntään. Ei kohdekuvia. |
| Valkeakoski | **uusi P + M** | | "Valkeakosken vesistöjen risteyskohdan tuoma ilmankosteus" ("ruiskupinnoitus") | M-hook erinomainen (1 579 taloa 1940–59, "joka kolmas", Sääksmäki, Kärjenniemi). Väite "Osuus on suurempi kuin missään muussa toiminta-alueemme kunnassa" esiintyy kolmella sivulla eri mittarilla (Valkeakoski 1940–59, Parkano 1970–80, Urjala ennen 1960) – jokainen on oma vertailunsa, mutta tarkista luvut `cityHousingStats.ts`:stä ennen kuin lause jää. Ei kohdekuvia. |
| Akaa | **uusi P + M** | | "Akaan vaihtelevien sääolosuhteiden torjunta julkisivuilta ja katoilta" | Hookit hyviä (Toijala, Viiala, Kylmäkoski; 2007/2011; 41 km; 2 179 taloa ennen 1960). Ei kohdekuvia. |
| Orivesi | **uusi P + M** | | "Oriveden korkeuserojen ja järviluonnon haasteet pientaloille" | Hookit hyviä (yli 350 järveä, Längelmävesi, 40 km, Eräjärvi, Hirsilä; 1 548 taloa ennen 1960). 3 kohdekuvaa → "Kuvia kohteistamme Orivedellä näet tältä sivulta" on totta. V2 koskee silti liukusäätimen kuvaa. |
| Ikaalinen | **uusi P + M** | | "Ikaalisten Kyrösjärven tuomien säärasitusten nujertaminen" ("hydrofobinen") | Hookit hyviä (niemi Kyrösjärven rannalla, runsaat 50 km, Kilvakkala, 2 812 taloa). Ei kohdekuvia. |
| Juupajoki | **uusi P + M** | | "Juupajoen metsäisten tonttien kiinteistöhuollon ratkaisut" ("biomassa") | Hookit hyviä (Pirkanmaan pienin kunta, Korkeakoski, 55 km, 797 taloa, 418 ennen 1960). Ei kohdekuvia. |
| Kihniö | **uusi P + M** | | "Pohjois-Pirkanmaan ankarat talvet ja Kihniön kotien kestävyys" | Hookit hyviä (Sulkuejärvi, valtatie 23, Nerkoo, Linnankylä, 892 taloa). "Tulemme myös Kihniöön" on hyvä muoto. Ei kohdekuvia. |
| Mänttä-Vilppula | **uusi P + M** | | "Taidekaupungin kiinteistöjen suojelu Mänttä-Vilppulan oloissa" | Hookit hyviä (2009, Keurusselkä, Kuorevesi, Kolho, Pohjaslahti, 3 096 taloa). Pisin kuntanimi → title 69 ja kuvaus 172 merkkiä (V22). Ei kohdekuvia. |
| Parkano | **uusi P + M** | | "Parkanon mäntymetsien ja talvipakkasten vaatima suoja kodille" | P-hook-otsikko "881 taloa 1970- ja 1980-luvuilta" – luku otsikossa on vahva. M-hook sanoo "Kuvia kohteestamme Parkanossa näet tältä sivulta" – 3 kohdekuvaa, totta. "65 prosenttia on metsää" – lähde `kaupunkisivut-lahteet.md` [ei tarkistettu uudelleen]. |
| Pälkäne | **uusi P + M** | | "Pälkäneen peltoaukeiden ja järvimaisemien vaatima säänkestävyys" | Hookit hyviä (Onkkaala, Luopioinen, Aitoo, 35 km, 1 281 taloa ennen 1960). Ei kohdekuvia. |
| Ruovesi | **uusi P + M** | | "Ruoveden rantatonttien ja metsien tuoma rasitus kiinteistöille" ("mikroklima"; "Tarjanteen rannoilla" – tarkista, P-hook sanoo "Näsijärven Ruoveden rannalla") | Hookit hyviä (73 km, Visuvesi, Jäminkipohja, 1 005 taloa ennen 1960). Kuvaus 175 merkkiä – pisin (V22). Ei kohdekuvia. |
| Urjala | **uusi P + M** | | "Urjalan maaseutuilmaston ja säänvaihteluiden vaatima tuki taloille" | Hookit hyviä (valtatie 9, 60 km, Nuutajärvi, Huhti, 1 237 taloa ennen 1960). Ei kohdekuvia. |
| Vesilahti | **uusi P + M** | | "Vesilahden kulttuurimaisemien ja sään rasitukset omakotitaloille" ("sukupolvelta toiselle") | Hookit hyviä (Pyhäjärven etelä- ja kaakkoisranta, 30 km, Narva, Koskenkylä, 358 taloa 2000–2009). Ei kohdekuvia. |
| Virrat | **uusi P + M** | | "Virtain pohjoisen sijainnin ja kovien pakkasten vaatima lujuus" | Hookit hyviä (269 järveä, Killinkoski, Vaskivesi, 2 469 taloa). Ei kohdekuvia. |
| Sastamala | vanha | vanha | "Kiinteistöjen suojaaminen Sastamalan järvimaisemien säärasituksilta" ("elintärkeä sijoitus") | Maalaus-meta "Hinta n. 2000 € – 10 000 €" (V9). Vanhan `alueIntro`n "80–90-luvun omakotitaloja" ei renderöidy. Ei hook-tekstejä P/M-sivuilla. |
| Hämeenkyrö | vanha | vanha | "Hämeenkyrön kansallismaisemien vaatima säänkestävyys koteihin" | 1 kohdekuva (Kyröskoski). SC: "tiilikattoremontti hämeenkyrö" 97 näyttöä sija 11,9 – P1:n vertailuosio sopii tänne ensimmäisenä. |
| Forssa | vanha | vanha | "Forssan ja Lounais-Hämeen lämpötilavaihteluiden hallinta" | Kanta-Häme. SC: `/talon-maalaus-forssa/` 256 näyttöä sija 70,3 – ei näy. Ei hookeja P/M. |
| Hämeenlinna | vanha | vanha | "Hämeenlinnan pientalojen suojaaminen Vanajaveden kosteudelta" | Kanta-Häme. Puhdistussivu toi 8 klikkiä (eniten kaupunkisivuista). Ei hookeja P/M. |
| Huittinen | vanha | vanha | "Satakunnan avarien peltomaisemien tuulikuorma Huittisissa" | Satakunta. Pinnoitus-meta "Yrittäjät tekee työn" (V18). Puhdistussivu 6 klikkiä. Ei hookeja P/M. |

### 10.3 Ehdotus vanhoille kahdeksalle kunnalle

Tampere, Nokia, Ylöjärvi, Sastamala, Hämeenkyrö, Forssa, Hämeenlinna ja Huittinen käyttävät pinnoitus- ja maalaussivuilla vanhaa pohjaa ilman paikallista hook-tekstiä (Tampereella ja osassa on `cityHousingText`-talokanta, joka on hyvä). Kirjoita näille 16 sivulle hook-tekstit samalla kaavalla ja samasta lähdetiedostosta kuin uusille – työmäärä noin 2 tuntia tekstiä + 30 min koodia. Kangasalan ja Pirkkalan maalaussivut samoin (2 sivua).

## 11. Mitä ei pystytty tarkistamaan

| Asia | Miksi ei | Miten tarkistat itse |
|---|---|---|
| Live-sivusto pintanen.fi (HTTP-statukset, 301/308-ohjaukset, kauttaviivattomien osoitteiden käytös, 404-status, `_headers` tuotannossa, välimuistit, TTFB) | Ympäristön välityspalvelin esti yhteyden pintanen.fi:hin. Kaikki tekniset havainnot ovat repon buildista. | `curl -I https://pintanen.fi/hintalaskuri` (odotus: 301/308 → `/hintalaskuri/`), `curl -I https://pintanen.fi/ei-ole/` (odotus: 404), `curl -I https://pintanen.fi/alue/tampere/` (301). Search Console → URL-tarkastus. |
| Core Web Vitals -kenttädata, PageSpeed Insights, Lighthouse tuotannosta | Ei pääsyä. Paikalliset latausajat (0,7–1,3 s) eivät vastaa tuotantoa. | PageSpeed Insights etusivulle, `/tiilikaton-pinnoitus-tampere/` ja `/talon-maalaus-pirkanmaa/` puhelimella. Katso erityisesti LCP ja "Render-blocking"/"Unused JavaScript". |
| Search Console 5.10.2026 jälkeen; kysely×sivu-yhdistelmät; indeksoinnin tila (30 uutta sivua) | Vienti kattaa 30.6.–29.9. eikä sisällä kysely×sivu-tietoa. | Search Console → Tulokset → suodatin Sivu = `/tiilikaton-pinnoitus-tampere/` → välilehti Kyselyt. Sivut-raportti: "Indeksoitu" vs "Löydetty – ei indeksoitu" uusille URL:eille. |
| Google-yritysprofiili (arvostelujen määrä, 5,0-keskiarvo, kategoriat, palvelualue, kuvat) | Ei pääsyä. | Profiilin hallinta. Varmista, että kategoria on "Kattourakoitsija" + "Maalausliike", palvelualue kattaa 24 kuntaa ja verkkosivulinkki on `https://pintanen.fi/`. |
| Ulkoiset linkit (backlinkit), kilpailijoiden sijoitukset | Ei työkaluja käytössä. | Search Console → Linkit. |
| Lomakkeet, chat ja hintalaskurin loppuun asti (lähetys, sähköposti, CRM-liidi) | Sääntö: ei lähetyksiä. Katsottiin vain ensimmäinen vaihe. | Testaa itse testinimellä ja merkitse liidi CRM:ssä testiksi. |
| Google Analytics -data (konversiot, laskurin käyttö) | Ei pääsyä. | GA4 → Tapahtumat (`analytics.ts` lähettää tapahtumia). |
| Kotitalousvähennyksen lopullinen tila 2026–2027 | Verkkolähteet (Veronmaksajat, Verkkouutiset, Taloustaito, Yle) kertovat hallituksen kehysriihipäätöksestä 22.4.2026 (40 %, 2 100 €, omavastuu 150 €, vuodet 2026–2027) ja että asia menee eduskuntaan. Lain voimassaoloa lokakuussa 2026 ei voitu varmistaa. | vero.fi → Kotitalousvähennys. Jos laki on vahvistettu, poista artikkelin varaus; jos ei, lisää sama varaus `KotitalousVahennys`-lohkoon. |
| Yrityksen tosiasiat: urakkamäärät (200+/100/60), kokemusvuodet, kotipaikka (Oulu/Tampere), tehdäänkö sisämaalausta, taloyhtiöitä, peltikattoja, rahoitus, "2 vuoden takuu" vs "2–5 vuotta" | Ei lähdettä repon ulkopuolella. | Eerik vahvistaa; raportti ehdottaa vain yhtenäistämistä, ei lukuja. |
| Tilastokeskuksen talokantaluvut ja paikkafaktat | Lähteet on dokumentoitu `docs/kaupunkisivut-lahteet.md`:ssä; niitä ei haettu uudelleen. | Pistokoe 2–3 kuntaa `scripts/paivita_rakennuskanta.py`:llä. |
| Googlebotin renderöinti (näkeekö Google `opacity:0`-tekstin) | Google renderöi JS:n, joten teksti indeksoituu; vaikutus on käyttäjäkokemuksessa ja LCP:ssä, ei indeksoinnissa. Tätä ei testattu. | Search Console → URL-tarkastus → "Testaa live-URL" → kuvakaappaus. |
| Sähköpostien toimitus (Resend), CRM-integraatio | Ei kuulu auditointiin, ei testattu. | – |
| Cloudflaren asetukset (Auto Minify, Rocket Loader, Early Hints, Polish) | Ei pääsyä. | Rocket Loader kannattaa pitää pois päältä React-sivustolla. |

## 12. Menetelmät ja liitteet

### 12.1 Menetelmät

1. Repo kloonattiin (`0a1fb20`), riippuvuudet asennettiin ja ajettiin `npm run build` → `dist/` (97 sivua). Repon oma `scripts/verify_dist.py dist` → "ONGELMAT: 0". `vitest` 35/35 ok. **Buildin yhteydessä muuttunut `package-lock.json` palautettiin, repoon ei jätetty muita muutoksia kuin tämä raportti ja kuvakansio.**
2. Jokaisesta 97 sivusta jäsennettiin title, description, canonical, otsikot, linkit, kuvat ja JSON-LD (oma Python-skripti). Lisäksi `scripts/sivujen_paallekkaisyys.py` kaupunkisivujen päällekkäisyyteen.
3. 22 sivupohjan renderöity teksti luettiin kokonaan selaimesta (Playwright) ja verrattiin lähdekoodiin (`src/data/*.ts`, `src/components/**`, `src/pages/**`).
4. Search Consolen vienti (Kyselyt, Sivut, Laitteet, Maat, Taulukko) analysoitiin Pythonilla; teemat ja paikkakunnat luokiteltiin säännöllisillä lausekkeilla.
5. Kuvakaappaukset Playwright/Chromiumilla `vite preview`stä leveyksillä 1366 ja 390 px, evästevalinta asetettuna; lisäksi tila, jossa JavaScript on estetty, ja ensikäynti ilman evästevalintaa. Yhtään lomaketta ei lähetetty eikä chat-keskustelua aloitettu.
6. Kotitalousvähennyksen 2026–2027 tiedot tarkistettiin verkkohaulla (Veronmaksajat, Verkkouutiset, Taloustaito, Yle; hankeikkuna.fi).

### 12.2 Kuvaluettelo (`docs/auditointi-kuvat/`)

| Tiedosto | Sisältö |
|---|---|
| `01-etusivu-tietokone.jpg`, `01-etusivu-puhelin.jpg`, `01-etusivu-*-koko-sivu.jpg` | Etusivu, näkymä ja koko sivu molemmilla leveyksillä |
| `02-palvelu-pinnoitus-*.jpg` (+ koko sivu) | Tiilikaton pinnoitus Pirkanmaa |
| `03-palvelu-maalaus-*.jpg` | Talon maalaus Pirkanmaa |
| `04-palvelu-puhdistus-*.jpg` | Katon puhdistus Pirkanmaa |
| `05-hinta-pinnoitus-*.jpg` (+ koko sivu) | Tiilikaton pinnoituksen hinta |
| `06-hinta-maalaus-*.jpg` | Talon maalauksen hinta |
| `07-hinta-puhdistus-*.jpg` | Katon puhdistuksen hinta |
| `08-hintalaskuri-*.jpg` | Hintalaskuri |
| `09-tarjouspyynto-*.jpg` | Tarjouspyyntö |
| `10-referenssit-*.jpg` | Referenssit |
| `11-meista-*.jpg` (+ koko sivu) | Meistä |
| `12-artikkelit-*.jpg` | Artikkelilista |
| `13-artikkeli-*.jpg` (+ koko sivu) | Artikkeli "Milloin tiilikatto pitää pinnoittaa?" |
| `14-toiminta-alueet-*.jpg` | Toiminta-alueet |
| `15-aluesivu-tampere-*.jpg` (+ koko sivu), `16-aluesivu-kangasala-*.jpg` | Aluesivut |
| `17-pinnoitus-kaupunki-tampere-*.jpg` (+ koko sivu tietokone ja puhelin), `18-pinnoitus-kaupunki-orivesi-*.jpg` | Pinnoituksen kaupunkisivut (vanha ja uusi kunta) |
| `19-maalaus-kaupunki-tampere-*.jpg` (+ koko sivu), `20-maalaus-kaupunki-valkeakoski-*.jpg` | Maalauksen kaupunkisivut |
| `21-404-*.jpg` | 404-sivu |
| `30-etusivu-puhelin-ensikaynti-evastebanneri.jpg`, `31-pinnoitus-tampere-puhelin-ensikaynti-evastebanneri.jpg` | Ensikäynti puhelimella: evästebanneri + alapalkki + chat-nappi |
| `32-etusivu-tietokone-ennen-javascriptia.jpg`, `33-palvelu-pinnoitus-tietokone-ennen-javascriptia.jpg`, `34-meista-tietokone-ennen-javascriptia.jpg` | Mitä näkyy, kun JavaScript ei ole vielä latautunut (etusivu näkyy, alasivut eivät) |
| `35-pinnoitus-tampere-arvostelut-tietokone.jpg` | Arvostelukaruselli |
| `36-pinnoitus-tampere-prosessi-tietokone.jpg` | Prosessihaitari (sisältö ei HTML:ssä) |
| `37-pinnoitus-tampere-talokanta-tietokone.jpg` | Talokantaosio (hyvä esimerkki paikallisesta faktasta) |
| `38-pinnoitus-tampere-toiminta-alueet-palkki-tietokone.jpg` | Toiminta-alueet-palkki (72 linkkiä) + chat-kupla |
| `39-hinta-pinnoitus-puhelin-hintakortit.jpg` | Hintakortit puhelimella |
| `40-etusivu-puhelin-palvelut.jpg` | Etusivun palvelukortti puhelimella ("15-20 vuotta") |

### 12.3 Ehdotettu toteutusjärjestys

1. **Tekstikorjaukset ilman koodimuutoksia (1 päivä):** V1, V2, V5–V11, V18, V20, V21, S1–S35 soveltuvin osin; Meistä-faktat (Eerik). Kaikki ovat muutoksia `src/data/*.ts`- ja komponenttien tekstiarvoihin.
2. **Pienet koodikorjaukset (1 päivä):** kauttaviivat linkkeihin (V14), FAQ/prosessi HTML:ään (V12), karusellin kopiot pois (V13), areaServed (V16), TeamContactSection (V15), llms.txt (P10), AggregateOffer (P6), sitemap lastmod (P5).
3. **Hero ja ensimmäinen näytöllinen (1–2 päivää):** uusi `PageHero` etusivun pohjalta ilman motion-animaatiota, "Lyhyesti"-laatikko (P8–P9), luottamusrivi, kuvat.
4. **Kaupunkisivujen tiivistys ja roolit (1–2 päivää):** osiojärjestys, Toiminta-alueet-palkin rajaus, aluesivun title/H1 ja hook-tekstit, Tampereen roolijako (korjaus 2).
5. **Seuranta:** Search Console 4 viikkoa julkaisun jälkeen: `/tiilikaton-pinnoitus-tampere/`, `/talon-maalaus-tampere/`, uudet 30 sivua, CTR hauilla "julkisivumaalaus tampere", "ulkomaalaus pirkanmaa", "tiilikaton pinnoitus hinta".
