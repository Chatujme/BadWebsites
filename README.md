# BadWebsites

Veřejná API pro získání informací zda url se nenachází na nějakém z veřejných seznamů dezinformačních nebo jinak sporných webů. Primární ověřovací zdroje jsou [nfnz.cz](https://nfnz.cz), [konspiratori.sk](https://konspiratori.sk), [nelez.cz](https://nelez.cz), [manipulatori.cz](https://manipulatori.cz) a [investigace.cz](https://investigace.cz).\
Weby jsou do API databáze přidány nejen na základě uvedených seznamů, ale také na základě sledování četnosti příspěvků veřejných diskuzí na platformě Chatujme.cz a následné analýzy zdrojů, včetně odkazů na Telegramové skupiny, jako je například neCT24 a další.

## Disclaimer
Tato API poskytuje informace v dobré víře a na základě dostupných údajů. Nepřebíráme žádnou odpovědnost za přesnost, úplnost nebo aktuálnost poskytnutých dat. \
Uživatelé jsou povinni prověřit aktuálnost a správnost informací sami, a využít je pouze na vlastní nebezpečí. \
Pokud naleznete nějakou nepřesnost nebo chybějící data, rádi je přijmeme. Prosím, přidejte požadované změny nebo doplňky pomocí pull requestů (PR). \
Děkujeme za vaši spolupráci!

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

## API Dokumentace

## Obsah
[GET /bad-websites/list](#get-bad-websiteslist)\
[POST /bad-websites/list](#post-bad-websiteslist)


### GET /bad-websites/list

Získání seznamu sporných webů.

**Metoda:** GET  
**URL:** `https://api.chatujme.cz/bad-websites/list`

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
    "source": ["www.example2.com"],
    "category": ["junk news"],
    "source_link": [
      "https://www.example2.com/path"
    ]
  },
  {
    "id": 2,
    "domain": "anotherexample.com",
    "source": ["www.nfnz.cz", "konspiratori.sk"],
    "category": ["conspiracy", "disinformation"]
    "source_link": [
      "https://konspiratori.sk/stranka/xxxx",
      "https://www.nfnz.cz/konspiracni-server-xxxxx/"
    ]
  }
]
```

### POST /bad-websites/list
Získání seznamu sporných webů na zaklade filtru v body.
#### Request JSON body

```json
{ "domains":
  [
    "https://ac24.cz",
    "https://cz24.news/zbytocne-ludstvo-popredny-ekonom-varuje-ze-takmer-vsetky-ludske-profesie-nahradi-umela-inteligencia/"
  ]
}
```

#### Response JSON
```json
[
    {
        "id": 1418,
        "domain": "cz24.news",
        "source": [
            "nelez.cz",
            "konspiratori.sk",
            "www.nfnz.cz"
        ],
        "category": [
            "anti system",
            "disinformation",
            "health",
            "deep state"
        ],
        "source_link": [
            "https://nelez.cz/csv.php",
            "https://konspiratori.sk/stranka/720",
            "https://www.nfnz.cz/konspiracni-server-cz-24-news/"
        ]
    },
    {
        "id": 1345,
        "domain": "ac24.cz",
        "source": [
            "nelez.cz",
            "konspiratori.sk",
            "www.nfnz.cz"
        ],
        "category": [
            "anti system",
            "conspiracy",
            "nwo",
            "pro-kremlin",
            "health",
            "deep state"
        ],
        "source_link": [
            "https://nelez.cz/csv.php",
            "https://konspiratori.sk/stranka/6",
            "https://www.nfnz.cz/konspiracni-server-ac24/"
        ]
    }
]
```



