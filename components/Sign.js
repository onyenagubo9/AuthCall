"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Phone, User } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* LEFT SIDE — AUTHCALL BRANDING */}
      <motion.div
        initial={{ x: -25, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-col justify-center items-center w-1/2 
          bg-linear-to-br from-green-700 to-green-500 text-white p-10 shadow-xl"
      >
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
          className="text-lg opacity-90 text-center max-w-md"
        >
          Create your account and start sending & receiving SMS globally with secure cloud numbers.
        </motion.p>

        {/* Animated illustration */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          src="/images/phone-illustration.png"
          alt="Phone Illustration"
          className="w-80 mt-10 drop-shadow-lg"
        />

        {/* Animated dots */}
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 text-sm opacity-80"
        >
          Trusted by businesses worldwide 🌍
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE — SIGNUP FORM */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-10">

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-6"
        >
          Create an account
        </motion.h2>

        {/* FORM */}
        <motion.form
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
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* PHONE NUMBER */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold 
              hover:bg-green-700 transition shadow-md"
          >
            Create Account
          </motion.button>
        </motion.form>

        {/* LOGIN LINK */}
        <p className="text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>

        {/* Security badges */}
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
