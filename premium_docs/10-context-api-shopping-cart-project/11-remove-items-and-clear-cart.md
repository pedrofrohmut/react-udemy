# Remove From Cart

Now let's add the remove from cart functionality. This will allow us to remove items from the cart when we click on the remove button in the dropdown.

## Context Function

Start with the context function. Add the following code to the `CartContext.tsx` file:

```tsx
const removeFromCart = (id) => {
  setCart((prev) => prev.filter((item) => item.id !== id));
};
```

We are using the `filter` function to create a new array with the items that are not the one we are removing. This will remove the item from the cart.

Be sure to add it to the context provider as well:

```tsx
return (
  <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
    {children}
  </CartContext.Provider>
);
```

## Header Component

Bring in the `removeFromCart` function from the context:

```tsx
const { cart, removeFromCart } = useCart();
```

## Remove Button

Now open the `Header.jsx` file and add the remove button to the dropdown. Add it right below the `div` that wraps the name and price:

```tsx
<button
  onClick={() => removeFromCart(item.id)}
  className='text-sm text-red-500 hover:underline'
>
  Remove
</button>
```

Now when you click the remove button, the item will be removed from the cart. You can also see the total price updating in real-time as you add and remove items from the cart.

## Clear Cart Items


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
