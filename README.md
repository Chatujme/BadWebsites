# BadWebsites

## API Dokumentace

## Obsah
[GET /bad-websites/list](#get-bad-websiteslist)\
[GET /bad-websites/detail](#get-bad-websitesdetailidid)

### GET /bad-websites/list

Získání seznamu zakázaných webů.

**Metoda:** GET  
**URL:** `<host>/bad-websites/list`

#### Možné hodnoty pro `category`

Atribut `category` může nabývat následujících hodnot:

- `junk news` - stránky s nekvalitními, zkreslenými nebo falešnými zprávami
- `disinformation` - stránky šířící dezinformace
- `conspiracy` - stránky propagující konspirační teorie
- `violation` - stránky porušující zásady či pravidla
- `health` - stránky s nespolehlivými informacemi o zdraví
- `pro-kremlin` - prokremlínské stránky
- `anti system` - stránky s protisystémovými postoji
- `nwo` - stránky propagující teorii o Novém světovém řádu
- `anti-islamic` - antiislámské stránky
- `deep state` - stránky propagující teorii o "hlubokém státu"
- `ezotheric` - ezoterické stránky
- `aggregator` - agregátory obsahu bez vlastního originálního obsahu
- `homophobic` - homofobní stránky
- `hoax` - stránky šířící nepravdivé zprávy a hoax
- `violence` - stránky podporující násilí
- `biased` - zaujaté stránky
- `historic conspiracy` - stránky s historickými konspiračními teoriemi
- `anti-catholic` - anti-katolické stránky
- `food` - stránky s problematickým nebo nespolehlivým obsahem o jídle

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
