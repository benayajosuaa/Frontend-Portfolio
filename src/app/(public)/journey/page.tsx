import NavigationBar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Montserrat } from "next/font/google"

const monserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
})

export default function HomePage() {
  return (
    <div className={`${monserratFont.className}`}>
      {/* navigation bar */}
      <div className="fixed w-full z-50">
        <NavigationBar />
      </div>
      
      {/* inti homepage */}
      <div className="relative pt-20 md:pt-32">
        {/* === TITLE === */}
        <div className="p-6 md:p-20">
          <h1 className="text-2xl md:text-3xl">My Journey</h1>
        </div>
        
        {/* === EDUCATION === */}
        <div>
          {/* UPH */}
          <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden group">
            <img
              src="/image/uph4.webp"
              alt="Universitas Pelita Harapan"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 md:group-hover:opacity-100 transition z-10" />
            
            {/* Mobile: Always show */}
            <div className="md:hidden absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10" />
            <div className="md:hidden absolute bottom-6 left-6 right-6 z-20 text-white">
              <h1 className="text-2xl font-semibold mb-1">Universitas Pelita Harapan</h1>
              <p className="text-base">Informatics, 2024</p>
            </div>
            
            {/* Desktop: Hover effect */}
            <span className="hidden md:block absolute z-30 bottom-10 right-10 text-4xl text-white opacity-80 group-hover:opacity-0 transition">
              University
            </span>
            <span className="hidden md:block absolute bottom-10 left-10 z-20 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
              <h1 className="text-4xl font-semibold mb-2">Universitas Pelita Harapan</h1>
              <p className="text-xl">Informatics, 2024</p>
            </span>
          </div>
          
          {/* LENTERA */}
          <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden group">
            <img
              src="/image/lentera4.jpg"
              alt="Sekolah Lentera Harapan"
              className="w-full h-full object-cover object-[center_80%] brightness-100 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 md:group-hover:opacity-100 transition z-10" />
            
            {/* Mobile: Always show */}
            <div className="md:hidden absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10" />
            <div className="md:hidden absolute bottom-6 left-6 right-6 z-20 text-white">
              <h1 className="text-2xl font-semibold mb-1">Sekolah Lentera Harapan Medan</h1>
              <p className="text-base">2021 - 2024</p>
            </div>
            
            {/* Desktop: Hover effect */}
            <span className="hidden md:block absolute z-30 bottom-10 right-10 text-4xl text-white opacity-80 group-hover:opacity-0 transition">
              Senior High School
            </span>
            <span className="hidden md:block absolute bottom-10 left-10 z-20 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
              <h1 className="text-4xl font-semibold mb-2">Sekolah Lentera Harapan Medan</h1>
              <p className="text-xl">2021 - 2024</p>
            </span>
          </div>
        </div>
        
        {/* === EXPERIENCE === */}
        {/* Judul PAKAI padding */}
        <div className="p-6 md:p-20 pt-20 md:pt-40">
          <h1 className="text-2xl md:text-3xl">Experience</h1>
        </div>
        
        {/* Gambar FULL WIDTH — TANPA padding */}
        <div>
          <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden group">
            <img
              src="/image/hm1.jpg"
              alt="Himpunan Informatika"
              className="w-full h-full object-cover object-[center_30%] brightness-90 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 md:group-hover:opacity-100 transition z-10" />
            
            {/* Mobile: Always show */}
            <div className="md:hidden absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10" />
            <div className="md:hidden absolute bottom-6 left-6 right-6 z-20 text-white">
              <h1 className="text-2xl font-semibold mb-1">Himpunan Informatika</h1>
              <p className="text-base">Dept. Eksternal 25/26</p>
            </div>
            
            {/* Desktop: Hover effect */}
            <span className="hidden md:block absolute z-30 bottom-10 right-10 text-4xl text-white opacity-80 group-hover:opacity-0 transition">
              Students Association
            </span>
            <span className="hidden md:block absolute bottom-10 left-10 z-20 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
              <h1 className="text-4xl font-semibold mb-2">Himpunan Informatika</h1>
              <p className="text-xl">Head of Dept. Eksternal 25/26</p>
            </span>
          </div>
        </div>
        
        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  )
}