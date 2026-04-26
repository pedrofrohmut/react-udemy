# More on `useState`

I wanted to just take a few minutes to look a bit further into the `useState` hook. You don't have to set this project up. I just want to show you a few things. It will be in the premium docs if you want the code.

We've already seen how to use the `useState` hook like this:

```jsx
import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return <>{count}</>;
};

export default App;
```

We are setting up a piece of state called `count` and a function to update that state called `setCount`. We are also setting the initial value of `count` to `0`.

## Using a Function For the Initial State

Another thing you can do aside from passing in an initial value is to pass in a function that returns the initial value. This is useful when the initial state is expensive to compute.

```jsx
const [count, setCount] = useState(() => {
  console.log('Initializing count...');
  return 4;
});
```

This will set an intitial value of `4` for `count` and it will also log `Setting count` to the console.

You can outout `{count}` in the JSX to see the value.

## Passing a Function To The Setter

You can also pass a function to the setter.

For example, we can do this:

```jsx
const [count, setCount] = useState(0);

const increment = () => {
  setCount(count + 1);
};
```

## Updating State Based on Previous State

Doing what we did here where what we are setting the count to is based on the current count is not a good idea. This is because React batches state updates. If you do this, you might not get the expected result when you update the state multiple times in a row.

To avoid this, you can pass a function to the setter that takes the previous state as an argument. This way, you can be sure that you are always updating the state based on the latest state.

Let's say you have a counter and you want to increment it by `1` every time a button is clicked. You can do this:

```jsx
const [count, setCount] = useState(0);

const increment = () => {
  setCount((prevCount) => prevCount + 1);
};
```

This will increment the count by `1` every time the button is clicked based on the previous state.

Here is the final code for this example:

```jsx
import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(() => {
    console.log('Initializing count...');
    return 4;
  });

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <button
        onClick={increment}
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Increment
      </button>
      {count}
    </>
  );
};

export default App;
```
