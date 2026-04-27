import { useState } from "react"
import { FaPaperPlane } from "react-icons/fa"

const NoteForm = () => {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [category, setCategory] = useState("Work")
  const [description, setDescription] = useState("")

  return (
    <form className="mb-6">
      {/* Title */}
      <div className="mb-4">
        <label className="block font-semibold" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block font-semibold" htmlFor="priority">
          Priority
        </label>
        <select className="w-full p-2 border rounded-lg" value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block font-semibold" htmlFor="category">
          Category
        </label>
        <select className="w-full p-2 border rounded-lg" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Ideas">Ideas</option>
        </select>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full p-2 border rounded-lg resize-none"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-700 flex items-center justify-center gap-2"
      >
        <FaPaperPlane /> Add Note
      </button>
    </form>
  )
}

export default NoteForm
