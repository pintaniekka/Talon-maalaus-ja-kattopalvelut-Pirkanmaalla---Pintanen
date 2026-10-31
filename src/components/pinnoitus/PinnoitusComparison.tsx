import { Link } from 'react-router-dom';
import ResponsiveImage from '@/components/ResponsiveImage';
import { PINNOITUS_HINTA } from '@/data/tyovaiheet';
import JulkaistuArtikkeli from '@/components/JulkaistuArtikkeli';

const comparisonBase = "tiilikaton-pesu-ja-pinnoitus-tummanharmaa-kattotiili";
const ARTIKKELI_SLUG = "pinnoitus-vai-uusi-katto";

/**
 * "Tiilikattoremontti vai pinnoitus?" (P1, korjaus 10). Vastaa suoraan hakuun
 * "tiilikattoremontti {kunta}". Ei prosentti- tai säästöväitteitä (V6): hinta haarukkana.
 * Kattoremontin hinta 15 000–30 000 € on sallittu (lähteet docs/-kansiossa).
 */
const PinnoitusComparison = ({ cityIn }: { cityIn?: string }) => {
  return (
    <section className="section-padding osio">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6">
                Tiilikattoremontti vai pinnoitus{cityIn ? ` ${cityIn}` : ''}?
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa. Pinnoitettu katto kestää jopa 15 vuotta pidempään.</p>
                <p>
                  Uusi katto tarvitaan, jos aluskate vuotaa tai tiilet ovat laajalti rapautuneet. Pinnoitus maksaa yleensä {PINNOITUS_HINTA}.
                  Uusi katto maksaa yleensä 15 000–30 000 €.
                </p>
                <p>Katsomme katon, aluskatteen ja ympäristön kuntotarkastuksessa. Jos pinnoitus ei riitä, sanomme sen.</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/tarjouspyynto/?palvelu=pinnoitus"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors hover:brightness-110"
                  style={{ backgroundColor: 'hsl(var(--accent-strong))' }}
                >
                  Pyydä ilmainen kuntotarkastus
                </Link>
                {/* Linkki artikkeliin vasta julkaisupäivästä: jonossa oleva artikkeli on noindex-kuori (osa 2, luku 6). */}
                <JulkaistuArtikkeli slug={ARTIKKELI_SLUG}>
                  <Link
                    to={`/artikkelit/${ARTIKKELI_SLUG}/`}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-ink border-2 border-accent transition-colors hover:bg-accent-light"
                  >
                    Lue: pinnoitus vai uusi katto?
                  </Link>
                </JulkaistuArtikkeli>
              </div>
            </div>

            <ResponsiveImage
              baseName={comparisonBase}
              alt="Tummanharmaa kattotiili pesun ja pinnoituksen jälkeen"
              className="w-full rounded-2xl shadow-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
              width={1200}
              height={1600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnoitusComparison;
