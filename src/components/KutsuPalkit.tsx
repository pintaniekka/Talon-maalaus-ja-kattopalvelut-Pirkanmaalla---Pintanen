import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { YHTEYSTIEDOT } from "@/data/company";
import { KAYNTI_POLKU, LASKURI_POLKU, type KutsuPalvelu } from "@/data/kutsupolut";

/**
 * Kaksi laajempaa kutsupalkkia (Eki 29.10.2026, malli LummeColta mutta kapeampana ja meidän väreillä):
 * `KayntiPalkki` (navy: ilmainen kuntotarkastus tai arviokäynti) ja `LaskuriPalkki` (sininen: hintalaskuri).
 * Kumpaakin on yksi per sivu; muut välit ovat kevyitä `ToimintaKutsu`-lohkoja. Tavallisia taustalohkoja.
 * Laskurista ei sanota mitään yhteystiedoista (laskuri kysyy nimen ja numeron, Eki: ei mainita).
 */

const Merkki = ({ tumma }: { tumma?: boolean }) => (
  <span
    className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full ${tumma ? "bg-paint-yellow text-paint-yellow-foreground" : "bg-accent/15 text-accent-ink"}`}
    aria-hidden="true"
  >
    <Check className="h-3.5 w-3.5" strokeWidth={3} />
  </span>
);

// Eki 29.10.2026: napit vievät tarjouspyyntösivulle, ei linkkiä kuntotarkastussivulle.
const KAYNTI: Record<KutsuPalvelu, { eyebrow: string; otsikko: string; teksti: string; nappi: string }> = {
  pinnoitus: {
    eyebrow: "Ilmainen kuntotarkastus",
    otsikko: "Pyydä katon kuntotarkastus",
    teksti: "Tulemme katsomaan kattosi. Tarkistamme tiilet, saumat, läpiviennit ja aluskatteen ja annamme kirjallisen tarjouksen kiinteällä hinnalla.",
    nappi: "Pyydä ilmainen kuntotarkastus",
  },
  maalaus: {
    eyebrow: "Ilmainen arviokäynti",
    otsikko: "Pyydä julkisivun arviokäynti",
    teksti: "Tulemme katsomaan talosi. Katsomme julkisivun kunnon paikan päällä ja annamme kirjallisen tarjouksen kiinteällä hinnalla.",
    nappi: "Pyydä ilmainen arviokäynti",
  },
  yleinen: {
    eyebrow: "Ilmainen arviokäynti",
    otsikko: "Pyydä ilmainen arviokäynti",
    teksti: "Tulemme katsomaan katon tai talon kunnon paikan päällä ja annamme kirjallisen tarjouksen kiinteällä hinnalla.",
    nappi: "Pyydä ilmainen arviokäynti",
  },
};

// Eki 29.10.2026: "samalla viikolla" riittää, iltoja ja viikonloppuja ei mainita (vain UKK:ssa "mahdollisesti jopa").
const KAYNTI_EDUT = ["Ei maksa mitään eikä sido mihinkään", "Käynti yleensä samalla viikolla", "Kirjallinen tarjous kiinteällä hinnalla"];

interface KayntiProps {
  palvelu?: KutsuPalvelu;
  /** Sivun oma kohde ja nappi (taloyhtiöt). */
  nappi?: { to: string; label: string };
  otsikko?: string;
  teksti?: string;
}

export const KayntiPalkki = ({ palvelu = "yleinen", nappi, otsikko, teksti }: KayntiProps) => {
  const k = KAYNTI[palvelu];
  const to = nappi?.to ?? KAYNTI_POLKU[palvelu];
  // Maalaussivuilla WhatsApp menee Eemilille (seinämaalari), muuten Eerikille (Eki 29.10.2026).
  const whatsapp = palvelu === "maalaus" ? YHTEYSTIEDOT.eemil.whatsapp : YHTEYSTIEDOT.eerik.whatsapp;
  return (
    <section className="osio py-10 md:py-14" aria-labelledby="kaynti-palkki-otsikko">
      <div className="section-container">
        <div className="mx-auto max-w-3xl rounded-3xl bg-navy p-6 text-white shadow-xl md:p-9">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-paint-yellow">{k.eyebrow}</p>
          <h2 id="kaynti-palkki-otsikko" className="font-heading text-2xl font-extrabold md:text-3xl">
            {otsikko ?? k.otsikko}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/85 md:text-lg">{teksti ?? k.teksti}</p>
          <ul className="mt-5 space-y-2.5">
            {KAYNTI_EDUT.map((e) => (
              <li key={e} className="flex items-start gap-3 font-semibold">
                <Merkki tumma />
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to={to}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-paint-yellow px-6 py-3.5 font-heading font-extrabold text-paint-yellow-foreground shadow-lg shadow-black/20 transition-all hover:scale-[1.02] hover:bg-paint-yellow-hover"
            >
              {nappi?.label ?? k.nappi}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/30 px-6 py-3.5 font-heading font-extrabold text-white transition-colors hover:bg-white/10"
            >
              <WhatsAppIcon className="h-5 w-5 text-green-400" />
              Kysy WhatsAppissa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const LASKURI: Record<KutsuPalvelu, { otsikko: string; edut: string[] }> = {
  pinnoitus: { otsikko: "Laske kattosi pinnoituksen hinta minuutissa", edut: ["Viisi kysymystä katostasi", "Hinta-arvio heti", "Ilmainen ja nopea"] },
  maalaus: { otsikko: "Laske talosi maalauksen hinta minuutissa", edut: ["Neljä kysymystä talostasi", "Hinta-arvio heti", "Ilmainen ja nopea"] },
  yleinen: { otsikko: "Laske hinta alle minuutissa", edut: ["Muutama kysymys katosta tai talosta", "Hinta-arvio heti", "Ilmainen ja nopea"] },
};

export const LaskuriPalkki = ({ palvelu = "yleinen" }: { palvelu?: KutsuPalvelu }) => {
  const l = LASKURI[palvelu];
  return (
    <section className="osio py-10 md:py-14" aria-labelledby="laskuri-palkki-otsikko">
      <div className="section-container">
        <div className="osio-sininen mx-auto max-w-2xl rounded-3xl p-6 text-white shadow-xl md:p-8">
          <h2 id="laskuri-palkki-otsikko" className="font-heading text-2xl font-extrabold md:text-3xl">
            {l.otsikko}
          </h2>
          <ul className="mt-5 space-y-2.5">
            {l.edut.map((e) => (
              <li key={e} className="flex items-start gap-3 font-semibold">
                <Merkki tumma />
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <Link
            to={LASKURI_POLKU[palvelu]}
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-paint-yellow px-6 py-3.5 font-heading font-extrabold text-paint-yellow-foreground shadow-lg shadow-black/15 transition-all hover:scale-[1.02] hover:bg-paint-yellow-hover"
          >
            Kokeile hintalaskuria
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
