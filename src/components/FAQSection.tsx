import { useId, useState } from 'react';
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
 * Usein kysytyt kysymykset. Vastaukset ovat HTML:ssä aina, myös suljettuina (korjaus 5, V12), ja
 * FAQPage-schema tuotetaan samasta listasta, joten näkyvä teksti ja schema vastaavat toisiaan.
 * Avaaminen on React-ohjattu (Eerik 14.10.2026: vastaus avautuu liukumalla): natiivi <details> ei osaa
 * animoida korkeutta, joten kysymys on painike (aria-expanded, aria-controls) ja vastaus liukuu auki
 * grid-template-rows-siirtymällä 0fr → 1fr. Liikettä vähentäville ei animoida.
 * Ulkoasu lehtitaitto (Eerik 28.10.2026): lista alkaa tummansinisellä viivalla, kysymykset erotetaan
 * ohuilla viivoilla ja plus-merkki kääntyy ristiksi.
 */
const FAQSection = ({ items, title, openCount = 1 }: FAQSectionProps) => {
  const baseId = useId();
  const [open, setOpen] = useState<boolean[]>(() => items.map((_, i) => i < openCount));

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = prev.length === items.length ? [...prev] : items.map((_, i) => i < openCount);
      next[index] = !next[index];
      return next;
    });

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
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container max-w-[820px] mx-auto">
          <h2 className="heading-style text-3xl md:text-4xl mb-8 md:mb-12 text-center" style={{ color: 'hsl(var(--heading-navy))' }}>
            {title || 'Usein kysytyt kysymykset'}
          </h2>
          <div className="border-t-2 border-navy divide-y divide-navy/20">
            {items.map((item, index) => {
              const isOpen = open[index] ?? index < openCount;
              const answerId = `${baseId}-faq-${index}`;
              return (
                <div key={index}>
                  <h3 className="font-heading text-lg md:text-xl font-bold leading-snug" style={{ color: 'hsl(var(--heading-navy))' }}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggle(index)}
                      className="flex w-[calc(100%+1.5rem)] items-start justify-between gap-5 py-5 md:py-6 -mx-3 px-3 rounded-lg text-left transition-colors duration-200 hover:bg-[hsl(var(--heading-navy)/0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--heading-navy)/0.4)]"
                    >
                      <span>{item.question}</span>
                      <span
                        className={`lehti-merkki mt-0.5 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`}
                        aria-hidden="true"
                      >
                        <Plus className="h-5 w-5" strokeWidth={2.5} />
                      </span>
                    </button>
                  </h3>
                  {/* Vastaus on aina DOM:ssa; korkeus liukuu 0fr → 1fr. */}
                  <div
                    id={answerId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden min-h-0">
                      {/* Suljettuna visibility: hidden, jotta vastauksen linkit eivät ole sarkaimella saavutettavissa; siirtymä pitää tekstin näkyvissä sulkeutumisen ajan. */}
                      <div
                        className={`pb-6 md:pb-7 pr-0 md:pr-12 text-base md:text-[17px] leading-relaxed text-[#333] transition-[visibility] duration-300 motion-reduce:transition-none [&_strong]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_p+p]:mt-3 ${isOpen ? 'visible' : 'invisible'}`}
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
