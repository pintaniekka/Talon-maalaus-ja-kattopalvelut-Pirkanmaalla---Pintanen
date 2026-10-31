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
import { KotitalousVahennysNayttamo } from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import CalculatorCta from "@/components/hinnat/CalculatorCta";
import PinnoitusPricingCards from "@/components/pinnoitus/PinnoitusPricingCards";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import HintaKohteet from "@/components/hinnat/HintaKohteet";
import { Checklist, CompareCards, HintaTekijatLohko, PriceIncludes, PriceSectionHeading } from "@/components/hinnat/PriceSections";
import { PriceExamplesSection } from "@/components/hinnat/PriceExamples";
import { pinnoitusPrices, fmtRange } from "@/data/prices";
import { HERO_BASE } from "@/data/seo";
import { KOTITALOUSVAHENNYS } from "@/data/company";

const general = fmtRange(pinnoitusPrices.general.min, pinnoitusPrices.general.max);

const priceFactors = [
  { title: "Katon koko", description: "Isoon kattoon kuluu enemmän maalia ja työtä. Neliöhinta kuitenkin laskee, kun katto kasvaa." },
  { title: "Katon jyrkkyys", description: "Jyrkällä katolla työ on hitaampaa ja turvavälineitä tarvitaan enemmän." },
  { title: "Katon muoto", description: "Mitä useammasta osasta katto koostuu, sitä enemmän työtä siinä on." },
  { title: "Sammaleen määrä", description: "Mitä enemmän sammalta on, sitä kauemmin pesu kestää." },
  { title: "Tiilen kunto", description: "Huokoinen tiili imee paljon enemmän maalia. Jos tiiliä on paljon rikki, niiden vaihtamiseen menee myös aikaa." },
];

const offerChecklist = [
  "Onko hinta kiinteä urakkahinta vai arvio?",
  "Kuuluvatko pesu ja rikkinäisten tiilien vaihto hintaan?",
  "Montako kertaa katto maalataan ja millä maalilla?",
  "Tarkistetaanko aluskate ja läpiviennit ennen työtä?",
  "Kuinka pitkä takuu on, ja saatko sen kirjallisena?",
];

const faqItems = [
  {
    question: "Paljonko tiilikaton pinnoitus maksaa neliöltä?",
    answer: `Yleensä 13–22 €/m². Pieni katto (150–180 m²) maksaa 18–22 €/m², yleisin kattokoko (190–240 m²) 15–18 €/m² ja suuri katto (250–300 m²) 13–15 €/m². Neliöhinta laskee, kun katto kasvaa, ja siihen vaikuttavat myös jyrkkyys ja tiilien kunto.`,
  },
  {
    question: "Paljonko katon huoltomaalaus maksaa?",
    answer: "Katon huoltomaalaus on sama työ kuin tiilikaton pinnoitus, joten hinta on sama. Katso hinnat korteista ja esimerkeistä yllä.",
  },
  {
    question: "Milloin pääsette katsomaan katon?",
    answer: 'Kuntotarkastus onnistuu yleensä samalla viikolla, tarvittaessa myös iltaisin tai viikonloppuisin. Pinnoitukset teemme huhti–toukokuusta elo–syyskuuhun, ja työn ajankohta sovitaan kirjallisesti tarjouksen hyväksymisen jälkeen. Lue, mitä <a href="/ilmainen-katon-kuntotarkastus/">ilmaisessa kuntotarkastuksessa</a> katsotaan.',
  },
  {
    question: "Saako tiilikaton pinnoituksesta kotitalousvähennyksen?",
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

const crumbs = [{ name: "Tiilikaton pinnoitus", path: "/tiilikaton-pinnoitus-pirkanmaa" }, { name: "Hinta" }];

const HinnatTiilikalonPinnoitus = () => {
  const seo = staticSeo["/tiilikaton-pinnoitus-hinta-pirkanmaa"];
  return (
    <Rytmi>
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
            Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä <strong className="text-foreground">{general}</strong>. Tarkan hinnan
            saat, kun käymme katsomassa katon. Kuntotarkastus on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta laskurilla" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen arviokäynti" }}
        trust="pinnoitus"
        image={{ base: HERO_BASE.pinnoitusHinta, alt: "Tiilikaton pesu ja sammaleenpoisto käynnissä" }}
        badge={null}
        breadcrumbs={crumbs}
      />

      {/* Hintaesimerkit: samat kortit kuin palvelu- ja kaupunkisivuilla */}
      <PinnoitusPricingCards cityName="Pirkanmaa" cityIn="Pirkanmaalla" calculatorHref="/hintalaskuri/?palvelu=pinnoitus" calculatorLabel="Laske oman kattosi hinta" />
      <KotitalousVahennysNayttamo />

      <CalculatorCta service="pinnoitus" />

      {/* Kolme esimerkkikattoa laskurin kaavoilla (brief 3, 26.10.2026); "Mitä hintaan kuuluu" seuraa heti alla. */}
      <PriceExamplesSection service="pinnoitus" />
      {/* Arvostelunosto: sijoitus ja valinta src/data/arvostelusijoitus.ts */}
      <ArvosteluNosto polku="/tiilikaton-pinnoitus-hinta-pirkanmaa" />

      <HintaKohteet service="pinnoitus" />
      <ToimintaKutsu palvelu="pinnoitus" nappi="kaynti" n={0} />

      {/* Mitä hintaan kuuluu */}
      <section className="section-padding osio">
        <div className="section-container max-w-3xl mx-auto">
          <div>
            <PriceIncludes
              title="Mitä hintaan kuuluu?"
              items={pinnoitusPrices.includes}
              note="Hintaan kuuluu koko työ alusta loppuun. Ylimääräisiä kuluja ei tule. Ennen tarjousta tarkistamme katon, aluskatteen ja ympäristön. Saat työlle 5 vuoden kirjallisen takuun."
            />
          </div>
        </div>
      </section>

      {/* Mistä hinta syntyy */}
      <HintaTekijatLohko title="Mistä tiilikaton pinnoituksen hinta syntyy?" intro="Hintaan vaikuttaa viisi asiaa." factors={priceFactors} />

      <KayntiPalkki palvelu="pinnoitus" />
      {/* Pinnoitus vai uusi katto */}
      <section className="section-padding osio">
        <div className="section-container max-w-4xl mx-auto">
          <PriceSectionHeading
            eyebrow="Vertailu"
            title="Kannattaako pinnoitus vai uusi katto?"
            intro="Pinnoitus riittää, jos aluskate ja katon rakenteet ovat kunnossa. Jos tiilet ovat rikki laajalti tai aluskate vuotaa, katto kannattaa uusia. Pienet aluskatteen korjaukset teemme pinnoituksen yhteydessä."
          />
          <CompareCards
            left={{ title: "Tiilikaton pinnoitus", price: general, note: "Pesu, uudet tiilet rikkinäisten tilalle ja kaksi kerrosta maalia" }}
            right={{ title: "Kattoremontti", price: "15 000–30 000 €", note: "Koko katon uusiminen rakenteista lähtien" }}
          />
          <p className="text-center mt-8 text-muted-foreground">
            Jos et ole varma, onko pinnoitus sinun katollesi ajankohtainen, lue{" "}
            <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto/" className="text-primary font-semibold hover:underline">
              milloin tiilikatto pitää pinnoittaa
            </Link>
            . Työn vaiheet kerromme sivulla{" "}
            <Link to="/tiilikaton-pinnoitus-pirkanmaa/" className="text-primary font-semibold hover:underline">
              tiilikaton pinnoitus Pirkanmaalla
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Tarjouksen vertailu */}
      <section className="section-padding osio">
        <div className="section-container">
          <PriceSectionHeading
            eyebrow="Tarjouksen vertailu"
            title="Mitä tarjouksesta kannattaa katsoa?"
            intro="Kun vertaat tarjouksia, katso muutakin kuin loppusummaa. Kysy ainakin nämä:"
          />
          <Checklist items={offerChecklist} />
        </div>
      </section>
      <ToimintaKutsu palvelu="pinnoitus" nappi="laskuri" n={1} />
      <ArtikkeliRivit categories={["raha"]} />
      <ToimintaKutsu palvelu="pinnoitus" nappi="kaynti" n={2} />
      <FAQSection items={faqItems} />
      <ServiceContactSection variant="katto" />
      <ToimintaAlueetBanner service="pinnoitus" />
    </Rytmi>
  );
};

export default HinnatTiilikalonPinnoitus;
