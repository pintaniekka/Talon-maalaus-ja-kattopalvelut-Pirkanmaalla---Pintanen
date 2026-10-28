import { Link } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import Kuvanosto from "@/components/Kuvanosto";
import ProcessList from "@/components/ProcessList";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import MaalausProblemSection from "@/components/maalaus/MaalausProblemSection";
import MaalausComparison from "@/components/maalaus/MaalausComparison";
import MaalausPricingCards from "@/components/maalaus/MaalausPricingCards";
import MaalausEntrepreneur from "@/components/maalaus/MaalausEntrepreneur";
import MaalausTalotyypit from "@/components/maalaus/MaalausTalotyypit";
import MiksiValitaPintanen from "@/components/MiksiValitaPintanen";
import Vaarinymmarrykset from "@/components/Vaarinymmarrykset";
import VarinVaihto from "@/components/VarinVaihto";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import FAQSection from "@/components/FAQSection";
import ServiceContactSection from "@/components/ServiceContactSection";
import RelatedArticles from "@/components/RelatedArticles";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import { wallTestimonials } from "@/data/testimonialsData";
import { maalausFAQ } from "@/data/faqData";
import { HERO_BASE, staticSeo } from "@/data/seo";
import { maalausPrices } from "@/data/prices";
import { maalausTyovaiheet, maalausLyhyesti, MAALAUS_HINTA } from "@/data/tyovaiheet";


/** /talon-maalaus-pirkanmaa: päätehtävä "talon maalaus Pirkanmaa", rinnakkaissanat ulkomaalaus ja julkisivumaalaus (korjaus 2). */
const TalonMaalaus = () => {
  const seo = staticSeo["/talon-maalaus-pirkanmaa"];
  return (
    <div>
      <Rytmi>
      <SEO {...seo} breadcrumbs={[{ name: "Talon maalaus" }]} />
      <ServiceSchema name="Talon ulkomaalaus" alternateNames={["Talon maalaus", "Julkisivumaalaus", "Huoltomaalaus", "Puutalon maalaus"]} area="Pirkanmaa" areaType="AdministrativeArea" description={seo.description} priceRange={maalausPrices.general} />

      <PageHero
        eyebrow="Talon maalaus · Pirkanmaa"
        title={
          <>
            Talon maalaus <span className="text-accent-ink">Pirkanmaalla</span>
          </>
        }
        lead={
          <>
            Maalaamme puutalojen ulkoseinät. Pohjatyöt ratkaisevat, kuinka pitkään maali kestää. Hinta on yleensä{" "}
            <strong className="text-foreground">{MAALAUS_HINTA}</strong>, työ kestää 3–7 päivää ja takuu on 2 vuotta. Arviokäynti on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=maalaus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=maalaus", label: "Pyydä ilmainen arviokäynti" }}
        trust="maalaus"
        image={{ base: HERO_BASE.maalaus, alt: "Tummansininen puutalo ulkomaalauksen jälkeen" }}
        badge={{ title: "Eemil maalaa", text: "Maalaa seinät maalausparin kanssa ja vastaa jäljestä." }}
        breadcrumbs={[{ name: "Talon maalaus" }]}
      />

      <Lyhyesti content={maalausLyhyesti} />

      {/* Ulkomaalaus ja julkisivumaalaus näkyvään tekstiin (korjaus 2) */}
      <section className="section-padding osio">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-5">Ulkomaalaus, julkisivumaalaus ja huoltomaalaus</h2>
          <div className="flow-root space-y-4 text-lg text-muted-foreground leading-relaxed">
            <Kuvanosto
              base="talon-maalaus-moderni-tumma-puutalo-julkisivumaalaus-valmis"
              alt="Moderni tumma puutalo julkisivumaalauksen jälkeen"
              caption="Moderni puutalo julkisivumaalauksen jälkeen."
              ratio="16/9"
            />
            <p>
              Ulkomaalaus, julkisivumaalaus, huoltomaalaus ja puutalon maalaus tarkoittavat samaa työtä. Maalaamme omakotitalojen,
              paritalojen ja mökkien puiset ulkoseinät Pirkanmaalla ja lähikunnissa. Talon maalaus onnistuu myös kauempana Tampereelta.
            </p>
            <p>
              Hintaesimerkit ja laskuri:{" "}
              <Link to="/talon-maalaus-hinta-pirkanmaa/" className="text-primary font-semibold hover:underline">
                talon maalauksen hinta
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <MaalausProblemSection />
      <Vaarinymmarrykset service="maalaus" />

      <ProcessList
        title="Näin talon maalaus etenee"
        intro="Omakotitalon ulkomaalaus kestää meillä yleensä 3–7 päivää. Aika riippuu talon koosta ja pohjatöiden määrästä."
        steps={maalausTyovaiheet}
        cta={{ to: "/tarjouspyynto/?palvelu=maalaus", label: "Pyydä ilmainen arviokäynti" }}
      />

      {/* Talotyypit työvaiheiden jälkeen (brief 4, 26.10.2026): rintamamiestalo, hirsitalo, mökki ja piharakennukset. */}
      <MaalausTalotyypit />
      <VarinVaihto service="maalaus" />

      <MaalausComparison />
      <MaalausPricingCards />
      <MiksiValitaPintanen service="maalaus" />
      <KotitalousVahennys />
      <MaalausEntrepreneur />
      <TestimonialsMarquee testimonials={wallTestimonials} title="Mitä maalausasiakkaat sanovat meistä?" />
      <RelatedArticles categories={["maalaus", "raha"]} />
      <FAQSection items={maalausFAQ} title="Usein kysyttyä talon maalauksesta" />
      <ServiceContactSection variant="maalaus" />
      <ToimintaAlueetBanner service="maalaus" />
      </Rytmi>
    </div>
  );
};

export default TalonMaalaus;
