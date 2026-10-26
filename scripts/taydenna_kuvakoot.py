#!/usr/bin/env python3
"""Tekee puuttuvan kuvakoon olemassa olevista suuremmista kuvista ja päivittää poikkeuslistan.

Käyttö:
    python3 scripts/taydenna_kuvakoot.py [--leveys 600] [--kuiva] [--korvaa] [--laatu N]

Kun kuvasarjaan lisätään uusi leveys (26.10.2026: 600 px), alkuperäisiä kuvia ei ole
repossa, joten uusi koko lasketaan suurimmasta olemassa olevasta versiosta: ensin
Pictures-1500, muuten Pictures-1200. EXIF-tietoja ei siirry.

Laatu: repon nykyiset WebP-kuvat on pakattu paljon kovemmin kuin lisaa_kuva.py:n laatu 70
(moni 800 px:n kuva on 10–25 kt). Jos uusi koko pakattaisiin laatuun 70, se olisi isompi
kuin olemassa oleva 800 px:n tiedosto eikä siitä olisi hyötyä. Siksi laatu valitaan
kuvakohtaisesti: tavoitekoko interpoloidaan viereisten kokojen (400 ja 800) tavuista
pikselimäärän mukaan, ja laatu haetaan puolitushaulla väliltä LAATU_MIN–LAATU_MAX.
Jos edes LAATU_MIN ei riitä siihen, että tiedosto on selvästi 800 px:n versiota pienempi
(RAJA_OSUUS), kuvalle ei tehdä uutta kokoa: se kirjataan tiedostoon src/data/kuvakoot.ts,
ja srcset jättää koon pois (src/lib/storage.ts). Skripti kirjoittaa sen tiedoston aina
uudelleen levyn tilanteen mukaan. Valitsimella --laatu voi pakottaa kiinteän laadun.
"""
import argparse
import io
import math
import sys
from pathlib import Path

from PIL import Image

LAHTEET = (1500, 1200)
LAATU_MIN = 15
LAATU_MAX = 85
RAJA_OSUUS = 0.85  # uusi koko saa olla enintään tämän osuuden seuraavaksi suuremman koon tavuista
KAIKKI_LEVEYDET = (400, 600, 800, 1200)
POIKKEUSTIEDOSTO = Path(__file__).resolve().parent.parent / "src" / "data" / "kuvakoot.ts"


def pakkaa(kuva: Image.Image, leveys: int, laatu: int) -> bytes:
    w, h = kuva.size
    puskuri = io.BytesIO()
    kuva.resize((leveys, round(h * leveys / w)), Image.LANCZOS).save(puskuri, "WEBP", quality=laatu, method=6)
    return puskuri.getvalue()


def olemassa_olevat(juuri: Path, nimi: str) -> dict[int, int]:
    koot = {}
    for w in (400, 800, 1200, 1500):
        p = juuri / f"Pictures-{w}" / f"{nimi}-{w}.webp"
        if p.exists():
            koot[w] = p.stat().st_size
    return koot


def tavoitekoko(koot: dict[int, int], leveys: int) -> int | None:
    """Tavoitetavut: interpoloi viereisten kokojen tavuista (log-asteikolla pikselimäärän mukaan)."""
    pienemmat = [w for w in koot if w < leveys]
    suuremmat = [w for w in koot if w > leveys]
    if not pienemmat or not suuremmat:
        return None
    a, b = max(pienemmat), min(suuremmat)
    osuus = (math.log(leveys) - math.log(a)) / (math.log(b) - math.log(a))
    return round(math.exp(math.log(koot[a]) * (1 - osuus) + math.log(koot[b]) * osuus))


def sovita_laatu(kuva: Image.Image, leveys: int, tavoite: int) -> tuple[int, bytes]:
    """Suurin laatu, jolla tiedosto pysyy tavoitteessa (puolitushaku); vähintään LAATU_MIN."""
    paras = (LAATU_MIN, pakkaa(kuva, leveys, LAATU_MIN))
    if len(paras[1]) > tavoite:
        return paras
    ala, yla = LAATU_MIN + 1, LAATU_MAX
    while ala <= yla:
        keski = (ala + yla) // 2
        data = pakkaa(kuva, leveys, keski)
        if len(data) <= tavoite:
            paras = (keski, data)
            ala = keski + 1
        else:
            yla = keski - 1
    return paras


def kirjoita_poikkeukset(juuri: Path, polku: Path) -> dict[int, list[str]]:
    """Kirjoittaa src/data/kuvakoot.ts: perusnimet, joilta jokin srcsetin koko puuttuu levyltä."""
    perusnimet = sorted(p.name[: -len("-1200.webp")] for p in (juuri / "Pictures-1200").glob("*-1200.webp"))
    puuttuvat: dict[int, list[str]] = {}
    for w in KAIKKI_LEVEYDET:
        lista = [n for n in perusnimet if not (juuri / f"Pictures-{w}" / f"{n}-{w}.webp").exists()]
        if lista:
            puuttuvat[w] = lista
    rivit = [
        "/**",
        " * GENEROITU TIEDOSTO: scripts/taydenna_kuvakoot.py kirjoittaa tämän, älä muokkaa käsin.",
        " *",
        " * Kuvat, joilta jokin srcsetin koko puuttuu kansiosta public/images. 600 px:n koko jätetään",
        " * tekemättä, jos sitä ei saa selvästi 800 px:n tiedostoa pienemmäksi (kuva on jo pakattu",
        " * hyvin kovaa): silloin selaimen on parempi ladata 800 px:n versio. src/lib/storage.ts",
        " * jättää puuttuvan koon pois srcsetistä, ja src/test/seo.test.ts tarkistaa listan.",
        " */",
        "export const puuttuvatKuvakoot: Record<number, readonly string[]> = {",
    ]
    for w, lista in puuttuvat.items():
        rivit.append(f"  {w}: [")
        rivit.extend(f'    "{n}",' for n in lista)
        rivit.append("  ],")
    rivit.append("};")
    rivit.append("")
    polku.write_text("\n".join(rivit), encoding="utf-8")
    return puuttuvat


def main() -> int:
    parser = argparse.ArgumentParser(description="Tee puuttuva kuvakoko olemassa olevista kuvista.")
    parser.add_argument("--leveys", type=int, default=600, help="tehtävä leveys (oletus 600)")
    parser.add_argument("--laatu", type=int, help="kiinteä WebP-laatu; oletuksena laatu sovitetaan kuvakohtaisesti")
    parser.add_argument("--kuiva", action="store_true", help="näytä mitä tehtäisiin, älä kirjoita mitään")
    parser.add_argument("--korvaa", action="store_true", help="tee koko uudelleen, vaikka tiedosto on jo olemassa")
    parser.add_argument(
        "--juuri",
        type=Path,
        default=Path(__file__).resolve().parent.parent / "public" / "images",
        help="kuvakansio (oletus public/images)",
    )
    args = parser.parse_args()

    kohdekansio = args.juuri / f"Pictures-{args.leveys}"
    perusnimet = sorted(p.name[: -len("-1200.webp")] for p in (args.juuri / "Pictures-1200").glob("*-1200.webp"))
    if not perusnimet:
        print(f"Kansiossa {args.juuri / 'Pictures-1200'} ei ole kuvia.")
        return 1

    tehty = ohitettu = jatetty = 0
    tavut = 0
    laadut: list[int] = []
    for nimi in perusnimet:
        kohde = kohdekansio / f"{nimi}-{args.leveys}.webp"
        if kohde.exists() and not args.korvaa:
            ohitettu += 1
            continue
        lahde = None
        for w in LAHTEET:
            ehdokas = args.juuri / f"Pictures-{w}" / f"{nimi}-{w}.webp"
            if ehdokas.exists():
                lahde = ehdokas
                break
        if lahde is None:
            print(f"Ei lähdekuvaa: {nimi}")
            return 1
        with Image.open(lahde) as avattu:
            kuva = avattu.convert("RGB")
        if kuva.size[0] < args.leveys:
            print(f"Lähde on liian pieni ({kuva.size[0]} px): {lahde}")
            return 1
        koot = olemassa_olevat(args.juuri, nimi)
        tavoite = tavoitekoko(koot, args.leveys)
        if args.laatu is not None or tavoite is None:
            laatu = args.laatu if args.laatu is not None else 70
            data = pakkaa(kuva, args.leveys, laatu)
        else:
            laatu, data = sovita_laatu(kuva, args.leveys, tavoite)
        korkeus = round(kuva.size[1] * args.leveys / kuva.size[0])
        seuraava = min((w for w in koot if w > args.leveys), default=None)
        if seuraava and args.laatu is None and len(data) > RAJA_OSUUS * koot[seuraava]:
            print(
                f"{nimi}: ei {args.leveys} px:n kokoa, koska laadulla {laatu} se olisi {len(data) // 1024} kt"
                f" ja {seuraava} px:n kuva on {koot[seuraava] // 1024} kt"
            )
            if kohde.exists() and not args.kuiva:
                kohde.unlink()
            jatetty += 1
            continue
        rivi = f"{kohde.relative_to(args.juuri)}  {args.leveys}x{korkeus}  {len(data) // 1024} kt  laatu {laatu}  (lähde {lahde.parent.name}"
        rivi += f", tavoite {tavoite // 1024} kt)" if tavoite else ")"
        print(rivi)
        laadut.append(laatu)
        tehty += 1
        tavut += len(data)
        if not args.kuiva:
            kohde.parent.mkdir(parents=True, exist_ok=True)
            kohde.write_bytes(data)

    if laadut:
        laadut.sort()
        print(f"\nLaatu: pienin {laadut[0]}, mediaani {laadut[len(laadut) // 2]}, suurin {laadut[-1]}.")
    print(f"Valmis: {tehty} kuvaa tehty, {ohitettu} oli jo olemassa, {jatetty} jätetty tekemättä, yhteensä {tavut / 1e6:.2f} Mt.")
    if not args.kuiva:
        puuttuvat = kirjoita_poikkeukset(args.juuri, POIKKEUSTIEDOSTO)
        print(f"Poikkeuslista kirjoitettu: {POIKKEUSTIEDOSTO.name} ({sum(len(v) for v in puuttuvat.values())} merkintää).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
