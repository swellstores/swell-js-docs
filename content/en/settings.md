---
title: Settings
description: ""
position: 4
category: Methods
---

#### Fetch store settings

_Returns an object representing store settings, and saves it to an internal cache for accessing synchronously._

> **Note:** This must be called before trying to get a setting by path

```javascript
await swell.settings.get();
```

#### Get setting by path

_Returns a value from the store settings object using path notation, with an optional default if the value is undefined._

```javascript
swell.settings.get("colors.primary.dark", "#000000");
```

#### Fetch all nav menus

_Returns an array containing store navigation menus, and saves it to an internal cache for accessing synchronously._

> **Note:** This must be called before trying to get a menu by ID

```javascript
await swell.settings.menus();
```

#### Get nav menu by ID

_Returns a single navigation menu object._

```javascript
swell.settings.menus("header");
```

#### Fetch payment settings

_Returns an object representing payment settings, and saves it to an internal cache for using with [checkout](#checkout) methods._

```javascript
swell.settings.payments();
```
