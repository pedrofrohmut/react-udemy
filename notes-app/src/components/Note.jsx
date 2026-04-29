import { FaTrash } from "react-icons/fa6"

const Note = ({ note, handleDeleteNote }) => {
  const borderColor = priority => {
    switch (priority) {
      case "high":
        return "border-red-500"
      case "medium":
        return "border-yellow-400"
      case "low":
        return "border-green-500"
      default:
        return ""
    }
  }

  return (
    <div key={note.id} className={`p-4 bg-white rounded-lg shadow-md border-l-5 ${borderColor(note.priority)}`}>
      <h3 className="text-lg font-bold">{note.title}</h3>

      <p className="text-sm text-gray-600">
        <strong>Category:</strong>
        {` ${note.category}`}
      </p>

      <p className="text-sm text-gray-600">
        <strong>Priority:</strong>
        {` ${note.priority}`}
      </p>

      <p className="mt-2">{note.description}</p>

      <button
        onClick={() => handleDeleteNote(note.id)}
        className="mt-3 text-red-500 cursor-pointer transition hover:text-red-700 flex items-center gap-2"
      >
        <FaTrash /> Delete
      </button>
    </div>
  )
}

export default Note
