# Prop Drilling

There are a few things I want to do and talk about in this lesson. Right now, we have our global state in the `App.jsx` file. We are passing the `notes` state and the `setNotes` function down to the `NoteForm` and `NoteList` components as props. This is fine. In fact, this is what I would suggest with this project so far. However, as we add more components, we will run into a problem called prop drilling. This is when we have to pass props down through multiple levels of components. This can get messy and make our code harder to read and maintain. That's where the Context API or a third-party state ,manager like Redux comes in. We'll get into those later on. For now, I want to show you how prop drilling works.

Let's create a component for the individual notes. Create a new file in the `components` folder called `Note.jsx`. In this file, add the following code:

```jsx
const Note = ({ note, deleteNote }) => {
  return (
    <div
      key={note.id}
      className='p-4 bg-white rounded-lg shadow-md border-l-4'
      style={{
        borderLeftColor:
          note.priority === 'High'
            ? 'red'
            : note.priority === 'Medium'
            ? 'orange'
            : 'green',
      }}
    >
      <h3 className='text-lg font-bold'>{note.title}</h3>
      <p className='text-sm text-gray-600'>
        <strong>Category:</strong> {note.category}
      </p>
      <p className='text-sm text-gray-600'>
        <strong>Priority:</strong> {note.priority}
      </p>
      <p className='mt-2'>{note.description}</p>

      <button
        className='mt-3 text-red-500 hover:text-red-700 cursor-pointer transition'
        onClick={() => deleteNote(note.id)}
      >
        🗑 Delete
      </button>
    </div>
  );
};

export default Note;
```

We are passing in the note as a prop and we are passing in the `deleteNote` function as a prop. We are using the `note` prop to display the note data and the `deleteNote` function to delete the note. Now, in the `NoteList.jsx` file, we can import the `Note` component and use it to display the notes. Update the `NoteList.jsx` file to look like this:

```jsx
import Note from './Note';
```

Repplace the JSX that the `map` returns with the `Note` component:

```jsx
{
  notes.map((note) => (
    <Note key={note.id} note={note} deleteNote={deleteNote} />
  ));
}
```

This really cleans up the `NoteList` component.

Where we are starting to see prop drilling is in the `App.jsx` file. We are passing the `deleteNote` function down to the `NoteList` component. Then we are passing it down to the `Note` component. This is fine for now, but if you're drilling more than 2 levels, I would suggest looking into using the Context API or a third-party state manager like Redux.

Okay, so we have our notes app, but the notes are not persisting. If we refresh the page, the notes are gone. We need to save the notes to local storage so they persist. To do this, we can use the localstorage API along with a hook called `useEffect`. Before we add that to this project, I want to really dig into what are called "side effects" as well as the lifecycle of a component. So you can shut down the server for the notes app for now but keep it handy because we will be coming back to it soon.
