import { FaPlus } from "react-icons/fa6";
import AdminHyperlink from "@/components/AdminHyperlink";


async function getJourneys(){
  const res = await fetch("http://localhost:8080/journeys", {
    cache: "no-store",
  })

  if (!res.ok){
    throw new Error("Failed fetch journeys")
  };
  
  return res.json();
}



export default async function AdminJourneyPage() {
  const {data} = await getJourneys()
  
  return (
   <div className="p-10">
      {/* Hyperlink */}
      <div>
        <AdminHyperlink/>
      </div>
      {/* Header */}
      <div>
        <h1>Dashboard Utama</h1>
      </div>
    </div>
  );
}
