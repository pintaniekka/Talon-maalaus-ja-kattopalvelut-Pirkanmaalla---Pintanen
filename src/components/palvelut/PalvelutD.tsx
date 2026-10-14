import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { BTN_YELLOW, LINKIT, PAKETTI_VASTAUS, PALVELUT_INTRO, palvelut, tekijat, type PalveluKey } from "./palvelutData";

const kuvaukset: Record<PalveluKey, string> = {
  pinnoitus: "Pesu painepesulla, rikkinäiset tiilet uusiin, maalaus ruiskulla kahteen kertaan.",
  maalaus: "Homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.",
};

interface Rivi {
  key: string;
  title: string;
  tekija: string;
  imageBase: string;
  imageAlt: string;
  kuvaus: string;
  hinta: string;
  takuu: string;
  kesto: string;
  href: string;
  ariaLabel: string;
  /** Kolmas rivi: ääriviivanappi tarjouspyyntöön. */
  outline?: boolean;
}

const [pinnoitus, maalaus] = palvelut;

const rivit: Rivi[] = [
  ...palvelut.map((p) => ({
    key: p.key,
    title: p.title,
    tekija: `${p.tekija.first} tekee`,
    imageBase: p.imageBase,
    imageAlt: p.imageAlt,
    kuvaus: kuvaukset[p.key],
    hinta: p.hinta,
    takuu: p.takuuLyhyt,
    kesto: p.kestoLyhyt,
    href: p.href,
    ariaLabel: `${p.title}: lue lisää`,
  })),
  {
    key: "paketti",
    title: "Katto ja seinät samalla kertaa",
    tekija: `${tekijat.eerik.first} ja ${tekijat.eemil.first}`,
    imageBase: "puutalon-katon-ja-seinien-maalaus-tampere",
    imageAlt: "Puutalo, jonka katto ja seinät on maalattu",
    kuvaus: `Teemme katon ja seinät samaan aikaan. ${PAKETTI_VASTAUS}`,
    hinta: "Pakettihinta",
    takuu: `${pinnoitus.takuuLyhyt} / ${maalaus.takuuLyhyt}`,
    kesto: "Sovitaan",
    href: LINKIT.tarjouspyynto,
    ariaLabel: "Katto ja seinät samalla kertaa: pyydä tarjous",
    outline: true,
  },
];

/** Sarakkeet: Palvelu, Mitä teemme, Hinta yleensä, Takuu, Kesto, nappi. Alle lg rivit ovat pinottuja. */
const SARAKKEET =
  "lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)_160px_80px_100px_56px] xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)_170px_90px_110px_56px]";
const OTSIKOT = ["Palvelu", "Mitä teemme", "Hinta yleensä", "Takuu", "Kesto"];

const Fakta = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground lg:hidden">{label}</dt>
    <dd className="font-heading text-[17px] font-extrabold leading-tight text-foreground xl:text-lg">{value}</dd>
  </div>
);

/**
 * Vaihtoehto D (?palvelut=d): taulukkomainen lista ilman isoja kuvia. Kolmas rivi on pakettihinta,
 * joka vie tarjouspyyntöön. Puhelimella lyhyin.
 */
const PalvelutD = () => (
  <section id="palvelut" className="section-padding bg-card">
    <div className="section-container flex max-w-6xl flex-col gap-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-12">
        <h2 className="heading-style text-3xl leading-[1.1] text-foreground md:text-4xl">Palvelumme</h2>
        <p className="max-w-[520px] text-base leading-relaxed text-muted-foreground md:text-[17px]">{PALVELUT_INTRO}</p>
      </div>

      <div className="flex flex-col">
        <div className={`hidden gap-6 border-b-2 border-foreground pb-3 lg:grid ${SARAKKEET}`} aria-hidden="true">
          {OTSIKOT.map((otsikko) => (
            <span key={otsikko} className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {otsikko}
            </span>
          ))}
          <span />
        </div>

        {rivit.map((rivi) => (
          <article key={rivi.key} className={`relative grid gap-4 border-b border-border py-6 lg:items-center lg:gap-6 lg:py-7 ${SARAKKEET}`}>
            <div className="flex items-center gap-4 pr-14 lg:pr-0">
              <ResponsiveImage
                baseName={rivi.imageBase}
                alt={rivi.imageAlt}
                className="h-[72px] w-24 shrink-0 rounded-[10px] object-cover"
                sizes="96px"
                width={400}
                height={300}
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-xl font-extrabold leading-[1.15] text-foreground lg:text-[22px]">{rivi.title}</h3>
                <span className="text-[13px] text-muted-foreground">{rivi.tekija}</span>
              </div>
            </div>
            <p className="text-[15px] leading-relaxed text-muted-foreground">{rivi.kuvaus}</p>
            <dl className="flex flex-wrap gap-x-6 gap-y-2 lg:contents">
              <Fakta label="Hinta yleensä" value={rivi.hinta} />
              <Fakta label="Takuu" value={rivi.takuu} />
              <Fakta label="Kesto" value={rivi.kesto} />
            </dl>
            <Link
              to={rivi.href}
              aria-label={rivi.ariaLabel}
              className={`absolute right-0 top-6 inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors lg:static ${
                rivi.outline
                  ? "border-2 border-foreground text-foreground hover:bg-secondary"
                  : "bg-paint-yellow text-paint-yellow-foreground hover:bg-paint-yellow-hover"
              }`}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link to={LINKIT.hintalaskuri} className={`${BTN_YELLOW} min-h-[48px] px-6`}>
          Laske hinta
        </Link>
        <Link
          to={LINKIT.tarjouspyynto}
          className="inline-flex min-h-[48px] items-center text-[15px] font-bold text-accent-ink underline underline-offset-4"
        >
          Pyydä ilmainen arviokäynti
        </Link>
      </div>
    </div>
  </section>
);

export default PalvelutD;
