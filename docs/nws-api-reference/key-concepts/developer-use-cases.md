---
title: "Developer use cases"
description: "Practical examples of how grids, zones, and WFOs shape real API workflows."
---

# Why this matters (developer use cases)

Understanding grids, zones, and WFOs helps you:

- request the right **gridpoint forecasts**
- interpret **zone-based alerts**
- organize cached weather data by region
- handle multi-region or nationwide apps reliably

If you know how a point maps to a grid and zone, you know which endpoint to use in the following use cases:

---

## Use case 1: Getting a point forecast

- You must resolve a point to a grid cell  
- **Why:** Forecasts are grid-based  
- **Workflow:** `/points → forecast URL → /gridpoints`

## Use case 2: Showing regional alerts

- Alerts reference zone IDs  
- Workflow: `/points → zone links → /zones → /alerts?zone=...`

## Use case 3: Mapping or visualizing coverage

- Zones provide boundaries  
- Grids provide local detail  
- Use `include-geometry` when you need polygon shapes

## Use case 4: Building scalable weather widgets

- Grid-based forecasts are stable and cacheable  
- Zones help avoid duplicate alert checks

## Use case 5: Supporting marine or fire-weather users

- `/points` identifies special zone types  
- Different zone types map to different forecast products

---

# Putting it all together

The NWS API always follows the same pattern:

- A point maps to a **grid** and one or more **zones**
- Those structures belong to a **forecast office (WFO)**
- Every forecast or alert request follows this chain
- `gridId`, `gridX`, `gridY`, and zone IDs are stable keys you can rely on
- `/points` is the entry point that ties everything together

**Guidance:**

> When in doubt, start with `/points/{lat},{lon}`.  
> It always gives you the correct links to follow next.

👉**Next:** Learn [Status codes](./status-codes.md) → 
