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
import json, math, sys, urllib.request, pathlib
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
PAD = 0.18                 # tyhjää kunnan ympärille (osuus kunnan koosta)
MIN_LAKE_KM2 = 3.0         # pienemmät järvet jätetään pois
COL_KUNTA = "#0F3D63"      # sivuston tumma sininen (navy)
COL_NAAPURI = "#E7ECF1"
COL_RAJA = "#9AA8B5"
COL_JARVI = "#BFE0F5"
COL_TEKSTI = "#1a1a1a"


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
    """Tyyli (Eerik 25.10.2026): reunat häivytetty, naapurit vain ääriviivoina ja haaleina,
    kunta yrityksen sinisenä korostettuna, järvet vaaleansinisinä (kunnan sisällä vaaleampana)."""
    name = SLUGS[slug]
    kunta = kunnat[name]
    minx, miny, maxx, maxy = kunta.bounds
    w, h = maxx - minx, maxy - miny
    cx, cy = (minx + maxx) / 2, (miny + maxy) / 2
    span = max(w * (1 + 2 * PAD), h * (1 + 2 * PAD) * W / H)
    vw, vh = span, span * H / W
    x0, y0 = cx - vw / 2, cy + vh / 2
    view = box(x0, cy - vh / 2, x0 + vw, y0)
    tf = lambda x, y: ((x - x0) / vw * W, (y0 - y) / vh * H)

    naapurit = [(n, g) for n, g in kunnat.items() if n != name and g.intersects(view)]
    simp = lambda g: g.simplify(span / 700)
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" '
           f'aria-labelledby="t">',
           f"<title id=\"t\">{name} ja naapurikunnat kartalla</title>",
           '<defs>',
           '<radialGradient id="fade" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">'
           '<stop offset="0.55" stop-color="#fff" stop-opacity="1"/>'
           '<stop offset="0.8" stop-color="#fff" stop-opacity="0.55"/>'
           '<stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>',
           f'<mask id="m"><ellipse cx="{W/2:.0f}" cy="{H/2:.0f}" rx="{W*0.62:.0f}" ry="{H*0.62:.0f}" fill="url(#fade)"/></mask>',
           '<filter id="varjo" x="-10%" y="-10%" width="120%" height="120%">'
           '<feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0A2A45" flood-opacity="0.35"/></filter>',
           '</defs>',
           '<g mask="url(#m)">']
    # Naapurit: haalea täyttö ja ohut ääriviiva, joka jatkuu reunaan asti
    for n, g in naapurit:
        out.append(f'<path d="{svg_path(simp(g.intersection(view)), tf)}" fill="#F3F6F9" stroke="#C3CDD8" stroke-width="1"/>')
    # Järvet naapureissa
    if lakes is not None:
        lk = lakes.intersection(view).difference(kunta)
        if not lk.is_empty:
            out.append(f'<path d="{svg_path(lk.simplify(span / 500), tf)}" fill="#D6E8F5" stroke="#B7D4EA" stroke-width="0.8" fill-rule="evenodd"/>')
    # Naapurien nimet haaleina
    for n, g in naapurit:
        inside = g.intersection(view)
        if inside.area < view.area * 0.012:
            continue
        px, py = tf(*inside.representative_point().coords[0])
        margin = 7 * len(n) / 2 + 6
        px = min(max(px, margin), W - margin)
        py = min(max(py, 16), H - 8)
        out.append(f'<text x="{px:.0f}" y="{py:.0f}" font-family="Montserrat, Arial, sans-serif" font-size="12" '
                   f'fill="#8A97A5" text-anchor="middle">{n}</text>')
    out.append('</g>')
    # Kunta korostettuna, ei häivytystä
    out.append(f'<path d="{svg_path(simp(kunta), tf)}" fill="{COL_KUNTA}" stroke="#0A2A45" stroke-width="1.5" filter="url(#varjo)"/>')
    if lakes is not None:
        lk = lakes.intersection(kunta)
        if not lk.is_empty:
            out.append(f'<path d="{svg_path(lk.simplify(span / 500), tf)}" fill="#9CC8EA" stroke="#7FB6DF" stroke-width="0.8" fill-rule="evenodd"/>')
    px, py = tf(*kunta.representative_point().coords[0])
    out.append(f'<text x="{px:.0f}" y="{py:.0f}" font-family="Montserrat, Arial, sans-serif" font-size="24" font-weight="800" '
               f'fill="#ffffff" stroke="#0A2A45" stroke-width="4" paint-order="stroke" text-anchor="middle">{name}</text>')
    out.append("</svg>")
    return chr(10).join(out)


def main(argv):
    if not argv:
        print(__doc__); return 2
    slugs = list(SLUGS) if argv[0] == "--kaikki" else argv
    kunnat = load_kunnat()
    lakes = load_lakes()
    OUT.mkdir(parents=True, exist_ok=True)
    for slug in slugs:
        svg = make_svg(slug, kunnat, lakes)
        f = OUT / f"{slug}.svg"
        f.write_text(svg, encoding="utf-8")
        print(f"{f.relative_to(ROOT)}  {len(svg) // 1024} kt  järvet: {'kyllä' if lakes is not None else 'ei'}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
