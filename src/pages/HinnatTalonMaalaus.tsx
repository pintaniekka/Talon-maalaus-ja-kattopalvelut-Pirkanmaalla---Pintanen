import { Link } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import ArvosteluNosto from "@/components/ArvosteluNosto";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import ArtikkeliRivit from "@/components/ArtikkeliRivit";
import ToimintaKutsu from "@/components/ToimintaKutsu";
import { KayntiPalkki } from "@/components/KutsuPalkit";
import { staticSeo } from "@/data/seo";
import PageHero from "@/components/PageHero";
import CalculatorCta from "@/components/hinnat/CalculatorCta";
import { KotitalousVahennysNayttamo } from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import MaalausPricingCards from "@/components/maalaus/MaalausPricingCards";
import MaalausComparison from "@/components/maalaus/MaalausComparison";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import HintaKohteet from "@/components/hinnat/HintaKohteet";
import { Checklist, HintaTekijatLohko, PriceIncludes, PriceSectionHeading } from "@/components/hinnat/PriceSections";
import { PriceExamplesSection } from "@/components/hinnat/PriceExamples";
import { maalausPrices, fmtRange } from "@/data/prices";
import { HERO_BASE } from "@/data/seo";
import { KOTITALOUSVAHENNYS } from "@/data/company";

const general = fmtRange(maalausPrices.general.min, maalausPrices.general.max);

const priceFactors = [
  { title: "Pohjatyöt", description: "Hilseilevä tai vaurioitunut pinta vaatii enemmän pesua ja kaavintaa." },
  { title: "Talon pinta-ala", description: "Isoon taloon kuluu enemmän maalia ja työtä." },
  { title: "Talon korkeus", description: "Korkea talo vaatii enemmän telineitä tai nostimen." },
  { title: "Käytettävä maali", description: "Eri maalit eroavat hinnaltaan ja kestoltaan." },
];

const offerChecklist = [
  "Onko hinta kiinteä urakkahinta vai arvio?",
  "Kuuluvatko homepesu, kaavinta ja pohjamaalaus hintaan?",
  "Mitä maalia käytetään ja montako kerrosta maalataan?",
  "Maalataanko seinät pensselillä vai ruiskulla?",
  "Kuinka pitkä takuu on, ja saatko sen kirjallisena?",
];

const faqItems = [
  {
    question: "Miksi hinta annetaan koko talolle eikä neliölle?",
    answer: "Hinta lasketaan talon mukaan: pinta-ala, kerrosluku, verhouksen kunto ja pesun tarve ratkaisevat. Siksi annamme hinnan arviokäynnin jälkeen kirjallisena, ja laskurista saat haarukan heti.",
  },
  {
    question: "Milloin pääsette katsomaan talon?",
    answer: "Arviokäynti onnistuu yleensä samalla viikolla, tarvittaessa myös iltaisin tai viikonloppuisin. Maalaukset teemme huhti–toukokuusta elo–syyskuuhun, ja työn ajankohta sovitaan kirjallisesti tarjouksen hyväksymisen jälkeen.",
  },
  {
    question: "Saako talon maalauksesta kotitalousvähennyksen?",
    answer: `Kyllä. ${KOTITALOUSVAHENNYS} Erittelemme työn ja materiaalit laskulle valmiiksi. Lue lisää sivulta <a href="/kotitalousvahennys/">kotitalousvähennys</a>.`,
  },
  { question: "Miten maksu tapahtuu?", answer: "Kun hyväksyt tarjouksen, lähetämme ennakkolaskun, joka on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja olemme käyneet sen yhdessä läpi." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const crumbs = [{ name: "Talon maalaus", path: "/talon-maalaus-pirkanmaa" }, { name: "Hinta" }];

const HinnatTalonMaalaus = () => {
  const seo = staticSeo["/talon-maalaus-hinta-pirkanmaa"];
  return (
    <Rytmi>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema
        name="Talon ulkomaalaus"
        area="Pirkanmaa"
        areaType="AdministrativeArea"
        description={seo.description}
        priceRange={maalausPrices.general}
      />
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <PageHero
        eyebrow="Hinta · talon maalaus"
        title={
          <>
            Talon maalauksen <span className="text-accent-ink">hinta</span>
          </>
        }
        lead={
          <>
            Omakotitalon ulkomaalaus maksaa meillä yleensä <strong className="text-foreground">{general}</strong>. Tarkan hinnan saat,
            kun käymme katsomassa talon. Arviokäynti on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=maalaus", label: "Laske hinta laskurilla" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=maalaus", label: "Pyydä ilmainen arviokäynti" }}
        trust="maalaus"
        image={{ base: HERO_BASE.maalausHinta, alt: "Vaalea puutalo ulkomaalauksen jälkeen" }}
        badge={null}
        breadcrumbs={crumbs}
      />

      <MaalausPricingCards cityName="Pirkanmaa" calculatorHref="/hintalaskuri/?palvelu=maalaus" calculatorLabel="Laske oman talosi hinta" />
      <KotitalousVahennysNayttamo />

      <CalculatorCta service="maalaus" />

      {/* Kolme esimerkkitaloa laskurin kaavoilla (brief 3, 26.10.2026); "Mitä hintaan kuuluu" seuraa heti alla. */}
      <PriceExamplesSection service="maalaus" />
      {/* Arvostelunosto: sijoitus ja valinta src/data/arvostelusijoitus.ts */}
      <ArvosteluNosto polku="/talon-maalaus-hinta-pirkanmaa" />

      <HintaKohteet service="maalaus" />
      <KayntiPalkki palvelu="maalaus" />

      <section className="section-padding osio">
        <div className="section-container max-w-3xl mx-auto">
          <div>
            <PriceIncludes
              title="Mitä hintaan kuuluu?"
              items={maalausPrices.includes}
              note="Hintaan kuuluu koko työ alusta loppuun. Ylimääräisiä kuluja ei tule. Maalaamme seinät pensselillä, ja saat työlle 2 vuoden kirjallisen takuun."
            />
          </div>
        </div>
      </section>

      <HintaTekijatLohko title="Mistä talon maalauksen hinta syntyy?" intro="Hintaan vaikuttaa neljä asiaa." factors={priceFactors} />

      <MaalausComparison />

      <section className="section-padding osio">
        <div className="section-container">
          <PriceSectionHeading
            eyebrow="Tarjouksen vertailu"
            title="Mitä tarjouksesta kannattaa katsoa?"
            intro="Kun vertaat tarjouksia, katso muutakin kuin loppusummaa. Kysy ainakin nämä:"
          />
          <Checklist items={offerChecklist} />
          <p className="text-center mt-8 text-muted-foreground">
            Lue myös{" "}
            <Link to="/artikkelit/kuinka-usein-puutalo-maalataan/" className="text-primary font-semibold hover:underline">
              kuinka usein puutalo pitää maalata
            </Link>
            . Työn vaiheet kerromme sivulla{" "}
            <Link to="/talon-maalaus-pirkanmaa/" className="text-primary font-semibold hover:underline">
              talon maalaus Pirkanmaalla
            </Link>
            . Kiinteän hinnan saat{" "}
            <Link to="/ilmainen-julkisivun-kuntoarvio/" className="text-primary font-semibold hover:underline">
              ilmaisen arviokäynnin
            </Link>{" "}
            jälkeen.
          </p>
        </div>
      </section>
      <ToimintaKutsu palvelu="maalaus" nappi="laskuri" n={1} />
      <ArtikkeliRivit categories={["raha"]} />
      <FAQSection items={faqItems} />
      <ServiceContactSection variant="maalaus" />
      <ToimintaAlueetBanner service="maalaus" />
    </Rytmi>
  );
};

export default HinnatTalonMaalaus;
