# Delete Notes

Now that we can add new notes, let's add the ability to delete notes from the list. This will just be within the UI. We won't be deleting notes from a database or anything like that. We'll get more into that stuff later on.

## Delete Button

Add a delete button to the note. Open the `NoteList.jsx` file and add a button under the paragraph with the description:

```jsx
<button
  className='mt-3 text-red-500 hover:text-red-700 cursor-pointer transition'
  onClick={() => deleteNote(note.id)}
>
  🗑 Delete
</button>
```

This button will call the `deleteNote` function when clicked. We'll define this function in the `App.jsx` file. The reason for this is that we want all functions that have to do with the notes to be in the same file.

In the `App.jsx` file, add the `deleteNote` function:

```jsx
// Handle deleting a note
const deleteNote = (id) => {
  setNotes(notes.filter((note) => note.id !== id));
};
```

We are using the `filter` method to create a new array that doesn't include the note with the id that we want to delete. This new array is then set as the new state for the `notes` variable.

Now pass the `deleteNote` function to the `NoteList` component as a prop:

```jsx
<NoteList notes={notes} deleteNote={deleteNote} />
```

In the `NoteList` component, destructure the `deleteNote` prop:

```jsx
const NoteList = ({ notes, deleteNote }) => {
```

Now you should be able to delete notes from the list by clicking the delete button.
