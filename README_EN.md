# BadWebsites
[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

Public API for obtaining information on whether a URL is listed on any of the publicly available lists of disinformation or otherwise contentious websites. Primary verification sources include [nfnz.cz](https://nfnz.cz), [konspiratori.sk](https://konspiratori.sk), [nelez.cz](https://nelez.cz), [manipulatori.cz](https://manipulatori.cz), and [investigace.cz](https://investigace.cz).\
Websites are added to the API database not only based on the aforementioned lists but also based on monitoring the frequency of posts in public discussions on the Chatujme.cz platform and subsequent source analysis, including links to Telegram groups, such as neCT24 and others.
The source data used by the API can be found in [source.json](data/source.json).

## Disclaimer
This API provides information in good faith and based on available data. We do not assume any responsibility for the accuracy, completeness, or timeliness of the provided data. \
Users are required to verify the accuracy and correctness of the information themselves and to use it at their own risk. \

## Feel free PR
If you find any inaccuracies or missing data, we welcome your contributions. Please submit the desired changes or additions via pull requests (PR).

## API Documentation

### Index
[GET /bad-websites/list](#get-bad-websiteslist)\
[POST /bad-websites/list](#post-bad-websiteslist)


#### GET /bad-websites/list

Retrieve a list of contentious websites.

**Method:** GET  \
**URL:** `https://api.chatujme.cz/bad-websites/list`

##### Possible values for `category`

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
- `food` - news featuring problematic or unreliable content about food

##### Response

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

#### POST /bad-websites/list
Retrieve a list of contentious websites based on a filter in the request body.

**Method:** POST \
**URL:** `https://api.chatujme.cz/bad-websites/list`

#### Request JSON body

```json
{ "domains":
  [
    "https://ac24.cz",
    "https://cz24.news/zbytocne-ludstvo-popredny-ekonom-varuje-ze-takmer-vsetky-ludske-profesie-nahradi-umela-inteligencia/"
  ]
}
```

##### Response JSON
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



