---
title: Settings
description: ""
position: 4
category: Methods
---

## Store & theme settings

### Fetch settings

_Returns an object representing store settings, and saves it to an internal cache for accessing synchronously._

> **Note:** This must be called before calling `swell.settings.get()`

```javascript
await swell.settings.load();
```

### Get all settings

_Returns the entire store settings object._

```javascript
swell.settings.get();
```

### Get setting by path

_Returns a value from the store settings object using path notation, with an optional default if the value is undefined._

```javascript
swell.settings.get("colors.primary.dark", "#000000");
```

## Navigation menus

### Fetch all nav menus

_Returns an array containing store navigation menus, and saves it to an internal cache for accessing synchronously._

> **Note:** This must be called before trying to get a menu by ID

```javascript
await swell.settings.menus();
```

### Get nav menu by ID

_Returns a single navigation menu object._

```javascript
swell.settings.menus("header");
```

## Payment settings

### Fetch payment settings

_Returns an object representing payment settings, and saves it to an internal cache for using with [checkout](/payment) methods._

```javascript
swell.settings.payments();
```
