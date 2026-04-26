# Contact Page

We are going to dip into React Router actions soon, which allow us to handle form submissions and other actions in a more elegant way. But for now, we are going to create a contact page that is just a form. We will look at how to handle the form submission later.

In the past, with most of our forms, we created controlled components. This means that we created a state variable for each input and then updated that state variable when the input changed. we are not going to do that in most cases with these actions. React Router encourages uncontrolled inputs (letting the DOM handle state) + native form behavior. It’s closer to how forms work in plain HTML.

For now, let's just create a contact page that has a form. We will look at how to handle the form submission later.

Open the `app/routes/contact/index.tsx` file and add the following code:

```jsx
const ContactPage = () => {
  return (
    <section className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
      <h2 className='text-3xl font-bold text-white mb-8 text-center'>
        📬 Contact Me
      </h2>

      <form className='space-y-6'>
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
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactPage;
```
