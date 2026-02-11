"use client";

import { useEffect, useState } from "react";
import NavigationBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { getWorks, type Work as ApiWork } from "@/lib/api";

const monserratFont = Montserrat({
  subsets: ["latin"],
  weight: "300",
});

type Work = ApiWork;

export default function HomePage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchWorks() {
      try {
        const worksData = await getWorks();
        setWorks(worksData || []);
      } catch (error) {
        console.error("❌ fetchWorks error:", error);
        setWorks([]);
      }
    }
    fetchWorks();
  }, []);

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
        <div className="p-5 md:pl-15 md:pr-15 md:p-15">
          <div className="relative z-10 pb-2 pt-20 md:pt-28 md:pb-10">
            <h1 className="font-medium text-2xl md:text-5xl">
              what i've done
            </h1>
          </div>
        </div>

        {/* PORTFOLIO SECTION */}
        <div>
          <div className="flex flex-col md:flex-row">
            {/* Button & Image HP*/}
            <div className="md:hidden">
                <div className="flex flex-row w-full p-3 justify-between">
                    <div className="">
                        <div className="font-medium text-3xl md:text-5xl">
                            {activeWork.title}
                        </div>
                    </div>

                    <div>
                        <div className="
                            flex
                            justify-center
                            md:absolute
                            md:bottom-10
                            md:right-10
                        ">
                            <div className="flex flex-row text-4xl  font-thin text-gray-500 gap-6">
                                <button onClick={handlePrev} className="hover:opacity-60">
                                    <IoIosArrowBack />
                                </button>
                                <button onClick={handleNext} className="hover:opacity-60">
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* IMAGE */}
            <div className="
              w-full
              h-64
              md:w-500
              md:h-190
              overflow-hidden
              bg-black
              border
              border-l-0
              border-[#b3b3b3]
              md:rounded-br-2x
            ">
              {(() => {
                const isAbsoluteUrl = /^https?:\/\//i.test(activeWork.cover_image);
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";

                if (isAbsoluteUrl) {
                  return (
                    <img
                      src={activeWork.cover_image}
                      alt={activeWork.title}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  );
                }

                if (
                  activeWork.cover_image.startsWith("/uploads/") ||
                  activeWork.cover_image.startsWith("/storage/")
                ) {
                  const fullImageUrl = `${apiBaseUrl}${activeWork.cover_image}`;
                  return (
                    <img
                      src={fullImageUrl}
                      alt={activeWork.title}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  );
                }

                const localPath = activeWork.cover_image.startsWith("/")
                  ? activeWork.cover_image
                  : `/${activeWork.cover_image}`;

                return (
                  <img
                    src={localPath}
                    alt={activeWork.title}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                );
              })()}
            </div>

            {/* CONTENT */}
            <div className="p-6 md:p-10 relative w-full">
              <div className="flex flex-col">
                {/* TITLE - desktop*/}
                <div className="hidden md:flex">
                    <div className="font-medium text-3xl md:text-5xl">
                        {activeWork.title}
                    </div>
                </div>

                {/* STATUS */}
                <div className="pt-4 md:pt-6">
                  <span className="bg-slate-100 pl-3 pr-3 border rounded-lg p-1 text-sm md:text-lg font-medium">
                    {activeWork.status}
                  </span>
                </div>

                {/* EXCERPT */}
                <div className="pt-6 md:pt-10 text-base md:text-xl">
                  {activeWork.excerpt}
                </div>

                {/* LINKS */}
                <div className="
                  pt-6
                  md:absolute
                  md:bottom-10
                  md:p-4
                ">
                  <div className="flex flex-col text-sm md:text-lg gap-2">
                    {activeWork.github_url && (
                      <div>
                        <span className="font-semibold">Github: </span>
                        <Link
                          href={activeWork.github_url}
                          target="_blank"
                          className="underline break-all"
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
                          className="underline break-all"
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
                          className="underline break-all"
                        >
                          {activeWork.demo_url}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
                    
              {/* BUTTONS - Desktop */}
              <div className="hidden md:flex">
                <div className="
                    flex
                    justify-center
                    pt-8
                    md:absolute
                    md:bottom-10
                    md:right-10
                ">
                    <div className="flex flex-row text-5xl md:text-7xl font-thin text-gray-500 gap-6">
                        <button onClick={handlePrev} className="hover:opacity-60">
                            <IoIosArrowBack />
                        </button>
                        <button onClick={handleNext} className="hover:opacity-60">
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
