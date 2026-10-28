import { Check } from "lucide-react";
import { Clock } from "@/components/icons/BrandIcons";
import { Link } from 'react-router-dom';
import { pinnoitusPrices, fmtCardRange, fmtCardAfter } from '@/data/prices';

const cards = pinnoitusPrices.cards;

/** Nostetun kortin nauhan teksti. Jos kortin label on sama, se näytetään vain nauhassa (ei kahdesti). */
const FEATURED_RIBBON = 'Yleisin kattokoko';

/** Hintakortit säilyvät sellaisinaan (sääntö). Sisältölista noudattaa sovittua sanastoa (S15). */
const pricingIncludes = ['Pesu painepesulla', 'Rikkinäisten tiilien vaihto', 'Pohjamaali ja pintamaali ruiskulla', 'Siivous'];

interface PinnoitusPricingCardsProps {
  cityName: string;
  cityIn: string;
  /** Hintasivulla linkki osoittaa laskuriin samalla sivulla. */
  calculatorHref?: string;
  calculatorLabel?: string;
}

const PinnoitusPricingCards = ({ cityIn, calculatorHref = "/hintalaskuri/?palvelu=pinnoitus", calculatorLabel }: PinnoitusPricingCardsProps) => {
  return (
    <section className="section-padding bg-accent-light">
      <div className="section-container max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4">Mitä tiilikaton pinnoitus maksaa {cityIn}?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Hinta sisältää työn, materiaalit ja siivouksen. Piilokuluja ei ole.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto md:items-start">
          {cards.map((card, i) => (
            <div
              key={i}
              className="lehti-kortti flex flex-col"
            >
              {card.featured && (
                <p className="text-xs font-extrabold uppercase tracking-wider text-accent-ink mb-1">{FEATURED_RIBBON}</p>
              )}

              <div className="flex flex-col flex-1">
                <p className={`text-2xl font-bold text-foreground ${card.featured && card.label === FEATURED_RIBBON ? 'mb-4' : ''}`}>{card.size}</p>
                {!(card.featured && card.label === FEATURED_RIBBON) && (
                  <p className="text-sm text-muted-foreground mb-4">{card.label}</p>
                )}

                {/* Hinta ilman alennusvaikutelmaa (Eerik 13.10.2026): haarukka isolla, vähennyksen jälkeinen hinta rauhallisesti alla. */}
                <div className="mb-5">
                  <p className="text-2xl md:text-3xl font-bold text-accent-ink leading-tight">{fmtCardRange(card)}</p>
                  <p className="text-sm text-muted-foreground mt-1.5">Kotitalousvähennyksen jälkeen <span className="whitespace-nowrap">{fmtCardAfter(card)}</span></p>
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

                <Link
                  to="/tarjouspyynto/?palvelu=pinnoitus"
                  className={`inline-flex items-center justify-center w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-md text-sm ${
                    card.featured ? 'bg-accent-strong text-accent-foreground' : 'bg-primary text-primary-foreground'
                  }`}
                >
                  Pyydä tarjous
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
          Työn osuudesta saat kotitalousvähennyksen. Tarkan hinnan kerromme kuntotarkastuksen jälkeen kirjallisessa tarjouksessa.
        </p>

        <div className="text-center mt-6">
          <Link
            to={calculatorHref}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-paint-yellow hover:bg-paint-yellow-hover text-paint-yellow-foreground font-heading font-extrabold rounded-2xl transition-all hover:scale-[1.03] shadow-xl shadow-paint-yellow/40 text-lg"
          >
            {calculatorLabel ?? `Laske hinta: tiilikaton pinnoitus ${cityIn}`}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PinnoitusPricingCards;
