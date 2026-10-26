# Hakutulosanalyysi 26.10.2026: 60 hakua, kilpailijoiden sivut ja sisältöaukot

Tämä täydentää [kilpailija-analyysiä](kilpailija-analyysi-2026-10-26.md), joka vertasi viiden kilpailijan sivustorakennetta. Tässä katsotaan hakutuloksia haku kerrallaan: kuka voittaa, millaisella sivulla, ja mitä pintanen.fi:n sivuilta puuttuu. Kilpailijoista ei väitetä sivustolla mitään. Tämä on sisäinen työpaperi.

Tiivistelmä on luvussa 1. Luvut 2–7 ovat mittaukset, luku 8 kilpailijoiden sivujen sisältö, luku 9 omien sivujen aukot sivu kerrallaan, luku 10 sisältöbriefit ja luku 11 kysymykset Eerikille.

## 1. Tiivistelmä

1. **Pintanen näkyy 60 hausta viidessä kahdenkymmenen parhaan joukossa.** Kolmessa kymmenen joukossa: "kannattaako tiilikatto pinnoittaa" sija 2 (artikkeli), "talon maalaus kangasala" sija 5, "julkisivumaalaus tampere" sija 10. Rahakyselyissä "tiilikaton pinnoitus tampere", "katon pinnoitus tampere" ja "talon maalaus nokia" sivusto ei ole 20 parhaan joukossa. Mittaus on tietokoneen hakutulos 26.10.; Search Consolen keskisijainnit ovat paremmat, koska ne sisältävät mobiilin ja useamman päivän (luku 3).
2. **Väärä sivu näkyy.** Kolmessa viidestä osumasta Google näyttää jonkin muun kuin tarkoitetun sivun: "tiilikaton pinnoitus pirkanmaa" näyttää `/maalauspalvelut-tampere/` (sija 12), "talon maalaus kangasala" näyttää `/maalauspalvelut-pirkkala/` (sija 5) ja "talon maalaus tampere" etusivun (sija 15). Pinnoituksen ja maalauksen omat sivut eivät nouse. Sama ilmiö todettiin Search Consolessa 11.10. Tämä on raportin tärkein löydös: ennen uutta sisältöä pitää korjata sivuroolit ja sisäinen linkitys (luku 9).
3. **Tekoälyvastaus on 58 haussa 60:stä.** Lähteinä toistuvat katonmaalaushinta.fi, sorcolor.fi, urakkamaailma.fi, etewa.fi, lummeco.fi ja variset.fi. Pintanen ei ole yhdenkään haun lähteenä. Lähteiksi pääsevät sivut, joilla on hintaesimerkkejä kokoluokittain, selvä UKK ja suorat vastausvirkkeet (luku 6).
4. **Paikalliset haut voittaa loistepinta.fi** (10 kertaa viiden parhaan joukossa Tampereen hauissa), sitten lummeco.fi, variset.fi, sorcolor.fi, maalausmestari.fi ja haijaanmaalaus.fi. Kaikilla on erillinen sivu joka kunnalle ja palvelulle, kuten Pintasella. Ero on linkkien määrässä ja iässä, ei sivurakenteessa (luku 7).
5. **Linkkiprofiili on tyhjä.** pintanen.fi:llä on 2 viittaavaa verkkotunnusta, kilpailijoilla 24–154. Yksikään mittari ei selitä sijoituseroa yhtä hyvin. Luvussa 7 on 20 suomalaista sivustoa, jotka linkittävät kilpailijoihin ja joihin Pintanen voi hakea.
6. **Suurimmat hakumäärät ovat aiheissa, joihin sivustolla ei ole sivua:** "kattoremontti hinta" (1 600 hakua/kk), "sammaleen poisto katolta" (1 600), "peltikaton maalaus" (1 000), "kotitalousvähennys laskuri" (1 600). Näistä kattoremontti ja sammal sopivat Pintasen palveluun suoraan, peltikatto vain UKK-tasolla (Eerik 26.10.). Luvussa 10 on briefit.

## 2. Menetelmä ja lähteet

- **Haut:** 60 hakua (`a/queries.txt` työpaperissa): 33 kattoaiheista ja 27 maalausaiheista, joista 20 paikallista (Tampere, Nokia, Ylöjärvi, Kangasala, Lempäälä, Hämeenlinna, Pirkanmaa). Yhdeksän ensimmäistä haettiin OpenRushin `inspect_serp`-työkalulla (sisältää "ihmiset kysyvät myös" -kysymykset ja tekoälyvastauksen lähteet). OpenRushin kreditit loppuivat, ja loput 51 haettiin OpenSEOn `get_serp_results`-työkalulla (20 ensimmäistä tulosta, tietokone, Suomi). Paikalliset haut haettiin sijainnilla Tampere. OpenSEO ei palauta kysymyslaatikoita eikä tekoälyvastauksen lähteitä, joten ne ovat vain yhdeksästä hausta.
- **Hakumäärät:** OpenRush `research_keywords` (Suomi, kuukausikeskiarvo) ja `compare_keyword_coverage` (pintanen.fi vastaan lummeco.fi, sorcolor.fi, variset.fi, katonmaalaushinta.fi).
- **Tekoälyvastaukset:** OpenRush `discover_ai_citations` aiheille "tiilikaton pinnoitus" ja "talon maalaus" (Googlen AI Overview, otoskorpus) sekä hakutulosten tekoälyvastauksen lähteet.
- **Linkit:** OpenRush `inspect_backlinks` ja `compare_backlink_gap`.
- **Kilpailijoiden sivut:** hakutulosten 454 erillisestä top-10-sivusta analysoitiin 333 (pois foorumit, videot, hakemistojen sivutukset, sisämaalaus ja toisten maakuntien kuntasivut). Jokaisesta kirjattiin otsikot, hinnat, UKK, takuu, työvaiheet, lomakkeet, luottamuselementit ja schema. Sivut luettiin 26.10.2026.
- **Omat sivut:** buildin `dist/`-kansion 100 sivun otsikot ja sanamäärät sekä Search Consolen vienti 30.9.–6.10. (auditointi, osa 4).
- **Search Console:** keskisijainnit ovat auditoinnin osasta 4 (11.10.2026). Ne ovat seitsemän päivän keskiarvoja mobiilista ja tietokoneesta, joten ne eivät ole suoraan verrattavissa yhden päivän tietokonehakuun.

Raakatiedot ovat sessiotyöpaperissa, eivät repossa. Hakutulokset voi toistaa samoilla työkaluilla.

## 3. Missä Pintanen näkyy: 60 hakua

Sija on pintanen.fi:n paras orgaaninen sija 20 parhaan joukossa (– = ei 20 parhaassa). "Top-10-sivutyypit" kertoo, millaiset sivut kymmenen parhaan joukossa ovat: palvelusivu (yrityksen palvelusivu ilman kuntaa), kaupunkisivu (palvelu + kunta), hintasivu, artikkeli, portaali (urakkamaailma, kodinplaza, remppakamu, etuovi, lehdet), laskuri, valmistaja (Tikkurila, Teknos, BMI, Kerabit), foorumi.

| Haku | Pintanen | Ominaisuudet | Top 3 | Top-10-sivutyypit |
|---|---|---|---|---|
| hirsitalon maalaus | – | ai_overview | honka.fi (valmistaja), tikkurila.fi (valmistaja), maalausvalko.fi (kaupunkisivu) | kaupunkisivu 4, valmistaja 3, palvelusivu 2, artikkeli 1 |
| huoltomaalaus | – | ai_overview | tikkurila.fi (valmistaja), kodinplaza.fi (portaali), tasoket.fi (palvelusivu) | palvelusivu 4, valmistaja 2, artikkeli 2, portaali 1, foorumi 1 |
| julkisivumaalaus tampere (Tampere) | 10 | ai_overview,local_pack | loistepinta.fi (kaupunkisivu), loistepinta.fi (palvelusivu), lummeco.fi (palvelusivu) | palvelusivu 6, kaupunkisivu 2, portaali 1, foorumi 1 |
| julkisivumaalaus | – | ai_overview | laatumaalarit.fi (palvelusivu), julkisivumaalausoy.fi (palvelusivu), maalaus-tervo.fi (palvelusivu) | palvelusivu 9, kaupunkisivu 1 |
| kannattaako tiilikatto pinnoittaa | 2 | ai_overview | kourulle.com (palvelusivu), pintanen.fi (artikkeli), kattotutka.fi (palvelusivu) | artikkeli 5, palvelusivu 4, kaupunkisivu 1 |
| katon maalaus hinta | – | ai_overview | katonmaalaushinta.fi (hintasivu), aallonmaalarit.fi (hintasivu), fiksumaalaus.fi (artikkeli) | hintasivu 4, artikkeli 4, palvelusivu 1, portaali 1 |
| katon maalaus tampere (Tampere) | – | ai_overview | ml-kattopalvelu.com (palvelusivu), katonmaalaustampere.fi (kaupunkisivu), katonmaalaushinta.fi (hintasivu) | kaupunkisivu 5, palvelusivu 4, hintasivu 1 |
| katon maalaus | – | ai_overview | priimamaalaus.fi (palvelusivu), rakennusmaailma.fi (portaali), youtube.com (foorumi) | palvelusivu 3, portaali 2, artikkeli 2, foorumi 1, laskuri 1, hintasivu 1 |
| katon pinnoitus hämeenlinna | – | ai_overview,local_pack | kattotutka.fi (kaupunkisivu), rakennusmestarit.com (palvelusivu), urakkamaailma.fi (portaali) | palvelusivu 5, kaupunkisivu 3, portaali 1, hintasivu 1 |
| katon pinnoitus hinta | – | ai_overview | sorcolor.fi (palvelusivu), katonmaalaushinta.fi (hintasivu), katonpuhdistus.fi (hintasivu) | hintasivu 5, palvelusivu 3, portaali 1, laskuri 1 |
| katon pinnoitus kokemuksia | – | ai_overview | vesivek.fi (artikkeli), sorcolor.fi (palvelusivu), autostadium.fi (foorumi) | artikkeli 4, foorumi 4, palvelusivu 2 |
| katon pinnoitus nokia (Tampere) | – | ai_overview,local_pack | lummeco.fi (kaupunkisivu), loistepinta.fi (kaupunkisivu), eliittikatot.fi (palvelusivu) | kaupunkisivu 7, portaali 2, palvelusivu 1 |
| katon pinnoitus tampere (Tampere) | – | ai_overview,local_pack | lummeco.fi (kaupunkisivu), tammone.fi (palvelusivu), katonmaalaushinta.fi (hintasivu) | kaupunkisivu 5, palvelusivu 4, hintasivu 1 |
| katon pinnoitus | – | ai_overview,local_pack | bmigroup.com (valmistaja), kotirempax.fi (palvelusivu), kskiinteistopalvelu.fi (palvelusivu) | palvelusivu 4, kaupunkisivu 2, artikkeli 2, valmistaja 1, hintasivu 1 |
| katonpesu | – | ai_overview | ionic.fi (kaupunkisivu), pohjolanmaalipojat.fi (hintasivu), motonet.fi (portaali) | kaupunkisivu 4, palvelusivu 3, hintasivu 2, portaali 1 |
| kattopinnoitus | – | ai_overview | etewa.fi (artikkeli), etewa.fi (artikkeli), etewa.fi (artikkeli) | artikkeli 6, palvelusivu 4 |
| kattoremontti hinta | – | ai_overview,paid | etuovi.com (portaali), urakkamaailma.fi (portaali), urakkamaailma.fi (portaali) | portaali 8, hintasivu 1, palvelusivu 1 |
| kattoremontti tampere (Tampere) | – | paid | kattotutka.fi (kaupunkisivu), google.com (portaali), cattosa.fi (kaupunkisivu) | portaali 8, kaupunkisivu 2 |
| kattoremontti vai pinnoitus | – | ai_overview | etewa.fi (palvelusivu), kourulle.com (palvelusivu), priimapinnoitus.fi (palvelusivu) | palvelusivu 6, artikkeli 3, kaupunkisivu 1 |
| kotitalousvähennys katon pinnoitus | – | ai_overview | laatukoti.fi (artikkeli), edilex.fi (portaali), edilex.fi (portaali) | palvelusivu 5, artikkeli 3, portaali 2 |
| kuinka usein talo maalataan | – | ai_overview | tikkurila.fi (valmistaja), aldeko.fi (artikkeli), virtasenmaalitehdas.fi (valmistaja) | palvelusivu 5, valmistaja 2, artikkeli 2, portaali 1 |
| maalausliike tampere (Tampere) | – | ai_overview,local_pack,paid | loistepinta.fi (kaupunkisivu), maalausmestari.fi (kaupunkisivu), sirkku.fi (palvelusivu) | kaupunkisivu 4, palvelusivu 4, portaali 2 |
| maalausurakoitsija | – | ai_overview,local_pack | fonecta.fi (portaali), tasoitetalo.fi (palvelusivu), xn--snpintaksittely-7kb.fi (kaupunkisivu) | palvelusivu 5, kaupunkisivu 3, portaali 1, artikkeli 1 |
| omakotitalon maalaus hinta | – | ai_overview | sorcolor.fi (palvelusivu), tuomaalari.fi (palvelusivu), maalausrantamaki.com (palvelusivu) | palvelusivu 4, portaali 3, hintasivu 2, artikkeli 1 |
| peltikaton maalaus | – | ai_overview | tikkurila.fi (valmistaja), aallonmaalarit.fi (hintasivu), variset.fi (artikkeli) | valmistaja 3, artikkeli 3, hintasivu 2, palvelusivu 2 |
| puutalon maalaus | – | ai_overview | sorcolor.fi (artikkeli), tikkurila.fi (valmistaja), facebook.com (foorumi) | palvelusivu 3, artikkeli 2, valmistaja 2, portaali 2, foorumi 1 |
| rintamamiestalon maalaus | – | ai_overview | variset.fi (artikkeli), pensseliveljet.fi (palvelusivu), rintamamiestalo.fi (foorumi) | artikkeli 4, palvelusivu 3, foorumi 1, portaali 1, hintasivu 1 |
| sammaleen poisto tiilikatolta | – | ai_overview | ehostava.fi (palvelusivu), kodinmaalaus.fi (palvelusivu), cleanor.net (palvelusivu) | palvelusivu 5, artikkeli 4, portaali 1 |
| talon maalaus hämeenlinna | – | ai_overview | onnenmaali.fi (palvelusivu), urakkamaailma.fi (portaali), sorcolor.fi (kaupunkisivu) | palvelusivu 5, kaupunkisivu 3, portaali 2 |
| talon maalaus hinta | – | ai_overview | pohjolanmaalipojat.fi (hintasivu), fiksumaalaus.fi (hintasivu), variset.fi (laskuri) | hintasivu 6, portaali 2, laskuri 1, artikkeli 1 |
| talon maalaus hintalaskuri | – | ai_overview | sorcolor.fi (palvelusivu), sorcolor.fi (artikkeli), varisuora.com (palvelusivu) | palvelusivu 3, hintasivu 3, laskuri 2, artikkeli 1, portaali 1 |
| talon maalaus kangasala (Tampere) | 5 | ai_overview | haijaanmaalaus.fi (kaupunkisivu), variset.fi (kaupunkisivu), maalausjokitalo.fi (palvelusivu) | kaupunkisivu 8, palvelusivu 1, foorumi 1 |
| talon maalaus kotitalousvähennys | – | ai_overview | edilex.fi (portaali), vero.fi (portaali), maalausmestari.fi (palvelusivu) | portaali 5, palvelusivu 5 |
| talon maalaus nokia (Tampere) | – | ai_overview,paid | maalausvanhatalo.fi (kaupunkisivu), haijaanmaalaus.fi (kaupunkisivu), maalausmestari.fi (kaupunkisivu) | kaupunkisivu 10 |
| talon maalaus pirkanmaa (Tampere) | – | ai_overview | maalausliikevainiomaki.fi (palvelusivu), variset.fi (kaupunkisivu), lummeco.fi (kaupunkisivu) | palvelusivu 6, kaupunkisivu 4 |
| talon maalaus tampere (Tampere) | 15 | ai_overview | maalaustampere.fi (kaupunkisivu), haijaanmaalaus.fi (kaupunkisivu), facebook.com (foorumi) | kaupunkisivu 7, foorumi 1, palvelusivu 1, portaali 1 |
| talon maalaus ylöjärvi (Tampere) | – | ai_overview | instagram.com (palvelusivu), tekijatori.fi (portaali), pitava.fi (kaupunkisivu) | palvelusivu 3, portaali 3, kaupunkisivu 3, foorumi 1 |
| talon maalaus | – | ai_overview | k-rauta.fi (portaali), tikkurila.fi (valmistaja), variset.fi (artikkeli) | palvelusivu 5, portaali 2, valmistaja 2, artikkeli 1 |
| talon ulkomaalaus | – | ai_overview | meillakotona.fi (portaali), varion.fi (palvelusivu), kotirex.fi (artikkeli) | palvelusivu 4, portaali 2, artikkeli 2, foorumi 1, kaupunkisivu 1 |
| tiilikaton maalaus hinta | – | ai_overview | urakkamaailma.fi (portaali), katonmaalaushinta.fi (hintasivu), kodinplaza.fi (portaali) | hintasivu 4, portaali 2, palvelusivu 2, laskuri 1, artikkeli 1 |
| tiilikaton maalaus tampere (Tampere) | – | ai_overview,local_pack | variset.fi (kaupunkisivu), loistepinta.fi (kaupunkisivu), lummeco.fi (kaupunkisivu) | kaupunkisivu 6, palvelusivu 3, hintasivu 1 |
| tiilikaton maalaus | – | ai_overview | bmigroup.com (valmistaja), suomenpintapalvelu.fi (palvelusivu), variset.fi (artikkeli) | artikkeli 4, palvelusivu 3, valmistaja 1, portaali 1, kaupunkisivu 1 |
| tiilikaton pesu ja pinnoitus | – | ai_overview | pintamestarit.fi (palvelusivu), kattotutka.fi (palvelusivu), sorcolor.fi (palvelusivu) | palvelusivu 6, kaupunkisivu 3, foorumi 1 |
| tiilikaton pesu | – | ai_overview | lummeco.fi (palvelusivu), kourulle.com (palvelusivu), kotirempax.fi (palvelusivu) | palvelusivu 7, portaali 2, kaupunkisivu 1 |
| tiilikaton pinnoitus hinta | – | ai_overview | loistepinta.fi (artikkeli), tkpinnoitus.fi (kaupunkisivu), kodinplaza.fi (portaali) | kaupunkisivu 3, portaali 2, palvelusivu 2, hintasivu 2, artikkeli 1 |
| tiilikaton pinnoitus itse | – | ai_overview | katonpuhdistus.fi (palvelusivu), iskatto.fi (artikkeli), fiksumaalaus.fi (palvelusivu) | palvelusivu 7, artikkeli 1, foorumi 1, kaupunkisivu 1 |
| tiilikaton pinnoitus kangasala (Tampere) | – | ai_overview,knowledge_graph | aallonmaalarit.fi (kaupunkisivu), pirkanmaanpainepesu.fi (kaupunkisivu), takuusaneeraus.fi (kaupunkisivu) | kaupunkisivu 8, palvelusivu 1, hintasivu 1 |
| tiilikaton pinnoitus kestävyys | – | ai_overview | sorcolor.fi (palvelusivu), kattokumppanit.fi (palvelusivu), reddit.com (foorumi) | palvelusivu 7, foorumi 1, artikkeli 1, kaupunkisivu 1 |
| tiilikaton pinnoitus kokemuksia | – | ai_overview | sorcolor.fi (palvelusivu), autostadium.fi (foorumi), pintamestarit.fi (hintasivu) | foorumi 4, artikkeli 3, palvelusivu 2, hintasivu 1 |
| tiilikaton pinnoitus lempäälä (Tampere) | – | ai_overview,local_pack,paid | katonmaalaushinta.fi (hintasivu), variset.fi (kaupunkisivu), telajapensseli.fi (kaupunkisivu) | kaupunkisivu 8, hintasivu 1, palvelusivu 1 |
| tiilikaton pinnoitus pirkanmaa (Tampere) | 12 | ai_overview | aallonmaalarit.fi (kaupunkisivu), kattohaka.com (palvelusivu), pensseliveljet.fi (palvelusivu) | palvelusivu 6, kaupunkisivu 4 |
| tiilikaton pinnoitus tampere (Tampere) | – | ai_overview,local_pack,paid | haijaanmaalaus.fi (kaupunkisivu), loistepinta.fi (kaupunkisivu), maalausmestari.fi (kaupunkisivu) | kaupunkisivu 7, palvelusivu 3 |
| tiilikaton pinnoitus vai uusi katto | – |  | taikomus.fi (artikkeli), kerabit.fi (valmistaja), kattokeskus.fi (artikkeli) | palvelusivu 4, artikkeli 3, hintasivu 2, valmistaja 1 |
| tiilikaton pinnoitus ylöjärvi (Tampere) | – | ai_overview,local_pack | mosvex.fi (kaupunkisivu), sorcolor.fi (kaupunkisivu), aallonmaalarit.fi (kaupunkisivu) | kaupunkisivu 5, palvelusivu 3, portaali 1, hintasivu 1 |
| tiilikaton pinnoitus | – | ai_overview | etewa.fi (palvelusivu), pintaykkoset.fi (palvelusivu), variset.fi (artikkeli) | palvelusivu 6, artikkeli 3, foorumi 1 |
| tiilikaton puhdistus | – | ai_overview | roofest.fi (palvelusivu), facebook.com (foorumi), rakennehuolto.fi (artikkeli) | palvelusivu 5, artikkeli 3, foorumi 1, portaali 1 |
| ulkomaalaus hinta | – | ai_overview | priimapinta.fi (hintasivu), kodinplaza.fi (portaali), urakkamaailma.fi (portaali) | portaali 7, hintasivu 1, artikkeli 1, laskuri 1 |
| ulkomaalaus neliöhinta | – | ai_overview | etuovi.com (portaali), variset.fi (artikkeli), priimamaalaus.fi (laskuri) | artikkeli 4, laskuri 3, portaali 2, hintasivu 1 |
| ulkomaalaus tampere (Tampere) | – | ai_overview,local_pack | maalausmestari.fi (kaupunkisivu), varion.fi (palvelusivu), maalausmestari.fi (palvelusivu) | palvelusivu 5, kaupunkisivu 3, foorumi 1, portaali 1 |
| ulkomaalaus | – | ai_overview | variset.fi (artikkeli), maalausliikeilme.fi (palvelusivu), uula.fi (valmistaja) | artikkeli 4, palvelusivu 4, valmistaja 1, foorumi 1 |

### 3.1 Mitä taulukosta seuraa

- **Kymmenen parhaan joukossa on 60 haussa yhteensä 600 sivua: palvelusivuja 212, kaupunkisivuja 131, artikkeleita 83, portaaleja 76, hintasivuja 46, foorumeita 24, valmistajien sivuja 18 ja laskureita 10.** Palvelu- ja kaupunkisivut voittavat rahakyselyt, artikkelit voittavat kysymyshaut. Pintasella on molempia, joten sivutyyppi ei ole ongelma.
- **Pintasen viisi osumaa:**

| Haku | Sija | Näkyvä sivu | Tarkoitettu sivu |
|---|---|---|---|
| kannattaako tiilikatto pinnoittaa | 2 | `/artikkelit/milloin-pinnoittaa-tiilikatto/` | sama |
| talon maalaus kangasala | 5 | `/maalauspalvelut-pirkkala/` | `/talon-maalaus-kangasala/` |
| julkisivumaalaus tampere | 10 | `/` | `/talon-maalaus-tampere/` |
| tiilikaton pinnoitus pirkanmaa | 12 | `/maalauspalvelut-tampere/` | `/tiilikaton-pinnoitus-pirkanmaa/` |
| talon maalaus tampere | 15 | `/` | `/talon-maalaus-tampere/` |

  Neljässä viidestä Google valitsee väärän sivun. `maalauspalvelut-<kunta>`-sivut ovat vanhempia ja niihin osoittaa enemmän sisäisiä linkkejä (ylävalikko, alatunniste, toiminta-alueet). Uudet `tiilikaton-pinnoitus-<kunta>`- ja `talon-maalaus-<kunta>`-sivut ovat sisällöltään paremmat (1 700–2 300 sanaa, oma UKK, paikalliset tilastot), mutta Google ei pidä niitä pääsivuina.
- **Search Consolen ja tämän mittauksen ero.** Search Console 30.9.–6.10.: "tiilikaton pinnoitus tampere" keskisijainti 15, "tiilikaton maalaus tampere" 9, "talon maalaus tampere" 38, "katon pinnoitus tampere" 12, "ulkomaalaus pirkanmaa" 8. Tämän päivän tietokonehaussa Tampereelta sivusto ei ole 20 parhaan joukossa näistä yhdessäkään paitsi "talon maalaus tampere" (15). Ero selittyy mobiililla (Search Consolen mukaan mobiilin keskisijainti on 8 ja tietokoneen 20), personoinnilla ja päivävaihtelulla. Johtopäätös on sama molemmissa: tietokoneella sivusto on toisella tai kolmannella sivulla, ja mobiili pitää sivustoa ensimmäisen sivun alareunassa.
- **Tekoälyvastaus näkyy 58 haussa 60:stä** ja paikallinen yrityspaketti (kartta ja kolme yritystä) 12 haussa: kaikissa Tampereen, Nokian, Ylöjärven, Lempäälän ja Hämeenlinnan hauissa sekä hauissa "katon pinnoitus" ja "maalausurakoitsija". Paikallisissa hauissa ensimmäinen ruutu on siis tekoälyvastaus, sitten kartta, ja vasta sitten orgaaniset tulokset. Google-yritysprofiili ratkaisee kartan, ei sivusto.
- **"katon maalaus" ja "katon maalaus hinta" ovat sisäkattohakuja.** Kymmenen parhaan joukossa on enimmäkseen sisäkaton maalausohjeita (rakennusmaailma, priimamaalaus, verkkoremontti). Näihin ei kannata tähdätä. "tiilikaton maalaus" ja "katon pinnoitus" ovat oikeat sanat.

## 4. Kuka voittaa ja millä

### 4.1 Verkkotunnukset kymmenen parhaan joukossa (60 hakua)

| Verkkotunnus | Top-10-esiintymiä | Millä sivuilla |
|---|---|---|
| loistepinta.fi | 35 | kuntasivut "Tiilikaton pinnoitus <kunta> – kiinteä urakkahinta", blogi, hintasivut |
| sorcolor.fi | 31 | palvelusivut, blogi (152 artikkelia), maakunta- ja kuntasivut |
| urakkamaailma.fi | 27 | hintaportaali: toteutuneita urakkahintoja kunnittain |
| variset.fi | 22 | tietopankki, kuntasivut, hintalaskuri |
| etewa.fi | 21 | palvelusivut ja artikkelit (pinnoitus) |
| lummeco.fi | 17 | kuntasivut, oppaat, kokemukset |
| priimamaalaus.fi | 13 | oppaat (maalaus), hintalaskuri |
| maalausmestari.fi | 13 | palvelu- ja kuntasivut |
| katonpuhdistus.fi | 13 | pesu ja pinnoitus, hintaesimerkit |
| pohjolanmaalipojat.fi | 11 | hintaoppaat, kokemukset |
| tkpinnoitus.fi | 10 | kuntasivut, hintalaskuri |
| katonmaalaushinta.fi | 10 | hinta- ja kuntasivut |
| aallonmaalarit.fi | 10 | Tampere-sivut (pesu, pinnoitus, pelti) |
| mosvex.fi | 9 | kuntasivut, blogi |

Tampereen paikallisissa hauissa viiden parhaan joukossa: loistepinta.fi 10 kertaa, lummeco.fi 6, variset.fi 5, sorcolor.fi 5, maalausmestari.fi 5, haijaanmaalaus.fi 5, tekijatori.fi 3, mosvex.fi 3, katonmaalaushinta.fi 3, aallonmaalarit.fi 3.

### 4.2 Kysymyshaut

Kysymyshauissa ("kannattaako", "kuinka usein", "vai uusi katto", "kestävyys", "itse") kymmenen parhaan joukossa on 5–8 artikkelia ja usein valmistajan ohje (Tikkurila, Teknos). Pintasen artikkeli "Milloin tiilikatto pitää pinnoittaa" on sijalla 2 haussa "kannattaako tiilikatto pinnoittaa". Se osoittaa, että artikkelit nousevat nopeasti, kun otsikko on kysymys ja vastaus on alussa. Samalla mallilla puuttuvat vielä: "tiilikaton pinnoitus kestävyys" (sorcolor, pohjolanmaalipojat, etewa voittavat), "tiilikaton pinnoitus kokemuksia" (lummeco, ehostava, jarkiteko), "kuinka usein talo maalataan" (tikkurila, aldeko, virtasenmaalitehdas; Pintasen artikkeli ei ole 20 parhaassa).

### 4.3 Hintahaut

"tiilikaton pinnoitus hinta" (480 hakua/kk): etewa, katonmaalaushinta, sorcolor, katonpuhdistus, suomenpintapalvelu. Kaikilla on sivulla taulukko tai lista kokoluokittain (150 m², 200 m², 250 m²) ja useimmilla toteutuneita kohteita hintoineen. Pintasen hintasivu `/tiilikaton-pinnoitus-hinta-pirkanmaa/` ei ole 20 parhaassa, vaikka Search Console näytti sen sijoilla 2–3 hauissa "tiilikaton pinnoitus hinta" ja "pinnoituksen hinta" (mahdollisesti omia hakuja, osa 4). "talon maalaus hinta" (880): pohjolanmaalipojat, fiksumaalaus, variset, loistepinta, aldeko, kaikilla vuosiluku otsikossa ja esimerkkikohteet.

## 5. Hakumäärät ja hakusana-aukot

Luvut ovat Suomen kuukausikeskiarvoja (OpenRush, 26.10.2026). Pienet luvut (10–30) ovat suuntaa antavia.

### 5.1 Katto

| Hakusana | Hakuja/kk | Pintasen sivu | Huomio |
|---|---|---|---|
| sammaleen poisto | 2 900 | ei | lummeco sija 1; sammal johtaa pinnoitukseen |
| sammaleen poisto katolta | 1 600 | ei | sorcolor 12, lummeco 19 |
| kattoremontti hinta | 1 600 | ei (artikkeli "Kattoremontti vai pinnoitus" sivuaa) | urakkamaailma, etuovi, harjawa |
| kattoremontti hintalaskuri | 1 600 | ei | sama aihe |
| kattoremontti | 1 000 | ei | |
| tiilikaton pinnoitus | 1 000 | hub | sorcolor 3, lummeco 5, katonmaalaushinta 6 |
| peltikaton maalaus | 1 000 | ei (UKK-vastaus) | variset 3, sorcolor 5 |
| katon maalaus | 720 | ei | sisäkattohaku |
| tiilikaton pesuaine | 720 | ei | tuotehaku, ei Pintaselle |
| tiilikaton pinnoitus hinta | 480 | hintasivu | |
| tiilikaton pesu ja pinnoitus hinta | 260 | ei omaa | hintasivu vastaa, mutta sanapari puuttuu otsikoista |
| katon maalaus hinta | 260 | ei | sisäkatto |
| kattoremontti tampere | 170 | ei | |
| kattoremontti pirkanmaa | 170 | ei | |
| tiilikaton pesu ja pinnoitus | 140 | artikkeli jonossa 10.11. | |
| tiilikaton pinnoitus aine | 140 | ei | tuotehaku |
| tiilikaton pinnoitus itse | 110 | artikkeli jonossa 3.11. | |
| tiilikaton pinnoitus kokemuksia | 50 | `/kokemuksia/` | ei 20 parhaassa |
| ormax tiilikaton pinnoitus hinta | 40 | artikkeli jonossa 23.11. | |
| kannattaako tiilikaton pinnoitus | 30 | artikkeli | sija 2 |
| tiilikaton pinnoitus hinta m2 | 30 | hintasivun UKK | |
| tiilikaton pinnoitus tampere | 30 | Tampere-sivu | ei 20 parhaassa |
| katon maalaus tampere | 20 | ei omaa | |

### 5.2 Maalaus

| Hakusana | Hakuja/kk | Pintasen sivu | Huomio |
|---|---|---|---|
| talon maalaus | 880 | hub | variset 9, maalausmestari 4, sorcolor 3 |
| talon maalaus hinta | 880 | hintasivu | variset 3, sorcolor 6 |
| talon maalauksen hinta | 880 | sama | variset 1 |
| talon maalaus hintalaskuri | 210 | `/hintalaskuri/` | sorcolor 1–2, ei 20 parhaassa |
| talon maalaus hinta laskuri | 210 | sama | |
| ulkomaalaus lämpötila | 210 | ei | ohjehaku, artikkeliaihe |
| ulkomaalaus | 170 | hub (H2) | variset 1 |
| talon ulkomaalaus | 170 | hub (H2) | |
| talon maalaus ruiskulla | 90 | ei | Pintanen maalaa pensselillä: UKK-vastaus |
| vanhan talon maalaus | 90 | ei | artikkeliaihe |
| talon maalaus itse | 90 | ei | |
| talon maalaus tampere | 70 | Tampere-sivu | etusivu sijalla 15 |
| ulkomaalaus hinta | 70 | hintasivu | |
| talon ulkomaalaus hinta | 50 | hintasivu | |
| talon maalaus pirkanmaa | 50 | hub | ei 20 parhaassa |
| paljonko maksaa talon maalaus | 50 | hintasivun UKK | Search Console sija 1 |
| talon maalaus syksyllä | 40 | ei | artikkeliaihe (kausi) |
| talon maalaus järjestys | 40 | ei | ohjehaku |
| omakotitalon ulkomaalaus hinta | 30 | hintasivu | |
| mökin ulkomaalaus | 30 | artikkeli jonossa 30.11. | |
| hirsitalon ulkomaalaus | 20 | ei | valmistajat voittavat |
| ulkomaalaus pirkanmaa | 20 | hub | Search Console sija 8 |

### 5.3 Kotitalousvähennys

"kotitalousvähennys 2026 laskuri" 1 600, "kotitalousvähennys 2025 laskuri" 880, "kotitalousvähennyslaskuri" 880, "kotitalousvähennys omavastuu" 880. Variset on sijalla 3 ja Sorcolor 7 laskurisivuillaan. Pintasella on vähennyssivu ja artikkeli, mutta ei laskuria. Vähennyslaskuri hintalaskurin tulokseen on jo kilpailija-analyysin idea 9.

### 5.4 Aiheet, joita ei kannata tavoitella

compare_keyword_coverage listasi 100 hakusanaa, joilla kilpailijat näkyvät ja Pintanen ei. Suurin osa on muita palveluja: terassin öljyäminen (4 400), punamultamaali (2 900), pellavaöljy (2 900), sokkelin pinnoitus (1 000), huopakaton pinnoittaminen (590), rännien puhdistus (880), sisämaalaus, tapetit. Nämä ovat Lummecon ja Sorcolorin laajan palveluvalikoiman hakuja, eivät Pintasen.

## 6. Tekoälyvastaukset

Googlen tekoälyvastaus on 58 haussa 60:stä, myös kaikissa paikallisissa hauissa. Lähteet yhdeksässä OpenRush-haussa (kuinka monessa haussa lainattu): katonmaalaushinta.fi 7, sorcolor.fi 6, urakkamaailma.fi 5, etewa.fi 4, kerabit.fi 3, suomenpintapalvelu.fi 3, tkpinnoitus.fi 3, sitten kotirempax, lummeco, bmigroup, variset, tikkurila, priimamaalaus, katonpinnoitus.com ja aallonmaalarit 2 kukin.

`discover_ai_citations` (laajempi otos tekoälyvastauksista):

- **"tiilikaton pinnoitus":** sorcolor.fi 14, lummeco.fi 11, katonmaalaushinta.fi 11, etewa.fi 11, suomenpintapalvelu.fi 10, urakkamaailma.fi 9, aallonmaalarit.fi 9, kerabit.fi 8, tkpinnoitus.fi 7, bmigroup.com 6, kotirempax.fi 6.
- **"talon maalaus":** kodinplaza.fi 36, urakkamaailma.fi 28, tikkurila.fi 26, lummeco.fi 26, priimamaalaus.fi 25, k-rauta.fi 24, variset.fi 24, rakentaja.fi 20, sorcolor.fi 17, remppakamu.fi 15, maalauspartio.fi 15, pohjolanmaalipojat.fi 14, loistepinta.fi 13, maalausmestari.fi 11.

pintanen.fi ei ole kummassakaan listassa. Lainatuilla sivuilla on yhteistä: hinta kokoluokittain tai esimerkkikohteina heti sivun alussa, suora vastausvirke jokaisen H2:n alla, UKK 7–10 kysymyksellä ja vuosiluku. Pintasen sivuilla on samat osat, mutta tekoälyvastauksiin pääsy vaatii myös, että sivu on orgaanisesti kymmenen joukossa. Luku 6 ei siis tuo omaa toimenpidettä: kun sijoitus nousee, lainaukset seuraavat, kunhan vastausvirkkeet ovat valmiina (luku 9).

Mitä tekoälyvastaukset kysyvät (ihmiset kysyvät myös, 9 hausta, 23 kysymystä): Paljonko tiilikaton pinnoitus maksaa? Voiko tiilikattoa pestä painepesurilla? Millä saa katon puhtaaksi? Miten maalata tiilikatto itse? Kannattaako tiilikaton pinnoitus? Kauanko katon pinnoitus kestää? Voiko tiilikaton pestä itse? Paljonko maksaa tiilikaton pesu? Saako tiilikattoa pestä painepesurilla? Mikä on paras harja tiilikaton puhdistukseen? Mitä maksaa tiilikaton sammaleen poisto? Paljonko maksaa katon maalaus? Paljonko omakotitalon katon uusiminen maksaa? Paljonko maksaa uusi tiilikatto? Paljonko talon maalaaminen itse maksaa? Näistä Pintasen UKK:issa (`faqData.ts`, `cityFaq.ts`) ja artikkeleissa on vastaus kahdeksaan: hinta, kannattaako, kesto, pinnoitus itse, kattoremontti vai pinnoitus, uuden katon hinta (artikkeli), sammaleen poiston hinta (vain poistuvilla puhdistussivuilla). Puuttuvat pinnoitussivuilta: painepesu (Pintanen pesee painepesulla pinnoituksen yhteydessä, joten vastaus on myönteinen työn osana), tiilikaton pesun hinta ja sammaleen poisto pinnoituksen osana (kun puhdistussivut poistuvat, vastaus siirtyy pinnoitussivujen UKK:hon), katon maalauksen ja talon maalauksen hinta rinnakkaismuodoilla. Paras harja ja itse maalaaminen eivät ole Pintasen kysymyksiä.

## 7. Linkit

| Sivusto | Auktoriteetti (0–100) | Viittaavia verkkotunnuksia |
|---|---|---|
| pintanen.fi | 0 | 2 (toinen roskaa) |
| katonmaalaushinta.fi | 240 (indeksin oma asteikko) | 24 |
| lummeco.fi | 124 | 60 |
| variset.fi | 174 | 124 |
| sorcolor.fi | 194 | 154 |

Linkkiaukko (`compare_backlink_gap`): suomalaiset sivustot, jotka linkittävät vähintään yhteen kilpailijaan mutta eivät Pintaseen. Järjestys helpoimmasta:

1. **Hakemistot ja listaukset, joihin voi itse ilmoittautua:** pintaurakoitsijat.fi (liiton jäsenlistaus), omaurakka.fi, remppakamu.fi, hellotender.eu, kokemuksia.fi, trustmary.com, verkkomaine.fi, b2bsuomi.fi, suomalainentyo.fi (Avainlippu tai Suomalaista palvelua -merkki), kauppakamariverkosto.fi (Tampereen kauppakamarin jäsenyys).
2. **Valmistajien urakoitsijahaut:** tikkurila.fi (ammattilaishaku), teknos.com. Nowocoatin urakoitsijalistaus kannattaa kysyä valmistajalta.
3. **Media:** sttinfo.fi (tiedote, esimerkiksi kauden avaus tai uusi palvelualue), kauppalehti.fi (yritystiedot), kiinteistolehti.fi ja talojatyyli.fi (asiantuntijahaastattelu).
4. **Keskustelut:** suomi24.fi ja reddit (r/Suomi) nousevat hauissa "kokemuksia"; vain aidot vastaukset omalla nimellä.
5. **Messut:** Asta Rakentaja (Tampere) näytteilleasettajalistaus.

Lisäksi urakkamaailma.fi, kodinplaza.fi ja remppakamu.fi näkyvät 76 kertaa kymmenen parhaan joukossa. Yritysprofiili näissä tuo linkin ja näkyvyyden samoissa hauissa, joissa oma sivu ei vielä nouse. Kuvaustekstit kirjoitetaan sivuston sanoin (ei "emme tee", ei neliöhintoja).

## 8. Kilpailijoiden sivut: mitä 316 sivua kertoo

Luettu 333 sivua, joista 316 onnistui (katonpuhdistus.fi estää haun robots.txt:llä, iltalehti.fi ja etuovi.com eivät aukea, tekijatori.fi:n kaupunkisivut antoivat palvelinvirheen). Sanamäärät ovat arvioita pääsisällöstä; omien sivujen luvut luvussa 9 sisältävät valikot ja alatunnisteen, joten ne ovat noin 300 sanaa suurempia kuin vastaava kilpailijan luku.

### 8.1 Yleiskuva

| Mittari | Kilpailijoiden sivut (316) | Pintanen |
|---|---|---|
| Artikkelin pituus (mediaani) | 950 sanaa, puolet 750–1 300 | 650–900 (julkaistut) |
| Kaupunkisivun pituus | 900 sanaa, puolet 690–1 100 | 1 700–2 300 sisältöä |
| Palvelusivun pituus | 700 sanaa | 1 800–2 300 |
| Hintasivun pituus | 1 400 sanaa | 1 200–1 400 |
| UKK sivulla | 36 % sivuista; mediaani 5 kysymystä, pisimmät 10–17 | joka palvelu-, hinta- ja kaupunkisivulla, 6–10 kysymystä |
| Kysymysmuotoinen H2 tai H3 | 80 % | kyllä |
| Hinta sivulla | 66 %: 26 % kertoo €/m², 33 % kokoluokat tai esimerkkikohteet | hintakortit koon mukaan + haarukka |
| Takuu mainittu | 49 %; 5 vuotta 16 %:lla | 5 v / 2 v kirjallisesti, joka sivulla |
| Hintalaskuri | 47 % | kyllä, liidiportilla |
| Rahoitus | 36 % | ei (Eerikin päätös) |
| Ennen/jälkeen-kuvat | 16 % | kyllä, kuvapareja ja liukusäädin |
| Arvosana tai arvostelumäärä näkyvissä | 18 % | 5,0 / 28 Google-arvostelua |
| Video | 6 % | ei |
| Vuosiluku titlessä | 9 % (yleistyy: 2026, Fiksumaalaus jo 2027) | hintasivut ja artikkelit 2027 |
| JSON-LD näkyvissä | ei yhdelläkään tässä luennassa (työkalun rajoite, ei varma) | FAQPage, Service, LocalBusiness, Breadcrumb |

Tulkinta: sisällön määrässä, UKK:ssa, takuussa, kuvissa ja rakenteisessa datassa Pintasen sivut ovat jo kilpailijoiden parhaiden tasolla tai edellä. Kilpailijoiden sivut voittavat silti, koska niillä on linkkejä, ikää ja toistuvia mainintoja hakemistoissa (luku 7), ja koska Google näyttää Pintasen hauissa väärän sivun (luku 3).

### 8.2 Mitä voittavat sivut tekevät

1. **Hinta katon tai talon koon mukaan, ei vain haarukkana.** Pinnoituksessa Sorcolor (150–325 m² taulukko 3 550–5 740 €), Väriset (150–350 m² 3 420–6 385 €), TK-Pinnoitus (150–300 m² 2 990–4 730 €), Loistepinta (120–230 m² 3 200–5 000 €), Lummeco (alle 100 m² 2 800–4 000 €, 100–200 m² 4 000–6 000 €, yli 200 m² 6 000–8 000 €). Maalauksessa Sorcolor (100–350 m² 3 600–9 750 €), Loistepinta Nokia (neljä kohdetta 3 800–16 200 €), Häijään (1,5-kerroksinen 130 m² 8 200 €). Pintasen hintakortit tekevät saman kolmessa kokoluokassa. Ero on, että kilpailijat näyttävät lisäksi 3–6 toteutunutta kohdetta euroineen (Sorcolor, Priimapinnoitus, katonmaalaushinta, Väriset, Häijään, Hohde). Tämä on kilpailija-analyysin idea 1, ja tämä aineisto vahvistaa sen: se on hintahauissa yleisin voittajien yhteinen piirre.
2. **Kilpailijoiden haarukat ovat matalammat kuin Pintasen.** Pinnoitus: Etewä 1 000–3 000 € (120 m²), Väriveljet 2 000–5 500 €, Väriset 2 000–6 000 €, Sorcolor 2 500–5 500 €, Lummeco 2 800–8 000 €, Mosvex 3 000–8 000 €; portaalien toteutuneet hinnat Tampereella 2 350 € (100 m² pesu ja pinnoitus); Urakkamaailman kohdelistassa Valkeakoski 130 m² 4 120 € ja Tampere 3 975 € (huolto, aluskate ja pellitys). Maalaus: Loistepinta 4 000–10 000 €, Lummeco 4 000–11 000 €, Pitävä 4 000–12 000 €, Värisuora 4 500–9 500 €, Pohjolan Maalipojat 5 000–10 000 €; portaalin toteutuneet Tampereella 1 150–6 600 €. Pintasen 2 850–7 000 € ja 3 500–11 000 € ovat samaa tasoa kuin Lummeco ja Pitävä, mutta hakija näkee ensin portaalien ja Etewän matalammat luvut. Hintasivun "Mitä hintaan kuuluu" -osio on vastaus tähän, ja se kannattaa nostaa hintakorttien viereen.
3. **UKK, jossa kysymykset ovat hakukysymyksiä ja vastaus alkaa luvulla.** 113 sivulla on UKK; useimmin toistuvat aiheet: hinta (118 kysymystä), kesto ja kuinka usein (109), ajankohta (80), kannattaako (79), pesu ja sammal (64), tuote (57), itse tekeminen (45), kotitalousvähennys (38), sää (23), pinnoitus vai remontti (18), takuu (8), maksuehdot (7), pitääkö olla kotona (4). Pintasen UKK:t kattavat nämä paitsi sään (sade, lämpötila) ja tuotteen (millä maalilla). Nowocoat ja Tikkurila sanotaan sivuilla, mutta eivät kysymysmuodossa.
4. **Prosessi numeroituina vaiheina sopimuksesta loppuraporttiin** (Sorcolor 10, Pintaykköset 9, Lummeco 9, Priimapinta 10, Häijään 10). Pintasella on 7 vaihetta. Kilpailijoiden lisävaiheet ovat sopimus, aloituspalaveri ja työmaaraportti tai takuutodistus. Pintasen vaihe 7 "Lopputarkastus ja takuu" vastaa näitä; kirjallinen takuutodistus kannattaa sanoa vaiheen nimessä.
5. **Vuosiluku ja päivityspäivä.** Voittavilla hintasivuilla on vuosi otsikossa (Loistepinta 2026, Väriset 2026, Fiksumaalaus 2027) tai "Päivitetty"-leima. Pintasen hintasivut ja artikkelit käyttävät jo 2027:ää. Lisäksi näkyvä "Päivitetty"-päivä sivun yläosassa on halpa signaali, jota kilpailijoista vain Sorcolor ja Lummeco käyttävät.
6. **Kestoväitteet ovat kilpailijoilla isompia ja ristiriitaisia.** Pinnoituksen lisäikä: 10–15 vuotta 93 maininnassa, 15–20 (21), 10–20 (17), 20–30 (8), "jopa 20" (Iskatto, Kotirempax, Pintakoti, Sorcolor, Aldeko, Eliittikatot), 15–25 (Lummeco, Mosvex, Järkiteko), "jopa 25" (Jyväri). Samalla sivulla on usein kaksi eri lukua (Etewä 20 ja 10–15, Suomen Pintapalvelu 20–30 ja 10–15). Reddit-ketjussa ovimyyjä on luvannut 70 vuotta. Pintasen "jopa 15 vuotta" on joukon varovaisimpia ja uskottavin, ja se kannattaa sanoa ääneen: "Lupaamme sen, minkä pinnoite kestää."
7. **Kotitalousvähennyksen luvut ovat kilpailijoilla usein väärin.** Keväällä 2026 julkaistut sivut sanovat 35 % ja 1 600 € (Pohjolan Maalipojat, Varion, Maalaus ja Muutostyöt, Etewä osin), kodinplaza 2 250 € ja 100 € omavastuu, Tuplapensselit 2 250 € / 100 €, Väriset 4 200 € ja 4 800 € eri sivuilla. Oikeat luvut (40 %, 2 100 €, 150 €) ovat tuoreimmilla (Remppakamu, Valttikate, Sorcolor, rakentaja.fi). Pintasen vähennyssivu ja laskurin vähennysrivi (PR #129) ovat ajan tasalla ja lähteistetty. Tämä on erottautumiskeino, jota kannattaa käyttää artikkelien ja tekoälyvastausten lähteenä.
8. **Tuotemerkki nimetään harvoin.** Nowocoat mainitaan 35 sivulla, Tikkurila 42, Teknos 31. Pinnoituksessa yli puolet sanoo "laadukas pinnoite". "Vain Nowocoat" ja "Tikkurila" ovat Pintasella selvät, ja ne voi nostaa UKK-kysymykseksi ("Millä maalilla pinnoitatte?").
9. **Rahoitus ja verkkokauppa** ovat ketjujen keinoja (rahoitus 36 %, verkkokauppa 14 %). Eerik on päättänyt, ettei niitä tehdä. Ei muutosta.

### 8.3 Pirkanmaan suorat kilpailijat hakutuloksissa

| Yritys | Missä voittaa | Sivun vahvuus | Heikkous |
|---|---|---|---|
| Lummeco (Tampere) | katon pinnoitus Tampere 1, Lempäälä, Nokia, talon maalaus Nokia 6 | päivitetty 8/2026, hinnat kokoluokittain, 9 vaihetta, UKK, 4,8 / 300+ arvostelua | kaupunkisivut identtisiä, luvut ristiriidassa keskenään |
| Loistepinta (Pirkanmaa) | 35 top-10-osumaa: kuntasivut "kiinteä urakkahinta", hinta-artikkelit 2026, laskuri ilman yhteystietoja | neljä esimerkkikohdetta hintoineen joka kuntasivulla, NPS 87, videot | kuntasivuilla ei mitään paikallista, ei takuun pituutta, ei UKK:ta pinnoitussivuilla |
| Väriset Pirkanmaa Oy (Lempäälä) | tiilikaton pinnoitus Tampere 10, talon maalaus hinta 3, hintalaskuri | täysi hintataulukko, kohdekartta, paikallinen myyjä, tietopankki | 1 848 kuntasivua ohuella sisällöllä, takuu 5 vs 3+2 eri sivuilla |
| Sorcolor (Pirkanmaa-sivu) | 31 top-10-osumaa, talon maalaus Tampere 5 | 6 000+ arvostelua, hintataulukot, 152 artikkelia | maakunta- ja kuntasivut ilman hintaa ja UKK:ta |
| Häijään Maalaus (Sastamala) | tiilikaton pinnoitus Tampere 1, talon maalaus Tampere 2 | perheyritys, 4 esimerkkihintaa, 10-vaiheinen polku, 3 kuvaparia | ei H2-rakennetta, kestoväite ristiriitainen, 2 v takuu |
| Hohde Maalaus (Nokia) | talon maalaus Nokia 9, ulkomaalaus hinta 2026 | aidosti paikallinen Nokia-sivu (kaupunginosat, Pyhäjärvi), 40 % / 2 100 € oikein | vain yleishaarukka |
| Priimapinta (Nokia) | talon maalaus Nokia 7, vertailuartikkeli | 21 kysymyksen UKK, liukukuvat, videot | ei hintoja, paikallisuus vain otsikoissa |
| Maalausmestari (Nokia-toimipiste) | talon maalaus 4, tiilikaton pinnoitus Tampere 3 | "virallinen Ormax-pinnoittaja", 8 kysymyksen UKK, 3 v takuu | sivut 375–550 sanaa, mallipohjan englanninkieliset jäänteet |
| Varion (Tampere) | talon maalaus Tampere (Facebook), kattosivu | liidiportillinen laskuri kuten Pintasella, 6 vaihetta | ei hintoja, otsikot ristiriidassa sisällön kanssa |
| Tuplapensselit (Ylöjärvi) | talon maalaus Nokia 8 | "jopa 5 v takuu" maalaukselle, 5/5 Google, nimetyt tekijät, 80 artikkelia | ei hintoja, mallipohjan jäänteitä |
| ML-Kattopalvelu (Kangasala) | katon pinnoitus Tampere 6 | neliöhinta H2:ssa, ennen/jälkeen paikkakunnittain | ei UKK:ta |
| Kattotekniikka (Tampere) | kokemuksia-haku, kylläste vs maali | hintataulukko 200 / 1 000 m², noin 20 kuvaparia | otsikkohierarkia alkaa H3:sta |
| Aallon Maalarit (Tampere) | 10 top-10-osumaa (pesu, pinnoitus, pelti) | NowoClean ja NowoCoat nimettyinä, 8 vaihetta | hinnat vain kuvana, päivitetty 2022, ei H1:tä |
| Pirkanmaan Painepesu | tiilikaton pinnoitus Kangasala 2 | ainoa aidosti paikallinen Lempäälä-sivu, 7 v / 5 v takuu | |
| Paletec, Pirkanmaan Kattohuolto, Takuusaneeraus, Varixi, Tela ja Pensseli, Pitävä, Valttikate, Pensseliveljet | paikalliset haut sijoilla 3–10 | paikallisuus, Google-arvosana | ei hintoja, ohuet sivut, takuu puuttuu tai ristiriitainen |

Pensseliveljet on prosessiltaan lähin vastine Pintaselle (Nowocoat, kaksi kerrosta ruiskulla, reunat pensselillä, 5 vuoden takuu, kirjallinen raportti). Maalausliike Köykän 16.10.2026 artikkeli on rakenteeltaan lähes sama kuin Pintasen artikkelimalli (kysymys-H2:t, hintataulukko, UKK lopussa): malli toimii, ja sitä kopioidaan jo.

### 8.4 Kilpailevat väitteet, joihin sivuston pitää vastata

- **"Puhdistus riittää, pinnoitus on turhaa"** (kourulle.com, sija 2 haussa "kattoremontti vai pinnoitus": pinnoitus 6 000–8 000 € vastaan puhdistus 2 000–3 000 €, "ei pidennä elinkaarta"). Pintasen vastaus on jo olemassa: "Pesu ei riitä, jos tiilen pinta on kulunut" ja "Pakkasrapautuminen rikkoo kuluneen tiilen". Se kannattaa nostaa UKK-kysymykseksi "Riittääkö pelkkä pesu?" hubiin ja hintasivulle.
- **"Maalaus kestää 2–5 vuotta, pinnoitus on eri asia"** (Kattokumppanit). Pintasen "pinnoitus ja maalaus ovat sama työ" -kappale vastaa tähän; lisäksi UKK "Mitä eroa on tiilikaton maalauksella ja pinnoituksella?" sanalla "sama".
- **"Pinnoitus 1 000–3 000 €"** (Etewä, sija 1 haussa "kattoremontti vai pinnoitus"). Vastaus on hintakortin "Mitä hintaan kuuluu" -lista: pesu, tiilien vaihto, kasvustontorjunta, kaksi kerrosta, siivous, takuu.
- **Ovimyyjien lupaukset** (reddit: 70 vuotta). Pintasen "jopa 15 vuotta" ja "yrittäjä tekee työn itse" ovat vastaus. Kokemuksia-sivulle sopii lause siitä, että hinta ja lupaukset annetaan kirjallisesti kuntotarkastuksen jälkeen.

## 9. Omien sivujen aukot sivu kerrallaan

Sanamäärät ovat buildin HTML:stä (sisältävät valikot ja alatunnisteen).

### 9.1 Sivuroolit: tärkein korjaus

Kolme vanhaa `maalauspalvelut-<kunta>`-sivua (816–890 sanaa) näkyy hauissa, joihin uudet `tiilikaton-pinnoitus-<kunta>`- ja `talon-maalaus-<kunta>`-sivut (1 700–2 300 sanaa) on tehty. Syy on todennäköisesti linkitys: `maalauspalvelut`-sivuihin osoittaa valikko, alatunniste ja toiminta-alueet-sivu, uusiin palvelusivuihin vain hub ja `maalauspalvelut`-sivu itse. Auditoinnin osa 4 ehdotti saman (luku 4.3). Toimenpiteet (tekninen, ei sisältöä):

1. Valikon ja alatunnisteen kuntalinkit osoittamaan palvelukohtaisiin kaupunkisivuihin (pinnoitus ja maalaus erikseen), `maalauspalvelut`-sivuun vain "Maalausliike <kunta>" -ankkurilla.
2. `maalauspalvelut-<kunta>`-sivun H1 ja title muotoon "Maalausliike ja kattopalvelut <kunta>" (on jo), ja sivun alkuun kaksi selvää korttia "Tiilikaton pinnoitus <kunta>" ja "Talon maalaus <kunta>" (ovat jo H3:na). Lisäksi sivun UKK:sta pois hintakysymys, joka kilpailee palvelusivujen kanssa.
3. Etusivulta linkit "Tiilikaton pinnoitus Tampere" ja "Talon maalaus Tampere" täsmäankkureilla (etusivu näkyy nyt sijoilla 10 ja 15 Tampereen maalaushauissa).
4. Vaihtoehto, jos tämä ei auta kuukaudessa: `maalauspalvelut-<kunta>` 301-ohjaus pinnoituksen kaupunkisivulle. Se menettää nykyiset sijat (27 % näytöistä), joten se on Eerikin päätös (kysymys 1).

### 9.2 Tiilikaton pinnoitus

| Sivu | Sanat | Näkyy | Puuttuu voittajiin verrattuna |
|---|---|---|---|
| `/tiilikaton-pinnoitus-pirkanmaa/` | 2 291 | ei 20 parhaassa ("tiilikaton pinnoitus pirkanmaa" näyttää maalauspalvelut-Tampere 12) | toteutuneet kohteet hintoineen; UKK "Riittääkö pelkkä pesu?", "Millä maalilla?", "Entä jos sataa?"; sana "tiilikaton pesu ja pinnoitus" H2-tasolle; "Päivitetty"-päivä |
| `/tiilikaton-pinnoitus-hinta-pirkanmaa/` | 1 368 | ei 20 parhaassa (Search Console 2–3, epävarma) | H2 "Tiilikaton pesu ja pinnoitus hinta" (260 hakua/kk); kolme esimerkkikattoa koon mukaan laskurista (loiva 150 m², 200 m², jyrkkä 250 m²); toteutuneet kohteet; "Mitä hintaan kuuluu" ylemmäs |
| `/tiilikaton-pinnoitus-tampere/` ja 23 muuta | 1 824–1 940 | ei 20 parhaassa Tampere-haussa | ei sisältöpuutetta: pidempi ja paikallisempi kuin yksikään kilpailijan kuntasivu; ongelma on 9.1 |
| `/kokemuksia/` | 895 | ei 20 parhaassa ("tiilikaton pinnoitus kokemuksia" 50/kk) | kohdetarinat (kunta, katon koko, mitä tehtiin, arvostelu sanasta sanaan, kuva); H2 "Tiilikaton pinnoitus kokemuksia Pirkanmaalta" |
| `/referenssit/` | 172 | – | kohteiden kunta ja vuosi kuvatekstiin; linkitys kaupunkisivuilta oman kunnan kuviin |
| Artikkeli "Milloin tiilikatto pitää pinnoittaa" | 653 | sija 2 ("kannattaako tiilikatto pinnoittaa") | toimii; lisää "Kuinka usein tiilikatto pitää pinnoittaa" on jo H3:na |
| Artikkeli "Tiilikattoremontti vai pinnoitus" | 847 | ei vielä (julkaistu 13.10.) | H2 "Paljonko kattoremontti maksaa 2027?" sanamuodolla "kattoremontti hinta"; kaupunkisivuille H2 "Pinnoitus kattoremontin sijaan <kunnassa>" (23 "tiilikattoremontti <kunta>" -hakua Search Consolessa) |
| Puuttuva | – | – | sammal (luku 10, brief 2); kestävyys (brief 7); sää ja sade pinnoituksessa (UKK) |

### 9.3 Talon maalaus

| Sivu | Sanat | Näkyy | Puuttuu voittajiin verrattuna |
|---|---|---|---|
| `/talon-maalaus-pirkanmaa/` | 1 766 | ei 20 parhaassa (Search Console 18) | talotyypit omina H2:ina: rintamamiestalo, hirsitalo, kivitalon puuosat, mökki ja piharakennus (Väriset, Lummeco, Loistepinta voittavat näillä); "vanhan talon maalaus"; UKK "Maalaatteko ruiskulla?" (vastaus: pensselillä), "Entä jos sataa?" |
| `/talon-maalaus-hinta-pirkanmaa/` | 1 184 | ei 20 parhaassa | kolme esimerkkitaloa koon ja kerrosluvun mukaan laskurista; toteutuneet kohteet; vuosiluku on jo |
| `/talon-maalaus-tampere/` ja 23 muuta | 1 740 | ei (etusivu 15, "talon maalaus kangasala" näyttää maalauspalvelut-Pirkkala 5) | ei sisältöpuutetta; ongelma on 9.1 |
| `/hintalaskuri/` | 194 | ei ("talon maalaus hintalaskuri" 210 + "hinta laskuri" 210 hakua/kk; Sorcolor ja Väriset voittavat) | sivulla ei ole tekstiä: H2 "Talon maalauksen hintalaskuri" ja "Tiilikaton pinnoituksen hintalaskuri", mitä laskuri kysyy ja miksi, esimerkkihaarukat koon mukaan, vähennysrivi; liidiportti pysyy (Eerik) |
| Artikkeli "Kuinka usein puutalo pitää maalata" | 899 | ei 20 parhaassa ("kuinka usein talo maalataan") | H2 täsmälleen "Kuinka usein talo maalataan?" ja lyhyt vastaus 10–15 vuotta heti alle; hirsi ja rintamamiestalo omina kappaleina |
| `/kotitalousvahennys/` | 517 | – | "kotitalousvähennys laskuri" (1 600/kk) H2 ja laskuri sivulle; luvut ovat oikein ja lähteistetty, mikä on etu |
| Puuttuva | – | – | sää ja lämpötila (brief 8); rintamamiestalon maalaus (brief 6) |

### 9.4 Yhteiset

- **"Päivitetty"-päivä** näkyviin palvelu- ja hintasivujen alkuun (`SITE_UPDATED` on vain alatunnisteessa).
- **UKK:n puuttuvat aiheet** joka palvelusivulle: sää (sade, lämpötila), tuote (Nowocoat, Tikkurila), "pitääkö olla kotona" (maalauksessa on jo), maksuehdot (10 % ennakko, loput valmistuttua; Eerik 26.10.).
- **Rinnakkaismuodot** H2-tasolla: "katon pinnoitus" ja "kattopinnoitus" pinnoitussivuille, "ulkomaalaus" ja "julkisivumaalaus" ovat jo maalaussivuilla. Search Console näytti, että "katonpuhdistus tampere" ja "katon puhdistus tampere" sijoittuvat eri tavalla.
- **Kysymysmuotoiset H2:t artikkeleissa** toimivat (sija 2). Palvelusivuilla osa H2:ista on väitteitä ("Tiilikaton maalaus ja pinnoitus tarkoittavat samaa työtä"); kysymysmuoto ("Onko tiilikaton maalaus sama asia kuin pinnoitus?") sopii tekoälyvastauksiin paremmin. Tämä on pieni muutos vanhaan tekstiin: ei tehdä ilman Eerikin lupaa.

## 10. Sisältöbriefit

Järjestys on vaikutuksen mukaan. Jokainen brief noudattaa CLAUDE.md:n sääntöjä: ei keksittyä tietoa yrityksestä, yleiset faktat vain tarkistetuista lähteistä, hinnat vain `prices.ts`:n haarukoina ja laskurista johdettuina kokoluokkina, ei neliöhintoja, ei "emme tee" -lauseita, ei huutomerkkejä. Vanhoihin teksteihin ei tehdä isoja muutoksia ilman lupaa: briefit 3–5 lisäävät osioita, eivät muuta nykyisiä lauseita.

### Brief 1: sivuroolit ja sisäinen linkitys (tekninen, ensin)

Luku 9.1 kohdat 1–3. Muutos koskee `Header`, `Footer`, `toiminta-alueet` ja `maalauspalvelut-<kunta>`-sivun UKK:ta. Mittari: neljän viikon kuluttua Search Consolessa "tiilikaton pinnoitus <kunta>" -hauissa näkyvä sivu on pinnoituksen kaupunkisivu. Kysymys 1 Eerikille ennen toteutusta.

### Brief 2: artikkeli "Sammal tiilikatolla: mitä se kertoo ja milloin katto kannattaa pinnoittaa"

- Haut: sammaleen poisto katolta 1 600/kk, sammaleen poisto tiilikatolta, "Mitä maksaa tiilikaton sammaleen poisto?" (PAA), "Saako sammalta olla tiilikatolla?" (mainiomaalaus voittaa tällä). Voittajat ovat ohjeartikkeleita 850–1 300 sanaa ilman UKK:ta.
- Kulma: sammal on merkki, ei itse ongelma. Pintanen ei enää myy puhdistusta erikseen, joten artikkeli ei saa olla puhdistusohje eikä mainostaa puhdistuspalvelua. Se vastaa: miksi sammal kasvaa (varjo, pohjoislape, huokoinen tiili), mitä se tekee tiilelle (pitää kosteutta, pakkasrapautuminen), milloin pesu pinnoituksen osana riittää ja milloin tiili on jo vaihdettava, mitä pesu ja kasvustontorjunta tarkoittavat Pintasen työssä (painepesu, kasvustontorjunta-aine, kaksi kerrosta Nowocoatia).
- H2-runko: Miksi tiilikatolle kasvaa sammalta? | Onko sammal tiilikatolle vaarallista? | Riittääkö sammaleen poisto, vai pitääkö katto pinnoittaa? | Miten sammal poistetaan pinnoituksen yhteydessä? | Paljonko tiilikaton pesu ja pinnoitus maksaa? (haarukka 2 850–7 000 €, kokoluokat) | Voiko sammaleen poistaa itse? (turvallisuus, ei painepesuria omin päin, ei ohjetta) | UKK.
- Faktat: Pintasen työvaiheet (`faqData.ts`, hub), hinnat (`prices.ts`). Yleiset faktat sammaleesta ja pakkasrapautumisesta tarkistetaan (esimerkiksi BMI Ormaxin tai Kerabitin hoito-ohje) ja kirjataan `docs/`-kansioon. Linkit: hub, hintasivu, artikkeli "Milloin tiilikatto pitää pinnoittaa".
- Kysymys 3 Eerikille: saako sammal-aiheesta kirjoittaa, vaikka puhdistus on loppunut.

### Brief 3: hintasivujen esimerkkikohteet koon mukaan (pinnoitus ja maalaus)

- Haut: tiilikaton pinnoitus hinta 480, tiilikaton pesu ja pinnoitus hinta 260, talon maalaus hinta 880, omakotitalon maalaus hinta, talon maalaus neliöhinta. Voittajilla taulukko tai 3–6 esimerkkiä.
- Lisäys `/tiilikaton-pinnoitus-hinta-pirkanmaa/`: H2 "Tiilikaton pesu ja pinnoitus hinta: kolme esimerkkiä" ja taulukko kolmesta katosta (loiva 150 m², tavallinen 200 m², jyrkkä 250 m²) hintalaskurin logiikalla laskettuna, sama "Hintaan kuuluu" -lista taulukon alla, ja vähennysrivi samalla kaavalla kuin laskurissa (PR #129). Ei €/m²-lukua, ei minimihintaa.
- Lisäys `/talon-maalaus-hinta-pirkanmaa/`: sama kolmella talolla (1-kerroksinen 100 m², 1,5-kerroksinen 120 m², 2-kerroksinen 150 m²), laskurista.
- Toteutuneet kohteet (Sorcolor-malli) vasta, kun Eerik antaa 5–10 kohdetta hintoineen ja luvan (kysymys 2).

### Brief 4: talon maalauksen hub: talotyypit

- Haut: rintamamiestalon maalaus, hirsitalon maalaus, puutalon maalaus (Sorcolor, Tikkurila, Värisuora, Virtasen voittavat), vanhan talon maalaus 90, mökin ulkomaalaus 30. Väriset ja Lummeco voittavat "talon maalaus" talotyyppiosioilla.
- Lisäys `/talon-maalaus-pirkanmaa/`: H2 "Millaisia taloja maalaamme?" ja H3:t Puutalo ja rintamamiestalo | Hirsitalo | Kivitalon puuosat (räystäät, ikkunat, kuistit) | Mökki ja piharakennukset. Jokaiseen 3–5 virkettä: mikä talotyypissä on erityistä (rintamamiestalon 1,5 kerrosta ja telineet, hirren halkeamat ja hengittävä maali, kivitalon puuosien pieni määrä mutta tarkka työ), aina Pintasen työtapa (homepesu harjoilla, kaavinta, pohjamaali paljaisiin kohtiin, pintamaali pensselillä, Tikkurila). Hinta vain haarukkana ja linkkinä hintasivulle.
- Faktat: `faqData.ts`, CLAUDE.md:n maalausosio (hirsitalot maalataan, lautoja ei vaihdeta: siitä ei sanota mitään). Maalityyppien yleisfaktat Tikkurilan tai Teknoksen ohjeista, lähteet `docs/`-kansioon. Kysymys 5 Eerikille ja Eemilille.

### Brief 5: hintalaskurisivun teksti

- Haut: talon maalaus hintalaskuri 210, talon maalaus hinta laskuri 210, katto hintalaskuri (Search Console sija 7,5), kattoremontti hintalaskuri 1 600 (ei Pintaselle, mutta "katon pinnoituksen hintalaskuri" sopii).
- Lisäys `/hintalaskuri/`: H1 "Hintalaskuri: tiilikaton pinnoitus ja talon maalaus", lyhyt johdanto, H2 "Tiilikaton pinnoituksen hintalaskuri" (mitä kysytään: katon pinta-ala, jyrkkyys, rikkinäiset tiilet; miksi), H2 "Talon maalauksen hintalaskuri" (pohjapinta-ala, kerrokset, kunto), H2 "Miten laskurin hinta suhtautuu tarjoukseen?" (haarukka laskurista, kiinteä hinta kuntotarkastuksen tai arviokäynnin jälkeen), H2 "Kotitalousvähennys laskurin tuloksessa" (PR #129:n kaava). UKK 4 kysymystä. Liidiportti pysyy; teksti on laskurin ympärillä, ei sen tilalla. Kysymys 6.

### Brief 6: artikkeli "Rintamamiestalon maalaus: hinta ja työvaiheet 2027"

- Haut: rintamamiestalon maalaus (Väriset 1, Pensseliveljet, Loistepinta, Pohjolan Maalipojat), rintamamiestalon maalauksen hinta. Kaikilla voittajilla on hinta-artikkeli juuri tästä talotyypistä. Pirkanmaalla rintamamiestaloalueita on paljon (Tampere, Nokia, Valkeakoski), ja Tilastokeskuksen talokanta 1940–1959 on jo kaupunkisivuilla.
- H2-runko: Mikä rintamamiestalossa on maalauksessa erityistä? | Kuinka usein rintamamiestalo pitää maalata? | Paljonko rintamamiestalon maalaus maksaa? (haarukka, kokoluokka laskurista) | Näin työ etenee | Mitä maalia rintamamiestaloon? (Tikkurila, yleisfakta lähteestä) | UKK.
- Ei väitteitä lautojen vaihdosta tai lahosta.

### Brief 7: artikkeli "Kuinka kauan tiilikaton pinnoite kestää?"

- Haut: tiilikaton pinnoitus kestävyys, "Kauanko katon pinnoitus kestää?" (PAA), tiilikaton pinnoitus kokemuksia (osin). Voittajat lupaavat 15–25 vuotta.
- Kulma: rehellinen luku. Jopa 15 vuotta, mikä siihen vaikuttaa (lapeen suunta, puusto, pesun laatu, kaksi kerrosta, tiilen kunto), miksi jotkut lupaavat enemmän ja mitä takuu kattaa (5 vuotta kirjallisesti). H2:t kysymyksinä. Yleisfaktat vain valmistajan tiedoista; jos Nowocoatin teknistä tietoa ei saada lähteeksi, kesto sanotaan Pintasen kokemuksena ja takuuna, ei materiaalin ominaisuutena. Kysymys 4.

### Brief 8: artikkeli "Milloin talon voi maalata: lämpötila, sade ja kosteus"

- Haut: ulkomaalaus lämpötila 210, ulkomaalaus syksyllä, talon maalaus syksyllä 40, ulkomaalaus sää, PAA "Entä jos sataa?". Voittajat ovat valmistajien ohjeita.
- Sisältö: kausi huhti–toukokuusta elo–syyskuuhun (UKK), sateen jäljet korjataan ilman lisähintaa (UKK), maalin lämpötila- ja kosteusrajat valmistajan ohjeesta (Tikkurila tai Teknos; luennassa Teknos ilmoitti vähintään +10 °C ja alle 80 % kosteuden, tarkistettava ennen kirjoittamista), miksi kesäkuun ja syyskuun työt eroavat. Lähteet `docs/`-kansioon.

### Brief 9: kokemuksia-sivun kohdetarinat

Kilpailija-analyysin idea 2. Tarvitaan Eerikiltä kohdetiedot arvosteluihin (kunta, mitä tehtiin, vuosi). Ilman niitä sivulle lisätään vain H2 "Tiilikaton pinnoitus kokemuksia Pirkanmaalta" ja "Talon maalaus kokemuksia Pirkanmaalta" sekä lause kirjallisesta tarjouksesta (luku 8.4).

### Brief 10: UKK-täydennykset palvelusivuille (pieni)

Jokaiselle palvelu- ja hintasivulle 2–3 uutta kysymystä `faqData.ts`:ään ilman vanhojen muuttamista: "Riittääkö pelkkä pesu?", "Millä maalilla pinnoitatte?" (Nowocoat), "Entä jos sataa kesken työn?", "Miten maksu tapahtuu?" (10 % ennakko). Maalaukseen: "Maalaatteko ruiskulla vai pensselillä?", "Millä maalilla maalaatte?" (Tikkurila). Vastaukset Eerikin jo antamista faktoista; ei uusia väitteitä.

### Ei tehdä

- Peltikaton maalaus (1 000/kk): vain UKK-vastaus "Pinnoitamme tiilikattoja, peltikaton maalausta voit kysyä erikseen" (Eerik 26.10.).
- Katon puhdistus -sisällöt: palvelu loppunut.
- Terassit, sokkelit, sisämaalaus, rahoitus, verkkokauppa, neliöhinnat, laskuesimerkit (CLAUDE.md).
- Kuntasivujen monistaminen muihin maakuntiin: ohut sisältö on kilpailijoiden heikkous, ei vahvuus.

## 11. Kysymykset Eerikille

1. **Sivuroolit (brief 1).** Teenkö valikon, alatunnisteen ja toiminta-alueiden linkit osoittamaan pinnoituksen ja maalauksen kaupunkisivuihin, ja `maalauspalvelut-<kunta>` jää "Maalausliike <kunta>" -sivuksi? Vaihtoehto on 301-ohjaus pinnoitussivulle, joka menettää nykyiset sijat. Suositus: linkitys ensin, 301 vasta jos ei auta.
2. **Toteutuneet kohteet hintoineen.** Sama kysymys kuin kilpailija-analyysissä: 5–10 kohdetta (kunta, koko, hinta, vuosi, lupa). Ilman niitä brief 3 tehdään laskurista johdetuilla esimerkeillä.
3. **Sammal-artikkeli (brief 2).** Saako sammaleesta kirjoittaa, kun kulma on pinnoitus eikä puhdistus?
4. **Kestävyys (brief 7).** Onko Nowocoatilta teknistä tietoa tai takuuehtoja, joihin voi viitata? Jos ei, artikkeli perustuu Pintasen kokemukseen ja 5 vuoden takuuseen.
5. **Talotyypit (brief 4 ja 6).** Mitä Eemil haluaa sanoa rintamamiestalosta, hirsitalosta ja kivitalon puuosista? Riittää 3–5 lausetta kustakin puhelimessa tai viestinä.
6. **Hintalaskurisivu (brief 5).** Saako sivulle kirjoittaa esimerkkihaarukat koon mukaan laskurista, kun liidiportti pysyy?
7. **Linkit (luku 7).** Mitkä hakemistot ja jäsenyydet otetaan: pintaurakoitsijat.fi, kauppakamari, Suomalaista palvelua -merkki maksavat; omaurakka, remppakamu, urakkamaailma, kodinplaza, trustmary, kokemuksia.fi ovat ilmaisia profiileja. Tiedotteet sttinfo.fi:n kautta maksavat.
8. **Työkalukreditit.** OpenRushin kreditit loppuivat yhdeksän haun jälkeen. OpenSEO:sta kului noin 255 krediittiä 500:sta. Jatkossa 60 haun seurantakierros maksaa noin 300 OpenSEO-krediittiä. Tehdäänkö seuranta kuukausittain?
9. **katonpuhdistus.fi** (13 top-10-osumaa) ei avautunut työkaluille. Katsotko sen itse selaimella, vai jätetäänkö?

