---
parent: Key Concepts
title: Alerts and Warnings
layout: default
nav_order: 4
has_children: false
---

## <span class="c7 c5">Alerts and Warnings</span>

The NWS issues <span class="c5">alerts</span> when there is a need to
inform the public about significant weather conditions. They're issued
when the weather <span class="c5">may</span> pose a serious threat, but
the impact depends on the severity of the forecast. Alerts include
<span class="c5">watches</span>, <span class="c5">warnings</span>,
<span class="c5">advisories</span>, and
<span class="c5">statements</span><span class="c0">.</span>

<span class="c0"></span>

- <span class="c5">Warnings </span><span class="c0">are urgent alerts
  that indicate that a serious weather event is imminent or
  happening.</span>

### <span class="c5 c10">Forecast Grids vs. Alert Polygons</span>

<span class="c0">Understanding the difference between how the NWS API
structures forecast data (via grid points) and alert data (via GeoJSON
polygons) is key to proper visualization and response handling.</span>

<span class="c0"></span>

The NWS API returns <span class="c5">observations</span> and
<span class="c5">forecasts</span> within the grid area assigned to a
specific Weather Forecasting Office (WFO) using the
<span class="c12">gridX</span> and
<span class="c12">gridY</span> parameters. The grid system helps fill in
gaps between data points, providing complete and accurate weather
coverage for an area. For example, let’s say you want to get the
temperature for specific area in Chicago represented by
<span class="c5">grid point
</span>(<span class="c9">gridX:</span><span class="c3"> </span><span class="c6">45</span><span class="c3">,
</span><span class="c9">gridY:</span><span class="c3"> </span><span class="c6">30</span><span class="c0">).
Since the grid area that we've chosen lies between several observation
stations, the API will estimate the temperature based on multiple
observation stations rather than relying on just one station. This
system allows more precise forecasts, even in areas where weather
stations are far apart. </span>

<span class="c0"></span>

When issuing warnings and alerts, the NWS uses precise geographic
boundaries to define the area under threat, rather than relying on
predefined grid cells. A grid-based forecast might say, “Thunderstorms
expected across a 20 × 20-mile area,” even though not all locations
within that area will be equally affected. When a forecasting office
determines that a severe weather event will impact a specific region, it
issues alerts using <span class="c5">irregular polygons</span> described
in <span class="c5">GeoJSON</span>, which match the actual storm
path. This approach ensures that <span class="c5">only the truly
affected areas</span><span class="c0"> receive alerts.</span>

<span class="c1"></span>

<span class="c1"></span>

## <span class="c5 c7">Alerts and Warnings</span>

The NWS issues <span class="c5">alerts</span> when there is a need to
inform the public about significant weather conditions. They're issued
when the weather <span class="c5">may</span> pose a serious threat, but
the impact depends on the severity of the forecast. Alerts include
<span class="c5">watches</span>, <span class="c5">warnings</span>,
<span class="c5">advisories</span>, and
<span class="c5">statements</span><span class="c0">.</span>

<span class="c0"></span>

- <span class="c5">Warnings </span><span class="c0">are urgent alerts
  that indicate that a serious weather event is imminent or
  happening.</span>

### <span class="c10 c5">Forecast Grids vs. Alert Polygons</span>

<span class="c0">Understanding the difference between how the NWS API
structures forecast data (via grid points) and alert data (via GeoJSON
polygons) is key to proper visualization and response handling.</span>

<span class="c0"></span>

The NWS API returns <span class="c5">observations</span> and
<span class="c5">forecasts</span> within the grid area assigned to a
specific Weather Forecasting Office (WFO) using the
<span class="c12">gridX</span> and
<span class="c12">gridY</span> parameters. The grid system helps fill in
gaps between data points, providing complete and accurate weather
coverage for an area. For example, let’s say you want to get the
temperature for specific area in Chicago represented by
<span class="c5">grid point
</span>(<span class="c9">gridX:</span><span class="c3"> </span><span class="c6">45</span><span class="c3">,
</span><span class="c9">gridY:</span><span class="c3"> </span><span class="c6">30</span><span class="c0">).
Since the selected grid area lies between several observation
stations, the API will estimate the temperature based on multiple
observation stations rather than relying on just one station. This
system allows more precise forecasts, even in areas where weather
stations are far apart. </span>

<span class="c0"></span>

When issuing warnings and alerts, the NWS uses precise geographic
boundaries to define the area under threat, rather than relying on
predefined grid cells. A grid-based forecast might say, “Thunderstorms
expected across a 20 × 20-mile area,” even though not all locations
within that area will be equally affected. When a forecasting office
determines that a severe weather event will impact a specific region, it
issues alerts using <span class="c5">irregular polygons</span> described
in <span class="c5">GeoJSON</span>, which closely match the actual storm
path. This approach ensures that <span class="c5">only the truly
affected areas</span><span class="c0"> receive alerts.</span>

<span class="c1"></span>

<span class="c1"></span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 322.67px;"><img src="images/image1.png"
style="width: 624.00px; height: 322.67px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" /></span>

<span class="c0"></span>

<span class="c0"></span>

<span class="c0"></span>

## What's GeoJSON?

<span class="c0"></span>

GeoJSON is an extension of JSON used to encode geographic data
structures. It's the standard format for geographic data in the NWS
API. GeoJSON follows JSON’s syntax but has special
<span class="c5">Geometry Objects</span> to represent spatial data.
GeoJSON Geometry Objects include:
<span class="c8">Point</span><span class="c14">,
</span><span class="c8">LineString</span><span class="c14">,
</span><span class="c8">Polygon</span><span class="c14">,
</span><span class="c8">MultiPoint</span><span class="c14">,
</span><span class="c8">MultiLineString</span><span class="c14">,
</span>and<span class="c14"> </span><span class="c8">MultiPolygon.</span> For
an in-depth explanation of GeoJSON, click here<span class="c17"> \[HREF
explainer\]</span>

<span class="c0"></span>