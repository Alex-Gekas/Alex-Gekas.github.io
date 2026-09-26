---
title: "Authentication and headers"
description: "Authentication requirements and best practices for the NWS API"
---

# Authentication and headers

The NWS API doesn't require an API key or authentication token. However, **you must include a `User-Agent` header** with every request to identify your app.


## User-Agent requirement

The `User-Agent` header should include:

1. **App name and version**
2. **Valid contact method** (email address or website)

This allows NWS administrators to contact you if there are issues with your app or security concerns.

### Recommended format

```http
User-Agent: ApplicationName/Version (contact@example.com)
```

### Examples

**Simple app**

```http
User-Agent: MyWeatherApp/1.0 (myemail@example.com)
```

**Production app**
```http
User-Agent: WeatherDashboard/2.3.1 (support@weatherdashboard.com)
```

**Personal project**
```http
User-Agent: PersonalWeatherBot/1.0 (https://github.com/username/weather-bot)
```
## What happens without a User-Agent?

The API rejects requests without a `User-Agent` header with a `403 Forbidden` error.

### Example error response

```http
Access Denied
You don't have permission to access
"http://api.weather.gov/points/43.1566,-77.6088" on this server.
Reference #18.c968dc17.1737489616.6bd4c22
```
### Complete request example

Here's a complete curl request with proper headers:

```bash
curl "https://api.weather.gov/points/40.7766,-73.8742"
  -H "User-Agent: MyWeatherApp/1.0 (contact@example.com)"
  -H "Accept: application/geo+json"
  ```

## Best practices

- **Always include a user-agent** with your app name and contact info
- **Use a valid email address** so NWS can reach you if needed
- **Update the version number** when you make significant changes to your app
- **Include your project URL** if you don't want to share an email address
- **Don't use generic user-agents** like "curl" or "python-requests"
- **Don't share user-agents** across multiple unrelated applications

**Next:** [Caching →](./caching.md)