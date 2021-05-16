---
title: Basic usage
description: ''
position: 3
category: Examples
---

Code examples use the `await` prefix when the method returns a promise. All other methods are synchronous. We're using ES6 async/await syntax here, but you can use regular Promises too.

```javascript
import swell from 'swell-js'

// Initialize the client first
swell.init('my-store', 'pk_md0JkpLnp9gBjkQ085oiebb0XBuwqZX9')

// Now you can use any method
await swell.products.list({
  categories: 't-shirts',
  limit: 25,
  page: 1
})
```

<br />
