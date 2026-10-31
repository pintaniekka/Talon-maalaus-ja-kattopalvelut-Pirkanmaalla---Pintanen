/**
 * Artikkelien metatiedot – yksi totuuden lähde listaukselle, reitityksellle,
 * sitemapille ja artikkelipohjalle. Tässä tiedostossa EI saa olla
 * komponentti-importteja: vite-plugin-spa-routes lukee sen build-aikana Nodessa.
 *
 * Uusi artikkeli:
 *  1. Lisää metatiedot tähän listaan (publishedAt voi olla tulevaisuudessa = jonossa).
 *  2. Luo sisältö: src/content/articles/<slug>.tsx (default export = leipäteksti).
 *  3. Rekisteröi sisältö: src/content/articles/index.ts.
 */

export type ArticleCategory = "katto" | "maalaus" | "raha";

export interface ArticleMeta {
  slug: string;
  /** H1 ja listauksen otsikko. */
  title: string;
  /** <title>-tagi, jos eri kuin title (ilman "| Pintanen"). */
  seoTitle?: string;
  /** Meta description, 140–160 merkkiä. */
  description: string;
  /** Ingressi: 1–3 virkettä, vastaa otsikon kysymykseen suoraan. */
  lead: string;
  category: ArticleCategory;
  /** Avain tiedostosta src/data/authors.ts. */
  author: "eerik" | "eemil";
  /** Julkaisupäivä YYYY-MM-DD (Suomen aikaa). Tulevaisuudessa = ajastettu. */
  publishedAt: string;
  /** Viimeisin sisältöpäivitys YYYY-MM-DD, jos tekstiä on muutettu julkaisun jälkeen. */
  updatedAt?: string;
  readingMinutes: number;
  /** Pääkuvan perusnimi kansiossa public/images (Pictures-400/600/800/1200). */
  heroImage: string;
  heroAlt: string;
  heroCaption?: string;
  /**
   * Listaussivun navy-kortti keltaisella tagilla (29.10.2026). Merkitään käsin, ei automaattisesti:
   * esirenderöity HTML ja selain näyttävät saman. Enintään noin kolmannes näkyvistä korteista.
   */
  tarkea?: boolean;
}

export const categoryLabels: Record<ArticleCategory, string> = {
  katto: "Katot",
  maalaus: "Ulkomaalaus ja julkisivut",
  raha: "Hinta ja verotus",
};

export const articles: ArticleMeta[] = [
  {
    slug: "milloin-pinnoittaa-tiilikatto",
    title: "Milloin tiilikatto pitää pinnoittaa? 5 merkkiä, että aika on nyt",
    seoTitle: "Milloin tiilikatto pitää pinnoittaa? 5 merkkiä",
    description:
      "Epäiletkö, onko kattosi pinnoituksen aika? Viisi selkeää merkkiä kertoo, milloin tiilikaton pinnoitus kannattaa tehdä ja milloin voi vielä odottaa.",
    lead: "Tiilikatto kannattaa pinnoittaa, kun väri on haalistunut, pinta tuntuu karhealta tai sammal palaa pian puhdistuksen jälkeen. Useimmiten näin käy, kun katto on noin 15 vuotta vanha.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-05-24",
    updatedAt: "2026-09-30",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-punainen-tiilikatto-kattopinnoitus-jalkeen",
    heroAlt: "Punainen tiilikatto pinnoituksen ja huollon jälkeen",
    heroCaption: "Pinnoitettu tiilikatto huollon jälkeen.",
  },
  {
    slug: "kotitalousvahennys-katto-ja-maalaustyot",
    title: "Kotitalousvähennys katto- ja maalaustöissä 2027: paljonko saat takaisin?",
    tarkea: true,
    seoTitle: "Kotitalousvähennys 2027 katto- ja maalaustöissä",
    description:
      "Kotitalousvähennys 2027: 40 % työn osuudesta, enintään 2 100 € henkilöltä. Lue, miten saat vähennyksen tiilikaton pinnoituksesta ja talon maalauksesta.",
    lead: "Kun ostat tiilikaton pinnoituksen tai talon maalauksen yritykseltä, saat vuosina 2026 ja 2027 vähentää verotuksessa 40 % työn osuudesta. Vähennystä saa enintään 2 100 euroa vuodessa.",
    category: "raha",
    author: "eerik",
    publishedAt: "2026-09-30",
    updatedAt: "2026-10-26",
    readingMinutes: 6,
    heroImage: "talon-maalaus-hameenlinna-keltainen-omakotitalo-jalkeen",
    heroAlt: "Keltainen omakotitalo julkisivumaalauksen jälkeen",
  },
  {
    slug: "kuinka-usein-puutalo-maalataan",
    title: "Kuinka usein puutalo pitää maalata? 5 merkkiä huoltomaalauksen tarpeesta",
    seoTitle: "Kuinka usein puutalo pitää maalata? 5 merkkiä",
    description:
      "Puutalo maalataan yleensä 10–15 vuoden välein. Viisi merkkiä kertoo, milloin talo pitää maalata. Lue myös, milloin kannattaa maalata ja mitä se maksaa.",
    lead: "Puutalo maalataan yleensä 10–15 vuoden välein. Hilseily, haalistunut väri ja homepilkut kertovat, että maali ei enää suojaa puuta.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-26",
    readingMinutes: 7,
    heroImage: "talon-maalaus-hameenkyro-tummansininen-puutalo-jalkeen",
    heroAlt: "Tummansininen puutalo ulkomaalauksen jälkeen",
  },
  {
    slug: "pinnoitus-vai-uusi-katto",
    title: "Tiilikattoremontti vai pinnoitus: kumpi kannattaa?",
    seoTitle: "Kattoremontti vai pinnoitus 2027: hinta ja päätös",
    description:
      "Jos aluskate ja rakenteet ovat ehjät, pinnoitus riittää. Kattoremontti maksaa yleensä 15 000–30 000 €, pinnoitus 2 850–7 000 €. Lue, milloin katto pitää uusia.",
    lead: "Jos aluskate ja katon puurakenteet ovat kunnossa, kattoa ei yleensä tarvitse uusia. Pinnoitus maksaa yleensä 2 850–7 000 euroa ja kattoremontti yleensä 15 000–30 000 euroa. Pinnoitus pidentää katon käyttöikää jopa 15 vuotta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-10-13",
    updatedAt: "2026-10-26",
    readingMinutes: 6,
    heroImage: "tiilikaton-pesu-ja-pinnoitus-ennen-jalkeen",
    heroAlt: "Tiilikatto ennen ja jälkeen pesun ja pinnoituksen",
  },
  {
    slug: "tiilikaton-pinnoituksen-tyovaiheet",
    title: "Näin tiilikaton pinnoitus etenee: 6 työvaihetta",
    tarkea: true,
    seoTitle: "Tiilikaton pinnoitus: työvaiheet ja kesto",
    description:
      "Tiilikaton pinnoituksessa on kuusi työvaihetta kuntotarkastuksesta lopputarkastukseen. Lue, mitä kussakin vaiheessa tehdään ja kauanko työ kestää.",
    lead: "Tiilikaton pinnoituksessa on kuusi työvaihetta: kuntotarkastus, tarvittavat suojaukset, pesu, kasvustontorjunta ja tiilien vaihto, pohjamaali ja pintamaali sekä lopputarkastus. Peruskohteen katto valmistuu 2–3 työpäivässä.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-26",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-ja-aurinkopaneelien-suojaus",
    heroAlt: "Tiilikaton pinnoitus ja aurinkopaneelien suojaus",
  },
  {
    slug: "huoltomaalaus-vai-uusi-ulkoverhous",
    title: "Huoltomaalaus vai uusi ulkoverhous: milloin maali riittää?",
    seoTitle: "Huoltomaalaus vai uusi ulkoverhous: puu ratkaisee",
    description:
      "Hilseilevä maali ei tarkoita, että laudoitus pitää uusia. Jos puu on kovaa eikä lahoa, huoltomaalaus riittää. Lue, miten tarkistat puun kunnon.",
    lead: "Jos puu maalin alla on kovaa eikä lahoa, ulkoverhousta ei yleensä tarvitse uusia. Hyvät pohjatyöt ja uusi maali riittävät, ja hinta on murto-osa uuden laudoituksen hinnasta.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-10-27",
    readingMinutes: 5,
    heroImage: "talon-maalaus-pirkanmaa-keltainen-ulkoverhous-huoltomaalaus-ennen",
    heroAlt: "Keltainen puuverhous ennen julkisivumaalausta",
  },
  {
    slug: "voiko-tiilikaton-pinnoittaa-itse",
    title: "Voiko tiilikaton pinnoittaa itse?",
    seoTitle: "Voiko tiilikaton pinnoittaa tai maalata itse?",
    description:
      "Tiilikaton voi pestä ja maalata itse, mutta kestävä tulos vaatii oikeat välineet. Lue, mitä työ vaatii ja missä se yleensä menee pieleen.",
    lead: "Tiilikaton voi pestä ja maalata itse, mutta kestävä tulos vaatii hyvän pesun, kasvustontorjunnan ja kaksi maalikerrosta ruiskulla. Itse tehdystä työstä et saa kotitalousvähennystä etkä takuuta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-11-02",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-tummanharmaa-tiilikatto-pinnoitus-jalkeen",
    heroAlt: "Tummanharmaa tiilikatto pinnoituksen ja huollon jälkeen",
  },
  {
    slug: "tiilikaton-pesu-ja-pinnoitus",
    title: "Tiilikaton pesu ja pinnoitus: miksi pelkkä pesu ei riitä?",
    seoTitle: "Tiilikaton pesu ja pinnoitus: miksi pesu ei riitä",
    description:
      "Pesu poistaa sammaleen, mutta kulunut tiili imee vettä seuraavalla sateella. Lue, miksi katto maalataan pesun jälkeen, mitä työ maksaa ja kauanko se kestää.",
    lead: "Tiilikaton pesu poistaa sammaleen ja lian, mutta kulunut tiilen pinta imee vettä heti seuraavalla sateella. Siksi pesun jälkeen katto maalataan kahteen kertaan. Peruskohteen katto valmistuu 2–3 työpäivässä, ja hinta on yleensä 2 850–7 000 €.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-11-05",
    readingMinutes: 6,
    heroImage: "tiilikaton-pesu-ja-pinnoitus-tampere-pesu-kesken",
    heroAlt: "Tiilikaton pesu käynnissä Tampereella, puolet katosta pesty",
  },
  {
    slug: "ormax-tiilikaton-pinnoitus",
    title: "Ormax-tiilikaton pinnoitus: mitä kannattaa tietää?",
    seoTitle: "Ormax-tiilikaton pinnoitus: hinta ja ajoitus",
    description:
      "Ormax on yleisin 2000-luvun kattotiili. Lue, milloin Ormax-katto kannattaa pinnoittaa, miten työ etenee, mitä se maksaa ja mitä valmistaja sanoo hoidosta.",
    lead: "Ormax on yleisin 2000-luvun kattotiili, ja pinnoitamme sitä samalla työllä ja hinnalla kuin muita betonitiiliä. Valmistajan mukaan tiili kestää huollettuna 50–70 vuotta, mutta pinta kuluu paljon nopeammin. Pinnoitus on ajankohtainen, kun väri on haalistunut tai pinta karhea.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-11-12",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-nokia-tummanharmaa-tiilikatto-lahikuva",
    heroAlt: "Pinnoitettu tummanharmaa betonitiilikatto Nokialla lähikuvassa",
  },
  {
    slug: "sammal-tiilikatolla",
    title: "Sammal tiilikatolla: mitä se kertoo ja milloin katto kannattaa pinnoittaa",
    seoTitle: "Sammal tiilikatolla: milloin katto kannattaa pinnoittaa",
    description:
      "Sammal tiilikatolla kertoo, että tiilen pinta pidättää kosteutta. Lue, miksi sammal kasvaa, mitä se tekee tiilelle ja milloin pesu ja pinnoitus kannattaa tehdä.",
    lead: "Sammal tiilikatolla kertoo, että tiilen pinta on kulunut huokoiseksi ja pysyy märkänä. Sammal pitää kosteuden tiilessä, ja talvella jäätyvä vesi rapauttaa tiiltä. Noin 15 vuoden iässä katto kannattaa pestä ja pinnoittaa: sen jälkeen tiili hylkii taas vettä ja katto kestää jopa 15 vuotta pidempään.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-11-16",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-kangasala-sammaleinen-tiilikatto-ennen",
    heroAlt: "Sammaloitunut tiilikatto Kangasalla ennen pinnoitusta",
    heroCaption: "Sammal kasvaa tiilen huokoisessa pinnassa ja pitää sen märkänä.",
  },
  {
    slug: "puutalon-ulkomaalin-valinta",
    title: "Puutalon ulkomaalin valinta: öljymaali vai vesiohenteinen?",
    seoTitle: "Puutalon ulkomaali: öljymaali vai vesiohenteinen",
    description:
      "Ulkomaali valitaan vanhan maalin mukaan: vesiohenteisen päälle vain vesiohenteinen, öljymaalin päälle kumpi tahansa. Lue, miten tunnistat vanhan maalin.",
    lead: "Oikea ulkomaali riippuu siitä, mitä seinässä on nyt. Vesiohenteisen maalin päälle sopii vain vesiohenteinen, öljymaalin päälle kumpi tahansa. Vanhan maalin tunnistat pyyhkäisemällä, taivuttamalla ja spriillä. Käytämme pääsääntöisesti Tikkurilan maaleja.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-11-26",
    readingMinutes: 6,
    heroImage: "talon-maalaus-ulkoverhous-pensselilla-maalari",
    heroAlt: "Maalari maalaa puutalon ulkoverhousta pensselillä",
  },
  {
    slug: "mokin-ja-piharakennuksen-maalaus",
    title: "Mökin ja piharakennuksen maalaus: mitä kannattaa tietää?",
    seoTitle: "Mökin ja piharakennuksen maalaus: näin työ etenee",
    description:
      "Maalaamme mökit, autotallit ja piharakennukset samoilla työvaiheilla kuin talot. Lue, miksi mökin seinät kuluvat nopeammin ja miten vähennys toimii mökillä.",
    lead: "Maalaamme mökit, autotallit ja piharakennukset samoilla työvaiheilla kuin omakotitalot: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Mökin seinät kuluvat usein nopeammin, koska ranta ja varjo pitävät puun märkänä. Mökin maalauksesta saa kotitalousvähennyksen.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-11-30",
    readingMinutes: 5,
    heroImage: "talon-maalaus-vihrea-puutalo-ulkomaalaus-jalkeen",
    heroAlt: "Vihreä puurakennus ulkomaalauksen jälkeen",
  },
  {
    slug: "tiilikaton-kuntotarkastus-mita-tarkistamme",
    title: "Tiilikaton kuntotarkastus: mitä tarkistamme ja mitä saat?",
    seoTitle: "Tiilikaton kuntotarkastus: mitä tarkistamme",
    description:
      "Ilmainen kuntotarkastus kattaa tiilet, saumat, piipun ympäryksen, läpiviennit ja aluskatteen. Lue, mitä katsomme ja miten saat tarjouksen kiinteällä hinnalla.",
    lead: "Kuntotarkastuksessa tarkistamme viisi asiaa: tiilet, saumat, piipun ympäryksen, läpiviennit ja aluskatteen. Se on ilmainen, tulemme yleensä samalla viikolla, ja saat kirjallisen tarjouksen kiinteällä hinnalla.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-12-03",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-tampere-tiilitalo-ennen",
    heroAlt: "Tiilitalo Tampereella ennen tiilikaton kuntotarkastusta ja pinnoitusta",
  },
  {
    slug: "ruisku-vai-pensseli-talon-maalaus",
    title: "Ruisku vai pensseli: miksi maalaamme puutalon seinät pensselillä?",
    seoTitle: "Ruisku vai pensseli talon ulkomaalauksessa",
    description:
      "Maalaamme puutalon seinät pensselillä ja katon ruiskulla. Lue, miksi pensseli painaa maalin puun syihin, mitä valmistajat neuvovat ja kauanko työ kestää.",
    lead: "Maalaamme puutalon seinät pensselillä, koska pensseli painaa maalin puun syihin ja lautojen saumoihin. Ruisku jättää maalin pintaan. Maalin valmistajat neuvovat samaa: puupinnat maalataan siveltimellä. Omakotitalo valmistuu 3–7 päivässä.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-12-07",
    readingMinutes: 5,
    heroImage: "talon-maalaus-pensseli",
    heroAlt: "Pensseli puutalon ulkomaalauksessa",
  },
  {
    slug: "harjatiiviste-tiilikatolla",
    title: "Harjatiiviste tiilikatolla: mikä se on ja milloin se asennetaan?",
    seoTitle: "Harjatiiviste tiilikatolla: mikä se on ja miksi",
    description:
      "Harjatiiviste on tiiviste harjatiilen alla, joka pitää tuiskulumen ja roskat poissa aluskatteelta. Lue, miksi se puuttuu ja miksi asennamme sen pinnoituksessa.",
    lead: "Harjatiiviste on tiiviste harjapuun yli ja harjatiilen alla. Se vähentää tuiskulumen, veden ja roskien pääsyä aluskatteelle, mutta päästää ilman läpi. Tarkistamme harjan jokaisessa kuntotarkastuksessa ja asennamme tiivisteen tarvittaessa pinnoituksen yhteydessä.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-11-19", // Eerik 29.10.2026: nostettu jonossa (880 hakua/kk, OpenSEO-raportti),
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-harjatiivisteen-asennus",
    heroAlt: "Harjatiivisteen asennus tiilikaton harjalle",
  },
  {
    slug: "milloin-tilata-kesan-pinnoitus",
    title: "Milloin kesän 2027 tiilikaton pinnoitus kannattaa tilata?",
    seoTitle: "Milloin kesän 2027 pinnoitus kannattaa tilata",
    description:
      "Kesän pinnoitukset täyttyvät pitkälti jo keväällä. Lue, miten kausi kulkee huhtikuusta syyskuuhun ja milloin tilaus kannattaa tehdä, jotta saat sopivan viikon.",
    lead: "Tilaa kesän pinnoitus talvella tai heti keväällä. Kesän työt täyttyvät pitkälti jo keväällä, ja kuntotarkastuksen teemme heti, kun katto on lumeton. Pinnoituksia teemme huhti–toukokuusta elo–syyskuuhun.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-12-14",
    readingMinutes: 4,
    heroImage: "tiilikaton-pinnoitus-ylojarvi-keltainen-talo-jalkeen",
    heroAlt: "Keltainen omakotitalo ja pinnoitettu tiilikatto Ylöjärvellä kesällä",
  },
  {
    slug: "milloin-talon-voi-maalata-saa",
    title: "Milloin talon voi maalata? Sää, lämpötila ja kosteus",
    seoTitle: "Milloin talon voi maalata: sää ja lämpötila",
    description:
      "Talon voi maalata, kun lämpötila on 5–30 astetta, ilmankosteus alle 80 % ja seinä kuiva. Lue valmistajien rajat, paras maalaussää ja mitä teemme, jos sataa.",
    lead: "Maalaamme, kun seinä on kuiva, lämpötila on 5–30 astetta ja ilmankosteus alle 80 prosenttia. Paras sää on pilvinen ja kuiva, 15–20 astetta. Sateella ei maalata, ja siirretystä päivästä ei tule lisäkuluja.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-12-17",
    readingMinutes: 5,
    heroImage: "talon-maalaus-vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
    heroAlt: "Vaalea puutalo ulkomaalauksen jälkeen poutasäällä",
  },
  {
    slug: "tiilikaton-varin-vaihto-pinnoituksessa",
    title: "Tiilikaton värin vaihto pinnoituksessa: miten väri valitaan?",
    seoTitle: "Tiilikaton värin vaihto pinnoituksen yhteydessä",
    description:
      "Pinnoitus on maalaus, joten katon värin voi vaihtaa samalla työllä. Lue, miten väri valitaan, mitkä värit ovat yleisimmät ja milloin kunnasta kysytään.",
    lead: "Katon värin voi vaihtaa pinnoituksessa, koska pinnoitus on maalaus. Nowocoatin kattomaaleissa on laaja värivalikoima, ja väri valitaan kuntotarkastuksen yhteydessä. Värin vaihto ei nosta hintaa, mutta kunnasta kannattaa kysyä, tarvitaanko ilmoitus.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-12-21",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-ylojarvi-ruskea-tiilikatto-jalkeen",
    heroAlt: "Ruskea tiilikatto pinnoituksen jälkeen Ylöjärvellä",
  },
  {
    slug: "kotitalousvahennys-vanhempien-talo-ja-puoliso",
    title: "Kotitalousvähennys vanhempien talossa ja puolisoiden kesken: kenen nimiin lasku?",
    seoTitle: "Kotitalousvähennys vanhempien talon töistä",
    description:
      "Saat kotitalousvähennyksen myös vanhempien tai isovanhempien talon katosta ja maalauksesta, kun maksat laskun itse. Lue, miten puolisot jakavat vähennyksen.",
    lead: "Kotitalousvähennyksen saa myös omien tai puolison vanhempien ja isovanhempien asunnossa tehdystä työstä, kun maksat laskun itse. Lasten asunnossa tehty työ ei oikeuta vähennykseen. Puolisot voivat jakaa kulut, ja kumpikin saa enintään 2 100 euroa vuodessa.",
    category: "raha",
    author: "eerik",
    publishedAt: "2026-12-24",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-kangasala-keltainen-talo-jalkeen",
    heroAlt: "Keltainen talo ja pinnoitettu tiilikatto Kangasalla",
  },
  {
    slug: "rintamamiestalon-maalaus",
    title: "Rintamamiestalon maalaus: miten vanha puutalo maalataan?",
    seoTitle: "Rintamamiestalon maalaus: työvaiheet ja hinta",
    description:
      "Rintamamiestalo on puolitoistakerroksinen puutalo, usein peiterimoitetulla pystylaudoituksella. Lue, miten maalaamme sen pensselillä ja mitä se maksaa.",
    lead: "Maalaamme rintamamiestalot samoilla työvaiheilla kuin muut puutalot: homepesu harjoilla, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Puolitoistakerroksisen talon maalaus maksaa yleensä 5 000–7 000 euroa ja kestää 3–5 päivää.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-12-28",
    readingMinutes: 6,
    heroImage: "talon-maalaus-pirkanmaa-keltainen-ulkoverhous-huoltomaalaus-ennen",
    heroAlt: "Keltainen puuverhous ennen julkisivumaalausta",
  },
  {
    slug: "pakkasrapautuminen-tiilikatto",
    title: "Pakkasrapautuminen tiilikatolla: miten se syntyy ja miten pinnoitus estää sen?",
    seoTitle: "Pakkasrapautuminen tiilikatolla ja pinnoitus",
    description:
      "Kulunut tiili imee vettä, ja pakkanen murentaa sitä sisältäpäin. Lue, miten pakkasrapautuminen etenee, mistä sen huomaa ja miksi pinnoitus pysäyttää sen.",
    lead: "Kulunut betonitiili imee vettä. Talvella vesi jäätyy, laajenee ja murentaa tiiltä sisältäpäin. Pinnoitus pitää veden tiilen ulkopuolella, ja kuiva tiili ei rapaudu. Ajoissa tehty pinnoitus, yleensä noin 15 vuoden iässä, estää pakkasrapautumisen.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-12-31",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-valkeakoski-harmaa-katto-ennen",
    heroAlt: "Harmaa, kulunut tiilikatto Valkeakoskella ennen pinnoitusta",
  },
  {
    slug: "tarjouksen-hyvaksymisen-jalkeen",
    title: "Mitä tarjouksen hyväksymisen jälkeen tapahtuu? Sopimus, ennakko ja aikataulu",
    seoTitle: "Mitä tarjouksen hyväksymisen jälkeen tapahtuu",
    description:
      "Hyväksyt tarjouksen vastaamalla viestiin. Sitten tulee kirjallinen sopimus, 10 %:n ennakkolasku ja aikataulu. Lue, mitä tapahtuu ennen työtä ja sen jälkeen.",
    lead: "Hyväksyt tarjouksen vastaamalla tarjousviestiin. Sen jälkeen teemme kirjallisen sopimuksen, sovimme aikataulun ja lähetämme 10 prosentin ennakkolaskun. Otamme yhteyttä ennen aloituspäivää, ja loput laskutamme, kun työ on valmis ja käyty yhdessä läpi.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-01-04",
    readingMinutes: 4,
    heroImage: "tiilikaton-pinnoitus-orivesi-punainen-tiilikatto-jalkeen",
    heroAlt: "Punainen tiilikatto pinnoituksen jälkeen Orivedellä",
  },
  {
    slug: "hirsitalon-maalaus",
    title: "Hirsitalon maalaus: kuullote vai peittosuoja ja miten työ etenee?",
    seoTitle: "Hirsitalon maalaus: kuullote vai peittosuoja",
    description:
      "Hirsi elää kosteuden mukana enemmän kuin lauta, joten pinnalle suositellaan kuullotetta tai peittosuojaa. Lue, miten maalaamme hirsitalon ja mitä se maksaa.",
    lead: "Maalaamme hirsitalot samoilla työvaiheilla kuin muut puutalot, pensselillä. Massiivihirren kosteusvaihtelu on suurempi kuin laudan, joten pinnalle suositellaan kuullotetta tai peittosuojaa. Hinta on yleensä 3 500–11 000 euroa, ja takuu on 2 vuotta.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-01-07",
    readingMinutes: 5,
    heroImage: "talon-maalaus-vihrea-puutalo-ennen-ulkomaalausta",
    heroAlt: "Vihreä puutalo ennen ulkomaalausta",
  },
  {
    slug: "rikkinaiset-tiilet-pinnoituksessa",
    title: "Rikkinäiset tiilet pinnoituksessa: kuka hankkii uudet ja montako saa olla?",
    seoTitle: "Rikkinäiset tiilet pinnoituksessa: vaihto",
    description:
      "Vaihdamme rikkinäiset tiilet uusiin ennen maalausta, ja vaihto kuuluu hintaan. Lue, mistä uudet tiilet tulevat ja milloin rikkinäisiä tiiliä on liikaa.",
    lead: "Rikkinäiset tiilet vaihdetaan uusiin ennen maalausta, ja vaihto kuuluu pinnoituksen hintaan. Varatiilet käytämme ensin. Muuten hankit tiilet itse tai haemme ne sovittua lisähintaa vastaan. Jos tiiliä on rikki laajalti, katto kannattaa uusia.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-01-11",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-urjala-punainen-tiilikatto-lahikuva",
    heroAlt: "Punainen tiilikatto läheltä Urjalassa",
  },
  {
    slug: "autotallin-ja-piharakennuksen-tiilikaton-pinnoitus",
    title: "Autotallin ja piharakennuksen tiilikaton pinnoitus: kannattaako se tehdä samalla?",
    seoTitle: "Autotallin tiilikaton pinnoitus Pirkanmaalla",
    description:
      "Pinnoitamme autotallin, autokatoksen ja muun piharakennuksen tiilikaton, yleensä samalla kertaa talon katon kanssa. Lue, miten työ ja vähennys toimivat.",
    lead: "Pinnoitamme autotallin, autokatoksen, saunan ja muun piharakennuksen tiilikaton samoilla työvaiheilla kuin talon katon. Yleensä teemme sen samalla kertaa talon katon kanssa, jolloin työ sujuu nopeimmin. Työn osuudesta saat kotitalousvähennyksen.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-01-14",
    readingMinutes: 4,
    heroImage: "tiilikaton-pinnoitus-palkane-harmaa-katto-jalkeen",
    heroAlt: "Harmaa tiilikatto pinnoituksen jälkeen Pälkäneellä",
  },
  {
    slug: "miksi-vanha-maali-kaavitaan",
    title: "Kaavinta ja homepesu: miksi pohjatyöt ratkaisevat talon maalauksen keston?",
    seoTitle: "Kaavinta ja homepesu: miksi pohjatyöt ratkaisevat",
    description:
      "Uusi maali tarttuu vain puhtaaseen ja kiinni olevaan pintaan. Lue, miksi pesemme seinän, kaavimme irtoavan maalin ja pohjamaalaamme vain paljaat kohdat.",
    lead: "Uusi maali tarttuu vain puhtaaseen ja kiinni olevaan pintaan. Homepesu harjoilla poistaa itiöt, jotka muuten kasvaisivat maalin läpi. Kaavinta poistaa irtoavan maalin, ja ehjä vanha maali jää pohjaksi. Pohjatyöt vievät usein enemmän aikaa kuin maalaus.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-01-18",
    readingMinutes: 5,
    heroImage: "talon-maalaus-ylojarvi-puutalo-ja-parveke-ennen",
    heroAlt: "Puutalo ja parveke ennen maalausta ja pohjatöitä",
  },
  {
    slug: "nowocoat-kattomaali",
    title: "Mikä Nowocoat on ja miksi käytämme sitä tiilikaton pinnoituksessa?",
    seoTitle: "Nowocoat-kattomaali: mikä se on ja miksi",
    description:
      "Nowocoat on betonitiilelle kehitetty vesiohenteinen kattopinnoite, jonka levitämme ruiskulla kahteen kertaan. Lue valmistajan tiedot kuivumisesta ja väreistä.",
    lead: "Nowocoat on vesiohenteinen kattopinnoite, joka on kehitetty ammattikäyttöön betonitiilikatoille. Se levitetään korkeapaineruiskulla kahteen kertaan, ja toinen kerros voidaan maalata noin kahden tunnin kuluttua. Käytämme sitä jokaisessa katossa.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-12-10", // Eerik 29.10.2026: nostettu jonossa (hakuun "nowocoat kokemuksia", harjatiivisteen vanha paikka),
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-nokia-ruskea-tiilikatto-jalkeen",
    heroAlt: "Ruskea Nowocoatilla pinnoitettu tiilikatto Nokialla",
  },
  {
    slug: "aluskate-ja-pinnoitus",
    title: "Mikä aluskate on ja miksi tarkistamme sen ennen pinnoitusta?",
    seoTitle: "Aluskate ja pinnoitus: miksi tarkistamme sen",
    description:
      "Aluskate on tiilien alla ja suojaa rakennetta vedeltä ja tuulelta. Pinnoitus ei korjaa sitä. Lue, miten tarkistamme aluskatteen ja milloin katto pitää uusia.",
    lead: "Aluskate on tiilien alla oleva kerros, joka suojaa kattorakennetta sadevedeltä, tuulelta, vedolta ja pölyltä. Pinnoitus uusii tiilen pinnan, ei aluskatetta. Tarkistamme sen jokaisessa kuntotarkastuksessa, ja jos se vuotaa, katto kannattaa uusia.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-01-28",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-lempaala-harmaa-tiilikatto-ennen",
    heroAlt: "Harmaa tiilikatto Lempäälässä ennen pinnoitusta",
  },
  {
    slug: "homepilkut-puutalon-seinassa",
    title: "Homepilkut puutalon seinässä: mistä ne tulevat ja milloin seinä pitää maalata?",
    seoTitle: "Homepilkut puutalon seinässä: syyt ja korjaus",
    description:
      "Mustat pilkut puutalon seinässä ovat yleensä hometta tai levää, joka kasvaa kosteissa kohdissa. Lue, milloin pesu riittää ja milloin seinä pitää maalata.",
    lead: "Mustat pilkut puutalon seinässä ovat yleensä hometta tai levää. Ne kasvavat siellä, missä seinä pysyy märkänä: pohjoisseinällä, varjossa ja räystään alla. Ehjä maali pestään, kulunut maali maalataan. Pesemme seinän homepesuaineella ja harjoilla aina ennen maalausta.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-02-01",
    readingMinutes: 5,
    heroImage: "talon-maalaus-tampere-varinvaihto-keltainen-puutalo-ennen",
    heroAlt: "Keltainen puutalo ennen huoltomaalausta ja värinvaihtoa",
  },
  {
    slug: "kaksi-maalikerrosta-tiilikatto",
    title: "Miksi maalaamme tiilikaton kahteen kertaan?",
    seoTitle: "Miksi tiilikatto maalataan kahteen kertaan",
    description:
      "Ensimmäinen kerros imeytyy tiileen ja tarttuu, toinen peittää ja pitää veden ulkona. Lue, mitä kumpikin kerros tekee ja miksi yksi kerros ei riitä.",
    lead: "Maalaamme katon ruiskulla aina kahteen kertaan. Ensimmäinen kerros, pohjamaali, imeytyy huokoiseen tiileen ja tarttuu. Toinen kerros, pintamaali, peittää, antaa värin ja hylkii vettä. Valmistajan riittoisuus 2–3 neliötä litralla on laskettu kahdelle kerrokselle.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-02-04",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-urjala-tummanharmaa-tiilikatto-jalkeen",
    heroAlt: "Tummanharmaa kahteen kertaan maalattu tiilikatto Urjalassa",
  },
  {
    slug: "sade-pinnoituksen-aikana",
    title: "Mitä jos sataa pinnoituksen aikana? Sää, aikataulu ja hinta",
    seoTitle: "Mitä jos sataa tiilikaton pinnoituksen aikana",
    description:
      "Sateella ei maalata, mutta pesu onnistuu. Lue, miten sade vaikuttaa pinnoituksen vaiheisiin, mitä teemme, jos sade yllättää kesken työn, ja miksi hinta pysyy.",
    lead: "Sateella ei maalata, koska maali tarttuu vain kuivaan tiileen. Pesu onnistuu kosteallakin säällä. Sade siirtää päivää, mutta tarjouksen kiinteä hinta ei muutu, ja sateen jäljet tuoreessa maalissa korjaamme ilman lisähintaa.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-02-08",
    readingMinutes: 4,
    heroImage: "tiilikaton-pesu-ja-pinnoitus-tampere-pesu-kesken",
    heroAlt: "Tiilikaton pesu käynnissä Tampereella",
  },
  {
    slug: "pohjamaali-paljaisiin-kohtiin",
    title: "Miksi pohjamaali tulee vain paljaisiin kohtiin talon maalauksessa?",
    seoTitle: "Miksi pohjamaali vain paljaisiin kohtiin",
    description:
      "Paljas puu imee maalia, ehjä vanha maalipinta ei. Lue, mitä pohjamaali tekee, mihin kohtiin se laitetaan ja miksi ehjää maalia ei pohjamaalata uudelleen.",
    lead: "Pohjamaali tulee vain kohtiin, joissa puu on paljaana kaavinnan jälkeen. Paljas puu imee maalia, ja pohjamaali tasaa imun, jotta pintamaali tarttuu ja peittää. Ehjä vanha maali on jo pohja, ja sen päälle pintamaali tarttuu suoraan.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-02-11",
    readingMinutes: 4,
    heroImage: "talon-maalaus-ulkoverhous-pensselilla-maalari",
    heroAlt: "Maalari maalaa puutalon ulkoverhousta pensselillä",
  },
  {
    slug: "milloin-tiilikaton-voi-pinnoittaa-saa",
    title: "Milloin tiilikaton voi pinnoittaa? Sää, lämpötila ja kuivuminen",
    seoTitle: "Milloin tiilikaton voi pinnoittaa: sää ja aika",
    description:
      "Tiilikattomaalit vaativat yleensä yli 10 astetta ja alle 80 %:n ilmankosteuden, myös yöllä. Lue, milloin katon voi maalata ja kauanko maali kuivuu.",
    lead: "Pinnoitamme huhti–toukokuusta elo–syyskuuhun. Tiilikattomaalit vaativat valmistajien mukaan yli 10 asteen lämpötilan ja alle 80 prosentin ilmankosteuden, myös maalausta seuraavana yönä. Katon pitää olla kuiva, ja Nowocoat on täysin kuiva vuorokaudessa 20 asteessa.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-02-15",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-vastamaalattu-tiilikatto-jalkeen",
    heroAlt: "Vastamaalattu tiilikatto kuivumassa poutasäällä",
  },
  {
    slug: "tiilikaton-pinnoituksen-sanasto",
    title: "Tiilikaton pinnoituksen sanasto: mitä sanat tarkoittavat?",
    seoTitle: "Tiilikaton pinnoituksen sanasto selitettynä",
    description:
      "Pinnoitus, kattopinnoite, aluskate, harjatiiviste, läpivienti ja kiinteä hinta. Lue, mitä katon ja tarjouksen sanat tarkoittavat ennen kuntotarkastusta.",
    lead: "Pinnoitus, maalaus ja kattomaalaus tarkoittavat samaa työtä. Kokosimme sanat, joita käytämme kuntotarkastuksessa, tarjouksessa ja katolla: työvaiheet, katon osat ja laskun sanat. Aluskate, harjatiiviste ja läpivienti kannattaa tuntea ennen kuntotarkastusta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-02-18",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-pirkkala-punainen-tiilikatto-jalkeen",
    heroAlt: "Punainen tiilikatto pinnoituksen jälkeen Pirkkalassa",
  },
  {
    slug: "kuullote-vai-peittava-maali",
    title: "Kuullote vai peittävä maali puutaloon: kumpi kannattaa valita?",
    seoTitle: "Kuullote vai peittävä maali puutalon seinään",
    description:
      "Kuullote jättää puun syyt näkyviin, peittävä maali antaa tasaisen värin ja pidemmän huoltovälin. Lue erot ja milloin kuullotteesta kannattaa siirtyä peittävään.",
    lead: "Kuullote jättää puun syyt näkyviin ja antaa sävyn. Peittävä maali peittää puun kokonaan ja antaa tasaisen värin, ja sen huoltoväli on pidempi. Kuullotteesta voi siirtyä peittävään maaliin, mutta paluu vaatii vanhan maalin poiston. Valinta tehdään arviokäynnillä seinän mukaan.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-02-22",
    readingMinutes: 5,
    heroImage: "talon-maalaus-moderni-tumma-puutalo-julkisivumaalaus-valmis",
    heroAlt: "Moderni tumma puutalo julkisivumaalauksen jälkeen",
  },
  {
    slug: "tiilikaton-ika-ja-kayttoika",
    title: "Kuinka kauan tiilikatto kestää? Tiilen ikä ja pinnan ikä",
    seoTitle: "Kuinka kauan tiilikatto kestää: tiilen ikä",
    description:
      "Betonitiili kestää valmistajan mukaan 50–70 vuotta, mutta sen pinta kuluu noin 15 vuodessa. Lue, mitä katolle tapahtuu eri vaiheissa ja milloin se pitää uusia.",
    lead: "Betonitiili kestää valmistajan mukaan huollettuna 50–70 vuotta, ja VTT:n tutkimuksen mukaan kattotiilen elinkaari on jopa 70 vuotta. Tiilen tehdaspinta kuluu kuitenkin noin 15 vuodessa. Silloin katto kannattaa pinnoittaa, ja uusi pinta kestää jopa 15 vuotta pidempään.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-02-25",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-uudenveroinen-punainen-tiilikatto-jalkeen",
    heroAlt: "Uudenveroinen punainen tiilikatto pinnoituksen jälkeen",
  },
  {
    slug: "katto-ja-seinat-samalla-kertaa",
    title: "Katto ja seinät samalla kertaa: miksi pakettihinta on edullisempi?",
    seoTitle: "Katto ja seinät samalla kertaa: pakettihinta",
    description:
      "Kun pinnoitamme katon ja maalaamme seinät samalla kertaa, saat edullisemman pakettihinnan. Lue, missä järjestyksessä työ etenee ja miten vähennys toimii.",
    lead: "Katto ja seinät samalla kertaa on edullisempi pakettihinta kuin kaksi erillistä työtä. Yleensä katto tehdään ensin ja seinät sen jälkeen. Erikseen pinnoitus maksaa yleensä 2 850–7 000 euroa ja maalaus 3 500–11 000 euroa, ja paketin hinta on tarjouksessa yksi kiinteä summa.",
    category: "raha",
    author: "eerik",
    publishedAt: "2027-03-01",
    readingMinutes: 5,
    heroImage: "talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen",
    heroAlt: "Puutalo Tampereella katon ja seinien maalauksen jälkeen",
  },
  {
    slug: "talon-maalaus-kesto-3-7-paivaa",
    title: "Kuinka kauan talon maalaus kestää? Mitä maalausviikon aikana tapahtuu",
    seoTitle: "Kuinka kauan talon maalaus kestää: 3–7 päivää",
    description:
      "Omakotitalon maalaus kestää yleensä 3–7 päivää, ja pohjatyöt vievät siitä lähes puolet. Lue päivä päivältä, mitä maalausviikolla tapahtuu ja mikä venyttää sitä.",
    lead: "Omakotitalon maalaus kestää yleensä 3–7 päivää: yksikerroksinen talo 2–4, puolitoistakerroksinen 3–5 ja kaksikerroksinen 4–8 päivää. Pohjatyöt ja kuivuminen vievät lähes puolet ajasta. Työ ei estä asumista, ja sade siirtää päivää ilman lisäkuluja.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-03-04",
    readingMinutes: 5,
    heroImage: "talon-maalaus-tampere-puutalon-seinien-maalaus-kaynnissa",
    heroAlt: "Puutalon seinien maalaus käynnissä Tampereella",
  },
  {
    slug: "pirkanmaan-talokanta-ja-tiilikatot",
    title: "Pirkanmaan talokanta ja tiilikatot: minkä ikäisiä katot ovat?",
    seoTitle: "Pirkanmaan talokanta ja tiilikattojen ikä",
    description:
      "Tampereella on noin 17 000 omakoti- ja paritaloa, kehyskuntiin valmistui 2000-luvulla yli 5 500. Lue Tilastokeskuksen luvut ja mitä ne kertovat tiilikatoista.",
    lead: "Tilastokeskuksen mukaan Tampereella on noin 17 000 omakoti- ja paritaloa, joista noin 6 800 on rakennettu 1970–1999. Kehyskuntiin valmistui 2000-luvulla yli 5 500 taloa, ja niiden katot ovat nyt noin 15 vuoden iässä eli pinnoitusvuorossa.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-03-08",
    readingMinutes: 6,
    heroImage: "tiilikaton-pinnoitus-tampere-tummanharmaa-tiilikatto-jalkeen",
    heroAlt: "Tummanharmaa tiilikatto pinnoituksen jälkeen Tampereella",
  },
  {
    slug: "kevattarkistus-tiilikatto-maasta-kasin",
    title: "Tiilikaton kevättarkistus maasta käsin: 6 kohtaa, jotka näet kiikarilla",
    seoTitle: "Tiilikaton kevättarkistus maasta käsin: 6 kohtaa",
    description:
      "Katso katto keväällä maasta käsin: väri, sammal, rikkinäiset tiilet, harjatiilet, kourut ja piippu. Lue, mitä merkit tarkoittavat ja milloin tilata tarkastus.",
    lead: "Katso katto keväällä maasta käsin kiikarilla tai kameran zoomilla. Kuusi asiaa riittää: väri, sammal, rikkinäiset tiilet, harjatiilet, kourut ja piipun pellitykset. Kourun pohjalla oleva hiekka kertoo, että tiilen pinta on kulunut. Katolle ei tarvitse kiivetä.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-03-11",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-sastamala-sammaleinen-tiilikatto-ennen",
    heroAlt: "Sammaleinen tiilikatto Sastamalassa keväällä ennen pinnoitusta",
  },
  {
    slug: "hilseileva-maali-syyt",
    title: "Miksi maali hilseilee puutalon seinästä ja mitä sille tehdään?",
    seoTitle: "Miksi maali hilseilee puutalon seinästä",
    description:
      "Maali hilseilee, kun se ei enää tartu puuhun: kosteus, lika, väärä maalityyppi tai liian paksu kalvo. Lue syyt ja miksi hilseilevän päälle ei voi maalata.",
    lead: "Maali hilseilee, kun se ei enää tartu puuhun. Yleisimmät syyt ovat kosteus puun alla, maalaus märkään tai likaiseen pintaan, väärä maalityyppi vanhan päällä ja liian paksu kalvo. Hilseilevän maalin päälle ei voi maalata: irtoava maali kaavitaan pois.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-03-15",
    readingMinutes: 5,
    heroImage: "talon-maalaus-parkano-hilseileva-puutalo-ennen",
    heroAlt: "Hilseilevä puutalon seinä Parkanossa ennen maalausta",
  },
  {
    slug: "jos-tiilikattoa-ei-pinnoiteta-ajoissa",
    title: "Mitä tapahtuu, jos tiilikattoa ei pinnoiteta ajoissa?",
    seoTitle: "Jos tiilikattoa ei pinnoiteta ajoissa: 4 vaihetta",
    description:
      "Ilman pinnoitusta kulunut tiili imee vettä ja rapautuu talvi talvelta. Lue neljä vaihetta pinnan kulumisesta aluskatteen kastumiseen ja kattoremonttiin.",
    lead: "Ilman pinnoitusta kulunut tiili imee vettä ja rapautuu pakkasella talvi talvelta. Ensin pinta hilseilee, sitten tiilet halkeilevat, lopulta aluskate kastuu. Ajoissa tehty pinnoitus maksaa yleensä 2 850–7 000 euroa, myöhässä edessä on 15 000–30 000 euron kattoremontti.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-03-18",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-ylojarvi-punainen-katto-ennen",
    heroAlt: "Kulunut punainen tiilikatto Ylöjärvellä ennen pinnoitusta",
  },
  {
    slug: "10-yleisinta-kysymysta-pinnoituksesta",
    title: "Tiilikaton pinnoitus: 10 yleisintä kysymystä ja vastaukset",
    seoTitle: "Tiilikaton pinnoitus: 10 yleisintä kysymystä",
    description:
      "Hinta, kesto, oikea aika, maali, tiilet, vähennys ja takuu. Kokosimme asiakkaiden kymmenen yleisintä kysymystä tiilikaton pinnoituksesta ja vastaamme lyhyesti.",
    lead: "Pinnoitus maksaa yleensä 2 850–7 000 euroa ja kestää 2–3 päivää. Oikea aika on noin 15 vuoden iässä. Maali on Nowocoat, kerroksia kaksi, takuu 5 vuotta ja kotitalousvähennys 40 prosenttia työn osuudesta. Tässä kymmenen yleisintä kysymystä ja vastaukset.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-03-22",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-sastamala-punainen-tiilikatto-jalkeen",
    heroAlt: "Punainen tiilikatto pinnoituksen jälkeen Sastamalassa",
  },
  {
    slug: "talon-maalaus-tilauksesta-valmiiseen",
    title: "Talon maalaus tilauksesta valmiiseen seinään: näin työ etenee",
    seoTitle: "Talon maalaus tilauksesta valmiiseen seinään",
    description:
      "Yhteydenotto, arviokäynti samalla viikolla, kirjallinen tarjous, sopimus ja maalausviikko. Lue koko matka tilauksesta valmiiseen seinään.",
    lead: "Tilaus alkaa yhteydenotosta ja ilmaisesta arviokäynnistä, yleensä samalla viikolla. Saat kirjallisen tarjouksen kiinteällä hinnalla, ja hyväksymisen jälkeen sovimme aikataulun. Maalausviikko on kuusi vaihetta, ja se päättyy yhteiseen lopputarkastukseen ja 2 vuoden takuuseen.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-03-25",
    readingMinutes: 5,
    heroImage: "talon-maalaus-vihrea-puutalo-ulkomaalaus-jalkeen",
    heroAlt: "Vihreä puutalo ulkomaalauksen jälkeen",
  },
  {
    slug: "tiilikaton-pinnoitus-ennen-ja-jalkeen-kohteet",
    title: "Tiilikaton pinnoitus ennen ja jälkeen: 5 kohdetta Pirkanmaalta",
    seoTitle: "Tiilikaton pinnoitus ennen ja jälkeen: 5 kohdetta",
    description:
      "Viisi omaa kohdetta Tampereelta, Ylöjärveltä, Sastamalasta, Valkeakoskelta ja Lempäälästä kuvina ennen ja jälkeen. Lue, mitä kullakin katolla tehtiin.",
    lead: "Viisi omaa kohdetta Tampereelta, Ylöjärveltä, Sastamalasta, Valkeakoskelta ja Lempäälästä. Jokaisessa sama työ: pesu, kasvustontorjunta, tiilien vaihto ja kaksi kerrosta Nowocoatia. Yhdessä väri vaihtui, yhdessä aurinkopaneelit suojattiin. Hinta on yleensä 2 850–7 000 euroa.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-03-29",
    readingMinutes: 5,
    heroImage: "tiilikaton-pesu-ja-pinnoitus-ennen-jalkeen",
    heroAlt: "Tiilikatto ennen ja jälkeen pesun ja pinnoituksen",
  },
  {
    slug: "ennakkomaksu-ja-laskutus",
    title: "Ennakkomaksu ja laskutus: milloin ja mitä maksat pinnoituksesta tai maalauksesta?",
    seoTitle: "Ennakkomaksu ja laskutus: milloin ja mitä maksat",
    description:
      "Ennakkolasku on 10 % hinnasta, loput laskutetaan valmiista työstä. Lue, miksi hinta on kiinteä, mitä laskussa lukee ja miten saat siitä kotitalousvähennyksen.",
    lead: "Ennakkolasku on 10 prosenttia hinnasta, ja se lähetetään tarjouksen hyväksymisen jälkeen. Loput laskutetaan, kun työ on valmis ja käyty yhdessä läpi. Tarjouksen hinta on kiinteä, ja laskussa on työn osuus eriteltynä kotitalousvähennystä varten.",
    category: "raha",
    author: "eerik",
    publishedAt: "2027-04-01",
    readingMinutes: 4,
    heroImage: "tiilikaton-pinnoitus-kirkkaan-punainen-tiilikatto-jalkeen",
    heroAlt: "Kirkkaan punainen tiilikatto pinnoituksen jälkeen",
  },
  {
    slug: "miten-valitset-maalausliikkeen",
    title: "Miten valitset maalausliikkeen? 7 kysymystä ennen tilausta",
    seoTitle: "Miten valitset maalausliikkeen: 7 kysymystä",
    description:
      "Kysy, kuka työn tekee, mitä maalia käytetään, mitä pohjatöitä tehdään ja onko tarjous kiinteä. Lue seitsemän kysymystä ja miksi rekisterit kannattaa tarkistaa.",
    lead: "Kysy maalausliikkeeltä, kuka työn tekee, mitä maalia käytetään, mitä pohjatöitä tehdään, onko tarjous kirjallinen ja kiinteä, mikä takuu on ja kuuluuko yritys ennakkoperintärekisteriin. Meillä yrittäjät tekevät työn itse, ja maalia käytetään aina tarpeeksi.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-04-05",
    readingMinutes: 5,
    heroImage: "talon-maalaus-ylojarvi-puutalo-ja-parveke-jalkeen",
    heroAlt: "Puutalo ja parveke huoltomaalauksen jälkeen",
  },
  {
    slug: "kuka-pinnoittaa-kattosi",
    title: "Kuka pinnoittaa kattosi? Eerik tekee työn itse ja vastaa lopputuloksesta",
    seoTitle: "Kuka pinnoittaa kattosi: Eerik tekee työn itse",
    description:
      "Eerik tekee kuntotarkastuksen, tarjouksen ja pinnoituksen itse. Lue, miksi tekijä ratkaisee pinnoituksessa, miksi maalia on aina tarpeeksi ja mitä takuu kattaa.",
    lead: "Eerik Pitkänen tekee kuntotarkastuksen, tarjouksen ja pinnoituksen itse ja on mukana jokaisessa kattotyössä. Kokemus ja työnjälki ovat tekijällä: yli 130 pinnoitettua kattoa. Maalia käytetään aina tarpeeksi, hinta on kiinteä ja takuu 5 vuotta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-04-08",
    readingMinutes: 4,
    heroImage: "tiilikaton-pinnoitus-tampere-eerik-pitkanen-katolla",
    heroAlt: "Eerik Pitkänen tiilikatolla Tampereella",
  },
  {
    slug: "mita-tarjouksesta-kannattaa-katsoa",
    title: "Mitä pinnoitustarjouksesta kannattaa katsoa? 8 kohtaa ennen hyväksymistä",
    seoTitle: "Mitä pinnoitustarjouksesta kannattaa katsoa",
    description:
      "Kiinteä hinta, sisältö, maalin nimi, kerrokset, tiilet, suojaukset, siivous ja takuu. Lue, miten luet pinnoitustarjouksen ja miksi sisältö ratkaisee, ei summa.",
    lead: "Katso pinnoitustarjouksesta kahdeksan asiaa: kiinteä hinta, mitä hintaan kuuluu, maalin nimi, kerrosten määrä, rikkinäiset tiilet, suojaukset, siivous ja takuu. Vertaa sisältöä, ei vain summaa. Meidän tarjouksessamme on yksi kiinteä hinta, joka sisältää kaiken.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-04-12",
    readingMinutes: 4,
    heroImage: "tiilikaton-pinnoitus-palkane-punainen-tiilikatto-jalkeen",
    heroAlt: "Punainen tiilikatto pinnoituksen jälkeen Pälkäneellä",
  },
  {
    slug: "talon-maalaus-varin-vaihto",
    title: "Talon värin vaihto huoltomaalauksessa: mitä kannattaa päättää etukäteen?",
    seoTitle: "Talon värin vaihto huoltomaalauksen yhteydessä",
    description:
      "Talon värin voi vaihtaa huoltomaalauksessa samoilla työvaiheilla. Lue, mitä päättää ennen arviokäyntiä, miten peittävyys katsotaan ja milloin kunnasta kysytään.",
    lead: "Talon värin voi vaihtaa huoltomaalauksessa, koska peittävä maali peittää vanhan värin. Työvaiheet ovat samat, ja peittävyys katsotaan arviokäynnillä. Väri ja maali kirjataan tarjoukseen. Kysy kuntasi rakennusvalvonnasta, tarvitaanko värin vaihtoon ilmoitus.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-04-15",
    readingMinutes: 5,
    heroImage: "talon-maalaus-pirkanmaa-varinvaihto-punaisesta-harmaaksi-jalkeen",
    heroAlt: "Harmaa omakotitalo värinvaihdon jälkeen",
  },
  {
    slug: "tiilikaton-lapiviennit-ja-piippu",
    title: "Tiilikaton läpiviennit ja piipun ympärys: miksi katto vuotaa juuri sieltä?",
    seoTitle: "Tiilikaton läpiviennit ja piippu pinnoituksessa",
    description:
      "Piippu, putket, antenni ja luukku ovat tiilikaton yleisimmät vuotokohdat. Lue, mitä tarkistamme läpivienneistä ennen pinnoitusta ja mitä niille tehdään.",
    lead: "Läpivienti on kohta, jossa piippu, putki, antenni tai luukku menee katon läpi. Läpiviennit ja piipun ympärys ovat katon yleisimmät vuotokohdat. Tarkistamme ne jokaisessa kuntotarkastuksessa, ja koska pinnoitus ei korjaa pellitystä, kerromme havainnot ja kirjaamme ne tarjoukseen.",
    category: "katto",
    author: "eerik",
    publishedAt: "2027-04-19",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-hameenkyro-kyroskoski-tummanharmaa-tiilikatto-jalkeen",
    heroAlt: "Tummanharmaa tiilikatto läpivienteineen Kyröskoskella pinnoituksen jälkeen",
  },
  {
    slug: "milloin-talon-maalaus-kannattaa-tilata",
    title: "Milloin kesän 2027 talon maalaus kannattaa tilata?",
    seoTitle: "Milloin kesän 2027 talon maalaus kannattaa tilata",
    description:
      "Kesän maalaukset täyttyvät pitkälti jo keväällä. Lue, miten maalauskausi kulkee huhtikuusta syyskuuhun ja miksi tilaus kannattaa tehdä talvella.",
    lead: "Tilaa kesän maalaus talvella tai heti keväällä. Kesän työt täyttyvät pitkälti jo keväällä, ja arviokäynnin voi tehdä heti, kun seinät näkyvät. Maalaamme huhti–toukokuusta elo–syyskuuhun, ja aikataulu sovitaan kirjallisesti, kun hyväksyt tarjouksen.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-01-25",
    readingMinutes: 4,
    heroImage: "talon-maalaus-pirkanmaa-keltainen-ulkoverhous-huoltomaalaus-jalkeen",
    heroAlt: "Keltainen ulkoverhous huoltomaalauksen jälkeen",
  },
  {
    slug: "pinnoitus-aurinkopaneelit-katolla",
    title: "Tiilikaton pinnoitus, kun katolla on aurinkopaneelit",
    seoTitle: "Tiilikaton pinnoitus ja aurinkopaneelit",
    description:
      "Katto voidaan pinnoittaa, vaikka katolla on aurinkopaneelit. Suojaamme paneelit ja pinnoitamme katon niiden ympäriltä. Lue, miten työ etenee ja mitä katsomme.",
    lead: "Katto voidaan pinnoittaa, vaikka katolla on aurinkopaneelit. Paneeleita ei irroteta: suojaamme ne paikoilleen ja pinnoitamme katon niiden ympäriltä. Kasvustontorjunta-aine levitetään myös paneelien alle. Suojaus kuuluu hintaan. Olemme tehneet näin Tampereella, Sastamalassa ja Valkeakoskella.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-11-09",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-ja-aurinkopaneelien-suojaus",
    heroAlt: "Aurinkopaneelien suojaus tiilikaton pinnoituksen aikana",
  },
  {
    slug: "talon-maalauksen-10-yleisinta-kysymysta",
    title: "Talon maalaus: 10 yleisintä kysymystä ja vastaukset",
    seoTitle: "Talon maalauksen 10 yleisintä kysymystä",
    description:
      "Hinta, kesto, oikea aika, maali, pensseli, sää, mökit, vähennys ja arviokäynti. Kokosimme kymmenen yleisintä kysymystä talon maalauksesta ja vastaamme lyhyesti.",
    lead: "Maalaus maksaa yleensä 3 500–11 000 euroa ja kestää 3–7 päivää. Puutalo maalataan yleensä 10–15 vuoden välein. Maalaamme pensselillä, pääsääntöisesti Tikkurilan maaleilla, ja takuu on 2 vuotta. Tässä kymmenen yleisintä kysymystä ja vastaukset.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2027-04-22",
    readingMinutes: 5,
    heroImage: "talon-maalaus-vaaleansininen-omakotitalo-julkisivumaalaus",
    heroAlt: "Vaaleansininen omakotitalo julkisivumaalauksen jälkeen",
  },
];

/** Tämän päivän päivämäärä Suomen aikaa muodossa YYYY-MM-DD. */
export const todayInFinland = (now: Date = new Date()): string =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Helsinki" }).format(now);

/** Artikkeli on julkinen, kun sen julkaisupäivä on koittanut (Suomen aikaa). */
export const isPublished = (article: ArticleMeta, now: Date = new Date()): boolean =>
  article.publishedAt <= todayInFinland(now);

/** Julkaistut artikkelit uusimmasta vanhimpaan. */
export const getPublishedArticles = (now: Date = new Date()): ArticleMeta[] =>
  articles
    .filter((a) => isPublished(a, now))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const getArticleBySlug = (slug: string | undefined): ArticleMeta | undefined =>
  articles.find((a) => a.slug === slug);

/** "2026-05-24" → "24.5.2026" */
export const formatDateFi = (isoDate: string): string => {
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${d}.${m}.${y}`;
};
