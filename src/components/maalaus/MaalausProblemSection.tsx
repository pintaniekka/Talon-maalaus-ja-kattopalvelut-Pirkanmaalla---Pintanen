import { motion } from 'framer-motion';
import { Search } from "@/components/icons/BrandIcons";
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { getResponsiveSrc, getResponsiveSrcSet } from '@/lib/storage';

const beforeBase = "keltainen-puutalo-varinvaihto-ennen-maalausta";
const afterBase = "violetti-puutalo-varinvaihto-peittomaalaus-jalkeen";

const warningSignsData = [
  { sign: 'Maali hilseilee tai lohkeilee', desc: 'Kosteus on päässyt maalin alle ja heikentänyt sen tartunnan puuhun.' },
  { sign: 'Pinta liituuntuu tai haalistuu', desc: 'Maalipinta on hapettunut, eikä se enää hylje vettä tai likaa.' },
  { sign: 'Mustat pisteet (sinistäjäsieni tai homesieni)', desc: (<>Pintamulta tai ilman epäpuhtaudet tarjoavat kasvualustan homeelle, joka on <strong className="text-foreground">puhdistettava homepesulla ennen maalausta</strong>.</>) },
  { sign: 'Halkeamat paneelien päissä', desc: 'Puu on päässyt kastumaan ja kuivumaan toistuvasti, mikä on rikkonut puun rakenteen.' },
];

const MaalausProblemSection = ({ cityName = 'Pirkanmaa' }: { cityName?: string }) => {
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
            Miksi talon huoltomaalaus on tärkeää juuri nyt?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Talon ulkoverhouksen maalaus ei ole vain esteettinen asia. Se on myös tärkeää puun suojaamiseksi. Kun <strong className="text-foreground">maalin sideaineet kuluvat</strong> ja pinta alkaa haalistua tai halkeilla, <strong className="text-foreground">puun luonnollinen suoja heikkenee</strong>. Tämä on merkki siitä, että talo tarvitsee huoltomaalausta ennen kuin vauriot ehtivät syvälle puukuituun.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
          {/* Left: Before/After slider (sticky on desktop) */}
          <div className="lg:sticky lg:top-28">
            <BeforeAfterSlider
              beforeImage={getResponsiveSrc(beforeBase)}
              afterImage={getResponsiveSrc(afterBase)}
              beforeSrcSet={getResponsiveSrcSet(beforeBase)}
              afterSrcSet={getResponsiveSrcSet(afterBase)}
              beforeAlt={`Keltainen puutalo värinvaihto ennen maalausta – ${cityName}`}
              afterAlt={`Violetti puutalo värinvaihto peittomaalaus jälkeen – ${cityName}`}
            />
          </div>

          {/* Right: Informational text */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Estä kosteuseläminen ja lahottajasienien kasvu
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Suomen syksyn viistosateet ja talven kostea ilma ovat rankkoja suojaamattomalle puupinnalle. Jos maalipinta on rikki, vesi pääsee imeytymään puuhun. Se aiheuttaa <strong className="text-foreground">voimakasta kosteusliikettä – puu laajenee ja supistuu</strong>, mikä avaa halkeamia entisestään. <strong className="text-foreground">Jatkuva kosteus luo hyvät olot lahottajasienille</strong>, jotka tuhoavat puun rakenteen sisältäpäin. Ammattilaisen tekemä maalaus muodostaa pinnalle kalvon, joka säätelee puun kosteustasapainoa, pitää rakenteet kuivina ja <strong className="text-foreground">viivästyttää kallista ulkoverhousremonttia</strong>.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                UV-säteily – Puukuidun ja sideaineiden kuluttaja
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Aurinko on julkisivun suurin rasite. Suora UV-säteily hajottaa maalin sideaineita ja harmaannuttaa suojaamatonta puuta. Tämä tekee puun pinnasta nukkaisen, jolloin maali ei tartu siihen kunnolla. <strong className="text-foreground">Laadukas ammattitason maali sisältää UV-suojan</strong>, joka pitää värin kirkkaana ja estää puun pinnan haurastumisen.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-accent-ink" />
                Onko talosi ulkoseinässä näitä merkkejä? Silloin maalauksella on kiire:
              </h4>
              <ul className="space-y-3">
                {warningSignsData.map((w) => (
                  <li key={String(w.sign)} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">{w.sign}:</strong> {w.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <a
              href="#yhteystiedot"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors hover:brightness-110"
              style={{ backgroundColor: "hsl(var(--accent-strong))" }}
            >
              Pyydä maksuton kuntotarkastus – {cityName}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaalausProblemSection;
