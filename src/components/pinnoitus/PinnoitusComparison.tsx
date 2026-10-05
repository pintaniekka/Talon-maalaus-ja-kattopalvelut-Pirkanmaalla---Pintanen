import { Link } from 'react-router-dom';
import ResponsiveImage from '@/components/ResponsiveImage';
import { PINNOITUS_HINTA } from '@/data/tyovaiheet';

const comparisonBase = "tummanharmaa-kattotiili-pesu-ja-pinnoitustyo";

/**
 * "Tiilikattoremontti vai pinnoitus?" (P1, korjaus 10). Vastaa suoraan hakuun
 * "tiilikattoremontti {kunta}". Ei prosentti- tai säästöväitteitä (V6): hinta haarukkana.
 */
const PinnoitusComparison = ({ cityIn }: { cityIn?: string }) => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6">
                Tiilikattoremontti vai pinnoitus{cityIn ? ` ${cityIn}` : ''}?
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Pinnoitus riittää, jos <strong className="text-foreground">aluskate ja rakenteet ovat kunnossa</strong>. Silloin
                  tiilet pestään, rikkinäiset vaihdetaan ja katto maalataan ruiskulla kahteen kertaan. Katto saa jopa 15–20 vuotta
                  lisää ikää.
                </p>
                <p>
                  Uusi katto tarvitaan, jos aluskate vuotaa tai tiilet ovat laajalti rapautuneet. Pinnoitus maksaa yleensä{' '}
                  <strong className="text-foreground">{PINNOITUS_HINTA}</strong>. Uusi katto maksaa yleensä paljon enemmän.
                </p>
                <p>Tarkistamme aluskatteen ilmaisella käynnillä ja sanomme suoraan, kumpi kannattaa.</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/tarjouspyynto/?palvelu=pinnoitus"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors hover:brightness-110"
                  style={{ backgroundColor: 'hsl(var(--accent-strong))' }}
                >
                  Pyydä ilmainen kuntotarkastus
                </Link>
                <Link
                  to="/artikkelit/pinnoitus-vai-uusi-katto/"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-foreground transition-all hover:brightness-95"
                  style={{ backgroundColor: 'hsl(36, 56%, 91%)' }}
                >
                  Lue: pinnoitus vai uusi katto?
                </Link>
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
