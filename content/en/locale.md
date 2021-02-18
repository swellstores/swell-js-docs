---
title: Localization
description: ''
position: 13
category: Methods
---

Methods to handle locale selection and retrieve localized content when multi-language is enabled.

### List enabled locales

_Returns an array of enabled locales. Result will be empty if multi-language has not been configured on the store._

```javascript
await swell.locale.list()
```

Example result:

```json
[
  {
    "code": "en",
    "name": "English"
  },
  {
    "code": "fr",
    "name": "French"
  },
  {
    "code": "es",
    "name": "Spanish"
  }
]
```

### Select a locale

_Sets a browser cookie and updates the user's session and cart to the selected locale._

In a multi-language setup, call the `select()` method to change settings used to retrieve all types of content (products, pages, etc.)

If a cart exists in the user's session, this method also updates the cart to reflect the user's locale preference.

```javascript
await swell.locale.select('es')
```

### Retrieve localized content

The store default or user selected locale is used automatically when retrieving content with this library.

```javascript
await swell.locale.select('es') // optional

await swell.products.list()
```

Results will have the same shape as non-localized values, with localized fields overwriting default ones.

```json
{
  ...
  "name": "Producto de prueba"
  ...
}
```

### Get the selected locale

_Returns the selected locale code. Defaults to the store's default locale._

```javascript
swell.locale.selected() // => es
```

### Multi-language content

In a multi-language setup, all methods available in this library will retrieve localized content according to the selected, fallback, or store's default locale (in that order).

When a customer account is created or updated in a storefront or during checkout, the selected locale will also be stored on the customer record and will be used to resolve localized content for email notifications and other offline communications.

See our help center for more details on <a href="https://support.swell.store/en/articles/4919430-multi-language-setup">multi-language setup</a>.



<br />
