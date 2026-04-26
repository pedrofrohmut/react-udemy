# How React Works Under the Hood

I just want you to get a bit more familiar with how React works under the hood. This is not stuff that you need to know to build React apps but it's good to have a basic understanding of how React works. If it seems too confusing for you, don't worry about it. You can always come back to this section later.

We know React is a JavaScript library for building user interfaces but how does it actually work?

## Virtual DOM

If you're taking this course, you should know what the DOM or the Document Object Model is. To refresh your memory, the DOM is a tree-like structure that represents the structure of a web page. It's a way for us to interact with the web page using JavaScript.

When we write vanilla JavaScript, we change an update the DOM directly. React doesn’t manipulate the actual DOM directly like vanilla JavaScript or something like jQuery. Instead, it uses something called the Virtual DOM, which is a lightweight copy of the real DOM stored in memory. When your state or props change, React first updates the Virtual DOM instead of the real one.

### Reconciliation & Diffing Algorithm

Once the Virtual DOM is updated, React compares it with the previous version using an efficient diffing algorithm. It finds the differences between the old and new Virtual DOMs and calculates the minimal number of changes needed to update the actual DOM. This process is called** reconciliation** and makes React very fast compared to direct DOM manipulation. The name of the reconciliation algorithm is called **Fiber**. It's a complete rewrite of the old algorithm and is more efficient and incremental. It was released in React 16.

The next thing I want to mention is the React.createElement method. This is the core function behind the scenes that builds the UI in a React app. It does just what it says. It creates elements for a component. Whether that be an HTML tag like an H1 or another React component.

It takes in a few arguments:

`type`: A string like ‘div’ or a component function
`props`: Object with attributes like `className` and `id`
`children`: Any nested content or elements

The problem with this method is that it's incredibly tedious to just render a couple elements on the screen.  

Here is an example of a Greeting component that simply renders an h1 tag with "Hello World" as the content:

```jsx
function Greeting() {
  return React.createElement('h1', null, 'Hello, World!');
}
```

This may not look that bad but if we had multiple tags, React would create a tree of React elements that represent the structure of the UI. This tree is then used to update the Virtual DOM. But we would have to keep nesting the `createElement` methods for nested elements. This would be very annoying.


## React Components & JSX

This is where JSX comes in. Instead of describing elements with createElement, we can just type out the HTML with the elements that we want. It is then compiled into the createElement method under the hood. So we don't have to worry about writing this.

This is the equivilent in JSX:

```jsx
function Greeting() {
  return <h1>Hello, World!</h1>;
}
```

So again, you don't have to use JSX with React, but I don't thing I've ever seen anyone write React components with createElement. I'll give you an example in a bit to show you how you could if you wanted to though.

## React 19 Compiler

React 19 introduced a compiler. This was a big change to how React works under the hood. The compiler is responsible for transforming your React code into a more optimized version. Prior to React 19, we had to manually optimize things like momoiazation. If you don't know what memoization is, it is a technique used to optimize functions by caching the results of expensive function calls. With the compiler, React can now do this for you automatically. So it makes your React code more optimized without you having to do anything.

So that's a very simple general overview of how React works under the hood. THese are just some of the major steps. You have the Virtual DOM acting as a middleman to make updates efficient, the diffing and reconciliation process using the Fiber algorithm, and the use of React.createElement behind the scenes to create UI trees. Then we have JSX, which makes writing components way easier, and now with React 19, we even have a built-in compiler that can optimize our code automatically — something that used to require manual work.

Again, you don't need to memorize all of this, but having a basic understanding of what's happening behind the scenes will help you write better React code and understand what's going on when things don't work as expected. As we move into building real components, all of this will start to make a lot more sense.
