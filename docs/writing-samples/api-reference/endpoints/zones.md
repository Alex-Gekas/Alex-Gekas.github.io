---
layout: default
title: "Zones"
parent: "Endpoints"
nav_order: 6
---

# Get Zone Metadata

`GET /zones`

Returns a list of NWS zones used for organizing alerts and forecasts. Zones can be filtered by type (for exampleublic, fire, marine) or by state. Each zone has a unique ID and name and can be used to query active alerts.

> Example: List all public zones in California.

---

## Authentication

This endpoint requires a `User-Agent` header.  
See [Authentication](../authentication.md) for details.

---

## Query Parameters

| Name     | Description                              | Required | Example    |
|----------|------------------------------------------|----------|------------|
| `type`   | Filter by zone type (`public`, `fire`, `marine`) | No       | `public`   |
| `state`  | Two-letter state abbreviation             | No       | `CA`       |

---

## Zone by ID

To get metadata for a single zone, use:

```http
GET /zones/{zoneId}
```
## Alerts
Alerts for a Zone
To retrieve alerts for a specific zone:
```
GET /alerts?zone=CAZ041
```

## Example Request
```
curl -H "User-Agent: your-email@example.com" \
  https://api.weather.gov/zones?type=public&state=CA
```
## Example Response

<details> <summary>Click to expand</summary>
{
  "features": [
    {
      "id": "https://api.weather.gov/zones/public/CAZ041",
      "properties": {
        "id": "CAZ041",
        "name": "Los Angeles County Coast including Downtown Los Angeles",
        "state": "CA",
        "type": "public"
      }
    }
  ]
}
</details>
## Common Status Codes

| Code | Meaning                              |
|------|--------------------------------------|
| 200  | OK–Request was successful.         |
| 400  | Bad Request–Invalid query.         |
| 404  | Not Found–Zone not found.          |

➡️ See [HTTP Status Codes](../concepts/status-codes.md) for a full reference.

## Notes

- Zones are used to group locations for issuing alerts and forecasts.
- Each zone has a unique ID like `CAZ041` (public), `CAZ293` (fire), or `PZZ130` (marine).
- The `zone` query parameter can be used with the `/alerts` endpoint to find active warnings for that area.
- This endpoint doesn't return polygon geometry. For geographic shapes, see the alert response’s GeoJSON.
- For a conceptual explanation, see [Zones Explained](../concepts/zones.md).


