import { motion } from 'framer-motion';
import { Check } from "lucide-react";
import { Clock } from "@/components/icons/BrandIcons";
import { Link } from 'react-router-dom';
import { maalausPrices, fmtCardRange, fmtCardAfter } from '@/data/prices';

const cards = maalausPrices.cards;

const pricingIncludes = [
  'Huolellinen suojaus',
  'Homepesu ja kaavinta',
  'Puupuhtaiden pintojen pohjamaalaus',
  'Pintamaalaus',
];

const MaalausPricingCards = ({ cityName = 'Pirkanmaa', calculatorHref = '/hintalaskuri?palvelu=maalaus', calculatorLabel }: { cityName?: string; calculatorHref?: string; calculatorLabel?: string }) => {
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4">
            Paljonko maksaa talon maalaus – {cityName}?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Haluamme olla hinnoittelussamme täysin avoimia. Lopullinen hinta määräytyy maalattavan pinta-alan, kohteen korkeuden ja erityisesti pohjatöiden vaativuuden perusteella.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-card rounded-2xl shadow-sm flex flex-col overflow-hidden ${
                card.featured
                  ? 'border-2 border-accent md:scale-105 md:shadow-lg'
                  : 'border border-border/50'
              }`}
            >
              {card.featured && (
                <div className="bg-accent-strong text-accent-foreground text-xs font-bold uppercase tracking-wider text-center py-1.5">
                  Yleisin talon koko
                </div>
              )}

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <p className="text-xl md:text-2xl font-bold text-foreground">{card.size}</p>
                <p className="text-sm text-muted-foreground mb-4">{card.label}</p>

                <div className="mb-5">
                  <p className="text-sm line-through text-muted-foreground/60 mb-1">
                    Norm. {fmtCardRange(card)}
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-accent-ink"><strong>{fmtCardAfter(card)}</strong></p>
                  <p className="text-xs text-muted-foreground mt-1"><strong>kotitalousvähennyksen jälkeen</strong></p>
                </div>

                <ul className="space-y-2.5 mb-5 flex-1">
                  {pricingIncludes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                      <Check className="w-4 h-4 text-accent-ink flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                  <Clock className="w-4 h-4" />
                  Kesto: {card.duration}
                </div>

                <a
                  href="#yhteystiedot"
                  className={`inline-flex items-center justify-center w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-md text-sm ${
                    card.featured
                      ? 'bg-accent-strong text-accent-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  Pyydä tarjous tästä
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to={calculatorHref}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: 'hsl(38, 60%, 65%)', color: 'hsl(215, 25%, 15%)' }}
          >
            {calculatorLabel ?? `Laske hinta: Talon maalaus ${cityName}`}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MaalausPricingCards;
