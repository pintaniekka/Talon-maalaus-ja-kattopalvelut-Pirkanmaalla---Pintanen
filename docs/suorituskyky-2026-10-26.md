# Suorituskyky 26.10.2026 (yöajo 2, paketti D)

Mittasimme kaikki sivukartan 91 sivua Lighthousella (mobiili ja tietokone) paikallisesta tuotantobuildista, etsimme hitauden syyt ja teimme viisi korjausta, jokainen omana luonnos-PR:nä. Ulkoasuun ei koskettu. Tämä raportti sisältää mittaustavan, lähtötilanteen, korjausten mitatut vaikutukset, koko sivuston ennen/jälkeen-taulukon, INP-mittauksen, tekemättä jääneet asiat ja kysymykset Eerikille. Raakadata on kansiossa `yoajo/suorituskyky-data/` (projektin tiedostot), ei repossa.

## Yhteenveto

- Lähtötilanne (main c075954): mobiilipisteiden mediaani 88 kaikilla 91 sivulla, tietokone 99. Kuudella tarkemmin mitatulla sivulla (kolme ajoa) mobiili 88, tietokone 99.
- Viisi korjausta: #132 (NUL-tavut pois esirenderöinnistä), #133 (hydraatio uudelleenrakennuksen sijaan), #137 (käyttämätön Sonner pois), #138 (zod pois), #139 (framer-motion laiskasti). Kaikkien päällä kuuden sivun mobiilimediaani 88 → 93, LCP 3,4 s → 2,9 s, FCP 2,3 s → 2,0 s, Speed Index 2,3 s → 2,0 s, TBT 123 ms → 56 ms, tietokone 99 → 100.
- Koko sivusto (91 sivua, yksi ajo per sivu) kaikkien korjausten päällä: mobiilimediaani 93, tietokone 100; 100/100 sivuja 0 (90 sivua saa tietokoneella 100).
- Sivun koko mobiilissa pieneni selvästi: etusivu 1 267 kt → 462 kt, Tampereen pinnoitussivu 935 kt → 420 kt, Lempäälän aluesivu 736 kt → 421 kt. Syy: React rakensi sivun uudelleen ja selain latasi silloin myös näkymän ulkopuoliset kuvat heti (luku 2, löydös 3).
- INP (vuorovaikutuksen viive, Pixel 5 -emulointi, CPU 4× hidastettu): hintalaskuri, liukusäädin, valikko, chat ja evästebanneri pysyvät alle 200 ms:n lukuun ottamatta hintalaskurin paikkakuntavalitsinta (224 ms ennen, 264 ms jälkeen; ero on kohinaa). Korjaukset eivät heikentäneet yhtään vuorovaikutusta.
- Tuotantoa (pintanen.fi) tai Cloudflaren esikatseluja ei voinut mitata tästä ympäristöstä, koska verkko on estetty. Build on sama kuin Cloudflaren, joten pisteet vastaavat tuotantoa, mutta oikean palvelimen vasteaika ja CDN puuttuvat luvuista.

## 1. Mittaustapa

- Build: `npm run build` main-haarasta (c075954, 26.10.2026), Node 22.22.0. Jokainen korjaushaara buildattiin erikseen `npm ci` + `npm run build`. Dist tarjoiltiin `serve` 14.2.6 -palvelimella brotli-pakattuna (`npx serve -l <portti> -n`), yksi portti per build.
- Lighthouse 12.8.2, HeadlessChrome 141 (Playwrightin Chromium), `--headless=new`. Kategoriat: performance, accessibility, best practices, SEO.
- Mobiili: Lighthousen oletus (Moto G Power -profiili, näyttö 412 × 823, DPR 1,75, simuloitu hidastus RTT 150 ms, 1,6 Mbit/s, CPU 4×). Tietokone: `--preset=desktop` (1350 × 940, RTT 40 ms, 10 Mbit/s, CPU 1×).
- Kuusi mittaussivua korjausten vertailuun: `/`, `/tiilikaton-pinnoitus-tampere/`, `/talon-maalaus-pirkanmaa/`, `/maalauspalvelut-lempaala/`, `/hintalaskuri/`, `/artikkelit/milloin-pinnoittaa-tiilikatto/`. Mobiili kolme ajoa (mediaani), tietokone yksi ajo.
- Koko sivusto: 91 sivukartan sivua, yksi mobiili- ja yksi tietokoneajo per sivu, lähtötilanne (main) ja lopputilanne (kaikki viisi korjausta yhdessä, testihaara `claude/yo2-perf-B`).
- INP: Playwright 1.56.1, Pixel 5 -laiteprofiili (kosketus), CPU hidastettu 4× (CDP `Emulation.setCPUThrottlingRate`), Event Timing -rajapinta (`PerformanceObserver`, tyyppi `event`, ryhmitelty `interactionId`:n mukaan, pisin kesto = vuorovaikutuksen arvo). Kolme toistoa, mediaani. Liukusäätimen raahauksessa mitattiin lisäksi ruudunpäivitysten väli.
- Toimintatesti hydraation jälkeen: kaikki 91 sivua avattu Playwrightilla mobiilinäkymässä, konsolivirheet ja -varoitukset kerätty ja tarkistettu, että React liittyi esirenderöityyn DOMiin (sama elementti ennen ja jälkeen). Ei yhtään virhettä tai varoitusta.
- Skriptit (`lh_one.sh`, `lh_all.sh`, `lh_pages.sh`, `lh_summary.py`, `lh_table.py`, `lh_csv.py`, `inp.js`, `console_check.js`, `build_branch.sh`) ovat raakadatakansiossa.

### Mittausvirhe

- Ensimmäinen koko sivuston ajo tehtiin kaksi Lighthousea rinnakkain. Se vääristi mobiilitulokset: mediaani 69 pistettä, TBT 369 ms, LCP 4,5 s. Samat sivut yksi ajo kerrallaan: 88 pistettä, TBT 123 ms, LCP 3,4 s. Kaikki tämän raportin luvut on mitattu yksi ajo kerrallaan. Jos jossain aiemmassa raportissa on huonompia lukuja, mittaustapa pitää tarkistaa ennen vertailua.
- Samasta sivusta peräkkäisissä ajoissa pisteet vaihtelevat yleensä 1–3 pistettä ja TBT 50–100 ms, mutta yksittäinen ajo voi pudota 8–12 pistettä TBT-piikin takia (luku 5). Sitä pienempi ero on kohinaa. Siksi yksittäisten korjausten pieniä eroja ei pidä lukea tarkasti; yhdistelmän ero on selvä.
- `/hintalaskuri/`: lähtötilanteessa Lighthouse ei joka mobiiliajossa löytänyt LCP-elementtiä (NO_LCP), ja silloin sivu ei saa pisteitä. Hydraation jälkeen virhettä ei tullut yhdessäkään ajossa.
- Lighthousen simulointi ei ota huomioon Cloudflaren CDN:ää eikä oikeaa palvelinta. Paikallinen palvelin vastaa alle 20 ms:ssa, ja Lighthouse lisää simuloidun viiveen (TTFB 460 ms mobiilissa). Tuotannossa luvut voivat olla vähän parempia tai huonompia, suunta ei muutu.

## 2. Lähtötilanne (main c075954)

Kuusi mittaussivua, mobiili kolmen ajon mediaani, tietokone yksi ajo:

| Sivu | Mob. P/A/BP/SEO | LCP | TBT | SI | Tietok. P/A/BP/SEO | LCP |
|---|---|---|---|---|---|---|
| / | 87/97/100/100 | 3,3 s | 173 ms | 2,4 s | 99/97/100/100 | 0,9 s |
| /artikkelit/milloin-pinnoittaa-tiilikatto/ | 88/96/100/100 | 3,4 s | 134 ms | 2,2 s | 100/96/100/100 | 0,7 s |
| /hintalaskuri/ | 87/96/100/100 | 3,5 s | 159 ms | 2,2 s | 100/96/100/100 | 0,7 s |
| /maalauspalvelut-lempaala/ | 88/97/100/100 | 3,4 s | 75 ms | 2,3 s | 99/97/100/100 | 0,9 s |
| /talon-maalaus-pirkanmaa/ | 90/97/100/100 | 3,0 s | 113 ms | 2,3 s | 99/97/100/100 | 0,8 s |
| /tiilikaton-pinnoitus-tampere/ | 87/97/100/100 | 3,5 s | 94 ms | 2,3 s | 99/97/100/100 | 0,9 s |

P = performance, A = accessibility, BP = best practices. CLS on kaikilla sivuilla 0.

Mitä pisteitä rajoittaa (Lighthousen painot: TBT 30 %, LCP 25 %, CLS 25 %, FCP 10 %, Speed Index 10 %):

- **LCP 3,0–3,5 s** (pisteet 70–80 sadasta). LCP-elementti on jokaisella sivulla otsikko (`h1`) tai ingressi, ei kuva. Lighthousen erittely etusivulla: TTFB 0,45 s, piirron viive 2,9 s. Viive koostuu HTML:n latauksesta (etusivu 224 kt pakkaamatonta, 20 kt pakattuna), render-blocking CSS:stä (119 kt pakkaamatonta, 20 kt pakattuna, josta 76 % on sivulla käyttämätöntä) ja neljästä esiladatusta fontista (Montserrat 700 ja 800, Open Sans 400 ja 600, yhteensä 75 kt), kaikki 4× hidastetulla suorittimella.
- **TBT 75–173 ms** (pisteet 92–96). Suurin yksittäinen pääsäikeen työ oli Reactin käynnistys: `createRoot` rakensi koko näkymän uudelleen esirenderöidyn HTML:n päälle.
- **FCP 2,2–2,4 s** (pisteet 71–85). Sama syy kuin LCP:llä: CSS ja HTML:n koko.
- Speed Index ja CLS ovat jo lähes täydet.

Lähtötilanteen koodipaketit (pakkaamaton / siirretty brotlilla):

| Tiedosto | Pakkaamaton | Siirretty |
|---|---|---|
| `index.js` (sovellus) | 305 kt | 85 kt |
| `vendor-ui.js` (Radix, lucide ym.) | 225 kt | 74 kt |
| `vendor-motion.js` (framer-motion) | 120 kt | 41 kt |
| `index.css` | 119 kt | 20 kt |
| `vendor-react.js` | 21 kt | 8 kt |
| Fontit (4 × woff2) | 75 kt | 75 kt |
| `index.html` (etusivu) | 224 kt | 20 kt |

Lighthousen mukaan `vendor-motion.js`:stä on sivun latauksessa käyttämättä 74 %, `vendor-ui.js`:stä 47 % ja `index.js`:stä 32 %.

### Löydökset lähtötilanteesta

1. **Ylimääräisiä NUL-tavuja HTML:ssä.** Mainin buildin esirenderöidyssä HTML:ssä oli 18 NUL-tavua 15 sivulla (esimerkiksi `/talon-maalaus-akaa/`, `/meista/`, `/tiilikaton-pinnoitus-tampere/`, `/artikkelit/milloin-pinnoittaa-tiilikatto/`). Selain ja hakukone näkevät tavun �-merkkinä keskellä sanaa ("j�äljet"), kunnes React on rakentanut sivun uudelleen. Syy on React 18:n `renderToPipeableStream`: kun monitavuinen merkki (ä, ö, –) ei mahdu sen 2 kt:n puskurin loppuun, puskuri lähetetään kokonaisena. Sama vika muutti `lastmod.json`-tiivisteitä buildista toiseen. Korjattu PR:ssä #132.
2. **Sivu rakennettiin uudelleen selaimessa.** `src/main.tsx` käytti `createRoot`-funktiota, joka heittää esirenderöidyn HTML:n pois ja rakentaa näkymän uudelleen. Se oli pisin pääsäikeen tehtävä (TBT) ja selittää myös seuraavan kohdan. Korjattu PR:ssä #133.
3. **Mobiili latasi kaikki kuvat heti.** Lähtötilanteessa etusivu latasi mobiilissa 16 kuvaa (929 kt), hydraation jälkeen 7 kuvaa (158 kt). Tampereen pinnoitussivu 11 kuvaa (581 kt) → 4 (100 kt), Lempäälän aluesivu 10 (398 kt) → 5 (117 kt). Todennäköinen syy: `OptimizedImage` antaa `src`-attribuutin ennen `loading="lazy"`-attribuuttia, ja kun React luo kuvaelementin uudelleen, Chrome aloittaa latauksen heti `src`-arvon saatuaan. Esirenderöidyssä HTML:ssä attribuutit ovat valmiina, joten hydraation jälkeen näkymän ulkopuoliset kuvat ladataan vasta vieritettäessä. Attribuuttien järjestys kannattaa silti vaihtaa (kysymys 5), koska `createRoot`-polku on yhä käytössä 404-sivulla ja jonossa olevilla artikkeleilla.
4. **Kirjastoja, joita ei käytetä.** Sonner-ilmoituskomponentti renderöitiin jokaisella sivulla, vaikka sivusto ei lähetä sillä ilmoituksia (33 kt pakkaamatonta). Zod-kirjasto validoi lomakkeet (51 kt), vaikka tarkistukset ovat yksinkertaisia. Koko framer-motion ladattiin ennen käynnistystä, vaikka animaatiot alkavat vasta vuorovaikutuksesta. Korjattu PR:issä #137, #138 ja #139.
5. **Saavutettavuus 96–97 pistettä kaikilla sivuilla.** Kaksi syytä: `color-contrast` (jokaisella sivulla 30–40 elementtiä, esimerkiksi vaaleansininen teksti vaalealla pohjalla, kontrasti 4,13, ja valkoinen teksti sinisellä #0091eb-pohjalla, kontrasti 3,36; raja on 4,5) ja `label-content-name-mismatch` 82 sivulla (Google-arviolinkin `aria-label` "Lue Pintasen Google-arviot" ei sisällä linkin näkyvää tekstiä; etusivulla myös palvelukorttien linkit). Kontrasti on ulkoasuasia (kysymys 2). Linkkien `aria-label` korjataan yöajo 3:n paketissa E (PR #136).
6. **Kuvat 800 px leveinä 284 px:n tilaan.** Lighthouse ehdottaa 56 sivulla mobiilissa pienempää kuvakokoa (`uses-responsive-images`, etusivulla säästö 42 kt hydraation jälkeen, Tampereen pinnoitussivulla 54 kt). Kuvasarjassa on 400 ja 800 px, ja 412 px:n näytöllä DPR 1,75 valitsee 800 px:n kuvan. 600 px:n koko puuttuu (kysymys 3).
7. **CSS 76 % käyttämätöntä.** Yksi 119 kt:n tyylitiedosto kaikille sivuille, josta sivu käyttää noin neljänneksen. Render-blocking, Lighthousen arvio 150 ms. Tailwindin luokat ovat kaikille sivuille yhteisiä, joten jako sivuittain ei ole suoraviivainen (luku 6).

## 3. Korjaukset ja niiden mitattu vaikutus

Kaikki haarat on tehty main-haarasta (c075954), eikä niissä ole ulkoasumuutoksia. Jokaiselle on ajettu tsc, lint (0 virhettä, 10 aiempaa varoitusta), testit, build, `verify_dist.py` (ONGELMAT: 0) ja `verify_redirects.py` (431 sääntöä, 0 ongelmaa); GitHubin CI on vihreä. Tulokset ovat PR-kuvauksissa.

| PR | Haara | Muutos | Mitattu vaikutus (kuusi sivua, mobiilimediaani) |
|---|---|---|---|
| #132 | `claude/yo2-perf-prerender-nul` | NUL-tavut pois esirenderöinnistä, `verify_dist.py` tarkistaa; `lastmod.json` 15 tiivistettä | Ei pistevaikutusta; HTML on oikein ilman JavaScriptiä ja hydraatio täsmää. Virhekorjaus, julkaistavissa suoraan. |
| #133 | `claude/yo2-perf-hydrate` | `hydrateRoot` ensimmäisen piirron jälkeen (`requestAnimationFrame` + `setTimeout`), `createRoot` vain tyhjälle juurelle; `App.tsx`:n `onReady`/`fallback` pois. Sisältää #132:n commitin. | TBT 123 → 17 ms, LCP 3,4 → 3,2 s, pisteet 88 → 90 (hintalaskuri 87 → 93, artikkeli 88 → 93), tietokone 99 → 100. Kuvatavut mobiilissa etusivulla 929 → 158 kt. |
| #137 | `claude/yo2-perf-sonner` | Sonner ja next-themes pois (`App.tsx`, `ui/sonner.tsx`, lukkotiedostot) | `index.js` 305 → 270 kt. Yksin 88 → 88 (LCP 3,4 → 3,3 s, SI 2,3 → 2,2 s). Hydraation päällä yhdessä #138:n kanssa 90 → 91, LCP 3,2 → 3,1 s. |
| #138 | `claude/yo2-perf-zod` | Lomakkeen tarkistus ilman zodia (`src/lib/contactForm.ts`), samat virheilmoitukset ja sama JSON; zod pois lukkotiedostoista | `index.js` 305 → 252 kt. Yksin 88 → 88 (LCP 3,4 → 3,3 s). Hydraation päällä yhdessä #137:n kanssa 90 → 91. |
| #139 | `claude/yo2-perf-motion` | `LazyMotion` + `m`-komponentit, `domAnimation` laiskasti (`src/lib/motionFeatures.ts`), `vendor-motion`-paketti pois `vite.config.ts`:stä, uusi `motion.test.ts` | `vendor-motion.js` (120 kt) pois polulta, laiska paketti 39 kt. Yksin 88 → 88 (FCP 2,3 → 2,2 s). Muiden päällä 91 → 93, LCP 3,1 → 2,9 s, SI 2,2 → 2,0 s. |

Vaiheittainen mittaus (kuusi sivua, mobiili kolmen ajon mediaani, tietokone yksi ajo):

| Vaihe | Mob. pisteet | FCP | LCP | TBT | SI | Tietok. pisteet | Tietok. LCP |
|---|---|---|---|---|---|---|---|
| main | 88 | 2,3 s | 3,4 s | 123 ms | 2,3 s | 99 | 0,9 s |
| `hydrateRoot` heti (välivaihe, hylätty) | 89 | 2,5 s | 3,3 s | 23 ms | 2,5 s | 100 | 0,7 s |
| #133 hydraatio piirron jälkeen | 90 | 2,3 s | 3,2 s | 17 ms | 2,3 s | 100 | 0,7 s |
| #137 Sonner pois (yksin) | 88 | 2,2 s | 3,3 s | 178 ms | 2,2 s | 100 | 0,8 s |
| #138 zod pois (yksin) | 88 | 2,2 s | 3,3 s | 158 ms | 2,2 s | 99 | 0,8 s |
| #139 framer-motion laiskasti (yksin) | 88 | 2,2 s | 3,3 s | 166 ms | 2,2 s | 99 | 0,9 s |
| #133 + #137 + #138 | 91 | 2,2 s | 3,1 s | 19 ms | 2,2 s | 100 | 0,7 s |
| **#133 + #137 + #138 + #139 (lopputilanne)** | **93** | **2,0 s** | **2,9 s** | **56 ms** | **2,0 s** | **100** | **0,7 s** |

TBT yksittäisissä poistoissa (158–178 ms) on kohinaa: ilman hydraatiota arvo vaihtelee 75–180 ms ajosta toiseen. Lopputilanteen TBT 56 ms on suurempi kuin pelkän hydraation 17 ms, koska FCP aikaistuu ja osa hydraatiosta siirtyy FCP:n jälkeiseen mittausikkunaan; pisteissä ero hydraatiosta lopputilanteeseen on silti +3.

Kuusi sivua ennen ja jälkeen (mobiili kolmen ajon mediaani, tietokone yksi ajo):

| Sivu | Lähtö mob. | Lähtö tietok. | Jälkeen mob. | Jälkeen tietok. | LCP mob. | TBT mob. | FCP mob. |
|---|---|---|---|---|---|---|---|
| / | 87 | 99 | **91** | **100** | 3,3 → 3,0 s | 173 → 152 ms | 2,4 → 2,0 s |
| /artikkelit/milloin-pinnoittaa-tiilikatto/ | 88 | 100 | **96** | **100** | 3,4 → 2,6 s | 134 → 24 ms | 2,2 → 1,9 s |
| /hintalaskuri/ | 87 | 100 | **95** | **100** | 3,5 → 2,7 s | 159 → 26 ms | 2,2 → 1,9 s |
| /maalauspalvelut-lempaala/ | 88 | 99 | **92** | **100** | 3,4 → 3,1 s | 75 → 44 ms | 2,3 → 2,0 s |
| /talon-maalaus-pirkanmaa/ | 90 | 99 | **94** | **100** | 3,0 → 2,7 s | 113 → 96 ms | 2,3 → 2,0 s |
| /tiilikaton-pinnoitus-tampere/ | 87 | 99 | **92** | **100** | 3,5 → 3,1 s | 94 → 69 ms | 2,3 → 2,0 s |

Etusivu jää muita alemmas, koska sen HTML on suurin (224 kt pakkaamatonta: 226 inline-SVG-kuvaketta 112 kt ja luokka-attribuutit 62 kt) ja DOM-elementtejä on 3 500 (muilla mittaussivuilla 340–2 050). Hydraatio kestää siellä pisimpään.

### Mergejärjestys

- #132 ensin (virhekorjaus). #133 sisältää saman commitin, joten #132:n jälkeen #133 pienenee kahteen tiedostoon.
- #137, #138 ja #139 muuttavat kaikki `App.tsx`:ää ja `package.json`-, `package-lock.json`- ja `bun.lock`-tiedostoja, ja #133 ja #139 molemmat `App.tsx`:ää. Kun ensimmäinen on mergetty, muut tarvitsevat mainin mergen haaraan. Ristiriidat ovat samoja rivejä `App.tsx`:n tuonneissa ja kääreissä sekä lukkotiedostoissa; ratkaisin ne testihaarassa `claude/yo2-perf-B`, ja sen build on tämän raportin lopputilanne. Lukkotiedostot kannattaa ratkaista ajamalla `npm install` ja `bun install` mergen jälkeen, ei käsin.
- Kaikki viisi ovat luonnoksia. Ne eivät muuta ulkoasua, mutta #133 ja #139 muuttavat sivun käynnistystapaa, joten Cloudflaren esikatselu kannattaa katsoa ennen mergeä (`python3 scripts/verify_live.py <esikatselu-url> dist`).

## 4. Kokeiltu, ei vaikutusta

- **Etusivun laiska lataus** (`Index` omaan pakettiin `lazyWithRetry`-funktiolla, haara `claude/yo2-perf-index-lazy`, ei PR:ää). `index.js` pienenee 305 → 230 kt ja etusivu saa 28 kt:n oman paketin, mutta alasivuilla SEO-komponentti siirtyy omaan 20 kt:n pakettiin, joka ladataan ketjussa. Yksin mainin päällä 88 → 88 (LCP 3,4 → 3,4 s). Hydraation, Sonner- ja zod-poiston päällä 91 → 92, mutta lopputilanteen päällä 93 → 93 ja etusivu 91 → 89, TBT 56 → 79 ms. Ei PR:ää.
- **`hydrateRoot` heti koodin latauduttua** (välivaihe): TBT 123 → 23 ms, mutta FCP 2,3 → 2,5 s ja SI 2,3 → 2,5 s, koska nopealla yhteydellä hydraatio ehti ensimmäisen piirron eteen. Korvattu piirron jälkeen alkavalla hydraatiolla (#133).
- **Tietokoneella** kaikki sivut ovat jo 99–100 lähtötilanteessa, joten korjaukset näkyvät siellä vain TBT:ssä (14 → 0 ms) ja LCP:ssä (0,9 → 0,7 s).

## 5. Koko sivusto: 91 sivua ennen ja jälkeen

Yksi mobiili- ja yksi tietokoneajo per sivu, lähtötilanne main c075954 ja lopputilanne kaikki viisi korjausta (`claude/yo2-perf-B`). Yhden ajon kohina on yleensä 1–3 pistettä, mutta yksittäinen ajo voi pudota enemmän (ks. Yksittäisten ajojen kohina alla), joten yksittäisen sivun eroa ei pidä lukea tarkasti; mediaanit ja jakauma ovat luotettavia. Mitattu 26.10.2026 klo 15–17 (UTC), lähtötilanne ensin ja lopputilanne sen jälkeen, ei muita ajoja samaan aikaan.

- Mobiili: mediaani 88 → **93** (min 76 → 87, max 94 → 96). Vähintään 90 pistettä: 29 → 85 sivua 91:stä. 100 pistettä: 0 → 0.
- Tietokone: mediaani 99 → **100**. 100 pistettä: 16 → 90 sivua 91:stä. Molemmilla 100: 0 → 0.
- LCP mobiili: mediaani 3,5 s → **2,9 s** (max 4,3 s → 3,6 s). FCP 2,3 s → 2,0 s, Speed Index 2,3 s → 2,0 s.
- TBT mobiili: mediaani 110 ms → **53 ms** (max 317 → 166 ms). Tietokoneella 18 → 0 ms.
- CLS: 0,00 → 0,00 (mediaani; ei asettelun hyppäyksiä).

Sivutyypeittäin (mobiilipisteiden mediaani ennen → jälkeen, LCP mobiili, tietokone):

| Sivutyyppi | Sivuja | Mob. ennen → jälkeen | LCP mob. | TBT mob. | Tietok. ennen → jälkeen |
|---|---|---|---|---|---|
| Etusivu | 1 | 88 → **90** | 3,3 → 3,0 s | 158 → 166 ms | 99 → **100** |
| Artikkelit | 6 | 89 → **95** | 3,3 → 2,6 s | 97 → 18 ms | 100 → **100** |
| Muut (hintalaskuri, tarjouspyyntö, meistä, referenssit, kokemuksia, toiminta-alueet, yhteystiedot, tietosuoja) | 8 | 90 → **94** | 3,2 → 2,8 s | 94 → 29 ms | 100 → **100** |
| Aluesivut (maalauspalvelut-) | 24 | 87 → **91** | 3,6 → 3,2 s | 97 → 49 ms | 99 → **100** |
| Talon maalaus (Pirkanmaa, hinta, kaupungit) | 26 | 90 → **94** | 3,1 → 2,8 s | 147 → 66 ms | 99 → **100** |
| Tiilikaton pinnoitus (Pirkanmaa, hinta, kaupungit) | 26 | 88 → **93** | 3,5 → 2,8 s | 127 → 67 ms | 99 → **100** |

| Sivu | Lähtö mob. | Lähtö tietok. | Jälkeen mob. | Jälkeen tietok. | LCP mob. (s) | TBT mob. (ms) | CLS mob. |
|---|---|---|---|---|---|---|---|
| / | 88 | 99 | **90** | **100** | 3,3 → 3,0 | 158 → 166 | 0,00 → 0,00 |
| /artikkelit/ | 90 | 100 | **94** | **100** | 3,4 → 2,9 | 75 → 8 | 0,00 → 0,00 |
| /artikkelit/kotitalousvahennys-katto-ja-maalaustyot/ | 88 | 100 | **96** | **100** | 3,2 → 2,6 | 182 → 16 | 0,00 → 0,00 |
| /artikkelit/kuinka-usein-puutalo-maalataan/ | 89 | 100 | **95** | **100** | 3,3 → 2,6 | 115 → 21 | 0,00 → 0,00 |
| /artikkelit/milloin-pinnoittaa-tiilikatto/ | 90 | 100 | **95** | **100** | 3,3 → 2,6 | 66 → 13 | 0,00 → 0,00 |
| /artikkelit/pinnoitus-vai-uusi-katto/ | 87 | 100 | **96** | **100** | 3,2 → 2,6 | 204 → 24 | 0,00 → 0,00 |
| /artikkelit/tiilikaton-pinnoituksen-tyovaiheet/ | 89 | 100 | **95** | **100** | 3,4 → 2,6 | 79 → 31 | 0,00 → 0,00 |
| /hintalaskuri/ | 93 | 100 | **95** | **100** | 2,9 → 2,7 | 76 → 24 | 0,00 → 0,00 |
| /kokemuksia/ | 88 | 100 | **92** | **100** | 3,3 → 3,0 | 138 → 20 | 0,00 → 0,00 |
| /maalauspalvelut-akaa/ | 84 | 99 | **91** | **100** | 4,0 → 3,2 | 85 → 64 | 0,00 → 0,00 |
| /maalauspalvelut-forssa/ | 88 | 99 | **91** | **100** | 3,5 → 3,2 | 68 → 47 | 0,00 → 0,00 |
| /maalauspalvelut-hameenkyro/ | 83 | 99 | **88** | **100** | 4,0 → 3,6 | 138 → 50 | 0,00 → 0,00 |
| /maalauspalvelut-hameenlinna/ | 87 | 99 | **92** | **100** | 3,6 → 3,2 | 96 → 26 | 0,00 → 0,00 |
| /maalauspalvelut-huittinen/ | 81 | 99 | **91** | **100** | 4,2 → 3,2 | 162 → 40 | 0,00 → 0,00 |
| /maalauspalvelut-ikaalinen/ | 83 | 99 | **92** | **100** | 4,1 → 3,2 | 110 → 49 | 0,00 → 0,00 |
| /maalauspalvelut-juupajoki/ | 88 | 99 | **91** | **100** | 3,5 → 3,2 | 94 → 56 | 0,00 → 0,00 |
| /maalauspalvelut-kangasala/ | 87 | 99 | **91** | **100** | 3,6 → 3,2 | 105 → 66 | 0,00 → 0,00 |
| /maalauspalvelut-kihnio/ | 87 | 99 | **91** | **100** | 3,6 → 3,2 | 102 → 83 | 0,00 → 0,00 |
| /maalauspalvelut-lempaala/ | 88 | 99 | **92** | **100** | 3,5 → 3,1 | 68 → 66 | 0,00 → 0,00 |
| /maalauspalvelut-mantta-vilppula/ | 87 | 99 | **91** | **100** | 3,6 → 3,2 | 72 → 46 | 0,00 → 0,00 |
| /maalauspalvelut-nokia/ | 85 | 99 | **89** | **100** | 3,9 → 3,5 | 78 → 67 | 0,00 → 0,00 |
| /maalauspalvelut-orivesi/ | 87 | 99 | **91** | **100** | 3,6 → 3,2 | 86 → 42 | 0,00 → 0,00 |
| /maalauspalvelut-palkane/ | 87 | 99 | **91** | **100** | 3,6 → 3,2 | 115 → 36 | 0,00 → 0,00 |
| /maalauspalvelut-parkano/ | 88 | 99 | **92** | **100** | 3,4 → 3,1 | 135 → 62 | 0,00 → 0,00 |
| /maalauspalvelut-pirkkala/ | 87 | 99 | **91** | **100** | 3,6 → 3,2 | 102 → 50 | 0,00 → 0,00 |
| /maalauspalvelut-ruovesi/ | 88 | 99 | **91** | **100** | 3,5 → 3,2 | 90 → 36 | 0,00 → 0,00 |
| /maalauspalvelut-sastamala/ | 85 | 99 | **89** | **100** | 3,9 → 3,5 | 70 → 24 | 0,00 → 0,00 |
| /maalauspalvelut-tampere/ | 87 | 99 | **91** | **100** | 3,6 → 3,2 | 88 → 66 | 0,00 → 0,00 |
| /maalauspalvelut-urjala/ | 82 | 99 | **91** | **100** | 4,3 → 3,3 | 126 → 44 | 0,00 → 0,00 |
| /maalauspalvelut-valkeakoski/ | 86 | 99 | **91** | **100** | 3,6 → 3,2 | 104 → 52 | 0,00 → 0,00 |
| /maalauspalvelut-vesilahti/ | 84 | 99 | **92** | **100** | 4,1 → 3,2 | 103 → 41 | 0,00 → 0,00 |
| /maalauspalvelut-virrat/ | 87 | 99 | **91** | **100** | 3,6 → 3,2 | 96 → 53 | 0,00 → 0,00 |
| /maalauspalvelut-ylojarvi/ | 84 | 99 | **88** | **100** | 4,0 → 3,6 | 98 → 31 | 0,00 → 0,00 |
| /meista/ | 88 | 100 | **92** | **100** | 3,3 → 3,0 | 118 → 80 | 0,00 → 0,00 |
| /referenssit/ | 91 | 100 | **94** | **100** | 3,2 → 2,9 | 55 → 18 | 0,00 → 0,00 |
| /talon-maalaus-akaa/ | 90 | 99 | **94** | **100** | 3,0 → 2,7 | 127 → 68 | 0,00 → 0,00 |
| /talon-maalaus-forssa/ | 90 | 99 | **94** | **100** | 3,0 → 2,7 | 112 → 53 | 0,00 → 0,00 |
| /talon-maalaus-hameenkyro/ | 91 | 99 | **94** | **100** | 3,0 → 2,7 | 72 → 83 | 0,00 → 0,00 |
| /talon-maalaus-hameenlinna/ | 91 | 99 | **94** | **100** | 3,0 → 2,8 | 110 → 52 | 0,00 → 0,00 |
| /talon-maalaus-hinta-pirkanmaa/ | 90 | 100 | **94** | **100** | 3,2 → 2,9 | 90 → 36 | 0,00 → 0,00 |
| /talon-maalaus-huittinen/ | 82 | 99 | **94** | **100** | 3,9 → 2,7 | 222 → 92 | 0,00 → 0,00 |
| /talon-maalaus-ikaalinen/ | 91 | 99 | **94** | **100** | 3,0 → 2,8 | 94 → 42 | 0,00 → 0,00 |
| /talon-maalaus-juupajoki/ | 80 | 99 | **93** | **100** | 3,9 → 2,7 | 276 → 127 | 0,00 → 0,00 |
| /talon-maalaus-kangasala/ | 83 | 99 | **94** | **100** | 3,8 → 2,8 | 186 → 52 | 0,00 → 0,00 |
| /talon-maalaus-kihnio/ | 83 | 99 | **93** | **100** | 3,8 → 2,7 | 198 → 110 | 0,00 → 0,00 |
| /talon-maalaus-lempaala/ | 84 | 99 | **94** | **100** | 3,7 → 2,8 | 161 → 53 | 0,00 → 0,00 |
| /talon-maalaus-mantta-vilppula/ | 89 | 99 | **93** | **100** | 3,1 → 2,8 | 157 → 92 | 0,00 → 0,00 |
| /talon-maalaus-nokia/ | 81 | 99 | **94** | **100** | 3,8 → 2,8 | 232 → 50 | 0,00 → 0,00 |
| /talon-maalaus-orivesi/ | 90 | 99 | **94** | **100** | 3,1 → 2,8 | 96 → 71 | 0,00 → 0,00 |
| /talon-maalaus-palkane/ | 90 | 99 | **93** | **100** | 3,1 → 2,8 | 120 → 94 | 0,00 → 0,00 |
| /talon-maalaus-parkano/ | 81 | 99 | **93** | **100** | 4,0 → 2,9 | 224 → 64 | 0,00 → 0,00 |
| /talon-maalaus-pirkanmaa/ | 90 | 99 | **94** | **100** | 3,0 → 2,7 | 136 → 76 | 0,00 → 0,00 |
| /talon-maalaus-pirkkala/ | 91 | 99 | **94** | **100** | 3,0 → 2,7 | 82 → 102 | 0,00 → 0,00 |
| /talon-maalaus-ruovesi/ | 80 | 99 | **94** | **100** | 3,9 → 2,8 | 257 → 68 | 0,00 → 0,00 |
| /talon-maalaus-sastamala/ | 82 | 99 | **94** | **100** | 3,8 → 2,8 | 216 → 58 | 0,00 → 0,00 |
| /talon-maalaus-tampere/ | 77 | 99 | **92** | **99** | 4,1 → 3,0 | 294 → 26 | 0,00 → 0,00 |
| /talon-maalaus-urjala/ | 84 | 99 | **94** | **100** | 3,7 → 2,7 | 173 → 41 | 0,00 → 0,00 |
| /talon-maalaus-valkeakoski/ | 84 | 99 | **94** | **100** | 3,8 → 2,8 | 160 → 76 | 0,00 → 0,00 |
| /talon-maalaus-vesilahti/ | 91 | 99 | **94** | **100** | 3,1 → 2,8 | 66 → 53 | 0,00 → 0,00 |
| /talon-maalaus-virrat/ | 90 | 99 | **93** | **100** | 3,1 → 2,8 | 98 → 126 | 0,00 → 0,00 |
| /talon-maalaus-ylojarvi/ | 90 | 99 | **94** | **100** | 3,1 → 2,8 | 106 → 60 | 0,00 → 0,00 |
| /tarjouspyynto/ | 86 | 100 | **96** | **100** | 3,3 → 2,6 | 228 → 32 | 0,00 → 0,00 |
| /tietosuoja/ | 94 | 100 | **96** | **100** | 2,7 → 2,4 | 72 → 51 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-akaa/ | 90 | 99 | **94** | **100** | 3,1 → 2,8 | 103 → 54 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-forssa/ | 89 | 99 | **94** | **100** | 3,1 → 2,8 | 150 → 66 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-hameenkyro/ | 84 | 99 | **89** | **100** | 3,8 → 3,5 | 156 → 90 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-hameenlinna/ | 91 | 99 | **94** | **100** | 3,1 → 2,8 | 90 → 59 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-hinta-pirkanmaa/ | 91 | 100 | **93** | **100** | 3,0 → 2,7 | 81 → 130 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-huittinen/ | 89 | 99 | **94** | **100** | 3,1 → 2,8 | 160 → 50 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-ikaalinen/ | 91 | 99 | **94** | **100** | 3,0 → 2,8 | 85 → 40 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-juupajoki/ | 82 | 99 | **94** | **100** | 3,9 → 2,8 | 193 → 67 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-kangasala/ | 89 | 99 | **92** | **100** | 3,4 → 3,0 | 80 → 80 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-kihnio/ | 90 | 99 | **94** | **100** | 3,1 → 2,8 | 126 → 70 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-lempaala/ | 89 | 99 | **93** | **100** | 3,3 → 2,9 | 90 → 36 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-mantta-vilppula/ | 79 | 99 | **94** | **100** | 3,9 → 2,8 | 297 → 48 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-nokia/ | 84 | 99 | **90** | **100** | 3,8 → 3,4 | 175 → 52 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-orivesi/ | 88 | 99 | **92** | **100** | 3,5 → 3,1 | 80 → 76 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-palkane/ | 82 | 99 | **92** | **100** | 4,1 → 3,0 | 177 → 68 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-parkano/ | 81 | 99 | **94** | **100** | 3,9 → 2,8 | 222 → 75 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-pirkanmaa/ | 90 | 99 | **92** | **100** | 3,2 → 2,9 | 89 → 112 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-pirkkala/ | 76 | 99 | **92** | **100** | 4,3 → 3,1 | 317 → 104 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-ruovesi/ | 90 | 99 | **93** | **100** | 3,1 → 2,8 | 122 → 130 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-sastamala/ | 83 | 99 | **90** | **100** | 3,8 → 3,4 | 206 → 42 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-tampere/ | 87 | 99 | **92** | **100** | 3,5 → 3,1 | 137 → 58 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-urjala/ | 78 | 99 | **92** | **100** | 4,2 → 3,1 | 259 → 74 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-valkeakoski/ | 88 | 99 | **92** | **100** | 3,5 → 3,1 | 76 → 52 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-vesilahti/ | 91 | 99 | **94** | **100** | 3,1 → 2,8 | 75 → 48 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-virrat/ | 90 | 99 | **94** | **100** | 3,1 → 2,8 | 128 → 34 | 0,00 → 0,00 |
| /tiilikaton-pinnoitus-ylojarvi/ | 84 | 99 | **87** | **100** | 3,8 → 3,5 | 125 → 155 | 0,00 → 0,00 |
| /toiminta-alueet/ | 92 | 100 | **96** | **100** | 3,0 → 2,6 | 98 → 26 | 0,00 → 0,00 |
| /yhteystiedot/ | 90 | 100 | **94** | **100** | 3,3 → 2,9 | 90 → 52 | 0,00 → 0,00 |

### Yksittäisten ajojen kohina

Lähtötilanteen sarja-ajossa kuusi kaupunkisivua sai 76–80 pistettä, kun samankaltaiset sivut saivat 85–90. Näillä ajoilla TBT oli 257–317 ms ja LCP 3,9–4,3 s. Mittasin ne ja lopputilanteen heikoimman sivun uudelleen kaksi kertaa (mobiili, yksi ajo kerrallaan). Lisäajojen mediaani on 84–90 ennen ja 88–94 jälkeen, eli sarja-ajon matalat arvot olivat yksittäisten ajojen piikkejä (todennäköisesti roskienkeruu tai muu satunnainen pääsäikeen työ), eivät sivujen ominaisuus. Yhden ajon kohina on siis yleensä 1–3 pistettä, mutta yksittäinen ajo voi pudota 8–12 pistettä. Koko sivuston taulukon yksittäisiä rivejä ei pidä lukea sen tarkemmin; mediaanit ja jakauma pitävät.

| Sivu | Sarja-ajo ennen | 2 lisäajon mediaani ennen | Sarja-ajo jälkeen | 2 lisäajon mediaani jälkeen |
|---|---|---|---|---|
| /tiilikaton-pinnoitus-pirkkala/ | 76 (LCP 4,3 s, TBT 317 ms) | 88 (LCP 3,5 s, TBT 93 ms) | 92 (TBT 104 ms) | 92 (LCP 3,1 s, TBT 54 ms) |
| /talon-maalaus-tampere/ | 77 (LCP 4,1 s, TBT 294 ms) | 88 (LCP 3,5 s, TBT 107 ms) | 92 (TBT 26 ms) | 92 (LCP 3,0 s, TBT 84 ms) |
| /tiilikaton-pinnoitus-urjala/ | 78 (LCP 4,2 s, TBT 259 ms) | 84 (LCP 3,9 s, TBT 148 ms) | 92 (TBT 74 ms) | 92 (LCP 3,1 s, TBT 67 ms) |
| /tiilikaton-pinnoitus-mantta-vilppula/ | 79 (LCP 3,9 s, TBT 297 ms) | 90 (LCP 3,1 s, TBT 104 ms) | 94 (TBT 48 ms) | 94 (LCP 2,8 s, TBT 46 ms) |
| /talon-maalaus-juupajoki/ | 80 (LCP 3,9 s, TBT 276 ms) | 86 (LCP 3,4 s, TBT 193 ms) | 93 (TBT 127 ms) | 94 (LCP 2,7 s, TBT 78 ms) |
| /talon-maalaus-ruovesi/ | 80 (LCP 3,9 s, TBT 257 ms) | 90 (LCP 3,1 s, TBT 125 ms) | 94 (TBT 68 ms) | 94 (LCP 2,8 s, TBT 42 ms) |
| /tiilikaton-pinnoitus-ylojarvi/ | 84 (LCP 3,8 s, TBT 125 ms) | 85 (LCP 3,8 s, TBT 114 ms) | 87 (TBT 155 ms) | 88 (LCP 3,5 s, TBT 80 ms) |

## 6. INP: vuorovaikutusten viive

Pixel 5 -emulointi, CPU 4× hidastettu, kolmen toiston mediaani. "Ennen" on main-build, "jälkeen" kaikki viisi korjausta. Googlen raja hyvälle INP:lle on 200 ms. Arvot ovat laboratoriomittauksia hidastetulla suorittimella, joten ne ovat pessimistisiä.

| Toiminto | Vaihe | Ennen | Jälkeen |
|---|---|---|---|
| Evästebanneri | Hyväksy | 152 ms | 104 ms |
| Evästebanneri | Asetukset (avaa valinnat) | 112 ms | 128 ms |
| Valikko (mobiili) | Avaa päävalikko | 160 ms | 160 ms |
| Valikko (mobiili) | Avaa alavalikko | 104 ms | 144 ms |
| Valikko (mobiili) | Sulje valikko | 96 ms | 104 ms |
| Chat | Avaa chat | 224 ms | 184 ms |
| Chat | Valitse vaihtoehto | 144 ms | 152 ms |
| Chat | Sulje chat | 120 ms | 104 ms |
| Hintalaskuri (/hintalaskuri/) | Valitse palvelu | 176 ms | 144 ms |
| Hintalaskuri | Kirjoita neliöt | 48 ms | 32 ms |
| Hintalaskuri | Jatka | 80 ms | 72 ms |
| Hintalaskuri | Vastaukset 1–4 | 56–80 ms | 48–64 ms |
| Hintalaskuri | Avaa paikkakuntavalitsin | 224 ms | 264 ms |
| Hintalaskuri | Kirjoita paikkakunta | 72 ms | 64 ms |
| Chat-laskuri (etusivu) | Valitse palvelu | 224 ms | 184 ms |
| Chat-laskuri (etusivu) | Kirjoita neliöt | 72 ms | 88 ms |
| Chat-laskuri (etusivu) | Lähetä neliöt | 168 ms | 192 ms |
| Chat-laskuri (etusivu) | Valitse vaihtoehto | 152 ms | 136 ms |
| Liukusäädin (ennen/jälkeen-kuva) | Raahaus, pisin tapahtuma | 24 ms | 24 ms |
| Liukusäädin | Raahaus, ruudunpäivitysväli (mediaani / pisin) | 17 / 67 ms | 17 / 17 ms |
| Liukusäädin | Napautus kuvaan | 24 ms | 24 ms |
| Liukusäädin | Näppäimistö (nuoli × 5) | 48 ms | 32 ms |

Huomiot:

- Evästeasetusten avaus ja chat-laskurin kaksi viimeistä vaihetta mitattiin lähtötilanteesta erillisessä ajossa samoilla asetuksilla, koska ensimmäisen ajon valitsin osui kahteen elementtiin ("Asetukset" ja alatunnisteen "Evästeasetukset"; kaksi "Lähetä"-nappia). Raakadata `inp-before-fix.json`.
- Liukusäädin on sujuva: raahauksessa ei yhtään yli 50 ms:n ruutua kummassakaan buildissa.
- Suurin arvo on hintalaskurin paikkakuntavalitsimen avaaminen (224–264 ms). Ajasta 190–250 ms on piirtoa (`present`), ei käsittelyä: avautuva lista renderöidään kerralla. Ero ennen/jälkeen on kohinaa (yksittäiset ajot 208–344 ms). Tätä ei korjattu, koska se vaatii muutoksen valitsimen toteutukseen (kysymys 4).
- Chatin avaaminen ja chat-laskurin ensimmäinen valinta ovat 180–220 ms: ensimmäinen napautus avaa keskustelunäkymän ja renderöi sen kerralla. Sen jälkeen vastaukset ovat 100–150 ms.
- Lomakkeita ei lähetetty: INP-skenaariot pysähtyvät ennen lähetysnappia, ja etusivun chat-laskurin "Lähetä" lähettää vain neliömäärän chatin sisällä, ei liidiä.

## 7. Mitä jäi tekemättä ja mitä 100/100 vaatisi

Lopputilanteessa mobiilipisteet ovat 93 (mediaani) ja tietokone 100. Lighthousen pistekäyrällä mobiilin 100 vaatisi LCP:n noin 1,5 sekuntiin (nyt 2,6–3,1 s), FCP:n noin 1,0 sekuntiin (nyt 1,9–2,0 s) ja TBT:n alle 50 ms:n (nyt 24–152 ms). Simuloitu TTFB on jo 0,46 s, joten jäljelle jää noin 0,5 s HTML:lle, CSS:lle ja ensimmäiselle piirrolle. Se ei onnistu ilman seuraavia muutoksia, jotka jätin tekemättä, koska ne muuttavat ulkoasua, vaativat Eerikin päätöksen tai eivät mahtuneet yöajoon:

1. **Fontit** (suurin yksittäinen tekijä LCP:ssä). Neljä esiladattua fonttitiedostoa, 75 kt, `font-display: swap`. Vaihtoehdot: esilataa vain otsikkofontti (Montserrat 800) ja leipäteksti (Open Sans 400), tai poista esilataukset kokonaan ja anna selaimen ladata fontit CSS:n kautta, tai käytä järjestelmäfonttia otsikoissa. Jokainen näistä voi näyttää hetken fonttien vaihtumisen (välähdys), joten tämä on ulkoasupäätös (kysymys 1).
2. **CSS.** 119 kt:n tyylitiedosto on render-blocking ja 76 % käyttämätöntä. Kriittisen CSS:n inline-upotus etusivun HTML:ään ja loppuosan lataus asynkronisesti toisi FCP:n lähemmäs 1,5 s. Asynkroninen CSS poistettiin 7.10.2026 välähdyksen takia, joten tämä pitää tehdä kriittisen CSS:n kanssa, ei pelkällä `media`-kikalla. Vaatii työkalun (esimerkiksi `critters`/`beasties`) ja huolellisen esikatselun.
3. **Etusivun HTML** (224 kt pakkaamatonta). 226 inline-SVG-kuvaketta (112 kt) voisi korvata yhdellä `<symbol>`-määrittelyllä per kuvake ja `<use>`-viittauksilla. Brotli pakkaa toiston hyvin (20 kt siirrettynä), joten hyöty on parsinnassa ja DOM-koossa (3 500 elementtiä), ei siirrossa. Keskikokoinen muutos lucide-kuvakkeiden renderöintiin.
4. **600 px:n kuvakoko.** Kuvasarjaan 600 px:n leveys (`Pictures-600/`), jolloin 412 px:n näyttö DPR 1,75 saa 600 px:n kuvan 800 px:n sijaan. Säästö 20–55 kt sivua kohden mobiilissa. Vaatii kaikkien kuvien uudelleengeneroinnin `scripts/lisaa_kuva.py`-skriptillä ja `seo.test.ts`:n päivityksen. Ei ulkoasumuutosta, mutta ei pistevaikutusta, koska kuvat eivät ole LCP-elementtejä (kysymys 3).
5. **`vendor-ui.js`** (225 kt pakkaamatonta, 47 % käyttämätöntä latauksessa). Sisältää kaikki Radix-komponentit ja lucide-kuvakkeet yhdessä paketissa. Jako pienempiin paketteihin (esimerkiksi dialogit ja valikot omaan) pienentäisi ensimmäistä latausta 20–30 kt pakattuna. Vaikutus pisteisiin pieni, koska JS ei ole LCP:n polulla hydraation jälkeen.
6. **`OptimizedImage`:n attribuuttijärjestys** (`loading` ennen `src`). Yhden rivin muutos, joka estää kuvien ennakkolatauksen myös `createRoot`-polulla (404-sivu, jonossa oleva artikkeli). En tehnyt sitä, koska uudet korjaukset keskeytettiin (kysymys 5).
7. **Värien kontrasti** (saavutettavuus 96–97 → 100). 30–40 elementtiä sivulla alittaa 4,5:1-rajan: vaaleansininen `text-accent` (#007bc7) vaalealla #ebf7ff-pohjalla (4,13), valkoinen teksti sinisellä #0091eb-painikkeella (3,36), punaisen hintamerkin vaalea teksti (3,9). Ulkoasumuutos (kysymys 2).
8. **Hintalaskurin paikkakuntavalitsin** (INP 224–264 ms). Listan virtualisointi tai lyhyempi lista avatessa (kysymys 4).
9. **Tuotannon mittaus.** Verkko tästä ympäristöstä pintanen.fi:hin ja `*.pages.dev`-esikatseluihin on estetty, joten tuotannon ja esikatselujen Lighthouse-luvut sekä `verify_live.py` jäivät ajamatta. Googlen kenttädata (CrUX) kannattaa katsoa PageSpeed Insightsista mergen jälkeen: se kertoo oikeiden kävijöiden LCP:n ja INP:n.

## 8. Kysymykset Eerikille

1. **Fontit.** Saako esiladattavia fontteja vähentää neljästä kahteen (Montserrat 800 otsikoihin, Open Sans 400 leipätekstiin) tai poistaa esilataukset? Hyöty on LCP:ssä noin 0,3–0,5 s mobiilissa, riski on lyhyt fontin vaihtuminen hitaalla yhteydellä. Suosittelen kokeilua esikatselussa.
2. **Värien kontrasti.** Saako vaaleansinisen tekstin (#007bc7 vaalealla pohjalla) ja sinisten painikkeiden (#0091eb) sävyjä tummentaa, jotta saavutettavuus nousee 96–97 → 100? Muutos näkyy ulkoasussa vähän. Tähän liittyy myös PR #136:n saavutettavuusraportti.
3. **600 px:n kuvakoko.** Saako kuvasarjaan lisätä 600 px:n koon (kaikki kuvat generoidaan uudelleen alkuperäisistä, `~/GitHub/uudet-kuvat/` tai `Pictures-1500/` lähteenä)? Ei ulkoasumuutosta, säästää 20–55 kt per sivu mobiilissa, ei pistevaikutusta.
4. **Paikkakuntavalitsin.** Hintalaskurin paikkakuntavalitsimen avaaminen on hitain vuorovaikutus (224–264 ms hidastetulla suorittimella). Saako sen toteutusta muuttaa (lista renderöidään vasta kirjoitettaessa tai virtualisoidaan)? Ulkoasu pysyisi samana.
5. **Pienet jatkokorjaukset ilman ulkoasumuutosta.** Saanko tehdä seuraavassa ajossa: `OptimizedImage`:n `loading`-attribuutti ennen `src`-attribuuttia (kohta 7.6) ja `vendor-ui`-paketin jako (kohta 7.5)? Kumpikin on pieni, ja mittaan ne samalla tavalla.
6. **Mergejärjestys.** Ehdotan: #132 → #133 → #137 → #138 → #139, jokaisen jälkeen mainin merge seuraavaan haaraan ja Cloudflaren esikatselun tarkistus. Sopiiko, että teen merget ja ristiriitojen ratkaisun, kun annat luvan, vai haluatko mergetä itse?
