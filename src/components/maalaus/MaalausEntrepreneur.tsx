import { getStorageUrl } from '@/lib/storage';
import { LUVUT } from '@/data/company';

const eemilImage = getStorageUrl('Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp');

/**
 * Eemil maalaa: kuva vasemmalla, teksti oikealla (tarkastus 12.10.2026, T21). Työvaiheet
 * kerrotaan Lyhyesti-laatikossa ja prosessissa, joten tässä sanotaan vain se, mitä muualla ei sanota.
 */
const MaalausEntrepreneur = ({ cityIn }: { cityIn?: string }) => {
  const paikka = cityIn ? `${cityIn} ja muualla Pirkanmaalla` : 'Pirkanmaalla ja lähikunnissa';
  return (
    <section className="section-padding bg-accent-light">
      <div className="section-container">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[auto_1fr] gap-8 md:gap-10 items-start">
          <img
            loading="lazy"
            decoding="async"
            src={eemilImage}
            alt="Eemil Pitkänen, Pintanen Oy"
            width={200}
            height={200}
            className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">Eemil maalaa</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Olen Eemil. Maalaan talot {paikka} itse alusta loppuun. Olen tehnyt tätä työtä yli viisi vuotta ja maalannut{' '}
                {LUVUT.maalatutTalot} taloa.
              </p>
              <p>Maalataan seinät aina kahdestaan maalausparin kanssa.</p>
              <p>Annan työlle 2 vuoden kirjallisen takuun.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaalausEntrepreneur;
