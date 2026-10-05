import ProjectGrid from "@/components/ProjectGrid";
import { getProjectItemsWithNearby, type ProjectService } from "@/data/projects";

interface CityProjectsProps {
  citySlug: string;
  cityIn: string;
  service?: ProjectService;
  /** Ensimmäinen kohde isona. */
  featureFirst?: boolean;
}

const headings: Record<ProjectService | "all", (cityIn: string) => string> = {
  pinnoitus: (cityIn) => `Tiilikaton pinnoituksia ${cityIn}`,
  maalaus: (cityIn) => `Talon maalauksia ${cityIn}`,
  all: (cityIn) => `Kohteitamme ${cityIn}`,
};

/**
 * Kohdelohko: oman paikkakunnan oikeat kohteet. Ei näy, jos paikkakunnalta ei ole kuvia.
 * Jos omia kohteita on alle kolme, rivi täytetään muun Pirkanmaan kohteilla ja otsikko kertoo sen.
 */
const CityProjects = ({ citySlug, cityIn, service, featureFirst }: CityProjectsProps) => {
  const { items, hasNearby } = getProjectItemsWithNearby(citySlug, service);
  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-3">
            {headings[service ?? "all"](cityIn)}
            {hasNearby && " ja muualla Pirkanmaalla"}
          </h2>
          <p className="text-muted-foreground">Kuvat ovat omista kohteistamme.</p>
        </div>
        <ProjectGrid items={items} featureFirst={featureFirst && items.length >= 3} />
      </div>
    </section>
  );
};

export default CityProjects;
