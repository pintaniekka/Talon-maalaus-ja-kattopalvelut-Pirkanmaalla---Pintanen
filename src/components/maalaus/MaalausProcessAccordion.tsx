import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, ShieldCheck, Droplets, Paintbrush, Layers, CheckCircle } from "@/components/icons/BrandIcons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Step {
  icon: typeof ClipboardCheck;
  title: string;
  content: ReactNode;
}

const steps: Step[] = [
  {
    icon: ClipboardCheck,
    title: '1. Maksuton kuntoarvio ja kirjallinen tarjous',
    content: (
      <p>Emme arvaile. Tulemme paikan päälle arvioimaan ulkoverhouksen kunnon, tunnistamme vanhan maalityypin (öljy- vai vesiohenteinen) ja arvioimaan pohjatöiden vaativuuden. <strong>Saat meiltä aina selkeän, kiinteähintaisen tarjouksen</strong>, joka sisältää kaikki materiaalit ja työn.</p>
    ),
  },
  {
    icon: ShieldCheck,
    title: '2. Pihapiirin ja pintojen huolellinen suojaus',
    content: (
      <p>Huoltomaalaus ja julkisivun pesu voivat aiheuttaa roiskeita. <strong>Suojaamme ennen työn aloitusta kriittiset paikat</strong>, kuten terassit huolella. Jätämme pihasi vähintään yhtä siistiksi kuin se oli tullessamme – yrittäjänä vastaan siitä, että omaisuuttasi kohdellaan kunnioituksella.</p>
    ),
  },
  {
    icon: Droplets,
    title: '3. Pohjatyöt: Märkähomepesu ja mekaaninen kaavinta',
    content: (
      <p><strong>Tämä on maalausurakan kriittisin vaihe.</strong> Pesemme julkisivun tarkoitukseen sopivalla homepesuaineella ja harjoilla irrottaaksemme lian ja mikrobikasvuston. Kaavimme irtoilevan ja kuplivan maalin mekaanisesti pois, jotta uusi maali saa maksimaalisen tartuntapinnan.</p>
    ),
  },
  {
    icon: Layers,
    title: '4. Pohjustus ja puupuhtaiden pintojen käsittely',
    content: (
      <p>Puhdistettu ja kuivunut paljas puupinta on suojattava nopeasti kosteudelta. <strong>Käsittelemme kaikki puupuhtaat kohdat laadukkaalla pohjamaalilla.</strong> Tämä estää puun halkeilua ja varmistaa, että pintamaalin sideaineet tarttuvat alustaan kestävästi.</p>
    ),
  },
  {
    icon: Paintbrush,
    title: '5. Pintamaalaus ammattilaistason tuotteilla',
    content: (
      <p>Maalaamme talon säänkestävillä huippumaaleilla kohteen vaatimusten ja halutun peittävyyden mukaan. Huolehdimme tarkoista rajauksista ja <strong>varmistamme, että maalausolosuhteet ovat optimaaliset</strong> kestävän pinnan muodostumiseen.</p>
    ),
  },
  {
    icon: CheckCircle,
    title: '6. Lopputarkastus',
    content: (
      <p>Työ on valmis vasta, kun olemme kiertäneet kohteen yhdessä kanssasi. Puramme mahdolliset telineet, siivoamme jälkemme ja suoritamme lopputarkastuksen. <strong>Saat työllemme kirjallisen takuun</strong> – yrittäjänä takaan, että jälki kestää tarkastelun läheltä ja kaukaa.</p>
    ),
  },
];

const MaalausProcessAccordion = ({ cityName = 'Pirkanmaa' }: { cityName?: string }) => {
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">
            Näin talon ulkomaalaus etenee – {cityName}
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
            >
              <AccordionItem value={`step-${index}`} className="bg-card rounded-xl border border-border/50 px-4">
                <AccordionTrigger className="text-left py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground text-sm md:text-base">{step.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pl-[3.25rem]">
                  {step.content}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <div className="text-center mt-8">
          <a
            href="#yhteystiedot"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors hover:brightness-110"
            style={{ backgroundColor: "hsl(var(--accent-strong))" }}
          >
            Tästä ilmainen kuntoarvio talon maalaukselle
          </a>
        </div>
      </div>
    </section>
  );
};

export default MaalausProcessAccordion;
