"use client";

import { motion } from "framer-motion";

export default function PricingSection() {
  const card = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.7 },
    }),
  };

  return (
    <section
      id="pricing"
      className="relative py-24 px-6 md:px-12 text-white"
    >
      {/* 🌄 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/images/authpeople.webp')" }} // <-- your image here
      ></div>

      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="relative max-w-6xl mx-auto">

        {/* ⭐ Title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-green-300"
        >
          Simple, Transparent Pricing
        </motion.h2>

        {/* ⭐ Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* STARTER */}
          <motion.div
            custom={0}
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl text-center"
          >
            <h3 className="text-xl font-bold mb-2 text-white">Starter</h3>
            <p className="text-4xl font-extrabold text-green-300">$9/mo</p>
            <p className="text-gray-300 mb-6">Best for personal use</p>

            <ul className="text-gray-200 space-y-2">
              <li>1 Virtual Number</li>
              <li>300 SMS per month</li>
              <li>Email Support</li>
            </ul>

            <button className="mt-6 w-full bg-green-500/90 hover:bg-green-600 text-white py-2 rounded-lg transition">
              Choose Plan
            </button>
          </motion.div>

          {/* PRO */}
          <motion.div
            custom={1}
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.08 }}
            className="backdrop-blur-xl bg-white/20 border border-white/30 p-8 rounded-2xl shadow-2xl text-center"
          >
            <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
            <p className="text-4xl font-extrabold text-green-300">$19/mo</p>
            <p className="text-gray-300 mb-6">For businesses and creators</p>

            <ul className="text-gray-200 space-y-2">
              <li>3 Virtual Numbers</li>
              <li>2,000 SMS per month</li>
              <li>Priority Support</li>
            </ul>

            <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition">
              Choose Plan
            </button>
          </motion.div>

          {/* ENTERPRISE */}
          <motion.div
            custom={2}
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl text-center"
          >
            <h3 className="text-xl font-bold mb-2 text-white">Enterprise</h3>
            <p className="text-4xl font-extrabold text-green-300">Custom</p>
            <p className="text-gray-300 mb-6">High-volume messaging</p>

            <ul className="text-gray-200 space-y-2">
              <li>Bulk Numbers</li>
              <li>Unlimited SMS</li>
              <li>Dedicated Support</li>
            </ul>

            <button className="mt-6 w-full bg-green-500/90 hover:bg-green-600 text-white py-2 rounded-lg transition">
              Contact Sales
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
