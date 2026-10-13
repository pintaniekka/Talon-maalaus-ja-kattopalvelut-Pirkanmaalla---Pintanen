import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { KOTITALOUSVAHENNYS } from "@/data/company";
import { VAHENNYS_ARTIKKELI, VAHENNYS_ERITTELY, VAHENNYS_LINK_ARROW, VAHENNYS_OTSIKKO } from "./vahennysData";

/**
 * Esimerkkilaskelmat (Eerik 13.10.2026: "esimerkkilaskelma 5000 urakalle, josta 1000 materiaalia").
 * Sääntö on sama kuin artikkelissa kotitalousvahennys-katto-ja-maalaustyot: vähennys = 40 % työn
 * osuudesta − 150 € omavastuu, enintään 2 100 € yhdeltä ihmiseltä vuodessa; pariskunta voi jakaa
 * vähennyksen ja saada yhteensä 4 200 €. Luvut lasketaan tässä, jotta taulukko ja sääntö eivät eroa.
 */
const OSUUS = 0.4;
const OMAVASTUU = 150;
const ENIMMAISMAARA = 2100;

const esimerkit = [
  { urakka: 5000, materiaalit: 1000 },
  { urakka: 4000, materiaalit: 800 },
  { urakka: 8000, materiaalit: 1500 },
] as const;

const eur = (n: number) => `${n.toLocaleString("fi-FI")} €`;

const laske = ({ urakka, materiaalit }: { urakka: number; materiaalit: number }) => {
  const tyo = urakka - materiaalit;
  const ennenKattoa = tyo * OSUUS - OMAVASTUU;
  return { urakka, materiaalit, tyo, vahennys: Math.min(ennenKattoa, ENIMMAISMAARA), katossa: ennenKattoa > ENIMMAISMAARA };
};

const rivit = esimerkit.map(laske);

/**
 * Vaihtoehto E (?vahennys=e): sääntölause ja pieni esimerkkitaulukko (urakka / työn osuus / vähennys).
 */
const VahennysE = () => (
  <section className="bg-card py-10 md:py-12">
    <div className="section-container max-w-5xl">
      <div className="grid gap-6 rounded-3xl bg-accent-light p-6 md:grid-cols-[1.1fr_1fr] md:gap-10 md:p-8">
        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-extrabold leading-tight text-foreground md:text-2xl">{VAHENNYS_OTSIKKO}.</h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
            {KOTITALOUSVAHENNYS} {VAHENNYS_ERITTELY}
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Vähennys on jokaisen oma: pariskunta voi jakaa sen ja saada yhteensä {eur(2 * ENIMMAISMAARA)}.
          </p>
          <Link to={VAHENNYS_ARTIKKELI} className={`${VAHENNYS_LINK_ARROW} mt-1`}>
            Lue lisää
            <span className="sr-only">: kotitalousvähennys katto- ja maalaustöissä</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <table className="w-full overflow-hidden rounded-2xl bg-card text-[15px] shadow-sm">
            <caption className="sr-only">Esimerkkejä kotitalousvähennyksestä</caption>
            <thead>
              <tr className="text-left text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                <th scope="col" className="px-4 py-3 font-bold">Urakka</th>
                <th scope="col" className="px-4 py-3 font-bold">Työn osuus</th>
                <th scope="col" className="px-4 py-3 text-right font-bold">Vähennys</th>
              </tr>
            </thead>
            <tbody>
              {rivit.map((r) => (
                <tr key={r.urakka} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground">
                    {eur(r.urakka)}
                    <span className="block text-xs text-muted-foreground">josta materiaalit {eur(r.materiaalit)}</span>
                  </td>
                  <td className="px-4 py-3 text-foreground">{eur(r.tyo)}</td>
                  <td className="px-4 py-3 text-right font-heading font-extrabold text-accent-ink">
                    {eur(r.vahennys)}
                    {r.katossa && <span className="block text-xs font-sans font-normal text-muted-foreground">enimmäismäärä yhdelle</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-1 text-xs text-muted-foreground">Luvut ovat esimerkkejä; vähennys tehdään verotuksessa.</p>
        </div>
      </div>
    </div>
  </section>
);

export default VahennysE;
