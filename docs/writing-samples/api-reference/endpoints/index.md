---
layout: default
title: "Endpoints"
parent: "NWS API Reference"
has_children: true
nav_order: 20
---

# NWS API Endpoints

This section lists the available endpoints for the National Weather Service (NWS) API. Each endpoint corresponds to a specific type of data or resource—such as forecasts, alerts, weather stations, or gridpoints—and follows a RESTful URL structure.

## What You'll Find

Each endpoint reference includes:

- The full path with example parameters
- Supported HTTP methods
- Required and optional query parameters
- Response format and sample data
- Notes on errors and expected status codes

Responses are typically in JSON or GeoJSON format.

## Organization

Endpoints are grouped by resource:

- **Forecasts**: `/gridpoints/{office}/{gridX},{gridY}`
- **Alerts**: `/alerts`, with optional filters
- **Points**: `/points/{lat},{lon}` returns metadata and related endpoints for a location
- **Stations**: `/stations`, listing observation locations

**Next:** Learn about the [Alerts Endpoint](./alerts.md) →

