---
title: Currency
description: ''
position: 12
category: Methods
---

Methods to format money, and handle currency selection and conversion when multi-currency is enabled.

### Format money

_Returns a formatted string based on store currency settings._

This method will automatically use the store's base currency settings by default, or the [selected](#select-a-currency) currency in a multi-currency setup.

```javascript
swell.currency.format(10) // => $10.00
```

Optionally override default currency settings.

```javascript
swell.currency.format(10, {
  code: 'EUR',
  locale: 'en-GB'
  decimals: 4, // number of decimal digits
  rate: 0.8874 // conversion rate
}) // => €8.874
```

### List enabled currencies

_Returns an array of enabled currencies. Result will be empty if multi-currency has not been configured on the store._

```javascript
await swell.currency.list()
```

Example result:

```json
[
  {
    "code": "USD",
    "rate": 1,
    "name": "US Dollar",
    "symbol": "$",
    "decimals": 2,
    "type": "base"
  },
  {
    "code": "EUR",
    "rate": 0.82542,
    "name": "Euro",
    "symbol": "€",
    "decimals": 2,
    "type": "display"
  },
  {
    "code": "AUD",
    "rate": 1.28934,
    "name": "Australian Dollar",
    "symbol": "A$",
    "decimals": 2,
    "type": "display"
  }
]
```

### Select a currency

_Sets a browser cookie and updates the user's session and cart to the selected currency._

In a multi-currency setup, call the `select()` method to change settings used by `format()` to render money values.

If a cart exists in the user's session, this method also updates the cart to reflect the user's currency preference.

```javascript
await swell.currency.select('EUR')
```

### Get the selected currency

_Returns the selected currency code. Defaults to the store's base currency._

```javascript
swell.currency.selected() // => USD
```

### Multi-currency formatting

In a multi-currency setup, `format()` will automatically consider selected currency options. Formatting with a display currency will cause a money value to be converted using a standard conversion rate (updated daily).

```javascript
swell.currency.format(10) // => $10.00

await swell.currency.select('EUR')

swell.currency.format(10) // => €8.874
```

See our help center for more details on <a href="https://support.swell.store/en/articles/4815655-multi-currency-setup">multi-currency setup</a>.

<br />
