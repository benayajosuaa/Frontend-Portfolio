"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const JOURNEY_TYPES = ["Education", "Work", "Organization"] as const;

interface JourneyForm {
  type: string;
  title: string;
  excerpt: string;
  cover_image: string;
  year: number;
  order_index: number;
  content?: string;
}

export default function CreateJourneyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<JourneyForm>({
    type: "Education",
    title: "",
    excerpt: "",
    cover_image: "",
    year: new Date().getFullYear(),
    order_index: 1,
    content: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/journeys`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        alert("Gagal membuat journey");
        return;
      }

      router.push("/admin/journey");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-10 max-w-3xl">
        
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Create Journey</h1>
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

        {/* TYPE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Type
          </label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="border-b pt-3 w-full focus:outline-none"
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
          <label className="block text-sm font-medium mb-1">
            Excerpt
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) =>
              setForm({ ...form, excerpt: e.target.value })
            }
            className="border p-2 w-full resize-none overflow-y-auto h-20"
            required
          />
        </div>

        {/* COVER IMAGE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Cover Image URL
          </label>
          <input
            value={form.cover_image}
            onChange={(e) =>
              setForm({ ...form, cover_image: e.target.value })
            }
            className="border p-2 w-full"
            required
          />
        </div>

        {/* YEAR */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Year
          </label>
          <input
            type="number"
            value={form.year}
            onChange={(e) =>
              setForm({
                ...form,
                year: Number(e.target.value),
              })
            }
            className="border p-2 w-full"
            required
          />
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

        {/* CONTENT */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
            className="border p-2 w-full resize-none overflow-y-auto h-30"
          />
        </div>

        {/* ACTION */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="
              bg-slate-800
              text-white
              px-6
              py-2
              disabled:opacity-50
            "
          >
            {submitting ? "Creating..." : "Create"}
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
