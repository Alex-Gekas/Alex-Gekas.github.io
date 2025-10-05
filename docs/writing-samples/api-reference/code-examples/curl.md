---
layout: default
title: "cURL"
parent: "Code Examples"
nav_order: 1
---


# Using cURL with the NWS API

The `curl` command-line tool is a convenient way to test NWS API endpoints and inspect HTTP responses. Below are examples demonstrating how to query forecasts, alerts, and geolocation data.

---

## 1. Get Forecast by Latitude and Longitude

```bash
curl -X GET "https://api.weather.gov/points/40.7766,-73.8742/forecast" -H "User-Agent: your-email@example.com"
```

**Description:**  
Fetches the 7-day forecast for LaGuardia Airport. The response includes a `periods` array with time, temperature, wind, and conditions.

---

## 2. Translate Coordinates to Grid Information

```bash
curl -X GET "https://api.weather.gov/points/40.7766,-73.8742" -H "User-Agent: your-email@example.com"
```

**Description:**  
Returns the grid ID, gridX/Y coordinates, and related forecast and zone links for the given location.

---

## 3. Get Active Alerts for a Region

```bash
curl -X GET "https://api.weather.gov/alerts/active?area=NY" -H "User-Agent: your-email@example.com"
```

**Description:**  
Retrieves all active alerts for New York state. Alerts include event type, severity, and the affected zones.

---

## 4. Get Observations from a Specific Weather Station

```bash
curl -X GET "https://api.weather.gov/stations/KJFK/observations/latest" -H "User-Agent: your-email@example.com"
```

**Description:**  
Fetches the most recent observation from station `KJFK` (John F. Kennedy International Airport), including temperature, wind, and barometric pressure.

---

## Notes

- The NWS API requires a `User-Agent` header with a valid contact email or URL. This helps them contact developers if needed.
- All responses are in JSON or GeoJSON format.
- Use tools like `jq` to format the JSON output in the terminal:  
  ```bash
  curl -s https://api.weather.gov/points/40.7766,-73.8742 | jq
  ```
