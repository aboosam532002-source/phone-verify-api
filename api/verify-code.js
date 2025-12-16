module.exports = (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({
      success: false,
      message: "phone and code are required"
    });
  }

  // مؤقتاً أي كود 1234 نعتبره صحيح
  if (code === "1234") {
    return res.json({
      success: true,
      message: "Code verified successfully"
    });
  }

  return res.status(400).json({
    success: false,
    message: "Invalid code"
  });
};
