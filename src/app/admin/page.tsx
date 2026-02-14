"use client";

import { useEffect, useState } from "react";
import AdminHyperlink from "@/components/AdminHyperlink";
import { getJourneys } from "@/lib/api";
import Loader from "@/decoration/Loading";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJourneys() {
      try {
        const journeys = await getJourneys();
        setData(journeys || []);
      } catch (e) {
        console.error("❌ Failed to fetch journeys:", e);
        setError("Gagal mengambil data journey");
      } finally {
        setLoading(false);
      }
    }

    loadJourneys();
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
        <AdminHyperlink />
      </div>
      {/* Header */}
      <div>
        <h1>Dashboard Utama</h1>
      </div>
    </div>
  );
}
