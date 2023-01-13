const express = require("express");
const app = express();
const config = require("./configuration/config");
const middlewares = require("./middlewares/middlewares");
const UserRouter = require("./Routes/User");
const jwtRouter = require("./Routes/jwt");
const SmashListRouter = require("./Routes/SmashList");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.InputVerif);
app.use(jwtRouter);
app.use(UserRouter);
app.use(SmashListRouter);
app.use(middlewares.ErrorHandler);

app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
});
