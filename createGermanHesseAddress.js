import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config(); // load .env.local file

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function createGermanHesseAddress() {
  try {
    console.log("🏗️ Creating German (Hesse) Address for Twilio...");

    const address = await client.addresses.create({
      customerName: "AuthCall Germany Office",
      friendlyName: "AuthCall Germany - Hesse Region",
      street: "Berliner Allee 47", // use a valid German-style address
      city: "Frankfurt am Main",   // city inside Hesse
      region: "HE",                // Hesse region code
      postalCode: "60313",
      isoCountry: "DE",            // Germany
    });

    console.log("✅ German Hesse Address created successfully!");
    console.log("Friendly Name:", address.friendlyName);
    console.log("Address SID:", address.sid);
    console.log("Country:", address.isoCountry);
    console.log("Region:", address.region);
    console.log("------------------------------------------------");
    console.log("👉 Copy this Address SID and add it to your .env.local as:");
    console.log(`TWILIO_ADDRESS_SID_DE=${address.sid}`);
    console.log("------------------------------------------------");
  } catch (error) {
    console.error("❌ Failed to create Hesse Address:", error.message);
  }
}

createGermanHesseAddress();
