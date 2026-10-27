#!/usr/bin/env python3
"""Laskee, montako kertaa sanat "Pirkanmaa" ja "Tampere" (kaikki taivutusmuodot) esiintyvät
kaupunkisivujen näkyvässä leipätekstissä (Search Console -kannibalisointi, Eerik 27.10.2026).

Mukaan lasketaan vain <main>-elementin teksti. Pois jätetään murupolku, Toiminta-alueet-palkki
(section aria-labelledby="toiminta-alueet-otsikko"), script/style sekä title, meta, JSON-LD,
header ja footer (ne ovat main-elementin ulkopuolella). Tampereen omat sivut ohitetaan.

Käyttö:
  python3 scripts/laske_toistot.py dist            # taulukko
  python3 scripts/laske_toistot.py dist --lauseet  # myös lauseet, joissa sanat esiintyvät
  python3 scripts/laske_toistot.py dist --raja 1   # poistuu virhekoodilla, jos raja ylittyy
"""
from __future__ import annotations

import argparse
import html
import re
import sys
from pathlib import Path

PREFIXES = ("tiilikaton-pinnoitus-", "talon-maalaus-", "maalauspalvelut-")
SKIP_SUFFIX = ("-pirkanmaa", "-tampere")
WORDS = {"Pirkanmaa": re.compile(r"pirkanma", re.I), "Tampere": re.compile(r"tampere", re.I)}

BANNER_START = re.compile(r'<section[^>]*aria-labelledby="toiminta-alueet-otsikko"', re.I)
BREADCRUMB = re.compile(r'<nav[^>]*aria-label="Murupolku".*?</nav>', re.I | re.S)
SCRIPT_STYLE = re.compile(r"<(script|style)\b.*?</\1>", re.I | re.S)
TAG = re.compile(r"<[^>]+>")


def body_text(html_src: str) -> str:
    m = re.search(r"<main\b.*?</main>", html_src, re.S | re.I)
    if not m:
        return ""
    main = m.group(0)
    b = BANNER_START.search(main)
    if b:
        # Palkki on sivun viimeinen lohko main-elementissä.
        main = main[: b.start()]
    main = BREADCRUMB.sub(" ", main)
    main = SCRIPT_STYLE.sub(" ", main)
    text = TAG.sub(" ", main)
    text = html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def sentences_with(text: str, rx: re.Pattern[str]) -> list[str]:
    out = []
    for s in re.split(r"(?<=[.?!])\s+", text):
        if rx.search(s):
            out.append(s.strip())
    return out


def page_dirs(dist: Path) -> list[Path]:
    dirs = []
    for d in sorted(dist.iterdir()):
        if not d.is_dir() or not d.name.startswith(PREFIXES):
            continue
        if d.name.endswith(SKIP_SUFFIX):
            continue
        if (d / "index.html").exists():
            dirs.append(d)
    return dirs


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("dist")
    ap.add_argument("--lauseet", action="store_true")
    ap.add_argument("--raja", type=int, default=None)
    args = ap.parse_args()

    dist = Path(args.dist)
    rows: list[tuple[str, int, int]] = []
    over = 0
    details: list[str] = []
    for d in page_dirs(dist):
        text = body_text((d / "index.html").read_text(encoding="utf-8"))
        counts = {k: len(rx.findall(text)) for k, rx in WORDS.items()}
        rows.append((f"/{d.name}/", counts["Pirkanmaa"], counts["Tampere"]))
        if args.raja is not None and max(counts.values()) > args.raja:
            over += 1
        if args.lauseet:
            for k, rx in WORDS.items():
                for s in sentences_with(text, rx):
                    details.append(f"  [{k}] /{d.name}/: {s}")

    width = max(len(r[0]) for r in rows) if rows else 10
    print(f"{'Sivu':<{width}}  Pirkanmaa  Tampere")
    for path, p, t in rows:
        flag = "  <-- yli" if args.raja is not None and max(p, t) > args.raja else ""
        print(f"{path:<{width}}  {p:>9}  {t:>7}{flag}")
    tp, tt = sum(r[1] for r in rows), sum(r[2] for r in rows)
    print(f"{'YHTEENSÄ':<{width}}  {tp:>9}  {tt:>7}   ({len(rows)} sivua)")
    if details:
        print()
        print("\n".join(details))
    if args.raja is not None:
        print(f"\nSivuja yli rajan {args.raja}: {over}")
        return 1 if over else 0
    return 0


if __name__ == "__main__":
    sys.exit(main())
