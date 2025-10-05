---
layout: default
title: "Python"
parent: "Code Examples"
nav_order: 2
---

# Using Python with the NWS API

This page shows how to use Python to make HTTP requests to the National Weather Service (NWS) API using the `requests` library. These examples work well in scripts, notebooks, or backend services.

---

## Setup

First, make sure you have the `requests` library installed:

```bash
pip install requests
```

---

## 1. Get Forecast by Latitude and Longitude

```python
import requests

headers = {
    "User-Agent": "your-email@example.com",
    "Accept": "application/geo+json"
}

url = "https://api.weather.gov/points/40.7766,-73.8742/forecast"
response = requests.get(url, headers=headers)
data = response.json()

for period in data["properties"]["periods"]:
    print(f"{period['name']}: {period['detailedForecast']}")
```

**Description:**  
Fetches the 7-day forecast for LaGuardia Airport and prints the detailed forecast for each period.

---

## 2. Translate Coordinates to Grid and Forecast Links

```python
url = "https://api.weather.gov/points/40.7766,-73.8742"
response = requests.get(url, headers=headers)
data = response.json()

print("Forecast URL:", data["properties"]["forecast"])
print("Grid ID:", data["properties"]["gridId"])
print("Grid X/Y:", data["properties"]["gridX"], data["properties"]["gridY"])
```

**Description:**  
Returns metadata for the coordinates, including the associated grid and forecast URLs.

---

## 3. Get Active Alerts by State

```python
url = "https://api.weather.gov/alerts/active?area=NY"
response = requests.get(url, headers=headers)
data = response.json()

for alert in data["features"]:
    print(f"{alert['properties']['event']}: {alert['properties']['headline']}")
```

**Description:**  
Retrieves all active alerts for New York and prints the event name and headline for each.

---

## Notes

- Always include a `User-Agent` header with your email or app domain.
- Use `Accept: application/geo+json` if GeoJSON is preferred.
- The API returns JSON by default. You can parse it directly with `response.json()`.

---
