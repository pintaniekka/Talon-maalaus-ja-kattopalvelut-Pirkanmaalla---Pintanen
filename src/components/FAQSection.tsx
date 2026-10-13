import { Helmet } from 'react-helmet-async';
import { Plus } from 'lucide-react';

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
 * Ulkoasu (Eerik 13.10.2026): yksi kapea lista ohuilla viivoilla ilman laatikoita, kysymys
 * otsikkofontilla, plus-merkki kääntyy ristiksi kun vastaus on auki.
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
        <div className="section-container max-w-[820px] mx-auto">
          <h2 className="heading-style text-3xl md:text-4xl mb-8 md:mb-12 text-center" style={{ color: 'hsl(var(--heading-navy))' }}>
            {title || 'Usein kysytyt kysymykset'}
          </h2>
          <div className="border-t border-[hsl(var(--heading-navy)/0.15)]">
            {items.map((item, index) => (
              <details
                key={index}
                open={index < openCount}
                className="group border-b border-[hsl(var(--heading-navy)/0.15)]"
              >
                <summary
                  className="flex items-start justify-between gap-5 cursor-pointer list-none py-5 md:py-6 -mx-3 px-3 rounded-lg text-left transition-colors duration-200 hover:bg-[hsl(var(--heading-navy)/0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--heading-navy)/0.4)] [&::-webkit-details-marker]:hidden"
                  style={{ color: 'hsl(var(--heading-navy))' }}
                >
                  <h3 className="font-heading text-lg md:text-xl font-bold leading-snug">{item.question}</h3>
                  <span
                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[hsl(var(--heading-navy)/0.3)] transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </summary>
                <div
                  className="pb-6 md:pb-7 pr-0 md:pr-12 text-base md:text-[17px] leading-relaxed text-[#333] [&_strong]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_p+p]:mt-3"
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
