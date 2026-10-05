/**
 * Yrityksen yhteiset faktat yhdessä paikassa. Sama luku ja sama lause joka sivulla
 * (auditoinnin korjaukset 3, 8 ja 9). Ei komponentti-importteja: luetaan myös build-aikana.
 */

/** Pintanen Oy:n Google-yritysprofiili (arvostelut). */
export const GOOGLE_PROFILE_URL = "https://share.google/tvbQXxG02Gp0nXOJQ";

/** Sivuston sisällön viimeisin tarkistuspäivä (näkyvä "Päivitetty"-rivi ja sitemapin lastmod). */
export const SITE_UPDATED = "2026-10-05";

/** "2026-10-05" -> "5.10.2026" */
export const paivaFi = (iso: string): string => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}.${m}.${y}`;
};

/** Yksi lukusarja koko sivustolle. Vanhat "yli 200 urakkaa" -luvut poistettu, koska ne eivät täsmänneet palvelusivujen kanssa. */
export const LUVUT = {
  pinnoitetutKatot: "yli 100",
  maalatutTalot: "yli 60",
  kokemusVuotta: "yli 5",
  googleArvio: "5,0 / 5",
} as const;

export const TAKUU = { pinnoitus: "5 vuotta", maalaus: "2 vuotta" } as const;

/** Toiminta-alue samassa muodossa joka sivulla (P16). */
export const TOIMINTA_ALUE = "Pirkanmaalla ja lähikunnissa noin tunnin säteellä Tampereelta";

/** Vastausaikalupaus (S34). */
export const VASTAUSLUPAUS = "Vastaamme viimeistään seuraavana arkipäivänä.";

/** Kotitalousvähennys yhdellä lauseella kaikkialle (korjaus 9). */
export const KOTITALOUSVAHENNYS =
  "Vuosina 2026 ja 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 € vuodessa. Omavastuu on 150 €.";

/** Maalaus katolla: ruisku kahteen kertaan, ahtaat paikat telalla tai käsin. */
export const KATON_MAALAUS_LAUSE =
  "Maalaamme katon ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali. Ahtaat paikat, joihin ruisku ei yllä, maalaamme telalla tai käsin.";

export const YHTEYSTIEDOT = {
  eerik: { name: "Eerik Pitkänen", first: "Eerik", role: "Kattomaalari", phone: "040 964 0066", phoneHref: "tel:+358409640066", email: "eerik@pintanen.fi", whatsapp: "https://wa.me/358409640066" },
  eemil: { name: "Eemil Pitkänen", first: "Eemil", role: "Seinämaalari", phone: "040 164 2233", phoneHref: "tel:+358401642233", email: "eemil@pintanen.fi", whatsapp: "https://wa.me/358401642233" },
} as const;
