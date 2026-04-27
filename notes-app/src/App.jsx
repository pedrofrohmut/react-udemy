import { FaStickyNote } from 'react-icons/fa'
import NoteForm from './components/NoteForm'
import { useState } from 'react'

const App = () => {
  const [notes, setNotes] = useState([])

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="flex items-center justify-center gap-2 text-2xl font-bold mb-4 text-center">
        <FaStickyNote className="relative top-[2px]"/> Notes App
      </h2>
      <NoteForm notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App
