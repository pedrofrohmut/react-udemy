# How Routing Works

I want to take a few minutes to talk about routing and how it works in different types of applications.

## What Is Routing?

Routing is the process of determining how an application responds to a client request for a specific endpoint. In single page web applications, this typically involves mapping URLs to specific components or views. When a user navigates to a URL, the router determines which component should be rendered based on the current URL. This allows for a seamless user experience as users can navigate through different parts of the application without needing to refresh the page. This is unlike traditional routing where the server handles the routing and you are physically navigating to a different page.

## React Itself Does Not Have Routing

React itself does not have a built-in router. It is a library for building user interfaces, and routing is a separate concern. However, there are several libraries available that provide routing functionality for React applications. Setting up routes in each of these libraries is slightly different, but the core concepts are the same. Let's take a look at some of the most popular routing libraries for React.

#### React Router

React Router is the traditional routing library for React applications. It has been around for a long time. Version 7 was recently released and there have been some pretty fundamental changes.Traditionally, you would install "React Router DOM", which was the web-specific version of React Router. Similar to how we have React DOM for rendering to the DOM. You would use this library to create routes for single page applications. Meaning you define the routes in your project. With version 7, we can still use React Router in the same way we used React Router DOM. This is called "declarative mode".

React Router can also be used as a framework . In fact, if you've ever heard of the SSR meta framweork, Remix, React Router has basically replaced Remix and React Router can run in either "client mode" or "ssr mode". By default, it runs in SSR, which means that the server will render the HTML and send it to the client. This is similar to Next.js.

I want to show you both ways of using React Router. In this project, we'll be using React Router as a library with declarative routing. However, later I will show you how to use it as a framework within a different project. It's important to note that since it's a "framework", it will have a different file structure and some different conventions. But the core concepts are the same.

#### TanStack

TanStack has really gained traction over the past year or so. It is a collection of open-source tools and libraries that work well together. This includes TanStack Router, which can be used as file-based or traditional SPA routing. TanStack Query, which was formerly React Query, is a library for data fetching, caching and synchronization. TanStack Form for handing forms. There are some other tools as well. TanStack can be a great option and we may look at that later in the course.

#### Next.js & File-Based Routing

As we talked about earlier in the course, there are many different environments to run React in. Next.js is another meta framework that has its own routing system built in. It uses file-based routing, which means that the file structure of your project determines the routes of your application. This is a great way to organize your code and make it easy to understand. However, it does have some limitations and is not as flexible as using a library like React Router or TanStack. It is nice to not have to worry about routing at all other than how you create your files.

I would say that these are the most common. But here are some other solutions that you could use:

##### Wouter

- Minimalist routing for React — only a few KB.
- Uses hooks like useLocation() and useRoute().
- Great for small apps or when you want full control.

#### Universal Router

- Framework-agnostic routing engine — used with React, Vue, etc.
- Super customizable and unopinionated.
- Not React-specific, but works with React.

Reach Router is another one but I think it's deprecated now. Unless you're using someting like Next.js, Gatsby or Astro, you'll probably be using React Router or TanStack.

In the next few lessons, we will be using React Router's "declarative mode" within our Crypto Dash application.
