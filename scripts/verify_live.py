"""Tarkistaa julkaistun sivuston ilman JavaScriptiä.

Käyttö: python3 scripts/verify_live.py https://pintanen.fi /tmp/pintanen-kopio
(tai Cloudflaren esikatseluosoite). Lataa kaikki sitemapin sivut ja tarkistaa:
sivut vastaavat 200, sisäiset linkit, kuvasitemapin ja sivujen kuvat, llms.txt,
robots.txt ja JSON-LD-schemojen rakenne. Aja sen jälkeen verify_dist.py ladatulle kopiolle.
"""
import re, json, sys, urllib.request, urllib.error, concurrent.futures as cf, pathlib, subprocess
BASE = sys.argv[1].rstrip("/")
OUT = pathlib.Path(sys.argv[2]); OUT.mkdir(parents=True, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (pintanen-audit; no-js)"}
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
opener = urllib.request.build_opener(NoRedirect)
def get(url, follow=True):
    req = urllib.request.Request(url, headers=UA)
    try:
        r = (urllib.request.urlopen(req, timeout=30) if follow else opener.open(req, timeout=30))
        return r.status, r.read(), dict(r.headers)
    except urllib.error.HTTPError as e:
        return e.code, e.read() if e.fp else b"", dict(e.headers or {})
    except Exception as e:
        return 0, str(e).encode(), {}
def head(url):
    req = urllib.request.Request(url, headers=UA, method="HEAD")
    try:
        r = urllib.request.urlopen(req, timeout=30); return r.status
    except urllib.error.HTTPError as e: return e.code
    except Exception: return 0

st, xml, _ = get(BASE + "/sitemap.xml"); xml = xml.decode()
routes = re.findall(r"<loc>https://pintanen\.fi([^<]*)</loc>", xml)
print(f"sitemap.xml: {st}, {len(routes)} osoitetta, lastmod-kenttiä {xml.count('<lastmod>')}")
def fetch_page(r):
    s, b, h = get(BASE + r); return r, s, b
pages = {}
with cf.ThreadPoolExecutor(8) as ex:
    for r, s, b in ex.map(fetch_page, routes):
        pages[r] = (s, b.decode("utf-8", "replace"))
        f = OUT / ("index.html" if r == "/" else r.strip("/") + "/index.html"); f.parent.mkdir(parents=True, exist_ok=True); f.write_text(pages[r][1])
(OUT / "sitemap.xml").write_text(xml)
bad = [r for r,(s,_) in pages.items() if s != 200]
print("sivut, jotka eivät vastaa 200:", bad or "ei yhtään")

# internal links from static HTML
links = {}
for r,(s,h) in pages.items():
    body = h[h.find('<div id="root">'):] if '<div id="root">' in h else h
    for m in re.finditer(r'<a\b[^>]*\bhref="(/[^"#?]*)', body):
        links.setdefault(m.group(1), set()).add(r)
def check_link(p):
    s, _, hd = get(BASE + p, follow=False)
    if s in (301, 308):
        loc = hd.get("Location") or hd.get("location") or ""
        s2, b2, _ = get(BASE + (loc if loc.startswith("/") else re.sub(r"^https?://[^/]+", "", loc)))
        return p, s, s2, loc
    return p, s, s, ""
res = []
with cf.ThreadPoolExecutor(8) as ex: res = list(ex.map(check_link, sorted(links)))
broken = [(p, s, s2) for p, s, s2, _ in res if s2 != 200]
print(f"sisäiset linkit: {len(links)} uniikkia kohdetta {sum(len(v) for v in links.values())} linkistä, rikkinäisiä: {len(broken)}")
for p, s, s2 in broken[:20]: print("   RIKKI", p, s, s2, "esim. sivulta", sorted(links[p])[0])
redir = [(p, s, loc) for p, s, s2, loc in res if s in (301, 308) and not (loc.rstrip("/") == p.rstrip("/") or loc.endswith(p + "/"))]
print("linkit, jotka ohjautuvat toiselle sivulle:", [(p, loc) for p, s, loc in redir][:10] or "ei yhtään")

# image sitemap
st, ix, _ = get(BASE + "/image-sitemap.xml"); ix = ix.decode()
imgs = sorted(set(re.findall(r"<image:loc>([^<]+)</image:loc>", ix)))
with cf.ThreadPoolExecutor(8) as ex: codes = list(ex.map(head, [i.replace("&amp;", "&").replace("https://pintanen.fi", BASE) for i in imgs]))
print(f"image-sitemap.xml: {st}, kuvia {len(re.findall('<image:loc>', ix))} ({len(imgs)} uniikkia), ei-200: {[i for i, c in zip(imgs, codes) if c != 200] or 'ei yhtään'}")
allhtml = " ".join(h for _, h in pages.values())
rel = set(re.findall(r'(?:src|href|content)="(/images/[^"\s]+)"', allhtml)) | set(re.findall(r'(?:https://pintanen\.fi)?(/images/[^"\s,)<]+\.(?:webp|avif|png|svg|jpg))', allhtml))
pageimgs = sorted(rel)
with cf.ThreadPoolExecutor(8) as ex: codes2 = list(ex.map(head, [BASE + i.replace("&amp;", "&") for i in pageimgs]))
print(f"sivujen HTML:ssä viitatut kuvat: {len(pageimgs)}, ei-200: {[i for i, c in zip(pageimgs, codes2) if c != 200] or 'ei yhtään'}")
ext = sorted(set(re.findall(r'https?://([a-z0-9.-]*(?:supabase|lovable)[a-z0-9.-]*)', allhtml)))
print("supabase/lovable-osoitteita sivujen HTML:ssä:", ext or "ei yhtään")
# llms.txt, robots
st, ll, hd = get(BASE + "/llms.txt"); ll = ll.decode()
llinks = re.findall(r"\]\((https://pintanen\.fi[^)]*)\)", ll)
missing = [u for u in llinks if u.replace("https://pintanen.fi", "") not in routes]
print(f"llms.txt: {st}, {hd.get('Content-Type') or hd.get('content-type')}, {len(ll)} merkkiä, linkkejä {len(llinks)}, linkit sitemapin ulkopuolelle: {missing or 'ei yhtään'}")
st, rb, _ = get(BASE + "/robots.txt"); print("robots.txt:", st, "| sitemap-rivit:", re.findall(r"Sitemap: (\S+)", rb.decode()))

# schema validity
REQ = {"FAQPage": ["mainEntity"], "BreadcrumbList": ["itemListElement"], "Service": ["name", "provider", "areaServed"], "Article": ["headline", "datePublished", "author", "image"], "WebSite": ["url", "name"]}
problems = []; counts = {}
for r,(s,h) in pages.items():
    for x in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', h, flags=re.S):
        try: j = json.loads(x)
        except Exception as e: problems.append(f"{r}: JSON ei jäsenny: {e}"); continue
        t = j.get("@type"); tn = "+".join(t) if isinstance(t, list) else t
        counts[tn] = counts.get(tn, 0) + 1
        if j.get("@context") != "https://schema.org": problems.append(f"{r}: {tn} @context puuttuu")
        for k in REQ.get(tn, []):
            if not j.get(k): problems.append(f"{r}: {tn}.{k} puuttuu")
        if tn == "FAQPage":
            for q in j["mainEntity"]:
                if q.get("@type") != "Question" or not q.get("name") or not (q.get("acceptedAnswer") or {}).get("text"): problems.append(f"{r}: FAQ-kysymys vajaa")
        if tn == "BreadcrumbList":
            for i, it in enumerate(j["itemListElement"], 1):
                if it.get("position") != i or not it.get("name") or not it.get("item"): problems.append(f"{r}: murupolun kohta {i} vajaa")
        if isinstance(t, list):
            for k in ["name", "url", "telephone", "address", "logo", "image"]:
                if not j.get(k): problems.append(f"{r}: yritys.{k} puuttuu")
print("schemat:", counts)
print("schema-ongelmat:", problems[:15] or "ei yhtään")
