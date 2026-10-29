import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Kevyt toimintakutsu lohkojen väliin (Eki 29.10.2026): mobiilin alapalkki poistettiin, joten etusivulla sekä
 * pinnoitus- ja maalaussivuilla on nappi hintalaskuriin tai ilmaiseen käyntiin vähintään joka toisen lohkon
 * jälkeen. Tavallinen taustalohko, ei näyttämö. `src/test/toimintakutsut.test.ts` vahtii välit.
 */
export type KutsuPalvelu = "pinnoitus" | "maalaus" | "yleinen";

const KAYNTI: Record<KutsuPalvelu, { to: string; label: string }> = {
  pinnoitus: { to: "/ilmainen-katon-kuntotarkastus/", label: "Pyydä ilmainen kuntotarkastus" },
  maalaus: { to: "/ilmainen-julkisivun-kuntoarvio/", label: "Pyydä ilmainen arviokäynti" },
  yleinen: { to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" },
};

const LASKURI: Record<KutsuPalvelu, string> = {
  pinnoitus: "/hintalaskuri/?palvelu=pinnoitus",
  maalaus: "/hintalaskuri/?palvelu=maalaus",
  yleinen: "/hintalaskuri/",
};

interface Props {
  palvelu?: KutsuPalvelu;
  /** Lyhyt lause nappien yläpuolella. */
  teksti?: string;
  /** Käyntinapin kohde ja teksti, jos sivun oma kutsu on eri (kuntotarkastussivu, taloyhtiöt). */
  kaynti?: { to: string; label: string };
  /** false piilottaa laskurinapin (taloyhtiöt: laskuri on omakotitaloille). */
  laskuri?: boolean;
}

const OLETUSTEKSTI: Record<KutsuPalvelu, string> = {
  pinnoitus: "Haluatko tietää, mitä oman kattosi pinnoitus maksaisi?",
  maalaus: "Haluatko tietää, mitä oman talosi maalaus maksaisi?",
  yleinen: "Haluatko tietää, mitä työ maksaisi sinun talossasi?",
};

const ToimintaKutsu = ({ palvelu = "yleinen", teksti, kaynti = KAYNTI[palvelu], laskuri = true }: Props) => {
  return (
    <section className="osio py-10 md:py-12" aria-label="Laske hinta tai pyydä käynti">
      <div className="section-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-lg font-semibold text-foreground md:max-w-xs">{teksti ?? OLETUSTEKSTI[palvelu]}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {laskuri && (
            <Link
              to={LASKURI[palvelu]}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-paint-yellow px-6 py-3.5 font-heading font-extrabold text-paint-yellow-foreground shadow-lg shadow-paint-yellow/30 transition-all hover:scale-[1.03] hover:bg-paint-yellow-hover"
            >
              Laske hinta
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            )}
            <Link
              to={kaynti.to}
              className="inline-flex items-center justify-center rounded-2xl border-2 border-accent bg-card px-6 py-3.5 font-heading font-extrabold text-accent-ink transition-all hover:bg-accent-strong hover:text-accent-foreground"
            >
              {kaynti.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToimintaKutsu;
