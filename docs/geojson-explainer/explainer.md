!!! abstract "About this sample"
    - **What this is:** A concept guide explaining GeoJSON spatial data formats for non-engineering audiences, focused on giving a basic understanding of the format to understand responses from the NWS API.
    - **Audience:** Developers new to GeoJSON, product managers, and data analysts.
    - **Tools used:** MkDocs, Markdown.
    - **What it demonstrates:** 
    - Distilling an underdocumented spec into a focused guide for a developer audience
    - Giving just enough explanation to use a new spec in the NWS API
    - **Behind the docs:** [Read the case study →](index.md)

# Understanding GeoJSON: a developer's guide to geospatial data

When you call NWS API endpoints, many responses come back as GeoJSON, a format that pairs geographic shapes with the data that describes them. After reading this guide, you'll understand why NWS API responses look the way they do and how a single GeoJSON object can hold both a storm polygon and the severity data attached to it.

This isn't a tutorial or reference, but a quick orientation. This page covers:

- What GeoJSON is and why it's useful
- Core data types (Feature, FeatureCollection, Geometry)
- Where GeoJSON shows up in a real project
- How GeoJSON integrates with the NWS API

## What is GeoJSON?

GeoJSON is an open standard format for representing geographical features as shapes. It's based on JSON, but adds a strict structure that pairs every shape with a `properties` object. The `properties` object is a flexible container that stores metadata for each shape. For the NWS API, that metadata is weather data: severity, event type, and affected area.

## The GeoJSON data model

To visualize how the GeoJSON model works, we'll look at an example response from the NWS API. Let's say there's a thunderstorm warning in effect for a specified area. The API response for that area returns an object that contains a shape and severity data, bundled together into three main building blocks: `FeatureCollection`, `Feature`, and `Geometry`.

The structure is hierarchical:

```
FeatureCollection
└── Feature (one or more)
    ├── Geometry  (the shape: Point, LineString, or Polygon)
    └── Properties  (the metadata: severity, event type, area description)
```

The hierarchy matters for three practical reasons:

- **Weather data is nested.** Because `Features` are nested, weather data like severity lives inside the `Properties` object, not at the top level. To access it, navigate from the top down: `feature.properties.severity`.
- **Responses can contain multiple features.** A single NWS response can return multiple `Features` at once, so you'll loop over them rather than handle one at a time.
- **Shapes vary between features.** Not every `Feature` has the same shape. One alert might be a polygon, another a point, so your code needs to handle both.

In the NWS thunderstorm example, the entire API response is a `FeatureCollection`, the top-level wrapper that holds everything else. Think of it as the envelope: it doesn't contain weather data directly, but it contains the `Features` that do.

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-74.9, 39.9],
            [-74.6, 39.9],
            [-74.6, 40.1],
            [-74.9, 40.1],
            [-74.9, 39.9]
          ]
        ]
      },
      "properties": {
        "event": "Severe Thunderstorm Warning",
        "severity": "Severe",
        "areaDesc": "Southwestern Burlington County, NJ"
      }
    }
  ]
}
```

Reading from the top down:

- `"type": "FeatureCollection"` is the outer envelope that holds all warnings currently in effect for this request.
- `"features": [...]` is the array inside the envelope. Each item is one warning. Here there's only one, but a single API call can return many.
- `"type": "Feature"` identifies this item as a single warning: one shape paired with one set of weather data.
- `"geometry"` is the shape of the affected area. In this case, a `Polygon`, which is a set of coordinates that draws the boundary of the warning zone on a map.
- `"properties"` is the weather data attached to that shape: the event name, severity level, and a plain-language description of the affected area.

## GeoJSON versus generic JSON

Plain JSON works well for general data exchange. REST APIs, mobile apps, search indexes, and databases use it constantly. But when it comes to mapping and location-based tools, a shared, predictable structure isn't optional. That's where GeoJSON comes in.

Unlike plain JSON, GeoJSON follows a strict schema defined in [RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946). This consistency is what lets different apps read and display the same location data without ambiguity or guesswork.

Consider the difference. Here's a plain JSON object describing a location:

```json
{
  "name": "Central Park",
  "city": "New York",
  "type": "park",
  "coordinates": [40.7851, -73.9683]
}
```

This works fine for a general-purpose API, but a mapping tool has no way to know what these numbers mean or which is which. Without a strict schema, it's not clear which coordinate is latitude and which is longitude. A tool could read them in the wrong order, placing your marker in the wrong location entirely.

Here's the same location as valid GeoJSON:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-73.9683, 40.7851]
  },
  "properties": {
    "name": "Central Park",
    "city": "New York",
    "type": "park"
  }
}
```

Every GeoJSON object must include a `type`, a `geometry`, and a `properties` block. Coordinates follow the RFC 7946 spec: longitude first, then latitude. GeoJSON eliminates the ambiguity. Any tool that reads the spec knows coordinates are always `[longitude, latitude]`, no configuration needed. A GeoJSON-aware tool can read this object immediately.

## Where GeoJSON shows up in practice

GeoJSON works well at every part of a typical web project, which is why it became the default format for passing location data between systems.

**Front end:** Leaflet, Mapbox GL JS, and OpenLayers can render a GeoJSON shape with a single line, `L.geoJSON(myGeoJSON).addTo(map)`, and their built-in methods handle styling and interactivity from there.

**Between services:** Tools like OpenStreetMap and Google Maps send and receive GeoJSON directly, so location data moves between systems without needing to be converted first.

**Storage:** PostgreSQL with PostGIS stores GeoJSON natively and supports location-based queries against it without any format conversion.

## How GeoJSON fits into NWS API workflows

The NWS API returns GeoJSON by default for most endpoints. This means you can go from a live API response to a rendered map without extra parsing code.

A typical flow for displaying storm warnings looks like this:

### 1. Fetch active alerts

```bash
curl https://api.weather.gov/alerts/active
```

The response is a GeoJSON `FeatureCollection`. Each feature has alert metadata in `properties` and the affected area in `geometry`.

### 2. Render directly in Leaflet

```javascript
fetch('https://api.weather.gov/alerts/active')
  .then(res => res.json())
  .then(data => L.geoJSON(data).addTo(map));
```

No parsing or reshaping required. Leaflet reads the `FeatureCollection` and draws the polygons.

### 3. Style by severity

```javascript
L.geoJSON(data, {
  style: feature => ({
    color: feature.properties.severity === 'Severe' ? 'red' : 'orange'
  }),
  onEachFeature: (feature, layer) => {
    layer.bindPopup(`${feature.properties.event}<br>${feature.properties.areaDesc}`);
  }
}).addTo(map);
```

Because shape and metadata travel together in a single GeoJSON object, everything you need to render and describe an alert is already bundled there.

## Strengths, limitations, and trade-offs

GeoJSON is the right default for most web and API use cases, but there are scenarios where it isn't ideal.

**Strengths:** Lightweight, human-readable, and easy to debug. No special parsers or tooling required. Broadly supported across mapping libraries, APIs, and databases.

**Limitations:** GeoJSON treats each shape independently. It doesn't track shared borders between adjacent shapes, which matters if you're building something like a choropleth map where regions touch each other. For those cases, TopoJSON is a better fit. GeoJSON is also a text format, so very large files can be slow to load and parse. For high-volume workloads, compact binary formats are faster.

| Format    | Best for                          | Watch out for                        |
|-----------|-----------------------------------|--------------------------------------|
| GeoJSON   | Web apps, APIs, quick integration | Large files, no shared borders       |
| Shapefile | Legacy GIS workflows              | Multi-file, not web-friendly         |
| KML       | Google Earth, rich styling        | Verbose, slower to parse             |
| TopoJSON  | Shared borders, smaller files     | Requires a conversion step before use|

**TL;DR:** GeoJSON is easy to read, easy to render, and supported almost everywhere. For most developers building on the web, it's the right starting point and usually the only format you'll need.

## Summary and next steps

GeoJSON is JSON with a shared set of rules for location data. That's what makes it work so well across a modern web project. It connects your data to your map, your API to your front end, and your app to the broader location data ecosystem without needing a custom conversion step in between.

Ready to put it into practice:

- **Quickstart tutorial:** [Fetch GeoJSON from the NWS API and render it on a map, step by step.](https://alex-gekas.github.io/nws-api-reference/quick-start/)
- **NWS API reference:** [Explore which endpoints return GeoJSON, including active alerts and forecast zones.](https://alex-gekas.github.io/nws-api-reference/introduction/)
