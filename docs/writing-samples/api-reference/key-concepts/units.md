---
title: "Units"
description: "Explains Units Used by the NWS API."
---

# Units of Measurement

The National Weather Service API returns data using a combination of **imperial** and **SI (metric)** units, depending on the endpoint and user preferences. Understanding the default units and how to convert them ensures accurate interpretation of forecast and observation data.

---

## Default Units by Data Type

| Data Type             | Unit         | Description                          |
|-----------------------|--------------|--------------------------------------|
| Temperature           | °F           | Degrees Fahrenheit                   |
| Wind Speed            | mph          | Miles per hour                       |
| Wind Gust             | mph          | Miles per hour                       |
| Precipitation Amount  | in           | Inches                               |
| Snowfall Amount       | in           | Inches                               |
| Pressure              | inHg         | Inches of Mercury                    |
| Humidity              | %            | Relative humidity                    |
| Visibility            | mi           | Miles                                |
| Probability of Precip | %            | Percent chance over time period      |

---

## Unit Conversions

For users needing metric units, you can convert the values manually or configure your client application to convert them automatically. Here's a quick reference:

| Imperial Unit | Metric Equivalent   |
|---------------|---------------------|
| °F            | (°F − 32) × 5⁄9 = °C |
| mph           | 1 mph = 1.60934 km/h |
| in (precip)   | 1 in = 25.4 mm       |
| inHg          | 1 inHg = 33.8639 hPa |
| mi            | 1 mi = 1.60934 km    |

---

## Customizing Units in API Responses

Currently, the API doesn't allow unit customization through request parameters. All values are returned in default formats. Developers should implement unit conversion on the client side if metric units are required for international audiences.

---

## Notes

- Times and durations are returned in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).
- Coordinate values (latitude and longitude) are expressed in decimal degrees.
- All forecast grids use a consistent scale (~2.5 km resolution).

---

👉 **Next:** Learn about NWS [Endpoints](../endpoints/index.md) →
