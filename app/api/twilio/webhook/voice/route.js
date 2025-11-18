import { NextResponse } from "next/server";
import twilio from "twilio";

// ✅ Handles incoming calls from Twilio
export async function POST(req) {
  try {
    const formData = await req.formData();
    const from = formData.get("From");
    const to = formData.get("To");

    console.log(`📞 Incoming call from ${from} to ${to}`);

    // Build TwiML response (XML instructions for Twilio)
    const voiceResponse = new twilio.twiml.VoiceResponse();

    // Greet the caller
    voiceResponse.say("Hello! This is AuthCall. Please hold while we connect you.");

    // Example: forward call to another number (optional)
    // voiceResponse.dial("+2348012345678");

    return new Response(voiceResponse.toString(), {
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("❌ Voice webhook error:", error);
    return NextResponse.json({ success: false, message: "Voice webhook failed" }, { status: 500 });
  }
}
