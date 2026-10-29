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
import Vaarinymmarrykset from "@/components/Vaarinymmarrykset";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import HintaKohteet from "@/components/hinnat/HintaKohteet";
import { Checklist, CompareCards, HintaTekijatLohko, PriceIncludes, PriceSectionHeading } from "@/components/hinnat/PriceSections";
import { PriceExamplesSection } from "@/components/hinnat/PriceExamples";
import { pinnoitusPrices, fmtRange } from "@/data/prices";
import { HERO_BASE } from "@/data/seo";
import { KOTITALOUSVAHENNYS } from "@/data/company";
import { PESU_VAI_PINNOITUS_FAQ, PINNOITUS_MAALI_FAQ } from "@/data/faqData";

const general = fmtRange(pinnoitusPrices.general.min, pinnoitusPrices.general.max);

const priceFactors = [
  { title: "Katon koko", description: "Isoon kattoon kuluu enemmän maalia ja työtä. Neliöhinta kuitenkin laskee, kun katto kasvaa." },
  { title: "Katon jyrkkyys", description: "Jyrkällä katolla työ on hitaampaa ja turvavälineitä tarvitaan enemmän." },
  { title: "Katon muoto", description: "Harjat, jiirit ja läpiviennit lisäävät työtä." },
  { title: "Talon korkeus", description: "Jyrkällä tai korkealla katolla työ on hitaampaa." },
  { title: "Tiilien kunto", description: "Jos tiiliä on paljon rikki, niiden vaihtamiseen menee aikaa." },
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
    answer: `Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä ${general}. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Laskurilla saat suuntaa antavan arvion. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.`,
  },
  { question: "Kuinka monta päivää työ kestää?", answer: "Peruskohteen katto valmistuu 2–3 työpäivässä. Suuri tai jyrkkä katto voi viedä neljä." },
  {
    question: "Saanko karkean hinta-arvion ennen käyntiä?",
    answer: "Kyllä. Hintalaskuri antaa suuntaa antavan arvion heti katon koon ja jyrkkyyden mukaan. Tarkan, kiinteän hinnan saat kirjallisessa tarjouksessa ilmaisen kuntotarkastuksen jälkeen.",
  },
  {
    question: "Milloin pääsette katsomaan katon?",
    answer: 'Kuntotarkastus onnistuu yleensä samalla viikolla, myös iltaisin ja viikonloppuisin. Pinnoitukset teemme huhti–toukokuusta elo–syyskuuhun, ja työn ajankohta sovitaan kirjallisesti tarjouksen hyväksymisen jälkeen. Lue, mitä <a href="/ilmainen-katon-kuntotarkastus/">ilmaisessa kuntotarkastuksessa</a> katsotaan.',
  },
  {
    question: "Kuinka pitkään pinnoitettu katto kestää?",
    answer: "Pinnoitettu katto kestää jopa 15 vuotta pidempään. Kesto riippuu säästä ja katon kunnosta.",
  },
  {
    question: "Paljonko tiilikaton pinnoitus maksaa neliöltä?",
    answer: `Yleensä 13–22 €/m². Pieni katto (150–180 m²) maksaa 18–22 €/m², yleisin kattokoko (190–240 m²) 15–18 €/m² ja suuri katto (250–300 m²) 13–15 €/m². Neliöhinta laskee, kun katto kasvaa, ja siihen vaikuttavat myös jyrkkyys ja tiilien kunto. Omakotitalon katto maksaa yleensä ${general}.`,
  },
  {
    question: "Paljonko katon huoltomaalaus maksaa?",
    answer: `Katon huoltomaalaus on sama työ kuin tiilikaton pinnoitus. Hinta on yleensä ${general}.`,
  },
  {
    question: "Pinnoitatteko Ormax-tiilikattoja?",
    answer: "Kyllä. Ormax on yleisin 2000-luvun kattotiili, ja vanhemmissa katoissa on monia eri tiiliprofiileja. Työ ja hinta ovat samat tiilen merkistä riippumatta.",
  },
  {
    question: "Voiko pinnoituksen tehdä, jos tiiliä on rikki?",
    answer: "Yksittäiset rikkinäiset tiilet vaihdetaan uusiin. Jos sinulla on varatiiliä, käytämme niitä. Muuten voit hankkia tiilet itse, tai me haemme ne sovittua lisähintaa vastaan. Rakenteiden vaurioita pinnoitus ei korjaa.",
  },
  { question: "Pitääkö olla kotona?", answer: "Arviokäynnillä kyllä, koska käymme katon ja tarjouksen läpi yhdessä. Työn aikana ei ole pakko, kunhan sähkö ja vesipiste ovat käytettävissä." },
  {
    question: "Saako tiilikaton pinnoituksesta kotitalousvähennyksen?",
    answer: `Kyllä. ${KOTITALOUSVAHENNYS} Erittelemme työn ja materiaalit laskulle valmiiksi. Lue lisää sivulta <a href="/kotitalousvahennys/">kotitalousvähennys</a>.`,
  },
  { question: "Kuinka pitkä takuu pinnoituksella on?", answer: "Saat tiilikaton pinnoitukselle meiltä 5 vuoden kirjallisen takuun." },
  // Brief 10 (26.10.2026): samat kysymykset kuin palvelusivulla (faqData.ts).
  PESU_VAI_PINNOITUS_FAQ,
  PINNOITUS_MAALI_FAQ,
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
            Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä <strong className="text-foreground">{general}</strong>. Hinta riippuu
            katon koosta, jyrkkyydestä, muodosta ja tiilien kunnosta. Työ kestää 2–3 päivää, ja takuu on 5 vuotta. Tarkan hinnan saat,
            kun käymme katsomassa katon. Kuntotarkastus on ilmainen.
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
              note="Hintaan kuuluu koko työ alusta loppuun. Ylimääräisiä kuluja ei tule. Ennen tarjousta tarkistamme katon, aluskatteen ja ympäristön. Saat työlle 5 vuoden kirjallisen takuun. Hinnat sisältävät arvonlisäveron 25,5 %."
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
      <Vaarinymmarrykset service="pinnoitus" />


      <ArtikkeliRivit categories={["katto", "raha"]} />
      <ToimintaKutsu palvelu="pinnoitus" nappi="kaynti" n={2} />
      <FAQSection items={faqItems} />
      <ServiceContactSection variant="katto" />
      <ToimintaAlueetBanner service="pinnoitus" />
    </Rytmi>
  );
};

export default HinnatTiilikalonPinnoitus;
