---
title: Subscriptions
description: "Retrieve and manage subscriptions associated with the logged in customer's account."
position: 10
category: Methods
---

Manage subscriptions associated with the [logged in](/account) customer's account.

### List subscriptions

Return a list of active and canceled subscriptions for an account.

_Returns all subscriptions, with offset pagination using `limit` and `page`._

```javascript
await swell.subscriptions.list()
```

### Get a subscription

Return a single subscription by ID.

```javascript
await swell.subscriptions.get(id)
```

## Subscription management

### Create a new subscription

Subscribe the customer to a new product for recurring billing.

```javascript
await swell.subscriptions.create({
  product_id: '5c15505200c7d14d851e510f',
  // the following parameters are optional
  variant_id: '5c15505200c7d14d851e510g',
  quantity: 1,
  coupon_code: '10PERCENTOFF',
  items: [
    {
      product_id: '5c15505200c7d14d851e510h',
      quantity: 1
    }
  ]
})
```

### Update a subscription

```javascript
await swell.subscriptions.update('5c15505200c7d14d851e510f', {
  // the following parameters are optional
  quantity: 2,
  coupon_code: '10PERCENTOFF',
  items: [
    {
      product_id: '5c15505200c7d14d851e510h',
      quantity: 1
    }
  ]
})
```

### Change a subscription plan

```javascript
await swell.subscriptions.update('5c15505200c7d14d851e510f', {
  product_id: '5c15505200c7d14d851e510g',
  variant_id: '5c15505200c7d14d851e510h', // optional
  quantity: 2
})
```

### Cancel a subscription

```javascript
await swell.subscriptions.update('5c15505200c7d14d851e510f', {
  canceled: true
})
```

### Add an invoice item

```javascript
await swell.subscriptions.addItem('5c15505200c7d14d851e510f', {
  product_id: '5c15505200c7d14d851e510f',
  quantity: 1,
  options: [
    {
      id: 'color',
      value: 'Blue'
    }
  ]
})
```

### Update an invoice item

```javascript
await swell.subscriptions.updateItem('5c15505200c7d14d851e510f', '<item_id>', {
  quantity: 2
})
```

### Update all invoice items

```javascript
await swell.subscriptions.setItems('5c15505200c7d14d851e510e', [
  {
    id: '5c15505200c7d14d851e510f',
    quantity: 2,
    options: [
      {
        id: 'color',
        value: 'Blue'
      }
    ]
  },
  {
    id: '5c15505200c7d14d851e510g',
    quantity: 3,
    options: [
      {
        id: 'color',
        value: 'Red'
      }
    ]
  },
  {
    id: '5c15505200c7d14d851e510h',
    quantity: 4,
    options: [
      {
        id: 'color',
        value: 'White'
      }
    ]
  }
])
```

### Remove an item

```javascript
await swell.subscriptions.removeItem('5c15505200c7d14d851e510f', '<item_id>')
```

### Remove all items

```javascript
await swell.subscriptions.setItems([])
```

<br />
