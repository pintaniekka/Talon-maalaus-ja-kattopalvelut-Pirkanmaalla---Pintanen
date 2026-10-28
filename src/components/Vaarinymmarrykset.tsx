type Service = "pinnoitus" | "maalaus";

interface Item {
  luulo: string;
  totuus: string;
}

/**
 * "Yleisimmät väärinymmärrykset" (SEO-suunnitelma 25.10.2026, luku 3: Lummecolla on, meillä ei ollut).
 * Muoto sopii tekoälyvastauksille: väite ja oikaisu. Faktat ovat sivuston omia (tehdaspinta, pesu ei riitä,
 * aluskate, kaavinta, homepesu), ei uusia väitteitä.
 */
const items: Record<Service, Item[]> = {
  pinnoitus: [
    {
      luulo: "Haalistunut katto on vain ulkonäköasia.",
      totuus: "Haalistuminen kertoo, että tiilen tehdaspinta on kulunut pois. Kulunut tiili imee vettä, ja talvella vesi jäätyy ja rikkoo tiilen.",
    },
    {
      luulo: "Sammaleinen tiilikatto pitää uusia.",
      totuus: "Usein pinnoitus riittää. Jos aluskate ja katon rakenteet ovat kunnossa, katto pestään, rikkinäiset tiilet vaihdetaan ja katto maalataan. Katsomme sen kuntotarkastuksessa.",
    },
    {
      luulo: "Pesu riittää, kun sammal on pois.",
      totuus: "Pesu poistaa kasvuston, mutta kulunut pinta imee vettä heti seuraavalla sateella. Siksi pesun jälkeen katto maalataan kahteen kertaan.",
    },
  ],
  maalaus: [
    {
      luulo: "Hilseilevän maalin päälle voi maalata.",
      totuus: "Irtoava maali ei pidä uutta maalia kiinni. Se kaavitaan pois, ja paljaat kohdat pohjamaalataan ennen pintamaalia.",
    },
    {
      luulo: "Kun maali vielä pysyy kiinni, ei ole kiire.",
      totuus: "Silloin maalaus on halvin. Mitä pidempään odotat, sitä enemmän pohjatöitä seinä vaatii.",
    },
    {
      luulo: "Tummat pilkut peittyvät maalilla.",
      totuus: "Pilkut ovat hometta tai likaa, ja ne tulevat maalin läpi. Seinä pestään ensin homepesuaineella ja harjoilla.",
    },
  ],
};

const Vaarinymmarrykset = ({ service }: { service: Service }) => (
  <section className="section-padding bg-background">
    <div className="section-container max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-8 text-center font-heading">
        {service === "pinnoitus" ? "Kolme yleistä luuloa tiilikatosta" : "Kolme yleistä luuloa talon maalauksesta"}
      </h2>
      <dl className="grid gap-x-8 gap-y-9 md:grid-cols-3">
        {items[service].map((it) => (
          <div key={it.luulo} className="lehti-kortti">
            <dt className="font-extrabold text-navy font-heading mb-2">”{it.luulo}”</dt>
            <dd className="text-muted-foreground text-sm leading-relaxed">{it.totuus}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Vaarinymmarrykset;
