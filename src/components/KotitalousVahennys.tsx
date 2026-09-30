import { motion } from "framer-motion";
import { Calculator, Euro } from "@/components/icons/BrandIcons";

const KotitalousVahennys = () => {
  return (
    <section className="section-padding bg-accent-light">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Euro className="w-8 h-8 text-accent" />
            </div>
            <h2 className="heading-style text-3xl md:text-4xl text-accent mb-4">
              Hyödynnä kotitalousvähennys
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Yritykseltä ostettu työ: Saat vähentää vuosina 2026 ja 2027 <strong className="text-foreground">40 %</strong> työn osuudesta. 
              Vähennys lasketaan työn arvonlisäverollisesta hinnasta.
            </p>
            <p className="text-muted-foreground mt-2">
              Kotitalousvähennyksen määrä on enintään <strong className="text-foreground">2 100 €</strong> henkilöltä vuodessa, ja omavastuu on 150 €.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-accent/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold text-foreground">Esimerkkilaskelma</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Urakan kokonaishinta</span>
                <span className="font-semibold text-foreground">5 000 €</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Työn osuus</span>
                <span className="font-semibold text-foreground">4 000 €</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Vähennys (40 %, omavastuu 150 € huomioitu)</span>
                <span className="font-semibold text-accent">−1 450 €</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-accent/10 rounded-lg px-4 -mx-4">
                <span className="font-bold text-foreground">Lopullinen hinta</span>
                <span className="text-2xl font-bold text-accent">3 550 €</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default KotitalousVahennys;
