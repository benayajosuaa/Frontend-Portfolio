"use client"

import { useState } from "react"
import NavigationBar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Montserrat } from "next/font/google"
import { FiArrowRight } from "react-icons/fi"

const monserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
})

export default function HomePage() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error()

      setSuccess("Message sent successfully ✨")
      setForm({
        name: "",
        subject: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch {
      setError("Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${monserratFont.className} min-h-screen flex flex-col`}>
      {/* navigation bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavigationBar />
      </div>

      {/* inti homepage */}
      <main className="relative flex-1 z-10">
        <div className="min-h-screen">
          <div className="p-6 pt-20 md:p-20 md:pt-40">
            {/* title */}
            <div className="pt-8 pb-10">
              <h1 className="text-2xl md:text-3xl">
                Have Something to Say ?
              </h1>
            </div>

            <div className="flex flex-col gap-y-20">
              {/* info */}
              <div className="grid md:grid-cols-3 md:gap-x-10 gap-y-5">
                <div>
                  <h1 className="text-lg font-bold md:text-xl">
                    Get in Touch
                  </h1>
                  <p className="text-sm md:text-base md:pt-2">
                    Have a project in mind, a question, or just want to talk ideas?
                    I’m always open to meaningful conversations
                  </p>
                </div>

                <div>
                  <h1 className="text-lg font-bold md:text-xl">
                    Work & Collaboration
                  </h1>
                  <p className="text-sm md:text-base md:pt-2">
                    Looking for someone to build, fix, or improve your digital product?
                    Let’s see if we’re a good fit before the deadline says hello
                  </p>
                </div>

                <div>
                  <h1 className="text-lg font-bold md:text-xl">
                    Feedback & Thoughts
                  </h1>
                  <p className="text-sm md:text-base md:pt-2">
                    Feedback helps me grow. Whether it’s a suggestion, critique,
                    or fresh perspective—I’m all ears
                  </p>
                </div>
              </div>

              {/* form */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-10">
                  <div className="md:col-span-2 flex flex-col gap-y-5">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="border-b border-gray-700 p-2 w-full focus:outline-0"
                    />

                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className="border-b border-gray-700 p-2 w-full focus:outline-0"
                    />

                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="border-b border-gray-700 p-2 w-full focus:outline-0"
                    />

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className="border-b border-gray-700 p-2 w-full focus:outline-0"
                    />
                  </div>

                  <div className="md:col-span-5 h-64 md:h-full flex flex-col">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your idea..."
                      className="w-full h-full border border-gray-700 p-3 focus:outline-0"
                    />
                  </div>
                </div>

                {/* feedback */}
                <div className="pt-3 text-right text-sm">
                  {success && (
                    <p className="text-green-600">{success}</p>
                  )}
                  {error && (
                    <p className="text-red-600">{error}</p>
                  )}
                </div>

                {/* button */}
                <div className="pt-6 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-x-1 text-lg md:text-xl
                               bg-blue-200 px-6 py-2 hover:bg-blue-300 transition
                               disabled:opacity-50"
                  >
                    <span>{loading ? "Sending..." : "Send"}</span>
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-20">
        <Footer />
      </footer>
    </div>
  )
}
