const express = require("express");
const app = express();
const config = require("./configuration/config");
const middlewares = require("./middlewares/middlewares");
const fs = require('fs');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const UserRouter = require("./Routes/User");
const jwtRouter = require("./Routes/jwt");
const SmashListRouter = require("./Routes/SmashList");

app.use(express.static("img", { extensions: ["webp"] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API",
      description: "API Information",
      contact: {
        name: "API Support",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["app.js"],
};
let swaggerDocs;
fs.promises
  .readFile("./api/swagger.json")
  .then((data) => {
    const swaggerDocument = JSON.parse(data);
    swaggerOptions.swaggerDefinition = swaggerDocument;
    swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  })
  .catch((err) => {
    console.error(err);
  });

app.use(middlewares.InputVerif);
app.use(jwtRouter);
app.use(UserRouter);
app.use(SmashListRouter);
app.use(middlewares.ErrorHandler);

app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
});
