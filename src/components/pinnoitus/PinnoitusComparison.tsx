import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ResponsiveImage from '@/components/ResponsiveImage';

const comparisonBase = "tummanharmaa-kattotiili-pesu-ja-pinnoitustyo";

const PinnoitusComparison = ({ cityIn }: { cityIn?: string }) => {
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
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
                Tiilikaton pinnoitus vs. Kattoremontti – Kumpi kannattaa?
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Monet asiakkaistamme esittää meille tämän kysymyksen, kun he tekevät hintavertailua. Yksinkertainen sääntö on, että jos katon aluskate ja puurakenteet ovat hyvässä kunnossa, <strong className="text-foreground">täysimittainen kattoremontti on usein tarpeeton</strong> ja liian kallis.
                </p>
                <p>
                  Pinnoitus on ympäristöystävällinen valinta, joka maksaa tyypillisesti vain noin <strong className="text-foreground">10–20 % uuden katon hinnasta</strong>. Tehtyäsi pinnoituksen ajoissa, voit säästää jopa 15 000 euroa, välttää pidemmän remonttimelun ja pidentää nykyisen kattosi käyttöikää jopa 15 vuodella.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to="/tiilikaton-pinnoitus-hinta-pirkanmaa"
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

export default PinnoitusComparison;
