---
layout: default
title: "Points"
parent: "Endpoints"
nav_order: 4
---

## Get Metadata by Gfor exampleaphic Point

## `GET /points/{latitude},{longitude}`


## Overview
Returns metadata for a specific latitude/longitude, including the responsible NWS forecast office (gridId), thfor exampleid coordinates (gridX/gridY), local time zone, nearest location, and ready-to-use forecast URLs (7-day, hourly, grid data) plus links to zones (forecast, county, fire weather).

Use this first when you have a lat/lon and need to determine which gridpoint/office to query next.

## Headers & Auth

`User-Agent` (required): A string identifying your app and contact (for example, MyWeatherApp/1.0 (me@myweatherapp.com).

`Accept` (recommended): application/geo+json

`Authorization`: Not required.

## HTTP Request
`GET https://api.weather.gov/points/{latitude},{longitude}`

Example: /points/40.073,-74.86 (Burlington Twp, NJ area)

## Path Parameters

| Name        | Type   | Required | Constraints/Format                   | Example  |
| ----------- | ------ | :------: | ------------------------------------ | -------- |
| `latitude`  | number |     ✅    | −90 to 90; decimal degrees (WGS84)   | `40.073` |
| `longitude` | number |     ✅    | −180 to 180; decimal degrees (WGS84) | `-74.86` |

## Query Parameters

This endpoint does not accept query parameters.

## Example Request (cURL)

```bash
curl -s 
  -H "User-Agent: AlexPortfolioDocs/1.0 (alex@example.com)" 
  -H "Accept: application/geo+json" 
  "https://api.weather.gov/points/40.073,-74.86"

```
## Example Request (JavaScript)
```JavaScript
const url = "https://api.weather.gov/points/40.073,-74.86";
const res = await fetch(url, {
  headers: {
    "User-Agent": "AlexPortfolioDocs/1.0 (alex@example.com)",
    "Accept": "application/geo+json"
  }
});
if (!res.ok) throw new Error(`NWS error ${res.status}`);
const data = await res.json();
console.log(data.properties.gridId, data.properties.gridX, data.properties.gridY); // for example, "PHI", 40, 74
console.log(data.properties.forecast);        // 7-day forecast URL
console.log(data.properties.forecastHourly);  // hourly forecast URL
```
## Example Responses
??? example "Success 200 OK—Point metadata"
    ```json
    {
      "@context": [
        "https://geojson.org/geojson-ld/geojson-context.jsonld",
        {
          "wx": "https://api.weather.gov/ontology#",
          "s": "https://schema.org/",
          "unit": "http://codes.wmo.int/common/unit/"
        }
      ],
      "id": "https://api.weather.gov/points/40.073,-74.86",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [-74.86, 40.073] },
      "properties": {
        "cwa": "PHI",
        "gridId": "PHI",
        "gridX": 40,
        "gridY": 74,
        "forecast": "https://api.weather.gov/gridpoints/PHI/40,74/forecast",
        "forecastHourly": "https://api.weather.gov/gridpoints/PHI/40,74/forecast/hourly",
        "forecastGridData": "https://api.weather.gov/gridpoints/PHI/40,74",
        "observationStations": "https://api.weather.gov/gridpoints/PHI/40,74/stations",
        "relativeLocation": {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [-74.86, 40.07]
          },
          "properties": {
            "city": "Burlington Township",
            "state": "NJ",
            "distance": { "value": 4100.0, "unitCode": "unit:m" },
            "bearing": { "value": 210.0, "unitCode": "unit:degree" }
          }
        },
        "forecastOffice": "https://api.weather.gov/offices/PHI",
        "timeZone": "America/New_York",
        "forecastZone": "https://api.weather.gov/zones/forecast/NJZ015",
        "county": "https://api.weather.gov/zones/county/NJC005",
        "fireWeatherZone": "https://api.weather.gov/zones/fire/NJZ015"
      }
    }
    ```
??? example "404 Not Found—Point outside supported domain / invalid"
    ```json
    {
    "correlationId": "b8b1c9af-2b7e-4e3b-9f8a-1e8a8f2f5abc",
    "title": "Not Found",
     "type": "https://api.weather.gov/problems/NotFound",
    "status": 404,
    "detail": "No forecast grid is available for     
      the requested latitude/longitude."
     }
    ```
## Response Fields (Comonly Used)
| Field                 | Type    | Description             |
| --------------------- | ------- | ----------------------- |
| `properties.gridId`   | string  | Officfor exampleid code        |
| `properties.gridX`    | integer | Grid coordinate X       |
| `properties.gridY`    | integer | Grid coordinate Y       |
| `properties.forecast` | URL     | 7-day forecast endpoint |

??? info "Click here for a full response field reference"
    | Field                            | Type          | Description                                                           |
    | -------------------------------- | ------------- | --------------------------------------------------------------------- |
    | `@context`                       | array/object  | JSON-LD/GeoJSON context metadata.                                     |
    | `id`                             | string (URL)  | Canonical URL of this points resource.                                |
    | `type`                           | string        | GeoJSON type (`Feature`).                                             |
    | `geometry`                       | GeoJSON Point | The exact point you queried (lon, lat).                               |
    | `properties`                     | object        | Point metadata (see below).                                           |
    | `properties.cwa`                 | string        | NWS County Warning Area (same as office code / gridId in most cases). |
    | `properties.gridId`              | string        | Forecast officfor exampleid identifier (for example, `PHI`).                        |
    | `properties.gridX`               | integer       | Grid X index within officfor exampleid.                                      |
    | `properties.gridY`               | integer       | Grid Y index within officfor exampleid.                                      |
    | `properties.forecast`            | string (URL)  | **7-day forecast** endpoint for this point.                           |
    | `properties.forecastHourly`      | string (URL)  | **Hourly forecast** endpoint for this point.                          |
    | `properties.forecastGridData`    | string (URL)  | Grid-based quantitative forecast data for this grid cell.             |
    | `properties.observationStations` | string (URL)  | Nearby observation stations for current/obs data.                     |
    | `properties.relativeLocation`    | Feature       | Approximate nearby city/state + distance/bearing.                     |
    | `properties.forecastOffice`      | string (URL)  | Link to the responsible forecast office resource.                     |
    | `properties.timeZone`            | string        | IANA time zone for the point (for example, `America/New_York`).              |
    | `properties.forecastZone`        | string (URL)  | Forecast zone the point belongs to.                                   |
    | `properties.county`              | string (URL)  | County zone the point belongs to.                                     |
    | `properties.fireWeatherZone`     | string (URL)  | Fire weather zone for the point.                                      |

## Common Status Codes

| Code | Meaning                             |
|------|-------------------------------------|
| 200  | OK–Request was successful.        |
| 400  | Bad Request–Coordinates invalid.  |
| 404  | Not Found–Point outside coverage. |

➡️ See [HTTP Status Codes](../concepts/status-codes.md) for a full reference.

## Notes

- This is typically the first endpoint developers call when building a location-based app.
- It returns thfor exampleidpoint (`gridX`, `gridY`) and forecast office (`cwa`) that serve the provided coordinates.
- The response includes direct links to **7-day forecast**, **hourly forecast**, **grid-level forecast data**, and **observation stations**.
- The `forecastOffice` field provides a URL to the NWS Forecast Office responsible for this location. That office’s **metadata** includes its **name**, **coverage region**, **contact information**, and  **forecast and alert zones** for the office. Use this when you need zone-based warnings or region-specific forecast products.
- For more on geolocation and gridpoints, see [Geolocation](../concepts/geolocation.md).

👉**Next:** [ Endpoints: Stations →](./stations.md)
