import "./globals.css";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "AuthCall",
  description: "Virtual Number App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;   // ✅ THIS FIXES THE ERROR
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.paystack.co/v1/inline.js" />
      </head>

      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
