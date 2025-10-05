---
layout: default
title: "Points"
parent: "Endpoints"
nav_order: 4
---

# Get Metadata by Geographic Point

`GET /points/{latitude},{longitude}`

Returns metadata for a specific latitude/longitude coordinate, including associated gridpoint, forecast office, and related URLs for forecast, hourly forecast, observations, and stations.

> Example: Get forecast links and office info for a location in Chicago, IL.

---

## Authentication

This endpoint requires a `User-Agent` header.  
See [Authentication](../authentication.md) for details.

---

## Path Parameters

| Name        | Description                   | Required | Example     |
|-------------|-------------------------------|----------|-------------|
| `latitude`  | Latitude in decimal degrees   | Yes      | `41.8781`   |
| `longitude` | Longitude in decimal degrees  | Yes      | `-87.6298`  |

---

## Example Request

```bash
curl -H "User-Agent: your-email@example.com" \
  https://api.weather.gov/points/41.8781,-87.6298
```

## Example Response
<details> <summary>Click to expand</summary>
{
  "properties": {
    "cwa": "LOT",
    "gridX": 75,
    "gridY": 59,
    "forecastOffice": "https://api.weather.gov/offices/LOT",
    "forecast": "https://api.weather.gov/gridpoints/LOT/75,59/forecast",
    "forecastHourly": "https://api.weather.gov/gridpoints/LOT/75,59/forecast/hourly",
    "forecastGridData": "https://api.weather.gov/gridpoints/LOT/75,59",
    "observationStations": "https://api.weather.gov/gridpoints/LOT/75,59/stations",
    "relativeLocation": {
      "properties": {
        "city": "Chicago",
        "state": "IL"
      }
    }
  }
}
</details>
## Common Status Codes

| Code | Meaning                             |
|------|-------------------------------------|
| 200  | OK–Request was successful.        |
| 400  | Bad Request–Coordinates invalid.  |
| 404  | Not Found–Point outside coverage. |

➡️ See [HTTP Status Codes](../concepts/status-codes.md) for a full reference.

## Notes

- This is typically the first endpoint developers call when building a location-based app.
- It returns the gridpoint (`gridX`, `gridY`) and forecast office (`cwa`) that serve the provided coordinates.
- The response includes direct links to:
  - 7-day forecast
  - Hourly forecast
  - Grid-level forecast data
  - Observation stations
- The returned `forecastOffice` is also a URL pointing to the NWS Forecast Office metadata.
- For more on geolocation and gridpoints, see [Geolocation](../concepts/geolocation.md).
