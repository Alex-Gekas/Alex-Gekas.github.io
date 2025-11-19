---
title: "Quick Start"
description: "Quick Start to Get Up and Running"
---

# Quick Start

In this short guide, you’ll send your first request to the **National Weather Service (NWS) API**—from picking a location to retrieving a working forecast.

You don’t need an API key or account setup—just your terminal and a few simple `curl` commands.

---

## Step 1–Choose a Location

The NWS API is **location-based**. Every forecast request starts with a latitude and longitude—but note that **you can’t get a forecast directly from coordinates**. Instead, you’ll first use those coordinates to find the NWS **grid location**, which is what the forecast system actually uses.

You can get coordinates from any mapping tool or geocoding service such as:  
🔹 [OpenCage Encoding API](https://opencagedata.com/api)  
🔹 [Google Maps](https://maps.google.com)

Example–LaGuardia Airport (New York City): `40.7766,-73.8742 {lat, lon}`

## Step 2–Get Grid Metadata

Next, use the `/points/{lat,lon}` endpoint to translate your coordinates into the **grid ID and coordinates** used by NWS forecasts.

This step is required—forecasts are organized by **grid points**, not by latitude and longitude directly.

This request returns metadata including:

* Grid ID and X/Y coordinates  
* URL for your local 7-day forecast  
* Zone identifiers such as `forecastZone` and `county`

**Command**
```bash
curl "https://api.weather.gov/points/40.7766,-73.8742" 
  -H "User-Agent: your-email@example.com"
```
💡 Tip: Always include a User-Agent header with your email or project name so NWS can contact you if needed.

## Step 3 - Retrieve the Forecast

From the JSON you just received, copy the value of the "forecast" URL—this is your direct link to the 7-day forecast for that grid location.

Example:

```curl "https://api.weather.gov/gridpoints/OKX/37,39/forecast" 
  -H "User-Agent: your-email@example.com"
  ```

The response is a JSON forecast that includes:

* Period names (Today, Tonight, Monday, etc.)
* Temperature and wind details
* Short and detailed forecast text

!!! example "Sample response snippet"
    ```json
    {
      "properties": {
        "periods": [
          {
            "name": "Today",
            "temperature": 77,
            "windSpeed": "10 mph",
            "shortForecast": "Mostly Sunny"
          }
        ]
      }
    }
    ```
---

## Step 4 - Explore Additional Data

Here are more useful endpoints:

| Purpose               | Endpoint Example |
|-----------------------|------------------|
| Active alerts         | `/alerts/active?area=NY` |
| Station observations  | `/stations/KJFK/observations/latest` |
| Forecast by grid point | `/gridpoints/{office}/{gridX},{gridY}/forecast` |

See the [Examples](./code-examples/index.md) section for language-specific code snippets.

---

## Step 5 - Follow Best Practices

- Always include a `User-Agent` header with your email or project name.
- Cache responses when appropriate to reduce load on the API.
- Respect rate limits and avoid scraping large datasets.

**Next:** [Authentication →](./authentication.md)