# Component Composition

Components can be nested inside other components. This is a powerful feature of React that allows you to create complex UIs from simple building blocks. Component composition is the practice of breaking down your UI into smaller, reusable components. This makes your code easier to read and maintain. Let's make the stars their own component.

We are looping over the numbers 1 through 5 and outputting a span with a bunch of attributes. Let's make that span its own component.

Create a new file at `src/components/Star.jsx` and add the following code:

```jsx
const Star = ({
  star,
  hover,
  rating,
  color,
  ratingClick,
  hoverEnter,
  hoverLeave,
}) => {
  return (
    <span
      className='star'
      style={{ color: star <= (hover || rating) ? color : '#ccc' }}
      onClick={() => ratingClick(star)}
      onMouseEnter={() => hoverEnter(star)}
      onMouseLeave={hoverLeave}
    >
      {'\u2605'}
    </span>
  );
};

export default Star;
```

We need to keep the rating and hover states as part of the parent component. So that means that we need to pass those in as props. We also need to pass in the `star` prop so that the component knows which star it is rendering.

We also passed in some functions as props to run with the event handlers.

Now in the `Rating` component, we can import the `Star` component:

```jsx
import Star from './Star';
```

Now instead of rendering a span, we can render the `Star` component:

```jsx
{
  [1, 2, 3, 4, 5].map((star) => (
    <Star
      key={star}
      star={star}
      hover={hover}
      rating={rating}
      color={color}
      ratingClick={setRating}
      hoverEnter={setHover}
      hoverLeave={() => setHover(null)}
    />
  ));
}
```

If you go to the page, you should see the same thing, but now we have broken things down into smaller, more reusable components. This makes our code easier to read and maintain.

