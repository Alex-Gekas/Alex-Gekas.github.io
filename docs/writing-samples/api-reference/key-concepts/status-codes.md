---
title: "Status Codes"
description: "Explains the NWS Status Codes."
---

# HTTP Status Codes in the NWS API

The NWS API uses standard HTTP status codes to indicate the success or failure of a request. This page provides an overview of possible responses and how to interpret them.

Each API endpoint also lists the most common status codes returned in its context.  
See the [Endpoints section](../endpoints/index.md) for details.

---

## 2xx–Success

| Code | Meaning             | Description                                           |
|------|---------------------|-------------------------------------------------------|
| 200  | OK                  | The request was successful and the response contains the expected data. |
| 204  | No Content          | The request succeeded, but there's no response body. Rare in the NWS API. |

---

## 3xx–Redirection

| Code | Meaning             | Description                                           |
|------|---------------------|-------------------------------------------------------|
| 304  | Not Modified        | The resource has not changed since the last request (used with caching headers). |

---

## 4xx–Client Errors

| Code | Meaning             | Description                                           |
|------|---------------------|-------------------------------------------------------|
| 400  | Bad Request         | The request was invalid or malformed (for example, incorrect parameter format). |
| 401  | Unauthorized        | Missing or invalid `User-Agent` header. |
| 403  | Forbidden           | You aren't authorized to access this resource. |
| 404  | Not Found           | The endpoint or resource couldn't be found. |
| 406  | Not Acceptable      | The server can't produce a response matching the requested format. |
| 429  | Too Many Requests   | You have exceeded the rate limit or quota. |

---

## 5xx–Server Errors

| Code | Meaning             | Description                                           |
|------|---------------------|-------------------------------------------------------|
| 500  | Internal Server Error | A general server-side error occurred. Try again later. |
| 503  | Service Unavailable | The service is temporarily unavailable or under maintenance. |

---

## Error Response Format

When an error occurs, the API returns a structured JSON response like this:

```json
{
  "title": "Bad Request",
  "status": 400,
  "detail": "The value provided for 'area' is not valid.",
  "type": "https://api.weather.gov/problems/InvalidParameter"
}
```
👉**Next:** Learn about units used by the NWS API [Units](./units.md) → 