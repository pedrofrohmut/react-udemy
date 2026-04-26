# React Router Setup

We are going to setup React Router in our Crypto Dash application. This will allow us to create different pages and routes for our application. We will also be able to pass props to the routes, which is a powerful feature of React Router.

Like I said in the last vido, React Router 7 can be used as a library in declarative mode or as a framework. In this project, we are using it in the traditional way as a library. So if you run into older versions of React Router, this is how it will be used. Later on, we're going to create a project using framework mode. This will be a different project and will have a different file structure.

## Router Setup

We already have a good amount of code and state in our `App.jsx` file and we want to keep that state in that file and then pass the values to the new home route as props. So before we do that, I want to go over a simple example and the base syntax of setting up this router.

Let's look at the following code:

<img src="../images/router-app.png" width="600" alt="Router App" />

There are 3 components that we bring in from React Router. `BrowserRouter`, `Routes`, and `Route`. The `BrowserRouter` component is the top-level component that wraps our entire application. It is responsible for keeping the UI in sync with the URL. The `Routes` component is a container for all of our routes. The `Route` component is used to define a single route.

As you can see in the return, `BrowserRouter` wraps the entire application. Inside of that, we have the `Routes` component. Inside of that, we have the `Route` component. The `Route` component has a `path` prop and an `element` prop. The `path` prop is the URL path that we want to match. The `element` prop is the component that we want to render when the path matches. When using declarative mode, you do have to import all the comonents that you want to render on each route. With Framework mode, you do not have to do this. We will look at that later in the course.

We can also use dynamic routes. You can see for the blog post page, there is a `/:id`. This is a dynamic route. This means that when the user navigates to `/blog/1`, the `BlogPost` component will be rendered and the `id` prop will be set to `1`. You can access this value in the `BlogPost` component and use it to fetch data or do whatever you want with it.

So now that you know how routes are defined, let's go ahead and set up our application to use React Router.
