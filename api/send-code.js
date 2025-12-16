module.exports = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API reached",
    env: {
      customerId: !!process.env.TELESIGN_CUSTOMER_ID,
      apiKey: !!process.env.TELESIGN_API_KEY
    }
  });
};
