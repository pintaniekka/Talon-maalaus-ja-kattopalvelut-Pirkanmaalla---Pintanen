import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Search } from "@/components/icons/BrandIcons";
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { getResponsiveSrc, getResponsiveSrcSet } from '@/lib/storage';

interface PinnoitusProblemSectionProps {
  cityName: string;
  cityIn: string;
  cityGenitive: string;
}

const warningSignsData = [
  { sign: 'Väri on haalistunut', desc: 'Suojapinta on kulunut pois ja tiili on altis sään vaihteluille.' },
  { sign: 'Sammal kasvaa nopeasti', desc: 'Sammal saa otteen vain huokoisesta ja kuluneesta pinnasta.' },
  { sign: 'Rikkinäiset tiilet', desc: 'Merkki siitä, että vesi on jo päässyt rakenteen sisään ja jäätynyt.' },
  { sign: 'Pinta tuntuu karhealta', desc: 'Tiili imee vettä sisäänsä jokaisella sateella.' },
];

const beforeBase = "haalistunut-punainen-tiilikatto-ennen-pinnoitusta";
const afterBase = "kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen";

const PinnoitusProblemSection = ({ cityName, cityIn, cityGenitive }: PinnoitusProblemSectionProps) => {
  return (
    <section className="section-padding bg-accent-light">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4">
            Onko kattosi vaarassa {cityGenitive} vaihtelevassa säässä?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Moni tamperelainen luulee, että omakotitalon katto on kunnossa, jos se näyttää siistiltä kaukaa katsottuna. Mutta totuus on toinen. Kun tiilen suoja kuluu pois, tiili imee kosteutta kuin <strong className="text-foreground">kuiva pesusieni</strong>. Siinä vaiheessa pelkkä puhdistus ei riitä. Katto tarvitsee ammattitaitoista pinnoitusta, jotta se kestää teknisesti pitkään.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
          <div className="lg:sticky lg:top-28">
            <BeforeAfterSlider
              beforeImage={getResponsiveSrc(beforeBase)}
              afterImage={getResponsiveSrc(afterBase)}
              beforeSrcSet={getResponsiveSrcSet(beforeBase)}
              afterSrcSet={getResponsiveSrcSet(afterBase)}
              beforeAlt={`Haalistunut punainen tiilikatto ennen pinnoitusta ${cityName}`}
              afterAlt={`Kirkkaan punainen tiilikatto pinnoituksen jälkeen ${cityName}`}
            />
          </div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Pysäytä tiilen mureneminen eli pakkasrapautuminen
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Suomen talvi on kova testi katon kestämiselle. Kun vesi imeytyy huokoiseen tiileen ja jäätyy, se laajenee monta kertaa talven aikana ja murentaa tiiltä sisältäpäin. Tätä kutsutaan <strong className="text-foreground">pakkasrapautumiseksi</strong>. Se johtaa lopulta tiilien halkeiluun ja pahimmillaan kosteuden pääsyyn aluskatteelle. Pinnoitus katkaisee tämän kierteen heti.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Sammaleen poisto on vasta alkua – pinta kaipaa suojan
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Sammal ja jäkälä eivät ole vain rumia. Niiden juuret avaavat tietä kosteudelle ja pitävät katon jatkuvasti märkänä. Se nopeuttaa rakenteiden rappeutumista. Pelkkä pesu poistaa näkyvän kasvuston, mutta vain ammattimainen tiilikaton pinnoitus <strong className="text-foreground">sulkee tiilen huokoset</strong>. Se luo katolle <strong className="text-foreground">vettä hylkivän suojakilven</strong>, joka kestää vuosia.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-accent-ink" />
                Tunnista nämä hälytysmerkit katollasi:
              </h4>
              <ul className="space-y-3">
                {warningSignsData.map((w) => (
                  <li key={w.sign} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">{w.sign}:</strong> {w.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <Link
              to="/tarjouspyynto?palvelu=pinnoitus"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors"
              style={{ backgroundColor: "hsl(var(--accent-strong))" }}
            >
              Varaa maksuton kuntotarkastus {cityIn}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnoitusProblemSection;
