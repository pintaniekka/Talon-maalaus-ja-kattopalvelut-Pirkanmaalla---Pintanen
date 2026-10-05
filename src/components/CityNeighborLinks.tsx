import { Link } from "react-router-dom";
import { getCityBySlug, hasMaalausPage, hasPinnoitusPage, type CityData } from "@/data/cityData";
import { cityNeighbors } from "@/data/cityNeighbors";

type Service = "pinnoitus" | "maalaus";

const config: Record<Service, {
  title: (c: CityData) => string;
  label: string;
  href: (slug: string) => string;
  has: (slug: string) => boolean;
  other: { label: (c: CityData) => string; href: (slug: string) => string; has: (slug: string) => boolean };
}> = {
  pinnoitus: {
    title: (c) => `Pinnoitamme tiilikattoja myös ${c.cityGenitive} naapurikunnissa`,
    label: "Tiilikaton pinnoitus",
    href: (slug) => `/tiilikaton-pinnoitus-${slug}/`,
    has: hasPinnoitusPage,
    other: { label: (c) => `Talon maalaus ${c.cityIn}`, href: (slug) => `/talon-maalaus-${slug}/`, has: hasMaalausPage },
  },
  maalaus: {
    title: (c) => `Maalaamme taloja myös ${c.cityGenitive} naapurikunnissa`,
    label: "Talon maalaus",
    href: (slug) => `/talon-maalaus-${slug}/`,
    has: hasMaalausPage,
    other: { label: (c) => `Tiilikaton pinnoitus ${c.cityIn}`, href: (slug) => `/tiilikaton-pinnoitus-${slug}/`, has: hasPinnoitusPage },
  },
};

const linkClass =
  "inline-flex items-center px-4 py-2 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:border-accent hover:text-accent-ink transition-colors";

/** Linkit saman palvelun sivuille naapurikunnissa sekä paikkakunnan toiseen palveluun ja aluesivulle. */
const CityNeighborLinks = ({ city, service }: { city: CityData; service: Service }) => {
  const c = config[service];
  const neighbors = (cityNeighbors[city.slug] ?? [])
    .filter((slug) => c.has(slug))
    .map((slug) => getCityBySlug(slug))
    .filter((n): n is CityData => Boolean(n));

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="section-container max-w-4xl mx-auto text-center">
        {neighbors.length > 0 && (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-6 font-heading">{c.title(city)}</h2>
            <ul className="flex flex-wrap justify-center gap-3 mb-8">
              {neighbors.map((n) => (
                <li key={n.slug}>
                  <Link to={c.href(n.slug)} className={linkClass}>
                    {c.label} {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="text-muted-foreground">
          {c.other.has(city.slug) && (
            <>
              Katso myös:{" "}
              <Link to={c.other.href(city.slug)} className="text-accent-ink underline font-medium">
                {c.other.label(city)}
              </Link>{" "}
              ja{" "}
            </>
          )}
          <Link to={`/maalauspalvelut-${city.slug}/`} className="text-accent-ink underline font-medium">
            {c.other.has(city.slug) ? "kaikki palvelumme" : "Kaikki palvelumme"} {city.cityIn}
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default CityNeighborLinks;
