# Cart Context

Now we are going to create a context for the cart items. We need an add do cart button for each item as well. Cart items will be stored in the context but also within local storage so that we can persist the cart items even if the user refreshes the page. We will do the local storage stuff a little later.

Let's start by creating a new file called `CartContext.tsx` in the `src/context` folder. Let's create the context and provider for the cart items.

```tsx
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
}
```

We have a context with a cart state.

## Export Custom Hook

Like with products, we need to export a custom hook that will allow us to consume the context in our components. Add the following code to the `CartContext.tsx` file:

```tsx
export function useCart() {
  return useContext(CartContext);
}
```



We are passing the cart itself and the two functions to the context. This will allow us to use them in our components.

## Add Cart Provider to App

Remember, in order to use the context, we need to wrap our app with the provider. Open the `src/main.tsx` file and import the `CartProvider` at the top of the file:

```tsx
import { CartProvider } from './context/CartContext';
```

Then wrap the `App` component with the `CartProvider`:

```tsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </StrictMode>
);
```


