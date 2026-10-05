import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  /** Montako ensimmäistä vastausta on auki heti (oletus 1). */
  openCount?: number;
}

/**
 * Usein kysytyt kysymykset natiivilla <details>-elementillä: vastaukset ovat HTML:ssä myös
 * suljettuina (korjaus 5, V12), eikä avaaminen tarvitse JavaScriptiä. FAQPage-schema tuotetaan
 * samasta listasta, joten näkyvä teksti ja schema vastaavat toisiaan.
 */
const FAQSection = ({ items, title, openCount = 1 }: FAQSectionProps) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <section className="py-16 md:py-24" style={{ backgroundColor: 'hsl(var(--faq-bg))' }}>
        <div className="section-container max-w-[900px] mx-auto">
          <h2 className="heading-style text-3xl md:text-4xl mb-10 text-center tracking-wide" style={{ color: 'hsl(var(--heading-navy))' }}>
            {title || 'Usein kysytyt kysymykset'}
          </h2>
          <div className="space-y-3.5">
            {items.map((item, index) => (
              <details
                key={index}
                open={index < openCount}
                className="group border border-gray-200 rounded-[10px] bg-white shadow-none transition-colors duration-200 hover:bg-[hsl(var(--faq-hover))] open:bg-white"
              >
                <summary
                  className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-left [&::-webkit-details-marker]:hidden"
                  style={{ color: 'hsl(var(--heading-navy))' }}
                >
                  <h3 className="text-lg font-semibold font-sans tracking-normal">{item.question}</h3>
                  <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div
                  className="px-6 pb-5 text-base leading-relaxed text-[#333] [&_strong]:font-semibold [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
