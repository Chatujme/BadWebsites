# BadWebsites

## API Documentation

## Table of Contents
[GET /bad-websites/list](#get-bad-websiteslist)\
[GET /bad-websites/detail](#get-bad-websitesdetailidid)

### GET /bad-websites/list

Retrieve a list of banned websites.

**Method:** GET  
**URL:** `<host>/bad-websites/list`

#### Possible values for `category`

The `category` attribute can take the following values:

- `junk news` - sites with poor-quality, distorted, or fake news
- `disinformation` - sites spreading disinformation
- `conspiracy` - sites promoting conspiracy theories
- `violation` - sites violating guidelines or rules
- `health` - sites with unreliable health information
- `pro-kremlin` - pro-Kremlin sites
- `anti system` - sites with anti-system stances
- `nwo` - sites promoting New World Order theories
- `anti-islamic` - anti-Islamic sites
- `deep state` - sites promoting the deep state theory
- `ezotheric` - esoteric sites
- `aggregator` - content aggregators without original content
- `homophobic` - homophobic sites
- `hoax` - sites spreading false news and hoaxes
- `violence` - sites supporting violence
- `biased` - biased sites
- `historic conspiracy` - sites with historical conspiracy theories
- `anti-catholic` - anti-Catholic sites
- `food` - sites with problematic or unreliable content about food

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
