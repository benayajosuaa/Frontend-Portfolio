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
  year: number;
  order_index: number;
  cover_image: string;
  excerpt: string;
}

async function getJourneys(): Promise<Journey[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/journeys`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch journeys");
  return (await res.json()).data;
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
      {/* NAV */}
      <div className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur">
        <NavigationBar />
      </div>

      <div className="pt-28">
        {/* PAGE TITLE */}
        <div className="px-6 md:px-20 mb-12">
          <h1 className="text-2xl md:text-3xl">My Journey</h1>
        </div>

        {SECTION_CONFIG.map(({ type, title }) => {
          const items = grouped[type];
          if (items.length === 0) return null;

          return (
            <section key={type} className="mb-32">
              {/* SECTION TITLE */}
              <div className="px-6 md:px-20 mb-8">
                <h2 className="text-xl md:text-2xl">{title}</h2>
              </div>

              {/* ITEMS */}
              {items
                .sort((a, b) => a.order_index - b.order_index)
                .map((item) => (
                  <div
                    key={item.id}
                    className="relative w-full h-[420px] md:h-[560px] overflow-hidden group"
                  >
                    {/* IMAGE */}
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.cover_image.startsWith("/") ? "" : "/"}${item.cover_image}`}
                      alt={item.title}
                      fill
                      sizes="100vw"
                      className="
                        object-cover
                        object-center
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    {/* OVERLAY (hover desktop, always mobile) */}
                    <div className="
                      absolute inset-0
                      bg-linear-to-t
                      from-black/70 via-black/30 to-transparent
                      opacity-100 md:opacity-0
                      md:group-hover:opacity-100
                      transition
                    " />

                    {/* MOBILE TEXT */}
                    <div className="md:hidden absolute bottom-6 left-6 right-6 z-20 text-white">
                      <h1 className="text-2xl font-semibold">
                        {item.title}
                      </h1>
                      <p className="text-sm opacity-90">{item.excerpt}</p>
                      <p className="text-xs opacity-70 mt-1">{item.year}</p>
                    </div>

                    {/* DESKTOP TEXT */}
                    <div className="
                      hidden md:block absolute bottom-10 left-10 z-20 text-white
                    ">
                      <p className="text-sm opacity-70 mb-1">{item.excerpt}</p>
                      <h1 className="text-4xl font-semibold">
                        {item.title}
                      </h1>
                      <p className="text-sm opacity-70 mt-1">{item.year}</p>
                    </div>
                  </div>
                ))}
            </section>
          );
        })}

        <Footer />
      </div>
    </div>
  );
}
