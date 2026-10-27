import { fmtEur, fmtRange, maalausPrices, pinnoitusPrices, type PriceCard } from "@/data/prices";
import { VAHENNYS_SAANTO, hintaVahennyksenJalkeen } from "@/components/vahennys/vahennysData";
import { PriceSectionHeading } from "@/components/hinnat/PriceSections";

/**
 * Hintasivujen esimerkkikohteet koon mukaan (hakutulosanalyysi 26.10.2026, brief 3). Eerik 27.10.2026:
 * hintalaskurin luvut ovat laskurin omia ja hintakortit omia, esimerkeissä käytetään hintakorttien lukuja.
 * Rivit luetaan suoraan prices.ts:n korteista, joten taulukko ei voi erota korteista. Hinta vähennyksen
 * jälkeen lasketaan samalla kaavalla kuin korttien "alk."-luvut (hintaVahennyksenJalkeen).
 * Neliöhinta näytetään pinnoitukselle katon koon mukaan (Eerik 27.10.2026). Ei minimihintaa, ei laskuesimerkkiä.
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

/** Pelkkä taulukko ja huomautus, esim. hintalaskurisivun tekstiosioon. */
export const PriceExampleTable = ({ service }: { service: ExampleService }) => {
  const s = sisalto[service];
  return (
    <div>
      {/* Vierivä kääre on kohdistettava näppäimistöllä (axe scrollable-region-focusable), kuten ArticleKitin Table. */}
      <div
        className="overflow-x-auto rounded-2xl border border-border bg-card"
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
                <td className={`${td} whitespace-nowrap tabular-nums`}>
                  {fmtRange(hintaVahennyksenJalkeen(card.normalMin), hintaVahennyksenJalkeen(card.normalMax))}
                </td>
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
    <section className="section-padding bg-background">
      <div className="section-container max-w-4xl mx-auto">
        <PriceSectionHeading title={s.title} intro={`${s.intro} ${s.kaynti}`} />
        <PriceExampleTable service={service} />
      </div>
    </section>
  );
};
