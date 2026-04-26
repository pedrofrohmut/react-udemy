# Reusable Input Components

In some projects, you may have a lot of inputs. Instead of writing the same code over and over again, you can create a reusable component for each type of input. Let's create a reusable input component for a text field, text area and a select field.

In the `src/components` folder, create a new folder called `inputs`. Inside this folder, create a new file called `TextInput.jsx`.

```jsx
const TextInput = ({ label, name, value, onChange, required = false }) => {
  return (
    <div className='mb-4'>
      <label className='block font-semibold'>{label}:</label>
      <input
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        className='w-full p-2 border rounded-lg'
        required={required}
      />
    </div>
  );
};

export default TextInput;
```

We are taking in props for the label, name, value, onChange and required. We are using these props to render the input field. We are also setting a default value for the required prop to `false`.

we can now use this component in our form.

```jsx
import TextInput from './components/inputs/TextInput';
```

Replace the title input with the following:

```jsx
(
  <TextInput
    label='Title'
    name='title'
    value={formData.title}
    onChange={handleChange}
    required
  />
)``;
```

Create a new file called `SelectInput.jsx` in the `src/components/inputs` folder.

```jsx
const SelectInput = ({ label, name, value, onChange, options }) => {
  return (
    <div className='mb-4'>
      <label className='block font-semibold'>{label}:</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className='w-full p-2 border rounded-lg'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
```

Now replace the category and priority inputs in the form with the following:

```jsx
   <SelectInput
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        options={[
          { value: "Work", label: "📂 Work" },
          { value: "Personal", label: "🏠 Personal" },
          { value: "Ideas", label: "💡 Ideas" },
        ]}
      />

      <SelectInput
        label="Priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        options={[
          { value: "High", label: "🔴 High" },
          { value: "Medium", label: "🟠 Medium" },
          { value: "Low", label: "🟢 Low" },
        ]}
      />
```

Create a new file called `TextAreaInput.jsx` in the `src/components/inputs` folder.

```jsx
const TextareaInput = ({ label, name, value, onChange, required = false }) => {
  return (
    <div className='mb-4'>
      <label className='block font-semibold'>{label}:</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className='w-full p-2 border rounded-lg'
        required={required}
      ></textarea>
    </div>
  );
};

export default TextareaInput;
```

Replace the description input with the following:

```jsx
<TextareaInput
  label='Description'
  name='description'
  value={formData.description}
  onChange={handleChange}
  required
/>
```

It all works the same exact way as before but now the input components are reusable and can be used in other forms as well.
