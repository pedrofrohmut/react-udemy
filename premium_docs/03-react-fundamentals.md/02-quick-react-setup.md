# Quick React Setup

There are multiple ways to get a React application up and runnuing and I want to make sure I show you a few different ways. I think it gives more insight into how React works and how it can be used in different environments.

Ultimatley, you want to use a build tool like Vite or a framework like Next.js, but before any of that, I want to show you the simplest way, which is to use the React CDN. You would not use this method for a production application, but it is a nice way to get started and see how React works.

If you go to https://react.dev/learn/installation it will show you some different ways to get started. Scroll down to where it says

**"To try React locally on your computer, download this HTML page. Open it in your editor and in your browser!"**

and click on the link. It will show you a simple HTML file. All I want you to do is copy the two script tags that are in the head.

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

Notice this is for version 18. 19 is the most recent, but this is fine for what we are doing.

Now open up VS Code or another text editor and create a new file called `index.html` and add the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <title>My React App</title>
  </head>
  <body>
    <div>My App</div>
  </body>
</html>
```

Notice there is a link for React, the core library as well as React DOM. React is the library for building user interfaces but React DOM is what makes it work in the browser. All React web apps will need these two libraries. If you were building a mobile app, you would use React Native instead of React DOM, but the core library would be the same.

Now open up the file in your browser and you should see "My App" on the screen. I am using the Live Server extension for VS Code, which is a real-time development server that will reload the page when you make changes to the file. It's a nice way to see your changes without having to refresh the page.

## Creating The Root/App Component

As I mentioned earlier, React is built around components. Components are UI building blocks. At the core of every React app is a component tree that starts with a root component. This is usually called `App`. That App component is what is initially rendered to the screen. It's rendered by React DOM, using a "root element" that you specify.

So let's specify the root element in the HTML file. Replace the `div` with an element with an id of `root`.

```html
<div id="root"></div>
```

This will essentially be the entry point for our React app.

Now let's create the Root or "App" component. React components are functions. So create the following function within a `script` tag in the `body` of the HTML file.:

```html
<script>
  function App() {
    return React.createElement('h1', null, 'Hello, React!');
  }
</script>
```

The `React.createElement` function is how you create elements in React. It's important to mention that this is very low level. We're not using any JSX here, which is the more common way to create elements in React. JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It's a lot easier to read and write than using `React.createElement`. However, I want to show you what happens under the hood so you get a better understanding of how React works.

So the createElement function takes in three arguments. The first is the element you want to create. In this case, it's an `h1` element. The second argument is an object that contains the element's properties. We don't have any properties in this case, so we pass in `null`. The third argument is the element's children. In this case, it's the text "Hello, React!". It could be another element or an array of elements.

At this point, nothing shows on the screen yet because we haven't rendered the `App` component. To do that, we need to use the `ReactDOM.render` function.

Let's go below the `App` function and add the following:

```js
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

First, we are selecting the root element from the DOM. Then we create a root using `ReactDOM.createRoot`. Then we call the `render` method on the root and pass in the `App` component. This is what kickstarts the rendering process. The `App` component is rendered to the screen. From there the rest of your UI, like the header, footer, and other components would be embedded within the `App` component. So this is the top level component.

Now when you refresh the page, you should see "Hello, React!" on the screen. This is the absolute simplest react project that you could possibly create. It doesn't even use JSX, which we'll talk about in the next lesson.

Now, just to show you how tedious not using JSX is, let's say we want to create a very simple header with an H2.

We would create another component/function:

```js
function Header() {
  return React.createElement('header', null,
    React.createElement('h2', null, 'My App Header')
  );
}
```


Then we would add it to our main App component:

```js
function App() {
  return React.createElement('div', null, 
    React.createElement(Header),
    React.createElement('h1', null, 'Hello, React')
  );
}
```

In the next lesson we will look at using JSX and see how much easier that is.

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
  </head>
  <body>
    <div id="root"></div>

    <script>
      function Header() {
        return React.createElement(
          'header',
          null,
          React.createElement('h2', null, 'My App Header')
        );
      }

      function App() {
        return React.createElement(
          'div',
          null,
          React.createElement(Header),
          React.createElement('h1', null, 'Hello, React')
        );
      }

      const container = document.getElementById('root');
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(App));
    </script>
  </body>
</html>
```