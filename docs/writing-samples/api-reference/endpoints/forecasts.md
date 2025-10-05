---
layout: default
title: "Forecasts"
parent: "Endpoints"
nav_order: 2
---

# Get Forecast for a Location

`GET /points/{latitude},{longitude}`

This endpoint provides metadata for a given geographic point, including URLs to forecast data, observation stations, and grid information. It's the initial step to retrieve forecast data for a specific location.

> Example: Retrieve forecast metadata for Washington, D.C.

---

## Authentication

A `User-Agent` header is required to identify your application.  
See [Authentication](../authentication.md) for more information.

---

## Path Parameters

| Name        | Description                           | Required | Example     |
|-------------|---------------------------------------|----------|-------------|
| `latitude`  | Latitude in decimal degrees           | Yes      | `38.8894`   |
| `longitude` | Longitude in decimal degrees          | Yes      | `-77.0352`  |

---

## Example Request

```bash
curl -H "User-Agent: your-email@example.com" \
  https://api.weather.gov/points/38.8894,-77.0352
```
## Example Response
<details> <summary>Click to expand</summary>
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
</details>

## Common Status Codes

| Code | Meaning                               |
|------|---------------------------------------|
| 200  | OK–Successful request.              |
| 400  | Bad Request–Invalid coordinates.    |
| 404  | Not Found–Location not recognized.  |

➡️ See [HTTP Status Codes](../concepts/status-codes.md) for a full reference.
## Notes

- The `/points` endpoint translates geographic coordinates into an NWS gridpoint, which is used for retrieving forecast and observation data.
- The response includes links to:
  - A 7-day forecast (`forecast`)
  - An hourly forecast (`forecastHourly`)
  - Grid-level data (`forecastGridData`)
  - Observation stations (`observationStations`)
- This endpoint is often the first step when building a weather application based on location.
- For more about how the gridpoint system works, see [Gridpoints Explained](../concepts/gridpoints.md).
