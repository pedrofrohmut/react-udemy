# Make Form Collapsible

Our form is kind of large. Let's make the form collapsible. This will give use some more experience with state and conditional rendering.

Open the `NoteForm.jsx` file and add a new state property `isFormVisible` and set it to `true`.

```jsx
const [isFormVisible, setIsFormVisible] = useState(false);
```

We set it to false by default so that the user has to click a button to open it. Let's create the button.

Add a wrapping div to the output and add the button above the form:

```jsx
<div>
  {/* Toggle Button */}
  <button
    onClick={() => setIsFormVisible(!isFormVisible)}
    className='w-full bg-gray-100 border border-gray-300 text-purple-800 py-2 rounded-lg cursor-pointer hover:bg-purple-200 hover:border-purple-300 transition mb-4'
  >
    {isFormVisible ? 'Hide Form ✖️' : 'Add New Note ➕'}
  </button>

  {/* Form */}
  {/* .... */}
</div>
```

When we click the button, we toggle the `isFormVisible` state. If it's true, we show the 'Hide Form' text and if it's false, we show the 'Add New Note' text.

Now we just need to only show the form when `isFormVisible` is true. We can do this by wrapping the form in a ternary operator or by using the `&&` operator.

```jsx
{
  isFormVisible && <form onSubmit={handleSubmit} className='mb-6'></form>;
}
```

Now you can toggle the form with the button.

We also want the button to collapse after submission. We can do this by setting `isFormVisible` to false in the `handleSubmit` function.

```jsx
const handleSubmit = (e) => {
  //..

  // Hide form after submission
  setIsFormVisible(false);
};
```

You can see how much control we have over the UI with React. We can easily show and hide elements based on user interaction.
