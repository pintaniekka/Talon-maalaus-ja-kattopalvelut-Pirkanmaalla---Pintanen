import { Navigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import CityProjects from "@/components/CityProjects";
import CityServiceSummary from "@/components/CityServiceSummary";
import CityHousingFacts from "@/components/CityHousingFacts";
import CityNeighborLinks from "@/components/CityNeighborLinks";
import { MaalausCitySigns } from "@/components/maalaus/MaalausCitySections";
import MaalausEntrepreneur from "@/components/maalaus/MaalausEntrepreneur";
import FAQSection from "@/components/FAQSection";
import ServiceContactSection from "@/components/ServiceContactSection";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import { maalausCitySeo, cityHeroBase, HERO_BASE } from "@/data/seo";
import { getCityBySlug } from "@/data/cityData";
import { getMaalausCityFAQ } from "@/data/faqData";
import { getLocalCityFaq } from "@/data/cityFaq";
import { maalausPrices } from "@/data/prices";
import { maalausLyhyesti, MAALAUS_HINTA } from "@/data/tyovaiheet";

/**
 * Talon maalauksen kaupunkisivu. Sama tiivistetty järjestys kuin pinnoituksen kaupunkisivulla.
 * Yhteydenotto samalla lomakkeella kuin muualla (V15: tietosuojalause, honeypot, samat yhteystiedot).
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

  return (
    <div>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema name="Talon ulkomaalaus" area={cityName} description={seo.description} priceRange={maalausPrices.general} />

      <PageHero
        eyebrow={`Talon maalaus · ${cityName}`}
        title={
          <>
            Talon maalaus <span className="text-accent-ink">{cityName}</span>
          </>
        }
        lead={
          <>
            Maalaamme taloja {cityData.cityIn}. Pesemme seinät homepesuaineella, kaavimme irtoavan maalin, pohjamaalaamme paljaat kohdat ja
            maalaamme pintamaalin pensselillä. Hinta on yleensä <strong className="text-foreground">{MAALAUS_HINTA}</strong>. Arviokäynti
            on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=maalaus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=maalaus", label: "Pyydä ilmainen arviokäynti" }}
        trust="maalaus"
        image={{ base: heroBase, alt: ownPhoto ? `Maalaamamme talo ${cityData.cityIn}` : "Tummansininen puutalo ulkomaalauksen jälkeen" }}
        badge={{ title: "Yrittäjä itse tikkailla", text: "Eemil maalaa ja vastaa jäljestä." }}
        breadcrumbs={crumbs}
      />

      <Lyhyesti items={maalausLyhyesti(cityData.cityIn)} />

      <section className="section-padding bg-card">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">{cityData.maalausLocalHookTitle}</h2>
            <p
              className="text-muted-foreground leading-relaxed text-base md:text-lg [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: cityData.maalausLocalHookText || "" }}
            />
          </div>
        </div>
      </section>

      <CityProjects citySlug={cityData.slug} cityIn={cityData.cityIn} service="maalaus" featureFirst />
      <MaalausCitySigns cityName={cityName} cityIn={cityData.cityIn} />
      <CityHousingFacts citySlug={cityData.slug} cityIn={cityData.cityIn} service="maalaus" />
      <CityServiceSummary service="maalaus" cityIn={cityData.cityIn} />
      <MaalausEntrepreneur cityIn={cityData.cityIn} />
      <FAQSection
        items={[...getLocalCityFaq(cityData, "maalaus"), ...getMaalausCityFAQ(cityName, cityData.cityGenitive, cityData.cityIn)]}
        title={`Usein kysyttyä talon maalauksesta ${cityData.cityIn}`}
      />
      <ServiceContactSection variant="maalaus" cityName={cityName} cityGenitive={cityData.cityGenitive} />
      <CityNeighborLinks city={cityData} service="maalaus" />
    </div>
  );
};

export default TalonMaalausCity;
