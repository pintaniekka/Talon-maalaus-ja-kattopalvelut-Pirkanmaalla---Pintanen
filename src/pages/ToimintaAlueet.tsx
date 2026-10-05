import { motion } from 'framer-motion';
import { ChevronRight } from "lucide-react";
import { MapPin } from "@/components/icons/BrandIcons";
import { Link } from 'react-router-dom';
import ServicePageHero from '@/components/ServicePageHero';
import ServiceContactSection from '@/components/ServiceContactSection';
import SEO from '@/components/SEO';
import { staticSeo } from "@/data/seo";
import { allCities } from '@/data/cityData';
import { getResponsiveSrc, getResponsiveSrcSet } from '@/lib/storage';

const heroBase = "keltainen-omakotitalo-julkisivumaalaus-jalkeen";

const ToimintaAlueet = () => {
  return (
    <div>
      <SEO
        {...staticSeo["/toiminta-alueet"]} />
      <ServicePageHero
        title=""
        subtitle=""
        backgroundImage={getResponsiveSrc(heroBase)}
        backgroundSrcSet={getResponsiveSrcSet(heroBase)}
      >
        <div className="bg-black/45 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto text-left mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            <span className="text-accent-ink drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">Toiminta-alueemme</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            Palvelemme koko <strong>Pirkanmaan alueella</strong> ja lähikunnissa noin <strong>tunnin säteellä Tampereelta</strong>. Tarjoamme <strong>tiilikaton pinnoituksen</strong>, <strong>katon puhdistuksen</strong> ja <strong>talon maalauksen</strong> ammattitaidolla. Olemme <strong>paikallinen perheyritys</strong>, johon voit luottaa.
          </p>
        </div>
      </ServicePageHero>


      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-base text-muted-foreground mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 text-center">Missä toimimme?</h2>
            <p>Meidän toiminta-alueemme on <strong className="text-foreground">Pirkanmaa</strong> ja sen lähialueet. Pintanen Oy suorittaa <strong className="text-foreground">tiilikattojen pinnoitukset</strong>, <strong className="text-foreground">katon puhdistukset</strong> ja <strong className="text-foreground">talojen ulkomaalaukset</strong> pääasiassa Pirkanmaan alueella. Suurin osa asiakkaistamme on Tampereella ja sen ympäristökunnissa, mutta me palvelemme myös muualla Pirkanmaalla ja valituilla lähialueilla.</p>
            <p>Me toimimme yleensä noin <strong className="text-foreground">tunnin ajomatkan säteellä Tampereelta</strong>. Tämä mahdollistaa sujuvan työskentelyn ja kohtuulliset matkakulut asiakkaillemme. Me teemme vuosittain projekteja useissa Pirkanmaan kunnissa, ja kohteita löytyy sekä kaupunkialueilta että maaseudulta.</p>
            <p>Tyypillisiä työalueitamme ovat esimerkiksi <strong className="text-foreground">Tampere</strong>, Nokia, Ylöjärvi, Kangasala, Pirkkala ja Lempäälä. Me toteutamme kattotöitä ja ulkomaalauksia myös muualla Pirkanmaalla sekä lähialueilla, kuten Hämeenlinnassa ja Forssassa.</p>
            <p>Jos et ole varma, kuuluuko paikkakuntasi toiminta-alueeseemme, kannattaa silti ottaa yhteyttä. Me kerromme nopeasti, onnistuuko kohteesi toteutus, ja voimme tarvittaessa sopia <strong className="text-foreground">maksuttoman arviokäynnin</strong>.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-accent-ink">
              <MapPin className="w-6 h-6 text-primary" />
              Palvelualueet
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {allCities.map((city, index) => (
                <motion.div key={city.slug} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.02 }}>
                  <Link to={`/maalauspalvelut-${city.slug}`} className="flex items-center justify-between gap-1 bg-secondary text-secondary-foreground px-4 py-3 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors group">
                    <span>{city.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceContactSection variant="general" />
    </div>
  );
};

export default ToimintaAlueet;
