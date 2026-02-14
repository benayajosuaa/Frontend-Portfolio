"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AdminHyperlink from "@/components/AdminHyperlink";
import { getWorks, type Work } from "@/lib/api";
import Loader from "@/decoration/Loading";

export default function AdminworkPage() {
  const [data, setData] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorks() {
      try {
        const works = await getWorks();
        setData(works || []);
      } catch (e) {
        console.error("❌ Failed to fetch works:", e);
        setError("Gagal mengambil data works");
      } finally {
        setLoading(false);
      }
    }

    loadWorks();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }
  
  return (
   <div className="p-10">
      {/* Hyperlink */}
      <div>
        <AdminHyperlink/>
      </div>
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold">Works</h1>
        </div>
        <div className="hover:flex items-center p-2">
          <a href="/admin/work/create" className="">
             <button className="
              bg-slate-200
              hover:bg-slate-300
              transition-all duration-200 ease-out
              transform
              hover:-translate-y-0.2
              hover:scale-105
              active:scale-95
              shadow-sm hover:shadow-md
              flex items-center gap-x-3
              p-3 pr-6 pl-6"
            >
              <span>Create</span>
              <span><FaPlus /></span>
             </button>
          </a>
        </div>
      </div>
      {/* Tabel Content */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="text-base">
            <tr>
              <th className="w-3/6 text-left p-3 pb-6">Title</th>
              <th className="w-1/6 text-center p-3 pb-6">Status</th>
              <th className="w-1/6 text-center p-3 pb-6">Order</th>
              <th className="w-1/6 text-center p-3 pb-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {data.map((work: any) => (
              <tr key={work.id} className="border-t">
                <td className="truncate p-2">
                  {work.title}
                </td>
                <td className="text-center p-3">{work.status}</td>
                <td className="text-center p-3">{work.order_index}</td>
                <td className="text-center p-3">
                  <a
                    href={`/admin/work/edit/${work.id}`}
                    className="text-slate-500 hover:text-blue-700 hover:underline "
                  >
                    Edit Information
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
