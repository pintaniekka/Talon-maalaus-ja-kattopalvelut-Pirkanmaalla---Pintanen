#!/usr/bin/env python3
"""Tekee kunnan siluettikartan SVG-kuvana kaupunkisivun paikallislohkoon.

Käyttö:
    python3 scripts/tee_kuntakartta.py <kunta-slug> [<kunta-slug> ...]
    python3 scripts/tee_kuntakartta.py --kaikki

Lähteet (kirjattu myös docs/sisallon-lahteet-2026-10-12.md):
  - Kuntarajat: Tilastokeskus, kuntajako 2026 1:1 000 000 (WFS tilastointialueet:kunta1000k_2026,
    EPSG:3067), CC BY 4.0. Ladataan kerran kansioon .kartta-cache/.
  - Järvet: OpenStreetMap-tekijät, Overpass API, ODbL. Valinnainen: jos tiedostoa
    .kartta-cache/lakes_osm.json ei ole, kartta tehdään ilman järviä.

Tulos: public/images/kartat/<slug>.svg. Kunta sivuston sinisellä korostettuna, naapurikunnat haaleina
ääriviivoina ja reunat häivytettyinä (Eerik 25.10.2026), suuret järvet vaaleansinisinä. Ei teitä eikä taajamia.
"""
import json, math, re, sys, urllib.request, pathlib
from shapely.geometry import shape, Polygon, MultiPolygon, LineString, box
from shapely.ops import unary_union, polygonize

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / ".kartta-cache"
OUT = ROOT / "public" / "images" / "kartat"
WFS = ("https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature"
       "&typeName=tilastointialueet:kunta1000k_2026&outputFormat=json&srsName=EPSG:3067")

# Sivuston kaupunkislugit -> Tilastokeskuksen kunnan nimi
SLUGS = {
    "tampere": "Tampere", "nokia": "Nokia", "ylojarvi": "Ylöjärvi", "kangasala": "Kangasala",
    "lempaala": "Lempäälä", "pirkkala": "Pirkkala", "valkeakoski": "Valkeakoski", "sastamala": "Sastamala",
    "hameenkyro": "Hämeenkyrö", "ikaalinen": "Ikaalinen", "orivesi": "Orivesi", "akaa": "Akaa",
    "hameenlinna": "Hämeenlinna", "forssa": "Forssa", "huittinen": "Huittinen", "parkano": "Parkano",
    "mantta-vilppula": "Mänttä-Vilppula", "juupajoki": "Juupajoki", "kihnio": "Kihniö", "palkane": "Pälkäne",
    "ruovesi": "Ruovesi", "urjala": "Urjala", "vesilahti": "Vesilahti", "virrat": "Virrat",
}

W, H = 600, 480            # viewBox
PAD = 0.09                 # tyhjää kunnan ympärille (osuus kunnan koosta)
MIN_LAKE_KM2 = 3.0         # pienemmät järvet jätetään pois
COL_KUNTA = "#0094EB"      # sivuston sininen (--accent-strong)
COL_NAAPURI = "#EDF0F3"
COL_RAJA = "#C9D1D9"
COL_JARVI = "#E4F3FF"      # järvet kunnan sisällä (lähes --accent-light)
COL_TEKSTI = "#9AA5B1"


def load_kunnat():
    CACHE.mkdir(exist_ok=True)
    f = CACHE / "kunnat_2026.json"
    if not f.exists():
        urllib.request.urlretrieve(WFS, f)
    data = json.loads(f.read_text(encoding="utf-8"))
    kunnat = {}
    for feat in data["features"]:
        p = feat["properties"]
        name = p.get("nimi") or p.get("name") or p.get("kunta_ni1")
        kunnat[name] = shape(feat["geometry"])
    return kunnat


def wgs84_to_3067(lon, lat):
    """WGS84 -> ETRS-TM35FIN (EPSG:3067), UTM-zone 35 -kaava (riittävä tarkkuus kartalle)."""
    a = 6378137.0; f = 1 / 298.257222101; k0 = 0.9996; lon0 = math.radians(27.0)
    e2 = f * (2 - f); ep2 = e2 / (1 - e2)
    phi = math.radians(lat); lam = math.radians(lon)
    n = a / math.sqrt(1 - e2 * math.sin(phi) ** 2)
    t = math.tan(phi) ** 2; c = ep2 * math.cos(phi) ** 2; A = (lam - lon0) * math.cos(phi)
    e4 = e2 * e2; e6 = e4 * e2
    M = a * ((1 - e2 / 4 - 3 * e4 / 64 - 5 * e6 / 256) * phi
             - (3 * e2 / 8 + 3 * e4 / 32 + 45 * e6 / 1024) * math.sin(2 * phi)
             + (15 * e4 / 256 + 45 * e6 / 1024) * math.sin(4 * phi)
             - (35 * e6 / 3072) * math.sin(6 * phi))
    x = k0 * n * (A + (1 - t + c) * A ** 3 / 6 + (5 - 18 * t + t * t + 72 * c - 58 * ep2) * A ** 5 / 120) + 500000
    y = k0 * (M + n * math.tan(phi) * (A * A / 2 + (5 - t + 9 * c + 4 * c * c) * A ** 4 / 24
                                       + (61 - 58 * t + t * t + 600 * c - 330 * ep2) * A ** 6 / 720))
    return x, y


def load_lakes():
    f = CACHE / "lakes_osm.json"
    if not f.exists():
        return None
    data = json.loads(f.read_text(encoding="utf-8"))
    lines = []
    for el in data.get("elements", []):
        if el["type"] == "way" and "geometry" in el:
            pts = [wgs84_to_3067(p["lon"], p["lat"]) for p in el["geometry"]]
            if len(pts) >= 2:
                lines.append(LineString(pts))
        elif el["type"] == "relation":
            for m in el.get("members", []):
                if m.get("type") == "way" and m.get("role") in ("outer", "") and "geometry" in m:
                    pts = [wgs84_to_3067(p["lon"], p["lat"]) for p in m["geometry"]]
                    if len(pts) >= 2:
                        lines.append(LineString(pts))
    polys = [p for p in polygonize(unary_union(lines)) if p.area >= MIN_LAKE_KM2 * 1e6]
    return unary_union(polys) if polys else None


def rings(geom):
    if isinstance(geom, Polygon):
        return [geom.exterior] + list(geom.interiors)
    if isinstance(geom, MultiPolygon):
        out = []
        for g in geom.geoms:
            out += rings(g)
        return out
    return []


def svg_path(geom, tf):
    parts = []
    for ring in rings(geom):
        pts = [tf(x, y) for x, y in ring.coords]
        parts.append("M" + " L".join(f"{x:.0f} {y:.0f}" for x, y in pts) + " Z")
    return " ".join(parts)


def make_svg(slug, kunnat, lakes):
    """Tyyli (Eerik 25.10.2026): kuva kunnan muotoinen (ei 1:1), kunta yrityksen vaaleammalla sinisellä,
    ympäristö pelkkää haaleaa harmaata ilman sinistä, reunat häivytetty niin, että häivytys ehtii nollaan
    ennen kuvan reunaa. Palauttaa (svg, leveys, korkeus)."""
    name = SLUGS[slug]
    kunta = kunnat[name]
    minx, miny, maxx, maxy = kunta.bounds
    w, h = maxx - minx, maxy - miny
    cx, cy = (minx + maxx) / 2, (miny + maxy) / 2
    vw, vh = w * (1 + 2 * PAD), h * (1 + 2 * PAD)
    # Kuvan suhde seuraa kuntaa, mutta ei liian kapeaksi tai leveäksi.
    ratio = min(max(vw / vh, 0.7), 1.6)
    if vw / vh < ratio: vw = vh * ratio
    else: vh = vw / ratio
    Wd = W; Hd = round(W / ratio)
    x0, y0 = cx - vw / 2, cy + vh / 2
    view = box(x0, cy - vh / 2, x0 + vw, y0)
    span = max(vw, vh)
    tf = lambda x, y: ((x - x0) / vw * Wd, (y0 - y) / vh * Hd)

    naapurit = [(n, g) for n, g in kunnat.items() if n != name and g.intersects(view)]
    simp = lambda g: g.simplify(span / 700)
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {Wd} {Hd}" width="{Wd}" height="{Hd}" role="img" '
           f'aria-labelledby="t">',
           f'<title id="t">{name} ja naapurikunnat kartalla</title>',
           '<defs>',
           '<radialGradient id="fade" cx="50%" cy="50%" r="50%">'
           '<stop offset="0.5" stop-color="#fff" stop-opacity="1"/>'
           '<stop offset="0.78" stop-color="#fff" stop-opacity="0.5"/>'
           '<stop offset="0.97" stop-color="#fff" stop-opacity="0"/></radialGradient>',
           f'<mask id="m"><ellipse cx="{Wd/2:.0f}" cy="{Hd/2:.0f}" rx="{Wd/2:.0f}" ry="{Hd/2:.0f}" fill="url(#fade)"/></mask>',
           '<filter id="varjo" x="-10%" y="-10%" width="120%" height="120%">'
           '<feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0079C7" flood-opacity="0.25"/></filter>',
           '</defs>',
           '<g mask="url(#m)">']
    # Naapurit: pelkkää haaleaa harmaata, ohut ääriviiva jatkuu reunaan asti
    for n, g in naapurit:
        out.append(f'<path d="{svg_path(simp(g.intersection(view)), tf)}" fill="{COL_NAAPURI}" stroke="{COL_RAJA}" stroke-width="1"/>')
    # Järvet naapureissa: lähes valkoista, ei sinistä
    if lakes is not None:
        lk = lakes.intersection(view).difference(kunta)
        if not lk.is_empty:
            out.append(f'<path d="{svg_path(lk.simplify(span / 500), tf)}" fill="#FBFCFD" stroke="#DDE3E9" stroke-width="0.7" fill-rule="evenodd"/>')
    for n, g in naapurit:
        inside = g.intersection(view)
        if inside.area < view.area * 0.012:
            continue
        px, py = tf(*inside.representative_point().coords[0])
        margin = 7 * len(n) / 2 + 6
        px = min(max(px, margin), Wd - margin)
        py = min(max(py, 16), Hd - 8)
        out.append(f'<text x="{px:.0f}" y="{py:.0f}" font-family="Montserrat, Arial, sans-serif" font-size="12" '
                   f'fill="{COL_TEKSTI}" text-anchor="middle">{n}</text>')
    out.append('</g>')
    # Kunta korostettuna yrityksen sinisellä, ei häivytystä
    out.append(f'<path d="{svg_path(simp(kunta), tf)}" fill="{COL_KUNTA}" stroke="#0079C7" stroke-width="1.5" filter="url(#varjo)"/>')
    if lakes is not None:
        lk = lakes.intersection(kunta)
        if not lk.is_empty:
            out.append(f'<path d="{svg_path(lk.simplify(span / 500), tf)}" fill="{COL_JARVI}" stroke="#B9E0FA" stroke-width="0.7" fill-rule="evenodd"/>')
    px, py = tf(*kunta.representative_point().coords[0])
    out.append(f'<text x="{px:.0f}" y="{py:.0f}" font-family="Montserrat, Arial, sans-serif" font-size="26" font-weight="800" '
               f'fill="#ffffff" stroke="#0079C7" stroke-width="4" paint-order="stroke" text-anchor="middle">{name}</text>')
    out.append("</svg>")
    return chr(10).join(out), Wd, Hd


def write_kartat_ts(dims):
    """Kirjoittaa src/data/kartat.ts: slug -> [leveys, korkeus], jotta img saa oikeat mitat (ei CLS)."""
    f = ROOT / "src" / "data" / "kartat.ts"
    rows = "\n".join(f'  "{slug}": [{w}, {h}],' for slug, (w, h) in sorted(dims.items()))
    f.write_text(
        "/**\n * Kunnat, joille on siluettikartta public/images/kartat/<slug>.svg, ja kuvan mitat.\n"
        " * Tiedoston kirjoittaa scripts/tee_kuntakartta.py; älä muokkaa käsin.\n"
        " * Lähteet: Tilastokeskus kuntajako 2026 (CC BY 4.0), järvet OpenStreetMap (ODbL).\n */\n"
        f"export const kuntakartat: Record<string, [number, number]> = {{\n{rows}\n}};\n\n"
        "export const hasKuntakartta = (slug: string): boolean => slug in kuntakartat;\n\n"
        "export const kuntakarttaUrl = (slug: string): string => `/images/kartat/${slug}.svg`;\n\n"
        "export const kuntakarttaKoko = (slug: string): [number, number] => kuntakartat[slug] ?? [600, 480];\n",
        encoding="utf-8",
    )


def main(argv):
    if not argv:
        print(__doc__); return 2
    slugs = list(SLUGS) if argv[0] == "--kaikki" else argv
    kunnat = load_kunnat()
    lakes = load_lakes()
    OUT.mkdir(parents=True, exist_ok=True)
    dims = {}
    for f in OUT.glob("*.svg"):
        m = re.search(r'viewBox="0 0 (\d+) (\d+)"', f.read_text(encoding="utf-8"))
        if m: dims[f.stem] = (int(m.group(1)), int(m.group(2)))
    for slug in slugs:
        svg, w, h = make_svg(slug, kunnat, lakes)
        f = OUT / f"{slug}.svg"
        f.write_text(svg, encoding="utf-8", newline="\n")
        dims[slug] = (w, h)
        print(f"{f.relative_to(ROOT)}  {w}x{h}  {len(svg) // 1024} kt  järvet: {'kyllä' if lakes is not None else 'ei'}")
    write_kartat_ts(dims)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
