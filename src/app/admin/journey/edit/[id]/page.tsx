"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const JOURNEY_TYPES = ["Education", "Work", "Organization"] as const;

interface JourneyForm {
  type: string;
  title: string;
  excerpt: string;
  year: number;
  order_index: number;
  content?: string;
  cover_image?: string; // path lama dari backend
}

export default function EditJourneyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<JourneyForm | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ======================
  // FETCH JOURNEY BY ID
  // ======================
  useEffect(() => {
    if (!id) return;

    async function fetchJourney() {
      try {
        const res = await fetch(
          `/api/journeys/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error();

        const json = await res.json();
        setForm(json.data);
      } catch {
        setError("Gagal mengambil data journey");
      } finally {
        setLoading(false);
      }
    }

    fetchJourney();
  }, [id]);

  // ======================
  // SUBMIT UPDATE
  // ======================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Belum login");
        return;
    }
    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("type", form.type);
      fd.append("excerpt", form.excerpt);
      fd.append("year", String(form.year));
      fd.append("order_index", String(form.order_index));
      if (form.content) fd.append("content", form.content);

      // upload gambar BARU kalau dipilih
      if (image) {
        fd.append("cover_image", image);
      }

     const res = await fetch(
      `/api/journeys/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // JANGAN tambahkan Content-Type di sini jika menggunakan FormData
        },
        body: fd,
      }
    );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Update gagal");
      }

      router.push("/admin/journey");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="p-10">Loading...</div>;
  if (error || !form)
    return <div className="p-10 text-red-600">{error}</div>;

  // ======================
  // RENDER FORM
  // ======================
  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-6">Edit Journey</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="border-b pt-3 w-full"
            required
          />
        </div>

        {/* TYPE */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="border-b pt-3 w-full"
          >
            {JOURNEY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* EXCERPT */}
        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) =>
              setForm({ ...form, excerpt: e.target.value })
            }
            className="border p-2 w-full resize-none h-20"
            required
          />
        </div>

        {/* COVER IMAGE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Image
          </label>

          <input
            type="file"
            placeholder="Upload image here ..."
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="border p-2 w-full"
          />
        </div>

        {/* YEAR */}
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="number"
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: Number(e.target.value) })
            }
            className="border p-2 w-full"
            required
          />
        </div>

        {/* ORDER */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Order Index
          </label>
          <input
            type="number"
            value={form.order_index}
            onChange={(e) =>
              setForm({
                ...form,
                order_index: Number(e.target.value),
              })
            }
            className="border p-2 w-full"
            required
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            value={form.content || ""}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
            className="border p-2 w-full resize-none h-32"
          />
        </div>

        {/* ACTION */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-slate-800 text-white px-6 py-2"
          >
            {submitting ? "Updating..." : "Update"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/journey")}
            className="border px-6 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
