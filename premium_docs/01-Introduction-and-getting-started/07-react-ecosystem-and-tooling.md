# React Ecosystem and Tooling

One thing that I think confuses a lot of people when they're first learning React is the ecosystem and tooling. There are a lot of tools and libraries that you can use with React and it can be overwhelming to know where to start. You have single page applications, server-side rendering with meta-frameworks like Next.js, static site generators, routing libraries, state management, and more. It's a lot to take in.

Let's break down some of the most important tools and libraries that you should know about when working with React.

## React & React DOM

So we know what React is. It's a JavaScript library for building user interfaces. When you create a web app that runs in the browser, you need to use React DOM to render your React components to the DOM. React DOM is a separate package that allows you to render React components in the browser. React itself is just the core library for building user interfaces. You can use it with React Native to build mobile apps, or with React VR to build virtual reality experiences. For it to work in the browser, you need React DOM. If you use a build tool like Vite, which we will be doing, it's included and you don't need to install or set it up it separately.

## Vite

Vite is a build tool that is used to build modern web apps. It's fast and optimized for instant feedback and quick development. The Vite CLI will give you multiple options from which framework you want to use, because you can use it with Vue, Svelte and other frameworks as well as which React environment you want to use, whether it's a vanilla React setup or something like Tanstack or React Router. Vite is going to be a common factor in all of our projects.

## React Router

React Router is the most widely used routing library for React. At its core, routing is how you navigate between different parts or "pages" of your application. In traditional multi-page websites, navigation loads entirely new HTML documents. But with single page applications (SPAs), you only have one HTML file — and React dynamically renders different components based on the current URL. That’s where React Router comes in.

React Router lets you define which components should render for which paths, making navigation within a React app seamless and fast — without full page reloads.

With the release of React Router v7, a lot has changed. While you can still use it as a traditional client-side library, it now also supports server-side rendering and file-based routing much like Next.js.

In fact, this shift has essentially replaced their former meta framework, Remix, as the team now recommends using React Router directly as a full-featured framework if you need advanced capabilities like data loading, error boundaries, and nested layouts.

## Tanstack

The TanStack is a suite of powerful tools designed to enhance React (and other frameworks). One of the first and most popular tools in the stack is React Query, now known as TanStack Query. It makes fetching, caching, syncing, and updating data from an API or your backend much easier and more efficient, eliminating the need to manually manage loading, error, and success states. It provides a powerful abstraction over fetch or axios, and integrates deeply with the React component lifecycle, giving you automatic background updates, pagination, optimistic updates, and more — all with minimal boilerplate.

## Next.js

We talked a little bit earlier about server-side rendering (SSR) — a type of web app architecture where the HTML is generated on the server and sent to the client, rather than being built entirely in the browser like in SPAs.

Next.js is a popular meta-framework built on top of React that makes it easy to build SSR applications. It gives you out-of-the-box features like server-side rendering, static site generation, file-based routing, API routes, image optimization, and more — all while still using the React component model you’re familiar with.

After learning React, I definitely suggest learning Next.js. It's not hard to learn once you know React.

## Static Site Generators (Gatsby, Astro)

In addition to SPAs and SSR, there is a third type of web app, which are called "static sites". These are websites that are pre-built at build time and served as static files. They are fast and secure because they don't require a server to generate the HTML. Gatsby is a popular static site generator that uses React. Astro is another one and you can use other frameworks like Vue.js and Svelte with it.

## React Native

React Native is a framework for building mobile apps with React. It allows you to use the same React codebase for both iOS and Android. Remember I said React DOM is needed to render React components in the browser? Well, React Native is what you use to render React components on mobile devices. Again, after this course, you should be able to pick up React Native easily and start to learn how to build mobile apps. What you learn here is a gateway to many other technologies in the React ecosystem.

## State Management (Redux, Recoil, Zustand)

State management is a big topic in React. It's how you manage the state of your application. When I say state, I mean the data that your application needs to keep track of. For example, if you have a shopping cart, you need to keep track of the items in the cart. If you have a form, you need to keep track of the input values. There are many ways to manage state in React. You can do it with React itself by using something called the Context API. This is where you create a context with your global state and pass it down to your components.

You can also use 3rd-party libraries. I would say that Redux is still the most popular 3rd-party library for state management. Zustand is a newer one that is gaining popularity as well. I'll show you how to use Redux in this course, but you can use any of these libraries to manage state in your React apps.

## Extensions & Plugins

There are many extensions and plugins that you can use with React. For example, React DevTools is a browser extension that allows you to inspect the React component hierarchy in the browser. It's a great tool for debugging and understanding how your React app is working. There are also plugins for your code editor that can help you write React code faster. We'll be using some of these tools in this course.

## Conclusion

So that's a brief overview of the React ecosystem and tooling. I know it can be overwhelming at first, but as you start to build more React apps, you'll get more familiar with the tools and libraries that you need.
