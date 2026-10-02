import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ClipboardCheck, ShieldCheck, Droplets, BrickWall, Paintbrush, CheckCircle } from "@/components/icons/BrandIcons";
import { type ReactNode } from 'react';

interface Step {
  icon: typeof ClipboardCheck;
  title: string;
  content: ReactNode;
}

const steps: Step[] = [
  {
    icon: ClipboardCheck,
    title: '1. Maksuton kuntoarvio ja tarkastus',
    content: 'Emme jätä mitään arvailujen varaan. Tarkistamme aina tiilien lisäksi aluskatteen kunnon ja läpiviennit, jotta voimme taata kestävän lopputuloksen.',
  },
  {
    icon: ShieldCheck,
    title: '2. Tarvittavat suojaukset',
    content: 'Katon pesu on sotkuista työtä. Teemme ennen pesua kohteen vaatimat suojaukset. Jätämme pihasi vähintään yhtä siistiksi kuin se oli saapuessamme.',
  },
  {
    icon: Droplets,
    title: '3. Painepesu ja rännien puhdistus',
    content: 'Poistamme pinttyneen lian ja sammaleen tehokkaalla ammattitason pesurilla. Tyhjennämme samalla sadevesikourut ja huuhtelemme ne puhtaiksi.',
  },
  {
    icon: BrickWall,
    title: '4. Kasvuston torjuminen ja tiilten vaihto',
    content: 'Käytämme kasvustontorjunta-ainetta, joka tuhoaa kasvuston itiöt syvältä tiilen huokosista. Tämän jälkeen vaihdamme kaikki vaurioituneet tiilet uusiin.',
  },
  {
    icon: Paintbrush,
    title: '5. Kaksinkertainen pinnoitus',
    content: 'Käytämme vain parhaita Tikkurilan ja Nowocoatin kattomaaleja. Kaksinkertainen ruiskumaalaus takaa tasaisen ja erittäin kestävän pinnan.',
  },
  {
    icon: CheckCircle,
    title: '6. Yhteinen lopputarkastus ja takuu',
    content: (
      <>Työ on valmis vasta, kun olet tyytyväinen. Käymme työnjäljen yhdessä läpi. Saat <strong>5 vuoden kirjallisen takuun</strong> suoraan paikalliselta yrittäjältä.</>
    ),
  },
];

interface PinnoitusCityProcessProps {
  cityName: string;
}

const PinnoitusCityProcess = ({ cityName }: PinnoitusCityProcessProps) => {
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Pintasen 6-vaiheinen prosessi: Tiilikaton pinnoitus {cityName}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <AccordionItem
                  value={`step-${index}`}
                  className="bg-card rounded-xl border border-border/50 px-5 shadow-sm"
                >
                  <AccordionTrigger className="text-left gap-3 hover:no-underline py-5">
                    <span className="flex items-center gap-3">
                      <step.icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-semibold text-foreground">{step.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-8">
                    {step.content}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-10">
          <a
            href="#yhteystiedot"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-colors hover:brightness-110"
            style={{ backgroundColor: 'hsl(202, 100%, 61%)' }}
          >
            Tilaa ilmainen kuntotarkastus tästä
          </a>
        </div>
      </div>
    </section>
  );
};

export default PinnoitusCityProcess;
