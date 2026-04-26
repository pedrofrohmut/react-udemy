# Products Context

Now we are going to create a conext for the products to live in. This will allow us to manage the product data and make it available to all components in our application.

Create a new folder called `context` in the `src` directory. Inside the `context` folder, create a new file called `ProductContext.jsx`. This file will contain our context and provider for the products.

Add the following imports:

```javascript
import { createContext, useContext, useEffect, useState } from 'react';
```

We see two new imports here: `createContext` and `useContext`. These are both part of the React library and are used to create and consume context in our application.

- `createContext` is used to create a new context object. This object will hold the data we want to share across our application.
- `useContext` is a hook that allows us to consume the context we created with `createContext`. This hook will give us access to the context data in any component that is a child of the context provider. The reason we use it here in the context file is to create a custom hook that will make it easier to consume the context in our components.

Next, we are going to create the context and provider. Add the following code to the `ProductContext.jsx` file:

```javascript
const ProductContext = createContext();
```

This will create a new context object called `ProductContext`. We will use this context to share the product data across our application.

## Provider

Contexts are used to share data across components. The provider is a component that wraps around the components that need access to the context data. It provides the context data to all of its children. We need to create and export a provider component that will wrap around our application.

```javascript
export function ProductProvider({ children }) {}
```

Here, we can set any state we need for the context.

Add the following code to the `ProductProvider` component:

```javascript
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

Notice, it is the same thing we have in our app component at the moment. We are basically storing the same data in the context as we are in the app component. We will delete the state in the app component later on.

## Fetching the Data

We will also do the fetch from here as well. Under the state values, add the following:

```js
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
```

Again, we are moving this to the context rather than the app component. This is a good practice because it keeps our components clean and focused on their specific tasks. The context will handle the data fetching and provide the data to the components that need it.

## Returning the Context

We need to return the context values from the provider. Add the following code to the `ProductProvider` component under the `useEffect`:

```javascript
return (
  <ProductContext.Provider value={{ products, loading, error }}>
    {children}
  </ProductContext.Provider>
);
```

This will provide the `products`, `loading`, and `error` state to all of the children of the `ProductProvider`. The `children` prop is a special prop that contains all of the components that are wrapped in the provider. This allows us to pass the context data down to any component that needs it.

## Custom Hook

Lastly, we will create and export a custom hook that will allow us to consume the context in our components. Add the following code to the very bottom of the `ProductContext.js` file after the `ProductProvider` component:

```javascript
export function useProducts() {
  return useContext(ProductContext);
}
```

Again, `useContext` is a hook that allows us to consume the context we created with `createContext`. This hook will give us access to the context data in any component that is a child of the context provider. The reason we use it here in the context file is to create a custom hook that will make it easier to consume the context in our components.

## Using the Provider

Now we need to wrap our application in the `ProductProvider` so that all of the components in our application have access to the context data.

Open the `main.jsx` file and import the `ProductProvider` at the top:

```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ProductProvider } from './context/ProductContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </StrictMode>
);
```

## Clean Up The App Component

Now we can clean up the app component. Open the `App.jsx` file and remove the state and the fetch function. The `App.jsx` file should look like this:

```javascript
import ProductList from './components/product-list';

export default function App() {
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-3xl font-bold mb-6'>🛒 Product Catalog</h1>
      <ProductList />
    </div>
  );
}
```

Notice I removed the `products` prop from the `ProductList` component. We don't need that because we will get the products from the context.

Remove it from the `ProductList` component as well. Open the `ProductList.jsx` file and remove the `products` prop from the function signature:

```javascript
const ProductList = () => {};
```

Your app will break at the moment because the `ProductList` component does not know what `products` is.

## Using The Product Context

Now in the `ProductList` component, we can use the `useProducts` hook to get the products from the context. Add the following import at the top of the `ProductList.jsx` file:

```javascript
import { useProducts } from '../context/ProductContext';
```

Then, inside the `ProductList` component, call the `useProducts` hook to get the products:

```javascript
const { products, loading, error } = useProducts();
```

Also, right under that, add the loading and error states:

```javascript
{
  loading && <p>Loading...</p>;
}
{
  error && <p className='text-red-500'>❌ {error}</p>;
}
```

Now your app should work again and the main App component is nice and clean and all of the product data is in the context. This is a good practice because it keeps our components clean and focused on their specific tasks. The context will handle the data fetching and provide the data to the components that need it. We could easily do this same thing if the component was 5 levels deep or on a different route if we were using routing.
