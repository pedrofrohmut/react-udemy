# Lists

In React, you can create lists using the map method. A list is simply a group of items and usually, you're going to render some kind of JSX output per item. If you're not familiar with the `.map` method, you can watch the "Array Methods" video in the last section.

We want to display a star icon for each rating number (1 through 5). To do this, we'll create an array of numbers from 1 to 5 and use map to render a star icon for each number. We'll use the Unicode value \u2605 to render a star symbol (★). You could also use an image, SVG, or icon library if you prefer.

Add the following code below the <h2> element in the Rating component:

```jsx
<div className='stars'>
  {[1, 2, 3, 4, 5].map((star) => (
    <span>{'\u2605'}</span>
  ))}
</div>
```

We wrapped the JavaScript expression in curly braces so we can use it inside JSX. For each number in the array, we render a <span> with a star. This is a simple example, but map is powerful — you can render full components with dynamic data using the same pattern.

## Key Prop

When you create a list in React, you should give each element a key prop. This is a unique identifier that helps React know which items changed, were added, or were removed between renders.

Update your code to include a key:

```jsx
<div className='stars'>
  {[1, 2, 3, 4, 5].map((star, index) => (
    <span key={star} className='star'>{'\u2605'}</span>
  ))}
  </div>
```

In this case, we are using the rating number itself. Usually, we are iterating over an array of objects, usually coming from a database and in that case, we would use the ID.

## A Note On Index As Key

You can also pass a second argument to map, which gives you the index of the current item:
```jsx
<div className='stars'>
  {[1, 2, 3, 4, 5].map((star, index) => (
    <span key={index} className='star'>{'\u2605'}</span>
  ))}
  </div>
```

This works, but using the index as the key is generally not recommended — especially if the list can change order or be filtered, as it can lead to bugs or performance issues. I will put it back to `star`


You should now see the stars on the page.

We can certainly show the stars like this by hardcoding the array, but you may want to be able to customize the number of stars. So what we can do is the following:

```js
const Rating = () => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="rating-container">
      <h2>Rate Your Experience</h2>
      <div className="stars">
        {stars.map((star) => (
          <span key={star} className="star">
            {'\u2605'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
```

Here, we create the array above the return using the Array.from() method.  `{ length: 5 }` creates a placeholder for an array with 5 empty slots. `(_, i) => i + 1` is a mapping function that uses an underscore as a placeholder and the `i` is the index. So it creates an array of 1-5. This obviously has nothing to do with React, it's JavaScript.

But now we can easily change the number of stars if needed.

In the next lesson, we will look at how to handle events in React.
