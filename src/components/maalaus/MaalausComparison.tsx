import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ResponsiveImage from '@/components/ResponsiveImage';

const comparisonBase = "keltainen-ulkoverhous-huoltomaalaus-jalkeen";

const MaalausComparison = ({ cityIn }: { cityIn?: string }) => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6">
                Talon maalaus vai kokonaan uusi ulkoverhousremontti?
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Tämä on kysymys, jota moni vanhemman talon omistaja pohtii, kun maali hilseilee pahasti. Nyrkkisääntö on selkeä: jos alla oleva puu on vielä kovaa eikä laho, <strong className="text-foreground">ulkoverhousremontti on usein täysin turha</strong> ja ylimitoitettu investointi.
                </p>
                <p>
                  Perusteellisilla pohjatöillä ja laadukkaalla maalauksella vanhakin paneeli saadaan pelastettua. Talon huoltomaalaus on ekologinen ja kustannustehokas vaihtoehto, joka maksaa vain <strong className="text-foreground">murto-osan uuden laudoituksen hinnasta</strong>. Kun maalaus tehdään ajoissa, vältät raskaan rakennusprojektin, pihan mylläyksen ja säästät kymmeniä tuhansia euroja.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to="/hintalaskuri?palvelu=maalaus"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground transition-all hover:brightness-95 text-lg"
                  style={{ backgroundColor: 'hsl(36, 56%, 91%)' }}
                >
                  Hintalaskuri
                </Link>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ResponsiveImage
                baseName={comparisonBase}
                cityIn={cityIn}
                className="w-full rounded-2xl shadow-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaalausComparison;
