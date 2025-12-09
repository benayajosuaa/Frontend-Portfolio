"use client"
import { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Montserrat } from "next/font/google"

import path from "path";
import { usePathname } from "next/navigation";
import Link from "next/link";


const monserratFont = Montserrat ({
    subsets :["latin"],
    weight : "400",
})




export default function NavigationBar (){

    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const menuNavbar = [
        {name: "Work", href: "/work"},
        {name: "Journey", href: "/journey"},
        {name: "Contact", href: "/contact"}
    ]


    return (
        <div className={` ${monserratFont.className}`}>
            <div className="p-15 text-xl">
                <div className="flex flex-row justify-between ">
                    {/* Logo */}
                    <Link href={"/"}>
                        <div className="flex items-center justify-center">
                            <img src="/logo/benaya.png" alt="" className="w-30 h-auto" />
                        </div>
                    </Link>

                    {/* Section Navbar */}
                    <div className="">
                        <div className="flex flex-row items-center justify-center gap-x-10 font-medium">
                            {
                                menuNavbar.map(link => (
                                    <Link 
                                        key={link.href}
                                        href={link.href}
                                        className={` ${pathname === link.href ? "text-black font-semibold" : "text-gray-600 hover:text-black"}`}
                                    >
                                        {link.name}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="text-3xl flex items-center justify-between text-gray-800">
                        <div>

                            <div>
                                <IoPersonCircleOutline />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}