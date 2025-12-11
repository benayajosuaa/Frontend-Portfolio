import NavigationBar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Montserrat } from "next/font/google"

const monserratFont = Montserrat ({
    subsets :["latin"],
    weight : "400",
})


export default function HomePage (){
    return(
        <div className={`${monserratFont.className}`}>
            {/* navigation bar */}
            <div className="fixed w-full z-10">
                <NavigationBar/>
            </div>

            {/* inti homepage */}
            <div className="relative">
                <div className="h-screen bg-amber-100">
                    <div className="p-20 pt-40">
                        Testing
                    </div>
                </div>
            </div>

            {/* footer */}
            <div>
                <Footer/>
            </div>
        </div>
    )
}