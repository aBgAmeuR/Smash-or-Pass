const express = require("express");
const app = express();
const config = require("./configuration/config");
const UserRouter = require("./Routes/User");
const jwtRouter = require("./Routes/jwt");
const middlewares = require("./middlewares/middlewares");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.InputVerif);
app.use(jwtRouter);
app.use(UserRouter);
app.use(middlewares.ErrorHandler);

app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
});
