"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminHyperlink from "@/components/AdminHyperlink"

export default function AdminContactDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [data, setData] = useState<any>(null)
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("Unauthorized: please login as admin")
      return
    }

    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `/api/contact/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) throw new Error()
        const json = await res.json()
        setData(json.data)

        // 🔹 auto mark Read (kalau masih Unread)
        if (json.data.status === "Unread") {
          await fetch(
            `/api/contact/${id}/status`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ status: "Read" }),
            }
          )
        }
      } catch {
        setError("Failed fetch contact detail")
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [id])


  const sendReply = async () => {
    if (!reply.trim()) {
      alert("Reply message cannot be empty")
      return
    }

    const token = localStorage.getItem("token")
    setSending(true)

    try {
      const res = await fetch(
        `/api/contact/${id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ markdown: reply }),
        }
      )

      if (!res.ok) throw new Error()

      alert("Reply sent successfully ✉️")
      router.push("/admin/contact")
    } catch {
      alert("Failed to send reply")
    } finally {
      setSending(false)
    }
  }

//   ui statew
  if (loading) return <div className="p-10">Loading...</div>
  if (error) return <div className="p-10 text-red-600">{error}</div>

  return (
    <div className="p-10 space-y-6 max-w-4xl">


      <h1 className="text-2xl font-semibold">Contact Detail</h1>

      {/* META INFO */}
      <div className="text-base space-y-1">
        <p><b>Name : </b> {data.name}</p>
        <p><b>Email : </b> {data.email}</p>
        <p><b>Subject : </b> {data.subject}</p>
        <p><b>Status : </b> {data.status}</p>
        <p>
          <b>Date:</b>{" "}
          {new Date(data.created_at).toLocaleString()}
        </p>
      </div>

      {/* MESSAGE */}
      <div className="text-xl">
        <span className="font-semibold ">subject: </span><span className="font-normal">{data.subject}</span>
      </div>
      
      <div className="flex flex-col gap-y-2">
        <span className="text-base font-semibold">Message: </span>
        <span>{data.message}</span>
      </div>

      {/* REPLY */}
      <div className="space-y-3">
        <h2 className="font-semibold">Reply</h2>

        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write your reply here..."
          className="w-full border rounded p-3 resize-none h-60"
        />

        <div className="flex gap-3">
          <button
            onClick={sendReply}
            disabled={sending}
            className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
          >
            {sending ? "Sending..." : "Send Reply"}
          </button>

          <button
            onClick={() => router.back()}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
