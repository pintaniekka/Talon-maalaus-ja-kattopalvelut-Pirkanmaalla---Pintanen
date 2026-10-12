# Search Console -lähtötaso 12.10.2026

Eerik vei raportit 12.10.2026 (tiedot 9.10. asti, eli ennen vaiheen 1 julkaisua 11.10.). Tämä on vertailupiste seurannalle 20.10. ja 3.11. (korjaussuunnitelman vaihe 8). Vertailuluvut "auditointi" ovat osan 4 viikolta 3.–9.10. ja kattavuus 4.10.

Tiedostot tässä kansiossa:

- `kattavuus-2026-10-12/` – Sivut-raportti (kattavuus), koko sivusto, 14.7.–9.10.
- `tulokset-3kk-2026-07-10--2026-10-09/` – Tulokset-raportti, viimeiset 3 kuukautta
- `tulokset-2026-10-05--2026-10-09/` – Tulokset-raportti, julkaisun jälkeiset 5 päivää
- `sivustokartat-2026-10-12.png` – Sivustokartat-raportti
- `vahvistus-2026-10-12/` – kattavuussyiden osoitelistat (uudelleenohjaus 62, ei hakemistossa 12, 404 3, havaittu 7)
- `linkit-2026-10-12/` – Linkit-raportti: sisäisten linkkien kohdesivut ja ulkoisten linkkien näytteet
- `tulokset-3kk-kysely-tiilikaton-pinnoitus-tampere/` ja `tulokset-3kk-kysely-talon-maalaus-tampere/` – Tulokset, Kysely-suodatin → Sivut
- Core Web Vitals: "Ei tarpeeksi tietoja" (12.10.), ei kuvakaappausta

## Kattavuus (9.10.)

| Syy | 4.10. (osa 3) | 9.10. | Vahvistus 12.10. |
|---|---|---|---|
| Uudelleenohjauksen sisältävä sivu | 56 | 62 | Epäonnistui |
| Indeksoitu, ei tällä hetkellä hakemistossa | 17 | 12 | Epäonnistui |
| Noindex-tagin poissulkema | 0 | 1 | Ei aloitettu |
| Vaihtoehtoinen sivu, oikea ensisijainen tagi | – | 1 | Ei aloitettu |
| Ei löydy (404) | 3 | 3 | Aloitettu |
| Havaittu, toistaiseksi ei indeksoitu | – | 7 | Hyväksytty |
| Lisätty hakemistoon | 68 | 112 | |
| Ei lisätty hakemistoon | 76 | 86 | |

Huomiot:

- Indeksoitujen sivujen määrä nousi 68:sta 112:een 5.10. julkaisussa. Sitemapissa on 97 osoitetta, joten noin 15 indeksoitua on vanhoja osoitteita tai kuoria, jotka vaihe 1 ohjaa nyt 301:llä. Luku laskee, kun Google hakee ne uudelleen.
- Kahden tärkeimmän syyn vahvistus on tilassa "Epäonnistui", koska se käynnistettiin ennen korjausta. **"Vahvista korjaus" pitää painaa uudelleen** nyt, kun vaihe 1 on tuotannossa (11.10.). Ilman sitä Search Console ei merkitse ongelmaa korjatuksi.
- Sivustokartta: tila Onnistui, 97 sivua, luettu viimeksi 5.10. Ei toimenpidettä.
- Vanhat osoitteet saivat 5.–9.10. vielä 43 näyttökertaa (esim. `/kattopalvelut/puhdistus/hameenlinna/` 31 näyttöä sijalla 57).

## Tulokset

| Mittari | Kesä 3 kk (10.7.–9.10.) | Auditointi 3.–9.10. | 5.–9.10. (5 pv) |
|---|---|---|---|
| Klikkaukset / pv | 2,3 | 2,3 | 2,6 |
| Näyttökerrat / pv | 135 | 108 | 163 |
| Keskisijainti (näytöillä painotettu) | 14,2 | 21,1 | 18,7 |
| Brändiklikkauksia | 66 / 207 | – | 4 / 13 |
| Etusivun sijainti | 7,6 | 15,6 | 19,8 |
| "tiilikaton pinnoitus tampere" | 15,8 (453 näyttöä) | 15,0 | 21,8 (29 näyttöä) |
| "talon maalaus tampere" | 42,7 (386) | – | 26,4 (27) |
| "maalausliike tampere" | 5,0 (486, 2 klikkausta) | 2,7 | 4,0 (19) |
| "tiilikaton maalaus tampere" | 5,8 (419) | – | 8,4 (23) |
| "katon maalaus tampere" | 22,0 (124) | 55 | 51,4 (22) |
| `/tiilikaton-pinnoitus-tampere/` | 42,6 (51 näyttöä) | 45,5 | 60,5 (34) |
| `/talon-maalaus-tampere/` | 46,8 (655) | – | 35,3 (54) |
| `/maalauspalvelut-tampere/` | 16,7 (1 050) | – | 26,4 (88) |
| "tiilikattoremontti <kunta>" -kyselyt | 32 kyselyä, 1 143 näyttöä | 23 / 61 | 25 / 73 |

Huomiot:

- Viiden päivän otos on pieni; yksittäisen kyselyn sijainti alle 30 näyttökerralla on kohinaa. Suunta on sama kuin osassa 4: näyttökerrat nousivat julkaisussa, keskisijainti heikkeni, ja ei-brändiklikkauksia on edelleen alle 10 viikossa (5.–9.10.: 13 klikkausta, joista 4 brändihakua ja 3 Filippiineistä, todennäköisesti omia).
- Kattoremontti-haut ovat kolmen kuukauden datassa suurempi aihe kuin viikkodata näytti: 32 kyselyä ja 1 143 näyttökertaa ilman yhtään klikkausta. Vaiheen 4A perustelu vahvistuu.
- Vielä puuttuu Tulokset-raportin suodatus Kysely = "tiilikaton pinnoitus tampere" → Sivut (ja sama "talon maalaus tampere"). Se kertoo, näkyykö haulla etusivu vai Tampere-sivu, ja ohjaa vaiheen 3 linkitystä. Voi viedä 20.10. viennin yhteydessä.

## Kattavuussyiden osoitteet (viety 12.10.)

**Uudelleenohjauksen sisältävä sivu, 62 osoitetta:** 42 on uusien sivujen kauttaviivattomia muotoja (`/tiilikaton-pinnoitus-pirkanmaa` → 308 → `/tiilikaton-pinnoitus-pirkanmaa/`), 16 vanhoja polkuja (`/alue/`, `/kattopalvelut/`, `/hinnat/`, `/talon-maalaus/<kunta>/`), 3 `http://`- ja `www`-muotoja ja 1 `/hintalaskuri?palvelu=pinnoitus`. Sivuston omat linkit ovat kaikki kauttaviivallisia (tarkistettu `dist/index.html`), joten kauttaviivattomat tulevat ulkoisista hakemistoista ja Googlen vanhoista tiedoista. Ne eivät ole virhe, mutta ne pitävät luvun noin 45:ssä: realistinen tavoite on, että 16 vanhaa polkua ja www-muodot putoavat pois, ei "alle 30".

**Indeksoitu, ei tällä hetkellä hakemistossa, 12 osoitetta:** 6 on huhtikuussa haettuja kauttaviivattomia `maalauspalvelut-<kunta>`-muotoja (vanhentuneita, ohjautuvat nyt). 6 on kolme sivua kahdessa muodossa, jotka Google haki 10.10. ja jätti indeksoimatta: `/tietosuoja/`, `/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/` ja `/tiilikaton-pinnoitus-mantta-vilppula/`. Tekninen puoli on kunnossa (sitemapissa, esirenderöity, ei noindex), joten kyse on Googlen laatuarviosta: tietosuojasivu on tarkoituksella ohut, ja kaupunkisivu on 24 saman pohjan sivusta yksi. Tämä tukee vaiheen 4 ajatusta kaupunkikohtaisesta sisällöstä. Artikkeli kannattaa pyytää indeksoitavaksi uudelleen.

**Ei löydy (404), 3 osoitetta:** `/tiilikaton-pinnoitus-kangasala` (haettu 3.10.), `/tiilikaton-pinnoitus-kihnio` (4.9.) ja `/artikkelit` (29.5.), kaikki ilman kauttaviivaa ja haettu ennen 5.10. julkaisua, jolloin sivuja ei vielä ollut. Nyt ne ohjautuvat kauttaviivalliseen sivuun. Vahvistus menee läpi itsestään.

**Havaittu, toistaiseksi ei indeksoitu, 7 osoitetta:** `/artikkelit/`, `/artikkelit/kuinka-usein-puutalo-maalataan/` (julkaistu 4.10.), `/artikkelit/milloin-pinnoittaa-tiilikatto/` (24.5.), `/talon-maalaus-pirkkala/`, `/tiilikaton-pinnoitus-ikaalinen/`, `/tiilikaton-pinnoitus-kihnio/`, `/tiilikaton-pinnoitus-virrat/`. Kaikki ovat sitemapissa ja esirenderöityjä ilman noindexiä: meidän puolella ei ole estettä, Google ei ole vielä ehtinyt hakea niitä. Artikkelisivuille kannattaa pyytää indeksointia; kaupunkisivut tulevat ajallaan.

## Mikä sivu näkyy Tampere-hauilla (3 kk)

| Kysely | Sivu | Näyttökerrat | Sijainti |
|---|---|---|---|
| tiilikaton pinnoitus tampere | `/tiilikaton-pinnoitus-pirkanmaa/` | 282 | 41,5 |
| | `/` | 262 | 13,3 |
| | `/maalauspalvelut-tampere/` | 250 | 15,8 |
| | `/tiilikaton-pinnoitus-tampere/` | 11 | 75,2 |
| talon maalaus tampere | `/talon-maalaus-tampere/` | 243 | 52,7 |
| | `/talon-maalaus-hinta-pirkanmaa/` | 157 | 52,0 |
| | `/` | 74 | 6,4 |

Pinnoituksen Tampere-sivu näkyy "tiilikaton pinnoitus tampere" -haulla käytännössä ei koskaan; etusivu ja yleissivu näkyvät sen sijaan sijoilla 13–16. Maalauksen Tampere-sivu näkyy eniten, mutta sijalla 53, kun etusivu on samalla haulla sijalla 6. Google ei siis pidä Tampere-sivuja hakujen parhaana vastauksena. Vaiheen 3 titlet ja täsmälinkitys kohdistuvat juuri tähän.

## Linkit

- **Sisäiset linkit (Googlen tiedot):** raportti listaa vain 19 kohdesivua, ja kärjessä ovat footerista linkitetyt yleissivut (56–57 linkkiä kukin). Tampere-palvelusivuja ei ole listalla lainkaan, vaikka esirenderöidyssä HTML:ssä etusivulta on 2 linkkiä `/tiilikaton-pinnoitus-tampere/`-sivulle ja yleissivulta 4. Googlen linkkitiedot ovat 5.10. edeltävältä ajalta; tarkistetaan 3.11. uudestaan.
- **Ulkoiset linkit:** 16 näytelinkkiä, kaikki yrityshakemistoja (finder, fonecta, kauppalehti, infobel, profinder, bisne, luottoriskit, 16100.fi, kuntosudet). Ei yhtään sisällöllistä linkkiä. Vahvistaa auditoinnin johtopäätöksen ohuista ulkoisista signaaleista.
- **Core Web Vitals:** "Ei tarpeeksi tietoja", eli kenttädataa ei vielä ole. Vaiheen 5 CLS-korjaus kannattaa tehdä ennen kuin sitä kertyy.

## Seurantataulukon lähtötaso

| Mittari | Auditointi | Lähtötaso 9.10. | 20.10. tavoite | 3.11. tavoite |
|---|---|---|---|---|
| "Indeksoitu, ei hakemistossa" | 17 | 12 | alle 10 | 0 |
| "Uudelleenohjauksen sisältävä sivu" | 56 | 62 | laskussa | noin 45 (vanhat polut pois; 42 kauttaviivatonta muotoa jää) |
| Etusivun sijainti | 15,6 | 19,8 | alle 10 | alle 8 |
| "tiilikaton pinnoitus tampere" | 15,0 | 21,8 | 12 | alle 10 |
| `/tiilikaton-pinnoitus-tampere/` | 45,5 | 60,5 | 25 | alle 15 |
| Ei-brändiklikkauksia viikossa | 9 | noin 6–9 | 15 | 25 |
