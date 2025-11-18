import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseClient";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export async function POST(req) {
  try {
    const form = await req.formData();

    const from = form.get("From");
    const to = form.get("To");
    const body = form.get("Body");

    console.log("📥 Incoming SMS:", { from, to, body });

    // FIND OWNER OF TWILIO NUMBER
    const q = query(
      collection(db, "numbers"),
      where("phoneNumber", "==", to)
    );
    const snap = await getDocs(q);

    const ownerUid = snap.empty ? "unknown" : snap.docs[0].data().ownerUid;

    // SAVE MESSAGE
    await addDoc(collection(db, "messages"), {
      ownerUid,
      from,
      to,
      body,
      status: "received",
      createdAt: serverTimestamp(),
    });

    console.log("💾 Saved incoming SMS for user:", ownerUid);

    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
