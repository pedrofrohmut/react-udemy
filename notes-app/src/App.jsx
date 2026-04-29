import { FaStickyNote } from 'react-icons/fa'
import NoteForm from './components/NoteForm'
import { useState } from 'react'
import NoteList from './components/NoteList'

const App = () => {
  const [notes, setNotes] = useState([])

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(x => x.id !== noteId))
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold mb-4 text-center text-purple-500">
        <FaStickyNote className="relative top-[2px]"/> Notes App
        </h2>
      <NoteForm notes={notes} setNotes={setNotes} />
      <NoteList notes={notes} handleDeleteNote={handleDeleteNote} />
    </div>
  )
}

export default App
