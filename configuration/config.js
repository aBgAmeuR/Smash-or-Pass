require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  database: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
  },
  ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET
};
