# Auditoinnin toteutus, lokakuu 2026

Tämä muistio kertoo, mitä raportin `auditointi-2026-10.md` ehdotuksista on toteutettu haarassa `claude/auditoinnin-toteutus` ja mitkä asiat Eerikin pitää vielä vahvistaa.

## Toteutettu

- **Hero kaikille alasivuille etusivun mallilla** (`src/components/PageHero.tsx`): valkoinen kortti, H1 vasemmalla, keltainen pääpainike, luottamusrivi, kuva oikealla, näkyvä murupolku ja "Päivitetty"-rivi. Ei sisääntuloanimaatiota: teksti näkyy ilman JavaScriptiä. Kaupunkisivuilla kuvana paikkakunnan oma kohde, jos sellainen on (`projects.ts`).
- **"Lyhyesti"-laatikko** palvelu- ja kaupunkisivuilla (`Lyhyesti.tsx`, tekstit `src/data/tyovaiheet.ts`).
- **Työvaiheet avoimena listana** haitarin sijaan (`ProcessList.tsx`). Katto: pesu painepesulla, rikkinäiset tiilet uusiin, maalaus ruiskulla kahteen kertaan (pohjamaali + pintamaali), ahtaat paikat telalla tai käsin. Talo: homepesu, kaavinta, pohjamaali paljaisiin kohtiin, pintamaali pensselillä, lautoja ei vaihdeta.
- **FAQ natiivilla `<details>`-elementillä**: vastaukset ovat HTML:ssä, ensimmäinen auki. Uudet kysymykset: tiilikaton maalaus = pinnoitus, kattoremontti vai pinnoitus.
- **Yksi totuus luvuille** (Eerikin päätökset 5.10.2026): katon lisäikä jopa 15–20 vuotta, pinnoitus 2 850–7 000 €, maalaus 3 500–11 000 €, "yli 200 kohdetta / yli 130 kattoa / yli 80 taloa / yli 5 vuotta" (`src/data/company.ts`). Poistettu "10–20 % uuden katon hinnasta", "säästää jopa 15 000 €", "jopa 80 %", "alkaen 2 050 €", "15 €/m²". Hintakortteihin ei koskettu. Ei "emme tee" -lauseita (kattoremontit, sisämaalaus, peltikatot, laudat): asia jätetään mainitsematta.
- **Kotitalousvähennys yhdellä lauseella**, esimerkkilaskelma poistettu.
- **Kaupunkisivut**: yrittäjäteksti käyttää paikkakuntaa (ei enää "Tampereella" joka sivulla), alt-tekstit ilman väärää paikkakuntaa, karusellin kopiot vain selaimessa, Toiminta-alueet-palkki vain etusivulla, toiminta-alueet-sivulla ja aluesivuilla, rahoitus yhdeksi lauseeksi hintaosioon, "Onko kattosi vaarassa" -osio pois. Pinnoituksen Tampere-sivu lyheni 13 700 px → 10 500 px tietokoneella.
- **Aluesivut**: title "Maalaus- ja kattopalvelut X | Pintanen", palvelukortit heti heron alle, 24 paikallistekstiä kirjoitettu uudelleen arkikielellä (`areaCityContent.ts`).
- **Vanhojen 8 kaupungin ja Kangasalan/Pirkkalan maalaussivujen hook-tekstit** (`src/data/vanhatKaupunkisivut.ts`).
- **Titlet ja kuvaukset yhdestä mallista** (`seo.ts`): maalaus "Talon maalaus X – ulkomaalaus ja julkisivumaalaus", pinnoitus "Tiilikaton pinnoitus X | Hinta 2 850–7 000 €", kuvaukset enintään 170 merkkiä.
- **Tekniikka**: kaikki sisäiset linkit kauttaviivalla + testi, `lastmod` kaikille sivuille, 3-tasoinen BreadcrumbList, AggregateOffer pinnoitus- ja maalaussivuille, `areaServed` kaikista 24 kunnasta (generoidaan buildissa), `Referrer-Policy`, keywords-meta pois, vaakamuotoinen og-kuva, kuvan `tiilikaton-tehopesu-…` uudelleennimetty, fontit 8 → 4 tiedostoa, llms.txt uusiksi (työvaiheet, kunnat palvelusivuineen), maalauksen kaupunkisivun lomake sama kuin muualla (tietosuojalause + honeypot).
- **Etusivu**: yksi arvosteluosio, "Miksi Pintanen?" puoleen, SEO-teksti kolmeen kappaleeseen, hero "Pirkanmaalla ja lähikunnissa noin tunnin säteellä Tampereelta".
- **Puhelin**: alapalkki ja chat pois tarjouspyyntö- ja hintalaskurisivuilta, sivun loppuun tilaa alapalkille, evästebanneri matalampi.
- **Meistä**: yksi totuus (juuret Oulussa, työt Pirkanmaalla ja Kanta-Hämeessä, vain ulkotyöt), faktalaatikko, tekstit lyhennetty.
- **Artikkelit**: "maalaamme telalla" → ruisku kahteen kertaan + tela/käsin ahtaisiin paikkoihin; prosentti- ja alkaen-lauseet pois.
- **Testit**: kauttaviivat, llms.txt:n säännöt, lastmod, areaServed, kielletyt sanat ja "emme tee" -lauseet (`src/test/seo.test.ts`, `routes.test.ts`). `verify_dist.py` 0 ongelmaa, läpinäkyvän tekstin mediaani 32 % → 0 %.

## Eerikin päätökset 5.10.2026 (ainoa totuus)

- Luvut: yli 200 kohdetta, yli 130 pinnoitettua kattoa, yli 80 maalattua taloa. Katon lisäikä aina "jopa 15–20 vuotta".
- Ei koskaan "emme tee" -lauseita (kattoremontit, sisämaalaus, peltikatot, laudat, lahovauriot): asia jätetään mainitsematta.
- Seinäpuolella huolellista suojausta (terassit, ikkunat) saa mainostaa. Katolla ei väitetä seinien tai pihan suojausta.
- "Olemme kotoisin Oulusta", "Pirkanmaa ja Kanta-Häme", "noin tunnin säteellä Tampereelta" ja "Vastaamme viimeistään seuraavana arkipäivänä" ovat ok.
- Pinnoitus 2 850–7 000 €, hintakortteihin ei kosketa, ei "alkaen"-lauseita, neliöhintoja eikä laskuesimerkkejä.
- Kotitalousvähennys 2026–2027 (40 %, 2 100 €, omavastuu 150 €) sanotaan varmana; tarkista vero.fi:stä, että laki on vahvistettu.
- Puhdistussivut jätettiin ennalleen (palvelu poistuu).

## Julkaisu

Ensimmäinen versio (commit 1f4460f) pushattiin suoraan mainiin ja revertoitiin (PR #79). Tämä versio julkaistaan vain PR:n kautta, ja Cloudflare Pagesin haaraesikatselu tarkistetaan ennen mergeä: hintalaskuri, tarjouspyyntölomake, chat, ennen–jälkeen-liukurit, headerin valikot ja galleria.

## Ei toteutettu

- Content-Security-Policy-otsake (vaatii GA:n ja Resendin osoitteiden listauksen).
- Uusi 1200×630 px jakokuva: käytössä oma vaakakuva 1500×1125 px, koska kuvankäsittelytyökalua ei ollut. Oma jakokuva logolla kannattaa tehdä erikseen.
- Fontit pudotettiin neljään tiedostoon (ei kolmeen): Open Sans 600 pidettiin, koska synteettinen lihavointi näyttää huonolta painikkeissa.
