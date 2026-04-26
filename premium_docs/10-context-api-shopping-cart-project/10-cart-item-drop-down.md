# Cart Item Dropdown

Now let's show a dropdown when we hover over the number of items in the header. This dropdown will show the items in the cart and allow us to remove them from the cart.

Open the `Header.jsx` file and import the `useState` hook:

```tsx
import { useState } from 'react';
```

Then, add a new state variable called `showDropdown` to manage the visibility of the dropdown:

```tsx
const [showDropdown, setShowDropdown] = useState(false);
```

In addition to the item count, we need the total because we will show the total in the dropdown. So let's add that to the `useCart` hook:

```tsx
const total = cart
  .reduce((acc, item) => acc + item.price * item.qty, 0)
  .toFixed(2);
```

We are simply using the `reduce` method to calculate the total price of all items in the cart. We are also using `toFixed(2)` to format the total to two decimal places.

Add the following in the return statement of the `Header` component:

```tsx
return (
  <header className='bg-white shadow-md p-4 flex justify-between items-center relative'>
    <h1 className='text-2xl font-bold text-blue-600'>ShopMate</h1>

    <div className='relative'>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        <FaShoppingCart className='text-2xl text-gray-700' />
        {itemCount > 0 && (
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
            {itemCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className='absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50'>
          <div className='p-4'>
            <h2 className='font-semibold text-lg mb-2'>Cart Items</h2>
            {cart.length === 0 ? (
              <p className='text-gray-500 text-sm'>Your cart is empty.</p>
            ) : (
              <>
                <ul className='max-h-60 overflow-y-auto divide-y divide-gray-200'>
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className='flex justify-between items-center py-2'
                    >
                      <div>
                        <p className='font-medium'>{item.name}</p>
                        <p className='text-sm text-gray-500'>
                          {item.qty} × ${item.price}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className='mt-4 flex justify-between font-semibold'>
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  </header>
);
```

Here is what we added:

- `relative` class to the header to position the dropdown relative to the header.
- Added a conditional rendering for the dropdown based on the `showDropdown` state.
- Map throught the items and show them along with the quantity and price.
- Added a button to toggle the dropdown visibility.
- Added a total price at the bottom of the dropdown.
- Added a message when the cart is empty.

In the next lesson, we will add the remove from cart functionality.
