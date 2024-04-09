# BadWebsites

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

## API Dokumentace

## Obsah
[GET /bad-websites/list](#get-bad-websiteslist)\
[GET /bad-websites/detail](#get-bad-websitesdetailidid)

### GET /bad-websites/list

Získání seznamu sporných webů.

**Metoda:** GET  
**URL:** `https://api.chatujme.cz/bad-websites/list`

`domain[]=<domain>` - Pole hodnot pro vyhledani konkretnich domen v seznamu\
`fullUrl=1` - Volba pro rozsirene odpovedi o pole `source_link` obsahujici konkretni url zdroje

#### Možné hodnoty pro `category`

Atribut `category` může nabývat následujících hodnot:

- `junk news` - stránky s nekvalitními zprávami převážně tvořené PR (zaplacenými) články
- `disinformation` - zprávy šířící dezinformace
- `conspiracy` - zprávy propagující konspirační teorie
- `health` - zprávy s nespolehlivými informacemi o zdraví
- `pro-kremlin` - pro-kremelské zprávy
- `anti system` - zprávy s protisystémovými postoji
- `nwo` - zprávy propagující teorii o Novém světovém řádu
- `anti-islamic` - antiislámské zprávy
- `deep state` - zprávy propagující teorii o "hlubokém státu" / spiknutí
- `ezotheric` - ezoterické zprávy
- `aggregator` - agregátory obsahu bez vlastního originálního obsahu
- `homophobic` - homofobní zprávy
- `hoax` - stránky šířící nepravdivé zprávy a hoax
- `violence` - zprávy podporující násilí a vulgaritu
- `biased` - zaujaté zprávy
- `historic conspiracy` - zprávy s historickými konspiračními teoriemi
- `anti-catholic` - anti-katolické zprávy
- `food` - zprávy s problematickým nebo nespolehlivým obsahem o jídle

#### Response

```json
[
  {
    "id": 1,
    "domain": "example.com",
    "source": ["www.nfnz.cz"],
    "category": ["junk news"]
  },
  {
    "id": 2,
    "domain": "anotherexample.com",
    "source": ["www.nfnz.cz", "konspiratori.sk"],
    "category": ["conspiracy", "disinformation"]
  }
]
