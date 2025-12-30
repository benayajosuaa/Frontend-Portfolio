"use client"

import NavigationBar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Montserrat } from "next/font/google"
import DecryptedText from "@/decoration/DecryptedText"

const monserratFont = Montserrat({
    subsets: ["latin"],
    weight: "300",
})

export default function HomePage() {
    return (
        <div className={`${monserratFont.className}`}>
            
            {/* navbar */}
            <div className="fixed top-0 left-0 w-full z-10">
                <NavigationBar />
            </div>

            {/* konten utama */}
            <div className="h-screen pt-20 flex flex-col bg-white">
                <div className="flex flex-1/2 justify-center items-center">
                    <div className="text-xl font-semibold md:text-4xl md:font-thin">
                        <DecryptedText
                            text="Coming Soon"
                            speed={100}
                            maxIterations={30}
                            characters="ASDFGHJKLQWERTYUIOPZXCVBNMwertyuiopasdfghjklzxcvbnmqwertyuiop[]asdfghjkl;'zxcvbnm,./1234567890-="
                            className="revealed"
                            parentClassName="all-letters"
                            encryptedClassName="encrypted"
                            animateOn="view"
                        />
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </div>
    )
}
