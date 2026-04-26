# Creating Components

In React, everything is a component. Components are the building blocks of a React application. A component is a reusable piece of code that defines how a part of the user interface should look and behave. Components can be nested inside other components to create complex user interfaces.

For our little feedback app, I don't want to put all of our code into the main App component, so let's create a new "Rating" component.

You can even create the component, which is just a function, in the same file. Usually, you will want to create a new file for each component. But let's start with creating the component in the same file.

Add the following above the `App` function in the `App.jsx` file:

```jsx
const Rating = () => {
  return (
    <div>
      <h2>Rate Your Experience</h2>
    </div>
  );
};
```

## Embedding Components

Right now, the rating component will not show. We need to embed it in the main `App` component. Add the `Rating` component inside the `App` component:

```jsx
function App() {
  return (
    <div>
      <Rating />
    </div>
  );
}
```

You should now see the "Rate Your Experience" heading when you open the app in your browser. If you don't see it, make sure you saved all of your files and that the development server is running.

Components are also reusable. You can embed the `Rating` component multiple times if you wanted. Try the following:

```jsx
function App() {
  return (
    <div>
      <Rating />
      <Rating />
      <Rating />
    </div>
  );
}
```

You should now see three "Rate Your Experience" headings in the browser. Obviously, this is not useful here, but there will be times where you want to reuse a component multiple times. You can delete the extra `Rating` components.

## Creating a New File for the Component

Create a new folder in the `src` directory called `components`. Inside the `components` folder, create a new file called `Rating.jsx`. This file will contain the code for our rating component. Naming convention for React components is to use PascalCase, so the file name should start with an uppercase letter. I should also mention that you have a few options when it comes to file extensions for React components. You can use `.js`, `.jsx`, or `.tsx`. I prefer to use `.jsx` for components that don't use TypeScript and `.tsx` for components that do use TypeScript. It doesn't reall matter, I just think it's a little more clear that this is a component that returns JSX.

Cut the `Rating` component from the `App.jsx` file and paste it into the `Rating.jsx` file. be sure to export the component at the end of the file:

```jsx
const Rating = () => {
  return (
    <div>
      <h2>Rate Your Experience</h2>
    </div>
  );
};

export default Rating;
```

Now you need to import the `Rating` component in the `App.jsx` file:

```jsx
import Rating from './components/Rating';
```

Now it should work the same as before. You should see the "Rate Your Experience" heading in the browser.

In the next lesson, we will talk about styling in React.
