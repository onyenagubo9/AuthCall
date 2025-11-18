import { NextResponse } from "next/server";
import twilio from "twilio";
import { db } from "@/lib/firebaseClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const { from, to, body, userUid } = await req.json();

    if (!from || !to || !body) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Initialize Twilio client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send SMS
    const message = await client.messages.create({
      body,
      from, // Twilio number owned by the user
      to,   // Recipient phone number
    });

    // Log message in Firestore
    await addDoc(collection(db, "messages"), {
      userUid,
      from,
      to,
      body,
      direction: "outbound",
      status: message.status,
      sid: message.sid,
      createdAt: serverTimestamp(),
    });

    console.log(`✅ Message sent to ${to}: ${body}`);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      sid: message.sid,
    });
  } catch (error) {
    console.error("❌ Error sending SMS:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to send SMS" },
      { status: 500 }
    );
  }
}
