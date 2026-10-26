import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { KOTITALOUSVAHENNYS } from "@/data/company";
import { fmtEur } from "@/data/prices";
import {
  VAHENNYS_ARTIKKELI,
  VAHENNYS_ERITTELY,
  VAHENNYS_LINK_ARROW,
  VAHENNYS_OMAVASTUU_HUOMAUTUS,
  VAHENNYS_OTSIKKO,
  VAHENNYS_SAANTO,
} from "./vahennysData";

/**
 * Yksi esimerkkilaskelma (Eerik 14.10.2026: "Yksi esimerkki riittää. Urakkahinta 4000, työ 1000"):
 * urakka 4 000 €, josta materiaalit 1 000 € ja työn osuus 3 000 €. Luvut lasketaan säännöstä
 * (VAHENNYS_SAANTO), jotta teoria ja esimerkki eivät eroa toisistaan. Omavastuuta ei vähennetä, sama
 * kaava kuin hintalaskurissa (Eerik 26.10.2026); omavastuu kerrotaan esimerkin alla.
 */
const ESIMERKKI = { urakka: 4000, materiaalit: 1000 } as const;

const { osuus, enimmaismaara } = VAHENNYS_SAANTO;
const tyo = ESIMERKKI.urakka - ESIMERKKI.materiaalit;
const osuusTyosta = Math.round(tyo * osuus);
const vahennys = Math.min(osuusTyosta, enimmaismaara);
const prosentti = Math.round(osuus * 100);

const rivit: { label: string; value: string; muted?: boolean }[] = [
  { label: "Urakkahinta", value: fmtEur(ESIMERKKI.urakka) },
  { label: "Materiaalit", value: fmtEur(ESIMERKKI.materiaalit), muted: true },
  { label: "Työn osuus", value: fmtEur(tyo) },
  { label: `${prosentti} % työstä`, value: fmtEur(osuusTyosta) },
];

/**
 * Vaihtoehto E (?vahennys=e): vasemmalla muutaman lauseen teoria, oikealla yksi esimerkkilaskelma.
 */
const VahennysE = () => (
  <section className="bg-card py-10 md:py-12">
    <div className="section-container max-w-5xl">
      <div className="grid gap-6 rounded-3xl bg-accent-light p-6 md:grid-cols-[1.15fr_1fr] md:gap-10 md:p-8">
        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-extrabold leading-tight text-foreground md:text-2xl">{VAHENNYS_OTSIKKO}.</h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
            {KOTITALOUSVAHENNYS} {VAHENNYS_ERITTELY}
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Vähennys on jokaisen oma: pariskunta voi jakaa sen ja saada yhteensä {fmtEur(2 * enimmaismaara)}.
          </p>
          <Link to={VAHENNYS_ARTIKKELI} className={`${VAHENNYS_LINK_ARROW} mt-1`}>
            Lue lisää
            <span className="sr-only">: kotitalousvähennys katon pinnoituksesta ja talon maalauksesta</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="rounded-2xl bg-card p-5 shadow-sm md:p-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Esimerkki</p>
            <dl className="text-[15px]">
              {rivit.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-4 border-b border-border py-2">
                  <dt className={r.muted ? "text-muted-foreground" : "text-foreground"}>{r.label}</dt>
                  <dd className={`tabular-nums ${r.muted ? "text-muted-foreground" : "font-semibold text-foreground"}`}>{r.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 pt-3">
                <dt className="font-heading font-extrabold text-foreground">Kotitalousvähennys</dt>
                <dd className="font-heading text-xl font-extrabold tabular-nums text-accent-ink md:text-2xl">{fmtEur(vahennys)}</dd>
              </div>
            </dl>
          </div>
          <p className="px-1 text-xs text-muted-foreground">
            Luvut ovat esimerkki; vähennys tehdään verotuksessa. {VAHENNYS_OMAVASTUU_HUOMAUTUS}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default VahennysE;
