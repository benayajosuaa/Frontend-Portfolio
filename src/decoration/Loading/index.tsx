import { Montserrat } from "next/font/google";

const monserratFont = Montserrat({
  subsets: ["latin"],
  weight: "300",
});


const Loader = () => {
  return (
    <div className={monserratFont.className}> 
        <div className='flex flex-col h-screen w-full items-center justify-center gap-y-2'>
            <div className="w-8 h-8 border-3 border-t-slate-800 border-gray-300 rounded-full animate-spin" />
            <div>
                <span>Wait yaaak...</span>
            </div>
        </div>
    </div>
  );
}

export default Loader;
