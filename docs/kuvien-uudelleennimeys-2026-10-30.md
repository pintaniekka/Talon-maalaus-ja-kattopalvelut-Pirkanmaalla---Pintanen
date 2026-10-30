# Seinäreferenssit täysikokoisista kuvista 30.10.2026

Eerik toimitti Eemilin seinäreferenssit täysikokoisina (iPhone, 3024×4032 ja 4284×5712, viisi zip-tiedostoa, 18 eri kuvaa). Sivuston vanhat versiot olivat käsin pakattuja ja lisäksi uudelleenpakattuja laatuun 75 (`pakkaa_kuvat.py`, 12.10.2026): esimerkiksi tummansinisen talon 1200 px:n kuva oli 34 kt.

## Mitä tehtiin

- Kuvat tunnistettiin sivuston kuviksi sisällön perusteella (dHash ja silmämääräinen vertailu), ei tiedostonimistä.
- Display P3 -värit muunnetaan nyt sRGB:ksi (`scripts/lisaa_kuva.py`). Aiemmin väriprofiili hylättiin, ja värit haalistuivat.
- Neljä paria kohdistettiin päällekkäin (OpenCV, SIFT + homografia; punainen–harmaa jäykällä muunnoksella, koska terassilautojen toistuva kuvio harhautti homografian) ja rajattiin samaan alueeseen. Ne ovat nyt liukusäätimiä (`pair`) Referenssit-sivulla. Tarkistus: 50/50-sekoituksessa ikkunat, tolpat ja kaiteet ovat teräviä.
- Tampereen ja Hämeenlinnan parit on kuvattu eri kulmista, joten ne jäävät vierekkäin.
- Paikkakunta lisättiin nimeen vain, kun se on jo `src/data/referenssit.ts`:ssä. Muuten nimessä on `pirkanmaa` tai ei paikkaa.
- Täysikokoinen alkuperäinen (pidempi sivu 2400 px, JPEG 88) on kansiossa `public/images/alkuperaiset/`, ja tuotannossa kuvat haetaan Cloudflaren kuvamuunnoksen kautta (`src/lib/storage.ts`). WebP-koot (laatu 80) ovat esikatseluiden ja testien varaversiot.
- Vanhat osoitteet ohjataan 301:llä uusiin (`public/_redirects`). 26.10. tehdyt ohjaukset osoittavat suoraan uusiin nimiin, joten ketjuja ei synny.

## Nimet

| Ladattu | Vanha nimi | Uusi nimi |
|---|---|---|
| IMG_3379 | talon-maalaus-tummansininen-puutalo-ulkomaalaus-ennen | talon-maalaus-hameenkyro-tummansininen-puutalo-ennen |
| IMG_3414 | talon-maalaus-tummansininen-puutalo-ulkomaalaus-jalkeen | talon-maalaus-hameenkyro-tummansininen-puutalo-jalkeen |
| IMG_4417 | talon-maalaus-punainen-omakotitalo-varinvaihto-ennen | talon-maalaus-pirkanmaa-varinvaihto-punaisesta-harmaaksi-ennen |
| IMG_4485 | talon-maalaus-harmaa-omakotitalo-varinvaihto-jalkeen | talon-maalaus-pirkanmaa-varinvaihto-punaisesta-harmaaksi-jalkeen |
| IMG_3846 | talon-maalaus-keltainen-puuverhous-ennen-julkisivumaalausta | talon-maalaus-pirkanmaa-keltainen-ulkoverhous-huoltomaalaus-ennen |
| IMG_3871 | talon-maalaus-keltainen-ulkoverhous-huoltomaalaus-jalkeen | talon-maalaus-pirkanmaa-keltainen-ulkoverhous-huoltomaalaus-jalkeen |
| IMG_4555 | talon-maalaus-puutalo-ja-parveke-ennen-maalausta | talon-maalaus-ylojarvi-puutalo-ja-parveke-ennen |
| IMG_4666 | talon-maalaus-puutalo-ja-parveke-huoltomaalaus-jalkeen | talon-maalaus-ylojarvi-puutalo-ja-parveke-jalkeen |
| IMG_3938 | talon-maalaus-keltainen-puutalo-varinvaihto-ennen | talon-maalaus-tampere-varinvaihto-keltainen-puutalo-ennen |
| IMG_4045 | talon-maalaus-violetti-puutalo-varinvaihto-peittomaalaus-jalkeen | talon-maalaus-tampere-varinvaihto-violetti-puutalo-jalkeen |
| IMG_3258 | talon-maalaus-keltainen-omakotitalo-huoltomaalaus-ennen | talon-maalaus-hameenlinna-keltainen-omakotitalo-ennen |
| IMG_3200 | talon-maalaus-keltainen-omakotitalo-julkisivumaalaus-jalkeen | talon-maalaus-hameenlinna-keltainen-omakotitalo-jalkeen |
| IMG_3698 | talon-maalaus-ympariston-suojaus-ennen-maalausta | ennallaan (vain laatu) |
| IMG_3700 | talon-maalaus-julkisivun-ja-ikkunoiden-suojaus | ennallaan (vain laatu) |

Uudet kuvat, joita ei vielä käytetä sivuilla (Eerik 30.10.2026: lisätään kuviksi, sijoitetaan myöhemmin):

| Ladattu | Nimi |
|---|---|
| IMG_3949 | talon-maalaus-tampere-varinvaihto-keltainen-puutalo-ennen-toinen-kulma |
| IMG_4033 | talon-maalaus-tampere-varinvaihto-parvekkeen-suojaus |
| IMG_3776 | talon-maalaus-raystaan-ja-seinan-rajan-suojaus-teipilla |
| IMG_3785 | talon-maalaus-seinan-alaosan-ja-pihan-suojaus-muovilla |

## Cloudflaren kuvamuunnos

- Toimii vain pintanen.fi-domainilla, kun Images > Transformations on päällä (Cloudflaren hallintapaneeli). `pages.dev`-esikatseluissa se ei toimi (virhe 9524), joten esikatselu näyttää WebP-varakoot.
- Ilmainen taso: 5 000 erilaista muunnosta kuukaudessa (`format` ja `quality` eivät lisää määrää). Rajan ylittyessä uudet muunnokset epäonnistuvat, mutta laskua ei tule; `onerror=redirect` näyttää silloin alkuperäisen.
- Pages-ympäristömuuttuja `KUVAMUUNNOS=0` kytkee muunnoksen pois ilman koodimuutosta.
- `robots.txt` sallii `/cdn-cgi/image/` (muu `/cdn-cgi/` on edelleen estetty).
- `scripts/verify_live.py` tarkistaa tuotannossa, että jokainen muunnos palauttaa kuvan eikä ohjaa alkuperäiseen.
- `lastmod.json`: tiiviste normalisoi muunnososoitteet WebP-osoitteiksi, joten paikallinen ja tuotantobuild antavat saman päivämäärän.
