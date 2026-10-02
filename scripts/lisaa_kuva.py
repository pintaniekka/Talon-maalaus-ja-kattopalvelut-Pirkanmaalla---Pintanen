#!/usr/bin/env python3
"""Tekee alkuperäisestä valokuvasta sivuston responsiiviset WebP-koot.

Käyttö:
    python3 scripts/lisaa_kuva.py <alkuperäinen kuva> <perusnimi>

Esimerkki:
    python3 scripts/lisaa_kuva.py ~/GitHub/uudet-kuvat/IMG_1234.HEIC punainen-tiilikatto-lempaala-jalkeen

Tulos: public/images/Pictures-400|800|1200/<perusnimi>-<leveys>.webp ja lisäksi
Pictures-1500, jos alkuperäinen on vähintään 1500 px leveä. Kuvaa käytetään
koodissa perusnimellä (ResponsiveImage, getResponsiveSrcSet).

Sijainti- ja muut metatiedot (EXIF) eivät siirry tuloskuviin. Olemassa olevaa
tiedostoa ei korvata ilman valitsinta --korvaa.
"""
import argparse
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

PAKOLLISET = (400, 800, 1200)
VALINNAINEN = 1500
LAATU = 70


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
    return kuva.convert("RGB")


def main() -> int:
    parser = argparse.ArgumentParser(description="Tee kuvasta sivuston WebP-koot.")
    parser.add_argument("alkuperainen", type=Path)
    parser.add_argument("perusnimi")
    parser.add_argument("--korvaa", action="store_true", help="korvaa samannimiset tiedostot")
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
    olemassa = [p for p in kohteet.values() if p.exists()]
    if olemassa and not args.korvaa:
        print("Samanniminen kuva on jo olemassa, valitse toinen nimi tai käytä valitsinta --korvaa:")
        for p in olemassa:
            print(f"  {p}")
        return 1

    for w, polku in kohteet.items():
        h = round(korkeus * w / leveys)
        polku.parent.mkdir(parents=True, exist_ok=True)
        kuva.resize((w, h), Image.LANCZOS).save(polku, "WEBP", quality=LAATU, method=6)
        print(f"{polku.relative_to(args.kohde)}  {w}x{h}  {polku.stat().st_size // 1024} kt")

    print(f"\nValmis. Perusnimi koodissa: {nimi}")
    if VALINNAINEN not in leveydet:
        print(f"Huom: alkuperäinen on alle {VALINNAINEN} px leveä, joten {VALINNAINEN} px versiota ei tehty.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
