import { motion } from 'framer-motion';

const trustStats = [
  { value: '5,0 / 5', label: 'Google-arvostelut', sub: '' },
  { value: 'Yli 60', label: 'Maalattua taloa', sub: (<>Jokainen urakka on tehty <strong className="text-foreground">henkilökohtaisesti</strong>.</>) },
  { value: '+5 vuotta', label: 'Kokemusta alalta', sub: 'Talon maalaus ei enää herätä kysymyksiä.' },
  { value: '2 vuotta', label: 'Takuu työlle', sub: (<><strong className="text-foreground">Seison yrittäjänä oman jälkeni takana.</strong></>) },
];

const MaalausTrustStats = () => {
  return (
    <section className="py-12 bg-background">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {trustStats.map((stat, i) => (
            <motion.div
              key={String(stat.label)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-5 md:p-6 text-center shadow-sm border border-border/50"
            >
              <p className="text-2xl md:text-3xl font-bold text-accent-ink mb-1">{stat.value}</p>
              <p className="text-sm font-semibold text-foreground mb-2">{stat.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaalausTrustStats;
