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

- `junk news` - websites with low-quality news mostly comprised of PR (paid) articles
- `disinformation` - reports spreading disinformation
- `conspiracy` - reports promoting conspiracy theories
- `health` - reports with unreliable health information
- `pro-kremlin` - pro-Kremlin reports
- `anti system` - reports with anti-system stances
- `nwo` - reports promoting the New World Order theory
- `anti-islamic` - anti-Islamic reports
- `deep state` - reports promoting the "deep state" conspiracy theory
- `ezotheric` - esoteric reports
- `aggregator` - content aggregators without original content
- `homophobic` - homophobic reports
- `hoax` - websites spreading false news and hoaxes
- `violence` - reports supporting violence and vulgarity
- `biased` - biased reports
- `historic conspiracy` - reports with historical conspiracy theories
- `anti-catholic` - anti-Catholic reports
- `food` - reports with problematic or unreliable content about food

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
