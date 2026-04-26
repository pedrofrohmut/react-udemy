# Clear Items

Now that we have the cart items displayed in the dropdown, let's add a button to clear all items from the cart.

## Context Function

Let's start by adding a function to clear the cart in the `CartContext.tsx` file. Add the following code to the `CartProvider` component:

```tsx
const clearCart = () => {
  setCart([]);
};
```

Be sure to add it to the provider value as well:

```tsx
return (
  <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
    {children}
  </CartContext.Provider>
);
```

## Header Component

Now in the `Header.jsx` file, destructure the `clearCart` function from the `useCart` hook:

```tsx
const { cart, removeFromCart, clearCart } = useCart();
```

Then, add a button to right above the ending `</>`:

```tsx
<button
  onClick={clearCart}
  className='mt-3 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 transition'
>
  Clear Cart
</button>
```

That's it! We now have a working shopping cart that uses the Context API.

The last thing I want to do is save the items to local storage. We will do that next.
