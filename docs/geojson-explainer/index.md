# Case study: Writing a GeoJSON explainer for developers

## The audience problem

The [US National Weather Service API](https://www.weather.gov/documentation/services-web-api) is a free and authoritative resource for weather data throughout the continental US. You can query a wide range of weather data used by NWS forecasters, including warnings, alerts, and maritime weather conditions. Developers using the NWS API quickly run into a friction point: the responses come back in GeoJSON—a format many haven’t worked with before.

You can retrieve the data, but interpreting it—especially coordinates, geometry types, and nested structures—slows you down before you even start building.

## The goal

This explainer gives developers just enough GeoJSON knowledge to use the NWS API. They will understand how to read GeoJSON responses before reading the API Developer Quickstart.

## Content decisions

The explainer opens with a JSON vs. GeoJSON comparison. This gives developers a familiar concept before introducing anything new. The coordinates for Central Park is a practical example that clearly illustrates the concept. Code snippets use NWS use cases to tie it into using the NWS API quickstart.

## What was cut

The geometry type reference, SQL examples, and format comparisons were all cut or trimmed from the official [spec](https://geojson.org/). A full breakdown of all seven geometry types is more reference material than explainer. PostGIS SQL goes deeper into backend detail than the target audience needs. And the format comparison was narrowed to what a developer would see in the streamlined NWS Developer API reference.

## What was kept and why

Three things shaped the final structure. The longitude-first coordinate order made the cut because it's a common bug that catches almost every developer at least once. The format comparison table stayed because it gives readers quick orientation without requiring deep commitment. And the NWS workflow runs end to end because it directly leads to the quickstart that follows.

## Outcome

The goal was to enable developers to recognize a GeoJSON response and know what to do with it. The explainer starts with concrete examples before leading to the tutorial, which earns trust from the reader. The reference and quickstart links follow naturally at the end.  

[→ Read the GeoJSON explainer](explainer.md)