module.exports = async (req, res) => {
  console.log("REQ BODY:", req.body);

  return res.status(200).json({
    success: true,
    msg: "Ready for TeleSign"
  });
};
