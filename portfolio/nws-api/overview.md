---
title: Overview
layout: default
parent: NWS API Reference
nav_order: 1
---

# API Overview

The U.S. National Weather Service (NWS), a division of the National Oceanic and Atmospheric Administration, is the official weather observation and forecasting agency of the U.S. Government. The NWS collects weather data and issues forecasts and warnings through a vast network of monitoring centers and 122 local offices across the U.S. and its territories. State and federal agencies, as well as most news outlets, rely on the NWS as their primary source of weather information.

The NWS offers public access to its comprehensive weather data through its free API at `api.weather.gov`. The API provides real-time weather observations and forecasts for broad regions and highly localized areas with resolutions as fine as 2.5 km by 2.5 km. It is continuously updated to deliver the most current information. In addition to forecasts, the API offers access to weather alerts, warnings, radar imagery, and specialized meteorological data, such as aviation weather, marine forecasts, and river or lake conditions.

Unlike commercial weather APIs, such as OpenWeatherMap and Weatherstack, which may charge usage fees and rely on NWS data as one of their sources, the NWS API is entirely free to use for any purpose. Developers can build applications that provide accurate, real-time weather information directly from the source, bypassing intermediaries or media outlets. The API’s highly localized data supports precision forecasts for specific locations, making it invaluable for weather-sensitive industries like agriculture, construction, and emergency management organizations.


---


### **Key Features**

The NWS Weather API allows access to its data through customizable queries. It has a RESTful structure and returns data primarily in JSON format and GeoJSON format for geospatial data endpoints such as forecasts or alerts. GeoJSON is an extension of JSON designed for encoding geographic data structures including points, lines, and polygons.

**Core Features:**

* **Current Weather Data**: Real-time observations for thousands of locations across the U.S.
* **Forecasts**: Point-specific weather forecasts, including hourly and daily details.
* **Alerts**: Up-to-date severe weather warnings and watches.
* **Historical Data**: Historical weather observations.
* **Customizable Queries**: Filter data by location, time, and weather parameters to fit application requirements.

**Other Content Types:**

* JSON-LD: `application/ld+json`
* DWML: `application/vnd.noaa.dwml+xml`
* OXML: `application/vnd.noaa.obs+xml`
* CAP: `application/cap+xml`
* ATOM: `application/atom+xml`

**Designed For:**

* Developers building weather applications or dashboards
* Researchers and data scientists analyzing meteorological trends
* Emergency response planners and meteorology enthusiasts
* Organizations integrating weather data into business operations

**Documentation Scope:**

* How to authenticate requests
* Core endpoints and their data structures
* Code examples for common use cases
* Best practices for using the API efficiently and responsibly

**Base URL:**

```
https://api.weather.gov
```