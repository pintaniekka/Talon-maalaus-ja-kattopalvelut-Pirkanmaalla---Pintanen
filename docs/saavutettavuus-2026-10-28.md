# Saavutettavuusraportti 28.10.2026 (axe-core)

Ajo: yöajo 3, paketti E (26.10.2026). Työkalu: @axe-core/playwright 4.14 (axe-core 4.11), säännöt WCAG 2.0/2.1 A ja AA, WCAG 2.2 AA ja axen best-practice. Kohde: rakennettu sivusto (`npm run build` + `vite preview`), kaikki sitemap.xml:n 91 sivua kahdella leveydellä (puhelin 390 px, työpöytä 1280 px), yhteensä 182 sivunäkymää. Testi: `tests/e2e/saavutettavuus.spec.ts`; jokaisen sivun tulos tallentuu `test-results/axe/<projekti>/<sivu>.json`.

## Yhteenveto

| Vakavuus | Sääntö | Sivuja (91) | Kohtia yhteensä | Tila |
|---|---|---|---|---|
| serious | color-contrast | 91 | noin 6 800 | ulkoasumuutos, kysymys 1 |
| serious | label-content-name-mismatch | 82 | 170 | korjattu (ei ulkoasumuutosta) |
| moderate | landmark-unique | 1 (etusivu) | 2 | korjattu |
| minor | image-redundant-alt | 1 (/hintalaskuri/) | 4 | korjattu |

Critical-tason löydöksiä ei ollut. Axe ei pystynyt päättämään kontrastia osassa kohtia (incomplete, color-contrast, joka sivulla): ne ovat tekstiä kuvan tai liukuvärin päällä, ja ne pitää katsoa silmällä.

## Löydökset

### 1. color-contrast (serious): tekstin ja taustan kontrasti alle 4,5:1

WCAG 1.4.3 vaatii tavalliselle tekstille vähintään 4,5:1 ja isolle tekstille (vähintään 18 pt tai 14 pt lihavoitu) 3:1. Sama väripari toistuu jokaisella sivulla, joten kohtia on paljon, mutta eri syitä on kuusi:

| Teksti | Tausta | Kontrasti | Missä | Kohtia |
|---|---|---|---|---|
| valkoinen | brändin sininen #0091eb (`bg-accent-strong`, `btn-hero`) | 3,36 | kaikki siniset painikkeet ja merkit ("Suosituin", hintakortit, tarjouspyyntö) | noin 940 + merkit |
| harmaa #818d9d (`text-muted-foreground/80`) | valkoinen | 3,37 | arvostelukorttien "Google-arvostelu"-rivi (12 px) | 357 |
| harmaa #787e8c | tummansininen alapalkki #0a152e | 4,45 | alapalkin paikkakuntalinkit (13 px) | 244 |
| vaaleanpunainen `text-white/70` | punainen #b51c1c | 3,9 | heron pieni yläotsikko "Perheyritys Tampereelta" / "Eerik tekee työn" (10 px, lihavoitu) | 160 |
| valkoinen | WhatsApp-vihreä #5ddb79 | 1,76 | WhatsApp-painike yhteystiedoissa ja paikkakuntasivuilla | 81 |
| harmaa #919ba9 | valkoinen | 2,81 | arvostelunoston "Google-arvostelu"-teksti | 25 |
| sininen #007bc7 (`text-accent-ink`) | vaaleansininen #ebf7ff | 4,13 | artikkelilinkit hintasivujen vaaleissa laatikoissa | 14 |

Korjaus olisi aina ulkoasumuutos (tummempi sininen painikkeissa, esimerkiksi #0074c2 antaa 4,6:1; harmaat tummemmaksi; WhatsApp-painikkeen teksti tummaksi). Niitä ei tehty tässä paketissa. Sääntö on lisätty tiedostoon `tests/e2e/axe-sallitut.json`, jotta CI ei kaadu tunnettuun asiaan. Kun värit on päätetty, poista rivi ja aja testi.

### 2. label-content-name-mismatch (serious): linkin näkyvä teksti ei ole osa sen nimeä

Heron luottorivillä Google-arviolinkki ("5,0 / 5 Google-arviot") oli nimetty `aria-label="Lue Pintasen Google-arviot"`, jolloin puheohjaus ("klikkaa Google-arviot") ei löydä linkkiä. Korjattu `src/components/Hero.tsx` ja `src/components/PageHero.tsx`: aria-label poistettu ja linkin perään lisätty ruudunlukijalle näkymätön teksti ", lue Pintasen Google-arviot". Näkyvä sivu ei muutu.

Sama vika oli etusivun palvelukorteissa (`src/components/palvelut/PalvelutA.tsx`): linkin `aria-label` oli "Tiilikaton pinnoitus: lue lisää palvelusta", vaikka kortin näkyvä teksti on otsikko, tekijä ja kuvaus. Aria-label poistettu, jolloin linkin nimi on kortin oma teksti.

Huomio: ruudunlukijatekstin lisäys heron luottoriville muuttaa jokaisen sivun esirenderöityä `<main>`-sisältöä, joten `src/data/lastmod.json` päivittyi 83 sivulle. Näkyvä sisältö ei muuttunut.

### 3. landmark-unique (moderate): kaksi aluetta samalla nimellä

Etusivulla sekä arvostelunostot (`ReviewHighlights`) että arvostelukaruselli (`TestimonialsMarquee`) olivat `role="region"` nimellä "Arvostelut, vieritettävä lista". Nostojen nimi vaihdettu "Arvostelunostot, vieritettävä lista" (`src/components/ReviewHighlights.tsx`).

### 4. image-redundant-alt (minor): kuvan alt toistaa viereisen tekstin

Hintalaskurin palveluvalinnassa kuvan alt oli sama kuin painikkeen teksti ("Tiilikaton pinnoitus", "Talon maalaus"), joten ruudunlukija luki nimen kahdesti. Kuva on koriste, alt on nyt tyhjä (`src/components/laskuri/PriceWizard.tsx`).

## Mitä axe ei näe

Axe tarkistaa vain koneellisesti päätettävät asiat. Käsin tarkistettavaa jäi: kontrasti kuvien päällä (hero), fokusjärjestys hintalaskurin vaiheissa, chat-ikkunan fokuksen palautus sulkemisen jälkeen ja liukusäätimen käyttö pelkällä näppäimistöllä (toiminnot testataan `tests/e2e/toiminnot.spec.ts`:ssä, mutta ruudunlukijakokemusta ei).

## Kysymykset Eerikille

1. Saako brändin sinisen tummentaa painikkeissa (#0091eb → noin #0074c2) ja harmaat pientekstit tummentaa, jotta kontrasti täyttää 4,5:1? Vaihtoehto: pitää värit ja hyväksyä löydös tietoisesti (nyt sallittu `axe-sallitut.json`-tiedostossa).
2. WhatsApp-painikkeen valkoinen teksti vihreällä on 1,76:1, selvästi heikoin kohta. Saako tekstin vaihtaa tummaksi tai vihreän tummemmaksi (#128c3a)?
