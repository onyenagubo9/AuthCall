"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTx() {
      const snapshot = await getDocs(collection(db, "transactions"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    }
    fetchTx();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Currency</th>
            <th className="p-2 text-left">Method</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t">
              <td className="p-2">{tx.userUid}</td>
              <td className="p-2">{tx.amount}</td>
              <td className="p-2">{tx.currency || "USD"}</td>
              <td className="p-2">{tx.method}</td>
              <td className="p-2">{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
