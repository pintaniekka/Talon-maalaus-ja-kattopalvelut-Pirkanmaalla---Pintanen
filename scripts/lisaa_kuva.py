#!/usr/bin/env python3
"""Tekee alkuperäisestä valokuvasta sivuston responsiiviset WebP- ja AVIF-koot.

Käyttö:
    python3 scripts/lisaa_kuva.py <alkuperäinen kuva> <perusnimi> [--avif] [--alkuperainen]

Esimerkki:
    python3 scripts/lisaa_kuva.py ~/GitHub/uudet-kuvat/IMG_1234.HEIC tiilikaton-pinnoitus-lempaala-punainen-tiilikatto-jalkeen --avif --alkuperainen

Tulos: public/images/Pictures-400|600|800|1200/<perusnimi>-<leveys>.webp ja lisäksi
Pictures-1500, jos alkuperäinen on vähintään 1500 px leveä. Kuvaa käytetään
koodissa perusnimellä (ResponsiveImage, getResponsiveSrcSet).

--avif tekee samoihin kansioihin myös <perusnimi>-<leveys>.avif (laatu 56, hidas ja tarkka
libaom-koodaus) ja päivittää luettelon src/data/avifkuvat.ts. Selain valitsee AVIF:n
<picture>-elementin kautta (AvifKuva), ja WebP jää varamuodoksi. Laatu 56 on mitattu
laatu–koko-käyrän taitekohta (30.10.2026, docs/kuvien-uudelleennimeys-2026-10-30.md).
--vain-avif tekee AVIF-koot olemassa olevalle kuvalle koskematta WebP-tiedostoihin.

--alkuperainen kopioi lähdekuvan sellaisenaan (täysikokoisena, alkuperäisessä muodossa) kuvarepoon
~/GitHub/pintanen-kuvat/alkuperaiset/<perusnimi>.<pääte> (yksityinen GitHub-repo Pintaniekka/pintanen-kuvat;
polun voi vaihtaa ympäristömuuttujalla PINTANEN_KUVAT). Sama perusnimi kuin sivustolla, joten alkuperäinen
löytyy nimellä, kun kuva pitää optimoida uudelleen tai vaihtaa. Jos lähde on kuvarepon julkaisemattomat/-kansiossa,
se siirretään. Commit ja push kuvarepossa tehdään erikseen (skripti muistuttaa).

Sijainti- ja muut metatiedot (EXIF) eivät siirry tuloskuviin. iPhonen Display P3
-värit muunnetaan sRGB:ksi, muuten värit haalistuvat. Olemassa olevaa tiedostoa
ei korvata ilman valitsinta --korvaa.
"""
import argparse
import io
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageCms, ImageOps

PAKOLLISET = (400, 600, 800, 1200)
VALINNAINEN = 1500
LAATU = 70
AVIF_LAATU = 56
AVIF_NOPEUS = 2
JUURI = Path(__file__).resolve().parent.parent
KUVAREPO = Path(os.environ.get("PINTANEN_KUVAT", Path.home() / "GitHub" / "pintanen-kuvat"))
ALKUPERAISET = KUVAREPO / "alkuperaiset"
JULKAISEMATTOMAT = KUVAREPO / "julkaisemattomat"
AVIF_LUETTELO = JUURI / "src" / "data" / "avifkuvat.ts"


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


def kirjoita_avif_luettelo(kohde: Path) -> None:
    """Kirjoittaa src/data/avifkuvat.ts: kuvat, joilla on AVIF-versio 1200 px:n kansiossa."""
    nimet = sorted(p.name[: -len("-1200.avif")] for p in (kohde / "Pictures-1200").glob("*-1200.avif"))
    rivit = "\n".join(f'  "{n}",' for n in nimet)
    AVIF_LUETTELO.write_text(
        "/**\n"
        " * GENEROITU TIEDOSTO: scripts/lisaa_kuva.py --avif kirjoittaa tämän, älä muokkaa käsin.\n"
        " * Kuvat, joilla on AVIF-versiot (<perusnimi>-<leveys>.avif samoissa kansioissa kuin WebP).\n"
        " * src/lib/storage.ts ja AvifKuva lisäävät niille <picture>-elementin AVIF-lähteen.\n"
        " */\n"
        f"export const avifKuvat: readonly string[] = [\n{rivit}\n];\n",
        encoding="utf-8",
        newline="\n",
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Tee kuvasta sivuston WebP- ja AVIF-koot.")
    parser.add_argument("alkuperainen", type=Path)
    parser.add_argument("perusnimi")
    parser.add_argument("--korvaa", action="store_true", help="korvaa samannimiset tiedostot")
    parser.add_argument("--avif", action="store_true", help="tee myös AVIF-koot")
    parser.add_argument("--vain-avif", action="store_true", help="tee vain AVIF-koot, älä koske WebP-tiedostoihin")
    parser.add_argument(
        "--alkuperainen",
        dest="tallenna_alkuperainen",
        action="store_true",
        help="kopioi täysikokoinen lähdekuva kuvarepoon (~/GitHub/pintanen-kuvat/alkuperaiset/)",
    )
    parser.add_argument("--laatu", type=int, default=LAATU, help=f"WebP-laatu (oletus {LAATU})")
    parser.add_argument(
        "--kohde",
        type=Path,
        default=JUURI / "public" / "images",
        help="kohdekansio (oletus public/images)",
    )
    args = parser.parse_args()
    tee_webp = not args.vain_avif
    tee_avif = args.avif or args.vain_avif

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
    kohteet = []
    if tee_webp:
        kohteet += [(w, args.kohde / f"Pictures-{w}" / f"{nimi}-{w}.webp") for w in leveydet]
    if tee_avif:
        kohteet += [(w, args.kohde / f"Pictures-{w}" / f"{nimi}-{w}.avif") for w in leveydet]
    paate = args.alkuperainen.suffix.lower().replace(".jpeg", ".jpg").replace(".heif", ".heic")
    alkuperainen = ALKUPERAISET / f"{nimi}{paate}"
    olemassa = [p for _, p in kohteet if p.exists()]
    if args.tallenna_alkuperainen:
        if not KUVAREPO.is_dir():
            print(f"Kuvarepoa ei löydy: {KUVAREPO}. Kloonaa Pintaniekka/pintanen-kuvat tai aseta PINTANEN_KUVAT.")
            return 1
        olemassa += [p for p in ALKUPERAISET.glob(f"{nimi}.*") if p.resolve() != args.alkuperainen.resolve()]
    if olemassa and not args.korvaa:
        print("Samanniminen kuva on jo olemassa, valitse toinen nimi tai käytä valitsinta --korvaa:")
        for p in olemassa:
            print(f"  {p}")
        return 1

    for w, polku in kohteet:
        h = round(korkeus * w / leveys)
        polku.parent.mkdir(parents=True, exist_ok=True)
        pienennetty = kuva.resize((w, h), Image.LANCZOS)
        if polku.suffix == ".avif":
            pienennetty.save(polku, "AVIF", quality=AVIF_LAATU, speed=AVIF_NOPEUS, codec="aom")
        else:
            pienennetty.save(polku, "WEBP", quality=args.laatu, method=6)
        print(f"{polku.relative_to(args.kohde)}  {w}x{h}  {polku.stat().st_size // 1024} kt")
    if tee_avif:
        kirjoita_avif_luettelo(args.kohde)

    if args.tallenna_alkuperainen:
        lahde = args.alkuperainen.resolve()
        alkuperainen.parent.mkdir(parents=True, exist_ok=True)
        if lahde != alkuperainen.resolve():
            for vanha in ALKUPERAISET.glob(f"{nimi}.*"):
                vanha.unlink()
            if JULKAISEMATTOMAT.resolve() in lahde.parents:
                shutil.move(str(lahde), alkuperainen)
            else:
                shutil.copy2(lahde, alkuperainen)
        print(f"{alkuperainen}  {leveys}x{korkeus}  {alkuperainen.stat().st_size // 1024} kt")
        print(f"Muista commit ja push kuvarepossa: cd {KUVAREPO} && git add -A && git commit -m 'Lisää {nimi}' && git push")

    print(f"\nValmis. Perusnimi koodissa: {nimi}")
    if VALINNAINEN not in leveydet:
        print(f"Huom: alkuperäinen on alle {VALINNAINEN} px leveä, joten {VALINNAINEN} px versiota ei tehty.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
