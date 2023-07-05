const User = require("../Services/User");
const jwt = require("../configuration/jwt");
const { SendSuccess } = require("../helpers/SendMessage");

exports.CreateUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.query;
    if (!username || !password || !email) {
      return next({ status: 400, message: "Missing input"});
    }
    try {
      const user = await User.CreateUser(username, password, email);
      res.status(201).send({ error: false ,message: "User created"});
    } catch (error) {
      return next({ status: 409, message: "User already exist" });
    }
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.query;
    if (!username || !password) {
      return next({ status: 400, message: "Missing input"});
    }
    try {
      const user = await User.GetUser(username, password);
      const token = await jwt.generateAccessToken(user[0]);
      res.status(200).send(SendSuccess("User logged", { token }));
    } catch (error) {
      return next({ status: 404, message: "User not found" });
    }
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
};

// TO DO : Update user
exports.UpdateUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.query;
    if (!username || !password || !email) {
      return next({ status: 400, message: "Missing input"});
    }
    try {
      const user = await User.UpdateUser(username, password, email);
      res.status(200).send({ error: false, message: "User updated" });
    } catch (error) {
      return next({ status: 404, message: "User not found" });
    }
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
};

exports.DeleteUser = async (req, res, next) => {
  try {
    const username = req.user.Pseudo_U;
    if (!username) {
      return next({ status: 400, message: "Missing input"});
    }
    try {
      const user = await User.DeleteUser(username);
      res.status(200).send({ error: false, message: "User deleted" });
    } catch (error) {
      return next({ status: 404, message: "User not found" });
    }
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
}

