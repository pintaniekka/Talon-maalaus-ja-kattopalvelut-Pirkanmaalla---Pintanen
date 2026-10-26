import { CITY_LOCAL_FACTS_CHECKED, getCityLocalFacts } from "@/data/cityLocalFacts";
import { housingFactsText } from "@/data/cityHousingText";
import { HOUSING_STATS_SOURCE_LABEL, HOUSING_STATS_SOURCE_URL } from "@/data/cityHousingStats";

interface CityLocalRulesProps {
  citySlug: string;
  cityIn: string;
  /** Aluesivulla talokannan luvut näytetään tässä samassa lohkossa; palvelusivuilla ne ovat jo CityHousingFacts-lohkossa. */
  showHousing?: boolean;
}

/**
 * Kunnan rakennusjärjestys ja katon tai julkisivun värin vaihto (paketti C, 26.10.2026).
 * Tekstit tulevat tiedostosta cityLocalFacts.ts, lähteet tiedostosta docs/kaupunkisivut-lahteet.md.
 * Käyttää samoja tyylejä kuin aluesivun paikallinen tekstilohko.
 */
const CityLocalRules = ({ citySlug, cityIn, showHousing }: CityLocalRulesProps) => {
  const facts = getCityLocalFacts(citySlug);
  if (!facts) return null;
  const housing = showHousing ? housingFactsText(citySlug, cityIn, "pinnoitus") : undefined;

  return (
    <section className="section-padding bg-card">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">
            Pitääkö katon tai seinän värin vaihdosta kysyä lupaa {cityIn}?
          </h2>
          {housing && (
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4">
              {housing} Luvut ovat Tilastokeskuksen rakennuskannasta, ja niissä ovat mukana kaikki omakoti- ja paritalot.
            </p>
          )}
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4">
            Maalaus samaan väriin on yleensä tavallista huoltoa, johon ei tarvita lupaa. Jos väri vaihtuu, kunnan
            rakennusjärjestys kertoo, tarvitaanko lupaa. {facts.saanto}
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4">{facts.tilanne}</p>
          <p className="text-sm text-muted-foreground">
            Lähde:{" "}
            <a href={facts.lahde} target="_blank" rel="noopener noreferrer" className="underline">
              kunnan rakennusjärjestys ja rakennusvalvonnan sivut
            </a>
            , luettu {CITY_LOCAL_FACTS_CHECKED}.
            {housing && (
              <>
                {" "}
                Talojen määrät:{" "}
                <a href={HOUSING_STATS_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">
                  {HOUSING_STATS_SOURCE_LABEL}
                </a>
                .
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CityLocalRules;
