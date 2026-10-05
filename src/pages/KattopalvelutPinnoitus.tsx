import { Link } from "react-router-dom";
import { Search } from "@/components/icons/BrandIcons";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProcessList from "@/components/ProcessList";
import PinnoitusComparison from "@/components/pinnoitus/PinnoitusComparison";
import PinnoitusPricingCards from "@/components/pinnoitus/PinnoitusPricingCards";
import PinnoitusEntrepreneur from "@/components/pinnoitus/PinnoitusEntrepreneur";
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
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

const warningSigns = [
  { sign: "Väri on haalistunut", desc: "tiilen tehdaspinta on kulunut pois, ja tiili alkaa imeä vettä." },
  { sign: "Sammal kasvaa nopeasti", desc: "sammal tarttuu helpoimmin karheaan ja kuluneeseen pintaan." },
  { sign: "Tiiliä on rikki", desc: "vesi on päässyt tiilen sisään ja jäätynyt. Vaihdamme rikkinäiset tiilet uusiin." },
  { sign: "Pinta tuntuu karhealta", desc: "karhea tiili imee vettä jokaisella sateella." },
];

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
            Pesemme tiilikaton painepesulla ja maalaamme sen ruiskulla kahteen kertaan. Pinnoitettu katto kestää jopa 15–20 vuotta pidempään. Hinta on
            yleensä <strong className="text-foreground">{PINNOITUS_HINTA}</strong>, ja annamme työlle 5 vuoden takuun. Tulemme katsomaan
            kattosi ilmaiseksi.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
        trust="pinnoitus"
        image={{ base: HERO_BASE.pinnoitus, alt: "Kirkkaan punainen tiilikatto pinnoituksen jälkeen" }}
        badge={{ title: "Yrittäjä itse katolla", text: "Eerik tekee työn itse." }}
        breadcrumbs={[{ name: "Tiilikaton pinnoitus" }]}
      />

      <Lyhyesti items={pinnoitusLyhyesti()} />

      {/* ═══ MIKSI AJOISSA ═══ */}
      <section className="section-padding bg-accent-light">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4">Miksi tiilikatto kannattaa pinnoittaa ajoissa?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Moni tiilikatto näyttää kaukaa hyvältä, vaikka tiilen tehdaspinta on jo kulunut pois. Kun pinta kuluu, tiili alkaa imeä
              vettä. Talvella vesi jäätyy ja rikkoo tiilen. Uusi maalipinta pitää veden tiilen ulkopuolella.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
            <div className="lg:sticky lg:top-28">
              <BeforeAfterSlider
                beforeImage={getResponsiveSrc("likainen-tiilikatto-ennen-pesua-ja-suojakasittelya")}
                afterImage={getResponsiveSrc("uudenveroinen-punainen-tiilikatto-maalaus-jalkeen")}
                beforeSrcSet={getResponsiveSrcSet("likainen-tiilikatto-ennen-pesua-ja-suojakasittelya")}
                afterSrcSet={getResponsiveSrcSet("uudenveroinen-punainen-tiilikatto-maalaus-jalkeen")}
                beforeAlt="Likainen tiilikatto ennen pesua"
                afterAlt="Punainen tiilikatto maalauksen jälkeen"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Pakkasrapautuminen rikkoo kuluneen tiilen</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Suomen talvessa tiili jäätyy ja sulaa kymmeniä kertoja. Kun vesi on imeytynyt tiileen, jää laajenee ja murentaa
                  tiiltä sisältäpäin. Tiili halkeilee, ja lopulta vesi pääsee aluskatteelle. Pinnoitus katkaisee tämän kierteen.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Pesu ei riitä, jos tiilen pinta on kulunut</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sammal ja jäkälä pitävät katon märkänä. Pesu poistaa kasvuston, mutta kulunut pinta imee vettä, vaikka katto olisi
                  juuri pesty. Siksi pesemme katon ja maalaamme sen ruiskulla kahteen kertaan. Ahtaat paikat, joihin ruisku ei yllä,
                  maalaamme telalla tai käsin.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-accent-ink" />
                  Huomaatko nämä merkit katollasi?
                </h4>
                <ul className="space-y-3">
                  {warningSigns.map((w) => (
                    <li key={w.sign} className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong className="text-foreground">{w.sign}:</strong> {w.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/tarjouspyynto/?palvelu=pinnoitus"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors hover:brightness-110"
                style={{ backgroundColor: "hsl(var(--accent-strong))" }}
              >
                Pyydä ilmainen kuntotarkastus
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProcessList
        title="Näin tiilikaton pinnoitus etenee"
        intro="Omakotitalon katto valmistuu yleensä 2–4 työpäivässä. Pesun ja maalauksen välissä katto saa kuivua."
        steps={pinnoitusTyovaiheet}
        cta={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
      />

      {/* ═══ TIILIKATON MAALAUS = PINNOITUS (P2) ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-5">Tiilikaton maalaus ja pinnoitus ovat sama asia</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Joku hakee tietoa tiilikaton maalauksesta, toinen tiilikaton pinnoituksesta. Nämä kaksi tarkoittavat samaa asiaa: pesemme
              katon painepesulla, vaihdamme rikkinäiset tiilet uusiin ja maalaamme katon ruiskulla kahteen kertaan. Ensin tulee pohjamaali,
              sitten pintamaali.
            </p>
            <p>Käytämme Nowocoatin kattomaaleja.</p>
          </div>
        </div>
      </section>

      <PinnoitusComparison />
      <PinnoitusPricingCards cityName="Pirkanmaa" cityIn="Pirkanmaalla" />
      <KotitalousVahennys />
      <PinnoitusEntrepreneur />

      <FAQSection items={pinnoitusFAQ} title="Usein kysyttyä tiilikaton pinnoituksesta" />

      {/* ═══ PAIKKAKUNNAT ═══ */}
      <section className="py-12 md:py-16 bg-background">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">Tiilikaton pinnoitus paikkakunnittain</h2>
          <p className="text-muted-foreground mb-6">
            Pinnoitamme tiilikattoja Pirkanmaalla ja lähikunnissa noin tunnin säteellä Tampereelta. Katso oman paikkakuntasi sivu:
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
