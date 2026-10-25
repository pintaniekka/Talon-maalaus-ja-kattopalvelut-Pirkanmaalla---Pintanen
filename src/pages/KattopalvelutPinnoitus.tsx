import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import PinnoitusComparison from "@/components/pinnoitus/PinnoitusComparison";
import PinnoitusPricingCards from "@/components/pinnoitus/PinnoitusPricingCards";
import PinnoitusEntrepreneur from "@/components/pinnoitus/PinnoitusEntrepreneur";
import PinnoitusWhyNow from "@/components/pinnoitus/PinnoitusWhyNow";
import PinnoitusSamaTyo from "@/components/pinnoitus/PinnoitusSamaTyo";
import MiksiValitaPintanen from "@/components/MiksiValitaPintanen";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import RelatedArticles from "@/components/RelatedArticles";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import { roofTestimonials } from "@/data/testimonialsData";
import { pinnoitusFAQ } from "@/data/faqData";
import { HERO_BASE, staticSeo } from "@/data/seo";
import { pinnoitusCities } from "@/data/cityData";
import { pinnoitusPrices } from "@/data/prices";
import { pinnoitusTyovaiheet, pinnoitusLyhyesti, PINNOITUS_HINTA } from "@/data/tyovaiheet";

/** Linkit kaupunkisivuille sisältöön (6.3): palvelusivu ohjaa paikkakuntasivuille muutenkin kuin palkin kautta. */
const cityLinks = pinnoitusCities.filter((c) => ["tampere", "nokia", "ylojarvi", "kangasala", "lempaala", "pirkkala", "sastamala", "hameenkyro"].includes(c.slug));

const KattopalvelutPinnoitus = () => {
  const seo = staticSeo["/tiilikaton-pinnoitus-pirkanmaa"];
  return (
    <div>
      <SEO {...seo} breadcrumbs={[{ name: "Tiilikaton pinnoitus" }]} />
      <ServiceSchema
        name="Tiilikaton pinnoitus"
        area="Pirkanmaa"
        areaType="AdministrativeArea"
        description={seo.description}
        priceRange={pinnoitusPrices.general}
      />

      <PageHero
        eyebrow="Tiilikaton pinnoitus · Pirkanmaa"
        title={
          <>
            Tiilikaton pinnoitus <span className="text-accent-ink">Pirkanmaalla</span>
          </>
        }
        lead={
          <>
            Kulunutta tiilikattoa ei yleensä tarvitse uusia. Pinnoitettu katto kestää jopa 15–20 vuotta pidempään. Hinta on yleensä{" "}
            <strong className="text-foreground">{PINNOITUS_HINTA}</strong>, ja takuu on 5 vuotta. Kuntotarkastus on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
        trust="pinnoitus"
        image={{ base: HERO_BASE.pinnoitus, alt: "Kirkkaan punainen tiilikatto pinnoituksen jälkeen" }}
        badge={{ title: "Eerik tekee työn", text: "Pinnoittaa katon itse ja vastaa jäljestä." }}
        breadcrumbs={[{ name: "Tiilikaton pinnoitus" }]}
      />

      <Lyhyesti content={pinnoitusLyhyesti} />

      <PinnoitusWhyNow />

      <ProcessList
        title="Näin tiilikaton pinnoitus etenee"
        intro="Peruskohteen katto valmistuu 2–3 työpäivässä. Pesun ja maalauksen välissä katto saa kuivua."
        steps={pinnoitusTyovaiheet}
        cta={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
      />

      <PinnoitusSamaTyo />

      <PinnoitusComparison />
      <PinnoitusPricingCards cityName="Pirkanmaa" cityIn="Pirkanmaalla" />
      <KotitalousVahennys />
      <MiksiValitaPintanen service="pinnoitus" />
      <PinnoitusEntrepreneur />

      <FAQSection items={pinnoitusFAQ} title="Usein kysyttyä tiilikaton pinnoituksesta" />

      {/* ═══ PAIKKAKUNNAT ═══ */}
      <section className="py-12 md:py-16 bg-background">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">Tiilikaton pinnoitus paikkakunnittain</h2>
          <p className="text-muted-foreground mb-6">
            Pinnoitamme tiilikattoja Pirkanmaalla ja lähikunnissa. Katso oman paikkakuntasi sivu:
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {cityLinks.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/tiilikaton-pinnoitus-${c.slug}/`}
                  className="inline-flex items-center px-4 py-2 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:border-accent hover:text-accent-ink transition-colors"
                >
                  Tiilikaton pinnoitus {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/toiminta-alueet/"
                className="inline-flex items-center px-4 py-2 rounded-xl border border-accent bg-card text-sm font-semibold text-accent-ink hover:bg-accent-light transition-colors"
              >
                Kaikki paikkakunnat
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <TestimonialsMarquee testimonials={roofTestimonials} title="Mitä kattoasiakkaat sanovat meistä?" />
      <RelatedArticles categories={["katto", "raha"]} />
      <ServiceContactSection variant="katto" />
    </div>
  );
};

export default KattopalvelutPinnoitus;
