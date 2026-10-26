import { useParams, Navigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import CityProjects from "@/components/CityProjects";
import CityMap from "@/components/CityMap";
import { hasKuntakartta } from "@/data/kartat";
import CityServiceSummary from "@/components/CityServiceSummary";
import CityHousingFacts from "@/components/CityHousingFacts";
import CityNeighborLinks from "@/components/CityNeighborLinks";
import PinnoitusEntrepreneur from "@/components/pinnoitus/PinnoitusEntrepreneur";
import PinnoitusWhyNow from "@/components/pinnoitus/PinnoitusWhyNow";
import PinnoitusSamaTyo from "@/components/pinnoitus/PinnoitusSamaTyo";
import PinnoitusPricingCards from "@/components/pinnoitus/PinnoitusPricingCards";
import MiksiValitaPintanen from "@/components/MiksiValitaPintanen";
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
import { pinnoitusLyhyesti, pinnoitusTyovaiheet, PINNOITUS_HINTA } from "@/data/tyovaiheet";
import { getTestimonialsByCity } from "@/data/testimonialsData";

/**
 * Tiilikaton pinnoituksen kaupunkisivu (SEO-suunnitelma 25.10.2026, vaihe 1). Järjestys: hero → Lyhyesti →
 * paikallinen teksti (lyhyt erottaja) ja kartta → miksi ajoissa + merkit → hintakortit katon koon mukaan
 * (yöajo 26.10.2026: "paljonko maksaa" on asiakasviestien yleisin kysymys, joten hinta heti syyn jälkeen) →
 * pesu ja pinnoitus työvaiheina → maalaus = pinnoitus (rinnakkaissanat) → kohteet → mitä hintaan kuuluu ja
 * remontti vai pinnoitus → miksi Pintanen → talokanta → yrittäjä → FAQ → arvostelut → yhteydenotto →
 * naapurikunnat ja kaikki kunnat. Pois jätetty: arvostelukaruselli ja Toiminta-alueet-palkki (korjaus 6).
 */
const KattopalvelutPinnoitusCity = ({ citySlug: propSlug }: { citySlug?: string }) => {
  const { city: paramCity } = useParams<{ city: string }>();
  const city = propSlug || paramCity;
  const cityData = city ? getCityBySlug(city) : undefined;
  const kartta = hasKuntakartta(propSlug ?? "");

  if (!cityData || !hasPinnoitusPage(cityData.slug)) return <Navigate to="/tiilikaton-pinnoitus-pirkanmaa/" replace />;

  const seo = pinnoitusCitySeo(cityData);
  const crumbs = [{ name: "Tiilikaton pinnoitus", path: "/tiilikaton-pinnoitus-pirkanmaa" }, { name: cityData.name }];
  const heroBase = cityHeroBase(cityData.slug, "pinnoitus");
  const ownPhoto = heroBase !== "tiilikaton-pinnoitus-kirkkaan-punainen-tiilikatto-jalkeen";

  return (
    <div>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema name="Tiilikaton pinnoitus" alternateNames={["Katon pinnoitus", "Tiilikaton maalaus", "Kattomaalaus", "Tiilikaton pesu ja pinnoitus"]} area={cityData.name} description={seo.description} priceRange={pinnoitusPrices.general} />

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
            <strong className="text-foreground">{PINNOITUS_HINTA}</strong>, ja takuu on 5 vuotta. Kuntotarkastus on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
        trust="pinnoitus"
        image={{
          base: heroBase,
          alt: ownPhoto ? `Pinnoittamamme tiilikatto ${cityData.cityIn}` : "Kirkkaan punainen tiilikatto pinnoituksen jälkeen",
        }}
        badge={{ title: "Eerik tekee työn", text: "Pinnoittaa katon itse ja vastaa jäljestä." }}
        breadcrumbs={crumbs}
      />

      <Lyhyesti content={pinnoitusLyhyesti} />

      {cityData.pinnoitusLocalHookTitle && cityData.pinnoitusLocalHookText && (
        <section className="section-padding bg-card">
          <div className="section-container">
            <div className={`mx-auto ${kartta ? "max-w-5xl grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center" : "max-w-3xl"}`}>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">{cityData.pinnoitusLocalHookTitle}</h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{cityData.pinnoitusLocalHookText}</p>
              </div>
              {kartta && <CityMap slug={cityData.slug} name={cityData.name} />}
            </div>
          </div>
        </section>
      )}

      <PinnoitusWhyNow cityIn={cityData.cityIn} />
      <PinnoitusPricingCards cityName={cityData.name} cityIn={cityData.cityIn} />

      <ProcessList
        title={`Tiilikaton pesu ja pinnoitus ${cityData.cityIn}: näin työ etenee`}
        intro="Peruskohteen katto valmistuu 2–3 työpäivässä. Pesun ja maalauksen välissä katto saa kuivua."
        steps={pinnoitusTyovaiheet}
        cta={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
      />

      <PinnoitusSamaTyo cityIn={cityData.cityIn} />
      <CityProjects citySlug={cityData.slug} cityIn={cityData.cityIn} service="pinnoitus" featureFirst />
      <CityServiceSummary service="pinnoitus" cityIn={cityData.cityIn} />
      <MiksiValitaPintanen service="pinnoitus" cityIn={cityData.cityIn} />
      <CityHousingFacts citySlug={cityData.slug} cityIn={cityData.cityIn} service="pinnoitus" hideMap={kartta} />
      <PinnoitusEntrepreneur cityIn={cityData.cityIn} />

      <FAQSection
        items={[...getLocalCityFaq(cityData, "pinnoitus"), ...getPinnoitusCityFAQ(cityData.name, cityData.cityIn)]}
        title={`Usein kysyttyä tiilikaton pinnoituksesta ${cityData.cityIn}`}
      />
      {getTestimonialsByCity(cityData.slug).length === 0 && <ReviewsTeaser citySlug={cityData.slug} category="katto" />}
      <ServiceContactSection variant="katto" cityName={cityData.name} cityGenitive={cityData.cityGenitive} />
      <CityNeighborLinks city={cityData} service="pinnoitus" />
    </div>
  );
};

export default KattopalvelutPinnoitusCity;
