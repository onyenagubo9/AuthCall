"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone } from "lucide-react";

export default function SignupPage() {
  const { register, user, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!loading && user) {
    router.replace("/dashboard");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await register(email, password);
    setBusy(false);
    if (res.success) {
      router.push("/dashboard");
    } else {
      setError(res.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
        <h2 className="text-2xl font-bold mb-4">Create an account</h2>

        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="relative block">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input placeholder="Full name" className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200" value={name} onChange={(e)=>setName(e.target.value)} />
          </label>

          <label className="relative block">
            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
            <input placeholder="Phone (optional)" className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          </label>

          <label className="relative block">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type="email" placeholder="Email address" className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </label>

          <label className="relative block">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type="password" placeholder="Password" className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </label>

          <button type="submit" disabled={busy} className={`w-full py-3 rounded-lg text-white font-semibold ${busy ? "bg-gray-400":"bg-green-600 hover:bg-green-700"}`}>{busy ? "Creating account...":"Create account"}</button>
        </form>

        <p className="text-sm mt-4 text-gray-600">Already have an account? <a href="/login" className="text-green-600 font-semibold">Sign in</a></p>
      </motion.div>
    </div>
  );
}
