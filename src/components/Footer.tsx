import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getStorageUrl } from "@/lib/storage";
import OptimizedImage from "./OptimizedImage";
import { Phone, Mail, Star } from "@/components/icons/BrandIcons";
import { GOOGLE_PROFILE_URL, LUVUT, TAKUU, YHTEYSTIEDOT } from "@/data/company";
import { allCities } from "@/data/cityData";
import { openConsentSettings } from "@/lib/analytics";

const logoUrl = getStorageUrl("Pintanen-logo.png");

/** Kanta-Häme ja Satakunta erotetaan Pirkanmaasta; muut 21 kuntaa ovat Pirkanmaata. */
const kantaHameSlugs = new Set(["forssa", "hameenlinna", "huittinen"]);
const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name, "fi");
const pirkanmaa = allCities.filter((c) => !kantaHameSlugs.has(c.slug)).sort(byName);
const kantaHame = allCities.filter((c) => kantaHameSlugs.has(c.slug)).sort(byName);

/** Palstat Lummecon tapaan palveluittain (Eerik 26.10.2026): palvelusivu, hinta, laskuri, ilmainen käynti, kokemuksia. */
const palstat = [
  {
    title: "Tiilikaton pinnoitus",
    links: [
      { to: "/tiilikaton-pinnoitus-pirkanmaa/", label: "Tiilikaton pinnoitus Pirkanmaalla" },
      { to: "/tiilikaton-pinnoitus-hinta-pirkanmaa/", label: "Pinnoituksen hinta" },
      { to: "/hintalaskuri/?palvelu=pinnoitus", label: "Hintalaskuri katolle" },
      { to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Ilmainen kuntotarkastus" },
      { to: "/kokemuksia/", label: "Kokemuksia pinnoituksesta" },
    ],
  },
  {
    title: "Talon maalaus",
    links: [
      { to: "/talon-maalaus-pirkanmaa/", label: "Talon maalaus Pirkanmaalla" },
      { to: "/talon-maalaus-hinta-pirkanmaa/", label: "Maalauksen hinta" },
      { to: "/hintalaskuri/?palvelu=maalaus", label: "Hintalaskuri seinille" },
      { to: "/tarjouspyynto/?palvelu=maalaus", label: "Ilmainen arviokäynti" },
      { to: "/kokemuksia/", label: "Kokemuksia maalauksesta" },
    ],
  },
  {
    title: "Pintanen",
    links: [
      { to: "/meista/", label: "Meistä" },
      { to: "/referenssit/", label: "Referenssit" },
      { to: "/artikkelit/", label: "Artikkelit" },
      { to: "/toiminta-alueet/", label: "Toiminta-alueet" },
      { to: "/yhteystiedot/", label: "Yhteystiedot" },
    ],
  },
];

const numerot = [
  { label: "Katot", person: YHTEYSTIEDOT.eerik },
  { label: "Seinät", person: YHTEYSTIEDOT.eemil },
];

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const columnTitle = "mb-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/55";
const linkClass = "text-[15px] text-white/80 transition-colors hover:text-accent";

/**
 * Alatunniste (Eerik 26.10.2026: ulkoasu uusiksi, rakenne Lummecon tapaan palveluittain). Navy-pohja kuten
 * Toiminta-alueet-lohkossa, värillinen yläviiva kuten otsakkeessa. Vasemmalla yritys: logo, lause, puhelinnumerot
 * KATOT ja SEINÄT isolla, sähköposti, Google-arvio, some. Palstat: Tiilikaton pinnoitus, Talon maalaus, Pintanen,
 * Toiminta-alueet (kaikki 24 kuntaa aluesivuille, cityData). Alin rivi: ©, Y-tunnus, tietosuoja, evästeet, karttojen lähde.
 */
const Footer = () => (
  <footer className="relative bg-navy text-navy-foreground">
    <div className="h-1 w-full bg-gradient-to-r from-paint-yellow via-accent to-accent-strong" aria-hidden="true" />
    <div className="section-container py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Yritys ja yhteystiedot */}
        <div className="md:col-span-2 lg:col-span-4">
          <OptimizedImage
            src={logoUrl}
            alt="Pintanen logo"
            className="h-12 w-auto object-contain brightness-0 invert"
            width={360}
            height={144}
            sizes="360px"
          />
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">
            Tamperelainen perheyritys. Eerik pinnoittaa tiilikatot ja Eemil maalaa talot Pirkanmaalla ja lähikunnissa.
            Takuu: pinnoitus {TAKUU.pinnoitus}, maalaus {TAKUU.maalaus}.
          </p>

          <ul className="mt-6 space-y-3">
            {numerot.map(({ label, person }) => (
              <li key={label}>
                <a
                  href={person.phoneHref}
                  className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 transition-colors hover:border-accent hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-strong text-white">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
                      {label} · {person.first}
                    </span>
                    <span className="block font-heading text-xl font-extrabold text-white">{person.phone}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a href="mailto:myynti@pintanen.fi" className="mt-4 flex items-center gap-2 text-[15px] text-white/80 transition-colors hover:text-accent">
            <Mail className="h-4 w-4 text-white/50" />
            myynti@pintanen.fi
          </a>

          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-[15px] text-white/80 transition-colors hover:text-accent"
          >
            <span className="flex items-center gap-0.5 text-paint-yellow" aria-hidden="true">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </span>
            <span className="font-bold text-white">{LUVUT.googleArvio}</span>
            <span>Google-arvostelut</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <div className="mt-6 flex items-center gap-3">
            {[
              { href: "https://www.facebook.com/profile.php?id=61587740767358", label: "Facebook", Icon: FacebookIcon },
              { href: "https://www.instagram.com/pintanenoy/", label: "Instagram", Icon: InstagramIcon },
              { href: "https://x.com/PintanenOy", label: "X (Twitter)", Icon: XIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {palstat.map((p) => (
          <div key={p.title} className="lg:col-span-2">
            <h3 className={columnTitle}>{p.title}</h3>
            <ul className="space-y-2.5">
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

        {/* Toiminta-alueet: kaikki kunnat aluesivuille */}
        <div className="md:col-span-2 lg:col-span-2">
          <h3 className={columnTitle}>Toiminta-alueet</h3>
          <p className="text-[13px] font-bold text-white/60">Pirkanmaa</p>
          <p className="mt-1 text-[14px] leading-6 text-white/80">
            {pirkanmaa.map((city, i, arr) => (
              <span key={city.slug}>
                <Link to={`/maalauspalvelut-${city.slug}/`} className="transition-colors hover:text-accent hover:underline">
                  {city.name}
                </Link>
                {i < arr.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p className="mt-3 text-[13px] font-bold text-white/60">Kanta-Häme ja Satakunta</p>
          <p className="mt-1 text-[14px] leading-6 text-white/80">
            {kantaHame.map((city, i, arr) => (
              <span key={city.slug}>
                <Link to={`/maalauspalvelut-${city.slug}/`} className="transition-colors hover:text-accent hover:underline">
                  {city.name}
                </Link>
                {i < arr.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Pintanen Oy · Y-tunnus 3525786-9</p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <Link to="/tietosuoja/" className="transition-colors hover:text-white">
            Tietosuojaseloste
          </Link>
          <button type="button" onClick={openConsentSettings} className="transition-colors hover:text-white">
            Evästeasetukset
          </button>
        </p>
      </div>
      {/* Kuntakarttojen lähdemaininta: Tilastokeskus CC BY 4.0 ja OpenStreetMap ODbL vaativat sen (Eerik 25.10.2026: ei kuvan alle). */}
      <p className="mt-3 text-[12px] text-white/35">
        Kuntakartat: Tilastokeskus, kuntajako 2026 (CC BY 4.0) ja OpenStreetMap-tekijät (ODbL).
      </p>
    </div>
  </footer>
);

export default Footer;
