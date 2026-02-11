"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import AdminHyperlink from "@/components/AdminHyperlink";

interface Journey {
  id: number;
  title: string;
  type: string;
  year: number;
  order_index: number;
}

export default function AdminJourneyPage() {
  const [data, setData] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJourneys() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/journeys`;
        console.log('🔄 Admin: Fetching journeys from:', url);
        
        const res = await fetch(url, {
          cache: "no-store",
          headers: {
            'Accept': 'application/json',
          }
        });

        console.log('📊 Admin Journey API Response Status:', res.status);

        if (!res.ok) {
          console.error(`❌ Journey API Error: ${res.status}`);
          throw new Error(`Failed fetch journeys: ${res.status}`);
        }

        const json = await res.json();
        console.log('✅ Admin Journey data received:', json);

        if (!Array.isArray(json.data)) {
          throw new Error("Invalid data format");
        }

        console.log(`✅ Loaded ${json.data.length} journeys for admin`);
        setData(json.data);
      } catch (err) {
        console.error('❌ fetchJourneys error:', err);
        setError("Gagal mengambil data journey");
      } finally {
        setLoading(false);
      }
    }

    fetchJourneys();
  }, []);

 

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="p-10">
      {/* Hyperlink */}
      <AdminHyperlink />

      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold">Journey</h1>
        </div>

        <div className="flex items-center p-2">
          <Link href="/admin/journey/create">
            <button
              className="
                bg-slate-200
                hover:bg-slate-300
                transition-all duration-200 ease-out
                transform
                hover:-translate-y-0.2
                hover:scale-105
                active:scale-95
                shadow-sm hover:shadow-md
                flex items-center gap-x-3
                p-3 pr-6 pl-6
              "
            >
              <span>Create</span>
              <span><FaPlus /></span>
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-8">
        <table className="w-full table-fixed">
          <thead className="text-base">
            <tr>
              <th className="w-2/6 text-left p-3 pb-6">Title</th>
              <th className="w-1/6 text-center p-3 pb-6">Type</th>
              <th className="w-1/6 text-center p-3 pb-6">Year</th>
              <th className="w-1/6 text-center p-3 pb-6">Order</th>
              <th className="w-1/6 text-center p-3 pb-6">Action</th>
            </tr>
          </thead>

          <tbody className="text-base">
            {data.map((journey) => (
              <tr key={journey.id} className="border-t">
                <td className="truncate p-2">{journey.title}</td>
                <td className="text-center p-3">{journey.type}</td>
                <td className="text-center p-3">{journey.year}</td>
                <td className="text-center p-3">{journey.order_index}</td>
                <td className="text-center p-3">
                  <Link
                    href={`/admin/journey/edit/${journey.id}`}
                    className="text-slate-500 hover:text-blue-700 hover:underline"
                  >
                    Edit Information
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
