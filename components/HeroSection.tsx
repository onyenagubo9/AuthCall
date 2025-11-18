"use client";

import { motion } from "framer-motion";
import { Shield, Globe2, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-32 px-6 md:px-16 text-white bg-black">

      {/* 🌈 Moving Multi-Layer Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-[#022914] via-[#035c3b] to-[#07a063]
 bg-size-[200%_200%]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 50%", "0% 0%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* 🔵 Floating Blurry Circles */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-24 right-20 w-52 h-52 bg-green-300/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-24 left-14 w-72 h-72 bg-green-400/30 rounded-full blur-3xl"
      />

      {/* ✨ Pulsing Glow */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 w-[700px] h-[700px] bg-green-500/20 rounded-full blur-[140px] mx-auto my-auto"
      />

      {/* 🌬 Parallax Floating Dots */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-[url('/noise.png')] opacity-[0.08]"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* CONTENT */}
      <div className="relative max-w-4xl mx-auto text-center">

        {/* 🎯 Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-xl"
        >
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            Virtual Numbers
          </motion.span>
          <br />
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block text-green-300"
          >
            for Messaging & Verification
          </motion.span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto opacity-90"
        >
          Send & receive SMS worldwide using cloud-powered virtual numbers.
          Fast delivery. Full privacy. Global reach.
        </motion.p>

        {/* 🔰 Feature Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-8"
        >
          <div className="flex items-center gap-2 text-white/90 text-lg font-medium">
            <Shield className="w-6 h-6" /> Secure
          </div>
          <div className="flex items-center gap-2 text-white/90 text-lg font-medium">
            <Globe2 className="w-6 h-6" /> Global Reach
          </div>
          <div className="flex items-center gap-2 text-white/90 text-lg font-medium">
            <Zap className="w-6 h-6" /> Fast Delivery
          </div>
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex justify-center gap-5"
        >
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            href="/signup"
            className="px-8 py-3 bg-white text-green-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition"
          >
            Get Started
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            href="#features"
            className="px-8 py-3 border border-white font-semibold rounded-xl hover:bg-white hover:text-green-700 transition"
          >
            Learn More
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
