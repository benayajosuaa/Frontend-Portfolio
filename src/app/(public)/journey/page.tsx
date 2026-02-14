"use client";

import { useEffect, useState } from "react";
import NavigationBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextImage from "next/image";
import { Montserrat } from "next/font/google";
import { getJourneys as fetchJourneys } from "@/lib/api";
import Loader from "@/decoration/Loading";

const monserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

type JourneyType = "Education" | "Work" | "Organization";

interface Journey {
  id: number;
  title: string;
  type: JourneyType;
  year: number | null;
  order_index: number;
  cover_image: string;
  excerpt: string | null;
  content: string | null;
}

const SECTION_CONFIG: { type: JourneyType; title: string }[] = [
  { type: "Education", title: "Education" },
  { type: "Work", title: "Work" },
  { type: "Organization", title: "Experience" },
];

export default function JourneyPage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    async function loadJourneys() {
      try {
        const data = await fetchJourneys();
        setJourneys(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ getJourneys error:", error);
        setJourneys([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadJourneys();
  }, []);

  useEffect(() => {
    if (journeys.length === 0) {
      setLoadedImages(0);
      return;
    }

    if (typeof window === "undefined") {
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

    journeys.forEach((journey) => {
      const image = new window.Image();
      image.src = resolveCoverUrl(journey.cover_image);

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
  }, [journeys]);

  const grouped = journeys.reduce<Record<JourneyType, Journey[]>>(
    (acc, item) => {
      if (acc[item.type]) {
        acc[item.type].push(item);
      } else {
        console.warn("⚠️ Unknown type:", item.type);
      }
      return acc;
    },
    { Education: [], Work: [], Organization: [] }
  );

  const allImagesLoaded = journeys.length === 0 || loadedImages >= journeys.length;

  if (isLoading || !allImagesLoaded) {
    return (
      <Loader />
    );
  }

  return (
    <div className={monserratFont.className}>
      <div className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur">
        <NavigationBar />
      </div>

      <div className="pt-10 p-5 md:p-15">
        <div className="relative z-10 pt-10 md:pt-32 pb-3 md:pb-20">
          <h1 className="font-medium text-2xl md:text-5xl">discovery</h1>
        </div>
      </div>

      <div>
        {SECTION_CONFIG.map(({ type, title }) => {
          const items = grouped[type];
          if (!items || items.length === 0) return null;

          return (
            <section key={type}>
              <div className="px-6 md:px-20 mb-8 pt-10 md:pt-20">
                <h2 className="text-2xl font-medium md:text-3xl">
                  {title}
                </h2>
              </div>

              <div>
                {items
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((item) => {
                    const isAbsoluteUrl =
                      /^https?:\/\//i.test(item.cover_image);

                    const apiBaseUrl =
                      process.env.NEXT_PUBLIC_API_URL ?? "";

                    const fullImageUrl = isAbsoluteUrl
                      ? item.cover_image
                      : `${apiBaseUrl}${item.cover_image}`;

                    return (
                      <div
                        key={item.id}
                        className="relative w-full h-[420px] md:h-[560px] overflow-hidden group"
                      >
                        {process.env.NODE_ENV === "development" ? (
                          <img
                            src={fullImageUrl}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <NextImage
                            src={fullImageUrl}
                            alt={item.title}
                            fill
                            sizes="100vw"
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                          />
                        )}

                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                        <div className="md:hidden absolute bottom-6 left-6 right-6 z-20 text-white">
                          <h1 className="text-2xl font-semibold">
                            {item.title}
                          </h1>

                          {item.excerpt && (
                            <p className="text-sm opacity-90 mt-1">
                              {item.excerpt}
                            </p>
                          )}

                          {item.content && (
                            <p className="text-sm opacity-80 mt-1">
                              {item.content}
                            </p>
                          )}

                          {item.year && (
                            <p className="text-xs opacity-70 mt-1">
                              {item.year}
                            </p>
                          )}
                        </div>

                        <div className="hidden md:block absolute bottom-10 left-10 right-10 z-20 text-white">
                          <div className="flex flex-row justify-between w-full">
                            <div className="flex-1 flex items-end">
                              <div className="mt-3 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 space-y-1">
                                {item.excerpt && (
                                  <p className="text-4xl font-semibold text-white opacity-90">
                                    {item.excerpt}
                                  </p>
                                )}

                                {item.content && (
                                  <p className="text-xl font-meduim opacity-70">
                                    {item.content}
                                  </p>
                                )}

                                {item.year && (
                                  <p className="text-xl font-meduim opacity-60 pt-1">
                                    {item.year}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex-1 flex justify-end">
                              <h1 className="text-5xl font-semibold transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2 pointer-events-none">
                                {item.title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
