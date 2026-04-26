# Submit Rating

Now that we have gone over events, state, props, nesting components and more, let's expand on the rating UI a bit more so you can see how everything fits together.

Let's make it so we have a submit button to submit the rating and then have a custom modal component that pops up when the rating is submitted.

First, let's add a new piece of state to show if the rating has been submitted or not. Add the following to the `Rating` component:

```jsx
const [submitted, setSubmitted] = useState(false);
```

We are setting the default value to `false` because the rating has not been submitted yet.

This is how you need to think your application. You need to think about what state you need to keep track of and what the default value should be and what should happen when the state changes. This may seem really confusing right now but don't worry it will become more clear as you build more projects.

Now let's add a submit button to the `Rating` component right above the last closing div:

```jsx
{
  /* Submit Button */
}
<button className='submit-btn' onClick={handleSubmit} disabled={rating === 0}>
  Submit
</button>;
```

We need to do a few things. First, you will get an error because we are pointing to a function that does not exist yet. Let's add the `handleSubmit` function right above the `return` statement:

```jsx
const handleSubmit = () => {
  if (rating > 0) {
    setSubmitted(true);
  }
};
```

We are checking to see if the rating is greater than 0. If it is, we are setting the submitted state to `true`. If it is not, we are not setting the submitted state to `true`. This is a good user experience because it lets the user know that they need to rate the product before they can submit the rating.

Let's also add some styling to the button. Open your `index.css` file and add the following:

```css
/* Submit Button */
.submit-btn {
  margin-top: 15px;
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  border-radius: 5px;
}

.submit-btn:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}
```

Notice that the button is disabled. This is because the rating is at the default 0. We can't submit a rating of 0. We need to have a rating of at least 1 to submit. This is why we are disabling the button when the rating is 0. This is a good user experience because it lets the user know that they need to rate the product before they can submit the rating. Once you select a star, the button will no longer be disabled.

## Modal

Let's add the modal right under the submit button:

```jsx
{
  /* Modal */
}
{
  submitted && (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>Thank You!</h2>
        <p>
          You rated us {rating} star{rating > 1 ? 's' : ''}!
        </p>
        <button className='close-btn' onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}
```

We opened some curly braces because we need to check to see if the rating has been submitted. If it has, we will show the modal. If it has not, we will not show the modal. We are using the `&&` operator to check if the `submitted` state is `true`. If it is, we will show the modal. If it is not, we will not show the modal. This is called short-circuiting. If the first condition is `false`, the second condition will not be checked. We could just as well use a ternary operator here but the `&&` operator is more concise.

Let's add a bit of CSS in the `index.css` file:

```css
/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  width: 300px;
}

.modal h2 {
  margin-bottom: 15px;
  color: #333;
}

.close-btn {
  margin-top: 15px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  border-radius: 5px;
}

.close-btn:hover {
  background-color: darkred;
}
```

We also need to create the `closeModal` function. Add the following function right above the `return` statement:

```jsx
const closeModal = () => {
  setSubmitted(false);
  setRating(0); // Optional: Reset rating after submission
};
```

This will set the submitted state back to false and reset the rating back to 0. This is optional. You may want to keep the rating after submission. It is up to you.

The modal is not showing because the submitted state is `false`. Try and rate and click the submit button. You should see the modal pop up. Click the close button to close the modal.

In the next lesson, I am going to give you a challenge and have you move the modal to it's own component. This will help you understand how to break down your UI into smaller, more reusable components.
