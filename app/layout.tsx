import "./globals.css";  // ✅ Tailwind CSS import
import React from "react";

export const metadata = {
  title: "AuthCall",
  description: "Virtual Number App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Paystack Inline Script */}
        <script src="https://js.paystack.co/v1/inline.js" />
      </head>

      {/* Apply Tailwind styles to the entire app */}
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
