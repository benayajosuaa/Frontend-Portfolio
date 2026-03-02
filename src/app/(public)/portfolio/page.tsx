"use client";

import { useEffect, useState } from "react";
import NavigationBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { getWorks, type Work as ApiWork } from "@/lib/api";
import Loader from "@/decoration/Loading";


const monserratFont = Montserrat({
  subsets: ["latin"],
  weight: "300",
});

type Work = ApiWork;

function truncate(text: string, max = 50) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

export default function HomePage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    async function fetchWorks() {
      try {
        const worksData = await getWorks();
        setWorks(worksData || []);
      } catch (error) {
        console.error("❌ fetchWorks error:", error);
        setWorks([]);
      } finally {
        setIsLoading(false)
      }
    }
    fetchWorks();
  }, []);

  useEffect(() => {
    if (works.length === 0) {
      setLoadedImages(0);
      return;
    }

    let isCancelled = false;
    let loaded = 0;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";

    function resolveCoverUrl(coverImage: string) {
      const isAbsoluteUrl = /^https?:\/\//i.test(coverImage);

      if (isAbsoluteUrl) {
        return coverImage;
      }

      if (coverImage.startsWith("/uploads/") || coverImage.startsWith("/storage/")) {
        return `${apiBaseUrl}${coverImage}`;
      }

      return coverImage.startsWith("/") ? coverImage : `/${coverImage}`;
    }

    works.forEach((work) => {
      const image = new Image();
      image.src = resolveCoverUrl(work.cover_image);

      const handleDone = () => {
        loaded += 1;
        if (!isCancelled) {
          setLoadedImages(loaded);
        }
      };

      image.onload = handleDone;
      image.onerror = handleDone;
    });

    return () => {
      isCancelled = true;
    };
  }, [works]);

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

  const allImagesLoaded = works.length === 0 || loadedImages >= works.length;

  if (isLoading || !allImagesLoaded) {
    return (
      <Loader />
    );
  }
  
  if (works.length === 0) {
    return <div className="p-10">No works available</div>;
  }

  const activeWork = works[activeIndex];
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  function resolveCoverUrl(coverImage: string) {
    const isAbsoluteUrl = /^https?:\/\//i.test(coverImage);

    if (isAbsoluteUrl) {
      return coverImage;
    }

    if (coverImage.startsWith("/uploads/") || coverImage.startsWith("/storage/")) {
      return `${apiBaseUrl}${coverImage}`;
    }

    return coverImage.startsWith("/") ? coverImage : `/${coverImage}`;
  }

  return (
    <div className={monserratFont.className}>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavigationBar />
      </div>
      {/* SECTION DESKTOP */}
      <div className="min-h-screen hidden md:block">
        {/* header */}
        <div className="relative z-10">
          {/* title */}
          <div className="pt-40 p-20 pb-12 flex flex-row justify-between">
            <div className="">
              <h1 className="text-5xl font-medium">what ben builds</h1>
            </div>
            <div className="flex items-center">
              <div className="text-6xl flex flex-row gap-x-7">
                <div></div>
                <div>
                  <button onClick={handlePrev} className="hover:opacity-60">
                    <MdArrowBackIos />
                  </button>
                </div>
                <div>
                  <button onClick={handleNext} className="hover:opacity-60">
                    <MdArrowForwardIos />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* content */}
        <div>
          <div className="relative w-screen h-170">
            <img
              src={resolveCoverUrl(activeWork.cover_image)}
              className="h-170 w-screen object-cover"
              alt={activeWork.title}
            />
            <div className="absolute inset-0 z-10 bg-black/50" />
            <div className="absolute inset-0 z-20 flex  text-white text-4xl">
              <div>
                <div className="relative p-10 flex h-full flex-col justify-between">
                  {/* Title */}
                  <div className="font-extrabold">
                    <h1 className="text-5xl">{activeWork.title}</h1>
                  </div>

                  <div className="flex flex-row justify-end items-end gap-6 gap-x-20">
                    {/* Hyperlink */}
                    <div className="text-xl basis-6/10">
                      {activeWork.github_url && (
                        <p>
                          <span className="font-bold">Github:  </span>{" "}
                          <Link
                            href={activeWork.github_url}
                            target="_blank"
                            className="underline inline-block max-w-[60ch] truncate align-bottom"
                            title={activeWork.github_url}
                          >
                            {truncate(activeWork.github_url)}
                          </Link>
                        </p>
                      )}
                      {activeWork.demo_url && (
                        <p>
                          <span className="font-bold">Demo:  </span>{" "}
                          <Link
                            href={activeWork.demo_url}
                            target="_blank"
                            className="underline inline-block max-w-[60ch] truncate align-bottom"
                            title={activeWork.demo_url}
                          >
                            {truncate(activeWork.demo_url)}
                          </Link>
                        </p>
                      )}
                      {activeWork.drive_url && (
                        <p>
                          <span className="font-bold">Drive:  </span>{" "}
                          <Link
                            href={activeWork.drive_url}
                            target="_blank"
                            className="underline inline-block max-w-[60ch] truncate align-bottom"
                            title={activeWork.drive_url}
                          >
                            {truncate(activeWork.drive_url)}
                          </Link>
                        </p>
                      )}
                    </div>
                    <div className="basis-4/10 flex flex-col gap-y-4">
                      <span>
                        <h1 className="text-xl border inline p-1 pl-4 pr-4 rounded-lg">
                          {activeWork.status}
                        </h1>
                      </span>
                      <span>
                        <p className="text-sm">
                          {activeWork.excerpt}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
      
      {/* SECTION HANDPHONE*/}
      <div className="md:hidden min-h-screen pt-28">
        {/* header */}
        <div className="px-6 flex items-center justify-between">
          <h1 className="text-2xl font-medium tracking-wide">what ben builds</h1>
          <div className="flex items-center gap-4 text-2xl">
            <button onClick={handlePrev} className="hover:opacity-60">
              <MdArrowBackIos />
            </button>
            <button onClick={handleNext} className="hover:opacity-60">
              <MdArrowForwardIos />
            </button>
          </div>
        </div>

        {/* card */}
        <div className="px-6 pt-6">
          <div className="rounded-2xl overflow-hidden">
            <div className="relative">
              <img
                src={resolveCoverUrl(activeWork.cover_image)}
                className="w-full h-[380px] object-cover"
                alt={activeWork.title}
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <h2 className="text-2xl font-semibold leading-snug">
                  {activeWork.title}
                </h2>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium border p-1 pl-4 pr-4 rounded-lg">{activeWork.status}</span>
                </div>
              </div>
            </div>

            <div className="bg-white px-4 py-4 text-sm">
              <div className="space-y-2 text-gray-600 text-base">
                {activeWork.github_url && (
                  <p>
                    <span className="font-semibold">Github:</span>{" "}
                    <Link
                      href={activeWork.github_url}
                      target="_blank"
                      className="underline inline-block max-w-[20ch] truncate align-bottom"
                      title={activeWork.github_url}
                    >
                      {truncate(activeWork.github_url, 40)}
                    </Link>
                  </p>
                )}
                {activeWork.demo_url && (
                  <p>
                    <span className="font-semibold">Demo:</span>{" "}
                    <Link
                      href={activeWork.demo_url}
                      target="_blank"
                      className="underline inline-block max-w-[20ch] truncate align-bottom"
                      title={activeWork.demo_url}
                    >
                      {truncate(activeWork.demo_url, 40)}
                    </Link>
                  </p>
                )}
                {activeWork.drive_url && (
                  <p>
                    <span className="font-semibold">Drive:</span>{" "}
                    <Link
                      href={activeWork.drive_url}
                      target="_blank"
                      className="underline inline-block max-w-[20ch] truncate align-bottom"
                      title={activeWork.drive_url}
                    >
                      {truncate(activeWork.drive_url, 40)}
                    </Link>
                  </p>
                )}
              </div>
              <div className="border-t my-5 border-slate-500"/>
              <div>
                 <p className="mt-4 text-base text-justify text-gray-600">{activeWork.excerpt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  

      <div className="pt-20 md:pt-10">
        <Footer />
      </div>
    </div>
  );
}
