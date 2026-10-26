import { calculateRoofPrice, calculateWallPrice } from "@/lib/priceCalc";
import { fmtEur, fmtRange } from "@/data/prices";
import { VAHENNYS_SAANTO } from "@/components/vahennys/vahennysData";
import { PriceSectionHeading } from "@/components/hinnat/PriceSections";

/**
 * Hintasivujen esimerkkikohteet koon mukaan (hakutulosanalyysi 26.10.2026, brief 3; Eerik: luvut johdetaan
 * hintalaskurista, hintakortteihin ei kosketa). Luvut lasketaan renderöitäessä samoilla kaavoilla kuin laskuri
 * (src/lib/priceCalc.ts), joten taulukko ei voi erota laskurista. Ei neliöhintaa, ei minimihintaa, ei laskuesimerkkiä.
 */
export type ExampleService = "pinnoitus" | "maalaus";

/** 2 847 -> 2 850 */
const round10 = (n: number) => Math.round(n / 10) * 10;

/**
 * Hinta kotitalousvähennyksen jälkeen: sama kaava kuin PR #129:n hintaVahennyksenJalkeen (vahennysData.ts):
 * työn osuus 80 % hinnasta, siitä 40 %, enintään 2 100 €, tulos pyöristettynä kymmeneen euroon. Omavastuuta ei
 * vähennetä, se kerrotaan taulukon alla. Kun #129 on mainissa, tämän voi korvata tuonnilla.
 */
const TYON_OSUUS = 0.8;
const vahennyksenJalkeen = (hinta: number): number => {
  const vahennys = Math.min(Math.round(hinta * TYON_OSUUS * VAHENNYS_SAANTO.osuus), VAHENNYS_SAANTO.enimmaismaara);
  return round10(hinta - vahennys);
};

interface Rivi {
  nimi: string;
  koko: string;
  hinta: { min: number; max: number };
}

/** Kolme esimerkkikattoa: loiva 180 m², tavallinen 200 m², jyrkkä 250 m² (150 m² loiva antaisi vain alarajan). */
const pinnoitusRivit: Rivi[] = [
  { nimi: "Loiva katto", koko: "180 m²", hinta: calculateRoofPrice(180, "loiva") },
  { nimi: "Tavallinen harjakatto", koko: "200 m²", hinta: calculateRoofPrice(200, "normaali") },
  { nimi: "Jyrkkä katto", koko: "250 m²", hinta: calculateRoofPrice(250, "jyrkka") },
];

/** Kolme esimerkkitaloa pohjapinta-alan ja kerrosten mukaan, vanha maali ehjä (hilseily nostaa hintaa). */
const maalausRivit: Rivi[] = [
  { nimi: "1-kerroksinen talo", koko: "100 m²", hinta: calculateWallPrice(100, "1", "none") },
  { nimi: "1,5-kerroksinen talo", koko: "120 m²", hinta: calculateWallPrice(120, "1.5", "none") },
  { nimi: "2-kerroksinen talo", koko: "160 m²", hinta: calculateWallPrice(160, "2", "none") },
];

interface Sisalto {
  title: string;
  intro: string;
  kokoOtsikko: string;
  rivit: Rivi[];
  kuuluu: string;
  kaynti: string;
}

const sisalto: Record<ExampleService, Sisalto> = {
  pinnoitus: {
    title: "Tiilikaton pesun ja pinnoituksen hinta: kolme esimerkkiä",
    intro: "Laskimme kolme esimerkkikattoa hintalaskurillamme. Katon koko ja jyrkkyys vaikuttavat hintaan eniten.",
    kokoOtsikko: "Katon koko",
    rivit: pinnoitusRivit,
    kuuluu: "Hintaan kuuluu pesu, rikkinäisten tiilien vaihto, kaksi kerrosta maalia ja siivous.",
    kaynti: "Tarkan hinnan saat kirjallisena ilmaisen kuntotarkastuksen jälkeen.",
  },
  maalaus: {
    title: "Talon maalauksen hinta: kolme esimerkkitaloa",
    intro:
      "Laskimme kolme esimerkkitaloa hintalaskurillamme. Esimerkeissä vanha maali on ehjä. Jos maali hilseilee, pohjatöitä on enemmän ja hinta nousee.",
    kokoOtsikko: "Pohjapinta-ala",
    rivit: maalausRivit,
    kuuluu: "Hintaan kuuluu homepesu, kaavinta, pohjamaali paljaisiin kohtiin, pintamaali pensselillä ja siivous.",
    kaynti: "Tarkan hinnan saat kirjallisena ilmaisen arviokäynnin jälkeen.",
  },
};

/** Sama sääntö kuin KOTITALOUSVAHENNYS-lauseessa (company.ts); omavastuulause kuten PR #129:n laskureissa. */
const VAHENNYS_LAUSE = `Vähennys on ${Math.round(VAHENNYS_SAANTO.osuus * 100)} % työn osuudesta, enintään ${fmtEur(VAHENNYS_SAANTO.enimmaismaara)} vuodessa. Omavastuu on ${fmtEur(VAHENNYS_SAANTO.omavastuu)} vuodessa, jos et ole käyttänyt sitä muihin töihin.`;

const th = "bg-background px-4 py-3 text-sm font-heading font-bold text-foreground";
const td = "px-4 py-3 text-foreground";

/** Pelkkä taulukko ja huomautus, esim. hintalaskurisivun tekstiosioon. */
export const PriceExampleTable = ({ service }: { service: ExampleService }) => {
  const s = sisalto[service];
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
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
                Laskurin arvio
              </th>
              <th scope="col" className={th}>
                Kotitalousvähennyksen jälkeen
              </th>
            </tr>
          </thead>
          <tbody>
            {s.rivit.map((r) => {
              const min = round10(r.hinta.min);
              const max = round10(r.hinta.max);
              return (
                <tr key={r.nimi} className="border-b border-border last:border-b-0">
                  <th scope="row" className={`${td} font-semibold`}>
                    {r.nimi}
                  </th>
                  <td className={`${td} whitespace-nowrap tabular-nums`}>{r.koko}</td>
                  <td className={`${td} whitespace-nowrap font-semibold tabular-nums text-accent-ink`}>{fmtRange(min, max)}</td>
                  <td className={`${td} whitespace-nowrap tabular-nums`}>{fmtRange(vahennyksenJalkeen(min), vahennyksenJalkeen(max))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Luvut ovat hintalaskurin arvioita, pyöristettynä kymmeneen euroon. {s.kuuluu} {VAHENNYS_LAUSE}
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
