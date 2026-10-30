# Seinäreferenssit täysikokoisista kuvista 30.10.2026

Eerik toimitti Eemilin seinäreferenssit täysikokoisina (iPhone, 3024×4032 ja 4284×5712, viisi zip-tiedostoa, 18 eri kuvaa). Sivuston vanhat versiot olivat käsin pakattuja ja lisäksi uudelleenpakattuja laatuun 75 (`pakkaa_kuvat.py`, 12.10.2026): esimerkiksi tummansinisen talon 1200 px:n kuva oli 34 kt.

## Mitä tehtiin

- Kuvat tunnistettiin sivuston kuviksi sisällön perusteella (dHash ja silmämääräinen vertailu), ei tiedostonimistä.
- Display P3 -värit muunnetaan nyt sRGB:ksi (`scripts/lisaa_kuva.py`). Aiemmin väriprofiili hylättiin, ja värit haalistuivat.
- Neljä paria kohdistettiin päällekkäin (OpenCV, SIFT + homografia; punainen–harmaa jäykällä muunnoksella, koska terassilautojen toistuva kuvio harhautti homografian) ja rajattiin samaan alueeseen. Ne ovat nyt liukusäätimiä (`pair`) Referenssit-sivulla. Tarkistus: 50/50-sekoituksessa ikkunat, tolpat ja kaiteet ovat teräviä.
- Tampereen ja Hämeenlinnan parit on kuvattu eri kulmista, joten ne jäävät vierekkäin.
- Paikkakunta lisättiin nimeen vain, kun se on jo `src/data/referenssit.ts`:ssä. Muuten nimessä on `pirkanmaa` tai ei paikkaa.
- Täysikokoinen alkuperäinen (pidempi sivu 2400 px, JPEG 88) on kansiossa `alkuperaiset/` repon juuressa (ei julkaista). Siitä on tehty AVIF-koot (laatu 56) ja WebP-koot (laatu 80, varamuoto); ks. alla.
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

## AVIF: oma koodaus Cloudflaren muunnoksen sijaan (Eki 30.10.2026)

Cloudflaren kuvamuunnos (`/cdn-cgi/image/`) oli käytössä 30.10. PR #202:sta ja korvattiin samana päivänä omilla AVIF-tiedostoilla, koska mittaus näytti oman koodauksen paremmaksi.

**Mittaus** (neljä seinäkuvaa, SSIM alkuperäiseen verrattuna):

- Cloudflaren AVIF:n laatu–koko-käyrän taitekohta oli laatu 65 (600 ja 1200 px).
- Oma AVIF (Pillow 13 / libavif 1.4.2 / libaom, nopeus 2) oli samalla SSIM:llä keskimäärin **25 % pienempi** 600 px:ssä ja **26 % pienempi** 1200 px:ssä kuin Cloudflaren laatu 65. Oletusnopeudella ero oli 17–18 %.
- Oman kooderin taitekohta on laatu 56 (viidessä kuvassa kuudesta, yhdessä 60). Esimerkki 600 px: Cloudflare q65 59 kt (SSIM 0,955), oma q54 48 kt (0,951), oma q58 57 kt (0,962).
- `tune=iq` ei muuttanut tulosta; SVT- ja rav1e-kooderit eivät ole Pillowin libavifissa.

**Miten se toimii:**

- `scripts/lisaa_kuva.py --avif` tekee `<perusnimi>-<leveys>.avif`-tiedostot WebP-tiedostojen viereen ja päivittää `src/data/avifkuvat.ts`:n. `--vain-avif` lisää AVIF:n olemassa olevalle kuvalle.
- `OptimizedImage`, `ResponsiveImage` ja `AvifKuva` (muille `srcSet`-kuville) lisäävät `<picture>`-elementin, jossa on `image/avif`-lähde samoilla leveyksillä ja `sizes`-arvolla. Noin 95 % selaimista (caniuse, 2026) saa AVIF:n, muut WebP:n.
- Pääkuvan preload käyttää AVIF:ia (`type="image/avif"`), kun pääkuvalla on AVIF; kuvasitemap ja og:image pysyvät WebP:nä.
- Esikatselu näyttää täsmälleen samat tiedostot kuin tuotanto, eikä Cloudflaren asetuksia tarvita. Cloudflaren Transformations-asetuksen voi kytkeä pois.

**Lähteet:** Lighthouse ei aseta kilotavurajaa, vaan huomauttaa kuvista, joiden uudelleenpakkaus laatuun 85 säästäisi yli 4 KiB, ja näyttökokoonsa nähden liian suurista kuvista ([Chrome for Developers](https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images)). Chrome ohittaa LCP:ssä vain alle 0,05 bittiä/pikseli -kuvat ([Chromium](https://chromium.googlesource.com/chromium/src/+/main/docs/speed/metrics_changelog/2023_04_lcp.md)).
