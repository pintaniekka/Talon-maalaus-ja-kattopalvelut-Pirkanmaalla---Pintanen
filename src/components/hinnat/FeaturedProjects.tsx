import { Link } from "react-router-dom";
import ProjectGrid from "@/components/ProjectGrid";
import { getFeaturedProjectItems, type ProjectService } from "@/data/projects";

/** Hintasivun kohdenosto: kolme omaa kohdetta ja linkki referensseihin. */
const FeaturedProjects = ({ service, title }: { service: ProjectService; title: string }) => {
  const items = getFeaturedProjectItems(service, 3);
  if (items.length === 0) return null;
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-3">{title}</h2>
          <p className="text-muted-foreground">Kuvat ovat omista kohteistamme kesältä 2026.</p>
        </div>
        <ProjectGrid items={items} />
        <div className="text-center mt-8">
          <Link to="/referenssit/" className="text-primary font-semibold hover:underline">
            Katso lisää referenssejä
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
