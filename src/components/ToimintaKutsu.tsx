import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { KAYNTI_POLKU, LASKURI_POLKU, type KutsuPalvelu } from "@/data/kutsupolut";

export type { KutsuPalvelu };

/**
 * Kevyt toimintakutsu lohkojen väliin (Eki 29.10.2026): yksi lause ja yksi nappi, joko hintalaskuriin tai
 * ilmaiseen käyntiin. Tekstit vaihtuvat sijainnin mukaan (`n`), ettei sama lause toistu sivulla.
 * Mobiilin alapalkki poistettiin, joten nappi on enintään kahden lohkon välein
 * (`src/test/toimintakutsut.test.ts`). Laajemmat palkit: `KutsuPalkit.tsx`.
 */
export type KutsuNappi = "laskuri" | "kaynti";

type Teksti = { lause: string; nappi: string };

const LASKURI_TEKSTIT: Record<KutsuPalvelu, Teksti[]> = {
  pinnoitus: [
    { lause: "Mitä pinnoitus maksaisi sinun katollesi?", nappi: "Laske katon pinnoituksen hinta" },
    { lause: "Hinta-arvio tiilikaton pinnoitukselle noin minuutissa.", nappi: "Avaa hintalaskuri" },
    { lause: "Katso, paljonko kattosi pinnoitus maksaa.", nappi: "Laske hinta" },
  ],
  maalaus: [
    { lause: "Mitä maalaus maksaisi sinun talollesi?", nappi: "Laske talon maalauksen hinta" },
    { lause: "Hinta-arvio talon ulkomaalaukselle noin minuutissa.", nappi: "Avaa hintalaskuri" },
    { lause: "Katso, paljonko talosi maalaus maksaa.", nappi: "Laske hinta" },
  ],
  yleinen: [
    { lause: "Mitä katon pinnoitus tai talon maalaus maksaisi?", nappi: "Laske hinta" },
    { lause: "Hinta-arvio noin minuutissa, katolle tai seinille.", nappi: "Avaa hintalaskuri" },
  ],
};

const KAYNTI_TEKSTIT: Record<KutsuPalvelu, Teksti[]> = {
  pinnoitus: [
    { lause: "Katsomme kattosi kunnon ilmaiseksi ja annamme kirjallisen tarjouksen.", nappi: "Pyydä ilmainen kuntotarkastus" },
    { lause: "Epävarma katon kunnosta? Kuntotarkastus ei maksa mitään.", nappi: "Varaa kuntotarkastus" },
    { lause: "Kuntotarkastus samalla viikolla, myös iltaisin.", nappi: "Pyydä kuntotarkastus" },
  ],
  maalaus: [
    { lause: "Katsomme julkisivun kunnon ilmaiseksi ja annamme kirjallisen tarjouksen.", nappi: "Pyydä ilmainen arviokäynti" },
    { lause: "Mietitkö, pitäisikö talo jo maalata? Arviokäynti ei maksa mitään.", nappi: "Varaa arviokäynti" },
    { lause: "Arviokäynti samalla viikolla, myös iltaisin.", nappi: "Pyydä arviokäynti" },
  ],
  yleinen: [
    { lause: "Ilmainen arviokäynti ja kirjallinen tarjous kiinteällä hinnalla.", nappi: "Pyydä ilmainen arviokäynti" },
    { lause: "Käynti samalla viikolla, myös iltaisin ja viikonloppuisin.", nappi: "Varaa arviokäynti" },
  ],
};

interface Props {
  palvelu?: KutsuPalvelu;
  nappi?: KutsuNappi;
  /** Tekstivaihtoehdon numero (0, 1, 2…): sama sivu käyttää eri numeroita. */
  n?: number;
  /** Oma lause ja nappi, jos sivun kutsu on eri (taloyhtiöt). */
  teksti?: Teksti;
  /** Oma kohde napille. */
  to?: string;
}

const ToimintaKutsu = ({ palvelu = "yleinen", nappi = "laskuri", n = 0, teksti, to }: Props) => {
  const lista = nappi === "laskuri" ? LASKURI_TEKSTIT[palvelu] : KAYNTI_TEKSTIT[palvelu];
  const t = teksti ?? lista[n % lista.length];
  const kohde = to ?? (nappi === "laskuri" ? LASKURI_POLKU[palvelu] : KAYNTI_POLKU[palvelu]);
  return (
    <section className="osio py-10 md:py-12" aria-label={t.nappi}>
      <div className="section-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:gap-8 md:text-left">
          <p className="text-lg font-semibold text-foreground">{t.lause}</p>
          <Link
            to={kohde}
            className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-paint-yellow px-6 py-3.5 font-heading font-extrabold text-paint-yellow-foreground shadow-lg shadow-paint-yellow/30 transition-all hover:scale-[1.03] hover:bg-paint-yellow-hover sm:w-auto"
          >
            {t.nappi}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToimintaKutsu;
