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
  VAHENNYS_TYON_OSUUS,
  hintaVahennyksenJalkeen,
} from "./vahennysData";

/**
 * Yksi esimerkkilaskelma (Eerik 14.10.2026: "Yksi esimerkki riittää. Urakkahinta 4000"; Eerik 28.10.2026: rivit
 * hinta, työn osuus, vähennys ja hinta vähennyksen jälkeen). Luvut lasketaan samalla kaavalla kuin hintakorttien
 * "alk."-luvut ja hintalaskurin rivi (hintaVahennyksenJalkeen): työn osuus VAHENNYS_TYON_OSUUS hinnasta, siitä
 * 40 %, enintään 2 100 €. Omavastuuta ei vähennetä (henkilökohtainen, kerran vuodessa), se kerrotaan esimerkin alla.
 * Materiaalien osuutta ei kirjoiteta prosentteina (Eerik 26.10.2026).
 */
const ESIMERKKI_HINTA = 4000;

const { osuus, enimmaismaara } = VAHENNYS_SAANTO;
const tyo = Math.round(ESIMERKKI_HINTA * VAHENNYS_TYON_OSUUS);
const vahennys = Math.min(Math.round(tyo * osuus), enimmaismaara);
const jalkeen = hintaVahennyksenJalkeen(ESIMERKKI_HINTA);
const prosentti = Math.round(osuus * 100);

const rivit: { label: string; value: string }[] = [
  { label: "Hinta", value: fmtEur(ESIMERKKI_HINTA) },
  { label: "Työn osuus", value: fmtEur(tyo) },
  { label: `Kotitalousvähennys ${prosentti} %`, value: `−${fmtEur(vahennys)}` },
];

/** Laskelma: kolme riviä ja iso loppusumma. Kortin sisällä värit ovat aina vaalean pohjan värit (.kortti). */
const Laskelma = () => (
  <div className="kortti p-5 md:p-6">
    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Esimerkki</p>
    <dl className="text-[15px]">
      {rivit.map((r) => (
        <div key={r.label} className="flex items-baseline justify-between gap-4 border-b border-border py-2.5">
          <dt className="text-foreground">{r.label}</dt>
          <dd className="font-semibold tabular-nums text-foreground">{r.value}</dd>
        </div>
      ))}
      <div className="flex items-baseline justify-between gap-4 pt-4">
        <dt className="font-heading font-extrabold text-foreground">Hinta vähennyksen jälkeen</dt>
        <dd className="whitespace-nowrap font-heading text-2xl font-extrabold tabular-nums text-accent-ink md:text-3xl">{fmtEur(jalkeen)}</dd>
      </div>
    </dl>
  </div>
);

/**
 * Vaihtoehto E (?vahennys=e): vasemmalla muutaman lauseen teoria, oikealla laskelma.
 * Tavallisena lohkona (.osio) teksti ja laskelma ovat yhden leveän kortin sisällä; näyttämönä
 * (nayttamo, sininen) teksti on suoraan sinisellä ja laskelma on valkoinen kortti (Eerik 28.10.2026,
 * hintasivut). Tausta tulee sivun rytmistä.
 */
const VahennysE = ({ nayttamo = false }: { nayttamo?: boolean }) => {
  const teksti = (
    <div className="flex flex-col gap-3">
      <span className="lohko-otsake mb-1">Kotitalousvähennys</span>
      <h2 className="font-heading text-2xl font-extrabold leading-tight text-foreground md:text-3xl">{VAHENNYS_OTSIKKO}.</h2>
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
  );
  const huomautus = (
    <p className="px-1 text-xs text-muted-foreground">
      Luvut ovat esimerkki; vähennys tehdään verotuksessa. {VAHENNYS_OMAVASTUU_HUOMAUTUS}
    </p>
  );
  return (
    <section className="section-padding osio">
      <div className="section-container max-w-5xl">
        {nayttamo ? (
          <div className="grid items-center gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
            {teksti}
            <div className="flex flex-col gap-2">
              <Laskelma />
              {huomautus}
            </div>
          </div>
        ) : (
          <div className="kortti grid gap-8 p-6 md:grid-cols-[1.15fr_1fr] md:gap-12 md:p-10">
            {teksti}
            <div className="flex flex-col gap-2">
              <div className="rounded-2xl bg-accent-light [&>.kortti]:bg-transparent [&>.kortti]:shadow-none">
                <Laskelma />
              </div>
              {huomautus}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VahennysE;
