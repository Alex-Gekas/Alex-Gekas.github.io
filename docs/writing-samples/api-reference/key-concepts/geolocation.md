---
title: "Geolocation"
description: "Explains NWS Grids and Forecast Zones"
---
# Key Concepts

## Forecast Coverage Areas
The U.S. is divided into **Weather Forecast Office (WFO)** regions, each responsible for issuing forecasts and alerts for its designated grid cells and zones. This system ensures localized and timely weather information.

## Grid System
The NWS uses a national grid composed of ~2.5 km x 2.5 km cells to organize forecasts:
- Each grid cell is defined by **gridX, gridY** coordinates within a WFO region.
- The `/points/{lat},{lon}` endpoint translates geographic coordinates into the appropriate WFO and grid cell, allowing precise data retrieval.

## Forecast Zones
In addition to grid cells, the NWS defines **zones** for issuing alerts and broader-area forecasts. These zones can span across multiple grid cells and may overlap WFO boundaries. Common zone types include:
- **Public Zones**–city or county-level forecasts
- **Fire Weather Zones**–fire-prone areas based on vegetation and geography
- **Marine Zones**–bays, coastal, and offshore waters

Each zone has a unique **Zone ID**, which you can reference using these resources:

- [Zone-County Correlation File](https://www.weather.gov/gis/ZoneCounty): Lists forecast zones, counties, and WFO codes
- [Public Forecast Zone Shapefiles](https://www.weather.gov/gis/publiczones): GIS shapefiles for mapping and spatial analysis
- [State-by-State Zone Maps](https://www.weather.gov/pimar/PubZone): Visual maps of forecast zones by state (PDF and JPG)

You can also retrieve zone IDs directly via the API:
- `/points/{lat},{lon}` returns `forecastZone` and `county` IDs
- `/zones/{type}` returns all zones for a given type, for example, `/zones/county`

### Zone Types Overview

| Zone Type         | Description                                      | Use Cases                              | How to Retrieve                                                                 |
|-------------------|--------------------------------------------------|----------------------------------------|----------------------------------------------------------------------------------|
| **Public Zones**  | City/county-level areas for general forecasts    | Public weather alerts, daily forecasts | - [`/points/{lat},{lon}`](https://www.weather.gov/gis/ZoneCounty) → `forecastZone`<br>- [`/zones/public`](https://www.weather.gov/gis/publiczones) |
| **Fire Weather**  | Defined by fire-prone vegetation and risk zones  | Fire danger warnings and planning      | - `/points/{lat},{lon}` → `fireWeatherZone`<br>- [`/zones/fire`](https://www.weather.gov/gis/publiczones) |
| **Marine Zones**  | Coastal and offshore water areas                 | Marine forecasts, small craft advisories | - [`/zones/marine`](https://www.weather.gov/gis/publiczones) |
| **County Zones**  | Administrative counties used in alerts           | Backup or overlapping alert systems    | - [`/zones/county`](https://www.weather.gov/gis/ZoneCounty) |

## Navigating the API
The NWS API is designed for discoverability and future-proofing:
- Clients follow linked resources instead of hardcoding endpoints
- This structure reduces maintenance and ensures compatibility with future updates
