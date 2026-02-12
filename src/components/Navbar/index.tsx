"use client"
import { useState } from "react"
import { IoPersonCircleOutline, IoMenu, IoClose } from "react-icons/io5"
import { Montserrat } from "next/font/google"
import { usePathname } from "next/navigation"
import Link from "next/link"

const monserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
})

export default function NavigationBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const menuNavbar = [
    { name: "Work", href: "/portfolio" },
    { name: "Journey", href: "/journey" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className={`${monserratFont.className} bg-white/80 backdrop-blur border-gray-200`}>
      <div className="p-6 pt-10 pb-10 md:p-20 md:pt-15 md:pb-15 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <img src="/logo/logobenv2.png" alt="Benaya" className="w-32" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 text-xl">
          {menuNavbar.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${pathname === link.href ? "text-black" : "text-gray-500 hover:text-black"} transition`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-3xl text-gray-700 hover:text-black">
            <IoPersonCircleOutline />
          </Link>

          {/* Mobile Burger */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      <div className={`md:hidden bg-white transition-all duration-300 ease-in-out ${
        open 
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}>
            <div className="flex flex-col p-3 pl-7 pr-7 gap-y-2 text-lg border-b border-t">
                {menuNavbar.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`${pathname === link.href ? "font-semibold" : "text-gray-700"} hover:text-black transition`}
                >
                    {link.name}
                </Link>
                ))}
            </div>
        </div>
      
    </header>
  )
}
