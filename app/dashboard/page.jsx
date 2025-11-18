"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { logoutUser } from "@/lib/authActions";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Phone,
  Settings,
  LogOut,
  User,
  BarChart2,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  // undefined = still checking, null = no firebase user, object = firebase user
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    // subscribe to firebase auth state
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    // cleanup
    return () => unsub();
  }, []);

  useEffect(() => {
    // Only run the redirect logic once we have finished initial checking.
    // If cookie exists, middleware already allowed the route — do NOT redirect.
    // If no cookie and no firebase user, redirect to login.
    if (user === undefined) return; // still checking

    const cookie = getCookie("__session");

    // If there is no firebase user AND no cookie -> force redirect to login
    if (!user && !cookie) {
      router.replace("/login");
    }

    // If firebase user exists, do nothing — dashboard will render
  }, [user, router]);

  // Show a centered spinner while determining auth state (no redirect yet)
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  // If user is null but cookie exists, we allow the UI to render minimal content
  // (this case can happen when SSR/middleware allowed route but firebase hasn't hydrated yet).
  // We'll show a partial UI and a shorter spinner for content areas.
  if (!user && getCookie("__session")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-gray-600">Restoring session...</p>
        </div>
      </div>
    );
  }

  // At this point user is a valid firebase user object
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-xl border-r px-6 py-8 hidden md:flex flex-col">
        <h2 className="text-3xl font-extrabold text-green-700 mb-10">AuthCall</h2>

        <nav className="space-y-4 text-gray-700 font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg"
          >
            <BarChart2 size={20} /> Overview
          </Link>

          <Link
            href="/dashboard/messages"
            className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg"
          >
            <MessageSquare size={20} /> Messages
          </Link>

          <Link
            href="/dashboard/numbers"
            className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg"
          >
            <Phone size={20} /> Numbers
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg"
          >
            <Settings size={20} /> Settings
          </Link>

          <button
            onClick={async () => {
              const result = await logoutUser();
              if (result.success) {
                router.push("/login");
              } else {
                console.error(result.error);
              }
            }}
            className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Welcome back 👋</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 shadow rounded-lg">
            <User size={20} className="text-green-700" />
            <span className="font-medium">{user.email}</span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">Messages Sent</h3>
              <MessageSquare className="text-green-600" />
            </div>
            <p className="text-4xl font-extrabold mt-4">128</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">Virtual Numbers</h3>
              <Phone className="text-green-600" />
            </div>
            <p className="text-4xl font-extrabold mt-4">3</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">SMS Balance</h3>
              <BarChart2 className="text-green-600" />
            </div>
            <p className="text-4xl font-extrabold mt-4">1,972</p>
          </motion.div>
        </div>

        {/* Activity & Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <ul className="space-y-3 text-gray-700">
              <li>📩 You sent an SMS to +1 762 985 0649</li>
              <li>📥 You received a message from +1 205 447 8800</li>
              <li>📞 New number added to your account</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/messages" className="px-4 py-3 bg-green-600 text-white rounded-lg text-center hover:bg-green-700">Send a Message</Link>
              <Link href="/dashboard/numbers" className="px-4 py-3 bg-gray-200 rounded-lg text-center hover:bg-gray-300">Buy New Number</Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
