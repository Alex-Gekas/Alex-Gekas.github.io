---
title: "Quick Start"
description: "Quick Start to Get Up and Running"
---


# Quickstart Guide

This guide helps you get up and running with the National Weather Service (NWS) API in just a few steps. Whether you're a developer, hobbyist, or data analyst, this quickstart will walk you through your first successful request.

---

## 1. Choose a Location

The NWS API is location-based. You'll start by identifying your point of interest using latitude and longitude.

**Example:**  
New York City (LaGuardia Airport): `40.7766,-73.8742`

If you are interested in retrieving the latitude and longitude by city, the [OpenCage Geocoding API](https://opencagedata.com/api) is a great place to start.

---

## 2. Translate Coordinates to a Grid Point

Use the `/points/{latitude},{longitude}` endpoint to get metadata, including forecast URLs, grid coordinates, and zone IDs.

```bash
curl -X GET "https://api.weather.gov/points/40.7766,-73.8742" -H "User-Agent: your-email@example.com"
```

**Response includes:**
- Grid ID and grid X/Y coordinates
- URL for 7-day forecast
- Zone information (forecastZone, county)

---

## 3. Get the Forecast

Use the `forecast` URL returned in the previous step to fetch detailed weather data.

```bash
curl -X GET "https://api.weather.gov/gridpoints/OKX/37,39/forecast" -H "User-Agent: your-email@example.com"
```

**Returns:**  
A 7-day forecast in JSON format with periods, temperatures, wind speeds, and condition summaries.

---

## 4. Explore Additional Data

Here are more useful endpoints:

| Purpose               | Endpoint Example |
|-----------------------|------------------|
| Active alerts         | `/alerts/active?area=NY` |
| Station observations  | `/stations/KJFK/observations/latest` |
| Forecast by grid point | `/gridpoints/{office}/{gridX},{gridY}/forecast` |

See the [Examples](./examples/index.md) section for language-specific code snippets.

---

## 5. Follow Best Practices

- Always include a `User-Agent` header with your email or project name.
- Cache responses when appropriate to reduce load on the API.
- Respect rate limits and avoid scraping large datasets.

---

<!-- Ready to dive deeper? Continue with [Key Concepts](./key-concepts/index.md) or browse the full [API Reference](./reference/index.md). -->