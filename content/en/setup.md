---
title: Setup
description: ""
position: 2
category: Getting started
---

The library can be used in any bundled JavaScript application, in server or client contexts.

## Installation

Add `swell-js` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add swell-js
```

  </code-block>
  <code-block label="NPM">

```bash
npm install swell-js
```

  </code-block>
</code-group>

## Initialization

The client uses your store ID and public key for authorization. You can find these in your dashboard under _Settings > API_.

```javascript
swell.init("<store-id>", "<public_key>");
```

> **Note**: `swell.auth()` was renamed to `swell.init()` in v1.3.0.

## Options

If your application uses camelCase, you can set a flag to transform the API's snake_case responses. This works on objects you pass to it as well.

### useCamelCase

```javascript
const options = {
  useCamelCase: // true | false (default is false)
};

swell.init('<store-id>', '<public_key>', options)
```
