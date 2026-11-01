import { Link } from "react-router-dom";
import Rytmi, { merkitse } from "@/components/Rytmi";
import ArvosteluNosto from "@/components/ArvosteluNosto";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import ResponsiveImage from "@/components/ResponsiveImage";
import FAQSection from "@/components/FAQSection";
import ArtikkeliRivit from "@/components/ArtikkeliRivit";
import ToimintaKutsu from "@/components/ToimintaKutsu";
import { KayntiPalkki } from "@/components/KutsuPalkit";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import ServiceContactSection from "@/components/ServiceContactSection";
import { PriceSectionHeading } from "@/components/hinnat/PriceSections";
import { getStaticRouteSeo } from "@/data/seo";
import { TAKUU } from "@/data/company";
import type { Tyovaihe, LyhyestiSisalto } from "@/data/tyovaiheet";

/**
 * Taloyhtiösivu (Eerik 29.10.2026). Faktat Eerikiltä 29.10.2026: tiilikaton pinnoitus ja talon maalaus kaikille
 * taloyhtiötyypeille (rivi-, pari-, luhti- ja kerrostalot); Eerik katoilla, Eemil seinillä, samat tekijät alusta
 * loppuun; tehtyjä taloyhtiökohteita ei nimetä (tehty muiden yritysten nimissä, työ sama mutta laajempi);
 * suuremmissa kohteissa edullisempi hinta; pienissä ja keskikokoisissa yhtiöissä riittää usein yhtiökokous ja
 * kirjallinen tarjous; WhatsApp-ryhmä; lopputarkastus taloyhtiön valitseman tahon kanssa (valvoja tai hallituksen
 * jäsen); kesto katto 2 päivää ja seinät 3–5 päivää per rakennus; edut: ketteryys, samat tekijät, laatu, hinta,
 * selkeä viestintä. Takuut samat kuin muualla (company.ts). Kotitalousvähennys: vero.fi, kotitalousvähennys
 * asunto-osakeyhtiössä (docs/taloyhtiot-kilpailijat-2026-10-29.md). Kilpailijavertailu samassa tiedostossa.
 * Ei päävalikon kohtaa (ei mahdu): linkit pudotusvalikoissa, alatunnisteessa, etusivulla ja UKK:ssa.
 */
const PATH = "/taloyhtiot";

const lyhyesti: LyhyestiSisalto = {
  facts: [
    { label: "Kohteet", value: "Rivi-, pari- ja\nkerrostalot" },
    { label: "Kesto per rakennus", value: "Katto 2 pv\nSeinät 3–5 pv" },
    { label: "Takuu", value: `Katto ${TAKUU.pinnoitus}\nSeinät ${TAKUU.maalaus}` },
    { label: "Tekijät", value: "Eerik katot\nEemil seinät" },
  ],
  note: "Pienessä ja keskikokoisessa yhtiössä riittää usein yhtiökokouksen päätös ja kirjallinen tarjous.",
};

const vaiheet: Tyovaihe[] = [
  {
    title: "Yhteydenotto",
    text: "Isännöitsijä, hallituksen jäsen tai osakas ottaa yhteyttä. Sovimme käynnin, yleensä samalla viikolla.",
  },
  {
    title: "Ilmainen kuntotarkastus",
    text: "Eerik katsoo katot ja Eemil seinät paikan päällä: tiilet, saumat, läpiviennit ja aluskate, seinillä maalin kunto ja pohjatöiden määrä. Käynti on ilmainen.",
  },
  {
    title: "Kirjallinen tarjous",
    text: "Saatte kirjallisen tarjouksen kiinteällä hinnalla rakennus kerrallaan eriteltynä. Mukaan liitämme ne asiakirjat, joita taloyhtiö pyytää.",
  },
  {
    title: "Taloyhtiön päätös",
    text: "Taloyhtiö päättää urakasta tarjouksen pohjalta. Isommassa yhtiössä toimimme hallituksen ja isännöitsijän ohjeiden mukaan.",
  },
  {
    title: "Sopimus ja aikataulu",
    text: "Teemme kirjallisen sopimuksen ja sovimme aikataulun. Katto vie noin 2 päivää ja seinät 3–5 päivää rakennusta kohden.",
  },
  {
    title: "Asukastiedote",
    text: "Asukkaat saavat tiedotteen ennen aloitusta. Perustamme WhatsApp-ryhmän, jossa kerromme, mikä rakennus on työn alla ja milloin.",
  },
  {
    title: "Työ rakennus kerrallaan",
    text: "Teemme yhden rakennuksen valmiiksi ennen seuraavaa, jotta haitta asukkaille on lyhyt.",
  },
  {
    title: "Lopputarkastus ja takuu",
    text: "Käymme työn läpi taloyhtiön valitseman henkilön kanssa, valvojan tai hallituksen jäsenen. Takuu on kirjallinen.",
  },
];

const faq = [
  {
    question: "Mitä teette taloyhtiöille?",
    answer: "Tiilikaton pinnoituksen ja talon ulkomaalauksen. Kohde voi olla rivitalo, paritalo, luhtitalo tai kerrostalo. Katon ja seinät voi tilata samalla kertaa.",
  },
  {
    question: "Kuka tekee työn ja kuka hoitaa yhteydenpidon?",
    answer: "Eerik vastaa katoista ja Eemil seinistä. Isännöitsijä tai hallitus asioi suoraan heidän kanssaan.",
  },
  {
    question: "Mitä taloyhtiön katon pinnoitus tai maalaus maksaa?",
    answer: "Hinta on kirjallisessa tarjouksessa kiinteänä ja rakennus kerrallaan eriteltynä. Suuremmissa kohteissa hinta on rakennusta ja neliötä kohden edullisempi kuin omakotitalossa, koska työ tehdään yhdellä kertaa. Tarjouksen saatte ilmaisen kuntotarkastuksen jälkeen.",
  },
  {
    question: "Tarvitaanko yhtiökokouksen päätös?",
    answer: "Se riippuu taloyhtiöstä ja sen yhtiöjärjestyksestä. Pienessä ja keskikokoisessa yhtiössä riittää usein yhtiökokouksen päätös ja meidän kirjallinen tarjouksemme. Annamme tarjouksen niin, että se on helppo viedä kokoukseen.",
  },
  {
    question: "Miten asukkaille tiedotetaan?",
    answer: "Asukkaat saavat tiedotteen ennen aloitusta, ja perustamme WhatsApp-ryhmän työn ajaksi. Teemme yhden rakennuksen valmiiksi ennen seuraavaa, jotta haitta on lyhyt.",
  },
  {
    question: "Kuka tarkastaa valmiin työn?",
    answer: "Se on taloyhtiön valinta: ulkopuolinen valvoja tai hallituksen jäsen. Käymme työn läpi yhdessä, ja takuu alkaa siitä.",
  },
  {
    question: "Saavatko osakkaat kotitalousvähennyksen taloyhtiön teettämästä työstä?",
    answer:
      'Eivät yleensä. Verohallinnon mukaan osakas saa vähennyksen vain töistä, joiden teettäminen kuuluu lain tai yhtiöjärjestyksen mukaan osakkaalle. Katto ja ulkoseinät kuuluvat yleensä taloyhtiölle, eikä vastikkeella maksetusta työstä saa vähennystä. Lue lisää: <a href="https://vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennys-asuntoosakeyhtiossa/" target="_blank" rel="noopener noreferrer">vero.fi, kotitalousvähennys asunto-osakeyhtiössä</a>.',
  },
  {
    question: "Milloin tarjous kannattaa pyytää?",
    answer: "Mieluiten syksyllä tai talvella, kun yhtiökokous ehtii päättää ennen kesää. Työt teemme huhti–toukokuusta elo–syyskuuhun, ja alkukesän ajat täyttyvät ensin.",
  },
];

const Kuvat = merkitse(
  () => (
    <section className="section-padding osio">
      <div className="section-container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="lohko-otsake mb-3">Työn jälki</span>
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">Sama työ kuin omakotitalossa, vain laajempi</h2>
        </div>
        <ul className="mx-auto grid max-w-5xl list-none gap-6 p-0 sm:grid-cols-3">
          {[
            { base: "tiilikaton-pinnoitus-tampere-tummanharmaa-tiilikatto-jalkeen", alt: "Tummanharmaaksi pinnoitettu tiilikatto Tampereella", caption: "Tiilikatto pinnoitettu, Tampere." },
            { base: "talon-maalaus-valkoinen-puutalo-sivuseina-jalkeen", alt: "Valkoiseksi maalattu puutalon sivuseinä", caption: "Seinät maalattu pensselillä." },
            { base: "talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen", alt: "Vaalea puutalo, jonka seinät on maalattu ja tiilikatto pinnoitettu, Tampere", caption: "Katto ja seinät samalla kertaa, Tampere." },
          ].map((k) => (
            <li key={k.base} className="kortti overflow-hidden">
              <ResponsiveImage baseName={k.base} alt={k.alt} className="aspect-[4/3] w-full object-cover" sizes="(max-width: 640px) 100vw, 320px" width={800} height={600} />
              <p className="px-5 py-4 text-sm text-muted-foreground">{k.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  ),
  "sininen",
);

const crumbs = [{ name: "Taloyhtiöille" }];

const Taloyhtiot = () => {
  const seo = getStaticRouteSeo(PATH);
  return (
    <Rytmi>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema
        name="Tiilikaton pinnoitus ja talon maalaus taloyhtiöille"
        alternateNames={["Taloyhtiön katon pinnoitus", "Taloyhtiön julkisivumaalaus", "Rivitalon maalaus", "Rivitalon katon pinnoitus"]}
        area="Pirkanmaa"
        areaType="AdministrativeArea"
        description={seo.description}
      />

      <PageHero
        eyebrow="Taloyhtiöille · Pirkanmaa"
        title={
          <>
            Tiilikaton pinnoitus ja talon maalaus <span className="text-accent-ink">taloyhtiöille</span>
          </>
        }
        lead="Pinnoitamme taloyhtiöiden tiilikatot ja maalaamme ulkoseinät Pirkanmaalla ja lähikunnissa. Rivitalot, paritalot, luhtitalot ja kerrostalot. Eerik tekee katot ja Eemil seinät, ja samat tekijät ovat paikalla alusta loppuun. Kuntotarkastus on ilmainen, ja tarjous on kirjallinen ja kiinteä."
        primary={{ to: "/tarjouspyynto/", label: "Pyydä tarjous taloyhtiölle" }}
        secondary={{ to: "/ilmainen-katon-kuntotarkastus/", label: "Ilmainen kuntotarkastus" }}
        trust="yleinen"
        image={{ base: "talon-maalaus-vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen", alt: "Vaalea iso puutalo, jonka ulkoseinät on maalattu" }}
        badge={{ title: "Samat tekijät", text: "Eerik katoilla, Eemil seinillä, alusta loppuun." }}
        breadcrumbs={crumbs}
      />

      <Lyhyesti content={lyhyesti} />

      <section className="section-padding osio">
        <div className="section-container grid items-start gap-10 lg:grid-cols-[minmax(0,40rem)_minmax(16rem,24rem)] lg:justify-center lg:gap-16">
          <div>
            <span className="lohko-otsake mb-3">Miksi Pintanen</span>
            <h2 className="mb-5 font-heading text-3xl font-bold text-navy md:text-4xl">Pieni yritys, joka hoitaa taloyhtiön urakan ketterästi</h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Taloyhtiön katto tai seinät ovat sama työ kuin omakotitalossa, vain laajempi. Eerik ja Eemil ovat tehneet taloyhtiöiden
                kattoja ja seiniä, ja työ etenee samalla tavalla: pesu, pohjatyöt ja kaksi kerrosta maalia katolla, homepesu, kaavinta,
                pohjamaali ja pintamaali pensselillä seinillä.
              </p>
              <p>
                Meillä ei ole välikäsiä. Isännöitsijä ja hallitus asioivat suoraan tekijöiden kanssa, ja sama ihminen, joka antaa
                tarjouksen, on katolla ja seinällä. Urakkaan ei tarvita raskasta koneistoa.
              </p>
              <p>
                Katso, miten{" "}
                <Link to="/tiilikaton-pinnoitus-pirkanmaa/" className="font-semibold text-primary hover:underline">
                  tiilikaton pinnoitus
                </Link>{" "}
                ja{" "}
                <Link to="/talon-maalaus-pirkanmaa/" className="font-semibold text-primary hover:underline">
                  talon maalaus
                </Link>{" "}
                tehdään.
              </p>
            </div>
          </div>
          <aside className="kortti p-6" aria-label="Edut">
            <span className="lohko-otsake mb-3">Mitä saatte</span>
            <ul className="space-y-3 text-foreground">
              {[
                "Ketterä aikataulu: työ alkaa, kun päätös on tehty, ei jonotusta ison firman kalenteriin.",
                "Samat tekijät alusta loppuun: Eerik katoilla, Eemil seinillä.",
                "Selkeä viestintä: tiedote, WhatsApp-ryhmä ja yksi numero, johon soittaa.",
                "Kiinteä hinta kirjallisessa tarjouksessa, rakennus kerrallaan eriteltynä.",
                `Kirjallinen takuu: katto ${TAKUU.pinnoitus}, seinät ${TAKUU.maalaus}.`,
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="kortti-numero !h-7 !w-7 !text-xs" aria-hidden="true">
                    ✓
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <ToimintaKutsu teksti={{ lause: "Haluatko tarjouksen taloyhtiönne katosta tai julkisivusta?", nappi: "Pyydä tarjous taloyhtiölle" }} to="/tarjouspyynto/" />

      <Kuvat />

      <ProcessList
        title="Näin urakka etenee taloyhtiössä"
        intro="Kahdeksan vaihetta yhteydenotosta takuuseen. Pienessä yhtiössä osa vaiheista hoituu yhdellä kokouksella."
        steps={vaiheet}
        cta={{ to: "/tarjouspyynto/", label: "Pyydä tarjous taloyhtiölle" }}
      />

      {/* Arvostelunosto: sijoitus ja valinta src/data/arvostelusijoitus.ts */}
      <ArvosteluNosto polku={PATH} />

      <section className="section-padding osio">
        <div className="section-container mx-auto max-w-3xl text-center">
          <PriceSectionHeading
            eyebrow="Hinta"
            title="Hinta tarjouksella, suuremmissa kohteissa edullisempi"
            intro="Taloyhtiön katto tai seinät hinnoitellaan rakennus kerrallaan. Mitä enemmän kattoa tai seinää tehdään yhdellä kertaa, sitä edullisempi hinta on rakennusta kohden. Saatte kiinteän hinnan kirjallisessa tarjouksessa ilmaisen kuntotarkastuksen jälkeen."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/" className="font-semibold text-primary hover:underline">
              Tiilikaton pinnoituksen hinta
            </Link>
            <Link to="/talon-maalaus-hinta-pirkanmaa/" className="font-semibold text-primary hover:underline">
              Talon maalauksen hinta
            </Link>
          </div>
        </div>
      </section>

      <ArtikkeliRivit categories={["katto", "maalaus"]} />
      <KayntiPalkki nappi={{ to: "/tarjouspyynto/", label: "Pyydä tarjous taloyhtiölle" }} otsikko="Pyydä tarjous taloyhtiölle" teksti="Käymme katsomassa taloyhtiön katon tai julkisivun paikan päällä ja annamme kirjallisen tarjouksen kiinteällä hinnalla." />
      <FAQSection items={faq} title="Usein kysyttyä taloyhtiöiltä" />
      <ServiceContactSection variant="general" />
      <ToimintaAlueetBanner />
    </Rytmi>
  );
};

export default Taloyhtiot;
