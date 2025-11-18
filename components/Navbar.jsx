"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md border-b fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* 🔥 LOGO WITH ANIMATION */}
        <Link href="/" className="flex items-center gap-3">
          {/* Floating + bouncing animation */}
          <motion.div
            animate={{
              y: [0, -4, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/images/logo-authcall.png"
              alt="AuthCall Logo"
              width={45}
              height={45}
              className="rounded-lg shadow-sm"
            />
          </motion.div>

          {/* Animated Text */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.08, color: "#15803d" }} // hover color = green-700
            className="text-3xl font-extrabold text-green-700 tracking-tight cursor-pointer"
          >
            AuthCall
          </motion.span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          <Link href="/features" className="hover:text-green-600 transition text-lg">Features</Link>
          <Link href="/pricing" className="hover:text-green-600 transition text-lg">Pricing</Link>
          <Link href="/faq" className="hover:text-green-600 transition text-lg">FAQ</Link>
          <Link href="/contact" className="hover:text-green-600 transition text-lg">Contact</Link>
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700 transition shadow"
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl text-gray-700"
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t shadow-md"
        >
          <div className="px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium">

            <Link href="/features" onClick={() => setOpen(false)} className="hover:text-green-600">Features</Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="hover:text-green-600">Pricing</Link>
            <Link href="/faq" onClick={() => setOpen(false)} className="hover:text-green-600">FAQ</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-green-600">Contact</Link>

            <hr className="my-2" />

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700"
            >
              Get Started
            </Link>

          </div>
        </motion.div>
      )}
    </nav>
  );
}
