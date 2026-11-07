# Indeksointijono (Search Console)

Päivitetty 7.11.2026. Lähde: Search Consolen URL-tarkastus kaikille sivustokartan 97 sivulle (OpenSEO `inspect_urls`,
ei krediittejä). Google indeksoi jokaisen sivun uudelleen omaan tahtiinsa; pyyntö vain nopeuttaa. Search Consolen
kiintiö on noin 10 pyyntöä päivässä, joten jono etenee päivä kerrallaan, ylhäältä alas. Pyynnöt tehdään Eerikin
Chromessa (Search Console → URL-tarkastus → Pyydä indeksointia). **Kun pyyntö on tehty, merkitse se luvun 3 taulukkoon
ja CLAUDE.md:n kohtaan "Indeksointijono".**

**Tärkeysjärjestys**: 1 palvelu- ja hintasivut sekä etusivu ja Tampere, 2 muut yleiset sivut ja artikkelit,
3 isojen kuntien palvelusivut, 4 muut kuntien palvelusivut, 5 aluesivut (`/maalauspalvelut-<kunta>/`).
Vanhat katon puhdistus -osoitteet (301 pinnoitussivulle) ovat jonon hännillä (Eerik 2.11.2026): oikeat sivut ensin.

**Milloin sivu pitää pyytää uudelleen**: kun Googlen viimeinen indeksointi on ennen sivun viimeistä sisältömuutosta.
Viimeinen joka sivua koskenut muutos oli PR #228 (1.11.2026 klo 09:31 Suomen aikaa). Sen jälkeen PR #233 (3.11. klo 17:16)
muutti kaikki 25 talon maalaus -sivua (homepesu-tekstit) ja PR #231 (7.11. klo 10:14, `tyovaiheet.ts`) 14 sivua: etusivu,
`/tiilikaton-pinnoitus-pirkanmaa/`, `/harjatiivisteen-asennus/`, `/ilmainen-katon-kuntotarkastus/`, `/taloyhtiot/`,
`/artikkelit/` ja kahdeksan artikkelia. Muuttuneet sivut näkee `src/data/lastmod.json`-tiedostosta (hash vaihtuu). Seuraavan ulkoasu- tai
tekstimuutoksen jälkeen jono alkaa alusta: kaikki ennen muutosta indeksoidut sivut vanhenevat taas, joten päivän
pyynnöt kannattaa tehdä vasta, kun päivän muutokset on julkaistu.

## 1. Jäljellä, tärkeysjärjestyksessä (50 sivua)

Tila 7.11.2026. OpenSEO:n `inspect_urls` ei ole enää käytettävissä pintanen.fi:lle (projekti oli vanhalla tilillä), joten
Googlen viimeistä indeksointia ei tarkistettu: lista perustuu sivujen sisältömuutoksiin (`lastmod.json`) ja edelliseen
jonoon. Syy: **3.11.** = homepesu-muutos (#233), **7.11.** = työvaihemuutos (#231), **jono** = edellisestä jonosta,
sisältö ei ole muuttunut 1.11. jälkeen. Pyydä ylhäältä alas, noin 8–10 päivässä.

| # | Tärkeys | Sivu | Syy |
|---|---|---|---|
| 1 | 2 | `/artikkelit/milloin-pinnoittaa-tiilikatto/` | 7.11. |
| 2 | 2 | `/artikkelit/pinnoitus-vai-uusi-katto/` | 7.11. |
| 3 | 2 | `/artikkelit/tiilikaton-pesu-ja-pinnoitus/` | 7.11. |
| 4 | 2 | `/artikkelit/voiko-tiilikaton-pinnoittaa-itse/` | 7.11. |
| 5 | 2 | `/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/` | 7.11. |
| 6 | 2 | `/artikkelit/kuinka-usein-puutalo-maalataan/` | 7.11. |
| 7 | 2 | `/artikkelit/huoltomaalaus-vai-uusi-ulkoverhous/` | 7.11. |
| 8 | 3 | `/talon-maalaus-nokia/` | 3.11. |
| 9 | 3 | `/talon-maalaus-kangasala/` | 3.11. |
| 10 | 3 | `/talon-maalaus-ylojarvi/` | 3.11. (oli jonossa) |
| 11 | 3 | `/talon-maalaus-pirkkala/` | 3.11. |
| 12 | 3 | `/talon-maalaus-lempaala/` | 3.11. |
| 13 | 3 | `/talon-maalaus-hameenlinna/` | 3.11. (oli jonossa) |
| 14 | 3 | `/tiilikaton-pinnoitus-pirkkala/` | jono |
| 15 | 3 | `/tiilikaton-pinnoitus-nokia/` | jono |
| 16 | 4 | `/talon-maalaus-sastamala/` | 3.11. |
| 17 | 4 | `/talon-maalaus-valkeakoski/` | 3.11. |
| 18 | 4 | `/talon-maalaus-hameenkyro/` | 3.11. (oli jonossa) |
| 19 | 4 | `/talon-maalaus-huittinen/` | 3.11. (oli jonossa) |
| 20 | 4 | `/talon-maalaus-forssa/` | 3.11. |
| 21 | 4 | `/talon-maalaus-akaa/` | 3.11. |
| 22 | 4 | `/talon-maalaus-ikaalinen/` | 3.11. |
| 23 | 4 | `/talon-maalaus-orivesi/` | 3.11. |
| 24 | 4 | `/talon-maalaus-kihnio/` | 3.11. (oli jonossa) |
| 25 | 4 | `/talon-maalaus-mantta-vilppula/` | 3.11. (oli jonossa) |
| 26 | 4 | `/talon-maalaus-juupajoki/` | 3.11. |
| 27 | 4 | `/talon-maalaus-parkano/` | 3.11. |
| 28 | 4 | `/talon-maalaus-palkane/` | 3.11. |
| 29 | 4 | `/talon-maalaus-ruovesi/` | 3.11. |
| 30 | 4 | `/talon-maalaus-urjala/` | 3.11. |
| 31 | 4 | `/talon-maalaus-vesilahti/` | 3.11. |
| 32 | 4 | `/talon-maalaus-virrat/` | 3.11. |
| 33 | 4 | `/tiilikaton-pinnoitus-hameenkyro/` | jono |
| 34 | 4 | `/tiilikaton-pinnoitus-orivesi/` | jono |
| 35 | 4 | `/tiilikaton-pinnoitus-juupajoki/` | jono |
| 36 | 5 | `/maalauspalvelut-nokia/` | jono |
| 37 | 5 | `/maalauspalvelut-ylojarvi/` | jono |
| 38 | 5 | `/maalauspalvelut-lempaala/` | jono |
| 39 | 5 | `/maalauspalvelut-pirkkala/` | jono |
| 40 | 5 | `/maalauspalvelut-sastamala/` | jono |
| 41 | 5 | `/maalauspalvelut-valkeakoski/` | jono |
| 42 | 5 | `/maalauspalvelut-hameenlinna/` | jono |
| 43 | 5 | `/maalauspalvelut-hameenkyro/` | jono |
| 44 | 5 | `/maalauspalvelut-forssa/` | jono |
| 45 | 5 | `/maalauspalvelut-kihnio/` | jono |
| 46 | 5 | `/maalauspalvelut-parkano/` | jono |
| 47 | 5 | `/maalauspalvelut-palkane/` | jono |
| 48 | 5 | `/maalauspalvelut-ruovesi/` | jono |
| 49 | 5 | `/maalauspalvelut-urjala/` | jono |
| 50 | 5 | `/maalauspalvelut-virrat/` | jono |

Jonon jälkeen, matalalla prioriteetilla:

- `/artikkelit/pinnoitus-aurinkopaneelit-katolla/`: julkaisu ma 9.11.2026. Pyydä julkaisupäivän tuotantobuildin jälkeen (ensimmäinen pyyntö, sivu ei ole indeksissä).
- `/artikkelit/harjatiiviste-tiilikatolla/`: jonossa, julkaisu 19.11.2026. Pyydä vasta julkaisupäivän tuotantobuildin jälkeen.
- Vanhat katon puhdistus -osoitteet, jotka Google näyttää yhä omina sivuina (tila 30.10.): `/katon-puhdistus-tampere/`,
  `-pirkanmaa/`, `-nokia/`, `-huittinen/`, `-hameenkyro/`. Pyyntö saa Googlen näkemään 301:n. Jo kunnossa:
  `/katon-puhdistus-hinta-pirkanmaa/`, `-ylojarvi/`, `-sastamala/`, `-forssa/`, `-hameenlinna/`.

## 2. Ajan tasalla (sisältö ei muuttunut viimeisen pyynnön tai indeksoinnin jälkeen)

Tila 7.11.2026, 37 sivua: `/talon-maalaus-hinta-pirkanmaa/`, `/tiilikaton-pinnoitus-hinta-pirkanmaa/`, `/hintalaskuri/`,
`/toiminta-alueet/`, `/yhteystiedot/`, `/kokemuksia/`, `/referenssit/`, `/meista/`, `/kotitalousvahennys/`, `/tarjouspyynto/`,
`/ilmainen-julkisivun-kuntoarvio/`, `/tiilikaton-pinnoitus-tampere/`; tiilikaton pinnoitus: Kangasala, Kihniö, Ylöjärvi,
Lempäälä, Sastamala, Valkeakoski, Hämeenlinna, Forssa, Huittinen, Akaa, Ikaalinen, Mänttä-Vilppula, Parkano, Pälkäne,
Ruovesi, Urjala, Vesilahti, Virrat; maalauspalvelut: Tampere, Kangasala, Huittinen, Akaa, Ikaalinen, Juupajoki,
Mänttä-Vilppula, Orivesi, Vesilahti. Lisäksi tänään 7.11. pyydetyt 10 sivua (luku 3).
## 3. Tehdyt pyynnöt

| Päivä | Sivut | Tulos |
|---|---|---|
| 29.10.2026 | yhteystiedot, talon maalaus Tampere ja Nokia, tiilikaton pinnoitus Tampere, Nokia ja Kangasala, kokemuksia, referenssit, molemmat hintasivut | kaikki indeksoitu 29.–30.10., sisältö muuttui sen jälkeen |
| 30.10.2026 | taloyhtiot, harjatiivisteen-asennus, molemmat kuntotarkastussivut, artikkelit, huoltomaalaus-artikkeli, työvaiheet-artikkeli, etusivu, meista, hintalaskuri | 8 indeksoitu samana päivänä; `/artikkelit/` ja huoltomaalaus-artikkeli ensimmäistä kertaa indeksissä |
| 2.11.2026 | talon-maalaus-pirkkala (ei ollut indeksissä), artikkeli kuinka-usein-puutalo-maalataan (ei ollut), tiilikaton-pinnoitus-kihnio (ei ollut), talon-maalaus-tampere, yhteystiedot, kokemuksia, referenssit, tiilikaton-pinnoitus-kangasala, talon-maalaus-nokia, taloyhtiot | kaikki 10 pyyntöä lähetetty ("Indeksointipyyntö lähetetty"); tarkista tila 3.11. |
| 3.11.2026 | tiilikaton-pinnoitus-hinta-pirkanmaa, kotitalousvahennys, tarjouspyynto, meista, ilmainen-julkisivun-kuntoarvio, harjatiivisteen-asennus, artikkelit, artikkeli kotitalousvahennys-katto-ja-maalaustyot | 8 pyyntöä lähetetty ("Indeksointipyyntö lähetetty"); artikkeli tiilikaton-pinnoituksen-tyovaiheet ja tietosuoja eivät menneet läpi: "Kiintiö ylitetty" 8 pyynnön jälkeen, pyydä huomenna ensin nämä |
| 7.11.2026 | etusivu, tiilikaton-pinnoitus-pirkanmaa, talon-maalaus-pirkanmaa, talon-maalaus-tampere, artikkeli tiilikaton-pinnoituksen-tyovaiheet, tietosuoja, ilmainen-katon-kuntotarkastus, harjatiivisteen-asennus, taloyhtiot, artikkelit | kaikki 10 lähetetty ("Indeksointipyyntö lähetetty"), kiintiö ei täyttynyt; tuotanto tarjosi jo PR #231:n (build-commit 1aac687) |
| 11.10.2026 (suunnitelma, Eerik) | 10 sivua `docs/korjaussuunnitelma-2026-10-11.md`, vaihe 2 | ei kirjattu, tekikö Eerik pyynnöt |

## 4. Päiväsuunnitelma

- **7.11.**: 10 pyyntöä tehty (kiintiö riitti kymmeneen). **Seuraava päivä**: artikkelit 1–7 ja isojen kuntien talon maalaus -sivut (8–10). Sen jälkeen jono etenee ylhäältä alas, ja vanhat puhdistusosoitteet ovat viimeisenä.
- **9.11.** (ma): aurinkopaneeliartikkeli julkaisupäivän tuotantobuildin jälkeen. **19.11.**: harjatiivisteartikkeli samoin.
- Joka pyyntöpäivä: tarkista ensin `git log origin/main`, onko sisältömuutoksia julkaistu, ja `src/data/lastmod.json`-tiedostosta,
  mitkä sivut muuttuivat (hash). Jos muutoksia on, pyydä vasta niiden jälkeen ja lisää muuttuneet sivut jonoon. Tarkista myös,
  että tuotanto tarjoaa uusimman mergen (`<meta name="build-commit">`).
