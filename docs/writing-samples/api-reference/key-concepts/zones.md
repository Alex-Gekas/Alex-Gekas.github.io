---
title: "Zones"
description: "Covers forecast, county, marine, and fire zones and how they relate to alerts."
---
# Zones

Zones are larger geographic areas used for public forecasts and alerts. Unlike grids, which provide detailed 2.5 km forecast data, zones group many grid cells together so the NWS can issue region-wide weather information.

Common zone types include:

- forecast (public forecast zones)
- county (county-based groupings)
- fire (fire-weather zones)
- marine (marine and coastal zones)

When you call `/points/{lat},{lon}`, the API returns links to all zones that contain that location. A point may belong to multiple zone types at once (for example, a forecast zone and a fire-weather zone).

Zones matter because:

- Alerts are issued at the zone level.
- Many public-facing forecasts are zone-based, not grid-based.
- Zone metadata is required to interpret hazard and advisory products.

Below is a diagram that shows the zones within a WFO:

![Forecast zones for the NWS Buffalo Forecast Office](./images/buf_zones.png)

**Figure:** Buffalo NWS office (BUF) with zones highlighted.

**Next:** Lean about [NWS API Developer Use Cases](./developer-use-cases.md) → 

