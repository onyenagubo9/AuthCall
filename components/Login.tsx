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
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    const result = await loginUser(email, password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* LEFT — Background Image Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex flex-col justify-center items-center w-1/2 
        bg-cover bg-center bg-no-repeat text-white p-10 shadow-xl relative"
        style={{ backgroundImage: "url('/images/loginbg.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center max-w-md"
        >
          <h1 className="text-5xl font-extrabold mb-6">AuthCall</h1>

          <p className="text-lg opacity-90">
            Sign in securely and continue managing your virtual numbers.
          </p>

          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            src="/images/phone-illustration.png"
            alt="Phone Illustration"
            className="w-72 mx-auto mt-10 drop-shadow-xl"
          />

          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-10 text-sm opacity-80"
          >
            Trusted by thousands worldwide 🌎
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT — Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-10">

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
            exit={{ opacity: 0 }}
            className="bg-red-500 text-white py-2 px-4 rounded-md mb-4 shadow-md"
          >
            ❌ {error}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 max-w-md"
        >
          {/* EMAIL INPUT */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* PASSWORD INPUT + SHOW/HIDE */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />

            <input
              type={showPass ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />

            {/* Show/Hide Button */}
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold 
            hover:bg-green-700 transition shadow-md"
          >
            Log In
          </motion.button>
        </motion.form>

        {/* SIGNUP LINK */}
        <p className="text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-green-600 font-semibold hover:underline">
            Sign up here
          </Link>
        </p>

        {/* Security Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 mt-8 text-gray-500 text-sm"
        >
          <span>🔒 Secure Login</span>
          <span>🛡️ Protected Data</span>
          <span>📞 Verified Users</span>
        </motion.div>
      </div>
    </div>
  );
}
