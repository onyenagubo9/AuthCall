import { NextResponse } from "next/server";
import axios from "axios";
import twilio from "twilio";
import { db } from "@/lib/firebaseClient";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const { reference, userUid, numberData } = await req.json();

    // 🔹 Step 1: Validate required fields
    if (!reference || !userUid || !numberData) {
      console.error("❌ Missing required fields:", { reference, userUid, numberData });
      return NextResponse.json(
        { success: false, message: "Missing required fields (reference, userUid, numberData)." },
        { status: 400 }
      );
    }

    // 🔹 Step 2: Verify Paystack payment
    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    const paymentData = verifyRes.data?.data;
    if (!paymentData || paymentData.status !== "success") {
      console.error("❌ Paystack verification failed:", verifyRes.data);
      return NextResponse.json(
        { success: false, message: "Payment verification failed or invalid reference." },
        { status: 400 }
      );
    }

    console.log(`✅ Paystack verified: ${paymentData.reference}`);

    // 🔹 Step 3: Initialize Twilio client
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      throw new Error("Twilio credentials not found in environment variables.");
    }

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    // 🔹 Step 4: Determine address and bundle per region
    const country = (numberData.isoCountry || "").toUpperCase();
    const addressMap = {
      DE: process.env.TWILIO_ADDRESS_SID_DE,
      US: process.env.TWILIO_ADDRESS_SID_US,
      GB: process.env.TWILIO_ADDRESS_SID_GB,
      FR: process.env.TWILIO_ADDRESS_SID_FR,
      CA: process.env.TWILIO_ADDRESS_SID_CA,
    };

    const addressSid = addressMap[country] || process.env.TWILIO_ADDRESS_SID;
    const bundleSid = country === "DE" ? process.env.TWILIO_BUNDLE_SID_DE || null : null;

    if (!addressSid) {
      throw new Error(`No Twilio Address SID found for country: ${country}`);
    }

    console.log(`🌍 Using Address SID for ${country}: ${addressSid}`);

    // 🔹 Step 5: Attempt to purchase number from Twilio
    let purchased;
    try {
      purchased = await client.incomingPhoneNumbers.create({
        phoneNumber: numberData.phoneNumber,
        addressSid,
        bundleSid: bundleSid || undefined,
        smsUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/webhook/sms`,
        voiceUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/webhook/voice`,
      });
    } catch (err) {
      // Retry without AddressSid or Bundle if optional
      if (err.message.includes("Address") || err.message.includes("Bundle")) {
        console.warn("⚠️ Retrying Twilio purchase without address/bundle...");
        purchased = await client.incomingPhoneNumbers.create({
          phoneNumber: numberData.phoneNumber,
          smsUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/webhook/sms`,
          voiceUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/webhook/voice`,
        });
      } else {
        throw err;
      }
    }

    console.log("📞 Twilio number purchased:", purchased.phoneNumber);

    // 🔹 Step 6: Record transaction in Firestore
    const transactionRef = doc(db, "transactions", reference);
    await setDoc(transactionRef, {
      userUid,
      amount: paymentData.amount / 100,
      currency: paymentData.currency,
      gateway: "paystack",
      reference,
      status: "success",
      paidAt: paymentData.paid_at,
      createdAt: serverTimestamp(),
      numberData,
    });

    // 🔹 Step 7: Store number in Firestore
    const numberRef = doc(db, "numbers", purchased.phoneNumber.replace(/\D/g, ""));
    await setDoc(numberRef, {
      phoneNumber: purchased.phoneNumber,
      country: numberData.isoCountry || "N/A",
      region: numberData.region || "N/A",
      ownerUid: userUid,
      sid: purchased.sid,
      friendlyName: purchased.friendlyName || "Virtual Number",
      status: "purchased",
      purchasedAt: serverTimestamp(),
    });

    // 🔹 Step 8: Update user record with purchase history
    const userRef = doc(db, "users", userUid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        lastPurchase: serverTimestamp(),
        lastNumber: purchased.phoneNumber,
        purchasedNumbers: arrayUnion(purchased.phoneNumber),
      });
    } else {
      await setDoc(userRef, {
        uid: userUid,
        createdAt: serverTimestamp(),
        purchasedNumbers: [purchased.phoneNumber],
        lastPurchase: serverTimestamp(),
      });
    }

    console.log(`✅ Assigned ${purchased.phoneNumber} to user ${userUid}`);

    // 🔹 Step 9: Respond success
    return NextResponse.json({
      success: true,
      message: `✅ Payment verified — ${country || "unknown"} number purchased successfully.`,
      number: purchased.phoneNumber,
    });
  } catch (error) {
    console.error("❌ Error in /api/paystack/verify route:");
    console.error(error.message);
    if (error.response?.data) console.error("↪ Twilio or Paystack:", error.response.data);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Verification or Twilio purchase failed. Check server logs for details.",
      },
      { status: 500 }
    );
  }
}
