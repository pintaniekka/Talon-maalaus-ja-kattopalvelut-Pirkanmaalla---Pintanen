#!/usr/bin/env python3
"""Vertaa sivuston kuvia kuvarepon alkuperäisiin pelkän perusnimen perusteella.

Käyttö:
    python3 scripts/puuttuvat_alkuperaiset.py [--vain-maara]

Sivuston kuva = public/images/Pictures-1200/<perusnimi>-1200.webp. Alkuperäinen =
~/GitHub/pintanen-kuvat/alkuperaiset/<perusnimi>.<pääte> (polun voi vaihtaa ympäristömuuttujalla
PINTANEN_KUVAT). Tulostaa kolme listaa: sivuston kuvat ilman alkuperäistä, alkuperäiset ilman
sivuston kuvaa (nimi ei täsmää tai kuvaa ei käytetä) ja julkaisemattomat/-kansion tiedostot.
Poistuu koodilla 0 aina: tämä on katsaus, ei testi.
"""
import argparse
import os
import sys
from pathlib import Path

JUURI = Path(__file__).resolve().parent.parent
KUVAREPO = Path(os.environ.get("PINTANEN_KUVAT", Path.home() / "GitHub" / "pintanen-kuvat"))
KUVAPAATTEET = {".jpg", ".jpeg", ".heic", ".heif", ".png", ".tif", ".tiff", ".dng"}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--vain-maara", action="store_true", help="tulosta vain lukumäärät")
    args = parser.parse_args()

    if not KUVAREPO.is_dir():
        print(f"Kuvarepoa ei löydy: {KUVAREPO}. Kloonaa Pintaniekka/pintanen-kuvat polkuun ~/GitHub tai aseta PINTANEN_KUVAT.")
        return 1

    sivusto = {p.name[: -len("-1200.webp")] for p in (JUURI / "public/images/Pictures-1200").glob("*-1200.webp")}
    alkuperaiset = {
        p.stem: p for p in (KUVAREPO / "alkuperaiset").iterdir() if p.suffix.lower() in KUVAPAATTEET
    } if (KUVAREPO / "alkuperaiset").is_dir() else {}
    julkaisemattomat = sorted(
        p.name for p in (KUVAREPO / "julkaisemattomat").iterdir() if p.suffix.lower() in KUVAPAATTEET
    ) if (KUVAREPO / "julkaisemattomat").is_dir() else []

    puuttuu = sorted(sivusto - set(alkuperaiset))
    orvot = sorted(set(alkuperaiset) - sivusto)

    print(f"Sivuston kuvia: {len(sivusto)}, alkuperäisiä: {len(alkuperaiset)}, julkaisemattomia: {len(julkaisemattomat)}")
    print(f"Sivuston kuvia ilman alkuperäistä: {len(puuttuu)}")
    if not args.vain_maara:
        for n in puuttuu:
            print(f"  {n}")
    print(f"Alkuperäisiä ilman sivuston kuvaa: {len(orvot)}")
    if not args.vain_maara:
        for n in orvot:
            print(f"  {alkuperaiset[n].name}")
    print(f"Julkaisemattomia: {len(julkaisemattomat)}")
    if not args.vain_maara:
        for n in julkaisemattomat:
            print(f"  {n}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
