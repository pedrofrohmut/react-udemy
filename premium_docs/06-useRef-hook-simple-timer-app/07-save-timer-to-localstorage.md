# Save Timer to LocalStorage

Let's make it so that the time gets saved to the local storage. This way, even if the user refreshes the page, the timer will continue from where it left off.

Open the `Timer.jsx` file and import the `useEffect` hook along with the others:

```jsx
import { useState, useRef, useEffect } from 'react';
```

For the `time` state, we want to first check localstorage. We can do this by passing in a function to `useState` that returns the initial state. If the value is not found in local storage, we can default to `0`:

```jsx
const [time, setTime] = useState(() => {
  return Number(localStorage.getItem('time')) || 0;
});
```

Then we want to add a `useEffect` hook that listens for changes to the `time` state and saves it to local storage:

```jsx
// Save time to localStorage whenever it updates
useEffect(() => {
  localStorage.setItem('time', time);
}, [time]);
```

Then on reset, we want to clear the local storage:

```jsx
const resetTimer = () => {
  clearInterval(timerRef.current);
  setIsRunning(false);
  setTime(0);
  timerRef.current = null;
  localStorage.removeItem('time'); // Remove saved time on reset
};
```

Now, run the timer and pause it and try and refresh the page and you should see the timer continue from where it left off.
