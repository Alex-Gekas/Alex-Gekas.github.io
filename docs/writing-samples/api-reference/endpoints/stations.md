---
layout: default
title: "Stations"
parent: "Endpoints"
nav_order: 5
---

# Get Observation Stations

## `GET /stations`

## Overview

Returns metadata for official NWS observation stations. Use it to discover stations near an area by state, then follow each station’s links for observations. Returns metadata for official NWS observation stations.

## Headers & Auth

`User-Agent` (required): A string identifying your app and contact (for example, MyWeatherApp/1.0 (me@myweatherapp.com).

`Accept` (recommended): application/geo+json

`Authorization`: Not required.

## HTTP Requests

To return a list of stations:
`GET https://api.weather.gov/stations`

For a specific station:
`GET https://api.weather.gov/stations/{stationId}`

## Path Parameters

(for `GET /stations/{stationId}`)

| Name        | Type   | Required | Constraints                                      | Example |
| ----------- | ------ | -------: | ------------------------------------------------ | ------- |
| `stationId` | string |        ✓ | 3–4 letter ICAO/FAA (for example, KPHL) or other NWS id | `KBUF`  |

## Query parameters

| Name        | Type          | Required | Default | Constraints                                    | Example                                               |
| ----------- | ------------- | -------: | ------- | ---------------------------------------------- | ----------------------------------------------------- |
| `state`     | string or CSV |          |         | One or more US state codes                     | `state=NY` or `state=OK,TX` ([zenpacks.zenoss.io][1]) |
| `bbox`      | string        |          |         | `west,south,east,north` (WGS84)                | `bbox=-79.9,42.4,-78.2,43.4` *(example format)*       |
| `limit`     | integer       |          | 25      | Max **500** per request                        | `limit=200` ([GitHub][2])                             |
| `cursor`    | string        |          |         | Use value from server to paginate to next page | `cursor=…`                                            |
| `stationId` | string or CSV |          |         | Filter to one or more known ids                | `stationId=KBUF,KIAG`                                 |
                             |

## Example requests

cURL—list stations in New York (first 100)

```bash
curl -s "https://api.weather.gov/stations?state=NY&limit=100" 
  -H "User-Agent: MyWeatherApp/1.0 (me@myweatherapp.com)" 
  -H "Accept: application/geo+json"
```
JavaScript (Node)—get one station and its latest obs link
```bash
import fetch from "node-fetch";

const ua = "MyWeatherApp/1.0 (me@myweatherapp.com)";
const r = await fetch("https://api.weather.gov/stations/KBUF", {
  headers: { "User-Agent": ua, "Accept": "application/geo+json" }
});
if (!r.ok) throw new Error(`HTTP ${r.status}`);
const station = await r.json();
// You can then call: GET /stations/KBUF/observations/latest
console.log(station.properties.stationIdentifier, station.properties.name);
```

## Example responses

200 OK—GET /stations?state=NY&limit=2 (truncated)

??? example "✅ 200 OK—GET /stations?state=NY&limit=2"

    ```json
    {
      "type": "FeatureCollection",
      "features": [
        {
          "id": "https://api.weather.gov/stations/KBUF",
          "type": "Feature",
          "geometry": { "type": "Point", "coordinates": [-78.735, 42.940] },
          "properties": {
            "stationIdentifier": "KBUF",
            "name": "Buffalo Niagara Intl Airport",
            "timeZone": "America/New_York",
            "elevation": { "unitCode": "wmoUnit:m", "value": 221.0 }
          }
        },
        {
          "id": "https://api.weather.gov/stations/KIAG",
          "type": "Feature",
          "geometry": { "type": "Point", "coordinates": [-78.946, 43.107] },
          "properties": {
            "stationIdentifier": "KIAG",
            "name": "Niagara Falls Intl Airport",
            "timeZone": "America/New_York",
            "elevation": { "unitCode": "wmoUnit:m", "value": 180.0 }
          }
        }
      ]
    }
    ```
200 OK - `GET /stations?state=NY&limit=2`(truncated)
??? example "✅ 200 OK—Example Response"

    ```json
    {
      "type": "FeatureCollection",
      "features": [
        {
          "id": "https://api.weather.gov/stations/KBUF",
          "type": "Feature",
          "geometry": { "type": "Point", "coordinates": [-78.735, 42.940] },
          "properties": {
            "stationIdentifier": "KBUF",
            "name": "Buffalo Niagara Intl Airport",
            "timeZone": "America/New_York",
            "elevation": { "unitCode": "wmoUnit:m", "value": 221.0 }
          }
        },
        {
          "id": "https://api.weather.gov/stations/KIAG",
          "type": "Feature",
          "geometry": { "type": "Point", "coordinates": [-78.946, 43.107] },
          "properties": {
            "stationIdentifier": "KIAG",
            "name": "Niagara Falls Intl Airport",
            "timeZone": "America/New_York",
            "elevation": { "unitCode": "wmoUnit:m", "value": 180.0 }
          }
        }
      ]
    }
    ```
200 OK—GET /stations/KBUF (truncated)

??? example "✅ 200 OK—GET /stations/KBUF"

    ```json
    {
      "id": "https://api.weather.gov/stations/KBUF",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [-78.735, 42.940] },
      "properties": {
        "stationIdentifier": "KBUF",
        "name": "Buffalo Niagara Intl Airport",
        "timeZone": "America/New_York",
        "elevation": { "unitCode": "wmoUnit:m", "value": 221.0 }
      }
    }
    ```
400 Bad Request—invalid bbox
```bash
{
  "correlationId": "…",
  "title": "Bad Request",
  "type": "https://api.weather.gov/problems/BadRequest",
  "detail": "bbox must be west,south,east,north (WGS84)"
}
```
403 Forbidden—missing User-Agent
```bash
{
  "title": "Access denied",
  "detail": "A valid User-Agent header is required."
}
```
404 Not Found—unknown station
```bash
{
  "title": "Not Found",
  "detail": "Station KZZZ was not found."
}
```
## Response fields

??? example "📘 Response Fields—GET /stations"


    | Field                           | Type         | Description                                                                                                                                               |
    | ------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `type`                          | string       | GeoJSON type (`FeatureCollection` or `Feature`). ([National Weather Service][1])                                                                          |
    | `features[]`                    | array        | List of station features (for collection responses).                                                                                                      |
    | `id`                            | string (URL) | Canonical URL for this station resource.                                                                                                                  |
    | `geometry.type`                 | string       | Always `Point` for station features.                                                                                                                      |
    | `geometry.coordinates`          | number[2]    | `[lon, lat]` in WGS84.                                                                                                                                    |
    | `properties.stationIdentifier`  | string       | Station ID (for example, `KBUF`).                                                                                                                                |
    | `properties.name`               | string       | Human-readable station name. *(Added to observations “latest” per 2025 SCN; often present on station resources as well.)* ([National Weather Service][2]) |
    | `properties.timeZone`           | string       | IANA time zone for the station.                                                                                                                           |
    | `properties.elevation.unitCode` | string       | Unit per WMO code list (for example, `wmoUnit:m`).                                                                                                               |
    | `properties.elevation.value`    | number       | Elevation value in meters.                                                                                                                                |

## Status codes

| Code | Meaning      | What to do                                                    |
| ---: | ------------ | ------------------------------------------------------------- |
|  200 | OK           |—                                                            |
|  400 | Bad Request  | Check parameter shapes (for example, `bbox` order/format).           |
|  403 | Forbidden    | Add a valid `User-Agent` header. ([weather-gov.github.io][1]) |
|  404 | Not Found    | Verify `stationId`.                                           |
|  5xx | Server error | Retry with backoff; respect rate limits.                      |

## Notes & tips

**Pagination**: Use limit (max 500) and the server-provided paging mechanism (cursor / “next” link) to iterate through large result sets. 
GitHub

**Discoverability**: From /points/{lat},{lon} you can follow observationStations to the list of nearby stations for that gridpoint.

**Next:** [ Endpoints: Zones →](./zones.md)