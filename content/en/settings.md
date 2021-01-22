---
title: Settings
description: ''
position: 4
category: Methods
---

Use settings to make storefront apps responsive to admin preferences such as store name, locale, currency, etc. In addition to `store` properties described below, app-specific settings are included in the result set.

### Example settings

```json
{
  "store": {
    "id": "example",
    "name": "Example Store",
    "url": "https://example.swell.store",
    "country": "US",
    "locale": "en-US",
    "support_email": "support@example.com",
    "support_phone": "(555) 555-5555",
    "currency": "USD",
    "public_key": "pk_cn6XsV3m28OjPuN68JdqYbbWJSUGbCqX",
    "currencies": [
      {
        "code": "USD",
        "rate": 1,
        "name": "US Dollar",
        "symbol": "$",
        "decimals": 2,
        "type": "base"
      },
      {
        "code": "EUR",
        "rate": 0.82542,
        "name": "Euro",
        "symbol": "€",
        "decimals": 3,
        "type": "display"
      }
    ],
    "analytics_scripts": "...",
    "facebook_pixel_id": "..."
  },

  // app-specific settings...
}
```

### Retrieve settings

Methods to retrieve settings may return a promise if all settings haven't been [loaded](#load-all-settings) yet.

### Get all settings

_Returns the entire store settings object._

```javascript
await swell.settings.get()
```

### Get setting by path

_Returns a value from the store settings object using path notation, with an optional default if the value is undefined._

```javascript
await swell.settings.get('colors.primary.dark', '#000000')
```

### Load all settings

_Returns an object representing store settings, and saves it to an internal cache for accessing synchronously._

We recommend calling `load()` when initially loading a storefront, so that all other calls to `get()` will be synchronous.

```javascript
await swell.settings.load()
```

## Navigation menus

### Retrieve all nav menus

_Returns an array containing store navigation menus, and saves it to an internal cache for accessing synchronously._

```javascript
await swell.settings.menus()
```

### Get nav menu by ID

_Returns a single navigation menu object._

```javascript
await swell.settings.menus('header')
```

## Payment settings

### Retrieve payment settings

_Returns an object representing payment settings, and saves it to an internal cache for using with [checkout](/payment) methods._

```javascript
await swell.settings.payments()
```

<br />
