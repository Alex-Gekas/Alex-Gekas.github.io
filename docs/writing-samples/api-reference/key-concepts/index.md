---
title: "Key Concepts"
description: "Explains Key Concepts of the NWS API."
---

# Key Concepts

This section introduces the foundational ideas behind how the National Weather Service API structures and delivers weather data.

Understanding these concepts will help you interpret forecast results, design better user experiences, and integrate location-based weather services into your application.

---

## Topics Covered

### Grid System
Learn how the NWS divides the U.S. into a high-resolution grid (~2.5 km cells) for issuing local forecasts tied to Weather Forecast Offices (WFOs).

### Forecast Zones
Explore the various types of zones—public, fire weather, and marine—that group geographic areas for alerts and broader-area forecasts.

### Geolocation
Understand how geographic coordinates are translated into grid points and zone identifiers using the `/points/{lat},{lon}` endpoint.

### Units
Review the units of measurement returned by the API and how to convert them for international or metric-based applications.

---

## Why It Matters

Each API response references one or more of these core structures—whether you're querying forecast data, alerts, or station observations. Understanding these concepts will help you:
- Make better use of linked resources
- Handle user queries with greater precision

