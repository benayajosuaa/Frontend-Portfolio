
import Link from "next/link"
import { Montserrat } from "next/font/google"
import { AiOutlineSpotify } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";


const montserratFont = Montserrat ({
    subsets :["latin"],
    weight : "400",
})


export default function Footer (){
    return (
        <div className={`${montserratFont.className}`}>
            <div className="p-15 bg-gray-100">
                <div className="flex flex-row justify-between">

                    <div className="p-10">
                        <div className="flex flex-col gap-y-10">
                            {/* Logo */}
                            <div>
                                <img src="/logo/benaya.png" alt="Logo Benaya" className="w-30 h-auto"/>
                            </div>
                            {/* Location */}
                            <div>
                                <h1 className="text-2xl"> Karawaci, Banten <br/>Indonesia </h1>
                            </div>
                            {/* <div className="flex flex-row gap-x-3 text-3xl  items-center">
                                <span> <AiOutlineSpotify /> </span>
                                <span className="text-4xl"> <LiaLinkedin /> </span>
                                <span> <FaInstagram /> </span>
                            </div> */}
                        </div>
                    </div>
                    <div className=" p-10">
                        <div className="flex flex-row gap-x-20 text-lg">
                            {/* about ben */}
                            <div className="flex flex-col gap-y-">
                                <span className="pb-3 font-bold"> <h1>About Ben</h1></span>
                                <span> <Link href=""> My Work </Link> </span>
                                <span> <Link href="">Journey </Link> </span>
                            </div>
                            {/* brainrot */}
                            <div className="flex flex-col gap-y-2">
                                <span className="pb-3 font-bold"> <h1>About Ben</h1></span>
                                <span> <Link href=""> Github </Link> </span>
                                <span> <Link href=""> Medium </Link> </span>
                            </div>
                            {/* social */}
                            <div className="flex flex-col gap-y-2">
                                <span className="pb-3 font-bold"> <h1>Social</h1></span>
                                <span> <Link href=""> Instagram </Link> </span>
                                <span> <Link href=""> Linkedin </Link> </span>
                                <span> <Link href=""> Spotify </Link> </span>
                            </div>
                        </div>
                    </div>
                </div>
               
                
                {/* Credit */}
                <div className="flex items-center justify-center pt-20">
                    <h1 className="text-lg">
                        2026 © halobenaya — still building and still learning
                    </h1>
                </div>
            </div>
        </div>
    )
}