# Adding Validation

Right now we can submit our contact form with all empty fields. Of course, you can add the required attribute to the input fields, but I want to show you how to do this with JavaScript in the action and show a custom error if the user tries to submit the form with empty fields.

First, in the action under where we get all the input data, initiliaze an errors object:

```javascript
const errors: Record<string, string> = {};
```

The `Record<string, string>` type is a TypeScript utility type that represents an object with string keys and string values. This means that the `errors` object can have any number of properties, where each property name is a string and its value is also a string. This is useful for storing error messages for each input field in the form.

Then, we can check if the input fields are empty and add an error message to the errors object:

```javascript
if (!name) errors.name = 'Name is required.';
if (!email) {
  errors.email = 'Email is required.';
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  errors.email = 'Invalid email format.';
}
if (!subject) errors.subject = 'Subject is required.';
if (!message) {
  errors.message = 'Message is required.';
}

if (Object.keys(errors).length > 0) {
  return { errors };
}
```

We check all the fields and then check if the errors object has any keys. If it does, we return the errors object. This will be used in the front-end to show the error messages.

We need to get the errors object from the action data. Add this right above the return output:

```javascript
const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const errors = actionData?.errors || {};
  // ...
};
```

Now let's use the errors object within the JSX and display them under the inputs. We will use the `errors` object to check if there are any errors for each input field and display the error message if it exists.:

```javascript
const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const errors = actionData?.errors || {};

  return (
    <section className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
      <h2 className='text-3xl font-bold text-white mb-8 text-center'>
        📬 Contact Me
      </h2>

      {actionData?.message ? (
        <p className='mb-6 p-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-sm'>
          {actionData.message}
        </p>
      ) : null}

      <Form method='post' className='space-y-6'>
        {/* Full Name */}
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-300'
          >
            Full Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
          {errors.name && (
            <p className='text-red-400 text-sm mt-1'>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-300'
          >
            Email Address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
          {errors.email && (
            <p className='text-red-400 text-sm mt-1'>{errors.email}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor='subject'
            className='block text-sm font-medium text-gray-300'
          >
            Subject
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
          {errors.subject && (
            <p className='text-red-400 text-sm mt-1'>{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-300'
          >
            Message
          </label>
          <textarea
            id='message'
            name='message'
            rows={5}
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
          {errors.message && (
            <p className='text-red-400 text-sm mt-1'>{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
        >
          Send Message
        </button>
      </Form>
    </section>
  );
};
```
