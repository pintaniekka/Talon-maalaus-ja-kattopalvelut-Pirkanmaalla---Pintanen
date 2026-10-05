import { useParams, Navigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import CityProjects from "@/components/CityProjects";
import CityHousingFacts from "@/components/CityHousingFacts";
import CityNeighborLinks from "@/components/CityNeighborLinks";
import PinnoitusComparison from "@/components/pinnoitus/PinnoitusComparison";
import PinnoitusPricingCards from "@/components/pinnoitus/PinnoitusPricingCards";
import PinnoitusEntrepreneur from "@/components/pinnoitus/PinnoitusEntrepreneur";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import { getPinnoitusCityFAQ } from "@/data/faqData";
import { getLocalCityFaq } from "@/data/cityFaq";
import { pinnoitusCitySeo, cityHeroBase } from "@/data/seo";
import { getCityBySlug, hasPinnoitusPage } from "@/data/cityData";
import { pinnoitusPrices } from "@/data/prices";
import { pinnoitusTyovaiheet, pinnoitusLyhyesti, PINNOITUS_HINTA } from "@/data/tyovaiheet";

/**
 * Tiilikaton pinnoituksen kaupunkisivu. Järjestys (auditointi 8.3): hero → Lyhyesti → paikallinen
 * teksti → talokanta → kohteet → työvaiheet avoimena → kattoremontti vai pinnoitus → hinta →
 * kotitalousvähennys → yrittäjä → FAQ (paikalliset kysymykset ensin) → yhteydenotto → naapurikunnat.
 * Pois jätetty: arvostelukaruselli, erillinen rahoituslohko ja Toiminta-alueet-palkki (korjaus 6).
 */
const KattopalvelutPinnoitusCity = ({ citySlug: propSlug }: { citySlug?: string }) => {
  const { city: paramCity } = useParams<{ city: string }>();
  const city = propSlug || paramCity;
  const cityData = city ? getCityBySlug(city) : undefined;

  if (!cityData || !hasPinnoitusPage(cityData.slug)) return <Navigate to="/tiilikaton-pinnoitus-pirkanmaa/" replace />;

  const seo = pinnoitusCitySeo(cityData);
  const crumbs = [{ name: "Tiilikaton pinnoitus", path: "/tiilikaton-pinnoitus-pirkanmaa" }, { name: cityData.name }];
  const heroBase = cityHeroBase(cityData.slug, "pinnoitus");
  const ownPhoto = heroBase !== "kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen";

  return (
    <div>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema name="Tiilikaton pinnoitus" area={cityData.name} description={seo.description} priceRange={pinnoitusPrices.general} />

      <PageHero
        eyebrow={`Tiilikaton pinnoitus · ${cityData.name}`}
        title={
          <>
            Tiilikaton pinnoitus <span className="text-accent-ink">{cityData.name}</span>
          </>
        }
        lead={
          <>
            Pinnoitamme tiilikattoja {cityData.cityIn}. Pesemme katon painepesulla, vaihdamme rikkinäiset tiilet uusiin ja maalaamme
            katon ruiskulla kahteen kertaan. Hinta on yleensä <strong className="text-foreground">{PINNOITUS_HINTA}</strong>. Tulemme
            katsomaan kattosi ilmaiseksi.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
        trust="pinnoitus"
        image={{
          base: heroBase,
          alt: ownPhoto ? `Pinnoittamamme tiilikatto ${cityData.cityIn}` : "Kirkkaan punainen tiilikatto pinnoituksen jälkeen",
        }}
        badge={{ title: "Yrittäjä itse katolla", text: "Eerik tekee työn ja vastaa jäljestä." }}
        breadcrumbs={crumbs}
      />

      <Lyhyesti items={pinnoitusLyhyesti(cityData.cityIn)} />

      {cityData.pinnoitusLocalHookTitle && cityData.pinnoitusLocalHookText && (
        <section className="section-padding bg-card">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">{cityData.pinnoitusLocalHookTitle}</h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{cityData.pinnoitusLocalHookText}</p>
            </div>
          </div>
        </section>
      )}

      <CityHousingFacts citySlug={cityData.slug} cityIn={cityData.cityIn} service="pinnoitus" />
      <CityProjects citySlug={cityData.slug} cityIn={cityData.cityIn} service="pinnoitus" />

      <ProcessList
        title={`Näin tiilikaton pinnoitus ${cityData.cityIn} etenee`}
        intro="Omakotitalon katto valmistuu yleensä 2–4 työpäivässä. Välissä katto saa kuivua."
        steps={pinnoitusTyovaiheet}
        cta={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
      />

      <PinnoitusComparison cityIn={cityData.cityIn} />
      <PinnoitusPricingCards cityName={cityData.name} cityIn={cityData.cityIn} />
      <KotitalousVahennys />
      <PinnoitusEntrepreneur cityIn={cityData.cityIn} />

      <FAQSection
        items={[...getLocalCityFaq(cityData, "pinnoitus"), ...getPinnoitusCityFAQ(cityData.name, cityData.cityIn)]}
        title={`Usein kysyttyä tiilikaton pinnoituksesta ${cityData.cityIn}`}
      />
      <ServiceContactSection variant="katto" cityName={cityData.name} cityGenitive={cityData.cityGenitive} />
      <CityNeighborLinks city={cityData} service="pinnoitus" />
    </div>
  );
};

export default KattopalvelutPinnoitusCity;
