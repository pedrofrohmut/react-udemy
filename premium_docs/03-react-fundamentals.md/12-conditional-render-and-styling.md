# Conditional Render & Styling

In many cases, you will want to have a different class or style applied to an element based on some condition. In React, you can do this by using a ternary operator to conditionally apply a class or style.

In our project, the `star` class is applied to all the stars in the list. This makes them all light gray. However, if we hover over or select a star, we want to color the stars gold. We can achieve this by conditionally applying the `active` class to the stars based on whether they are selected or not.

If you remember, in our CSS, we have the following:

```css
.star.active {
  color: gold;
}
```

Let's add the following to the `span` element:

```jsx
 className={`star ${star <= (hover || rating) ? "active" : ""}`}
```

We use backticks to that we can use the template literal syntax. We us the class `star` no matter what. Then we use the `${}` syntax to evaluate the expression inside the curly braces. We check if the `star` is less than or equal to the `hover` or `rating`. If it is, we apply the `active` class. If not, we apply an empty string, which does nothing.

Now you should see the stars change color when you hover over them or select them.

You can now get rid of the two paragraphs that display the rating and hover values.

## Feedback Message

I also want to show a feedback message to the user based on the rating.

Let's create an array of feedback messages. 1 for each rating.

Add this abover the return statement:

```jsx
const feedbackMessages = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent'];
```

Let's add the following right above the ending `div` tag:

```jsx
{
  rating > 0 && <p className='feedback'>{feedbackMessages[rating - 1]}</p>;
}
```

Here, we are checking if the rating is greater than 0. If it is, we display the feedback message. We use the `rating - 1` to get the correct index in the `feedbackMessages` array because the index is 0-based so we need to subtract 1 from the rating.

Now when you click a star it will show the message based on the rating.
