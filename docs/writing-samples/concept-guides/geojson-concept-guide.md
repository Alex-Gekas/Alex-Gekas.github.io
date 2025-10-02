---
title: Understanding GeoJSON
tags:
  - concept
  - geojson
  - mapping
---

# Understanding GeoJSON (Concept Guide)

**GeoJSON** is a JSON-based format for encoding geographic data structures.

## Core elements
- **FeatureCollection** → array of features
- **Feature** → geometry + properties
- **Geometry** → Point, LineString, Polygon, Multi-* variants

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Sample point" },
      "geometry": { "type": "Point", "coordinates": [ -73.9857, 40.7484 ] }
    }
  ]
}
```

!!! tip "When to use GeoJSON"
    Use GeoJSON when exchanging spatial data with web mapping libraries like Leaflet or Mapbox GL.
