const jwt = require("jsonwebtoken");
const config = require("../configuration/config");

exports.generateAccessToken = (user) => {
  return jwt.sign(user, config.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}