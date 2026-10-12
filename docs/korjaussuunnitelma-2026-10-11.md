# Korjaussuunnitelma auditointien 2–4 pohjalta (11.10.2026)

Tämä muistio kokoaa auditointien osat 2, 3 ja 4 (10.–11.10.2026) yhdeksi vaiheittaiseksi työlistaksi. Osa 3.1 on osan 3 aiempi luonnos ilman Search Console -lukua, joten sitä ei käsitellä erikseen. Osaa 1 (10.10.) ei ole tässä koneessa; osat 2–4 viittaavat siihen kohdissa, jotka on merkitty "(osa 1)".

Vertailukohta on Lummeco, joka on maalaushauissa Tampereella sijoilla 1–2. Auditoinnin johtopäätös, jonka tämä suunnitelma ottaa lähtökohdaksi: pintanen.fi on teknisesti ja sisällöltään parempi, mutta Google ei vielä tiedä, mikä sivu vastaa mihinkin hakuun, ja ulkoiset signaalit (arvostelut, maininnat, Business Profile) ovat ohuet. Siksi järjestys on: ensin tekniset virheet, jotka vuotavat indeksiin, sitten sivuroolit ja linkitys, sitten sisältö ja vasta sitten viilaus.

## Mitä tarkistin itse 11.10.2026 (tuotanto + koodi)

Auditoinnit tehtiin ilman tuotantopääsyä. Tältä koneelta pääsee tuotantoon, joten tärkeimmät väitteet on tarkistettu:

| Väite | Tulos | Seuraus |
|---|---|---|
| Vanhat kauttaviivalliset osoitteet (`/kattopalvelut/puhdistus/hameenlinna/`, `/talon-maalaus/tampere/`, `/alue/tampere/`, `/kattopalvelut/pinnoitus/`) palauttavat 200-kuoren etusivun otsikolla ilman canonicalia (osa 4, luku 5) | **Pitää paikkansa tuotannossa.** | Vaihe 1A on perusteltu ja kiireellinen. |
| Kauttaviivattomat vanhat osoitteet ohjautuvat 301:llä kauttaviivattomaan kohteeseen, josta Pages ohjaa 308:lla eteenpäin (kaksi hyppyä) | **Pitää paikkansa.** `/talon-maalaus/tampere` → 301 `/talon-maalaus-tampere` → 308 `/talon-maalaus-tampere/`. | Sama korjaus. |
| `_redirects` kattaa vain 8 maalauskuntaa 24:stä | **Pitää paikkansa.** `maalausCities` on 24 kuntaa, säännöt on 8:lle. | Sama korjaus. |
| Tietosuojaseloste lupaa Cloudflare Web Analyticsin, mutta buildissa ei ole sen skriptiä (osa 2, luku 8.2) | **Auditoinnin virhe.** Cloudflare lisää beacon-skriptin reunalla; se on tuotannon HTML:ssä. Seloste on oikein. | Ei toimenpidettä. |
| `site:`-haussa vain 2 sivua indeksissä (osa 3.1, luku 5) | **Osa 3 korjasi tämän itse:** Search Console näyttää 68 indeksoitua sivua. | Ei toimenpidettä. |
| Evästebannerissa ei ole hylkäysnappia ensimmäisellä tasolla (osa 2, löydös 3) | Pitää paikkansa, mutta koodin kommentti sanoo, että se on **Eerikin päätös 5.10.2026**. | Kysymys 3. |
| Business Profilen osoite näkyvissä (osa 3, löydös 5) | **Eerik: osoitteen näkyminen on ok.** | Poistettu listalta. |
| Lomake näyttää validointivirheen yleisenä virheenä (osa 2, löydös 1) | **Pitää paikkansa** (`ServiceContactSection.tsx` rivi 125–127). | Vaihe 1B. |
| CRM-virhe on hiljainen (osa 2, löydös 2) | **Pitää paikkansa** (`functions/api/contact.ts`, `sendToCrm`). | Vaihe 1C. |
| Palvelusivuilta linkitetään julkaisemattomiin artikkeleihin (osa 2, luku 6) | **Pitää paikkansa:** `PinnoitusComparison.tsx` ja `MaalausComparison.tsx`. | Vaihe 1D. |
| Footerin ankkuri "Ulkomaalaus" osoittaa sivulle, jonka H1 on "Talon maalaus" (osa 2, luku 6) | **Pitää paikkansa** (`Footer.tsx` rivi 128). | Vaihe 3. |
| Fontteja ei esiladata, CLS 0,135 pinnoitussivulla (osa 3, luku 1.1) | Fontit tulevat `@fontsource`-CSS:stä ilman preloadia. | Vaihe 5A. |
| Ei CI:tä (osa 2, luku 4) | Pitää paikkansa: ei `.github/workflows`-kansiota. | Vaihe 1E. |

## Säännöt, jotka ohjaavat kaikkia vaiheita

CLAUDE.md:n sisältösäännöt pätevät. Erityisesti: hinnat 2 850–7 000 € ja 3 500–11 000 €, lisäikä "jopa 15–20 vuotta", ei "emme tee" -lauseita, ei €/m² (paitsi "alkaen 15 €/m²"), kattomaali Nowocoat, kattotyössä "korkeapaineruiskulla", ei uusia puhdistussisältöjä, olemassa oleviin teksteihin ei isoja muutoksia kysymättä. Julkaisu aina PR:n ja Cloudflare-esikatselun kautta; ulkoasumuutokset vasta Eerikin ok:lla; virhekorjaukset saa julkaista suoraan. Lomakkeita ei lähetetä.

---

## Vaihe 1: Tekniset virhekorjaukset (ei ulkoasumuutoksia, saa julkaista suoraan PR:llä)

Yksi PR per kohta tai yksi yhteinen PR; kaikki ovat virhekorjauksia.

### 1A. Vanhat osoitteet: yksi 301 suoraan oikeaan osoitteeseen (osa 4, luku 5)

**Ongelma:** 71 vanhaa osoitetta palauttaa kauttaviivalla 200-kuoren etusivun otsikolla; kauttaviivattomat ohjautuvat kahdessa hypyssä; 16 `/talon-maalaus/<kunta>`-polulta puuttuu sääntö. Search Consolessa 56 "uudelleenohjauksen sisältävää sivua" ja 17 "indeksoitu, ei hakemistossa" täsmäävät tähän.

**Korjaus:**
1. `vite-plugin-spa-routes.ts` generoi `dist/_redirects`-tiedoston `legacyRoutes`-listasta: jokaiselle vanhalle polulle kaksi riviä (ilman ja kauttaviivalla), kohde aina kauttaviivallinen sitemapin osoite. Lähde on sama kuin kuorille, joten listat eivät voi erkaantua. `public/_redirects` jää pohjaksi (SPA-fallback ja kaksi artikkelisääntöä), ja plugin lisää generoidut rivit sen perään ennen `/* /index.html 200` -riviä.
2. Vanhojen polkujen `index.html`-kuoret jätetään pois buildista (`getAllRoutePaths` ilman `legacyRoutes`). Selaimen `<Navigate>`-reitit `App.tsx`:ssä jäävät varmistukseksi.
3. Testi `routes.test.ts`:ään: jokaiselle `legacyRoutes`-polulle on sääntö molemmissa muodoissa ja kohde on sitemapissa.
4. Tarkistus esikatselussa: 72 polkua × 2 muotoa, odotus aina yksi 301 suoraan kauttaviivalliseen osoitteeseen. Skripti `scripts/verify_redirects.py` repoon.

**Eerik tekee julkaisun jälkeen:** Search Console → Sivut → "Vahvista korjaus" kummallekin syylle, ja URL-tarkastus kahdelle kuorelle (`/kattopalvelut/puhdistus/hameenlinna/`, `/talon-maalaus/tampere/`).

**Mittari:** "Uudelleenohjauksen sisältävä sivu" laskussa ja "Indeksoitu, ei hakemistossa" alle 10 neljässä viikossa.

### 1B. Lomakkeen validointivirhe näkyviin (osa 2, löydös 1 ja luku 1.2)

**Ongelma:** kun kävijä antaa vain nimen tai virheellisen sähköpostin, lomake sanoo "Virhe lähetyksessä", vaikka syy on "Anna puhelinnumero tai sähköposti". Lomake on 90 sivulla.

**Korjaus:** `ServiceContactSection.tsx` ja `DesktopQuoteDrawer.tsx`: tunnista `ZodError` ja näytä sen ensimmäinen viesti; tarkista kentät ennen lähetystä ja merkitse virheellinen kenttä (`aria-describedby`). Sama puhelinnumeron tarkistus (`isValidFinnishMobile`, `PhoneInput`) kuin tarjouspyynnössä ja laskurissa. Testi `contactForm.test.ts`:ään.

### 1C. CRM-virheestä tieto sähköpostiin (osa 2, löydös 2 ja luku 7.1)

**Ongelma:** jos CRM hylkää liidin, se kirjataan vain Cloudflaren lokiin. Liidi on silloin vain sähköpostissa, eikä kukaan huomaa.

**Korjaus:** `functions/api/contact.ts`: `sendToCrm` palauttaa onnistuiko; jos ei, sähköpostin otsikkoon lisätään "[CRM EI VASTAANOTTANUT]" ja viestin loppuun rivi "Liidi ei mennyt CRM:ään: lisää se käsin." Järjestys: CRM odotetaan ennen sähköpostin lähetystä (lisää muutaman sadan millisekunnin viiveen, hyväksyttävä). Testi `contactFunction.test.ts`:ään. Ei muuta vastausta kävijälle.

### 1D. Linkit jonossa oleviin artikkeleihin (osa 2, luku 6)

**Ongelma:** `PinnoitusComparison.tsx` linkittää artikkeliin "Pinnoitus vai uusi katto" (julkaisu 13.10.) ja `MaalausComparison.tsx` artikkeliin "Huoltomaalaus vai uusi ulkoverhous" (27.10.). Linkki vie sivulle, jonka HTML on tyhjä kuori eikä ole sitemapissa.

**Korjaus:** linkki näytetään vain, jos artikkeli on julkaistu (`isPublished(slug)`-apufunktio `articles.ts`:ään, build-aikana ja selaimessa sama). Ei tekstimuutoksia.

### 1E. CI: testit, tsc, lint ja build jokaisessa PR:ssä (osa 2, luku 4)

**Korjaus:** `.github/workflows/ci.yml`: `npm ci`, `npx tsc --noEmit`, `npm test`, `npm run lint`, `npm run build`, `python3 scripts/verify_dist.py dist`. Estää 5.10. kaltaisen tuotantokatkon jatkossa, koska Cloudflare Pages -tarkistuksen lisäksi PR:ssä näkyy testien tila.

### 1F. Rivinvaihdot (löydetty tässä istunnossa)

Windows-git muutti `public/_headers`-tiedoston CRLF-muotoon ja testi kaatui. Lisätään `.gitattributes` (`* text=auto eol=lf`), jotta klooni toimii samalla tavalla Macilla, Windowsilla ja Cloudflaressa.

### 1G. Pienet tekstikorjaukset Eerikin päätöksillä

Oulu pois llms.txt:stä (yritys on tamperelainen). Katon pinnoitusikä "noin 10–15 vuotta vanha" kahteen FAQ-kohtaan. Maalaussivun FAQ "Käymme seinät ja tarjouksen läpi". Chatin kupla 25 sekunnin kuluttua. Hintalaskuriin GA4-tapahtumat `laskuri_aloitus`, `laskuri_askel`, `laskuri_valmis`. Sanastotesti estää paluun ("15–20 vuotta vanha", "Oulu").

### Toteutus 11.10.2026

Haara `claude/vaihe-1-tekniset-korjaukset`. Kaikki kohdat 1A–1G tehty. Paikallisesti: `tsc` 0 virhettä, lint 0 virhettä, 49 testiä läpi, build 101 reittiä (97 esirenderöityä, ei vanhoja kuoria), `verify_dist.py` 0 ongelmaa, `verify_redirects.py --file` 146 sääntöä 0 ongelmaa. `_redirects` generoidaan nyt buildissa `legacyRedirects`-listasta (`src/data/routes.ts`), joka on myös `App.tsx`:n `<Navigate>`-reittien lähde.

---

## Vaihe 2: Search Console -toimet (Eerik tekee, 20 min)

1. **Indeksointipyyntö 10 sivulle** (osa 4, luku 7, kohta 2): `/`, `/tiilikaton-pinnoitus-pirkanmaa/`, `/talon-maalaus-pirkanmaa/`, `/tiilikaton-pinnoitus-tampere/`, `/talon-maalaus-tampere/`, `/maalauspalvelut-tampere/`, `/katon-puhdistus-tampere/`, `/tiilikaton-pinnoitus-hinta-pirkanmaa/`, `/talon-maalaus-hinta-pirkanmaa/`, `/hintalaskuri/`. URL-tarkastus → "Pyydä indeksointia". Tee tämä vasta vaiheen 1A julkaisun jälkeen, jotta Google näkee korjatun tilan.
2. **Viennit, joita auditointi vielä pyytää** (osa 3, luku 6.5 ja osa 4, luku 9): URL-listat kolmelle kattavuussyylle, indeksoitujen sivujen lista, Linkit-vienti, Sivustokartat-raportin kuvakaappaus, Core Web Vitals -kuvakaappaus, sekä Suorituskyky-raportista suodatin Kysely = "tiilikaton pinnoitus tampere" → Sivut-välilehti (ja sama "talon maalaus tampere"). Viimeinen ratkaisee, näkyykö haulla etusivu vai Tampere-sivu.
3. **Omat haut pois datasta** (osa 4, luku 7, kohta 8): haut jatkossa incognito-tilassa ja ilman kirjautumista. Filippiinien klikkaukset ja "maalausliike tampere" sija 2,7 ovat todennäköisesti omia hakuja.

### Toteutus 12.10.2026

Vaihe 1 on tuotannossa (PR #90 yhdistetty 11.10.2026; tuotannosta tarkistettu 146/146 ohjausta, ei vanhoja kuoria, jonossa oleva artikkeli noindex). Repon puolella vaihe 2 ei vaadi muutoksia: kaikki kymmenen indeksointipyynnön sivua ovat `dist/sitemap.xml`:ssä (97 osoitetta) omalla canonicalilla ja otsikolla, ja kaksi URL-tarkastukseen menevää kuorta (`/kattopalvelut/puhdistus/hameenlinna/`, `/talon-maalaus/tampere/`) ovat `dist/_redirects`-tiedostossa yhtenä 301:nä. Loput on Eerikin työtä Search Consolessa; tarkistuslista alla. Viennit tallennetaan kansioon `docs/search-console/` nimellä `<raportti>-<pvm>.csv` tai `.png`, jotta vaiheen 8 vertailu 20.10. ja 3.11. on mahdollinen.

**Tarkistuslista (Search Console, omaisuus pintanen.fi):**

- [ ] Indeksointi → Sivut → syy "Uudelleenohjauksen sisältävä sivu" → "Vahvista korjaus".
- [ ] Indeksointi → Sivut → syy "Indeksoitu, ei lähetetty sivustokartassa" (tai vastaava "Indeksoitu, ei hakemistossa") → "Vahvista korjaus".
- [ ] Indeksointi → Sivustokartat → `https://pintanen.fi/sitemap.xml`: jos tila ei ole "Onnistui" tai löydettyjen osoitteiden määrä ei ole 97, lähetä sivustokartta uudelleen. Tee sama `image-sitemap.xml`:lle.
- [ ] URL-tarkastus kahdelle vanhalle osoitteelle: `https://pintanen.fi/kattopalvelut/puhdistus/hameenlinna/` ja `https://pintanen.fi/talon-maalaus/tampere/` → "Testaa reaaliaikainen URL-osoite". Odotus: "Sivu ei ole indeksoitu: sivu sisältää uudelleenohjauksen". Ei indeksointipyyntöä näille.
- [ ] URL-tarkastus ja "Pyydä indeksointia" kymmenelle sivulle (kohta 1 yllä). Noin 10 pyyntöä päivässä on raja; jos se täyttyy, loput seuraavana päivänä.
- [ ] Viennit (kohta 2 yllä): Sivut-raportista kolmen kattavuussyyn osoitelistat ja indeksoitujen sivujen lista, Linkit-raportin vienti, kuvakaappaus Sivustokartat- ja Core Web Vitals -raporteista, sekä Tulokset → Kysely "tiilikaton pinnoitus tampere" → Sivut-välilehti ja sama "talon maalaus tampere".
- [ ] Omat haut jatkossa incognito-tilassa (kohta 3 yllä).

Eerik vei raportit 12.10. (kattavuus, Tulokset 3 kk ja 5.–9.10., sivustokartat): ne ovat kansiossa `docs/search-console/` ja lähtötaso on kirjattu tiedostoon `docs/search-console/lahtotaso-2026-10-12.md` sekä vaiheen 8 taulukkoon. Kattavuusraportissa kahden tärkeimmän syyn vahvistus on tilassa "Epäonnistui" (käynnistetty ennen korjausta), joten **"Vahvista korjaus" pitää painaa uudelleen** vaiheen 1 julkaisun jälkeen. Kysely → Sivut -viennit, kattavuussyiden osoitelistat ja Linkit-raportti on viety samaan kansioon. Indeksointipyynnöt ovat vielä tekemättä; artikkelisivut (`/artikkelit/` ja kolme artikkelia) kannattaa lisätä pyyntölistaan, koska Google ei ole vielä hakenut tai indeksoinut niitä.

---

## Vaihe 3: Sivuroolit ja sisäinen linkitys (osa 4, luvut 4.3 ja 7, kohdat 3–4)

Pieniä muutoksia: titlet, H1:n lisäsana ja linkkien ankkurit. Ei tekstien uudelleenkirjoitusta. Title- ja H1-muutokset ovat näkyviä, joten esikatselu ja Eerikin ok ennen mergeä.

### 3A. Titlet ja H1:t sivutyypeittäin

| Sivu | Nyt | Ehdotus | Peruste |
|---|---|---|---|
| `/maalauspalvelut-<kunta>/` | "Maalaus- ja kattopalvelut <Kunta> \| Pintanen" | "Maalausliike <Kunta> – talon maalaus ja tiilikaton pinnoitus \| Pintanen"; H1 "Maalausliike ja kattopalvelut <Kunta>" | "maalausliike tampere" oli kesän suurin ei-brändihaku (504 näyttöä); nämä sivut ovat jo sivuston paras sivutyyppi (27 % näytöistä, 4 klikkausta). **Kysymys 1.** |
| `/tiilikaton-pinnoitus-<kunta>/` | "Tiilikaton pinnoitus <Kunta> \| Hinta 2 850–7 000 € \| Pintanen" | "Tiilikaton pinnoitus <Kunta> – katon maalaus ja pinnoitus \| Hinta 2 850–7 000 €" (jos mahtuu; muuten hinta kuvaukseen) | "katon maalaus tampere" putosi sijalta 12 sijalle 55; sivuilla ei sanota "katon maalaus". |
| `/talon-maalaus-<kunta>/` | "Talon maalaus <Kunta> – ulkomaalaus \| Pintanen" | "Talon maalaus <Kunta> – ulkomaalaus ja julkisivumaalaus \| Pintanen" | "julkisivumaalaus tampere" putosi sijalta 1,3 sijalle 26,5. |
| `/hintalaskuri/` | "Hintalaskuri – laske pinnoituksen tai maalauksen hinta" | "Hintalaskuri: tiilikaton pinnoitus ja talon maalaus \| Pintanen" | "katto hintalaskuri" sija 7,5; nykyinen title ei sano, mitä lasketaan. |
| Etusivu, hubit, hintasivut | nykyinen | ei muutosta | Roolit ovat jo oikein. |

### 3B. Sisäinen linkitys täsmäankkureilla

1. **Etusivulta** linkit Tampereen pinnoitus- ja maalaussivuille ankkureilla "Tiilikaton pinnoitus Tampere" ja "Talon maalaus Tampere" (nyt etusivu linkittää vain `-pirkanmaa`-hubeille). Paikka: palvelukorttien alle tai toiminta-aluepalkkiin.
2. **Yleissivu ↔ palvelusivut:** `maalauspalvelut-<kunta>` linkittää saman kunnan kahdelle palvelusivulle täsmäankkureilla (tarkista `CityServices.tsx`, osin jo näin), ja palvelusivut takaisin ankkurilla "Maalausliike <Kunta>" (tai "Kaikki palvelut <kunnassa>", jos kysymys 1 = ei).
3. **Hinta ↔ hub:** hintasivulta linkki hubiin ("Talon maalaus Pirkanmaalla: näin työ etenee") ja hubista hintasivulle ("Talon maalauksen hinta").
4. **Footer:** "Ulkomaalaus" → "Talon maalaus" (sivun H1 on "Talon maalaus").
5. **Puhdistuksen kaupunkisivut** saavat nyt yhden sisäisen linkin kukin (osa 2, luku 6). Lisätään linkit pinnoituksen kaupunkisivuilta ("Katso myös: katon puhdistus <kunnassa>") ja puhdistuksen palvelusivulta kuntalista. Tämä on linkitys, ei uutta puhdistussisältöä, joten sääntö "ei uusia puhdistussisältöjä" ei estä sitä.
6. **Artikkeleista** linkki kunnan sivulle, kun artikkeli mainitsee kunnan.

**Mittari:** `/tiilikaton-pinnoitus-tampere/` sijainti 45 → alle 15; "katon maalaus tampere" 55 → 30; "julkisivumaalaus tampere" 26 → alle 10; sivuja per haku 1,56 → 1,2.

### Toteutus 12.10.2026

Haara `claude/vaihe-3-sivuroolit`. Tehty:

- **3A titlet ja H1:** aluesivut "Maalausliike ja kattopalvelut <Kunta>" (title, H1, eyebrow ja Service-schema). Pinnoituksen kaupunkisivut "Tiilikaton pinnoitus ja maalaus <Kunta> | Pintanen": hinta siirtyi pois titlestä (se on kuvauksessa), jotta "maalaus" mahtuu alle 60 merkin. Maalauksen kaupunkisivut saavat "ulkomaalaus ja julkisivumaalaus" -muodon, kun koko title on enintään 66 merkkiä (Tampere, Nokia, Forssa, Akaa, Kihniö, Urjala, Virrat); pidemmillä kuntanimillä jää "ulkomaalaus". Hintalaskuri "Hintalaskuri: tiilikaton pinnoitus ja talon maalaus". Kolme yli 160 merkin kuvausta lyhennetty.
- **3B linkitys:** etusivun tekstiosiosta linkit "tiilikaton pinnoitus Tampere" ja "talon maalaus Tampere"; palvelusivuilta takaisin aluesivulle ankkurilla "Maalausliike ja kattopalvelut <Kunta>"; hubit → hintasivut ("tiilikaton pinnoituksen hinta", "talon maalauksen hinta") ja hintasivut → hubit ("tiilikaton pinnoitus Pirkanmaalla", "talon maalaus Pirkanmaalla"); footerin "Ulkomaalaus" → "Talon maalaus". Aluesivu ↔ palvelusivut oli jo täsmäankkureilla.
- **Ei tehty:** puhdistussivujen linkit (Eerikin päätös: palvelu loppunut); artikkelilinkit kuntasivuille (artikkeleissa ei mainita kuntia); sivukohtainen "Päivitetty"-päivä gitistä (vaatii oman toteutuksen, siirretty myöhemmäksi).
- Havainto vaiheeseen 4: pinnoituksen hintasivulla on lause "eikä kattoremontteja tehdä meillä" ("emme tee" -lause), korjataan 4A:n yhteydessä.

---

## Vaihe 4: Sisältö (tekstimuutokset datatiedostoihin, Eerikin ok)

### 4A. Kattoremontti-haut (osa 4, luvut 3.4 ja 7, kohta 5)

23 kyselyä viikossa ("tiilikattoremontti sastamala", "kattoremontti ylöjärvi" jne.) sijalla 25, eikä sivustolla ole vastausta. Hakija on paras mahdollinen pinnoitusasiakas.

1. Artikkeli "Pinnoitus vai uusi katto" (jonossa 13.10.): otsikkoon sana "kattoremontti", esim. "Tiilikattoremontti vai pinnoitus: milloin kumpikin kannattaa". Tarkista artikkelista "säästää jopa 15 000 euroa" -tyyppiset lauseet (sääntö: ei säästöväitteitä) ja kattoremontin hinta 15 000–30 000 € (ei lähdettä; **kysymys 6**).
2. Pinnoituksen kaupunkisivuille H2 "Pinnoitus kattoremontin sijaan <kunnassa>" ja 3–4 virkettä: milloin pinnoitus riittää (tiili ehjä, ei vuotoja, aluskate kunnossa) ja milloin katto kannattaa uusia. Muotoilu ilman "emme tee" -lausetta: "Jos tiilet ovat rikki laajalti tai aluskate vuotaa, katto kannattaa uusia. Kerromme sen kuntotarkastuksessa suoraan." **Kysymys 5.**
3. FAQ-kysymys "Kannattaako tiilikatto pinnoittaa vai uusia?" yhteiseen FAQ:hin (`faqData.ts`).

### 4B. Rinnakkaismuodot H2- ja FAQ-tasolle (osa 4, löydös 8; osa 3, luku 4.3)

Google ei yhdistä kaikkia muotoja samaan sivuun: "katonpuhdistus" vs "katon puhdistus", "tiilikaton maalaus" vs "katon maalaus". Lisätään luonnollisesti tekstiin, ei listana:
- pinnoitussivut: "tiilikaton maalaus", "katon maalaus", "korkeapaineruiskulla" (CLAUDE.md käyttää jo tätä sanaa; sivuilla lukee "ruiskulla")
- maalaussivut: "julkisivumaalaus", "ulkomaalaus", "puutalon maalaus", "mökin maalaus"
- yleissivut: "maalausliike", "maalari" (kysymys 1)
- "kattohuolto" (osa 3, luku 4.3): sana kattaa pesun, puhdistuksen ja pinnoituksen eikä esiinny sivustolla kertaakaan. **Kysymys 7.**

### 4C. FAQ-kysymykset hakudatasta (osa 4, luku 3.3; osa 3, luku 4.4)

| Kysymys | Sivu | Huomio |
|---|---|---|
| Miksi hinta annetaan kohteelle eikä neliölle? | talon maalauksen hintasivu | Vastaus osasta 4: "Hinta lasketaan talon mukaan: pinta-ala, kerrosluku, verhouksen kunto ja pesun tarve ratkaisevat. Siksi annamme hinnan arviokäynnin jälkeen kirjallisena, ja laskurista saa haarukan heti." |
| Kannattaako tiilikaton pinnoitus? / Onko se turhaa? | pinnoituksen hub | Vastaus "Pakkasrapautuminen rikkoo kuluneen tiilen" -kappaleesta. |
| Saako talon maalauksesta kotitalousvähennystä? | maalaussivut | Kysymysmuoto; vastaus on jo `KOTITALOUSVAHENNYS`-vakio. |
| Kannattaako tiilikatto pinnoittaa vai uusia? | yhteinen FAQ | 4A. |
| Paljonko katon huoltomaalaus maksaa? | pinnoituksen hintasivu | Sana "huoltomaalaus" + hinta 2 850–7 000 €. |
| Paljonko Ormax-tiilikaton pinnoitus maksaa? | pinnoituksen hintasivu | Ormax on yleisin betonitiili; sama hinta. **Kysymys 8.** |
| Milloin on paras aika maalata talo? | maalaussivut | "Kausi huhti–syyskuu, kuiva sää ja yli 5 °C" (lämpötilaraja tarkistettava Tikkurilan ohjeesta ennen kirjoittamista). |
| Mitä maksaa katon puhdistus sammaleesta? | puhdistuksen hintasivu | Lyhyesti-laatikkoon suora hintavirke (sääntö: ei uusia puhdistussisältöjä; tämä on yksi virke olemassa olevaan laatikkoon. **Kysymys 9.**) |

Ei vastata: "peltikaton pinnoitus" (ei markkinoida, ei "emme tee" -lausetta).

### 4D. Ristiriidat (osa 2, luku 2)

| Aihe | Nyt | Ehdotus |
|---|---|---|
| Milloin tiilikatto pinnoitetaan | "15–20 vuotta vanha" (25 sivua), "tehdaspinta kuluu 10–15 vuodessa" (24), "10–15 vuotta vanha" (6) | Yksi luku kaikkialle. **Kysymys 4.** |
| Lisäiän sanamuoto | "kestää 15–20 vuotta pidempään" (34) vs "saa 15–20 vuotta lisää ikää" (1) | Yksi lause jäi vanhaan muotoon → korjataan. |
| Kotitalousvähennys | "työn osuudesta" (88) vs "työn hinnasta" (8) | "työn osuudesta" kaikkialle (sama merkitys). |
| ALV-maininta | vain puhdistuksen hintasivulla | **Kysymys 10.** |
| Kattoremontin hinta 15 000–30 000 € | yhdellä sivulla ilman lähdettä | **Kysymys 6.** |
| Katon puhdistusväli | "vuosittain" vs "2–5 vuoden välein" | Palvelu poistuu: ei kosketa. |

Osan 2 skripti `ristiriidat.mjs` kannattaa tuoda repoon testiksi, jos se on tallessa (**kysymys 12**).

### Toteutus 12.10.2026 (haara `claude/vaihe-4-sisalto`, Eerik: "tee kaikki vaiheet esikatseluun")

- 4A: artikkelin otsikko "Tiilikattoremontti vai pinnoitus: kumpi kannattaa?", kattoremontin hinta 15 000–30 000 € artikkeliin, hintasivulle ja yhteiseen UKK:hon lähteineen (`docs/sisallon-lahteet-2026-10-12.md`); Eerikin kattoremontti-lause kaupunkisivujen korttiin, hintasivulle ja UKK:hon; hintasivun "eikä kattoremontteja tehdä meillä" poistettu. UKK "Kannattaako tiilikatto pinnoittaa vai uusia?" yhteiseen FAQ:hin.
- 4B: "katon maalaus" ja "korkeapaineruiskulla" pinnoituksen palvelusivulle, Lyhyesti-laatikkoon ja UKK:hon; "puutalon maalaus" ja "mökin maalaus" maalaussivulle ja UKK:hon (Eerik hylkäsi lauseen "ovat meille sama työ" epäluonnollisena 12.10.; tilalla "puutalon maalaus" nimilistassa ja mökkilause matkoista, jotka sisältyvät hintaan); "maalaria" aluesivujen palveluosioon. "Kattohuolto" ei käytössä.
- 4C: UKK:t lisätty: hinta kohteelle eikä neliölle (maalauksen hintasivu), kannattaako pinnoitus (pinnoituksen hub), kotitalousvähennys ja paras maalausaika ja mökit (maalaussivut), huoltomaalauksen hinta, Ormax ja alkaen 15 €/m² (pinnoituksen hintasivu, testi sallii vain tämän muodon), puhdistuksen hintavirke 800–2 500 € (puhdistuksen hintasivu). ALV-lause "Hinnat sisältävät arvonlisäveron 25,5 %" pinnoituksen ja maalauksen hintasivuille hintakorttien ulkopuolelle.
- 4D: "lisää ikää" → "kestää jopa 15–20 vuotta pidempään"; "työn hinnasta" → "työn osuudesta" (kotitalousvähennysartikkeli, päivitetty 12.10.).
- llms.txt: `<link rel="alternate" type="text/plain">` index.html:ään, rajauslause johdantoon, osio "Usein kysyttyä" (yhteinen, pinnoitus- ja maalaus-UKK).
- 4E: artikkelijono ennallaan; ensimmäinen artikkeli julkaistaan 13.10. uudella otsikolla.

### 4E. Artikkelijono

Jonossa: 13.10. Pinnoitus vai uusi katto, 20.10. Tiilikaton pinnoituksen työvaiheet, 27.10. Huoltomaalaus vai uusi ulkoverhous, 3.11. Voiko tiilikaton pinnoittaa itse, 10.11. Tiilikaton puhdistus itse vai ammattilainen. Osa 3 ehdottaa lisäkappaleita artikkeliin "Kuinka usein puutalo maalataan" (talon maalaaminen itse: hinta ja voiko). Lummecolla on kymmeniä artikkeleita; tahti yksi viikossa on CLAUDE.md:n mukainen, ja jono riittää marraskuun puoliväliin. Seuraavat aiheet kannattaa päättää erikseen.

---

## Vaihe 5: Suorituskyky ja saavutettavuus (osa 3, luku 1; osa 2, luku 3)

Ei näkyviä muutoksia, mutta testataan esikatselussa PageSpeedilla ennen mergeä.

### 5A. CLS 0,135 pinnoitussivulla: fontit

Syy: neljä web-fonttia (Open Sans 400/600, Montserrat 700/800) vaihtuvat piirron jälkeen ja CTA-napit siirtyvät. Korjaus kahdessa osassa: (1) `vite-plugin-spa-routes.ts` lisää `<link rel="preload" as="font">` neljälle woff2-tiedostolle (tiedostonimet selviävät buildissa), (2) `index.css`:ään varafontit `size-adjust`/`ascent-override`-arvoilla, jotta Arialin ja Montserratin rivikorkeus täsmää. Tavoite CLS alle 0,05 molemmilla sivuilla. Tämä on tehtävä ennen kuin kenttädataa kertyy, muuten sivusto epäonnistuu Core Web Vitalsissa heti.

### 5B. Kuvat

- Maalaussivun hero `puutalon-seinien-maalaus-kaynnissa-tampere-800.webp` (81 KiB) ladataan 800 px:nä 665 px:n paikkaan: tarkista `sizes`-attribuutti `PageHero.tsx`:ssä.
- 269 `<img>`-tagia ilman `width`/`height`: lisätään `OptimizedImage`/`ResponsiveImage`-komponentteihin, kun kuvan koko tiedetään.
- Kuvasitemappiin 54 sisältökuvaa (kohdekuvat) otsikolla ja kuvauksella (osa 2, luku 5).
- 76 käyttämätöntä kuvatiedostoa: **kysymys 11.**

### 5C. Saavutettavuus (axe)

1. `aria-hidden`-säiliöissä fokusoitavia nappeja (arvosteluseinän kopiot, liukuri): lisätään `inert`-attribuutti kopioihin. Korjaa myös Lighthousen a11y-pisteet (93 → lähelle 100).
2. Kontrasti: `--accent-ink` yhden sävyaskeleen tummemmaksi; tarkista `text-muted-foreground` `bg-accent-light`-taustalla. Näkyvä mutta hienovarainen muutos → esikatselu.
3. Leipätekstin linkit alleviivatuiksi (nyt vain väri).
4. "Siirry sisältöön" -linkki.
5. Vaakagalleria näppäimistöllä tavoitettavaksi (`tabindex="0"`, `role="region"`).
6. `<div aria-label="5 tähteä">` → `role="img"`.

### Toteutus 12.10.2026 (sama haara kuin vaihe 4)

- 5A: `<link rel="preload" as="font">` neljälle woff2-tiedostolle (plugin lukee hash-nimet dist/assets-kansiosta), varafontit "Open Sans Fallback" ja "Montserrat Fallback" Arialista capsize-metriikoilla (size-adjust 105,15 % / 112,83 %). CLS tarkistetaan PageSpeedilla esikatselusta.
- 5B: kuvasitemappiin kaupunkisivujen kohdekuvat kuvatekstein; `scripts/pakkaa_kuvat.py` pakkaisi WebP-kuvat laatuun 75, mutta kuiva ajo 12.10. ei löytänyt yhtään kuvaa, joka pienenisi 10 %: kuvat ovat jo pakattu (25,4 MB yhteensä), joten kuvia ei muutettu. Heron `sizes` tarkistettu (34vw on oikein). Käyttämättömiä kuvia ei poisteta.
- 5C: `inert` arvosteluseinän kopioihin, `--accent-ink` #0091eb → #007bc7 (4,5:1 valkoisella), leipätekstin linkit alleviivattu (`main p a`), "Siirry sisältöön" -linkki, vieritettävät arvostelulistat näppäimistöllä (`role="region"`, `tabindex="0"`), tähtirivi `role="img"`. vendor-ui-paketista pois recharts, cmdk, vaul ja embla.

### 5D. Ei tehdä nyt

- Kriittinen CSS inline (render-blocking 570–600 ms): PR 88 poisti async-CSS:n tarkoituksella FOUC:n takia. Palataan, kun kenttädata näyttää LCP:n.
- Käyttämätön JavaScript 92 KiB (`vendor-ui`, `vendor-motion`): vaatisi komponenttien karsintaa; hyöty pieni suhteessa työhön.
- react-router 7 -päivitys (moderate-haavoittuvuus, avoin uudelleenohjaus): major-versio, oma PR myöhemmin.
- 35 käyttämätöntä shadcn-komponenttia: eivät päädy bundleen; siivous omana PR:nä joskus.

---

## Vaihe 6: Google Business Profile ja GA4 (Eerik tekee itse, 1–2 h)

Nämä ovat auditoinnin mukaan suurin yksittäinen ero Lummecoon paikallispaketissa. Osoite jää näkyviin (Eerikin päätös).

1. **Palvelut** (tyhjä nyt): Tiilikaton pinnoitus Pirkanmaa, Tiilikaton maalaus, Talon ulkomaalaus, Julkisivumaalaus, Huoltomaalaus, Mökin maalaus, Katon pesu ja sammaleen poisto. Kuvaus enintään 300 merkkiä kullekin; hinta haarukkana, jos haluat.
2. **Toimiala:** "Maalaustaide" → "Maalari". Kattourakoitsija pysyy ensisijaisena.
3. **Palvelualue:** postinumerot kunniksi ja puuttuvat kunnat (Kihniö, Mänttä-Vilppula, Parkano, Ruovesi, Urjala, Vesilahti, Virrat) sekä Pirkanmaa ja Kanta-Häme maakuntina. Yläraja 20 aluetta.
4. **Kuvaus:** osan 3 luvun 3.3 kohdan 5 ehdotus on sääntöjen mukainen (luvut, hinnat, Nowocoat, takuut), mutta alkaa "tamperelainen perheyritys". **Kysymys 2.**
5. **Palveluvaihtoehdot:** lisää "Palvelua paikan päällä". Varauslinkki `pintanen.fi/tarjouspyynto/`.
6. **Kysymykset ja vastaukset:** 5–8 omaa kysymystä (hinta, kesto, takuu, alue, sade, kotitalousvähennys), samat vastaukset kuin sivuston FAQ:ssa.
7. **Kuvat:** kansikuva, 3–5 kuvaa tekijöistä työssä, ennen–jälkeen-parit; tiedostonimet ennen latausta.
8. **Arvostelut:** 28 → tavoite 50 keväällä 2027; pyyntö joka työn jälkeen, vastaus jokaiseen.
9. **UTM** sivustolinkkiin: `?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
10. **GA4:** merkitse `generate_lead`, `phone_click`, `whatsapp_click` ja `tarjouspyynto_click` avaintapahtumiksi (Hallinta → Tapahtumat). Koodiin lisätään laskurin tapahtumat `laskuri_aloitus`, `laskuri_askel`, `laskuri_valmis` (vaihe 1:n yhteydessä, ei vaadi päätöstä).

---

## Vaihe 7: Tietosuoja ja CRM (osa 2, luvut 7–8)

Cloudflare Web Analytics on kunnossa (tarkistettu). Jäljellä:

1. **Selosteen lupaus "poistetaan viimeistään kahden vuoden kuluttua":** CRM:ssä ei ole ajastettua poistoa. Joko toteutetaan CRM:ssä (pg_cron) tai seloste muutetaan muotoon "poistetaan, kun ne eivät enää ole tarpeen". **Kysymys 13.**
2. **Roskakorista palautus:** poistopyynnön jälkeen tiedot pitää tyhjentää roskakorista. Lisätään CRM:n ohjeisiin (ei tämän repon muutos).
3. **Käsittelijät nimeltä:** Resend (USA, Data Privacy Framework) ja Supabase selosteeseen; Google ja Cloudflare on jo nimetty. Pieni tekstilisäys `Tietosuoja.tsx`:ään.
4. **WhatsApp:** yksi lause selosteeseen.
5. **Resendin lokien säilytys:** Eerik tarkistaa Resendin asetuksista.
6. **Toinen vastaanottaja** liideille (kopio Eerikin omaan osoitteeseen): **kysymys 14.**
7. **Pyyntörajoitus** `/api/contact`-polulle Cloudflaren WAF-säännöllä (5/min/IP): Eerik tekee Cloudflaren hallinnassa.

### Toteutus 12.10.2026 (sama haara kuin vaihe 4)

- Kohta 3 ja 4: selosteen käsittelijälistaan Resend (Yhdysvallat, DPF-sertifiointi tarkistettu 13.3.2025 changelogista), Supabase (CRM:n tietokanta) ja WhatsApp (Meta Platforms Ireland Limited). Kohta 1: kahden vuoden lupaus pysyy (Eerikin päätös). Kohdat 2, 5 ja 7 ovat Eerikin omia toimia CRM:ssä, Resendissä ja Cloudflaressa; kohta 6 ei tarvita.

---

## Vaihe 8: Seuranta

Search Console -vienti 20.10. (7.–17.10.) ja 3.11. (neljä viikkoa). Osan 4 luvun 8 taulukko on tavoitteet; tärkeimmät:

| Mittari | Auditointi | Lähtötaso 9.10. | 20.10. | 3.11. |
|---|---|---|---|---|
| "Indeksoitu, ei hakemistossa" | 17 | 12 | alle 10 | 0 |
| "Uudelleenohjauksen sisältävä sivu" | 56 | 62 | laskussa | noin 45 (42 on kauttaviivattomia muotoja, jotka jäävät) |
| Etusivun sijainti | 15,6 | 19,8 | alle 10 | alle 8 |
| "tiilikaton pinnoitus tampere" | 15,0 | 21,8 | 12 | alle 10 |
| `/tiilikaton-pinnoitus-tampere/` | 45,5 | 60,5 | 25 | alle 15 |
| Ei-brändiklikkauksia viikossa | 9 | noin 6–9 | 15 | 25 |

Lähtötaso 9.10. on tiedostosta `docs/search-console/lahtotaso-2026-10-12.md` (viennit 12.10., tiedot 9.10. asti, ennen vaiheen 1 julkaisua). Viiden päivän otos on pieni, joten sijaintilukuja luetaan suuntana, ei tarkkana arvona.

Jos 3.11. ollaan alle puolivälissä, painopiste siirtyy arvosteluihin ja mainintoihin (Urakkamaailma, finder, paikallislehti, Nowocoatin referenssi).

---

## Ehdotuksia, joita ei toteuteta (ja miksi)

- **Business Profilen osoitteen piilotus:** Eerikin päätös, osoite näkyy.
- **Neliöhinta AI-yhteenvetoja varten:** sääntö kieltää (paitsi "alkaen 15 €/m²"). Hyväksytään, että tämä jää kilpailijoille, ellei Eerik halua "alkaen 15 €/m²" -lausetta näkyviin (**kysymys 15**).
- **Arvostelutähdet hakutulokseen `aggregateRating`-merkinnällä:** harmaa alue, Googlen ohjeen vastainen omille arvosteluille; auditointi ei suosittele, emme tee.
- **GA4 Consent Mode "advanced":** ristiriidassa selosteen kanssa; nykyinen basic-tila pidetään.
- **Hintalaskurin liidiportin A/B-testi, kiitos-sivu, chatin viive 8 s → 20–30 s:** tuotepäätöksiä, joihin ei ole dataa. **Kysymys 16.**
- **Content-Security-Policy:** vaatii GA:n, Cloudflaren ja Resendin osoitteiden listauksen; pieni hyöty, riski rikkoa analytiikka. Myöhemmin.

---

## Eerikin päätökset 11.10.2026 (vastaukset alla oleviin kysymyksiin)

- **Aluesivut pidetään**, title ja H1 muotoon "Maalausliike ja kattopalvelut <Kunta>". Yhdistäminen harkitaan 3.11. kysely × sivu -datan perusteella.
- **Yritys on tamperelainen.** Oulua ei mainita missään (llms.txt korjattu vaiheessa 1).
- **Evästebanneri pysyy nykyisenä** (Hyväksy + Asetukset).
- **Tiilikatto pinnoitetaan noin 10–15 vuoden iässä.** "15–20 vuotta" on vain lisäikä. Korjattu vaiheessa 1, testi estää paluun.
- **Kattoremontti-lause** kaupunkisivuille ok. **Kattoremontin hinta 15 000–30 000 €** pidetään; lähteet: Laatukoti, Kattokeskus, Saneerauspojat (kirjataan `docs/`-kansioon vaiheessa 4).
- **"Kattohuolto"-sanaa ei käytetä** (viittaa puhdistukseen).
- **Ormax:** FAQ "Pinnoitatteko Ormax-tiilikattoja?" vaiheessa 4 Eerikin tiedoilla (yleisin 2000-luvun tiili; vanhemmissa katoissa monia profiileja; sama työ ja hinta).
- **Puhdistuksen hintavirke** ja **ALV-lause** hintasivuille: ok.
- **Käyttämättömiä kuvia ei poisteta.** Kuvien pakkaus skriptillä vaiheessa 5, laatu tarkistetaan esikatselusta.
- **Osan 2 skriptit** eivät ole tallessa; tarvittavat kirjoitetaan itse.
- **Kahden vuoden poistolupaus** pysyy selosteessa; CRM:n roskakori tyhjennetään käsin, automaatio myöhemmin.
- **Liidikopiota ei tarvita:** eerik@ ja myynti@ ovat sama postilaatikko.
- **Alkaen 15 €/m²** pinnoituksen hintasivun FAQ:hin vaiheessa 4.
- **Chatin kupla 25 s** (tehty vaiheessa 1). **Liidiportti pysyy.** **Kiitos-sivu** tehdään, jos siitä on hyötyä: päätetään GA4-datan jälkeen.
- **Meistä-sivulle ei lisätä** perustamispäivää, vakuutuksia tai rekistereitä.
- **Titlet "hinta 2027"** pysyvät.
- **Pinnoituksen kaupunkisivujen title** (Eerik 12.10.): "Tiilikaton pinnoitus ja maalaus <Kunta> | Pintanen". Hinta vain kuvauksessa ja hintakorteissa.
- **Katon puhdistus on loppunut.** Sivut poistetaan talven aikana (301 pinnoitussivuille). Niille ei lisätä linkkejä vaiheessa 3.
- **GitHub:** gh-työkalu asennettu; push ja PR vasta Eerikin hyväksynnällä.

### Osasta 1 (10.10.2026) lisätyt kohdat

- Vaihe 1: jonossa olevat artikkelit noindex; FAQ "Pitääkö minun olla kotona?" palvelukohtaiseksi (maalaussivulla "seinät").
- Vaihe 3: titlet alle 60 merkin (30 sivua), kuvaukset alle 160; sivukohtainen "Päivitetty"-päivä gitin viimeisestä muutoksesta.
- Vaihe 4: llms.txt (link-tagi, FAQ-osio, rajauslause). **Kokemuksia-sivu tehdään** (Eerik 12.10.: "kokemussivu ok"; kumoaa 11.10. "ei tarvi"). **Arvosteluseinän rajaus päätetty** (Eerik 12.10.): koko seinä (28 arvostelua) vain etusivulla ja /kokemuksia/-sivulla, koska sama lohko joka sivulla teki sivuista Googlen silmissä samanlaisia. Kaupunkisivuilla paikkakunnan omat arvostelut (CityProjects) ja kahden arvostelun nosto linkillä Kokemuksia-sivulle (`ReviewsTeaser`). Palvelusivujen katto- ja seinäkarusellit jäivät ennalleen. Toteutus 12.10.2026 omassa PR:ssä (haara `claude/kokemuksia-arvostelut`), julkaisu Eerikin ok:lla.
- Vaihe 5: vendor-ui-paketin purku (recharts, cmdk, vaul, embla pois yhteispaketista); kuvien pakkaus laatuun 75.
- Ei tehdä: puhdistussivujen uusiminen (palvelu loppunut); Meistä-faktat.

## Alkuperäiset kysymykset (11.10.2026, vastattu yllä)

1. **"Maalausliike <Kunta>"** yleissivujen titleen ja H1:een? Pintanen on ensisijaisesti kattourakoitsija, ja "maalausliike" painottaa maalausta. Vaihtoehto: title "Maalausliike ja kattopalvelut <Kunta> | Pintanen", H1 ennallaan.
2. **Mistä yritys on:** Business Profilen kuvausehdotus sanoo "tamperelainen perheyritys", CLAUDE.md sallii "Olemme kotoisin Oulusta". Kumpi on se yksi totuus kaikkialle? (Molemmat voivat olla totta: "Juuret Oulussa, työt Pirkanmaalla.")
3. **Evästebanneri:** Traficomin linjan mukaan "Hylkää" pitäisi olla ensimmäisellä tasolla "Hyväksy"-napin rinnalla. Koodissa lukee, että nykyinen malli on sinun päätöksesi 5.10. Pidetäänkö vai lisätäänkö "Hylkää"? (Suositus: lisätään, se myös pienentää banneria puhelimessa.)
4. **Minkä ikäinen tiilikatto yleensä pinnoitetaan?** Sivustolla on kolme eri lukua: "15–20 vuotta vanha", "tehdaspinta kuluu 10–15 vuodessa" ja "10–15 vuotta vanha". Yksi luku kaikkialle.
5. **Kattoremontti-teksti pinnoituksen kaupunkisivuille** (4A, kohta 2): onko lause "Jos tiilet ovat rikki laajalti tai aluskate vuotaa, katto kannattaa uusia. Kerromme sen kuntotarkastuksessa suoraan." sinusta ok, vai onko se liian lähellä "emme tee" -lausetta?
6. **Kattoremontin hinta 15 000–30 000 €** on yhdellä sivulla ilman lähdettä. Onko sinulla lähde (esim. tarjouksia, joita asiakkaat ovat näyttäneet), vai poistetaanko luku ja sanotaan "moninkertaisesti pinnoitusta kalliimpi"?
7. **"Kattohuolto"**: saako sanaa käyttää (esim. "kattohuolto ja pinnoitus")? Se kattaa pesun ja pinnoituksen, ja Google ehdottaa hakua "kattohuolto tampere".
8. **Ormax:** voiko sanoa, että Ormax-betonitiilikaton pinnoitus maksaa saman 2 850–7 000 € ja että pinnoitatte niitä? Onko muita tiilimerkkejä, jotka kannattaa mainita (esim. Benders, Monier)?
9. **Puhdistuksen hintasivulle yksi hintavirke** Lyhyesti-laatikkoon ("Mitä maksaa katon puhdistus sammaleesta"): sallittu, vaikka puhdistussisältöjä ei lisätä?
10. **ALV:** hinnat ovat kuluttajahintoja. Lisätäänkö "Hinnat sisältävät alv:n" pinnoituksen ja maalauksen hintasivuille (hintakorttien ulkopuolelle), kuten puhdistussivulla jo on?
11. **76 käyttämätöntä kuvatiedostoa** (mm. harjatiiviste, varatiilien maalaus, ympäristön suojaus): poistetaanko, vai ovatko ne tulevaa käyttöä varten?
12. **Osan 2 skriptit** (`ristiriidat.mjs`, `axe.mjs`, `konversio.mjs`, Playwright-testit): ovatko ne tallessa Macilla tai pilvi-istunnossa? Ne kannattaisi tuoda `scripts/`-kansioon.
13. **Kahden vuoden poistolupaus** selosteessa: toteutetaanko CRM:ssä vai muutetaanko seloste?
14. **Toinen vastaanottaja liideille:** lähetetäänkö kopio myös omaan osoitteeseesi?
15. **"Alkaen 15 €/m²":** sääntö sallii sen. Halutaanko se näkyviin pinnoituksen hintasivulle AI-yhteenvetoja varten, vai pidetäänkö €/m² kokonaan pois?
16. **Tuotepäätökset:** kiitos-sivu lomakkeille, chatin avautumisviive, hintalaskurin liidiportti. Tehdäänkö jotain näistä nyt vai vasta GA4-datan jälkeen?
17. **Osa 1 (10.10.)** puuttuu tältä koneelta. Jos se on Macilla tai Downloads-kansiossa toisella nimellä, lähetä se: osat 2–4 viittaavat siihen (mm. "osa 1, kohta 1" indeksointipyynnöt ja "kohta 5" puhdistussivujen uusiminen).

## Toteutusjärjestys ja arvioitu työmäärä

| Vaihe | Kuka | Aika | Odottaa |
|---|---|---|---|
| 1A–1F tekniset korjaukset | Claude, PR | 4–6 h | ei mitään |
| 2 Search Console | Eerik | 30 min | vaihe 1A tuotannossa (valmis 11.10.); tarkistuslista luvussa 2 |
| 3 sivuroolit ja linkitys | Claude, PR + esikatselu | 3–4 h | kysymykset 1, 7 |
| 4 sisältö | Claude, PR + esikatselu | 4–6 h | kysymykset 2, 4–10, 15 |
| 5 suorituskyky ja saavutettavuus | Claude, PR + PageSpeed | 4–6 h | kysymys 11 |
| 6 Business Profile ja GA4 | Eerik | 1–2 h | kysymys 2 |
| 7 tietosuoja ja CRM | Claude + Eerik | 1–2 h | kysymykset 13, 14 |
| 8 seuranta | Eerik vie, Claude analysoi | 20.10. ja 3.11. | |
