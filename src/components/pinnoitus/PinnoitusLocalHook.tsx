import { motion } from 'framer-motion';

interface PinnoitusLocalHookProps {
  title: string;
  text: string;
}

const PinnoitusLocalHook = ({ title, text }: PinnoitusLocalHookProps) => {
  return (
    <section className="section-padding bg-card">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">
            {title}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PinnoitusLocalHook;
