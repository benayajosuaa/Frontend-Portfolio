"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import TextType from '@/decoration/TextType'
import ScrollReveal from "@/decoration/ScrollReveal"

import { Montserrat } from "next/font/google"

const montserratFont = Montserrat({
    subsets :["latin"],
    weight : "200",
})

export default function LandingPage(){
    return (
        <div className="bg-white text-black overflow-x-auto w-full">
            <div className="z-20 fixed w-full">
                <div className="w-full">
                    <Navbar/>
                </div>
            </div>


            <div className="">
                <div className="w-full h-screen flex items-center">
                    <div className="px-8 md:px-15 xl:px-20 items-center">
                        <div className={` flex flex-col gap-y-5 ${montserratFont.className}`}>
                            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light">hai!</div>
                            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light">I'm <span className="font-normal">Benaya Josua</span></div>
                            <div className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-[350] h-10 text-slate-800">
                                <TextType 
                                text={
                                    ["Trying to be a good Software Engineer",  
                                    "Interested in Public Speaking",
                                    "Curious about Cybersecurity",
                                    "I love Cat . . .",
                                    "Like jazz and classic vibes"
                                    ]}
                                typingSpeed={75}
                                pauseDuration={1500}
                                showCursor={true}
                                cursorCharacter="|"
                                className=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="w-full items-center justify-center pt-20 pb-20 mb:pt-30 mb:pb-50">
                <div className="flex flex-col md:flex-row px-8  mb:px-10 gap-x-14">
                    {/* picture */}
                    <div className="flex justify-center items-center">
                        <img className="w-90  md:w-[1000px] lg:w-[1500px] xl:w-[2000px] max-w-full h-auto md:ml-10" src="/image/ben2.png" alt="" />
                    </div>
                    {/* text */}
                    <div className="flex items-center">
                        <span className={`font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${montserratFont.className}`}>
                            <ScrollReveal
                                baseOpacity={0}
                                enableBlur={true}
                                baseRotation={10}
                                blurStrength={20}
                                >
                                    I’m an Informatics student who believes technology should serve people with empathy. I care about building systems that not only function well but also make users feel understood and supported. For me, compassion isn’t separate from logic — it’s what gives purpose to every line of code
                            </ScrollReveal>
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </div>
    )
}