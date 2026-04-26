# Formspree Contact Form

Now we want to make the contact form function. There are a ton of options when it comes to this. We could create our own server that handles sending emails or storing the contact in our database. We could even create a "contacts" content type in Strapi and use that. But for this project, we will use Formspree. Formspree is a service that allows you to create forms and send the data to your email. It is very simple to set up and works great for small projects. It is also free for up to 50 submissions per month, I believe. If you need more than that, you can pay for a plan. But for this project, we will use the free plan.

Go to https://formspree.io and create an account and log in.

Click on "Add New->Create A Project" and give it a name like "Quick Tickets". Then click on "Add New->Create Form" and give it a name and add the email address that you want the submissions to goto.

## Form Endpoint

Now you will see an endpoint for your form.

Open the `app/routes/contact/index.tsx` file. The way that we left off, is we used the `Form` component from React Router to submit to an action. We no longer want to do that. We want to submit to the Formspree endpoint. So we will use a regular form tag.

Replace the `Form` component with a regular form tag and the action set to the formspree endpoint:

```tsx
<form
  method='POST'
  action='https://formspree.io/f/xanezryq'
  className='space-y-6'
>
  //...
</form>
```

You can get rid of all the action stuff and the error handling. We will just use standard HTML form validation. Here is the final code:

```tsx
const ContactPage = () => {
  return (
    <section className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
      <h2 className='text-3xl font-bold text-white mb-8 text-center'>
        📬 Contact Me
      </h2>

      <form
        method='POST'
        action='https://formspree.io/f/xanezryq'
        className='space-y-6'
      >
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

Submit it and you should see a thank you message. You can check your email and you should see the message there. You can also check the Formspree dashboard and see the submissions there.

Now our website is complete and we can deploy it to the web.
