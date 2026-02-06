import Link from "next/link"
import { Montserrat } from "next/font/google"
import { LuLogOut } from "react-icons/lu";


const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
})

export default function AdminHyperlink() {
  return (
    <div  className="pb-5">
        <div className="flex flex-row justify-between">
          <div className="flex items-center justify-center">
            <span className="flex items-center justify-center">
                <img className=" w-26 h-auto " src="/logo/logobenv2.png" alt="" />
            </span>
          </div>
          <div className="flex items-center justify-center text-2xl ">
            <Link href="/login">
              <LuLogOut />
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-x-3 text-lg pt-5 text-slate-600">
          <span className="hover:text-slate-900"><Link href="/admin">Dashboard</Link></span>
          <span className="text-slate-300"> / </span>
          <span className="hover:text-slate-900"><Link href="/admin/journey">Journey</Link></span>
          <span className="text-slate-300"> / </span>
          <span className="hover:text-slate-900"><Link href="/admin/work">Works</Link></span>
          <span className="text-slate-300"> / </span>
          <span className="hover:text-slate-900"><Link href="/admin/contact">Contact</Link></span>
        </div>
    </div>
  ) 
}


