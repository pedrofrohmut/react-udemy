# State

State is one of the biggest concepts to understand in frontend development when it comes to building single page applications. It can be a little confusing at first, but it's not that difficult once you understand the core concept.

## What Is State?

In React, state is just data that changes over time. That could be inside a specific component — like a toggle or a counter — or in some kind of global context, like which user is logged in.

Anytime your UI needs to respond to something changing — like user input, a button click, a form submission, or even data from an API — that’s usually handled with state.

React tracks that state for you, and when it changes, React automatically re-renders the component to reflect the new data in the UI.

So you can think of state as the memory of your component — it remembers what’s currently happening so React can display the right things at the right time.

## Component State vs Global State

There are two types of state in React: component state and global state also called application state. Component state is data that is local to a component. It is data that is only relevant to that component and does not need to be shared with other components. An example would be a modal component with a piece of state called `isOpen`. It would be a boolean value that determines whether the modal is open or not. No other component is concerned with whether the modal is open or not, so it is local to that component.

An example of global state, also called global state, would be a user object that contains information about the currently logged in user. This data is relevant to the entire application and needs to be shared with multiple components. React has a built in context API for managing global state but you can also use a 3rd-party library like Redux or Zustand.

## Global State & SSR


State managers are not as important with SSR (Server-Side Rendered) applications because the server is responsible for rendering the initial UI and delivering it to the client with the necessary data already embedded. This means:

    - There's less need to manage complex client-side state during the initial load.

    - Data is often fetched and injected on the server, reducing the amount of logic that has to happen in the browser.

    - In many SSR apps, URL-based routing and server responses determine what gets rendered, which can eliminate the need for global state tools like Redux or Zustand in many cases.

    - Page transitions often re-trigger server-side logic, refreshing data rather than relying on long-lived in-browser state.

However, client-side state is still important for things like:

    - User input (forms, modals)

    - Temporary UI state (toggled sections, tabs, active elements)

    - Real-time updates or client-only interactions

    - So while you still use useState and possibly context or lightweight state tools, heavy client-side state management becomes less critical in many SSR workflows.




## What Are Hooks

Before we get into managing state with the `useState` hook, I should clarify what hooks are in React. A hook is a special function in React that lets you “hook into” built-in features like state, lifecycle methods, or context inside functional components. 

Before hooks, features like state and lifecycle methods were only available in class components. But now, thanks to hooks, we can do everything with function components — which are simpler and more common today.

Hooks always start with the word “use” — like useState, useEffect, or useContext. Each one gives you access to a specific React feature.

## Using State

To use state in React, we use a hook called `useState`.

Here is the anatomy of `useState`:

```js
const [value, setValue] = useState(initialValue);
```

We use array destructuring here. That means we're pulling out two values from what useState returns:

    - `value` is the current state.
    - `setValue` is the function we call to update that state.

 We also pass in what we want for a default value.

You can name them whatever makes sense for your data. For example:

```js
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
```

We have a count that is initially set to 0. We can change that state using a function called `setCount`. This will update it in an immutable way instead of changing it directly.

We also have a user set to `null` by default.

If any of these values change, the component that they are in will re-render and React will update the UI to reflect the new state.

That's one of the most powerful things about React — it keeps your UI in sync with your data automatically. You don’t need to manually update the DOM.

Let’s say you have a button that increases the count. When a user clicks it, you’d call the setCount function like this:

```js
<button onClick={() => setCount(count + 1)}>Increase</button>
```

Every time the button is clicked:

    - The `setCount` function is called with the new value.
    - React re-renders the component.
    - The new count value shows up in the UI.

 📌 Important: You should never change state directly like count++ — always use the setter function (e.g. setCount(count + 1)) so React can detect the change and trigger a re-render.

In the next lesson, we will add a rating state to our component.