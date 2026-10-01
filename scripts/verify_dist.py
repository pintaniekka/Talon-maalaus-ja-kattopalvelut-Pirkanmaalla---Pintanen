"""Tarkistaa esirenderöidyt sivut kansiosta (dist tai verify_live.py:n lataama kopio).

Käyttö: python3 scripts/verify_dist.py dist
Jokaisella sitemapin sivulla pitää olla uniikki title, description ja canonical,
yksi h1, kappaleita, sisäisiä linkkejä ja jäsentyvä JSON-LD.
"""
import re, json, sys, pathlib
from html.parser import HTMLParser
dist = pathlib.Path(sys.argv[1])
xml = (dist/"sitemap.xml").read_text()
routes = re.findall(r"<loc>https://pintanen\.fi([^<]*)</loc>", xml)
VOID = {"area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr","path","circle","rect","line","polyline","polygon"}
class P(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True)
        s.stack=[]; s.in_root=False; s.root_depth=None; s.h1=0; s.p=0; s.links=set(); s.words=0; s.hidden_words=0; s.h1text=""; s.cur=None; s.skip=0
    def handle_starttag(s, tag, attrs):
        a=dict(attrs)
        if a.get("id")=="root": s.in_root=True; s.root_depth=len(s.stack)
        hidden = bool(re.search(r"opacity:\s*0(?![.\d])", a.get("style","") or ""))
        if tag in ("script","style","noscript"): s.skip+=1
        if tag not in VOID: s.stack.append((tag, hidden))
        if s.in_root:
            if tag=="h1": s.h1+=1; s.cur="h1"
            if tag=="p": s.p+=1
            if tag=="a" and (a.get("href") or "").startswith("/"): s.links.add(a["href"])
    def handle_endtag(s, tag):
        if tag in ("script","style","noscript"): s.skip=max(0,s.skip-1)
        if tag=="h1": s.cur=None
        for i in range(len(s.stack)-1,-1,-1):
            if s.stack[i][0]==tag:
                del s.stack[i:]
                break
        if s.in_root and s.root_depth is not None and len(s.stack)<=s.root_depth: s.in_root=False
    def handle_data(s, data):
        if not s.in_root or s.skip: return
        n=len(data.split())
        s.words+=n
        if any(h for _,h in s.stack): s.hidden_words+=n
        if s.cur=="h1": s.h1text+=data
titles={}; descs={}; problems=[]; rows=[]
for r in routes:
    f = dist/"index.html" if r=="/" else dist/r.strip("/")/"index.html"
    if not f.exists(): problems.append(f"{r}: tiedosto puuttuu"); continue
    h = f.read_text()
    t = re.findall(r"<title>(.*?)</title>", h, flags=re.S)
    d = re.findall(r'<meta name="description" content="([^"]*)"', h)
    c = re.findall(r'<link rel="canonical" href="([^"]*)"', h)
    if len(t)!=1: problems.append(f"{r}: title-tageja {len(t)}")
    if len(d)!=1: problems.append(f"{r}: description-tageja {len(d)}")
    if len(c)!=1 or c[0]!="https://pintanen.fi"+r: problems.append(f"{r}: canonical {c}")
    if t: titles.setdefault(t[0],[]).append(r)
    if d: descs.setdefault(d[0],[]).append(r)
    p=P(); p.feed(h)
    if p.h1!=1: problems.append(f"{r}: h1-otsikoita {p.h1}")
    if p.p<2: problems.append(f"{r}: kappaleita vain {p.p}")
    if len(p.links)<10: problems.append(f"{r}: sisäisiä linkkejä vain {len(p.links)}")
    if p.words<120: problems.append(f"{r}: sanoja vain {p.words}")
    lds = re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', h, flags=re.S)
    types=[]
    for x in lds:
        try:
            j=json.loads(x); types.append("+".join(j["@type"]) if isinstance(j["@type"],list) else j["@type"])
        except Exception as e: problems.append(f"{r}: JSON-LD ei jäsenny ({e})")
    rows.append((r, len(t[0]) if t else 0, len(d[0]) if d else 0, p.h1text.strip()[:45], p.p, len(p.links), p.words, round(100*p.hidden_words/max(1,p.words)), ",".join(types)))
for k,v in titles.items():
    if len(v)>1: problems.append(f"sama title {len(v)} sivulla: {v[:3]}")
for k,v in descs.items():
    if len(v)>1: problems.append(f"sama description {len(v)} sivulla: {v[:4]}")
print("sivuja:", len(routes), "| uniikkeja titlejä:", len(titles), "| uniikkeja descriptioneja:", len(descs))
print("sanoja min/mediaani/max:", min(x[6] for x in rows), sorted(x[6] for x in rows)[len(rows)//2], max(x[6] for x in rows))
print("kappaleita min:", min(x[4] for x in rows), "| linkkejä min:", min(x[5] for x in rows))
print("läpinäkyvän (opacity:0) tekstin osuus ilman noscript-sääntöä, min/mediaani/max %:", min(x[7] for x in rows), sorted(x[7] for x in rows)[len(rows)//2], max(x[7] for x in rows))
from collections import Counter
print("schemat:", Counter(t for x in rows for t in x[8].split(",")).most_common())
for x in rows[:6]+rows[-3:]: print("  ", x)
print("ONGELMAT:", len(problems)); [print("  -", p) for p in problems[:40]]
