# Show Notes

Now that we have our form that updates our state, we can now show the notes that we have added. We will create a new component called `NoteList` that will display the notes that we have added.

Create a new file at `src/components/NoteList.js` and add the following code:

```jsx
const NoteList = ({ notes }) => {
  return (
    <div className='space-y-4'>
      {notes.length === 0 ? (
        <p className='text-center text-gray-500'>No notes yet!</p>
      ) : null}
      {notes.map((note) => (
        <div
          key={note.id}
          className='p-4 bg-white rounded-lg shadow-md border-l-4'
        >
          <h3 className='text-lg font-bold'>{note.title}</h3>
          <p className='text-sm text-gray-600'>
            <strong>Category:</strong> {note.category}
          </p>
          <p className='text-sm text-gray-600'>
            <strong>Priority:</strong> {note.priority}
          </p>
          <p className='mt-2'>{note.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
```

In this component, we are mapping through the `notes` array that is passed in as a prop and displaying each note in a `div` element. We are also checking if there are no notes yet and displaying a message if that is the case.

Now, let's import and use this component in our `App.jsx` file:

```jsx
import { useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  const [notes, setNotes] = useState([]);

  return (
    <div className='max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>📝 Notes App</h2>
      <NoteForm notes={notes} setNotes={setNotes} />
      <NoteList notes={notes} /> // Add this line
    </div>
  );
};

export default App;
import { useState } from 'react';
```

Now add some notes and they will show in the list below the form. If you refresh, they will go away because we have not persisted the notes anywhere. Later on we will add them to local storage.

In the next lesson, we will add the ability to delete notes from the UI.
