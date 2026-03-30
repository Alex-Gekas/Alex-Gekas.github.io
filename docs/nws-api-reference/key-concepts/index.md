---
title: "Concepts: How Forecasts Are Structured"
description: "Introduces how the NWS API organizes forecasts using grids, zones, and linked data."
---

# How Forecasts Are Structured

The NWS API is built on a spatial data model. Forecasts, alerts, and observations aren't tied directly to latitude and longitude—they're organized into **grids**, **zones**, and **forecast offices**. Understanding this structure makes the rest of the API more predictable and helps you design applications that return the types of data you are looking for. 

!!! info "What this section explains"
    - What spatial building blocks the NWS uses  
    - How a geographic point maps to those structures  
    - Why this matters when working with any forecast or alert endpoint

**By the end of this page, you'll understand how a user's `lat,lon` becomes the grid and zone resources you use throughout the NWS API.**

## The Big Picture

!!! info "What a geographic point resolves into"
    Every NWS forecast starts with a geographic point—a latitude/longitude pair supplied by your application or your user. The API resolves that point into three components:

    1. **A Weather Forecast Office (WFO)**—the local NWS office responsible for producing forecasts for that area.
    2. **A forecast grid cell**—a 2.5 km × 2.5 km cell that contains the detailed, location-specific forecast data.
    3. **One or more forecast zones**—larger regional areas used for public forecasts, fire weather products, marine forecasts, and alerts.

This spatial model shapes the design of the NWS API. **You never request a forecast directly from a coordinate.** Instead, you call `/points/{lat},{lon}`, and the API tells you which grid, which zone, and which office own that location—along with links to the forecast and alert endpoints associated with them.

Once you understand how this mapping works, the API becomes easier to integrate into your application.

## Conceptual Flow

!!! info "How a geographic point maps through the NWS system"
    - **Point (lat/lon)** → The location your app provides  
    - **Grid** → 2.5 km × 2.5 km forecast cell for location-specific data  
    - **Zone** → Larger regional forecast or alert area  
    - **Forecast Office (WFO)** → The NWS office responsible for that region  

**Next:** Learn how Points, Grids, Zones and WFOs fit together [Hierarchy](./hierarchy.md) →
