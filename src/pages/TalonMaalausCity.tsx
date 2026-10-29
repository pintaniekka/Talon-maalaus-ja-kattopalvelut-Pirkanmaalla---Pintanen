import { Navigate } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import CityMap from "@/components/CityMap";
import Kaupunginosat from "@/components/Kaupunginosat";
import CityProjects from "@/components/CityProjects";
import CityServiceSummary from "@/components/CityServiceSummary";
import CityHousingFacts from "@/components/CityHousingFacts";
import VarinVaihto from "@/components/VarinVaihto";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import MiksiValitaPintanen from "@/components/MiksiValitaPintanen";
import { MaalausCitySigns } from "@/components/maalaus/MaalausCitySections";
import MaalausSanasto from "@/components/maalaus/MaalausSanasto";
import MaalausPricingCards from "@/components/maalaus/MaalausPricingCards";
import MaalausEntrepreneur from "@/components/maalaus/MaalausEntrepreneur";
import FAQSection from "@/components/FAQSection";
import ServiceContactSection from "@/components/ServiceContactSection";
import SEO from "@/components/SEO";
import ReviewsTeaser from "@/components/ReviewsTeaser";
import ServiceSchema from "@/components/ServiceSchema";
import { maalausCitySeo, cityHeroBase, HERO_BASE } from "@/data/seo";
import { getCityBySlug } from "@/data/cityData";
import { getCityWikipediaUrl } from "@/data/cityWikipedia";
import { hasKuntakartta } from "@/data/kartat";
import { getMaalausCityFAQ } from "@/data/faqData";
import { getLocalCityFaq } from "@/data/cityFaq";
import { maalausPrices } from "@/data/prices";
import { maalausLyhyesti, maalausTyovaiheet, MAALAUS_HINTA } from "@/data/tyovaiheet";
import { getTestimonialsByCity } from "@/data/testimonialsData";

/**
 * Talon maalauksen kaupunkisivu (SEO-suunnitelma 25.10.2026, vaihe 2). Sama runko kuin pinnoituksen
 * kaupunkisivulla: hero → Lyhyesti → paikallisosio ja kartta → merkit → hintakortit → työvaiheet →
 * rinnakkaissanat → kohteet → mitä hintaan kuuluu → miksi Pintanen → talokanta → Eemil → UKK →
 * yhteydenotto → naapurikunnat.
 */
const TalonMaalausCity = ({ citySlug }: { citySlug: string }) => {
  const cityData = getCityBySlug(citySlug);

  if (!cityData || !cityData.maalausLocalHookTitle) {
    return <Navigate to="/talon-maalaus-pirkanmaa/" replace />;
  }

  const cityName = cityData.name;
  const seo = maalausCitySeo(cityData);
  const crumbs = [{ name: "Talon maalaus", path: "/talon-maalaus-pirkanmaa" }, { name: cityName }];
  const heroBase = cityHeroBase(cityData.slug, "maalaus");
  const ownPhoto = heroBase !== HERO_BASE.maalaus;
  const kartta = hasKuntakartta(cityData.slug);

  return (
    <div>
      <Rytmi>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema
        name="Talon ulkomaalaus"
        alternateNames={["Talon maalaus", "Julkisivumaalaus", "Huoltomaalaus", "Puutalon maalaus"]}
        area={cityName}
        areaSameAs={getCityWikipediaUrl(cityData)}
        description={seo.description}
        priceRange={maalausPrices.general}
      />

      <PageHero
        eyebrow={`Talon maalaus · ${cityName}`}
        title={
          <>
            Talon maalaus <span className="text-accent-ink">{cityName}</span>
          </>
        }
        lead={
          <>
            Maalaamme puutaloja {cityData.cityIn}. Pohjatyöt ratkaisevat, kuinka pitkään maali kestää. Hinta on yleensä{" "}
            <strong className="text-foreground">{MAALAUS_HINTA}</strong>, työ kestää 3–7 päivää ja takuu on 2 vuotta. Arviokäynti on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=maalaus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=maalaus", label: "Pyydä ilmainen arviokäynti" }}
        trust="maalaus"
        image={{ base: heroBase, alt: ownPhoto ? `Maalaamamme talo ${cityData.cityIn}` : "Tummansininen puutalo ulkomaalauksen jälkeen" }}
        badge={{ title: "Eemil maalaa", text: "Maalaa seinät maalausparin kanssa ja vastaa jäljestä." }}
        breadcrumbs={crumbs}
      />

      <Lyhyesti content={maalausLyhyesti} />

      <section className="section-padding osio">
        <div className="section-container">
          <div className={`mx-auto ${kartta ? "max-w-5xl grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center" : "max-w-3xl"}`}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">{cityData.maalausLocalHookTitle}</h2>
              <p
                className="text-muted-foreground leading-relaxed text-base md:text-lg [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: cityData.maalausLocalHookText || "" }}
              />
              <Kaupunginosat slug={cityData.slug} cityGenitive={cityData.cityGenitive} service="maalaus" />
            </div>
            {kartta && <CityMap slug={cityData.slug} name={cityData.name} />}
          </div>
        </div>
      </section>

      <MaalausCitySigns cityName={cityName} cityIn={cityData.cityIn} />
      <MaalausPricingCards cityName={cityName} cityIn={cityData.cityIn} />

      <ProcessList
        title={`Näin talon maalaus etenee ${cityData.cityIn}`}
        intro="Omakotitalon ulkomaalaus kestää 3–7 päivää. Aika riippuu talon koosta ja pohjatöiden määrästä."
        steps={maalausTyovaiheet}
        cta={{ to: "/tarjouspyynto/?palvelu=maalaus", label: "Pyydä ilmainen arviokäynti" }}
      />

      <MaalausSanasto cityIn={cityData.cityIn} />
      <CityProjects citySlug={cityData.slug} cityIn={cityData.cityIn} service="maalaus" featureFirst />
      <CityServiceSummary service="maalaus" cityIn={cityData.cityIn} />
      <MiksiValitaPintanen service="maalaus" cityIn={cityData.cityIn} />
      <CityHousingFacts citySlug={cityData.slug} cityIn={cityData.cityIn} service="maalaus" hideMap={kartta} />
      <VarinVaihto service="maalaus" citySlug={cityData.slug} cityIn={cityData.cityIn} />
      <MaalausEntrepreneur cityIn={cityData.cityIn} />
      <FAQSection
        items={[...getLocalCityFaq(cityData, "maalaus"), ...getMaalausCityFAQ(cityName, cityData.cityGenitive, cityData.cityIn)]}
        title={`Usein kysyttyä talon maalauksesta ${cityData.cityIn}`}
      />
      {getTestimonialsByCity(cityData.slug, "seina").length === 0 && <ReviewsTeaser citySlug={cityData.slug} category="seina" />}
      <ServiceContactSection variant="maalaus" cityName={cityData.name} cityGenitive={cityData.cityGenitive} />
      <ToimintaAlueetBanner activeCity={cityData.slug} service="maalaus" showNeighbors />
      </Rytmi>
    </div>
  );
};

export default TalonMaalausCity;
