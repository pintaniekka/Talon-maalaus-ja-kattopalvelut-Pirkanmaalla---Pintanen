#!/usr/bin/env python3
"""Tarkistaa vanhojen osoitteiden ohjaukset.

Kaksi käyttötapaa:

  python3 scripts/verify_redirects.py --file dist/_redirects --sitemap dist/sitemap.xml
      Lukee buildin _redirects-tiedoston ja tarkistaa, että jokaisella 301-säännöllä on
      pari molemmissa muodoissa (ilman ja kauttaviivalla), kohde päättyy kauttaviivaan ja
      kohde on sitemapissa. Ei verkkoa; ajetaan CI:ssä.

  python3 scripts/verify_redirects.py https://<esikatselu>.pages.dev [dist/_redirects]
      Pyytää jokaisen säännön lähdeosoitteen ilman ohjausten seuraamista ja vaatii täsmälleen
      yhden 301-vastauksen suoraan kohteeseen (ei 308-ketjua, ei 200-kuorta). Ajetaan
      Cloudflare-esikatselua ja tuotantoa vastaan ennen ja jälkeen julkaisun.

Tausta: auditointi 11.10.2026, osa 4, luku 5. Vanhat kauttaviivalliset osoitteet palauttivat
200-kuoren etusivun otsikolla, ja kauttaviivattomat ohjautuivat kahdessa hypyssä.
"""
import re, sys, pathlib, urllib.request, urllib.error, concurrent.futures as cf

UA = {"User-Agent": "Mozilla/5.0 (pintanen-verify-redirects)"}


def parse_rules(path: pathlib.Path):
    rules = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) >= 3 and parts[2] == "301":
            rules.append((parts[0], parts[1]))
    return rules


def check_file(redirects: pathlib.Path, sitemap: pathlib.Path | None) -> int:
    rules = parse_rules(redirects)
    sources = {src for src, _ in rules}
    problems = []
    locs = set()
    if sitemap:
        xml = sitemap.read_text(encoding="utf-8")
        locs = set(re.findall(r"<loc>https://pintanen\.fi([^<]*)</loc>", xml))
    for src, dst in rules:
        if src.startswith("/images/"):
            continue  # kuvatiedostojen uudet nimet (26.10.2026): ei kauttaviivaa, ei paria, ei sitemapissa
        if not dst.endswith("/"):
            problems.append(f"kohde ilman kauttaviivaa (308-ketju): {src} -> {dst}")
        twin = src[:-1] if src.endswith("/") else src + "/"
        if twin not in sources:
            problems.append(f"pari puuttuu: {src} (odotettu myös {twin})")
        if locs and dst not in locs:
            problems.append(f"kohde ei ole sitemapissa: {src} -> {dst}")
    print(f"sääntöjä: {len(rules)} | lähteitä: {len(sources)} | ongelmia: {len(problems)}")
    for p in problems:
        print("  ", p)
    return 1 if problems else 0


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def fetch(url: str):
    opener = urllib.request.build_opener(NoRedirect)
    req = urllib.request.Request(url, headers=UA, method="HEAD")
    try:
        with opener.open(req, timeout=30) as resp:
            return resp.status, resp.headers.get("Location", "")
    except urllib.error.HTTPError as e:
        return e.code, e.headers.get("Location", "")


def check_live(base: str, redirects: pathlib.Path) -> int:
    base = base.rstrip("/")
    rules = parse_rules(redirects)
    problems = []

    def one(rule):
        src, dst = rule
        status, location = fetch(base + src)
        expected = (base + dst, dst)
        ok = status == 301 and location in expected
        return src, dst, status, location, ok

    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(one, rules))
    for src, dst, status, location, ok in results:
        if not ok:
            problems.append(f"{src}: {status} -> {location or '-'} (odotettu 301 -> {dst})")
    print(f"{base}: sääntöjä {len(rules)} | ongelmia {len(problems)}")
    for p in problems:
        print("  ", p)
    return 1 if problems else 0


def main(argv: list[str]) -> int:
    if not argv:
        print(__doc__)
        return 2
    if argv[0] == "--file":
        redirects = pathlib.Path(argv[1])
        sitemap = pathlib.Path(argv[argv.index("--sitemap") + 1]) if "--sitemap" in argv else None
        return check_file(redirects, sitemap)
    base = argv[0]
    redirects = pathlib.Path(argv[1]) if len(argv) > 1 else pathlib.Path("dist/_redirects")
    return check_live(base, redirects)


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
