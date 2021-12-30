---
title: Account
description: 'Authenticate customers and fetch/manage manage their account data.'
position: 9
category: Methods
---

Authenticate customers, fetch and manage manage their account data.

## Session management

### Log in

Use to authenticate a customer with their email address and password. If the email/password combo is correct, their account will be added to the session, making customer-specific methods available. This will set `account_logged_in=true` and `guest=false`.

```javascript
await swell.account.login('julia@example.com', 'thepassword')
```

### Log out

Use to disconnect the account from the current session. This will set `account_logged_in=false` and `guest=true`.

```javascript
await swell.account.logout()
```

### Get logged in account

Use to get information about the customer currently logged in.

_Returns the account object, or `null` if the customer is not logged in._

```javascript
await swell.account.get()
```

## Account management

### Create an account

Use to create a new customer account and attach it to the current session.

_Returns the newly created account object._

```javascript
await swell.account.create({
  email: 'julia@example.com',
  first_name: 'Julia', // Optional
  last_name: 'Sanchez', // Optional
  email_optin: true, // Optional
  password: 'thepassword' // Optional
})
```

### Update the account

Use to update properties of the currently logged in account.

_Returns the updated account object if successful. Otherwise, returns a validation error._

```javascript
await swell.account.update({
  email: 'julia@anotherexample.com',
  first_name: 'Julia', // Optional
  last_name: 'Sanchez', // Optional
  email_optin: true, // Optional
  password: 'thepassword' // Optional
})
```

### Update the account metadata

Use the `metadata` object to store arbitrary values on an account. As opposed to storing custom fields with the <a href="https://swell.store/docs/api/">backend API</a>, the metadata object is publicly accessible, making it easy to add custom data throughout your customer flow. Note: the `metadata` object can also be queried and updated using the backend API.

_Returns the updated account object._

```javascript
await swell.account.update({
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
await swell.account.update({
  $set: {
    metadata: {
      my_array: [ ... ]
    }
  }
})
```

### Send a password reset email

Use the `recover` method to send an email to the customer with a link to reset their password. If the email address provided doesn't exist in the system, no email will be sent.

_Returns a value indicating success._

```javascript
await swell.account.recover({
  email: 'julia@example.com'
})
```

To customize the password reset URL sent to the customer in an email, pass the optional parameter `reset_url`, including a placeholder for the password reset key: `{reset_key}`. Swell will automatically generate and substitute the password reset key in the URL before sending an email.

```javascript
await swell.account.recover({
  email: 'julia@example.com',
  reset_url: 'https://example.com/password-reset?key={reset_key}'
})
```

Note: password reset requests automatically expire after 24 hours.

### Reset an account password

Use to set the customer's new password. This requires the `reset_key` from the recovery email (see above). The password recovery email should link to your storefront with `reset_key` as a URL parameter that you can pass to this method.

```javascript
await swell.account.recover({
  password: 'thenewpassword',
  reset_key: 'e42e66fc7e3f00e9e179w20ad1841146'
})
```

### List addresses

Use to get a list of addresses on file for the account. These are stored automatically when a non-guest user checks out and chooses to save their information for later.

_Returns all addresses, with offset pagination using `limit` and `page`._

```javascript
await swell.account.listAddresses()
```

### Create an address

Use to add a new address to the account.

_Returns the newly created address object._

```javascript
await swell.account.createAddress({
  name: 'Julia Sanchez',
  address1: 'Apartment 16B',
  address2: '2602 Pinewood Drive',
  city: 'Jacksonville',
  state: 'FL',
  zip: '32216',
  country: 'United States',
  phone: '904-504-4760'
})
```

### Update an address

Use to update an existing address from the account by ID.

_Returns the updated address object._

```javascript
await swell.account.updateAddress('5c15505200c7d14d851e510f', {
  name: 'Julia Sanchez',
  address1: 'Apartment 16B',
  address2: '2602 Pinewood Drive',
  city: 'Jacksonville',
  state: 'FL',
  zip: '32216',
  country: 'United States',
  phone: '904-504-4760'
})
```

### Delete an address

Use to remove an existing address from the account by ID.

_Returns the deleted address object._

```javascript
await swell.account.deleteAddress('5c15505200c7d14d851e510f')
```

### List saved credit cards

Use to get a list of credit cards on file for the account. These are stored automatically when a non-guest user checks out and chooses to save their information for later.

_Returns all addresses, with offset pagination using `limit` and `page`._

```javascript
await swell.account.listCards()
```

### Create a new credit card

Use to save a tokenized credit card to the account for future use. Credit card tokens can be created using `swell.card.createToken` or Stripe.js.

```javascript
await swell.account.createCard({
  token: '...'
})
```

### Delete a credit card

Use to remove a saved credit card from the account by ID.

```javascript
await swell.account.deleteCard('5c15505200c7d14d851e510f')
```

### List account orders

Return a list of orders placed by a customer.

```javascript
await swell.account.listOrders({
  limit: 10,
  page: 2
})
```

### Get an account order

Return a single account order by ID.

```javascript
await swell.account.getOrder('5fab561fb4a4d83c776f45bd')
```

### List account orders with shipments

Return a list of orders placed by a customer including shipments with tracking information.

_Returns all orders, with offset pagination using `limit` and `page`._

```javascript
await swell.account.listOrders({
  expand: 'shipments'
})
```

<br />
