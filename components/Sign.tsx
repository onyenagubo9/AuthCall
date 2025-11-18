"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Phone, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { registerUser } from "@/lib/authActions";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await registerUser(email, password);

    setLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* LEFT SIDE — BACKGROUND IMAGE BRANDING */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex flex-col justify-center items-center w-1/2 
        bg-cover bg-center bg-no-repeat relative text-white p-10 shadow-xl"
        style={{ backgroundImage: "url('/images/loginbg.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-extrabold mb-6"
          >
            AuthCall
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg opacity-90"
          >
            Create your account and start sending & receiving SMS globally.
          </motion.p>

          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-10 text-sm opacity-80"
          >
            Trusted by businesses worldwide 🌍
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT SIDE — SIGNUP FORM */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-10">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-6"
        >
          Create an account
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
          onSubmit={handleSignup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 max-w-md"
        >
          {/* FULL NAME */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              required
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

        

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* PASSWORD + SHOW/HIDE */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />

            <input
              type={showPass ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* BUTTON WITH SPINNING LOADER */}
          <motion.button
            whileHover={!loading ? { scale: 1.03 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            disabled={loading}
            className={`w-full bg-green-600 text-white py-3 rounded-lg font-semibold 
            shadow-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? <div className="loader mx-auto"></div> : "Create Account"}
          </motion.button>
        </motion.form>

        {/* LOGIN LINK */}
        <p className="text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>

        {/* SECURITY BADGES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 mt-8 text-gray-500 text-sm"
        >
          <span>🔒 256-bit Encryption</span>
          <span>🛡️ Secure Authentication</span>
          <span>📞 SMS Verified</span>
        </motion.div>
      </div>
    </div>
  );
}
