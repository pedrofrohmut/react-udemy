# Section Intro

In this section, I want to touch on another hook that comes bundled with React and that is the useRef hook. I'll talk more about what exactly it is in the next video, but in short, it allows us to reference any DOM element directly, and we can then use the reference to access or manipulate that element — for example, setting focus to an input, reading its value, or even measuring its dimensions without triggering a re-render.

It can also be used to persist values across renders without causing a re-render, which is another powerful use case that we’ll get into as well. When you change state the component re-renders automatically, but you may not want that. That's a case for `useRef`.

We talked about controlled components with inputs that were directly related to state. Well `useRef` is used for uncontrolled components, so we're going to look at creating a form with uncontrolled inputs. This is where we reference the input element directly.

Then we'll build a small timer app and the timer ID stored in a ref because we want it to persist across renders and we don't want it to cause a re-render like a state value. We'll be using other things we've already learned like state, event handlers and so on, but the main focus is the `useRef` hook.