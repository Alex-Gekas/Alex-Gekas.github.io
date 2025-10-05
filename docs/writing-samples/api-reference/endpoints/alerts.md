---
layout: default
title: "Alerts"
parent: "Endpoints"
nav_order: 1
---

# Get Active Alerts

`GET /alerts`

Returns active weather alerts issued by the National Weather Service (NWS). You can filter alerts by area, severity, status, and other parameters. Alerts are returned in GeoJSON format and include detailed properties such as alert type, severity, certainty, and the geographic area affected.

> Example: Retrieve flood warnings for a specific region in New York state.

---

## Authentication

This endpoint requires a `User-Agent` header to identify your application.  
See [Authentication](../authentication.md) for more information.

---

## Query Parameters

| Name       | Description                                      | Required | Example             |
|------------|--------------------------------------------------|----------|---------------------|
| `area`     | Two-letter state or zone code                    | No       | `NY`                |
| `event`    | Specific alert event type                        | No       | `Flood Warning`     |
| `status`   | Filter by alert status (`actual`, `expired`)     | No       | `actual`            |
| `zone`     | Filter by zone ID (for example, public or fire zones)   | No       | `NYZ001`            |
| `severity` | Filter by severity level                         | No       | `Severe`            |
| `message_type` | Original, update, cancel, etc.               | No       | `Alert`             |

---

## Example Request

```bash
curl -H "User-Agent: your-email@example.com" \
  https://api.weather.gov/alerts?area=NY&event=Flood
```
## Example Response

<details>
<summary>Click to expand</summary>

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "id": "https://api.weather.gov/alerts/abc123",
      "type": "Feature",
      "properties": {
        "event": "Flood Warning",
        "severity": "Severe",
        "certainty": "Likely",
        "urgency": "Immediate",
        "areaDesc": "Monroe County",
        "sent": "2023-10-15T14:22:00-04:00",
        "effective": "2023-10-15T14:22:00-04:00",
        "expires": "2023-10-15T20:00:00-04:00"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-77.61092, 43.16103],
            [-77.61438, 43.15739],
            [-77.60671, 43.15388],
            [-77.60289, 43.15822],
            [-77.61092, 43.16103]
          ]
        ]
      }
    }
  ]
}
```
</details>
## Common Status Codes

| Code | Meaning             |
|------|---------------------|
| 200  | OK–Successful request. |
| 400  | Bad Request–Invalid query or filter. |
| 404  | Not Found–No alerts matched your query. |

➡️ See [HTTP Status Codes](../concepts/status-codes.md) for a full reference.
## Notes

- This endpoint returns results in [GeoJSON](../concepts/geojson.md) format.
- Polygons represent the actual affected area, not just a bounding box or forecast grid.
- Use filters such as `area`, `event`, or `severity` to narrow results and improve performance.
- Alerts may overlap or supersede one another.
- For more on how alerts differ from forecast data, see [Alerts vs Forecasts](../concepts/alerts-vs-forecast.md).
