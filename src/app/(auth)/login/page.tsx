"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const normalizedEmail = email.trim().toLowerCase();
      // Gunakan helper API agar lewat proxy Next.js
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      if (!res.ok) {
        const message = await res.text();
        setError(message || "Email atau password salah");
        return;
      }

      const data = await res.json();
      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
        router.push("/admin");
      } else {
        setError("Response tidak mengandung token");
      }
    } catch (err) {
      setError("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white border p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">
          kamu ben ?
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full focus:outline-none"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full focus:outline-none"
              required
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 text-white py-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex items-center justify-center">
            <span>kalau kamu bukan ben, </span>
            <span>Regis </span>
            <span><p> dulu ya</p></span>
          </div>
        </form>
      </div>
    </div>
  );
}
