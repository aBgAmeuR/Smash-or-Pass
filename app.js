const express = require("express");
const app = express();
const mysql = require("mysql");
const config = require("./configuration/config");
const UserRouter = require("./Routes/User");
const InputVerifRouter = require("./Routes/InputVerif");

app.use(express.json());

app.use(InputVerifRouter);
app.use(UserRouter);

const connection = mysql.createConnection(config.database);
connection.connect();
app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
});
