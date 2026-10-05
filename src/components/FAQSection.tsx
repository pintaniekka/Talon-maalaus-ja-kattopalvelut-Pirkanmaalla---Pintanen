import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

const FAQSection = ({ items, title }: FAQSectionProps) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <section className="py-20 md:py-24" style={{ backgroundColor: 'hsl(var(--faq-bg))' }}>
        <div className="section-container max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-style text-3xl md:text-4xl mb-10 text-center tracking-wide" style={{ color: 'hsl(var(--heading-navy))' }}>
              {title || 'Usein kysytyt kysymykset'}
            </h2>
            <Accordion type="single" collapsible className="space-y-3.5">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-gray-200 rounded-[10px] px-6 overflow-hidden bg-white shadow-none transition-colors duration-200 hover:bg-[hsl(var(--faq-hover))]"
                >
                  <AccordionTrigger
                    className="text-left text-lg font-semibold hover:no-underline py-5"
                    style={{ color: 'hsl(var(--heading-navy))' }}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed pb-5 pt-3 text-[#333]">
                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </AccordionContent>

                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
