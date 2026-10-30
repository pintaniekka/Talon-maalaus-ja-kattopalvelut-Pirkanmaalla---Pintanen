import ResponsiveImage from "@/components/ResponsiveImage";
type Service = "pinnoitus" | "maalaus";

interface Item {
  luulo: string;
  totuus: string;
  /** Pieni kuva, joka näyttää sen, mistä puhutaan (kuvasuunnitelma 28.10.2026). */
  kuva: { base: string; alt: string };
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
      kuva: { base: "tiilikaton-pinnoitus-haalistunut-punainen-tiilikatto-ennen", alt: "Haalistunut punainen tiilikatto ennen pinnoitusta" },
      totuus: "Haalistuminen kertoo, että tiilen tehdaspinta on kulunut pois. Kulunut tiili imee vettä, ja talvella vesi jäätyy ja rikkoo tiilen.",
    },
    {
      luulo: "Sammaleinen tiilikatto pitää uusia.",
      kuva: { base: "tiilikaton-pesu-sammaleinen-tiilikatto-ennen", alt: "Sammaleinen tiilikatto ennen pesua" },
      totuus: "Usein pinnoitus riittää. Jos aluskate ja katon rakenteet ovat kunnossa, katto pestään, rikkinäiset tiilet vaihdetaan ja katto maalataan. Katsomme sen kuntotarkastuksessa.",
    },
    {
      luulo: "Pesu riittää, kun sammal on pois.",
      kuva: { base: "tiilikaton-pesu-ja-pinnoitus-ylojarvi-puoliksi-pesty", alt: "Tiilikatto, jonka toinen puoli on pesty ja toinen ei, Ylöjärvi" },
      totuus: "Pesu poistaa kasvuston, mutta kulunut pinta imee vettä heti seuraavalla sateella. Siksi pesun jälkeen katto maalataan kahteen kertaan.",
    },
  ],
  maalaus: [
    {
      luulo: "Hilseilevän maalin päälle voi maalata.",
      kuva: { base: "talon-maalaus-pirkanmaa-keltainen-ulkoverhous-huoltomaalaus-ennen", alt: "Hilseilevä keltainen puuverhous ennen maalausta" },
      totuus: "Irtoava maali ei pidä uutta maalia kiinni. Se kaavitaan pois, ja paljaat kohdat pohjamaalataan ennen pintamaalia.",
    },
    {
      luulo: "Kun maali vielä pysyy kiinni, ei ole kiire.",
      kuva: { base: "talon-maalaus-nokia-vaaleansininen-omakotitalo-ennen", alt: "Vaaleansininen puutalo, jonka maali pysyy vielä kiinni, Nokia" },
      totuus: "Silloin maalaus on halvin. Mitä pidempään odotat, sitä enemmän pohjatöitä seinä vaatii.",
    },
    {
      luulo: "Tummat pilkut peittyvät maalilla.",
      kuva: { base: "talon-maalaus-vihrea-puutalo-ennen-ulkomaalausta", alt: "Vihreä puutalo, jonka seinissä on hometta ja likaa ennen maalausta" },
      totuus: "Pilkut ovat hometta tai likaa, ja ne tulevat maalin läpi. Seinä pestään ensin homepesuaineella ja harjoilla.",
    },
  ],
};

const Vaarinymmarrykset = ({ service }: { service: Service }) => (
  <section className="section-padding osio">
    <div className="section-container max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-8 text-center font-heading">
        {service === "pinnoitus" ? "Kolme yleistä luuloa tiilikatosta" : "Kolme yleistä luuloa talon maalauksesta"}
      </h2>
      {/* Lista eikä dl: dl:n ryhmässä ei saa olla kuvaa (Lighthouse definition-list, 29.10.2026). */}
      <ul className="grid list-none gap-6 p-0 md:grid-cols-3">
        {items[service].map((it) => (
          <li key={it.luulo} className="kortti overflow-hidden">
            <ResponsiveImage
              baseName={it.kuva.base}
              alt={it.kuva.alt}
              className="aspect-[16/10] w-full object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
              width={600}
              height={375}
            />
            <div className="p-6">
              <h3 className="font-extrabold text-navy font-heading mb-2">”{it.luulo}”</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{it.totuus}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Vaarinymmarrykset;
