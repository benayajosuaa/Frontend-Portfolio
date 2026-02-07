"use client"

import { useEffect, useState } from "react"
import AdminHyperlink from "@/components/AdminHyperlink"

const STATUS_OPTIONS = ["Unread", "Read", "Replied", "Archived"]

export default function AdminContactPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      setError("Unauthorized: please login as admin")
      setLoading(false)
      return
    }

    fetch("http://localhost:8080/contact", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((res) => setData(res.data))
      .catch(() => setError("Failed fetch contact messages"))
      .finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id: number, newStatus: string) => {
    const token = localStorage.getItem("token")

    // simpan status lama (buat rollback)
    const prevData = [...data]

    // optimistic update
    setData((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, status: newStatus } : msg
      )
    )

    try {
      const res = await fetch(
        `http://localhost:8080/contact/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      )

      if (!res.ok) throw new Error()
    } catch {
      alert("Failed to update status")
      setData(prevData) // rollback
    }
  }

  // if (loading) return <div className="p-10">Loading...</div>
  if (error) return <div className="p-10 text-red-600">{error}</div>

  return (
    <div className="p-10 space-y-6">
      <AdminHyperlink />

      <div>
        <h1 className="text-2xl font-semibold">Contact Messages</h1>
        <p className="text-sm text-gray-500">
          All incoming messages from contact form
        </p>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No messages yet
                </td>
              </tr>
            )}

            {data.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.subject}</td>

                {/* status */}
                <td className="p-3 flex justify-center">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(item.id, e.target.value)
                    }
                    className={`text-xs px-2 py-1  cursor-pointer
                      ${
                        item.status === "Unread"
                          ? "bg-red-100 rounded text-red-600"
                          : item.status === "Replied"
                          ? "bg-green-100 rounded text-green-800"
                          : "bg-gray-100 rounded text-gray-800"
                      }
                    `}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-3">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>

                <td className="p-3 text-center">
                  <a
                    href={`/admin/contact/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
