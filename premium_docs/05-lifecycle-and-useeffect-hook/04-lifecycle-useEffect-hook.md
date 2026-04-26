# Lifecycle With useEffect Hook

In the last lesson, we looked at lifecycle methods in class components. In this lesson, we'll look at how to use the `useEffect` hook to tap into the component lifecycle with functional components.

I want to create the same exact logger that we did in the last lesson, only this time, we'll use functional components with the `useEffect` hook.

I do want to keep the class component version in the project so that you can see the difference between the two. I'm going to rename the class component to `LifecycleLoggerClass` and create a new functional component called `LifecycleLogger`.

```jsx
const LifecycleLogger = () => {
  return (
    <div className='logger-container'>
      <h2>Lifecycle Logger (Function Component)</h2>
    </div>
  );
};

export default LifecycleLogger;
```

You import the component the same way, so we don't need to change anything in the `App.js` file. You should see the heading when you click the button to mount the logger.

## Creating Our State

In the class component, we initialize state in the constructor. In the functional component, we use the `useState` hook to initialize state. We also want to bring in the `useEffect` hook.

```jsx
import { useState, useEffect } from 'react';
```

Let's add our state:

```jsx
const [count, setCount] = useState(0); 
```

Let's output the count in the return (render) along with a button to increment the count (update the state), just like we did in the class component:

```jsx
const LifecycleLogger = () => {
  const [count, setCount] = useState(0); // Initialize count state

  return (
    <div className='logger-container'>
      <h2>Lifecycle Logger (Function Component)</h2>
      <p>Count: {count}</p>
    </div>
  );
};
```

You can see it is cleaner with functional components. We don't have to worry about binding `this` or the constructor. We simply call the `setCount` function to update the state.

## useEffect Hook to Mount

Now we want to log when the component is mounted. We do this with the `useEffect` hook. The `useEffect` hook takes a function as its first argument. This function will run when the component is mounted.

Add this right below where we used the `useState` hook:

```jsx
useEffect(() => {
  console.log('✅ LifecycleLogger Mounted');
}, []);
```

This works the same as the `componentDidMount` method in the class component.

The second argument is an array of dependencies. If you pass an empty array, the function will only run once when the component is mounted. If you put something in here, the function will run when that dependency changes. If you leave in empty it means this will only run on mount.

## useEffect Hook to Update

Let's add a button to update the count:

```js
  return (
    <div className='logger-container'>
      <h2>LifecycleLogger (Function Component)</h2>
      <p>Count: {count}</p>
      <button onClick={incrementCount} className='secondary-btn'>
        Update
      </button>
    </div>
```

We could just add the `setCount` to the onClick directly but we'll add it to a separate function like we did in the class:

```js
const incrementCount = () => {
    setCount((prev) => prev + 1);
  };
```

To hook into the update, we can add another `useEffect` but pass in the `count` as a dependency:

```js
// componentDidUpdate for `count`
  useEffect(() => {
    if (count > 0) {
      console.log('Component updated...', count);
    }
  }, [count]);
```

We are checking if the count is updated. Now notice I don't have access to the previous state like I do in the `componentDidMount` method. That is one drawback. If I wanted to use the prevState here I would have to use something called a `ref`, which we will go over soon. However, if you just want to make sure it updated, you can just check if it is greater than 0. 

Now when you update the count, you should see the message in the console.

## useEffect Hook to Unmount

Now we want to log when the component is unmounted. We do this adding a return to the `useEffect` hook. This return is a cleanup function that runs when the component is unmounted.

```jsx
  useEffect(() => {
    console.log('Component mounted...');


    return () => {
      console.log('Component unmount...');
    };
  }, []);
```

Now click the button to unmount the logger and you should see the cleanup message in the console.

Here is the final code, which to me looks much better than the class version:

```jsx
import { useState, useEffect } from 'react';

const LifecycleLogger = () => {
  const [count, setCount] = useState(0);

  // componentDidMount
  useEffect(() => {
    console.log('Component mounted...');

    // componentWillUnmount
    return () => {
      console.log('Component unmount...');
    };
  }, []);

  // componentDidUpdate for `count`
  useEffect(() => {
    if (count > 0) {
      console.log('Component updated...', count);
    }
  }, [count]);

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className='logger-container'>
      <h2>LifecycleLogger (Function Component)</h2>
      <p>Count: {count}</p>
      <button onClick={incrementCount} className='secondary-btn'>
        Update
      </button>
    </div>
  );
};

export default LifecycleLogger;

```
