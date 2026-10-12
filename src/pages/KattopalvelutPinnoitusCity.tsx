import { useParams, Navigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import CityProjects from "@/components/CityProjects";
import CityServiceSummary from "@/components/CityServiceSummary";
import CityHousingFacts from "@/components/CityHousingFacts";
import CityNeighborLinks from "@/components/CityNeighborLinks";
import PinnoitusEntrepreneur from "@/components/pinnoitus/PinnoitusEntrepreneur";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import SEO from "@/components/SEO";
import ReviewsTeaser from "@/components/ReviewsTeaser";
import ServiceSchema from "@/components/ServiceSchema";
import { getPinnoitusCityFAQ } from "@/data/faqData";
import { getLocalCityFaq } from "@/data/cityFaq";
import { pinnoitusCitySeo, cityHeroBase } from "@/data/seo";
import { getCityBySlug, hasPinnoitusPage } from "@/data/cityData";
import { pinnoitusPrices } from "@/data/prices";
import { pinnoitusLyhyesti, PINNOITUS_HINTA } from "@/data/tyovaiheet";
import { getTestimonialsByCity } from "@/data/testimonialsData";

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
            Pinnoitamme tiilikattoja {cityData.cityIn}. Pinnoitettu katto kestää jopa 15–20 vuotta pidempään. Hinta on yleensä{" "}
            <strong className="text-foreground">{PINNOITUS_HINTA}</strong>, ja takuu on 5 vuotta. Arviokäynti on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen arviokäynti" }}
        trust="pinnoitus"
        image={{
          base: heroBase,
          alt: ownPhoto ? `Pinnoittamamme tiilikatto ${cityData.cityIn}` : "Kirkkaan punainen tiilikatto pinnoituksen jälkeen",
        }}
        badge={{ title: "Eerik tekee työn", text: "Pinnoittaa katon itse ja vastaa jäljestä." }}
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

      <CityProjects citySlug={cityData.slug} cityIn={cityData.cityIn} service="pinnoitus" featureFirst />
      <CityServiceSummary service="pinnoitus" cityIn={cityData.cityIn} />
      <CityHousingFacts citySlug={cityData.slug} cityIn={cityData.cityIn} service="pinnoitus" />
      <PinnoitusEntrepreneur cityIn={cityData.cityIn} />

      <FAQSection
        items={[...getLocalCityFaq(cityData, "pinnoitus"), ...getPinnoitusCityFAQ(cityData.name, cityData.cityIn)]}
        title={`Usein kysyttyä tiilikaton pinnoituksesta ${cityData.cityIn}`}
      />
      {getTestimonialsByCity(cityData.slug).length === 0 && <ReviewsTeaser citySlug={cityData.slug} category="katto" />}
      <ServiceContactSection variant="katto" />
      <CityNeighborLinks city={cityData} service="pinnoitus" />
    </div>
  );
};

export default KattopalvelutPinnoitusCity;
