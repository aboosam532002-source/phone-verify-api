module.exports = async (req, res) => {

  // ===== CORS =====
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // مهم لطلبات preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body || {};

  if (!phone) {
    return res.status(400).json({
      success: false,
      error: "Phone is required"
    });
  }

  return res.status(200).json({
    success: true,
    msg: "send-code reached"
  });
};
