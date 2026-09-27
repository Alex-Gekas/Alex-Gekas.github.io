---
layout: default
title: "Endpoints"
seo_title: "NWS API Endpoints Reference – API Documentation Sample | Alex Gekas"
description: "Overview of the National Weather Service API endpoint reference: points, forecasts, gridpoints, stations, alerts, and zones, with paths and response formats."
parent: "NWS API Reference"
has_children: true
nav_order: 20
---

# NWS API endpoints

This section lists the available endpoints for the National Weather Service (NWS) API. Each endpoint corresponds to a specific type of data or resource (such as forecasts, alerts, weather stations, or gridpoints) and follows a RESTful URL structure.

## What you'll find

Each endpoint reference includes:

- The full path with example parameters
- Supported HTTP methods
- Required and optional query parameters
- Response format and sample data
- Notes on errors and expected status codes

Responses are typically in JSON or GeoJSON format.

## Organization

This reference groups endpoints by resource:

- **Forecasts**: `/gridpoints/{office}/{gridX},{gridY}`
- **Alerts**: `/alerts`, with optional filters
- **Points**: `/points/{lat},{lon}` returns metadata and related endpoints for a location
- **Stations**: `/stations`, listing observation locations

**Next:** Learn about the [Alerts Endpoint](./alerts.md) →

