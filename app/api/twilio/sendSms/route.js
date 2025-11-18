import { NextResponse } from "next/server";
import twilio from "twilio";
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
    const { fromNumber, toNumber, message, userUid } = await req.json();

    if (!fromNumber || !toNumber || !message || !userUid) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Twilio client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    console.log("📤 Sending SMS:", { fromNumber, toNumber, message });

    // SEND MESSAGE
    const twilioMessage = await client.messages.create({
      from: fromNumber,
      to: toNumber,
      body: message,
    });

    console.log("✅ SMS SENT:", twilioMessage.sid);

    // STORE SENT MESSAGE
    await addDoc(collection(db, "messages"), {
      ownerUid: userUid,
      from: fromNumber,
      to: toNumber,
      body: message,
      status: "sent",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("❌ SEND ERROR:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
