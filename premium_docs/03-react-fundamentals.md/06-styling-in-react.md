# Styling In React

There are many different ways to syle your components in React. You could use plain CSS, CSS modules, a framework like Tailwind, styled-components, or a CSS-in-JS library like Emotion. There are also complete UI libraries like Material-UI, Chakra UI, which give you pre-styled components that you can use out of the box. Things like cards, buttons, and modals are already styled for you. We'll be using one of these in a later project.

For now, I want to show you how to use plain CSS to style your components.

## `style` Attribute

Let's look at the simplest way to style a component in React. You can use the `style` attribute to add inline styles to your components. Add the following to your `Rating` component:

```jsx
const Rating = () => {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', padding: '20px' }}>
      <h2>Rate Your Experience</h2>
    </div>
  );
};
```

This is how you can use the `style` attribute to add inline styles to your components. Notice the double curly braces. That's because we are setting the value to be dynamic, which is one set of curly braces in JSX. The inner set of curly braces is an object.

You can pass an object with CSS properties and values. The keys are camelCased versions of the CSS properties.

This is not very scalable. Another thing you could do is create a separate object with the styles and pass it to the `style` attribute. This way, you can reuse the styles in multiple components.

Add this right above the export and under the Rating component:

```jsx
const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial',
    padding: '20px',
  },
};
```

Now add the `styles.container` object to the `style` attribute:

```jsx
const Rating = () => {
  return (
    <div style={styles.container}>
      <h2>Rate Your Experience</h2>
    </div>
  );
};
```

This is a better way to style your components.

## External Stylesheets & Classes

Another way to style your components is by using external stylesheets. You can create a CSS file and import it into your component. This is probably the most common way to style your components in React.

It's up to you on how you want to do this. You can create a separate CSS file for each component, or you can have a global CSS file that styles all your components. We already have a global CSS file in the `src` directory called `index.css`.

Let's add the following to that file:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0080ff;
}

.rating-container {
  text-align: center;
  padding: 40px 30px;
  border: 1px solid #ddd;
  width: 400px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stars {
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 2rem;
  cursor: pointer;
  margin: 15px;
}

.star {
  transition: color 0.2s ease-in-out;
  color: #ccc;
}

.star.active {
  color: gold;
}

.feedback {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}
```

The CSS is pretty self-explanatory. We have a container class for the `Rating` component, a class for the stars, a class for the active star, which makes it gold and a class for the feedback message.

Now, let's apply the container class in the `Rating` component. Remember, we have to use the `className` attribute in JSX instead of `class`:

```jsx
const Rating = () => {
  return (
    <div className='rating-container'>
      <h2>Rate Your Experience</h2>
    </div>
  );
};
```

This is how you can use external stylesheets to style your components in React.

In the next lesson, we'll look at crating lists.
