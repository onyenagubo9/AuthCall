"use client";
import React from "react";

export default function PaystackPaymentButton({ user, numberData, onSuccess }) {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const handlePaystack = () => {
    if (!user || !user.email) {
      alert("⚠️ Please log in before making a payment.");
      return;
    }

    if (typeof window === "undefined" || !window.PaystackPop) {
      alert("⚠️ Paystack not loaded. Please refresh and try again.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: user.email,
      amount: numberData.price * 100,
      currency: "NGN",
      ref: `${user.uid}_${Date.now()}`,
      metadata: { numberData },
      callback: (response) => {
        onSuccess({ ...response, numberData });
      },
      onClose: () => alert("Payment window closed"),
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={handlePaystack}
      className="bg-green-600 text-white w-full mt-3 py-2 rounded hover:bg-green-700"
    >
      Buy Number
    </button>
  );
}
