# Search Console -lähtötaso 12.10.2026

Eerik vei raportit 12.10.2026 (tiedot 9.10. asti, eli ennen vaiheen 1 julkaisua 11.10.). Tämä on vertailupiste seurannalle 20.10. ja 3.11. (korjaussuunnitelman vaihe 8). Vertailuluvut "auditointi" ovat osan 4 viikolta 3.–9.10. ja kattavuus 4.10.

Tiedostot tässä kansiossa:

- `kattavuus-2026-10-12/` – Sivut-raportti (kattavuus), koko sivusto, 14.7.–9.10.
- `tulokset-3kk-2026-07-10--2026-10-09/` – Tulokset-raportti, viimeiset 3 kuukautta
- `tulokset-2026-10-05--2026-10-09/` – Tulokset-raportti, julkaisun jälkeiset 5 päivää
- `sivustokartat-2026-10-12.png` – Sivustokartat-raportti

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

## Seurantataulukon lähtötaso

| Mittari | Auditointi | Lähtötaso 9.10. | 20.10. tavoite | 3.11. tavoite |
|---|---|---|---|---|
| "Indeksoitu, ei hakemistossa" | 17 | 12 | alle 10 | 0 |
| "Uudelleenohjauksen sisältävä sivu" | 56 | 62 | laskussa | alle 30 |
| Etusivun sijainti | 15,6 | 19,8 | alle 10 | alle 8 |
| "tiilikaton pinnoitus tampere" | 15,0 | 21,8 | 12 | alle 10 |
| `/tiilikaton-pinnoitus-tampere/` | 45,5 | 60,5 | 25 | alle 15 |
| Ei-brändiklikkauksia viikossa | 9 | noin 6–9 | 15 | 25 |
