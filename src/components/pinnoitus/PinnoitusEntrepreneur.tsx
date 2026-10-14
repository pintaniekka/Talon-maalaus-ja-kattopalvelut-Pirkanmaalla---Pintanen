import { getStorageUrl } from '@/lib/storage';
import { LUVUT } from '@/data/company';

const eerikImage = getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp');

/**
 * Eerik tekee työn: kuva vasemmalla, teksti oikealla, ei lainausmerkkejä eikä kursiivia
 * (tarkastus 12.10.2026, T12–T13). Paikkakunta tulee propsina (V1). Lause "sama mies käy
 * katsomassa, tekee tarjouksen ja tekee työn" sanotaan sivustolla vain tässä.
 */
const PinnoitusEntrepreneur = ({ cityIn }: { cityIn?: string }) => {
  const paikka = cityIn ? `${cityIn} ja muualla Pirkanmaalla` : 'Pirkanmaalla ja lähikunnissa';
  return (
    <section className="section-padding bg-accent-light">
      <div className="section-container">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[auto_1fr] gap-8 md:gap-10 items-start">
          <img
            src={eerikImage}
            alt="Eerik Pitkänen, Pintanen Oy"
            width={200}
            height={200}
            className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover"
            loading="lazy"
            decoding="async"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">Eerik tekee työn</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Olen Eerik. Perustin Pintasen yhdessä veljeni Eemilin kanssa. Teen tiilikattojen pinnoitukset {paikka} itse alusta
                loppuun.
              </p>
              <p>
                Olen tehnyt tätä työtä yli viisi vuotta ja pinnoittanut {LUVUT.pinnoitetutKatot} kattoa. Sama mies käy katsomassa, tekee
                tarjouksen ja tekee työn. Annan työlle 5 vuoden kirjallisen takuun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnoitusEntrepreneur;
