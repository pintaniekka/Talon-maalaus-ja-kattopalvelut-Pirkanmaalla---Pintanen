import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Paintbrush, Ruler, Building2, Layers, Droplets } from "@/components/icons/BrandIcons";
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
import FeaturedProjects from "@/components/hinnat/FeaturedProjects";
import { PriceSectionHeading, PriceIncludes, PriceFactors, Checklist } from "@/components/hinnat/PriceSections";
import { maalausPrices, fmtRange } from "@/data/prices";
import { HERO_BASE } from "@/data/seo";
import { KOTITALOUSVAHENNYS } from "@/data/company";

const general = fmtRange(maalausPrices.general.min, maalausPrices.general.max);

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
    answer: "Hintaan kuuluu homepesu, irtoavan maalin kaavinta, terassien ja ikkunoiden suojaus, pohjamaali paljaisiin kohtiin, pintamaali pensselillä ja siivous. Ylimääräisiä kuluja ei tule.",
  },
  { question: "Kuinka kauan talon maalaus kestää?", answer: "Yleensä 3–7 päivää talon koon ja pohjatöiden määrän mukaan." },
  { question: "Pitääkö olla kotona työn aikana?", answer: "Ei tarvitse, kunhan sovitut asiat ovat kunnossa." },
  { question: "Kuinka usein talo pitää maalata?", answer: "Yleensä 10–15 vuoden välein. Väli riippuu maalista ja säästä. Eteläseinä kuluu ensin." },
  { question: "Mitä jos maalin alta löytyy lahovaurioita?", answer: "Kerromme niistä sinulle ennen kuin jatkamme työtä." },
  {
    question: "Saako talon maalauksesta kotitalousvähennyksen?",
    answer: `Kyllä. ${KOTITALOUSVAHENNYS} Erittelemme työn ja materiaalit laskulle valmiiksi.`,
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

const crumbs = [{ name: "Talon maalaus", path: "/talon-maalaus-pirkanmaa" }, { name: "Hinta" }];

const HinnatTalonMaalaus = () => {
  const seo = staticSeo["/talon-maalaus-hinta-pirkanmaa"];
  return (
    <>
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
            koosta, korkeudesta ja pohjatöiden määrästä. Työn osuudesta saat kotitalousvähennyksen. Tarkan hinnan saat, kun käymme
            katsomassa talon. Käynti on ilmainen.
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

      <CalculatorCta service="maalaus" />

      <section className="section-padding bg-background">
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

      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <PriceSectionHeading title="Mistä talon maalauksen hinta syntyy?" intro="Hintaan vaikuttaa viisi asiaa." />
          <PriceFactors factors={priceFactors} />
        </div>
      </section>

      <KotitalousVahennys />

      <MaalausComparison />

      <section className="section-padding bg-background">
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
