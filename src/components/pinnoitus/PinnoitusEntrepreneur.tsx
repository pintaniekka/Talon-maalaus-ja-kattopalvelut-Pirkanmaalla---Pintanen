import { getStorageUrl } from '@/lib/storage';

const eerikImage = getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp');

/**
 * Yrittäjän terveiset. Paikkakunta tulee propsina (V1: sama teksti väitti aiemmin joka
 * kaupunkisivulla "Tampereella"). Urakkamäärä tulee yhdestä paikasta (company.ts).
 */
const PinnoitusEntrepreneur = ({ cityIn }: { cityIn?: string }) => {
  const paikka = cityIn ? `${cityIn} ja muualla Pirkanmaalla` : 'Pirkanmaalla ja lähikunnissa';
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-8 text-center">Kuka katollesi kiipeää? Terveiset yrittäjältä</h2>

          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="flex justify-center">
              <img
                src={eerikImage}
                alt="Eerik Pitkänen, Pintanen Oy"
                width={160}
                height={160}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Moi, olen Eerik. Perustin Pintasen yhdessä veljeni Eemilin kanssa. Hoidan tiilikattojen pinnoitukset {paikka} itse
                alusta loppuun.
              </p>
              <p>
                Olen tehnyt tätä työtä viisi vuotta. Tiedät aina, kuka on katollasi ja kuka vastaa jäljestä. Siksi annan työlleni{' '}
                <strong className="text-foreground">5 vuoden kirjallisen takuun</strong>.
              </p>
              <p className="font-medium text-foreground">— Eerik, Pintanen Oy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnoitusEntrepreneur;
