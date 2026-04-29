import { useRef, useState } from "react"
import { FaPaperPlane, FaRotateLeft, FaChevronDown, FaChevronUp } from "react-icons/fa6"
import TextInput from "./inputs/TextInput"
import SelectInput from "./inputs/SelectInput"
import TextAreaInput from "./inputs/TextAreaInput"

const NoteForm = ({ notes, setNotes }) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "medium",
    category: "work",
    description: ""
  })
  const titleRef = useRef(null)

  const [isFormVisible, setIsFormVisible] = useState(false)

  const handleChange = e => {
    // Spread formData to keep existing values and update only the changed field
    // [name] uses computed property namesyntax - key name is determined at runtime
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      priority: "medium",
      category: "work",
      description: ""
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!formData.title || !formData.description) return

    const newNote = { id: Date.now(), ...formData }
    setNotes([...notes, newNote])

    resetForm()
    titleRef.current?.focus()
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
          <TextInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            ref={titleRef}
          />

          {/* Priority */}
          <SelectInput label="Priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </SelectInput>

          {/* Category */}
          <SelectInput label="Category" name="category" value={formData.category} onChange={handleChange}>
            <option value="work">📁 Work</option>
            <option value="personal">🏠 Personal</option>
            <option value="ideas">💡 Ideas</option>
          </SelectInput>

          {/* Description */}
          <TextAreaInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

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
