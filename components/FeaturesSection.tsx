"use client";

import { motion } from "framer-motion";
import { MessageSquareText, ShieldCheck, Globe2 } from "lucide-react";

export default function FeaturesSection() {
  // Delay animation for each card
  const cardVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } },
  });

  return (
    <section id="features" className="px-6 md:px-12 py-24 bg-gray-50">
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-green-700 drop-shadow-sm"
      >
        Powerful Messaging Features
      </motion.h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {/* CARD 1 */}
        <motion.div
          variants={cardVariants(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.04 }}
          className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100"
        >
          <MessageSquareText className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">
            Send & Receive SMS
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Deliver and receive real-time SMS globally using fast and reliable
            Twilio-powered infrastructure.
          </p>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          variants={cardVariants(0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.04 }}
          className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100"
        >
          <ShieldCheck className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">
            Secure Messaging
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Your data is encrypted and protected with industry-standard security
            to keep messages safe.
          </p>
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          variants={cardVariants(0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.04 }}
          className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100"
        >
          <Globe2 className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">
            Global Virtual Numbers
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Choose virtual numbers from multiple countries to support worldwide
            communication.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
