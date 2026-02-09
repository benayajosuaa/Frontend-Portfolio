"use client"

import NavigationBar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Montserrat } from "next/font/google"
import DecryptedText from "@/decoration/DecryptedText"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

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

            <div className="pl-15 pr-15 p-8">
                <div className="relative z-10 pt-20 md:pt-28 pb-10 md:pb-1">
                    <h1 className="font-medium text-2xl md:text-5xl">discovery</h1>
                </div>
            </div>


            <div className=" w-auto bg-amber-100">
                {/* section portfolio */}
                <div className="flex flex-row">
                    {/* gambar dan informasi */}
                    <div>
                        <div>
                            <img 
                                src="image/lentera4.jpg" 
                                className="h-160 w-210 object-cover" 
                                alt="nama gambar yang mau di tunjukin " 
                            />
                        </div>
                    </div>

                    {/* judul dan button */}
                    <div className="p-10 relative bg-amber-200 w-full">
                        {/* judul */}
                        <div>
                            <div className="font-medium text-5xl">
                                Disini Judul Kerjaan
                            </div>
                        </div>
                        {/* button */}
                        <div className="absolute bottom-10 right-10">
                            <div className="flex flex-row text-5xl font-extralight text-slate-800 ">
                                <span>
                                    <button>
                                        <IoIosArrowBack />
                                    </button>
                                </span>
                                <span>
                                    <button>
                                        <IoIosArrowForward />
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

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
