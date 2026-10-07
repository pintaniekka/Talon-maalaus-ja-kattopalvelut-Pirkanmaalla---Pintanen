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
 * Kaupunkisivun tiivis yhteenveto: työn kulku, hinta ja vertailu kolmena korttina.
 * Pitkät versiot (työvaiheet, hintakortit, vertailu) ovat palvelun pääsivulla ja hintasivulla,
 * joihin kortit linkittävät. Näin kaupunkisivu ei toista pääsivun tekstiä (päällekkäisyys 5.10.2026:
 * pinnoitus 66 %, maalaus 50 %).
 */
const cards: Record<Service, (cityIn: string) => Card[]> = {
  pinnoitus: (cityIn) => [
    {
      title: "Katto valmistuu 2–4 päivässä",
      text: "Tulemme ensin katsomaan katon, ja saat tarjouksen. Sitten pesemme katon ja vaihdamme rikkinäiset tiilet uusiin. Lopuksi maalaamme katon ruiskulla kahteen kertaan. Saat työlle 5 vuoden kirjallisen takuun.",
      links: [{ to: "/tiilikaton-pinnoitus-pirkanmaa/", label: "Katso kaikki työvaiheet" }],
    },
    {
      title: `Hinta on yleensä ${PINNOITUS_HINTA}`,
      text: "Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Työn osuudesta saat kotitalousvähennyksen. Tarkan hinnan kerromme, kun olemme nähneet katon.",
      links: [
        { to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" },
        { to: "/tiilikaton-pinnoitus-hinta-pirkanmaa/", label: "Katso hintaesimerkit" },
      ],
    },
    {
      title: `Tiilikattoremontti vai pinnoitus ${cityIn}?`,
      text: "Usein pinnoitus riittää. Jos aluskate ja katon rakenteet ovat kunnossa, kattoa ei tarvitse uusia. Tarkistamme aluskatteen käynnillä ja kerromme suoraan, kumpi kannattaa.",
      links: [{ to: "/tiilikaton-pinnoitus-pirkanmaa/", label: "Lue lisää pinnoituksesta" }],
    },
  ],
  maalaus: (cityIn) => [
    {
      title: `Mitä talon maalaus ${cityIn} maksaa?`,
      text: `Omakotitalon ulkomaalaus maksaa meillä yleensä ${MAALAUS_HINTA}. Hinta riippuu talon koosta, kerroksista ja pohjatöiden määrästä. Työn osuudesta saat kotitalousvähennyksen.`,
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
      text: "Usein huoltomaalaus riittää. Jos puu on kovaa ja ehjää, laudoitusta ei tarvitse vaihtaa. Katsomme seinät arviokäynnillä ja kerromme suoraan, mitä ne tarvitsevat.",
      links: [{ to: "/talon-maalaus-pirkanmaa/", label: "Lue lisää talon maalauksesta" }],
    },
  ],
};

const headings: Record<Service, (cityIn: string) => string> = {
  pinnoitus: (cityIn) => `Työ, hinta ja takuu ${cityIn}`,
  maalaus: (cityIn) => `Hinta, työn kulku ja takuu ${cityIn}`,
};

const CityServiceSummary = ({ service, cityIn }: { service: Service; cityIn: string }) => (
  <section className="section-padding bg-secondary">
    <div className="section-container">
      <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-10 text-center font-heading">{headings[service](cityIn)}</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards[service](cityIn).map((card) => (
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

export default CityServiceSummary;
