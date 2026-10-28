import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Service = "pinnoitus" | "maalaus";

interface Card {
  title: string;
  text: string;
  links: { to: string; label: string }[];
}

/**
 * Kaupunkisivun tiivis yhteenveto: hinta ja vertailu (pinnoitus, kaksi korttia) tai hinta, työn kulku ja
 * vertailu (maalaus, kolme korttia). Pinnoituksen kaupunkisivulla työvaiheet ovat omana listanaan
 * (ProcessList, Eerik 13.10.2026), joten työn kulkua ei toisteta tässä. Pitkät versiot (hintakortit,
 * vertailu) ovat palvelun pääsivulla ja hintasivulla, joihin kortit linkittävät. Hintasivun ankkuri vaihtelee
 * paikkakunnan mukaan (Eerik 26.10.2026, yöajon kysymys 14).
 */
const cards: Record<Service, (cityIn: string) => Card[]> = {
  // Eerik 25.10.2026: hintaan kuuluu suojaus, pohjatyöt, pohjamaalaus, pintamaalaus, siivous ja takuu.
  // Hintakortit katon koon mukaan ovat omana osionaan (PinnoitusPricingCards), joten hintaa ei toisteta tässä.
  pinnoitus: (cityIn) => [
    {
      title: "Hintaan kuuluu kaikki",
      text: "Suojaus, pesu ja rikkinäisten tiilien vaihto, pohjamaalaus, pintamaalaus, siivous ja 5 vuoden takuu. Saat kirjallisen tarjouksen kiinteällä hinnalla heti kuntotarkastuksen jälkeen.",
      links: [
        { to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" },
        { to: "/tiilikaton-pinnoitus-hinta-pirkanmaa/", label: `Pinnoituksen hinta ${cityIn}` },
      ],
    },
    {
      title: `Tiilikattoremontti vai pinnoitus ${cityIn}?`,
      text: "Usein pinnoitus riittää. Jos aluskate ja katon rakenteet ovat kunnossa, kattoa ei tarvitse uusia. Jos tiilet ovat rikki laajalti tai aluskate vuotaa, katto kannattaa uusia. Katsomme sen kuntotarkastuksessa.",
      links: [{ to: "/tiilikaton-pinnoitus-pirkanmaa/", label: "Lue lisää pinnoituksesta" }],
    },
  ],
  // Yöajo 26.10.2026: hintakortit ja työvaiheet ovat omina osioinaan, joten tässä vain mitä hintaan kuuluu ja vertailu.
  maalaus: (cityIn) => [
    {
      title: "Hintaan kuuluu kaikki",
      text: "Suojaus, homepesu, kaavinta, pohjamaali paljaisiin kohtiin, pintamaali pensselillä, siivous ja 2 vuoden takuu. Saat kirjallisen tarjouksen kiinteällä hinnalla heti arviokäynnin jälkeen.",
      links: [
        { to: "/hintalaskuri/?palvelu=maalaus", label: "Laske hinta" },
        { to: "/talon-maalaus-hinta-pirkanmaa/", label: `Maalauksen hinta ${cityIn}` },
      ],
    },
    {
      title: "Huoltomaalaus vai uusi ulkoverhous?",
      text: "Usein huoltomaalaus riittää. Katsomme seinät arviokäynnillä ja kerromme suoraan, mitä ne tarvitsevat.",
      links: [{ to: "/talon-maalaus-pirkanmaa/", label: "Lue lisää talon maalauksesta" }],
    },
  ],
};

const headings: Record<Service, (cityIn: string) => string> = {
  pinnoitus: (cityIn) => `Mitä hintaan kuuluu ${cityIn}?`,
  maalaus: (cityIn) => `Mitä hintaan kuuluu ${cityIn}?`,
};

const CityServiceSummary = ({ service, cityIn }: { service: Service; cityIn: string }) => {
  const items = cards[service](cityIn);
  return (
  <section className="section-padding osio">
    <div className="section-container">
      <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-10 text-center font-heading">{headings[service](cityIn)}</h2>
      <div className={`grid gap-6 mx-auto ${items.length === 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3 max-w-6xl"}`}>
        {items.map((card) => (
          <article key={card.title} className="kortti p-6 md:p-7 flex flex-col">
            <h3 className="text-xl font-bold text-foreground font-heading mb-3 leading-snug">{card.title}</h3>
            <p className="text-muted-foreground leading-relaxed flex-1">{card.text}</p>
            <div className="mt-5 flex flex-col gap-2">
              {card.links.map((l) => (
                <Link key={l.to + l.label} to={l.to} className="inline-flex items-center gap-1.5 font-semibold text-accent-ink hover:underline">
                  {l.label}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};

export default CityServiceSummary;
