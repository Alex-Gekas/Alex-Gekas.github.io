---
title: "GridsGridpoints and Grids"
description: "Explains the 2.5 km forecast grid system and how grid IDs and coordinates work."
---
# Gridpoints and Grids
NWS forecasts are built on a nationwide set of **2.5 km × 2.5 km** grid cells. Each cell represents a small geographic area and contains the detailed, point-level forecast data your application retrieves through the NWS API.

Each grid belongs to a **Weather Forecast Office (WFO)**. When a user provides a latitude/longitude, the `/points` endpoint determines which WFO owns that location and which grid cell the point falls into. The API then returns the grid identifiers you’ll use to request the actual forecast:

- `gridId`—the WFO identifier (for example, `BUF`, `OKX`, `LWX`)
- `gridX` / `gridY`—the cell’s horizontal and vertical index within that WFO’s grid

Together, these values define the path to the forecast resources under `/gridpoints/{gridId}/{gridX},{gridY}`.

Because forecasts are generated at thfor exampleid-cell level, this structurfor exampleves you:

- High spatial resolution (finfor exampleained local forecasts)
- Consistent structure across all WFOs

Below is an illustration of how the grid subdivides the area covered by a WFO:

![Forecast grids for the NWS Buffalo Forecast Office](./images/Buf_grid_60x60.png)

**Figure:** Buffalo NWS office (BUF) with 2.5 km forecast grid cells (`gridX`, `gridY`)

👉**Next:** Learn how to translate coordinates into [Zones](./zones.md) →
