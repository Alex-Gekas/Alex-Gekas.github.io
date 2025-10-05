---
title: "Alerts & Warnings"
description: "Explains the NWS Alerts & Warnings API endpoint."
---

### **Authentication and Headers**

The API doesn't require a key for authentication. Instead, it requires an identifying string, or `User-Agent`, unique to the application making requests. Including the application name and a valid contact method in the User-Agent is recommended. In case of a security event associated with your application, the NWS API administrators will contact you at the provided email address.

**Example Header:**

```
User-Agent: MyWeatherApp 1.0/ (myemail@example.com)
```

**Note:** Submitting requests without a User-Agent will result in a `403 Forbidden` error.

**Example Error:**

```
Access Denied You don't have permission to access "http://api.weather.gov/points/43.1566,-77.6088" on this server.
Reference #18.c968dc17.1737489616.6bd4c22
```
