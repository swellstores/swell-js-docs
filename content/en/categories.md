---
title: Categories
description: ""
position: 7
category: Methods
---

#### List categories

_Returns a list of product categories, with offset pagination using `limit` and `page`._

```javascript
await swell.categories.list({
  limit: 25,
  page: 1
});
```

#### Get a category

_Returns a single category._

```javascript
// By slug
await swell.categories.get("mens-shirts");

// By ID
await swell.categories.get("5c15505200c7d14d851e510g");
```
