const jwt = require("jsonwebtoken");
const config = require("../configuration/config");

exports.InputVerif = (req, res, next) => {
  if (req.query == null) next();
  const regex = /["']+/g;
  Object.entries(req.query).forEach(([key, value]) => {
    if (regex.test(value)) {
      res.status(400).send("Invalid input");
      return;
    }
  });
  next();
};

exports.ErrorHandler = (Error, req, res, next) => {
  res.status(Error.status || 500);
  res.send({ "error": true, "message": Error.message || "Internal Server Error" });
};

exports.authenticateToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401).send({ "error": true, "message": "Missing token" });
  jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send({ "error": true, "message": "Invalid token" });
    req.user = user;
    next();
  })
};