"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseClient";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function MyNumbersPage() {
  const [user, setUser] = useState(null);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const q = query(collection(db, "numbers"), where("ownerUid", "==", u.uid));
        const docs = await getDocs(q);
        setNumbers(docs.docs.map((doc) => doc.data()));
      }
    });
    return () => unsub();
  }, []);

  if (!user) return <p className="p-8">Please log in to view your numbers.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📞 My Purchased Numbers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {numbers.length === 0 && <p>No numbers purchased yet.</p>}
        {numbers.map((n, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4 border">
            <h2 className="font-semibold text-lg">{n.phoneNumber}</h2>
            <p className="text-gray-500">{n.country}</p>
            <p className="text-gray-500">{n.status}</p>
            <p className="text-xs text-gray-400 mt-2">
              Purchased on: {n.purchasedAt?.seconds
                ? new Date(n.purchasedAt.seconds * 1000).toLocaleString()
                : "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
