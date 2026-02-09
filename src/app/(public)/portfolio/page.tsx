"use client";

import { useEffect, useState } from "react";
import NavigationBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
import DecryptedText from "@/decoration/DecryptedText";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const monserratFont = Montserrat({
  subsets: ["latin"],
  weight: "300",
});

interface Work {
  id: number;
  title: string;
  excerpt: string;
  cover_image: string;
  github_url?: string;
  demo_url?: string;
  drive_url?: string;
  status: string
}

export default function HomePage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH WORKS
  useEffect(() => {
    async function fetchWorks() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/works`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch works");

        const json = await res.json();
        setWorks(json.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWorks();
  }, []);

  // NAVIGATION

  function handlePrev() {
    setActiveIndex((prev) =>
      prev === 0 ? works.length - 1 : prev - 1
    );
  }

  function handleNext() {
    setActiveIndex((prev) =>
      prev === works.length - 1 ? 0 : prev + 1
    );
  }

//   if (loading) {
//     return <div className="p-10">Loading...</div>;
//   }

  if (works.length === 0) {
    return <div className="p-10">No works available</div>;
  }

  const activeWork = works[activeIndex];

  return (
    <div className={monserratFont.className}>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-20">
        <NavigationBar />
      </div>

      <div className="h-screen">
        {/* HEADER */}
        <div className="pl-15 pr-15 p-15">
            <div className="relative z-10 pt-20 md:pt-28 pb-10">
            <h1 className="font-medium text-2xl md:text-5xl">
                what i've done
            </h1>
            </div>
        </div>

        {/* PORTFOLIO SECTION */}
        <div className="">
            <div className="flex flex-row">
            
            {/* IMAGE (FIXED SIZE FRAME) */}
            <div className="w-500 h-190 overflow-hidden bg-black border border-l-0 border-[#b3b3b3] rounded-br-2x">
                <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${activeWork.cover_image}`}
                alt={activeWork.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                />
            </div>

            {/* CONTENT */}
            <div className="p-10 relative w-full">
                <div className="flex flex-col">
                
                {/* TITLE */}
                <div className="font-medium text-5xl">
                    {activeWork.title}
                </div>

                {/* STATUS */}
                <div className="pt-6">
                    <span className="bg-slate-100 pl-3 pr-3 border rounded-lg p-1 text-lg font-medium">
                        {activeWork.status}
                    </span>
                </div>

                {/* EXCERPT */}
                <div className="pt-10 text-xl">
                    {activeWork.excerpt}
                </div>

                {/* LINKS */}
                <div className="absolute bottom-10 p-4">
                    <div className="flex flex-col text-lg gap-2">
                    {activeWork.github_url && (
                        <div>
                        <span className="font-semibold">Github: </span>
                        <Link
                            href={activeWork.github_url}
                            target="_blank"
                            className="underline"
                        >
                            {activeWork.github_url}
                        </Link>
                        </div>
                    )}

                    {activeWork.drive_url && (
                        <div>
                        <span className="font-semibold">Drive: </span>
                        <Link
                            href={activeWork.drive_url}
                            target="_blank"
                            className="underline"
                        >
                            {activeWork.drive_url}
                        </Link>
                        </div>
                    )}

                    {activeWork.demo_url && (
                        <div>
                        <span className="font-semibold">Demo: </span>
                        <Link
                            href={activeWork.demo_url}
                            target="_blank"
                            className="underline"
                        >
                            {activeWork.demo_url}
                        </Link>
                        </div>
                    )}
                    </div>
                </div>
                </div>

                {/* BUTTONS */}
                <div className="absolute bottom-10 right-10">
                <div className="flex flex-row text-7xl font-thin text-gray-500 gap-4">
                    <button
                    onClick={handlePrev}
                    className="hover:opacity-60"
                    >
                    <IoIosArrowBack />
                    </button>
                    <button
                    onClick={handleNext}
                    className="hover:opacity-60"
                    >
                    <IoIosArrowForward />
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>

      {/* COMING SOON */}
      {/* aktifkan saat ada error aja */}
      {/* <div className="h-screen pt-20 flex flex-col bg-white">
        <div className="flex flex-1 justify-center items-center">
          <div className="text-xl font-semibold md:text-4xl md:font-thin">
            <DecryptedText
              text="Coming Soon"
              speed={100}
              maxIterations={30}
              characters="ASDFGHJKLQWERTYUIOPZXCVBNMwertyuiopasdfghjklzxcvbnm1234567890"
              animateOn="view"
            />
          </div>
        </div>
      </div> */}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
