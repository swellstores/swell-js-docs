---
title: Attributes
description: ""
position: 6
category: Methods
---

#### List attributes

_Returns a list of product attributes, with offset pagination using `limit` and `page`._

```javascript
await swell.attributes.list({
  limit: 25,
  page: 1
});
```

#### Get an attribute

_Returns a single attribute._

```javascript
// By slug
await swell.attributes.get("color");

// By ID
await swell.attributes.get("5c15505200c7d14d851e510g");
```
