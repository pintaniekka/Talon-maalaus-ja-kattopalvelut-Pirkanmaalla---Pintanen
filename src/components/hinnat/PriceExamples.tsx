import { fmtEur, fmtRange, maalausPrices, pinnoitusPrices, type PriceCard } from "@/data/prices";
import { VAHENNYS_SAANTO, hintaVahennyksenJalkeen } from "@/components/vahennys/vahennysData";
import { PriceSectionHeading } from "@/components/hinnat/PriceSections";

/**
 * Hintasivujen esimerkkikohteet koon mukaan (hakutulosanalyysi 26.10.2026, brief 3). Eerik 27.10.2026:
 * hintalaskurin luvut ovat laskurin omia ja hintakortit omia, esimerkeissä käytetään hintakorttien lukuja.
 * Rivit luetaan suoraan prices.ts:n korteista, joten taulukko ei voi erota korteista. Hinta vähennyksen
 * jälkeen lasketaan samalla kaavalla kuin korttien "alk."-luvut (hintaVahennyksenJalkeen).
 * Neliöhinta näytetään pinnoitukselle katon koon mukaan (Eerik 27.10.2026). Ei minimihintaa, ei laskuesimerkkiä.
 *
 * Ulkoasu 28.10.2026 (Eerik: hintaesimerkit uusiksi): hintasivuilla kolme palstaa yhdessä kortissa, jokaisessa
 * koon mukaan kasvava talo- tai kattokuvake, koko, hinta isolla ja pienet rivit (neliöhinta, vähennyksen
 * jälkeen, kesto). Yleisin koko on korostettu vaaleansinisellä. Hintalaskurisivulla sama tieto on taulukkona.
 */
export type ExampleService = "pinnoitus" | "maalaus";

interface Sisalto {
  title: string;
  intro: string;
  kokoOtsikko: string;
  /** Vierivän taulukkokääreen nimi ruudunlukijalle. */
  taulukko: string;
  rivit: readonly PriceCard[];
  /** Neliöhinta korttia kohti (Eerik 27.10.2026), vain pinnoitukselle. */
  neliohinnat?: readonly string[];
  kuuluu: string;
  kaynti: string;
}

const sisalto: Record<ExampleService, Sisalto> = {
  pinnoitus: {
    title: "Tiilikaton pesun ja pinnoituksen hinta: kolme esimerkkiä",
    intro: "Kolme tavallista kattokokoa ja niiden hinta. Katon koko ja jyrkkyys vaikuttavat hintaan eniten.",
    kokoOtsikko: "Katon koko",
    taulukko: "Tiilikaton pinnoituksen hintaesimerkit",
    rivit: pinnoitusPrices.cards,
    neliohinnat: ["18–22 €/m²", "15–18 €/m²", "13–15 €/m²"],
    kuuluu: "Hintaan kuuluu pesu, rikkinäisten tiilien vaihto, kaksi kerrosta maalia ja siivous.",
    kaynti: "Tarkan hinnan saat kirjallisena ilmaisen kuntotarkastuksen jälkeen.",
  },
  maalaus: {
    title: "Talon maalauksen hinta: kolme esimerkkitaloa",
    intro:
      "Kolme tavallista talokokoa ja niiden hinta. Jos vanha maali hilseilee, pohjatöitä on enemmän ja hinta on haarukan yläpäässä.",
    kokoOtsikko: "Talon koko",
    taulukko: "Talon maalauksen hintaesimerkit",
    rivit: maalausPrices.cards,
    kuuluu: "Hintaan kuuluu homepesu, kaavinta, pohjamaali paljaisiin kohtiin, pintamaali pensselillä ja siivous.",
    kaynti: "Tarkan hinnan saat kirjallisena ilmaisen arviokäynnin jälkeen.",
  },
};

/** Sama sääntö kuin KOTITALOUSVAHENNYS-lauseessa (company.ts); omavastuulause kuten laskureissa. */
const VAHENNYS_LAUSE = `Vähennys on ${Math.round(VAHENNYS_SAANTO.osuus * 100)} % työn osuudesta, enintään ${fmtEur(VAHENNYS_SAANTO.enimmaismaara)} vuodessa. Omavastuu on ${fmtEur(VAHENNYS_SAANTO.omavastuu)} vuodessa, jos et ole käyttänyt sitä muihin töihin.`;

const th = "bg-background px-4 py-3 text-sm font-heading font-bold text-foreground";
const td = "px-4 py-3 text-foreground";

/** Hinta vähennyksen jälkeen haarukkana, sama kaava kuin korttien alk.-luvuissa. */
const vahennyksenJalkeen = (card: PriceCard) =>
  fmtRange(hintaVahennyksenJalkeen(card.normalMin), hintaVahennyksenJalkeen(card.normalMax));

/**
 * Koon mukaan kasvava kuvake: pinnoituksella katto levenee (pieni, yleisin, suuri), maalauksella talo
 * saa kerroksia (1, 1,5 ja 2 kerrosta). Pelkkä koriste, ruudunlukijalle piilossa.
 */
const KokoKuvake = ({ service, koko }: { service: ExampleService; koko: 0 | 1 | 2 }) => {
  const w = 96;
  const h = 56;
  if (service === "pinnoitus") {
    // Katon leveys 56 / 72 / 92 px, harja keskellä, piippu oikealla.
    const leveys = [56, 72, 92][koko];
    const x0 = (w - leveys) / 2;
    const x1 = x0 + leveys;
    const harja = 10;
    const rays = 50;
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="mb-4 text-accent-ink">
        <path d={`M${x0} ${rays} L${w / 2} ${harja} L${x1} ${rays}`} fill="hsl(var(--accent-light))" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d={`M${w / 2 + 12} ${harja + 10} v-9 h8 v16`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d={`M${x0 - 4} ${rays} H${x1 + 4}`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  // Talo: 1 kerros, 1,5 kerrosta (ikkuna päädyssä) ja 2 kerrosta. Korkeus 28 / 36 / 44 px.
  const korkeus = [26, 34, 44][koko];
  const leveys = 52;
  const x0 = (w - leveys) / 2;
  const lattia = h - 4;
  const raysY = lattia - korkeus;
  const harjaY = raysY - 16;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="mb-4 text-accent-ink">
      <path
        d={`M${x0} ${lattia} V${raysY} L${w / 2} ${harjaY} L${x0 + leveys} ${raysY} V${lattia} Z`}
        fill="hsl(var(--accent-light))"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Ikkunat: alakerta aina, puolitoistakerroksisessa päätyikkuna, kaksikerroksisessa toinen rivi. */}
      <rect x={x0 + 10} y={lattia - 16} width="9" height="9" fill="currentColor" rx="1" />
      <rect x={x0 + leveys - 19} y={lattia - 16} width="9" height="9" fill="currentColor" rx="1" />
      {koko === 1 && <rect x={w / 2 - 4} y={raysY - 7} width="8" height="8" fill="currentColor" rx="1" />}
      {koko === 2 && (
        <>
          <rect x={x0 + 10} y={lattia - 34} width="9" height="9" fill="currentColor" rx="1" />
          <rect x={x0 + leveys - 19} y={lattia - 34} width="9" height="9" fill="currentColor" rx="1" />
        </>
      )}
      <path d={`M${x0 - 6} ${lattia} H${x0 + leveys + 6}`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

/** Kolme esimerkkiä palstoina yhdessä kortissa (hintasivut). */
export const PriceExampleCards = ({ service }: { service: ExampleService }) => {
  const s = sisalto[service];
  return (
    <div>
      <ol className="kortti grid list-none overflow-hidden p-0 md:grid-cols-3" aria-label={s.taulukko}>
        {s.rivit.map((card, i) => (
          <li
            key={card.size}
            className={`flex flex-col p-6 md:p-7 ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""} ${
              card.featured ? "bg-accent-light" : ""
            }`}
          >
            <KokoKuvake service={service} koko={i as 0 | 1 | 2} />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{card.label}</span>
            {/* Kahden rivin korkeus tietokoneella, jotta hinnat ovat palstoissa samalla tasolla ("1-kerroksinen omakotitalo" rivittyy). */}
            <strong className="mt-1 block font-heading text-xl font-extrabold leading-tight text-foreground md:min-h-[2.6em] md:text-2xl">{card.size}</strong>
            <p className="mt-4 font-heading text-2xl font-extrabold leading-tight text-accent-ink md:text-3xl">
              <span className="sr-only">Hinta yleensä </span>
              <span className="whitespace-nowrap">{fmtRange(card.normalMin, card.normalMax)}</span>
            </p>
            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              {s.neliohinnat && (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">Neliöhinta</dt>
                  <dd className="whitespace-nowrap font-semibold tabular-nums text-foreground">{s.neliohinnat[i]}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Vähennyksen jälkeen</dt>
                <dd className="whitespace-nowrap font-semibold tabular-nums text-foreground">{vahennyksenJalkeen(card)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Kesto</dt>
                <dd className="whitespace-nowrap font-semibold text-foreground">{card.duration}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        Luvut ovat samat kuin hintakorteissamme. {s.kuuluu} {VAHENNYS_LAUSE}
      </p>
    </div>
  );
};

/** Pelkkä taulukko ja huomautus, esim. hintalaskurisivun tekstiosioon. */
export const PriceExampleTable = ({ service }: { service: ExampleService }) => {
  const s = sisalto[service];
  return (
    <div>
      {/* Vierivä kääre on kohdistettava näppäimistöllä (axe scrollable-region-focusable), kuten ArticleKitin Table. */}
      <div
        className="kortti overflow-x-auto"
        role="region"
        aria-label={s.taulukko}
        tabIndex={0}
      >
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className={th}>
                Esimerkki
              </th>
              <th scope="col" className={th}>
                {s.kokoOtsikko}
              </th>
              <th scope="col" className={th}>
                Hinta yleensä
              </th>
              {s.neliohinnat && (
                <th scope="col" className={th}>
                  Neliöhinta
                </th>
              )}
              <th scope="col" className={th}>
                Kotitalousvähennyksen jälkeen
              </th>
            </tr>
          </thead>
          <tbody>
            {s.rivit.map((card, i) => (
              <tr key={card.size} className="border-b border-border last:border-b-0">
                <th scope="row" className={`${td} font-semibold`}>
                  {card.label}
                </th>
                <td className={`${td} whitespace-nowrap tabular-nums`}>{card.size}</td>
                <td className={`${td} whitespace-nowrap font-semibold tabular-nums text-accent-ink`}>
                  {fmtRange(card.normalMin, card.normalMax)}
                </td>
                {s.neliohinnat && <td className={`${td} whitespace-nowrap tabular-nums`}>{s.neliohinnat[i]}</td>}
                <td className={`${td} whitespace-nowrap tabular-nums`}>{vahennyksenJalkeen(card)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Luvut ovat samat kuin hintakorteissamme. {s.kuuluu} {VAHENNYS_LAUSE}
      </p>
    </div>
  );
};

/** Koko osio otsikolla ja ingressillä hintasivuille. */
export const PriceExamplesSection = ({ service }: { service: ExampleService }) => {
  const s = sisalto[service];
  return (
    <section className="section-padding osio">
      <div className="section-container max-w-5xl mx-auto">
        <PriceSectionHeading eyebrow="Esimerkit" title={s.title} intro={`${s.intro} ${s.kaynti}`} />
        <PriceExampleCards service={service} />
      </div>
    </section>
  );
};
