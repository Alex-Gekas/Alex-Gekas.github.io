---
title: "Hierarchy: Point → Grid → Zone → WFO"
description: "Shows how a lat/lon resolves into forecast structures in the NWS API."
---
# How These Concepts Fit Together (Hierarchy)

Every forecast starts with a latitude/longitude. The NWS API resolves that point into:

- a grid cell (for detailed forecasts)
- one or more zones (for public forecasts and alerts)
- a forecast office (WFO) responsible for the region

This structure explains why the API returns links instead of direct data when you call `/points/{lat},{lon}`—it’s mapping your location to the correct grid, zones, and office.

```mermaid
flowchart TD
  A[" Geographic Point (lat, lon)"] --> B["Forecast Grid (local detail)"]
  A --> C["Forecast Zone (regional grouping)"]
  A --> D["Forecast Office (data source)"]

  classDef concept fill:#f1f8ff,stroke:#007acc,stroke-width:1px,color:#000,rx:6,ry:6;
  class A,B,C,D concept;
```

**Figure:** Forecast data is organized hierarchically—a point belongs to a grid, which belongs to a zone, all managed by a forecast office (WFO).

👉**Next:** Learn about Weather Forecast Offices [WFOs](./wfos.md) → 