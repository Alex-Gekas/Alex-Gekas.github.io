---
layout: default
title: "Stations"
parent: "Endpoints"
nav_order: 5
---

# Get Observation Stations

`GET /stations`

This endpoint returns a list of all weather observation stations managed by the National Weather Service (NWS). It can also be used to retrieve metadata for a single station or filter stations by location.

> Example: List all active stations or get nearby stations for a given gridpoint.

---

## Authentication

This endpoint requires a `User-Agent` header.  
See [Authentication](../authentication.md) for details.

---

## Query Parameters

| Name       | Description                                          | Required | Example                          |
|------------|------------------------------------------------------|----------|----------------------------------|
| `limit`    | Max number of stations to return                     | No       | `25`                             |
| `state`    | Two-letter state abbreviation                        | No       | `NY`                             |
| `active`   | Return only active stations (`true` or `false`)      | No       | `true`                           |

---

## Nearby Stations (Gridpoint)

To get observation stations near a forecast gridpoint:

```http
GET /gridpoints/{office}/{gridX},{gridY}/stations
```

## Example Request
```
curl -H "User-Agent: your-email@example.com" \
  https://api.weather.gov/stations?state=NY&limit=5
```
##  Example Response
<details> <summary>Click to expand</summary>
{
  "features": [
    {
      "id": "https://api.weather.gov/stations/KBUF",
      "properties": {
        "name": "Buffalo Niagara International Airport",
        "stationIdentifier": "KBUF",
        "latitude": 42.9405,
        "longitude": -78.7369,
        "elevation": {
          "value": 215.2,
          "unitCode": "unit:m"
        },
        "timezone": "America/New_York"
      }
    }
  ]
}
</details>

## Common Status Codes

| Code | Meaning                             |
|------|-------------------------------------|
| 200  | OK–Request was successful.        |
| 400  | Bad Request–Invalid query params. |
| 404  | Not Found–Station or region not found. |

➡️ See [HTTP Status Codes](../concepts/status-codes.md) for a full reference.

## Notes

- Use this endpoint to browse or filter all NWS stations.
- Each station includes metadata such as location, elevation, and station ID.
- You can access a specific station directly with:
  - `/stations/{stationIdentifier}`
- For stations near a forecast point, use the `/gridpoints/{office}/{gridX},{gridY}/stations` endpoint.
- Station IDs (for example, `KBUF`) are commonly used in observations and reports.
