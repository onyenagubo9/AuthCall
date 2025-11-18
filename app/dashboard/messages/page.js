"use client";

import { useEffect, useState, useRef } from "react";
import { auth, db } from "@/lib/firebaseClient";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import axios from "axios";

export default function MessagesPage() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [numbers, setNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState("");

  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] = useState("");
  const [messageBody, setMessageBody] = useState("");

  const [newChatOpen, setNewChatOpen] = useState(false);
  const [newChatNumber, setNewChatNumber] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // AUTH LISTENER
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  // GET USER NUMBERS
  useEffect(() => {
    if (!user) return;

    const loadNumbers = async () => {
      const q = query(collection(db, "numbers"), where("ownerUid", "==", user.uid));
      const snap = await getDocs(q);
      const nums = snap.docs.map((d) => d.data());
      setNumbers(nums);

      if (nums.length > 0) setSelectedNumber(nums[0].phoneNumber);
    };

    loadNumbers();
  }, [user]);

  // LOAD ALL MESSAGES
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "messages"), where("ownerUid", "==", user.uid));

    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Sort newest → oldest
      arr.sort((a, b) => {
        const t1 = a.createdAt?.seconds || 0;
        const t2 = b.createdAt?.seconds || 0;
        return t2 - t1;
      });

      setMessages(arr);

      // Build conversation list
      const conv = [];
      const seen = new Set();

      arr.forEach((msg) => {
        const other =
          msg.from === selectedNumber ? msg.to : msg.from;

        if (!seen.has(other)) {
          seen.add(other);
          conv.push({
            number: other,
            lastMessage: msg.body,
            lastTime: msg.createdAt?.seconds || 0,
          });
        }
      });

      conv.sort((a, b) => b.lastTime - a.lastTime);
      setConversations(conv);
    });

    return () => unsub();
  }, [selectedNumber, user]);

  // FILTER SELECTED CHAT MESSAGES
  const selectedMessages = selectedConversation
    ? messages
        .filter(
          (msg) =>
            (msg.from === selectedNumber && msg.to === selectedConversation) ||
            (msg.to === selectedNumber && msg.from === selectedConversation)
        )
        .sort((a, b) => {
          const t1 = a.createdAt?.seconds || 0;
          const t2 = b.createdAt?.seconds || 0;
          return t1 - t2;
        })
    : [];

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!messageBody.trim()) return;

    await axios.post("/api/twilio/sendSms", {
      fromNumber: selectedNumber,
      toNumber: selectedConversation,
      message: messageBody,
      userUid: user.uid,
    });

    setMessageBody("");
  };

  // START NEW CHAT
  const startNewChat = () => {
    if (!newChatNumber.trim()) return;
    setSelectedConversation(newChatNumber);
    setNewChatOpen(false);
    setNewChatNumber("");
  };

  if (!authChecked)
    return <div className="p-8 text-center text-gray-600">Loading...</div>;

  if (!user)
    return (
      <div className="h-screen flex justify-center items-center">
        <a href="/login" className="text-xl text-green-600 underline">
          Login Required →
        </a>
      </div>
    );

  return (
    <div className="flex h-screen bg-[#f0f2f5]">

      {/* LEFT SIDEBAR */}
      <div className="w-80 bg-white border-r flex flex-col">

        {/* HEADER */}
        <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center shadow">
          <span className="font-bold text-lg">AuthCall</span>

          {/* NEW CHAT BUTTON */}
          <button
            onClick={() => setNewChatOpen(true)}
            className="text-xl font-bold"
          >
            ＋
          </button>
        </div>

        {/* CHOOSE TWILIO NUMBER */}
        <div className="p-3 bg-[#f0f2f5] border-b">
          <select
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value)}
            className="w-full p-2 border bg-white rounded-lg"
          >
            {numbers.map((n, i) => (
              <option key={i} value={n.phoneNumber}>
                {n.phoneNumber}
              </option>
            ))}
          </select>
        </div>

        {/* SEARCH BAR */}
        <div className="p-3 border-b bg-white">
          <input
            placeholder="Search or start new chat"
            className="w-full p-2 bg-[#f0f2f5] rounded-lg"
          />
        </div>

        {/* CONVERSATION LIST */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c, i) => (
            <div
              key={i}
              onClick={() => setSelectedConversation(c.number)}
              className={`p-4 border-b cursor-pointer hover:bg-[#f0f2f5] ${
                selectedConversation === c.number ? "bg-[#e6f5ed]" : ""
              }`}
            >
              <div className="font-semibold text-gray-800">{c.number}</div>
              <div className="text-sm text-gray-500 truncate">
                {c.lastMessage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* CHAT HEADER */}
        <div className="bg-white px-4 py-3 border-b shadow flex items-center gap-3">
          {selectedConversation ? (
            <>
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                {selectedConversation.substring(0, 2)}
              </div>

              <div>
                <div className="font-semibold text-gray-800">{selectedConversation}</div>
                <div className="text-xs text-gray-500">online</div>
              </div>
            </>
          ) : (
            <div className="text-gray-500">Select or start a chat</div>
          )}
        </div>

        {/* MESSAGE AREA */}
        <div className="flex-1 p-5 overflow-y-auto bg-chat-bg">
          {selectedConversation ? (
            selectedMessages.map((m) => (
              <div
                key={m.id}
                className={`flex my-2 ${
                  m.from === selectedNumber ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
                    m.from === selectedNumber
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border"
                  }`}
                >
                  {m.body}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-20">
              Select a conversation to start chatting
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* MESSAGE INPUT */}
        {selectedConversation && (
          <div className="p-4 bg-white border-t flex items-center gap-3">
            <input
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message"
              className="flex-1 p-3 bg-[#f0f2f5] rounded-full focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={sendMessage}
              className="p-3 bg-green-600 rounded-full text-white"
            >
              ➤
            </button>
          </div>
        )}
      </div>

      {/* NEW CHAT MODAL */}
      {newChatOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Start New Chat
            </h3>

            <input
              type="text"
              value={newChatNumber}
              onChange={(e) => setNewChatNumber(e.target.value)}
              placeholder="Enter phone number"
              className="w-full p-3 border rounded-lg mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300"
                onClick={() => setNewChatOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded bg-green-600 text-white"
                onClick={startNewChat}
              >
                Start Chat
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
