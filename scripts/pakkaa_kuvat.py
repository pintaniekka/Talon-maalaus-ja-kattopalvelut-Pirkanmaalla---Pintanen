#!/usr/bin/env python3
"""Pakkaa public/images/Pictures-*/ WebP-kuvat uudelleen laatuun 75 (vaihe 5B, 12.10.2026).

Kuva korvataan vain, jos uusi tiedosto on vähintään 10 % pienempi. Kuvan koko (pikselit) ei muutu,
EXIF-tiedot eivät palaa. Aja repon juuresta: python3 scripts/pakkaa_kuvat.py [--laatu 75] [--kuiva]
"""
import argparse
import io
import sys
from pathlib import Path

from PIL import Image

KANSIOT = ["Pictures-400", "Pictures-600", "Pictures-800", "Pictures-1200", "Pictures-1500"]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--laatu", type=int, default=75)
    ap.add_argument("--kuiva", action="store_true", help="näytä säästö, älä kirjoita")
    ap.add_argument("--juuri", default="public/images")
    args = ap.parse_args()

    ennen = jalkeen = 0
    vaihdettu = 0
    for kansio in KANSIOT:
        for f in sorted((Path(args.juuri) / kansio).glob("*.webp")):
            vanha = f.stat().st_size
            with Image.open(f) as im:
                im.load()
                buf = io.BytesIO()
                im.save(buf, "WEBP", quality=args.laatu, method=6)
            uusi = buf.getbuffer().nbytes
            ennen += vanha
            if uusi <= vanha * 0.9:
                jalkeen += uusi
                vaihdettu += 1
                if not args.kuiva:
                    f.write_bytes(buf.getvalue())
            else:
                jalkeen += vanha
    print(f"kuvia {vaihdettu} pakattu, {ennen / 1e6:.1f} MB -> {jalkeen / 1e6:.1f} MB ({'kuiva ajo' if args.kuiva else 'kirjoitettu'})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
