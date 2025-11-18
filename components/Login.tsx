"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { loginUser } from "@/lib/authActions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginUser(email, password);

    setLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* LEFT SECTION — IMAGE SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex flex-col justify-center items-center w-1/2 
        bg-cover bg-center bg-no-repeat text-white p-10 shadow-xl relative"
        style={{ backgroundImage: "url('/images/loginbg.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center max-w-md">
          <h1 className="text-5xl font-extrabold mb-4">AuthCall</h1>
          <p className="text-lg opacity-90">
            Log in and manage your cloud-based virtual numbers.
          </p>
        </div>
      </motion.div>

      {/* RIGHT SECTION — LOGIN FORM */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-10">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-6"
        >
          Welcome Back
        </motion.h2>

        {/* ERROR TOAST */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500 text-white py-2 px-4 rounded-md mb-4 shadow-md"
          >
            ❌ {error}
          </motion.div>
        )}

        {/* FORM */}
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 max-w-md"
        >
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />

            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* BUTTON WITH LOADER */}
          <motion.button
            whileHover={!loading ? { scale: 1.03 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            disabled={loading}
            className={`w-full bg-green-600 text-white py-3 rounded-lg font-semibold 
            shadow-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? <div className="loader mx-auto"></div> : "Log In"}
          </motion.button>
        </motion.form>

        {/* SIGNUP LINK */}
        <p className="text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-green-600 font-semibold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
