"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0d7247] text-gray-300 pt-16 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-authcall.png"
              alt="AuthCall logo"
              width={48}
              height={48}
              className="rounded-lg shadow-lg animate-pulse"
            />
            <h2 className="text-2xl font-bold text-white tracking-tight">AuthCall</h2>
          </div>

          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Secure cloud numbers for global messaging and verification—powered by
            enterprise-level infrastructure.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
              <motion.a
                key={social}
                whileHover={{ scale: 1.2 }}
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <Image
                  src={`/icons/${social}.svg`}
                  alt={social}
                  width={20}
                  height={20}
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* PRODUCT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
          <ul className="space-y-3">
            <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
            <li><Link href="/countries" className="hover:text-white transition">Supported Countries</Link></li>
            <li><Link href="/dashboard/messages" className="hover:text-white transition">Dashboard</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-3">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-3">
            <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white">AuthCall</span>.  
        All rights reserved.
      </div>
    </footer>
  );
}
