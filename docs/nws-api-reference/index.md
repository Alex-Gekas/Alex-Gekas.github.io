---
title: "About This Documentation"
description: "Portfolio project overview and methodology"
---
## About this documentation

The NWS API is a public REST API with 30+ endpoints, solid data, and official docs written primarily for meteorologists. The official docs are not a quick start for someone trying to show a local forecast in their app.

I built this reference for developers who want weather data in their app and don't need a deep background in atmospheric science to get there. It covers the endpoints you're most likely to actually use, explains the parts of the API that tend to block developers early on (the `/points` workflow especially), and groups things by what you're trying to do rather than how the NWS happens to organize its systems.

A few decisions worth noting:

**Content is separated by type, not by endpoint.** The original docs mix explanations, steps, and reference details on the same pages. Here, concepts live in concept docs, how-to guides cover specific tasks, and reference material stays in the reference section. This makes it easier to find what you need without reading everything in order.

**The NWS spatial model gets its own doc.** The API uses several overlapping location systems—forecast offices, gridpoints, zones, and observation stations. They're not intuitive. Most developers hit errors here early. A standalone concept doc with diagrams walks through how these systems relate before you make your first request.

**The `/points` workflow has a dedicated guide.** This endpoint is where almost every NWS integration starts, but it doesn't return forecast data directly; it returns URLs. That surprises people when they start tinkering with the API. To address this pain point, a how-to guide walks through the full flow from coordinates to forecast.

**Reference topics that apply to multiple endpoints are in one place.** Status codes, units, caching, and station metadata apply across endpoints. They live in one shared reference section instead of appearing everywhere.

[→ Read the NWS API reference](introduction.md)
