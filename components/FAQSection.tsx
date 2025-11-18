"use client";

import { useState } from "react";
import {
  ShieldCheck,
  MessageSquare,
  Globe,
  Lock,
  Smartphone,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is AuthCall safe?",
      a: "Yes. AuthCall uses industry-standard encryption, secure cloud storage, and strict access controls to protect your data.",
      icon: <ShieldCheck className="text-green-600" size={22} />,
    },
    {
      q: "Can I use AuthCall for verification?",
      a: "Yes, you can receive verification SMS for most global apps except WhatsApp, Facebook, and banking apps due to Twilio restrictions.",
      icon: <Smartphone className="text-green-600" size={22} />,
    },
    {
      q: "Do you support WhatsApp?",
      a: "Twilio supports WhatsApp Business API only. WhatsApp personal verification codes cannot be received.",
      icon: <MessageSquare className="text-green-600" size={22} />,
    },
    {
      q: "Is international SMS supported?",
      a: "Yes. You can send and receive SMS worldwide depending on Twilio network availability and local regulations.",
      icon: <Globe className="text-green-600" size={22} />,
    },
    {
      q: "Can I use the same number for multiple apps?",
      a: "Yes. Your virtual number can be used across multiple platforms, systems, and automation tools.",
      icon: <HelpCircle className="text-green-600" size={22} />,
    },
    {
      q: "Does AuthCall store my messages?",
      a: "Messages are securely stored using end-to-end encrypted cloud infrastructure with strict retention policies.",
      icon: <Lock className="text-green-600" size={22} />,
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="px-6 md:px-12 py-28 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mt-3">
          Everything you need to know about AuthCall’s virtual numbers,
          messaging features, and verification capabilities.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-5">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex justify-between items-center text-left group"
            >
              <div className="flex items-center gap-4">
                {/* ICON */}
                <div className="p-2 bg-green-100 rounded-lg">
                  {item.icon}
                </div>

                {/* QUESTION */}
                <span className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition">
                  {item.q}
                </span>
              </div>

              {/* CHEVRON */}
              {openIndex === index ? (
                <ChevronUp className="text-green-600" size={24} />
              ) : (
                <ChevronDown className="text-gray-500" size={24} />
              )}
            </button>

            {/* ANSWER */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 px-6 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 leading-relaxed pl-14">
                {item.a}
              </p>
            </div>

            {/* Green Accent Line */}
            <div
              className={`h-1 bg-green-500 rounded-b-xl transition-all duration-500 ${
                openIndex === index ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}
