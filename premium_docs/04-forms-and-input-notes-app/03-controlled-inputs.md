# Controlled Inputs

In React, there are two ways to handle form inputs: controlled and uncontrolled components. In this project, we’ll focus on controlled inputs.

## Controlled Inputs

Let's talk about controlled inputs first because that's what we're going to be mostly focused on in this project. A controlled input is a form element (like a text field or select box) whose value is managed by React state.

Instead of the browser keeping track of the value, React does — so every change updates state, and that state controls what shows in the input.

Now, why is this useful? Well, with controlled inputs, you can do cool things like:

- Real-time validation—like checking password strength as the user types
- Auto-formatting input—for example, automatically adding dashes in a phone number
- Keeping data even if the input disappears—since the value is stored in state, it’s not lost if the input temporarily unmounts.

So, while controlled inputs might take a little extra setup, they give you way more power and flexibility over how forms behave in React." 🚀

## Uncontrolled Inputs

Uncontrolled inputs, on the other hand, are form elements where React does not manage the input's state. Instead, the DOM handles the data, just like in plain HTML.

Instead of using `useState` to track the value, you use a `ref` to access the value only when you need it, like when the form is submitted. We will get into refs later in the next section.

## Form Component

Let's first create a component to hold our form, rather than putting it directly in the `App.jsx` file.

Create a new file called `src/components/NoteForm.jsx` and add the following code:

```jsx
const NoteForm = () => {
  return <>Note Form</>;
};

export default NoteForm;
```

I just want to get it displayed. Now, import the `NoteForm` component into the `App.jsx` file and render it:

```jsx
import NoteForm from './components/NoteForm';

const App = () => {
  return (
    <div className='max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>📝 Notes App</h2>
      <NoteForm />
    </div>
  );
};

export default App;
```

## Add A Controlled Input

Let's add a controlled input for the note title. We'll start by adding a state to hold the title value.

In the `NoteForm.jsx` file, add the following code right above the return statement:

```jsx
const [title, setTitle] = useState('');
```

We added a piece of state for the title of the note, which will be bound to an input field.

Be sure to import the useState hook at the top of the file:

```jsx
import { useState } from 'react';
```

This is the idea is we have a piece of state for all of the form inputs.

Let's create a form and add the input for the title. Add this to the return statement in the `NoteForm.jsx` file:

```jsx
return (
  <form className='mb-6'>
    <div className='mb-4'>
      <label className='block font-semibold'>Title:</label>
      <input
        type='text'
        name='title'
        value={title}
        className='w-full p-2 border rounded-lg'
        required
      />
    </div>
  </form>
);
```

You should see the input on the page, but you'll notice it won't let you type in it. If you open the console, you'll see an error like this:

```
hook.js:608 You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
```

We made this a controlled component by setting the `value` prop to the `title` state. But with a controlled component, you need to make sure that you upate that state whenever you type into the input. Let's open the devtools and click on the "component" tab and click on the `NoteForm` component. You'll see the `title` state under "hooks". It is an empty string. We need that to update as we type.

## Handle Input Change

We update the input state with an `onChange` event handler. Add the following to the input element in the `NoteForm.jsx` file:

```jsx
<input
  type='text'
  name='title'
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className='w-full p-2 border rounded-lg'
  required
/>
```

Now, when we type in the input, the `title` state updates with the new value. You can see this in the devtools. This happens because we're calling the `setTitle` function with the new value from the input. We get whatever is typed in the input with `e.target.value`.

The input is bound to the state. If you change the initial state for the title, it will reflect in the input.

You could also put `{title}` anywhere in your component to show the value of the title state as you type.

This is a controlled input. We're controlling the input value with React state. 🎉

Let's add three more fields. A category, priority and a description field. Add the following code to the `NoteForm.jsx` file to add the state:

```jsx
const [category, setCategory] = useState('Work');
const [priority, setPriority] = useState('Medium');
const [description, setDescription] = useState('');
```

Category and priority will be select fields so I am adding a default value for them. The description is a textarea field.

Now add the fields:

```jsx
 <div className='mb-4'>
      <label className='block font-semibold'>Priority:</label>
      <select
        name='priority'
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className='w-full p-2 border rounded-lg'
      >
        <option value='High'>🔴 High</option>
        <option value='Medium'>🟠 Medium</option>
        <option value='Low'>🟢 Low</option>
      </select>
    </div>

     <div className='mb-4'>
        <label className='block font-semibold'>Category:</label>
        <select
          name='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='w-full p-2 border rounded-lg'
        >
          <option value='Work'>📂 Work</option>
          <option value='Personal'>🏠 Personal</option>
          <option value='Ideas'>💡 Ideas</option>
        </select>
      </div>

    <div className='mb-4'>
      <label className='block font-semibold'>Description:</label>
      <textarea
        name='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full p-2 border rounded-lg'
        required
      ></textarea>
    </div>
```

You should see the form with all the fields.

We have our inputs as their own state, however, you may be creating a form with many fields. You could create a single state object to hold all the form values. This way, you only need to update one state object instead of multiple states. We will look at that next.
