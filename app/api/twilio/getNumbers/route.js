import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req) {
  try {
    const { countryCode } = await req.json();

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // ✅ Fetch only SMS-capable local numbers
    const availableNumbers = await client
      .availablePhoneNumbers(countryCode)
      .local.list({
        smsEnabled: true,
        voiceEnabled: true,
        limit: 6,
      });

    const formatted = availableNumbers.map((num) => ({
      phoneNumber: num.phoneNumber,
      friendlyName: num.friendlyName,
      region: num.region,
      isoCountry: num.isoCountry,
      price: 1500, // NGN price for users
      capabilities: num.capabilities,
    }));

    return NextResponse.json({ success: true, numbers: formatted });
  } catch (error) {
    console.error("❌ Twilio Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
