---
title: Payment
description: ''
position: 11
category: Methods
---

## Payment elements

Render 3rd party payment elements with settings configured by your Swell store. This method dynamically loads 3rd party libraries such as Stripe, Braintree and PayPal, in order to standardize the way payment details are captured.

Note: when using a card element, it's necessary to <a href="payment#direct-credit-card-tokenization">tokenize</a> card details before submitting an order.

### Stripe

Render Stripe elements to capture credit card information. You can choose between a unified [card element](https://stripe.com/docs/js/elements_object/create_element?type=card 'card element') or separate elements ([cardNumber](https://stripe.com/docs/js/elements_object/create_element?type=cardNumber 'cardNumber'), [cardExpiry](https://stripe.com/docs/js/elements_object/create_element?type=cardExpiry 'cardExpiry'), [cardCvc](https://stripe.com/docs/js/elements_object/create_element?type=cardCvc 'cardCvc')).

#### Render a Stripe card element

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

swell.payment.createElements({
  card: {
    elementId: '#card-element-id', // default: #card-element
    options: {
      // options are passed as a direct argument to stripe.js
      style: {
        base: {
          fontWeight: 500,
          fontSize: '16px'
        }
      }
    },
    onChange: event => {
      // optional, called when the Element value changes
    },
    onReady: event => {
      // optional, called when the Element is fully rendered
    },
    onFocus: event => {
      // optional, called when the Element gains focus
    },
    onBlur: event => {
      // optional, called when the Element loses focus
    },
    onEscape: event => {
      // optional, called when the escape key is pressed within an Element
    },
    onClick: event => {
      // optional, called when the Element is clicked
    },
    onSuccess: result => {
      // optional, called on card payment success
    },
    onError: error => {
      // optional, called on card payment error
    }
  }
})
```

#### Render other Stripe elements

- Separate card elements

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

swell.payment.createElements({
  card: {
    separateElements: true, // required for separate elements
    cardNumber: {
      elementId: '#card-number-id', // default: #cardNumber-element
      options: {
        // options are passed as a direct argument to stripe.js
        style: {
          base: {
            fontWeight: 500,
            fontSize: '16px'
          }
        }
      }
    },
    cardExpiry: {
      elementId: '#card-expiry-id' // default: #cardExpiry-element
    },
    cardCvc: {
      elementId: '#card-expiry-id' // default: #cardCvc-element
    }
    // events: onChange, onReady, onSuccess, onError, etc...
  }
})
```

- iDeal

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

swell.payment.createElements({
  ideal: {
    elementId: '#ideal-element-id', // default: #idealBank-element
    options: {
      style: {
        base: {
          fontWeight: 500,
          fontSize: '16px'
        }
      }
    }
    // events: onChange, onReady, onSuccess, onError, etc...
  }
})
```

Note: see Stripe documentation for [options](https://stripe.com/docs/js/elements_object/create_element?type=card#elements_create-options 'options') and [customization](https://stripe.com/docs/js/appendix/style?type=card 'customization').

### PayPal button

Render a PayPal checkout button.

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

swell.payment.createElements({
  paypal: {
    elementId: '#element-id', // default: #paypal-button
    style: {
      layout: 'horizontal', // optional
      color: 'blue',
      shape: 'rect',
      label: 'buynow',
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
})
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
  // ideal: { ... }
});

const form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  showLoading();

  await swell.payment.tokenize({
    card: {
      onError: (err) => {
        // inform the customer there was an error
      },
      onSuccess: () => {
        //finally submit the form
        form.submit();
      }
    }
    // ideal: { onError: (err) => {}, ...}
  });

  hideLoading();
});
```

Note: Some payment methods such as `ideal`, automatically redirect the user to the payment page to authorize the payment.

## Payment initiation

Payment methods such as `Klarna`, `Bancontact` or gateways `Quickpay`, `Paysafecard` do not require special forms to enter payment information. Instead, you need to redirect the customer to a third-party page to initiate a payment. `swell.payment.tokenize()` will automatically redirect the customer to the gateway page for entering payment details.

Note: See [Handling redirect actions](#handling-redirect-actions) section for handling customer redirects to your site.

### Stripe

- Klarna

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

await swell.payment.tokenize({
  klarna: {
    onError: err => {
      // inform the customer there was an error
    }
  }
})
```

- Bancontact

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

await swell.payment.tokenize({
  bancontact: {
    onError: err => {
      // inform the customer there was an error
    }
  }
})
```

### Quickpay

- Card

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

swell.payment.tokenize({
  card: {
    onError: error => {
      // inform the customer there was an error
    }
  }
})
```

### Paysafecrd

- Card

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

swell.payment.tokenize({
  card: {
    onError: error => {
      // inform the customer there was an error
    }
  }
})
```

## Handling redirect actions

After the customer redirects back to your site after authorizing the payment or entering the payment information, it is necessary to configure the cart billing and then submit the order.

### Stripe

- iDeal

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

if (redirectParams.status !== 'succeeded') {
  // inform the customer there was an error
  return
}

await swell.cart.update({
  billing: {
    intent: {
      stripe: { id: '<intent_id>' }
    },
    ideal: {
      token: '<payment_method_id>'
    }
  }
})

await swell.cart.submitOrder()
```

- Klarna

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

if (redirectParams.status !== 'succeeded') {
  // inform the customer there was an error
  return
}

const params = await swell.cart.update({
  billing: {
    klarna: {
      source: '<source_id>'
    }
  }
})

await swell.cart.submitOrder()
```

- Bancontact

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

if (redirectParams.status !== 'succeeded') {
  // inform the customer there was an error
  return
}

const params = await swell.cart.update({
  billing: {
    bancontact: {
      source: '<source_id>'
    }
  }
})

await swell.cart.submitOrder()
```

### Saferpay

- Card

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

if (redirectParams.status !== 'succeeded') {
  // inform the customer there was an error
  return
}

const intent = await swell.payment.updateIntent({
  gateway: 'saferpay',
  intent: { token: '<saferpay_transaction_token>' }
})

if (intent.error) {
  // inform the customer there was an error
  return
}

const {
  RegistrationResult: {
    Alias: { Id: token }
  },
  PaymentMeans: {
    Card: { ExpMonth: exp_month, ExpYear: exp_year, MaskedNumber },
    Brand: { Name: brand }
  }
} = intent

const params = await swell.cart.update({
  billing: {
    card: {
      token,
      exp_month,
      exp_year,
      brand,
      last4: MaskedNumber.substring(MaskedNumber.length - 4),
      gateway: 'saferpay'
    }
  }
})

await swell.cart.submitOrder()
```

### Quickpay

- Card

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

await swell.payment.handleRedirect({
  card: {
    onSuccess: result => {
      // optional, called on successful redirect
    },
    onError: error => {
      // optional, called on redirect error
    }
  }
})

await swell.cart.submitOrder()
```

### Paysafecard

- Card

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

await swell.payment.handleRedirect({
  card: {
    onSuccess: result => {
      // optional, called on successful redirect
    },
    onError: error => {
      // optional, called on redirect error
    }
  }
})

await swell.cart.submitOrder()
```

## Direct credit card tokenization

If a <a href="payment#payment-elements">payment element</a> isn't available for your credit card processor, you can tokenize credit card information directly.

### Create a card token

Returns an object representing the card token. Pass the token ID to a cart's `billing.card.token` field to designate this card as the payment method.

```javascript
const response = await swell.card.createToken({
  number: '4242 4242 4242 4242',
  exp_month: 1,
  exp_year: 2099,
  cvc: 321,
  // Note: some payment gateways may require a Swell `account_id` and `billing` for card verification (Braintree)
  account_id: '5c15505200c7d14d851e510f',
  billing: {
    address1: '1 Main Dr.',
    zip: 90210
    // Other standard billing fields optional
  }
})
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
swell.card.validateNumber('4242 4242 4242 4242') // => true
swell.card.validateNumber('1111') // => false
```

#### Card expiry

Returns `true` if the card expiration date is valid, otherwise `false`.

```javascript
swell.card.validateExpry('1/29') // => true
swell.card.validateExpry('1/2099') // => true
swell.card.validateExpry('9/99') // => false
```

#### CVC code

Returns `true` if the card CVC code is valid, otherwise `false`.

```javascript
swell.card.validateCVC('321') // => true
swell.card.validateCVC('1') // => false
```

### Add to cart

After generating a card token, update the cart billing details and it will be handled according to payment settings when the [order is submitted](/cart/#submit-an-order).

Note: when using a [payment element](/payment/#payment-elements) instead of direct tokenization, the cart will be automatically updated.

```javascript
const response = await swell.card.createToken({
  number: '4242 4242 4242 4242',
  exp_month: 1,
  exp_year: 2099,
  cvc: 321,
  // Note: some payment gateways may require a Swell `account_id` and `billing` for card verification (Braintree)
  account_id: '5c15505200c7d14d851e510f',
  billing: {
    address1: '1 Main Dr.',
    zip: 90210
    // Other standard billing fields optional
  }
})

await swell.cart.update({
  billing: {
    card: response
  }
})
```

### Quickpay

To create a QuickPay card, you need to redirect the customer to a third-party page for entering card data:

```js
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

const returnUrl = window.location.origin + window.location.pathname
const result = await swell.payment.authorizeGateway({
  gateway: 'quickpay',
  params: {
    action: 'create',
    continueurl: `${returnUrl}?gateway=quickpay&redirect_status=succeeded`,
    cancelurl: `${returnUrl}?gateway=quickpay&redirect_status=canceled`
  }
})

if (result && result.url) {
  window.location.replace(result.url)
}
```

After the customer is redirected back to your site, you need to get the card details and save it:

```js
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

const { redirect_status, card_id } = queryParams
if (redirect_status !== 'succeeded') {
  // handle cancellation
  return
}

const card = await swell.payment.authorizeGateway({
  gateway: 'quickpay',
  params: {
    action: 'get',
    id: card_id
  }
})

if (card.error) {
  // handle error
  return
}

await swell.cart.update({
  billing: {
    card
  }
})

// or save the card to the customer

await swell.account.createCard({
  ...card
})
```

## Manual payment integrations

If you need more flexibility in the integration process, you can use the following guides to achieve this.

### Stripe + Klarna, iDEAL & Bancontact integration

This guide describes how to integrate Klarna, iDEAL and Bancontact using Stripe sources with a custom checkout flow.

Start by connecting a Stripe account to Swell (Settings > Payments); open "Advanced options" under Stripe settings and check `Enable Klarna` / `Enable iDEAL` / `Enable Bancontact`.

#### Using Stripe.js

​
[Include Stripe.js](https://stripe.com/docs/js/including) on the payment page of your site. This can be done in two ways:

- Load directly from `https://js.stripe.com`.

```html
<script src="https://js.stripe.com/v3/"></script>
```

- Stripe provides an [npm package](https://github.com/stripe/stripe-js) to load and use Stripe.js as a module.

#### Initializing Stripe.js

​
Once loaded, [initialize](https://stripe.com/docs/js/initializing) it with publishable key.

If loaded from a script:

```js
// Client side
const stripe = Stripe('pk_test_...')
```

​
If loaded from a JS module:

```js
// Client side
import { loadStripe } from '@stripe/stripe-js'
const stripe = await loadStripe('pk_test_...')
```

#### Install Stripe server-side library

​
This library will be used to access the [Stripe API](https://stripe.com/docs/api) and create payment intents. To install the [npm package](https://www.npmjs.com/package/stripe):

```
npm i --save stripe
```

​
Initialize Stripe with a secret key:

```js
// Server side
const stripe = require('stripe')('sk_test_...')
```

#### iDEAL integration

#### Create iDEAL element

Using Stripe elements:

```js
// Client side
const stripe = Stripe('pk_test_...');
​
const elements = stripe.elements();
const ideal = elements.create('idealBank', options); // 'options' is an optional object
ideal.mount('#stripe-ideal');
```

There are several [options](https://stripe.com/docs/js/elements_object/create_element?type=idealBank) for customization.

Important: in the above example, the element will be mounted in an HTML tag with the ID `stripe-ideal`. Make sure it exists on the page.

#### Create a payment method

​
Once a customer enters all required information, it's necessary to [create a payment method](https://stripe.com/docs/js/payment_methods/create_payment_method):

```js
// Client side
const stripe = Stripe('pk_test_...');
​
await stripe.createPaymentMethod({
  type: 'ideal',
  ideal: idealElement,
  billing_details: {
    name: 'Jenny Rosen',
  },
});
```

​
This call returns one of:

- `result.paymentMethod`: a [PaymentMethod](https://stripe.com/docs/api/payment_methods) that was created successfully.
- `result.error`: a server or client-side validation error. Refer to the [Stripe API reference](https://stripe.com/docs/api#errors) for all possible errors.

#### Create a payment intent

​
To create payment intent you must pass the payment method created earlier, along with `amount` and `return_url` to which the customer will be redirected after authorizing the payment:

```js
// Server side
const stripe = require('stripe')('sk_test_...');
​
await stripe.paymentIntents.create({
  payment_method: '<payment_method_id>',
  amount: '<amount in cents>',
  currency: 'eur',
  payment_method_types: 'ideal',
  confirmation_method: 'manual',
  confirm: true,
  return_url: '<return_url>',
});
```

This call returns one of:

- `result.paymentIntent`: a [PaymentIntent](https://stripe.com/docs/api/payment_intents/object) that was created successfully.
- `result.error`: a server or client-side validation error. Refer to the [Stripe API reference](https://stripe.com/docs/api#errors) for all possible errors.

#### Payment authorization

​
If a payment intent was created successfully, authorize the payment:

```js
// Client side
const stripe = Stripe('pk_test_...');
​
await stripe.handleCardAction(paymentIntent.client_secret);
```

​
This method will redirect the customer to authorize payment. After authorization, the customer will be redirected back to your site at the address specified when creating the payment intent (`return_url`).

#### Capture payment and create an order

​
When redirecting to your site, the URL query will contain parameters with information about the payment:
​

| Parameter name               | Description                                                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| redirect_status              | Payment authorization status (`succeeded` or `failed`)                                                                                          |
| payment_intent               | Unique identifier for the `PaymentIntent`                                                                                                       |
| payment_intent_client_secret | A [client secret](https://stripe.com/docs/api/payment_intents/object#payment_intent_object-client_secret) related to the `PaymentIntent` object |

Finally, add the relevant payment details to a Swell cart or order:

```js
const billing = {
  method: 'ideal',
  ideal: {
    token: '<payment_method_id>'
  },
  intent: {
    stripe: {
      id: '<payment_intent_id>'
    }
  }
}

// Using Swell JS library
await swell.cart.update({ billing })

// Using Swell Node.js library
await swell.put('/carts/<id>', { billing })
```

#### Klarna integration

​
To make a Klarna payment, create a [source object](https://stripe.com/docs/api/sources). Klarna does not require using Stripe elements.

```js
// Client side
const stripe = Stripe('pk_test_...');
​
await stripe.createSource({
  type: 'klarna',
  flow: 'redirect',
  amount: '<amount>',
  currency: '<iso currency code>',
  klarna: {
    product: 'payment',
    purchase_country: '<2-digit country code>',
  },
  source_order: {
    items: '<items>',
  },
  redirect: {
    return_url: '<return_url>',
  },
 });
```

​
See [Stripe docs](https://stripe.com/docs/sources/klarna#create-source) for more details on creating a source object.

#### Payment authorization

​
If the source was created successfully, redirect the customer to the URL address returned in the source object (`source.redirect.url`). After authorization, the customer will be redirected back to your site at the address specified when creating the source (`return_url`).

#### Capture payment

​
When redirecting to your site, the URL query will contain parameters with information about the payment:
​

| Parameter name  | Description                                                |
| --------------- | ---------------------------------------------------------- |
| redirect_status | Authorization status (`succeeded`, `canceled` or `failed`) |
| source          | Unique identifier for the `Source`                         |

Finally, add the relevant payment details to a Swell cart or order:

```js
const billing = {
  method: 'klarna',
  klarna: {
    source: '<source_id>'
  }
}

// Using Swell JS library
await swell.cart.update({ billing })

// Using Swell Node.js library
await swell.put('/carts/<id>', { billing })
```

#### Bancontact integration

​
To make a Bancontact payment, create a [source object](https://stripe.com/docs/api/sources). Bancontact does not require using Stripe elements.

```js
// Client side
const stripe = Stripe('pk_test_...');
​
await stripe.createSource({
  type: 'bancontact',
  amount: '<amount>',
  currency: 'eur', // Bancontact must always use Euros
  owner: {
    name: '<name>',
  },
  redirect: {
    return_url: '<return_url>',
  },
 });
```

​
See [Stripe docs](https://stripe.com/docs/sources/bancontact#create-source) for more details on creating a source object.

#### Payment authorization

​
If the source was created successfully, redirect the customer to the URL address returned in the source object (`source.redirect.url`). After authorization, the customer will be redirected back to your site at the address specified when creating the source (`return_url`).

#### Capture payment

​
When redirecting to your site, the URL query will contain parameters with information about the payment:
​

| Parameter name  | Description                                    |
| --------------- | ---------------------------------------------- |
| redirect_status | Authorization status (`succeeded` or `failed`) |
| source          | Unique identifier for the `Source`             |

Finally, add the relevant payment details to a Swell cart or order:

```js
const billing = {
  method: 'bancontact',
  bancontact: {
    source: '<source_id>'
  }
}

// Using Swell JS library
await swell.cart.update({ billing })

// Using Swell Node.js library
await swell.put('/carts/<id>', { billing })
```

### Saferpay integration

Start by configuring a Saferpay account to Swell (Settings > Payments).

#### PaymentPage Initialize

To create a transaction, it is necessary to initialize the Saferpay payment page. This can be done in the following ways:

- Tokenization method

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

await swell.payment.tokenize({
  card: {
    intent: {
      // optional
      Payment: {
        Amount: {
          Value: '<amount>',
          CurrencyCode: '<currency>'
        },
        Description: '<description>'
      },
      PaymentMethods: ['<payment methods list>'],
      ReturnUrls: {
        Success: '<success_return_url>',
        Fail: '<fail_return_url>',
        Abort: '<abort_return_url>'
      }
    },
    onError: err => {
      // inform the customer there was an error
    }
  }
})
```

As a result of calling `tokenize()`, the Saferpay payment page will be initialized, the transaction token will be set in the cart billing (`billing.intent.saferpay`), and then the user will be automatically redirected to enter payment data.

- Intent creation method

```javascript
import swell from 'swell-js'

swell.init('my-store', 'pk_...')

await swell.payment
  .createIntent({
    gateway: 'saferpay',
    intent: {
      Payment: {
        Amount: {
          Value: '<amount>',
          CurrencyCode: '<currency>'
        },
        Description: '<description>'
      },
      PaymentMethods: ['<payment methods list>'],
      ReturnUrls: {
        Success: '<success_return_url>',
        Fail: '<fail_return_url>',
        Abort: '<abort_return_url>'
      }
    }
  })
  .then(intent => {
    // save 'intent.token' for further processing of the transaction
    // redirect the user to 'intent.return_url' to enter payment information
  })
  .catch(err => {
    // inform the customer there was an error
  })
```

See [Saferpay PaymentPage Initialize docs](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize) for more details on configuring a payment page.

- Manual Saferpay payment page initialization

You can independently initialize the Saferpay payment page using [Saferpay API](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize), and then redirect the user to this page to enter payment information.

#### Payment processing

After entering payment information on the payment page, the customer will be redirected back to your site at the address specified when initializing the payment page. See [Handling redirect actions](#handling-redirect-actions) section for payment processing.

<br />
