import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req) {
  try {
    const { country } = await req.json();

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken || !country) {
      return NextResponse.json(
        { success: false, message: "Missing API credentials or country." },
        { status: 400 }
      );
    }

    const client = twilio(accountSid, authToken);

    console.log("🔍 Searching numbers for country:", country);

    const numbers = await client.availablePhoneNumbers(country).local.list({
      smsEnabled: true,
      limit: 20,
    });

    return NextResponse.json({
      success: true,
      results: numbers.map((n) => ({
        phoneNumber: n.phoneNumber,
        friendlyName: n.friendlyName,
        locality: n.locality,
        region: n.region,
      })),
    });
  } catch (error) {
    console.error("❌ Search Numbers Error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
