import NavigationBar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Montserrat } from "next/font/google"
import { FiArrowRight } from "react-icons/fi";

const monserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
})

export default function HomePage() {
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
            <div className="pt-8 pb-10 mb:pt-10 mb:pb-20">
              <h1 className="text-2xl md:text-3xl">Have Something to Say ?</h1>
            </div>

            <div className="flex flex-col gap-y-20">

              <div>
                <div className="grid md:grid-cols-3 md:gap-x-10 gap-y-5">
                  <div>
                    <h1 className="text-lg font-bold md:text-xl">Get in Touch</h1>
                    <p className="text-sm md:text-base md:pt-2">
                      Have a project in mind, a question, or just want to talk ideas?
                      I’m always open to meaningful conversations
                    </p>
                  </div>

                  <div>
                    <h1 className="text-lg font-bold md:text-xl">Work & Collaboration</h1>
                    <p className="text-sm md:text-base md:pt-2">
                      Looking for someone to build, fix, or improve your digital product?
                      Let’s see if we’re a good fit before the deadline says hello
                    </p>
                  </div>

                  <div>
                    <h1 className="text-lg font-bold md:text-xl">Feedback & Thoughts</h1>
                    <p className="text-sm md:text-base md:pt-2">
                      Feedback helps me grow. Whether it’s a suggestion, critique,
                      or fresh perspective—I’m all ears
                    </p>
                  </div>
                </div>
              </div>

              {/* section input */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-10">
                  <div className="md:col-span-2">
                    <div className="flex flex-col gap-y-5">
                      <div>
                        <label className="text-sm font-bold md:font-normal md:text-lg block ml-2">Name</label>
                        <input
                          className="border-b border-gray-700 p-2 w-full focus:outline-0"
                          type="text"
                          placeholder="e.g. Benaya Simamora"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold md:font-normal md:text-lg block ml-2">Subject</label>
                        <input
                          className="border-b border-gray-700 p-2 w-full focus:outline-0"
                          type="text"
                          placeholder="e.g. Website for my Clinic"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold md:font-normal md:text-lg block ml-2">Email</label>
                        <input
                          className="border-b border-gray-700 p-2 w-full focus:outline-0"
                          type="text"
                          placeholder="e.g. contact@halobenaya.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold md:font-normal md:text-lg block ml-2">Phone</label>
                        <input
                          className="border-b border-gray-700 p-2 w-full focus:outline-0"
                          type="text"
                          placeholder="e.g. +62 xxx xxxx xxxx"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-5 h-64 md:h-full flex flex-col">
                    <label className="text-sm font-bold md:font-normal md:text-lg block ml-2 pb-3">Leave a Message</label>
                    <textarea
                      className="w-full h-full border border-gray-700 p-3 focus:outline-0"
                      placeholder="Tell me about your idea..."
                    />
                  </div>
                </div>
                {/* button send */}
                <div className="pt-6 md:pt-13">
                  <span className="flex justify-end">
                    <button className="flex flex-row justify-center items-center gap-x-1 text-lg md:text-xl bg-blue-200 p-2 md:p-1 pl-6 pr-6 md:pl-5 md:pr-5 hover:bg-blue-300 transition">
                      <span>Send</span>
                      <FiArrowRight />
                    </button>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className="relative z-20">
        <Footer />
      </footer>

    </div>
  )
}
