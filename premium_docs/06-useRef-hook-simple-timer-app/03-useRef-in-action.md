
# `useRef` In Action

Before we actually start the timer project, I want to show you exactly how the `useRef` hook works.

You can think of it as how you would select a DOM element in vanilla JS with something like `document.querySelector` and then you could access all the DOM methods and properties on it such as the value, methods like `focus()` and so on.

As far as forms go, we already focused on controlled components—where the form input values are tied to React state and updated with every keystroke. This gives us full control, but it also means we need a useState hook for each input, plus onChange handlers to update the state.

But there's another way to handle form inputs: uncontrolled components.

With uncontrolled components, the form elements manage their own state internally—just like they would in plain HTML. Instead of syncing the value to React state, we use a ref to access the value when we need it.

This is useful in scenarios where:

    - You don't need real-time validation or control

   - You just need to grab the input value when submitting a form

    - You want to avoid extra re-renders caused by state updates

React gives us the useRef hook for exactly this kind of thing.

Let’s look at an example of using useRef to access an input element directly—no useState, no onChange. Just raw DOM access the React way.

Let's open the `App.jsx` file of the project we created in the last lesson.

Add the following to the `App.jsx` file:

```jsx
import { useRef } from 'react';

const App = () => {

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg text-center'>
      <h2 className='text-2xl font-bold mb-4'>useRef Example</h2>

      <input
        type='text'
        placeholder='Type something...'
        className='w-full p-2 border rounded-lg'
      />

      <button
        className='mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Submit
      </button>
    </div>
  );
};

export default App;

```

We just have a simple input field and a button. 

Let's import the `useRef` hook from React and create a reference to the input field.

```jsx
import { useRef } from 'react';
```

Add this just above the return:

```jsx
const inputRef = useRef(null);
```

What we are doing here is creating a reference to the input field. We are setting the initial value to `null` because we don't have the input field yet. We will assign the reference to the input field in the JSX.

Let's just add a console log to see what the `inputRef` is.

```jsx
console.log(inputRef);
```

It should log an object with a `current` property set to `null`. The reason that it is in a `current` property is because this is how React keeps the reference mutable without triggering re-renders. This object is stable across re-renders — meaning it doesn’t change identity like a new object would. So when you assign something to inputRef.current, React won’t re-render the component. Think of useRef() as a little container with one slot (.current). You can update what's in that slot anytime, and React won’t care or re-render.

The `current` property is where the reference to the input field will be stored.

Add the `ref` attribute to the input field and assign the `inputRef` to it.

```jsx
<input
  type='text'
  placeholder='Type something...'
  className='w-full p-2 border rounded-lg'
  ref={inputRef}
/>
```

We now have a reference to the input field.

Let's add an `onClick` event to the button and call a function `focusInput`.

```jsx
<button
  className='mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
  onClick={submit}
>
```

Add the `submit` function just above the return.

```jsx
const submit = () => {
  console.log(inputRef.current);
};
```

When the button is clicked, the `submit` function is called. We are logging the `current` property of the `inputRef` object. It should log the input element itself. So we have access to all of the input field's properties and methods. This doesn't have to be a form input field. It can be any DOM element. It's just used often with form elements.

Let's make the input focus when the button is clicked.

```jsx
const focusInput = () => {
  inputRef.current.focus();
};
```

This works because we have access to the input's `focus` method. This is not React, `focus` is a method on the DOM element itself.

You can also get the value with the `.value` property:

```js
    console.log(inputRef.current.value);
```

This will give you the value to do what you want with it without having to use the `useState` hook.

### `defaultValue`

If you need to prefill the input with something and it is an uncontrolled component like this, you would use the `defaultValue` attribute like this:

```js
  <input
        type='text'
        placeholder='Type something...'
        className='w-full p-2 border rounded-lg'
        ref={inputRef}
        defaultValue='Hello World'
      />
```

Here are some other things you could do with the ref:

```js
  const submit = () => {
    console.log(inputRef.current);
    console.log(inputRef.current.value);
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = 'red';
    inputRef.current.style.color = 'white';
    inputRef.current.setAttribute('placeholder', 'Updated...');
  };
```

So you see, it brings the element out of React in a sense.

In the next lesson, we will start on the timer.