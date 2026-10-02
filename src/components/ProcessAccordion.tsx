import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ClipboardCheck, ShieldCheck, Droplets, BrickWall, Paintbrush, CheckCircle } from "@/components/icons/BrandIcons";
import { type ReactNode } from "react";

interface Step {
  icon: typeof ClipboardCheck;
  title: string;
  content: ReactNode;
}

const steps: Step[] = [
  {
    icon: ClipboardCheck,
    title: "1. Ilmainen kuntoarvio ja välikaton tarkastus",
    content: (
      <>Emme arvaile. Ennen tarjousta tarkistamme tiilien lisäksi <strong>aina myös aluskatteen ja läpiviennit</strong>. Pystymme korjaamaan pienet aluskatteen vauriot. Suuremmissa vaurioissa kerromme rehellisesti tilanteesta.</>
    ),
  },
  {
    icon: ShieldCheck,
    title: "2. Tarvittavat suojaukset",
    content: (
      <>Katon pesu irrottaa likaa. Teemme ennen pesua kohteen vaatimat suojaukset. <strong>Jätämme pihasi yhtä siistiksi kuin se oli tullessamme.</strong></>
    ),
  },
  {
    icon: Droplets,
    title: "3. Katon ja rännien pesu",
    content:
      "Puhdistamme katon ammattitason painepesurilla. Samalla tyhjennämme ja huuhtelemme sadevesikourut (rännit) katolta irtoavasta liasta ja sammaleesta.",
  },
  {
    icon: BrickWall,
    title: "4. Kasvustonesto ja tiilten vaihto",
    content: (
      <>Levitämme torjunta-aineen, joka <strong>tuhoaa sammaleen itiöt tiilen huokosista asti</strong>. Tämän jälkeen rikkinäiset tiilet vaihdetaan ehjiin.</>
    ),
  },
  {
    icon: Paintbrush,
    title: "5. Kaksinkertainen ruiskumaalaus ammattilaistuotteilla",
    content:
      "Maalaamme katon kahteen kertaan korkealaatuisella ja tarkalla maaliruiskulla. Käytämme laadukkaita Tikkurila ja Nowocoat -kattomaaleja.",
  },
  {
    icon: CheckCircle,
    title: "6. Lopputarkastus asiakkaan kanssa",
    content: (
      <>Työ on valmis vasta, kun olemme kiertäneet kohteen yhdessä kanssasi, tehneet lopputarkastuksen ja todenneet työnjäljen virheettömäksi. Saat työllemme <strong>5 vuoden kirjallisen takuun</strong>.</>
    ),
  },
];

const ProcessAccordion = () => {
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
            Näin homma etenee: tiilikaton pinnoitus Pirkanmaa
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
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors"
            style={{ backgroundColor: "hsl(202, 100%, 61%)" }}
          >
            Tästä ilmainen kuntoarvio
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessAccordion;
