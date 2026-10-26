# Tarkistuspaketti: yöajo 1 (PR:t #121–#128 ja korjaukset 2)

Koottu 26.10.2026 Eerikin pyynnöstä (viesti 26.10.2026 klo 13.17). Tämä tiedosto on tarkoitettu käsin tarkastamiseen ennen
yhdistämistä. Vertailukohta on `main` 26.10.2026; muutokset ovat haarassa `claude/yo-korjaukset-2`, joka sisältää
koko ketjun (paketit 1–7 ja tämän paketin 8).

Sisältö:

- a) Kaikki title- ja description-muutokset (polku, vanha, uusi, merkkimäärä)
- b) Sivun `/ilmainen-kuntotarkastus/` koko näkyvä teksti
- c) Sivun `/kotitalousvahennys/` koko näkyvä teksti
- d) Kaikki muutokset vanhoihin, käsin tarkastettuihin teksteihin koko PR-ketjusta
- e) Hintalaskurin vähennysrivin kaava ja esimerkit
- Kysymykset

## a) Title- ja description-muutokset

Vertailu on tehty rakennetuista sivuista (`dist/*/index.html`): `main`-haaran build vastaan tämän haaran build.
Merkkimäärä on koko titlen pituus, " | Pintanen" mukaan lukien. Taulukoissa ovat vain sivut, joiden title tai
description muuttui tai jotka ovat uusia. Yhteensä 84 muuttunutta tai uutta sivua: 73 title-muutosta ja 33
description-muutosta. Kaikkien muiden sivujen title ja description ovat ennallaan.

Uudet sivut: `/ilmainen-kuntotarkastus/`, `/kotitalousvahennys/` ja neljä jonossa olevaa artikkelia (`tiilikaton-pinnoituksen-hinta-2027`,
`ormax-tiilikaton-pinnoitus`, `puutalon-ulkomaalin-valinta`, `mokin-ja-piharakennuksen-maalaus`).

### Titlet

| Polku | Title ennen | Title jälkeen | Merkkiä |
|---|---|---|---|
| `/artikkelit/` | Artikkelit ja oppaat | Pintanen | Artikkelit ja oppaat – katto ja talon maalaus | Pintanen | 31 → 56 |
| `/artikkelit/huoltomaalaus-vai-uusi-ulkoverhous/` | Huoltomaalaus vai uusi ulkoverhous: milloin maali riittää? | Pintanen | Huoltomaalaus vai uusi ulkoverhous: puu ratkaisee | Pintanen | 69 → 60 |
| `/artikkelit/mokin-ja-piharakennuksen-maalaus/` (uusi sivu) | – | Mökin ja piharakennuksen maalaus: näin työ etenee | Pintanen | 0 → 60 |
| `/artikkelit/ormax-tiilikaton-pinnoitus/` (uusi sivu) | – | Ormax-tiilikaton pinnoitus: hinta ja ajoitus | Pintanen | 0 → 55 |
| `/artikkelit/pinnoitus-vai-uusi-katto/` | Tiilikattoremontti vai pinnoitus: kumpi kannattaa? | Pintanen | Kattoremontti vai pinnoitus 2027: hinta ja päätös | Pintanen | 61 → 60 |
| `/artikkelit/puutalon-ulkomaalin-valinta/` (uusi sivu) | – | Puutalon ulkomaali: öljymaali vai vesiohenteinen | Pintanen | 0 → 59 |
| `/artikkelit/tiilikaton-pesu-ja-pinnoitus/` | Tiilikaton pesu ja pinnoitus: miksi pesu ei yksin riitä | Pintanen | Tiilikaton pesu ja pinnoitus: miksi pesu ei riitä | Pintanen | 66 → 60 |
| `/artikkelit/tiilikaton-pinnoituksen-hinta-2027/` (uusi sivu) | – | Tiilikaton pinnoituksen hinta 2027 Pirkanmaalla | Pintanen | 0 → 58 |
| `/hintalaskuri/` | Hintalaskuri: tiilikaton pinnoitus ja talon maalaus | Pintanen | Hintalaskuri: tiilikaton pinnoitus, talon maalaus | Pintanen | 62 → 60 |
| `/ilmainen-kuntotarkastus/` (uusi sivu) | – | Ilmainen tiilikaton kuntotarkastus Pirkanmaalla | Pintanen | 0 → 58 |
| `/kokemuksia/` | Asiakkaiden kokemuksia: kaikki Google-arvostelumme | Pintanen | Asiakkaiden kokemuksia: Google-arvostelut 5,0 / 5 | Pintanen | 61 → 60 |
| `/kotitalousvahennys/` (uusi sivu) | – | Kotitalousvähennys 2026 ja 2027: katto ja maalaus | Pintanen | 0 → 60 |
| `/maalauspalvelut-akaa/` | Maalausliike ja kattopalvelut Akaa | Pintanen | Maalausliike ja kattopalvelut Akaa – takuu | Pintanen | 45 → 53 |
| `/maalauspalvelut-forssa/` | Maalausliike ja kattopalvelut Forssa | Pintanen | Maalausliike ja kattopalvelut Forssa – takuu | Pintanen | 47 → 55 |
| `/maalauspalvelut-kihnio/` | Maalausliike ja kattopalvelut Kihniö | Pintanen | Maalausliike ja kattopalvelut Kihniö – takuu | Pintanen | 47 → 55 |
| `/maalauspalvelut-lempaala/` | Maalausliike ja kattopalvelut Lempäälä | Pintanen | Maalausliike ja kattopalvelut Lempäälä – takuu | Pintanen | 49 → 57 |
| `/maalauspalvelut-nokia/` | Maalausliike ja kattopalvelut Nokia | Pintanen | Maalausliike ja kattopalvelut Nokia – takuu | Pintanen | 46 → 54 |
| `/maalauspalvelut-orivesi/` | Maalausliike ja kattopalvelut Orivesi | Pintanen | Maalausliike ja kattopalvelut Orivesi – takuu | Pintanen | 48 → 56 |
| `/maalauspalvelut-palkane/` | Maalausliike ja kattopalvelut Pälkäne | Pintanen | Maalausliike ja kattopalvelut Pälkäne – takuu | Pintanen | 48 → 56 |
| `/maalauspalvelut-parkano/` | Maalausliike ja kattopalvelut Parkano | Pintanen | Maalausliike ja kattopalvelut Parkano – takuu | Pintanen | 48 → 56 |
| `/maalauspalvelut-pirkkala/` | Maalausliike ja kattopalvelut Pirkkala | Pintanen | Maalausliike ja kattopalvelut Pirkkala – takuu | Pintanen | 49 → 57 |
| `/maalauspalvelut-ruovesi/` | Maalausliike ja kattopalvelut Ruovesi | Pintanen | Maalausliike ja kattopalvelut Ruovesi – takuu | Pintanen | 48 → 56 |
| `/maalauspalvelut-tampere/` | Maalausliike ja kattopalvelut Tampere | Pintanen | Maalausliike ja kattopalvelut Tampere – takuu | Pintanen | 48 → 56 |
| `/maalauspalvelut-urjala/` | Maalausliike ja kattopalvelut Urjala | Pintanen | Maalausliike ja kattopalvelut Urjala – takuu | Pintanen | 47 → 55 |
| `/maalauspalvelut-virrat/` | Maalausliike ja kattopalvelut Virrat | Pintanen | Maalausliike ja kattopalvelut Virrat – takuu | Pintanen | 47 → 55 |
| `/maalauspalvelut-ylojarvi/` | Maalausliike ja kattopalvelut Ylöjärvi | Pintanen | Maalausliike ja kattopalvelut Ylöjärvi – takuu | Pintanen | 49 → 57 |
| `/meista/` | Meistä: veljekset Eerik ja Eemil tekevät työn itse | Pintanen | Meistä – Eerik ja Eemil, yli 200 kohdetta | Pintanen | 61 → 52 |
| `/talon-maalaus-akaa/` | Talon maalaus Akaa – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Akaa – ulkomaalaus, 2 v takuu | Pintanen | 63 → 54 |
| `/talon-maalaus-forssa/` | Talon maalaus Forssa – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Forssa – ulkomaalaus, 2 v takuu | Pintanen | 65 → 56 |
| `/talon-maalaus-hameenkyro/` | Talon maalaus Hämeenkyrö – ulkomaalaus | Pintanen | Talon maalaus Hämeenkyrö – ulkomaalaus, 2 v takuu | Pintanen | 49 → 60 |
| `/talon-maalaus-hinta-pirkanmaa/` | Talon maalaus hinta 2027 – hintaesimerkit ja laskuri | Pintanen | Talon maalaus hinta 2027: 3 500–11 000 € | Pintanen | 63 → 51 |
| `/talon-maalaus-huittinen/` | Talon maalaus Huittinen – ulkomaalaus | Pintanen | Talon maalaus Huittinen – ulkomaalaus, 2 v takuu | Pintanen | 48 → 59 |
| `/talon-maalaus-ikaalinen/` | Talon maalaus Ikaalinen – ulkomaalaus | Pintanen | Talon maalaus Ikaalinen – ulkomaalaus, 2 v takuu | Pintanen | 48 → 59 |
| `/talon-maalaus-juupajoki/` | Talon maalaus Juupajoki – ulkomaalaus | Pintanen | Talon maalaus Juupajoki – ulkomaalaus, 2 v takuu | Pintanen | 48 → 59 |
| `/talon-maalaus-kangasala/` | Talon maalaus Kangasala – ulkomaalaus | Pintanen | Talon maalaus Kangasala – ulkomaalaus, 2 v takuu | Pintanen | 48 → 59 |
| `/talon-maalaus-kihnio/` | Talon maalaus Kihniö – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Kihniö – ulkomaalaus, 2 v takuu | Pintanen | 65 → 56 |
| `/talon-maalaus-lempaala/` | Talon maalaus Lempäälä – ulkomaalaus | Pintanen | Talon maalaus Lempäälä – ulkomaalaus, 2 v takuu | Pintanen | 47 → 58 |
| `/talon-maalaus-nokia/` | Talon maalaus Nokia – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Nokia – ulkomaalaus, 2 v takuu | Pintanen | 64 → 55 |
| `/talon-maalaus-orivesi/` | Talon maalaus Orivesi – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Orivesi – ulkomaalaus, 2 v takuu | Pintanen | 66 → 57 |
| `/talon-maalaus-palkane/` | Talon maalaus Pälkäne – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Pälkäne – ulkomaalaus, 2 v takuu | Pintanen | 66 → 57 |
| `/talon-maalaus-parkano/` | Talon maalaus Parkano – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Parkano – ulkomaalaus, 2 v takuu | Pintanen | 66 → 57 |
| `/talon-maalaus-pirkanmaa/` | Talon maalaus Pirkanmaa – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Pirkanmaa – ulkomaalaus, 2 v takuu | Pintanen | 68 → 59 |
| `/talon-maalaus-pirkkala/` | Talon maalaus Pirkkala – ulkomaalaus | Pintanen | Talon maalaus Pirkkala – ulkomaalaus, 2 v takuu | Pintanen | 47 → 58 |
| `/talon-maalaus-ruovesi/` | Talon maalaus Ruovesi – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Ruovesi – ulkomaalaus, 2 v takuu | Pintanen | 66 → 57 |
| `/talon-maalaus-sastamala/` | Talon maalaus Sastamala – ulkomaalaus | Pintanen | Talon maalaus Sastamala – ulkomaalaus, 2 v takuu | Pintanen | 48 → 59 |
| `/talon-maalaus-tampere/` | Talon maalaus Tampere – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Tampere – ulkomaalaus, 2 v takuu | Pintanen | 66 → 57 |
| `/talon-maalaus-urjala/` | Talon maalaus Urjala – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Urjala – ulkomaalaus, 2 v takuu | Pintanen | 65 → 56 |
| `/talon-maalaus-vesilahti/` | Talon maalaus Vesilahti – ulkomaalaus | Pintanen | Talon maalaus Vesilahti – ulkomaalaus, 2 v takuu | Pintanen | 48 → 59 |
| `/talon-maalaus-virrat/` | Talon maalaus Virrat – ulkomaalaus ja julkisivumaalaus | Pintanen | Talon maalaus Virrat – ulkomaalaus, 2 v takuu | Pintanen | 65 → 56 |
| `/talon-maalaus-ylojarvi/` | Talon maalaus Ylöjärvi – ulkomaalaus | Pintanen | Talon maalaus Ylöjärvi – ulkomaalaus, 2 v takuu | Pintanen | 47 → 58 |
| `/tietosuoja/` | Tietosuojaseloste | Pintanen | Tietosuojaseloste – mitä tietoja keräämme | Pintanen | 28 → 52 |
| `/tiilikaton-pinnoitus-akaa/` | Tiilikaton pinnoitus ja maalaus Akaa | Pintanen | Tiilikaton pinnoitus ja maalaus Akaa – 5 v takuu | Pintanen | 47 → 59 |
| `/tiilikaton-pinnoitus-forssa/` | Tiilikaton pinnoitus ja maalaus Forssa | Pintanen | Tiilikaton pinnoitus ja maalaus Forssa – takuu | Pintanen | 49 → 57 |
| `/tiilikaton-pinnoitus-hinta-pirkanmaa/` | Tiilikaton pinnoitus hinta 2027 – hintaesimerkit ja laskuri | Pintanen | Tiilikaton pinnoitus hinta 2027: 2 850–7 000 € | Pintanen | 70 → 57 |
| `/tiilikaton-pinnoitus-huittinen/` | Tiilikaton pinnoitus ja maalaus Huittinen | Pintanen | Tiilikaton pinnoitus ja maalaus Huittinen – takuu | Pintanen | 52 → 60 |
| `/tiilikaton-pinnoitus-ikaalinen/` | Tiilikaton pinnoitus ja maalaus Ikaalinen | Pintanen | Tiilikaton pinnoitus ja maalaus Ikaalinen – takuu | Pintanen | 52 → 60 |
| `/tiilikaton-pinnoitus-juupajoki/` | Tiilikaton pinnoitus ja maalaus Juupajoki | Pintanen | Tiilikaton pinnoitus ja maalaus Juupajoki – takuu | Pintanen | 52 → 60 |
| `/tiilikaton-pinnoitus-kangasala/` | Tiilikaton pinnoitus ja maalaus Kangasala | Pintanen | Tiilikaton pinnoitus ja maalaus Kangasala – takuu | Pintanen | 52 → 60 |
| `/tiilikaton-pinnoitus-kihnio/` | Tiilikaton pinnoitus ja maalaus Kihniö | Pintanen | Tiilikaton pinnoitus ja maalaus Kihniö – takuu | Pintanen | 49 → 57 |
| `/tiilikaton-pinnoitus-lempaala/` | Tiilikaton pinnoitus ja maalaus Lempäälä | Pintanen | Tiilikaton pinnoitus ja maalaus Lempäälä – takuu | Pintanen | 51 → 59 |
| `/tiilikaton-pinnoitus-nokia/` | Tiilikaton pinnoitus ja maalaus Nokia | Pintanen | Tiilikaton pinnoitus ja maalaus Nokia – 5 v takuu | Pintanen | 48 → 60 |
| `/tiilikaton-pinnoitus-orivesi/` | Tiilikaton pinnoitus ja maalaus Orivesi | Pintanen | Tiilikaton pinnoitus ja maalaus Orivesi – takuu | Pintanen | 50 → 58 |
| `/tiilikaton-pinnoitus-palkane/` | Tiilikaton pinnoitus ja maalaus Pälkäne | Pintanen | Tiilikaton pinnoitus ja maalaus Pälkäne – takuu | Pintanen | 50 → 58 |
| `/tiilikaton-pinnoitus-parkano/` | Tiilikaton pinnoitus ja maalaus Parkano | Pintanen | Tiilikaton pinnoitus ja maalaus Parkano – takuu | Pintanen | 50 → 58 |
| `/tiilikaton-pinnoitus-pirkanmaa/` | Tiilikaton pinnoitus Pirkanmaa | 5 v takuu | Pintanen | Tiilikaton pinnoitus Pirkanmaa – hinta, 5 v takuu | Pintanen | 53 → 60 |
| `/tiilikaton-pinnoitus-pirkkala/` | Tiilikaton pinnoitus ja maalaus Pirkkala | Pintanen | Tiilikaton pinnoitus ja maalaus Pirkkala – takuu | Pintanen | 51 → 59 |
| `/tiilikaton-pinnoitus-ruovesi/` | Tiilikaton pinnoitus ja maalaus Ruovesi | Pintanen | Tiilikaton pinnoitus ja maalaus Ruovesi – takuu | Pintanen | 50 → 58 |
| `/tiilikaton-pinnoitus-sastamala/` | Tiilikaton pinnoitus ja maalaus Sastamala | Pintanen | Tiilikaton pinnoitus ja maalaus Sastamala – takuu | Pintanen | 52 → 60 |
| `/tiilikaton-pinnoitus-tampere/` | Tiilikaton pinnoitus ja maalaus Tampere | Pintanen | Tiilikaton pinnoitus ja maalaus Tampere – takuu | Pintanen | 50 → 58 |
| `/tiilikaton-pinnoitus-urjala/` | Tiilikaton pinnoitus ja maalaus Urjala | Pintanen | Tiilikaton pinnoitus ja maalaus Urjala – takuu | Pintanen | 49 → 57 |
| `/tiilikaton-pinnoitus-vesilahti/` | Tiilikaton pinnoitus ja maalaus Vesilahti | Pintanen | Tiilikaton pinnoitus ja maalaus Vesilahti – takuu | Pintanen | 52 → 60 |
| `/tiilikaton-pinnoitus-virrat/` | Tiilikaton pinnoitus ja maalaus Virrat | Pintanen | Tiilikaton pinnoitus ja maalaus Virrat – takuu | Pintanen | 49 → 57 |
| `/tiilikaton-pinnoitus-ylojarvi/` | Tiilikaton pinnoitus ja maalaus Ylöjärvi | Pintanen | Tiilikaton pinnoitus ja maalaus Ylöjärvi – takuu | Pintanen | 51 → 59 |

### Descriptionit

| Polku | Description ennen | Description jälkeen | Merkkiä |
|---|---|---|---|
| `/artikkelit/mokin-ja-piharakennuksen-maalaus/` (uusi sivu) | – | Maalaamme mökit, autotallit ja piharakennukset samoilla työvaiheilla kuin talot. Lue, miksi mökin seinät kuluvat nopeammin ja miten vähennys toimii mökillä. | 0 → 156 |
| `/artikkelit/ormax-tiilikaton-pinnoitus/` (uusi sivu) | – | Ormax on yleisin 2000-luvun kattotiili. Lue, milloin Ormax-katto kannattaa pinnoittaa, miten työ etenee, mitä se maksaa ja mitä valmistaja sanoo hoidosta. | 0 → 154 |
| `/artikkelit/pinnoitus-vai-uusi-katto/` | Jos aluskate ja rakenteet ovat kunnossa, pinnoitus riittää. Kattoremontti maksaa yleensä 15 000–30 000 €, pinnoitus 2 850–7 000 €. Lue, milloin katto pitää uusia. | Jos aluskate ja rakenteet ovat ehjät, pinnoitus riittää. Kattoremontti maksaa yleensä 15 000–30 000 €, pinnoitus 2 850–7 000 €. Lue, milloin katto pitää uusia. | 162 → 159 |
| `/artikkelit/puutalon-ulkomaalin-valinta/` (uusi sivu) | – | Ulkomaali valitaan vanhan maalin mukaan: vesiohenteisen päälle vain vesiohenteinen, öljymaalin päälle kumpi tahansa. Lue, miten tunnistat vanhan maalin. | 0 → 152 |
| `/artikkelit/tiilikaton-pesu-ja-pinnoitus/` | Pesu poistaa sammaleen, mutta kulunut tiili imee vettä heti seuraavalla sateella. Lue, miksi katto maalataan pesun jälkeen, mitä työ maksaa ja kauanko se kestää. | Pesu poistaa sammaleen, mutta kulunut tiili imee vettä seuraavalla sateella. Lue, miksi katto maalataan pesun jälkeen, mitä työ maksaa ja kauanko se kestää. | 161 → 156 |
| `/artikkelit/tiilikaton-pinnoituksen-hinta-2027/` (uusi sivu) | – | Tiilikaton pinnoitus maksaa Pirkanmaalla yleensä 2 850–7 000 €. Lue hintaesimerkit katon koon mukaan, mitä hintaan kuuluu ja mitä vähennys on 2027. | 0 → 147 |
| `/ilmainen-kuntotarkastus/` (uusi sivu) | – | Pyydä ilmainen tiilikaton kuntotarkastus. Eerik katsoo tiilet, saumat, läpiviennit ja aluskatteen, yleensä samalla viikolla. Saat kirjallisen tarjouksen heti. | 0 → 158 |
| `/kotitalousvahennys/` (uusi sivu) | – | Kotitalousvähennys katon pinnoituksesta ja talon maalauksesta: 40 % työn osuudesta, enintään 2 100 € vuodessa, omavastuu 150 €. Samat luvut 2026 ja 2027. | 0 → 153 |
| `/maalauspalvelut-akaa/` | Maalausliike ja kattopalvelut Akaassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Akaassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 150 → 148 |
| `/maalauspalvelut-forssa/` | Maalausliike ja kattopalvelut Forssassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Forssassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 152 → 150 |
| `/maalauspalvelut-hameenkyro/` | Maalausliike ja kattopalvelut Hämeenkyrössä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Hämeenkyrössä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 156 → 154 |
| `/maalauspalvelut-hameenlinna/` | Maalausliike ja kattopalvelut Hämeenlinnassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Hämeenlinnassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 157 → 155 |
| `/maalauspalvelut-huittinen/` | Maalausliike ja kattopalvelut Huittisissa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Huittisissa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 154 → 152 |
| `/maalauspalvelut-ikaalinen/` | Maalausliike ja kattopalvelut Ikaalisissa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Ikaalisissa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 154 → 152 |
| `/maalauspalvelut-juupajoki/` | Maalausliike ja kattopalvelut Juupajoella: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Juupajoella: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 154 → 152 |
| `/maalauspalvelut-kangasala/` | Maalausliike ja kattopalvelut Kangasalla: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Kangasalla: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 153 → 151 |
| `/maalauspalvelut-kihnio/` | Maalausliike ja kattopalvelut Kihniössä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Kihniössä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 152 → 150 |
| `/maalauspalvelut-lempaala/` | Maalausliike ja kattopalvelut Lempäälässä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Lempäälässä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 154 → 152 |
| `/maalauspalvelut-mantta-vilppula/` | Maalausliike ja kattopalvelut Mänttä-Vilppulassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Mänttä-Vilppulassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 161 → 159 |
| `/maalauspalvelut-nokia/` | Maalausliike ja kattopalvelut Nokialla: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Nokialla: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 151 → 149 |
| `/maalauspalvelut-orivesi/` | Maalausliike ja kattopalvelut Orivedellä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Orivedellä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 153 → 151 |
| `/maalauspalvelut-palkane/` | Maalausliike ja kattopalvelut Pälkäneellä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Pälkäneellä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 154 → 152 |
| `/maalauspalvelut-parkano/` | Maalausliike ja kattopalvelut Parkanossa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Parkanossa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 153 → 151 |
| `/maalauspalvelut-pirkkala/` | Maalausliike ja kattopalvelut Pirkkalassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Pirkkalassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 154 → 152 |
| `/maalauspalvelut-ruovesi/` | Maalausliike ja kattopalvelut Ruovedellä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Ruovedellä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 153 → 151 |
| `/maalauspalvelut-sastamala/` | Maalausliike ja kattopalvelut Sastamalassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Sastamalassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 155 → 153 |
| `/maalauspalvelut-tampere/` | Maalausliike ja kattopalvelut Tampereella: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Tampereella: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 154 → 152 |
| `/maalauspalvelut-urjala/` | Maalausliike ja kattopalvelut Urjalassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Urjalassa: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 152 → 150 |
| `/maalauspalvelut-valkeakoski/` | Maalausliike ja kattopalvelut Valkeakoskella: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Valkeakoskella: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 157 → 155 |
| `/maalauspalvelut-vesilahti/` | Maalausliike ja kattopalvelut Vesilahdella: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Vesilahdella: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 155 → 153 |
| `/maalauspalvelut-virrat/` | Maalausliike ja kattopalvelut Virroilla: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Virroilla: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 152 → 150 |
| `/maalauspalvelut-ylojarvi/` | Maalausliike ja kattopalvelut Ylöjärvellä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti ja kirjallinen takuu. | Maalausliike ja kattopalvelut Ylöjärvellä: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu. | 154 → 152 |
| `/yhteystiedot/` | Pintanen Oy:n yhteystiedot: Eerik Pitkänen 040 964 0066 (tiilikatot) ja Eemil Pitkänen 040 164 2233 (talon maalaus). Tampere, Pirkanmaa ja lähikunnat. Arviokäynti on ilmainen. | Yhteystiedot: Eerik Pitkänen 040 964 0066 (tiilikatot) ja Eemil Pitkänen 040 164 2233 (talon maalaus). Pintanen Oy, Tampere ja Pirkanmaa. Ilmainen arviokäynti. | 175 → 159 |

## b) Sivun /ilmainen-kuntotarkastus/ koko näkyvä teksti

Teksti on poimittu rakennetusta sivusta (`dist/ilmainen-kuntotarkastus/index.html`), `<main>`-elementin sisältö
järjestyksessä. Napit on merkitty `[nappi]`. Sivun lopussa ovat samat yhteiset lohkot kuin muilla palvelusivuilla
(Lue lisää aiheesta, Toiminta-alueet, Ota yhteyttä); ne on kuvattu lyhyesti, koska niiden tekstit ovat vanhoja.

Murupolku: Etusivu › Tiilikaton pinnoitus › Ilmainen kuntotarkastus

Yläotsake: Ilmainen kuntotarkastus · Pirkanmaa

**Ilmainen tiilikaton kuntotarkastus Pirkanmaalla** (H1)

Tulemme katsomaan kattosi ilmaiseksi, yleensä samalla viikolla. Käynnin jälkeen saat kirjallisen tarjouksen kiinteällä hinnalla. Tiilikaton pinnoitus maksaa yleensä 2 850–7 000 €, ja takuu on 5 vuotta.

[nappi] Pyydä ilmainen kuntotarkastus · [nappi] Laske hinta

Luottamusluvut: 5,0 / 5 Google-arviot · yli 130 Pinnoitettua kattoa · 5 v Takuu työlle · 0 € Arviokäynti

Eerik tekee työn. Tarkastaa katon itse ja vastaa jäljestä.

### Mitä kuntotarkastuksessa katsotaan?

Eerik käy katon läpi itse. Katsomme seitsemän asiaa.

1. Tiilet: kuluneisuus, halkeamat ja lohkeamat. Rikkinäiset tiilet vaihdamme uusiin pinnoituksen yhteydessä.
2. Saumat ja harjat.
3. Piipun ympärys.
4. Läpiviennit, kuten tuuletusputket.
5. Aluskate: pienet vauriot korjaamme pinnoituksen yhteydessä.
6. Kasvusto: sammal, jäkälä ja lika.
7. Sadevesikourut.

### Mitä saat käynnin jälkeen?

Saat kirjallisen tarjouksen kiinteällä hinnalla. Hintaan kuuluu koko työ: pesu, kasvustontorjunta-aine, rikkinäisten tiilien vaihto uusiin, pohjamaali ja pintamaali ruiskulla sekä siivous. Ylimääräisiä kuluja ei tule.

Työn osuus on laskussa eriteltynä, joten kotitalousvähennyksen hakeminen on helppoa. Vuosina 2026 ja 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 € vuodessa. Omavastuu on 150 €.

Pinnoitukselle saat 5 vuotta kirjallisen takuun. Hintaesimerkit näet sivulta tiilikaton pinnoituksen hinta, ja työn vaiheet kerromme sivulla tiilikaton pinnoitus Pirkanmaalla.

### Milloin tulemme?

Kuntotarkastus onnistuu yleensä samalla viikolla, myös iltaisin ja viikonloppuisin. Sovimme ajan, joka sopii sinulle, koska käymme katon ja tarjouksen läpi yhdessä.

Pinnoitukset teemme huhti–toukokuusta elo–syyskuuhun. Työn ajankohta sovitaan kirjallisesti, kun olet hyväksynyt tarjouksen. Toimimme Pirkanmaalla ja lähikunnissa.

### Usein kysytyt kysymykset

**Maksaako kuntotarkastus jotain?**
Ei. Kuntotarkastus ja kirjallinen tarjous ovat ilmaisia.

**Pitääkö minun olla paikalla?**
Kyllä. Käymme katon ja tarjouksen läpi yhdessä, joten sovimme ajan, joka sopii sinulle. Tulemme myös iltaisin ja viikonloppuisin.

**Saanko hinta-arvion jo ennen käyntiä?**
Kyllä. Hintalaskuri antaa suuntaa antavan arvion katon koon ja jyrkkyyden mukaan. Tarkan, kiinteän hinnan saat kirjallisessa tarjouksessa kuntotarkastuksen jälkeen.

**Mitä jos katto ei tarvitse pinnoitusta?**
Sanomme sen suoraan. Jos tiilen pinta on vielä ehjä, pinnoitus ei ole ajankohtainen. Jos taas aluskate vuotaa tai tiiliä on rikki laajalti, kerromme, että katto kannattaa uusia.

**Milloin tiilikaton pinnoitus on ajankohtainen?**
Yleensä noin 15 vuoden iässä, kun tiilen väri on haalistunut, pinta tuntuu karhealta ja sammal kasvaa nopeasti. Pinnoitettu katto kestää jopa 15 vuotta pidempään.

**Katsotteko samalla myös seinät?**
Kyllä, jos haluat tarjouksen myös talon maalauksesta. Katto ja seinät samalla kertaa on edullisempi pakettihinta.

**Miten maksu tapahtuu?**
Kun hyväksyt tarjouksen, lähetämme ennakkolaskun, joka on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja olemme käyneet sen yhdessä läpi.

Yhteiset lohkot sivun lopussa:

- **Lue lisää aiheesta**: kolme artikkelikorttia (Näin tiilikaton pinnoitus etenee: 6 työvaihetta; Tiilikattoremontti vai pinnoitus: kumpi kannattaa?; Milloin tiilikatto pitää pinnoittaa? 5 merkkiä, että aika on nyt) ja linkki Kaikki artikkelit.
- **Toiminta-alueet**: "Pinnoitamme tiilikattoja ja maalaamme taloja Pirkanmaalla ja lähikunnissa." sekä kuntalistat (Pirkanmaa; Kanta-Häme & Satakunta) ja linkki Kaikki toiminta-alueet.
- **Ota yhteyttä**: "Vastaamme viimeistään seuraavana arkipäivänä.", lomake "Pyydä ilmainen arviokäynti" (Mihin haluat tarjouksen? Tiilikaton pinnoitus / Talon maalaus, tietosuojalause, Lähetä) ja Eerikin yhteystiedot.

## c) Sivun /kotitalousvahennys/ koko näkyvä teksti

Poimittu samalla tavalla tiedostosta `dist/kotitalousvahennys/index.html`.

Murupolku: Etusivu › Kotitalousvähennys

Yläotsake: Kotitalousvähennys · 2026 ja 2027

**Kotitalousvähennys katon pinnoituksesta ja talon maalauksesta** (H1)

Vuosina 2026 ja 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 € vuodessa. Omavastuu on 150 €. Vähennyksen saa yritykseltä ostetun työn osuudesta. Työn osuus on laskussamme eriteltynä.

[nappi] Laske hinta · [nappi] Pyydä ilmainen arviokäynti

Luottamusluvut: 5,0 / 5 Google-arviot · yli 200 Kohdetta · 2–5 v Takuu työlle · 0 € Arviokäynti

### Paljonko kotitalousvähennys on vuosina 2026 ja 2027?

Saat vähentää 40 % työn osuudesta. Työn osuuteen lasketaan mukaan arvonlisävero. Vähennystä saa enintään 2 100 euroa vuodessa yhdeltä ihmiseltä, ja omavastuu on 150 euroa vuodessa.

Verohallinnon mukaan määrä ja omavastuu ovat samat vuosina 2026 ja 2027. Vähennys on jokaisen oma, joten pariskunta voi jakaa laskun ja saada yhteensä 4 200 euroa.

### Mistä töistä vähennyksen saa?

Vähennyksen saa, kun työ on kodin kunnossapitoa tai perusparannusta. Tiilikaton pinnoitus ja talon ulkomaalaus ovat juuri tällaisia töitä. Samat säännöt koskevat vapaa-ajan asuntoa, jota käytät itse.

Vähennyksen saa vain työstä. Maaleista ja muista tarvikkeista sitä ei saa. Yrityksen pitää kuulua ennakkoperintärekisteriin, ja Pintanen kuuluu siihen.

Tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 € ja talon maalaus 3 500–11 000 €. Suuntaa antavan hinnan omalle kohteellesi saat hintalaskurilla. Hintaesimerkit ovat sivuilla tiilikaton pinnoituksen hinta ja talon maalauksen hinta.

### Miten kotitalousvähennystä haetaan?

Säilytä lasku ja kuitti maksusta. Ilmoita vähennys OmaVerossa: jos ilmoitat sen verokortille, veroprosenttisi pienenee heti, ja jos ilmoitat sen veroilmoituksessa, se otetaan huomioon, kun verotuksesi valmistuu. Ilmoitukseen kirjoitetaan yrityksen nimi, Y-tunnus ja maksamasi työn osuus.

Vähennys kuuluu sille vuodelle, jona maksat laskun. Meidän laskussamme työn osuus on omana rivinään, joten luvun voi kopioida suoraan ilmoitukseen.

Lisää vähennyksestä kerromme artikkelissa kotitalousvähennys katto- ja maalaustöissä.

### Usein kysytyt kysymykset

**Paljonko kotitalousvähennys on vuosina 2026 ja 2027?**
Vuosina 2026 ja 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 € vuodessa. Omavastuu on 150 €. Verohallinnon mukaan määrä ja omavastuu ovat samat molempina vuosina.

**Saako tiilikaton pinnoituksesta kotitalousvähennyksen?**
Kyllä. Katon pinnoitus on kodin kunnossapitoa, josta vähennyksen saa. Työn osuus on laskussamme eriteltynä. Hinnat näet sivulta tiilikaton pinnoituksen hinta.

**Saako talon maalauksesta kotitalousvähennyksen?**
Kyllä. Omakotitalon ulkomaalaus on kunnossapitoa, josta vähennyksen saa. Hinnat näet sivulta talon maalauksen hinta.

**Saako vähennyksen myös mökin katosta tai seinistä?**
Kyllä. Verohallinnon mukaan samat säännöt koskevat vapaa-ajan asuntoa, jota käytät itse.

**Mistä vähennystä ei saa?**
Vähennyksen saa vain työn osuudesta. Maaleista ja muista tarvikkeista sitä ei saa. Siksi työn osuus on laskussamme omana rivinään.

**Milloin vähennys pitää hakea?**
Vähennys kuuluu sille vuodelle, jona maksat laskun. Voit ilmoittaa sen OmaVerossa heti verokortille tai myöhemmin veroilmoituksessa.

### Lähteet

- Verohallinto: Kotitalousvähennyksen määrä
- Verohallinto: Mistä töistä vähennyksen saa

Yhteiset lohkot sivun lopussa: Lue lisää aiheesta (artikkeli Kotitalousvähennys katto- ja maalaustöissä 2027: paljonko saat takaisin?), Ota yhteyttä (sama lomake kuin muilla sivuilla, Eerikin ja Eemilin yhteystiedot).

## d) Muutokset vanhoihin, käsin tarkastettuihin teksteihin

Lähde: `git diff origin/main..HEAD` koko ketjusta. Title- ja description-muutokset ovat kohdassa a eikä niitä toisteta
tässä. Pelkkää koodia, schemaa tai ruudunlukijan tekstejä koskevat muutokset on listattu lopussa erikseen. Sarake PR
kertoo, missä paketissa muutos tehtiin.

### Muutetut lauseet

| Polku | Vanha | Uusi | PR |
|---|---|---|---|
| `src/data/faqData.ts` (pinnoitus-UKK "Kuinka kauan…") | Omakotitalon katto valmistuu yleensä 2–4 työpäivässä. Pesun jälkeen katto saa kuivua ennen maalausta. | Peruskohteen katto valmistuu yleensä 2–3 työpäivässä, suuri tai jyrkkä katto 2–4. Pesun jälkeen katto saa kuivua ennen maalausta. | #122 |
| `src/data/faqData.ts` (pinnoitus-UKK "Milloin katto kannattaa pinnoittaa?") | …Yleensä tämä on ajankohtaista, kun katto on noin 10–15 vuotta vanha. Ajoissa tehty pinnoitus estää pakkasrapautumisen. | …Yleensä tämä on ajankohtaista, kun katto on noin 15 vuotta vanha. Ajoissa tehty pinnoitus estää pakkasrapautumisen. | #121 |
| `src/data/faqData.ts` (paikkakuntien pinnoitus-UKK, sama kysymys) | …kun katto on noin 10–15 vuotta vanha. | …kun katto on noin 15 vuotta vanha. | #121 |
| `src/data/faqData.ts` (yleinen UKK "Kuinka kauan työ kestää?") | Tiilikaton pinnoitus kestää yleensä 2–4 työpäivää. Talon ulkomaalaus kestää yleensä 3–7 työpäivää. Työ ei estä normaalia asumista. | Tiilikaton pinnoitus kestää yleensä 2–3 työpäivää. Talon ulkomaalaus kestää yleensä 3–7 työpäivää. Työ ei estä normaalia asumista. | #122 |
| `src/data/faqData.ts` (UKK-vastaus kotitalousvähennyksestä) | Kyllä. [KOTITALOUSVAHENNYS-lause] Työn osuus on laskussa eriteltynä. | Kyllä. [KOTITALOUSVAHENNYS-lause] Työn osuus on laskussa eriteltynä. Lue lisää sivulta kotitalousvähennys. | #125 |
| `src/data/faqData.ts` (paikkakuntasivujen UKK "Milloin pääsette katsomaan katon?" ja "Milloin pääsette maalaamaan?", muut kuin Tampere) | …Työn ajankohta sovitaan kirjallisesti, kun olet hyväksynyt tarjouksen. | …Työn ajankohta sovitaan kirjallisesti, kun olet hyväksynyt tarjouksen. Olemme tamperelainen yritys. [yksi seitsemästä linkkilauseesta, esim. "Pinnoitamme kattoja myös Tampereen alueella."] | #126 |
| `src/components/palvelut/palvelutData.ts` (KESTO, palvelukortit) | 2–4 päivää | 2–3 päivää | #122 |
| `src/pages/ServiceAreaPage.tsx` (alue-UKK "Kuinka kauan työ kestää?") | Tiilikaton pinnoitus kestää yleensä 2–4 työpäivää ja talon maalaus 3–7 työpäivää. Aika riippuu kohteen koosta ja pohjatöiden määrästä. | Tiilikaton pinnoitus kestää yleensä 2–3 työpäivää ja talon maalaus 3–7 työpäivää. Aika riippuu kohteen koosta ja pohjatöiden määrästä. | #122 |
| `src/pages/ServiceAreaPage.tsx` (palvelukortin kesto) | 2–4 päivää | 2–3 päivää | #122 |
| `src/pages/ServiceAreaPage.tsx` (hero, 24 aluesivua) | Pinnoitamme tiilikattoja ja maalaamme taloja [paikkakunnalla]. Teemme työn itse. Tulemme katsomaan kohteen ilmaiseksi. | Pinnoitamme tiilikattoja ja maalaamme taloja [paikkakunnalla]. Teemme työn itse. Tiilikaton pinnoitus maksaa yleensä 2 850–7 000 € ja talon maalaus 3 500–11 000 €. Tulemme katsomaan kohteen ilmaiseksi. | #122 |
| `src/pages/KattopalvelutPinnoitus.tsx` ja `KattopalvelutPinnoitusCity.tsx` (hero) | …maksaa yleensä 2 850–7 000 €, ja takuu on 5 vuotta. Kuntotarkastus on ilmainen. | …maksaa yleensä 2 850–7 000 €, työ kestää 2–3 päivää ja takuu on 5 vuotta. Kuntotarkastus on ilmainen. | #122 |
| `src/pages/TalonMaalaus.tsx` ja `TalonMaalausCity.tsx` (hero) | …maksaa yleensä 3 500–11 000 €, ja takuu on 2 vuotta. Arviokäynti on ilmainen. | …maksaa yleensä 3 500–11 000 €, työ kestää 3–7 päivää ja takuu on 2 vuotta. Arviokäynti on ilmainen. | #122 |
| `src/pages/HinnatTiilikalonPinnoitus.tsx` (johdanto) | …katon koosta, jyrkkyydestä, muodosta ja tiilien kunnosta. Tarkan hinnan saat, kun käymme katsomassa katon. Arviokäynti on ilmainen. | …katon koosta, jyrkkyydestä, muodosta ja tiilien kunnosta. Työ kestää 2–3 päivää, ja takuu on 5 vuotta. Tarkan hinnan saat, kun käymme katsomassa katon. Kuntotarkastus on ilmainen. | #122 |
| `src/pages/HinnatTiilikalonPinnoitus.tsx` (UKK "Milloin pääsette…") | …Työn ajankohta sovitaan kirjallisesti tarjouksen hyväksymisen jälkeen. | …Työn ajankohta sovitaan kirjallisesti tarjouksen hyväksymisen jälkeen. Lue, mitä ilmaisessa kuntotarkastuksessa katsotaan. | #125 |
| `src/pages/HinnatTiilikalonPinnoitus.tsx` ja `HinnatTalonMaalaus.tsx` (UKK kotitalousvähennyksestä) | Kyllä. [KOTITALOUSVAHENNYS-lause] Erittelemme työn ja materiaalit laskulle valmiiksi. | Kyllä. [KOTITALOUSVAHENNYS-lause] Erittelemme työn ja materiaalit laskulle valmiiksi. Lue lisää sivulta kotitalousvähennys. | #125 |
| `src/pages/HinnatTalonMaalaus.tsx` (johdanto) | …koosta, korkeudesta ja pohjatöiden määrästä. Tarkan hinnan saat, kun käymme katsomassa talon. Arviokäynti on ilmainen. | …koosta, korkeudesta ja pohjatöiden määrästä. Työ kestää 3–7 päivää, ja takuu on 2 vuotta. Tarkan hinnan saat, kun käymme katsomassa talon. Arviokäynti on ilmainen. | #122 |
| `src/components/ChatLeadForm.tsx` (chatin vastaus) | Pinnoitus on ajankohtainen noin 10–15 vuoden iässä. Kun tiilen pinta on kulunut… | Pinnoitus on ajankohtainen noin 15 vuoden iässä. Kun tiilen pinta on kulunut… | #121 |
| `src/components/CityHousingFacts.tsx` (paikkakuntasivujen asuntokanta-kappale) | Tiilen tehdaspinta kuluu yleensä 10–15 vuodessa. Jos talossasi on… | Tiilen tehdaspinta kuluu yleensä noin 15 vuodessa. Jos talossasi on… | #121 |
| `src/components/pinnoitus/PinnoitusSamaTyo.tsx` | Katsomme tiilen kuntotarkastuksessa. | Katsomme tiilen ilmaisessa kuntotarkastuksessa. (linkki uudelle sivulle) | #125 |
| `src/components/pinnoitus/PinnoitusSamaTyo.tsx` (linkin teksti paikkakuntasivuilla) | Hintaesimerkit ja laskuri | Katso tiilikaton pinnoituksen hinta [paikkakunnalla] (Pirkanmaa-sivulla ennallaan) | #126 |
| `src/components/CityServiceSummary.tsx` (aluesivujen kortit) | Katso hintaesimerkit | Pinnoituksen hinta [paikkakunnalla] / Maalauksen hinta [paikkakunnalla] | #126 |
| `src/components/Footer.tsx` | Ilmainen kuntotarkastus → /tarjouspyynto/?palvelu=pinnoitus | Ilmainen kuntotarkastus → /ilmainen-kuntotarkastus/; Pintanen-palstaan lisätty viides linkki Kotitalousvähennys | #125 |
| `src/data/routes.ts` (llms.txt) | Työ kestää yleensä 2–4 päivää. | Työ kestää yleensä 2–3 päivää, suuri tai jyrkkä katto 2–4. | #122 |
| `src/data/articles.ts` (milloin-pinnoittaa-tiilikatto, lead) | …Useimmiten näin käy, kun katto on 10–15 vuotta vanha. | …Useimmiten näin käy, kun katto on noin 15 vuotta vanha. | #121 |
| `src/content/articles/milloin-pinnoittaa-tiilikatto.tsx` (UKK) | Tiilen tehdaspinnoite kestää yleensä 10–15 vuotta. Sen jälkeen… | Tiilen tehdaspinnoite kestää yleensä noin 15 vuotta. Sen jälkeen… | #121 |
| `…/milloin-pinnoittaa-tiilikatto.tsx` (Avainkohdat ja H2 5) | Katto on yli 10–15 vuotta vanha eikä sitä ole pinnoitettu | Katto on noin 15 vuotta vanha eikä sitä ole pinnoitettu | #121 |
| `…/milloin-pinnoittaa-tiilikatto.tsx` | …tavallisesti se on ohut 10–15 vuoden jälkeen. | …tavallisesti se on ohut noin 15 vuoden jälkeen. | #121 |
| `…/milloin-pinnoittaa-tiilikatto.tsx` | …Näistä viidestä merkistä näet itse, missä vaiheessa oma kattosi on. | …Näistä viidestä merkistä näet itse, missä vaiheessa oma kattosi on. Esimerkkejä pinnoittamistamme katoista näet sivulta tiilikaton pinnoitus Tampereella. | #126 |
| `…/milloin-pinnoittaa-tiilikatto.tsx` | Omakotitalon katolla tähän menee 2–4 työpäivää, ja annamme työlle 5 vuoden kirjallisen takuun. | Peruskohteen katolla tähän menee 2–3 työpäivää, ja annamme työlle 5 vuoden kirjallisen takuun. | #122 |
| `…/tiilikaton-pinnoituksen-tyovaiheet.tsx` | …kuinka kauan uusi pinta kestää. Näin työ etenee meillä. | …kuinka kauan uusi pinta kestää. Näin työ etenee meillä, oli katto sitten Tampereella tai muualla Pirkanmaalla. | #126 |
| `…/voiko-tiilikaton-pinnoittaa-itse.tsx` | Näin huomaat ajoissa, kun katto tarvitsee huoltoa. | Näin huomaat ajoissa, kun katto tarvitsee huoltoa. Jos haluat meidät katsomaan katon, lue lisää sivulta katon pinnoitus Tampereella. Kuntotarkastus on ilmainen. | #126 |
| `…/huoltomaalaus-vai-uusi-ulkoverhous.tsx` | …Uutta lautaa tarvitaan vain, jos puu on pilalla. | …Uutta lautaa tarvitaan vain, jos puu on pilalla. Näin arvioimme seinät myös talon maalauksessa Tampereella. | #126 |
| `…/kotitalousvahennys-katto-ja-maalaustyot.tsx` (johdanto) | …mistä töistä sen saa ja miten sitä haetaan. | …mistä töistä sen saa ja miten sitä haetaan. Vähennys koskee kaikkia töitämme, esimerkiksi tiilikaton pinnoitusta Tampereella ja talon maalausta Tampereella. | #126 |
| `…/kotitalousvahennys-katto-ja-maalaustyot.tsx` (Note-laatikon otsikko) | Korotus on voimassa määräajan | Korotus on voimassa vuosina 2026 ja 2027 | #124 |
| `…/kotitalousvahennys-katto-ja-maalaustyot.tsx` (Note-laatikko) | Korotus perustuu hallituksen esitykseen. Se koskee laskuja, jotka on maksettu 1.1.2026 alkaen. Verohallinto kertoi kesäkuussa 2026, että muutos vaatii vielä eduskunnan hyväksynnän. Tarkista tuoreet luvut… | Korotus koskee laskuja, jotka on maksettu 1.1.2026 alkaen. Verohallinnon sivun mukaan sama määrä on voimassa myös vuonna 2027. Tarkista tuoreet luvut… | #124 |
| `…/kuinka-usein-puutalo-maalataan.tsx` (UKK hinnasta) | Yksikerroksisen omakotitalon maalaus maksaa meillä noin 3 500–6 000 euroa ja kaksikerroksisen noin 7 000–11 000 euroa. | Yksikerroksisen omakotitalon maalaus maksaa meillä noin 3 500–5 000 euroa ja kaksikerroksisen noin 7 000–11 000 euroa. | #121 |
| `…/kuinka-usein-puutalo-maalataan.tsx` (hintakappale) | Yksikerroksisen omakotitalon maalaus maksaa meillä noin 3 500–6 000 euroa. | Yksikerroksisen omakotitalon maalaus maksaa meillä noin 3 500–5 000 euroa. | #121 |
| `…/kuinka-usein-puutalo-maalataan.tsx` | …tarkista, missä kunnossa se on. | …tarkista, missä kunnossa se on. Esimerkkejä maalaamistamme taloista näet sivulta puutalon maalaus Tampereella. | #126 |
| `…/kuinka-usein-puutalo-maalataan.tsx` | …maalia, vaikka muut näyttävät vielä hyviltä. | …maalia, vaikka muut näyttävät vielä hyviltä. Tikkurilan ohjeen mukaan peittävän ulkomaalin huoltoväli on noin 5–15 vuotta, ja etelä- ja länsiseinät kuluvat nopeimmin. | #121 |
| `…/kuinka-usein-puutalo-maalataan.tsx` | …kuivaa, eli sen kosteus saa olla enintään 20 %. Paras maalaussää on pilvinen ja poutainen päivä. | …kuivaa, eli sen kosteus saa olla enintään 20 %, ja ilman kosteuden pitää olla alle 80 %. Paras maalaussää on pilvinen ja poutainen päivä. | #121 |
| `…/pinnoitus-vai-uusi-katto.tsx` | …vuotta. Tiilen tehdaspinnoite kuluu paljon nopeammin, yleensä 10–15 vuodessa. Kun pinnoite on kulunut… | …vuotta, ja valmistajan mukaan betonitiili kestää huollettuna 50–70 vuotta. Tiilen tehdaspinnoite kuluu paljon nopeammin, yleensä noin 15 vuodessa. Kun pinnoite on kulunut… | #121 |
| `…/pinnoitus-vai-uusi-katto.tsx` | Lue lisää sivulta tiilikaton pinnoitus Pirkanmaalla. | Lue lisää sivulta tiilikaton pinnoitus Pirkanmaalla. Tampereella tehdyistä töistä kerromme sivulla tiilikaton pinnoitus Tampere. | #126 |
| `…/tiilikaton-pesu-ja-pinnoitus.tsx` (H2) | Mitä tiilikaton pesu tekee? | Miksi tiilikatolle kasvaa sammalta? (vanha pesukappale on nyt uuden H2:n "Miten sammal poistetaan tiilikatolta?" alla) | #121 |
| `…/tiilikaton-pesu-ja-pinnoitus.tsx` | Pesun jälkeen levitämme katolle kasvustontorjunta-aineen. Se pitää sammaleen poissa paljon pidempään kuin pelkkä pesu. | Kourujen syöksyihin laitamme suodatinkankaat, jotta sammal ei tuki putkia. Pesun jälkeen levitämme katolle kasvustontorjunta-aineen. Se tappaa itiöt, jotka jäävät tiilen huokosiin, ja pitää sammaleen poissa paljon pidempään kuin pelkkä pesu. Rikkinäiset tiilet vaihdamme uusiin pesun jälkeen, kun ne näkyvät kunnolla. | #121 |
| `…/tiilikaton-pesu-ja-pinnoitus.tsx` | Uuden tiilen pinnalla on tehtaalla tehty tiivis pinta. Se kuluu noin 10–15 vuodessa pois. | Uuden tiilen pinnalla on tehtaalla tehty tiivis pinta. Se kuluu noin 15 vuodessa pois. | #121 |
| `…/tiilikaton-pesu-ja-pinnoitus.tsx` | …ajankohtaista noin 10–15 vuoden iässä. Teemme pinnoituksia… | …ajankohtaista noin 15 vuoden iässä. Teemme pinnoituksia… | #121 |
| `…/tiilikaton-pesu-ja-pinnoitus.tsx` (loppu) | …sivulta tiilikaton pinnoitus Pirkanmaalla. | …sivulta tiilikaton pinnoitus Pirkanmaalla tai kotikaupunkimme sivulta tiilikaton pesu ja pinnoitus Tampereella. | #126 |
| `src/data/prices.ts` (hintakorttien "alk." kotitalousvähennyksen jälkeen, pinnoitus) | alk. 2 050 € / alk. 2 380 € / alk. 2 700 € | alk. 1 940 € / alk. 2 240 € / alk. 2 550 € | tämä PR |
| `src/data/prices.ts` (maalaus, 2-kerroksinen talo) | alk. 4 760 € | alk. 4 900 € (muut kaksi maalauskorttia ennallaan: 2 380 € ja 3 400 €) | tämä PR |
| `src/components/laskuri/PriceWizard.tsx` (/hintalaskuri/, tulosruutu) | Kotitalousvähennyksen jälkeen: [hinta] | Kotitalousvähennyksen jälkeen: [hinta] + pieni teksti "Omavastuu 150 € vuodessa, jos et ole käyttänyt sitä muihin töihin." Luku lasketaan nyt ilman omavastuuta. | tämä PR |
| `src/components/ChatPriceCalculator.tsx` (etusivun chat) | (ei vähennysriviä) | Uusi viesti kiitosviestin jälkeen: "Kotitalousvähennyksen jälkeen: [hinta]. Omavastuu 150 € vuodessa, jos et ole käyttänyt sitä muihin töihin." | tämä PR |
| `src/components/vahennys/VahennysE.tsx` (hintasivujen vähennysesimerkki) | Urakkahinta 4 000 € / Materiaalit 1 000 € / Työn osuus 3 000 € / 40 % työstä 1 200 € / Omavastuu −150 € / Kotitalousvähennys 1 050 €. "Luvut ovat esimerkki; vähennys tehdään verotuksessa." | Omavastuurivi poistettu, Kotitalousvähennys 1 200 €. "Luvut ovat esimerkki; vähennys tehdään verotuksessa. Omavastuu 150 € vuodessa, jos et ole käyttänyt sitä muihin töihin." (Eerik 26.10.2026, vastaus kysymykseen 1) | tämä PR |

### Lisätyt osiot, UKK-kohdat ja Avainhuomiot vanhoihin artikkeleihin (vanhoja lauseita ei poistettu)

| Polku | Lisätty | PR |
|---|---|---|
| `…/kotitalousvahennys-katto-ja-maalaustyot.tsx` | UKK "Näkyykö työn osuus laskussa?"; taulukko (40 %, 2 100 €, 150 €, pariskunta 4 200 €); H2 "Mitä laskustamme pitää katsoa?" (2 kappaletta); 2 Avainhuomiota | #121, #124 |
| `…/kuinka-usein-puutalo-maalataan.tsx` | UKK "Kannattaako talo maalata, vaikka maali ei vielä hilseile?"; H2 "Miksi odottaminen tulee kalliimmaksi?" (2 kappaletta, linkki huoltomaalaus-artikkeliin); 3 Avainhuomiota; 2 Tikkurila-lähdettä | #121, #124 |
| `…/pinnoitus-vai-uusi-katto.tsx` | UKK "Saako kattoremontista ja pinnoituksesta kotitalousvähennyksen?"; vertailutaulukko (pinnoitus 2 850–7 000 € / 2–3 päivää / jopa 15 vuotta; kattoremontti 15 000–30 000 € / viikkoja / uusi katto); H2 "Miten kotitalousvähennys vaikuttaa vertailuun?"; 2 Avainhuomiota; lähteet BMI ja Verohallinto | #121, #124 |
| `…/tiilikaton-pesu-ja-pinnoitus.tsx` | Avainkohta "Sammal kasvaa tiilikatolle, kun tehdaspinta on kulunut, yleensä noin 15 vuoden iässä."; UKK "Miksi sammal palaa katolle pesun jälkeen?" ja "Vahingoittaako sammal tiilikattoa?"; H2:t "Miksi tiilikatolle kasvaa sammalta?", "Mitä sammal tekee tiilikatolle?", "Miten sammal poistetaan tiilikatolta?", "Mitä voit tehdä itse sammaleen estämiseksi?" (lista + kappale); kuva "Sammaleinen tiilikatto ennen pesua ja pinnoitusta"; 2 Avainhuomiota | #121, #124 |
| `…/milloin-pinnoittaa-tiilikatto.tsx` | 3 Avainhuomiota | #124 |
| `…/tiilikaton-pinnoituksen-tyovaiheet.tsx` | 3 Avainhuomiota | #124 |
| `…/voiko-tiilikaton-pinnoittaa-itse.tsx` | 2 Avainhuomiota | #124 |
| `…/huoltomaalaus-vai-uusi-ulkoverhous.tsx` | 2 Avainhuomiota | #124 |
| `src/data/faqData.ts` | Pinnoitus-UKK: "Saanko hinta-arvion ennen kuntotarkastusta?", "Milloin pääsette katsomaan katon?", "Miten maksu tapahtuu?"; maalaus-UKK: "Kuinka kauan talon maalaus kestää?", "Milloin pääsette maalaamaan?", "Miten maksu tapahtuu?" | #122 |
| `src/pages/Meista.tsx` | Kappale "Kotikaupungissamme Eerik pinnoittaa tiilikattoja Tampereella ja Eemil maalaa puutaloja Tampereella. Samalla tavalla teemme työt Pirkanmaalla ja lähikunnissa." | #126 |
| `src/components/article/ArticleLayout.tsx` (tekijälaatikko) | Rivi puhelinnumero · sähköposti tittelin alle | #124 |
| `src/data/articles.ts` | Artikkelien `updatedAt` 26.10.2026 ja lukuajat päivitetty laajennetuille artikkeleille; jonon päivät siirretty: voiko-tiilikaton-pinnoittaa-itse 3.11. → ma 2.11., tiilikaton-pesu-ja-pinnoitus 10.11. → to 5.11. | #121, tämä PR |

Avainhuomioiden tekstit (kaikki johdettu sivuston omista luvuista): "Pintamaali levitetään pensselillä, ja saat maalaukselle 2 vuoden takuun."; "Omakotitalon maalaus maksaa yleensä 3 500–11 000 € ja kestää 3–7 päivää."; "Pinnoitettu katto hylkii vettä ja kestää jopa 15 vuotta pidempään."; "Pinnoitus on ajankohtainen noin 15 vuoden iässä, kun tehdaspinnoite on kulunut."; "Peruskohteen katto valmistuu 2–3 työpäivässä, ja takuu on 5 vuotta."; "Kuntotarkastus on ilmainen, ja sen jälkeen saat kirjallisen tarjouksen kiinteällä hinnalla."; "Katto maalataan aina kahteen kertaan: ensin pohjamaali, sitten pintamaali, ja maali on Nowocoat."; "Peruskohteen katto valmistuu 2–3 työpäivässä, ja siirretystä sadepäivästä ei tule lisäkuluja."; "Meillä katto maalataan ruiskulla kahteen kertaan, ja työlle on 5 vuoden kirjallinen takuu."; "Yritykseltä ostetun työn osuudesta saat kotitalousvähennyksen 40 %, enintään 2 100 € vuodessa."; "Vuosina 2026 ja 2027 vähennys on 40 % työn osuudesta, enintään 2 100 € vuodessa."; "Katon pinnoitus ja talon ulkomaalaus ovat kodin kunnossapitoa, josta vähennyksen saa. Omavastuu on 150 € vuodessa."; "Puutalo maalataan yleensä 10–15 vuoden välein, ja aurinkoisin seinä kuluu ensin."; "Pohjamaali tulee paljaisiin puukohtiin ja pintamaali pensselillä. Takuu on 2 vuotta."; "Tiilen tehdaspinnoite kuluu noin 15 vuodessa, vaikka tiili itse kestää jopa 70 vuotta."; "Pinnoitus maksaa yleensä 2 850–7 000 €, kattoremontti yleensä 15 000–30 000 €."; "Tiilen tehdaspinta kuluu noin 15 vuodessa, ja sen jälkeen vain uusi maalipinta pitää veden pois."; "Hinta on yleensä 2 850–7 000 €, ja työn osuudesta saat kotitalousvähennyksen."

### Muutokset, jotka eivät näy lukijalle

- Ruudunlukijan tekstit (`sr-only`) neljässä vähennyslohkon variantissa: ": kotitalousvähennys katto- ja maalaustöissä" → ": kotitalousvähennys katon pinnoituksesta ja talon maalauksesta" (#124).
- `aria-label` "Lue Pintasen Google-arviot" poistettu kahdesta herosta ja palvelukorttien `aria-label` poistettu, koska linkin näkyvä teksti riittää (#123).
- Schema: palvelusivujen `Service`-schemaan lisätty `provider.name`, Google-profiilin `sameAs` ja kunnan Wikipedia-sivu `areaServed.sameAs` (#124); artikkelin tekijään puhelin ja sähköposti (#124).
- `llms.txt`: jokaisesta paikkakuntasivusta oma rivi kuvauksineen, uudet sivut ja artikkelilista mukaan (#122, #125).
- Koodikommentit (Footer, PinnoitusSamaTyo, CityServiceSummary, prices.ts, vahennysData.ts).

## e) Hintalaskurin vähennysrivin kaava ja esimerkit

Kaava (`hintaVahennyksenJalkeen`, `src/components/vahennys/vahennysData.ts`), sama hintakorttien "alk."-luvuissa:

1. Työn osuus = 80 % hinnasta (materiaalit noin 20 %, lukua ei kirjoiteta sivuille).
2. Vähennys = 40 % työn osuudesta, enintään 2 100 € (yksi maksaja). Omavastuuta ei vähennetä; se kerrotaan rivin alla.
3. Hinta vähennyksen jälkeen = hinta − vähennys, pyöristettynä lähimpään 10 euroon.

Lähde prosentille ja enimmäismäärälle: Verohallinto, tarkistettu 26.10.2026 (`docs/lahteet-kotitalousvahennys-2026-10-27.md`): 40 % työn osuudesta, enintään 2 100 € henkilöltä vuodessa, omavastuu 150 € henkilöltä vuodessa, samat vuosina 2026 ja 2027.

| Hinta | Työn osuus (80 %) | 40 % työstä | Vähennys (enintään 2 100 €) | Hinta vähennyksen jälkeen |
|---|---|---|---|---|
| 2 850 € | 2 280 € | 912 € | 912 € | **1 940 €** (2 850 − 912 = 1 938 → 1 940) |
| 3 500 € | 2 800 € | 1 120 € | 1 120 € | **2 380 €** |
| 7 000 € | 5 600 € | 2 240 € | 2 100 € (katto) | **4 900 €** |

Laskureissa rivi näyttää haarukan: alaraja ja yläraja lasketaan erikseen samalla kaavalla (esim. 2 850–7 000 € → 1 940–4 900 €).
Yksikkötestit `src/test/hintalaskuri.test.tsx` tarkistavat nämä luvut sekä rivit 5 000 € → 3 400 € ja 11 000 € → 8 900 €.

Hintasivujen vähennysesimerkki (`VahennysE`) laskee samalla säännöllä: työn osuus on esimerkissä annettu (3 000 €), 40 % siitä on 1 200 €, omavastuuta ei vähennetä. Testi `src/test/vahennysEsimerkki.test.tsx` tarkistaa sen.

Hintakorttien "alk."-luvut samalla kaavalla (vanha → uusi):

| Kortti | Normaalihinta alk. | Vanha "alk." | Uusi "alk." |
|---|---|---|---|
| Pinnoitus 150–180 m² | 2 850 € | 2 050 € (35 %) | 1 940 € |
| Pinnoitus 190–240 m² | 3 300 € | 2 380 € (35 %) | 2 240 € |
| Pinnoitus 250–300 m² | 3 750 € | 2 700 € (35 %) | 2 550 € |
| Maalaus 1-kerroksinen | 3 500 € | 2 380 € | 2 380 € (ennallaan) |
| Maalaus 1,5-kerroksinen | 5 000 € | 3 400 € | 3 400 € (ennallaan) |
| Maalaus 2-kerroksinen | 7 000 € | 4 760 € (ilman 2 100 € kattoa) | 4 900 € |

## Kysymykset

1. Hintasivujen vähennysesimerkki (Urakkahinta 4 000 €, materiaalit 1 000 €, työn osuus 3 000 €, 40 % työstä 1 200 €, omavastuu −150 €, kotitalousvähennys 1 050 €) vähentää yhä omavastuun. Jätetäänkö se niin, koska se on vuositason esimerkki, vai poistetaanko omavastuurivi, jolloin tulos olisi 1 200 €?
2. Maalauksen 2-kerroksisen talon kortin "alk."-hinta nousi 4 760 → 4 900 €, koska vanha luku ei ottanut 2 100 euron kattoa huomioon. Käykö uusi luku?
3. Kotitalousvähennysartikkeli sanoo "Saat täydet 2 100 euroa, kun maksat vuoden aikana työstä 5 625 euroa." Luku sisältää omavastuun (40 % × 5 625 − 150 = 2 100). Jätetäänkö lause ennalleen? Se on oikein verotuksen kannalta, mutta laskurit laskevat ilman omavastuuta.
4. Etusivun chatissa vähennysrivi tulee omana viestinään kiitosviestin jälkeen. Käykö se, vai haluatko sen samaan viestiin?
5. Artikkelijonossa on nyt aukko: 2.11. ja 5.11. jälkeen seuraava artikkeli on vasta to 19.11. (sitten ma 23.11., to 26.11., ma 30.11.). Siirretäänkö 19.11. ja 23.11. viikolle 9.–12.11., jolloin kahden artikkelin viikkotahti jatkuu?

## Eerikin vastaukset 26.10.2026 ja toteutus

1. Sama kaava: omavastuurivi poistettu hintasivujen esimerkistä, tulos 1 050 € → 1 200 €, omavastuulause esimerkin alle (`src/components/vahennys/VahennysE.tsx`).
2. Ok: maalauskortin "alk." 4 900 € pysyy.
3. Ok: artikkelin lause "5 625 euroa" pysyy ennallaan.
4. Oma viesti: chatin vähennysrivi pysyy omana viestinään.
5. Ok: artikkelit siirretty: tiilikaton pinnoituksen hinta 2027 to 19.11. → ma 9.11., Ormax ma 23.11. → to 12.11. Jono on nyt ma 2.11., to 5.11., ma 9.11., to 12.11., to 26.11., ma 30.11. (`src/data/articles.ts`).
