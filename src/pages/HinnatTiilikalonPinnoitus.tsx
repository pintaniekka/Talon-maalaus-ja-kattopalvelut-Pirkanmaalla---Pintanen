import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Ruler, Mountain, Layers, Building2, Wrench as WrenchIcon } from "@/components/icons/BrandIcons";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import RelatedArticles from "@/components/RelatedArticles";
import { staticSeo } from "@/data/seo";
import ServicePageHero from "@/components/ServicePageHero";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import CalculatorCta from "@/components/hinnat/CalculatorCta";
import PinnoitusPricingCards from "@/components/pinnoitus/PinnoitusPricingCards";
import FeaturedProjects from "@/components/hinnat/FeaturedProjects";
import { PriceSectionHeading, PriceIncludes, PriceFactors, Checklist, CompareCards } from "@/components/hinnat/PriceSections";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import { pinnoitusPrices, fmtRange, fmtEur } from "@/data/prices";

const heroImage = getResponsiveSrc("tiilikaton-tehopesu-ja-sammaleenpoisto");
const heroSrcSet = getResponsiveSrcSet("tiilikaton-tehopesu-ja-sammaleenpoisto");
const general = fmtRange(pinnoitusPrices.general.min, pinnoitusPrices.general.max);
const afterFrom = fmtEur(Math.min(...pinnoitusPrices.cards.map((c) => c.afterFrom)));

const priceFactors = [
  { icon: Ruler, title: "Katon koko", description: "Isoon kattoon kuluu enemmän maalia ja työtä. Neliöhinta kuitenkin laskee, kun katto kasvaa." },
  { icon: Mountain, title: "Katon jyrkkyys", description: "Jyrkällä katolla työ on hitaampaa ja turvavälineitä tarvitaan enemmän." },
  { icon: Layers, title: "Katon muoto", description: "Harjat, jiirit ja läpiviennit lisäävät työtä." },
  { icon: Building2, title: "Talon korkeus", description: "Korkea talo tarvitsee pidemmät telineet." },
  { icon: WrenchIcon, title: "Tiilien kunto", description: "Jos tiiliä on paljon rikki, niiden vaihtamiseen menee aikaa." },
];

const offerChecklist = [
  "Onko hinta kiinteä urakkahinta vai arvio?",
  "Kuuluvatko pesu, kasvustontorjunta ja rikkinäisten tiilien vaihto hintaan?",
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
    question: "Paljonko tiilikaton pinnoitus maksaa neliöltä?",
    answer: `Meillä tiilikaton pinnoitus maksaa alkaen ${pinnoitusPrices.perM2From} €/m². Neliöhinta riippuu katon jyrkkyydestä, muodosta ja kunnosta.`,
  },
  {
    question: "Mitä tiilikaton pinnoituksen hintaan kuuluu?",
    answer: "Hintaan kuuluu suunnittelu ja tarvittavat suojaustyöt, katon pesu, kasvustontorjunta-aine, rikkinäisten tiilien vaihto, pohjamaali, pintamaali ja siivous. Ylimääräisiä kuluja ei tule.",
  },
  { question: "Kuinka kauan pinnoitus kestää?", answer: "Työ kestää yleensä 2–4 päivää katon koon mukaan." },
  {
    question: "Kuinka pitkään pinnoitus kestää käytössä?",
    answer: "Pinnoitus suojaa tiiltä ja hidastaa rapautumista. Todellinen kesto riippuu sääolosuhteista ja katon kunnosta.",
  },
  {
    question: "Voiko pinnoituksen tehdä, jos tiiliä on rikki?",
    answer: "Yksittäiset rikkinäiset tiilet vaihdetaan uusiin. Laajat rakenteelliset vauriot edellyttävät muuta ratkaisua.",
  },
  { question: "Pitääkö olla kotona työn aikana?", answer: "Ei tarvitse, kunhan sähkö ja vesipiste ovat käytettävissä." },
  {
    question: "Saako tiilikaton pinnoituksesta kotitalousvähennyksen?",
    answer: "Kyllä saa. Vuosina 2026 ja 2027 saat vähentää verotuksessa 40 % työn osuudesta. Erittelemme työn ja materiaalit laskulle valmiiksi.",
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

const HinnatTiilikalonPinnoitus = () => {
  const seo = staticSeo["/tiilikaton-pinnoitus-hinta-pirkanmaa"];
  return (
    <>
      <SEO {...seo} preloadImage={heroImage} />
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

      {/* Pääkuva ja suora vastaus */}
      <ServicePageHero title="" subtitle="" backgroundImage={heroImage} backgroundSrcSet={heroSrcSet} compact>
        <div className="bg-black/45 rounded-2xl p-5 md:p-8 max-w-4xl mx-auto text-left mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Tiilikaton pinnoituksen <span className="text-accent-ink drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">hinta</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä <strong>{general}</strong>. Kotitalousvähennyksen
            jälkeen hinta on alkaen <strong>{afterFrom}</strong>. Hinta riippuu katon koosta, jyrkkyydestä, muodosta ja
            tiilien kunnosta. Tarkan hinnan saat, kun käymme katsomassa katon. Käynti on ilmainen.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/hintalaskuri?palvelu=pinnoitus" className="btn-hero">
            Laske hinta laskurilla
          </Link>
          <a href="#yhteystiedot" className="btn-hero-outline">
            Pyydä ilmainen kuntotarkastus
          </a>
        </div>
      </ServicePageHero>

      {/* Hintaesimerkit: samat kortit kuin palvelu- ja kaupunkisivuilla */}
      <PinnoitusPricingCards cityName="Pirkanmaa" cityIn="Pirkanmaalla" calculatorHref="/hintalaskuri?palvelu=pinnoitus" calculatorLabel="Laske oman kattosi hinta" />

      <CalculatorCta service="pinnoitus" />

      {/* Mitä hintaan kuuluu */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <div>
            <PriceIncludes
              title="Mitä hintaan kuuluu?"
              items={pinnoitusPrices.includes}
              note="Hintaan kuuluu koko työ alusta loppuun. Ylimääräisiä kuluja ei tule. Ennen tarjousta tarkistamme tiilet, aluskatteen ja läpiviennit. Katto maalataan ruiskulla kahteen kertaan, ja saat työlle 5 vuoden kirjallisen takuun."
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
            intro="Pinnoitus on monesti selvästi edullisempi kuin kattoremontti, jos aluskate ja katon rakenteet ovat kunnossa. Rakenteiden vaurioita pinnoitus ei korjaa. Pienet aluskatteen korjaukset teemme pinnoituksen yhteydessä."
          />
          <CompareCards
            left={{ title: "Tiilikaton pinnoitus", price: general, note: "Suojaa ja uudistaa katon edullisesti" }}
            right={{ title: "Kattoremontti", price: "15 000–30 000 €", note: "Koko katon uusiminen rakenteista lähtien" }}
          />
          <p className="text-center mt-8 text-muted-foreground">
            Jos et ole varma, onko pinnoitus sinun katollesi ajankohtainen, lue{" "}
            <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto" className="text-primary font-semibold hover:underline">
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
