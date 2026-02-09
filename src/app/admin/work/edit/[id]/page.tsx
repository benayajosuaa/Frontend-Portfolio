"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const WORK_TYPES = ["Draft", "Published"] as const;
type WorkStatus = (typeof WORK_TYPES)[number];

interface WorkForm {
  title: string;
  status: WorkStatus;
  excerpt: string;
  order_index: number;
  github_url?: string;
  demo_url?: string;
  drive_url?: string;
  cover_image?: string; // image lama dari backend
}

export default function EditWorkPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<WorkForm | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ======================
  // FETCH WORK BY ID
  // ======================
  useEffect(() => {
    if (!id) return;

    async function fetchWork() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/works/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error();

        const json = await res.json();
        setForm(json.data);
      } catch {
        setError("Gagal mengambil data work");
      } finally {
        setLoading(false);
      }
    }

    fetchWork();
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
      fd.append("status", form.status);
      fd.append("excerpt", form.excerpt);
      fd.append("order_index", String(form.order_index));

      if (form.github_url) fd.append("github_url", form.github_url);
      if (form.demo_url) fd.append("demo_url", form.demo_url);
      if (form.drive_url) fd.append("drive_url", form.drive_url);

      // upload gambar baru kalau dipilih
      if (image) {
        fd.append("cover_image", image);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/works/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Update gagal");
      }

      router.push("/admin/work");
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
      <h1 className="text-3xl font-semibold mb-6">Edit Work</h1>

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

        {/* STATUS */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as WorkStatus,
              })
            }
            className="border-b pt-3 w-full"
          >
            {WORK_TYPES.map((type) => (
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
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="border p-2 w-full"
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

        {/* URLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Github
            </label>
            <input
              value={form.github_url || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  github_url: e.target.value,
                })
              }
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Demo
            </label>
            <input
              value={form.demo_url || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  demo_url: e.target.value,
                })
              }
              className="border p-2 w-full"
            />
          </div>
        </div>

        {/* DRIVE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Drive
          </label>
          <input
            value={form.drive_url || ""}
            onChange={(e) =>
              setForm({
                ...form,
                drive_url: e.target.value,
              })
            }
            className="border p-2 w-full"
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
            onClick={() => router.push("/admin/work")}
            className="border px-6 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
