import Note from "./Note"

const NoNotes = () => <p className="text-center text-gray-500">No notes yet.</p>

const NoteList = ({ notes, handleDeleteNote }) => {
  if (notes.length == 0) return <NoNotes />
  return (
    <div className="space-y-4">
      {notes.map(note => (
        <Note key={note.id} note={note} handleDeleteNote={handleDeleteNote} />
      ))}
    </div>
  )
}

export default NoteList
