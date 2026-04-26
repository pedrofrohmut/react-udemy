# Auto Focus Start Button

I was thinking of other things we can do and add to this project, especially with the `useRef` hook. One thing that came to mind was to auto-focus the start button when the page loads. This way, the user can just press the `Enter` key to start the timer.

Open the `TimerControls.jsx` file and import both `useRef` and `useEffect` hooks.

```jsx
import { useRef, useEffect } from 'react';
```

Add a ref for the start button.

```jsx
const startButtonRef = useRef(null);
```

Add the `ref` attribute to the start button.

```jsx
<button
  ref={startButtonRef}
  onClick={onToggle}
  className='bg-green-500 w-full text-white px-4 py-2 cursor-pointer rounded hover:bg-green-600'
>
  {isRunning ? 'Pause' : 'Start'}
</button>
```

Now, add an effect to auto-focus the start button when the page loads.

```jsx
// Auto-focus the Start button on mount
useEffect(() => {
  if (startButtonRef.current) {
    startButtonRef.current.focus();
  }
}, []);
```

Now when you go to the page, the start button will be focused, and you can press the `Enter` key to start and stop the timer without touching the mouse.
