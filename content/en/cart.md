---
title: Cart
description: ''
position: 8
category: Methods
---

### Get a cart

Retrieve the cart attached to the current session.

_Returns the cart object or `null` if no items have been added yet._

```javascript
await swell.cart.get()
```

### Add an item

Add a single item to the cart. Item options can be either an array of product options or an object with product option name/value pairs.

_Returns the updated cart object._

```javascript
// Options as array
await swell.cart.addItem({
  product_id: '5c15505200c7d14d851e510f',
  quantity: 1,
  options: [
    { name: 'Size', value: 'S' },
    { name: 'Color', value: 'Midnight blue' }
  ]
})

// Options as object
await swell.cart.addItem({
  product_id: '5c15505200c7d14d851e510f',
  quantity: 1,
  options: {
    Size: 'S',
    Color: 'Midnight blue'
  }
})
```

### Update an item

Update properties of a single cart item by ID.

_Returns the updated cart object._

```javascript
await swell.cart.updateItem('7d51p8ce72f5542e009fa4c8', {
  quantity: 2
})
```

### Update all items

If you want to update multiple items at once, you can clone `cart.items`, iterate through the items to perform your operation(s), then use this method to replace `cart.items` with your updated array.

_Returns the updated cart object._

```javascript
await swell.cart.setItems([
  {
    id: '5c15505200c7d14d851e510f',
    quantity: 2,
    options: [{ id: 'Color', value: 'Midnight blue' }]
  },
  {
    id: '5c15505200c7d14d851e510g',
    quantity: 3,
    options: [{ id: 'Color', value: 'Ivory' }]
  },
  {
    id: '5c15505200c7d14d851e510h',
    quantity: 4,
    options: [{ id: 'Color', value: 'Bright red' }]
  }
])
```

### Remove an item

Remove a single item from the cart by ID.

_Returns the updated cart object._

```javascript
await swell.cart.removeItem('5c15505200c7d14d851e510f')
```

### Empty the cart

Remove all items from the cart.

_Returns the updated cart object._

```javascript
await swell.cart.setItems([])
```

### Recover a cart

Normally used with an abandoned cart recovery email. The email should have a link to your store with a `checkout_id` identifying the cart that was abandoned. Calling this method will add the cart to the current session and mark it as `recovered`.

_Returns the recovered cart object._

```javascript
await swell.cart.recover('878663b2fb4175b128e40de428cd7b0c')
```

### Update cart account info

Add customer account information to the cart, either for checking out as a guest or setting up a full customer account with password before submitting the order.

Accounts are assigned to a cart by email address.

- If the account has no password set, it's considered a guest checkout and the cart will have the property `guest=true`.
- If the account has a password set, the cart will have the property `account_logged_in=false`. You can use this to prompt the user to <a href="account#log-in">log in</a> to continue. Once the account is logged in, `account_logged_in` will be `true`.

_Returns the updated cart object._

```javascript
await swell.cart.update({
  account: {
    email: 'julia@example.com',
    email_optin: true, // Optional; indicates the customer has consented to receive marketing emails
    password: 'thepassword' // Optional; sets the customer's password if one doesn't exist yet
  }
})
```

### Update cart shipping info

Update the cart with customer shipping information.

_Returns the updated cart object._

```javascript
await swell.cart.update({
  shipping: {
    name: 'Julia Sanchez',
    address1: '560 Olive Drive',
    address2: '',
    city: 'Ellinwood',
    state: 'KS',
    zip: '67526',
    country: 'United States',
    phone: '620-564-3737'
  }
})
```

### Update cart billing info

Update the cart with customer billing information. This method can update both shipping and billing at once if desired.

_Returns the updated cart object._

```javascript
await swell.cart.update({
  billing: {
    name: 'Julia Sanchez',
    address1: '560 Olive Drive',
    address2: '',
    city: 'Ellinwood',
    state: 'KS',
    zip: '67526',
    country: 'United States',
    phone: '620-564-3737',
    // Paying with credit card
    card: {
      // Token from swell.card.createToken() or Stripe.js
      token: 'tok_1H0Qu92eZvKYlo2CsKGk6...'
    },
    // Paying with PayPal
    paypal: {
      payer_id: '...',
      payment_id: '...'
    },
    // Paying with Amazon Pay
    amazon: {
      access_token: '...',
      order_reference_id: '...'
    },
    // Paying with Affirm
    affirm: {
      checkout_token: '...'
    }
  }
})
```

> **Note:** In February 2019, PayPal introduced Smart Payment Buttons. Swell's integration uses a previous version named checkout.js, which continues to be supported by PayPal and Swell. <a href="https://www.notion.so/swellstores/Swell-PayPal-integration-examples-e693bcb3cdeb435f91488bb9ed671a3e">More details and examples</a>.


### Update cart metadata

Use the `metadata` object to store arbitrary values on a cart. As opposed to storing custom fields with the <a href="https://swell.store/docs/api/">backend API</a>, the metadata object is publicly accessible, making it easy to add custom data throughout your checkout flow. Note: the `metadata` object can also be queried and updated using the backend API.

_Returns the updated cart object._

```javascript
await swell.cart.update({
  metadata: {
    any: 'value',
    even: {
      nested: true
    }
  }
})
```

When updating nested arrays in metadata, you may notice the default behavior is to merge instead of replace values. To replace array values, use the `$set` operator to override the entire value.

```javascript
await swell.cart.update({
  $set: {
    metadata: {
      my_array: [ ... ]
    }
  }
})
```

#### Add metadata to items

In addition to the top level `metadata` field, you can also define metadata on each cart item.

```javascript
await swell.cart.updateItem('7d51p8ce72f5542e009fa4c8', {
  quantity: 2,
  metadata: {
    any: 'value'
  }
})
```

### Apply a coupon/gift card code

Use to apply a coupon or gift card code to the cart (works with both so you can have a single input field). A cart can have one coupon and multiple gift card codes applied at once. Codes are not case sensitive.

_Returns the updated cart object if code is valid. Otherwise, returns a validation error._

```javascript
await swell.cart.applyCoupon('SUMMERTIME')
```

### Apply a gift card

Use to apply a gift card code to the cart. A cart can have multiple gift card codes applied at once. Codes are not case sensitive.

_Returns the updated cart object if code is valid. Otherwise, returns a validation error._

```javascript
await swell.cart.applyGiftcard('BUYS SFX4 BMZH YY7N')
```

### Remove coupon

Use to remove the coupon code from the cart, if one was applied.

```javascript
await swell.cart.removeCoupon()
```

### Remove a gift card

Use to remove a gift card from the cart, by passing the ID that was assigned to `cart.giftcards.id`.

```javascript
await swell.cart.removeGiftcard('5c15505200c7d14d851e51af')
```

### Get shipping rates

A shipment rating contains all available shipping services and their price, based on cart items and the customer's shipping address. The cart must have at least `shipping.country` set to generate a rating.

_Returns an object with shipping services and rates._

```javascript
await swell.cart.getShippingRates()
```

### Submit an order

When a customer has entered all the information needed to finalize their order, call this method to process their payment and convert the cart to an order.

_Returns the newly created order._

```javascript
await swell.cart.submitOrder()
```

### Get order details

When a cart is submitted, the newly created order will be returned. However, you can use this method if you need to get the order information separately. You can also retrieve an order with a `checkout_id`, allowing you to display order details from an email containing a link like `https://my-store.com/order/{checkout_id}`.

_Returns order with the passed ID, or if no parameters are passed, the last order placed in the current session._

```javascript
// Get the last order placed in the current session
await swell.cart.getOrder()

// Get an order by checkout_id
await swell.cart.getOrder('878663b2fb4175b128e40de428cd7b0c')
```

### Get checkout settings

Use to retrieve settings that can affect checkout behavior.

_Returns object with:_

- `name` - Store name
- `currency` - Store base currency
- `support_email` - Email address for customer support
- `fields` - Set of checkout fields to show as optional or required
- `scripts` - Custom scripts including script tags
- `accounts` - Indicates whether account login is `optional`, `disabled` or `required`
- `email_optin` - Indicates whether email newsletter opt-in should be presented as optional
- `terms_policy` - Store terms and conditions
- `refund_policy` - Store refund policy
- `privacy_policy` - Store privacy policy
- `theme` - Checkout style settings
- `countries` - List of country codes that have shipping zones configured
- `currencies` - List of currencies enabled by the store when using multi-currency
- `payment_methods` - List of active payment methods
- `coupons` - Indicates whether the store has coupons
- `giftcards` - Indicates whether the store has gift cards

```javascript
await swell.cart.getSettings()
```

<br />
