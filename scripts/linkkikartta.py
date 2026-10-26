#!/usr/bin/env python3
"""
Sisäisten linkkien kartta buildin dist-kansiosta (yöajo 27.10.2026, paketti 6).

Lukee jokaisen sitemapin sivun esirenderöidyn HTML:n ja laskee, kuinka monta sisäistä
linkkiä kullekin sivulle tulee muilta sivuilta ja millä ankkuriteksteillä. Linkit
jaetaan kahteen ryhmään: sisältölinkit (leipäteksti, UKK, artikkelit) ja kehyslinkit
(header, nav, footer, murupolku, toiminta-aluebanneri), koska kehys toistuu joka sivulla eikä kerro mitään
sivun painosta sivustolla.

Käyttö:
    python3 scripts/linkkikartta.py dist docs/linkkikartta-2026-10-27.md
    python3 scripts/linkkikartta.py dist            # tulostaa taulukon ruudulle
"""
from __future__ import annotations

import re
import sys
from collections import Counter, defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

SITE = "https://pintanen.fi"
# Elementit, joiden sisällä olevat linkit ovat kehystä, eivät sisältöä.
FRAME_TAGS = {"header", "nav", "footer"}
# Toiminta-aluebanneri toistuu joka sivulla kuten alatunniste, joten sekin on kehystä.
FRAME_CLASS_HINTS = ("breadcrumb", "murupolku", "toiminta-alueet-otsikko")


def normalize(href: str) -> str | None:
    """Palauttaa sisäisen polun muodossa /polku/ tai None, jos linkki on ulkoinen tai ei-sivu."""
    if not href or href.startswith(("mailto:", "tel:", "#", "javascript:")):
        return None
    parts = urlsplit(href)
    if parts.scheme and parts.netloc and f"{parts.scheme}://{parts.netloc}" != SITE:
        return None
    path = parts.path or "/"
    if re.search(r"\.(png|jpe?g|webp|avif|svg|pdf|xml|txt|ico)$", path):
        return None
    if not path.endswith("/"):
        path += "/"
    return path


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[tuple[str, str, bool]] = []  # (polku, ankkuri, onko_kehys)
        self.frame_depth = 0
        self.stack: list[tuple[str, bool]] = []
        self.current: list[str] | None = None
        self.current_href: str | None = None
        self.current_frame = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = " ".join(a.get(k) or "" for k in ("class", "aria-label", "aria-labelledby"))
        is_frame = tag in FRAME_TAGS or any(h in cls.lower() for h in FRAME_CLASS_HINTS)
        if is_frame:
            self.frame_depth += 1
        self.stack.append((tag, is_frame))
        if tag == "a" and self.current is None:
            path = normalize(a.get("href", ""))
            if path:
                self.current = []
                self.current_href = path
                self.current_frame = self.frame_depth > 0
        if tag == "img" and self.current is not None and a.get("alt"):
            self.current.append(a["alt"])

    def handle_endtag(self, tag):
        if tag == "a" and self.current is not None:
            text = re.sub(r"[\x00-\x1f\x7f]+", " ", "".join(self.current))
            text = re.sub(r"\s+", " ", text).strip()
            if len(text) > 60:
                text = text[:57].rstrip() + "…"
            self.links.append((self.current_href or "", text, self.current_frame))
            self.current = None
        # Pura pino viimeisimpään samannimiseen tagiin asti.
        for i in range(len(self.stack) - 1, -1, -1):
            t, is_frame = self.stack[i]
            if t == tag:
                for _, f in self.stack[i:]:
                    if f:
                        self.frame_depth -= 1
                del self.stack[i:]
                break

    def handle_data(self, data):
        if self.current is not None:
            self.current.append(data)


def sitemap_paths(dist: Path) -> list[str]:
    xml = (dist / "sitemap.xml").read_text(encoding="utf-8")
    return [urlsplit(u).path for u in re.findall(r"<loc>(.*?)</loc>", xml)]


def page_file(dist: Path, path: str) -> Path:
    return dist / path.strip("/") / "index.html" if path != "/" else dist / "index.html"


def main() -> int:
    dist = Path(sys.argv[1] if len(sys.argv) > 1 else "dist")
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else None
    pages = sitemap_paths(dist)
    page_set = set(pages)

    inbound_content: dict[str, Counter] = defaultdict(Counter)
    inbound_frame: dict[str, Counter] = defaultdict(Counter)
    sources_content: dict[str, set] = defaultdict(set)
    outbound_content: Counter = Counter()

    for src in pages:
        f = page_file(dist, src)
        if not f.exists():
            continue
        p = LinkParser()
        p.feed(f.read_text(encoding="utf-8", errors="ignore"))
        seen_frame = set()
        for target, anchor, is_frame in p.links:
            if target == src or target not in page_set:
                continue
            if is_frame:
                if target in seen_frame:
                    continue
                seen_frame.add(target)
                inbound_frame[target][anchor or "(kuva)"] += 1
            else:
                inbound_content[target][anchor or "(kuva)"] += 1
                sources_content[target].add(src)
                outbound_content[src] += 1

    rows = []
    for path in pages:
        c = inbound_content.get(path, Counter())
        fr = inbound_frame.get(path, Counter())
        rows.append((path, sum(c.values()), len(sources_content.get(path, ())), sum(fr.values()), c))
    rows.sort(key=lambda r: (r[1], r[3]))

    lines = [
        "# Sisäisten linkkien kartta",
        "",
        f"Lähde: `{dist}` ({len(pages)} sitemapin sivua). Sisältölinkki = linkki leipätekstissä, UKK:ssa tai artikkelissa.",
        "Kehyslinkki = header, valikko, alatunniste, murupolku tai toiminta-aluebanneri (lasketaan kerran per lähdesivu).",
        "Ankkurit on listattu sisältölinkeistä; sulkeissa toistojen määrä.",
        "",
        "| Sivu | Sisältölinkkejä | Lähdesivuja | Kehyslinkkejä | Ankkurit (sisältö) |",
        "|---|---:|---:|---:|---|",
    ]
    for path, n, nsrc, nfr, c in rows:
        anchors = ", ".join(f"{a} ({k})" if k > 1 else a for a, k in c.most_common())
        lines.append(f"| `{path}` | {n} | {nsrc} | {nfr} | {anchors} |")
    lines += ["", "## Sivut, joilla on alle 5 sisältölinkkiä", ""]
    weak = [r for r in rows if r[1] < 5]
    lines += [f"- `{r[0]}` ({r[1]})" for r in weak] or ["- ei yhtään"]
    lines.append("")

    text = "\n".join(lines)
    if out:
        out.write_text(text, encoding="utf-8")
        print(f"kirjoitettu {out} ({len(rows)} sivua, {len(weak)} alle 5 sisältölinkin sivua)")
    else:
        print(text)
    return 0


if __name__ == "__main__":
    sys.exit(main())
