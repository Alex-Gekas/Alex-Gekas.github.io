---
layout: default
title: "Zones"
parent: "Endpoints"
nav_order: 6
---

# Get Zone Metadata

## Zones endpoints:
 ## `/zones`
 ## `/zones/{type}`
 ## `/zones/{type}/{zoneId}`

The Zones endpoints let you look up NWS forecast, county, and fire weather zones and their metadata.

You can:

- List zones, optionally filtered by state, region, or point location
- Get metadata for a specific zone
- Include polygon geometry for mapping
- Use zone metadata with the Alerts API and other NWS endpoints

## Headers & Auth

`User-Agent` (required): A string identifying your app and contact (for example, MyWeatherApp/1.0 (me@myweatherapp.com).

`Accept` (recommended): application/geo+json

`Authorization`: Not required.

## HTTP Request

```
GET https://api.weather.gov/zones

```

**List zones by type:**

```
GET https://api.weather.gov/zones/{type}

```

**Get metadata for a specific zone:**

```
GET https://api.weather.gov/zones/{type}/{zoneId}

```

## Path Parameters

These path parameters apply to `GET /zones/{type}` and `GET /zones/{type}/{zoneId}`.

| Name    | Type   | Required                                | Description                                                              |
|---------|--------|-------------------------------------------|--------------------------------------------------------------------------|
| type    | string | Yes                                       | Zone type. Common values include `forecast`, `county`, and `fire`.       |
| zoneId  | string | Yes (for `/zones/{type}/{zoneId}`)        | Zone ID (for example, `ALZ023` for a forecast zone or `ALC125` for a county zone). |

## Query Parameters

The `/zones` and `/zones/{type}` endpoints support several filters

??? info "Query Parameters"
    | Name              | Type     | Required | Applies to                              | Description                                                                                 |
    |-------------------|----------|----------|-------------------------------------------|---------------------------------------------------------------------------------------------|
    | `id`              | array\*  | No       | `/zones`, `/zones/{type}`                | One or more zone IDs (forecast or county). Useful when you already know the IDs.            |
    | `area`            | array\*  | No       | `/zones`, `/zones/{type}`                | One or more state or marine area codes (for example, `NY` or a marine area code).          |
    | `region`          | array\*  | No       | `/zones`, `/zones/{type}`                | One or more region codes.                                                                   |
    | `type`            | array\*  | No       | `/zones`, `/zones/{type}`                | Zone types to include (for example, `forecast`, `county`, `fire`).                          |
    | `point`           | string   | No       | `/zones`, `/zones/{type}`                | Latitude/longitude in `lat,lon` format (for example, `40.7128,-74.0060`). Returns containing zones. |
    | `includfor exampleometry`| boolean  | No       | `/zones`, `/zones/{type}`                | If `true`, includes polygon geometry for each zone.                                         |
    | `limit`           | integer  | No       | `/zones`, `/zones/{type}`                | Maximum number of zones to return.                                                          |
    | `effective`       | string   | No       | `/zones`, `/zones/{type}`, `/zones/{type}/{zoneId}` | Effective date/time (ISO-8601) to use when selecting zone versions.             |

## Example Requests

### cURL–List forecast zones for a state

Get forecast zones for New York, including geometry, limited to 50 results:

```bash
curl "https://api.weather.gov/zones/forecast?area=NY&includfor exampleometry=true&limit=50" 
  -H "User-Agent: MyWeatherApp/1.0 (me@myweatherapp.com)" 
  -H "Accept: application/geo+json"
```
### cURL–Find zones that contain a point

Get any zones (all types) that contain a point near Tuscaloosa, AL:

```bash
curl "https://api.weather.gov/zones?point=33.212,-87.5459" 
  -H "User-Agent: MyWeatherApp/1.0 (me@myweatherapp.com)" 
  -H "Accept: application/geo+json"
```

### JavaScript (fetch)–List forecast zones and log their names

```bash
const url = "https://api.weather.gov/zones/forecast?area=AL&limit=10";

fetch(url, {
  headers: {
    "User-Agent": "MyWeatherApp/1.0 (me@myweatherapp.com)",
    "Accept": "application/geo+json"
  }
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const zones = data.features || [];
    zones.forEach((feature) => {
      const props = feature.properties || {};
      console.log(`${props.id}: ${props.name} (${props.state || props.area})`);
    });
  })
  .catch((error) => {
    console.error("Error fetching zones:", error);
  });
```
### JavaScript (fetch)–Get metadata for a single zone

```bash
const zoneType = "forecast";
const zoneId = "ALZ023";
const url = `https://api.weather.gov/zones/${zoneType}/${zoneId}`;

fetch(url, {
  headers: {
    "User-Agent": "MyWeatherApp/1.0 (me@myweatherapp.com)",
    "Accept": "application/geo+json"
  }
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  })
  .then((zone) => {
    console.log(zone.properties.name);
    console.log("Forecast URL:", zone.properties.forecast);
  })
  .catch((error) => {
    console.error("Error fetching zone:", error);
  });
```
### Example responses

**200 OK—List of forecast zones (truncated)**

??? example "200 OK—List of forecast zones"
    ```json
    {
      "@context": [
        "https://geojson.org/geojson-ld/geojson-context.jsonld",
        {
          "@version": "1.1",
          "wx": "https://api.weather.gov/ontology#",
          "s": "https://schema.org/",
          "@vocab": "https://api.weather.gov/ontology#"
        }
      ],
      "type": "FeatureCollection",
      "features": [
        {
          "id": "https://api.weather.gov/zones/forecast/ALZ023",
          "type": "Feature",
          "properties": {
            "id": "ALZ023",
            "type": "forecast",
            "name": "Tuscaloosa",
            "state": "AL",
            "effectiveDate": "2025-03-21T00:00:00+00:00",
            "expirationDate": null,
            "forecastOffice": "https://api.weather.gov/offices/BMX",
            "observationStations": "https://api.weather.gov/zones/forecast/ALZ023/stations"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [-87.75, 33.40],
                [-87.30, 33.40],
                [-87.30, 33.05],
                [-87.75, 33.05],
                [-87.75, 33.40]
              ]
            ]
          }
        }
      ],
      "pagination": {
        "next": "https://api.weather.gov/zones/forecast?area=AL&limit=50&cursor=abc123",
        "prev": null
      }
    }
    ```
**200 OK—Zone metadata**

??? example "200 OK—Single zone metadata"
    ```json
    {
      "@context": [
        "https://geojson.org/geojson-ld/geojson-context.jsonld",
        {
          "@version": "1.1",
          "wx": "https://api.weather.gov/ontology#",
          "s": "https://schema.org/",
          "@vocab": "https://api.weather.gov/ontology#"
        }
      ],
      "id": "https://api.weather.gov/zones/forecast/ALZ023",
      "type": "Feature",
      "properties": {
        "id": "ALZ023",
        "type": "forecast",
        "name": "Tuscaloosa",
        "state": "AL",
        "effectiveDate": "2025-03-21T00:00:00+00:00",
        "expirationDate": null,
        "forecastOffice": "https://api.weather.gov/offices/BMX",
        "relatedZones": {
          "county": "https://api.weather.gov/zones/county/ALC125",
          "fireWeatherZone": "https://api.weather.gov/zones/fire/ALZ023"
        }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-87.75, 33.40],
            [-87.30, 33.40],
            [-87.30, 33.05],
            [-87.75, 33.05],
            [-87.75, 33.40]
          ]
        ]
      }
    }
    ```

## Status Codes

??? info "Status Codes"
    | Status | Meaning | When you’ll see it |
    |--------|---------|--------------------|
    | `200 OK` | Successful request | Zones or zone metadata returned. |
    | `400 Bad Request` | Invalid parameter or format | For example, malformed `point` or invalid `effective` date/time. |
    | `404 Not Found` | Resource not found | Unknown `type` or `zoneId`. |
    | `406 Not Acceptable` | Unsupported `Accept` header | Requesting a format the endpoint doesn’t support. |
    | `429 Too Many Requests` | Rate limit exceeded | Too many requests in a short time window. |
    | `500 Internal Server Error` / `503 Service Unavailable` | Server-side issues | Temporary API or upstream data problems. |

## Notes & Tips

- **Pair zones with alerts.** The Alerts API uses `affectedZones` to list the zones for each alert. Use the Zones endpoints to understand or map those areas. ([National Weather Service](https://www.weather.gov/documentation/services-web-api?))
- **Use `point` for geolocation.** If you have a latitude/longitude, the `point` query parameter can return zones that contain that location. This is handy if you’re building “what zone am I in?” features.
- **Be careful with `includfor exampleometry`.** Zone polygons can be large and add significant response size. Turn geometry on only when you need it (for example, when drawing maps).
- **Limit results.** Always use `limit` when listing zones to avoid large payloads and to stay within rate limits.
