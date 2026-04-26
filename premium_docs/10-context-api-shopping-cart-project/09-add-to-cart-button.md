# Add To Cart Button

We are now going to create a button to add the item to the cart context.

## Add To Cart Function

Let's add the function to add the product to the cart.

```tsx
const addToCart = (product) => {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      return prev.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    }
    return [...prev, { ...product, qty: 1 }];
  });
};
```

Let's go over this code.

- We are using the `setCart` function to update the cart state.
- We are using the `prev` parameter to get the previous state of the cart.
- We are checking if the product already exists in the cart. If it does, we are updating the quantity of the existing item. If it doesn't, we are adding a new item to the cart with a quantity of 1.
- We are using the `map` function to create a new array with the updated item. If the item is not the one we are updating, we are returning it as is.
- We are using the spread operator to create a new object with the updated quantity.
- We are returning a new array with the updated item or the new item.

We will add a remove from cart function later

## Pass the Functions to the Context

In order to use these functions in our components, we need to pass them to the context. Update the `CartContext.tsx` return statement as follows:

```tsx
return (
  <CartContext.Provider value={{ cart, addToCart }}>
    {children}
  </CartContext.Provider>
);
```

Open the `src/components/ProductCard.tsx` file and import the `useCart` hook at the top of the file:

```tsx
import { useCart } from '../context/CartContext';
```

Then we need to get the `addToCart` function from the `useCart` hook. We will use this function to add the item to the cart when the button is clicked.

Add this right above the return statement in the `ProductCard` component:

```tsx
const { addToCart } = useCart();
```

Then we just need to add the button to the JSX. Add the following code below the price paragraph:

```tsx
<button
  onClick={() => addToCart(product)}
  className='bg-blue-600 text-white mt-3 px-4 py-2 rounded hover:bg-blue-700 transition'
>
  Add to Cart
</button>
```

When you click the button, you will not see any UI changes, but the item will be added to the cart context. You can check by using the Devtools. Click on the "components" tab and then on the "CartProvider" component. You should see the cart with the item you just added. if you click again, it will increase the quantity of the item in the cart.

In the next lesson, we will show this in the UI.
