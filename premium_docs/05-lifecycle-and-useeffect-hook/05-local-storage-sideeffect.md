# localStorage Side Effect

Now that you have an understanding of lifecycle and how to use the `useEffect` hook, let's jump back into our Notes app and save the notes to local storage when the notes are updated. You can close down the logger playground.

Open the `App.jsx` file for the notes app. This is where we are keeping our global state for the notes. I want to perform a side effect when the notes are updated. I want to save the notes to local storage. I can do this by using the `useEffect` hook. If we were using class components, we would use the `componentDidUpdate` lifecycle method.

Remember how to perform an update? We do this by adding a dependency array to the `useEffect` hook. This array is the second argument to the `useEffect` hook. When the dependencies change, the effect will run. In this case, I want to run the effect when the notes change. I will add `notes` to the dependency array.

First, import the `useEffect` hook at the top of the `App.jsx` file.

```jsx
import { useEffect, useState } from 'react';
```

Now let's add the useEffect hook to the `App` component. I will add the `useEffect` hook below the `useState` hook.

```jsx
// Save notes to localStorage whenever they change
useEffect(() => {
  localStorage.setItem('notes', JSON.stringify(notes));
}, [notes]);
```

Remember, the `useEffect` runs when the component mounts regardless of the dependencies. In this case, the `useEffect` will run when the component mounts and when the `notes` change. The `useEffect` will save the notes to local storage whenever the notes change.

Right now we are saving the notes to local storage when the notes change. However, we are not loading them. You can open your devtools and click on the Application tab. You will see the notes in local storage when you submit. However when you referesh the page, the notes will disappear. Even from local storage. This may be confusing. What's happening is when we refresh the page, the notes are being reset to the initial state. And remember, the useEffect runs when the notes are updated. So we are essentially overwriting the notes in local storage with the initial state.

To fix this, we need to load the notes from local storage. You may think we should do something like this and add another `useEffect` hook.

```jsx
useEffect(() => {
  const notes = JSON.parse(localStorage.getItem('notes'));
  setNotes(notes);
}, []);
```

However, there is an issue with this because `setNotes` is asynchronous. This means that the notes will not be loaded in time for the `useEffect` to save the notes to local storage. This will cause the notes to be overwritten with the initial state. To fix this, we can make the initial state from the `useState` hook a function that returns the notes from local storage.

```jsx
const [notes, setNotes] = useState(() => {
  const notes = JSON.parse(localStorage.getItem('notes'));
  return notes || [];
});
```

We are using a function to set the initial state. This function will run once when the component mounts. This will allow us to load the notes from local storage before the `useEffect` hook runs. Now the notes will be loaded from local storage when the component mounts and saved to local storage when the notes change.

You'll notice that when you delete a note it also updates in local storage. This is because the `useEffect` hook runs when the notes change. When a note is deleted, the notes change and the `useEffect` hook runs. The notes are then saved to local storage. This is easier than trying to figure out when a note is deleted and updating local storage yourself.

I know that this stuff can be a bit confusing. But with practice, you will get the hang of it.
