import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ResponsiveImage from "@/components/ResponsiveImage";
import type { ProjectItem } from "@/data/projects";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

/** Kohdekortit: liukusäädin tai kuva ja kuvateksti. Käytetään kohdelohkossa ja hintasivujen nostoissa. */
const ProjectGrid = ({ items }: { items: ProjectItem[] }) => (
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
);

export default ProjectGrid;
