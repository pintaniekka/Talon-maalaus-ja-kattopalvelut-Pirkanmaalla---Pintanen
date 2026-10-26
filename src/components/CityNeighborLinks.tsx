import { Link } from "react-router-dom";
import { getCityBySlug, hasMaalausPage, hasPinnoitusPage, type CityData } from "@/data/cityData";
import { cityNeighbors } from "@/data/cityNeighbors";

type Service = "pinnoitus" | "maalaus";

const config: Record<Service, {
  title: string;
  label: string;
  href: (slug: string) => string;
  has: (slug: string) => boolean;
  other: { label: (c: CityData) => string; href: (slug: string) => string; has: (slug: string) => boolean };
}> = {
  pinnoitus: {
    title: "Tiilikaton pinnoitus muualla Pirkanmaalla",
    label: "Tiilikaton pinnoitus",
    href: (slug) => `/tiilikaton-pinnoitus-${slug}/`,
    has: hasPinnoitusPage,
    other: { label: (c) => `Talon maalaus ${c.cityIn}`, href: (slug) => `/talon-maalaus-${slug}/`, has: hasMaalausPage },
  },
  maalaus: {
    title: "Talon maalaus muualla Pirkanmaalla",
    label: "Talon maalaus",
    href: (slug) => `/talon-maalaus-${slug}/`,
    has: hasMaalausPage,
    other: { label: (c) => `Tiilikaton pinnoitus ${c.cityIn}`, href: (slug) => `/tiilikaton-pinnoitus-${slug}/`, has: hasPinnoitusPage },
  },
};

const chip =
  "inline-flex items-center px-4 py-2 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:border-accent hover:text-accent-ink transition-colors";

/**
 * Sivun loppu: naapurikunnat nappeina (enintään kuusi), sitten yksi rivi: toinen palvelu samalla
 * paikkakunnalla ja kaikki paikkakunnat. Yöajo 26.10.2026 (Eerik: "sekava linkkiröykkiö" pois):
 * tekstilinkit kaikkiin kuntiin poistettu, koska alatunniste linkittää jo jokaiseen kuntaan.
 */
const CityNeighborLinks = ({ city, service }: { city: CityData; service: Service }) => {
  const c = config[service];
  const neighbors = (cityNeighbors[city.slug] ?? [])
    .filter((slug) => c.has(slug))
    .map((slug) => getCityBySlug(slug))
    .filter((n): n is CityData => Boolean(n))
    .slice(0, 6);

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="section-container max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-6 font-heading">{c.title}</h2>
        {neighbors.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-3 mb-6">
            {neighbors.map((n) => (
              <li key={n.slug}>
                <Link to={c.href(n.slug)} className={chip}>
                  {n.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/toiminta-alueet/" className={`${chip} border-accent text-accent-ink`}>
                Kaikki paikkakunnat
              </Link>
            </li>
          </ul>
        )}
        {c.other.has(city.slug) && (
          <p className="text-muted-foreground">
            Katso myös:{" "}
            <Link to={c.other.href(city.slug)} className="text-accent-ink underline font-medium">
              {c.other.label(city)}
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
};

export default CityNeighborLinks;
