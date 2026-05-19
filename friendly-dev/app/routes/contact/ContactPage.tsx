const ContactPage = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900 rounded-lg">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">📬 Contact Me</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300" htmlFor="subject">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300" htmlFor="message">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 resize-none"
          ></textarea>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer">
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactPage
