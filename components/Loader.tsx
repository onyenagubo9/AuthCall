"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading time (1.2 seconds)
    const timer = setTimeout(() => setLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-9999 flex flex-col items-center justify-center"
    >
      {/* ANIMATED LOGO */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <Image
          src="/images/logo-authcall.png"
          alt="Loading..."
          width={80}
          height={80}
          className="rounded-lg shadow-md"
        />

        {/* SPINNING RING */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="mt-6 w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}
