# BadWebsites

## API Documentation

## Table of Contents
[GET /bad-websites/list](#get-bad-websiteslist)\
[GET /bad-websites/detail](#get-bad-websitesdetailidid)

### GET /bad-websites/list

Retrieve a list of questionable websites.

**Method:** GET  
**URL:** `https://api.chatujme.cz/bad-websites/list`

#### Possible values for `category`

The `category` attribute can take the following values:

- `junk news` - websites filled with low-quality news, often consisting of PR (paid) content
- `disinformation` - news spreading disinformation
- `conspiracy` - news advocating for conspiracy theories
- `health` - news containing unreliable health information
- `pro-kremlin` - news favoring the Kremlin's perspectives
- `anti system` - news exhibiting anti-system views
- `nwo` - news advocating the theory of the New World Order
- `anti-islamic` - news with an anti-Islamic bias
- `deep state` - news promoting deep state conspiracy theories
- `ezotheric` - esoteric news
- `aggregator` - platforms aggregating content without providing original material
- `homophobic` - news displaying homophobic sentiment
- `hoax` - websites disseminating false news and hoaxes
- `violence` - news endorsing violence and vulgarity
- `biased` - news that is partial or biased
- `historic conspiracy` - news covering historical conspiracy theories
- `anti-catholic` - news with an anti-Catholic stance
- `food` - news featuring problematic or unreliable food-related content

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
