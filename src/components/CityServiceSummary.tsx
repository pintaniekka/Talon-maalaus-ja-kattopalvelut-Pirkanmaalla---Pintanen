import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PINNOITUS_HINTA, MAALAUS_HINTA } from "@/data/tyovaiheet";

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
 * vertailu) ovat palvelun pääsivulla ja hintasivulla, joihin kortit linkittävät.
 */
const cards: Record<Service, (cityIn: string) => Card[]> = {
  pinnoitus: (cityIn) => [
    {
      title: `Hinta on yleensä ${PINNOITUS_HINTA}`,
      text: "Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Tarkan hinnan kerromme, kun olemme nähneet katon.",
      links: [
        { to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" },
        { to: "/tiilikaton-pinnoitus-hinta-pirkanmaa/", label: "Katso hintaesimerkit" },
      ],
    },
    {
      title: `Tiilikattoremontti vai pinnoitus ${cityIn}?`,
      text: "Usein pinnoitus riittää. Jos aluskate ja katon rakenteet ovat kunnossa, kattoa ei tarvitse uusia. Jos tiilet ovat rikki laajalti tai aluskate vuotaa, katto kannattaa uusia. Katsomme sen arviokäynnillä.",
      links: [{ to: "/tiilikaton-pinnoitus-pirkanmaa/", label: "Lue lisää pinnoituksesta" }],
    },
  ],
  maalaus: (cityIn) => [
    {
      title: `Mitä talon maalaus ${cityIn} maksaa?`,
      text: `Omakotitalon ulkomaalaus maksaa meillä yleensä ${MAALAUS_HINTA}. Hinta riippuu talon koosta, kerroksista ja pohjatöiden määrästä.`,
      links: [
        { to: "/hintalaskuri/?palvelu=maalaus", label: "Laske hinta" },
        { to: "/talon-maalaus-hinta-pirkanmaa/", label: "Katso hintaesimerkit" },
      ],
    },
    {
      title: "Talo valmistuu 3–7 päivässä",
      text: "Eemil tulee ensin katsomaan seinät, ja saat kirjallisen tarjouksen. Sitten seinät pestään homepesuaineella ja irtoava maali kaavitaan. Paljaat kohdat pohjamaalataan, ja pintamaali maalataan pensselillä. Työllä on 2 vuoden takuu.",
      links: [{ to: "/talon-maalaus-pirkanmaa/", label: "Katso kaikki työvaiheet" }],
    },
    {
      title: "Huoltomaalaus vai uusi ulkoverhous?",
      text: "Usein huoltomaalaus riittää. Jos puu on kovaa ja ehjää, laudoitusta ei tarvitse vaihtaa. Katsomme seinät arviokäynnillä.",
      links: [{ to: "/talon-maalaus-pirkanmaa/", label: "Lue lisää talon maalauksesta" }],
    },
  ],
};

const headings: Record<Service, (cityIn: string) => string> = {
  pinnoitus: (cityIn) => `Hinta ja vaihtoehdot ${cityIn}`,
  maalaus: (cityIn) => `Hinta, työn kulku ja takuu ${cityIn}`,
};

const CityServiceSummary = ({ service, cityIn }: { service: Service; cityIn: string }) => {
  const items = cards[service](cityIn);
  return (
  <section className="section-padding bg-background">
    <div className="section-container">
      <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-10 text-center font-heading">{headings[service](cityIn)}</h2>
      <div className={`grid gap-6 mx-auto ${items.length === 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3 max-w-6xl"}`}>
        {items.map((card) => (
          <article key={card.title} className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 flex flex-col">
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
