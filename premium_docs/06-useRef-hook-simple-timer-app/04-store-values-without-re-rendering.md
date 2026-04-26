# Store Values Without Re-rendering

In the previous section, we learned how to use the `useRef` hook to create a reference to a DOM element. In this section, we will learn how to store values without causing a re-render.

In this project, we are going to create a timer that counts up in seconds. The timer ID will be stored in a ref because we want it to persist across renders and we don't want it to cause a re-render like a state value. Now the actual time that is displayed will be in state and will re-render every second when it changes because we need to update the UI with that displayed time. 

This may be confusing but think of it this way, the ref is just a box that holds the timer ID. When you call `setInterval` or `clearInterval`, you are dealing with an ID that is returned. That needs to be kept across renders but not in state. 

You may ask well why not just use a regular variable? In React function components, everything inside the component runs from top to bottom on every render. So if we just put let timer id = null and then add the setInterval to that variable, everytime the component renders the timer ID would be set back to null and you would lose the value you had before. With a ref, that value persists across state, so it's perfect for this case.

A regular variable is like scribbling on a whiteboard that gets erased every time the component renders.

A ref is like writing it down in a notebook that React doesn't touch.

Let's get started.

You can delete the input focus stuff from the previous lesson.

- Import `useState`
- Add a new ref for the timer ID
- Add the state for the time and if the timer is running
- Add an H3 with the time and a button to toggle the timer
- Add the toggleTimer function to start and stop the timer

```jsx
import { useState, useRef } from 'react';

const App = () => {
  const timerRef = useRef(null);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Start/Stop Timer
  const toggleTimer = () => {
    if (isRunning) {
      // Clear the interval to stop the timer
      clearInterval(timerRef.current);
      timerRef.current = null; //  Clears stored interval ID
    } else {
      // Start the timer
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg text-center'>
      <h2 className='text-4xl font-semibold mt-4'>⏳ Timer: {time} sec</h2>
      <button
        onClick={toggleTimer}
        className='mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

export default App;
```

If you don't know how `setInterval` works, it takes a function and a time in milliseconds. The function will be called every time the time is reached. In this case, we are calling `setTime` every second to update the time display.

When the timer is running, we store the interval ID in the `timerRef` ref. When the timer is paused, we clear the interval and set the ref to `null`. This way, we can start and stop the timer without causing a re-render.

## Reset Button

Let's take it a bit further and add a reset button to reset the timer to 0.

We will add a new function for this:

```jsx
// Reset Timer
const resetTimer = () => {
  clearInterval(timerRef.current); // Stops the timer if running
  setIsRunning(false); // Reset running state
  setTime(0); // Reset time to zero
  timerRef.current = null; // Clear stored interval reference
};
```

Let's add the button to the component:

```jsx
{
  /* Reset Button */
}
<button
  onClick={resetTimer}
  className='mt-2 bg-red-500 w-full text-white px-4 py-2 cursor-pointer rounded hover:bg-red-600'
>
  Reset
</button>;
```

Now you have a fully functional timer with start, pause, and reset functionality.

In the next lesson, we will do some component composition and separate things a bit.
