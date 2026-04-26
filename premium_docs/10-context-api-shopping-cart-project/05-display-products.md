# Display Products

We have a mock server running on port 5000. Let's go back to our application and fetch those products. Ultimately, I want to use the context api and store the products in the context. But first, we'll set it up how we have been, which is storing global state in the app component.

## React Icons

We are going to use the [React Icons](https://react-icons.github.io/react-icons/) library to add some icons to our application. This library provides a collection of popular icons from various icon libraries, making it easy to use them in your React projects.

Install the React Icons library by running the following command in your terminal:

```bash
npm install react-icons
```

Open the `App.jsx` file and replace the existing code with the following:

```jsx
import { useEffect, useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products');
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

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-3xl font-bold mb-6'>🛒 Product Catalog</h1>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>❌ {error}</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {products.map((product) => (
          <div
            key={product.id}
            className='bg-white rounded-lg shadow p-4 flex flex-col'
          >
            <img
              src={product.image}
              alt={product.name}
              className='h-40 object-cover rounded mb-4'
            />
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <p className='text-gray-500 text-sm mb-2'>{product.description}</p>
            <p className='font-bold text-lg'>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

If your data and images are in the right place, you should see the products displayed on the screen. The layout is responsive and will adjust based on the screen size.

## Products & Product Card Component

Let's further break down the code by creating a "ProductList" and "ProductCard" component. This will help us keep our code organized and it will give you a good example of how we can use the context API and bring the state into the list without passing it from the app component.

Create a file at `src/components/ProductList.jsx` and add the following code:

```jsx
const ProductList = ({ products }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {products.map((product) => (
        <div
          key={product.id}
          className='bg-white rounded-lg shadow p-4 flex flex-col'
        >
          <img
            src={product.image}
            alt={product.name}
            className='h-40 object-cover rounded mb-4'
          />
          <h2 className='text-xl font-semibold'>{product.name}</h2>
          <p className='text-gray-500 text-sm mb-2'>{product.description}</p>
          <p className='font-bold text-lg'>${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
```

Now in the `App.jsx` file, import the `ProductList` component and use it to display the products:

```jsx
import ProductList from './components/ProductList';
```

```jsx
<ProductList products={products} />
```

We are passing the products as props to the `ProductList` component. This is fine for this project as is, but imagine the ProductList component is nested 5 levels deep. You would have to pass the products down through all those components. This is where the context API comes in handy.

Let's do one more thing here and create the `ProductCard` component. This will be a reusable component that we can use in the `ProductList` component.

Create a file at `src/components/ProductCard.jsx` and add the following code:

```jsx
const ProductCard = ({ product }) => {
  return (
    <div
      key={product.id}
      className='bg-white rounded-lg shadow p-4 flex flex-col'
    >
      <img
        src={product.image}
        alt={product.name}
        className='h-40 object-cover rounded mb-4'
      />
      <h2 className='text-xl font-semibold'>{product.name}</h2>
      <p className='text-gray-500 text-sm mb-2 h-10'>{product.description}</p>
      <p className='font-bold text-lg'>${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
```

Now bring it into the `ProductList` component and use it to display the products:

```jsx
import ProductCard from './ProductCard';
```

```jsx
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
```

In the next lesson, I will show you how to setup a proxy in the Vite config file so you don't have to type the full URL to the API. This will make it easier to switch between development and production environments.
