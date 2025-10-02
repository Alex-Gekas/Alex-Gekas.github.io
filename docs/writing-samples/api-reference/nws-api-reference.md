---
title: NWS API Reference (Sample)
tags:
  - api
  - reference
---

# NWS API Reference (Sample)

> **Note:** This is a condensed sample illustrating my reference structure.

## Authentication
Include a descriptive **User-Agent** header with contact information.

## Endpoints

### `GET /points/{lat},{lon}`
Returns metadata for a location.

**Parameters**
- `lat` (number) — latitude
- `lon` (number) — longitude

**Response**
```json
{
  "properties": {
    "forecast": "https://api.weather.gov/gridpoints/OKX/33,36/forecast"
  }
}
```

### `GET /gridpoints/{office}/{x},{y}/forecast`
Returns a 7-day forecast.
