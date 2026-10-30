import { useEffect, useId, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  /** Montako ensimmäistä vastausta on auki heti (oletus 1). */
  openCount?: number;
  /** Osion id (palvelun pääsivulla "ukk", jotta kaupunkisivut voivat linkittää koko listaan). */
  id?: string;
  /** Linkki listan alle (kaupunkisivulta palvelun pääsivun kaikkiin kysymyksiin, UKK-uudistus 30.10.2026). */
  lisaa?: { to: string; label: string };
}

/**
 * Usein kysytyt kysymykset. Vastaukset ovat HTML:ssä aina, myös suljettuina (korjaus 5, V12), ja
 * FAQPage-schema tuotetaan samasta listasta, joten näkyvä teksti ja schema vastaavat toisiaan.
 * Avaaminen on React-ohjattu (Eerik 14.10.2026: vastaus avautuu liukumalla): natiivi <details> ei osaa
 * animoida korkeutta, joten kysymys on painike (aria-expanded, aria-controls) ja vastaus liukuu auki
 * grid-template-rows-siirtymällä 0fr → 1fr. Liikettä vähentäville ei animoida.
 * Ulkoasu 28.10.2026: koko lista yhdessä valkoisessa kortissa, kysymykset erotetaan ohuilla viivoilla ja
 * plus-merkki on vaaleansininen pallo, joka kääntyy ristiksi.
 */
const FAQSection = ({ items, title, openCount = 1, id, lisaa }: FAQSectionProps) => {
  const baseId = useId();
  const [open, setOpen] = useState<boolean[]>(() => items.map((_, i) => i < openCount));

  // Kaupunkisivun "Kaikki kysymykset" -linkki tuo tänne ankkurilla (#ukk). Sivu latautuu laiskasti, ja Layoutin
  // ScrollToTop vierittää ylös samassa päivityksessä, joten vieritetään vasta sen jälkeen.
  const { hash } = useLocation();
  useEffect(() => {
    if (!id || hash !== `#${id}`) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' }), 0);
    return () => window.clearTimeout(t);
  }, [id, hash]);

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
      <section id={id} className="scroll-mt-20 py-16 md:py-24 osio">
        <div className="section-container max-w-[820px] mx-auto">
          <h2 className="heading-style text-3xl md:text-4xl mb-8 md:mb-12 text-center" style={{ color: 'hsl(var(--heading-navy))' }}>
            {title || 'Usein kysytyt kysymykset'}
          </h2>
          <div className="kortti px-5 md:px-8 divide-y divide-border">
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
                        className={`kortti-merkki mt-0.5 !h-8 !w-8 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`}
                        aria-hidden="true"
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.25} />
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
          {lisaa && (
            <p className="mt-6 text-center">
              <Link to={lisaa.to} className="inline-flex items-center gap-1 font-semibold text-accent-ink hover:underline">
                {lisaa.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default FAQSection;
