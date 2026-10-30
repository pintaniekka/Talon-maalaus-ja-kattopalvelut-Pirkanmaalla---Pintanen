#!/usr/bin/env python3
"""Tekee alkuperäisestä valokuvasta sivuston responsiiviset WebP-koot.

Käyttö:
    python3 scripts/lisaa_kuva.py <alkuperäinen kuva> <perusnimi>

Esimerkki:
    python3 scripts/lisaa_kuva.py ~/GitHub/uudet-kuvat/IMG_1234.HEIC punainen-tiilikatto-lempaala-jalkeen

Tulos: public/images/Pictures-400|600|800|1200/<perusnimi>-<leveys>.webp ja lisäksi
Pictures-1500, jos alkuperäinen on vähintään 1500 px leveä. Kuvaa käytetään
koodissa perusnimellä (ResponsiveImage, getResponsiveSrcSet).

Valitsimella --alkuperainen tallennetaan lisäksi täysikokoinen alkuperäinen
(pidempi sivu enintään 2400 px, JPEG) kansioon public/images/alkuperaiset/ ja
päivitetään luettelo src/data/alkuperaiset.ts. Tuotannossa nämä kuvat haetaan
Cloudflaren kuvamuunnoksen kautta (src/lib/storage.ts), ja WebP-koot jäävät
esikatseluiden ja testien varaversioiksi (30.10.2026).

Sijainti- ja muut metatiedot (EXIF) eivät siirry tuloskuviin. iPhonen Display P3
-värit muunnetaan sRGB:ksi, muuten värit haalistuvat. Olemassa olevaa tiedostoa
ei korvata ilman valitsinta --korvaa.
"""
import argparse
import io
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageCms, ImageOps

PAKOLLISET = (400, 600, 800, 1200)
VALINNAINEN = 1500
LAATU = 70
ALKUPERAINEN_PITKA_SIVU = 2400
ALKUPERAINEN_LAATU = 88
JUURI = Path(__file__).resolve().parent.parent
LUETTELO = JUURI / "src" / "data" / "alkuperaiset.ts"


def siisti_nimi(nimi: str) -> str:
    nimi = nimi.strip().lower()
    for a, b in (("ä", "a"), ("ö", "o"), ("å", "a")):
        nimi = nimi.replace(a, b)
    nimi = re.sub(r"[^a-z0-9]+", "-", nimi).strip("-")
    return nimi


def avaa(polku: Path) -> Image.Image:
    """Avaa kuvan. iPhonen HEIC muunnetaan ensin macOS:n sips-työkalulla."""
    if polku.suffix.lower() in (".heic", ".heif"):
        tmp = Path(tempfile.mkdtemp()) / "kuva.jpg"
        subprocess.run(
            ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "best", str(polku), "--out", str(tmp)],
            check=True,
            capture_output=True,
        )
        polku = tmp
    kuva = Image.open(polku)
    kuva = ImageOps.exif_transpose(kuva)
    icc = kuva.info.get("icc_profile")
    if icc:
        kuva = ImageCms.profileToProfile(
            kuva, ImageCms.ImageCmsProfile(io.BytesIO(icc)), ImageCms.createProfile("sRGB"), outputMode="RGB"
        )
    return kuva.convert("RGB")


def kirjoita_luettelo(kansio: Path) -> None:
    """Kirjoittaa src/data/alkuperaiset.ts: kuvat, joilla on täysikokoinen alkuperäinen."""
    nimet = sorted(p.stem for p in kansio.glob("*.jpg"))
    rivit = "\n".join(f'  "{n}",' for n in nimet)
    LUETTELO.write_text(
        "/**\n"
        " * GENEROITU TIEDOSTO: scripts/lisaa_kuva.py --alkuperainen kirjoittaa tämän, älä muokkaa käsin.\n"
        " * Kuvat, joiden täysikokoinen alkuperäinen on kansiossa public/images/alkuperaiset/<nimi>.jpg.\n"
        " * Tuotannossa ne haetaan Cloudflaren kuvamuunnoksen kautta (src/lib/storage.ts).\n"
        " */\n"
        f"export const alkuperaiset: readonly string[] = [\n{rivit}\n];\n",
        encoding="utf-8",
        newline="\n",
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Tee kuvasta sivuston WebP-koot.")
    parser.add_argument("alkuperainen", type=Path)
    parser.add_argument("perusnimi")
    parser.add_argument("--korvaa", action="store_true", help="korvaa samannimiset tiedostot")
    parser.add_argument(
        "--alkuperainen",
        dest="tallenna_alkuperainen",
        action="store_true",
        help="tallenna myös täysikokoinen alkuperäinen Cloudflaren kuvamuunnosta varten",
    )
    parser.add_argument("--laatu", type=int, default=LAATU, help=f"WebP-laatu (oletus {LAATU})")
    parser.add_argument(
        "--kohde",
        type=Path,
        default=Path(__file__).resolve().parent.parent / "public" / "images",
        help="kohdekansio (oletus public/images)",
    )
    args = parser.parse_args()

    if not args.alkuperainen.is_file():
        print(f"Kuvaa ei löydy: {args.alkuperainen}")
        return 1
    nimi = siisti_nimi(args.perusnimi)
    if not nimi:
        print("Perusnimi on tyhjä. Käytä kuvaavaa nimeä, esim. punainen-tiilikatto-jalkeen.")
        return 1

    kuva = avaa(args.alkuperainen)
    leveys, korkeus = kuva.size
    if leveys < max(PAKOLLISET):
        print(f"Kuva on liian pieni: {leveys} px leveä, tarvitaan vähintään {max(PAKOLLISET)} px.")
        return 1

    leveydet = list(PAKOLLISET) + ([VALINNAINEN] if leveys >= VALINNAINEN else [])
    kohteet = {w: args.kohde / f"Pictures-{w}" / f"{nimi}-{w}.webp" for w in leveydet}
    alkuperainen = args.kohde / "alkuperaiset" / f"{nimi}.jpg"
    olemassa = [p for p in kohteet.values() if p.exists()]
    if args.tallenna_alkuperainen and alkuperainen.exists():
        olemassa.append(alkuperainen)
    if olemassa and not args.korvaa:
        print("Samanniminen kuva on jo olemassa, valitse toinen nimi tai käytä valitsinta --korvaa:")
        for p in olemassa:
            print(f"  {p}")
        return 1

    for w, polku in kohteet.items():
        h = round(korkeus * w / leveys)
        polku.parent.mkdir(parents=True, exist_ok=True)
        kuva.resize((w, h), Image.LANCZOS).save(polku, "WEBP", quality=args.laatu, method=6)
        print(f"{polku.relative_to(args.kohde)}  {w}x{h}  {polku.stat().st_size // 1024} kt")

    if args.tallenna_alkuperainen:
        k = min(1.0, ALKUPERAINEN_PITKA_SIVU / max(leveys, korkeus))
        koko = (round(leveys * k), round(korkeus * k))
        alkuperainen.parent.mkdir(parents=True, exist_ok=True)
        kuva.resize(koko, Image.LANCZOS).save(
            alkuperainen, "JPEG", quality=ALKUPERAINEN_LAATU, optimize=True, progressive=True
        )
        print(f"{alkuperainen.relative_to(args.kohde)}  {koko[0]}x{koko[1]}  {alkuperainen.stat().st_size // 1024} kt")
        kirjoita_luettelo(alkuperainen.parent)

    print(f"\nValmis. Perusnimi koodissa: {nimi}")
    if VALINNAINEN not in leveydet:
        print(f"Huom: alkuperäinen on alle {VALINNAINEN} px leveä, joten {VALINNAINEN} px versiota ei tehty.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
