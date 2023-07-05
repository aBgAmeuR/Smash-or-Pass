const History = require("../Services/History");

exports.CreateHistory = async (req, res, next) => {
  try {
    const { username, smashList, position } = req.query;
    if (!username || !smashList || !position) {
      return next({ status: 400, message: "Missing input" });
    }
    try {
      const history = await History.CreateHistory(username, smashList, position);
      res.status(201).send({ error: false, message: "History created" });
    } catch (error) {
      return next({ status: 409, message: "History already exist" });
    }
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
};

exports.GetHistory = async (req, res, next) => {
  try {
    const { username } = req.query;
    const history = await History.GetHistory(username);
    res.status(200).send({ error: false, message: "History", data: history });
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
};

exports.UpdateHistory = async (req, res, next) => {
  try {
    const { username, smashList, position } = req.query;
    if (!username || !smashList || !position) {
      return next({ status: 400, message: "Missing input" });
    }
    try {
      const history = await History.UpdateHistory(username, smashList, position);
      res.status(201).send({ error: false, message: "History updated" });
    } catch (error) {
      return next({ status: 409, message: "History already exist" });
    }
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
};