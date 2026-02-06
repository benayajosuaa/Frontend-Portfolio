import Link from "next/link";

import { Montserrat } from "next/font/google"

const montserratFont = Montserrat({
    subsets :["latin"],
    weight : "500",
})


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
 
    <div className={`min-h-screen flex flex-col ${montserratFont.className}`}>
      

      <div className="flex flex-1 border rounded-lg overflow-hidden bg-white">
        {/* SIDEBAR */}
        {/* <div className="w-64 p-8 border-r bg-white text-lg flex flex-col gap-y-10">
            <div className="">
                <img className="h-12 w-auto" src="/logo/logobenv2.png" alt="" />
            </div>
            <div className="flex flex-col gap-2">
                <Link href="/admin" className="hover:text-blue-500">Dashboard</Link>
                <Link href="/admin/journey" className="hover:text-blue-500">Journey</Link>
                <Link href="/admin/work" className="hover:text-blue-500">Work</Link>
                <Link href="/admin/contact" className="hover:text-blue-500">Contact</Link>
            </div>
        </div> */}

        {/* CONTENT */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
