"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const WORK_TYPES = ["Draft", "Published"] as const;
type WorkStatus = (typeof WORK_TYPES)[number];

interface WorkAdminForm {
  title: string;
  status: WorkStatus;
  excerpt: string;
  cover_image: File | null;
  github_url?: string;
  demo_url?: string;
  drive_url?: string;
  order_index: number;
}

export default function CreateWorkPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<WorkAdminForm>({
    title: "",
    status: "Draft",
    excerpt: "",
    cover_image: null,
    github_url: "",
    demo_url: "",
    drive_url: "",
    order_index: 1,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("status", form.status);
      formData.append("excerpt", form.excerpt);
      formData.append("order_index", String(form.order_index));

      if (form.github_url) formData.append("github_url", form.github_url);
      if (form.demo_url) formData.append("demo_url", form.demo_url);
      if (form.drive_url) formData.append("drive_url", form.drive_url);
      if (form.cover_image) formData.append("cover_image", form.cover_image);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/works`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Gagal membuat work");

      router.push("/admin/work");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat membuat work");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-10">
      {/* wrapper kiri + batas lebar */}
      <div className="max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Create Work</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="border-b pt-3 w-full focus:outline-none"
              required
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as WorkStatus,
                })
              }
              className="border-b pt-3 w-full focus:outline-none"
            >
              {WORK_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* ORDER INDEX */}
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

          {/* EXCERPT */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Excerpt
            </label>
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
                setForm({
                  ...form,
                  cover_image: e.target.files?.[0] || null,
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
                value={form.github_url}
                onChange={(e) =>
                  setForm({
                    ...form,
                    github_url: e.target.value,
                  })
                }
                className="border p-2 w-full"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Demo
              </label>
              <input
                value={form.demo_url}
                onChange={(e) =>
                  setForm({
                    ...form,
                    demo_url: e.target.value,
                  })
                }
                className="border p-2 w-full"
                placeholder="https://demo.com"
              />
            </div>
          </div>

          {/* DRIVE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Drive
            </label>
            <input
              value={form.drive_url}
              onChange={(e) =>
                setForm({
                  ...form,
                  drive_url: e.target.value,
                })
              }
              className="border p-2 w-full"
              placeholder="https://drive.google.com/..."
            />
          </div>

          {/* ACTION */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-slate-800 text-white px-6 py-2 disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create"}
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
    </div>
  );
}
