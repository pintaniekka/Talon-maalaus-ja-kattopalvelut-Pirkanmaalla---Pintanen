import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import MaalausProblemSection from "@/components/maalaus/MaalausProblemSection";
import MaalausComparison from "@/components/maalaus/MaalausComparison";
import MaalausPricingCards from "@/components/maalaus/MaalausPricingCards";
import MaalausEntrepreneur from "@/components/maalaus/MaalausEntrepreneur";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import FAQSection from "@/components/FAQSection";
import ServiceContactSection from "@/components/ServiceContactSection";
import RelatedArticles from "@/components/RelatedArticles";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import { wallTestimonials } from "@/data/testimonialsData";
import { maalausFAQ } from "@/data/faqData";
import { HERO_BASE, staticSeo } from "@/data/seo";
import { maalausCities } from "@/data/cityData";
import { maalausPrices } from "@/data/prices";
import { maalausTyovaiheet, maalausLyhyesti, MAALAUS_HINTA } from "@/data/tyovaiheet";

const cityLinks = maalausCities.filter((c) => ["tampere", "nokia", "ylojarvi", "kangasala", "lempaala", "pirkkala", "valkeakoski", "sastamala"].includes(c.slug));

/** /talon-maalaus-pirkanmaa: päätehtävä "talon maalaus Pirkanmaa", rinnakkaissanat ulkomaalaus ja julkisivumaalaus (korjaus 2). */
const TalonMaalaus = () => {
  const seo = staticSeo["/talon-maalaus-pirkanmaa"];
  return (
    <div>
      <SEO {...seo} breadcrumbs={[{ name: "Talon maalaus" }]} />
      <ServiceSchema name="Talon ulkomaalaus" area="Pirkanmaa" areaType="AdministrativeArea" description={seo.description} priceRange={maalausPrices.general} />

      <PageHero
        eyebrow="Talon maalaus · Pirkanmaa"
        title={
          <>
            Talon maalaus <span className="text-accent-ink">Pirkanmaalla</span>
          </>
        }
        lead={
          <>
            Maalaamme talojen ulkoseinät. Pesemme seinät homepesuaineella, kaavimme irtoavan maalin, pohjamaalaamme paljaat kohdat ja
            maalaamme pintamaalin pensselillä. Hinta on yleensä <strong className="text-foreground">{MAALAUS_HINTA}</strong>. Arviokäynti
            on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=maalaus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=maalaus", label: "Pyydä ilmainen arviokäynti" }}
        trust="maalaus"
        image={{ base: HERO_BASE.maalaus, alt: "Tummansininen puutalo ulkomaalauksen jälkeen" }}
        badge={{ title: "Yrittäjä itse tikkailla", text: "Eemil maalaa ja vastaa jäljestä." }}
        breadcrumbs={[{ name: "Talon maalaus" }]}
      />

      <Lyhyesti items={maalausLyhyesti()} />

      {/* Ulkomaalaus ja julkisivumaalaus näkyvään tekstiin (korjaus 2) */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-5">Ulkomaalaus, julkisivumaalaus ja huoltomaalaus</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Talon maalausta kutsutaan monella nimellä: ulkomaalaus, julkisivumaalaus tai huoltomaalaus. Me teemme kaikilla nimillä saman
              työn. Maalaamme omakotitalojen, paritalojen ja mökkien puiset ulkoseinät Pirkanmaalla ja lähikunnissa.
            </p>
            <p>Pohjatyöt ratkaisevat, kuinka pitkään maali kestää. Siksi pesemme ja kaavimme huolella ennen maalausta ja suojaamme terassit ja ikkunat.</p>
          </div>
        </div>
      </section>

      <MaalausProblemSection />

      <ProcessList
        title="Näin talon maalaus etenee"
        intro="Omakotitalon ulkomaalaus kestää meillä yleensä 3–7 päivää. Aika riippuu talon koosta ja pohjatöiden määrästä."
        steps={maalausTyovaiheet}
        cta={{ to: "/tarjouspyynto/?palvelu=maalaus", label: "Pyydä ilmainen arviokäynti" }}
      />

      <MaalausComparison />
      <MaalausPricingCards />
      <KotitalousVahennys />
      <MaalausEntrepreneur />
      <FAQSection items={maalausFAQ} title="Usein kysyttyä talon maalauksesta" />

      <section className="py-12 md:py-16 bg-background">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">Talon maalaus paikkakunnittain</h2>
          <p className="text-muted-foreground mb-6">Maalaamme taloja Pirkanmaalla ja lähikunnissa noin tunnin säteellä Tampereelta. Katso oman paikkakuntasi sivu:</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {cityLinks.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/talon-maalaus-${c.slug}/`}
                  className="inline-flex items-center px-4 py-2 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:border-accent hover:text-accent-ink transition-colors"
                >
                  Talon maalaus {c.name}
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

      <TestimonialsMarquee testimonials={wallTestimonials} title="Mitä maalausasiakkaat sanovat meistä?" />
      <RelatedArticles categories={["maalaus", "raha"]} />
      <ServiceContactSection variant="maalaus" />
    </div>
  );
};

export default TalonMaalaus;
