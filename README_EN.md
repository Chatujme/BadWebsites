# BadWebsites API

[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Chatujme/BadWebsites/issues)
[![Daily Update](https://github.com/Chatujme/BadWebsites/actions/workflows/update-badwebsites.yml/badge.svg)](https://github.com/Chatujme/BadWebsites/actions/workflows/update-badwebsites.yml)

[Czech version](README.md)

Publicly available REST API database of disinformation, conspiracy and otherwise contentious websites in the Czech and Slovak space. The database currently contains **1 500+** domains.

## Data Sources

| Source | Type | Domains |
|--------|------|---------|
| [nfnz.cz](https://www.nfnz.cz) | Junk news, disinformation | ~1 230 |
| [konspiratori.sk](https://konspiratori.sk) | Conspiracy, propaganda | ~316 |
| [nelez.cz](https://nelez.cz) | Disinformation | ~51 |
| [cs.wikipedia.org](https://cs.wikipedia.org/wiki/Seznam_dezinforma%C4%8Dn%C3%ADch_web%C5%AF_v_%C4%8De%C5%A1tin%C4%9B) | Disinformation website list | ~17 |
| [hlidacipes.org](https://hlidacipes.org) | Investigative source | ~14 |
| [manipulatori.cz](https://manipulatori.cz) | Fact-checking | ~4 |
| [investigace.cz](https://www.investigace.cz) | Investigative source | ~3 |

Websites are also added to the database based on monitoring the frequency of posts in public discussions on the [Chatujme.cz](https://chatujme.cz) platform and subsequent source analysis, including links to Telegram groups (e.g. neCT24).

Source data: [`data/source.json`](data/source.json) (automatically updated daily)

## Disclaimer

This API provides information in good faith based on publicly available data. It assumes no responsibility for the accuracy, completeness, or timeliness of the data. Users are required to verify information themselves and use it at their own risk.

---

## API Documentation

**Base URL:** `https://api.chatujme.cz`

### GET /bad-websites/list

Returns the complete list of all contentious websites.

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

Checks specific URLs/domains against the database. Accepts an array of URLs or domains and returns only found matches.

```bash
curl -X POST https://api.chatujme.cz/bad-websites/list \
  -H "Content-Type: application/json" \
  -d '{"domains": ["https://ac24.cz", "https://cz24.news/article"]}'
```

#### Request

```json
{
  "domains": [
    "https://ac24.cz",
    "https://cz24.news/some-article-example"
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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique record identifier |
| `domain` | string | Website domain |
| `source` | string[] | List of sources that track the website |
| `category` | string[] | Content categories of the website |
| `source_link` | string[] | Direct links to the website's profiles at the sources |

### Categories

| Category | Description |
|----------|-------------|
| `junk news` | Websites with low-quality news, PR / paid content |
| `disinformation` | Spreading disinformation |
| `conspiracy` | Conspiracy theories |
| `pro-kremlin` | Pro-Kremlin propaganda |
| `anti system` | Anti-system attitudes |
| `health` | Unreliable health content |
| `anti-islamic` | Anti-Islamic content |
| `deep state` | Deep state theories |
| `nwo` | New World Order theories |
| `ezotheric` | Esoteric content |
| `aggregator` | Aggregator without original content |
| `hoax` | Spreading hoaxes and false news |
| `violence` | Promotion of violence |
| `biased` | Biased content |
| `homophobic` | Homophobic content |
| `historic conspiracy` | Historical conspiracy theories |
| `anti-catholic` | Anti-Catholic content |
| `food` | Unreliable food-related content |

---

## Clients

### TypeScript

See [`client.ts`](client.ts) - typed client with full TypeScript support.

```typescript
import { BadWebsitesClient } from './client';

const client = new BadWebsitesClient();

// Complete list
const all = await client.getAll();
console.log(`Total ${all.length} domains`);

// Check specific URL
const results = await client.check([
  'https://ac24.cz',
  'https://cz24.news/article'
]);

for (const site of results) {
  console.log(`${site.domain}: ${site.category.join(', ')}`);
}

// Filter by category
const kremlin = await client.getByCategory('pro-kremlin');
```

### JavaScript (jQuery + Bootstrap 3)

See [`simple_js_client.js`](simple_js_client.js) - inline warnings for links on a web page using popovers.

---

## Automatic Updates

Data in `data/source.json` is updated daily at 02:00 UTC via [GitHub Actions](.github/workflows/update-badwebsites.yml).

Manual update: `./update.sh`

## Contributing

PRs are welcome. For new domains, a source must be provided (link to profile at nfnz.cz, konspiratori.sk, etc.).

## License

MIT
