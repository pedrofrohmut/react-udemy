# Timer Component Composition Challenge

We learned how to use the `useRef` hook to create a reference to a DOM element and store values without causing a re-render by creating a timer app. Let's do a bit of component composition and separate the timer logic into its own component as well as the controls and display.

I want you guys to fo this on your own as a challenge. We are not adding any new functionality, just breaking what we have into smaller components.

Here are the components that you should create:

- Timer: The entire timer
- TimerDisplay: The h2 with the time
- TimerControls: The toggle and reset buttons

<img src="./images/timer-components.png" width="400" />

Try it out first and then check the solution below:

## Timer Component

Create a new file called `components/Timer.jsx` and add all the code from the main App component:

```js
import { useState, useRef } from 'react';

const Timer = () => {
  const timerRef = useRef(null);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const toggleTimer = () => {
    if (isRunning) {
      //Clear interval to stop the timer
      clearInterval(timerRef.current);
      timerRef.current = null;
    } else {
      // Start timer
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    timerRef.current = null;
  };

  return (
    <div>
    

      <button
        onClick={toggleTimer}
        className='mt-3 bg-green-500 text-white px-4 py-2 rounded hover: bg-green-600 mr-3'
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={resetTimer}
        className='mt-3 bg-red-500 text-white px-4 py-2 rounded hover: bg-red-600'
      >
        Reset
      </button>
    </div>
  );
};

export default Timer;

```

Then embed it in the `App.jsx` component:

```js
import Timer from './components/Timer';

const App = () => {
  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg text-center'>
      <Timer />
    </div>
  );
};

export default App;

```

## TimerDisplay Component

Create a new file at `src/components/TimerDisplay.js` and add the following code:

```jsx
const TimerDisplay = ({ time }) => {
  return <h2 className='text-4xl font-semibold my-4'>⏳ Timer: {time} sec</h2>;
};

export default TimerDisplay;
```

Then import it into the `Timer.jsx` file:

```jsx
import TimerDisplay from './components/TimerDisplay';
```

Add it to the output and replace the h2:

```jsx
<TimerDisplay time={time} />
```

## TimerControls Component

Create a file at `src/components/TimerControls.js` and add the following code:

```jsx
const TimerControls = ({ isRunning, onToggle, onReset }) => {
  return (
    <div className='flex flex-col gap-2'>
      <button
        onClick={onToggle}
        className='bg-green-500 w-full text-white px-4 py-2 cursor-pointer rounded hover:bg-green-600'
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={onReset}
        className='bg-red-500 w-full text-white px-4 py-2 cursor-pointer rounded hover:bg-red-600'
      >
        Reset
      </button>
    </div>
  );
};

export default TimerControls;
```

Then import it into the `Timer.jsx` file:

```jsx
import TimerControls from './components/TimerControls';
```

Add it to the output of the `App` component:

```jsx
<TimerControls
  isRunning={isRunning}
  onToggle={toggleTimer}
  onReset={resetTimer}
/>
```


There we go! We have separated the timer logic into its own component and composed it with the display and controls components. This makes the code more readable and easier to maintain.
