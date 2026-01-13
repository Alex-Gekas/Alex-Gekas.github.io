---
layout: default
title: "Alerts"
parent: "Endpoints"
nav_order: 1
---
## `GET /alerts`

## Overview
Returns active National Weather Service (NWS) alerts as GeoJSON features. Use this to list current warnings/watches/statements for a location or alert type. No authentication required.

## HTTP request

`GET https://api.weather.gov/alerts`

## Headers & Auth

`User-Agent` (required): A string identifying your app and contact (for example, MyWeatherApp/1.0 (me@myweatherapp.com).

`Accept` (recommended): application/geo+json

`Authorization`: Not required.

## Path parameters

None for this endpoint

## Query parameters

| Name       | Description                                      | Required | Example             |
|------------|--------------------------------------------------|----------|---------------------|
| `area`     | Two-letter state or zone code                    | No       | `NY`                |
| `event`    | Specific alert event type                        | No       | `Flood Warning`     |
| `status`   | Filter by alert status (`actual`, `expired`)     | No       | `actual`            |
| `zone`     | Filter by zone ID (for example, public or fire zones)   | No       | `NYZ001`            |
| `severity` | Filter by severity level                         | No       | `Severe`            |
| `message_type` | Original, update, cancel, etc.               | No       | `Alert`             |     |

## Decision Guide

!!! tip "Choosing the right filter"
    | If you want alerts for… | Use… |
    |---|---|
    | Entire state | `area=NY` |
    | A specific point/city | `point=lat,lon` |
    | A specific county or forecast region | `zone=NYZ###` |
    | Specific alert types | `event=Flood Warning` |

## Example Request (cURL)

 Retrieve flood all flood warnings in effect for New York State.

```bash
curl -s -H "User-Agent: your-email@example.com" -H "Accept: application/geo+json" "https://api.weather.gov/alerts?area=NY&event=Flood%20Warning"
```
## Example response (cURL)

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
        "status": "Actual",
        "messageType": "Alert",
        "severity": "Severe",
        "certainty": "Likely",
        "urgency": "Immediate",
        "areaDesc": "Monroe County, NY",
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

## Example Request (Javascript)

The following JavaScript example returns active Flood Warnings for a gfor exampleaphic point in Monroe County, NY. The `point` parameter (`latitude`, `longitude`) is the most precise way to request alerts because it resolves to the specific forecast zones covering that location. If no active Flood Warnings affect that point, the response may be empty even if alerts are active in nearby areas.


```JavaScript

async function getFloodAlerts() {
  const url = "https://api.weather.gov/alerts?event=Flood%20Warning&point=43.1610,-77.6109";

  const response = await fetch(url, {
    headers: {
      "User-Agent": "MyWeatherApp/1.0 (me@example.com)",
      "Accept": "application/geo+json"
    }
  });

  if (!response.ok) {
    console.error("NWS API error:", response.status);
    return;
  }

  const data = await response.json();
  console.log("Active flood alerts:", data);
}

getFloodAlerts();
```

## Example Response (JavaScript)

??? example "200 OK—minimal response (matching Flood Warning at thfor exampleven point)"
    ```json
    {
      "type": "FeatureCollection",
      "features": [
        {
          "id": "https://api.weather.gov/alerts/abc123",
          "type": "Feature",
          "properties": {
            "event": "Flood Warning",
            "status": "Actual",
            "messageType": "Alert",
            "severity": "Severe",
            "certainty": "Likely",
            "urgency": "Immediate",
            "areaDesc": "Monroe County, NY",
            "sent": "2025-03-15T14:22:00-04:00",
            "effective": "2025-03-15T14:22:00-04:00",
            "expires": "2025-03-15T20:00:00-04:00",
            "headline": "Flood Warning issued for Monroe County, NY",
            "description": "Flooding is occurring or imminent along small streams and low-lying areas.",
            "instruction": "Turn around, don't drown when encountering flooded roads."
          },
          "geometry": null
        }
      ]
    }
    ```

## Response fields for all queries (abbreviated list)

??? details "Extended field reference (selected)"
    | Field | Type | Description |
    |---|---|---|
    | `properties.messageType` | string | Alert lifecycle message such as `Alert`, `Update`, `Cancel`. |
    | `properties.category` | string | Category (for example: `Met`). |
    | `properties.headline` | string | Short summary of the alert. |
    | `properties.description` | string | Long-form description of the hazard. |
    | `properties.instruction` | string | Recommended protective actions. |
    | `properties.senderName` | string | Issuing NWS office name. |
    | `properties.parameters` | object | Extra metadata such as VTEC codes. |

For a complete list of fields defined in the CAP alert format used by NWS, see:
[OpenAPI Full Schema](https://api.weather.gov/openapi.json)



## Status codes

| Code | Meaning             |
|------|---------------------|
| 200  | OK–Successful request. |
| 400  | Bad Request–Invalid query or filter. |
| 404  | Not Found–No alerts matched your query. |
➡️ See [HTTP Status Codes](../key-concepts/status-codes.md) for a full reference.

## Notes & tips

* `User-Agent` required: Requests without a clear User-Agent may be rejected.

* Pagination: Use the HTTP Link header with rel="next" to paginate large result sets.

* Filtering quirks: event usually expects an exact string match (for example, Tornado Warning).

* Geometry: Some alerts omit geometry; rely on `areaDesc` as a fallback.

* Format: Prefer Accept: `application/geo+json` to ensure GeoJSON responses.

**Next:** [ Endpoints: Forecasts →](./forecasts.md)