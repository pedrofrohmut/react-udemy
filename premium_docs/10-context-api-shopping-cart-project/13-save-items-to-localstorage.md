# Save Items To Local Storage

I want to save the cart items to local storage so that they persist even after a page refresh. To do this, I will use the `useEffect` hook to save the cart items to local storage whenever the cart changes.

Open the `CartContext.tsx` file and import the `useEffect` hook:

```tsx
import { createContext, useContext, useState, useEffect } from 'react';
```

For the initial `cart` state, we will change it from an empty array to the value of the `cart` key in local storage. If there is no value, we will set it to an empty array.

Remember, the initial state that you pass in can be a single value OR a function. If you pass in a function, it will only be called once when the component mounts. This is useful for performance reasons, as it avoids unnecessary re-renders.

We will use the `JSON.parse` method to parse the string value from local storage into an array.

```tsx
const [cart, setCart] = useState(() => {
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
});
```

Now we just need to add a `useEffect` hook to save the cart items to local storage whenever the cart changes. This will ensure that the cart items are always up to date in local storage.

```tsx
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);
```

Now add some items and reload the page. They should persist.
