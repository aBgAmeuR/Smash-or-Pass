const express = require("express");
const app = express();
const config = require("./configuration/config");
const UserRouter = require("./Routes/User");
const mysql = require("mysql");

app.use(express.json());

app.use(UserRouter);

const connection = mysql.createConnection(config.database);
connection.connect();
app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
});
