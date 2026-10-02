import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getProjectItemsWithNearby, type ProjectService } from "@/data/projects";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

interface CityProjectsProps {
  citySlug: string;
  cityIn: string;
  service?: ProjectService;
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
const CityProjects = ({ citySlug, cityIn, service }: CityProjectsProps) => {
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {items.map((item) => (
            <figure key={item.pair ?? item.image} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50">
              {item.pair ? (
                <BeforeAfterSlider
                  beforeImage={getResponsiveSrc(`${item.pair}-ennen`)}
                  beforeSrcSet={getResponsiveSrcSet(`${item.pair}-ennen`)}
                  afterImage={getResponsiveSrc(`${item.pair}-jalkeen`)}
                  afterSrcSet={getResponsiveSrcSet(`${item.pair}-jalkeen`)}
                  beforeAlt={`${item.alt}: ennen`}
                  afterAlt={`${item.alt}: jälkeen`}
                  aspectRatio="4/3"
                />
              ) : (
                <ResponsiveImage
                  baseName={item.image!}
                  alt={item.alt}
                  className="w-full aspect-[4/3] object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  width={800}
                  height={600}
                />
              )}
              <figcaption className="px-4 py-3 text-sm font-medium text-foreground">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityProjects;
