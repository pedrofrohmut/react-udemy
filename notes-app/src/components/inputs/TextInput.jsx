const TextInput = ({ label, name, value, onChange, required = false, ref }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        type="text"
        className="w-full p-2 border border-gray-400 rounded-lg"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default TextInput
