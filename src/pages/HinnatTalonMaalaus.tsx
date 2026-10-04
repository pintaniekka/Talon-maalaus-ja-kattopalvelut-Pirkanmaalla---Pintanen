import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Paintbrush, Ruler, Building2, Layers, Droplets } from "@/components/icons/BrandIcons";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import RelatedArticles from "@/components/RelatedArticles";
import { staticSeo } from "@/data/seo";
import ServicePageHero from "@/components/ServicePageHero";
import CalculatorCta from "@/components/hinnat/CalculatorCta";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import MaalausPricingCards from "@/components/maalaus/MaalausPricingCards";
import MaalausComparison from "@/components/maalaus/MaalausComparison";
import FeaturedProjects from "@/components/hinnat/FeaturedProjects";
import { PriceSectionHeading, PriceIncludes, PriceFactors, Checklist } from "@/components/hinnat/PriceSections";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import { maalausPrices, fmtRange, fmtEur } from "@/data/prices";

const heroImage = getResponsiveSrc("vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen");
const heroSrcSet = getResponsiveSrcSet("vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen");
const general = fmtRange(maalausPrices.general.min, maalausPrices.general.max);
const afterFrom = fmtEur(Math.min(...maalausPrices.cards.map((c) => c.afterFrom)));

const priceFactors = [
  { icon: Layers, title: "Pohjatyöt", description: "Hilseilevä tai vaurioitunut pinta vaatii enemmän pesua ja kaavintaa." },
  { icon: Ruler, title: "Talon pinta-ala", description: "Isoon taloon kuluu enemmän maalia ja työtä." },
  { icon: Building2, title: "Talon korkeus", description: "Korkea talo vaatii enemmän telineitä tai nostimen." },
  { icon: Paintbrush, title: "Käytettävä maali", description: "Eri maalit eroavat hinnaltaan ja kestoltaan." },
  { icon: Droplets, title: "Kuivuminen", description: "Pesun ja maalikerrosten välissä seinän pitää kuivua. Sää vaikuttaa aikatauluun." },
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
    question: "Mitä talon maalauksen hintaan kuuluu?",
    answer: "Hintaan kuuluu homepesu, tarvittavat pohjatyöt, suojaukset, pohjamaalaus ja pintamaalaus sekä työmaan siivous. Ylimääräisiä kuluja ei tule.",
  },
  { question: "Kuinka kauan talon maalaus kestää?", answer: "Yleensä 3–7 päivää talon koon ja pohjatöiden määrän mukaan." },
  { question: "Pitääkö olla kotona työn aikana?", answer: "Ei tarvitse, kunhan sovitut asiat ovat kunnossa." },
  { question: "Kuinka usein talo pitää maalata?", answer: "Tyypillisesti 10 vuoden välein, riippuen maalista ja sääolosuhteista." },
  { question: "Mitä jos maalin alta löytyy lahovaurioita?", answer: "Kerromme niistä sinulle ennen kuin jatkamme työtä." },
  {
    question: "Saako talon maalauksesta kotitalousvähennyksen?",
    answer: "Kyllä saa. Vuosina 2026 ja 2027 saat vähentää verotuksessa 40 % työn osuudesta. Erittelemme työn ja materiaalit laskulle valmiiksi.",
  },
  { question: "Kuinka pitkä takuu maalauksella on?", answer: "Saat talon maalaukselle meiltä 2 vuoden takuun." },
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

const HinnatTalonMaalaus = () => {
  const seo = staticSeo["/talon-maalaus-hinta-pirkanmaa"];
  return (
    <>
      <SEO {...seo} preloadImage={heroImage} />
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

      <ServicePageHero title="" subtitle="" backgroundImage={heroImage} backgroundSrcSet={heroSrcSet} compact>
        <div className="bg-black/45 rounded-2xl p-5 md:p-8 max-w-4xl mx-auto text-left mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Talon maalauksen <span className="text-accent-ink drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">hinta</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            Omakotitalon ulkomaalaus maksaa meillä yleensä <strong>{general}</strong>. Kotitalousvähennyksen jälkeen
            hinta on alkaen <strong>{afterFrom}</strong>. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden
            määrästä. Tarkan hinnan saat, kun käymme katsomassa talon. Käynti on ilmainen.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/hintalaskuri?palvelu=maalaus" className="btn-hero">
            Laske hinta laskurilla
          </Link>
          <a href="#yhteystiedot" className="btn-hero-outline">
            Pyydä ilmainen arviokäynti
          </a>
        </div>
      </ServicePageHero>

      <MaalausPricingCards cityName="Pirkanmaa" calculatorHref="/hintalaskuri?palvelu=maalaus" calculatorLabel="Laske oman talosi hinta" />

      <CalculatorCta service="maalaus" />

      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <div>
            <PriceIncludes
              title="Mitä hintaan kuuluu?"
              items={maalausPrices.includes}
              note="Hintaan kuuluu koko työ alusta loppuun. Ylimääräisiä kuluja ei tule. Maalaamme seinät pensselillä, ja saat työlle 2 vuoden takuun."
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <PriceSectionHeading title="Mistä talon maalauksen hinta syntyy?" intro="Hintaan vaikuttaa viisi asiaa." />
          <PriceFactors factors={priceFactors} />
        </div>
      </section>

      <KotitalousVahennys />

      <MaalausComparison cityIn="Pirkanmaalla" />

      <section className="section-padding bg-background">
        <div className="section-container">
          <PriceSectionHeading
            title="Mitä tarjouksesta kannattaa katsoa?"
            intro="Kun vertaat tarjouksia, katso muutakin kuin loppusummaa. Kysy ainakin nämä:"
          />
          <Checklist items={offerChecklist} />
          <p className="text-center mt-8 text-muted-foreground">
            Lue myös{" "}
            <Link to="/artikkelit/kuinka-usein-puutalo-maalataan" className="text-primary font-semibold hover:underline">
              kuinka usein puutalo pitää maalata
            </Link>
            .
          </p>
        </div>
      </section>

      <FeaturedProjects service="maalaus" title="Talon maalauksia Pirkanmaalla" />

      <FAQSection items={faqItems} />

      <RelatedArticles categories={["maalaus", "raha"]} />
      <ServiceContactSection variant="maalaus" />
    </>
  );
};

export default HinnatTalonMaalaus;
