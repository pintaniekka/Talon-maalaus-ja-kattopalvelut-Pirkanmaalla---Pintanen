import { Link } from 'react-router-dom';
import { getStorageUrl } from '@/lib/storage';
import OptimizedImage from './OptimizedImage';
import { GOOGLE_PROFILE_URL } from "@/data/company";

const logoUrl = getStorageUrl("Pintanen-logo.png");

const pirkanmaaCities = [
  { name: "Tampere", slug: "tampere" },
  { name: "Nokia", slug: "nokia" },
  { name: "Ylöjärvi", slug: "ylojarvi" },
  { name: "Sastamala", slug: "sastamala" },
  { name: "Hämeenkyrö", slug: "hameenkyro" },
  { name: "Kangasala", slug: "kangasala" },
  { name: "Lempäälä", slug: "lempaala" },
  { name: "Pirkkala", slug: "pirkkala" },
  { name: "Valkeakoski", slug: "valkeakoski" },
];

const pirkanmaaExtra = [
  { name: "Akaa", slug: "akaa" },
  { name: "Ikaalinen", slug: "ikaalinen" },
  { name: "Juupajoki", slug: "juupajoki" },
  { name: "Kihniö", slug: "kihnio" },
  { name: "Mänttä-Vilppula", slug: "mantta-vilppula" },
  { name: "Orivesi", slug: "orivesi" },
  { name: "Parkano", slug: "parkano" },
  { name: "Pälkäne", slug: "palkane" },
  { name: "Ruovesi", slug: "ruovesi" },
  { name: "Urjala", slug: "urjala" },
  { name: "Vesilahti", slug: "vesilahti" },
  { name: "Virrat", slug: "virrat" },
];

const kantaHameCities = [
  { name: "Forssa", slug: "forssa" },
  { name: "Hämeenlinna", slug: "hameenlinna" },
  { name: "Huittinen", slug: "huittinen" },
];

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo & Contact */}
          <div>
            <OptimizedImage
              src={logoUrl}
              alt="Pintanen logo"
              className="h-14 w-auto mb-3 brightness-0 invert object-contain"
              width={360}
              height={144}
              sizes="360px"
            />
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="mailto:myynti@pintanen.fi" className="hover:text-primary-foreground transition-colors">
                  myynti@pintanen.fi
                </a>
              </li>
              <li>
                <a href="tel:+358409640066" className="hover:text-primary-foreground transition-colors">
                  040 964 0066
                </a>
              </li>
              <li>Y-tunnus: 3525786-9</li>
              <li>
                <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
                  Google-arvostelut
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="https://www.facebook.com/profile.php?id=61587740767358" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/pintanenoy/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://x.com/PintanenOy" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors" aria-label="X (Twitter)">
                <XIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Sivunavigaatio */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Sivunavigaatio</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/" className="hover:text-primary-foreground transition-colors">
                  Etusivu
                </Link>
              </li>
              <li>
                <Link to="/tiilikaton-pinnoitus-pirkanmaa" className="hover:text-primary-foreground transition-colors">
                  Tiilikaton pinnoitus
                </Link>
              </li>
              <li>
                <Link to="/katon-puhdistus-pirkanmaa" className="hover:text-primary-foreground transition-colors">
                  Katon puhdistus
                </Link>
              </li>
              <li>
                <Link to="/talon-maalaus-pirkanmaa" className="hover:text-primary-foreground transition-colors">
                  Ulkomaalaus
                </Link>
              </li>
              <li>
                <Link to="/maalauspalvelut-hinta-pirkanmaa" className="hover:text-primary-foreground transition-colors">
                  Hintalaskuri
                </Link>
              </li>
              <li>
                <Link to="/toiminta-alueet" className="hover:text-primary-foreground transition-colors">
                  Toiminta-alueet
                </Link>
              </li>
              <li>
                <Link to="/referenssit" className="hover:text-primary-foreground transition-colors">
                  Referenssit
                </Link>
              </li>
              <li>
                <Link to="/meista" className="hover:text-primary-foreground transition-colors">
                  Tutustu meihin
                </Link>
              </li>
              <li>
                <Link to="/artikkelit" className="hover:text-primary-foreground transition-colors">
                  Artikkelit
                </Link>
              </li>
              <li>
                <Link to="/tietosuoja" className="hover:text-primary-foreground transition-colors">
                  Tietosuojaseloste
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Pirkanmaa */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Pirkanmaa</h3>
            <p className="text-sm text-primary-foreground/70 leading-loose">
              {[...pirkanmaaCities, ...pirkanmaaExtra].map((city, i, arr) => (
                <span key={city.slug}>
                  <Link to={`/maalauspalvelut-${city.slug}`} className="hover:underline hover:text-primary-foreground transition-colors">
                    {city.name}
                  </Link>
                  {i < arr.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>

          {/* Column 4: Kanta-Häme & Lähialueet */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Kanta-Häme &amp; Satakunta</h3>
            <p className="text-sm text-primary-foreground/70 leading-loose">
              {kantaHameCities.map((city, i, arr) => (
                <span key={city.slug}>
                  <Link to={`/maalauspalvelut-${city.slug}`} className="hover:underline hover:text-primary-foreground transition-colors">
                    {city.name}
                  </Link>
                  {i < arr.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} Pintanen Oy. Kaikki oikeudet pidätetään.{" "}
            <Link to="/tietosuoja" className="underline underline-offset-2 hover:text-primary-foreground transition-colors">
              Tietosuojaseloste
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
