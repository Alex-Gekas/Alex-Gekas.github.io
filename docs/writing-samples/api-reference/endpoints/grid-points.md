---
layout: default
title: "Grid Points"
parent: "Endpoints"
nav_order: 3
---

# Get Forecast by Gridpoint

`GET /gridpoints/{office}/{gridX},{gridY}`

Retrieves the 7-day forecast for a specific NWS gridpoint, defined by a forecast office identifier and `gridX`, `gridY` coordinates. This endpoint is often used after retrieving gridpoint metadata from the `/points` endpoint.

> Example: Get forecast data for the Buffalo forecast office at grid cell (45, 30).

---

## Authentication

This endpoint requires a `User-Agent` header.  
See [Authentication](../authentication.md) for details.

---

## Path Parameters

| Name      | Description                           | Required | Example |
|-----------|---------------------------------------|----------|---------|
| `office`  | NWS Forecast Office ID                | Yes      | `BUF`   |
| `gridX`   | X coordinate in the forecast grid     | Yes      | `45`    |
| `gridY`   | Y coordinate in the forecast grid     | Yes      | `30`    |

---

## Example Request

```bash
curl -H "User-Agent: your-email@example.com" \
  https://api.weather.gov/gridpoints/BUF/45,30/forecast
```
<details> <summary>Click to expand</summary>
{
  "properties": {
    "updated": "2025-05-19T07:00:00-04:00",
    "periods": [
      {
        "name": "Today",
        "startTime": "2025-05-19T08:00:00-04:00",
        "temperature": 72,
        "temperatureUnit": "F",
        "windSpeed": "10 mph",
        "shortForecast": "Partly Sunny"
      },
      {
        "name": "Tonight",
        "startTime": "2025-05-19T20:00:00-04:00",
        "temperature": 58,
        "temperatureUnit": "F",
        "windSpeed": "5 mph",
        "shortForecast": "Mostly Clear"
      }
    ]
  }
}
</details>
## Common Status Codes

| Code | Meaning                             |
|------|-------------------------------------|
| 200  | OK – Request was successful.        |
| 400  | Bad Request – Invalid grid values.  |
| 404  | Not Found – Office or grid not found. |

➡️ See [HTTP Status Codes](../concepts/status-codes.md) for a full reference.
## Notes

- Gridpoints are assigned to local NWS Forecast Offices (WFOs). You must include the correct `office` code.
- The `gridX` and `gridY` values define a cell in the WFO's forecast grid.
- You can get these values by calling the [`/points/{lat},{lon}`](./forecast.md) endpoint first.
- The forecast response includes time-segmented periods (day, night, etc.), each with:
  - Temperature
  - Wind speed
  - Forecast description
- The endpoint path may be extended to include `/forecast/hourly` for more granular data.
- For more details on the grid system, see [Gridpoints Explained](../concepts/gridpoints.md).