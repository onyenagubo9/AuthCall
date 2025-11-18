"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export default function AdminNumbers() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    async function fetchNumbers() {
      const snapshot = await getDocs(collection(db, "numbers"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNumbers(data);
    }
    fetchNumbers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Virtual Numbers</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Number</th>
            <th className="p-2 text-left">Country</th>
            <th className="p-2 text-left">Owner</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((num) => (
            <tr key={num.id} className="border-t">
              <td className="p-2">{num.phoneNumber}</td>
              <td className="p-2">{num.country || "N/A"}</td>
              <td className="p-2">{num.ownerUid || "Unassigned"}</td>
              <td className="p-2">{num.status || "available"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
