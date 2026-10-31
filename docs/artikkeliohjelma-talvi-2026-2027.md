# Talven artikkeliohjelma 2026–2027 (paketti B)

Kirjoitettu pilvi-istunnossa 26.10.2026 ehdotuksen `/mnt/project-files/yoajo/ehdotukset-yoajo-2-2026-10-26.md` kohdan B mukaan.
Haara `claude/yo2-artikkelit`, luonnos-PR. Haara sisältää myös paketit G (#131) ja H (#135) sekä korjaukset 2 (#129), koska
ne muokkaavat samoja tiedostoja (`articles.ts`, `faqData.ts`, `lastmod.json`); yhdistä ne ensin, niin tämän PR:n diff
pienenee omaan pakettiinsa.

## Mitä tehtiin

- 43 uutta artikkelia jonoon: maanantait ja torstait 3.12.2026–29.4.2027, yksi joka paikalle. Jono jatkuu saumatta
  nykyisestä (viimeinen vanha artikkeli on jonossa 30.11.2026).
- Jako: 27 kattoaihetta (63 %), 16 seinäaihetta (37 %). Kattoaiheiden kirjoittaja on Eerik, seinäaiheiden Eemil; neljä
  raha-aihetta (vähennys, laskutus, hinta, paketti) on jaettu näiden kesken aiheen mukaan.
- Aiheet tulevat asiakaskysymyspankista (`docs/asiakaskysymykset-2026.md`, K-numerot), Search Console -analyysistä
  (`docs/search-console-analyysi-2026-11.md`) ja kilpailija-analyysin aukoista (`docs/kilpailija-analyysi-2026-10-26.md`).
- Jokaisessa artikkelissa: lead ja `KeyPoints` vastaavat otsikon kysymykseen, H2:t kysymysmuodossa, `Avainhuomio` jokaisen
  H2-osion lopussa, `Table` kun on lukuja, `ArticleFaq` (4 kysymystä) lopussa, sisäiset linkit palvelu-, hinta- ja
  artikkelisivuille, ja `Sources`, kun artikkelissa on sivuston ulkopuolinen fakta (22 artikkelia). Jokaisen tiedoston
  alussa on kommentti, joka kertoo, mistä sivuston tiedostosta yrityksen faktat on otettu.
- Yrityksestä ei ole kirjoitettu mitään, mitä sivusto ei jo sano: hinnat `prices.ts`, työvaiheet `tyovaiheet.ts`, takuu,
  kesto, ennakkomaksu ja asiakaspalvelu `faqData.ts` ja CLAUDE.md. Puhdistus-, peltikatto- ja rahoitusaiheita ei ole.
- Metatiedot: jokaisella on `seoTitle` 50–60 merkkiä brändin kanssa ja description 120–160 merkkiä (`seo.test.ts`).
  Hero-kuvat ovat sivuston olemassa olevia kuvia.
- Tarkistukset ajettu: lint (0 virhettä), testit (61), build, `verify_dist.py` (0 ongelmaa), `verify_redirects.py`
  (431 sääntöä, 0 ongelmaa). `lastmod.json` päivitetty.

## Miten hyväksyt tai hylkäät

Jokainen artikkeli on luettavissa esikatselussa osoitteessa
`https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/<slug>/?esikatselu=1` ennen julkaisupäivää (linkit taulukossa). Kirjoita PR:ään tai
chattiin lista slugeista, jotka hylkäät, niin ne poistetaan ja jono tiivistetään ilman aukkoja. Hyväksytyt julkaistuvat
omana päivänään ilman uutta työtä: `.github/workflows/julkaise-jonossa.yml` käynnistää tuotantobuildin aamulla, kun
`CF_DEPLOY_HOOK_URL` on asetettu. Jos sitä ei ole asetettu, artikkelit näkyvät sivustolla päivänään, mutta sitemap ja
title-tunniste päivittyvät vasta seuraavassa buildissa.

## Julkaisukalenteri

**Muutos 31.10.2026 (Eki):** hinta-artikkelit `tiilikaton-pinnoituksen-hinta-2027` (9.11.) ja `talon-maalauksen-hinta-2027` (25.1.) poistettiin jonosta, koska ne olivat lähes samat kuin hintasivut (`/mnt/project-files/tarkastus/linkit-toistot-faktat-2026-10-31.md`, luku 4.3). Tilalle: 9.11. `pinnoitus-aurinkopaneelit-katolla` (oli 26.4.), 25.1. `milloin-talon-maalaus-kannattaa-tilata` (oli 22.4.), ja `talon-maalauksen-10-yleisinta-kysymysta` siirtyi 29.4. → 22.4. Jono päättyy 22.4.2027.

| # | Päivä | Aihe (otsikko) | Alue | Tekijä | Esikatselu |
|---|-------|----------------|------|--------|------------|
| 1 | to 3.12.2026 | Tiilikaton kuntotarkastus: mitä tarkistamme ja mitä saat? | katto | Eerik | [tiilikaton-kuntotarkastus-mita-tarkistamme](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/tiilikaton-kuntotarkastus-mita-tarkistamme/?esikatselu=1) |
| 2 | ma 7.12.2026 | Ruisku vai pensseli: miksi maalaamme puutalon seinät pensselillä? | seinät | Eemil | [ruisku-vai-pensseli-talon-maalaus](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/ruisku-vai-pensseli-talon-maalaus/?esikatselu=1) |
| 3 | to 10.12.2026 | Harjatiiviste tiilikatolla: mikä se on ja milloin se asennetaan? | katto | Eerik | [harjatiiviste-tiilikatolla](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/harjatiiviste-tiilikatolla/?esikatselu=1) |
| 4 | ma 14.12.2026 | Milloin kesän 2027 tiilikaton pinnoitus kannattaa tilata? | katto | Eerik | [milloin-tilata-kesan-pinnoitus](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/milloin-tilata-kesan-pinnoitus/?esikatselu=1) |
| 5 | to 17.12.2026 | Milloin talon voi maalata? Sää, lämpötila ja kosteus | seinät | Eemil | [milloin-talon-voi-maalata-saa](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/milloin-talon-voi-maalata-saa/?esikatselu=1) |
| 6 | ma 21.12.2026 | Tiilikaton värin vaihto pinnoituksessa: miten väri valitaan? | katto | Eerik | [tiilikaton-varin-vaihto-pinnoituksessa](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/tiilikaton-varin-vaihto-pinnoituksessa/?esikatselu=1) |
| 7 | to 24.12.2026 | Kotitalousvähennys vanhempien talossa ja puolisoiden kesken: kenen nimiin lasku? | raha | Eerik | [kotitalousvahennys-vanhempien-talo-ja-puoliso](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/kotitalousvahennys-vanhempien-talo-ja-puoliso/?esikatselu=1) |
| 8 | ma 28.12.2026 | Rintamamiestalon maalaus: miten vanha puutalo maalataan? | seinät | Eemil | [rintamamiestalon-maalaus](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/rintamamiestalon-maalaus/?esikatselu=1) |
| 9 | to 31.12.2026 | Pakkasrapautuminen tiilikatolla: miten se syntyy ja miten pinnoitus estää sen? | katto | Eerik | [pakkasrapautuminen-tiilikatto](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/pakkasrapautuminen-tiilikatto/?esikatselu=1) |
| 10 | ma 4.1.2027 | Mitä tarjouksen hyväksymisen jälkeen tapahtuu? Sopimus, ennakko ja aikataulu | katto | Eerik | [tarjouksen-hyvaksymisen-jalkeen](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/tarjouksen-hyvaksymisen-jalkeen/?esikatselu=1) |
| 11 | to 7.1.2027 | Hirsitalon maalaus: kuullote vai peittosuoja ja miten työ etenee? | seinät | Eemil | [hirsitalon-maalaus](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/hirsitalon-maalaus/?esikatselu=1) |
| 12 | ma 11.1.2027 | Rikkinäiset tiilet pinnoituksessa: kuka hankkii uudet ja montako saa olla? | katto | Eerik | [rikkinaiset-tiilet-pinnoituksessa](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/rikkinaiset-tiilet-pinnoituksessa/?esikatselu=1) |
| 13 | to 14.1.2027 | Autotallin ja piharakennuksen tiilikaton pinnoitus: kannattaako se tehdä samalla? | katto | Eerik | [autotallin-ja-piharakennuksen-tiilikaton-pinnoitus](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/autotallin-ja-piharakennuksen-tiilikaton-pinnoitus/?esikatselu=1) |
| 14 | ma 18.1.2027 | Kaavinta ja homepesu: miksi pohjatyöt ratkaisevat talon maalauksen keston? | seinät | Eemil | [miksi-vanha-maali-kaavitaan](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/miksi-vanha-maali-kaavitaan/?esikatselu=1) |
| 15 | to 21.1.2027 | Mikä Nowocoat on ja miksi käytämme sitä tiilikaton pinnoituksessa? | katto | Eerik | [nowocoat-kattomaali](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/nowocoat-kattomaali/?esikatselu=1) |
| 16 | ma 25.1.2027 | Milloin kesän 2027 talon maalaus kannattaa tilata? | seinät | Eemil | [milloin-talon-maalaus-kannattaa-tilata](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/milloin-talon-maalaus-kannattaa-tilata/?esikatselu=1) |
| 17 | to 28.1.2027 | Mikä aluskate on ja miksi tarkistamme sen ennen pinnoitusta? | katto | Eerik | [aluskate-ja-pinnoitus](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/aluskate-ja-pinnoitus/?esikatselu=1) |
| 18 | ma 1.2.2027 | Homepilkut puutalon seinässä: mistä ne tulevat ja milloin seinä pitää maalata? | seinät | Eemil | [homepilkut-puutalon-seinassa](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/homepilkut-puutalon-seinassa/?esikatselu=1) |
| 19 | to 4.2.2027 | Miksi maalaamme tiilikaton kahteen kertaan? | katto | Eerik | [kaksi-maalikerrosta-tiilikatto](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/kaksi-maalikerrosta-tiilikatto/?esikatselu=1) |
| 20 | ma 8.2.2027 | Mitä jos sataa pinnoituksen aikana? Sää, aikataulu ja hinta | katto | Eerik | [sade-pinnoituksen-aikana](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/sade-pinnoituksen-aikana/?esikatselu=1) |
| 21 | to 11.2.2027 | Miksi pohjamaali tulee vain paljaisiin kohtiin talon maalauksessa? | seinät | Eemil | [pohjamaali-paljaisiin-kohtiin](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/pohjamaali-paljaisiin-kohtiin/?esikatselu=1) |
| 22 | ma 15.2.2027 | Milloin tiilikaton voi pinnoittaa? Sää, lämpötila ja kuivuminen | katto | Eerik | [milloin-tiilikaton-voi-pinnoittaa-saa](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/milloin-tiilikaton-voi-pinnoittaa-saa/?esikatselu=1) |
| 23 | to 18.2.2027 | Tiilikaton pinnoituksen sanasto: mitä sanat tarkoittavat? | katto | Eerik | [tiilikaton-pinnoituksen-sanasto](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/tiilikaton-pinnoituksen-sanasto/?esikatselu=1) |
| 24 | ma 22.2.2027 | Kuullote vai peittävä maali puutaloon: kumpi kannattaa valita? | seinät | Eemil | [kuullote-vai-peittava-maali](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/kuullote-vai-peittava-maali/?esikatselu=1) |
| 25 | to 25.2.2027 | Kuinka kauan tiilikatto kestää? Tiilen ikä ja pinnan ikä | katto | Eerik | [tiilikaton-ika-ja-kayttoika](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/tiilikaton-ika-ja-kayttoika/?esikatselu=1) |
| 26 | ma 1.3.2027 | Katto ja seinät samalla kertaa: miksi pakettihinta on edullisempi? | raha | Eerik | [katto-ja-seinat-samalla-kertaa](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/katto-ja-seinat-samalla-kertaa/?esikatselu=1) |
| 27 | to 4.3.2027 | Kuinka kauan talon maalaus kestää? Mitä maalausviikon aikana tapahtuu | seinät | Eemil | [talon-maalaus-kesto-3-7-paivaa](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/talon-maalaus-kesto-3-7-paivaa/?esikatselu=1) |
| 28 | ma 8.3.2027 | Pirkanmaan talokanta ja tiilikatot: minkä ikäisiä katot ovat? | katto | Eerik | [pirkanmaan-talokanta-ja-tiilikatot](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/pirkanmaan-talokanta-ja-tiilikatot/?esikatselu=1) |
| 29 | to 11.3.2027 | Tiilikaton kevättarkistus maasta käsin: 6 kohtaa, jotka näet kiikarilla | katto | Eerik | [kevattarkistus-tiilikatto-maasta-kasin](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/kevattarkistus-tiilikatto-maasta-kasin/?esikatselu=1) |
| 30 | ma 15.3.2027 | Miksi maali hilseilee puutalon seinästä ja mitä sille tehdään? | seinät | Eemil | [hilseileva-maali-syyt](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/hilseileva-maali-syyt/?esikatselu=1) |
| 31 | to 18.3.2027 | Mitä tapahtuu, jos tiilikattoa ei pinnoiteta ajoissa? | katto | Eerik | [jos-tiilikattoa-ei-pinnoiteta-ajoissa](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/jos-tiilikattoa-ei-pinnoiteta-ajoissa/?esikatselu=1) |
| 32 | ma 22.3.2027 | Tiilikaton pinnoitus: 10 yleisintä kysymystä ja vastaukset | katto | Eerik | [10-yleisinta-kysymysta-pinnoituksesta](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/10-yleisinta-kysymysta-pinnoituksesta/?esikatselu=1) |
| 33 | to 25.3.2027 | Talon maalaus tilauksesta valmiiseen seinään: näin työ etenee | seinät | Eemil | [talon-maalaus-tilauksesta-valmiiseen](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/talon-maalaus-tilauksesta-valmiiseen/?esikatselu=1) |
| 34 | ma 29.3.2027 | Tiilikaton pinnoitus ennen ja jälkeen: 5 kohdetta Pirkanmaalta | katto | Eerik | [tiilikaton-pinnoitus-ennen-ja-jalkeen-kohteet](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/tiilikaton-pinnoitus-ennen-ja-jalkeen-kohteet/?esikatselu=1) |
| 35 | to 1.4.2027 | Ennakkomaksu ja laskutus: milloin ja mitä maksat pinnoituksesta tai maalauksesta? | raha | Eerik | [ennakkomaksu-ja-laskutus](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/ennakkomaksu-ja-laskutus/?esikatselu=1) |
| 36 | ma 5.4.2027 | Miten valitset maalausliikkeen? 7 kysymystä ennen tilausta | seinät | Eemil | [miten-valitset-maalausliikkeen](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/miten-valitset-maalausliikkeen/?esikatselu=1) |
| 37 | to 8.4.2027 | Kuka pinnoittaa kattosi? Eerik tekee työn itse ja vastaa lopputuloksesta | katto | Eerik | [kuka-pinnoittaa-kattosi](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/kuka-pinnoittaa-kattosi/?esikatselu=1) |
| 38 | ma 12.4.2027 | Mitä pinnoitustarjouksesta kannattaa katsoa? 8 kohtaa ennen hyväksymistä | katto | Eerik | [mita-tarjouksesta-kannattaa-katsoa](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/mita-tarjouksesta-kannattaa-katsoa/?esikatselu=1) |
| 39 | to 15.4.2027 | Talon värin vaihto huoltomaalauksessa: mitä kannattaa päättää etukäteen? | seinät | Eemil | [talon-maalaus-varin-vaihto](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/talon-maalaus-varin-vaihto/?esikatselu=1) |
| 40 | ma 19.4.2027 | Tiilikaton läpiviennit ja piipun ympärys: miksi katto vuotaa juuri sieltä? | katto | Eerik | [tiilikaton-lapiviennit-ja-piippu](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/tiilikaton-lapiviennit-ja-piippu/?esikatselu=1) |
| 41 | to 22.4.2027 | Talon maalaus: 10 yleisintä kysymystä ja vastaukset | seinät | Eemil | [talon-maalauksen-10-yleisinta-kysymysta](https://claude-yo2-artikkelit.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen.pages.dev/artikkelit/talon-maalauksen-10-yleisinta-kysymysta/?esikatselu=1) |

## Lähteet artikkeleittain

Yrityksen faktat ovat aina sivuston omia tiedostoja (`faqData.ts`, `prices.ts`, `tyovaiheet.ts`, `company.ts`,
`projects.ts`, hintasivut ja aiemmat artikkelit). Alla vain sivuston ulkopuoliset lähteet; ne ovat myös artikkelin
`Sources`-osassa lukijan nähtävillä. Lukupäivä 26.10.2026.

| Artikkeli | Ulkoiset lähteet |
|-----------|------------------|
| tiilikaton-kuntotarkastus-mita-tarkistamme | – (vain sivuston omat faktat) |
| ruisku-vai-pensseli-talon-maalaus | <https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje> |
| harjatiiviste-tiilikatolla | <https://www.taloon.com/tuulettuva-harjatiiviste-meltex-300-mm-x-5-m-musta>, <https://www.k-rauta.fi/inspiraatio-ja-ohjeet/rakentaminen/tiilikaton-asennus> |
| milloin-tilata-kesan-pinnoitus | – (vain sivuston omat faktat) |
| milloin-talon-voi-maalata-saa | <https://tikkurila.com/pro/how-to-paint-wooden-facades-and-fences>, <https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje> |
| tiilikaton-varin-vaihto-pinnoituksessa | – (vain sivuston omat faktat) |
| kotitalousvahennys-vanhempien-talo-ja-puoliso | <https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara>, <https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/nain-ilmoitat-kotitalousvahennyksen/>, <https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/47873/kotitalousvahennys-verotuksessa3/> |
| rintamamiestalon-maalaus | <https://www.imatra.fi/sites/default/files/atoms/files/14_08Rintamamiestalot.pdf>, <https://www.laitila.fi/wp-content/uploads/2024/03/Untamalan_rakentamistapaohjeet.pdf>, <https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje> |
| pakkasrapautuminen-tiilikatto | <https://rakennusfakta.fi/nowocoat-2025-esite-1420239/tiedosto-files/NowoCoat_Esite_A4_2025.pdf>, <https://bmifinland.zendesk.com/hc/fi-fi/articles/33093701704082-Usein-kysytyt-kysymykset-BMI-Ormax-betonikattotiilet> |
| tarjouksen-hyvaksymisen-jalkeen | – (vain sivuston omat faktat) |
| hirsitalon-maalaus | <https://www.teknos.com/globalassets/consumers/brochures/teknos_brochure_hirsitalot_web_01_2021.pdf> |
| rikkinaiset-tiilet-pinnoituksessa | – (vain sivuston omat faktat) |
| autotallin-ja-piharakennuksen-tiilikaton-pinnoitus | <https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/mista-toista-vahennyksen-saa/> |
| miksi-vanha-maali-kaavitaan | <https://tikkurila.fi/kotimaalarit/tuotteet/homeenpoisto>, <https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje> |
| nowocoat-kattomaali | <https://rakennusfakta.fi/nowocoat-2025-esite-1420239/tiedosto-files/NowoCoat_Esite_A4_2025.pdf> |
| aluskate-ja-pinnoitus | <https://www.k-rauta.fi/inspiraatio-ja-ohjeet/rakentaminen/tiilikaton-asennus> |
| homepilkut-puutalon-seinassa | <https://tikkurila.fi/kotimaalarit/tuotteet/homeenpoisto> |
| kaksi-maalikerrosta-tiilikatto | <https://rakennusfakta.fi/nowocoat-2025-esite-1420239/tiedosto-files/NowoCoat_Esite_A4_2025.pdf>, <https://www.teknos.com/document/tds/fi_0510-00_4.pdf> |
| sade-pinnoituksen-aikana | – (vain sivuston omat faktat) |
| pohjamaali-paljaisiin-kohtiin | <https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje> |
| milloin-tiilikaton-voi-pinnoittaa-saa | <https://www.teknos.com/document/tds/fi_0510-00_4.pdf>, <https://rakennusfakta.fi/nowocoat-2025-esite-1420239/tiedosto-files/NowoCoat_Esite_A4_2025.pdf> |
| tiilikaton-pinnoituksen-sanasto | <https://www.k-rauta.fi/inspiraatio-ja-ohjeet/rakentaminen/tiilikaton-asennus>, <https://www.taloon.com/tuulettuva-harjatiiviste-meltex-300-mm-x-5-m-musta> |
| kuullote-vai-peittava-maali | <https://www.teknos.com/globalassets/consumers/brochures/teknos_brochure_hirsitalot_web_01_2021.pdf> |
| tiilikaton-ika-ja-kayttoika | <https://www.k-rauta.fi/inspiraatio-ja-ohjeet/rakentaminen/tiilikaton-asennus>, <https://bmifinland.zendesk.com/hc/fi-fi/articles/33093701704082-Usein-kysytyt-kysymykset-BMI-Ormax-betonikattotiilet>, <https://www.bmigroup.com/fi/tuotteet-ja-ratkaisut/harjakatot/bmi-ormax> |
| katto-ja-seinat-samalla-kertaa | – (vain sivuston omat faktat) |
| talon-maalaus-kesto-3-7-paivaa | – (vain sivuston omat faktat) |
| pirkanmaan-talokanta-ja-tiilikatot | <https://pxdata.stat.fi/PxWeb/pxweb/fi/StatFin/StatFin__raku/15er.px/>, <https://bmifinland.zendesk.com/hc/fi-fi/articles/33093701704082-Usein-kysytyt-kysymykset-BMI-Ormax-betonikattotiilet> |
| kevattarkistus-tiilikatto-maasta-kasin | – (vain sivuston omat faktat) |
| hilseileva-maali-syyt | <https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje>, <https://tikkurila.com/pro/how-to-paint-wooden-facades-and-fences> |
| jos-tiilikattoa-ei-pinnoiteta-ajoissa | – (vain sivuston omat faktat) |
| 10-yleisinta-kysymysta-pinnoituksesta | – (vain sivuston omat faktat) |
| talon-maalaus-tilauksesta-valmiiseen | – (vain sivuston omat faktat) |
| tiilikaton-pinnoitus-ennen-ja-jalkeen-kohteet | – (vain sivuston omat faktat) |
| ennakkomaksu-ja-laskutus | <https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/nain-ilmoitat-kotitalousvahennyksen/>, <https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara> |
| miten-valitset-maalausliikkeen | <https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/nain-ilmoitat-kotitalousvahennyksen/>, <https://www.ytj.fi/> |
| kuka-pinnoittaa-kattosi | – (vain sivuston omat faktat) |
| mita-tarjouksesta-kannattaa-katsoa | – (vain sivuston omat faktat) |
| talon-maalaus-varin-vaihto | – (vain sivuston omat faktat) |
| tiilikaton-lapiviennit-ja-piippu | – (vain sivuston omat faktat) |
| milloin-talon-maalaus-kannattaa-tilata | – (vain sivuston omat faktat) |
| pinnoitus-aurinkopaneelit-katolla | – (vain sivuston omat faktat) |
| talon-maalauksen-10-yleisinta-kysymysta | – (vain sivuston omat faktat) |

## Sisäiset linkit

Jokainen artikkeli linkittää vähintään yhteen palvelu- tai hintasivuun ja yhteen toiseen artikkeliin. Uudet artikkelit
linkittävät toisiinsa ketjuina (esimerkiksi kuntotarkastus → rikkinäiset tiilet → aluskate → läpiviennit), jotta lukija
ja hakukone löytävät saman aiheen muut artikkelit. Linkit on tarkistettu: kaikki osoittavat `routes.ts`:n reitteihin tai
olemassa oleviin artikkeleihin (`routes.test.ts`).

## Kysymykset Eerikille (vastaa numerolla, lyhyesti)

Näissä kohdissa artikkeli on kirjoitettu varovaisimman tulkinnan mukaan. Vastaus korjataan tekstiin ennen julkaisupäivää.

1. **Harjatiiviste** (`harjatiiviste-tiilikatolla`, 10.12.): artikkeli sanoo, että asennus kirjataan tarjoukseen erikseen
   eikä pinnoituksen hinta muutu. Onko näin, vai kuuluuko harjatiivisteen asennus pinnoituksen hintaan?
2. **Aurinkopaneelit** (`pinnoitus-aurinkopaneelit-katolla`, 26.4.): artikkeli sanoo, että paneelit suojataan ja katto
   pinnoitetaan niiden ympäriltä, eikä niitä irroteta. Irrotatteko paneeleita joskus, ja jos, kuka sen tekee?
3. **Katto ja seinät samalla kertaa** (`katto-ja-seinat-samalla-kertaa`, 1.3.): artikkeli sanoo "yleensä katto ensin,
   seinät sen jälkeen" ja "yhteensä noin viikko tai vähän yli". Onko järjestys ja kesto oikein?
4. **Värin valinta** (`tiilikaton-varin-vaihto-pinnoituksessa` 21.12. ja `talon-maalaus-varin-vaihto` 15.4.): artikkelit
   sanovat, että väri kirjataan tarjoukseen ja värikartat katsotaan valmistajan sivuilta. Onko teillä mallipaloja tai
   värikarttaa mukana kuntotarkastuksella? Mitkä ovat yleisimmät kattovärit, joita asiakkaat valitsevat (artikkelissa
   on nyt vain Nowocoatin värivalikoima, ei "yleisin väri" -väitettä)?
5. **Kuullote vai peittävä** (`kuullote-vai-peittava-maali`, 22.2.): UKK vastaa "katsomme arviokäynnillä: peittävän
   päälle peittävä, kuullotteen kohdalla valinta on asiakkaan". Onko teillä selvä suositus?
6. **Puun kuivuus** (`milloin-talon-voi-maalata-saa` 17.12., `pohjamaali-paljaisiin-kohtiin` 11.2.): artikkelit eivät
   väitä, että mittaatte kosteutta mittarilla. Mittaatteko, vai arvioitteko kuivumisen päivinä ja käsin?
7. **Takuun sisältö** (`kuka-pinnoittaa-kattosi` 8.4., `mita-tarjouksesta-kannattaa-katsoa` 12.4.): artikkelit sanovat
   vain "kirjallinen 5 vuoden takuu" ja "2 vuoden takuu". Mitä takuu kattaa (hilseily, irtoaminen, värin haalistuminen)
   ja mitä ei? Ilman vastausta sisältöä ei täsmennetä.
8. **Lopputarkastus**: artikkelit sanovat, että asiakas kiertää kohteen kanssanne lopputarkastuksessa
   (`tyovaiheet.ts`: "Lopputarkastus ja takuu"). Onko se aina yhteinen kierros, vai joskus kuvat ja soitto?
9. **Taloyhtiöt** (asiakaskysymys K6) ja **peltikatto** (Search Console H4) jätettiin pois ohjelmasta: CLAUDE.md kieltää
   peltikaton markkinoinnin, ja taloyhtiöistä sivustolla ei ole yhtään faktaa (hinnoittelu, päätöksenteko). Haluatko
   jommankumman aiheen, ja millä faktoilla?
10. **Hylättävät**: listaa slugit, jotka poistetaan. Jos hylkäät yli viisi, kerro, siirretäänkö loput aikaisemmaksi vai
    jätetäänkö päivät tyhjiksi.
