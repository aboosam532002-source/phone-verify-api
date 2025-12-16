const TeleSignSDK = require("telesignsdk");

const customerId = process.env.TELESIGN_CUSTOMER_ID;
const apiKey = process.env.TELESIGN_API_KEY;

const client = new TeleSignSDK(customerId, apiKey);

// 🧠 تخزين مؤقت
global.codes = global.codes || {};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, channel } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone is required" });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // ⏱️ صلاحية 5 دقائق
  global.codes[phone] = {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000
  };

  try {
    if (channel === "voice") {
      await client.voice.call(phone, code, "en-US");
    } else {
      await client.sms.message(
        phone,
        `Your verification code is ${code}`,
        "OTP"
      );
    }

    return res.json({
      success: true,
      message: "Verification code sent"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
