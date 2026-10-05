import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  /** Polku ilman loppukauttaviivaa. Viimeiseltä (nykyinen sivu) polku jätetään pois. */
  path?: string;
}

/**
 * Näkyvä murupolku (P7). JSON-LD-vastine tuotetaan SEO-komponentissa samasta listasta
 * (`breadcrumbs`-propsi), jotta Google näkee saman polun sivulla ja schemassa.
 */
const Breadcrumbs = ({ items, className = "" }: { items: Crumb[]; className?: string }) => (
  <nav aria-label="Murupolku" className={`text-sm text-muted-foreground ${className}`}>
    <ol className="flex flex-wrap items-center gap-1.5">
      <li>
        <Link to="/" className="hover:text-foreground">
          Etusivu
        </Link>
      </li>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            {last || !item.path ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link to={`${item.path}/`} className="hover:text-foreground">
                {item.name}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
