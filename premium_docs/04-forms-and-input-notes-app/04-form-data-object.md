# Form Data Object

We have our 3 controlled input fields and we have a piece of state for each one. If you have a ton of inputs, this can get out of hand quickly. We can use a `formData` object to help us manage our form data. So instead of having a piece of state for each input, we can have one piece of state that is an object that contains all of our form data. We still have to update it when we change the input, but it's a little more manageable.

In the `NoteForm` component, we can create a `formData` object for the state. Replace the `title`, `category`, `priority`, and `desciption` state with a `formData` object.

```jsx
const [formData, setFormData] = useState({
  title: '',
  category: 'Work',
  priority: 'Medium',
  description: '',
});
```

Now we have an issue because our input handlers are calling the set functions that no longer exist. We need to update our input handlers to use the `setFormData` function and update the `formData` object. We don't want to do it directly in the `onChange` event handler because there are some other things we need to do in addition to updating the `formData` object. Let's create a function above the return statement and just log the value for now.

```jsx
// Handle input changes
const handleChange = (e) => {
  console.log(e.target.value);
};
```

Because this function is an event handler, we have access to the event object. We can log the value of the input field by using `e.target.value`.

We can also get the name of the input field by using `e.target.name`. We can use this to determine which property of the `formData` object to update.

```jsx
// Handle input changes
const handleChange = (e) => {
  console.log(e.target.name, e.target.value);
};
```

Now we can update the `onChange` event handlers to call the `handleChange` function.

```jsx
<input
  type='text'
  name='title'
  value={formData.title}
  onChange={handleChange}
  placeholder='Title'
/>
```

Do this for all of the fields.

We also have to take into account that the value is in an object called `formData`. So we need to update the values to `formData.title`, `formData.category`, `formData.priority`, and `formData.description`.

Now we go back to not being able to type in the input fields. This is because we are not updating the state of the inputs.

You should see the field name and the first letter you type in the input field. This is because we are logging the value of the input field but we are not updating the state, so React is not re-rendering the component.

## Updating an Object in State

We need to update the `formData` object when we type in the input fields. We can use the spread operator to copy the existing `formData` object and then update the property that we want to change. We can use the `name` attribute on the input fields to determine which property to update.

```jsx
// Handle input changes
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
```

Now you should be able to type. You can check the devtools for the state update as well.

The reason that we put the `e.target.name` in square brackets is because we want to use the value of the `name` attribute as the key in the object. Without the brackets, it would be looked at as a string and we would get an error.
