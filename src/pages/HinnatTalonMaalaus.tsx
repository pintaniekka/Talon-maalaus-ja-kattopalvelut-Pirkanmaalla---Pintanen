import { Link } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import RelatedArticles from "@/components/RelatedArticles";
import { staticSeo } from "@/data/seo";
import PageHero from "@/components/PageHero";
import CalculatorCta from "@/components/hinnat/CalculatorCta";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import MaalausPricingCards from "@/components/maalaus/MaalausPricingCards";
import MaalausComparison from "@/components/maalaus/MaalausComparison";
import Vaarinymmarrykset from "@/components/Vaarinymmarrykset";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import HintaKohteet from "@/components/hinnat/HintaKohteet";
import { PriceSectionHeading, PriceIncludes, PriceFactors, Checklist } from "@/components/hinnat/PriceSections";
import { PriceExamplesSection } from "@/components/hinnat/PriceExamples";
import { maalausPrices, fmtRange } from "@/data/prices";
import { HERO_BASE } from "@/data/seo";
import { KOTITALOUSVAHENNYS } from "@/data/company";
import { MAALAUS_PENSSELI_FAQ, MAALAUS_SADE_FAQ } from "@/data/faqData";

const general = fmtRange(maalausPrices.general.min, maalausPrices.general.max);

const priceFactors = [
  { title: "Pohjatyöt", description: "Hilseilevä tai vaurioitunut pinta vaatii enemmän pesua ja kaavintaa." },
  { title: "Talon pinta-ala", description: "Isoon taloon kuluu enemmän maalia ja työtä." },
  { title: "Talon korkeus", description: "Korkea talo vaatii enemmän telineitä tai nostimen." },
  { title: "Käytettävä maali", description: "Eri maalit eroavat hinnaltaan ja kestoltaan." },
  { title: "Kuivuminen", description: "Pesun ja maalikerrosten välissä seinän pitää kuivua. Sää vaikuttaa aikatauluun." },
];

const offerChecklist = [
  "Onko hinta kiinteä urakkahinta vai arvio?",
  "Kuuluvatko homepesu, kaavinta ja pohjamaalaus hintaan?",
  "Mitä maalia käytetään ja montako kerrosta maalataan?",
  "Onko työn osuus eritelty laskussa kotitalousvähennystä varten?",
  "Kuinka pitkä takuu on, ja saatko sen kirjallisena?",
];

const faqItems = [
  {
    question: "Paljonko talon maalaus maksaa?",
    answer: `Omakotitalon ulkomaalaus maksaa meillä yleensä ${general}. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä. Laskurilla saat suuntaa antavan arvion. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.`,
  },
  {
    question: "Miksi hinta annetaan koko talolle eikä neliölle?",
    answer: "Hinta lasketaan talon mukaan: pinta-ala, kerrosluku, verhouksen kunto ja pesun tarve ratkaisevat. Siksi annamme hinnan arviokäynnin jälkeen kirjallisena, ja laskurista saat haarukan heti.",
  },
  { question: "Kuinka kauan talon maalaus kestää?", answer: "Yleensä 3–7 päivää talon koon ja pohjatöiden määrän mukaan." },
  {
    question: "Saanko karkean hinta-arvion ennen käyntiä?",
    answer: "Kyllä. Hintalaskuri antaa suuntaa antavan arvion heti seinäpinta-alan, kerrosten ja hilseilyn mukaan. Tarkan, kiinteän hinnan saat kirjallisessa tarjouksessa ilmaisen arviokäynnin jälkeen.",
  },
  {
    question: "Milloin pääsette katsomaan talon?",
    answer: "Arviokäynti onnistuu yleensä samalla viikolla, myös iltaisin ja viikonloppuisin. Maalaukset teemme huhti–toukokuusta elo–syyskuuhun, ja työn ajankohta sovitaan kirjallisesti tarjouksen hyväksymisen jälkeen.",
  },
  { question: "Pitääkö olla kotona?", answer: "Arviokäynnillä kyllä, koska käymme seinät ja tarjouksen läpi yhdessä. Työn aikana ei ole pakko, kunhan sovitut asiat ovat kunnossa." },
  { question: "Kuinka usein talo pitää maalata?", answer: "Yleensä 10–15 vuoden välein. Väli riippuu maalista ja säästä. Eteläseinä kuluu ensin." },
  {
    question: "Saako talon maalauksesta kotitalousvähennyksen?",
    answer: `Kyllä. ${KOTITALOUSVAHENNYS} Erittelemme työn ja materiaalit laskulle valmiiksi. Lue lisää sivulta <a href="/kotitalousvahennys/">kotitalousvähennys</a>.`,
  },
  { question: "Kuinka pitkä takuu maalauksella on?", answer: "Saat talon maalaukselle meiltä 2 vuoden takuun." },
  // Brief 10 (26.10.2026): samat kysymykset kuin palvelusivulla (faqData.ts).
  MAALAUS_PENSSELI_FAQ,
  MAALAUS_SADE_FAQ,
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
            Omakotitalon ulkomaalaus maksaa meillä yleensä <strong className="text-foreground">{general}</strong>. Hinta riippuu talon
            koosta, korkeudesta ja pohjatöiden määrästä. Työ kestää 3–7 päivää, ja takuu on 2 vuotta. Tarkan hinnan saat, kun käymme
            katsomassa talon. Arviokäynti on ilmainen.
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
      <KotitalousVahennys />

      <CalculatorCta service="maalaus" />

      {/* Kolme esimerkkitaloa laskurin kaavoilla (brief 3, 26.10.2026); "Mitä hintaan kuuluu" seuraa heti alla. */}
      <PriceExamplesSection service="maalaus" />
      <HintaKohteet service="maalaus" />

      <section className="section-padding osio">
        <div className="section-container max-w-3xl mx-auto">
          <div>
            <PriceIncludes
              title="Mitä hintaan kuuluu?"
              items={maalausPrices.includes}
              note="Hintaan kuuluu koko työ alusta loppuun. Ylimääräisiä kuluja ei tule. Maalaamme seinät pensselillä, ja saat työlle 2 vuoden kirjallisen takuun. Hinnat sisältävät arvonlisäveron 25,5 %."
            />
          </div>
        </div>
      </section>

      <section className="section-padding osio">
        <div className="section-container max-w-4xl mx-auto">
          <PriceSectionHeading title="Mistä talon maalauksen hinta syntyy?" intro="Hintaan vaikuttaa viisi asiaa." />
          <PriceFactors factors={priceFactors} />
        </div>
      </section>

      <MaalausComparison />

      <section className="section-padding osio">
        <div className="section-container">
          <PriceSectionHeading
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
            .
          </p>
        </div>
      </section>
      <Vaarinymmarrykset service="maalaus" />


      <RelatedArticles categories={["maalaus", "raha"]} />
      <FAQSection items={faqItems} />
      <ServiceContactSection variant="maalaus" />
      <ToimintaAlueetBanner service="maalaus" />
    </Rytmi>
  );
};

export default HinnatTalonMaalaus;
