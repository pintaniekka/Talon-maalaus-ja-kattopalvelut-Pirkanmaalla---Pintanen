import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ServiceContactSection from '@/components/ServiceContactSection';
import SEO from '@/components/SEO';
import { HERO_BASE, staticSeo } from "@/data/seo";
import ResponsiveImage from '@/components/ResponsiveImage';
import { getResponsiveSrc, getResponsiveSrcSet, getResponsiveUrl } from '@/lib/storage';

type Category = 'all' | 'pinnoitus' | 'puhdistus' | 'maalaus';

interface ProjectImage {
  baseName: string;
  label: string;
}

interface GroupedProject {
  type: 'group';
  title: string;
  category: Category;
  images: ProjectImage[];
}

interface SingleProject {
  type: 'single';
  baseName: string;
  title: string;
  category: Category;
}

type Project = GroupedProject | SingleProject;

const CompositeThumbnail = ({ images }: { images: ProjectImage[] }) => (
  <div className="relative w-full h-full flex overflow-hidden">
    {images.map((img, idx) => (
      <div key={idx} className="h-full overflow-hidden bg-muted/40" style={{ width: `${100 / images.length}%` }}>
        <ResponsiveImage
          baseName={img.baseName}
          alt={img.label}
          sizes="(min-width: 1024px) 17vw, (min-width: 640px) 25vw, 50vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            objectPosition: idx === 0 ? 'left center' : idx === images.length - 1 ? 'right center' : 'center center',
          }}
        />
      </div>
    ))}
  </div>
);

// Lightbox image with onError fallback to the largest existing variant.
const LightboxImage = ({
  baseName,
  alt,
  className,
  thumbnail = false,
  onClick,
}: {
  baseName: string;
  alt: string;
  className?: string;
  thumbnail?: boolean;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}) => {
  const [errored, setErrored] = useState(false);
  const src = errored
    ? getResponsiveUrl(baseName, 1500)
    : getResponsiveSrc(baseName);
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={thumbnail ? 'lazy' : 'eager'}
      decoding="async"
      onClick={onClick}
      onError={() => setErrored(true)}
    />
  );
};

const Lightbox = ({
  project,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
}: {
  project: GroupedProject;
  currentIndex: number;
  onClose: () => void;
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  onSelectIndex: (idx: number) => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    onClick={onClose}
  >
    <button className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10" onClick={onClose}>
      <X className="w-8 h-8" />
    </button>

    {project.images.length > 1 && (
      <>
        <button
          className={`absolute left-4 p-3 rounded-full bg-black/50 text-white transition-all z-10 ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/70'}`}
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className={`absolute right-4 p-3 rounded-full bg-black/50 text-white transition-all z-10 ${currentIndex === project.images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/70'}`}
          onClick={onNext}
          disabled={currentIndex === project.images.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </>
    )}

    <div className="flex flex-col items-center max-w-5xl w-full">
      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={getResponsiveSrc(project.images[currentIndex].baseName)}
        alt={project.images[currentIndex].label}
        className="max-w-full max-h-[75vh] object-contain rounded-lg"
        loading="eager"
        decoding="async"
        onClick={(e) => e.stopPropagation()}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          const fallback = getResponsiveUrl(project.images[currentIndex].baseName, 1500);
          // img.src on absoluuttinen, fallback suhteellinen: verrataan polun loppua.
          if (!img.src.endsWith(fallback)) img.src = fallback;
        }}
      />

      {project.images.length > 1 && (
        <>
          <div className="mt-4 text-center">
            <p className="text-white text-lg font-medium">{project.images[currentIndex].label}</p>
            <p className="text-white/60 text-sm mt-1">{currentIndex + 1} / {project.images.length}</p>
          </div>
          <div className="flex gap-2 mt-4">
            {project.images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); onSelectIndex(idx); }}
                className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <LightboxImage baseName={img.baseName} alt={img.label} className="w-full h-full object-cover" thumbnail />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  </motion.div>
);

const Referenssit = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState<GroupedProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: 'Kaikki' },
    { key: 'pinnoitus', label: 'Tiilikaton pinnoitus' },
    { key: 'puhdistus', label: 'Katon puhdistus' },
    { key: 'maalaus', label: 'Talon maalaus' },
  ];

  const projects: Project[] = [
    // 1. Vaalea kartano
    { type: 'single', baseName: 'vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen', category: 'maalaus', title: 'Vaalea kartanomainen puutalo ulkomaalaus jälkeen Pirkanmaalla' },
    // 2. Moderni tumma puutalo
    { type: 'single', baseName: 'moderni-tumma-puutalo-julkisivumaalaus-valmis', category: 'maalaus', title: 'Moderni tumma puutalo julkisivumaalaus valmis Pirkanmaalla' },
    // 3. Aurinkopaneeli
    { type: 'single', baseName: 'tiilikaton-pinnoitus-ja-aurinkopaneelien-suojaus', category: 'pinnoitus', title: 'Tiilikaton pinnoitus ja aurinkopaneelien suojaus Pirkanmaalla' },
    // 4. Puhdas tiilenpunainen
    { type: 'single', baseName: 'puhdas-tiilenpunainen-tiilikatto-suojakasittelyn-jalkeen', category: 'pinnoitus', title: 'Puhdas tiilenpunainen tiilikatto suojakäsittelyn jälkeen Pirkanmaalla' },
    // Loput samassa järjestyksessä
    {
      type: 'group',
      title: 'Tiilikaton pinnoitus – Valkeakoski',
      category: 'pinnoitus',
      images: [
        { baseName: 'likainen-tiilikatto-ennen-pesua-ja-suojakasittelya', label: 'Likainen tiilikatto ennen pesua ja suojakäsittelyä Valkeakoskella' },
        { baseName: 'uudenveroinen-punainen-tiilikatto-maalaus-jalkeen', label: 'Uudenveroinen punainen tiilikatto maalaus jälkeen Valkeakoskella' },
      ],
    },
    {
      type: 'group',
      title: 'Tiilikaton pinnoitus – Tampere',
      category: 'pinnoitus',
      images: [
        { baseName: 'haalistunut-punainen-tiilikatto-ennen-pinnoitusta', label: 'Haalistunut punainen tiilikatto ennen pinnoitusta Tampereella' },
        { baseName: 'kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen', label: 'Kirkkaan punainen tiilikatto pinnoituksen jälkeen Tampereella' },
      ],
    },
    {
      type: 'group',
      title: 'Tiilikaton puhdistus – Sastamala',
      category: 'puhdistus',
      images: [
        { baseName: 'sammaleinen-tiilikatto-ennen-mekaanista-puhdistusta', label: 'Sammaleinen tiilikatto ennen mekaanista puhdistusta Sastamalassa' },
        { baseName: 'puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen', label: 'Puhdas tiilikatto mekaanisen puhdistuksen jälkeen Sastamalassa' },
      ],
    },
    {
      type: 'group',
      title: 'Värinvaihto – Tampere',
      category: 'maalaus',
      images: [
        { baseName: 'keltainen-puutalo-varinvaihto-ennen-maalausta', label: 'Keltainen puutalo värinvaihto ennen maalausta Tampereella' },
        { baseName: 'violetti-puutalo-varinvaihto-peittomaalaus-jalkeen', label: 'Violetti puutalo värinvaihto peittomaalaus jälkeen Tampereella' },
      ],
    },
    {
      type: 'group',
      title: 'Sinisen talon maalaus – Hämeenkyrö',
      category: 'maalaus',
      images: [
        { baseName: 'tummansininen-puutalo-ulkomaalaus-ennen', label: 'Tummansininen puutalo ulkomaalaus ennen Hämeenkyrössä' },
        { baseName: 'tummansininen-puutalo-ulkomaalaus-jalkeen', label: 'Tummansininen puutalo ulkomaalaus jälkeen Hämeenkyrössä' },
      ],
    },
    {
      type: 'group',
      title: 'Värinvaihto harmaaksi – Pirkanmaa',
      category: 'maalaus',
      images: [
        { baseName: 'punainen-omakotitalo-varinvaihto-ennen-maalausta', label: 'Punainen omakotitalo värinvaihto ennen maalausta Pirkanmaalla' },
        { baseName: 'harmaa-omakotitalo-varinvaihto-ulkomaalaus-jalkeen', label: 'Harmaa omakotitalo värinvaihto ulkomaalaus jälkeen Pirkanmaalla' },
      ],
    },
    {
      type: 'group',
      title: 'Vihreän talon maalaus – Hämeenkyrö',
      category: 'maalaus',
      images: [
        { baseName: 'vihrea-puutalo-ennen-ulkomaalausta-ja-pohjatoita', label: 'Vihreä puutalo ennen ulkomaalausta ja pohjatöitä Hämeenkyrössä' },
        { baseName: 'vihrea-puutalo-ulkomaalaus-jalkeen', label: 'Vihreä puutalo ulkomaalaus jälkeen Hämeenkyrössä' },
      ],
    },
    {
      type: 'group',
      title: 'Keltaisen talon maalaus – Hämeenlinna',
      category: 'maalaus',
      images: [
        { baseName: 'keltainen-omakotitalo-huoltomaalaus-ennen', label: 'Keltainen omakotitalo huoltomaalaus ennen Hämeenlinnassa' },
        { baseName: 'keltainen-omakotitalo-julkisivumaalaus-jalkeen', label: 'Keltainen omakotitalo julkisivumaalaus jälkeen Hämeenlinnassa' },
      ],
    },
    {
      type: 'group',
      title: 'Keltainen seinä – Pirkanmaa',
      category: 'maalaus',
      images: [
        { baseName: 'keltainen-puuverhous-ennen-julkisivumaalausta', label: 'Keltainen puuverhous ennen julkisivumaalausta Pirkanmaalla' },
        { baseName: 'keltainen-ulkoverhous-huoltomaalaus-jalkeen', label: 'Keltainen ulkoverhous huoltomaalaus jälkeen Pirkanmaalla' },
      ],
    },
    {
      type: 'group',
      title: 'Parveke ja julkisivu – Ylöjärvi',
      category: 'maalaus',
      images: [
        { baseName: 'puutalon-ja-parvekkeen-puuosien-kunnostus-ennen', label: 'Puutalon ja parvekkeen puuosien kunnostus ennen Ylöjärvellä' },
        { baseName: 'puutalon-ja-parvekkeen-huoltomaalaus-jalkeen', label: 'Puutalon ja parvekkeen huoltomaalaus jälkeen Ylöjärvellä' },
      ],
    },
    { type: 'single', baseName: 'tummanharmaa-tiilikaton-pinnoitus-ja-huolto-jalkeen', category: 'pinnoitus', title: 'Tummanharmaa tiilikaton pinnoitus ja huolto jälkeen Pirkanmaalla' },
    { type: 'single', baseName: 'tummanharmaa-kattotiili-pesu-ja-pinnoitustyo', category: 'pinnoitus', title: 'Tummanharmaa kattotiili pesu ja pinnoitustyö Pirkanmaalla' },
    { type: 'single', baseName: 'vastamaalattu-tiilikatto-kattopinnoitus-jalkeen', category: 'pinnoitus', title: 'Vastamaalattu tiilikatto kattopinnoitus jälkeen Pirkanmaalla' },
    { type: 'single', baseName: 'tiilikaton-pesu-ja-pinnoitus-ennen-jalkeen', category: 'pinnoitus', title: 'Tiilikaton pesu ja pinnoitus ennen jälkeen Pirkanmaalla' },
    { type: 'single', baseName: 'tiilikaton-pesu-ja-sammaleenpoisto', category: 'puhdistus', title: 'Tiilikaton pesu ja sammaleenpoisto Pirkanmaalla' },
    { type: 'single', baseName: 'tiilikaton-harjatiivisteen-asennus-kattohuolto', category: 'puhdistus', title: 'Tiilikaton harjatiivisteen asennus kattohuolto Pirkanmaalla' },
    { type: 'single', baseName: 'huolellinen-ympariston-suojaus-ennen-maalausta', category: 'maalaus', title: 'Huolellinen ympäristön suojaus ennen maalausta Pirkanmaalla' },
    { type: 'single', baseName: 'talon-julkisivun-ja-ikkunoiden-suojaustyot', category: 'maalaus', title: 'Talon julkisivun ja ikkunoiden suojaustyöt Pirkanmaalla' },
    { type: 'single', baseName: 'punainen-tiilikatto-kattopinnoitus-ja-huolto-jalkeen', category: 'pinnoitus', title: 'Punainen tiilikatto kattopinnoitus ja huolto jälkeen Pirkanmaalla' },
    { type: 'single', baseName: 'uutta-vastaava-tiilikatto-pesu-ja-suojakasittely', category: 'pinnoitus', title: 'Uutta vastaava tiilikatto pesu ja suojakäsittely Pirkanmaalla' },
    { type: 'single', baseName: 'tiilikaton-pinnoitus-tampere-tiilitalo-jalkeen', category: 'pinnoitus', title: 'Tiilikaton pinnoitus Tampereella 2026' },
    { type: 'single', baseName: 'tummanharmaa-tiilikatto-pinnoituksen-jalkeen-tampere', category: 'pinnoitus', title: 'Tummanharmaa tiilikatto pinnoituksen jälkeen Tampereella 2026' },
    { type: 'single', baseName: 'puutalon-katon-ja-seinien-maalaus-tampere', category: 'maalaus', title: 'Katon ja seinien maalaus Tampereella 2026' },
    { type: 'single', baseName: 'musta-tiilikatto-pinnoituksen-jalkeen-ylojarvi', category: 'pinnoitus', title: 'Musta tiilikatto pinnoituksen jälkeen Ylöjärvellä 2026' },
    { type: 'single', baseName: 'ruskea-tiilikatto-pinnoituksen-jalkeen-ylojarvi', category: 'pinnoitus', title: 'Ruskea tiilikatto pinnoituksen jälkeen Ylöjärvellä 2026' },
    { type: 'single', baseName: 'keltainen-talo-pinnoitettu-tiilikatto-ylojarvi', category: 'pinnoitus', title: 'Pinnoitettu tiilikatto Ylöjärvellä 2026' },
    { type: 'single', baseName: 'keltainen-talo-pinnoitettu-tiilikatto-kangasala', category: 'pinnoitus', title: 'Pinnoitettu tiilikatto Kangasalla 2026' },
    { type: 'single', baseName: 'punainen-tiilikatto-pinnoituksen-jalkeen-orivesi', category: 'pinnoitus', title: 'Punainen tiilikatto pinnoituksen jälkeen Orivedellä 2026' },
    { type: 'single', baseName: 'tummanharmaa-tiilikatto-pinnoituksen-jalkeen-nokia', category: 'pinnoitus', title: 'Tummanharmaa tiilikatto pinnoituksen jälkeen Nokialla 2026' },
    { type: 'single', baseName: 'musta-tiilikatto-pinnoituksen-jalkeen-loimaa', category: 'pinnoitus', title: 'Musta tiilikatto pinnoituksen jälkeen Loimaalla 2026' },
    { type: 'single', baseName: 'vihrea-talo-pinnoitettu-punainen-tiilikatto', category: 'pinnoitus', title: 'Pinnoitettu punainen tiilikatto Pirkanmaalla 2026' },
    { type: 'single', baseName: 'keltainen-puutalo-maalauksen-jalkeen-parkano', category: 'maalaus', title: 'Talon maalaus Parkanossa 2026' },
  ];

  const filteredProjects = activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const openGroupLightbox = (project: GroupedProject) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const openSingleLightbox = (baseName: string, title: string) => {
    setSelectedProject({ type: 'group', title, category: 'all', images: [{ baseName, label: '' }] });
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject && currentImageIndex < selectedProject.images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  return (
    <div>
      <SEO {...staticSeo["/referenssit"]} breadcrumbs={[{ name: "Referenssit" }]} />
      <PageHero
        eyebrow="Referenssit"
        title={
          <>
            Kuvia <span className="text-accent-ink">töistämme</span>
          </>
        }
        lead={
          <>
            Tässä on kuvia töistämme Pirkanmaalla ja lähikunnissa: tiilikattoja ennen ja jälkeen pinnoituksen sekä maalattuja taloja.{" "}
            <strong className="text-foreground">Kuvat ovat omista kohteistamme.</strong>
          </>
        }
        primary={{ to: "/hintalaskuri/", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
        trust="yleinen"
        image={{ base: HERO_BASE.referenssit, alt: "Vastamaalattu tiilikatto pinnoituksen jälkeen" }}
        breadcrumbs={[{ name: "Referenssit" }]}
      />


      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink font-heading">Referenssejä kattotöistä ja ulkomaalauksista</h2>
            <p className="text-muted-foreground text-base">
              Käy kurkkaamassa töitämme <strong>Pirkanmaan</strong> alueella. Olemme tehneet tiilikattojen pinnoituksia, katon puhdistuksia ja talojen ulkomaalauksia monissa paikoissa Pirkanmaalla ja lähikunnissa.
            </p>
            <p className="text-muted-foreground text-base">
              Kuvista näet, että hyviä tuloksia saadaan, kun työ tehdään huolellisesti ja ammattitaidolla. Jokainen projekti on erilainen, mutta tavoitteemme on aina sama – <strong>hyvä lopputulos ja siisti työnjälki.</strong>
            </p>
            <p className="text-muted-foreground text-base">
              Teemme töitä noin tunnin ajomatkan säteellä Tampereelta.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setVisibleCount(6); }}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer w-full"
                  onClick={() =>
                    project.type === 'group' ? openGroupLightbox(project) : openSingleLightbox(project.baseName, project.title)
                  }
                >
                  <div className="relative w-full overflow-hidden rounded-xl aspect-[4/3] min-h-[260px] sm:min-h-0 bg-muted">
                    {project.type === 'group' && project.images.length > 1 ? (
                      <CompositeThumbnail images={project.images} />
                    ) : (
                      <ResponsiveImage
                        baseName={project.type === 'group' ? project.images[0].baseName : project.baseName}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {project.type === 'group' && project.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {project.images.length} kuvaa
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-primary-foreground font-bold">{project.title}</h3>
                      {project.type === 'group' && project.images.length > 1 && (
                        <p className="text-white/80 text-sm mt-1">{project.images.map((img) => img.label).join(' → ')}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount(filteredProjects.length)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Näytä lisää
              </button>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <p className="text-center text-muted-foreground py-12">Ei projekteja tässä kategoriassa.</p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
            onSelectIndex={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>

      <ServiceContactSection variant="general" />
    </div>
  );
};

export default Referenssit;
