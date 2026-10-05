import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ResponsiveImage from "@/components/ResponsiveImage";
import type { ProjectItem } from "@/data/projects";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

/** Kohdekortit: liukusäädin tai kuva ja kuvateksti. Käytetään kohdelohkossa ja hintasivujen nostoissa. */
/**
 * featureFirst: ensimmäinen kohde näytetään isona (kaksi saraketta ja kaksi riviä leveällä näytöllä),
 * loput sen vieressä ja alla. Käytetään kaupunkisivuilla, joissa paikkakunnan oma kuva on sivun tärkein sisältö.
 */
const ProjectGrid = ({ items, featureFirst = false }: { items: ProjectItem[]; featureFirst?: boolean }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
    {items.map((item, index) => (
      <figure
        key={item.pair ?? item.image}
        className={`bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 ${
          featureFirst && index === 0 ? "sm:col-span-2 lg:row-span-2" : ""
        }`}
      >
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
            sizes={featureFirst && index === 0 ? "(max-width: 640px) 100vw, 780px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"}
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
