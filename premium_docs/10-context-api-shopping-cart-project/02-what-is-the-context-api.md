# What Is The Context API?

So we've talked about and worked with **global state** — data that needs to be accessed by many parts of the app. This is different from **component-level state**, which is local to a specific component.

In our Crypto Dash project, we kept global state in the `App` component. That worked fine because it was a small app with limited state and only a few components that needed it. But what happens when your app grows?

You start to run into a few problems:

- The `App` component becomes bloated. All you're state values and functions start to fill it up and it get's messy.
- You pass props down through multiple layers of components — even ones that don’t need the data — just to get it to where it’s needed. This is called **prop drilling**, and it quickly becomes messy and hard to maintain.
- You also have no separation of state. So if you have global state for authentication and then for blog posts, it's all just one big confusing file.


The **Context API** is React's built-in solution for all of these problems. It allows React to share data (state) across components without passing props manually through every level of the component tree. You have centralized state and you can bring both values and functions into any component that you want without passing it as props.

---

## 🧠 Real-World Analogy

Think of your app like a big office building. Each floor (component) has different people (props). If you need to pass a message from the top floor to the bottom floor, you'd have to go through every level, handing the message down person by person. That’s prop drilling.

The Context API is like installing an intercom system. Now, any floor can communicate directly with the main office — no need to manually pass the message through every floor in between.

---

## 🛠️ How It Works (Conceptually)

Here’s the basic flow of using Context:

1. **Create a Context Object**  
   This is like setting up a new communication channel.

   ```js
   const ThemeContext = React.createContext();
```

2. **Provide a Value with a Provider**
Wrap a section of your component tree with the context provider and pass in the value you want to share.

```js
<ThemeContext.Provider value={{ theme: 'dark' }}>
  <App />
</ThemeContext.Provider>
```

3. **Consume It Anywhere with useContext()**
Inside any child component, you can use the context data like this:

```js
    const { theme } = useContext(ThemeContext);
```

No more threading props down multiple levels. Any component inside that provider can access the shared state.

## When NOT To Use Context

It’s important to note — Context is not a replacement for every `useState`.

    - Don’t use it for frequently changing values like form inputs.
    - Context updates can trigger re-renders of all consuming components, so don’t use it for high-frequency updates like keystrokes or animation state.

Next, we are going to build a shopping cart UI to demonstrate all this.
