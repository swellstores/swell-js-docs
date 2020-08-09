---
title: Payment
description: ""
position: 11
category: Methods
---

## Payment elements

Render 3rd party payment elements with settings configured by your Swell store. This method dynamically loads 3rd party libraries such as Stripe, Braintree and PayPal, in order to standardize the way payment details are captured.

Note: when using a card element, it's necessary to <a href="#tokenize-payment-elements">tokenize</a> card details before submitting an order.

### Stripe

Render Stripe elements to capture credit card information. You can choose between a unified [card element](https://stripe.com/docs/js/elements_object/create_element?type=card "card element") or separate elements ([cardNumber](https://stripe.com/docs/js/elements_object/create_element?type=cardNumber "cardNumber"), [cardExpiry](https://stripe.com/docs/js/elements_object/create_element?type=cardExpiry "cardExpiry"), [cardCvc](https://stripe.com/docs/js/elements_object/create_element?type=cardCvc "cardCvc")).

#### Render a Stripe card element

```javascript
import swell from "swell-js";

swell.init("my-store", "pk_...");

swell.payment.createElements({
  card: {
    elementId: "#card-element-id", // default: #card-element
    options: {
      // options are passed as a direct argument to stripe.js
      style: {
        base: {
          fontWeight: 500,
          fontSize: "16px"
        }
      }
    },
    onSuccess: result => {
      // optional, called on card payment success
    },
    onError: error => {
      // optional, called on card payment error
    }
  }
});
```

#### Render other Stripe elements

```javascript
import swell from "swell-js";

swell.init("my-store", "pk_...");

swell.payment.createElements({
  card: {
    separateElements: true, // required for separate elements
    cardNumber: {
      elementId: "#card-number-id", // default: #cardNumber-element
      options: {
        // options are passed as a direct argument to stripe.js
        style: {
          base: {
            fontWeight: 500,
            fontSize: "16px"
          }
        }
      }
    },
    cardExpiry: {
      elementId: "#card-expiry-id" // default: #cardExpiry-element
    },
    cardCvc: {
      elementId: "#card-expiry-id" // default: #cardCvc-element
    },
    onSuccess: result => {
      // optional, called on card payment success
    },
    onError: error => {
      // optional, called on card payment error
    }
  }
});
```

Note: see Stripe documentation for [options](https://stripe.com/docs/js/elements_object/create_element?type=card#elements_create-options "options") and [customization](https://stripe.com/docs/js/appendix/style?type=card "customization").

### PayPal button

Render a PayPal checkout button.

```javascript
import swell from "swell-js";

swell.init("my-store", "pk_...");

swell.payment.createElements({
  paypal: {
    elementId: "#element-id", // default: #paypal-button
    style: {
      layout: "horizontal", // optional
      color: "blue",
      shape: "rect",
      label: "buynow",
      tagline: false
    },
    onSuccess: (data, actions) => {
      // optional, called on payment success
    },
    onCancel: () => {
      // optional, called on payment cancel
    },
    onError: error => {
      // optional, called on payment error
    }
  }
});
```

Note: see [PayPal documentation](https://developer.paypal.com/docs/checkout/integration-features/customize-button/) for details on available style parameters.

### Tokenize elements

When using a payment element such as `card` with Stripe, it's necessary to tokenize card details before submitting a payment form. Note: Some payment methods such as PayPal will auto-submit once the user completes authorization via PayPal, but tokenizing is always required for credit card elements.

If successful, `tokenize()` will automatically update the cart with relevant payment details. Otherwise, returns a validation error.

```javascript
import swell from 'swell-js';

swell.init('my-store', 'pk_...');

swell.payment.createElements({
  card: {
    ...
  },
});

const form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  showLoading();

  const result = await swell.payment.tokenize();

  hideLoading();

  if (result.error) {
    // inform the customer there was an error
  } else {
    // finally submit the form
    form.submit();
  }
});
```

## Direct credit card tokenization

If a <a href="#payment-elements">payment element</a> isn't available for your credit card processor, you can tokenize credit card information directly.

### Create a card token

Returns an object representing the card token. Pass the token ID to a cart's `billing.card.token` field to designate this card as the payment method.

```javascript
const response = await swell.card.createToken({
  number: "4242 4242 4242 4242",
  exp_month: 1,
  exp_year: 2099,
  cvc: 321,
  // Note: some payment gateways may require a Swell `account_id` and `billing` for card verification (Braintree)
  account_id: "5c15505200c7d14d851e510f",
  billing: {
    address1: "1 Main Dr.",
    zip: 90210
    // Other standard billing fields optional
  }
});
```

#### Successful token response

```javascript
{
  token: 't_z71b3g34fc3',
  brand: 'Visa',
  last4: '4242',
  exp_month: 1,
  exp_year: 2029,
  cvc_check: 'pass', // fail, checked
  zip_check: 'pass', // fail, checked
  address_check: 'pass', // fail, checked
}
```

#### Error token response

```javascript
{
  errors: {
    gateway: {
      code: 'TOKEN_ERROR',
      message: 'Declined',
      params: {
        cvc_check: 'fail',
        zip_check: 'pass',
        address_check: 'unchecked',
      },
    },
  },
}
```

### Validate card details

#### Card number

Returns `true` if the card number is valid, otherwise `false`.

```javascript
swell.card.validateNumber("4242 4242 4242 4242"); // => true
swell.card.validateNumber("1111"); // => false
```

#### Card expiry

Returns `true` if the card expiration date is valid, otherwise `false`.

```javascript
swell.card.validateExpry("1/29"); // => true
swell.card.validateExpry("1/2099"); // => true
swell.card.validateExpry("9/99"); // => false
```

#### CVC code

Returns `true` if the card CVC code is valid, otherwise `false`.

```javascript
swell.card.validateCVC("321"); // => true
swell.card.validateCVC("1"); // => false
```
