module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("REQ BODY:", req.body);

  const { phone } = req.body || {};

  if (!phone) {
    return res.status(400).json({
      success: false,
      error: "Phone is required"
    });
  }

  // مؤقتاً بدون TeleSign
  return res.status(200).json({
    success: true,
    msg: "send-code reached"
  });
};
