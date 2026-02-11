# BadWebsites API

[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Chatujme/BadWebsites/issues)
[![Daily Update](https://github.com/Chatujme/BadWebsites/actions/workflows/update-badwebsites.yml/badge.svg)](https://github.com/Chatujme/BadWebsites/actions/workflows/update-badwebsites.yml)

[English version](README_EN.md)

Verejne dostupna REST API databaze dezinformacnich, konspiracnich a jinak spornych webu v ceskem a slovenskem prostoru. Databaze aktualne obsahuje **1 500+** domen.

## Zdroje dat

| Zdroj | Typ | Domen |
|-------|-----|-------|
| [nfnz.cz](https://www.nfnz.cz) | Junk news, dezinformace | ~1 230 |
| [konspiratori.sk](https://konspiratori.sk) | Konspirace, propaganda | ~316 |
| [nelez.cz](https://nelez.cz) | Dezinformace | ~51 |
| [cs.wikipedia.org](https://cs.wikipedia.org/wiki/Seznam_dezinforma%C4%8Dn%C3%ADch_web%C5%AF_v_%C4%8De%C5%A1tin%C4%9B) | Seznam dezinformacnich webu | ~17 |
| [hlidacipes.org](https://hlidacipes.org) | Investigativni zdroj | ~14 |
| [manipulatori.cz](https://manipulatori.cz) | Fact-checking | ~4 |
| [investigace.cz](https://www.investigace.cz) | Investigativni zdroj | ~3 |

Weby jsou do databaze pridavany take na zaklade sledovani cetnosti prispevku ve verejnych diskuzich na platforme [Chatujme.cz](https://chatujme.cz) a nasledne analyzy zdroju, vcetne odkazu na Telegramove skupiny (napr. neCT24).

Zdrojova data: [`data/source.json`](data/source.json) (automaticky aktualizovano denne)

## Disclaimer

Tato API poskytuje informace v dobre vire na zaklade verejne dostupnych udaju. Neprebira zadnou odpovednost za presnost, uplnost nebo aktualnost dat. Uzivatele jsou povinni si informace overit sami a vyuzivaji je na vlastni nebezpeci.

---

## API dokumentace

**Base URL:** `https://api.chatujme.cz`

### GET /bad-websites/list

Vrati kompletni seznam vsech spornych webu.

```bash
curl https://api.chatujme.cz/bad-websites/list
```

#### Response

```json
[
  {
    "id": 1345,
    "domain": "ac24.cz",
    "source": ["nelez.cz", "konspiratori.sk", "www.nfnz.cz"],
    "category": ["anti system", "conspiracy", "nwo", "pro-kremlin"],
    "source_link": [
      "https://nelez.cz/csv.php",
      "https://konspiratori.sk/stranka/6",
      "https://www.nfnz.cz/konspiracni-server-ac24/"
    ]
  }
]
```

### POST /bad-websites/list

Overi konkretni URL/domeny vuci databazi. Prijima pole URL adres nebo domen a vraci pouze nalezene shody.

```bash
curl -X POST https://api.chatujme.cz/bad-websites/list \
  -H "Content-Type: application/json" \
  -d '{"domains": ["https://ac24.cz", "https://cz24.news/clanek"]}'
```

#### Request

```json
{
  "domains": [
    "https://ac24.cz",
    "https://cz24.news/zbytocne-ludstvo-clanek-example"
  ]
}
```

#### Response

```json
[
  {
    "id": 1418,
    "domain": "cz24.news",
    "source": ["nelez.cz", "konspiratori.sk", "www.nfnz.cz"],
    "category": ["anti system", "disinformation", "health", "deep state"],
    "source_link": [
      "https://nelez.cz/csv.php",
      "https://konspiratori.sk/stranka/720",
      "https://www.nfnz.cz/konspiracni-server-cz-24-news/"
    ]
  },
  {
    "id": 1345,
    "domain": "ac24.cz",
    "source": ["nelez.cz", "konspiratori.sk", "www.nfnz.cz"],
    "category": ["anti system", "conspiracy", "nwo", "pro-kremlin", "health", "deep state"],
    "source_link": [
      "https://nelez.cz/csv.php",
      "https://konspiratori.sk/stranka/6",
      "https://www.nfnz.cz/konspiracni-server-ac24/"
    ]
  }
]
```

### Response fields

| Pole | Typ | Popis |
|------|-----|-------|
| `id` | number | Unikatni identifikator zaznamu |
| `domain` | string | Domena webu |
| `source` | string[] | Seznam zdroju, ktere web eviduji |
| `category` | string[] | Kategorie obsahu webu |
| `source_link` | string[] | Primé odkazy na profily webu u zdroju |

### Kategorie

| Kategorie | Popis |
|-----------|-------|
| `junk news` | Weby s nekvalitnimi zpravami, PR / zaplaceny obsah |
| `disinformation` | Sireni dezinformaci |
| `conspiracy` | Konspiracni teorie |
| `pro-kremlin` | Pro-kremelska propaganda |
| `anti system` | Protisystemove postoje |
| `health` | Nespolehlivy zdravotni obsah |
| `anti-islamic` | Antiislamsky obsah |
| `deep state` | Teorie o hlubokem statu |
| `nwo` | Teorie o Novem svetovem radu |
| `ezotheric` | Ezotericky obsah |
| `aggregator` | Agregator bez originalniho obsahu |
| `hoax` | Sireni hoaxu a nepravdivych zprav |
| `violence` | Podpora nasili |
| `biased` | Zaujaty obsah |
| `homophobic` | Homofobni obsah |
| `historic conspiracy` | Historicke konspiracni teorie |
| `anti-catholic` | Anti-katolicky obsah |
| `food` | Nespolehlivy obsah o jdle |

---

## Klienti

### TypeScript

Viz [`client.ts`](client.ts) - typovany klient s plnou podporou TypeScript.

```typescript
import { BadWebsitesClient } from './client';

const client = new BadWebsitesClient();

// Kompletni seznam
const all = await client.getAll();
console.log(`Celkem ${all.length} domen`);

// Overeni konkretni URL
const results = await client.check([
  'https://ac24.cz',
  'https://cz24.news/clanek'
]);

for (const site of results) {
  console.log(`${site.domain}: ${site.category.join(', ')}`);
}

// Filtrovani podle kategorie
const kremlin = await client.getByCategory('pro-kremlin');
```

### JavaScript (jQuery + Bootstrap 3)

Viz [`simple_js_client.js`](simple_js_client.js) - inline varovani u odkazu na webove strance pomoci popoveru.

---

## Automaticka aktualizace

Data v `data/source.json` se aktualizuji denne v 02:00 UTC pres [GitHub Actions](.github/workflows/update-badwebsites.yml).

Manualni aktualizace: `./update.sh`

## Prispivani

PR jsou vitany. U novych domen je nutne dolozit zdroj (odkaz na profil u nfnz.cz, konspiratori.sk apod.).

## Licence

MIT
