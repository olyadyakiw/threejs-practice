import { useRef, useState } from "react"
import emailjs from '@emailjs/browser'

const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState({name: '', email: '', message: ''})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleFocus = () => {}
  const handleBlur = () => {}

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    console.log(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID)

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: 'Olha',
        from_email: form.email,
        to_email: "olya.dyakiv26@gmail.com",
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false)
      setForm({name: '', email: '', message: ''})
    }).catch((error) => {
      setIsLoading(false)
      console.log(error)
    })
  }

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in touch!</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7 mt-14">
          <label className="text-black-500 font-semibold">
            Name
            <input className="input" name="name" placeholder="John" required value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} type="text" />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input className="input" name="email" placeholder="john@gmail.com" required value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} type="email" />
          </label>
          <label className="text-black-500 font-semibold">
            Your message
            <textarea className="textarea" name="message" placeholder="Let me know how I can help you" rows={4} required value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}></textarea>
          </label>
          <button type="submit" className="btn" disabled={isLoading} onFocus={handleFocus} onBlur={handleBlur}>
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact