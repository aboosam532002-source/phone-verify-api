global.codes = global.codes || {};

module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, code } = req.body || {};

  if (!phone || !code) {
    return res.status(400).json({
      success: false,
      message: "Phone and code are required"
    });
  }

  const record = global.codes[phone];

  if (!record) {
    return res.status(400).json({
      success: false,
      message: "No code found"
    });
  }

  if (Date.now() > record.expiresAt) {
    delete global.codes[phone];
    return res.status(400).json({
      success: false,
      message: "Code expired"
    });
  }

  if (record.code !== code) {
    return res.status(400).json({
      success: false,
      message: "Invalid code"
    });
  }

  delete global.codes[phone];

  return res.status(200).json({
    success: true,
    message: "Verified"
  });
};
