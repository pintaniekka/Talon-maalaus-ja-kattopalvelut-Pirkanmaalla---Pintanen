import { motion } from 'framer-motion';
import { getStorageUrl } from '@/lib/storage';

const eerikImage = getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp');

const PinnoitusEntrepreneur = () => {
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
            Kuka katollesi kiipeää? Terveiset yrittäjältä
          </h2>

          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="flex justify-center">
              <img
                src={eerikImage}
                alt="Eerik Pitkänen – Pintanen Oy, kattopalvelut"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Moi, olen Eerik, ja olen perustanut oman yrityksen, Pintasen. Toisin kuin isot yritykset, meillä et ole vain yksi tilausnumero muiden joukossa. Hoidan tiilikattojen pinnoitukset Tampereella henkilökohtaisesti alusta loppuun.
              </p>
              <p>
                Olen työskennellyt alalla jo viiden vuoden ajan, ja olen onnistuneesti suorittanut yli 100 urakkaa. Tiedän, miten tamperelaiset katot kestävät vaihtelevia sääolosuhteita. Kun tilaat pinnoituksen minulta, tiedät aina, kuka työskentelee pihallasi ja kuka vastaa työn laadusta. Tästä syystä voin antaa työlleni 5 vuoden takuun, ja olen siitä ylpeä.
              </p>
              <p className="font-medium text-foreground">— Eerik, Pintanen Oy</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PinnoitusEntrepreneur;
