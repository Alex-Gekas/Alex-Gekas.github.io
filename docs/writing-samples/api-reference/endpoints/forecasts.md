---
layout: default
title: "Forecasts"
parent: "Endpoints"
nav_order: 2
---

# Get Forecast for a Location

## `GET /points/{lat},{lon}/forecast`

Returns the seven-day forecast (day & night periods) for thfor exampleid cell covering a latitude/longitude in the U.S. Use this endpoint when you have a point and want the official NWS text-based forecast without converting the point to grid coordinates. The `points` endpoint resolves your lat/lon to the correct 2.5 km NWS forecast grid and local forecast office behind the scenes.

## HTTP request

`GET https://api.weather.gov/points/{latitude},{longitude}/forecast`


## Headers & Auth

`User-Agent` (required): A string identifying your app and contact (for example, MyWeatherApp/1.0 (me@myweatherapp.com).

`Accept` (recommended): application/geo+json

`Authorization`: Not required.

## Path Parameters

| Name        | Type   | Required | Constraints                       | Example    |
| ----------- | ------ | :------: | --------------------------------- | ---------- |
| `latitude`  | number |    Yes   | Decimal degrees (WGS84), −90…90   | `43.1610`  |
| `longitude` | number |    Yes   | Decimal degrees (WGS84), −180…180 | `-77.6109` |


## Example Request (cURL)

```bash
curl -H "User-Agent: your-email@example.com" 
  https://api.weather.gov/points/38.8894,-77.0352
```
## Example Response

??? example "Sample Response"
    ```json
    {
      "properties": {
        "forecast": "https://api.weather.gov/gridpoints/LWX/96,70/forecast",
        "forecastHourly": "https://api.weather.gov/gridpoints/LWX/96,70/forecast/hourly",
        "forecastGridData": "https://api.weather.gov/gridpoints/LWX/96,70",
        "observationStations": "https://api.weather.gov/gridpoints/LWX/96,70/stations",
        "relativeLocation": {
          "properties": {
            "city": "Washington",
            "state": "DC"
          }
        }
      }
    }
    ```

## Example Request (JavaScript)

```JavaScript
async function getForecast(lat, lon) {
  const url = `https://api.weather.gov/points/${lat},${lon}/forecast`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "MyWeatherApp/1.0 (me@example.com)",
      "Accept": "application/geo+json"
    }
  });
  if (!res.ok) throw new Error(`NWS error ${res.status}`);
  return res.json();
}

getForecast(43.1610, -77.6109).then(data => {
  // typical usage: render data.properties.periods
  console.log(data.properties.periods.map(p => `${p.name}: ${p.temperature}°${p.temperatureUnit} ${p.shortForecast}`));
});
```

## Example Responses
??? example "Sample Response - Forecast"
    ```json
    {
      "type": "Feature",
      "properties": {
        "updated": "2025-03-15T14:02:00-04:00",
        "units": "us",
        "forecastGenerator": "BaselineForecastGenerator",
        "generatedAt": "2025-03-15T14:05:12-04:00",
        "updateTime": "2025-03-15T14:02:00-04:00",
        "validTimes": "2025-03-15T14:00:00+00:00/P7DT",
        "elevation": { "unitCode": "wmoUnit:m", "value": 154.0 },
        "periods": [
      {
        "number": 1,
        "name": "This Afternoon",
        "startTime": "2025-03-15T14:00:00-04:00",
        "endTime": "2025-03-15T18:00:00-04:00",
        "isDaytime": true,
        "temperature": 46,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "windSpeed": "10 to 15 mph",
        "windDirection": "NW",
        "shortForecast": "Partly Sunny",
        "detailedForecast": "Partly sunny. High near 46. Northwest wind 10 to 15 mph."
      },
      {
        "number": 2,
        "name": "Tonight",
        "startTime": "2025-03-15T18:00:00-04:00",
        "endTime": "2025-03-16T06:00:00-04:00",
        "isDaytime": false,
        "temperature": 32,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "windSpeed": "5 to 10 mph",
        "windDirection": "NW",
        "shortForecast": "Mostly Clear",
        "detailedForecast": "Mostly clear, with a low around 32. Northwest wind 5 to 10 mph."
      }
    ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[ -77.63,43.15 ],[ -77.58,43.15 ],[ -77.58,43.18 ],[ -77.63,43.18 ],[ -77.63,43.15 ]]]
      }
    }
    ```
??? example "400 Bad Request - Coordinates"
    ```json
    {
      "title": "Bad Request",
      "type": "https://api.weather.gov/problems/InvalidParameter",
      "detail": "Invalid 'point' parameter. Expected 'lat,lon'.",
      "correlationId": "c6e1f8a4-7b77-4b1f-9a7a-0c0f0ea1f9a1"
    }
    ```

## Response fields for all queries (abbreviated list)

??? details "Extended field reference (selected)"
    | Field                             | Type                       | Description                                         |
    | --------------------------------- | -------------------------- | --------------------------------------------------- |
    | `type`                            | string                     | Always `Feature` for this endpoint.                 |
    | `geometry`                        | GeoJSON geometry | null    | Polygon for thfor exampleid cell (often present).          |
    | `properties.updated`              | string (ISO 8601)          | Timestamp the forecast text was last updated.       |
    | `properties.units`                | string                     | Unit system (`us` commonly used).                   |
    | `properties.updateTime`           | string (ISO 8601)          | Synced update timestamp.                            |
    | `properties.validTimes`           | string (ISO 8601 interval) | Range/time-step for which periods are valid.        |
    | `properties.elevation`            | object                     | Elevation of forecast grid (meters, WMO unit code). |
    | `properties.periods`              | array<Period>              | Ordered list of day/night forecast periods.         |
    | `periods[].name`                  | string                     | Label like `Today`, `Tonight`, `Monday`.            |
    | `periods[].startTime` / `endTime` | string (ISO 8601)          | Start/end of that period.                           |
    | `periods[].isDaytime`             | boolean                    | `true` for daytime periods.                         |
    | `periods[].temperature`           | number                     | Forecast temperature.                               |
    | `periods[].temperatureUnit`       | string                     | `F` or `C` (textual unit indicator).                |
    | `periods[].temperatureTrend`      | string | null              | Trend hint (for example, `rising`, `falling`) or `null`.   |
    | `periods[].windSpeed`             | string                     | Human-readable wind speed (for example, `10 to 15 mph`).   |
    | `periods[].windDirection`         | string                     | Compass direction (for example, `NW`).                     |
    | `periods[].shortForecast`         | string                     | Brief phrase (for example, `Partly Sunny`).                |
    | `periods[].detailedForecast`      | string                     | Full text for the period.                           |

## Common Status Codes

| Code | Meaning           | Corrective action                                                          |
| ---: | ----------------- | -------------------------------------------------------------------------- |
|  200 | OK                |—                                                                         |
|  400 | Bad Request       | Verify `latitude,longitude` format and numeric ranges.                     |
|  404 | Not Found         | Coordinates outside NWS coverage (rare) or service down; try nearby point. |
|  429 | Too Many Requests | Back off; respect cache headers and reduce request rate.                   |
|  500 | Server Error      | Retry with exponential backoff.                                            |


➡️ See [HTTP Status Codes](../concepts/status-codes.md) for a full reference.
## Notes

* Start with /points: It’s the supported way to map a lat/lon to the right grid and forecast office. The same route also advertises related URLs (for example, hourly forecast). 

* Grid resolution: Forecasts are issued on a 2.5 km grid by local offices; nfor exampleboring points can have wildly different forecasts. 

* Hourly forecasts: Use /points/{lat},{lon}/forecast/hourly for 48-hour hourly periods

Need an in-depth explanation on how the NWS API uses gridpoints? [Gridpoints Explained](../key-concepts/alerts-and-warnings.md).

👉**Next:** [ Endpoints: Grid Points →](./grid-points.md)
