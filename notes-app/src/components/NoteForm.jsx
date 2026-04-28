import { useState } from "react"
import { FaPaperPlane, FaRotateLeft, FaChevronDown, FaChevronUp } from "react-icons/fa6"

const NoteForm = ({ notes, setNotes }) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "Medium",
    category: "Work",
    description: ""
  })

  const [isFormVisible, setIsFormVisible] = useState(false)

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

  const handleFormToggle = () => setIsFormVisible(prevState => !prevState)

  return (
    <div className="mb-2 pt-4">
      {/* Toggle Button */}
      <button
        onClick={handleFormToggle}
        className="w-full bg-gray-100 border border-gray-300 text-purple-800 py-2 rounded-lg cursor-pointer hover:bg-purple-200 hover:border-purple-300 transition mb-4 flex items-center justify-center gap-2"
      >
        {isFormVisible ? "Hide Form" : "Add new note"}
        {isFormVisible ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {true && (
        <form
          onSubmit={handleSubmit}
          className={`transition-all duration-1000 origin-top
                     ${isFormVisible ? "opacity-100 scale-y-100 h-100" : "opacity-0 scale-y-0 h-0"}`}
        >
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Priority */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="w-full p-2 border border-gray-400 rounded-lg"
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
            <label className="block text-gray-600 font-semibold" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full p-2 border border-gray-400 rounded-lg"
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
            <label className="block text-gray-600 font-semibold" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 border border-gray-400 rounded-lg resize-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              <FaPaperPlane /> Add Note
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 bg-gray-600 text-gray-100 py-2 rounded-lg cursor-pointer hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              <FaRotateLeft /> Reset
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default NoteForm
