"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseClient";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import axios from "axios";

export default function NumbersPage() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [searchCountry, setSearchCountry] = useState("US");
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [searching, setSearching] = useState(false);

  // Watch authentication
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  // Load user's purchased numbers
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "numbers"),
      where("ownerUid", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNumbers(arr);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  // Search available Twilio numbers
  const searchNumbers = async () => {
    setSearching(true);
    setAvailableNumbers([]);

    try {
      const res = await axios.post("/api/twilio/searchNumbers", {
        country: searchCountry,
      });

      setAvailableNumbers(res.data.results || []);
    } catch (error) {
      alert("Failed to load numbers.");
    } finally {
      setSearching(false);
    }
  };

  // Buy number
  const buyNumber = async (phoneNumber) => {
    if (!phoneNumber) return;

    const confirmBuy = confirm(
      `Buy this number?\n\n${phoneNumber}\n\nPrice: $1 / month`
    );

    if (!confirmBuy) return;

    try {
      const res = await axios.post("/api/twilio/buyNumber", {
        phoneNumber,
        userUid: user.uid,
      });

      if (res.data.success) {
        alert("🎉 Number purchased successfully!");
        setBuyModalOpen(false);
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (error) {
      alert("Error buying number.");
    }
  };

  if (!authChecked)
    return <div className="p-6 text-gray-600">Loading...</div>;

  if (!user)
    return (
      <div className="h-screen flex justify-center items-center">
        <a href="/login" className="text-green-600 underline text-xl">
          Login Required →
        </a>
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Your Numbers
      </h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700">
          These are your Twilio numbers connected to your AuthCall account.
        </p>

        <button
          onClick={() => setBuyModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          + Buy New Number
        </button>
      </div>

      {/* Your Numbers List */}
      <div className="bg-white shadow rounded-lg overflow-hidden border">
        {loading ? (
          <p className="p-4 text-gray-500">Loading…</p>
        ) : numbers.length === 0 ? (
          <p className="p-4 text-gray-500 text-center">
            You have no numbers. Click “Buy New Number”.
          </p>
        ) : (
          numbers.map((n) => (
            <div
              key={n.id}
              className="p-4 border-b hover:bg-gray-50 transition"
            >
              <div className="text-xl font-bold text-gray-800">
                {n.phoneNumber}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                Country: {n.country || "Unknown"}
              </div>
              <div className="text-gray-500 text-sm">
                Capabilities: {n.capabilities?.join(", ") || "SMS"}
              </div>
            </div>
          ))
        )}
      </div>

      {/* BUY NUMBER MODAL */}
      {buyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">

          <div className="bg-white w-96 rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Buy New Number
            </h2>

            {/* Country Picker */}
            <label className="text-gray-600 font-semibold text-sm">
              Choose Country
            </label>
            <select
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              className="w-full p-2 mt-1 mb-4 border rounded-lg"
            >
              <option value="US">🇺🇸 United States</option>
              <option value="GB">🇬🇧 United Kingdom</option>
              <option value="CA">🇨🇦 Canada</option>
              <option value="AU">🇦🇺 Australia</option>
              <option value="DE">🇩🇪 Germany</option>
              <option value="NG">🇳🇬 Nigeria (limited or unavailable)</option>
              <option value="FR">🇫🇷 France</option>
            </select>

            <button
              onClick={searchNumbers}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Search Numbers
            </button>

            {/* Available Numbers */}
            <div className="mt-4 max-h-60 overflow-y-auto border-t pt-3">
              {searching && <p className="text-gray-600">Searching…</p>}

              {availableNumbers.map((num, index) => (
                <div
                  key={index}
                  className="p-3 border-b flex justify-between items-center hover:bg-gray-50"
                >
                  <div>
                    <div className="font-semibold text-gray-800">
                      {num.phoneNumber}
                    </div>
                    <div className="text-xs text-gray-500">
                      {num.friendlyName}
                    </div>
                  </div>

                  <button
                    onClick={() => buyNumber(num.phoneNumber)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Buy
                  </button>
                </div>
              ))}

              {availableNumbers.length === 0 && !searching && (
                <p className="text-gray-500 text-center">No numbers found.</p>
              )}
            </div>

            <button
              onClick={() => setBuyModalOpen(false)}
              className="w-full mt-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
