const TextAreaInput = ({ label, name, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-semibold" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className="w-full p-2 border border-gray-400 rounded-lg resize-none"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default TextAreaInput
