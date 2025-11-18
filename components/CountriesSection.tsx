"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const countries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "South Africa", flag: "🇿🇦" },
];

export default function CountriesSection() {
  return (
    <section className="px-6 md:px-10 py-24 bg-linear-to-b from-white to-gray-100">
      
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-gray-900"
      >
        Supported Countries
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-lg"
      >
        AuthCall virtual numbers are available globally, powered by secure Twilio routing.
      </motion.p>

      {/* WORLD MAP CONTAINER */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="drop-shadow-xl"
        >
          <Image
            src="/images/world-map.png"
            alt="World Map"
            width={1200}
            height={600}
            className="w-full opacity-90 rounded-xl"
          />
        </motion.div>

        {/* Floating Flags Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{
                y: [0, -8, 0], // floating animation
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="absolute text-xl md:text-3xl"
              style={{
                top: `${15 + index * 6}%`,
                left: index % 2 === 0 ? "18%" : "72%",
              }}
            >
              <span className="drop-shadow-lg">{country.flag}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* COUNTRY LIST*/}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-20 max-w-5xl mx-auto">
        {countries.map((country, index) => (
          <motion.div
            key={country.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex items-center gap-3 p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:bg-green-50 transition-all cursor-pointer"
          >
            <span className="text-3xl">{country.flag}</span>
            <p className="text-gray-800 font-semibold">{country.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
