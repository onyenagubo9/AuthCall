import { NextResponse } from "next/server";
import twilio from "twilio";
import { db } from "@/lib/firebaseClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const { phoneNumber, userUid } = await req.json();

    if (!phoneNumber || !userUid) {
      return NextResponse.json(
        { success: false, message: "Missing phoneNumber or userUid." },
        { status: 400 }
      );
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = twilio(accountSid, authToken);

    console.log("📦 Purchasing number:", phoneNumber);

    // BUY NUMBER
    const purchase = await client.incomingPhoneNumbers.create({
      phoneNumber,
    });

    console.log("✅ Number purchased:", purchase.sid);

    // SAVE IN FIRESTORE
    await addDoc(collection(db, "numbers"), {
      ownerUid: userUid,
      phoneNumber: purchase.phoneNumber,
      country: purchase.countryCode,
      capabilities: [
        purchase.capabilities?.SMS ? "SMS" : "",
        purchase.capabilities?.MMS ? "MMS" : "",
        purchase.capabilities?.voice ? "Voice" : "",
      ].filter(Boolean),
      sid: purchase.sid,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: "Number purchased successfully!",
      number: purchase.phoneNumber,
    });
  } catch (error) {
    console.error("❌ Buy Number Error:", error.message);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
