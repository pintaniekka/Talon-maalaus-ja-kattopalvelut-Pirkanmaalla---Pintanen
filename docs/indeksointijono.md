# Indeksointijono (Search Console)

Päivitetty 3.11.2026. Lähde: Search Consolen URL-tarkastus kaikille sivustokartan 97 sivulle (OpenSEO `inspect_urls`,
ei krediittejä). Google indeksoi jokaisen sivun uudelleen omaan tahtiinsa; pyyntö vain nopeuttaa. Search Consolen
kiintiö on noin 10 pyyntöä päivässä, joten jono etenee päivä kerrallaan, ylhäältä alas. Pyynnöt tehdään Eerikin
Chromessa (Search Console → URL-tarkastus → Pyydä indeksointia). **Kun pyyntö on tehty, merkitse se luvun 3 taulukkoon
ja CLAUDE.md:n kohtaan "Indeksointijono".**

**Tärkeysjärjestys**: 1 palvelu- ja hintasivut sekä etusivu ja Tampere, 2 muut yleiset sivut ja artikkelit,
3 isojen kuntien palvelusivut, 4 muut kuntien palvelusivut, 5 aluesivut (`/maalauspalvelut-<kunta>/`).
Vanhat katon puhdistus -osoitteet (301 pinnoitussivulle) ovat jonon hännillä (Eerik 2.11.2026): oikeat sivut ensin.

**Milloin sivu pitää pyytää uudelleen**: kun Googlen viimeinen indeksointi on ennen sivun viimeistä sisältömuutosta.
Viimeinen joka sivua koskenut muutos oli PR #228 (1.11.2026 klo 09:31 Suomen aikaa). Seuraavan ulkoasu- tai
tekstimuutoksen jälkeen jono alkaa alusta: kaikki ennen muutosta indeksoidut sivut vanhenevat taas, joten päivän
pyynnöt kannattaa tehdä vasta, kun päivän muutokset on julkaistu.

## 1. Jäljellä, tärkeysjärjestyksessä (28 sivua)

Kaikki nämä Google on indeksoinut ennen 1.11. klo 09:31, joten ne ovat vanhentuneet. Ajat Suomen aikaa.
Pyydä ylhäältä alas, noin 8 päivässä (kiintiö).

| # | Tärkeys | Sivu | Googlen viimeinen indeksointi |
|---|---|---|---|
| 9 | 2 | `/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/` | 1.11. 07:52 |
| 10 | 2 | `/tietosuoja/` | 31.10. |
| 11 | 3 | `/talon-maalaus-ylojarvi/` | 1.11. 01:18 |
| 12 | 3 | `/tiilikaton-pinnoitus-pirkkala/` | 29.10. |
| 13 | 3 | `/tiilikaton-pinnoitus-nokia/` | 30.10. |
| 14 | 3 | `/talon-maalaus-hameenlinna/` | 31.10. |
| 15 | 4 | `/tiilikaton-pinnoitus-hameenkyro/` | 31.10. |
| 16 | 4 | `/talon-maalaus-hameenkyro/` | 1.11. 05:41 |
| 17 | 4 | `/talon-maalaus-huittinen/` | 31.10. |
| 18 | 4 | `/tiilikaton-pinnoitus-orivesi/` | 30.10. |
| 19 | 4 | `/tiilikaton-pinnoitus-juupajoki/` | 9.10. |
| 20 | 4 | `/talon-maalaus-kihnio/` | 20.10. |
| 21 | 4 | `/talon-maalaus-mantta-vilppula/` | 26.10. |
| 22 | 5 | `/maalauspalvelut-nokia/` | 1.11. 08:11 |
| 23 | 5 | `/maalauspalvelut-ylojarvi/` | ennen 1.11. 09:31 |
| 24 | 5 | `/maalauspalvelut-lempaala/` | ennen 1.11. 09:31 |
| 25 | 5 | `/maalauspalvelut-pirkkala/` | 1.11. 06:57 |
| 26 | 5 | `/maalauspalvelut-sastamala/` | ennen 1.11. 09:31 |
| 27 | 5 | `/maalauspalvelut-valkeakoski/` | 1.11. 02:15 |
| 28 | 5 | `/maalauspalvelut-hameenlinna/` | ennen 1.11. 09:31 |
| 29 | 5 | `/maalauspalvelut-hameenkyro/` | 30.10. |
| 30 | 5 | `/maalauspalvelut-forssa/` | 8.10. |
| 31 | 5 | `/maalauspalvelut-kihnio/` | ennen 1.11. 09:31 |
| 32 | 5 | `/maalauspalvelut-parkano/` | ennen 1.11. 09:31 |
| 33 | 5 | `/maalauspalvelut-palkane/` | 29.10. |
| 34 | 5 | `/maalauspalvelut-ruovesi/` | ennen 1.11. 09:31 |
| 35 | 5 | `/maalauspalvelut-urjala/` | ennen 1.11. 09:31 |
| 36 | 5 | `/maalauspalvelut-virrat/` | 29.10. |

Jonon jälkeen, matalalla prioriteetilla:

- `/artikkelit/harjatiiviste-tiilikatolla/`: jonossa, julkaisu 19.11.2026. Pyydä vasta julkaisupäivän tuotantobuildin jälkeen.
- Vanhat katon puhdistus -osoitteet, jotka Google näyttää yhä omina sivuina (tila 30.10.): `/katon-puhdistus-tampere/`,
  `-pirkanmaa/`, `-nokia/`, `-huittinen/`, `-hameenkyro/`. Pyyntö saa Googlen näkemään 301:n. Jo kunnossa:
  `/katon-puhdistus-hinta-pirkanmaa/`, `-ylojarvi/`, `-sastamala/`, `-forssa/`, `-hameenlinna/`.

## 2. Ajan tasalla (indeksoitu 1.11. klo 09:31 jälkeen, ei pyyntöä)

Tila 2.11.2026, 51 sivua: `/`, `/talon-maalaus-pirkanmaa/`, `/tiilikaton-pinnoitus-pirkanmaa/`,
`/tiilikaton-pinnoitus-tampere/`, `/talon-maalaus-hinta-pirkanmaa/`, `/hintalaskuri/`, `/toiminta-alueet/`,
`/ilmainen-katon-kuntotarkastus/`; talon maalaus: Kangasala, Lempäälä, Sastamala, Valkeakoski, Forssa, Akaa, Ikaalinen,
Juupajoki, Orivesi, Parkano, Pälkäne, Ruovesi, Urjala, Vesilahti, Virrat; tiilikaton pinnoitus: Ylöjärvi, Lempäälä,
Sastamala, Valkeakoski, Hämeenlinna, Forssa, Huittinen, Akaa, Ikaalinen, Mänttä-Vilppula, Parkano, Pälkäne, Ruovesi,
Urjala, Vesilahti, Virrat; maalauspalvelut: Tampere, Kangasala, Huittinen, Akaa, Ikaalinen, Juupajoki, Mänttä-Vilppula,
Orivesi, Vesilahti; artikkelit milloin-pinnoittaa-tiilikatto, pinnoitus-vai-uusi-katto, huoltomaalaus.

## 3. Tehdyt pyynnöt

| Päivä | Sivut | Tulos |
|---|---|---|
| 29.10.2026 | yhteystiedot, talon maalaus Tampere ja Nokia, tiilikaton pinnoitus Tampere, Nokia ja Kangasala, kokemuksia, referenssit, molemmat hintasivut | kaikki indeksoitu 29.–30.10., sisältö muuttui sen jälkeen |
| 30.10.2026 | taloyhtiot, harjatiivisteen-asennus, molemmat kuntotarkastussivut, artikkelit, huoltomaalaus-artikkeli, työvaiheet-artikkeli, etusivu, meista, hintalaskuri | 8 indeksoitu samana päivänä; `/artikkelit/` ja huoltomaalaus-artikkeli ensimmäistä kertaa indeksissä |
| 2.11.2026 | talon-maalaus-pirkkala (ei ollut indeksissä), artikkeli kuinka-usein-puutalo-maalataan (ei ollut), tiilikaton-pinnoitus-kihnio (ei ollut), talon-maalaus-tampere, yhteystiedot, kokemuksia, referenssit, tiilikaton-pinnoitus-kangasala, talon-maalaus-nokia, taloyhtiot | kaikki 10 pyyntöä lähetetty ("Indeksointipyyntö lähetetty"); tarkista tila 3.11. |
| 3.11.2026 | tiilikaton-pinnoitus-hinta-pirkanmaa, kotitalousvahennys, tarjouspyynto, meista, ilmainen-julkisivun-kuntoarvio, harjatiivisteen-asennus, artikkelit, artikkeli kotitalousvahennys-katto-ja-maalaustyot | 8 pyyntöä lähetetty ("Indeksointipyyntö lähetetty"); artikkeli tiilikaton-pinnoituksen-tyovaiheet ja tietosuoja eivät menneet läpi: "Kiintiö ylitetty" 8 pyynnön jälkeen, pyydä huomenna ensin nämä |
| 11.10.2026 (suunnitelma, Eerik) | 10 sivua `docs/korjaussuunnitelma-2026-10-11.md`, vaihe 2 | ei kirjattu, tekikö Eerik pyynnöt |

## 4. Päiväsuunnitelma

- **3.11.**: 8 pyyntöä tehty (kiintiö täyttyi). **4.11.**: työvaiheet-artikkeli ja tietosuoja sekä seuraavat 8 (kuntasivut). Päiväkiintiö on käytännössä 8 pyyntöä, ei 10. Sen jälkeen jono etenee ylhäältä alas, ja vanhat puhdistusosoitteet ovat viimeisenä.
- **19.11.**: harjatiivisteartikkeli julkaisupäivän tuotantobuildin jälkeen.
- Joka pyyntöpäivä: tarkista ensin, onko päivän aikana julkaistu sisältömuutoksia; jos on, pyydä vasta niiden jälkeen,
  ja tarkista OpenSEO:n `inspect_urls`-työkalulla, mitkä ajan tasalla olleet sivut vanhenivat.
