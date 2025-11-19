---
layout: default
title: "Grid Points"
parent: "Endpoints"
nav_order: 3
---

## Get Forecast by Gridpoint

## `GET /gridpoints/{office}/{gridX},{gridY}`

Returns gridpoint metadata for a specific National Weather Service (NWS) forecast grid cell, including links to the 7-day forecast, hourly forecast, grid forecast data, local time zone, nearest observation stations, and a relative location.
Use this to look up the correct forecast endpoints for a latitude/longitude you’ve mapped to an NWS office and grid coordinates.

Use after converting `lat/lon` to office and grid (via `/points/{lat},{lon}`), call this to retrieve the forecast URLs and context for that grid.


## HTTP request

`GET https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}`


## Headers & Auth

`User-Agent` (required): A string identifying your app and contact (for example, MyWeatherApp/1.0 (me@myweatherapp.com).

`Accept` (recommended): application/geo+json

`Authorization`: Not required.

## Path Parameters

| Name      | Description                           | Required | Example |
|-----------|---------------------------------------|----------|---------|
| `office`  | NWS Forecast Office ID                | Yes      | `BUF`   |
| `gridX`   | X coordinate in the forecast grid     | Yes      | `45`    |
| `gridY`   | Y coordinate in the forecast grid     | Yes      | `30`    |

---

## Example Request (cURL)

```bash
curl -s 
  -H "User-Agent: MyWeatherApp/1.0 (your-email@example.com)" 
  -H "Accept: application/geo+json" 
  "https://api.weather.gov/gridpoints/PHI/40,74"
```

## Example Request (JavaScript)

```JavaScript
const url = "https://api.weather.gov/gridpoints/PHI/40,74";
const res = await fetch(url, {
  headers: {
    "User-Agent": "MyWeatherApp/1.0 (your-email@example.com)",
    "Accept": "application/geo+json"
  }
});
if (!res.ok) throw new Error(`NWS error ${res.status}`);
const data = await res.json();
console.log(data.properties.forecast);       // 7-day forecast URL
console.log(data.properties.forecastHourly); // hourly forecast URL
```

## Example Responses (truncated)

??? example "Success 200 OK—Forecast for a Gridpoint for an NWS Office"
    ```json
    {
      "@context": [
        "https://geojson.org/geojson-ld/geojson-context.jsonld",
        { "wx": "https://api.weather.gov/ontology#",
          "s": "https://schema.org/",
          "unit": "http://codes.wmo.int/common/unit/"
        }
      ],
      "id": "https://api.weather.gov/gridpoints/PHI/40,74",
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-74.90,40.08],[-74.83,40.08],[-74.83,40.02],[-74.90,40.02],[-74.90,40.08]]]
      },
      "properties": {
        "forecastOffice": "https://api.weather.gov/offices/PHI",
        "gridId": "PHI",
        "gridX": 40,
        "gridY": 74,
        "timeZone": "America/New_York",
        "elevation": { "value": 12.0, "unitCode": "unit:m" },
        "relativeLocation": {
          "type": "Feature",
          "geometry": { "type": "Point", "coordinates": [ -74.86, 40.07 ] },
          "properties": {
            "city": "Burlington Township",
            "state": "NJ",
            "distance": { "value": 4100.0, "unitCode": "unit:m" },
            "bearing": { "value": 210.0, "unitCode": "unit:degree" }
          }
        },
        "forecast": "https://api.weather.gov/gridpoints/PHI/40,74/forecast",
        "forecastHourly": "https://api.weather.gov/gridpoints/PHI/40,74/forecast/hourly",
        "forecastGridData": "https://api.weather.gov/gridpoints/PHI/40,74",
        "observationStations": "https://api.weather.gov/gridpoints/PHI/40,74/stations"
      }
    }
    ```
??? example "404 Not Found (invalid office or out-of-rangfor exampleid coordinates)"
    ```json
    {
      "correlationId": "b8b1c9af-2b7e-4e3b-9f8a-1e8a8f2f5abc",
      "title": "Not Found",
      "type": "https://api.weather.gov/problems/NotFound",
      "status": 404,
      "detail": "Gridpoint not found for office 'PHI' at gridX=4000, gridY=7400."
    }
    ```
## Common Status Codes

| Code | Meaning                             |
|------|-------------------------------------|
| 200  | OK–Request was successful.        |
| 400  | Bad Request–Invalid grid values.  |
| 404  | Not Found–Office or grid not found. |

➡️ See [HTTP Status Codes](../concepts/status-codes.md) for a full reference.
## Notes

- Gridpoints are assigned to local NWS Forecast Offices (WFOs). For a list of WFOs, please see the **Additional Resources** section. [add link and page]
- The `gridX` and `gridY` values define a cell in the WFO's forecast grid.
- You can get these values by calling the [`/points/{lat},{lon}`](./forecast.md) endpoint first.
- The forecast response includes time-segmented periods (day, night, etc.), each with **temperature**, **wind speed**,and **forecast description**.
- The endpoint path may be extended to include `/forecast/hourly` for hourly forecasts.
- For more details on thfor exampleid system, see [Gridpoints Explained](./key-concepts/geolocation/#forecast-coverage-areas).

👉**Next:** [ Endpoints: Points (lat & lon) →](./points.md)