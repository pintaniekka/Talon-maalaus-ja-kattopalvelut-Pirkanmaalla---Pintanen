# Indeksointijono (Search Console)

Päivitetty 30.10.2026. Lähde: Search Consolen URL-tarkastus kaikille sivustokartan 97 sivulle sekä vanhoille
katon puhdistus -osoitteille (OpenSEO `inspect_urls`, ei krediittejä). Google indeksoi jokaisen sivun uudelleen omaan
tahtiinsa; pyyntö vain nopeuttaa. Search Consolen kiintiö on noin 10 pyyntöä päivässä, joten jono etenee päivä kerrallaan,
ylhäältä alas. Kun pyyntö on tehty, merkitse päivä sarakkeeseen ja siirrä rivi luvun 5 taulukkoon.

**Tärkeysjärjestys**: 1 palvelu- ja hintasivut sekä etusivu ja Tampere, 2 muut yleiset sivut ja artikkelit,
3 isojen kuntien palvelusivut, 4 muut kuntien palvelusivut, 5 aluesivut (`/maalauspalvelut-<kunta>/`).

**Milloin sivu pitää pyytää uudelleen**: kun Googlen viimeinen indeksointi on ennen sivun viimeistä sisältömuutosta.
Viimeinen joka sivua koskenut muutos oli PR #200 (29.10.2026 klo 22:55 Suomen aikaa: toimintakutsut lohkojen väliin,
mobiilivalikko; samana iltana myös #195–#199: valikko, palvelukortit, chat-laskuri, harjatiiviste-sanasto).
`/referenssit/` muuttui vielä PR #202:ssa 30.10. klo 13:33. Faviconin vaihto (#205) ei vaadi pyyntöä.
Seuraavan ulkoasu- tai tekstimuutoksen jälkeen jono alkaa alusta: silloin kaikki ennen muutosta indeksoidut sivut
vanhenevat taas, joten pyynnöt kannattaa tehdä vasta, kun päivän muutokset on julkaistu.

## 1. Ei indeksissä (pyydä ensin)

| # | Sivu | Googlen tila | Huomio |
|---|---|---|---|
| 1 | `/artikkelit/kuinka-usein-puutalo-maalataan/` | Löydetty, ei vielä indeksoitu | julkaistu 4.10.2026, Google ei ole hakenut sivua vielä kertaakaan |
| 2 | `/talon-maalaus-pirkkala/` | Löydetty, ei vielä indeksoitu | Pirkkala on iso kunta Tampereen vieressä: tärkein tästä ryhmästä |
| 3 | `/tiilikaton-pinnoitus-kihnio/` | Löydetty, ei vielä indeksoitu | pieni kunta, mutta sivu puuttuu kokonaan hakutuloksista |
| 4 | `/artikkelit/harjatiiviste-tiilikatolla/` | Googlelle tuntematon (jonossa, julkaisu 19.11.2026) | pyydä julkaisupäivän tuotantobuildin jälkeen, ei ennen |

## 2. Vanhat katon puhdistus -osoitteet (301 pinnoitussivulle 14.10.2026 lähtien)

Google näyttää nämä yhä omina sivuina, koska se ei ole käynyt niillä ohjauksen jälkeen. Pyyntö saa Googlen hakemaan
osoitteen, näkemään 301:n ja siirtämään arvon pinnoitussivulle. Nämä kannattaa tehdä luvun 1 jälkeen, ennen luvun 3
uudelleenindeksointeja, koska ne poistavat hakutuloksista sivuja palvelulle, jota ei enää ole.

| # | Osoite | Googlen tila | Viimeinen indeksointi |
|---|---|---|---|
| 1 | `/katon-puhdistus-tampere/` | Lähetetty ja indeksoitu (vanha sivu) | 13.10. 16:59 |
| 2 | `/katon-puhdistus-pirkanmaa/` | Lähetetty ja indeksoitu (vanha sivu) | 14.10. 06:46 |
| 3 | `/katon-puhdistus-nokia/` | Lähetetty ja indeksoitu (vanha sivu) | 05.10. 17:55 |
| 4 | `/katon-puhdistus-huittinen/` | Indeksoitu, kanoninen jo pinnoitussivu | 13.10. 16:23 |
| 5 | `/katon-puhdistus-hameenkyro/` | Lähetetty ja indeksoitu (vanha sivu) | 05.10. 16:38 |

Jo kunnossa (Google näkee ohjauksen, "Sivu, jolla on uudelleenohjaus"): `/katon-puhdistus-hinta-pirkanmaa/`,
`-ylojarvi/`, `-sastamala/`, `-forssa/`, `-hameenlinna/`. Niitä ei tarvitse pyytää.

## 3. Indeksoitu ennen viimeisintä muutosta (pyydä uudelleen, tässä järjestyksessä)

64 sivua. Sarake "Pyydetty" täytetään, kun pyyntö on tehty.

| # | Tärkeys | Sivu | Googlen viimeinen indeksointi | Pyydetty aiemmin | Pyydetty |
|---|---|---|---|---|---|
| 1 | 1 | `/talon-maalaus-pirkanmaa/` | 29.10. 00:05 |  | |
| 2 | 1 | `/talon-maalaus-tampere/` | 29.10. 08:30 | 29.10. | |
| 3 | 1 | `/tiilikaton-pinnoitus-tampere/` | 29.10. 08:46 | 29.10. | |
| 4 | 1 | `/tiilikaton-pinnoitus-hinta-pirkanmaa/` | 29.10. 14:37 | 29.10. | |
| 5 | 1 | `/talon-maalaus-hinta-pirkanmaa/` | 30.10. 09:59 | 29.10. | |
| 6 | 1 | `/tiilikaton-pinnoitus-pirkanmaa/` | 30.10. 11:51 |  | |
| 7 | 2 | `/toiminta-alueet/` | 26.10. 22:07 |  | |
| 8 | 2 | `/tarjouspyynto/` | 27.10. 07:04 |  | |
| 9 | 2 | `/tietosuoja/` | 27.10. 14:27 |  | |
| 10 | 2 | `/meista/` | 27.10. 17:00 | 30.10. (pyyntö jonossa, odota) | |
| 11 | 2 | `/artikkelit/milloin-pinnoittaa-tiilikatto/` | 29.10. 02:57 |  | |
| 12 | 2 | `/yhteystiedot/` | 29.10. 08:28 | 29.10. | |
| 13 | 2 | `/kokemuksia/` | 29.10. 08:32 | 29.10. | |
| 14 | 2 | `/referenssit/` | 29.10. 08:34 | 29.10. | |
| 15 | 2 | `/kotitalousvahennys/` | 29.10. 15:18 |  | |
| 16 | 2 | `/artikkelit/pinnoitus-vai-uusi-katto/` | 29.10. 20:07 |  | |
| 17 | 2 | `/hintalaskuri/` | 29.10. 21:20 |  | |
| 18 | 2 | `/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/` | 30.10. 13:29 |  | |
| 19 | 3 | `/tiilikaton-pinnoitus-lempaala/` | 28.10. 12:16 |  | |
| 20 | 3 | `/tiilikaton-pinnoitus-ylojarvi/` | 29.10. 03:19 |  | |
| 21 | 3 | `/talon-maalaus-kangasala/` | 29.10. 03:35 |  | |
| 22 | 3 | `/talon-maalaus-nokia/` | 29.10. 08:30 | 29.10. | |
| 23 | 3 | `/tiilikaton-pinnoitus-kangasala/` | 29.10. 08:36 | 29.10. | |
| 24 | 3 | `/tiilikaton-pinnoitus-sastamala/` | 29.10. 14:59 |  | |
| 25 | 3 | `/tiilikaton-pinnoitus-pirkkala/` | 29.10. 17:51 |  | |
| 26 | 3 | `/talon-maalaus-hameenlinna/` | 29.10. 21:50 |  | |
| 27 | 3 | `/talon-maalaus-ylojarvi/` | 29.10. 23:05 |  | |
| 28 | 3 | `/talon-maalaus-valkeakoski/` | 30.10. 00:46 |  | |
| 29 | 3 | `/talon-maalaus-lempaala/` | 30.10. 04:06 |  | |
| 30 | 3 | `/talon-maalaus-sastamala/` | 30.10. 06:00 |  | |
| 31 | 4 | `/tiilikaton-pinnoitus-juupajoki/` | 09.10. 06:59 |  | |
| 32 | 4 | `/talon-maalaus-kihnio/` | 21.10. 01:10 |  | |
| 33 | 4 | `/talon-maalaus-mantta-vilppula/` | 27.10. 00:45 |  | |
| 34 | 4 | `/tiilikaton-pinnoitus-hameenkyro/` | 27.10. 02:48 |  | |
| 35 | 4 | `/talon-maalaus-hameenkyro/` | 27.10. 09:50 |  | |
| 36 | 4 | `/talon-maalaus-urjala/` | 28.10. 19:49 |  | |
| 37 | 4 | `/talon-maalaus-akaa/` | 29.10. 01:20 |  | |
| 38 | 4 | `/talon-maalaus-palkane/` | 29.10. 04:12 |  | |
| 39 | 4 | `/tiilikaton-pinnoitus-urjala/` | 29.10. 14:20 |  | |
| 40 | 4 | `/talon-maalaus-forssa/` | 29.10. 16:33 |  | |
| 41 | 4 | `/talon-maalaus-huittinen/` | 29.10. 20:32 |  | |
| 42 | 4 | `/talon-maalaus-ikaalinen/` | 30.10. 00:27 |  | |
| 43 | 4 | `/talon-maalaus-virrat/` | 30.10. 02:26 |  | |
| 44 | 4 | `/talon-maalaus-juupajoki/` | 30.10. 04:31 |  | |
| 45 | 4 | `/talon-maalaus-orivesi/` | 30.10. 04:56 |  | |
| 46 | 4 | `/talon-maalaus-parkano/` | 30.10. 06:15 |  | |
| 47 | 4 | `/talon-maalaus-ruovesi/` | 30.10. 06:22 |  | |
| 48 | 4 | `/talon-maalaus-vesilahti/` | 30.10. 13:02 |  | |
| 49 | 5 | `/maalauspalvelut-forssa/` | 08.10. 14:42 |  | |
| 50 | 5 | `/maalauspalvelut-ikaalinen/` | 26.10. 04:11 |  | |
| 51 | 5 | `/maalauspalvelut-nokia/` | 26.10. 16:15 |  | |
| 52 | 5 | `/maalauspalvelut-lempaala/` | 26.10. 19:38 |  | |
| 53 | 5 | `/maalauspalvelut-ruovesi/` | 27.10. 01:52 |  | |
| 54 | 5 | `/maalauspalvelut-akaa/` | 27.10. 13:12 |  | |
| 55 | 5 | `/maalauspalvelut-hameenlinna/` | 27.10. 13:49 |  | |
| 56 | 5 | `/maalauspalvelut-valkeakoski/` | 27.10. 15:06 |  | |
| 57 | 5 | `/maalauspalvelut-vesilahti/` | 27.10. 17:36 |  | |
| 58 | 5 | `/maalauspalvelut-parkano/` | 27.10. 18:17 |  | |
| 59 | 5 | `/maalauspalvelut-juupajoki/` | 28.10. 07:36 |  | |
| 60 | 5 | `/maalauspalvelut-ylojarvi/` | 28.10. 09:41 |  | |
| 61 | 5 | `/maalauspalvelut-sastamala/` | 28.10. 13:50 |  | |
| 62 | 5 | `/maalauspalvelut-palkane/` | 29.10. 11:35 |  | |
| 63 | 5 | `/maalauspalvelut-kihnio/` | 29.10. 15:19 |  | |
| 64 | 5 | `/maalauspalvelut-urjala/` | 29.10. 20:57 |  | |

## 4. Ajan tasalla (indeksoitu viimeisimmän muutoksen jälkeen, ei pyyntöä)

30 sivua.

| Sivu | Googlen viimeinen indeksointi |
|---|---|
| `/` | 30.10. 14:16 |
| `/taloyhtiot/` | 30.10. 14:09 |
| `/harjatiivisteen-asennus/` | 30.10. 14:11 |
| `/ilmainen-katon-kuntotarkastus/` | 30.10. 14:11 |
| `/ilmainen-julkisivun-kuntoarvio/` | 30.10. 14:13 |
| `/artikkelit/` | 30.10. 14:14 |
| `/artikkelit/huoltomaalaus-vai-uusi-ulkoverhous/` | 30.10. 14:16 |
| `/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/` | 30.10. 14:16 |
| `/tiilikaton-pinnoitus-valkeakoski/` | 30.10. 03:16 |
| `/tiilikaton-pinnoitus-nokia/` | 30.10. 07:05 |
| `/tiilikaton-pinnoitus-hameenlinna/` | 30.10. 10:14 |
| `/tiilikaton-pinnoitus-parkano/` | 30.10. 00:09 |
| `/tiilikaton-pinnoitus-ikaalinen/` | 30.10. 06:29 |
| `/tiilikaton-pinnoitus-huittinen/` | 30.10. 06:43 |
| `/tiilikaton-pinnoitus-palkane/` | 30.10. 06:58 |
| `/tiilikaton-pinnoitus-ruovesi/` | 30.10. 07:19 |
| `/tiilikaton-pinnoitus-mantta-vilppula/` | 30.10. 07:33 |
| `/tiilikaton-pinnoitus-orivesi/` | 30.10. 07:40 |
| `/tiilikaton-pinnoitus-akaa/` | 30.10. 09:51 |
| `/tiilikaton-pinnoitus-vesilahti/` | 30.10. 10:05 |
| `/tiilikaton-pinnoitus-forssa/` | 30.10. 10:51 |
| `/tiilikaton-pinnoitus-virrat/` | 30.10. 11:36 |
| `/maalauspalvelut-virrat/` | 30.10. 01:17 |
| `/maalauspalvelut-huittinen/` | 30.10. 03:41 |
| `/maalauspalvelut-orivesi/` | 30.10. 05:21 |
| `/maalauspalvelut-tampere/` | 30.10. 06:04 |
| `/maalauspalvelut-mantta-vilppula/` | 30.10. 07:48 |
| `/maalauspalvelut-pirkkala/` | 30.10. 10:29 |
| `/maalauspalvelut-hameenkyro/` | 30.10. 11:21 |
| `/maalauspalvelut-kangasala/` | 30.10. 14:06 |

## 5. Tehdyt pyynnöt

| Päivä | Sivut | Tulos |
|---|---|---|
| 29.10.2026 | yhteystiedot, talon maalaus Tampere ja Nokia, tiilikaton pinnoitus Tampere, Nokia ja Kangasala, kokemuksia, referenssit, molemmat hintasivut | kaikki indeksoitu 29.–30.10., mutta sisältö muuttui illalla ja 30.10. uudelleen: 9 näistä on luvussa 3 (vain pinnoitus Nokia on ajan tasalla) |
| 30.10.2026 | taloyhtiot, harjatiivisteen-asennus, molemmat kuntotarkastussivut, artikkelit, huoltomaalaus-artikkeli, työvaiheet-artikkeli, etusivu, meista, hintalaskuri | 8 indeksoitu samana päivänä klo 14:09–14:16; `/artikkelit/` ja huoltomaalaus-artikkeli ensimmäistä kertaa indeksissä; meista odottaa; hintalaskuri indeksoitiin jo 29.10. illalla, mutta ennen PR #200:aa, joten se on luvussa 3 |
| 11.10.2026 (suunnitelma, Eerik) | 10 sivua `docs/korjaussuunnitelma-2026-10-11.md`, vaihe 2 | ei kirjattu, tekikö Eerik pyynnöt; tila näkyy yllä |

## 6. Päiväsuunnitelma

- **31.10.**: luku 1 (3 sivua) + luku 2 (5 osoitetta) + luvun 3 kaksi ensimmäistä = 10.
- **1.11. alkaen**: luku 3 järjestyksessä, 10 päivässä, kunnes jono on tyhjä (64 sivua, noin viikko).
- **19.11.**: harjatiivisteartikkeli julkaisupäivän tuotantobuildin jälkeen.
- Joka pyyntöpäivä: tarkista ensin, onko päivän aikana julkaistu muutoksia; jos on, pyydä vasta niiden jälkeen.
