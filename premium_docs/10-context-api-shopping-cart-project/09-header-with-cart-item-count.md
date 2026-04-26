# Header With Cart Item count

Let's create a header component with the number of items in the cart.
Create a new file at `src/components/Header.tsx` and add the following code:

```tsx
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className='bg-white shadow-md p-4 flex justify-between items-center'>
      <h1 className='text-2xl font-bold text-blue-600'>ShopMate</h1>

      <div className='relative'>
        <FaShoppingCart className='text-2xl text-gray-700' />
        {itemCount > 0 && (
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
            {itemCount}
          </span>
        )}
      </div>
    </header>
  );
}
```

We are getting the cart items from the context and calculating the total quantity of items in the cart. We are using the `reduce` method to sum up the quantities of all items in the cart. If there are items in the cart, we display a badge with the item count.

Now add the header component to the `App.jsx` file:

```tsx
import Header from './components/Header';
import ProductList from './components/ProductList';

export default function App() {
  return (
    <>
      <Header />
      <div className='min-h-screen bg-gray-100 p-6'>
        <h1 className='text-3xl font-bold mb-6'>🛒 Product Catalog</h1>
        <ProductList />
      </div>
    </>
  );
}
```

Now add an item to the cart and you should see the item count in the header.

So you see, we have a globalstate for the cart items and we can access it from any component in our application. We are adding cart items from one component and showing them in another. This is a powerful feature of React and the context API.

Next, I want to have a dropdown with the cart items.
