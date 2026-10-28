import { fmtEur, fmtRange, maalausPrices, pinnoitusPrices, type PriceCard } from "@/data/prices";
import { VAHENNYS_SAANTO, hintaVahennyksenJalkeen } from "@/components/vahennys/vahennysData";
import { PriceSectionHeading } from "@/components/hinnat/PriceSections";

/**
 * Hintasivujen esimerkkihinnat (hakutulosanalyysi 26.10.2026, brief 3). Eerik 27.10.2026: hintalaskurin luvut
 * ovat laskurin omia ja hintakortit omia, esimerkeissä käytetään hintakorttien lukuja. Luvut johdetaan
 * prices.ts:n korteista, joten ne eivät voi erota korteista. Ei minimihintaa, ei laskuesimerkkiä.
 *
 * Eerik 28.10.2026: kolme esimerkkiä on jo hintakorteissa, joten hintasivulla on useamman esimerkin ruudukko
 * (malli: kilpailijan vihreät hintaruudut). Pinnoitus: kahdeksan kattokokoa 150–325 m², hinta kunkin koon
 * kohdalla interpoloidaan korttien haarukoiden keskikohdista (165 m² → 3 025 €, 215 → 3 500, 275 → 4 315),
 * joten jokainen luku osuu oman korttinsa haarukkaan. Maalaus: talotyyppi × seinän kunto, luvut korttien
 * alaraja, keskikohta ja yläraja (ei neliöhintoja maalaukselle, Eerik 27.10.2026). Luvut ovat ehdotus
 * esikatseluun: hintoihin liittyvää ei julkaista ilman Eerikin lupaa.
 * Hintalaskurisivun taulukko (PriceExampleTable) on ennallaan.
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
    title: "Tiilikaton pesun ja pinnoituksen hinta katon koon mukaan",
    intro: "Hinta tavallisella jyrkkyydellä ja ehjillä tiilillä. Katon koko ja jyrkkyys vaikuttavat hintaan eniten.",
    kokoOtsikko: "Katon koko",
    taulukko: "Tiilikaton pinnoituksen hintaesimerkit",
    rivit: pinnoitusPrices.cards,
    neliohinnat: ["18–22 €/m²", "15–18 €/m²", "13–15 €/m²"],
    kuuluu: "Hintaan kuuluu pesu, rikkinäisten tiilien vaihto, kaksi kerrosta maalia ja siivous.",
    kaynti: "Tarkan hinnan saat kirjallisena ilmaisen kuntotarkastuksen jälkeen.",
  },
  maalaus: {
    title: "Talon maalauksen hinta talon koon ja seinän kunnon mukaan",
    intro:
      "Hinta riippuu talon koosta ja pohjatöiden määrästä. Jos vanha maali hilseilee, pesua ja kaavintaa on enemmän.",
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

const pyorista10 = (n: number) => Math.round(n / 10) * 10;

/** Kortin koon "150–180 m²" keskikohta neliöinä. */
const kokoKeskikohta = (size: string): number => {
  const [a, b] = size.replace(/\s*m².*$/, "").split("–").map((s) => Number(s));
  return (a + (Number.isFinite(b) ? b : a)) / 2;
};

/** Katon koot ruudukossa (Sorcolor-malli, Eerik 28.10.2026). */
const KATTOKOOT = [150, 175, 200, 225, 250, 275, 300, 325] as const;

/**
 * Katon hinta koon mukaan: korttien haarukoiden keskikohdat katon koon keskikohdissa, väliin lineaarinen
 * interpolointi ja päihin viereisen välin kulmakerroin. Pyöristys kymmeneen euroon, ei alle pienimmän kortin alarajan.
 */
const kattoHintaKoolle = (m2: number): number => {
  const pisteet = pinnoitusPrices.cards.map((c) => ({ m2: kokoKeskikohta(c.size), hinta: (c.normalMin + c.normalMax) / 2 }));
  const vali = (i: number) => (pisteet[i + 1].hinta - pisteet[i].hinta) / (pisteet[i + 1].m2 - pisteet[i].m2);
  let hinta: number;
  if (m2 <= pisteet[0].m2) hinta = pisteet[0].hinta + (m2 - pisteet[0].m2) * vali(0);
  else if (m2 >= pisteet[pisteet.length - 1].m2) {
    const i = pisteet.length - 2;
    hinta = pisteet[i + 1].hinta + (m2 - pisteet[i + 1].m2) * vali(i);
  } else {
    const i = pisteet.findIndex((p, k) => m2 >= p.m2 && m2 <= pisteet[k + 1].m2);
    hinta = pisteet[i].hinta + (m2 - pisteet[i].m2) * vali(i);
  }
  return Math.max(pinnoitusPrices.cards[0].normalMin, pyorista10(hinta));
};

/** Seinän kunto sarakkeina: korttien alaraja, keskikohta ja yläraja. */
const SEINAN_KUNTO = ["Maali pysyy kiinni", "Hilseilee vähän", "Hilseilee paljon"] as const;

const seinaHinta = (card: PriceCard, kunto: number): number =>
  [card.normalMin, pyorista10((card.normalMin + card.normalMax) / 2), card.normalMax][kunto];

const ruutu = "flex flex-col justify-between rounded-2xl bg-navy p-3 text-white sm:p-4 md:p-5";
const ruutuKoko = "text-xs font-semibold text-white/80 sm:text-sm";
const ruutuHinta = "mt-3 whitespace-nowrap font-heading text-xl font-extrabold leading-none text-paint-yellow sm:text-2xl md:text-[1.7rem]";

/** Hintaruudukko hintasivuille: kattokoot tai talotyyppi × seinän kunto. */
export const PriceExampleGrid = ({ service }: { service: ExampleService }) => {
  const s = sisalto[service];
  if (service === "pinnoitus") {
    return (
      <div>
        <ul className="grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 md:gap-4 lg:grid-cols-4" aria-label={s.taulukko}>
          {KATTOKOOT.map((m2) => (
            <li key={m2} className={ruutu}>
              <span className={ruutuKoko}>
                Katto {m2} m²
              </span>
              <span className={ruutuHinta}>
                <span className="sr-only">hinta noin </span>
                {fmtEur(kattoHintaKoolle(m2))}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Hinnat ovat tavallisen jyrkkyyden kattoja, ja ne johdetaan hintakorteistamme. Jyrkkä katto, monta jiiriä tai paljon rikkinäisiä
          tiiliä nostaa hintaa. {s.kuuluu} {VAHENNYS_LAUSE}
        </p>
      </div>
    );
  }
  return (
    <div>
      <ul className="list-none space-y-5 p-0" aria-label={s.taulukko}>
        {s.rivit.map((card) => (
          <li key={card.size}>
            <p className="mb-2">
              <span className="font-heading text-lg font-extrabold leading-tight text-foreground">{card.size}</span>
              <span className="ml-2 text-sm text-muted-foreground">{card.label}</span>
            </p>
            <ul className="grid list-none grid-cols-3 gap-2 p-0 sm:gap-3 md:gap-4">
              {SEINAN_KUNTO.map((k, i) => (
                <li key={k} className={ruutu}>
                  <span className={ruutuKoko}>{k}</span>
                  <span className={ruutuHinta}>{fmtEur(seinaHinta(card, i))}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        Luvut johdetaan hintakorteistamme: hyväkuntoinen seinä on haarukan alapäässä ja paljon hilseilevä yläpäässä. {s.kuuluu}{" "}
        {VAHENNYS_LAUSE}
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
        <PriceExampleGrid service={service} />
      </div>
    </section>
  );
};
