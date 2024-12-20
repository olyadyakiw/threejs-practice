import { Suspense, useRef, useState } from "react"
import emailjs from '@emailjs/browser'
import { Canvas } from "@react-three/fiber"
import { Fox } from "../models/Fox"
import { Loader } from "@react-three/drei"
import useAlert from "../hooks/useAlert"
import Alert from "../components/Alert"

const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState({name: '', email: '', message: ''})
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnimation, setcurrentAnimation] = useState('idle')

  const { alert, showAlert, hideAlert } = useAlert()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFocus = () => setcurrentAnimation('walk')

  const handleBlur = () => setcurrentAnimation('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setcurrentAnimation('hit')

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

      showAlert({ show: 'true', text: 'Message send successfully', type: 'success' })

      setTimeout(() => {
        setcurrentAnimation('idle')
        setForm({name: '', email: '', message: ''})
      }, [3000])
      
    }).catch((error) => {
      setIsLoading(false)
      setcurrentAnimation('idle')
      console.log(error)
      showAlert({ show: 'true', text: 'I didnt recieve your message!', type: 'danger' })
    })
  }

  return (
    <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">

      { alert.show && <Alert { ...alert } />  }

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
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px)">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight intensity={ 2.5 } position={ [ 0,0,1 ] } />
          <ambientLight intensity={ 0.5 } />
          <Suspense fallback={ <Loader /> }>
            <Fox
              position={ [0.5, 0.35, 0] }
              rotation={ [ 12.6, -0.6, 0 ] }
              scale={ [ 0.5, 0.5, 0.5 ] }
              currentAnimation={ currentAnimation }
             />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact