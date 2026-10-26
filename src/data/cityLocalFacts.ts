/**
 * Paikkakuntakohtaiset faktat kunnan rakennusjärjestyksestä ja katon tai julkisivun värin vaihdosta
 * (paketti C, luettu 26.10.2026). Jokainen virke on kirjoitettu erikseen kunnan omasta asiakirjasta:
 * lainaukset, osoitteet ja voimaantulopäivät ovat tiedostossa docs/kaupunkisivut-lahteet.md.
 * src/test/seo.test.ts tarkistaa, ettei sama virke toistu paikkakunnalta toiselle.
 *
 * Tausta: rakentamislaki (751/2023) tuli voimaan 1.1.2025. Se korvasi rakennusluvan, toimenpideluvan ja
 * toimenpideilmoituksen yhdellä rakentamisluvalla, ja kunta voi rakennusjärjestyksessä vapauttaa vähäiset
 * hankkeet luvasta (42 §). Vanhat rakennusjärjestykset on uusittava viimeistään 1.1.2027.
 * Tekstit kertovat vain sen, mitä kunnan asiakirja sanoo: ei arvioita siitä, mitä kunta lopulta päättää.
 */

export interface CityLocalFacts {
  slug: string;
  /** Voimassa oleva rakennusjärjestys ja sen sääntö katon tai julkisivun värin vaihdosta. */
  saanto: string;
  /** Uudistuksen tila ja kehotus kysyä rakennusvalvonnasta. */
  tilanne: string;
  /** Usein kysytyn vastaus (2–3 virkettä), eri sanoin kuin yllä. */
  ukk: string;
  /** Kunnan sivu, jolta rakennusjärjestys ja uudistuksen tila löytyvät. */
  lahde: string;
}

/** Päivä, jolloin kuntien asiakirjat luettiin. Näkyy sivulla lähdeviitteen vieressä. */
export const CITY_LOCAL_FACTS_CHECKED = "26.10.2026";

export const cityLocalFacts: CityLocalFacts[] = [
  {
    slug: "tampere",
    saanto:
      "Tampereen rakennusjärjestys on vuodelta 2014, ja osa sen määräyksistä vanheni rakentamislain tullessa voimaan 1.1.2025. Luvan tarpeen katsoo nykyään kaupungin rakennusvalvonta. Kesäkuun 2026 rakennusjärjestysehdotuksessa julkisivun ja katon värin muuttaminen ei vaadi rakentamislupaa.",
    tilanne:
      "Vapautus ei koske suojeltuja tai kulttuurihistoriallisesti arvokkaita taloja, ja asemakaavan värimääräyksiä pitää noudattaa silti. Uusi rakennusjärjestys tulee voimaan viimeistään vuoden 2027 alussa, joten varmista tilanne rakennusvalvonnasta.",
    ukk:
      "Tampereella asia riippuu talon sijainnista ja asemakaavasta. Rakennusjärjestyksen ehdotus vapauttaa värin vaihdon luvasta muilla kuin suojelluilla taloilla. Kysy varmuuden vuoksi kaupungin rakennusvalvonnasta, ennen kuin valitset uuden värin.",
    lahde: "https://www.tampere.fi/asuminen-ja-rakentaminen/rakenna-ja-korjaa/rakentamisen-maaraykset-ja-ohjeet/rakennusjarjestys",
  },
  {
    slug: "sastamala",
    saanto:
      "Sastamalan rakennusjärjestys on hyväksytty 10.11.2014 ja tullut voimaan 1.1.2015. Kaupunki valmistelee uutta, ja ehdotus on päivätty 17.2.2026.",
    tilanne:
      "Ehdotuksen kohta 23.4 vapauttaa julkisivun ja katon värisävyn muutokset luvasta asemakaavan ulkopuolella sekä kaava-alueella kaavan ja rakennustapaohjeiden rajoissa. Siihen asti kysy Sastamalan rakennusvalvonnasta.",
    ukk:
      "Sastamalassa voimassa on vielä vuoden 2015 rakennusjärjestys, ja uusi on ehdotusvaiheessa. Ehdotus vapauttaa värin vaihdon luvasta, kun kaavaa noudatetaan. Rakennusvalvonta kertoo, mitä sovelletaan juuri nyt.",
    lahde: "https://sastamala.fi/asuminen-ja-ymparisto/rakennusvalvonta-ja-lupaasiat/lait-ja-ohjeet/",
  },
  {
    slug: "hameenkyro",
    saanto:
      "Hämeenkyrön rakennusjärjestys tuli voimaan 1.1.2013. Sen taulukossa katteen tai ulkoverhouksen värin muuttamisesta piti tehdä ilmoitus koko kunnan alueella. Ilmoitusmenettely poistui rakentamislain myötä 1.1.2025.",
    tilanne:
      "Kesäkuussa 2026 päivätty ehdotus vapauttaa värisävyn muutokset luvasta asemakaavan ulkopuolella ja kaava-alueella kaavan ja rakennustapaohjeiden rajoissa. Suojellut rakennukset jäävät vapautuksen ulkopuolelle.",
    ukk:
      "Hämeenkyrössä vuoden 2013 rakennusjärjestys vaati ilmoituksen värin muutoksesta. Uusi ehdotus luopuu luvasta tavallisilla taloilla. Ennen työtä kannattaa varmistaa kunnan rakennusvalvonnasta, kumpaa sääntöä sovelletaan.",
    lahde: "https://hameenkyro.fi/palvelut/asuminen-ja-elinymparisto/rakentaminen/rakennusjarjestyksen-uudistaminen/",
  },
  {
    slug: "ylojarvi",
    saanto:
      "Ylöjärven rakennusjärjestys tuli voimaan 1.1.2022. Kaupungin ohjeen mukaan katteen ja sen värin vaihto vaatii asemakaava-alueella rakentamisluvan, jota haetaan Lupapisteessä. Haja-asutusalueella kaupunki ei vaadi lupaa. Rakennusjärjestyksen taulukossa myös ulkoverhouksen värin muutos on luvanvarainen asemakaava-alueella.",
    tilanne:
      "Keväällä 2026 julkaistussa luonnoksessa julkisivun tai katon värin muuttaminen on vapautettu luvasta. Ympäristölautakunta asetti ehdotuksen nähtäville 23.9.2026, joten sääntö voi muuttua vuoden 2027 alkuun mennessä.",
    ukk:
      "Ylöjärvellä kaupunki neuvoo hakemaan rakentamisluvan, jos katteen väri vaihtuu asemakaava-alueella. Haja-asutusalueella lupaa ei tarvita. Uusi rakennusjärjestys on valmisteilla ja voi keventää sääntöä.",
    lahde: "https://www.ylojarvi.fi/rakennusvalvonta/usein-kysytyt-kysymykset/ukk-luvanvaraisuus/",
  },
  {
    slug: "nokia",
    saanto:
      "Nokian rakennusjärjestys on tullut voimaan 22.10.2001, ja kaupunki uudistaa sitä parhaillaan. Uudistus alkoi lautakunnan päätöksellä 25.9.2024, ja uuden rakennusjärjestyksen on oltava voimassa viimeistään 1.1.2027.",
    tilanne:
      "Vanha teksti ei vastaa enää kaikilta osin uutta rakentamislakia. Katon tai seinien värin vaihdosta kysyt varmimmin Nokian rakennusvalvonnasta.",
    ukk:
      "Nokialla voimassa oleva rakennusjärjestys on yli 20 vuotta vanha, eikä se kerro suoraan nykylain mukaista vastausta. Kaupunki valmistelee uutta rakennusjärjestystä. Varmista luvan tarve rakennusvalvonnasta, jos talosi väri muuttuu.",
    lahde: "https://www.nokiankaupunki.fi/asuminen-ja-ymparisto/rakentaminen/rakennusvalvonta/rakennusjarjestyksen-uudistaminen/",
  },
  {
    slug: "forssa",
    saanto:
      "Forssan rakennusjärjestys tuli voimaan 1.1.2026. Julkisivun ja katon värisävyn muutos on vapautettu luvasta, kun noudatat kaavamääräyksiä ja rakennustapaohjeita. Värisävyn tulee olla alueelle ja rakennusajankohdalle ominainen.",
    tilanne:
      "Arvokkailla kulttuuriympäristöalueilla ja suojelluissa rakennuksissa muutos vaatii museoviraston lausunnon. Muutos ei saa heikentää talon arkkitehtuuria.",
    ukk:
      "Forssassa katon tai seinien värin vaihto ei tarvitse lupaa, kun uusi väri noudattaa kaavaa ja rakennustapaohjetta. Kulttuuriympäristöalueella tarvitaan museoviraston lausunto. Sääntö on vuoden 2026 rakennusjärjestyksessä.",
    lahde: "https://www.forssa.fi/asuminen-ja-ymparisto/rakennusvalvonta/rakennusjarjestykset/",
  },
  {
    slug: "hameenlinna",
    saanto:
      "Hämeenlinnan rakennusjärjestys tuli voimaan 1.1.2025 samaan aikaan rakentamislain kanssa. Sen 74 §:n mukaan julkisivun ja katon värisävyn muutos on vapautettu rakentamisluvasta, kun rakennus ei ole suojeltu.",
    tilanne:
      "Arvokkailla kulttuuriympäristöalueilla värin pitää sopia alueen arvoihin (51 §). Jos talosi on tällaisella alueella, kysy väristä rakennusvalvonnasta.",
    ukk:
      "Hämeenlinnassa väri saa vaihtua ilman lupaa, jos talo ei ole suojeltu. Näin sanoo vuoden 2025 rakennusjärjestyksen 74 §. Kulttuuriympäristöalueella väri ei saa heikentää alueen arvoja.",
    lahde: "https://www.hameenlinna.fi/asuminen-ja-ymparisto/tontit-ja-rakentaminen/rakentamisen-luvat/rakennusjarjestys/",
  },
  {
    slug: "huittinen",
    saanto:
      "Huittisilla on Euran ja Säkylän kanssa yhteinen rakennusjärjestys, joka tuli voimaan 17.6.2025. Maalauksen uusiminen ja julkisivuvärin muuttaminen on vapautettu luvasta. Asemakaava-alueella värisävyn muutos edellyttää kaavamääräysten ja rakennustapaohjeiden noudattamista.",
    tilanne:
      "Asemakaavan ulkopuolella värisävyn tulee olla alueelle ja rakennusajankohdalle ominainen. Suojellun tai kulttuurihistoriallisesti arvokkaan talon värin muutos vaatii poikkeamisluvan.",
    ukk:
      "Huittisissa tavallisen talon värin vaihto ei vaadi lupaa, kun väri noudattaa kaavaa. Suojeltu talo tarvitsee poikkeamisluvan. Sääntö on kolmen kunnan yhteisessä rakennusjärjestyksessä vuodelta 2025.",
    lahde: "https://www.huittinen.fi/asuminen-ja-ymparisto/kaavoitus-maankaytto-ja-rakentaminen/rakennusvalvonta/rakennusjarjestys/",
  },
  {
    slug: "akaa",
    saanto:
      "Akaan rakennusjärjestys on hyväksytty 19.12.2018 ja tullut voimaan 1.10.2019. Siinä julkisivun tai vesikatteen värin merkittävä muuttaminen oli ilmoituksenvarainen toimenpide kaikilla alueilla. Rakentamislaki poisti ilmoitusmenettelyn vuoden 2025 alussa.",
    tilanne:
      "Syyskuussa 2026 päivätty toinen ehdotus vapauttaa julkisivun ja katon värisävyn muutokset luvasta, kun muutos noudattaa kaavaa tai sopeutuu ympäristöön. Kunnes uusi rakennusjärjestys on voimassa, kysy kaupungin rakennusvalvonnasta.",
    ukk:
      "Akaassa vanha rakennusjärjestys edellytti ilmoitusta värin merkittävästä muutoksesta. Menettely poistui lain myötä, ja uusi rakennusjärjestys on ehdotusvaiheessa. Soita rakennusvalvontaan, jos katon tai seinien väri muuttuu selvästi.",
    lahde: "https://akaa.fi/asuminen-ja-ymparisto/rakennusvalvonta/rakennusjarjestys/",
  },
  {
    slug: "ikaalinen",
    saanto:
      "Ikaalisten rakennusjärjestys on ollut voimassa 1.6.2014 alkaen. Katteen värin olennainen muutos oli siinä ilmoituksenvarainen, ja ulkoverhouksen värin muutos vaati toimenpideluvan asemakaava-, suunnittelutarve- ja ranta-alueilla. Kaupungin mukaan rakentamislaki korvasi nämä menettelyt rakentamisluvalla 1.1.2025.",
    tilanne:
      "Toukokuussa 2026 lautakunnan käsittelemä ehdotus vapauttaa julkisivun ja katon värisävyn muutokset luvasta, kaava-alueella kaavan ja rakennustapaohjeiden rajoissa. Vapautus ei koske suojeltuja rakennuksia.",
    ukk:
      "Ikaalisissa seinien värin vaihto on vanhan rakennusjärjestyksen mukaan ollut luvanvaraista kaava-alueilla. Uusi ehdotus keventää sääntöä. Kysy Ikaalisten rakennusvalvonnasta, mitä juuri nyt sovelletaan.",
    lahde: "https://ikaalinen.fi/asuminen-ja-ymparisto/asuminen-rakentaminen-ja-tontit/rakentamisen-luvat/rakentamisen-luvat/",
  },
  {
    slug: "juupajoki",
    saanto:
      "Juupajoen rakennusjärjestys on vuodelta 2003, ja kunta valmistelee uutta. Kunnanhallitus hyväksyi luonnoksen 27.4.2026, ja se oli nähtävillä 4.5.–5.6.2026.",
    tilanne:
      "Luonnoksen mukaan rakennuskohteen pitää olla värisävyltään hillitty ja maisemaan sopeutuva. Jos kaava tai suojelupäätös kieltää julkisivun tyylin muuttamisen, myös värin muutos lasketaan sellaiseksi. Luvan tarpeen varmistat Juupajoen tekniseltä toimelta.",
    ukk:
      "Juupajoella nykyinen rakennusjärjestys on yli 20 vuotta vanha, ja uusi on luonnosvaiheessa. Luonnos toivoo hillittyjä, maisemaan sopivia värejä. Kysy luvan tarve kunnasta, ennen kuin vaihdat katon tai seinän värin.",
    lahde: "https://juupajoki.fi/asuminen-ja-ymparisto/rakentaminen/rakennusjarjestys/",
  },
  {
    slug: "kangasala",
    saanto:
      "Kangasalan uusi rakennusjärjestys tuli voimaan 22.7.2025, ja se on jo rakentamislain mukainen. Sen 6.1 §:n mukaan julkisivun ja katon värin ja materiaalin muuttaminen on vapautettu luvasta. Ehtona on, ettei asemakaava tai rakentamistapaohje määrää toisin.",
    tilanne:
      "Vapautus ei koske kaavassa tai lain nojalla suojeltuja kohteita. Tarkista siis oman alueesi kaavamerkinnät ennen värin vaihtoa, Kangasalan rakennusvalvonta neuvoo tarvittaessa.",
    ukk:
      "Kangasalla värin vaihto ei pääsääntöisesti tarvitse lupaa, koska rakennusjärjestys vapauttaa julkisivun ja katon värimuutokset. Poikkeus on alue, jonka asemakaava tai rakentamistapaohje rajaa värit. Kaavamerkinnät saat rakennusvalvonnasta.",
    lahde: "https://www.kangasala.fi/asu-hyvin/rakennusvalvonta-tontit-ja-asuntoasiat/rakennusvalvonta/",
  },
  {
    slug: "kihnio",
    saanto:
      "Kihniön rakennusjärjestys on tullut voimaan 1.7.2014. Kunta on julkaissut uuden rakennusjärjestyksen luonnoksen, joka on päivätty 1.6.2026.",
    tilanne:
      "Luonnoksen mukaan julkisivun ja katon värisävyn muutos on vapautettu luvasta asemakaavan ulkopuolella sekä kaava-alueella kaavan ja rakennustapaohjeiden mukaisena. Suojeltuja rakennuksia vapautus ei koske.",
    ukk:
      "Kihniössä vuoden 2014 rakennusjärjestys on vielä voimassa, ja uusi luonnos on kesäkuulta 2026. Luonnos vapauttaa värin vaihdon luvasta tavallisissa taloissa. Varmista ajantasainen tilanne Kihniön rakennusvalvonnasta.",
    lahde: "https://www.kihnio.fi/fi/asuminen-ja-ymparisto/maankaytto-ja-rakennusvalvonta/rakennusvalvonta",
  },
  {
    slug: "lempaala",
    saanto:
      "Lempäälän voimassa oleva rakennusjärjestys on tullut voimaan 19.6.2019 eli ennen uutta rakentamislakia. Siksi värin vaihdon luvan tarve kannattaa kysyä suoraan kunnan rakennusvalvonnasta.",
    tilanne:
      "Kunta uudistaa rakennusjärjestystä, ja ehdotus oli nähtävillä kesällä 2026 muistutuksia varten 14.8.2026 asti. Uuden version pitää olla voimassa viimeistään 1.1.2027.",
    ukk:
      "Lempäälässä nykyinen rakennusjärjestys on vuodelta 2019, ja uusi on tulossa vuoden 2027 alkuun mennessä. Tilanne elää, joten soita rakennusvalvontaan ennen kuin vaihdat katon tai seinien värin.",
    lahde: "https://www.lempaala.fi/asuminen-ja-ymparisto/rakentaminen/rakennusvalvonta/rakennusjarjestys/",
  },
  {
    slug: "mantta-vilppula",
    saanto:
      "Mänttä-Vilppulan rakennusjärjestys tuli voimaan 11.1.2022. Sen mukaan rakennuksen värityksen muuttamisesta tehtiin asemakaava-alueella ilmoitus, muualla ei tarvittu ennakkovalvontaa. Rakentamislain myötä ilmoitusmenettely poistui 1.1.2025.",
    tilanne:
      "Kaupunki valmistelee uutta rakennusjärjestystä, ja sen luonnos oli nähtävillä 22.4.–22.5.2026. Luonnoksen lupataulukossa värin muutos ei ole luvanvarainen, mutta vapautus ei koske suojeltuja rakennuksia.",
    ukk:
      "Mänttä-Vilppulassa vanha rakennusjärjestys pyysi ilmoituksen värin muutoksesta asemakaava-alueella. Tuleva rakennusjärjestys ei vaadi lupaa värin vaihtoon. Soita kaupungin rakennusvalvontaan, jos talosi on keskustan kaava-alueella tai suojeltu.",
    lahde: "https://manttavilppula.fi/asuminen-ja-ymparisto/rakennusvalvonta/rakennusjarjestys-ja-taksat/",
  },
  {
    slug: "orivesi",
    saanto:
      "Oriveden rakennusjärjestys tuli voimaan 22.12.2021. Sen taulukossa katteen tai ulkoverhouksen värityksen muutos vaati toimenpideilmoituksen asemakaava-, yleiskaava- ja ranta-alueilla. Muilla alueilla ilmoitusta ei tarvittu.",
    tilanne:
      "Kaupungin rakennusjärjestysehdotus on päivätty 8.6.2026, ja uuden on tarkoitus tulla voimaan vuonna 2027. Ehdotus vapauttaa värisävyn muutokset luvasta asemakaavan ulkopuolella ja kaava-alueella kaavan sekä rakennustapaohjeiden rajoissa.",
    ukk:
      "Orivedellä nykyinen rakennusjärjestys on vuodelta 2021 ja edellytti toimenpideilmoitusta värin muutoksesta kaava-alueilla. Ilmoitusmenettely poistui lain myötä, ja uusi rakennusjärjestys on ehdotusvaiheessa. Kysy rakennusvalvonnasta, ennen kuin vaihdat värin.",
    lahde: "https://orivesi.fi/asukkaalle/asuminen-rakentaminen-ja-ymparisto/rakentaminen/rakennusjarjestys/",
  },
  {
    slug: "parkano",
    saanto:
      "Parkanon kaupunginvaltuusto hyväksyi uuden rakennusjärjestyksen 28.9.2026, ja se tulee voimaan 1.1.2027. Siihen asti voimassa on vuoden 2014 rakennusjärjestys.",
    tilanne:
      "Uuden rakennusjärjestyksen kohta 23.4 vapauttaa julkisivun ja katon värisävyn muutokset luvasta asemakaavan ulkopuolella. Kaava-alueella vapautus edellyttää kaavamääräysten ja rakennustapaohjeiden noudattamista, eikä se koske suojeltuja rakennuksia.",
    ukk:
      "Parkanossa vuoden 2027 alussa voimaan tuleva rakennusjärjestys vapauttaa värin vaihdon luvasta, kun kaavaa noudatetaan. Vuoden 2026 loppuun asti sovelletaan vanhaa rakennusjärjestystä vuodelta 2014. Siksi kysy rakennusvalvonnasta ennen työtä.",
    lahde: "https://parkano.fi/asuminenjaymparisto/rakentaminen/rakennusjarjestys/",
  },
  {
    slug: "pirkkala",
    saanto:
      "Pirkkalan uusi rakennusjärjestys tuli voimaan 9.6.2026. Siinä omakotitalon, paritalon ja vapaa-ajan asunnon julkisivun ja katon värin tai materiaalin muuttaminen on vapautettu rakentamisluvasta. Vapautus koskee myös näiden talojen talousrakennuksia.",
    tilanne:
      "Vapautukset eivät koske asemakaavassa tai lain nojalla suojeltua rakennusta eivätkä arvokkaiksi todettuja kohteita. Asemakaavan värimääräykset pätevät silti, ja epäselvässä kohdassa Pirkkalan rakennusvalvonta neuvoo.",
    ukk:
      "Pirkkalassa et tarvitse lupaa omakotitalon katon tai julkisivun värin vaihtoon, kun talo ei ole suojeltu. Sääntö on kesäkuussa 2026 voimaan tulleessa rakennusjärjestyksessä. Tarkista vielä, ettei asemakaava määrää väriä.",
    lahde: "https://www.pirkkala.fi/wp-content/uploads/sites/4/2026/05/Rakennusjarjestys_2026.pdf",
  },
  {
    slug: "palkane",
    saanto:
      "Pälkäneen kunnanvaltuusto hyväksyi uuden rakennusjärjestyksen 7.9.2026, ja se tuli voimaan 11.9.2026. Julkisivun ja katon värisävyn muutokset on vapautettu luvasta, ellei asemakaavasta muuta johdu. Värisävyn pitää olla alueelle ja talon rakennusajalle ominainen.",
    tilanne:
      "Vapautus ei koske suojeltuja rakennuksia eikä alueita, joilla on aluesuojelumerkintä. Valtakunnallisesti arvokkailla RKY-alueilla värityksen tulee noudattaa rakentamisajankohdalle tyypillisiä värejä.",
    ukk:
      "Pälkäneellä tuore rakennusjärjestys vapauttaa katon ja julkisivun värin vaihdon luvasta tavallisilla taloilla. Asemakaava voi silti rajata värejä, ja suojellut talot ovat poikkeus. Valitse sävy, joka sopii alueelle ja talon ikään.",
    lahde: "https://www.palkane.fi/asuminen-ja-ymparisto/rakennusvalvonta/rakennusjarjestyksen-uudistaminen-2/",
  },
  {
    slug: "ruovesi",
    saanto:
      "Ruoveden rakennusjärjestys tuli voimaan 17.5.2010. Siinä rakennuksen tai sen osan värityksen muuttaminen vaati toimenpideluvan asemakaava- ja yleiskaava-alueilla ja ilmoituksen muualla. Nämä menettelyt poistuivat rakentamislain myötä 1.1.2025.",
    tilanne:
      "Uusi rakennusjärjestys on lain mukaan tulossa vuoden 2027 alkuun mennessä. Rakennustarkastaja neuvoo lupa-asioissa puhelimitse ja Lupapisteen kautta.",
    ukk:
      "Ruovedellä vanha rakennusjärjestys vuodelta 2010 vaati luvan värin muutokseen kaava-alueilla. Laki muuttui vuonna 2025, ja kunnan uutta rakennusjärjestystä odotetaan. Varmista luvan tarve Ruoveden rakennustarkastajalta.",
    lahde: "https://www.ruovesi.fi/asuminen-ja-ymparisto/tontit-ja-rakentaminen/rakennusvalvonta",
  },
  {
    slug: "urjala",
    saanto:
      "Urjalan kunnanvaltuusto hyväksyi uuden rakennusjärjestyksen 16.3.2026, ja se tuli voimaan 4.5.2026. Julkisivun ja katon värisävyn tai materiaalin muutokset on vapautettu luvasta, kun muutos noudattaa kaavamääräyksiä ja rakennustapaohjeita.",
    tilanne:
      "Suojelukohteissa ja arvokkaassa kulttuuriympäristössä kannattaa kysyä kunnan rakennusvalvonnasta ennen värin valintaa. Urjalan rakennusjärjestys on jo rakentamislain mukainen.",
    ukk:
      "Urjalassa toukokuussa 2026 voimaan tullut rakennusjärjestys vapauttaa katon ja seinien värin vaihdon luvasta. Ehtona on, että väri noudattaa kaavaa ja rakennustapaohjetta. Kulttuuriympäristöalueella varmista asia kunnasta.",
    lahde: "https://www.urjala.fi/asuminen-ja-ymparisto/rakentaminen/rakennusvalvonta/",
  },
  {
    slug: "valkeakoski",
    saanto:
      "Valkeakosken rakennusjärjestys tuli voimaan 1.1.2026. Omakoti- ja paritalon julkisivun ja katon värisävyn muutos on vapautettu luvasta, kun väri pysyy määräysten ja rakennustapaohjeen mukaisena. Sama koskee niiden talousrakennuksia. Suojellut rakennukset eivät kuulu vapautuksen piiriin.",
    tilanne:
      "Jos alueella ei ole rakentamistapaohjetta, julkisivuväri pitää hyväksyttää rakennusvalvonnalla. RKY-alueilla värin pitää vastata ohjetta tai talon rakennusajan tyypillisiä värejä.",
    ukk:
      "Valkeakoskella väri saa vaihtua ilman lupaa, jos uusi sävy noudattaa alueen rakennustapaohjetta. Ilman ohjetta väri hyväksytetään rakennusvalvonnassa. Tämä on vuoden 2026 alussa voimaan tulleen rakennusjärjestyksen sääntö.",
    lahde: "https://www.valkeakoski.fi/uploads/sites/1/2026/01/de6c1708-valkeakosken-rakennusjarjestys-2025-hyvaksytty_nettiin.pdf",
  },
  {
    slug: "vesilahti",
    saanto:
      "Vesilahden rakennusjärjestys on hyväksytty 27.9.2004, ja suunnittelutarvealueiden osalta sitä päivitettiin 22.4.2015. Kunnan mukaan rakennusjärjestyksen uudistaminen on käynnissä rakentamislain vuoksi.",
    tilanne:
      "Uuden rakentamislain myötä vanhat lupa- ja ilmoitusmenettelyt ovat muuttuneet. Kysy luvan tarve Vesilahden rakennusvalvonnasta, ennen kuin sovit maalauksesta.",
    ukk:
      "Vesilahdella rakennusjärjestys on vuodelta 2004, ja kunta uudistaa sitä parhaillaan. Uuden on oltava voimassa viimeistään 1.1.2027. Ennen värin vaihtoa kannattaa soittaa kunnan rakennusvalvontaan.",
    lahde: "https://www.vesilahti.fi/asuminen-ja-ymparisto/rakentaminen/",
  },
  {
    slug: "virrat",
    saanto:
      "Virtain rakennusjärjestys tuli voimaan 1.10.2003. Sen taulukossa rakennuksen värityksen muuttamisesta piti tehdä ilmoitus kaava-alueella, ja katemateriaalin vaihto vaati toimenpideluvan. Kaava-alueen ulkopuolella värin vaihto ei vaatinut mitään.",
    tilanne:
      "Kaupunginhallitus hyväksyi uuden rakennusjärjestyksen ehdotuksen 28.9.2026, ja se on nähtävillä 8.10.–6.11.2026. Ehdotuksen on tarkoitus tulla voimaan 1.1.2027, eikä siinä ole listattu värin vaihtoa luvanvaraiseksi.",
    ukk:
      "Virroilla vuoden 2003 rakennusjärjestys vaati ilmoituksen värin muutoksesta kaava-alueella. Uusi rakennusjärjestys on nähtävillä syksyllä 2026 ja tulee voimaan vuoden 2027 alussa. Kysy Virtain rakennusvalvonnasta, jos väri muuttuu.",
    lahde: "https://www.virrat.fi/asuminen-ja-ymparisto/kaavoitus-ja-rakentaminen/kaavoitus/rakennusjarjestys/",
  },
];

export const getCityLocalFacts = (slug: string): CityLocalFacts | undefined => cityLocalFacts.find((c) => c.slug === slug);
