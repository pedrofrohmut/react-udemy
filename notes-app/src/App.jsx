import { FaStickyNote } from 'react-icons/fa'
import NoteForm from './components/NoteForm'

const App = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="flex items-center justify-center gap-2 text-2xl font-bold mb-4 text-center">
        <FaStickyNote className="relative top-[2px]"/> Notes App
      </h2>
      <NoteForm />
    </div>
  )
}

export default App
