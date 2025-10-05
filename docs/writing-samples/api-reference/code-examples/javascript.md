---
layout: default
title: "JavaScript"
parent: "Code Examples"
nav_order: 3
---

# Using JavaScript with the NWS API

This page demonstrates how to use JavaScript (vanilla or with `fetch`) to interact with the National Weather Service (NWS) API. These examples are ideal for developers building browser-based or Node.js applications.

---

## 1. Get Forecast by Latitude and Longitude

```javascript
fetch("https://api.weather.gov/points/40.7766,-73.8742/forecast", {
  headers: {
    "User-Agent": "your-email@example.com",
    "Accept": "application/geo+json"
  }
})
  .then(response => response.json())
  .then(data => console.log(data.properties.periods))
  .catch(error => console.error("Error fetching forecast:", error));
```

**Description:**  
Fetches the 7-day forecast for LaGuardia Airport. The `periods` array includes forecast details for each time period.

---

## 2. Translate Coordinates to Grid and Forecast Links

```javascript
fetch("https://api.weather.gov/points/40.7766,-73.8742", {
  headers: {
    "User-Agent": "your-email@example.com"
  }
})
  .then(response => response.json())
  .then(data => {
    console.log("Forecast URL:", data.properties.forecast);
    console.log("Grid ID:", data.properties.gridId);
    console.log("Grid X/Y:", data.properties.gridX, data.properties.gridY);
  })
  .catch(error => console.error("Error retrieving point data:", error));
```

**Description:**  
Returns metadata for the coordinates, including the associated grid and forecast URLs.

---

## 3. Get Active Alerts by State

```javascript
fetch("https://api.weather.gov/alerts/active?area=NY", {
  headers: {
    "User-Agent": "your-email@example.com"
  }
})
  .then(response => response.json())
  .then(data => {
    data.features.forEach(alert => {
      console.log(alert.properties.event, "-", alert.properties.headline);
    });
  })
  .catch(error => console.error("Error retrieving alerts:", error));
```

**Description:**  
Retrieves all active alerts for New York and prints out the event name and headline for each.

---

## Notes

- Always include a `User-Agent` header with your email or app domain.
- Use `Accept: application/geo+json` if you want GeoJSON formatting.
- For browser testing, ensure you’re running on HTTPS and that the API supports CORS (the NWS API generally does).
- For Node.js, you may use libraries like `axios` or `node-fetch` for similar behavior.

---

