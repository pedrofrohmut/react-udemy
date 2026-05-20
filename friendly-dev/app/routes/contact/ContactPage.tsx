import { Form } from "react-router"
import type { Route } from "./+types/ContactPage"

const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData()
  const data = {
    name: formData.get("name")?.toString(),
    email: formData.get("email")?.toString(),
    subject: formData.get("subject")?.toString(),
    message: formData.get("message")?.toString()
  }

  const errors: Record<string, string> = {}
  if (!data.name) errors.name = "Name is required"
  if (!data.email) errors.email = "Email is required"
  if (data.email && !isEmail(data.email)) errors.email = "Email is not valid"
  if (!data.subject) errors.subject = "Subject is required"
  if (!data.message) errors.message = "Message is required"

  if (Object.keys(errors).length > 0) {
    return { message: "Form has validation errors", errors }
  }

  return { message: "Form submitted successfully", data }
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const formErrors = actionData?.errors

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900 rounded-lg">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">📬 Contact Me</h2>

      {actionData && !formErrors && (
        <p className="mb-6 py-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-md">
          {actionData.message}
        </p>
      )}

      {actionData && formErrors && (
        <p className="mb-6 py-4 bg-red-700 text-red-100 text-center rounded-lg border border-red-500 shadow-md">
          {actionData.message}
        </p>
      )}

      <Form method="post" className="space-y-6">
        {/* Name */}
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
          {formErrors?.name && <div className="text-red-500 mt-1 text-sm">{formErrors.name}</div>}
        </div>

        {/* E-mail */}
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
          {formErrors?.email && <div className="text-red-500 mt-1 text-sm">{formErrors.email}</div>}
        </div>

        {/* Subject */}
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
          {formErrors?.subject && <div className="text-red-500 mt-1 text-sm">{formErrors.subject}</div>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-300" htmlFor="message">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 resize-none"
          ></textarea>
          {formErrors?.message && <div className="text-red-500 mt-1 text-sm">{formErrors.message}</div>}
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer">
          Send Message
        </button>
      </Form>
    </div>
  )
}

export default ContactPage
