const SelectInput = ({ children, label, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-semibold" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full p-2 border border-gray-400 rounded-lg"
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  )
}

export default SelectInput
