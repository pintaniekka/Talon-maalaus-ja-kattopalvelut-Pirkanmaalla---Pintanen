import { Link } from "react-router-dom";
import ProjectGrid from "@/components/ProjectGrid";
import { projectItems, type ProjectItem } from "@/data/projects";

/** Etusivun kohteet: kesän 2026 omia töitä, ennen–jälkeen-parit ensin. Lisää kohteita referenssisivulla. */
const pick = (key: string): ProjectItem | undefined => projectItems.find((p) => (p.pair ?? p.image) === key);
const items = [
  "tiilikaton-pinnoitus-tampere-tiilitalo",
  "talon-maalaus-parkano-keltainen-puutalo",
  "tiilikaton-pinnoitus-ylojarvi-punainen-katto",
  "vaalea-talo-pinnoitettu-tiilikatto-kangasala",
  "musta-tiilikatto-pinnoituksen-jalkeen-ylojarvi",
  "punainen-tiilikatto-pinnoituksen-jalkeen-orivesi",
]
  .map(pick)
  .filter((p): p is ProjectItem => Boolean(p));

const Gallery = () => (
  <section id="referenssit" className="section-padding bg-muted">
    <div className="section-container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="heading-style text-3xl md:text-4xl text-accent-ink mb-4">Esimerkkikohteita</h2>
        <p className="text-muted-foreground text-lg">
          Tutustu tekemiimme töihin. Kuvat ovat omista kohteistamme Pirkanmaalla.
        </p>
      </div>
      <ProjectGrid items={items} />
      <div className="text-center mt-10">
        <Link
          to="/referenssit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Katso kaikki kohteet
        </Link>
      </div>
    </div>
  </section>
);

export default Gallery;
