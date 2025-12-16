const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

module.exports = (req, res) => {
  return app(req, res);
};
// force redeploy
