"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login");
        return;
      }

      const q = query(collection(db, "admins"), where("email", "==", currentUser.email));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setUser(currentUser);
        setIsAdmin(true);
      } else {
        router.push("/admin/login");
      }
    });

    return () => unsub();
  }, [router]);

  if (!isAdmin) return <p className="text-center mt-20">Checking admin access...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome, {user?.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/admin/users" className="bg-green-600 text-white p-6 rounded-xl shadow text-center hover:bg-green-700">
          Manage Users
        </a>
        <a href="/admin/numbers" className="bg-blue-600 text-white p-6 rounded-xl shadow text-center hover:bg-blue-700">
          Manage Numbers
        </a>
        <a href="/admin/transactions" className="bg-purple-600 text-white p-6 rounded-xl shadow text-center hover:bg-purple-700">
          View Transactions
        </a>
      </div>
    </div>
  );
}
