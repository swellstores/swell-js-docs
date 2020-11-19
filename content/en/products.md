---
title: Products
description: ""
position: 5
category: Methods
---

## Fetching product data

### List products

_Returns all products, with offset pagination using `limit` and `page`._

```javascript
await swell.products.list({
  limit: 25, // Max. 100
  page: 1,
});
```

### List products + variants

_Returns all products and their active variants, with offset pagination using `limit` and `page`._

```javascript
await swell.products.list({
  limit: 25, // Max. 100
  page: 1,
  expand: ["variants"],
});
```

### List products by category

_Returns products in a specific category, with offset pagination using `limit` and `page`._

```javascript
await swell.products.list({
  category: "t-shirts", // Slug or ID
  limit: 25, // Max. 100
  page: 1,
});
```

### Get a product

_Returns a single product._

```javascript
// By slug
await swell.products.get("blue-shoes");

// By ID
await swell.products.get("5c15505200c7d14d851e510f");
```

### Search for products

Perform a full text search with a string. The search operation is performed using AND syntax, where all words must be present in at least one field of the product.

_Returns products matching the search query string, with offset pagination using `limit` and `page`._

```javascript
await swell.products.list({
  search: "black jeans", // Any text string
  limit: 25, // Max. 100
  page: 1,
});
```

## Calculating a variation

### Find a product variant matching selected options

Resolve the correct `price`, `sale_price`, `orig_price` and `stock_status` values based on the customer's chosen options. Typically you would <a href="/docs/js/products#get-a-product">retrieve a product</a> earlier in the page's lifecycle and pass it to this method along with the options. Options can be either an array or an object with option name/value pairs.

_Returns a new object with product and option/variant values merged together._

```javascript
await swell.products.variation(product, {
  Size: "Medium",
  Color: "Turquoise",
});
```
