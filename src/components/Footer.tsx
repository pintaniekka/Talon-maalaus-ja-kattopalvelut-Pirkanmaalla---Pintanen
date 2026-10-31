import { Link } from "react-router-dom";
import { getStorageUrl } from "@/lib/storage";
import OptimizedImage from "./OptimizedImage";
import { Phone, Mail, Star } from "@/components/icons/BrandIcons";
import { GOOGLE_PROFILE_URL, LUVUT, YHTEYSTIEDOT } from "@/data/company";
import { allCities, type CityData } from "@/data/cityData";
import { openConsentSettings } from "@/lib/analytics";

const logoUrl = getStorageUrl("Pintanen-logo.png");

/** Kanta-Häme ja Satakunta erotetaan Pirkanmaasta; muut 21 kuntaa ovat Pirkanmaata. */
const kantaHameSlugs = new Set(["forssa", "hameenlinna", "huittinen"]);
const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name, "fi");
const pirkanmaa = allCities.filter((c) => !kantaHameSlugs.has(c.slug)).sort(byName);
const kantaHame = allCities.filter((c) => kantaHameSlugs.has(c.slug)).sort(byName);

/**
 * Kolme palstaa, enintään neljä linkkiä kussakin (Eerik 26.10.2026: "siivoa footer"). Kuntotarkastus-linkki vie
 * omalle sivulleen ja Pintanen-palstassa on viidentenä kotitalousvähennys (Eerik 26.10.2026, yöajon kysymykset 11–12).
 * Viisi linkkiä Pintanen-palstassa on hyväksytty (Eerik 26.10.2026, yöajon kysymys 18).
 */
const palstat = [
  {
    title: "Tiilikaton pinnoitus",
    links: [
      { to: "/tiilikaton-pinnoitus-pirkanmaa/", label: "Tiilikaton pinnoitus" },
      { to: "/tiilikaton-pinnoitus-hinta-pirkanmaa/", label: "Hinta ja hintalaskuri" },
      { to: "/ilmainen-katon-kuntotarkastus/", label: "Ilmainen kuntotarkastus" },
      { to: "/harjatiivisteen-asennus/", label: "Harjatiiviste" },
    ],
  },
  {
    title: "Talon maalaus",
    links: [
      { to: "/talon-maalaus-pirkanmaa/", label: "Talon maalaus" },
      { to: "/talon-maalaus-hinta-pirkanmaa/", label: "Hinta ja hintalaskuri" },
      { to: "/ilmainen-julkisivun-kuntoarvio/", label: "Ilmainen arviokäynti" },
    ],
  },
  {
    title: "Pintanen",
    links: [
      { to: "/meista/", label: "Meistä" },
      { to: "/referenssit/", label: "Referenssit" },
      { to: "/kokemuksia/", label: "Kokemuksia" },
      { to: "/artikkelit/", label: "Artikkelit" },
      { to: "/kotitalousvahennys/", label: "Kotitalousvähennys" },
      { to: "/taloyhtiot/", label: "Taloyhtiöille" },
    ],
  },
];

const numerot = [
  { label: "Katot", person: YHTEYSTIEDOT.eerik },
  { label: "Seinät", person: YHTEYSTIEDOT.eemil },
];

const some = [
  {
    href: "https://www.facebook.com/profile.php?id=61587740767358",
    label: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    href: "https://www.instagram.com/pintanenoy/",
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    href: "https://x.com/PintanenOy",
    label: "X (Twitter)",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

const columnTitle = "mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/55";
const linkClass = "text-[15px] text-white/80 transition-colors hover:text-accent";
const cityLink = "transition-colors hover:text-accent hover:underline";

/** Kunnat pilkuilla eroteltuna, linkki kunnan aluesivulle (Eerik 27.10.2026: alatunnisteessa pelkät aluelinkit). */
const KaupunkiLinkit = ({ cities }: { cities: CityData[] }) => (
  <>
    {cities.map((city, i) => (
      <span key={city.slug}>
        <Link to={`/maalauspalvelut-${city.slug}/`} className={cityLink}>
          {city.name}
        </Link>
        {i < cities.length - 1 && ", "}
      </span>
    ))}
  </>
);

/**
 * Alatunniste, siivottu (Eerik 26.10.2026). Navy-pohja, värillinen yläviiva. Rivi 1: yritys (logo, puhelimet
 * KATOT ja SEINÄT, sähköposti, Google-arvio) ja kolme lyhyttä palstaa. Rivi 2: kuntien aluesivut himmeänä
 * tekstinä (Eerik 27.10.2026). Rivi 3: ©, Y-tunnus, tietosuoja, evästeet,
 * some ja karttojen lähdemaininta (CC BY 4.0 ja ODbL vaativat sen).
 */
const Footer = () => (
  <footer className="relative bg-navy text-navy-foreground">
    <div className="h-1 w-full bg-gradient-to-r from-paint-yellow via-accent to-accent-strong" aria-hidden="true" />
    <div className="section-container py-12 md:py-14">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pr-20">
        <div className="md:col-span-2 lg:col-span-5">
          <OptimizedImage
            src={logoUrl}
            alt="Pintanen logo"
            className="h-11 w-auto object-contain brightness-0 invert"
            width={360}
            height={144}
            sizes="360px"
          />
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">
            Tamperelainen perheyritys. Eerik pinnoittaa tiilikatot ja Eemil maalaa talot Pirkanmaalla ja lähikunnissa.
          </p>
          <ul className="mt-5 space-y-2">
            {numerot.map(({ label, person }) => (
              <li key={label} className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span className="w-14 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/55">{label}</span>
                <a href={person.phoneHref} className="font-heading text-lg font-extrabold text-white transition-colors hover:text-accent">
                  {person.phone}
                </a>
                <span className="text-sm text-white/55">{person.first}</span>
              </li>
            ))}
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              <a href="mailto:myynti@pintanen.fi" className="text-[15px] text-white/80 transition-colors hover:text-accent">
                myynti@pintanen.fi
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Star className="h-4 w-4 shrink-0 fill-current text-paint-yellow" />
              <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-[15px] text-white/80 transition-colors hover:text-accent">
                <span className="font-bold text-white">{LUVUT.googleArvio}</span> Google-arvosteluissa
              </a>
            </li>
          </ul>
        </div>

        {palstat.map((p) => (
          <div key={p.title} className="lg:col-span-2">
            <h3 className={columnTitle}>{p.title}</h3>
            <ul className="space-y-2">
              {p.links.map((l) => (
                <li key={l.to + l.label}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-1">
          <h3 className={columnTitle}>Yhteys</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/yhteystiedot/" className={linkClass}>
                Yhteystiedot
              </Link>
            </li>
            <li>
              <Link to="/toiminta-alueet/" className={linkClass}>
                Toiminta-alueet
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Kuntien aluesivut (maalauspalvelut-<kunta>) yhdellä himmeällä rivillä (Eerik 27.10.2026). */}
      <div className="mt-10 border-t border-white/10 pt-6 text-[13px] leading-6 text-white/50">
        <p>
          <span className="font-bold text-white/60">Pirkanmaa:</span> <KaupunkiLinkit cities={pirkanmaa} />
          {" · "}
          <span className="font-bold text-white/60">Kanta-Häme ja Satakunta:</span> <KaupunkiLinkit cities={kantaHame} />
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-[13px] text-white/50 md:flex-row md:items-center md:justify-between">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} Pintanen Oy · Y-tunnus 3525786-9</span>
          <Link to="/tietosuoja/" className="transition-colors hover:text-white">
            Tietosuojaseloste
          </Link>
          <button type="button" onClick={openConsentSettings} className="transition-colors hover:text-white">
            Evästeasetukset
          </button>
        </p>
        <p className="flex items-center gap-3">
          {some.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-white/50 transition-colors hover:text-accent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </p>
      </div>
      {/* Kuntakarttojen lähdemaininta: Tilastokeskus CC BY 4.0 ja OpenStreetMap ODbL vaativat sen (Eerik 25.10.2026: ei kuvan alle). */}
      <p className="mt-2 text-[11px] text-white/50">Kuntakartat: Tilastokeskus, kuntajako 2026 (CC BY 4.0) ja OpenStreetMap-tekijät (ODbL).</p>
    </div>
  </footer>
);

export default Footer;
