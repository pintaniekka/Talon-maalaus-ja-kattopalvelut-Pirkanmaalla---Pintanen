import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

const MaalausFinancing = ({ cityName = 'Pirkanmaa' }: { cityName?: string }) => {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto card-elevated p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-primary" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              Joustava rahoitus – Talon maalaus kätevästi kuukausimaksulla
            </h3>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ulkoverhouksen huoltoa ei kannata lykätä säästöjä odotellessa, sillä vaurioitunut puurakenne tai <strong className="text-foreground">ulkoverhousremontti on aina kalliimpi vaihtoehto</strong>. Kauttamme saat <strong className="text-foreground">joustavan rahoituksen</strong>, jolla voit maksaa maalauksen sinulle sopivissa kuukausierissä. Kysy lisää arviokäynnin yhteydessä!
          </p>
          <Link
            to="/tarjouspyynto?palvelu=maalaus"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-all hover:brightness-110"
            style={{ backgroundColor: "hsl(var(--accent-strong))" }}
          >
            Kysy tarjous: Talon maalaus {cityName}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MaalausFinancing;
