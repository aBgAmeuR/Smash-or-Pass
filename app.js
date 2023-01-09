const express = require('express');
const app = express();
const config = require('./configuration/config');
const UserRouter = require('./Routes/User');
const mysql = require('mysql');

app.use(express.json());

app.use(UserRouter);




mysql.createConnection(config.database).then(() => {
  app.listen(config.port, () => {
    console.log("Server is running on port " + config.port);
  });
}).catch((err) => {
  console.log("Error conecting to database: " + err);
});
