import { Link } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import ArvosteluNosto from "@/components/ArvosteluNosto";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import FAQSection from "@/components/FAQSection";
import ArtikkeliRivit from "@/components/ArtikkeliRivit";
import { KayntiPalkki, LaskuriPalkki } from "@/components/KutsuPalkit";
import ServiceContactSection from "@/components/ServiceContactSection";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import { PriceSectionHeading } from "@/components/hinnat/PriceSections";
import { staticSeo, HERO_BASE } from "@/data/seo";
import { KOTITALOUSVAHENNYS } from "@/data/company";
import { PINNOITUS_HINTA, MAALAUS_HINTA } from "@/data/tyovaiheet";

/**
 * Kotitalousvähennys katon pinnoituksesta ja talon maalauksesta (yöajo 27.10.2026, paketti 5).
 * Luvut ovat Verohallinnon sivulta (lähteet sivun lopussa ja docs/lahteet-kotitalousvahennys-2026-10-27.md).
 * Ei laskuesimerkkejä (hintasääntö): selitys, linkit hintalaskuriin ja hintasivuille sekä yleinen
 * yhteydenottolomake (Eerik 26.10.2026, yöajon kysymys 13).
 */
const lahteet = [
  { label: "Verohallinto: Kotitalousvähennyksen määrä", url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara" },
  { label: "Verohallinto: Mistä töistä vähennyksen saa", url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/mista-toista-vahennyksen-saa/" },
];

const faqItems = [
  {
    // Ei samaa kysymystä kuin sivun H2 (laaja auditointi 30.10.2026, luku 5).
    question: "Muuttuuko kotitalousvähennys vuonna 2027?",
    answer: "Ei. Verohallinnon mukaan määrä ja omavastuu ovat samat vuosina 2026 ja 2027.",
  },
  {
    question: "Saako tiilikaton pinnoituksesta kotitalousvähennyksen?",
    answer: 'Kyllä. Katon pinnoitus on kodin kunnossapitoa, josta vähennyksen saa. Työn osuus on laskussamme eriteltynä. Hinnat näet sivulta <a href="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</a>.',
  },
  {
    question: "Saako talon maalauksesta kotitalousvähennyksen?",
    answer: 'Kyllä. Omakotitalon ulkomaalaus on kunnossapitoa, josta vähennyksen saa. Hinnat näet sivulta <a href="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</a>.',
  },
  {
    question: "Saako vähennyksen myös mökin katosta tai seinistä?",
    answer: "Kyllä. Verohallinnon mukaan samat säännöt koskevat vapaa-ajan asuntoa, jota käytät itse.",
  },
  {
    question: "Mistä vähennystä ei saa?",
    answer: "Vähennyksen saa vain työn osuudesta. Maaleista ja muista tarvikkeista sitä ei saa. Siksi työn osuus on laskussamme omana rivinään.",
  },
  {
    question: "Milloin vähennys pitää hakea?",
    answer: "Vähennys kuuluu sille vuodelle, jona maksat laskun. Voit ilmoittaa sen OmaVerossa heti verokortille tai myöhemmin veroilmoituksessa.",
  },
];

const crumbs = [{ name: "Kotitalousvähennys" }];

const Kotitalousvahennys = () => {
  const seo = staticSeo["/kotitalousvahennys"];
  return (
    <Rytmi>
      <SEO {...seo} breadcrumbs={crumbs} />

      <PageHero
        eyebrow="Kotitalousvähennys · 2026 ja 2027"
        title={
          <>
            Kotitalousvähennys katon pinnoituksesta ja <span className="text-accent-ink">talon maalauksesta</span>
          </>
        }
        lead={
          <>
            {KOTITALOUSVAHENNYS} Vähennyksen saa yritykseltä ostetun työn osuudesta.{" "}
            <strong className="text-foreground">Työn osuus on laskussamme eriteltynä.</strong>
          </>
        }
        primary={{ to: "/hintalaskuri/", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
        trust="yleinen"
        image={{ base: HERO_BASE.alue, alt: "Maalattu puutalo ja pinnoitettu tiilikatto Tampereella" }}
        badge={null}
        breadcrumbs={crumbs}
      />

      <section className="section-padding osio">
        <div className="section-container max-w-3xl mx-auto">
          <PriceSectionHeading title="Paljonko kotitalousvähennys on vuosina 2026 ja 2027?" />
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Saat vähentää <strong className="text-foreground">40 % työn osuudesta</strong>. Työn osuuteen lasketaan mukaan
              arvonlisävero. Vähennystä saa enintään <strong className="text-foreground">2 100 euroa vuodessa</strong> yhdeltä
              ihmiseltä, ja omavastuu on <strong className="text-foreground">150 euroa vuodessa</strong>.
            </p>
            <p>
              Verohallinnon mukaan määrä ja omavastuu ovat samat vuosina 2026 ja 2027. Vähennys on jokaisen oma, joten pariskunta
              voi jakaa laskun ja saada yhteensä 4 200 euroa.
            </p>
          </div>
        </div>
      </section>
      <LaskuriPalkki />

      <section className="section-padding osio">
        <div className="section-container max-w-3xl mx-auto">
          <PriceSectionHeading title="Mistä töistä vähennyksen saa?" />
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Vähennyksen saa, kun työ on kodin kunnossapitoa tai perusparannusta. Tiilikaton pinnoitus ja talon ulkomaalaus ovat
              juuri tällaisia töitä. Samat säännöt koskevat vapaa-ajan asuntoa, jota käytät itse.
            </p>
            <p>
              Vähennyksen saa vain työstä. Maaleista ja muista tarvikkeista sitä ei saa. Yrityksen pitää kuulua
              ennakkoperintärekisteriin, ja Pintanen kuuluu siihen.
            </p>
            <p>
              Tiilikaton pinnoitus maksaa meillä yleensä {PINNOITUS_HINTA} ja talon maalaus {MAALAUS_HINTA}. Suuntaa antavan hinnan
              omalle kohteellesi saat{" "}
              <Link to="/hintalaskuri/" className="text-primary font-semibold hover:underline">
                hintalaskurilla
              </Link>
              . Hintaesimerkit ovat sivuilla{" "}
              <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/" className="text-primary font-semibold hover:underline">
                tiilikaton pinnoituksen hinta
              </Link>{" "}
              ja{" "}
              <Link to="/talon-maalaus-hinta-pirkanmaa/" className="text-primary font-semibold hover:underline">
                talon maalauksen hinta
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding osio">
        <div className="section-container max-w-3xl mx-auto">
          <PriceSectionHeading title="Miten kotitalousvähennystä haetaan?" />
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Säilytä lasku ja kuitti maksusta. Ilmoita vähennys OmaVerossa: jos ilmoitat sen verokortille, veroprosenttisi pienenee
              heti, ja jos ilmoitat sen veroilmoituksessa, se otetaan huomioon, kun verotuksesi valmistuu. Ilmoitukseen kirjoitetaan
              yrityksen nimi, Y-tunnus ja maksamasi työn osuus.
            </p>
            <p>
              Vähennys kuuluu sille vuodelle, jona maksat laskun. Meidän laskussamme työn osuus on omana rivinään, joten luvun voi
              kopioida suoraan ilmoitukseen.
            </p>
            <p>
              Lisää vähennyksestä kerromme artikkelissa{" "}
              <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/" className="text-primary font-semibold hover:underline">
                kotitalousvähennys katto- ja maalaustöissä
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} />
      <KayntiPalkki />

      <section className="pb-12 md:pb-16 osio">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="text-lg font-bold font-heading mb-3">Lähteet</h2>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {lahteet.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ArtikkeliRivit categories={["raha"]} />
      {/* Arvostelunosto: sijoitus ja valinta src/data/arvostelusijoitus.ts */}
      <ArvosteluNosto polku="/kotitalousvahennys" />

      <ServiceContactSection />
      <ToimintaAlueetBanner />
    </Rytmi>
  );
};

export default Kotitalousvahennys;
