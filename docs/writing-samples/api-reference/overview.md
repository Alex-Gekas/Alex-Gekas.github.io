---
title: "Overview"
description: "Introduction to the NWS API"
---

# API Overview

The National Weather Service (NWS) provides free, public access to real-time weather data through its API at https://api.weather.gov. The API delivers forecasts, observations, alerts, radar imagery, and specialized data for aviation, marine, and river conditions.

Data is available nationwide, from broad regions down to highly localized 2.5 km grids. Information is updated continuously to reflect the most current conditions.

Unlike commercial APIs, the NWS API is free and connects directly to the official source used by state agencies, federal partners, and news outlets. Developers can build applications that deliver accurate forecasts, weather alerts, and hyperlocal data for industries such as agriculture, construction, and emergency management.

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
