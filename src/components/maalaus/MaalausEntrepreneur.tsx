import { motion } from 'framer-motion';
import { getStorageUrl } from '@/lib/storage';

const eemilImage = getStorageUrl('Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp');

const MaalausEntrepreneur = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-8 text-center">
            Kuka talosi maalaa? Terveiset yrittäjältä
          </h2>

          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="flex justify-center">
              <img
                src={eemilImage}
                alt="Eemil Pitkänen – Pintanen Oy, maalauspalvelut"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Moi! Olen Eemil, Pintasen yrittäjä. Toisin kuin suuret maalausliikkeet, meillä et ole vain yksi tilausnumero muiden joukossa, enkä lähetä pihallesi kokemattomia kesätyöntekijöitä. <strong className="text-foreground">Hoidan talojen maalaukset Pirkanmaalla henkilökohtaisesti alusta loppuun saakka</strong>, jolloin voit luottaa siihen, että työn laadusta vastaa aina tutut kasvot.
              </p>
              <p>
                <strong className="text-foreground">Viiden vuoden kokemuksella ja yli 60 onnistuneen urakan myötä</strong> tiedän tarkalleen, miten pirkanmaalaiset julkisivut saadaan kestämään vaihtelevia sääolosuhteita. Ymmärrän, että <strong className="text-foreground">huolelliset pohjatyöt ja tarkka maalaus ovat kestävyyden kannalta kaiken A ja O</strong>. Seison ylpeänä oman kädenjälkeni takana, ja siksi myönnän kaikille urakoilleni täyden takuun.
              </p>
              <p className="font-medium text-foreground">— Eemil, Pintanen Oy</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MaalausEntrepreneur;
