import NavigationBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Montserrat } from "next/font/google";

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

async function getJourneys(): Promise<Journey[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/journeys`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch journeys");
  const data = await res.json();
  return data.data;
}

const SECTION_CONFIG: { type: JourneyType; title: string }[] = [
  { type: "Education", title: "Education" },
  { type: "Work", title: "Work" },
  { type: "Organization", title: "Experience" },
];




export default async function JourneyPage() {
  const journeys = await getJourneys();
  const grouped = journeys.reduce<Record<JourneyType, Journey[]>>(
    (acc, item) => {
      acc[item.type].push(item);
      return acc;
    },
    { Education: [], Work: [], Organization: [] }
  );


  return (
    <div className={monserratFont.className}>
      {/* Navbar */}
        <div className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur">
          <NavigationBar />
        </div>

        {/* Title */}
        <div className="p-15">
          <div className="relative z-10 pt-24 md:pt-32 pb-10 md:pb-20">
            <h1 className="font-medium text-2xl md:text-5xl">discovery</h1>
          </div>
        </div>

        {/* images items */}
        <div>
          {SECTION_CONFIG.map(({type, title}) => {
            const items = grouped[type]
            if (items.length === 0) return null

            return(
              <section key={type} className="">
                {/* title sectionnya */}
                  <div className="px-6 md:px-20 mb-8 ">
                    <h2 className="text-xl md:text-3xl">{title}</h2>
                  </div>
              
                <div className="bg-amber-500">
                  {items
                    .sort((a,b) => a.order_index - b.order_index)
                    .map((item)=> { 
                      const fullImageUrl = 
                      `${process.env.NEXT_PUBLIC_API_URL}${item.cover_image}`;
                      
                      return (
                        <div key={item.id} className="relative w-full h-[420px] md:h-[560px] overflow-hidden group">
                            {/* imagenya */}
                            {process.env.NODE_ENV === "development" ? 
                            (<img src={fullImageUrl} alt={item.title} 
                              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />) :
                            (<Image
                              src={fullImageUrl}
                              alt={item.title}
                              fill
                              sizes="100vw"
                              className="object-cover object-center transition-transform duration-700 group-hover:scale-110"/>
                            )}

                            {/* buat overlay black to transparan */}
                            <div
                              className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"
                            />
                            {/* mobile display nya */}
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
                            
                            {/* dekstop display */}
                            <div className="hidden md:block absolute bottom-10 left-10 right-10 z-20 text-white">
                              <div className="flex flex-row justify-between w-full">
                                {/* Hover */}
                                <div className="flex-1 flex items-end">
                                  <div
                                    className="mt-3  opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 space-y-1">
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
                                {/* TITLE — ALWAYS VISIBLE */}
                                <div className="flex-1 flex justify-end">
                                  <h1
                                   className="
                                      text-5xl font-semibold
                                      transition-all duration-500
                                      group-hover:opacity-0
                                      group-hover:translate-y-2
                                      pointer-events-none
                                    ">
                                    {item.title}
                                  </h1>
                                </div>
                              </div>
                            </div>
                        </div>
                      )
                    })
                  }
                </div>
              </section>
            )
          })}
        </div>
        {/* Footer */}
        <div className="relative z-10 ">
          <Footer />
        </div>
      </div>
    
  );
}