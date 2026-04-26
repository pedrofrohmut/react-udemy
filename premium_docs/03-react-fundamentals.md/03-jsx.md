# JSX

JSX stand for **JavaScript XML**. It's a syntax extension for JavaScript that looks similar to XML or HTML. It's a lot easier to read and write than using `React.createElement`. However, JSX is not valid JavaScript. That's why we haven't used it here yet. It needs to be transpiled to JavaScript before it can be run in the browser. This is where Babel comes in. Babel is a JavaScript compiler that can convert JSX into JavaScript. It's a tool that is commonly used in React projects to convert modern JavaScript into a version that can run in any browser.

Again, I want to mention that when you use a build tool like Vite or the older Create React App or Next.js, you don't have to worry about any of this. They will handle all of this for you. But again, I want you to understand what's happening under the hood. We're kind of looking at the engine of the car before we drive it. Driving the car is easier and a lot more fun, but it's good to know how it works.

In order to use JSX here in an HTML file, we need to include Babel. Babel has a standalone version that you can include in a script tag. Add the following script tag to the head of the HTML file:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Now we can use JSX in our React component. Add `type="text/babel"` to the script tag and replace the `App` function with the following:

```html
<script type="text/babel">
  function App() {
    return <h1>Hello, React!</h1>;
  }
</script>
```

Now open the file in your browser and you should see "Hello, React!" on the screen. This is JSX in action. It looks like HTML, but it's actually JavaScript.

Let's add the Header component JSX:

```js
function Header() {
  return (
    <header>
      <h2>App Header</h2>
    </header>
  );
}
````

Now add the header to the main App component:

```js

function App() {
  return (
    <div>
      <Header />
      <h1>Hello, React</h1>
    </div>
  );
}
```

Notice that I wrapped the `h1` and `Header` elements in a `div`. This is because
JSX requires that all elements be wrapped in a single parent element. This is a limitation of JSX. So if you have multiple elements, they need to be wrapped in a single parent element. If you try the following, you will get an error:

```js
function App() {
  return
<h1>Hello, React!</h1>
<p>This is a paragraph.</p>
}
```

### Fragments

If you don't want to wrap your elements in a `div`, you can use a fragment. A fragment is a way to group elements without adding an extra node to the DOM. Replace the `div` with a fragment like so:

```js
function App() {
  return (
    <React.Fragment>
      <h1>Hello, React!</h1>
      <p>This is a paragraph.</p>
    </React.Fragment>
  );
}
```

A shorthand is to use an empty tag like so:

```js
function App() {
  return (
    <>
      <h1>Hello, React!</h1>
      <p>This is a paragraph.</p>
    </>
  );
}
```

If you use the browser dev tools you will see there is no `div` wrapping the elements. This is a cleaner way to group elements without adding extra nodes to the DOM.

### JSX Expressions

What makes JSX really powerful is that you can use JavaScript expressions within the markup using curly braces. For example, let's create a variable and use it in the JSX:

```js
function App() {
  const name = 'John';
  return (
    <>
      <h1>Hello, {name}!</h1>
      <p>This is a paragraph.</p>
    </>
  );
}
```

This will render "Hello, John!" on the screen. You can use any valid JavaScript expression within the curly braces.

## Conditional Rendering

You can also use JavaScript expressions to conditionally render elements. For example, let's say we want to render a different message based on whether the user is a member or not. We can do this using a ternary operator.

#### Ternary Operator

Let's add a little more to the `App` component and use a ternary. Replace the `App` function with the following:

```js
function App() {
  const name = 'John';
  const member = true;
  return (
    <>
      <h1>Hello, {name}!</h1>
      {member ? <p>Welcome back!</p> : <p>Join us!</p>}
    </>
  );
}
```

We can use the ternary because it is a valid JavaScript expression. If `member` is true, it will render "Welcome back!" otherwise it will render "Join us!". We can't use an `if` statement because it is not a valid expression.

You could however return certain elements based on a condition like so:

```js
function App() {
  const name = 'John';
  const member = true;
  if (member) {
    return (
      <>
        <h1>Hello, {name}!</h1>
        <p>Welcome back!</p>
      </>
    );
  } else {
    return (
      <>
        <h1>Hello, {name}!</h1>
        <p>Join us!</p>
      </>
    );
  }
}
```

This obviously works, but it's not as clean as using a ternary.

#### Short Circuit Evaluation

Another way to conditionally render elements is to use short circuit evaluation. This is a way to conditionally render elements without using an `if` statement or ternary. For example, let's say we only want to render the paragraph if `member` is true. We can do this:

```js
function App() {
  const name = 'John';
  const member = true;
  return (
    <>
      <h1>Hello, {name}!</h1>
      {member && <p>Welcome back!</p>}
    </>
  );
}
```

This will render "Welcome back!" if `member` is true. If `member` is false, nothing will render.

## Embedding Components

Right now we only have our root App component. But we can embed other components within the App component. Let's create a `Header` component and embed it in the `App` component.

Remember, components are just functions. So create a `Header` function below the `App` function like so:

```js
function Header() {
  return <h1>My Header</h1>;
}
```

Now we can embed the `Header` component in the `App` component like so:

```js
function App() {
  const name = 'John';
  const member = true;
  return (
    <>
      <Header />
      <h1>Hello, {name}!</h1>
      {member && <p>Welcome back!</p>}
    </>
  );
}
```

Now you should see "My Header" at the top of the page.

## Self-Closing Tags

When you embed components, they should be self closing if there are no children. They are required for all elements that do not have children. For instance an `<img />` or `<input />` tag.

You can open the React DevTools in your browser and inspect the elements. You will see that the `Header` and `App` components. It would also show any state or props, but our project doesn't have any of that right now.

## Reserved Words

There are a few reserved words in JSX that you can't use as attributes like you can in HTML. The most common are `class` and `for`. The substitute for `class` is `className` and the substitute for `for` is `htmlFor`. For example, if you want to add a class to an element, you would use `className` like so:

```js
function App() {
  return <h1 className='title'>Hello, React!</h1>;
}
```

All attributes in JSX are camelCase. So `class` becomes `className`, `for` becomes `htmlFor`, and so on.

Here is an example of using `htmlFor`:

```js
function App() {
  return (
    <label htmlFor='name'>
      Name:
      <input type='text' id='name' />
    </label>
  );
}
```

Alright, so that's JSX. It's a powerful tool that makes writing React components a lot easier. It's a big part of what makes React so popular. It's a lot easier to read and write than using `React.createElement`. If you had to do that, you would probably wouldn't use React very long.

There are some other things you'll learn about JSX as you go along, such as styling and lists, but this should give you a good start.

Now that you know the basics, let's get into a more real-world setup and talk about how to create a React app using Vite.

Here is the final code:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      function Header() {
        return (
          <header>
            <h2>App Header</h2>
          </header>
        );
      }

      function App() {
        const name = 'John';
        const member = true;

        return (
          <>
            <Header />
            <h1 className='title'>Hello, {name}</h1>
            {member ? <p>Welcome Back</p> : null}
          </>
        );
      }

      const container = document.getElementById('root');
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(App));
    </script>
  </body>
</html>
```
