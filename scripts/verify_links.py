"""Tarkistaa rakennetun sivuston sisäiset linkit (29.10.2026).

Käyttö: python3 scripts/verify_links.py dist
Jokaisen dist-kansion index.html:n sisäisen href-linkin (alkaa /) pitää osoittaa
olemassa olevaan sivuun (dist/<polku>/index.html), tiedostoon (dist/<polku>) tai
_redirects-tiedoston vanhaan osoitteeseen. Kysely ja ankkuri jätetään huomiotta.
"""
import re, sys, pathlib
dist = pathlib.Path(sys.argv[1])
redirects = set()
rf = dist / "_redirects"
if rf.exists():
    for line in rf.read_text(encoding="utf-8").splitlines():
        parts = line.split()
        if len(parts) >= 2 and parts[0].startswith("/"):
            redirects.add(parts[0].rstrip("/") or "/")
problems = []
checked = set()
pages = sorted(dist.rglob("index.html"))
for f in pages:
    html = f.read_text(encoding="utf-8")
    root_start = html.find('id="root"')
    body = html[root_start:] if root_start >= 0 else html
    for href in re.findall(r'href="(/[^"#?]*)', body):
        key = href.rstrip("/") or "/"
        if (key, ) in checked:
            continue
        checked.add((key, ))
        if key == "/" or (dist / key.strip("/") / "index.html").exists() or (dist / key.strip("/")).is_file() or key in redirects:
            continue
        problems.append(f"{href} (ensimmäinen esiintymä {f.relative_to(dist)})")
print("sivuja:", len(pages), "| sisäisiä linkkikohteita:", len(checked))
print("ONGELMAT:", len(problems)); [print("  -", p) for p in problems[:40]]
sys.exit(1 if problems else 0)
