"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";

const monserratFont = Montserrat({
  subsets: ["latin"],
  weight: "300",
});

// email checker sederhana (cukup & waras)
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // 🧠 VALIDATION FRONTEND (FIRST GATE)
    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      setError("Format email tidak valid");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }

    if (password !== confirm) {
      setError("Password tidak sama");
      return;
    }

    if (cooldown) return;

    setLoading(true);
    setCooldown(true);

    // anti spam submit cepat
    setTimeout(() => setCooldown(false), 3000);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password, register: true }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setError(msg || "Email sudah terdaftar");
        return;
      }

      // sukses → ke login
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={monserratFont.className}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm bg-white border p-6">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Register
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full"
                required
                placeholder="contact@halobenaya.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full"
                required
                placeholder="Minimal 8 karakter"
              />
            </div>

            {/* CONFIRM */}
            <div>
              <label className="block text-sm mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="border p-2 w-full"
                required
                placeholder="Ulangi password"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || cooldown}
              className="w-full bg-slate-800 text-white py-2 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-semibold">
            atau kamu ben? kalau ya tinggal{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline"
            >
              Login aja
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
