import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Ruler, Mountain, Layers, Building2, Wrench as WrenchIcon } from "@/components/icons/BrandIcons";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import RelatedArticles from "@/components/RelatedArticles";
import { staticSeo } from "@/data/seo";
import PageHero from "@/components/PageHero";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import CalculatorCta from "@/components/hinnat/CalculatorCta";
import PinnoitusPricingCards from "@/components/pinnoitus/PinnoitusPricingCards";
import FeaturedProjects from "@/components/hinnat/FeaturedProjects";
import { PriceSectionHeading, PriceIncludes, PriceFactors, Checklist, CompareCards } from "@/components/hinnat/PriceSections";
import { pinnoitusPrices, fmtRange } from "@/data/prices";
import { HERO_BASE } from "@/data/seo";
import { KOTITALOUSVAHENNYS } from "@/data/company";

const general = fmtRange(pinnoitusPrices.general.min, pinnoitusPrices.general.max);

const priceFactors = [
  { icon: Ruler, title: "Katon koko", description: "Isoon kattoon kuluu enemmän maalia ja työtä. Neliöhinta kuitenkin laskee, kun katto kasvaa." },
  { icon: Mountain, title: "Katon jyrkkyys", description: "Jyrkällä katolla työ on hitaampaa ja turvavälineitä tarvitaan enemmän." },
  { icon: Layers, title: "Katon muoto", description: "Harjat, jiirit ja läpiviennit lisäävät työtä." },
  { icon: Building2, title: "Talon korkeus", description: "Korkea talo tarvitsee pidemmät telineet." },
  { icon: WrenchIcon, title: "Tiilien kunto", description: "Jos tiiliä on paljon rikki, niiden vaihtamiseen menee aikaa." },
];

const offerChecklist = [
  "Onko hinta kiinteä urakkahinta vai arvio?",
  "Kuuluvatko pesu ja rikkinäisten tiilien vaihto hintaan?",
  "Montako kertaa katto maalataan ja millä maalilla?",
  "Onko työn osuus eritelty laskussa kotitalousvähennystä varten?",
  "Kuinka pitkä takuu on, ja saatko sen kirjallisena?",
];

const faqItems = [
  {
    question: "Paljonko tiilikaton pinnoitus maksaa?",
    answer: `Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä ${general}. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Laskurilla saat suuntaa antavan arvion. Tarkan hinnan saat ilmaisen kuntotarkastuksen jälkeen.`,
  },
  {
    question: "Mitä tiilikaton pinnoituksen hintaan kuuluu?",
    answer: "Hintaan kuuluu katon pesu painepesulla, rikkinäisten tiilien vaihto uusiin, pohjamaali ja pintamaali ruiskulla sekä siivous. Ahtaat paikat maalaamme telalla tai käsin. Ylimääräisiä kuluja ei tule.",
  },
  { question: "Kuinka kauan pinnoitus kestää?", answer: "Työ kestää yleensä 2–4 päivää katon koon mukaan." },
  {
    question: "Kuinka pitkään pinnoitus kestää käytössä?",
    answer: "Katto saa pinnoituksesta jopa 10–15 vuotta lisää ikää. Kesto riippuu säästä ja katon kunnosta.",
  },
  {
    question: "Voiko pinnoituksen tehdä, jos tiiliä on rikki?",
    answer: "Yksittäiset rikkinäiset tiilet vaihdetaan uusiin. Laajat rakenteelliset vauriot edellyttävät muuta ratkaisua.",
  },
  { question: "Pitääkö olla kotona työn aikana?", answer: "Ei tarvitse, kunhan sähkö ja vesipiste ovat käytettävissä." },
  {
    question: "Saako tiilikaton pinnoituksesta kotitalousvähennyksen?",
    answer: `Kyllä. ${KOTITALOUSVAHENNYS} Erittelemme työn ja materiaalit laskulle valmiiksi.`,
  },
  { question: "Voiko pinnoituksen maksaa osissa?", answer: "Kyllä voi. Meillä on maksujärjestely, jolla voit jakaa hinnan kuukausieriin." },
  { question: "Kuinka pitkä takuu pinnoituksella on?", answer: "Saat tiilikaton pinnoitukselle meiltä 5 vuoden kirjallisen takuun." },
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

const crumbs = [{ name: "Tiilikaton pinnoitus", path: "/tiilikaton-pinnoitus-pirkanmaa" }, { name: "Hinta" }];

const HinnatTiilikalonPinnoitus = () => {
  const seo = staticSeo["/tiilikaton-pinnoitus-hinta-pirkanmaa"];
  return (
    <>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema
        name="Tiilikaton pinnoitus"
        area="Pirkanmaa"
        areaType="AdministrativeArea"
        description={seo.description}
        priceRange={pinnoitusPrices.general}
      />
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <PageHero
        eyebrow="Hinta · tiilikaton pinnoitus"
        title={
          <>
            Tiilikaton pinnoituksen <span className="text-accent-ink">hinta</span>
          </>
        }
        lead={
          <>
            Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä <strong className="text-foreground">{general}</strong>. Hinta riippuu
            katon koosta, jyrkkyydestä, muodosta ja tiilien kunnosta. Työn osuudesta saat kotitalousvähennyksen. Tarkan hinnan saat, kun
            käymme katsomassa katon. Käynti on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta laskurilla" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
        trust="pinnoitus"
        image={{ base: HERO_BASE.pinnoitusHinta, alt: "Tiilikaton pesu ja sammaleenpoisto käynnissä" }}
        badge={null}
        breadcrumbs={crumbs}
      />

      {/* Hintaesimerkit: samat kortit kuin palvelu- ja kaupunkisivuilla */}
      <PinnoitusPricingCards cityName="Pirkanmaa" cityIn="Pirkanmaalla" calculatorHref="/hintalaskuri/?palvelu=pinnoitus" calculatorLabel="Laske oman kattosi hinta" />

      <CalculatorCta service="pinnoitus" />

      {/* Mitä hintaan kuuluu */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <div>
            <PriceIncludes
              title="Mitä hintaan kuuluu?"
              items={pinnoitusPrices.includes}
              note="Hintaan kuuluu koko työ alusta loppuun. Ylimääräisiä kuluja ei tule. Ennen tarjousta tarkistamme tiilet, aluskatteen ja läpiviennit. Katto maalataan ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali. Saat työlle 5 vuoden kirjallisen takuun."
            />
          </div>
        </div>
      </section>

      {/* Mistä hinta syntyy */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <PriceSectionHeading title="Mistä tiilikaton pinnoituksen hinta syntyy?" intro="Hintaan vaikuttaa viisi asiaa." />
          <PriceFactors factors={priceFactors} />
        </div>
      </section>

      <KotitalousVahennys />

      {/* Pinnoitus vai uusi katto */}
      <section className="section-padding bg-secondary">
        <div className="section-container max-w-4xl mx-auto">
          <PriceSectionHeading
            title="Kannattaako pinnoitus vai uusi katto?"
            intro="Pinnoitus riittää, jos aluskate ja katon rakenteet ovat kunnossa. Rakenteiden vaurioita pinnoitus ei korjaa, eikä kattoremontteja tehdä meillä. Pienet aluskatteen korjaukset teemme pinnoituksen yhteydessä."
          />
          <CompareCards
            left={{ title: "Tiilikaton pinnoitus", price: general, note: "Suojaa ja uudistaa katon edullisesti" }}
            right={{ title: "Kattoremontti", price: "15 000–30 000 €", note: "Koko katon uusiminen rakenteista lähtien" }}
          />
          <p className="text-center mt-8 text-muted-foreground">
            Jos et ole varma, onko pinnoitus sinun katollesi ajankohtainen, lue{" "}
            <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto/" className="text-primary font-semibold hover:underline">
              milloin tiilikatto pitää pinnoittaa
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Tarjouksen vertailu */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <PriceSectionHeading
            title="Mitä tarjouksesta kannattaa katsoa?"
            intro="Kun vertaat tarjouksia, katso muutakin kuin loppusummaa. Kysy ainakin nämä:"
          />
          <Checklist items={offerChecklist} />
        </div>
      </section>

      <FeaturedProjects service="pinnoitus" title="Tiilikaton pinnoituksia Pirkanmaalla" />

      <FAQSection items={faqItems} />

      <RelatedArticles categories={["katto", "raha"]} />
      <ServiceContactSection variant="katto" />
    </>
  );
};

export default HinnatTiilikalonPinnoitus;
