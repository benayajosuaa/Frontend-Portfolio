
import AdminHyperlink from "@/components/AdminHyperlink";
import { getJourneys } from "@/lib/api";

export default async function AdminJourneyPage() {
  let data = [];
  try {
    data = await getJourneys();
  } catch (e) {
    return <div className="p-10 text-red-600">Gagal mengambil data journey</div>;
  }
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
