#!/usr/bin/env python3
"""Mittaa, kuinka suuri osa sivun A tekstistä löytyy myös sivulta B (5 sanan jaksot).

Käyttö: python3 scripts/sivujen_paallekkaisyys.py dist [slug ...]
Ilman slugeja tulostaa yhteenvedon kaikista kaupunkisivuista.
Valitsin --sisalto jättää pois arvostelukarusellin ja toiminta-alueiden linkkilistan.
"""
import re, sys, html, itertools
from pathlib import Path

CONTENT_ONLY = "--sisalto" in sys.argv

def text_of(path: Path) -> str:
    s = path.read_text(encoding="utf-8")
    m = re.search(r"<main[^>]*>(.*)</main>", s, re.S)
    s = m.group(1) if m else s
    if CONTENT_ONLY:
        # Pudota asiakasarvostelut ja toiminta-alueiden linkkilista: ne ovat samat joka sivulla.
        parts = s.split("<section")
        s = "<section".join(p for p in parts if 'aria-label="Asiakasarv' not in p[:300] and "Toiminta-alueet" not in re.sub(r"<[^>]+>", " ", p)[:200])
    s = re.sub(r"<(script|style|svg|noscript)[^>]*>.*?</\1>", " ", s, flags=re.S)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", html.unescape(s)).strip().lower()

def shingles(t: str, n: int = 5):
    w = re.findall(r"[\wäöå€%–-]+", t)
    return {" ".join(w[i:i + n]) for i in range(max(0, len(w) - n + 1))}, len(w)

def page(dist: Path, route: str):
    f = dist / route.strip("/") / "index.html"
    return shingles(text_of(f)) if f.exists() else None

def share(a, b):
    return len(a & b) / len(a) if a else 0.0

def main():
    dist = Path(sys.argv[1])
    slugs = [a for a in sys.argv[2:] if not a.startswith("--")] or sorted(p.name.replace("maalauspalvelut-", "") for p in dist.glob("maalauspalvelut-*") if "hinta" not in p.name)
    kinds = [("tiilikaton-pinnoitus", "tiilikaton-pinnoitus-pirkanmaa"), ("talon-maalaus", "talon-maalaus-pirkanmaa")]
    for prefix, main_route in kinds:
        main_page = page(dist, main_route)
        pages = {s: page(dist, f"{prefix}-{s}") for s in slugs}
        pages = {s: p for s, p in pages.items() if p}
        if not pages:
            continue
        print(f"\n== /{prefix}-<paikkakunta>  ({len(pages)} sivua)")
        vs_main = {s: share(p[0], main_page[0]) for s, p in pages.items()}
        pair = {}
        for a, b in itertools.permutations(pages, 2):
            pair.setdefault(a, []).append(share(pages[a][0], pages[b][0]))
        print(f"{'sivu':18}{'sanoja':>8}{'sama kuin pääsivu':>20}{'sama kuin muut kaupungit (ka / max)':>40}")
        for s, p in pages.items():
            others = pair.get(s, [0])
            print(f"{s:18}{p[1]:>8}{vs_main[s]:>19.0%}{sum(others)/len(others):>28.0%} / {max(others):.0%}")
        n = len(pages)
        print(f"keskiarvo: pääsivu {sum(vs_main.values())/n:.0%}, muut kaupungit {sum(sum(v)/len(v) for v in pair.values())/max(1,len(pair)):.0%}")

if __name__ == "__main__":
    main()
