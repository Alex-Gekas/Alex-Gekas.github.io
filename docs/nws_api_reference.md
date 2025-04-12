### **API Overview**

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

---

### **Base URL**

| https:*//api.weather.gov* |
| :---- |

---

### **1\. Authentication and Headers**

The API does not require a key for authentication. Instead, it requires an identifying string, or `User-Agent`, unique to the application making requests. Including the application name and a valid contact method in the User-Agent is recommended. In case of a security event associated with your application, the NWS API administrators will contact you at the provided email address.

**Example Header:**

| User-Agent: MyWeatherApp 1.0/ (myemail@example.com) |
| :---- |

**Note:** Submitting requests without a User-Agent will result in a 403 Forbidden error.

**Example Error:**

| Access Denied You don't have permission to access "http://api.weather.gov/points/43.1566,-77.6088" on this server.Reference \#18.c968dc17.1737489616.6bd4c22 |
| :---- |

### **2\. Caching best practices**

Although the NWS API does not enforce strict rate limits—the exact limit is undisclosed but described as "generous"—applications that rely on the API can greatly improve performance and efficiency by implementing caching best practices. Certain endpoints are updated more frequently than others, and having a caching strategy can reduce the load on the API, decrease response time, and optimize bandwidth usage. 

### **When Should You Cache NWS API Responses?**

| NWS Endpoint | Recommended Caching Time | Reason |
| ----- | ----- | ----- |
| `/alerts/active` | **5–10 minutes** | Alerts update frequently but not instantly. |
| `/alerts/active/zone/{zoneId}` | **5–10 minutes** | Similar to general alerts, but localized. |
| `/points/{latitude},{longitude}/forecast` | **15–30 minutes** | Forecasts update only a few times per day. |
| `/gridpoints/{wfo}/{x},{y}/forecast` | **15–30 minutes** | Similar to `/points` but based on grid data. |
| `/stations/{stationId}/observations/latest` | **5–10 minutes** | Weather stations update at different intervals. |
| `/stations/{stationId}/observations` | **1–2 hours** | Past observations are static; rarely need real-time fetch. |
| `/zones/{type}/{zoneId}` (Zone Metadata) | **24 hours** | Metadata changes very rarely. |

### **How to Implement Caching**

#### **1\. Using HTTP Headers (Browser & API Clients)**

* The NWS API includes caching headers like:  
  * `Cache-Control: max-age=600` (600 seconds \= 10 minutes)  
  * `ETag` for response versioning  
* Clients can **respect these headers** instead of re-requesting unchanged data.

#### **2\. Local Caching (In-Memory or Database)**

* Store **frequently requested API responses** in:  
  * **Redis** (fast in-memory store)  
  * **SQLite/PostgreSQL** (for long-term storage)  
  * **Local JSON files** (simple apps)

#### **3\. Caching in Python (Example with Requests & Redis)**

| import requestsimport redisimport jsonimport time*\# Initialize Redis cache*cache \= redis.Redis(host='localhost', port=6379, db=0)def get\_forecast(zone\_id):    cache\_key \= f"forecast:{zone\_id}"    cached\_response \= cache.get(cache\_key)    if cached\_response:        print("Returning cached data")        return json.loads(cached\_response)  *\# Convert bytes to JSON*    *\# Fetch from NWS API*    url \= f"https://api.weather.gov/alerts/active/zone/{zone\_id}"    response \= requests.get(url, headers={"Accept": "application/json"})    if response.status\_code \== 200:        data \= response.json()        cache.setex(cache\_key, 600, json.dumps(data))  *\# Cache for 10 min*        return data    return None*\# Example Usage*zone\_forecast \= get\_forecast("NYZ072")print(zone\_forecast) |
| :---- |

* Short-lived data (like active alerts) should be cached for 5-10 minutes.   
* Static data (like zone data) should be cached for hours or days.

### **4\. Forecasts**

Each local National Weather Service office issues forecasts and alerts for its designated forecast area. Weather forecasts are available at varying levels of granularity. The API’s structure allows applications to navigate related resources without hardcoding multiple endpoints, simplifying application code and maintaining functionality during API updates.

#### **Understanding the Grid System**

The NWS API relies on a grid system to organize forecast data geographically. The grid divides the U.S. into a network of rectangular cells, each representing a specific geographic area. Each grid cell is assigned unique coordinates (`gridX`, `gridY`) within a **Weather Forecast Office (WFO)** region.

* **Grid Size**: Each grid cell covers approximately 2.5 km by 2.5 km.  
* **WFO Regions**: The U.S. is divided into areas managed by specific WFOs, each responsible for issuing forecasts and alerts for its grid cells.  
* **Point Translation**: When querying the `/points/{latitude},{longitude}` endpoint, the API converts the latitude and longitude into the corresponding WFO and grid coordinates. These are then used to retrieve precise forecast data.

**Example Grid Coordinates:** For LaGuardia Airport (latitude: 40.7766, longitude: \-73.8742):

* WFO: `OKX`  
* Grid Coordinates: `gridX=37`, `gridY=39`

This grid-based approach ensures that forecast data is precise and scalable, allowing the API to provide both localized and regional forecasts.

#### **Endpoints**

**7-Day Forecast for a Point:**

`/points/{latitude},{longitude}/`

* **Purpose**: Retrieves metadata about a specific geographic location, including links to related resources such as forecasts, alerts, and observation stations.  
* **HTTP Method**: `GET`

**Request Parameters:**

| Parameter | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| `latitude` | float | Yes | Latitude of the desired point (4 decimal places) |
| `longitude` | float | Yes | Longitude of the desired point (4 decimal places) |

**Headers:**

| Header | Required | Description |
| ----- | ----- | ----- |
| `User-Agent` | Yes | Identifies your application. Example: `YourAppName (your-email@example.com)` |

**Example Request:**

For LaGuardia Airport (NYC):

* **Latitude**: 40.7766  
* **Longitude**: \-73.8742

**Request URL:**

| https://api.weather.gov/points/40.7766,-73.8742 |
| :---- |

**Request Using cURL:**

| curl \--location "https://api.weather.gov/points/40.7766,-73.8742" \\\--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

**Response Details:**

| Sample Response:{    "@context": \[        "https://geojson.org/geojson-ld/geojson-context.jsonld",        {            "@version": "1.1",            "wx": "https://api.weather.gov/ontology\#",            "s": "https://schema.org/",            "geo": "http://www.opengis.net/ont/geosparql\#",            "unit": "http://codes.wmo.int/common/unit/",            "@vocab": "https://api.weather.gov/ontology\#",            "geometry": {                "@id": "s:GeoCoordinates",                "@type": "geo:wktLiteral"            },            "city": "s:addressLocality",            "state": "s:addressRegion",            "distance": {                "@id": "s:Distance",                "@type": "s:QuantitativeValue"            },            "bearing": {                "@type": "s:QuantitativeValue"            },            "value": {                "@id": "s:value"            },            "unitCode": {                "@id": "s:unitCode",                "@type": "@id"            },            "forecastOffice": {                "@type": "@id"            },            "forecastGridData": {                "@type": "@id"            },            "publicZone": {                "@type": "@id"            },            "county": {                "@type": "@id"            }        }    \],    "id": "https://api.weather.gov/points/40.7766,-73.8742",    "type": "Feature",    "geometry": {        "type": "Point",        "coordinates": \[            \-73.8742,            40.7766        \]    },    "properties": {        "forecast": "https://api.weather.gov/gridpoints/OKX/37,39/forecast",        "forecastHourly": "https://api.weather.gov/gridpoints/OKX/37,39/forecast/hourly",        ...    }} |
| :---- |

**Grid Point Forecast**

`/gridpoints/{wfo}/{x},{y}/forecast`

* **Purpose:** Retrieves the 7-day forecast for a specific grid point within a Weather Forecast Office (WFO) area. This endpoint provides detailed forecast data directly without needing to query the `/points` endpoint first.  
* **HTTP Method**: GET


**Request Parameters**

| Parameter | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| WFO | string | yes | A three-letter code for the Weather Forecasting Office issuing the forecast |
| x | integer | yes | X grid coordinate for WFO |
| y | integer | yes | Y grid coordinate for WFO |

**Headers**

| Header | Required | Description |
| :---- | :---- | :---- |
| User-Agent | yes | Identifies your application. Example: YourAppName (your-email@example.com) |

**Example Request:**

For LaGuardia Airport (NYC):

* **x**: 37  
* **y**: 39  
* **WFO**: OKX

**Request URL:**

| https://api.weather.gov/gridpoints/OKX/37,39/forecast |
| :---- |

**Request Using cURL:**

| curl \--location "[https://api.weather.gov/gridpoints/OKX/37,39/forecast](https://api.weather.gov/gridpoints/OKX/37,39/forecast)" \--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

#### **How to Retrieve the 7-Day Forecast Starting with Latitude and Longitude**

1. Send a `GET` request to `/points/{latitude},{longitude}`.  
2. Extract the `forecast` property from the response.  
3. Send a `GET` request to the extracted `forecast` URL.

**Code Examples:**

| Python:import requestsurl \= "https://api.weather.gov/points/40.7766,-73.8742"headers \= {"User-Agent": "YourAppName (your-email@example.com)"}response \= requests.get(url, headers=headers)if response.status\_code \== 200:    forecast\_url \= response.json()\['properties'\]\['forecast'\]    forecast\_response \= requests.get(forecast\_url, headers=headers)    print(forecast\_response.json())else:    print(f"Error: {response.status\_code}") |
| :---- |

**Response Example:** 

| {    "@context": \[        "https://geojson.org/geojson-ld/geojson-context.jsonld",        {            "@version": "1.1",            "wx": "https://api.weather.gov/ontology\#",            "geo": "http://www.opengis.net/ont/geosparql\#",            "unit": "http://codes.wmo.int/common/unit/",            "@vocab": "https://api.weather.gov/ontology\#"        }    \],    "type": "Feature",    "geometry": {        "type": "Polygon",        "coordinates": \[            \[                \[                    \-73.868600000000001,                    40.775100000000002                \],                \[                    \-73.864099899999999,                    40.796800000000005                \],                \[                    \-73.892700000000005,                    40.800199900000003                \],                \[                    \-73.897199999999998,                    40.778500000000001                \],                \[                    \-73.868600000000001,                    40.775100000000002                \]            \]        \]    },    "properties": {        "units": "us",        "forecastGenerator": "BaselineForecastGenerator",        "generatedAt": "2025-01-28T15:38:59+00:00",        "updateTime": "2025-01-28T10:46:10+00:00",        "validTimes": "2025-01-28T04:00:00+00:00/P8DT3H",        "elevation": {            "unitCode": "wmoUnit:m",            "value": 0        },        "periods": \[            {                "number": 1,                "name": "Today",                "startTime": "2025-01-28T10:00:00-05:00",                "endTime": "2025-01-28T18:00:00-05:00",                "isDaytime": true,                "temperature": 42,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 20                },                "windSpeed": "12 to 22 mph",                "windDirection": "W",                "icon": "https://api.weather.gov/icons/land/day/snow,20?size=medium",                "shortForecast": "Slight Chance Snow Showers",                "detailedForecast": "A slight chance of snow showers before 1pm. Partly sunny. High near 42, with temperatures falling to around 34 in the afternoon. West wind 12 to 22 mph, with gusts as high as 41 mph. Chance of precipitation is 20%."            },            {                "number": 2,                "name": "Tonight",                "startTime": "2025-01-28T18:00:00-05:00",                "endTime": "2025-01-29T06:00:00-05:00",                "isDaytime": false,                "temperature": 32,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 20                },                "windSpeed": "5 to 14 mph",                "windDirection": "SW",                "icon": "https://api.weather.gov/icons/land/night/snow,20?size=medium",                "shortForecast": "Slight Chance Snow Showers",                "detailedForecast": "A slight chance of snow showers between 10pm and 3am. Mostly cloudy. Low around 32, with temperatures rising to around 36 overnight. Southwest wind 5 to 14 mph. Chance of precipitation is 20%."            },            {                "number": 3,                "name": "Wednesday",                "startTime": "2025-01-29T06:00:00-05:00",                "endTime": "2025-01-29T18:00:00-05:00",                "isDaytime": true,                "temperature": 47,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 30                },                "windSpeed": "15 to 22 mph",                "windDirection": "W",                "icon": "https://api.weather.gov/icons/land/day/snow,20/snow,30?size=medium",                "shortForecast": "Chance Rain And Snow Showers",                "detailedForecast": "A chance of rain and snow showers after 10am. Partly sunny. High near 47, with temperatures falling to around 42 in the afternoon. West wind 15 to 22 mph, with gusts as high as 44 mph. Chance of precipitation is 30%."            },            {                "number": 4,                "name": "Wednesday Night",                "startTime": "2025-01-29T18:00:00-05:00",                "endTime": "2025-01-30T06:00:00-05:00",                "isDaytime": false,                "temperature": 24,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 20                },                "windSpeed": "17 to 22 mph",                "windDirection": "NW",                "icon": "https://api.weather.gov/icons/land/night/snow,20/wind\_sct?size=medium",                "shortForecast": "Slight Chance Snow Showers then Partly Cloudy",                "detailedForecast": "A slight chance of snow showers before 7pm. Partly cloudy. Low around 24, with temperatures rising to around 26 overnight. Wind chill values as low as 13\. Northwest wind 17 to 22 mph, with gusts as high as 37 mph. Chance of precipitation is 20%."            },            {                "number": 5,                "name": "Thursday",                "startTime": "2025-01-30T06:00:00-05:00",                "endTime": "2025-01-30T18:00:00-05:00",                "isDaytime": true,                "temperature": 35,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": null                },                "windSpeed": "10 to 16 mph",                "windDirection": "W",                "icon": "https://api.weather.gov/icons/land/day/few?size=medium",                "shortForecast": "Sunny",                "detailedForecast": "Sunny, with a high near 35\. West wind 10 to 16 mph."            },            {                "number": 6,                "name": "Thursday Night",                "startTime": "2025-01-30T18:00:00-05:00",                "endTime": "2025-01-31T06:00:00-05:00",                "isDaytime": false,                "temperature": 33,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": null                },                "windSpeed": "7 to 10 mph",                "windDirection": "SW",                "icon": "https://api.weather.gov/icons/land/night/bkn/snow\_fzra?size=medium",                "shortForecast": "Mostly Cloudy then Slight Chance Light Snow",                "detailedForecast": "A slight chance of snow and a slight chance of sleet and a slight chance of freezing rain after 1am. Mostly cloudy, with a low around 33."            },            {                "number": 7,                "name": "Friday",                "startTime": "2025-01-31T06:00:00-05:00",                "endTime": "2025-01-31T18:00:00-05:00",                "isDaytime": true,                "temperature": 47,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 70                },                "windSpeed": "10 mph",                "windDirection": "SW",                "icon": "https://api.weather.gov/icons/land/day/snow\_fzra,70/rain,70?size=medium",                "shortForecast": "Slight Chance Light Snow then Light Rain Likely",                "detailedForecast": "A slight chance of snow and a slight chance of sleet and a slight chance of freezing rain before 7am, then rain likely. Cloudy, with a high near 47\. Chance of precipitation is 70%."            },            {                "number": 8,                "name": "Friday Night",                "startTime": "2025-01-31T18:00:00-05:00",                "endTime": "2025-02-01T06:00:00-05:00",                "isDaytime": false,                "temperature": 31,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 70                },                "windSpeed": "13 mph",                "windDirection": "W",                "icon": "https://api.weather.gov/icons/land/night/rain,70/snow,60?size=medium",                "shortForecast": "Light Rain Likely then Chance Light Snow",                "detailedForecast": "Rain likely before 1am, then a chance of snow. Mostly cloudy, with a low around 31\. Chance of precipitation is 70%."            },            {                "number": 9,                "name": "Saturday",                "startTime": "2025-02-01T06:00:00-05:00",                "endTime": "2025-02-01T18:00:00-05:00",                "isDaytime": true,                "temperature": 35,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 30                },                "windSpeed": "15 mph",                "windDirection": "NW",                "icon": "https://api.weather.gov/icons/land/day/snow,30/snow?size=medium",                "shortForecast": "Chance Light Snow",                "detailedForecast": "A chance of snow before 1pm. Mostly sunny, with a high near 35\. Chance of precipitation is 30%."            },            {                "number": 10,                "name": "Saturday Night",                "startTime": "2025-02-01T18:00:00-05:00",                "endTime": "2025-02-02T06:00:00-05:00",                "isDaytime": false,                "temperature": 24,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": null                },                "windSpeed": "5 to 12 mph",                "windDirection": "NE",                "icon": "https://api.weather.gov/icons/land/night/sct/snow?size=medium",                "shortForecast": "Partly Cloudy then Slight Chance Light Snow",                "detailedForecast": "A slight chance of snow after 1am. Partly cloudy, with a low around 24."            },            {                "number": 11,                "name": "Sunday",                "startTime": "2025-02-02T06:00:00-05:00",                "endTime": "2025-02-02T18:00:00-05:00",                "isDaytime": true,                "temperature": 39,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": null                },                "windSpeed": "5 to 8 mph",                "windDirection": "E",                "icon": "https://api.weather.gov/icons/land/day/snow?size=medium",                "shortForecast": "Slight Chance Light Snow",                "detailedForecast": "A slight chance of snow. Mostly cloudy, with a high near 39."            },            {                "number": 12,                "name": "Sunday Night",                "startTime": "2025-02-02T18:00:00-05:00",                "endTime": "2025-02-03T06:00:00-05:00",                "isDaytime": false,                "temperature": 36,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 40                },                "windSpeed": "7 mph",                "windDirection": "S",                "icon": "https://api.weather.gov/icons/land/night/sleet,40?size=medium",                "shortForecast": "Chance Sleet",                "detailedForecast": "A slight chance of snow before 7pm, then a chance of sleet and a chance of rain and snow. Mostly cloudy, with a low around 36\. Chance of precipitation is 40%."            },            {                "number": 13,                "name": "Monday",                "startTime": "2025-02-03T06:00:00-05:00",                "endTime": "2025-02-03T18:00:00-05:00",                "isDaytime": true,                "temperature": 48,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 40                },                "windSpeed": "8 to 15 mph",                "windDirection": "W",                "icon": "https://api.weather.gov/icons/land/day/sleet,40/bkn?size=medium",                "shortForecast": "Chance Sleet then Partly Sunny",                "detailedForecast": "A chance of sleet and a chance of rain and snow before 7am. Partly sunny, with a high near 48\. Chance of precipitation is 40%."            },            {                "number": 14,                "name": "Monday Night",                "startTime": "2025-02-03T18:00:00-05:00",                "endTime": "2025-02-04T06:00:00-05:00",                "isDaytime": false,                "temperature": 28,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": null                },                "windSpeed": "14 mph",                "windDirection": "NW",                "icon": "https://api.weather.gov/icons/land/night/sct?size=medium",                "shortForecast": "Partly Cloudy",                "detailedForecast": "Partly cloudy, with a low around 28."            }        \]    }} |
| :---- |

**Note:**

* The endpoint returns two forecasts per day in the JSON Response, a daytime forecast from **6:00 am \- 6:00 pm** and a nighttime forecast from **6:00 pm to 6:00 am** (next day).

**Hourly Forecast for a Point:**

`/points/{wfo}/{x},{y}/forecast/hourly`  
Provides an hourly forecast for the specified location for seven days.

**Request URL**

| https://api.weather.gov/points/{WFO}/{x},{y}/forecast/hourly |
| :---- |

**HTTP Method**

| GET |
| :---- |

### **Purpose**

This endpoint retrieves the hourly forecast data for a location, specified by its (WFO) Weather Forecast Office and grid coordinates. 

**Request Parameters**

| Parameter | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| WFO | string | yes | A three-letter code for the Weather Forecasting Office issuing the forecast |
| x | integer | yes | X grid coordinate for WFO |
| y | integer | yes | Y grid coordinate for WFO |

**Headers**

| Header | Required | Description |
| :---- | :---- | :---- |
| User-Agent | yes | Identifies your application. Example: YourAppName (your-email@example.com) |

**Request Example**

To get the 7–day hourly forecast for LaGuardia Airport (NYC):

* {WFO}: `OKX`  
* {x}: `37`  
* {y}: `39`

**cURL**

| Curl--location'[https://api.weather.gov/gridpoints/OKX/37,39/forecast/hourl](https://api.weather.gov/gridpoints/OKX/37,39/forecast/hourly)' \--header 'User-Agent: YourAppName (your-email@example.com)'' \--header 'User-Agent: YourAppName (your-email@example.com)' |
| :---- |

**JavaScript (Fetch)**

| const requestOptions \= {  method: "GET",  redirect: "follow"};fetch("https://api.weather.gov/gridpoints/OKX/37,39/forecast/hourly", requestOptions)  .then((response) \=\> response.text())  .then((result) \=\> console.log(result))  .catch((error) \=\> console.error(error)); |
| :---- |

**Python (Requests)**

| import requestsurl \= "https://api.weather.gov/gridpoints/OKX/37,39/forecast/hourly"payload \= {}headers \= {}response \= requests.request("GET", url, headers=headers, data=payload)print(response.text) |
| :---- |

**Sample JSON Response**

| {    "@context": \[        "https://geojson.org/geojson-ld/geojson-context.jsonld",        {            "@version": "1.1",            "wx": "https://api.weather.gov/ontology\#",            "geo": "http://www.opengis.net/ont/geosparql\#",            "unit": "http://codes.wmo.int/common/unit/",            "@vocab": "https://api.weather.gov/ontology\#"        }    \],    "type": "Feature",    "geometry": {        "type": "Polygon",        "coordinates": \[            \[                \[                    \-73.868600000000001,                    40.775100000000002                \],                \[                    \-73.864099899999999,                    40.796800000000005                \],                \[                    \-73.892700000000005,                    40.800199900000003                \],                \[                    \-73.897199999999998,                    40.778500000000001                \],                \[                    \-73.868600000000001,                    40.775100000000002                \]            \]        \]    },    "properties": {        "units": "us",        "forecastGenerator": "HourlyForecastGenerator",        "generatedAt": "2025-01-28T19:11:59+00:00",        "updateTime": "2025-01-28T16:51:11+00:00",        "validTimes": "2025-01-28T10:00:00+00:00/P7DT21H",        "elevation": {            "unitCode": "wmoUnit:m",            "value": 0        },        "periods": \[            {                "number": 1,                "name": "",                "startTime": "2025-01-28T14:00:00-05:00",                "endTime": "2025-01-28T15:00:00-05:00",                "isDaytime": true,                "temperature": 38,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 6                },                "dewpoint": {                    "unitCode": "wmoUnit:degC",                    "value": \-10.555555555555555                },                "relativeHumidity": {                    "unitCode": "wmoUnit:percent",                    "value": 35                },                "windSpeed": "20 mph",                "windDirection": "NW",                "icon": "https://api.weather.gov/icons/land/day/sct?size=small",                "shortForecast": "Mostly Sunny",                "detailedForecast": ""            },            {                "number": 2,                "name": "",                "startTime": "2025-01-28T15:00:00-05:00",                "endTime": "2025-01-28T16:00:00-05:00",                "isDaytime": true,                "temperature": 37,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 6                },                "dewpoint": {                    "unitCode": "wmoUnit:degC",                    "value": \-11.111111111111111                },                "relativeHumidity": {                    "unitCode": "wmoUnit:percent",                    "value": 35                },                "windSpeed": "17 mph",                "windDirection": "NW",                "icon": "https://api.weather.gov/icons/land/day/sct?size=small",                "shortForecast": "Mostly Sunny",                "detailedForecast": ""            },            {                "number": 3,                "name": "",                "startTime": "2025-01-28T16:00:00-05:00",                "endTime": "2025-01-28T17:00:00-05:00",                "isDaytime": true,                "temperature": 36,                "temperatureUnit": "F",                "temperatureTrend": "",                "probabilityOfPrecipitation": {                    "unitCode": "wmoUnit:percent",                    "value": 6                },                "dewpoint": {                    "unitCode": "wmoUnit:degC",                    "value": \-12.222222222222221                },                "relativeHumidity": {                    "unitCode": "wmoUnit:percent",                    "value": 33                },                "windSpeed": "16 mph",                "windDirection": "NW",                "icon": "https://api.weather.gov/icons/land/day/sct?size=small",                "shortForecast": "Mostly Sunny",                "detailedForecast": ""            }, }} |
| :---- |

**Notes:**

* The JSON response above has been shortened to show only the first three hours of the seven-day hourly forecast for brevity.  
* `The detailed-forecast` key pair returns an empty string for the /forecast/hourly endpoint.

**Zone-Based Forecasts**

Within the areas covered by a grid for each Weather Forecast Office (WFO), the National Weather Service divides regions into **zones**. Zones represent predefined areas for issuing weather alerts, forecasts, and other weather-related information. They provide a flexible way to deliver forecasts and alerts to regions larger than grid cells but smaller than an entire WFO area.

**Types of Zones:**

* **Public Zones**: These often align with county or city boundaries and are used to issue public weather forecasts.  
* **Fire Weather Zones**: These are specific regions defined based on vegetation and fire-prone areas, used to issue fire weather forecasts.  
* **Marine Zones**: These cover water regions, including bays, coastal waters, and offshore zones, for issuing marine weather forecasts.

A unique Zone ID is assigned to each zone. They usually fall within the grid for each WFO, but sometimes they overlap with the grids of neighboring WFOs. You can look up the Zone ID by using the interactive map at [weather.gov](http://weather.gov) or by using the responses from the following endpoints:

#### **Latitude and Longitude**

* **Endpoint**: `/points/{latitude},{longitude}`  
* **Response**: Includes `forecastZone` and `county` properties containing the zone IDs

#### **By County Name**

* **Endpoint:** `/zones/{type}` endpoint with `type` set to `county`:  
  * `/zones/county`  
  * **Response**: includes zone IDs for all counties

**Zone-Specific Endpoints:**

| Endpoint | Purpose |
| :---- | :---- |
| `/zones/{type}/{zoneId}` | Retrieve metadata or forecasts for a specific zone. |
| `/alerts/active/zone/{zoneId}` | Get active alerts for a particular zone. |

**Example:**

To retrieve active alerts for the public zone `NYZ072`:

**cURL**

| curl \--location "https://api.weather.gov/alerts/active/zone/NYZ072" \--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

**Javascript (Fetch)**

| const requestOptions \= {  method: "GET",  redirect: "follow"};fetch("https://api.weather.gov/alerts/active/zone/NYZ072", requestOptions)  .then((response) \=\> response.text())  .then((result) \=\> console.log(result))  .catch((error) \=\> console.error(error)); |
| :---- |

**Python**

| import requestsurl \= "https://api.weather.gov/alerts/active/zone/NYZ072"payload \= {}headers \= {}response \= requests.request("GET", url, headers=headers, data=payload)print(response.text) |
| :---- |

**Sample JSON Response**

| {    "@context": {        "@version": "1.1"    },    "type": "FeatureCollection",    "features": \[\],    "title": "Current watches, warnings, and advisories for New York (Manhattan) (NYZ072) NY",    "updated": "2025-01-28T18:31:00+00:00"} |
| :---- |

 There are no alerts in the JSON response above, but if we change the zone to Madison County, NY `NYZ036`, the JSON response contains alerts:

| {    "@context": \[        "https://geojson.org/geojson-ld/geojson-context.jsonld",        {            "@version": "1.1",            "wx": "https://api.weather.gov/ontology\#",            "@vocab": "https://api.weather.gov/ontology\#"        }    \],    "type": "FeatureCollection",    "features": \[        {            "id": "https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.5298fdc5d7322975296a0bb8f7c6a5943fa7ea51.002.1",            "type": "Feature",            "geometry": null,            "properties": {                "@id": "https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.5298fdc5d7322975296a0bb8f7c6a5943fa7ea51.002.1",                "@type": "wx:Alert",                "id": "urn:oid:2.49.0.1.840.0.5298fdc5d7322975296a0bb8f7c6a5943fa7ea51.002.1",                "areaDesc": "Seneca; Southern Cayuga; Onondaga; Madison; Cortland; Chenango; Otsego; Delaware",                "geocode": {                    "SAME": \[                        "036099",                        "036011",                        "036067",                        "036053",                        "036023",                        "036017",                        "036077",                        "036025"                    \],                    "UGC": \[                        "NYZ016",                        "NYZ017",                        "NYZ018",                        "NYZ036",                        "NYZ044",                        "NYZ045",                        "NYZ046",                        "NYZ057"                    \]                },                "affectedZones": \[                    "https://api.weather.gov/zones/forecast/NYZ016",                    "https://api.weather.gov/zones/forecast/NYZ017",                    "https://api.weather.gov/zones/forecast/NYZ018",                    "https://api.weather.gov/zones/forecast/NYZ036",                    "https://api.weather.gov/zones/forecast/NYZ044",                    "https://api.weather.gov/zones/forecast/NYZ045",                    "https://api.weather.gov/zones/forecast/NYZ046",                    "https://api.weather.gov/zones/forecast/NYZ057"                \],                "references": \[                    {                        "@id": "https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.7d02aae7d73c0778560bedf39b5a3382559d5f70.002.1",                        "identifier": "urn:oid:2.49.0.1.840.0.7d02aae7d73c0778560bedf39b5a3382559d5f70.002.1",                        "sender": "w-nws.webmaster@noaa.gov",                        "sent": "2025-01-28T09:59:00-05:00"                    }                \],                "sent": "2025-01-28T14:35:00-05:00",                "effective": "2025-01-28T14:35:00-05:00",                "onset": "2025-01-28T19:00:00-05:00",                "expires": "2025-01-29T02:45:00-05:00",                "ends": "2025-01-30T04:00:00-05:00",                "status": "Actual",                "messageType": "Update",                "category": "Met",                "severity": "Moderate",                "certainty": "Likely",                "urgency": "Expected",                "event": "Winter Weather Advisory",                "sender": "w-nws.webmaster@noaa.gov",                "senderName": "NWS Binghamton NY",                "headline": "Winter Weather Advisory issued January 28 at 2:35PM EST until January 30 at 4:00AM EST by NWS Binghamton NY",                "description": "\* WHAT...Snow and blowing snow expected. Total snow accumulations\\nbetween 4 and 9 inches. The highest snowfall amounts will occur\\nacross the elevated terrain south and southeast of Syracuse. Winds\\nwill gust up to 35 mph.\\n\\n\* WHERE...Chenango, Cortland, Delaware, Madison, Onondaga, Otsego,\\nSeneca, and Southern Cayuga Counties.\\n\\n\* WHEN...From 7 PM this evening to 4 AM EST Thursday.\\n\\n\* IMPACTS...Travel could be very difficult. The hazardous conditions\\ncould impact the Wednesday morning and evening commutes.",                "instruction": "Slow down and use caution while traveling.\\n\\nThe latest road conditions for the state you are calling from can be\\nobtained by calling 5 1 1.",                "response": "Execute",                "parameters": {                    "AWIPSidentifier": \[                        "WSWBGM"                    \],                    "WMOidentifier": \[                        "WWUS41 KBGM 281935"                    \],                    "NWSheadline": \[                        "WINTER WEATHER ADVISORY REMAINS IN EFFECT FROM 7 PM THIS EVENING TO 4 AM EST THURSDAY"                    \],                    "BLOCKCHANNEL": \[                        "EAS",                        "NWEM",                        "CMAS"                    \],                    "VTEC": \[                        "/O.CON.KBGM.WW.Y.0008.250129T0000Z-250130T0900Z/"                    \],                    "eventEndingTime": \[                        "2025-01-30T09:00:00+00:00"                    \]                }            }        }    \],    "title": "Current watches, warnings, and advisories for Madison (NYZ036) NY",    "updated": "2025-01-28T19:35:46+00:00"} |
| :---- |

---

## **5\. Observations**

Observations are real-time **temperature**, **wind**, **humidity**, **pressure**, and **precipitation data**, collected from surface stations, satellites, and radar.

### **Types of NWS Stations**

NWS stations fall into several categories based on their purpose and data collection methods:

#### **1\. Surface Weather Observation Stations**

* Located at airports, cities, and rural areas.  
* Collect real-time **temperature, wind, humidity, pressure, and precipitation** data.  
* Examples:  
  * **ASOS (Automated Surface Observing System):** Used at airports, reports every minute.  
  * **AWOS (Automated Weather Observing System):** Similar to ASOS but maintained by the FAA.  
  * **COOP (Cooperative Observer Program):** Voluntary sites that collect long-term climate data.

#### **2\. Radar Stations**

* Part of the **NEXRAD (Next-Generation Radar)** system.  
* Detect precipitation, storm intensity, and wind patterns.  
* Provide **Doppler radar imagery** for forecasting severe weather.

#### **3\. Satellite Stations**

* Operated by **NOAA (GOES, POES, JPSS satellites).**  
* Capture cloud cover, ocean temperatures, and atmospheric trends.  
* Used for large-scale climate monitoring and storm tracking.

#### **4\. River and Hydrology Stations**

* Measure **streamflow, river levels, and flooding conditions.**  
* Part of the **USGS-NWS partnership** to monitor flood risks.  
* Example: **USGS river gauges** integrated into NWS alerts.

#### **5\. Marine and Buoy Stations**

* Located along **coastal waters, lakes, and open oceans**.  
* Measure **wave heights, sea surface temperatures, and wind speeds.**  
* Examples:  
  * **NOAA Weather Buoys**  
  * **Coastal Tide Gauges**

The most commonly used source of weather observations by news outlets and emergency management agencies is the **ASOS (Automated Surface Observing System)** network.  **ASOS** provides real-time, high-frequency weather data critical for public forecasting, aviation, and emergency response agencies.

### **How Are NWS Stations Identified?**

Each station has a **unique station ID**, often based on its location or function. Common formats include:

| Station Type | Example ID | Location |
| ----- | ----- | ----- |
| ASOS/AWOS | `KJFK` | JFK Airport, NY |
| NEXRAD Radar | `KOKX` | Upton, NY (NYC Radar) |
| NOAA Buoy | `41008` | Georgia Coast |
| USGS River Gauge | `01362500` | Hudson River, NY |

 **Endpoints for accessing weather observations from specific stations.**

**Latest Observation for a Station:**

`/stations/{stationId}/observations/latest`

**Purpose:** Retrieves the most recent weather observation (most recently recorded) from a specific station*.*

**Method:** GET

**Request Parameters:** 

| Parameter | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| StationID | String | Yes | The unique identifier of the weather station (e.g., KJFK for JFK Airport). |
| start | String (ISO 8601\) | No | Start time for retrieving observations (UTC format, e.g., `2025-01-28T00:00:00Z`). |
| end | String (ISO 8601\) | No | End time for retrieving observations (UTC format, e.g., `2025-01-28T12:00:00Z`). |
| limit | String (ISO 8601\) | No | Number of observations to return (default: 1, max: varies by station). |

**Header**

| Header | Required | Description |
| :---- | :---- | :---- |
| User-Agent | yes | Identifies your application. Example: YourAppName (your-email@example.com) |

**Example API Requests**

**Get the Latest Observation (Default Behavior)**

| curl \--location "https://api.weather.gov/stations/KJFK/observations/latest" \--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

**Returns:** The most recent observation for JFK Airport (`KJFK`)

 **Retrieve Observations for a Specific Time Range**

**Get observations between 8 AM and 12 PM UTC on January 28, 2025**

| curl \--location "https://api.weather.gov/stations/KJFK/observations/latest?start=2025\-01\-28T08:00:00Z\&end=2025\-01\-28T12:00:00Z" \--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

**Returns:** A list of the observations within that time range

**Retrieve the Last 5 Observations**

| curl \--location "https://api.weather.gov/stations/KJFK/observations/latest?limit=5"\--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

**Returns:** The 5 most recent observations from JFK Airport.

**Retrieve the Last 3 Observations in a Time Range**

| curl \--location "https://api.weather.gov/stations/KJFK/observations/latest?start=2025\-01\-28T00:00:00Z\&end=2025\-01\-28T12:00:00Z&limit=3"\--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

**Returns:** The 3 most recent observations within the given time range

### **How the Parameters Interact**

* If start **and** end are used **without** limit, all available observations in that period are returned.  
* If **only** limit is used, it retrieves the **most recent** limit **observations**.  
* If **all three parameters** (start, end, and limit**)** are used, the API returns up to limit observations within the given time range.

### **Example JSON Response (With Multiple Observations)**

If multiple observations are retrieved, they are returned as an **array** in the response:

| {    "features": \[        {            "properties": {                "timestamp": "2025-01-28T12:00:00Z",                "textDescription": "Partly Cloudy",                "temperature": { "value": 5.6, "unitCode": "wmoUnit:degC" },                "windSpeed": { "value": 15, "unitCode": "wmoUnit:km\_h" }            }        },        {            "properties": {                "timestamp": "2025-01-28T11:00:00Z",                "textDescription": "Cloudy",                "temperature": { "value": 4.8, "unitCode": "wmoUnit:degC" },                "windSpeed": { "value": 12, "unitCode": "wmoUnit:km\_h" }            }        },        {            "properties": {                "timestamp": "2025-01-28T10:00:00Z",                "textDescription": "Overcast",                "temperature": { "value": 3.9, "unitCode": "wmoUnit:degC" },                "windSpeed": { "value": 10, "unitCode": "wmoUnit:km\_h" }            }        }    \]} |
| :---- |

In this example, the request returned the last 3 observations (`limit=3`).

### **Key Data Fields in the Response**

| Field | Description |
| ----- | ----- |
| `timestamp` | Time of the observation (UTC format). |
| `textDescription` | A simple textual description of the weather (e.g., "Clear", "Cloudy"). |
| `temperature` | Air temperature in degrees Celsius. |
| `dewpoint` | Dew point temperature (important for humidity calculations). |
| `windSpeed` | Wind speed in **km/h** or **m/s**. |
| `windDirection` | Wind direction in **degrees (°)** (e.g., 270° \= West wind). |
| `pressure` | Atmospheric pressure in **hPa (hectopascals)**. |
| `relativeHumidity` | Humidity percentage (%). |

**All Observations for a Station:**

`/stations/{stationId}/observations`

**Purpose:** Returns a list of historical weather observations from a station for a specified timeframe. It allows you to access multiple observations at a time, not just the latest observation. This is useful for analyzing temperature, wind, humidity, and pressure trends.

**Method:** GET

**Request Parameters:** 

| Parameter | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| StationID | String | Yes | The unique identifier of the weather station (e.g., KJFK for JFK Airport). |
| start | String (ISO 8601\) | No | Start time for retrieving observations (UTC format, e.g., `2025-01-28T00:00:00Z`). |
| end | String (ISO 8601\) | No | End time for retrieving observations (UTC format, e.g., `2025-01-28T12:00:00Z`). |
| limit | String (ISO 8601\) | No | Number of observations to return (default: 1, max: varies by station). |

**Header**

| Header | Required | Description |
| :---- | :---- | :---- |
| User-Agent | yes | Identifies your application. Example: YourAppName (your-email@example.com) |

## 

## **Example API Requests**

### **Retrieve the Last 10 Observations**

| curl \--location "https://api.weather.gov/stations/KJFK/observations?limit=10"\--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

**Returns:** The **last 10 recorded observations** from JFK Airport (`KJFK`).

---

### **Retrieve Observations for a Specific Time Range**

To retrieve observations **from January 1, 2025, between 6 AM and 12 PM UTC**:

| curl \--location "https://api.weather.gov/stations/KJFK/observations?start=2025\-01\-01T06:00:00Z\&end=2025\-01\-01T12:00:00Z" \--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

**Returns:** All recorded observations **between 06:00 and 12:00 UTC** on January 1, 2025\.

---

### **Retrieve the Last 5 Observations Within a Time Range**

| curl \--location "https://api.weather.gov/stations/KJFK/observations?start=2025\-01\-01T00:00:00Z\&end=2025\-01\-01T12:00:00Z\&limit=5" \--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

**Returns:** The **5 most recent observations** within the specified period.

---

## **Example JSON Response (Multiple Observations)**

A successful response contains **an array of observations**, formatted in **GeoJSON**:

| {    "type": "FeatureCollection",    "features": \[        {            "type": "Feature",            "geometry": {                "type": "Point",                "coordinates": \[\-73.7781, 40.6413\]            },            "properties": {                "timestamp": "2025-01-28T12:00:00Z",                "textDescription": "Partly Cloudy",                "temperature": { "value": 5.6, "unitCode": "wmoUnit:degC" },                "windSpeed": { "value": 15, "unitCode": "wmoUnit:km\_h" }            }        },        {            "type": "Feature",            "geometry": {                "type": "Point",                "coordinates": \[\-73.7781, 40.6413\]            },            "properties": {                "timestamp": "2025-01-28T11:00:00Z",                "textDescription": "Cloudy",                "temperature": { "value": 4.8, "unitCode": "wmoUnit:degC" },                "windSpeed": { "value": 12, "unitCode": "wmoUnit:km\_h" }            }        }    \]} |
| :---- |

**In this example:**

* The API returned **two past observations** for JFK (`KJFK`).  
* Each observation includes:  
  * `timestamp` (time of the observation).  
  * `textDescription` (e.g., "Partly Cloudy").  
  * `temperature`, `windSpeed`, and other key weather data.

### **Key Data Fields in the Response**

| Field | Description |
| ----- | ----- |
| `timestamp` | Time of the observation (UTC format). |
| `textDescription` | A simple textual description of the weather (e.g., "Clear", "Cloudy"). |
| `temperature` | Air temperature in degrees Celsius. |
| `dewpoint` | Dew point temperature (important for humidity calculations). |
| `windSpeed` | Wind speed in **km/h** or **m/s**. |
| `windDirection` | Wind direction in **degrees (°)** (e.g., 270° \= West wind). |
| `pressure` | Atmospheric pressure in **hPa (hectopascals)**. |
| `relativeHumidity` | Humidity percentage (%). |

---

## **Notes**

* The **number of available historical observations depends on the station**.  
* **Data is updated approximately once per hour**, but some stations update more frequently.  
* **If no data is available in the requested range**, the API returns an empty `features` array.

#### **Retrieve a Specific Weather Observation by Time**

**Endpoint:** `/stations/{stationId}/observations/{time}`

* **Purpose**: Fetches a weather observation for a specific station at a given **timestamp**.  
* **HTTP Method**: `GET`

#### **Request Parameters**

| Parameter | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| `stationId` | String | Yes | The unique identifier for the weather station (e.g., `KJFK` for JFK Airport). |
| `time` | String (ISO 8601\) | Yes | The specific timestamp for the observation (UTC format, e.g., `2025-01-28T12:00:00Z`). |

**Header:**

| Header | Required | Description |
| :---- | :---- | :---- |
| `User-Agent` | Yes | Identifies your application. Example: `YourAppName (your-email@example.com)` |

#### **Example Request**

**Retrieve the observation for JFK Airport (`KJFK`) at 12:00 UTC on January 28, 2025:**

| curl \--location "https://api.weather.gov/stations/KJFK/observations/2025\-01\-28T12:00:00Z" \--header "User-Agent: YourAppName (your-email@example.com)" |
| :---- |

#### 

#### **Example Response**

| {    "type": "Feature",    "geometry": {        "type": "Point",        "coordinates": \[\-73.7781, 40.6413\]    },    "properties": {        "timestamp": "2025-01-28T12:00:00Z",        "textDescription": "Partly Cloudy",        "temperature": { "value": 5.6, "unitCode": "wmoUnit:degC" },        "windSpeed": { "value": 15, "unitCode": "wmoUnit:km\_h" },        "windDirection": { "value": 270, "unitCode": "wmoUnit:degree\_(angle)" },        "pressure": { "value": 1013.25, "unitCode": "wmoUnit:hPa" },        "relativeHumidity": { "value": 85, "unitCode": "wmoUnit:percent" }    }} |
| :---- |

#### **Notes & Considerations**

* The **timestamp must be in ISO 8601 UTC format** (`YYYY-MM-DDTHH:MM:SSZ`).  
* If no observation is found for the specified time, the API will return an error or an empty response.  
* Observation frequency varies by station—some report hourly, while others may update more frequently.

---

## **6\. Alerts and Warnings**

The NWS issues **alerts** when there is a need to inform the public about significant weather conditions. They are issued when weather **may** pose a serious threat, but the impact depends on the severity of the forecast. Types of alerts include **watches**, **warnings**, **advisories**, and **statements**.

* **Warnings** are urgent alerts that indicate that serious weather event is imminent or happening.

### **6.1 Forecast Grids vs. Alert Polygons**

Understanding the difference between how the NWS API structures forecast data (via grid points) and alert data (via GeoJSON polygons) is key to proper visualization and response handling.

The NWS API returns **observations** and **forecasts** within the grid area assigned to a specific Weather Forecasting Office (WFO) using the gridX and gridY parameters. The grid system helps fill in gaps between data points, providing complete and accurate weather coverage for an area. For example, let’s say you want to get the temperature for specific area in Chicago represented by **grid point** (gridX: 45, gridY: 30). Since the grid area that we have chosen lies between several observation stations, the API will estimate the temperature based on multiple observation stations rather than relying on just one station. This system allows more precise forecasts, even in areas where weather stations are far apart. 

When issuing warnings and alerts, the NWS uses precise geographic boundaries to define the area under threat, rather than relying on predefined grid cells. A grid-based forecast might say, “Thunderstorms expected across a 20 × 20 mile area,” even though not all locations within that area will be equally affected. When a forecasting office determines that a specific region will be impacted by a severe weather event, it issues alerts using **irregular polygons** described in **GeoJSON**, which closely match the actual storm path. This approach ensures that **only the truly affected areas** receive alerts.

![][image1]

**What is GeoJSON?**

GeoJSON is an extension of JSON used to encode geographic data structures. It is the standard format for geographic data in the NWS API. GeoJSON follows JSON’s syntax but has special **Geometry Objects** to represent spatial data. GeoJSON Geometry Objects include: `Point`, `LineString`, `Polygon`, `MultiPoint`, `MultiLineString`, and `MultiPolygon.` For an in-depth explanation of GeoJSON, click here \[HREF explainer\]

## Endpoints to retrieve active weather alerts and detailed information about specific alerts.

**All Active Alerts**

**Endpoint:** `/alerts/active`

**Description:** The `/alerts/active` endpoint of the National Weather Service (NWS) API provides a list of currently active weather alerts across the United States. This includes warnings, watches, and advisories issued by the NWS.

**Base URL:** https://api.weather.gov/alerts/active

**Request Method:** `GET`

**Request Parameters:**

| Parameter | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| `Status` | `String` | No | Filters alerts by status (`actual, exercise, system, test`) |
| `message_type` | `String` | No | Filters alerts by message type (`alert, update, or cancel`) |
| `event` | `String` | No | Filters alerts by specific event type (e.g. Tornado Warning) |
| `area` | `String` | No | Filters by state or  region (e.g. `CA` for California |
| `code` | `String` | No | Filters by Common Alerting Protocol (CAP) alert codes |
| `urgency` | `String` | No | Filters alerts by urgency (`immediate, expected, future, or past`) |
| `severity` | `String` | No | Filters alerts by severity (`extreme, severe, moderate, or minor`) |
| `certainty` | `String` | No | Filters alerts by certainty (`observed, likely, possible, unlikely`) |
| `limit` | `Integer` | No | Limits the number of returned alerts (default is 100\) |

**Response Format:** `application/geo+json`

**Example Request:**

| GET https://api.weather.gov/alerts/active?area=FL\&severity=severe |
| :---- |

**Example Response:**

| {  "type": "FeatureCollection",  "features": \[    {      "id": "12345",      "type": "Feature",      "properties": {        "id": "12345",        "areaDesc": "Miami-Dade County, FL",        "status": "actual",        "messageType": "alert",        "event": "Tornado Warning",        "urgency": "immediate",        "severity": "severe",        "certainty": "observed",        "effective": "2025-02-04T15:00:00Z",        "expires": "2025-02-04T16:00:00Z",        "sender": "w-nws.webmaster@noaa.gov",        "headline": "Tornado Warning for Miami-Dade County",        "description": "A tornado has been sighted near Miami. Take cover now.",        "instruction": "Move to an interior room on the lowest floor of a sturdy building.",        "responseType": "Shelter"      }    }  \]} |
| :---- |

**Error Handling:**

| Error | Description |
| :---- | :---- |
| `400 Bad Request` | Invalid query parameters |
| `404 Not Found` | No active alerts found |
| `500 Internal Server Error` | An issue with the NWS API |

**Notes:**

* Data is updated in real-time as new alerts are issued.  
* Users should cache responses where possible to reduce server load.  
* The `areaDesc` field provides human-readable location descriptions.

**Active Alerts by Zone:**

**Endpoint:** `/alerts/active/zone/{zoneId}`

#### **Description:**

Retrieves active weather alerts for a specified **forecast zone** or **county zone** as defined by the National Weather Service (NWS). This endpoint filters alerts based on the **Zone ID**, which follows the format:

* **Forecast Zone ID:** `STZNNN` (e.g., `NYZ072`)  
* **County Zone ID:** `STCNNN` (e.g., `NYC027`)

---

### **Request Parameters**

| Parameter | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| `zoneId` | `string` | Yes | The Zone ID for which active alerts are requested. Use a **forecast zone** (`STZNNN`) or **county zone** (`STCNNN`). |

### **Usage Example**

To retrieve active alerts for `zoneID NYZ072`

#### **cURL Request**

| curl \-X GET "https://api.weather.gov/alerts/active/zone/NYZ072" \-H "Accept: application/json" |
| :---- |

**Javascript \- Fetch**

| const requestOptions \= {  method: "GET",  redirect: "follow"};fetch("https://api.weather.gov/alerts/active/zone/NYC027", requestOptions)  .then((response) \=\> response.text())  .then((result) \=\> console.log(result))  .catch((error) \=\> console.error(error)); |
| :---- |

#### **Python Example**

| import requestsurl \= "https://api.weather.gov/alerts/active/zone/NYZ072"headers \= {"Accept": "application/json"}response \= requests.get(url, headers=headers)data \= response.json()print(data) |
| :---- |

---

### **Response**

#### **Success (200 OK)**

A JSON object containing active alerts for the specified zone

#### **Response Example:**

**JSON**

| {     "@context": \[         "https://geojson.org/geojson-ld/geojson-context.jsonld",         {             "@version": "1.1",             "wx": "https://api.weather.gov/ontology\#",             "@vocab": "https://api.weather.gov/ontology\#"         }     \],     "type": "FeatureCollection",     "features": \[         {             "id": "https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.41744b157b637a227637b478f2550ee246bd766b.003.1",             "type": "Feature",             "geometry": null,             "properties": {                 "@id": "https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.41744b157b637a227637b478f2550ee246bd766b.003.1",                 "@type": "wx:Alert",                 "id": "urn:oid:2.49.0.1.840.0.41744b157b637a227637b478f2550ee246bd766b.003.1",                 "areaDesc": "Northern Litchfield; Southern Litchfield; Northern Berkshire; Southern Berkshire; Western Greene; Eastern Greene; Western Columbia; Eastern Columbia; Western Ulster; Eastern Ulster; Western Dutchess; Eastern Dutchess",                 "geocode": {                     "SAME": \[                         "009005",                         "025003",                         "036039",                         "036021",                         "036111",                         "036027"                     \],                     "UGC": \[                         "CTZ001",                         "CTZ013",                         "MAZ001",                         "MAZ025",                         "NYZ058",                         "NYZ059",                         "NYZ060",                         "NYZ061",                         "NYZ063",                         "NYZ064",                         "NYZ065",                         "NYZ066"                     \]                 },                 "affectedZones": \[                     "https://api.weather.gov/zones/forecast/CTZ001",                     "https://api.weather.gov/zones/forecast/CTZ013",                     "https://api.weather.gov/zones/forecast/MAZ001",                     "https://api.weather.gov/zones/forecast/MAZ025",                     "https://api.weather.gov/zones/forecast/NYZ058",                     "https://api.weather.gov/zones/forecast/NYZ059",                     "https://api.weather.gov/zones/forecast/NYZ060",                     "https://api.weather.gov/zones/forecast/NYZ061",                     "https://api.weather.gov/zones/forecast/NYZ063",                     "https://api.weather.gov/zones/forecast/NYZ064",                     "https://api.weather.gov/zones/forecast/NYZ065",                     "https://api.weather.gov/zones/forecast/NYZ066"                 \],                 "references": \[                     {                         "@id": "https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.0310815400974608af0905b267af840a8338957d.001.1",                         "identifier": "urn:oid:2.49.0.1.840.0.0310815400974608af0905b267af840a8338957d.001.1",                         "sender": "w-nws.webmaster@noaa.gov",                         "sent": "2025-02-04T15:45:00-05:00"                     }                 \],                 "sent": "2025-02-05T03:05:00-05:00",                 "effective": "2025-02-05T03:05:00-05:00",                 "onset": "2025-02-06T04:00:00-05:00",                 "expires": "2025-02-05T17:00:00-05:00",                 "ends": "2025-02-06T18:00:00-05:00",                 "status": "Actual",                 "messageType": "Update",                 "category": "Met",                 "severity": "Moderate",                 "certainty": "Likely",                 "urgency": "Expected",                 "event": "Winter Weather Advisory",                 "sender": "w-nws.webmaster@noaa.gov",                 "senderName": "NWS Albany NY",                 "headline": "Winter Weather Advisory issued February 5 at 3:05AM EST until February 6 at 6:00PM EST by NWS Albany NY",                 "description": "\* WHAT...Mixed precipitation expected. Total snow and sleet\\naccumulations between 1 and 3 inches and ice accumulations of a\\nlight glaze to locally one tenth of an inch.\\n\\n\* WHERE...Portions of northwestern Connecticut, western\\nMassachusetts and eastern New York.\\n\\n\* WHEN...From 4 AM to 6 PM EST Thursday.\\n\\n\* IMPACTS...Plan on slippery road conditions. The hazardous\\nconditions could impact the Thursday morning and evening commutes.\\n\\n\* ADDITIONAL DETAILS...Snow early Thursday morning will changeover\\nto a wintry mix of sleet and freezing rain or drizzle by Thursday\\nafternoon.",                 "instruction": "Slow down and use caution while traveling.\\n\\nBe prepared for slippery roads. Slow down and use caution while\\ndriving. If you are going outside, watch your first few steps taken\\non stairs, sidewalks, and driveways. These surfaces could be icy and\\nslippery, increasing your risk of a fall and injury.",                 "response": "Execute",                 "parameters": {                     "AWIPSidentifier": \[                         "WSWALY"                     \],                     "WMOidentifier": \[                         "WWUS41 KALY 050805"                     \],                     "NWSheadline": \[                         "WINTER WEATHER ADVISORY REMAINS IN EFFECT FROM 4 AM TO 6 PM EST THURSDAY"                     \],                     "BLOCKCHANNEL": \[                         "EAS",                         "NWEM",                         "CMAS"                     \],                     "VTEC": \[                         "/O.CON.KALY.WW.Y.0011.250206T0900Z-250206T2300Z/"                     \],                     "eventEndingTime": \[                         "2025-02-06T23:00:00+00:00"                     \]                 }             }         }     \],     "title": "Current watches, warnings, and advisories for Dutchess County (NYC027) NY",     "updated": "2025-02-05T08:05:33+00:00" }  |
| :---- |

**Response Parameters**

# 

| Parameter | Type | Description |
| :---- | :---- | :---- |
| `id` | `String` | A unique identifier for the alert. |
| `type` | `String` | The type of GeoJSON feature; typically 'Feature' for alerts. |
| `geometry` | `Object` | Contains GeoJSON geometry data, such as polygons, defining the affected area. |
| `properties` | `Object` | Contains detailed information about the alert, including the following sub-properties: |
| `├─ id` | `String` | A unique identifier for the alert (same as the top-level id). |
| `├─ areaDesc` | `String` | Text description of the affected area. |
| `├─ geocode` | `Object` | Contains UGC (Universal Geographic Code) and SAME (Specific Area Message Encoding) codes relevant to the alert. |
| `├─ affectedZones` | `Array` | List of affected zone URIs. |
| `├─ references` | `Array` | List of URIs to related alerts, if any. |
| `├─ sent` | `String` | The time the alert was sent, in ISO 8601 format. |
| `├─ effective` | `String` | The time the alert becomes effective, in ISO 8601 format. |
| `├─ onset` | `String` | The expected start time of the event, in ISO 8601 format. |
| `├─ expires` | `String` | The expiry time of the alert, in ISO 8601 format. |
| `├─ ends` | `String` | The expected end time of the event, in ISO 8601 format. |
| `├─ status` | `String` | The status of the alert (e.g., 'actual', 'exercise', 'system', 'test', 'draft'). |
| `├─ messageType` | `String` | The type of message (e.g., 'alert', 'update', 'cancel'). |
| `├─ category` | `String` | High-level category of the alert (e.g., 'Met' for meteorological). |
| `├─ severity` | `String` | Severity of the event (e.g., 'Extreme', 'Severe', 'Moderate', 'Minor', 'Unknown'). |
| `├─ certainty` | `String` | Certainty of the event occurrence (e.g., 'Observed', 'Likely', 'Possible', 'Unlikely', 'Unknown'). |
| `├─ urgency` | `String` | Urgency of the event (e.g., 'Immediate', 'Expected', 'Future', 'Past', 'Unknown'). |
| `├─ event` | `String` | Name of the event (e.g., 'Tornado Warning'). |
| `├─ sender` | `String` | Identifier of the sender. |
| `├─ senderName` | `String` | Name of the sender. |
| `├─ headline` | `String` | Brief headline of the alert. |
| `├─ description` | `String` | Detailed description of the alert. |
| `├─ instruction` | `String` | Instructions for the public. |
| `├─ response` | `String` | Recommended response (e.g., 'Shelter', 'Evacuate', 'Prepare', 'Execute', 'Monitor', 'AllClear', 'None'). |
| `├─ parameters` | `Object` | Additional parameters providing extra information about the alert. |

### **Error Responses**

| HTTP Status | Meaning | Possible Cause |
| ----- | ----- | ----- |
| `400 Bad Request` | Invalid request | Missing or incorrectly formatted `zoneId` |
| `404 Not Foundand` | No active alerts | No alerts exist for the provided `zoneId` |
| `500 Internal Server Error` | API failure | Temporary server issue |

### **Notes**

* The NWS updates active alerts frequently, results may change.  
* Zone IDs can be found in the NWS Zone Forecast Listing.  
* The API follows **GeoJSON format**, making it useful for mapping applications.  
* The id parameter returned by the endpoints `/alerts/active and /alerts/active/zone/{zoneId}` is the alertID parameter used by the `/alerts/{alertId}`endpoint. For example, the alertID returned by the previous example is urn:oid:2.49.0.1.840.0.41744b157b637a227637b478f2550ee246bd766b.003.1

**Alert Details:**  
`/alerts/{alertId}`  
Returns detailed information about a specific alert.

#### **Endpoint:**

`GET /alerts/{alertId}`

#### **Description:**

Retrieves **detailed information** about a **specific weather alert** using its unique `alertId`. This endpoint is useful for fetching complete data on an alert after obtaining the `alertId` (returned as id) from the `/alerts/active` or `/alerts/active/zone/{zoneId}` endpoints.

---

### **Request Parameters**

| Parameter | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| `alertId` | `string` | Yes | The unique identifier of the alert to be retrieved. The `alertId`  parameter is `id` returned in the in responses from `/alerts/active` and similar endpoints. |

# 

| Parameter | Type | Description |
| :---- | :---- | :---- |
| `id` | `String` | A unique identifier for the alert. |
| `type` | `String` | The type of GeoJSON feature; typically 'Feature' for alerts. |
| `geometry` | `Object` | Contains GeoJSON geometry data, such as polygons, defining the affected area. |
| `properties` | `Object` | Contains detailed information about the alert, including the following sub-properties: |
| `├─ id` | `String` | A unique identifier for the alert (same as the top-level id). |
| `├─ areaDesc` | `String` | Text description of the affected area. |
| `├─ geocode` | `Object` | Contains UGC (Universal Geographic Code) and SAME (Specific Area Message Encoding) codes relevant to the alert. |
| `├─ affectedZones` | `Array` | List of affected zone URIs. |
| `├─ references` | `Array` | List of URIs to related alerts, if any. |
| `├─ sent` | `String` | The time the alert was sent, in ISO 8601 format. |
| `├─ effective` | `String` | The time the alert becomes effective, in ISO 8601 format. |
| `├─ onset` | `String` | The expected start time of the event, in ISO 8601 format. |
| `├─ expires` | `String` | The expiry time of the alert, in ISO 8601 format. |
| `├─ ends` | `String` | The expected end time of the event, in ISO 8601 format. |
| `├─ status` | `String` | The status of the alert (e.g., 'actual', 'exercise', 'system', 'test', 'draft'). |
| `├─ messageType` | `String` | The type of message (e.g., 'alert', 'update', 'cancel'). |
| `├─ category` | `String` | High-level category of the alert (e.g., 'Met' for meteorological). |
| `├─ severity` | `String` | Severity of the event (e.g., 'Extreme', 'Severe', 'Moderate', 'Minor', 'Unknown'). |
| `├─ certainty` | `String` | Certainty of the event occurrence (e.g., 'Observed', 'Likely', 'Possible', 'Unlikely', 'Unknown'). |
| `├─ urgency` | `String` | Urgency of the event (e.g., 'Immediate', 'Expected', 'Future', 'Past', 'Unknown'). |
| `├─ event` | `String` | Name of the event (e.g., 'Tornado Warning'). |
| `├─ sender` | `String` | Identifier of the sender. |
| `├─ senderName` | `String` | Name of the sender. |
| `├─ headline` | `String` | Brief headline of the alert. |
| `├─ description` | `String` | Detailed description of the alert. |
| `├─ instruction` | `String` | Instructions for the public. |
| `├─ response` | `String` | Recommended response (e.g., 'Shelter', 'Evacuate', 'Prepare', 'Execute', 'Monitor', 'AllClear', 'None'). |
| `├─ parameters` | `Object` | Additional parameters providing extra information about the alert. |

---

### **Error Responses**

| HTTP Status | Meaning | Possible Cause |
| ----- | ----- | ----- |
| `400 Bad Request` | Invalid request | Missing or incorrectly formatted `zoneId` |
| `404 Not Foundand` | No active alerts | No alerts exist for the provided `zoneId` |
| `500 Internal Server Error` | API failure | Temporary server issue |

**Usage Example:** Request alert details for alertID `urn:oid:2.49.0.1.840.0.41744b157b637a227637b478f2550ee246bd766b.003.1`

**cURL**

| curl \--location 'https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.41744b157b637a227637b478f2550ee246bd766b.003.1' |
| :---- |

### **Javascript \- Fetch**

| const requestOptions \= {  method: "GET",  redirect: "follow"};fetch("https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.41744b157b637a227637b478f2550ee246bd766b.003.1", requestOptions)  .then((response) \=\> response.text())  .then((result) \=\> console.log(result))  .catch((error) \=\> console.error(error)); |
| :---- |

### **Python**

| import requestsurl \= "https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.41744b157b637a227637b478f2550ee246bd766b.003.1"payload \= {}headers \= {}response \= requests.request("GET", url, headers=headers, data=payload)print(response.text) |
| :---- |

### **Notes**

* The `alertId` must be obtained from **`/alerts/active`** or **`/alerts/active/zone/{zoneId}`** before using this endpoint.  
* The NWS frequently updates alerts, so an alert retrieved today may **expire and become unavailable** soon after.  
* Responses follow **GeoJSON format**, making them compatible with mapping applications

## **Conclusion**

The National Weather Service (NWS) API provides developers with powerful access to real-time and forecasted weather data directly from the authoritative source in the United States. By integrating this API, developers can enhance their applications with timely alerts, forecasts, and geospatial data that support public safety, planning, and user engagement.

We encourage developers to explore the full range of endpoints, experiment with GeoJSON formatting, and make use of optional query parameters to tailor results for specific use cases. Whether you're building a weather dashboard, creating a mobile app, or contributing to an emergency response tool, the NWS API offers flexible capabilities for a wide range of projects.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnAAAAFDCAYAAAC6FTM9AABCF0lEQVR4Xu2dB5gUxdaGEcHs1WsOqNd4FUWRZVnCkpEkBkByTrPkaAATOYkCEg0YrggqCAgSVFSSAQVMgCSRIFigBAMKAsv595T2/L1Vs8Cy2z3Tp7/ved5nuqtrZrp3u7veqU55CEEQBEEQBAlU8pgFCIIgCIIgSGIHAocgCIIgCBKwQOAQBEEQBEECFggcgiAIgiBIwAKBS5AcPHiQ2rdvT3fffTc1aNCA5syZY1axkpSUZBZFM3nyZPr000/NYp3vv/+e2rRpo4lEIrRgwQKziue588476eOPPzaLdTp27BidP4e1a9ea1RAEyeVMnTqV6tSpo/dDzZo1o8OHD5tVTii8DbuzYcMGvZ+76667KC0tjTZv3pxpOqdnz556etOmTWnv3r2Zps2fP9/6TE6sMjNch/ePZo62P81J2rVrp/ftzz77bKZyno/9+/dbZbkdXq5NmzaZxbmWzz//XO+zEf8DgUuA7NmzR29kw4YNo0OHDtG6dev0DvRYO5TGjRubRdEcTeBWrVpFzZs3p/fff5/ee+89qlChwjG/K7dzNIFLTU2lFi1a6Plz4L9Rood30ggS1NStW5eqVq1Ka9as0eNLliyhokWL6h+XOY17//LKK6/oz/3oo4/0+HPPPUclSpSITv/tt990fUdmeF/G43/88Ue0zqRJk3TZm2++GS3jHGs/duTIEV2nePHi5qRjvvdo4ffOnTvXLNbfN2HCBL3MJUuWzDSN3zNq1CirLLfD7cSPP/5oFudaKlWqpOc7N9YTJHuBwCVAeGf2119/mcVa5E40xxK4Bx98MFOZFzuOo+VYAse/voMWCBwS1Lz++utZ7gPS09PNomzH/dk8zL02WYWnDx8+PFOZ8yPXCQvc8uXLrXk2x80sWrSI3nrrLV3P/FF4rPceLVkJHPdM8Y9yjvvzf/rpJy3M7rKtW7dqgQ5SeNl4Ge644w4aP368ORnxOBC4OGfnzp3HtePgOvPmzdOv3DvnlDnhQx08zjLIr7yDO16Bc36VOnF25s5ndejQITqNfwVzmRsnvHN0v8/9i/nrr7/ONO1EBY57Dt2fw/PuhMcfeeQR/VqsWDFd1qtXr0zz6m6MzHkaPXq0Lr/33nszlS9cuDD6Hp5n97TOnTvrcvd3MAgSpKSkpNATTzxhFlvhUy6c9T85OTnT9vTyyy9n2jbcP0rd2wQPT5kyJTruzsaNG7Pcfrh8y5Ytepj3byw8vJ2zkLnrHC08neeZDxP36NHDmuZO9erVo9uzu8fuhRdeiJbzsn744YfRcQcnzn6Iw+U///yzHubDx07PopOnn346eqqI+XncK+mEx1evXp3pu/iV2wXnb//ZZ59lqu8cQl2xYgW99NJLup5T1/0/5EPoXMbT7rnnnkzzHCvcu8jrzldffZVpWTh8+NtpS5xpjvA537179+5o/QceeCDTtF9++SU6DYkdCFycw9JgrvixwnV4R2GWxRrmcHf90QTO2agY3gD5F2FW4R2Z890sV/v27TNq/B3uSneHP9sRLHP+ePxoAueeP+e9vMNu0qRJtB5/NjciTrjen3/+GR3nnSQLnROexjsHzhdffGHNU1bherF+RZtBDxwS1PB6vX37drM4U2rUqKElzQk37M72wL0vvN064cbXva24h51pDl26dIlO49NI3Nu0O1zX6eVxBM4RAnedrLJjx47o9AMHDlh1zc9ZunRpdJwPK7/77rt62BE4d3jc7IHbtm1bpnq87+Lz+TjOfqhMmTLRQ9Zc1/2D1AmLsDlv999/v6uGvdxmfbfAlSpVKjpt5syZ0XnhuN/n/LA/msDx9F27dulhbkf4R7wTFjg+PcedWPPp/qHvjlkXsQOBi3P4/A9zRa1YsaJ1XppZx13GYmJOHzhwYFTgWLgceKM0e+AcmXEkhes8/vjjusyhT58+elqnTp30OO+sfv/99+hnzJo1S/+Cev7556NwPf5sTrVq1aJ1OXzOy9EELlYPHJ/sbB5W5u9wTrQ2/wY87p4fZ544pUuXpiFDhmSq74RPLK5Zs2am5XdONuZf1CzHvNM1d7YQOCSo4XWcL25yMmbMGL0f4sbd2U64ztixY2NuT3zob/DgwdH3O/W//fbb6HCs8H7D2cY4I0eOPKrAcY8PxxE4Dl9s4fQ4ZfU9HO5Zd18kULZs2ejncdzvNfcdfAFCy5Yt9bTjFbiHH3440zl6Tk+d+4gHT3dkzP2ZfGSGe/2cv405b+vXr4+OO2VZjfOwW+DGjRsXncYXh7jrdu3aNTrM4WlZCRz3urn/VyNGjNDrjBMWOPeFG3zOI0ueuf44osztD7cLsZYZiR0IXJzDv3pjragsR+ZGaMYp425oczrvmByBc28Q3BVvChyHz2Fo27atHmaB4l/F3CvHO5tHH300k1DxzqN3797685xflBMnTqS+ffvqLng3Sik9vX79+tH3c/j7sitwvKM2dyY8D/xr2hk2p5nzwzjTzKvCnPA0Przx66+/RsfdV4vxfPOVZVzOOyEnEDgkqOEfJixtZriHyC1wLE6xtifent3bglP/yy+/jA5nFef0D97XrFy5Msu6XO4cYnQLHMc5VJnVezk8zcR9aNT9Xh42l/Odd97R045X4LjMfWK/s5wffPCBPoXECc8DL4vzmbzf5WHez8T6ccrDP/zwQ3TcKctqnIfdAufuRTV7Ss39Lk8z97lOWIB5uomzzCxwzvrBYVnnZTX/rk7PL/8P+cIZZ19rLhNiBwKXAOGdJJ/T4E52BM4c5nA3+dEOoZoCx7+kWMA4/FmOFDnj5obtxPlePo/C7C53x5w/Hs+uwHEPQatWraLjvMPPqvufU6tWLd1jGCuxToB24i53DtGYl/tz+NCBuy5fOYsgQYwjDWbcAle+fPmYksfh3heu64S3l6z2T+YpGOZhUG7I+fQHdxYvXpxJtkyB48O7fE5brGXg8BEJ96FDJ1nNIw+7z311JyuBmzZtWnScD3vy38sM9zCx7LrP/eL3cg+m8wOaz3V2X5XL0mXOm1cCx8POkQXnMHNWAmd+J4ePkjg/6k2B48R6D8c8D9scR2IHApcAcVZWPszIhy65S53FpFy5ctE6sVZmdxn/unEOC/LOgHvIjiZwLFt8QQDD3+U+2ZZ7y7ire9CgQXq4W7duUaHi7+RDCXy4hHc4/J1OeH55nEWQe+3c89ewYUMtiQMGDNAn2/I8ZlfgOPyZ/Fn9+/fX88wXIrinmeEy3pHw/DonYDvhQyq87DyND604l/Tz5/IvZF5+54Ra969CvnBh6NCh+m/kPhGapzVq1Ej/TREkaOHG1lm/eT/CV1DyOPcYcVhKeBvm7Ya3Gf4x5d6eeLupUqWKnsbl7kN17no8zPsfPj+V9xU87t5meH/IssYSw+JlXq3JMQXO+cFr1nPC5dy7Z4YvcmKp4bjf64gN74t5n8XbtbO/iiVwb7/9ti7jowS8LCyUb7zxRqY6HD4Pjuu5T7/g/RmX8QUcHEecWIb4f8B/U/Pv55XAOReJOfPJxBI4/jwWUTN8xMX5vFgCx5LLp6Bw+/TYY49l+gHO51DzPppP13G+Gzl6IHAJFP5lylftuKUkO+GNh9+fG+ETfnknGevePnzTTZ5m9hpyeMfEJ8by/eXM8Ll6r732mnXuWHbD55/xjuF4b2/AJ8nyIdFYF2rwvPA0PufEHT6nZsaMGZnKnHDvHS8/gkgM93bxfsSUBCd8GgZvx+5eJCd8a47juUkub3ezZ8/OchtzwqdmOFeexiN8k3M+Ty3WfvBoMZf3RMI/ys1bnfgdXg73uc65FRZe7mk0w+XuCyGQowcChyAIgngW59yvMMW5eCtocT8BiC8ocfeQIYkXCByCIAjiSfhwmHNuF5L44Qu3unfvrg+TO4eWkcQNBA5BEARBECRgiSlwfIIpn18EAACJzonGvPE0giDBSE62e0mJKXBX/edqWqF+CQ23Fk2xyiTT4ZG+VplUZn76JT07fY5VLpVHnhhBS7f8ZJVLpctj/czd13Hn1ltvNYsQBEnQ8LmUgwYMoAdTUviZbtS2Zk2zSugCgVMQOMlA4GQDgUMQ+eGLKzoUKqTFzWFqpUrRx3iFNRA4BYGTDARONhA4BJEbviVVpEIFWlGrViZ5c4jUqWO+JVSBwCkInGQgcLKBwCGIvPC9OyOpqbS1YUNL2txMLF9e35g+rIHAKQicZCBwsoHAIYicDB4wgHoWL077Wra0ZC0r0jJEL6yBwCkInGQgcLKBwCFI8KMPlZYuTUdiCNqxWF+vXo6f7hPUQOAUBE4yEDjZQOAQJLiZM3u2PsdtOV9RGkPOjpeO7dubHx2KQOAUBE4yEDjZQOAQJFjhe7h16dyZ2t9yiyViJ8qr5cvTypUrza8SHwicgsBJBgInGwgcggQns2bNol7ZPMfteAnjfeEgcAoCJxkInGwgcAiS+Jk+fbq+qnTLMa4qzQkzKlemHTt2mF8tOhA4BYGTDARONhA4BEncbNq0iSIVK+b4HLfjJWz3hYPAKQicZCBwsoHAIUjipXu3bpR2yy10uE0bS7K85OemTenFF180Z0dsIHAKAicZCJxsIHAIkjjhR15xj9sfHpzjdryklSplzpbYQOAUBE4yEDjZQOAQJP6ZOnWqPsftu/r1LaHymw0Z83Dw4EFzFkUGAqcgcJKBwMkGAocg8cnhw4dpUL9+1CslxZKoeBOWc+EgcAoCJxkInGwgcAjif6ZNm0ZphQrRgVatLHlKBMLyjFQInILASQYCJxsIHIL4l3nz5vl6VWlOCMN94SBwCgInGQicbCBwCOJ9+P5qfI7b2rp1LVFKVN6qUoW2bt1qLoqoQOAUBE4yEDjZQOAQxJvwOW4D+/ShXsWKxfWq0pzQvnRpc7FEBQKnIHCSgcDJBgKHILkfvqo07bbbAituDtsbNaJDhw6ZiycmEDgFgZMMBE42EDgEyb288847+hy3L2rVsmQoqDzeq5e5mGICgVMQOMlA4GQDgUOQnKdXz56UlrE9HPH5yQl+wM9I/fHHH81FFhEInILASQYCJxsIHIKcePo99hj1LFqU/gz4odJjIfW+cBA4BYGTDARONhA4BMl+pkyZoq8q/a1FC0t2JPJKuXK0evVq888Q+EDgFAROMhA42UDgEOT4s23bNkqrWJG+rl3bkhzpSLwvHAROQeAkA4GTDQQOQY6eI0eO0GOPPkptCxemfSHpcYsFP6d16pQp5p8n0Im7wD310mQ6/cwz6cmXJkXLOj/aly685BKrrlf4JXDcsF53Y0H69/kXZCp/58s1VKJcBau+V/gpcJEeD1H+/PlpzvJVejzt/l50cr58NPn9JVZdL/BT4JZ8t03/fy++7HJauHYLfbJpB11f8GY69/zzadn23VZ9L/BT4PLkyaO55ob/6vHRk9+kU087nVp3e9Cq6xUQOATJOnxV6UNJSQn7yCu/aV+mjPknCnTiKnCjJk2lp1+dooeXb98TLa/ZqJlIgbvsiitp+Y979fCtRYtFy8+74EKRAleq4h303tfr9TAv99KtP1GjSAc9zg2/Wd8L/BS4s84+O9P4vy+4IGOZf9bDtyb9///bS/wUOEfKHYqWTNWv46fMtOp6BQQOQezoc9xKl6ZV991nSUyY2dyggaj7wsVV4E466ST617nnUvGyFWj4Pz1wBQsX0a8SBe7NxZ/RjYVuo9pNW+jeGi47+5xz9KtEgTv55JPpkgJX0G3JKTTvi291WYGMdavr4/2pYZt2Vn0v8FPgChUpqtdl7lFetG4rTV20lAoXK061m7SgxRv+/n97jZ8CVygpmS7N+P927zNQj6dWrKxf/zfnfZrw1jyrvhdA4BDk7/z111/U99FH9VWlpriA/0fSuXBxFTjuhXEaNh7mxnbYCxP1uESBu+HmQjR3xWotb+Wr1aBxb8ygGZ+s0NMkCpy7l+2aG26kjzb+SDXqNqRl2/dQ/lNOsep7gZ8Cx/LGr59s3qHl5rqbCtLbn3+T8f/eTmWrVLfqe4GfAudwznnn6dce/Ybo//ljT42mV+Z+YNXzAggcghD17dOHOiUlheaq0pwws0oV2rx5s/knDGTiKnAVa9xNi9f/oId5x8/n0Nx0a2FNvvz56YH+Q6z3eIFfAsc9js7wueedT43bdowu75lnn00vvf2e9R4viIfAsbx26zOQXvvgIz1etGRpWrbN+/PC/BS4Yqll9evH3ytKKpGaafn9OmQcD4Ezz+l8efZ8q45XQOCQMIfPcWtbsSIdbN3aEhWQNVLuCxdXgePzg/Lly0fJpcrQ/4xf7BJ74B4ZNpIuv+o/dGtSMr04691M0yT2wL33zXo6/6KLqWDh22nBms36PLi8efNSyfKV6IZbCln1vcBPgatQ/S4qWqo0nXLKqVri+j49Xh8y5vMdX31ngVXfC/wSuOkfLadipcvSFRnL1/Hhx3XZJZcXoOTUMnTVtddZ9b0CAoeEMdyDFClbNpS3A8kNXilfntauXWv+WQOXuApcouCXwCUKfglcIuCnwCUCfglcogCBQ8ISPsft0YcewlWluUSkRAnzTxy4QOAUBE4yEDjZQOCQMISvKu1erBj92ry5JSLgxNjUoAHt37/f/FMHKhA4BYGTDARONhA4RHLmzZtHbStUoDV8zlYMCQE5o1PbtuafPFCBwCkInGQgcLKBwCHSkp6eTv369qUuRYvSkTZtLOkAuQc/I/Xbb781/wWBCQROQeAkA4GTDQQOkZSHevSg+4sUwVWlPhLk+8JB4BQETjIQONlA4BAJmTp1qr6qFPdx8x++L9x3331n/ksCEQicgsBJBgInGwgcEuTMnTOH2pYrRxvr17fEAvhHhB85FsBA4BQETjIQONlA4JCghc9xG9C/P/UoVoyOxJAJ4D/fN2hAEyZMMP9VCR8InILASQYCJxsIHBKk8FWlXQsXpnRcnJBwRFJSzH9XwgcCpyBwkoHAyQYChwQh06dPp0j58vRFrVqWOIDEYGvDhvTHH3+Y/7qEDgROQeAkA4GTDQQOSdTwkxMe6NaNxpQqZckCSEyC9oxUCJyCwEkGAicbCBySiBk0YAA9mJJCv+Oq0kAxsXx5WrdunfnvTNhA4BQETjIQONlA4JBEypzZsymtbFlLDEBwaMuHuQMSCJyCwEkGAicbCBySCJk1cyZFKlSgFXxT2BhSAILDW1Wq0Nq1a81/cUIGAqcgcJKBwMkGAofEK4cOHaKunTpRl9tusyQABJu23IsagEDgFAROMhA42UDgkHhkxowZ1LN4cdrXsqXV+IPgs6FePS3oiR4InILASQYCJxsIHOJnZvKh0tKlaXujRlajD2TxyMMPm//+hAsETkHgJAOBkw0EDvE6hw8f1leVTqxQwWrkgVz4GakbNmwwV4eECgROQeAkA4GTDQQO8TJdOnemdrfcYjXuIBwk+jNSIXAKAicZCJxsIHCIF5k1a5a+qhTnuIUbvi/cxo0bzdUjYQKBUxA4yUDgZAOBQ3Iz+pFXqam0uUEDqzEH4aRt7drmapIwgcApCJxkIHCygcAhOQ2f4za4f399VanZeAPwQ6NGNHXKFHO1SYhA4BQETjIQONlA4JCc5K233qK0W26hw23aWA03AA5pZcqYq05CBAKnIHCSgcDJBgKHnEjmzJlDkYoVaRmenACOg7V16+qe2kQLBE5B4CQDgZMNBA7JTviq0tElS1oNNADHIhGfkQqBUxA4yUDgZAOBQ44VfR+3fv2oV0oK/YGrSsEJws9IXbNmjbl6xTUQOAWBkwwETjYQOORomTZtGqUVKkQHWrWyGmQAsktagl2RGlPgChS4gkpXuTM0XFzgSqtMMremlLTKpFK0dDlKLlvBKpfKdQVvodTK1a1yqRQvX8ncfR13IHByw71ukUqVaDnOcQO5yKQKFWjr1q3m6ha3xBQ49MDJBj1wckEP3PEHAic3zz7zDP3eooXVAAOQUyLJyebqFrdA4BQETjIQONlA4JBYiVStajW8AOQGqkkT2rdvn7nKxSUQOAWBkwwETjYQOCRWxpUqZTW8AOQWD3TubK5ycQkETkHgJAOBkw0EDjFz8OBB2o+rTYGH9E5OpvT0dHPV8z0QOAWBkwwETjYQOMRMr4ceshpcAHKbdvfdZ656vgcCpyBwkoHAyQYCh5jRJ5nHaHAByE2mV65Mq1evNlc/XwOBUxA4yUDgZAOBQ9xZt24dfXrPPVZjC0BucySDtDg/nQECpyBwkoHAyQYCh7gTqVPHamgB8Ap+RuqLL75oroa+BQKnIHCSgcDJBgKHuNO7WDGrkQXAS+J5XzgInILASQYCJxsIHOJk5syZtKFePauBBcBLdjVrRn/88Ye5OvoSCJyCwEkGAicbCBzipEPjxlbjCoAf9OrWzVwdfQkETkHgJAOBkw0EDuHs2bOHRuHmvSBOTK5QgbZt22aulp4HAqcgcJKBwMkGAodw+Nmnf+LmvSCOtOULaHwOBE5B4CQDgZMNBA7h4NmnIN5MqVSJVq1aZa6angYCpyBwkoHAyQYCh3DmVatmNagA+E1amTLmqulpIHAKAicZCJxsIHDIli1brIYUgHiwpm5dX5+RCoFTEDjJQOBkA4FD7u/Rw2pIAYgXen30KRA4BYGTDARONhA4JFKkiNWIAhAvOt92G+3fv99cTT0JBE5B4CQDgZMNBC7cmT9/Pinc/w0kEPyM1LY+PSMVAqcgcJKBwMkGAhfuRGrXthpQAOLN6xUr0s8//2yurrkeCJyCwEkGAicbCFy406d4cavxBCARiPhwXzgInILASQYCJxsIXHjTt29f2o+b94IEZU+zZjRp0iRztc3VQOAUBE4yEDjZQODCm0ilSlajCUAikVa6tLna5mogcAoCJxkInGwgcOHNkzh8ChKctXXr0pEjR8xVN9cCgVMQOMlA4GQDgQtndu3aRYdat7YaTAASja5dupirb64FAqcgcJKBwMkGAhfOPNCxo9VQApCIvFGxIq1cudJchXMlcRW4PHnyUKTHQxp3ef5TTqG3PvnCqu8VfgrcqaeeRi06dacHBz5BMz5eTlffcCM1adeJatSpb9X1Cr8ELn/+/Jn+v9Vq16VaTZpT1Vp16PkZc636XuCnwF106WWZlrf/mOfohpsLUZV7a9OUhUut+l7gp8CdnC8fNevQhfLmzavHnWVneg0dYdX3AghcONOJzy2K0VgCkIi0rVnTXIVzJXEXOLNs9uff0OBnXhQpcNfeeJN+Xf7jXmtarL+FV/glcKefcaZV5nBrUrJV5gV+CtwttydlGmdZd4avuu56q74X+ClwfUeN16/9Rj9DUxZ8Gi1/ZNjTVl2vgMCFLzt27KDZVatajSQAicrUSpX0Yf/cTlwFbtgLE2nBmk3UNONX/KdbdtLi9T9Q6673ixU4lrT+o5+lReu2UGqlypmmVatVx6rvFX4J3Etvv0fvr/qOLr/yqmjZw0OH697GTzfvtOp7gZ8CN+m9xfTe1+vp3+dfQAvWbqaPv1d08sn59P992fY9Vn0v8FPgSlWorJfttuTM24+fP0YgcOFLezx5AQSQtnzRTS4nrgLnZtSkqfqQzMNDR9C9DZtSuwcfsep4hV8Cx4eGneHTTj9dv3JvnHMIyi/8Ejg381duyDSeL19+q44X+ClwDm98+Ak99tSoTCLjl9T4J3B7M4R1kR7mH1utuz6gh9/7Zj01aNMuRn1vgMCFK3xFX7tChazGEYBEh+8L98orr5irdI4SV4FzDiVOfn8JLVy3JVoutQeu8j21aO6K1Xr4hptv0a/58ufXPTVmXS/xW+DaPfiwfp259Mto2TU3/Neq5wXxELjK99aiGR+voJNPPpk++2GXLjvjrLOsel7gn8D9Qvf3H6JfH3liJPUd9YweLnDV1fTJJv/WZwhcuDJv3jz6uWlTq3EEIAikpaaaq3SOEleBq920pe6VMnvbpAocU79VhC646CI9PH7qTN0z42DW9Qq/BC6ldDk67YwzohcsjJw4hS685FJ9Yr9Z1yv8FDg+r++ss8+mNxd9psf5B8rNtxel8//5f/uBnwLXe8RYvf326DsoWsb/b7Oel0DgwpUIPyQ8RsMIQBBYV69ert4XLq4Clyj4KXCJgF8Clwj4KXCJgJ8ClwhA4MKT9PR0er5MGatRBCBI5OYzUiFwCgInGQicbCBw4Umf3r3pTzz7FAScV8uXp1WrVpmr9wkFAqcgcJKBwMkGAheeRCpXthpDAIJIbt0XDgKnIHCSgcDJBgIXniysUcNqCAEIIvyM1NcmTzZX8WwHAqcgcJKBwMkGAheO6ENOMRpCAIJK+1KlzNU824HAKQicZCBwsoHAhSMPde5sNYAABBm+Hc7BgwfNVT1bgcApCJxkIHCygcCFIx3x7FMgkMd79jRX9WwFAqcgcJKBwMkGAic/c+fO1ecMmY0fAEHnzTvuyNEzUiFwCgInGQicbCBw8pOGZ58CweTkvnAQOAWBkwwETjYQOPmJ3HST1egBIIVXcnBfOAicgsBJBgInGwic7IwfP57S27SxGr3jpe7VV1PvIkWAMEbzFZwx/t9BhZ+ReiKP2ILAKQicZCBwsoHAyU5Ob94LgZOJNIFbX68evfHGG+bqf8xA4BQETjIQONlA4GTnhbJlrcYuO0DgZCJN4Jj2fKV1NgOBUxA4yUDgZAOBk53fW7SwGrrsYArczH79aOvXX9P/2re3pCA3ef3+++mnjRszweXffvihVTc7fDN3rlXmN+sWL44O7/zuOxqUIR48vGn5cqvusZjctSuNvOsuq/xYSBS47Y0a0aFDh8xN4KiBwCkInGQgcLKBwMlNp44drUYuu7gFbvOKFZYIMNMff5xe7dRJD8994olo+ah7740Oz+jdm56qWlUPD69eXb/OGTJEvz7XpAlNefBB63OZCc2bZxpngZvZv3/0M2YPGhSd5nz37MGDaWydOjSzb9/otCcqVqQ3Hnggk8BN7NCBZvTpEx2f/thjuuzZDBF4vlkzejvjs8fcdx+9O3w4bVq2LPr54xs0oLcHDqQ+SUnR7x1Ro4Z+fXvAAD3PU3v10tPeypiHoRnf7V4GFraPXn5ZD69fsoQ+GDtWD9ORI/r1te7daVKGmDn1WdJe7dyZnr7nHj1PU3v2pJfT0vS0kRnfO6hMGepXrBg907Chnq+hFSpE38vCPbpmTZo7dGimeZAocEx2n5EKgVMQOMlA4GQDgZObSOHCVgOXXdwCx7Lz208/aVlwyjYuXUoDM2SABeazN96gD8ePp2F33KGnOb1mh//6iwZk1FkxY4Yef6V9ezp44AD1L1GC3h8zhsbXr09DypXTPXtuyWBMgTt86BD1S0mh/b/9psf/+vPP6DSOfs0QIZZFljaer74Z8/vH3r00oGRJSj98WNcZldHQs1hx2eGDB6PvG5SaqudrVoaI8fdw7xYL19LJk6PLveSll3SdI+np0e8dW7eu/jvwifSDM5ZlQosWtHvrVv0Z7nl0+EUp6lu0qJYu/hz+ngXPPksDM76fGZExvmzaNF2X55k/m5eD55G/e/ELL9DoWrWiPXD8Hv478/cdyvjb8vv4b8TzzgLn/G0cpArcjMqV6ccff4xuA8cKBE5B4CQDgZMNBE5mVq5cSR/dfbfVwGUX8xBqnwzpWDF9OqVniJQjL+4MyJCLVfPnU++kJNqb0ZAO5nPwXJkzdKgWuMFlysR8vyk6psCtW7JEv3766qv6NZbAHcoQGaeMe65Ypp5v2vTv9/9z+JLF0/zePT/8EH0fiyL3ZrEQsTB98s/3Pdu4cbTOG//0Gjrv1/Pzxx/RYaeH7odvvomWOXBWvvuuHt6xfj29P3asls7+xYvT3u3bM82X+9DqwX+W98kqVWjKQw9lErj5o0bpaWsXLtSvv+7cGX0fi6X7+6UKHJOd+8JB4BQETjIQONlA4GQmrXZtq2E7EUyBc/hr3z79yjGn7dy4kRZNmKB71VjkuNfOPZ0FzpGbg/v3W+93Ywqccw7cJxMn6tcDv/8enebMi/szJ3XpQsPvvJMWPvecHueeL37l3i7zu3Zv2WKVsQyyVC197TU9zr1gzrzv2bYt0/cyTs8g49SL1bP4zvDhUQnmQ6POZziyx+LolDnSyjjCygLHh1LdAvfuiBF62poFC/Sre77cw4xkgdvZpAm98MILepmPFQicgsBJBgInGwicvKSnp1OfEiWshu1EcAvcvCefpN9//pkOZMjbOxnDXNY3OVlLC/c8OQIxrl696KFK5oWWLXUdR57cAsf8sHKlPuy37M03M0kGcyyB04coM75brV2rl53LTIHj1y9nzaJ9e/bQtx98EJ22a/NmPZ9OD5db4Pbt3k2HDh6Mnvf20/ffRz9/++rV+rArHy7mcaecOV6Be6paNfpq9uzoOB9u5Vc+f42X54uZM6Ofe6ICx+fq8d9104oVoeqBY9J4+Y4jEDgFgZMMBE42EDh5mT9/Pq3JpWefZtUDBxIf3QNa5O+LJv7cuzfTNOkC9139+vTXX3+Zm4YVCJyCwEkGAicbCJy8RHLx2acQuODy9N136/MR+YIHc5p0gWM6tWtnbhpWIHAKAicZCJxsIHCy8vvvv9MQvloxRoN2IiSCwPGFD/y69auvrGl8fppZll34Xmz8um3lSmuaVMIgcK+UK0erV682N5FMgcApCJxkIHCygcDJypgxY6yGLCd4KXB8Tt2IO++MjrvPm3Pz4TPPWGUOfIWoe5zjDLuvGDXZ7bri1IHPkTPLHPgcsnH168e82S7fLoXPR/t6zpxoGZ+HN6Z27UxXxDpw+MIKPp+NzyHkW5Rs/uKL6HT3laxeEQaBY451XzgInILASQYCJxsInKxEKlWyGrGc4KXAMY7gcE/a+o8+0hc4sMC4r1x1BM4p+2bePC1780ePPi6B4/u28cUIfGsQvsCC71PnxD0PjsA5N9Z1YMlyeufcTz1wZM65HxzDtx7h11XvvRf9br6VivvznO998+GH6bUePbTA/bxpky7jK1JfbN06U30vCIvAzaxShTZv3hz9f5uBwCkInGQgcLKBwMnKgho1rEYsJ3gtcNtWrdI3+XVfvclPTHhv5EhazfeTK2ILHD9pgV/5Rr3HK3DO0wmc6e4eOFPgYvHd0qV6fn7dscOa5u455Hvk8SvPP7/yvdqcJ1A4OOH7v/E4CxxfaMBPTciqFzK3CYvAMe3LlIn+zc1A4BQETjIQONlA4ORk9+7dlN6mjdWA5QSvBY6fbsC303Bu/cG9b09UqqTvH8c9clxmCpxzA12Wt6MJHN9ig19Z4PiJC+7p2RG4YZUrR2/RwZg9au4eOH7sFr/ybUv4lZ80MbR8+Uz13fPIsMDxKz+dgm8f4p7mFWESuB8aNaIJEyZEtxN3IHAKAicZCJxsIHByEonReOUUrwWO4fPL+F5xPMxPGuAeKz5MmpXA/fnrr7rHauU771gCxzf25cOcQzKkicNlsQSO7+XmvNcUOP5u92fy4V2ext85q3//aLnzWXxfPH42K99zzrn3G/ekcX233Jnvc3AEzk/CJHBMhO+LGCMxBa5AgSsouXS50HDBpZdZZZK5sXCSVSaVW5NT6NZiJaxyqVx13Q1UNNUul0pSydLm7uu4A4FLrOTGs09N/BA4vuGse/zVTp306/P/3MSXn/nJrxM7dtSvfNNaliU+N40f7WV+Hssg13Vkih9Iz88d5WF+UDy/8vucYaenzvlefpi9+Zn8wHh+wLx7Xp33My+3baufa+qM8+c782h+lvt9zLi6da06XhM2gfuQTy2IkZgChx442aAHTi7ogTv+QOASJ2+//Tb9liE8ZsOVU/wQOOA/YRO47lncEw4CpyBwkoHAyQYCJyPt+AHeMRqunAKBk0mYBG5QcjLt27fP3GR0IHAKAicZCJxsIHDBz+HDh+nxXHr2qQkETiZhEbjDbdpQ+xYtzE0mGgicgsBJBgInGwhc8DN08GBPDp8ylS+/nGr/5z9AGGERuA4pKZSenm5uMtFA4BQETjIQONlA4IKftKpVrYYLgLDzZ8uWNGrUKHNzyRQInILASQYCJxsIXPAzNBeffQqAFDomJZmbihUInILASQYCJxsIXLDzyy+/WA0XACBCgwYONDcXKxA4BYGTDARONhC4YOeR7t2thguAsPMUn+N3HIHAKQicZCBwsoHABTvtQnIyOgDZoXvbtuamEjMQOAWBkwwETjYQuODmp59+oveqV7caLwDCTP+iRenXX381N5eYgcApCJxkIHCygcAFN5HGja3GC4AwozK2iSeGDDE3lSwDgVMQOMlA4GQDgQtuOt18s9WAARBmOpUooW9sfbyBwCkInGQgcLKBwAUzM2bMoF+aNbMaMADCzJgxY8xN5aiBwCkInGQgcLKBwAUzHerWtRovAMKMPh80m4HAKQicZCBwsoHABS98gvaLZctaDRgAYSW9TRtqd5RnnmYVCJyCwEkGAicbCFzwMuLJJ+kXj559CkAQGZma+vdNrbMZCJyCwEkGAicbCFzwEqlWzWrAAAgz3fj1BAKBUxA4yUDgZAOBC17m4uH1AETpUKSIuYkcdyBwCgInGQicbCBwwcrKlSutBgyAsLKjcWMa0L+/uZkcdyBwCgInGQicbCBwwcqjDzxgNWIAhJUuJUtSenq6uZkcdyBwCgInGQicbCBwwUoko8EyGzEAwsq4cePMTSRbgcApCJxkIHCygcAFJwsWLKC1uP8bAJp+SUnmJpLtQOAUBE4yEDjZQOCCEzz7FIC/OZJBhG+lk8NA4BQETjIQONlA4IKTHvz3jtGYARA2nk5NpX379pmbSLYDgVMQOMlA4GQDgQtGRowYYTViAISRw61b09ixY81N5IQCgVMQOMlA4GQDgQtGIhUrWg0ZAGEk7bbbzM3jhBNXgRv87Et05TXX0uPDx1Da/b10Wd68eWnYhIl06qmnWfW9wi+Be2n2e5onXphIy3/cq8vyn3IKDX3+f9RryHCrvlf4JXDO8vZ5epxe3glvzaXrbryJBox5jlp3fcCq7wV+Cly3PgP18k58Z4EeL1G+Eo2fMpMuKXCFVdcr/BK4TzfvjP5/8+TJo8uq1apDz0x9m84+51yrvldA4IKRF/DsUwA0vXv3NjePE05cBa5E+YoZDcEOPcyNwKvvLqL+Y57V4zffXiQqOV7jl8A53Fy4iH694+6a0bK8J59s1fMKvwTOgaWcXy+4+JJomV9S46fAjZo01SpjPli9kT789nur3Av8EjiH+d9soMr31MpU9voHH1n1vAICl/jZv38/7W3WzGrIAAgbC2vUMDePHCWuArds+x46OUNcWN74Fz2X8fC8L9dQvvz5M37Nz7Le4wV+CtzSrT/TFf+5Rg9fff0N0XKnF8MP/BS4Reu20i23J+lhFnKWOV7WJRu2WXW9wE+B4+Xjddr9v5w8fzFdfNllVl2v8FvgHDl3ePXdhfSvc8+16nkFBC7xE2nVymrIAAgjXfk1FxNXgePDh86wu9H7+HtF5areSZ9s+rt3zmv8FLi2Dz4c7aG4vXjJaLlUgUutVFlLDQ+7l9Gv5fVT4BzKVqlOS77LLKiT5y+x6nmB3wJ34SWXWmXMko3brTIvgMAlfjokJ1sNGQBho3eRIrR7925z88hR4ipw1xe8hRau26KHnQadezGYk046yarvFX4KnFtc3vrkC6pRp4Eevura6626XuGnwLmX99TTTqf3V32nh8848yyrrhfEQ+DyGOvu/+a8n7HcG616XuCnwHXo+ShNmr/YKn9gwFCrzCsgcIkdfvbp/OrVrcYMgLARadHC3DxynLgKXKLgp8AlAn4KXLyJh8DFEz8FLhGAwCV2OtSrZzVkAIQNfubpkSNHzM0jx4HAKQicZCBwsoHAJW4OHTpEDxcvbjVmAISJA61a5fiZp1kFAqcgcJKBwMkGApe4WbhgAW1ADxwIOZHChc1NI9cCgVMQOMlA4GQDgUvcRBo0sBozAMJG//79zU0j1wKBUxA4yUDgZAOBS8wcOHCAnkxJsRozAMIEP/PUy0DgFAROMhA42UDgEjPDhg2j9DZtrAYNgDDRjbcBDwOBUxA4yUDgZAOBS8xEKlSwGjMAwsRjRYrQrl27zE0jVwOBUxA4yUDgZAOBS8x8cs89VoMGQFjY2aQJ9enTx9wscj0QOAWBkwwETjYQuMTLtm3b6DAOn4IQ07VkSXOz8CQQOAWBkwwETjYQuMRLB8gbCDG/NW9O4z2675sZCJyCwEkGAicbCFzipROuPgUhJnL77eYm4VkgcAoCJxkInGwgcImVadOm0Y7Gja1GDYCwsHTpUnOz8CwQOAWBkwwETjYQuMRKx/r1rQYNgLAwslQpc5PwNBA4BYGTDARONhC4xAk/+/QhHD4FIYXve9i1dWtzs/A0EDgFgZMMBE42ELjEyZhRo2hv8+ZWwwZAGPDymadZBQKnIHCSgcDJBgKXOIlUq2Y1agCEgZ+aNKEBAwaYm4TngcApCJxkIHCygcAlRvjw6Yjixa2GDYAw0LVECXOT8CUQOAWBkwwETjYQuMTIkCFD6CCf/xOjcQNAOuPHjjU3CV8CgVMQOMlA4GQDgUuMRIoWtRo1AMLA40lJ5ubgWyBwCgInGQicbCBwiZFP8exTEFLa+XzlqTsQOAWBkwwETjYQuPhny5YtePYpCCUjSpakI0eOmJuEb4HAKQicZCBwsoHAxT8R3LwXhJBf+JmncTr3zQkETkHgJAOBkw0ELv55mJ/9GKOBA0Ayfj7zNKtA4BQETjIQONlA4OIbfvbpDw0bWo0bAJLZ1bSpvvI63oHAKQicZCBwsoHAxTcdIW8ghHTlex4mQCBwCgInGQicbCBw8cuuXbvoubJlrcYNAMnwBTuff/65uTnEJRA4BYGTDARONhC4+IVP4OYTuc0GDgDJ9E1ONjeFuAUCpyBwkoHAyQYCF7/g2acgjHTi1wRJTIErUKAAVb23dmg4/+JLrDLJFLy9qFUmlTJ3VKXi5Spa5VIpeNvtVPmeWla5VJJKppq7r+MOBC5nmV21qtW4ASCZeD3zNKvEFDj0wMkGPXByQQ/c8QcCd+JZs2aN1bgBIBm+8nTcmDHmphDXQOAUBE4yEDjZQODik0d69rQaOAAkEylSxNwM4h4InILASQYCJxsIXHwSSUmxGjgAJDNs2DBzM4h7IHAKAicZCJxsIHD+Z+HChbSpQQOrgQNAKsMT7Nw3JxA4BYGTDARONhA4/xOpW9dq4ACQyqHWralLq1bmZpAQgcApCJxkIHCygcD5n8eSkqxGDgCp9CtWTN+0OhEDgVMQOMlA4GQDgfM3gwcPpoOtW1uNHAAS4StPhw4dam4GCRMInILASQYCJxsInL+JVKhgNXIASKULX6yTwIHAKQicZCBwsoHA+Rc+jDS+TBmrkQNAIjubNKExo0aZm0FCBQKnIHCSgcDJBgLnX54ZP55+b9HCaugAkEjbokXpyJEj5maQUIHAKQicZCBwsoHA+ZdOpUtbjRwAUuHb5SR6IHAKAicZCJxsIHD+ZQ6efQpCwrAEP/fNCQROQeAkA4GTDQTOn2zYsMFq5ACQCN/3rXPLluYmkJCBwCkInGQgcLKBwPmTjg0bWg0dABKJ8H0OAxIInILASQYCJxsInPc5dOgQ9Sha1GroAJDG3mbN6MknnzQ3gYQNBE5B4CQDgZMNBM77fPjhh7StUSOrsQNAGl2KFTNX/4QOBE5B4CQDgZMNBM77ROrUsRo6ACQycvhwc/VP6EDgFAROMhA42UDgvM/okiWthg4AaQwIyJWn7kDgFAROMhA42UDgvM2AAQPoQKtWVmMHgDS6tW1rrv4JHwicgsBJBgInGwict4lUrGg1dABIY2ixYnTgwAFz9U/4QOAUBE4yEDjZQOC8zSd33201dgBIYkeTJjR65Ehz1Q9EIHAKAicZCJxsIHDehW/ee7hNG6vBA0AS7ZKTKT093Vz9AxEInILASQYCJxsInHfp3r691dgBIInfmjenESNGmKt+YAKBUxA4yUDgZAOB8y6dU1OtBg8ASXTmG1QHOBA4BYGTDARONhA4bzJjxgzaWL++1eABIAV+5umXX35prvqBCgROQeAkA4GTDQTOm3TAkxeAcIaWKGGu9oFLXAXu7c+/0bwy70NauG6LLjv1tNNp2pJlVLNRM6u+V/glcOWq3knNO3Wl4S9Ppi6P99dlF15yqf4bzF2x2qrvFX4J3OxlK6loyVQtUVMWfELLtu+hpBKlKF/+/FZdr/BT4PKfcopezmtvLEhvffIFla9Wgx4c+AT1HjmO3l/1nVXfC/wUuDPOPJOmLlxK5114ES3/ca/ebm9PKUHTP1pOc5avsup7AQQu93P48GHqXLiw1eABIInu7dqZq37gEleBczjr7H/p144P96YZn6ygSwtcQZ9sUlY9r/BL4JJKltYSw8MtO/fQr6efcSZd+9+brLpe4pfA5c2bl5p17EqXXF4gU/lpp59u1fUKPwXu0iuu1K8PDRpGUxd9Rnny5IlOO+mkk6z6XuCnwBVKStavFe68K0Pg9ujlbdquE1125VVWXa+AwOV+nhk/nva1aGE1eABIoUtysrnaBzIJIXDcC8Wvd9xdk6rWvE8P58uXz6rnFX4J3KvvLqRrb7yJklPL0Lwvvs00za8GnvFL4LhBX/LdNj18b8Om0XKpAndz4SJUtkp1uuCiizN+gOygOs1bUa3GzalRpH0mmfMSPwWOf2iVq1o9Kui8jM4PlJQy5a36XgCBy/1Eqla1GjwApKAaN6YRTz1lrvaBTNwFjnsrxr0xQw/zznjqoqV6+OLLLrfqeoVfAueWtHPPOz/TtH+dc65V3yv8FDhnmKXGGZYqcI8MG6lfWaCKFC+lhx2hOe+CC636XuCXwH2+bXd0W1284Qeq2ahppv+386PMayBwuZ9ncPUpEEyHlJTA3vfNTNwF7rTT/r8x516Liy+7TJ8vlDfvyVZdr/BL4C65/AqatfQr+mD1RipcrDjN+/Jbevfrdfr8v/ynnGrV9wq/BK5G3Qb07LTZNH/lBuo5+Cldxv9bPs/Rr3PC/BS4a/97I3303Xbq1mcgPT58jD6MuiRj/KmXJtOi9Vut+l7gl8AxZSpXpY82/kiV76lNk95bTDXqNKCJ7yzQ6zSfDmHW9wIIXO6mb9++tL9lS6vRA0AKo0aNMlf7wCbuApcI+CVwiYJfApcI+ClwiYCfApcIQOByNxFcvAAEM0TIuW9OIHAKAicZCJxsIHC5myV33WU1egBIgO/71oF7lwUFAqcgcJKBwMkGApd7WbNmDaXj2adAKE+VKkW7d+82V/tABwKnIHCSgcDJBgKXe4ncd5/V6AEggd9btKCRI0eaq3zgA4FTEDjJQOBkA4HLvfQpVsxq+ACQQKeAP/M0q0DgFAROMhA42UDgciezZs2i9fXqWQ0fAEGH7/v2xJAh5iovIhA4BYGTDARONhC43En7jEbObPgAkECnEiX04+EkBgKnIHCSgcDJBgKX8+zZs4dGlixpNXwASGDhwoXmKi8mEDgFgZMMBE42ELich599eqBVK6vhAyDoDBR23zczEDgFgZMMBE42ELicJ1KlitXwARB0+JY47Vq0MFd3UYHAKQicZCBwsoHA5TzvVKtmNX4ABJ2OxYuLPffNCQROQeAkA4GTDQQuZ9m6davV8AEQdPh5vqNHjzZXd3GBwCkInGQgcLKBwOUsPbp1sxo/AIJOhyJFzFVdZCBwCgInGQicbCBwOUvk9tutxg+AoDOg34nvF4IUCJyCwEkGAicbCNyJ591336WdTZpYjR8AQWZ4qVLmqi42EDgFgZMMBE42ELgTT6R2bavxAyDodG/b1lzVxQYCpyBwkoHAyQYCd+LpU7y41fgBEGT6JSXRL7/8Yq7qYgOBUxA4yUDgZAOBO7HMnTuX1tatazWAAASZiPD7vpmBwCkInGQgcLKBwJ1YInfcYTV+AASZziVKUHp6urmqiw4ETkHgJAOBkw0ELvv59ddfaWhKitUAAhBUDrduTWPHjjVXdfGBwCkInGQgcLKBwGU/48eN048ZMhtBAIJK2m23mat5KAKBUxA4yUDgZAOBy37a8m0WYjSCAAQR/jHy1Vdfmat5KAKBUxA4yUDgZAOBy37mV69uNYIABJWRqanmKh6aQOAUBE4yEDjZQOCyl507d1oNIABBpiu/hjQQOAWBkwwETjYQuOylU8eOVgMIQFDpXaQI7d6921zNQxMInILASQYCJxsIXPaSdvPNViMIQBDZ0aQJ9e3Tx1zFQxUInILASQYCJxsI3PGHb967u2lTqyEEIIh0KVmSjhw5Yq7moQoETkHgJAOBkw0E7viTVrs27W3eHIDA81OTJvp2OGEPBE5B4CQDgZMNBA5BkLAGAqcgcJKBwMkGAocgSFgDgVMQOMlA4GQDgUMQJKyBwCkInGQgcLKBwCEIEtZA4BQETjIQONlA4BAECWsgcAoCJxkInGwgcAiChDUQOAWBkwwETjYQOARBwhoInILASQYCJxsIHIIgYQ0ETkHgJAOBkw0EDkGQsAYCpyBwkoHAyQYChyBIWAOBUxA4yUDgZAOBQxAkrIHAKQicZCBwsoHAIQgS1kDgFAROMhA42UDgEAQJayBwCgInGQicbCBwCIKENRA4BYGTDARONhA4BEHCGgicgsBJBgInGwgcgiBhDQROQeAkA4GTDQQOQZCwBgKnIHCSgcDJBgKHIEhYA4FTEDjJQOBkA4FDECSsgcApCJxkIHCygcAhCBLWQOAUBE4yEDjZQOAQBAlrIHAKAicZCJxsIHAIgoQ1EDgFgZMMBE42EDgEQcIaCJyCwEkGAicbCByCIGENBE5B4CQDgZMNBA5BkLAGAqcgcJKBwMkGAocgSFgTV4HLkydPFKesYZu2VPC222nZtt1Wfa/wS+A+/2EX3VioMJ1/0UXRshkfr6AzzjqL5q/cYNX3Cj8FrkffQZT/lFPona/W0PSPlsX8n3uJnwLnLNe/zztfj3/8vaJLC1xBVe6pbdX1Cj8FbtH6rXTl1dfS1df/V49PmDGPrrzmWmqU1sGq6xUQOARBwpq4C5x7vH3PR2ny/MW0bPseOuXUU636XuGXwF1+5VW0/Me9erhwseL69dzzztOv5t/CS/wSuDvurkmzl63Uw85yO1x+5X+s+l7gp8CNmjQ10/hJJ52kl/vtz7+hReu2WvW9wE+BO++CCzONv/XpF/Tht99D4BAEQXxIXAXu1NNOo2v/exPlzXuyHq/fKo1mZzR2POyn0PglcK9/8BEVSkqmpu070+L1P9CoV6fSmNem62nd+w6iaUuWWe/xAr8E7uR8+ejf519AV19/A72/6rto+dKtP+nlN+t7gZ8Cd8XV19BFl15G9VpG9HhSiVLRaWk9elr1vcAvgWMxLX1HVbrp1sL6/+yUQ+AQBEH8SVwFzuHzbbu1vHCjcH3Bm3WDf/Y551r1vMIvgbulSFLGcn5OC9Zupuq169LTE6fQ2Ndn6Gk9+g2maYs/t97jBX4JnFvCr7vp5ujwJZcXsOp6hZ8C53D5Vf/Rh8uTSqZGy9p0f8iq5wV+CRz3kjfv2FUPv79qI91dv7EehsAhCIL4k4QQOBY37p1yl0nsgXMv0zn/Pk8vd9FSpfW4n1ITD4G79saCMcu9Jh4Cxz9Clm79WZ/byON/H0b92qrnBX4JHNO62wP6ddG6LXRXvYZ6GAKHIAjiT+IqcHy4qXrtevokdx6fs3wVlSxfic4862xauHaLVd8r/BK4ro/3p2v/eyOVrFCJxkyepstuKHgLVapxL5WtWt2q7xV+CdzcFav1SfzFSpeNXqTBvY5PvjTJqusVfgpc+Wo16LbkFKpQ/S49zofFk0uVobPPOceq6xV+CtyVV1+jL9DI988h1DbdH6Tk1DJ02RVXUr9Rz1j1vQAChyBIWBNXgUsU/BK4RMEvgUsE/BS4RMBPgUsEIHAIgoQ1EDgFgZMMBE42EDgEQcIaCJyCwEkGAicbCByCIGENBE5B4CQDgZMNBA5BkLAGAqcgcJKBwMkGAocgSFgDgVMQOMlA4GQDgUMQJKyBwCkInGQgcLKBwCEIEtZA4BQETjIQONlA4BAECWsgcAoCJxkInGwgcAiChDUQOAWBkwwETjYQOARBwhoInILASQYCJxsIHIIgYQ0ETkHgJAOBkw0EDkGQsAYCpyBwkoHAyQYChyBIWAOBUxA4yUDgZAOBQxAkrIHAKQicZCBwsoHAIQgS1kDgFAROMhA42UDgEAQJayBwCgInGQicbCBwCIKENRA4BYGTDARONhA4BEHCGgicgsBJBgInGwgcgiBhDQROQeAkA4GTDQQOQZCwBgKnIHCSgcDJBgKHIEhYA4FTEDjJQOBkA4FDECSsgcApCJxkIHCygcAhCBLWQOAUBE4yEDjZQOAQBAlrIHAKAicZCJxsIHAIgoQ1EDgFgZMMBE42EDgEQcIaCJyCwEkGAicbCByCIGFNTIG78sqr6H9z3g8NN91a2CqTTP3Wba0yqTz5wkR6+ImRVrlUWnXpQS/MnGeVS6VRpL25+zruFCxYkJYtWwYAAAnPgQMHzF1YbIFDEARBEARBEjcQOARBEARBkIAFAocgCIIgCBKwQOAQBEEQBEECFggcgiAIgiBIwPJ/1sGRoCDQgT8AAAAASUVORK5CYII=>