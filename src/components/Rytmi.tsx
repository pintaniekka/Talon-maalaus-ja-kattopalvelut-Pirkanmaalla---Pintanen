import { Children, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";

/**
 * Sivun värirytmi (Eerik 28.10.2026, ehdotus 2). Sivulla on kolme lohkotyyppiä:
 * - tausta: valkoinen ja vaaleansininen vuorotellen,
 * - näyttämö: sininen tai tummansininen täysvärinen osio loivilla viistoilla (enintään kolme per sivu),
 * - oma: lohko, jolla on oma taustansa (hero, Lyhyesti, toiminta-aluepalkki, kotitalousvähennys).
 *
 * Komponentti kertoo lajinsa `merkitse(Komponentti, "sininen")`-kutsulla; merkitsemätön lohko on tausta.
 * Lohkon oma <section> käyttää luokkaa `osio`, jonka tausta tulee muuttujasta `--osio-bg`. Tämä kääre
 * laskee taustat lohkojen järjestyksestä, joten sivut, joilta puuttuu lohkoja (ei karttaa, ei arvosteluja),
 * pysyvät sopusoinnussa ilman käsityötä: kaksi samanväristä tai kaksi näyttämöä ei osu peräkkäin.
 * Viiston alle jäävä kolmio saa edellisen ja seuraavan lohkon värin, joten saumaan ei jää eri väriä.
 * - nosto (29.10.2026): leijuva arvostelunosto kahden lohkon rajalla. Se ei kuluta väriä eikä katkaise
 *   näyttämöketjua: kääre saa kaksiosaisen taustan (ylempi puoli edellisen, alempi seuraavan lohkon väri),
 *   joten kortti istuu sauman päällä. Nostoa ei saa panna viiston näyttämön viereen (arvostelut.test.ts).
 */
export type RytmiLaji = "tausta" | "sininen" | "navy" | "oma" | "ohita" | "nosto";

type Merkitty = { rytmi?: RytmiLaji };

/** Merkitsee komponentin lajin. Toimii myös lazy-komponenteille (objekti). */
export const merkitse = <T,>(komponentti: T, laji: RytmiLaji): T => {
  (komponentti as unknown as Merkitty).rytmi = laji;
  return komponentti;
};

const VALKOINEN = "hsl(var(--background))";
const VAALEA = "hsl(var(--accent-light))";
const NAVY = "hsl(var(--navy))";
const SININEN = "hsl(203 100% 43%)";

const onNayttamo = (l: RytmiLaji) => l === "sininen" || l === "navy";

/** Lajit, jotka eivät vaikuta väreihin eivätkä näyttämöketjuun. */
const lapinakyva = (l: RytmiLaji) => l === "ohita" || l === "nosto";

/** Nostojen indeksit, joiden vieressä (ohitettavat välistä) on viisto näyttämö. Testejä ja kehitysvaroitusta varten. */
export const nostotViistonReunalla = (lajit: RytmiLaji[]): number[] => {
  const naapuri = (i: number, suunta: 1 | -1): RytmiLaji | undefined => {
    for (let j = i + suunta; j >= 0 && j < lajit.length; j += suunta) if (!lapinakyva(lajit[j])) return lajit[j];
    return undefined;
  };
  return lajit.flatMap((l, i) => {
    if (l !== "nosto") return [];
    const e = naapuri(i, -1);
    const s = naapuri(i, 1);
    return (e && onNayttamo(e)) || (s && onNayttamo(s)) ? [i] : [];
  });
};

const lajiOf = (el: ReactElement): RytmiLaji => {
  const t = el.type as unknown;
  if (typeof t === "string") {
    if (t !== "section") return "ohita";
    // Sivun oma hero-osio (hintalaskuri, tarjouspyyntö) pitää oman taustansa.
    const cls = String((el.props as { className?: string })?.className ?? "");
    return cls.includes("hero-critical") ? "oma" : "tausta";
  }
  if (t === Helmet) return "ohita";
  return (t as Merkitty | null)?.rytmi ?? "tausta";
};


const Rytmi = ({ children }: { children: ReactNode }) => {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const lajit = items.map(lajiOf);
  // Kaksi näyttämöä peräkkäin: jälkimmäinen muuttuu taustaksi (ohitettavat eivät katkaise ketjua).
  let edellinen: RytmiLaji = "oma";
  for (let i = 0; i < lajit.length; i++) {
    if (lapinakyva(lajit[i])) continue;
    if (onNayttamo(lajit[i]) && onNayttamo(edellinen)) lajit[i] = "tausta";
    edellinen = lajit[i];
  }
  // Taustalohkojen väri vuorotellen; näyttämöt ja omat eivät kuluta vuoroa.
  const varit: (string | null)[] = [];
  let vuoro = 0;
  for (const l of lajit) {
    if (l === "tausta") varit.push(vuoro++ % 2 === 0 ? VALKOINEN : VAALEA);
    else if (l === "oma") varit.push(VALKOINEN);
    else varit.push(null);
  }
  const variKohdassa = (i: number, suunta: 1 | -1): string => {
    for (let j = i + suunta; j >= 0 && j < lajit.length; j += suunta) {
      if (lapinakyva(lajit[j])) continue;
      // Näyttämön väri vain noston naapurina (ei suositeltu paikka): lohkot eivät muuten ole näyttämön vieressä.
      return varit[j] ?? (lajit[j] === "navy" ? NAVY : SININEN);
    }
    return suunta === 1 ? NAVY : VALKOINEN;
  };
  if (import.meta.env.DEV && nostotViistonReunalla(lajit).length > 0) {
    console.warn("Rytmi: arvostelunosto on viiston näyttämön reunalla, siirrä se tavalliseen väliin.");
  }

  return (
    <>
      {items.map((el, i) => {
        const laji = lajit[i];
        if (laji === "ohita" || laji === "oma") return el;
        if (laji === "nosto") {
          return (
            <div key={el.key ?? i} className="rytmi-nosto relative" style={{ background: `linear-gradient(${variKohdassa(i, -1)} 50%, ${variKohdassa(i, 1)} 50%)` }}>
              {el}
            </div>
          );
        }
        if (laji === "tausta") {
          return (
            <div key={el.key ?? i} className="rytmi-tausta" style={{ "--osio-bg": varit[i] } as CSSProperties}>
              {el}
            </div>
          );
        }
        const ennen = variKohdassa(i, -1);
        const jalkeen = variKohdassa(i, 1);
        return (
          <div key={el.key ?? i} className="rytmi-viisto" style={{ background: `linear-gradient(${ennen} 50%, ${jalkeen} 50%)` }}>
            <div className={`viisto ${laji === "sininen" ? "osio-sininen" : "osio-navy"}`} style={{ "--osio-bg": "transparent" } as CSSProperties}>
              {el}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Rytmi;
