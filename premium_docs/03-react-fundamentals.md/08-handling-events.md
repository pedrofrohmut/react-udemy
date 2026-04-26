# Handling Events in React

Handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:

1. React events are named using camelCase, rather than lowercase.
2. With JSX you pass a function as the event handler, rather than a string.

For example, the HTML:

```html
<button onclick="activateLasers()">Activate Lasers</button>
```

is slightly different in React:

```jsx
<button onClick={activateLasers}>Activate Lasers</button>
```

As far as the types of events that are available, React has a synthetic event system that wraps the native events. This means that the events are consistent across different browsers.

Here are some of the more common events

- `onClick`
- `onSubmit`
- `onFocus`
- `onBlur`
- `onChange`
- `onMouseOver`
- `onMouseOut`
- `onKeyDown`
- `onKeyPress`
- `onKeyUp`
- `onLoad`
- `onError`
- `onResize`
- `onScroll`
- `onWheel`
- `onCopy`
- `onCut`
- `onPaste`
- `onDoubleClick`
- `onDrag`
- `onDragEnd`
- `onDragEnter`
- `onDragExit`

Let's add an event handler on the star

```jsx
<span key={star} className='star' onClick={clicked}>
```

This will call the `clicked` function when the star is clicked.

Let's add a function within the `Rating` component to handle the click event

```jsx
const clicked = () => console.log('clicked');
```

It is very common to have a function within the component function to handle the event. This is because the function will have access to the component's state and props, which we will get to soon.

## Passing Arguments to Event Handlers

If you need to pass arguments to an event handler, you can do so by using an arrow function. For example, if you want to pass the `star` value to the `clicked` function, you can do so like this:

```jsx
<span key={star} className='star' onClick={() => clicked(star)}>
```

Now update the `clicked` function to accept the `star` value as an argument

```jsx
const clicked = (star) => console.log('clicked', star);
```

Click on the stars and you should see the star value in the console.

Let's add a couple more event handlers:

```jsx
<span
  key={star}
  className='star'
  onClick={() => clicked(star)}
  onMouseEnter={() => hovered('enter')}
  onMouseLeave={() => hovered('leave')}
>
  {'\u2605'}
</span>
```

Now add the following function:

```jsx
const hovered = (direction) => console.log('hovered', direction);

If you are passing an argument, you need to put the event handler function in an arrow function or else it will call when the page loads.
```

Now you should see when you enter and leave a star.

We can delete the 2 functions and the event handlers for now so it looks like this:

```jsx
const Rating = () => {
  return (
    <div className='rating-container'>
      <h2>Rate Your Experience</h2>
      <div className='stars'>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className='star'>
            {'\u2605'}
          </span>
        ))}
      </div>
    </div>
  );
};
```

In the next lesson, we will start to talk about state.
