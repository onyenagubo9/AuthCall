"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  if (!loading && user) {
    router.replace("/dashboard");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await login(email, password);
    setBusy(false);
    if (res.success) {
      router.push("/dashboard");
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}>
        <h2 className="text-2xl font-bold mb-4">Sign in to AuthCall</h2>

        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="relative block">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </label>

          <label className="relative block">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type={showPass ? "text":"password"} className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <button type="button" onClick={()=>setShowPass(s=>!s)} className="absolute right-3 top-3 text-gray-500 text-sm">{showPass ? "Hide":"Show"}</button>
          </label>

          <button type="submit" disabled={busy} className={`w-full py-3 rounded-lg text-white font-semibold ${busy ? "bg-gray-400":"bg-green-600 hover:bg-green-700"}`}>
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm mt-4 text-gray-600">Don’t have an account? <a href="/signup" className="text-green-600 font-semibold">Create one</a></p>
      </motion.div>
    </div>
  );
}
