"use client";
import { useEffect } from "react";
import { db } from "@/lib/firebaseClient";
import { collection, getDocs } from "firebase/firestore";

export default function TestFirebase() {
  useEffect(() => {
    async function testConnection() {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        console.log("✅ Firebase connected! Documents:", snapshot.size);
      } catch (err) {
        console.error("❌ Firebase error:", err);
      }
    }
    testConnection();
  }, []);

  return <div className="text-center mt-20 text-xl">Testing Firebase Connection...</div>;
}
