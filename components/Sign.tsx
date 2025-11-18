"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Phone, User } from "lucide-react";
import Link from "next/link";
import { registerUser } from "@/lib/authActions";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const result = await registerUser(email, password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* LEFT SIDE — Background Image Auth Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex flex-col justify-center items-center w-1/2 
        bg-cover bg-center bg-no-repeat text-white p-10 shadow-xl relative"
        style={{ backgroundImage: "url('/images/loginbg.png')" }}
      >

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center max-w-md"
        >
          <h1 className="text-5xl font-extrabold mb-6">AuthCall</h1>

          <p className="text-lg opacity-90">
            Create your account and start using secure virtual numbers for global SMS.
          </p>

          {/* Floating animation icon */}
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            src="/images/phone-illustration.png"
            alt="Phone"
            className="w-72 mx-auto mt-10 drop-shadow-xl"
          />

          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-12 text-sm opacity-80"
          >
            Trusted by businesses worldwide 🌍
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE — Signup Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-10">

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-6"
        >
          Create an account
        </motion.h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 max-w-md"
        >
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              required
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

       

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
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold 
            hover:bg-green-700 transition shadow-md"
          >
            Create Account
          </motion.button>
        </motion.form>

        {/* Login Redirect */}
        <p className="text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>

        {/* Security Badges */}
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
