import Link from "next/link"
import { Montserrat } from "next/font/google"
const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
})

export default function AdminHyperlink() {
  return (
    <div  className="pb-5">
        <div className="flex flex-row gap-x-3 text-lg text-slate-600">
          <span className="hover:text-slate-900"><Link href="">Dashboard</Link></span>
          <span className="text-slate-300"> / </span>
          <span className="hover:text-slate-900"><Link href="">Journey</Link></span>
          <span className="text-slate-300"> / </span>
          <span className="hover:text-slate-900"><Link href="">Works</Link></span>
          <span className="text-slate-300"> / </span>
          <span className="hover:text-slate-900"><Link href="">Contact</Link></span>
        </div>
    </div>
  ) 
}


