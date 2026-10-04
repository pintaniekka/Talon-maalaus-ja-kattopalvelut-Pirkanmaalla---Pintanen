import { Navigate } from "react-router-dom";
import CityProjects from "@/components/CityProjects";
import { motion } from "framer-motion";
import { MapPin } from "@/components/icons/BrandIcons";
import { Link } from "react-router-dom";
import ServicePageHero from "@/components/ServicePageHero";
import MaalausTrustStats from "@/components/maalaus/MaalausTrustStats";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import { wallTestimonials } from "@/data/testimonialsData";
import MaalausProblemSection from "@/components/maalaus/MaalausProblemSection";
import MaalausProcessAccordion from "@/components/maalaus/MaalausProcessAccordion";
import MaalausComparison from "@/components/maalaus/MaalausComparison";
import MaalausPricingCards from "@/components/maalaus/MaalausPricingCards";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import MaalausFinancing from "@/components/maalaus/MaalausFinancing";
import MaalausEntrepreneur from "@/components/maalaus/MaalausEntrepreneur";
import FAQSection from "@/components/FAQSection";
import TeamContactSection from "@/components/TeamContactSection";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import { maalausCitySeo } from "@/data/seo";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import { getCityBySlug } from "@/data/cityData";
import { getMaalausCityFAQ } from "@/data/faqData";

const heroBase = "moderni-tumma-puutalo-julkisivumaalaus-valmis";
const heroImage = getResponsiveSrc(heroBase);
const heroSrcSet = getResponsiveSrcSet(heroBase);

const TalonMaalausCity = ({ citySlug }: { citySlug: string }) => {
  const cityData = getCityBySlug(citySlug);

  if (!cityData || !cityData.maalausLocalHookTitle) {
    return <Navigate to="/talon-maalaus-pirkanmaa" replace />;
  }

  const cityName = cityData.name;

  return (
    <div>
      <SEO
        {...maalausCitySeo(cityData)}
        preloadImage={heroImage}
      />
      <ServiceSchema name="Talon ulkomaalaus" area={cityData.name} description={maalausCitySeo(cityData).description} />

      <ServicePageHero
        title=""
        subtitle=""
        backgroundImage={heroImage}
        backgroundSrcSet={heroSrcSet}
      >
        <div className="bg-black/45 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto text-left mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Talon maalaus{' '}
            <span className="text-accent-ink drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">{cityName}</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            <strong>Suojaa kotisi säänvaihteluilta ja pidennä ulkoverhouksen ikää laadukkaalla maalauksella.</strong> Meiltä saat <strong>perusteelliset pohjatyöt</strong>, <strong>säänkestävän lopputuloksen</strong> ja <strong>täysin läpinäkyvän hinnoittelun</strong>. <strong>Kokeile avointa hintalaskuriamme heti verkossa</strong> tai kutsu meidät <strong>maksuttomalle arviokäynnille</strong> suoraan kotiovellesi – palvelemme paikallisesti ja joustavasti!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/tarjouspyynto?palvelu=maalaus"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-all hover:brightness-110 text-base"
            style={{ backgroundColor: "hsl(var(--accent-strong))" }}
          >
            Pyydä ilmainen kuntoarvio
          </Link>
          <Link
            to="/hintalaskuri?palvelu=maalaus"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground transition-all hover:brightness-95 text-base"
            style={{ backgroundColor: 'hsl(36, 56%, 91%)' }}
          >
            Laske hinta laskurilla
          </Link>
        </div>
      </ServicePageHero>

      <MaalausTrustStats />

      {/* Local Hook */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-accent-ink text-center">
                {cityData.maalausLocalHookTitle}
              </h2>
            </div>
            <p
              className="text-lg text-muted-foreground leading-relaxed text-center"
              dangerouslySetInnerHTML={{ __html: cityData.maalausLocalHookText || '' }}
            />
          </motion.div>
        </div>
      </section>

      <CityProjects citySlug={cityData.slug} cityIn={cityData.cityIn} service="maalaus" />

      <TestimonialsMarquee testimonials={wallTestimonials} title="Mitä maalausasiakkaat sanovat meistä?" />
      <MaalausProblemSection cityName={cityName} />
      <MaalausProcessAccordion cityName={cityName} />
      <MaalausComparison cityIn={cityData.cityIn} />
      <MaalausPricingCards cityName={cityName} />
      <KotitalousVahennys />
      <MaalausFinancing cityName={cityName} />
      <MaalausEntrepreneur />
      <FAQSection items={getMaalausCityFAQ(cityName, cityData.cityGenitive, cityData.cityIn)} />
      <TeamContactSection cityName={cityName} cityGenitive={cityData.cityGenitive} />
      <ToimintaAlueetBanner activeCity={citySlug} service="maalaus" />
    </div>
  );
};

export default TalonMaalausCity;
