# Kuvasuunnitelma 28.10.2026

Eerikin pyyntö 28.10.2026: tarkasta kuvatilanne tiilikaton pinnoituksen ja talon maalauksen sivuilta sekä
hintasivuilta, käy läpi kaikki käytettävissä olevat kuvat ja ehdota parempia kuvia ja lisää kuvia tekstien
sekaan. Tämä on ehdotus, ei päätös. Toteutus vasta Eerikin ok:lla.

Kuvat ovat kansiossa `public/images/Pictures-400|600|800|1200/`. Numerot viittaavat arkkien numerointiin
(147 kuvaa aakkosjärjestyksessä, 78 maalauskuvaa ja 68 kattokuvaa). Perusnimi on sulkeissa.

## Nykytila

| Sivu | Kuvat nyt | Huomio |
| --- | --- | --- |
| /tiilikaton-pinnoitus-pirkanmaa/ | Hero (99 kirkkaan punainen), yksi liukusäädin (80 likainen → 132 uudenveroinen), yksi kuva vertailussa (85 tummanharmaa kattotiili), Eerikin kasvokuva kahdesti | Kolme kohdekuvaa pitkällä sivulla. Työvaiheet, luulot ja "sama työ" ovat pelkkää tekstiä. |
| /talon-maalaus-pirkanmaa/ | Hero (53 tummansininen), yksi liukusäädin (14 keltainen → 67 violetti), yksi kuva vertailussa (16 keltainen ulkoverhous), Eemilin kasvokuva | Sama tilanne: kolme kohdekuvaa. Talotyypit ovat neljä tekstikorttia ilman kuvaa. |
| /tiilikaton-pinnoitus-hinta-pirkanmaa/ | Hero (83 sammaleenpoisto), toteutuneet hinnat (2 korttia) | Hinnan tekijät, mitä hintaan kuuluu ja vertailu ovat tekstiä. |
| /talon-maalaus-hinta-pirkanmaa/ | Hero (55 kartanomainen), toteutuneet hinnat (4 korttia) | Sama. |

Referenssisivu ja kaupunkisivut käyttävät lähes kaikki 147 kuvaa. Palvelusivut käyttävät niistä vain kuutta.
Kuvia siis on, ne ovat vain väärässä paikassa.

## Mitä kuvista löytyi

**Vahvimmat kuvat** (koko talo ja katto, hyvä valo): 96 Kangasalan keltainen talo, 142 Ylöjärven keltainen
talo, 141 vihreä talo ja punainen katto, 98 Kangasalan vaalea talo, 10 Tampereen puutalo (katto ja seinät),
55 kartanomainen talo, 50 koristeikkunatalo jälkeen, 34 rintamamiestalo jälkeen, 71 Virtain hirsimökki,
17 moderni tumma talo.

**Työkuvat**, joita palvelusivut eivät käytä: 83 sammaleenpoisto, 84 pesu kesken Tampere, 81 ja 87 puoliksi
pesty katto, 139 varatiilien maalaus, 92, 93 ja 95 harjatiivisteen asennus, 94 ja 121 aurinkopaneelien
suojaus, 122 Eerik katolla, 31 homepesu ja sokkelin suojaus, 37 Eemil tikkailla hilseilevällä seinällä,
11 ja 78 ympäristön suojaus, 51 seinien maalaus telineiltä, 47 ja 48 hilseilevä ulkoverhous läheltä ennen
ja jälkeen.

**Toistuvat kuvat**: harjalta kuvattuja tummanharmaita kattoja pinnoituksen jälkeen on toistakymmentä
(102, 105, 110, 112, 115, 126, 131, 135, 140, 143). Ne ovat hyviä referenssisivulla, mutta palvelusivulle
riittää yksi.

**Tarkistettavat**: 54 (pensseli ja hansikas, `talon-maalaus-ulkoverhous-pensselilla-maalari`) näyttää
kuvapankkikuvalta. Jos se ei ole oma kuva, se korvataan omalla. 41 (`talon-maalaus-pensseli`) on grafiikka,
ei valokuva.

**Lähes kaikki kuvat ovat pystykuvia** puhelimella. Vaakapaikoissa (hero, liukusäädin) ne rajautuvat
tiukasti. Uudet kuvat kannattaa ottaa vaakana.

## Ehdotus: kuvat tekstien sekaan

### 1. Työvaiheet kuvina (molemmat palvelusivut ja kaupunkisivut)

Työvaihekortit (`ProcessList`) saavat kuvan kortin yläreunaan. Sama data `tyovaiheet.ts`:ssä, uusi kenttä
`kuva`. Vaihe ilman kuvaa näyttää vain numeron.

| Pinnoitus | Kuva |
| --- | --- |
| 1 Ilmainen kuntotarkastus | 122 Eerik katolla |
| 2 Sopimus ja aikataulu | ei kuvaa (tai uusi kuva: tarjous ja kynä) |
| 3 Suojaus | 121 aurinkopaneelit suojattuna |
| 4 Pesu painepesulla | 84 pesu kesken Tampere |
| 5 Rikkinäisten tiilien vaihto | 139 varatiilien maalaus |
| 6 Maalaus ruiskulla kahteen kertaan | 136 pinnoitettu pinta läheltä, kunnes ruiskutuskuva on olemassa |
| 7 Lopputarkastus ja takuu | 142 Ylöjärven keltainen talo |

| Maalaus | Kuva |
| --- | --- |
| 1 Ilmainen arviokäynti ja tarjous | 45 hilseilevä pääty ennen |
| 2 Suojaus | 78 ympäristön suojaus |
| 3 Homepesu | 31 homepesu käynnissä |
| 4 Kaavinta | 47 hilseilevä ulkoverhous läheltä |
| 5 Pohjamaali paljaisiin kohtiin | 48 sama kohta maalattuna |
| 6 Pintamaali pensselillä | 51 seinien maalaus telineiltä |
| 7 Lopputarkastus ja takuu | 50 koristeikkunatalo jälkeen |

### 2. Luulot kuvina (`Vaarinymmarrykset`)

Jokainen luulo saa pienen kuvan, joka näyttää sen, mistä puhutaan.

- Pinnoitus: haalistunut katto 90, sammaleinen katto 89, pesu ei riitä 87 (puoliksi pesty).
- Maalaus: hilseilevä maali 47, ei kiire 16 (hyväkuntoinen huoltomaalattu seinä), mustat pilkut 15.

### 3. Talotyypit kuvina (`MaalausTalotyypit`)

Rintamamiestalo 34, hirsitalo 71, mökki ja piharakennukset 28 tai 75, kivitalon puuosat: kuvaa ei ole.

### 4. Kuvanosto tekstipalstaan

Pitkiin tekstilohkoihin (`PinnoitusSamaTyo`, `MaalausSanasto`, kaupunkisivujen paikallinen teksti) yksi
kelluva kuva kuvatekstillä, lehden tapaan: tietokoneella tekstin oikealla puolella noin 40 % leveydellä,
puhelimella tekstin välissä. Uusi pieni komponentti `Kuvanosto` (figure ja figcaption). Esimerkiksi
"sama työ" -lohkoon 127 (pinnoitettu pinta läheltä) ja sanastoon 48.

### 5. Hintasivut

- "Mitä hintaan kuuluu" -kortin viereen kuva: pinnoitus 139 (tiilien vaihto), maalaus 31 (homepesu).
- Vertailukortit "pinnoitus vai uusi katto": pinnoitus-puolelle 132.
- Hintasivun hero: pinnoituksen 83 on hyvä (pesu käynnissä). Maalauksen 55 on sivuston paras talokuva ja
  sopisi paremmin talon maalauksen pääsivun heroksi; hintasivulle tilalle 50 tai 34.

### 6. Hero-kuvat

- Pinnoitus 99: hyvä, pidetään.
- Maalaus 53 (tummansininen talo hämärässä) on tumma ja rajautuu tiukasti. Tilalle 55 kartanomainen tai
  34 rintamamiestalo auringossa.

## Kuvat, joita puuttuu (Eerikin kuvattavaksi, vaakana)

1. Rikkinäisen tiilen vaihto läheltä (käsi ja tiili).
2. Ruiskumaalaus käynnissä (Eerik ruiskuttaa, maali tuoreena). Etusivun hero-kuva on ainoa.
3. Kuntotarkastus: aluskate, läpivienti tai piipun juuri läheltä.
4. Kaavinta läheltä (kaavin kädessä, maali irtoaa).
5. Pohjamaalaus paljaalle puulle.
6. Pensseli seinällä, oma kuva (korvaa 54).
7. Telineet tai nostin korkealla päädyllä.
8. Kivitalon puuosat (räystäs, ikkunat, kuisti) ennen ja jälkeen.
9. Valmis talo kadulta, katto ja seinät samassa kuvassa, vaakana.
10. Eerik ja Eemil yhdessä, työvaatteissa, auton tai telineen edessä.
11. Maalipurkki tai maaliastia työmaalla (Nowocoat, Tikkurila).

## Toteutusjärjestys ehdotuksena

1. Työvaiheet kuvina (suurin vaikutus, 14 kuvaa kahdelle sivulle ja kaikille kaupunkisivuille).
2. Luulot ja talotyypit kuvina.
3. Kuvanosto tekstipalstoihin.
4. Hero- ja hintasivujen vaihdot.
5. Uudet kuvat sitä mukaa kuin Eerik ehtii kuvata.
