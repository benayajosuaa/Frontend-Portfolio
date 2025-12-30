import Link from "next/link"
import { Montserrat } from "next/font/google"
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillSpotify } from "react-icons/ai";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
})

export default function Footer() {
  return (
    <footer className={`${montserratFont.className} bg-gray-100`}>

      <div className="p-5 pt-15 md:p-20 md:pb-10">

        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">

          {/* Brand */}
          <div className="flex flex-col gap-6 max-w-sm">
            <img src="/logo/benaya.png" alt="Logo Benaya" className="w-32" />

            <p className="text-lg leading-relaxed text-gray-700">
              Karawaci, Banten <br />
              Indonesia
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 md:gap-12 md:grid-cols-3 text-base">

            <div className="flex flex-col gap-y-2">
              <h3 className="font-semibold uppercase tracking-wider text-sm">links</h3>
              <Link href="/portfolio" className="hover:opacity-60 transition">My Work</Link>
              <Link href="/journey" className="hover:opacity-60 transition">Journey</Link>
              <Link href="/contact" className="hover:opacity-60 transition">Contact</Link>
            </div>

            <div className="flex flex-col gap-y-2">
              <h3 className="font-semibold uppercase tracking-wider text-sm">Brain rot</h3>
              <Link href="https://github.com/benayajosuaa" target="_blank" className="hover:opacity-60 transition">Github</Link>
              <Link href="https://medium.com/@benaya.josua" target="_blank" className="hover:opacity-60 transition">Medium</Link>
            </div>

            <div className="flex">
                {/* Desktop text links */}
                <div className="hidden md:flex flex-col gap-y-2">
                    <h3 className="font-semibold uppercase tracking-wider text-sm">Social</h3>
                    <Link href="https://www.instagram.com/benayajosuaa/" target="_blank" className="hover:opacity-60 transition">
                    Instagram
                    </Link>
                    <Link href="https://www.linkedin.com/in/benayasimamora/" target="_blank" className="hover:opacity-60 transition">
                    LinkedIn
                    </Link>
                    <Link href="https://open.spotify.com/user/zeqxqspvmhgqmlkafjcrcx3n6" target="_blank" className="hover:opacity-60 transition">
                    Spotify
                    </Link>
                </div>

                {/* Mobile icon links */}
                <div className="md:hidden flex flex-col gap-3 text-xl pt-10">
                    <h3 className="font-semibold uppercase tracking-wider text-sm">Social</h3>
                    <span className="md:hidden flex flex-row gap-x-3 text-[20px]">
                        <Link href="https://www.instagram.com/benayajosuaa/" target="_blank"> <FaInstagram /> </Link>
                        <Link href="https://www.linkedin.com/in/benayasimamora/" target="_blank"> <FaLinkedin /> </Link>
                        <Link href="https://open.spotify.com/user/zeqxqspvmhgqmlkafjcrcx3n6" target="_blank"> <AiFillSpotify /> </Link>
                    </span>
                </div>

            </div>


          </div>
        </div>

        {/* Divider */}
        <div className="mt-20  border-gray-300 text-center text-sm text-gray-600">
          2026 © halobenaya — still building and still learning
        </div>

      </div>
    </footer>
  )
}
