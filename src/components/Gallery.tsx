import { useState } from "react";
import { motion } from "framer-motion";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import ResponsiveImage from "./ResponsiveImage";

const images = [
  {
    baseName: "vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
    alt: "Vaalea kartanomainen puutalo ulkomaalaus jälkeen Pirkanmaalla",
    category: "Talon maalaus",
  },
  {
    baseName: "moderni-tumma-puutalo-julkisivumaalaus-valmis",
    alt: "Moderni tumma puutalo julkisivumaalaus valmis Pirkanmaalla",
    category: "Talon maalaus",
  },
  {
    baseName: "tiilikaton-pinnoitus-ja-aurinkopaneelien-suojaus",
    alt: "Tiilikaton pinnoitus ja aurinkopaneelien suojaus Pirkanmaalla",
    category: "Tiilikaton pinnoitus",
  },
  {
    baseName: "puhdas-tiilenpunainen-tiilikatto-suojakasittelyn-jalkeen",
    alt: "Puhdas tiilenpunainen tiilikatto suojakäsittelyn jälkeen Pirkanmaalla",
    category: "Tiilikaton pinnoitus",
  },
  {
    baseName: "vastamaalattu-tiilikatto-kattopinnoitus-jalkeen",
    alt: "Vastamaalattu tiilikatto kattopinnoitus jälkeen Pirkanmaalla",
    category: "Tiilikaton pinnoitus",
  },
  {
    baseName: "tummansininen-puutalo-ulkomaalaus-jalkeen",
    alt: "Tummansininen puutalo ulkomaalaus jälkeen Pirkanmaalla",
    category: "Talon maalaus",
  },
];

const INITIAL_COUNT = 3;

const Gallery = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <section id="referenssit" className="section-padding bg-muted">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="heading-style text-3xl md:text-4xl text-accent mb-4">Esimerkkikohteita</h2>
          <p className="text-muted-foreground text-lg">
            Tutustu tekemiimme töihin. Jokainen työ on tehty ammattitaidolla alusta loppuun.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative w-full aspect-[4/3] min-h-[260px] sm:min-h-0 rounded-2xl overflow-hidden bg-muted"
            >
              <ResponsiveImage
                baseName={image.baseName}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                width={600}
                height={450}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-2">
                  {image.category}
                </span>
                <p className="text-primary-foreground text-sm">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount(images.length)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Näytä lisää
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
