import { useState } from "react"
import { FaPaperPlane } from "react-icons/fa"

const NoteForm = ({ notes, setNotes }) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "Medium",
    category: "Work",
    description: ""
  })

  const handleChange = e => {
    // Spread formData to keep existing values and update only the changed field
    // [name] uses computed property namesyntax - key name is determined at runtime
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      priority: "Medium",
      category: "Work",
      description: ""
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!formData.title || !formData.description) return

    const newNote = { id: Date.now(), ...formData }
    setNotes([...notes, newNote])

    resetForm()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {/* Title */}
      <div className="mb-4">
        <label className="block font-semibold" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full p-2 border rounded-lg"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block font-semibold" htmlFor="priority">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          className="w-full p-2 border rounded-lg"
          value={formData.priority}
          onChange={handleChange}
        >
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
        <select
          id="category"
          name="category"
          className="w-full p-2 border rounded-lg"
          value={formData.category}
          onChange={handleChange}
        >
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
          id="description"
          name="description"
          className="w-full p-2 border rounded-lg resize-none"
          value={formData.description}
          onChange={handleChange}
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
