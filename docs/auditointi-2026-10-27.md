# Tekninen ja sisällöllinen auditointi 27.10.2026 (yöajo, paketti 3)

Haara `claude/yo-auditointi`. Mittaukset tehtiin `npm run build` -tuloksesta paikallisella palvelimella
(`python3 -m http.server 4173 --directory dist`), Lighthouse 12.8.2, Chromium headless, mobiili- ja työpöytäesiasetus.
Sisältötarkistukset ajettiin kaikille sitemapin 91 sivulle esirenderöidystä HTML:stä.

**Huomio mittaustavasta.** Paikallinen palvelin ei pakkaa tiedostoja eikä lähetä välimuistiotsikoita. Siksi Lighthousen
havainnot "uses-text-compression" (noin 600–770 KiB) ja "uses-long-cache-ttl" eivät koske tuotantoa: Cloudflare pakkaa
(brotli) ja `public/_headers` asettaa välimuistin. Mobiilin suorituskykypisteet ovat alaraja; tuotannon todellinen luku
kannattaa katsoa PageSpeed Insightsista osoitteella pintanen.fi. Pisteet vaihtelevat ajokertojen välillä muutaman yksikön.

## Lighthouse-pisteet (13 sivua)

P = suorituskyky, A = saavutettavuus, BP = parhaat käytännöt, SEO. Ensimmäinen ajo ennen korjauksia, toinen korjausten jälkeen.

| Sivu | Mobiili P/A/BP/SEO ennen | Mobiili jälkeen | Työpöytä ennen | Työpöytä jälkeen | LCP mob. |
|---|---|---|---|---|---|
| / | 42/97/100/100 | 58/97/100/100 | 92/97/100/100 | 92/97/100/100 | 9,9 s |
| /tiilikaton-pinnoitus-pirkanmaa/ | 56/97/100/100 | 56/97/100/100 | 93/97/100/100 | 92/97/100/100 | 8,1 s |
| /talon-maalaus-pirkanmaa/ | 62/97/100/100 | 48/97/100/100 | 93/97/100/100 | 93/97/100/100 | 6,6 s |
| /katon-puhdistus-pirkanmaa/ | ei mitattu: osoite on 301-ohjaus pinnoitussivulle | – | – | – | – |
| /tiilikaton-pinnoitus-hinta-pirkanmaa/ | 61/97/100/100 | 60/97/100/100 | 94/97/100/100 | 94/97/100/100 | 6,5 s |
| /talon-maalaus-hinta-pirkanmaa/ | 62/97/100/100 | 62/97/100/100 | 94/97/100/100 | 94/97/100/100 | 6,6 s |
| /tiilikaton-pinnoitus-tampere/ | 61/97/100/100 | 55/97/100/100 | 92/97/100/100 | 92/97/100/100 | 7,2 s |
| /tiilikaton-pinnoitus-nokia/ | 61/97/100/100 | 59/97/100/100 | 92/97/100/100 | 92/97/100/100 | 7,3 s |
| /talon-maalaus-tampere/ | 61/97/100/100 | 61/97/100/100 | 92/97/100/100 | 92/97/100/100 | 7,1 s |
| /talon-maalaus-nokia/ | 61/97/100/100 | 61/97/100/100 | 93/97/100/100 | 93/97/100/100 | 7,7 s |
| /hintalaskuri/ | 64/96/100/100 | 62/96/100/100 | 95/96/100/100 | 95/96/100/100 | 6,2 s |
| /yhteystiedot/ | 63/97/100/100 | 61/97/100/100 | 95/97/100/100 | 95/97/100/100 | 6,6 s |
| /artikkelit/milloin-pinnoittaa-tiilikatto/ | 64/96/100/100 | 63/96/100/100 | 95/96/100/100 | 94/96/100/100 | 6,7 s |

CLS on 0 joka sivulla. SEO ja parhaat käytännöt ovat 100 kaikilla. Työpöydällä suorituskyky 92–95.
Mobiilin suorituskyvyn erot ajojen välillä (etusivu 42 → 58, talon maalaus Pirkanmaa 62 → 48) ovat mittausvaihtelua
samasta buildista, eivät korjausten vaikutusta. Toisessa ajossa saavutettavuuden huomautukset
"label-content-name-mismatch" ja "image-redundant-alt" ovat poissa; pisteluku pysyy 96–97, koska jäljellä on vain
kontrasti (alla), jonka Lighthouse painottaa raskaasti.

### Suurimmat suorituskykyhavainnot (samat joka sivulla)

- **JavaScript**: `index` 303 kB, `vendor-ui` 225 kB, `vendor-motion` 120 kB (pakkaamattomina). Lighthouse laskee
  käyttämätöntä JavaScriptiä 286–335 KiB per sivu. Mobiilissa tämä on suurin yksittäinen syy hitaaseen LCP:hen.
- **CSS**: yksi 119 kB:n tyylitiedosto, josta käyttämätöntä 81–98 KiB. Se on tarkoituksella render-blocking (FOUC-korjaus 7.10.2026).
- **Kuvat**: mobiilissa ladataan 800 px:n WebP-kuvia kohtiin, jotka näkyvät noin 380 px leveinä (referenssiruudukko,
  ennen–jälkeen-vertailut). Lighthousen arvio säästöstä 130–350 KiB etusivulla ja Tampere-sivulla. Lisäksi se ehdottaa
  tiukempaa WebP-pakkausta muutamalle kuvalle (esim. `tiilikaton-pinnoitus-ylojarvi-musta-tiilikatto-jalkeen-800.webp`, 139 kB).
- **DOM-koko etusivulla**: 3 509 elementtiä (raja 1 500). Suurin lapsimäärä 112 on arvostelukarusellissa
  (`TestimonialsMarquee`), jossa kortit on kahdennettu animaatiota varten. Muilla sivuilla 960–1 200 elementtiä.
- **Hintalaskuri**: LCP-elementti on palvelun valintakuva, joka ladataan `loading="lazy"`.
- Sivun oma HTML on 45–160 kB (esirenderöity sisältö + JSON-LD), mikä on kunnossa.

### Saavutettavuus (A 96–97)

Kaikki saavutettavuushuomautukset olivat kontrastista ja kahdesta nimeämisvirheestä. Nimeämisvirheet korjattiin
(alla). Kontrastit jäivät kysymyksiksi, koska ne koskevat brändivärejä ja muuttaisivat ulkoasua:

| Kohta | Värit | Nyt | Vaatimus |
|---|---|---|---|
| Pääpainikkeet ja "Ennen/Jälkeen"-merkit (`bg-accent-strong`, valkoinen teksti) | #fff / #0091eb | 3,36 | 4,5 |
| Tekstilinkit vaaleansinisellä pohjalla (`text-accent-ink`) | #007bc7 / #ebf7ff | 4,14 | 4,5 |
| WhatsApp-painike yhteydenottolohkossa | #fff / #5ddb79 | 1,77 | 4,5 |
| Alatunnisteen kuntalinkit (`text-white/45` navylla) | #787e8c / #0a152e | 4,45 | 4,5 |
| Arvostelukarusellin pieni harmaa teksti | #919ba9 / #fff | 2,81 | 4,5 |
| PageHeron punaisen merkin yläteksti (`text-white/70`, 10 px) | #e9bbbb / #b51c1c | 3,90 | 4,5 |

## Sisältötarkistukset (91 sivua)

**Title 50–60 merkkiä.** Ennen korjausta 50 sivua oli haarukan ulkopuolella: pinnoituksen kaupunkisivut lyhyillä
kunnannimillä 47–49, aluesivut 45–49, maalauksen kaupunkisivut 63–66 (pitkä muoto "– ulkomaalaus ja julkisivumaalaus"),
hintasivut 63 ja 70, hintalaskuri 62, meistä 61, kokemuksia 61, artikkelit-listaus 31, tietosuoja 28 sekä kolme artikkelia
(61, 66 ja 69, joista kaksi jonossa). Korjauksen jälkeen kaikki 91 sivua ja jonossa olevat artikkelit ovat 50–60.

**Description 120–160 merkkiä.** Ulkopuolella olivat `/yhteystiedot/` (175), `/maalauspalvelut-mantta-vilppula/` (161)
ja kaksi artikkelia (162 ja 161). Nyt kaikki 128–159.

**H1.** Täsmälleen yksi H1 joka sivulla. Otsikkotasot eivät hyppää (ei h2 → h4).

**Kuvien alt-tekstit.** 14 kuvaa 91 sivulla on `alt=""`. Kaikki ovat tarkoituksella koristeellisia, eikä niitä muutettu:
Eerikin ja Eemilin pyöreät kasvokuvat nimen vieressä (etusivu, palvelusivut, artikkelin tekijärivi), hintalaskurin ja
tarjouspyynnön taustakuva (`aria-hidden`), artikkelilistan ja aluesivun korttikuvat linkin sisällä, jossa on otsikkoteksti.
Ruudunlukijalle nämä on oikein näin (WCAG 1.1.1), ja Lighthouse hyväksyy ne. Hintalaskurin palveluvalinnan kuvilla oli
sama alt kuin napin tekstillä; se korjattiin.

**Sisäiset linkit.** Valikko ja alatunniste antavat joka sivulle 37–38 eri sisäistä linkkiä; palvelu- ja kaupunkisivuilla
on 86–90 eri kohdetta (kuntalistat). Tulevia linkkejä: staattiset sivut 82–90, aluesivut 90, pinnoitus- ja
maalauskaupunkisivut 77, artikkelit 4–8. **Alle 5 tulevaa linkkiä** on vain yhdellä sivulla:
`/artikkelit/milloin-pinnoittaa-tiilikatto/` (4). Muut artikkelit 7–8. Linkkien lisääminen on paketin 6 asia.
Yhtään linkkiä sitemapin ulkopuoliseen osoitteeseen ei ole.

**JSON-LD.** Jokainen sivu jäsentyy, ja pakolliset kentät ovat paikallaan:
`RoofingContractor`+`HousePainter` (nimi, osoite, puhelin, url, kuva, `@id` `#yritys`), `WebSite`, `BreadcrumbList`
(positiot 1…n, `item` jokaisessa), `Service` (nimi, `provider` viittauksena `@id`:hen, `areaServed`, `AggregateOffer`
valuutalla ja hinnoilla), `FAQPage` (`Question` + `acceptedAnswer.text`), `Article` (headline, author, datePublished,
image, publisher). Epävarmat kohdat, joita ei voi todentaa ilman validator.schema.orgia:
- `Service.provider` on pelkkä `{"@id": …}` -viittaus samalla sivulla olevaan yritykseen. Se on JSON-LD:n mukaan oikein,
  mutta Googlen Rich Results -testi voi näyttää varoituksen "provider: name puuttuu".
- `AggregateOffer` ilman `offerCount`-kenttää: sallittu, Google ei vaadi sitä palveluille.
- `FAQPage`-tuloksia Google näyttää nykyään vain viranomais- ja terveyssivuille; schema ei haittaa, mutta ei tuo tähtiä.

## Korjaukset

| Tiedosto | Muutos |
|---|---|
| `src/data/seo.ts` | Uusi apuri `fitTitle`: valitsee ensimmäisen vaihtoehdon, joka mahtuu 50–60 merkkiin "| Pintanen" kanssa. |
| `src/data/seo.ts` | Pinnoituksen kaupunkisivu: perusmuoto ennallaan; lyhyillä nimillä perään "– 5 v takuu" (Akaa, Nokia) tai "– hinta" (Forssa, Kihniö, Urjala, Virrat). |
| `src/data/seo.ts` | Maalauksen kaupunkisivu: "Talon maalaus X – ulkomaalaus, 2 v takuu"; Valkeakoski, Hämeenlinna ja Mänttä-Vilppula "– ulkomaalaus". Sana "julkisivumaalaus" poistui titlestä (ks. kysymys 1). |
| `src/data/seo.ts` | Aluesivu: lyhyillä nimillä (14 kuntaa) perään "– takuu". |
| `src/data/seo.ts` | Staattiset titlet: artikkelit "– katto ja talon maalaus", hintalaskuri "tiilikaton pinnoitus, talon maalaus", pinnoituksen hintasivu "– hintalaskuri", maalauksen hintasivu "– esimerkit ja laskuri", meistä "tekevät itse", kokemuksia "kaikki Google-arvostelut", tietosuoja "– mitä tietoja keräämme", talon maalaus Pirkanmaa "– ulkomaalaus, 2 v takuu". |
| `src/data/seo.ts` | Descriptionit: yhteystiedot 175 → 159 (sama sisältö tiiviimmin), aluesivun malli "Ilmainen arviokäynti, kirjallinen takuu" (Mänttä-Vilppula 161 → 158). |
| `src/data/articles.ts` | `seoTitle` kolmelle artikkelille (pinnoitus-vai-uusi-katto, huoltomaalaus-vai-uusi-ulkoverhous, tiilikaton-pesu-ja-pinnoitus); sivun H1 ei muutu. Kaksi descriptionia lyhennettiin 1–5 merkkiä ("ovat ehjät", "seuraavalla sateella"). |
| `src/components/palvelut/PalvelutA.tsx` | Poistettu `aria-label`, joka ei sisältänyt kortin näkyvää tekstiä (WCAG 2.5.3, Lighthouse label-content-name-mismatch). Linkin nimi tulee nyt kortin tekstistä. |
| `src/components/Hero.tsx`, `src/components/PageHero.tsx` | Sama korjaus Google-arviolinkille ("5,0 / 5 Google-arviot"). |
| `src/components/laskuri/PriceWizard.tsx` | Palveluvalinnan kuvan alt `""`, koska napissa on sama teksti (image-redundant-alt). |
| `src/test/seo.test.ts` | Testit vaativat nyt titlen 50–60 ja descriptionin 120–160 merkkiä, myös jonossa olevilta artikkeleilta. |

Ulkoasu ei muuttunut: muutokset koskevat vain `<head>`-tietoja, aria-attribuutteja ja yhtä alt-tekstiä.

## Kysymykset Eerikille

1. **Maalauksen kaupunkisivujen title.** Pitkä muoto "Talon maalaus Tampere – ulkomaalaus ja julkisivumaalaus | Pintanen"
   oli 63–66 merkkiä. Nyt "Talon maalaus Tampere – ulkomaalaus, 2 v takuu | Pintanen" (57). Haluatko mieluummin pitää
   sanan julkisivumaalaus ja pudottaa "ulkomaalaus" ("Talon maalaus Tampere – julkisivumaalaus", 51), vai käykö takuu?
   Paketti 4 (title-koukut 20 tärkeimmälle sivulle) muuttaa näitä joka tapauksessa.
2. **Lyhyiden kuntien titlet.** Pinnoitus: "… Nokia – 5 v takuu", "… Forssa – hinta". Aluesivu: "Maalausliike ja
   kattopalvelut Nokia – takuu". Jos haluat toisen lisäsanan (esim. "– Pirkanmaa", joka ei sovi Forssaan ja
   Hämeenlinnaan), vaihto on yksi rivi `seo.ts`:ssä.
3. **Pääpainikkeiden kontrasti.** Valkoinen teksti sinisellä `--accent-strong` (203 100% 46 %, #0091eb) on 3,36:1.
   AA vaatisi tummennuksen noin 38 %:iin (#0077c4, 4,73:1) tai 36 %:iin (#0070b8, 5,24:1). Muutos näkyy kaikissa
   napeissa, joten en tehnyt sitä. Tehdäänkö?
4. **Vaaleansinisen pohjan linkit** (`--accent-ink` 203 100% 39 %, #007bc7 pohjalla #ebf7ff) 4,14:1. Korjaus 36 %:iin
   (#0072b8) antaa 4,70:1 ja näkyy vain hieman tummempana. Saako vaihtaa?
5. **WhatsApp-painike** (#5ddb79, valkoinen teksti) 1,77:1. Virallinen WhatsApp-vihreä #25D366 on yhtä heikko valkoisen
   kanssa. Vaihtoehdot: tumma teksti vihreällä tai tummempi vihreä #128C7E (4,6:1). Kumpi?
6. **Alatunnisteen kuntalinkit** `text-white/45` → `text-white/47` nostaisi kontrastin 4,45 → 4,77. Silmällä ei erota.
   Saako tehdä?
7. **Arvostelukarusellin pieni harmaa teksti** (#919ba9 valkoisella, 12 px) 2,81:1 ja **PageHeron punaisen merkin
   yläteksti** (`text-white/70`, 3,9:1): nostetaanko `text-white/85`:een ja harmaa `text-muted-foreground`-väriin?
8. **Etusivun DOM-koko** 3 509 elementtiä, josta arvostelukaruselli kahdennettuine kortteineen on suurin osa. Voiko
   karusellissa näyttää vähemmän arvosteluja (esim. 12 kahdennettuna 24:ksi) tai vaihtaa kahdennuksen CSS-toistoon?
9. **Kuvien koot mobiilissa.** Ruudukko- ja vertailukuvat ladataan 800 px:n versiona noin 380 px:n leveyteen. Lisätäänkö
   kuvakansioon 600 px:n koko (`scripts/lisaa_kuva.py`, `storage.ts`, `seo.test.ts`) vai hyväksytäänkö nykyinen?
   Samalla voisi kiristää WebP-pakkausta (laatu 80 → 75) muutamassa yli 100 kB:n kuvassa.
10. **Artikkelien kuvien `width`/`height`.** `ArticleKit.Figure`-kuvilta puuttuvat mitat (Lighthouse unsized-images).
    Kuvista 74 on pystyjä 3:4 ja 17 vaakoja 4:3, joten yksi oletusmitta olisi väärä. Lisätäänkö `Figure`-komponenttiin
    valinnainen `ratio`-parametri ja täytetäänkö se artikkeleihin?
11. **Hintalaskurin LCP-kuva** ladataan `loading="lazy"`. Vaihto `eager`-tilaan ensimmäiselle kahdelle valintakuvalle ei
    muuta ulkoasua, mutta koskee komponenttia (`PriceWizard`). Saako tehdä?
12. **JavaScriptin määrä** on mobiilin hitauden pääsyy (noin 650 kB pakkaamatonta, josta käyttämätöntä 290–335 KiB).
    Keinoja: chat-widgetin ja `framer-motion`-kirjaston lataus vasta ensimmäisen vuorovaikutuksen tai 25 sekunnin jälkeen,
    `vendor-ui`-nipun karsinta (shadcn-komponentit, joita ei käytetä). Tämä on arkkitehtuurimuutos: otetaanko omaksi paketiksi?
13. **Käyttämätön CSS** 81–98 KiB per sivu. Tailwindin purge on päällä, joten ylijäämä on lähinnä harvinaisten
    sivujen tyylejä yhdessä tiedostossa. Jako sivukohtaisiin CSS-tiedostoihin riskeeraa 7.10. korjatun FOUC:n. Jätetäänkö?
14. **Artikkelin `/artikkelit/milloin-pinnoittaa-tiilikatto/` tulevat linkit** ovat 4. Paketti 6 (sisäinen linkitys)
    hoitaa tämän; ei erillistä toimenpidettä nyt, ellet halua.
15. **`/katon-puhdistus-pirkanmaa/`** on jo 301-ohjaus, joten sitä ei voitu mitata. Vanhojen puhdistussivujen poisto
    talvella on siis jo tehty tältä osin; `puhdistusCities`-data on yhä koodissa ohjauksia varten.
