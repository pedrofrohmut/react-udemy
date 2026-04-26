# `useRef` Intro & Project Setup

## What Is The `useRef` Hook?

We learned about `useState` and `useEffect`, which are the most common hooks. The third most common is `useRef`. In this lesson, we'll talk about what useRef is and we'll spin up a new project to work in.

We know that when we use state, when it changes, it re-renders the component. The `useRef` hook is used to create a mutable reference to a value that persists across renders without causing a re-render when the value changes — unlike values that use the useState hook.

`useRef` is also used to directly select elements from the DOM. So say you wanted to programmatically focus an input field when a button is clicked — like putting the cursor in the input — you could use `useRef` to grab that DOM node and call `.focus()` on it.

This is similar to how you might use `document.querySelector` in vanilla JavaScript, but it’s the React way to reference DOM elements in functional components.

It’s also great for storing things like timers, previous values, or any data that doesn’t need to trigger a re-render when it changes. We'll see a few examples of both DOM access and value tracking with useRef coming up.

## Uncontrolled Components

We saw how to create forms and work with inputs by adding a piece of state for each input. Those are used in **controlled components** because the state is managed by React. But, there can be cases where it can be cumbersome to manage all the states. We can use the `useRef` hook to access the input values directly. These would be **uncontrolled components** because the state is not managed by React. Ill show you an example of uncontrolled inputs.

This hook works well for things like timers because obviously you don't want a re-render every time a timer updates. If you were to use useState for something like setTimeout or setInterval, every tick would trigger a re-render—which can seriously hurt performance and cause unnecessary updates. So we will also create a simple timer app.

The following statements are true when it comes to the `useRef` hook:

1. It creates a mutable reference that persists across renders.
2. It does NOT cause a re-render when the value changes.
3. It is used to access the DOM nodes or to store mutable values that are not part of the component's state.
4. It can hold mutable values like timeouts or previous state.

Let's spin up a React app with Vite.

Let's go ahead and scaffold our project using Vite and also setup Tailwind CSS.

Run the following command:

```bash
npx create-vite simple-timer
```

Let's also install Tailwind and the vite plugin for Tailwind CSS.

```bash
npm install tailwindcss @tailwindcss/vite
```

Add the following to your `vite.config.js` file:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Open the `index.css` file and add the following:

```css
@import 'tailwindcss';
```

Delete the `App.css` file and update the `App.jsx` file as follows:

```jsx
const App = () => {
  return <>My App</>;
};

export default App;
```

Now run the server with `npm run dev` and you should see "My App" on the screen.
