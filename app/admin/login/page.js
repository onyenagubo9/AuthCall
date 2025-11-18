"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Step 1: Log in via Firebase
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Step 2: Check if user is in "admins" collection
      const q = query(collection(db, "admins"), where("email", "==", user.email));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        // Admin found
        router.push("/admin/dashboard");
      } else {
        setError("Unauthorized: You are not an admin.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleAdminLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
