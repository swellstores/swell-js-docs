---
title: Products
description: ''
position: 5
category: Methods
---

### List products

_Returns all products, with offset pagination using `limit` and `page`._

```javascript
await swell.products.list({
  limit: 25, // Max. 100
  page: 1
})
```

### List products with variants

_Returns all products and their active variants, with offset pagination using `limit` and `page`._

```javascript
await swell.products.list({
  limit: 25, // Max. 100
  page: 1,
  expand: ['variants']
})
```

### List products by category

_Returns products in a specific category, with offset pagination using `limit` and `page`._

```javascript
await swell.products.list({
  categories: 't-shirts', // Slug or ID
  limit: 25, // Max. 100
  page: 1
})
```

### Get a product

_Returns a single product._

```javascript
// By slug
await swell.products.get('blue-shoes')

// By ID
await swell.products.get('5c15505200c7d14d851e510f')
```

### Get a product variation

_Returns a single product variation matching selected options._

Resolves the variation `price`, `sale_price`, `orig_price` and `stock_status` values based on the customer's chosen options. Typically you would <a href="#get-a-product">retrieve a product</a> earlier in the page's lifecycle and pass it to this method along with the options. Options can be either an array or an object with option name/value pairs.

_Returns a new object with product and option/variant values merged together._

```javascript
await swell.products.variation(product, {
  Size: 'Medium',
  Color: 'Turquoise'
})
```

### Search for products

Perform a full text search with a string. The search operation is performed using AND syntax, where all words must be present in at least one field of the product.

_Returns products matching the search query string, with offset pagination using `limit` and `page`._

```javascript
await swell.products.list({
  search: 'black jeans', // Any text string
  limit: 25, // Max. 100
  page: 1
})
```

## Filtering

Methods to simplify product filtering, typically as part of a search or category page. The type of filters supported include price range, categories and attributes.

### List filters

_Returns an array of filters given a list of products as input._

```javascript
const products = await swell.products.list(...)

await swell.products.filters(products)
```

<alert type="success">
A filter list is based on the set of input products, therefore your page should retrieve the full set of relevant products before <a href="#apply-filters">applying filters</a>.
</alert>

Price and category filters are identified explicitly by `price` and `category` IDs, respectively. Other filters are identified by their attribute ID.

```json
[
  {
    "id": "price",
    "label": "Price",
    "type": "range",
    "interval": 10,
    "options": [
      {
        "value": 10,
        "label": "$10.00"
      },
      {
        "value": 100,
        "label": "$100.00"
      }
    ]
  },
  {
    "id": "category",
    "label": "Category",
    "type": "select",
    "options": [
      {
        "value": "t-shirts",
        "label": "T-Shirts"
      },
      {
        "value": "featured",
        "label": "Featured products"
      }
    ]
  },
  {
    "id": "size",
    "label": "Size",
    "type": "select",
    "options": [
      {
        "value": "small",
        "label": "Small"
      },
      {
        "value": "medium",
        "label": "Medium"
      },
      {
        "value": "large",
        "label": "Large"
      }
    ]
  }
]
```

### Apply filters

Pass a `$filters` object when retrieving products. Each property represents a filter by ID, and an array of values to filter the resulting product list.

```javascript
await swell.products.list({
  page,
  limit,
  sort,
  categories, // optional category slug or ID
  $filters: {
    price: [10, 20],
    category: ['featured'],
    size: ['small', 'large']
  }
})
```

<br />
