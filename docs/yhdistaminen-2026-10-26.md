# Avointen PR:ien yhdistäminen ja tuotannon tarkistus 26.10.2026

Eki pyysi 26.10.2026 klo 21.26: "Käske tekemään muutokset oikeassa järjestyksessä ja sen jälkeen tarkastamaan, että nettisivut toimivat täysin." Tämä poikkeaa tavallisesta säännöstä, jossa Eerik yhdistää PR:t itse. Yhdistäminen tehtiin `docs/avoimet-prt-2026-10-26.md`-taulukon suositellussa järjestyksessä, ja jokaista mergeä edelsi vihreä CI. Tuotanto tarkistettiin yhdistämisen jälkeen.

## 1. Mitä yhdistettiin ja missä järjestyksessä

Kaikki ajat Suomen aikaa. Pohja oli mainin commit c075954; lopputulos on b93983b (12 merge-committia, 164 tiedostoa, +15 778 / −512 riviä).

| # | PR | Mitä | Merge |
|---|---|---|---|
| 1 | #130 Kilpailijoiden artikkelit | vain docs | 21.28 |
| 2 | #134 Vaihe 2 A: hakutulosanalyysi | vain docs | 21.28 |
| 3 | #143 Suorituskykyraportti | vain docs | 21.28 |
| 4 | #132 NUL-tavut pois esirenderöinnistä | virhekorjaus | 21.28 |
| 5 | #142 Paketti C: kuntien värisääntö | ketjun kärki: toi mukanaan #121–#128, #131, #135 ja #140 (GitHub merkitsi ne yhdistetyiksi) | 21.39 |
| 6 | #129 Korjaukset 2 ja 3 | ketjusta puuttuneet commitit | 21.43 |
| 7 | #133 hydrateRoot | suorituskyky | 21.45 |
| 8 | #138 zod pois | suorituskyky | 21.51 |
| 9 | #137 Sonner pois | suorituskyky | 21.54 |
| 10 | #139 framer-motion laiskasti | suorituskyky | 21.57 |
| 11 | #136 Playwright-testit ja E2E-työnkulku | testit | 22.17 |
| 12 | #141 Yöajo 3 F: GEO, llms-full.txt, UKK, IndexNow-avain | viimeisenä | 22.27 |

Ketju #121 → #129 → #131 → #135 → #140 → #142 yhdistyi yhdellä mergellä (#142), koska jokainen haara oli tehty edellisen päälle. #129:n "Korjaukset 3" -commitit eivät olleet ketjussa, joten #129 yhdistettiin erikseen heti perään.

## 2. Miten ristiriidat ratkaistiin

Jokaiseen haaraan mergettiin ensin main, ajettiin paikalliset tarkistukset (tsc, lint, testit, build, `verify_dist.py`, `verify_redirects.py`), pushattiin, odotettiin CI ja vasta sitten yhdistettiin (merge-commit, odotettu head-sha).

- `src/data/lastmod.json` riiteli lähes joka haarassa. Ratkaisu aina sama: mainin versio ja `npm run build`, joka kirjoittaa tiedoston uudelleen; buildin tuottama versio commitoitiin.
- `src/App.tsx` (#137 ja #139): mainin rakenne pidettiin; #137 poisti vain Sonnerin, #139 kääri sovelluksen `LazyMotion`-komponenttiin.
- `src/entry-prerender.tsx` (#141): #132:n `StringDecoder`-korjaus pidettiin ja NUL-tavujen poisto jätettiin sen rinnalle.
- `src/data/faqData.ts` (#141): mainin "Kattoremontti vai pinnoitus?" -vastaus pidettiin, perään #141:n uusi kysymys "Poistatteko sammaleen ja pesettekö katon ennen pinnoitusta?".
- Kaupunkisivupohjat (#141 ja #142): `CityLocalRules`-lohko ja yrittäjälaatikko molemmat mukana.
- #136: haarasta poistettiin versionhallintaan vahingossa menneet `playwright-report/` ja `test-results/` ja ne lisättiin `.gitignore`-tiedostoon. E2E-ajo kaatui ensin kahteen asiaan, jotka korjattiin: palvelusivun lomakkeen otsikko on pinnoitussivuilla "Pyydä ilmainen kuntotarkastus" (#129), ja artikkelin taulukon vierivä kääre ei ollut näppäimistöllä kohdistettava (axe `scrollable-region-focusable`); kääre sai `role="region"`, `aria-label` ja `tabIndex=0`.

## 3. Tarkistukset

**CI.** Jokaisen PR:n "tarkistus" (tsc, lint, testit, build, verify_dist, verify_redirects) oli vihreä ennen mergeä. #136:n ja #141:n kohdalla myös uusi Playwright-työ (toiminnot, axe, kuvat) ja Cloudflare-esikatselun verify_live olivat vihreitä. Mainin oma CI-ajo lopullisella commitilla b93983b: vihreä. Cloudflare Pages: tuotantojulkaisu onnistui.

**Paikallinen main-build (b93983b).** tsc OK, lint 0 virhettä, testit 9 tiedostoa / 67 läpi, build 142 reittiä (93 esirenderöityä), `verify_dist.py` ONGELMAT 0, `verify_redirects.py` 431 sääntöä / 0 ongelmaa, NUL-tavuja 0 tiedostossa, `lastmod.json` ei muuttunut buildista (Cloudflaren build näkee samat päivämäärät). Playwright-toimintotestit (`tests/e2e/toiminnot.spec.ts`) molemmilla leveyksillä: 27 läpi, 7 ohitettu tarkoituksella (vain toiselle leveydelle tarkoitetut testit). Mukana hintalaskuri (pinnoitus ja maalaus, puhelinnumeron tarkistus, kotitalousvähennysrivi), kolmivaiheinen tarjouspyyntö, palvelusivun lomake, chat-kupla, evästebanneri, valikot, toiminta-alueiden haitari ja ennen–jälkeen-liukusäädin. Lomakkeet menivät mockiin, ei oikeaan sähköpostiin.

**Tuotanto pintanen.fi (WebFetch, ilman JavaScriptiä, välimuisti ohitettu).**

| Sivu | Tarkistettu |
|---|---|
| `/` | title, H1, "Miksi Pintanen" -kappale (Nowocoat, Tikkurila), päävalikko |
| `/tiilikaton-pinnoitus-hinta-pirkanmaa/` | title "2027: 2 850–7 000 €", kolme hintakorttia ennallaan |
| `/talon-maalaus-hinta-pirkanmaa/` | title "2027: 3 500–11 000 €", kortit 3 500–5 000, 5 000–7 000, 7 000–11 000 |
| `/tiilikaton-pinnoitus-pirkanmaa/` | ensimmäinen kappale (hinta, kesto, takuu), UKK "Poistatteko sammaleen…", lomakkeen otsikko "Pyydä ilmainen kuntotarkastus" |
| `/talon-maalaus-pirkanmaa/` | ensimmäinen kappale, lomakkeen otsikko "Pyydä ilmainen arviokäynti" |
| `/tiilikaton-pinnoitus-tampere/`, `/talon-maalaus-nokia/`, `/maalauspalvelut-parkano/` | värisääntölohko "Pitääkö katon tai seinän värin vaihdosta kysyä lupaa …", UKK, lomakkeen otsikko |
| `/kotitalousvahennys/` | 40 %, 2 100 €, omavastuu 150 € |
| `/ilmainen-kuntotarkastus/` | H1, ensimmäinen kappale, napit |
| `/hintalaskuri/` | H1, ensimmäinen kysymys "Mitä haluat laskea?" |
| `/artikkelit/pinnoitus-vai-uusi-katto/` | taulukko, UKK (5 kysymystä) |
| `/sitemap.xml` | 93 osoitetta, uudet sivut mukana, lastmod 2026-10-26 |
| `/llms.txt`, `/llms-full.txt` | molemmat tekstinä, llms-full alkaa otsikolla "Pintanen Oy: kaikkien sivujen teksti" |
| `/dd32e4c90d59403da3eb5af17d6465c9.txt` | IndexNow-avain tekstinä |
| `/kattopalvelut/pinnoitus` | ohjautuu sivulle `/tiilikaton-pinnoitus-pirkanmaa/` |

Yhdelläkään sivulla ei ollut �-merkkejä tai rikkinäistä tekstiä.

**IndexNow.** Avaintiedoston varmistuttua lähetettiin 91 osoitetta (kaikki sivut, joiden lastmod on 26.10.2026) OpenSEO:n kautta Bingille ja muille IndexNow-hakukoneille. Google ei käytä IndexNow'ta; sille riittää sitemap.

## 4. Mitä pilvestä ei voi tarkistaa

- `verify_live.py` ja `verify_redirects.py <url>` tuotantoa vasten: pilviympäristön verkkokäytäntö estää `curl`-yhteydet pintanen.fi-osoitteeseen. Sama tarkistus ajettiin CI:ssä Cloudflaren esikatselua vasten (#136:n verify_live-työ) ja paikallisesti dist-kansiota vasten (`verify_dist.py`). Eerik voi ajaa ne omalla koneella: `python3 scripts/verify_live.py https://pintanen.fi dist` ja `python3 scripts/verify_redirects.py https://pintanen.fi`.
- Lomakkeiden oikea lähetys (sähköposti ja CRM): ei testata koskaan ilman lupaa. Toimintotestit käyttävät mockia.
- Selaimen toiminta tuotannossa (laskuri, chat, liukusäädin): tarkistettu paikallisella buildilla samasta commitista, ei tuotanto-osoitteessa.
- Lighthouse tuotannossa: mitattu vain paikallisesti (suorituskykyraportti).

## 5. Havainnot, jotka kannattaa korjata erikseen

1. `scripts/verify_dist.py` tulostaa `ONGELMAT: n` mutta ei palauta virhekoodia, joten CI ei kaadu sen löydöksiin (`verify_redirects.py` palauttaa). Pieni korjaus: `sys.exit(1)` kun ongelmia on.
2. E2E-työnkulun verify_live-työ odottaa esikatselusta vain sitemapin 200-vastausta, joten se voi testata edellisen pushin buildia. Varmempi ehto: odota, että esikatselun `index.html` sisältää pushatun commitin tunnisteen, tai lue Cloudflaren kommentista tarkan deployn osoite.
3. `llms.txt` ei linkitä `llms-full.txt`-tiedostoon. Yksi rivi riittää.
4. `talon-maalaus-hinta-pirkanmaa`-sivulla teksti "Yleisin talon koko" esiintyy kahdesti (hintakortin merkki ja toinen maininta). Pieni asia, mutta kannattaa katsoa.

## 6. Jäljellä

- Luonnos-PR:t #144–#152 (A-briefit ja D-jatko): main mergettiin jokaiseen yhdistämisen jälkeen, jotta esikatselut vastaavat tuotantoa. Ne odottavat Eerikin katselmusta; #150 (kontrasti) on ulkoasumuutos ja julkaistaan vain Eerikin ok:lla. Avoimet kysymykset ovat kunkin PR:n kuvauksessa ja tiivistettynä `docs/avoimet-prt-2026-10-26.md`-tiedoston Tulossa-osiossa.
- Tämä raportti ja dokumenttipäivitykset ovat omassa docs-PR:ssä.
