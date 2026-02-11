# BadWebsites API

[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Chatujme/BadWebsites/issues)
[![Daily Update](https://github.com/Chatujme/BadWebsites/actions/workflows/update-badwebsites.yml/badge.svg)](https://github.com/Chatujme/BadWebsites/actions/workflows/update-badwebsites.yml)

[English version](README_EN.md)

Veřejně dostupná REST API databáze dezinformačních, konspiračních a jinak sporných webů v českém a slovenském prostoru. Databáze aktuálně obsahuje **1 500+** domén.

## Zdroje dat

| Zdroj | Typ | Domén |
|-------|-----|-------|
| [nfnz.cz](https://www.nfnz.cz) | Junk news, dezinformace | ~1 230 |
| [konspiratori.sk](https://konspiratori.sk) | Konspirace, propaganda | ~316 |
| [nelez.cz](https://nelez.cz) | Dezinformace | ~51 |
| [cs.wikipedia.org](https://cs.wikipedia.org/wiki/Seznam_dezinforma%C4%8Dn%C3%ADch_web%C5%AF_v_%C4%8De%C5%A1tin%C4%9B) | Seznam dezinformačních webů | ~17 |
| [hlidacipes.org](https://hlidacipes.org) | Investigativní zdroj | ~14 |
| [manipulatori.cz](https://manipulatori.cz) | Fact-checking | ~4 |
| [investigace.cz](https://www.investigace.cz) | Investigativní zdroj | ~3 |

Weby jsou do databáze přidávány také na základě sledování četnosti příspěvků ve veřejných diskuzích na platformě [Chatujme.cz](https://chatujme.cz) a následné analýzy zdrojů, včetně odkazů na Telegramové skupiny (např. neCT24).

Zdrojová data: [`data/source.json`](data/source.json) (automaticky aktualizováno denně)

## Disclaimer

Tato API poskytuje informace v dobré víře na základě veřejně dostupných údajů. Nepřebírá žádnou odpovědnost za přesnost, úplnost nebo aktuálnost dat. Uživatelé jsou povinni si informace ověřit sami a využívají je na vlastní nebezpečí.

---

## API dokumentace

**Base URL:** `https://api.chatujme.cz`

### GET /bad-websites/list

Vrátí kompletní seznam všech sporných webů.

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

Ověří konkrétní URL/domény vůči databázi. Přijímá pole URL adres nebo domén a vrací pouze nalezené shody.

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
| `id` | number | Unikátní identifikátor záznamu |
| `domain` | string | Doména webu |
| `source` | string[] | Seznam zdrojů, které web evidují |
| `category` | string[] | Kategorie obsahu webu |
| `source_link` | string[] | Přímé odkazy na profily webu u zdrojů |

### Kategorie

| Kategorie | Popis |
|-----------|-------|
| `junk news` | Weby s nekvalitními zprávami, PR / zaplacený obsah |
| `disinformation` | Šíření dezinformací |
| `conspiracy` | Konspirační teorie |
| `pro-kremlin` | Pro-kremelská propaganda |
| `anti system` | Protisystémové postoje |
| `health` | Nespolehlivý zdravotní obsah |
| `anti-islamic` | Antiislámský obsah |
| `deep state` | Teorie o hlubokém státu |
| `nwo` | Teorie o Novém světovém řádu |
| `ezotheric` | Ezoterický obsah |
| `aggregator` | Agregátor bez originálního obsahu |
| `hoax` | Šíření hoaxů a nepravdivých zpráv |
| `violence` | Podpora násilí |
| `biased` | Zaujatý obsah |
| `homophobic` | Homofobní obsah |
| `historic conspiracy` | Historické konspirační teorie |
| `anti-catholic` | Anti-katolický obsah |
| `food` | Nespolehlivý obsah o jídle |

---

## Klienti

### TypeScript

Viz [`client.ts`](client.ts) - typovaný klient s plnou podporou TypeScript.

```typescript
import { BadWebsitesClient } from './client';

const client = new BadWebsitesClient();

// Kompletní seznam
const all = await client.getAll();
console.log(`Celkem ${all.length} domén`);

// Ověření konkrétní URL
const results = await client.check([
  'https://ac24.cz',
  'https://cz24.news/clanek'
]);

for (const site of results) {
  console.log(`${site.domain}: ${site.category.join(', ')}`);
}

// Filtrování podle kategorie
const kremlin = await client.getByCategory('pro-kremlin');
```

### JavaScript (jQuery + Bootstrap 3)

Viz [`simple_js_client.js`](simple_js_client.js) - inline varování u odkazů na webové stránce pomocí popoverů.

---

## Automatická aktualizace

Data v `data/source.json` se aktualizují denně v 02:00 UTC přes [GitHub Actions](.github/workflows/update-badwebsites.yml).

Manuální aktualizace: `./update.sh`

## Přispívání

PR jsou vítány. U nových domén je nutné doložit zdroj (odkaz na profil u nfnz.cz, konspiratori.sk apod.).

## Licence

MIT
