# Lähteet: kotitalousvähennys 2026 ja 2027 (tarkistettu 26.10.2026)

Sivun `/kotitalousvahennys/` ja artikkeleiden luvut on tarkistettu Verohallinnon sivuilta 26.10.2026.

- Verohallinto, Kotitalousvähennyksen määrä: https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara
  - "Saat vähentää 40 % työn osuudesta." (yritykseltä ostettu työ, arvonlisäverollisesta hinnasta)
  - "Kotitalousvähennyksen määrä on enintään 2 100 euroa henkilöltä vuodessa."
  - "Kotitalousvähennyksen omavastuu on 150 euroa henkilöltä vuodessa."
  - "Vähennyksen määrä ja omavastuu ovat samat vuosina 2026 ja 2027."
  - "Kotitalousvähennyksen enimmäismäärä ja vähennysprosentit nousivat vuosiksi 2026 ja 2027." Muutos on voimassa, ei enää esitys; se koskee takautuvasti kaikkia vuonna 2026 maksettuja töitä.
- Verohallinto, Mistä töistä vähennyksen saa: https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/mista-toista-vahennyksen-saa/
  - Omakotitalon ulkokunnostus maalaamalla ja katon kunnostus ovat kunnossapitotyötä, josta vähennyksen saa.
  - Samat säännöt koskevat omassa käytössä olevaa vapaa-ajan asuntoa.
  - Vähennyksen saa vain työn osuudesta, ei tarvikkeista.

## Tarkistus 26.10.2026 (toinen kerta, hintakortit ja laskurit)

Tarkistettu uudelleen 26.10.2026 iltapäivällä hintakorttien afterFrom-lukuja ja hintalaskurin vähennysriviä varten.

- Verohallinto, Kotitalousvähennyksen määrä (sivu päivitetty 13.10.2026): https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara
  - "Saat vähentää 40 % työn osuudesta."
  - "Kotitalousvähennyksen määrä on enintään 2 100 euroa henkilöltä vuodessa."
  - "Kotitalousvähennyksen omavastuu on 150 euroa henkilöltä vuodessa."
  - "Vähennyksen määrä ja omavastuu ovat samat vuosina 2026 ja 2027."
- Verohallinnon tiedote 13.10.2026, "Kotitalousvähennys nousee takautuvasti – näin saat korotetun vähennyksen käyttöösi": https://vero.fi/tietoa-verohallinnosta/uutishuone/lehdistötiedotteet/2026/kotitalousvahennys-nousee-takautuvasti--nain-saat-korotetun-vahennyksen-kayttoosi/
  - "Kotitalousvähennyksen enimmäismäärä nousee 1 600 eurosta 2 100 euroon."
  - "vähennystä saa 40 prosenttia työn osuudesta aiemman 35 prosentin sijaan."
  - "Kotitalousvähennyksen omavastuu on 150 euroa eikä siihen tule muutoksia."
  - Korotukset "ovat voimassa vuosina 2026−2027" ja koskevat 1.1.2026 alkaen maksettuja kustannuksia.

Johtopäätös: prosentti on 40, enimmäismäärä 2 100 € henkilöltä vuodessa ja omavastuu 150 € henkilöltä vuodessa, samat vuosina 2026 ja 2027. Sivuston lause `KOTITALOUSVAHENNYS` (company.ts), sivu `/kotitalousvahennys/` ja artikkelit sanovat samat luvut.

Laskentatapa sivustolla (Eerik 26.10.2026): hintakorttien "alk."-hinta ja laskurien rivi "Kotitalousvähennyksen jälkeen" lasketaan ilman omavastuuta, koska omavastuu on henkilökohtainen ja vähennetään kerran vuodessa, ei joka työstä. Kaava: työn osuus 80 % hinnasta, vähennys 40 % työn osuudesta, enintään 2 100 € (yksi maksaja). Omavastuu kerrotaan rivin alla: "Omavastuu 150 € vuodessa, jos et ole käyttänyt sitä muihin töihin."

## Tarkistus 26.10.2026 (kolmas kerta, omavastuun perustelu)

Verohallinto, Kotitalousvähennyksen määrä (sivu päivitetty 13.10.2026): https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara

- "Kotitalousvähennyksen omavastuu on 150 euroa henkilöltä vuodessa."
- "Omavastuu vähennetään vain kerran vuodessa."
- "Jos teetät saman vuoden aikana lisää vähennykseen oikeuttavaa työtä, omavastuuta ei vähennetä enää uudelleen."
- "Jos haette vähennyksen vain toisen puolison verotuksessa, omavastuu (150 euroa) maksetaan vain kerran."

Tämä on peruste sille, että laskurit ja hintasivujen esimerkki eivät vähennä omavastuuta, vaan kertovat sen rivin alla
(`VAHENNYS_OMAVASTUU_HUOMAUTUS`, `src/components/vahennys/vahennysData.ts`): omavastuu menee kerran vuodessa, ei joka työstä.
