# Section Quiz

1. What is the primary difference between useRef and useState in React?

- [ ] useRef does not trigger a re-render when its value changes, while useState does
- [ ] useRef is used for storing mutable values, while useState is used for storing immutable values
- [ ] useRef is used for functional components, while useState is used for class components
- [ ] useRef is used for managing side effects, while useState is used for managing state

Answer: A - useRef does not trigger a re-render when its value changes, while useState does.

2. What does inputRef.current represent after assigning a ref to an input field?

- [ ] The current value of the input field
- [ ] The DOM element of the input field
- [ ] The initial value of the input field
- [ ] The event handler for the input field

Answer: B - The DOM element of the input field

3. Why do we use useRef to store the timer ID in the timer app?

- [ ] To cause the timer to re-render every second
- [ ] So that the interval ID can persist without triggering a re-render
- [ ] Because useRef is faster than useState
- [ ] Because setInterval only works with refs

Answer: B - So that the interval ID can persist without triggering a re-render

4. What does calling clearInterval(timerRef.current) do in the timer app?

- [ ] Starts a new timer
- [ ] Resets the timer to 0
- [ ] Stops the timer from updating the time
- [ ] Pauses the component from rendering

Answer: C - Stops the timer from updating the time

5. Why is it useful to move both display and control logic into the Timer component rather than leaving everything in App.jsx?

- [ ] Because hooks can only be used in a single component
- [ ] To isolate logic and reduce clutter in the root component
- [ ] So App.jsx can be used as a class component
- [ ] To allow the timer to use Redux

Answer: B - To isolate logic and reduce clutter in the root component

6. What will calling startButtonRef.current.focus() inside useEffect do?

- [ ] Prevent the user from clicking the button
- [ ] Highlight the button so it can be activated with Enter
- [ ] Visually resize the button
- [ ] Disable the button temporarily

Answer: B - Highlight the button so it can be activated with Enter
