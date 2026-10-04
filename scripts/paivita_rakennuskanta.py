#!/usr/bin/env python3
"""Hakee Tilastokeskuksen rakennuskannasta omakoti- ja paritalojen määrät
toiminta-alueen kunnissa valmistumisvuosikymmenen mukaan ja kirjoittaa ne
tiedostoon src/data/cityHousingStats.ts.

Lähde: Tilastokeskus, StatFin, taulukko 15er "Rakennukset käyttötarkoituksen,
valmistumisvuoden ja lämmitysaineen mukaan" (CC BY 4.0).

Käyttö: python3 scripts/paivita_rakennuskanta.py
"""
import json, urllib.request
from pathlib import Path

URL = "https://pxdata.stat.fi/PXWeb/api/v1/fi/StatFin/raku/15er.px"
HEADERS = {"User-Agent": "Mozilla/5.0", "Content-Type": "application/json"}

# slug -> kunnan nimi Tilastokeskuksen luokituksessa
KUNNAT = {
    "tampere": "Tampere", "sastamala": "Sastamala", "hameenkyro": "Hämeenkyrö", "ylojarvi": "Ylöjärvi",
    "nokia": "Nokia", "forssa": "Forssa", "hameenlinna": "Hämeenlinna", "huittinen": "Huittinen",
    "akaa": "Akaa", "ikaalinen": "Ikaalinen", "juupajoki": "Juupajoki", "kangasala": "Kangasala",
    "kihnio": "Kihniö", "lempaala": "Lempäälä", "mantta-vilppula": "Mänttä-Vilppula", "orivesi": "Orivesi",
    "parkano": "Parkano", "pirkkala": "Pirkkala", "palkane": "Pälkäne", "ruovesi": "Ruovesi",
    "urjala": "Urjala", "valkeakoski": "Valkeakoski", "vesilahti": "Vesilahti", "virrat": "Virrat",
}
# Tilastokeskuksen luokka -> kentän nimi
JAKSOT = [
    ("1754 - 1920", "ennen1921"), ("1921 - 1939", "v1921_1939"), ("1940 - 1959", "v1940_1959"),
    ("1960 - 1969", "v1960"), ("1970 - 1979", "v1970"), ("1980 - 1989", "v1980"), ("1990 - 1999", "v1990"),
    ("2000 - 2009", "v2000"), ("2010 - 2019", "v2010"), ("2020 -", "v2020"), ("9999", "tuntematon"),
]

def get(url, data=None):
    req = urllib.request.Request(url, data=json.dumps(data).encode() if data else None, headers=HEADERS)
    return json.load(urllib.request.urlopen(req, timeout=60))

def main():
    meta = get(URL)
    alue = meta["variables"][0]
    vuosi = next(v for v in meta["variables"] if v["code"] == "timeperiod_y")["values"][-1]
    koodi = dict(zip(alue["valueTexts"], alue["values"]))
    nimi = {koodi[n]: slug for slug, n in KUNNAT.items()}
    data = get(URL, {
        "query": [
            {"code": alue["code"], "selection": {"filter": "item", "values": list(nimi)}},
            {"code": "rakennus_6_20180101", "selection": {"filter": "item", "values": ["0110_0111"]}},
            {"code": "timeperiod_y", "selection": {"filter": "item", "values": [vuosi]}},
            {"code": "rak_valm_v_10_20210101", "selection": {"filter": "all", "values": ["*"]}},
            {"code": "polttoaineet_12_20260101", "selection": {"filter": "item", "values": ["SSS"]}},
            {"code": "contentscode", "selection": {"filter": "item", "values": ["rakennus_lkm"]}},
        ],
        "response": {"format": "json"},
    })
    cols = [c["code"] for c in data["columns"]]
    i_alue, i_jakso = cols.index(alue["code"]), cols.index("rak_valm_v_10_20210101")
    out = {slug: {} for slug in KUNNAT}
    for row in data["data"]:
        out[nimi[row["key"][i_alue]]][row["key"][i_jakso]] = int(row["values"][0])

    lines = [
        "/**",
        " * Omakoti- ja paritalojen määrä kunnittain valmistumisvuoden mukaan.",
        " * GENEROITU TIEDOSTO: älä muokkaa käsin, aja `python3 scripts/paivita_rakennuskanta.py`.",
        " *",
        f" * Lähde: Tilastokeskus, rakennuskanta {vuosi}, taulukko 15er (CC BY 4.0).",
        " */",
        "export interface CityHousingStats {",
        "  /** Omakoti- ja paritaloja yhteensä. */",
        "  yhteensa: number;",
        *[f"  {k}: number;" for _, k in JAKSOT],
        "}",
        "",
        f'export const HOUSING_STATS_YEAR = "{vuosi}";',
        'export const HOUSING_STATS_SOURCE_URL = "https://pxdata.stat.fi/PxWeb/pxweb/fi/StatFin/StatFin__raku/15er.px/";',
        'export const HOUSING_STATS_SOURCE_LABEL = `Tilastokeskus, rakennuskanta ${HOUSING_STATS_YEAR}`;',
        "",
        "export const cityHousingStats: Record<string, CityHousingStats> = {",
    ]
    for slug in KUNNAT:
        o = out[slug]
        assert sum(o[j] for j, _ in JAKSOT) == o["SSS"], slug
        fields = ", ".join([f"yhteensa: {o['SSS']}"] + [f"{k}: {o[j]}" for j, k in JAKSOT])
        lines.append(f'  "{slug}": {{ {fields} }},')
    lines += ["};", "", "export const getCityHousingStats = (slug: string): CityHousingStats | undefined => cityHousingStats[slug];", ""]
    Path(__file__).resolve().parent.parent.joinpath("src/data/cityHousingStats.ts").write_text("\n".join(lines), encoding="utf-8")
    print(f"Kirjoitettu src/data/cityHousingStats.ts ({len(KUNNAT)} kuntaa, vuosi {vuosi})")

if __name__ == "__main__":
    main()
